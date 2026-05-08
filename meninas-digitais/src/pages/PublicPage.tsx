import { Header } from '../components/Header';
import { EventCard } from '../components/EventCard';
import { Sparkles } from 'lucide-react';

export function PublicPage() {
  return (
    <div className="min-h-screen bg-md-fundo">
      
      <Header />

      {/* Adicionamos um padding (p-10) para o conteúdo não grudar nas bordas da tela */}
      <div className="p-10">
        {/* Usamos APENAS UMA div de limitação de largura (1400px) */}
        <div className="max-w-[1400px] mx-auto flex flex-col items-center w-full">
          
          <div className="flex items-center gap-2 bg-md-rosa/10 text-md-rosa px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            <Sparkles size={16} />
            <span>Meninas no Lab</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-center text-slate-900 mb-4">
            Calendário de Eventos
          </h1>
          
          <p className="text-center text-slate-600 mb-16 max-w-2xl text-lg">
            Descubra oficinas, minicursos e rodas de conversa que vão transformar sua relação com a tecnologia
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
            
            {/* --- Seus EventCards entram aqui --- */}
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
              formsUrl="https://forms.google.com" 
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
              formsUrl="https://forms.google.com" 
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