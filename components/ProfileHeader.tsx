import React from 'react';
import { BadgeCheck } from 'lucide-react';
import { ProfileData } from '../types';

interface ProfileHeaderProps {
  profile: ProfileData;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile }) => {
  return (
    <div className="flex flex-col items-center text-center mb-8 animate-fade-in-down">
      <div className="relative mb-4 group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-200 to-gray-400 rounded-full opacity-50 blur group-hover:opacity-75 transition duration-200"></div>
        <img
          src={profile.avatarUrl}
          alt={profile.name}
          className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-2 border-white/20 shadow-xl"
        />
      </div>

      <div className="flex items-center gap-2 mb-1">
        <h1 className="text-2xl font-bold text-white tracking-tight shadow-black drop-shadow-md">
          {profile.name}
        </h1>
        {profile.isVerified && (
          <BadgeCheck className="w-6 h-6 text-blue-400 fill-blue-400/10" strokeWidth={2.5} />
        )}
      </div>

      <p className="text-gray-100 text-sm sm:text-base max-w-xs font-medium drop-shadow-md leading-relaxed mb-4">
        {profile.bio}
      </p>

      {/* Status Row */}
      <div className="flex items-center justify-center gap-4">
        {/* Online Pill */}
        <div className="bg-white px-3 py-1 rounded-full flex items-center gap-2 shadow-lg hover:scale-105 transition-transform">
          <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
          <span className="text-gray-900 font-bold text-sm">Online</span>
        </div>

        {/* Location Indicator */}
        <div className="flex items-center gap-1 text-white font-semibold drop-shadow-md">
          <span className="text-xl filter drop-shadow-sm">📍</span>
          <span className="text-lg">🇧🇷</span>
        </div>
      </div>
    </div>
  );
};