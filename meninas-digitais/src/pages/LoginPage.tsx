import { ArrowLeft, Lock, Mail, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
// Importamos a logo para usar no topo do formulário
import logoMd from '../assets/logo_meninas_digitais.png';

export function LoginPage() {
  return (
    <div className="min-h-screen bg-md-fundo flex flex-col items-center py-12 px-4 relative overflow-y-auto">
      
      {/* Botão Voltar */}
      <div className="w-full max-w-md mb-8">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-md-roxo hover:text-md-azul font-semibold transition-colors w-fit"
        >
          <ArrowLeft size={20} />
          <span>Voltar para a página inicial</span>
        </Link>
      </div>

      <div className="w-full max-w-md flex flex-col items-center">
        
        {/* CABEÇALHO DO LOGIN: Trocamos o cadeado pela Logo */}
        <div className="mb-6">
          <img 
            src={logoMd} 
            alt="Logo Meninas Digitais" 
            className="h-20 w-auto object-contain drop-shadow-sm" 
          />
        </div>

        <h1 className="text-3xl font-bold text-slate-900 mb-2">Área Administrativa</h1>
        <p className="text-slate-500 mb-8 text-center font-medium">
          Acesso restrito às administradoras do projeto
        </p>

        {/* Formulário */}
        <div className="bg-white w-full rounded-3xl shadow-sm border border-gray-100 p-8">
          
          <form className="flex flex-col gap-5">
            {/* Campo de Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-slate-700 ml-1">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail size={20} className="text-gray-400" />
                </div>
                <input 
                  type="email" 
                  placeholder="admin@meninasdigitais.edu.br" 
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200  focus:outline-none focus:ring-2 focus:ring-md-roxo focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Campo de Senha */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-slate-700 ml-1">Senha</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  {/* Mantivemos este cadeado porque ele ajuda a identificar o tipo do campo */}
                  <Lock size={20} className="text-gray-400" />
                </div>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200  focus:outline-none focus:ring-2 focus:ring-md-roxo focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Botão de Entrar com as cores da marca */}
            <Link 
              to="/admin"
              className="mt-2 w-full bg-md-roxo hover:bg-md-azul text-white font-bold py-3.5  flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
            >
              <LogIn size={20} />
              <span>Entrar</span>
            </Link>
          </form>

          {/* Credenciais de Demo */}
          <div className="mt-8 bg-md-fundo/50  p-5 border border-md-roxo/10">
            <h3 className="text-sm font-bold text-md-roxo mb-2">Acesso Rápido:</h3>
            <p className="text-sm text-slate-600 flex flex-col gap-1">
              <span>Email: <span className="font-bold select-all text-md-roxo">admin@meninasdigitais.edu.br</span></span>
              <span>Senha: <span className="font-bold select-all text-md-roxo">admin123</span></span>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}