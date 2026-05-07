import { useState } from 'react';
import { Plus, Calendar as CalendarIcon, Clock, Users } from 'lucide-react';
import { Sidebar } from '../components/Sidebar';
import { AdminEventList } from '../components/AdminEventList';
import { CreateEventModal } from '../components/CreateEventModal';

export function AdminDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans relative">
      
      {/* ================= BARRA LATERAL ================= */}
      <Sidebar onOpenModal={() => setIsModalOpen(true)} />

      {/* ================= CONTEÚDO PRINCIPAL ================= */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto bg-gray-50">
        
        {/* DIV QUE ABRE O LIMITE DE LARGURA */}
        <div className="max-w-[1400px] mx-auto">
          
          {/* Cabeçalho do Conteúdo */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Gerenciar Eventos</h1>
              <p className="text-slate-500 mt-1">Gerencie todos os eventos do projeto Meninas Digitais</p>
            </div>
            
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-md-roxo to-md-rosa hover:from-md-azul hover:to-md-roxo text-white px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all shadow-sm hover:shadow-md"
            >
              <Plus size={20} />
              Novo Evento
            </button>
          </div>

          {/* Cards de Resumo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="bg-fuchsia-100 p-4 rounded-xl text-md-roxo">
                <CalendarIcon size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium mb-1">Total de Eventos</p>
                <p className="text-3xl font-bold text-slate-900">6</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="bg-green-100 p-4 rounded-xl text-green-600">
                <Clock size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium mb-1">Próximos Eventos</p>
                <p className="text-3xl font-bold text-slate-900">2</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="bg-blue-100 p-4 rounded-xl text-blue-600">
                <Users size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium mb-1">Total de Vagas</p>
                <p className="text-3xl font-bold text-slate-900">175</p>
              </div>
            </div>
          </div>

          {/* ================= LISTA DE EVENTOS ================= */}
          <AdminEventList />

        {/* FECHAMENTO DA DIV QUE ESTAVA FALTANDO! */}
        </div> 

      </main>

      {/* ================= MODAL ================= */}
      <CreateEventModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

    </div>
  );
}