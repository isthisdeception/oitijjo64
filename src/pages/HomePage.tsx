import React from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '../components/common/PageContainer';
import { HeroCountdown } from '../components/home/HeroCountdown';
import { CampaignStats } from '../components/home/CampaignStats';
import { TopLeaderboardPreview } from '../components/home/TopLeaderboardPreview';
import { DistrictExplorerPreview } from '../components/home/DistrictExplorerPreview';
import { HowItWorks } from '../components/home/HowItWorks';
import { HeritageIntro } from '../components/home/HeritageIntro';
import { MapPin, Trophy, Sparkles, ShieldAlert, ArrowRight } from 'lucide-react';
import { APP_CONFIG } from '../utils/constants';

export const HomePage: React.FC = () => {
  return (
      <div className="py-6 sm:py-12 space-y-16 sm:space-y-24">
        {/* 1. Hero Section */}
        <section className="relative overflow-hidden">
          <PageContainer>
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
                  {/* Event Context Pill */}
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-heritage-primary/10 border border-heritage-primary/20 text-heritage-primary text-xs sm:text-sm font-semibold shadow-xs">
                    <Sparkles className="w-4 h-4 text-heritage-gold animate-spin-slow" />
                    <span>{APP_CONFIG.eventContextBn} • অনানুষ্ঠানিক উদ্যোগ</span>
                  </div>

                  {/* Brand Title & Tagline */}
                  <div className="space-y-4">
                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-heritage-deep tracking-tight leading-tight">
                      {APP_CONFIG.brandNameBn}
                    </h1>
                    <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-heritage-primary">
                      {APP_CONFIG.taglineBn}
                    </p>
                    <p className="text-sm sm:text-lg text-heritage-muted max-w-2xl mx-auto leading-relaxed pt-2">
                      নিজের জেলার ঐতিহ্য আবিষ্কার করুন, পছন্দের জেলাকে ভোট দিন, আর গর্বের গল্প সবার সঙ্গে ভাগ করে নিন।
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                    <Link
                      to="/districts"
                      className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold text-white bg-heritage-primary hover:bg-heritage-deep transition-all shadow-sm hover:shadow"
                    >
                      <MapPin className="w-5 h-5" />
                      <span>৬৪ জেলা দেখুন</span>
                    </Link>
                    <Link
                      to="/leaderboard"
                      className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold text-heritage-deep bg-heritage-card hover:bg-white border border-heritage-border transition-all shadow-xs hover:shadow"
                    >
                      <Trophy className="w-5 h-5 text-heritage-gold" />
                      <span>লিডারবোর্ড দেখুন</span>
                    </Link>
                  </div>

                    {/* Voting Countdown Card */}
                    <div className="pt-4 w-full max-w-md">
                      <div className="p-6 bg-heritage-card/90 border border-heritage-border/90 rounded-2xl shadow-xs backdrop-blur-xs">
                        <HeroCountdown />
                      </div>
                    </div>
                  </div>
                </PageContainer>
              </section>

              {/* 2. Campaign Summary & Statistics */}
              <section>
                <PageContainer>
                      <CampaignStats />
                    </PageContainer>
                  </section>

                  {/* 3. Top 3 Leaderboard Preview */}
                  <section>
                    <PageContainer>
                      <TopLeaderboardPreview />
                    </PageContainer>
                  </section>

                  {/* 4. All-District Explorer Preview */}
                  <section>
                    <PageContainer>
                      <DistrictExplorerPreview />
                    </PageContainer>
                  </section>

                  {/* 5. How It Works Section */}
                  <section>
                    <PageContainer>
                      <HowItWorks />
                    </PageContainer>
                  </section>

                  {/* 6. Heritage Facets Overview */}
                  <section>
                    <PageContainer>
                      <HeritageIntro />
                    </PageContainer>
                  </section>

                  {/* 7. Unobtrusive Disclaimer Preview */}
                  <section className="pb-4">
                    <PageContainer size="narrow">
                      <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                        <div className="flex items-center gap-2.5 text-amber-900">
                          <ShieldAlert className="w-4 h-4 flex-shrink-0 text-amber-600" />
                          <span className="font-semibold">
                            ঐতিহ্য ৬৪ একটি স্বাধীন ও অনানুষ্ঠানিক উদ্যোগ। এর ফলাফল মূল আয়োজনের বিচার বা ফলাফলে প্রভাব ফেলে না।
                          </span>
                        </div>
                        <Link
                          to="/about"
                          className="inline-flex items-center gap-1 font-bold text-amber-900 hover:text-amber-700 hover:underline flex-shrink-0"
                        >
                          <span>বিস্তারিত পড়ুন</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </PageContainer>
                  </section>
                </div>
                );
};
