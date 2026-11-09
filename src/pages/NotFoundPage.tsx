import React from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '../components/common/PageContainer';
import { Compass, Home, MapPin } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="py-16 md:py-24 my-auto flex items-center justify-center">
      <PageContainer size="narrow">
        <div className="text-center max-w-md mx-auto space-y-6">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-heritage-paper border-2 border-heritage-border flex items-center justify-center text-heritage-primary shadow-sm">
            <Compass className="w-10 h-10 stroke-[1.5] animate-pulse" />
          </div>

          <div className="space-y-2">
            <span className="text-4xl font-extrabold text-heritage-terracotta tracking-wider">
              ৪০৪
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-heritage-deep">
              পাতাটি খুঁজে পাওয়া যায়নি
            </h1>
            <p className="text-sm sm:text-base text-heritage-muted leading-relaxed">
              আপনি যে ঠিকানাটি খুঁজছেন তা সরানো হয়েছে অথবা লিংকটি ভুল। অনুগ্রহ করে সঠিক পাতা বা হোমপেজে ফিরে যান।
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white bg-heritage-primary hover:bg-heritage-deep transition-colors shadow-sm"
            >
              <Home className="w-4 h-4" />
              <span>হোমপেজে ফিরে যান</span>
            </Link>
            <Link
              to="/districts"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-heritage-deep bg-heritage-card hover:bg-white border border-heritage-border transition-colors shadow-sm"
            >
              <MapPin className="w-4 h-4 text-heritage-primary" />
              <span>৬৪ জেলা দেখুন</span>
            </Link>
          </div>
        </div>
      </PageContainer>
    </div>
  );
};

