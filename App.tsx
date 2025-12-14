import React, { useEffect, useState } from 'react';
import { 
  Twitter, Facebook, Instagram, Music, Clock, Users, 
  MapPin, Calendar, ShoppingBag, PlayCircle, Star, Heart, Mail
} from 'lucide-react';
import { supabase } from './lib/supabaseClient';
import { ProfileHeader } from './components/ProfileHeader';
import { LinkButton } from './components/LinkButton';
import { ProfileData, LinkItem, DatabaseLink } from './types';

// Icon Map: String from DB -> React Component
const iconMap: { [key: string]: any } = {
  'Twitter': Twitter,
  'Facebook': Facebook,
  'Instagram': Instagram,
  'Music': Music,
  'Clock': Clock,
  'Users': Users,
  'MapPin': MapPin,
  'Calendar': Calendar,
  'ShoppingBag': ShoppingBag,
  'PlayCircle': PlayCircle,
  'Star': Star,
  'Heart': Heart,
  'Mail': Mail
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [links, setLinks] = useState<LinkItem[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        // 1. Fetch Profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .limit(1)
          .single();

        if (profileData) {
          setProfile({
            // Hardcoding specific name and bio as requested
            name: 'bella',
            bio: '@sosofss__',
            // Usando as URLs do Supabase Storage conforme solicitado
            avatarUrl: 'https://vtcutjksipkorbecoevo.supabase.co/storage/v1/object/public/fotos/1.png',
            // Forçando verificado como true
            isVerified: true, 
            backgroundImageUrl: 'https://vtcutjksipkorbecoevo.supabase.co/storage/v1/object/public/fotos/2.png'
          });
        }

        // 2. Fetch Links
        const { data: linksData } = await supabase
          .from('links')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true });

        if (linksData) {
          const mappedLinks: LinkItem[] = linksData.map((l: DatabaseLink, index: number) => {
            // Override for the first button (Telegram Blue)
            if (index === 0) {
              return {
                id: l.id,
                title: 'Canal de prévias free',
                url: 'https://t.me/sofiaahxz',
                image: 'https://vtcutjksipkorbecoevo.supabase.co/storage/v1/object/public/fotos/logo%20telegram.png'
              };
            }

            // Override for the second button (Telegram Pink/VIP)
            if (index === 1) {
              return {
                id: l.id,
                title: 'Assine o vip',
                url: 'https://t.me/Sofffiiaa_bot',
                image: 'https://vtcutjksipkorbecoevo.supabase.co/storage/v1/object/public/fotos/logo%20telegram%20rosa.png'
              };
            }
            
            return {
              id: l.id,
              title: l.title,
              url: l.url,
              icon: iconMap[l.icon_name] || Star // Fallback icon
            };
          });
          setLinks(mappedLinks);
        }

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

          <div className="flex flex-col w-full space-y-2 mt-6">
            {links.map((link) => (
              <LinkButton key={link.id} link={link} />
            ))}
          </div>

          <div className="mt-8 text-white/90 font-medium text-sm flex items-center gap-2 drop-shadow-md">
            <span> </span>
          </div>

        </div>
        
        {/* Footer */}
        <footer className="absolute bottom-4 text-white/60 text-xs font-light tracking-wide">
          © 2025 {profile.name}
        </footer>
      </main>
    </div>
  );
};

export default App;