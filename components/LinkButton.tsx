import React from 'react';
import { LinkItem } from '../types';

interface LinkButtonProps {
  link: LinkItem;
}

export const LinkButton: React.FC<LinkButtonProps> = ({ link }) => {
  const Icon = link.icon;

  const handleClick = () => {
    // Rastreamento do Pixel do Facebook
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('trackCustom', 'LinkClick', {
        content_name: link.title,
        destination_url: link.url
      });
      // Adicionando um rastreio de 'Purchase' ou 'AddToCart' simulado para o Pixel se for o botão de compra
      (window as any).fbq('track', 'AddToCart', {
        content_name: 'VIP Access',
        value: 35.90,
        currency: 'BRL'
      });
    }
  };

  // Função para destacar o preço em verde
  const formatTitle = (title: string) => {
    const priceStr = "R$35,90";
    if (title.includes(priceStr)) {
      const parts = title.split(priceStr);
      return (
        <>
          {parts[0]}
          <span className="text-emerald-500 font-black drop-shadow-sm">{priceStr}</span>
          {parts[1]}
        </>
      );
    }
    return title;
  };

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="group relative block w-full mb-4 transform transition-all duration-300 hover:scale-[1.05] active:scale-[0.98]"
    >
      <div className="relative z-10 flex flex-col items-center justify-center bg-white text-gray-800 py-6 px-6 rounded-2xl shadow-2xl hover:shadow-pink-500/20 hover:bg-gray-50 transition-all border-2 border-pink-200">
        <div className="flex items-center gap-4 mb-2">
          {link.image ? (
            <img src={link.image} alt="" className="w-10 h-10 object-contain drop-shadow-sm" />
          ) : (
            Icon && <Icon size={24} strokeWidth={2} className="text-pink-600" />
          )}
          <span className="font-extrabold text-lg sm:text-xl text-center leading-tight">
            {formatTitle(link.title)}
          </span>
        </div>
        <div className="mt-2 bg-pink-500 text-white px-8 py-2 rounded-full font-bold text-sm tracking-widest uppercase shadow-md group-hover:bg-pink-600 transition-colors">
          COMPRAR AGORA
        </div>
      </div>
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-pink-400 rounded-2xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10"></div>
    </a>
  );
};