import React from 'react';
import { Sparkles, MapPin, Heart } from 'lucide-react';
import { District } from '../../types';
import { APP_CONFIG } from '../../utils/constants';

export type PosterTemplate = 'heritage' | 'modern';

interface PosterCardProps {
  district: District;
  userName: string;
  userImage: string | null;
  template: PosterTemplate;
  posterRef: React.RefObject<HTMLDivElement>;
}

export const PosterCard: React.FC<PosterCardProps> = ({
  district,
  userName,
  userImage,
  template,
  posterRef,
}) => {
  const isHeritage = template === 'heritage';

  return (
    <div
      ref={posterRef}
      style={{ width: '480px', height: '600px' }}
      className={`relative flex flex-col justify-between p-8 rounded-3xl overflow-hidden shadow-2xl select-none text-white ${
        isHeritage
          ? 'bg-[#173D32] border-4 border-[#C6A15B]'
          : 'bg-gradient-to-br from-[#2F6B50] via-[#1E4D3A] to-[#123128] border-4 border-[#B85C43]'
      }`}
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <pattern
            id={`poster-pattern-${template}`}
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="20" cy="20" r="2" fill="#FFFFFF" />
            <path
              d="M 0 20 L 40 20 M 20 0 L 20 40"
              stroke="#FFFFFF"
              strokeWidth="0.5"
            />
          </pattern>
          <rect width="100%" height="100%" fill={`url(#poster-pattern-${template})`} />
        </svg>
      </div>

      {/* Decorative Corner Ornaments for Heritage Template */}
      {isHeritage && (
        <>
          <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[#C6A15B] pointer-events-none" />
          <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[#C6A15B] pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[#C6A15B] pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[#C6A15B] pointer-events-none" />
        </>
      )}

      {/* Top Header Bar */}
      <div className="relative z-10 flex items-center justify-between pb-4 border-b border-white/20">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shadow-xs ${
              isHeritage ? 'bg-[#C6A15B] text-[#173D32]' : 'bg-[#B85C43] text-white'
            }`}
          >
            ৬৪
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight block">
              {APP_CONFIG.brandNameBn}
            </span>
            <span className="text-[10px] tracking-widest uppercase opacity-80 block font-mono">
              {APP_CONFIG.descriptorEn}
            </span>
          </div>
        </div>

        <div className="text-right">
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-white/15 border border-white/20">
            <Sparkles className="w-3 h-3 text-[#C6A15B]" />
            <span>ঐতিহ্যের হাট ৫.০</span>
          </span>
        </div>
      </div>

      {/* Center Body Content */}
      <div className="relative z-10 my-auto text-center space-y-4 py-2">
        {/* Optional User Photo */}
        {userImage ? (
          <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-3 border-white shadow-lg bg-black/20">
            <img
              src={userImage}
              alt="ইউজার ছবি"
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-16 h-16 mx-auto rounded-full bg-white/10 border-2 border-white/30 flex items-center justify-center text-white/90">
            <MapPin className="w-8 h-8 text-[#C6A15B]" />
          </div>
        )}

        {/* District Name & Heritage Title */}
        <div className="space-y-1">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/10 border border-white/20 inline-block text-white/90">
            {district.divisionBn} বিভাগ
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white drop-shadow-sm pt-1">
            {district.nameBn}
          </h2>
        </div>

        {/* Tagline & Neutral Heritage Statement (Task 6 & 7) */}
        <div className="space-y-1.5 max-w-sm mx-auto">
          <p className="text-xl font-bold text-[#C6A15B] tracking-wide">
            {APP_CONFIG.subTaglineBn}
          </p>
          <p className="text-xs text-white/85 leading-relaxed">
            আমি {district.nameBn} জেলার ঐতিহ্য, কৃষ্টি ও বিখ্যাত সংস্কৃতিকে ভালোবাসি।
          </p>
        </div>

        {/* Optional User Name */}
        {userName.trim() && (
          <div className="pt-1">
            <span className="inline-block px-3 py-1 rounded-xl bg-white/15 border border-white/25 text-xs font-bold text-white shadow-2xs">
              গর্বিত অংশীদার: {userName.trim()}
            </span>
          </div>
        )}
      </div>

      {/* Bottom Footer Area */}
      <div className="relative z-10 pt-4 border-t border-white/20 flex flex-col items-center text-center space-y-1.5 text-[11px] text-white/80">
        <div className="flex items-center gap-1.5 font-medium">
          <span>{APP_CONFIG.taglineBn}</span>
          <Heart className="w-3 h-3 text-[#B85C43] fill-[#B85C43]" />
        </div>
        <p className="text-[9px] text-white/60 tracking-wider">
          অনানুষ্ঠানিক শিক্ষার্থী উদ্যোগ • {APP_CONFIG.domain}
        </p>
      </div>
    </div>
  );
};

