import { LucideIcon } from 'lucide-react';

// Tipos usados na UI (Componentes React)
export interface LinkItem {
  id: string;
  title: string;
  url: string;
  icon?: LucideIcon;
  image?: string;
}

export interface SocialItem {
  id: string;
  platform: string;
  url: string;
  icon: LucideIcon;
}

export interface ProfileData {
  name: string;
  username?: string;
  bio: string;
  avatarUrl: string;
  isVerified: boolean;
  backgroundImageUrl: string;
}

// Tipos refletindo a estrutura do Banco de Dados Supabase
export interface DatabaseProfile {
  id: string;
  name: string;
  bio: string;
  avatar_url: string;
  background_image_url: string;
  is_verified: boolean;
}

export interface DatabaseLink {
  id: string;
  title: string;
  url: string;
  icon_name: string;
  display_order: number;
}

export interface DatabaseSocial {
  id: string;
  platform: string;
  url: string;
  icon_name: string;
  display_order: number;
}