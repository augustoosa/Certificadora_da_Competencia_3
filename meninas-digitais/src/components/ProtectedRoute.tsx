import { Navigate, Outlet } from 'react-router-dom'
import { LoaderCircle } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

export function ProtectedRoute() {
  const { session, administrador, loading } = useAuth()

  if (loading) {
    return <div className="min-h-screen grid place-items-center bg-gray-50"><LoaderCircle className="animate-spin text-md-roxo" size={36} /></div>
  }

  if (!session || !administrador) return <Navigate to="/login" replace />
  return <Outlet />
}
