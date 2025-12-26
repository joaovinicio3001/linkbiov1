import React from 'react';

export const PreviewGrid: React.FC = () => {
  // URLs das fotos de prévia fornecidas pelo usuário
  const previews = [
    'https://vtcutjksipkorbecoevo.supabase.co/storage/v1/object/public/fotos/13.png',
    'https://vtcutjksipkorbecoevo.supabase.co/storage/v1/object/public/fotos/12.png',
    'https://vtcutjksipkorbecoevo.supabase.co/storage/v1/object/public/fotos/3.png',
    'https://vtcutjksipkorbecoevo.supabase.co/storage/v1/object/public/fotos/4.png',
    'https://vtcutjksipkorbecoevo.supabase.co/storage/v1/object/public/fotos/5.png',
    'https://vtcutjksipkorbecoevo.supabase.co/storage/v1/object/public/fotos/6.png',
  ];

  return (
    <div className="w-full mb-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="h-[1px] flex-1 bg-white/20"></div>
        <span className="text-white/80 text-xs font-bold uppercase tracking-[0.2em]">Prévias do Canal</span>
        <div className="h-[1px] flex-1 bg-white/20"></div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {previews.map((src, index) => (
          <div 
            key={index} 
            className="aspect-[3/4] rounded-lg overflow-hidden border border-white/10 shadow-lg relative group"
          >
            <img 
              src={src} 
              alt={`Preview ${index + 1}`} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        ))}
      </div>
    </div>
  );
};