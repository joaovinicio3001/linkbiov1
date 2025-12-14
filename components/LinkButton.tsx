import React from 'react';
import { LinkItem } from '../types';

interface LinkButtonProps {
  link: LinkItem;
}

export const LinkButton: React.FC<LinkButtonProps> = ({ link }) => {
  const Icon = link.icon;

  const handleClick = () => {
    // Rastreamento do Pixel do Facebook
    // Verifica se fbq existe no objeto window
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('trackCustom', 'LinkClick', {
        content_name: link.title,
        destination_url: link.url
      });
    }
  };

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="group relative block w-full mb-4 transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
    >
      <div className="relative z-10 flex items-center justify-center bg-white text-gray-800 py-4 px-6 rounded-full shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all border border-white/40">
        <div className="flex items-center gap-3">
          {link.image ? (
            <img src={link.image} alt="" className="w-7 h-7 object-contain" />
          ) : (
            Icon && <Icon size={20} strokeWidth={2} className="text-teal-600" />
          )}
          <span className="font-semibold text-lg tracking-wide">
            {link.title}
          </span>
        </div>
      </div>
    </a>
  );
};