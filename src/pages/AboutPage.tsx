import React from 'react';
import { PageContainer } from '../components/common/PageContainer';
import { SectionHeading } from '../components/common/SectionHeading';
import { ShieldAlert, Heart, Calendar, Target } from 'lucide-react';
import { APP_CONFIG } from '../utils/constants';

export const AboutPage: React.FC = () => {
  return (
    <div className="py-10 md:py-16 space-y-12">
      <PageContainer size="narrow">
        <SectionHeading
          title="আমাদের সম্পর্কে"
          subtitle="ঐতিহ্য ৬৪ প্রকল্পের লক্ষ্য, প্রেক্ষাপট এবং অনানুষ্ঠানিক উদ্যোগের বিবরণী।"
          badge="উদ্যোগ পরিচিতি"
        />

        {/* Core Mission */}
        <div className="bg-heritage-card border border-heritage-border rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-heritage-primary/10 flex items-center justify-center text-heritage-primary flex-shrink-0 mt-1">
              <Target className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-heritage-deep">
                আমাদের উদ্দেশ্য
              </h3>
              <p className="text-sm sm:text-base text-heritage-muted leading-relaxed">
                {APP_CONFIG.brandNameBn} ({APP_CONFIG.domain}) একটি স্বাধীন ও অনানুষ্ঠানিক সাংস্কৃতিক উদ্যোগ। এর মূল লক্ষ্য হলো বাংলাদেশের প্রতিটি জেলার সমৃদ্ধ ঐতিহ্য, বিখ্যাত খাদ্যসংস্কৃতি ও পর্যটন সম্ভাবনাকে এক ছাদের নিচে সবার কাছে সহজ ও আকর্ষণীয়ভাবে তুলে ধরা।
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 pt-4 border-t border-heritage-border">
            <div className="w-10 h-10 rounded-xl bg-heritage-gold/10 flex items-center justify-center text-heritage-gold flex-shrink-0 mt-1">
              <Calendar className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-heritage-deep">
                ইভেন্ট প্রেক্ষাপট
              </h3>
              <p className="text-sm sm:text-base text-heritage-muted leading-relaxed">
                {APP_CONFIG.eventContextBn} উপলক্ষে এই প্ল্যাটফর্মটি তৈরি। মেলা চলাকালীন শিক্ষার্থীরা যেন নিজেদের জেলার বৈচিত্র্য ও স্বাতন্ত্র্য তুলে ধরতে পারেন এবং পারস্পরিক সাংস্কৃতিক বন্ধন দৃঢ় করতে পারেন, সেটাই এই ক্যাম্পেইনের অনুপ্রেরণা।
              </p>
            </div>
          </div>
        </div>

        {/* Official Disclaimer Box */}
        <div className="p-6 sm:p-8 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-3">
          <div className="flex items-center gap-2.5 text-amber-900 font-bold text-base sm:text-lg">
            <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <span>অফিসিয়াল ডিসক্লেইমার ও শর্তাবলী</span>
          </div>
          <p className="text-sm sm:text-base text-amber-950/80 leading-relaxed">
            {APP_CONFIG.disclaimerBn}
          </p>
        </div>

        {/* Community & Open Collaboration */}
        <div className="bg-heritage-card border border-heritage-border rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-heritage-terracotta/10 flex items-center justify-center text-heritage-terracotta flex-shrink-0">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-heritage-deep">
              স্বেচ্ছাসেবী শিক্ষার্থী উদ্যোগ
            </h3>
          </div>
          <p className="text-sm sm:text-base text-heritage-muted leading-relaxed">
            এই প্ল্যাটফর্মটি সম্পূর্ণ উন্মুক্ত ও শিক্ষার্থীবান্ধব ভালোবাসার প্রকাশ। জেলাগুলোর ইতিহাস, ঐতিহ্য বা তথ্যে কোনো অসংগতি লক্ষ্য করলে আমাদের সাথে যোগাযোগ করার অনুরোধ জানানো হচ্ছে।
          </p>
        </div>
      </PageContainer>
    </div>
  );
};
