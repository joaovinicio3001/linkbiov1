import React from 'react';
import { SocialItem } from '../types';

interface SocialRowProps {
  items: SocialItem[];
}

export const SocialRow: React.FC<SocialRowProps> = ({ items }) => {
  return (
    <div className="flex justify-center gap-6 mt-8 pb-8">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-200 transition-transform transform hover:scale-110 p-2 bg-black/20 rounded-full hover:bg-black/40 backdrop-blur-sm"
            aria-label={item.platform}
          >
            <Icon size={24} strokeWidth={1.5} />
          </a>
        );
      })}
    </div>
  );
};