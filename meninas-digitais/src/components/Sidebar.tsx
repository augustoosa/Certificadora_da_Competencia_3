import { Calendar, LayoutDashboard, Plus, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Definimos que a Sidebar precisa receber uma função para abrir o modal
interface SidebarProps {
  onOpenModal: () => void;
}

export function Sidebar({ onOpenModal }: SidebarProps) {
  const { administrador, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login', { replace: true });
  };
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex">
      
      {/* Logo */}
      <div className="h-20 flex items-center px-6 border-b border-gray-100">
        <div className="bg-fuchsia-600 p-2  text-white mr-3 shadow-sm">
          <Calendar size={20} strokeWidth={2.5} />
        </div>
        <div>
          <h2 className="font-bold text-gray-900 leading-tight">Admin</h2>
          <span className="text-xs text-gray-500 font-medium">Meninas Digitais</span>
        </div>
      </div>

      {/* Menu de Navegação */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        <button className="w-full flex items-center gap-3 px-4 py-3 bg-fuchsia-50 text-fuchsia-700  font-semibold transition-colors">
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </button>
        
        {/* Aqui chamamos a função que veio do Dashboard para abrir o modal */}
        <button 
          onClick={onOpenModal}
          className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900  font-medium transition-colors text-left"
        >
          <Plus size={20} />
          <span>Novo Evento</span>
        </button>
      </nav>

      {/* Rodapé da Sidebar (Usuário e Sair) */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="w-10 h-10 rounded-full bg-fuchsia-600 flex items-center justify-center text-white font-bold text-lg">
            A
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-gray-900 truncate">{administrador?.nome ?? 'Administradora'}</p>
            <p className="text-xs text-gray-500 truncate">{administrador?.email}</p>
          </div>
        </div>
        
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors w-full"
        >
          <LogOut size={18} />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
}
