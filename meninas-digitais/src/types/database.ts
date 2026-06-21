export type Database = {
  __InternalSupabase: { PostgrestVersion: '14.5' }
  public: {
    Tables: {
      administradores: {
        Row: { id: number; auth_user_id: string; nome: string; email: string; role: AdminRole }
        Insert: { id?: never; auth_user_id: string; nome: string; email: string; role?: AdminRole }
        Update: { id?: never; auth_user_id?: string; nome?: string; email?: string; role?: AdminRole }
        Relationships: []
      }
      eventos: {
        Row: Evento
        Insert: EventoInsert
        Update: Partial<EventoInsert>
        Relationships: []
      }
    }
    Views: { [_ in never]: never }
    Functions: { [_ in never]: never }
    Enums: {
      admin_role_enum: AdminRole
      status_evento_enum: EventoStatus
      tipo_evento_enum: EventoTipo
    }
    CompositeTypes: { [_ in never]: never }
  }
}

export type AdminRole = 'Coordenadora' | 'MembroDoProjeto'
export type EventoStatus = 'Em breve' | 'Inscrições Abertas' | 'Em Andamento' | 'Encerrado' | 'Cancelado'
export type EventoTipo = 'Oficina' | 'Minicurso' | 'Roda de Conversa' | 'Palestra' | 'Workshop' | 'Hackathon' | 'Outro'

export type Evento = {
  id: number
  titulo: string
  tipo_evento: EventoTipo
  vagas: number | null
  data_evento: string
  horario_inicio: string
  horario_termino: string | null
  local: string
  descricao: string
  status: EventoStatus
  link_inscricao: string | null
  imagem_capa_url: string | null
}

export type EventoInsert = Omit<Evento, 'id'>
export type Administrador = Database['public']['Tables']['administradores']['Row']
