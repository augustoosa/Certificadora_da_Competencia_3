import { useState, type FormEvent } from 'react'
import { LoaderCircle, X } from 'lucide-react'
import type { Evento, EventoInsert, EventoStatus, EventoTipo } from '../types/database'
import { EVENTO_STATUS, EVENTO_TIPOS } from '../utils/events'
import { removeCover, saveEvent, uploadCover } from '../services/events'

interface EventModalProps {
  isOpen: boolean
  event: Evento | null
  onClose: () => void
  onSaved: (message: string) => void
}

const emptyForm = {
  titulo: '', tipo_evento: 'Oficina' as EventoTipo, vagas: '', data_evento: '',
  horario_inicio: '', horario_termino: '', local: '', descricao: '',
  status: 'Em breve' as EventoStatus, link_inscricao: '',
}

function formFromEvent(event: Evento | null) {
  return event ? {
    titulo: event.titulo,
    tipo_evento: event.tipo_evento,
    vagas: event.vagas?.toString() ?? '',
    data_evento: event.data_evento,
    horario_inicio: event.horario_inicio.slice(0, 5),
    horario_termino: event.horario_termino?.slice(0, 5) ?? '',
    local: event.local,
    descricao: event.descricao,
    status: event.status,
    link_inscricao: event.link_inscricao ?? '',
  } : emptyForm
}

export function CreateEventModal({ isOpen, event, onClose, onSaved }: EventModalProps) {
  const [form, setForm] = useState(() => formFromEvent(event))
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  if (!isOpen) return null

  const setField = <K extends keyof typeof form>(field: K, value: (typeof form)[K]) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const handleFile = (selected: File | null) => {
    setError('')
    if (!selected) return setFile(null)
    if (!selected.type.startsWith('image/')) return setError('Selecione um arquivo de imagem.')
    if (selected.size > 5 * 1024 * 1024) return setError('A imagem deve ter no máximo 5 MB.')
    setFile(selected)
  }

  const handleSubmit = async (submitEvent: FormEvent) => {
    submitEvent.preventDefault()
    setError('')

    if (form.horario_termino && form.horario_termino <= form.horario_inicio) {
      setError('Horário de término deve ser posterior ao início.')
      return
    }

    setSaving(true)
    let uploadedUrl: string | null = null
    try {
      if (file) uploadedUrl = await uploadCover(file)

      const values: EventoInsert = {
        titulo: form.titulo.trim(),
        tipo_evento: form.tipo_evento,
        vagas: form.vagas === '' ? null : Number(form.vagas),
        data_evento: form.data_evento,
        horario_inicio: form.horario_inicio,
        horario_termino: form.horario_termino || null,
        local: form.local.trim(),
        descricao: form.descricao.trim(),
        status: form.status,
        link_inscricao: form.link_inscricao.trim() || null,
        imagem_capa_url: uploadedUrl ?? event?.imagem_capa_url ?? null,
      }

      await saveEvent(values, event?.id)
      if (uploadedUrl && event?.imagem_capa_url) await removeCover(event.imagem_capa_url)
      onSaved(event ? 'Evento atualizado com sucesso.' : 'Evento cadastrado com sucesso.')
    } catch (saveError) {
      if (uploadedUrl) await removeCover(uploadedUrl)
      setError(saveError instanceof Error ? saveError.message : 'Não foi possível salvar o evento.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="event-modal-title">
      <button className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} aria-label="Fechar modal" />
      <form onSubmit={handleSubmit} className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden max-h-[95vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
          <h2 id="event-modal-title" className="text-xl font-bold text-slate-900">{event ? 'Editar Evento' : 'Cadastrar Novo Evento'}</h2>
          <button type="button" onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full text-gray-500" aria-label="Fechar"><X size={24} /></button>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-5 overflow-y-auto">
          {error && <div role="alert" className="md:col-span-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">{error}</div>}
          <Field label="Título do Evento" wide><input required value={form.titulo} onChange={(e) => setField('titulo', e.target.value)} type="text" maxLength={150} className="input" /></Field>
          <Field label="Tipo"><select value={form.tipo_evento} onChange={(e) => setField('tipo_evento', e.target.value as EventoTipo)} className="input">{EVENTO_TIPOS.map((type) => <option key={type}>{type}</option>)}</select></Field>
          <Field label="Status"><select value={form.status} onChange={(e) => setField('status', e.target.value as EventoStatus)} className="input">{EVENTO_STATUS.map((status) => <option key={status}>{status}</option>)}</select></Field>
          <Field label="Vagas (vazio = sem limite)"><input value={form.vagas} onChange={(e) => setField('vagas', e.target.value)} type="number" min="0" step="1" className="input" /></Field>
          <Field label="Data"><input required value={form.data_evento} onChange={(e) => setField('data_evento', e.target.value)} type="date" className="input" /></Field>
          <Field label="Horário de início"><input required value={form.horario_inicio} onChange={(e) => setField('horario_inicio', e.target.value)} type="time" className="input" /></Field>
          <Field label="Horário de término"><input value={form.horario_termino} onChange={(e) => setField('horario_termino', e.target.value)} type="time" className="input" /></Field>
          <Field label="Local" wide><input required value={form.local} onChange={(e) => setField('local', e.target.value)} type="text" maxLength={200} className="input" /></Field>
          <Field label="Imagem de Capa (opcional)" wide>
            <input onChange={(e) => handleFile(e.target.files?.[0] ?? null)} type="file" accept="image/*" className="input file:mr-4 file:border-0 file:bg-fuchsia-50 file:text-fuchsia-700" />
            <span className="text-xs text-gray-500">PNG, JPG ou WebP, até 5 MB. Sem arquivo, usa logo oficial.</span>
          </Field>
          <Field label="Link de Inscrição" wide><input value={form.link_inscricao} onChange={(e) => setField('link_inscricao', e.target.value)} type="url" placeholder="https://forms.gle/..." className="input" /></Field>
          <Field label="Descrição" wide><textarea required value={form.descricao} onChange={(e) => setField('descricao', e.target.value)} rows={4} maxLength={2000} className="input resize-none" /></Field>
        </div>

        <div className="flex items-center justify-end gap-3 p-6 bg-gray-50 border-t border-gray-100">
          <button type="button" onClick={onClose} disabled={saving} className="px-6 py-2.5 text-gray-600 font-semibold">Cancelar</button>
          <button disabled={saving} className="px-6 py-2.5 bg-md-roxo disabled:opacity-60 text-white font-semibold flex items-center gap-2">
            {saving && <LoaderCircle size={18} className="animate-spin" />}{saving ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </form>
    </div>
  )
}

function Field({ label, wide = false, children }: { label: string; wide?: boolean; children: React.ReactNode }) {
  return <label className={`${wide ? 'md:col-span-2' : ''} flex flex-col gap-1.5 text-sm font-semibold text-gray-700`}>{label}{children}</label>
}
