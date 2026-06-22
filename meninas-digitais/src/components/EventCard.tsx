import { Calendar, Clock, MapPin, Users, ExternalLink } from 'lucide-react'
import defaultLogo from '../assets/logo_meninas_digitais.png'
import type { Evento } from '../types/database'
import { eventDuration, formatDate, formatTime } from '../utils/events'

const typeColors: Record<Evento['tipo_evento'], string> = {
  Minicurso: 'bg-md-verde text-white',
  Oficina: 'bg-md-azul text-white',
  'Roda de Conversa': 'bg-md-laranja text-white',
  Palestra: 'bg-md-roxo text-white',
  Workshop: 'bg-md-rosa text-white',
  Hackathon: 'bg-slate-800 text-white',
  Outro: 'bg-slate-500 text-white',
}

export function EventCard({ event }: { event: Evento }) {
  const imageToShow = event.imagem_capa_url || defaultLogo

  return (
    <article className="bg-white shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow h-full">
      <div className="relative h-48 w-full bg-md-fundo-claro flex-shrink-0 border-b border-gray-50">
        <img src={imageToShow} alt={event.titulo} className={`w-full h-full ${event.imagem_capa_url ? 'object-cover' : 'object-contain p-6 opacity-90'}`} />
        <span className={`absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full shadow-sm ${typeColors[event.tipo_evento]}`}>{event.tipo_evento}</span>
        <span className="absolute top-4 right-4 bg-white/95 text-slate-700 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">{event.status}</span>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h2 className="font-bold text-lg text-gray-900 leading-tight mb-2">{event.titulo}</h2>
        {event.descricao && <p className="text-sm text-gray-600 line-clamp-2 mb-4">{event.descricao}</p>}
        <div className="mt-auto space-y-2 text-sm text-gray-600 mb-6 font-medium">
          <div className="flex items-center gap-2"><Calendar size={16} className="text-md-roxo" /> {formatDate(event.data_evento)}</div>
          <div className="flex items-center gap-2"><Clock size={16} className="text-md-roxo" /> {event.horario_inicio ? `${formatTime(event.horario_inicio)} · ${eventDuration(event.horario_inicio, event.horario_termino)}` : 'Horário a definir'}</div>
          <div className="flex items-center gap-2"><MapPin size={16} className="text-md-roxo" /><span className="truncate">{event.local || 'Local a definir'}</span></div>
          <div className="flex items-center gap-2"><Users size={16} className="text-md-roxo" /> {event.vagas === null ? 'Sem limite de vagas' : `${event.vagas} vagas`}</div>
        </div>
        {event.link_inscricao && event.status !== 'Cancelado' && event.status !== 'Encerrado' && (
          <a href={event.link_inscricao} target="_blank" rel="noopener noreferrer" className="mt-auto w-full bg-md-rosa text-white font-semibold py-2.5 flex items-center justify-center gap-2">
            <ExternalLink size={18} /> Inscreva-se
          </a>
        )}
      </div>
    </article>
  )
}
