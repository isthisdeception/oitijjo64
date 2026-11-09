import React from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '../components/common/PageContainer';
import { SectionHeading } from '../components/common/SectionHeading';
import { DemoDataNotice } from '../components/common/DemoDataNotice';
import { Sparkles, MapPin, Trophy, ArrowRight } from 'lucide-react';
import { APP_CONFIG } from '../utils/constants';

export const HomePage: React.FC = () => {
  return (
    <div className="py-8 md:py-16 space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <PageContainer>
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-heritage-primary/10 text-heritage-primary text-xs sm:text-sm font-semibold border border-heritage-primary/20">
              <Sparkles className="w-4 h-4 text-heritage-gold" />
              <span>{APP_CONFIG.eventContextBn}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-heritage-deep tracking-tight leading-tight">
              {APP_CONFIG.brandNameBn}
            </h1>

            <p className="text-xl sm:text-2xl text-heritage-primary font-medium">
              {APP_CONFIG.taglineBn}
            </p>

            <p className="text-base sm:text-lg text-heritage-muted leading-relaxed">
              বাংলাদেশের প্রতিটি জেলার স্বতন্ত্র ঐতিহ্য, লোকসংস্কৃতি এবং জিভে জল আনা বিখ্যাত সব খাবারের গল্প এক ঠিকানায়। নিজের প্রিয় জেলাকে খুঁজে নিন এবং সমর্থন জানান।
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                to="/districts"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-heritage-primary hover:bg-heritage-deep transition-all shadow-sm hover:shadow"
              >
                <MapPin className="w-4 h-4" />
                <span>৬৪ জেলা দেখুন</span>
              </Link>
              <Link
                to="/leaderboard"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-heritage-deep bg-heritage-card hover:bg-white border border-heritage-border transition-all shadow-sm"
              >
                <Trophy className="w-4 h-4 text-heritage-gold" />
                <span>লিডারবোর্ড দেখুন</span>
              </Link>
            </div>

            <div className="pt-2">
              <DemoDataNotice variant="inline" />
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Temporary Placeholder Notice for Step 2 */}
      <section>
        <PageContainer>
          <div className="p-8 rounded-2xl bg-heritage-card border border-heritage-border text-center max-w-2xl mx-auto space-y-4">
            <SectionHeading
              title="স্টেপ ২ সম্পন্ন"
              subtitle="ব্র্যান্ড ডিজাইন সিস্টেম, হেডার, নেভিগেশন ও ফুটার সফলভাবে যুক্ত হয়েছে।"
              badge="ডিজাইন সিস্টেম ও লেআউট"
            />
            <p className="text-sm text-heritage-muted">
              পরবর্তী স্টেপগুলোতে ৬৪ জেলার বিস্তারিত ডেটাসেট, হোমপেজ সেকশন, জেলা বিবরণী এবং ভোট ব্যবস্থা ধারাবাহিকভাবে যুক্ত করা হবে।
            </p>
            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-heritage-primary hover:underline"
              >
                <span>আমাদের সম্পর্কে বিস্তারিত পড়ুন</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </PageContainer>
      </section>
    </div>
  );
};

