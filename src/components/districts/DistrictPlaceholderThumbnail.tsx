import React from 'react';
import { MapPin, Sparkles } from 'lucide-react';
import { District } from '../../types';

interface DistrictPlaceholderThumbnailProps {
  district: District;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const DistrictPlaceholderThumbnail: React.FC<
  DistrictPlaceholderThumbnailProps
> = ({ district, size = 'md', className = '' }) => {
  const heights = {
    sm: 'h-28',
    md: 'h-40',
    lg: 'h-56 sm:h-72',
  };

  const bgGradient = district.accentColor
    ? {
        background: `linear-gradient(135deg, ${district.accentColor} 0%, #173D32 100%)`,
      }
    : {
        background: 'linear-gradient(135deg, #2F6B50 0%, #173D32 100%)',
      };

  return (
    <div
      style={bgGradient}
      className={`relative w-full ${heights[size]} rounded-xl overflow-hidden flex flex-col justify-between p-4 text-white shadow-xs select-none transition-transform group-hover:scale-[1.01] ${className}`}
    >
      {/* Decorative Heritage Motif Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 L100,100 M100,0 L0,100 M50,0 L50,100 M0,50 L100,50"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
        </svg>
      </div>

      {/* Top Bar inside thumbnail */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-black/25 backdrop-blur-xs text-white/90 border border-white/10">
          {district.divisionBn} বিভাগ
        </span>
        <Sparkles className="w-4 h-4 text-heritage-gold/80" />
      </div>

      {/* Center Initial / Emblem */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto">
        <div className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-xs border border-white/20 flex items-center justify-center shadow-xs">
          <span className="text-xl font-bold tracking-tight text-white">
            {district.nameBn.charAt(0)}
          </span>
        </div>
      </div>

      {/* Bottom Bar inside thumbnail */}
      <div className="relative z-10 flex items-center justify-between text-xs text-white/90">
        <div className="flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-heritage-gold" />
          <span className="font-semibold text-sm">{district.nameBn}</span>
        </div>
        <span className="text-[10px] uppercase font-mono tracking-wider opacity-75">
          {district.slug}
        </span>
      </div>
    </div>
  );
};

