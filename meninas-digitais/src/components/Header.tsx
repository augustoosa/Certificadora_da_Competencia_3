import { Calendar, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="w-full bg-white py-4 px-6 md:px-12 flex items-center justify-between shadow-sm border-b border-gray-100">
      
      <div className="flex items-center gap-3">
        {/* Usando o Roxo Oficial */}
        <div className="bg-md-roxo p-2  text-white">
          <Calendar size={28} strokeWidth={2.5} />
        </div>
        
        <div className="flex flex-col">
          {/* Nome com a cor principal */}
          <span className="text-xl font-bold text-md-roxo leading-none">Meninas Digitais</span>
          <span className="text-xs font-medium text-gray-500 mt-1 tracking-wide">UTFPR - Cornélio Procópio</span>
        </div>
      </div>

      <Link
        to="/login"
        /* Usando Azul Oficial no botão de login */
        className="flex items-center gap-2 text-md-azul font-medium hover:text-md-roxo transition-colors"
      >
        <LogIn size={20} />
        <span className="hidden sm:inline">Espaço da Equipe</span>
      </Link>
      
    </header>
  );
}