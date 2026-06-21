import { useState, type FormEvent } from 'react'
import { ArrowLeft, LoaderCircle, Lock, Mail, LogIn } from 'lucide-react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import logoMd from '../assets/logo_meninas_digitais.png'
import { supabase } from '../services/supabase'
import { useAuth } from '../contexts/AuthContext'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { session, administrador, loading } = useAuth()
  const navigate = useNavigate()

  if (!loading && session && administrador) return <Navigate to="/admin" replace />

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setError('')
    setSubmitting(true)
    const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password: senha })

    if (authError) {
      setError('E-mail ou senha incorretos.')
      setSubmitting(false)
      return
    }

    const { data: perfil, error: perfilError } = await supabase
      .from('administradores').select('id').eq('auth_user_id', data.user.id).maybeSingle()

    if (perfilError || !perfil) {
      await supabase.auth.signOut()
      setError('Usuário sem permissão administrativa.')
      setSubmitting(false)
      return
    }

    navigate('/admin', { replace: true })
  }

  return (
    <div className="min-h-screen bg-md-fundo flex items-center justify-center py-24 px-4 relative">
      <Link to="/" className="absolute top-6 left-6 md:top-10 md:left-10 flex items-center gap-2 text-md-roxo hover:text-md-azul font-semibold">
        <ArrowLeft size={20} /> Voltar para a página inicial
      </Link>
      <div className="w-full max-w-md flex flex-col items-center">
        <img src={logoMd} alt="Logo Meninas Digitais" className="h-20 w-auto mb-6" />
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Área Administrativa</h1>
        <p className="text-slate-500 mb-8 text-center font-medium">Acesso restrito às administradoras do projeto</p>
        <form onSubmit={handleSubmit} className="bg-white w-full rounded-3xl shadow-sm border border-gray-100 p-8 flex flex-col gap-5">
          {error && <div role="alert" className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">{error}</div>}
          <label className="flex flex-col gap-1.5 text-sm font-bold text-slate-700">
            Email
            <span className="relative">
              <Mail size={20} className="absolute left-4 top-3.5 text-gray-400" />
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required autoComplete="email" className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-md-roxo" />
            </span>
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-bold text-slate-700">
            Senha
            <span className="relative">
              <Lock size={20} className="absolute left-4 top-3.5 text-gray-400" />
              <input value={senha} onChange={(e) => setSenha(e.target.value)} type="password" required autoComplete="current-password" className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-md-roxo" />
            </span>
          </label>
          <button disabled={submitting} className="mt-2 w-full bg-md-roxo hover:bg-md-azul disabled:opacity-60 text-white font-bold py-3.5 flex items-center justify-center gap-2">
            {submitting ? <LoaderCircle size={20} className="animate-spin" /> : <LogIn size={20} />}
            {submitting ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}
