import { Calendar, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="w-full bg-white py-4 px-6 md:px-12 flex items-center justify-between shadow-sm">
      
      {/* Lado Esquerdo: Logo e Títulos */}
      <div className="flex items-center gap-3">
        {/* Ícone com fundo roxo/rosa */}
        <div className="bg-fuchsia-600 p-2 rounded-xl text-white">
          <Calendar size={28} strokeWidth={2.5} />
        </div>
        
        {/* Textos */}
        <div className="flex flex-col">
          <span className="text-xl font-bold text-fuchsia-600 leading-none">Meninas Digitais</span>
          <span className="text-xs text-gray-500 mt-1">UTFPR - Cornélio Procópio</span>
        </div>
      </div>

      {/* Lado Direito: Botão de Login */}
      <Link
        to="/login"
        className="flex items-center gap-2 text-fuchsia-600 font-medium hover:text-fuchsia-800 transition-colors"
      >
        <LogIn size={20} />
        <span className="hidden sm:inline">Área Administrativa</span>
      </Link>
      
    </header>
  );
}