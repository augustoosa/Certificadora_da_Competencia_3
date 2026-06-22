import type { Evento } from '../types/database'

export const EVENTO_TIPOS = ['Oficina', 'Minicurso', 'Roda de Conversa', 'Palestra', 'Workshop', 'Hackathon', 'Outro'] as const
export const EVENTO_STATUS = ['Em breve', 'Inscrições Abertas', 'Em Andamento', 'Encerrado', 'Cancelado'] as const

export function formatDate(date: string) {
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${date}T00:00:00Z`))
}

export function formatTime(time: string | null) {
  return time ? time.slice(0, 5) : ''
}

export function eventDuration(start: string | null, end: string | null) {
  if (!start) return 'Horário a definir'
  if (!end) return 'horário de término não informado'
  const [startHour, startMinute] = start.split(':').map(Number)
  const [endHour, endMinute] = end.split(':').map(Number)
  const minutes = endHour * 60 + endMinute - startHour * 60 - startMinute
  if (minutes <= 0) return `até ${formatTime(end)}`
  const hours = Math.floor(minutes / 60)
  const remainder = minutes % 60
  return [hours ? `${hours}h` : '', remainder ? `${remainder}min` : ''].filter(Boolean).join(' ')
}

export function isPastEvent(event: Evento) {
  const end = event.horario_termino ?? event.horario_inicio ?? '23:59:59'
  return new Date(`${event.data_evento}T${end}`) < new Date()
}
