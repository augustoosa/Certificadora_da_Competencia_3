import { useCallback, useEffect, useMemo, useState } from 'react'
import { Plus, Calendar as CalendarIcon, Clock, LoaderCircle, Users } from 'lucide-react'
import { Sidebar } from '../components/Sidebar'
import { AdminEventList } from '../components/AdminEventList'
import { CreateEventModal } from '../components/CreateEventModal'
import { listEvents, removeEvent } from '../services/events'
import { isPastEvent } from '../utils/events'
import type { Evento } from '../types/database'

export function AdminDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [events, setEvents] = useState<Evento[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [editingEvent, setEditingEvent] = useState<Evento | null>(null)
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const loadEvents = useCallback(async (showLoading = true) => {
    if (showLoading) setLoading(true)
    setError('')
    await listEvents()
      .then(setEvents)
      .catch(() => setError('Não foi possível carregar os eventos.'))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    listEvents()
      .then(setEvents)
      .catch(() => setError('Não foi possível carregar os eventos.'))
      .finally(() => setLoading(false))
  }, [])

  const openCreate = () => {
    setEditingEvent(null)
    setIsModalOpen(true)
  }

  const openEdit = (event: Evento) => {
    setEditingEvent(event)
    setIsModalOpen(true)
  }

  const handleSaved = (successMessage: string) => {
    setIsModalOpen(false)
    setEditingEvent(null)
    setMessage(successMessage)
    void loadEvents(false)
  }

  const handleDelete = async (event: Evento) => {
    if (!window.confirm(`Excluir o evento “${event.titulo}”? Esta ação não pode ser desfeita.`)) return
    setDeletingId(event.id)
    setError('')
    setMessage('')
    try {
      await removeEvent(event)
      setEvents((current) => current.filter(({ id }) => id !== event.id))
      setMessage('Evento excluído com sucesso.')
    } catch {
      setError('Não foi possível excluir o evento.')
    } finally {
      setDeletingId(null)
    }
  }

  const summary = useMemo(() => ({
    total: events.length,
    upcoming: events.filter((event) => !isPastEvent(event) && !['Encerrado', 'Cancelado'].includes(event.status)).length,
    vacancies: events.reduce((total, event) => total + (event.vagas ?? 0), 0),
  }), [events])

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans relative">
      <Sidebar onOpenModal={openCreate} />
      <main className="flex-1 p-6 md:p-10 overflow-y-auto bg-gray-50">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Gerenciar Eventos</h1>
              <p className="text-slate-500 mt-1">Gerencie todos os eventos do projeto Meninas Digitais</p>
            </div>
            <button onClick={openCreate} className="bg-gradient-to-r from-md-roxo to-md-rosa hover:from-md-azul hover:to-md-roxo text-white px-5 py-2.5 font-semibold flex items-center gap-2 shadow-sm">
              <Plus size={20} /> Novo Evento
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <SummaryCard label="Total de Eventos" value={summary.total} icon={<CalendarIcon size={24} />} color="bg-fuchsia-100 text-md-roxo" />
            <SummaryCard label="Próximos Eventos" value={summary.upcoming} icon={<Clock size={24} />} color="bg-green-100 text-green-600" />
            <SummaryCard label="Total de Vagas" value={summary.vacancies} icon={<Users size={24} />} color="bg-blue-100 text-blue-600" />
          </div>

          {message && <div role="status" className="mb-6 bg-green-50 border border-green-200 text-green-700 px-5 py-4 flex justify-between gap-4">{message}<button onClick={() => setMessage('')} aria-label="Fechar mensagem">×</button></div>}
          {loading && <div className="bg-white border border-gray-100 p-8 flex items-center justify-center gap-3 text-md-roxo"><LoaderCircle className="animate-spin" /> Carregando eventos...</div>}
          {error && <div role="alert" className="bg-red-50 border border-red-200 text-red-700 px-5 py-4">{error}</div>}
          {!loading && !error && <AdminEventList events={events} deletingId={deletingId} onEdit={openEdit} onDelete={handleDelete} />}
        </div>
      </main>
      <CreateEventModal key={`${isModalOpen}-${editingEvent?.id ?? 'new'}`} isOpen={isModalOpen} event={editingEvent} onClose={() => setIsModalOpen(false)} onSaved={handleSaved} />
    </div>
  )
}

function SummaryCard({ label, value, icon, color }: { label: string; value: number; icon: React.ReactNode; color: string }) {
  return (
    <div className="bg-white p-6 border border-gray-100 shadow-sm flex items-center gap-4">
      <div className={`${color} p-4`}>{icon}</div>
      <div><p className="text-sm text-gray-500 font-medium mb-1">{label}</p><p className="text-3xl font-bold text-slate-900">{value}</p></div>
    </div>
  )
}
