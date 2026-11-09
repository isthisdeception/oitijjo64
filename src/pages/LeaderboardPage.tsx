import React, { useEffect, useState } from 'react';
import { PageContainer } from '../components/common/PageContainer';
import { SectionHeading } from '../components/common/SectionHeading';
import { LoadingState } from '../components/common/LoadingState';
import {
  LeaderboardDeadlineBanner,
  LeaderboardPodium,
  LeaderboardTable,
} from '../components/leaderboard';
import { leaderboardService } from '../services';
import { LeaderboardEntry, VoteSummary } from '../types';

export const LeaderboardPage: React.FC = () => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [summary, setSummary] = useState<VoteSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      leaderboardService.getLeaderboard(),
      leaderboardService.getVoteSummary(),
    ]).then(([leaderboardData, summaryData]) => {
      setEntries(leaderboardData);
      setSummary(summaryData);
      setLoading(false);
    });
  }, []);

  return (
    <div className="py-8 sm:py-14 space-y-10 sm:space-y-14">
      <PageContainer>
        {/* Page Header */}
        <SectionHeading
          title="জেলা অনুযায়ী ভোটের অবস্থান"
          subtitle="ঐতিহ্যের হাট ৫.০ উপলক্ষে দর্শনার্থীদের দেওয়া নমুনা ভোটের ভিত্তিতে ৬৪ জেলার অবস্থান ও র‍্যাঙ্কিং।"
          badge="পূর্ণাঙ্গ লিডারবোর্ড"
        />

        {loading ? (
          <LoadingState message="লিডারবোর্ড তথ্য গণনা করা হচ্ছে..." />
        ) : (
          <div className="space-y-12">
            {/* 1. Deadline & Countdown Banner */}
            <LeaderboardDeadlineBanner
              totalDemoVotes={summary?.totalDemoVotes || 0}
            />

            {/* 2. Top 3 Distinct Visual Podium */}
            <LeaderboardPodium entries={entries} />

            {/* 3. Full Ranked Table / Mobile Stacked Cards */}
            <div className="space-y-4">
              <div className="border-t border-heritage-border/70 pt-8">
                <h3 className="text-xl sm:text-2xl font-bold text-heritage-deep mb-1">
                  সকল ৬৪ জেলার অবস্থান তালিকা
                </h3>
                <p className="text-xs sm:text-sm text-heritage-muted mb-6">
                  সর্বাধিক ভোটপ্রাপ্ত জেলা থেকে ক্রমানুসারে সাজানো তালিকা।
                </p>
              </div>

              <LeaderboardTable entries={entries} />
            </div>
          </div>
        )}
      </PageContainer>
    </div>
  );
};
