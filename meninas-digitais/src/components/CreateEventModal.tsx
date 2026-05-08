import { X } from 'lucide-react';

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void; // Tipo de uma função que não retorna nada
}

export function CreateEventModal({ isOpen, onClose }: CreateEventModalProps) {
  // Se o isOpen for falso, o React não renderiza nada na tela
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Fundo escurecido (Overlay) - note que ele chama o onClose ao ser clicado */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" 
        onClick={onClose} 
      />
      
      {/* Conteúdo do Modal */}
      <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 max-h-[95vh] flex flex-col">
        
        {/* Topo do Modal (Fixo) */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50 flex-shrink-0">
          <h2 className="text-xl font-bold text-slate-900">Cadastrar Novo Evento</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full text-gray-500">
            <X size={24} />
          </button>
        </div>

        {/* Formulário (Com Scroll Interno) */}
          <form className="p-8 grid grid-cols-1 md:grid-cols-2 gap-5 overflow-y-auto">
            <div className="md:col-span-2 flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">Título do Evento</label>
            <input type="text" placeholder="Ex: Oficina de Robótica" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200  focus:ring-2 focus:ring-fuchsia-500 outline-none" />
            </div>

            <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">Tipo</label>
            <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200  focus:ring-2 focus:ring-fuchsia-500 outline-none">
                <option>Oficina</option>
                <option>Minicurso</option>
                <option>Roda de Conversa</option>
            </select>
            </div>

            <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">Vagas</label>
            <input type="number" placeholder="0" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200  focus:ring-2 focus:ring-fuchsia-500 outline-none" />
            </div>

            <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">Data</label>
            <input type="date" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200  focus:ring-2 focus:ring-fuchsia-500 outline-none" />
            </div>

            <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">Horário</label>
            <input type="time" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200  focus:ring-2 focus:ring-fuchsia-500 outline-none" />
            </div>

            <div className="md:col-span-2 flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">Local</label>
            <input type="text" placeholder="Ex: Laboratório 1" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200  focus:ring-2 focus:ring-fuchsia-500 outline-none" />
            </div>

            {/* Novo Campo de Imagem */}
              <div className="md:col-span-2 flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700">Imagem de Capa (Opcional)</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200  focus:ring-2 focus:ring-fuchsia-500 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-fuchsia-50 file:text-fuchsia-700 hover:file:bg-fuchsia-100 transition-all text-sm text-gray-500 cursor-pointer" 
                />
                <p className="text-xs text-gray-500 mt-1">Se nenhuma imagem for escolhida, a logo oficial do Meninas Digitais será usada como capa.</p>
              </div>

            <div className="md:col-span-2 flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">Link de Inscrição (Google Forms)</label>
            <input type="url" placeholder="https://forms.gle/..." className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200  focus:ring-2 focus:ring-fuchsia-500 outline-none" />
            </div>

            <div className="md:col-span-2 flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">Descrição</label>
            <textarea rows={3} placeholder="Descreva brevemente o evento..." className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200  focus:ring-2 focus:ring-fuchsia-500 outline-none resize-none" />
            </div>
        </form>

        {/* Rodapé do Modal (Fixo embaixo) */}
        <div className="flex items-center justify-end gap-3 p-6 bg-gray-50 border-t border-gray-100 flex-shrink-0">
          <button onClick={onClose} className="px-6 py-2.5 text-gray-600 font-semibold">Cancelar</button>
          <button type="button" className="px-6 py-2.5 bg-md-roxo text-white font-semibold ">Confirmar</button>
        </div>
      </div>
    </div>
  );
}