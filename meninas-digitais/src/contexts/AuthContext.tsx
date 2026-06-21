import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '../services/supabase'
import type { Administrador } from '../types/database'

interface AuthState {
  session: Session | null
  administrador: Administrador | null
  loading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthState | undefined>(undefined)

async function getAdministrador(session: Session | null) {
  if (!session) return null
  const { data, error } = await supabase
    .from('administradores')
    .select('*')
    .eq('auth_user_id', session.user.id)
    .maybeSingle()
  if (error) throw error
  return data
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [administrador, setAdministrador] = useState<Administrador | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    const syncSession = async (nextSession: Session | null) => {
      setSession(nextSession)
      try {
        const perfil = await getAdministrador(nextSession)
        if (active) setAdministrador(perfil)
      } catch {
        if (active) setAdministrador(null)
      } finally {
        if (active) setLoading(false)
      }
    }

    void supabase.auth.getSession().then(({ data }) => syncSession(data.session))
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      window.setTimeout(() => void syncSession(nextSession), 0)
    })

    return () => {
      active = false
      listener.subscription.unsubscribe()
    }
  }, [])

  const signOut = async () => {
    await supabase.auth.signOut()
    setSession(null)
    setAdministrador(null)
  }

  return (
    <AuthContext.Provider value={{ session, administrador, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider')
  return context
}
