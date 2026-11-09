import React from 'react';
import { HeroCountdown } from '../home/HeroCountdown';
import { DemoDataNotice } from '../common/DemoDataNotice';
import { ShieldAlert, RefreshCw } from 'lucide-react';
import { APP_CONFIG } from '../../utils/constants';

interface LeaderboardDeadlineBannerProps {
  totalDemoVotes: number;
}

export const LeaderboardDeadlineBanner: React.FC<
  LeaderboardDeadlineBannerProps
> = () => {
  return (
    <div className="bg-heritage-card border border-heritage-border rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
        {/* Left: Deadline & Demo Info */}
        <div className="space-y-3 text-center lg:text-left">
          <div className="inline-flex items-center gap-2">
            <DemoDataNotice
              variant="tag"
              text="ডেমো র‍্যাঙ্কিং • নমুনা ভোটের তথ্য"
            />
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-heritage-deep">
            ভোট গ্রহণ সমাপ্তির সময়সীমা
          </h2>

          <p className="text-xs sm:text-sm text-heritage-muted leading-relaxed max-w-lg">
            নির্ধারিত সময় অতিক্রান্ত হলে স্বয়ংক্রিয়ভাবে ভোট গ্রহণ বন্ধ হবে। এই ডেমো র‍্যাঙ্কিং শুধুমাত্র ইন্টারফেস পরীক্ষার উদ্দেশ্যে তৈরি এবং মূল আয়োজনের বিচার বা ফলাফলে কোনো প্রভাব ফেলে না।
          </p>

          <div className="flex items-center justify-center lg:justify-start gap-2 text-xs text-heritage-muted">
            <RefreshCw className="w-3.5 h-3.5 text-heritage-primary animate-spin-slow" />
            <span>সর্বশেষ আপডেট: ডেমো তথ্য (নমুনা ডেটা)</span>
          </div>
        </div>

        {/* Right: Countdown Timer */}
        <div className="bg-heritage-paper border border-heritage-border rounded-2xl p-4 sm:p-6 shadow-2xs flex-shrink-0 w-full sm:w-auto">
          <HeroCountdown />
        </div>
      </div>

      {/* Unofficial Disclaimer Strip */}
      <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/70 flex items-center gap-2.5 text-xs text-amber-900 leading-snug">
        <ShieldAlert className="w-4 h-4 flex-shrink-0 text-amber-600" />
        <span>
          <strong>ঘোষণা:</strong> {APP_CONFIG.brandNameBn} কোনো অফিসিয়াল ফলাফল ঘোষণা করে না। এখানে প্রদর্শিত র‍্যাঙ্কিং সম্পূর্ণ অনানুষ্ঠানিক ডেমো ডেটা।
        </span>
      </div>
    </div>
  );
};

