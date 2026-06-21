import { Clock, Users, ExternalLink, Edit2, Trash2, MapPin } from 'lucide-react'
import type { Evento } from '../types/database'
import { formatDate, formatTime, isPastEvent } from '../utils/events'

interface AdminEventCardProps {
  event: Evento
  previous?: boolean
  deleting: boolean
  onEdit: (event: Evento) => void
  onDelete: (event: Evento) => void
}

function AdminEventCard({ event, previous = false, deleting, onEdit, onDelete }: AdminEventCardProps) {
  return (
    <article className={`bg-white border border-gray-100 p-6 shadow-sm flex flex-col xl:flex-row gap-6 justify-between items-start xl:items-center ${previous ? 'opacity-65' : ''}`}>
      <div className="space-y-3 flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-3">
          <span className="bg-fuchsia-100 text-md-roxo text-xs font-bold px-3 py-1 rounded-full">{event.tipo_evento}</span>
          <span className="text-sm text-gray-500 font-medium">{formatDate(event.data_evento)}</span>
          <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full">{event.status}</span>
        </div>
        <h3 className="font-bold text-lg text-slate-900">{event.titulo}</h3>
        <p className="text-sm text-gray-600 line-clamp-2 max-w-4xl">{event.descricao}</p>
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 pt-1">
          <div className="flex items-center gap-1.5"><Clock size={16} /> {formatTime(event.horario_inicio)}</div>
          <div className="flex items-center gap-1.5"><MapPin size={16} /> {event.local}</div>
          <div className="flex items-center gap-1.5"><Users size={16} /> {event.vagas === null ? 'Sem limite' : `${event.vagas} vagas`}</div>
        </div>
      </div>
      <div className="flex items-center gap-2 w-full xl:w-auto justify-end border-t xl:border-t-0 pt-4 xl:pt-0">
        {event.link_inscricao && (
          <a href={event.link_inscricao} target="_blank" rel="noopener noreferrer" className="p-2.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100" title="Abrir inscrição">
            <ExternalLink size={20} />
          </a>
        )}
        <button onClick={() => onEdit(event)} className="p-2.5 text-gray-400 hover:text-md-roxo hover:bg-fuchsia-50" title="Editar"><Edit2 size={20} /></button>
        <button disabled={deleting} onClick={() => onDelete(event)} className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 disabled:opacity-40" title="Excluir"><Trash2 size={20} /></button>
      </div>
    </article>
  )
}

interface AdminEventListProps {
  events: Evento[]
  deletingId: number | null
  onEdit: (event: Evento) => void
  onDelete: (event: Evento) => void
}

export function AdminEventList({ events, deletingId, onEdit, onDelete }: AdminEventListProps) {
  const upcoming = events.filter((event) => !isPastEvent(event) && event.status !== 'Encerrado')
  const previous = events.filter((event) => isPastEvent(event) || event.status === 'Encerrado')

  if (events.length === 0) {
    return <div className="bg-white border border-gray-100 p-8 text-center text-gray-500">Nenhum evento cadastrado.</div>
  }

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold text-slate-900 mb-4">Próximos Eventos</h2>
      <div className="space-y-4 mb-10">
        {upcoming.length ? upcoming.map((event) => <AdminEventCard key={event.id} event={event} deleting={deletingId === event.id} onEdit={onEdit} onDelete={onDelete} />) : <p className="bg-white border border-gray-100 p-5 text-gray-500">Nenhum próximo evento.</p>}
      </div>
      <h2 className="text-xl font-bold text-slate-900 mb-4">Eventos Anteriores</h2>
      <div className="space-y-4">
        {previous.length ? previous.map((event) => <AdminEventCard key={event.id} event={event} previous deleting={deletingId === event.id} onEdit={onEdit} onDelete={onDelete} />) : <p className="bg-white border border-gray-100 p-5 text-gray-500">Nenhum evento anterior.</p>}
      </div>
    </div>
  )
}
