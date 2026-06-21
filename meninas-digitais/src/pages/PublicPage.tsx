import { useEffect, useState } from 'react'
import { LoaderCircle, Sparkles } from 'lucide-react'
import { Header } from '../components/Header'
import { EventCard } from '../components/EventCard'
import { listEvents } from '../services/events'
import type { Evento } from '../types/database'

export function PublicPage() {
  const [events, setEvents] = useState<Evento[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    listEvents()
      .then(setEvents)
      .catch(() => setError('Não foi possível carregar os eventos. Tente novamente mais tarde.'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-md-fundo">
      <Header />
      <main className="p-6 md:p-10">
        <div className="max-w-[1400px] mx-auto flex flex-col items-center w-full">
          <div className="flex items-center gap-2 bg-md-rosa/10 text-md-rosa px-4 py-1.5 rounded-full text-sm font-semibold mb-6"><Sparkles size={16} /> Meninas no Lab</div>
          <h1 className="text-4xl md:text-5xl font-bold text-center text-slate-900 mb-4">Calendário de Eventos</h1>
          <p className="text-center text-slate-600 mb-16 max-w-2xl text-lg">Descubra oficinas, minicursos e rodas de conversa que vão transformar sua relação com a tecnologia</p>
          {loading && <div className="flex items-center gap-3 text-md-roxo"><LoaderCircle className="animate-spin" /> Carregando eventos...</div>}
          {error && <div role="alert" className="bg-red-50 border border-red-200 text-red-700 px-5 py-4">{error}</div>}
          {!loading && !error && events.length === 0 && <div className="bg-white border border-gray-100 p-8 text-slate-500 text-center w-full">Nenhum evento cadastrado no momento.</div>}
          {!loading && !error && events.length > 0 && <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">{events.map((event) => <EventCard key={event.id} event={event} />)}</div>}
        </div>
      </main>
    </div>
  )
}
