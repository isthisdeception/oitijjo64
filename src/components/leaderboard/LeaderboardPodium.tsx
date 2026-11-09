import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Award, ArrowRight, Heart } from 'lucide-react';
import { LeaderboardEntry } from '../../types';
import { formatNumberBn } from '../../utils';

interface LeaderboardPodiumProps {
  entries: LeaderboardEntry[];
}

export const LeaderboardPodium: React.FC<LeaderboardPodiumProps> = ({
  entries,
}) => {
  if (entries.length < 3) return null;

  const first = entries[0];
  const second = entries[1];
  const third = entries[2];

  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-heritage-primary/10 text-heritage-primary border border-heritage-primary/20">
          শীর্ষ ৩ জেলা (নমুনা ভোট)
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end max-w-4xl mx-auto pt-4">
        {/* 2nd Place: Silver (Left) */}
        <div className="order-2 md:order-1 bg-heritage-card border border-heritage-border rounded-3xl p-6 text-center shadow-xs hover:shadow-sm transition-shadow flex flex-col items-center">
          <div className="w-14 h-14 rounded-full bg-slate-100 border-2 border-slate-300 flex items-center justify-center text-slate-700 font-bold mb-3 shadow-inner">
            <span className="text-base font-extrabold">২য়</span>
          </div>

          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 mb-2">
            রৌপ্য স্থান (ডেমো)
          </span>

          <h3 className="text-xl font-bold text-heritage-deep mb-1">
            {second.districtNameBn}
          </h3>
          <p className="text-xs text-heritage-muted mb-4">
            {second.divisionBn} বিভাগ
          </p>

          <div className="text-sm font-semibold text-heritage-primary bg-heritage-paper px-3.5 py-1.5 rounded-xl border border-heritage-border flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-heritage-terracotta fill-heritage-terracotta/40" />
            <span>{formatNumberBn(second.voteCount)} নমুনা ভোট</span>
          </div>

          <Link
            to={`/district/${second.districtSlug}`}
            className="mt-4 text-xs font-semibold text-heritage-primary hover:underline inline-flex items-center gap-1"
          >
            <span>জেলার তথ্য দেখুন</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 1st Place: Gold (Center - Elevated) */}
        <div className="order-1 md:order-2 bg-gradient-to-b from-amber-50/70 to-heritage-card border-2 border-amber-300 rounded-3xl p-6 sm:p-8 text-center shadow-md relative -translate-y-2 flex flex-col items-center">
          <div className="absolute -top-4 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold shadow-sm flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5" />
            <span>শীর্ষস্থান (ডেমো)</span>
          </div>

          <div className="w-18 h-18 rounded-full bg-amber-100 border-2 border-amber-400 flex items-center justify-center text-amber-700 font-bold mb-3 mt-1 shadow-inner">
            <Award className="w-9 h-9 text-amber-600" />
          </div>

          <span className="text-xs font-bold px-3 py-0.5 rounded-full bg-amber-100 text-amber-800 mb-2">
            ১ম স্থান (স্বর্ণ)
          </span>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-heritage-deep mb-1">
            {first.districtNameBn}
          </h3>
          <p className="text-xs text-heritage-muted mb-4">
            {first.divisionBn} বিভাগ
          </p>

          <div className="text-base font-bold text-amber-900 bg-amber-100/80 px-4 py-2 rounded-xl border border-amber-300/80 flex items-center gap-1.5 shadow-2xs">
            <Heart className="w-4 h-4 text-heritage-terracotta fill-heritage-terracotta" />
            <span>{formatNumberBn(first.voteCount)} নমুনা ভোট</span>
          </div>

          <Link
            to={`/district/${first.districtSlug}`}
            className="mt-5 text-xs font-bold text-white bg-heritage-primary hover:bg-heritage-deep px-5 py-2.5 rounded-xl transition-colors shadow-xs inline-flex items-center gap-1.5"
          >
            <span>জেলার বিবরণী দেখুন</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 3rd Place: Bronze (Right) */}
        <div className="order-3 bg-heritage-card border border-heritage-border rounded-3xl p-6 text-center shadow-xs hover:shadow-sm transition-shadow flex flex-col items-center">
          <div className="w-14 h-14 rounded-full bg-orange-100 border-2 border-orange-300 flex items-center justify-center text-orange-800 font-bold mb-3 shadow-inner">
            <span className="text-base font-extrabold">৩য়</span>
          </div>

          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800 mb-2">
            ব্রোঞ্জ স্থান (ডেমো)
          </span>

          <h3 className="text-xl font-bold text-heritage-deep mb-1">
            {third.districtNameBn}
          </h3>
          <p className="text-xs text-heritage-muted mb-4">
            {third.divisionBn} বিভাগ
          </p>

          <div className="text-sm font-semibold text-heritage-primary bg-heritage-paper px-3.5 py-1.5 rounded-xl border border-heritage-border flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-heritage-terracotta fill-heritage-terracotta/40" />
            <span>{formatNumberBn(third.voteCount)} নমুনা ভোট</span>
          </div>

          <Link
            to={`/district/${third.districtSlug}`}
            className="mt-4 text-xs font-semibold text-heritage-primary hover:underline inline-flex items-center gap-1"
          >
            <span>জেলার তথ্য দেখুন</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

