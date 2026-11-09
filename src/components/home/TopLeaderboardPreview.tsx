import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, ArrowRight, Award } from 'lucide-react';
import { leaderboardService } from '../../services';
import { LeaderboardEntry } from '../../types';
import { formatNumberBn } from '../../utils';
import { DemoDataNotice } from '../common/DemoDataNotice';
import { SectionHeading } from '../common/SectionHeading';

export const TopLeaderboardPreview: React.FC = () => {
  const [topThree, setTopThree] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    leaderboardService.getTopThree().then((data) => {
      setTopThree(data);
      setLoading(false);
    });
  }, []);

  if (loading || topThree.length < 3) {
    return null;
  }

  // Reorder for podium presentation: [2nd, 1st, 3rd]
  const first = topThree[0];
  const second = topThree[1];
  const third = topThree[2];

  return (
    <section className="w-full">
      <SectionHeading
        title="শীর্ষ ৩ জনপ্রিয় জেলা"
        subtitle="দর্শনার্থীদের পছন্দের ভিত্তিতে নমুনা ভোটে শীর্ষে থাকা জেলাসমূহ।"
        badge="লিডারবোর্ড প্রিভিউ"
      />

      <div className="flex justify-center mb-8">
        <DemoDataNotice
          variant="inline"
          text="নমুনা ভোটের ফলাফল • অনানুষ্ঠানিক ডেমো প্রদর্শনী"
        />
      </div>

      {/* Podium Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end max-w-4xl mx-auto pt-4">
        {/* 2nd Place (Silver) */}
        <div className="order-2 md:order-1 bg-heritage-card border border-heritage-border rounded-2xl p-6 text-center shadow-xs hover:shadow-sm transition-shadow flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-slate-100 border-2 border-slate-300 flex items-center justify-center text-slate-700 font-bold mb-3">
            <span className="text-sm">২য়</span>
          </div>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 mb-2">
            রৌপ্য স্থান
          </span>
          <h3 className="text-xl font-bold text-heritage-deep mb-1">
            {second.districtNameBn}
          </h3>
          <p className="text-xs text-heritage-muted mb-3">
            বিভাগ: {second.divisionBn}
          </p>
          <div className="text-sm font-semibold text-heritage-primary bg-heritage-paper px-3 py-1 rounded-lg border border-heritage-border">
            {formatNumberBn(second.voteCount)} নমুনা ভোট
          </div>
          <Link
            to={`/district/${second.districtSlug}`}
            className="mt-4 text-xs font-medium text-heritage-primary hover:underline inline-flex items-center gap-1"
          >
            <span>বিস্তারিত</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* 1st Place (Gold - Elevated) */}
        <div className="order-1 md:order-2 bg-gradient-to-b from-amber-50/50 to-heritage-card border-2 border-amber-300/80 rounded-2xl p-6 sm:p-8 text-center shadow-md relative -translate-y-2 flex flex-col items-center">
          <div className="absolute -top-4 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold shadow-sm flex items-center gap-1">
            <Trophy className="w-3.5 h-3.5" />
            <span>শীর্ষস্থান</span>
          </div>

          <div className="w-16 h-16 rounded-full bg-amber-100 border-2 border-amber-400 flex items-center justify-center text-amber-700 font-bold mb-3 mt-1 shadow-inner">
            <Award className="w-8 h-8 text-amber-600" />
          </div>

          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 mb-2">
            ১ম স্থান (স্বর্ণ)
          </span>

          <h3 className="text-2xl font-bold text-heritage-deep mb-1">
            {first.districtNameBn}
          </h3>
          <p className="text-xs text-heritage-muted mb-4">
            বিভাগ: {first.divisionBn}
          </p>

          <div className="text-base font-bold text-amber-900 bg-amber-100/70 px-4 py-1.5 rounded-xl border border-amber-200">
            {formatNumberBn(first.voteCount)} নমুনা ভোট
          </div>

          <Link
            to={`/district/${first.districtSlug}`}
            className="mt-5 text-xs font-semibold text-white bg-heritage-primary hover:bg-heritage-deep px-4 py-2 rounded-xl transition-colors inline-flex items-center gap-1.5"
          >
            <span>জেলার বিবরণী দেখুন</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 3rd Place (Bronze) */}
        <div className="order-3 bg-heritage-card border border-heritage-border rounded-2xl p-6 text-center shadow-xs hover:shadow-sm transition-shadow flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-orange-100 border-2 border-orange-300 flex items-center justify-center text-orange-800 font-bold mb-3">
            <span className="text-sm">৩য়</span>
          </div>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800 mb-2">
            ব্রোঞ্জ স্থান
          </span>
          <h3 className="text-xl font-bold text-heritage-deep mb-1">
            {third.districtNameBn}
          </h3>
          <p className="text-xs text-heritage-muted mb-3">
            বিভাগ: {third.divisionBn}
          </p>
          <div className="text-sm font-semibold text-heritage-primary bg-heritage-paper px-3 py-1 rounded-lg border border-heritage-border">
            {formatNumberBn(third.voteCount)} নমুনা ভোট
          </div>
          <Link
            to={`/district/${third.districtSlug}`}
            className="mt-4 text-xs font-medium text-heritage-primary hover:underline inline-flex items-center gap-1"
          >
            <span>বিস্তারিত</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      <div className="text-center mt-8">
        <Link
          to="/leaderboard"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-heritage-deep bg-heritage-card hover:bg-white border border-heritage-border transition-colors shadow-xs"
        >
          <Trophy className="w-4 h-4 text-heritage-gold" />
          <span>সম্পূর্ণ ৬৪ জেলার লিডারবোর্ড দেখুন</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};

