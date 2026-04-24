

export interface Evento {
  id: string;
  titulo: string;
  tipo_evento: 'Oficina' | 'Minicurso' | 'Roda de Conversa';
  data_evento: string;
  horario_inicio: string;
  horario_termino: string;
  local: string;
  descricao: string;
  status: 'Em breve' | 'Inscrições Abertas' | 'Cancelado' | 'Encerrado';
  link_inscricao?: string;
  imagem_url?: string;
  created_at: string;
}