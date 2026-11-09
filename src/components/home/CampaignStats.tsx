import React, { useEffect, useState } from 'react';
import { MapPin, Vote, Calendar } from 'lucide-react';
import { leaderboardService } from '../../services';
import { VoteSummary } from '../../types';
import { formatNumberBn } from '../../utils';
import { APP_CONFIG } from '../../utils/constants';
import { DemoDataNotice } from '../common/DemoDataNotice';

export const CampaignStats: React.FC = () => {
  const [summary, setSummary] = useState<VoteSummary | null>(null);

  useEffect(() => {
    leaderboardService.getVoteSummary().then(setSummary);
  }, []);

  return (
    <div className="w-full bg-heritage-card border border-heritage-border rounded-2xl p-6 sm:p-8 shadow-xs">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-heritage-border">
        {/* Stat 1: Total Districts */}
        <div className="flex items-center gap-4 pt-4 sm:pt-0">
          <div className="w-12 h-12 rounded-xl bg-heritage-primary/10 flex items-center justify-center text-heritage-primary flex-shrink-0">
            <MapPin className="w-6 h-6 stroke-[1.8]" />
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-bold text-heritage-deep">
                {formatNumberBn(summary?.totalDistricts || 64)}টি
              </span>
              <span className="text-xs font-semibold text-heritage-muted">
                জেলা
              </span>
            </div>
            <p className="text-xs text-heritage-muted mt-0.5">
              ৮টি প্রশাসনিক বিভাগ জুড়ে
            </p>
          </div>
        </div>

        {/* Stat 2: Total Demo Votes */}
        <div className="flex items-center gap-4 pt-6 sm:pt-0 sm:pl-8">
          <div className="w-12 h-12 rounded-xl bg-heritage-terracotta/10 flex items-center justify-center text-heritage-terracotta flex-shrink-0">
            <Vote className="w-6 h-6 stroke-[1.8]" />
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-bold text-heritage-deep">
                {formatNumberBn(summary?.totalDemoVotes || 0)}
              </span>
              <span className="text-xs font-semibold text-heritage-muted">
                নমুনা ভোট
              </span>
            </div>
            <div className="mt-1">
              <DemoDataNotice variant="tag" text="নমুনা পরিসংখ্যান" />
            </div>
          </div>
        </div>

        {/* Stat 3: Voting Deadline */}
        <div className="flex items-center gap-4 pt-6 sm:pt-0 sm:pl-8">
          <div className="w-12 h-12 rounded-xl bg-heritage-gold/15 flex items-center justify-center text-heritage-gold flex-shrink-0">
            <Calendar className="w-6 h-6 stroke-[1.8]" />
          </div>
          <div>
            <div className="text-sm sm:text-base font-bold text-heritage-deep">
              {APP_CONFIG.eventContextBn}
            </div>
            <p className="text-xs text-heritage-muted mt-0.5">
              ভোট সমাপ্তি: রাত ১০:০০টা
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
