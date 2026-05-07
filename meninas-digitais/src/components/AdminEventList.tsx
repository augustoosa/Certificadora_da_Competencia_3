import { Clock, Users, ExternalLink, Edit2, Trash2, MapPin } from 'lucide-react';

export function AdminEventList() {
  return (
    <div className="w-full">
      {/* Listagem: Próximos Eventos */}
      <h2 className="text-xl font-bold text-slate-900 mb-4">Próximos Eventos</h2>
      <div className="space-y-4 mb-10">
        
        {/* Card de Evento 1 */}
        <div className="bg-white border border-gray-100  p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col xl:flex-row gap-6 justify-between items-start xl:items-center">
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-3">
              <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">Minicurso</span>
              <span className="text-sm text-gray-500 font-medium">12 de maio de 2026</span>
            </div>
            <h3 className="font-bold text-lg text-slate-900">Minicurso: Design de Interfaces com Figma</h3>
            <p className="text-sm text-gray-600 line-clamp-2 max-w-4xl">Aprenda a criar interfaces de usuário profissionais usando o Figma, uma das ferramentas mais populares para design de produtos digitais. Desenvolva habilidades essenciais em UX/UI design.</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 pt-1">
              <div className="flex items-center gap-1.5"><Clock size={16} /> 09:00</div>
              <div className="flex items-center gap-1.5"><MapPin size={16} /> Laboratório de Informática - UTFPR</div>
              <div className="flex items-center gap-1.5"><Users size={16} /> 25 vagas</div>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full xl:w-auto justify-end border-t xl:border-t-0 pt-4 xl:pt-0">
            <button className="p-2.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100  transition-colors" title="Abrir página do evento"><ExternalLink size={20}/></button>
            <button className="p-2.5 text-gray-400 hover:text-fuchsia-600 hover:bg-fuchsia-50  transition-colors" title="Editar"><Edit2 size={20}/></button>
            <button className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50  transition-colors" title="Excluir"><Trash2 size={20}/></button>
          </div>
        </div>

        {/* Card de Evento 2 */}
        <div className="bg-white border border-gray-100  p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col xl:flex-row gap-6 justify-between items-start xl:items-center">
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-3">
              <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">Oficina</span>
              <span className="text-sm text-gray-500 font-medium">19 de maio de 2026</span>
            </div>
            <h3 className="font-bold text-lg text-slate-900">Oficina: Criação de Jogos com Python</h3>
            <p className="text-sm text-gray-600 line-clamp-2 max-w-4xl">Desenvolva seus próprios jogos usando Python e a biblioteca Pygame! Aprenda conceitos de programação orientada a objetos enquanto cria jogos divertidos e interativos.</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 pt-1">
              <div className="flex items-center gap-1.5"><Clock size={16} /> 14:00</div>
              <div className="flex items-center gap-1.5"><MapPin size={16} /> Laboratório de Informática - UTFPR</div>
              <div className="flex items-center gap-1.5"><Users size={16} /> 25 vagas</div>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full xl:w-auto justify-end border-t xl:border-t-0 pt-4 xl:pt-0">
            <button className="p-2.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100  transition-colors" title="Abrir página do evento"><ExternalLink size={20}/></button>
            <button className="p-2.5 text-gray-400 hover:text-fuchsia-600 hover:bg-fuchsia-50  transition-colors" title="Editar"><Edit2 size={20}/></button>
            <button className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50  transition-colors" title="Excluir"><Trash2 size={20}/></button>
          </div>
        </div>

      </div>

      {/* Listagem: Eventos Anteriores */}
      <h2 className="text-xl font-bold text-slate-900 mb-4">Eventos Anteriores</h2>
      <div className="bg-white border border-gray-200  p-5 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 opacity-60 grayscale-[30%]">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-3">
            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">Oficina</span>
            <span className="text-sm text-gray-500 font-medium hidden sm:inline">•</span>
            <span className="text-sm text-gray-500 font-medium">05 de maio de 2026</span>
          </div>
          <h3 className="font-bold text-slate-900 sm:ml-2">Oficina: Robótica com Arduino</h3>
        </div>
        <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50  transition-colors self-end sm:self-auto" title="Excluir">
          <Trash2 size={20}/>
        </button>
      </div>
    </div>
  );
}