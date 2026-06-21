import { supabase } from './supabase'
import type { Evento } from '../types/database'

export async function listEvents() {
  const { data, error } = await supabase.from('eventos').select('*').order('data_evento').order('horario_inicio')
  if (error) throw error
  return data
}

export async function saveEvent(values: Omit<Evento, 'id'>, id?: number) {
  const query = id
    ? supabase.from('eventos').update(values).eq('id', id)
    : supabase.from('eventos').insert(values)
  const { data, error } = await query.select().single()
  if (error) throw error
  return data
}

export async function removeEvent(event: Evento) {
  const { error } = await supabase.from('eventos').delete().eq('id', event.id)
  if (error) throw error
  if (event.imagem_capa_url) await removeCover(event.imagem_capa_url)
}

export async function uploadCover(file: File) {
  const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg'
  const path = `${crypto.randomUUID()}.${extension}`
  const { error } = await supabase.storage.from('capas-eventos').upload(path, file, { contentType: file.type, upsert: false })
  if (error) throw error
  return supabase.storage.from('capas-eventos').getPublicUrl(path).data.publicUrl
}

export async function removeCover(url: string) {
  const marker = '/capas-eventos/'
  const path = decodeURIComponent(url.split(marker)[1] ?? '')
  if (!path) return
  const { error } = await supabase.storage.from('capas-eventos').remove([path])
  if (error) console.error('Não foi possível remover imagem antiga:', error.message)
}
