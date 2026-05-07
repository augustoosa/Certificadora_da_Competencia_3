import { ArrowLeft, Lock, Mail, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';

export function LoginPage() {
  return (
    <div className="min-h-screen bg-[#FDF4FF] flex flex-col items-center justify-center p-4 relative">
      
      {/* Botão de Voltar no topo */}
      <div className="absolute top-8 left-0 w-full flex justify-center">
        <div className="w-full max-w-md px-4">
          <Link to="/" className="flex items-center gap-2 text-fuchsia-600 hover:text-fuchsia-800 font-medium transition-colors w-fit">
            <ArrowLeft size={20} />
            <span>Voltar para página inicial</span>
          </Link>
        </div>
      </div>

      <div className="w-full max-w-md flex flex-col items-center">
        
        {/* Cabeçalho do Login */}
        <div className="bg-gradient-to-br from-fuchsia-600 to-pink-500 p-3  text-white mb-4 shadow-md">
          <Lock size={32} strokeWidth={2} />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Área Administrativa</h1>
        <p className="text-slate-500 mb-8 text-center">
          Acesso restrito às administradoras do projeto
        </p>

        {/* Caixinha Branca do Formulário */}
        <div className="bg-white w-full rounded-3xl shadow-sm border border-gray-100 p-8">
          
          <form className="flex flex-col gap-5">
            {/* Campo de Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700 ml-1">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail size={20} className="text-gray-400" />
                </div>
                <input 
                  type="email" 
                  placeholder="seu.email@utfpr.edu.br" 
                  className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200  focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Campo de Senha */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700 ml-1">Senha</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={20} className="text-gray-400" />
                </div>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200  focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Botão de Entrar */}
            {/* Como ainda não temos lógica, coloquei um Link provisório simulando o login com sucesso */}
            <Link 
              to="/admin"
              className="mt-2 w-full bg-gradient-to-r from-fuchsia-600 to-pink-500 hover:from-fuchsia-700 hover:to-pink-600 text-white font-semibold py-3.5  flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
            >
              <LogIn size={20} />
              <span>Entrar</span>
            </Link>
          </form>

          {/* Caixinha de Credenciais de Demonstração */}
          <div className="mt-8 bg-fuchsia-50/80  p-5 border border-fuchsia-100">
            <h3 className="text-sm font-bold text-fuchsia-800 mb-2">Credenciais de Demonstração:</h3>
            <p className="text-sm text-fuchsia-600 flex flex-col gap-1">
              <span>Email: <span className="font-medium select-all">admin@meninasdigitais.edu.br</span></span>
              <span>Senha: <span className="font-medium select-all">admin123</span></span>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}