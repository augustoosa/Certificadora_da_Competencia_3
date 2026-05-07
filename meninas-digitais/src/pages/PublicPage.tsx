import { Header } from '../components/Header';
import { EventCard } from '../components/EventCard';
import { Sparkles } from 'lucide-react';

export function PublicPage() {
  return (
    <div className="min-h-screen bg-[#FDF4FF]">
      
      <Header />

      <div className="p-10">
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          
          <div className="flex items-center gap-2 bg-fuchsia-100 text-fuchsia-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            <Sparkles size={16} />
            <span>Meninas no Lab</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-center text-slate-900 mb-4">
            Calendário de Eventos
          </h1>
          
          <p className="text-center text-slate-600 mb-16 max-w-2xl text-lg">
            Descubra oficinas, minicursos e rodas de conversa que vão transformar sua relação com a tecnologia
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            
            {/* --- Evento 1 --- */}
            <EventCard 
              type="Minicurso"
              title="Design de Interfaces com Figma"
              description="Aprenda a criar interfaces de usuário profissionais usando o Figma, uma das ferramentas mais populares para design de produtos digitais."
              date="12 de maio de 2026"
              time="09:00"
              duration="4 horas"
              location="Laboratório de Informática - UTFPR"
              vacancies={25}
              imageUrl="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600&auto=format&fit=crop"
            />

            {/* --- Evento 2 --- */}
            <EventCard 
              type="Oficina"
              title="Criação de Jogos com Python"
              description="Desenvolva seus próprios jogos usando Python e a biblioteca Pygame! Aprenda conceitos de programação orientada a objetos na prática."
              date="19 de maio de 2026"
              time="14:00"
              duration="3 horas"
              location="Laboratório de Informática - UTFPR"
              vacancies={25}
              imageUrl="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop"
            />

            {/* --- Evento 3 (Teste da Logo Padrão e Link do Forms) --- */}
            <EventCard 
              type="Roda de Conversa"
              title="Mulheres na Tecnologia"
              description="Venha bater um papo inspirador sobre os desafios e oportunidades para mulheres no mercado de TI."
              date="25 de maio de 2026"
              time="16:00"
              duration="2 horas"
              location="Auditório Principal - UTFPR"
              vacancies={50}
              formsUrl="https://forms.google.com" 
              // Repare que NÃO colocamos a imageUrl aqui. O React vai usar a logo automaticamente!
            />

          </div>
        </div>
      </div>
    </div>
  );
}