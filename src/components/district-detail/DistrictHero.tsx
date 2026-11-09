import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Heart, Vote, Sparkles, Image as ImageIcon } from 'lucide-react';
import { District } from '../../types';
import { formatNumberBn } from '../../utils';
import { DistrictPlaceholderThumbnail } from '../districts/DistrictPlaceholderThumbnail';

interface DistrictHeroProps {
  district: District;
  onVoteClick: () => void;
  onPosterClick: () => void;
}

export const DistrictHero: React.FC<DistrictHeroProps> = ({
  district,
  onVoteClick,
  onPosterClick,
}) => {
  return (
    <div className="w-full space-y-6">
      {/* 1. Breadcrumbs */}
      <nav
        aria-label="ব্রেডক্রাম্ব"
        className="flex items-center gap-1.5 text-xs sm:text-sm text-heritage-muted overflow-x-auto whitespace-nowrap pb-1"
      >
        <Link
          to="/"
          className="hover:text-heritage-deep transition-colors focus:outline-none focus-visible:underline"
        >
          হোম
        </Link>
        <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 text-heritage-border" />
        <Link
          to="/districts"
          className="hover:text-heritage-deep transition-colors focus:outline-none focus-visible:underline"
        >
          ৬৪ জেলা
        </Link>
        <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 text-heritage-border" />
        <span className="font-semibold text-heritage-deep">
          {district.nameBn} জেলা
        </span>
      </nav>

      {/* 2. Main Visual Banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-sm border border-heritage-border">
        <DistrictPlaceholderThumbnail district={district} size="lg" />

        {/* Overlay Badges */}
        <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2 z-20">
          <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-xs font-semibold border border-white/20">
            {district.divisionBn} বিভাগ
          </span>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/90 backdrop-blur-md text-white text-xs font-bold shadow-xs">
            <Heart className="w-3.5 h-3.5 fill-white" />
            <span>{formatNumberBn(district.voteCount)} নমুনা ভোট</span>
          </div>
        </div>
      </div>

      {/* 3. Hero Content & Quick Actions */}
      <div className="bg-heritage-card border border-heritage-border rounded-3xl p-6 sm:p-10 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-heritage-deep tracking-tight">
              {district.nameBn} জেলা
            </h1>
            <span className="text-xs uppercase font-mono tracking-widest text-heritage-muted px-2 py-0.5 rounded bg-heritage-paper border border-heritage-border">
              {district.slug}
            </span>
          </div>

          <p className="text-base sm:text-lg text-heritage-muted leading-relaxed">
            {district.introBn}
          </p>

          <div className="flex items-center gap-2 text-xs text-amber-800 font-medium pt-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
            <span>নমুনা পরিসংখ্যান • ঐতিহ্যের হাট ৫.০ অনানুষ্ঠানিক প্ল্যাটফর্ম</span>
          </div>
        </div>

        {/* Quick CTA Actions */}
        <div className="flex flex-col sm:flex-row md:flex-col gap-3 flex-shrink-0">
          <button
            type="button"
            onClick={onVoteClick}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-heritage-primary hover:bg-heritage-deep transition-all shadow-xs hover:shadow"
          >
            <Vote className="w-5 h-5" />
            <span>এই জেলাকে ভোট দিন</span>
          </button>

          <button
            type="button"
            onClick={onPosterClick}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-heritage-deep bg-heritage-paper hover:bg-heritage-border/60 border border-heritage-border transition-all"
          >
            <ImageIcon className="w-5 h-5 text-heritage-terracotta" />
            <span>পোস্টার তৈরি করুন</span>
          </button>
        </div>
      </div>
    </div>
  );
};

