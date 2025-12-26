import React, { useEffect, useState } from 'react';
import { supabase } from './lib/supabaseClient';
import { ProfileHeader } from './components/ProfileHeader';
import { LinkButton } from './components/LinkButton';
import { PreviewGrid } from './components/PreviewGrid';
import { ProfileData, LinkItem } from './types';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [links, setLinks] = useState<LinkItem[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        // 1. Fetch Profile
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .limit(1)
          .single();

        if (profileData) {
          setProfile({
            name: 'bella',
            bio: '@sosofss__',
            avatarUrl: 'https://vtcutjksipkorbecoevo.supabase.co/storage/v1/object/public/fotos/1.png',
            isVerified: true, 
            backgroundImageUrl: 'https://vtcutjksipkorbecoevo.supabase.co/storage/v1/object/public/fotos/2.png'
          });
        }

        // 2. Definindo o botão de compra VIP com a URL de checkout atualizada
        const vipLink: LinkItem = {
          id: 'vip-buy-button',
          title: 'Acesse o canal VIP no Telegram por apenas R$35,90',
          url: 'https://app.pushinpay.com.br/service/pay/A0AE0380-C80F-4491-AB97-D6651984AD67',
          image: 'https://vtcutjksipkorbecoevo.supabase.co/storage/v1/object/public/fotos/logo%20telegram%20rosa.png'
        };

        setLinks([vipLink]);

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="relative min-h-screen w-full overflow-y-auto font-sans text-gray-900">
      {/* Background Layer */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${profile.backgroundImageUrl})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-purple-900/20 via-orange-500/10 to-teal-900/40 backdrop-blur-[1px]" />

      {/* Main Content Container */}
      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md mx-auto flex flex-col items-center">
          
          <ProfileHeader profile={profile} />

          {/* Seção de Prévias */}
          <PreviewGrid />

          <div className="flex flex-col w-full space-y-4">
            {links.map((link) => (
              <LinkButton key={link.id} link={link} />
            ))}
          </div>

        </div>
        
        {/* Footer */}
        <footer className="mt-8 mb-4 text-white/60 text-xs font-light tracking-wide text-center w-full">
          © 2025 {profile.name}
        </footer>
      </main>
    </div>
  );
};

export default App;