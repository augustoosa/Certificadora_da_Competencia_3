import { Calendar, Clock, MapPin, Users, ExternalLink } from 'lucide-react';
import defaultLogo from '../assets/logo_meninas_digitais.png';

interface EventCardProps {
  type: 'Minicurso' | 'Oficina' | 'Roda de Conversa';
  title: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  vacancies: number;
  imageUrl?: string; 
  formsUrl?: string; 
}

export function EventCard({ type, title, description, date, time, duration, location, vacancies, imageUrl, formsUrl }: EventCardProps) {
  // Usando as cores exatas do manual para cada tipo de evento
  const typeColors = {
    'Minicurso': 'bg-md-verde text-white',
    'Oficina': 'bg-md-azul text-white',
    'Roda de Conversa': 'bg-md-laranja text-white'
  };

  const imageToShow = imageUrl || defaultLogo;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow h-full">
      
      <div className="relative h-48 w-full bg-md-fundo-claro flex-shrink-0 border-b border-gray-50">
        <img 
          src={imageToShow} 
          alt={title} 
          className={`w-full h-full ${imageUrl ? 'object-cover' : 'object-contain p-6 opacity-90'}`} 
        />
        <span className={`absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full shadow-sm ${typeColors[type]}`}>
          {type}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-bold text-lg text-gray-900 leading-tight mb-2">{title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2 mb-4">{description}</p>
        
        <div className="mt-auto space-y-2 text-sm text-gray-600 mb-6 font-medium">
          {/* Ícones usando o Roxo Oficial */}
          <div className="flex items-center gap-2"><Calendar size={16} className="text-md-roxo" /> <span>{date}</span></div>
          <div className="flex items-center gap-2"><Clock size={16} className="text-md-roxo" /> <span>{time} • {duration}</span></div>
          <div className="flex items-center gap-2"><MapPin size={16} className="text-md-roxo" /> <span className="truncate">{location}</span></div>
          <div className="flex items-center gap-2"><Users size={16} className="text-md-roxo" /> <span>{vacancies} vagas</span></div>
        </div>

        {formsUrl && (
          <a 
            href={formsUrl}
            target="_blank" 
            rel="noopener noreferrer"
            // Botão com o Rosa oficial
            className="mt-auto w-full bg-md-rosa hover:bg-opacity-90 text-white font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm"
          >
            <ExternalLink size={18} />
            <span>Inscreva-se</span>
          </a>
        )}
      </div>
    </div>
  );
}