-- ============================================================================
-- MENINAS DIGITAIS - SCHEMA COMPLETO DO BANCO DE DADOS
-- Supabase (PostgreSQL) - Projeto de Extensão UTFPR-CP
-- ============================================================================
-- Executar este script no SQL Editor do Supabase (Dashboard > SQL Editor)
-- ============================================================================

-- ============================================================================
-- 1. EXTENSÃO PARA BUSCA POR TEXTO (trigram)
-- ============================================================================

create extension if not exists pg_trgm;

-- ============================================================================
-- 2. TIPOS ENUMERADOS (ENUMS)
-- ============================================================================

-- Tipo do evento (tags de categorização)
create type public.tipo_evento_enum as enum (
  'Oficina',
  'Minicurso',
  'Roda de Conversa',
  'Palestra',
  'Workshop',
  'Hackathon',
  'Outro'
);

-- Status do evento (ciclo de vida)
create type public.status_evento_enum as enum (
  'Em breve',
  'Inscrições Abertas',
  'Em Andamento',
  'Encerrado',
  'Cancelado'
);

-- Role do administrador
create type public.admin_role_enum as enum (
  'Coordenadora',
  'MembroDoProjeto'
);

-- ============================================================================
-- 3. TABELA: administradores (perfil das administradoras)
-- ============================================================================
-- Vinculada ao auth.users do Supabase Auth
-- RF07: Autenticação Restrita
-- RF14: Cadastro de Administradores (Coordenadora cria novos membros)

create table public.administradores (
  id           bigint generated always as identity primary key,
  auth_user_id uuid not null unique references auth.users(id) on delete cascade,
  nome         text not null,
  email        text not null unique,
  role         public.admin_role_enum not null default 'MembroDoProjeto'
);

comment on table  public.administradores is 'Perfis das administradoras do projeto Meninas Digitais';
comment on column public.administradores.auth_user_id is 'FK para auth.users do Supabase Auth';
comment on column public.administradores.role is 'Coordenadora = pode criar outros membros; MembroDoProjeto = CRUD de eventos';

-- ============================================================================
-- 4. TABELA: eventos (núcleo do sistema)
-- ============================================================================
-- RF02/RF04/RF08: Cadastro e exibição de eventos
-- RF05: Status público do evento
-- RF06/RF09: Link de inscrição externo (Google Forms)

create table public.eventos (
  id              bigint generated always as identity primary key,
  titulo          text not null,
  tipo_evento     public.tipo_evento_enum not null,
  vagas           integer check (vagas >= 0),
  data_evento     date not null,
  horario_inicio  time not null,
  horario_termino time,
  local           text not null,
  descricao       text not null,
  status          public.status_evento_enum not null default 'Em breve',
  link_inscricao  text,
  imagem_capa_url text
);

comment on table  public.eventos is 'Eventos do projeto Meninas Digitais';
comment on column public.eventos.imagem_capa_url is 'URL da imagem no Supabase Storage (bucket: capas-eventos)';
comment on column public.eventos.link_inscricao is 'URL do Google Forms para inscrição externa';
comment on column public.eventos.vagas is 'Número total de vagas (null = sem limite)';

-- ============================================================================
-- 5. ÍNDICES DE PERFORMANCE
-- ============================================================================

-- Busca por data (RF01: Calendário interativo)
create index idx_eventos_data_evento on public.eventos (data_evento);

-- Filtro por tipo (RF03: Filtro por tipo de tag)
create index idx_eventos_tipo on public.eventos (tipo_evento);

-- Filtro por status (RF05: Indicador de status)
create index idx_eventos_status on public.eventos (status);

-- Índice composto para listagem ordenada (RF02: Listagem cronológica)
create index idx_eventos_status_data on public.eventos (status, data_evento desc);

-- Busca por texto no título (RF03: Busca por palavras-chave)
create index idx_eventos_titulo_trgm on public.eventos using gin (titulo gin_trgm_ops);

-- Índice para FK do administrador
create index idx_administradores_auth_user on public.administradores (auth_user_id);

-- ============================================================================
-- 6. SEGURANÇA
-- ============================================================================

alter table public.administradores enable row level security;
alter table public.eventos enable row level security;

-- ---- EVENTOS ----

-- Público pode LER todos os eventos (página pública)
create policy "Eventos são públicos para leitura"
  on public.eventos for select
  to anon, authenticated
  using (true);

-- Admins autenticados podem INSERIR eventos
create policy "Admins podem criar eventos"
  on public.eventos for insert
  to authenticated
  with check (
    exists (
      select 1 from public.administradores
      where auth_user_id = auth.uid()
    )
  );

-- Admins autenticados podem ATUALIZAR eventos
create policy "Admins podem editar eventos"
  on public.eventos for update
  to authenticated
  using (
    exists (
      select 1 from public.administradores
      where auth_user_id = auth.uid()
    )
  );

-- Admins autenticados podem DELETAR eventos
create policy "Admins podem excluir eventos"
  on public.eventos for delete
  to authenticated
  using (
    exists (
      select 1 from public.administradores
      where auth_user_id = auth.uid()
    )
  );

-- ---- ADMINISTRADORES ----

-- Admins podem ver seus próprios dados
create policy "Admin vê próprio perfil"
  on public.administradores for select
  to authenticated
  using (auth_user_id = auth.uid());

-- Coordenadoras podem ver todos os admins
create policy "Coordenadora vê todos os admins"
  on public.administradores for select
  to authenticated
  using (
    exists (
      select 1 from public.administradores
      where auth_user_id = auth.uid() and role = 'Coordenadora'
    )
  );

-- Apenas coordenadoras podem criar novos membros
create policy "Coordenadora pode criar membros"
  on public.administradores for insert
  to authenticated
  with check (
    exists (
      select 1 from public.administradores
      where auth_user_id = auth.uid() and role = 'Coordenadora'
    )
  );

-- Apenas coordenadoras podem atualizar membros
create policy "Coordenadora pode editar membros"
  on public.administradores for update
  to authenticated
  using (
    exists (
      select 1 from public.administradores
      where auth_user_id = auth.uid() and role = 'Coordenadora'
    )
  );

-- ============================================================================
-- 7. STORAGE - BUCKET PARA IMAGENS DE CAPA
-- ============================================================================

-- Criar bucket público para imagens de capa dos eventos
insert into storage.buckets (id, name, public)
values ('capas-eventos', 'capas-eventos', true);

-- Política: qualquer pessoa pode VER as imagens (público)
create policy "Imagens de capa são públicas"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'capas-eventos');

-- Política: apenas admins podem fazer UPLOAD
create policy "Admins podem fazer upload de capas"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'capas-eventos'
    and exists (
      select 1 from public.administradores
      where auth_user_id = auth.uid()
    )
  );

-- Política: apenas admins podem ATUALIZAR imagens
create policy "Admins podem atualizar capas"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'capas-eventos'
    and exists (
      select 1 from public.administradores
      where auth_user_id = auth.uid()
    )
  );

-- Política: apenas admins podem DELETAR imagens
create policy "Admins podem deletar capas"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'capas-eventos'
    and exists (
      select 1 from public.administradores
      where auth_user_id = auth.uid()
    )
  );
