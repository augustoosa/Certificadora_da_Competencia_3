import { Calendar, Clock, MapPin, Users, ExternalLink } from 'lucide-react';
// 1. Importamos a imagem da logo na pasta assets
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
  const typeColors = {
    'Minicurso': 'bg-green-500',
    'Oficina': 'bg-blue-500',
    'Roda de Conversa': 'bg-purple-500'
  };

  // 2. Se não tiver uma imagem específica para o evento, usamos a logo padrão
  const imageToShow = imageUrl || defaultLogo;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow h-full">
      
      <div className="relative h-48 w-full bg-fuchsia-50 flex-shrink-0">
        {/* 3. Ajuste fino: Se for a foto do evento, preenche a tela. Se for a logo, centraliza e não corta */}
        <img 
          src={imageToShow} 
          alt={title} 
          className={`w-full h-full ${imageUrl ? 'object-cover' : 'object-contain p-6 opacity-80'}`} 
        />
        <span className={`absolute top-4 left-4 text-white text-xs font-semibold px-3 py-1 rounded-full ${typeColors[type]}`}>
          {type}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-bold text-lg text-gray-900 leading-tight mb-2">{title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2 mb-4">{description}</p>
        
        <div className="mt-auto space-y-2 text-sm text-gray-500 mb-6">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-fuchsia-600 flex-shrink-0" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-fuchsia-600 flex-shrink-0" />
            <span>{time} • {duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-fuchsia-600 flex-shrink-0" />
            <span className="truncate" title={location}>{location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users size={16} className="text-fuchsia-600 flex-shrink-0" />
            <span>{vacancies} vagas</span>
          </div>
        </div>

        {formsUrl && (
          <a 
            href={formsUrl}
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-auto w-full bg-fuchsia-50 hover:bg-fuchsia-100 text-fuchsia-700 font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors border border-fuchsia-200"
          >
            <ExternalLink size={18} />
            <span>Inscreva-se</span>
          </a>
        )}
      </div>
    </div>
  );
}