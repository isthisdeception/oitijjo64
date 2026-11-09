import React from 'react';
import { Sparkles, MapPin, Heart } from 'lucide-react';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6 text-center bg-heritage-paper text-heritage-text selection:bg-heritage-primary selection:text-white">
      <div className="max-w-xl w-full bg-heritage-card border border-heritage-border rounded-2xl p-8 md:p-12 shadow-sm">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-heritage-primary/10 text-heritage-primary text-sm font-medium mb-6">
          <Sparkles className="w-4 h-4 text-heritage-gold" />
          <span>অনানুষ্ঠানিক উদ্যোগ • ঐতিহ্যের হাট ৫.০</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-heritage-deep mb-3 tracking-tight">
          ঐতিহ্য ৬৪
        </h1>
        <p className="text-sm uppercase tracking-widest text-heritage-gold font-semibold mb-4">
          64 Districts. One Heritage.
        </p>

        <p className="text-xl md:text-2xl text-heritage-primary font-medium mb-2">
          ৬৪ জেলার খাবার, ঐতিহ্য ও গল্প।
        </p>
        <p className="text-base text-heritage-muted mb-8">
          আমার জেলা, আমার গর্ব।
        </p>

        <div className="p-4 bg-heritage-paper rounded-xl border border-heritage-border/80 text-sm text-heritage-muted space-y-2 text-left">
          <div className="flex items-center gap-2 font-medium text-heritage-deep">
            <MapPin className="w-4 h-4 text-heritage-terracotta" />
            <span>স্টেপ ১ সম্পন্ন: ফ্রন্টএন্ড ফাউন্ডেশন সফলভাবে প্রস্তুত</span>
          </div>
          <p className="text-xs leading-relaxed text-heritage-muted">
            React, Vite, TypeScript, Tailwind CSS এবং প্রাথমিক ফোল্ডার স্ট্রাকচার সফলভাবে সেটআপ করা হয়েছে। পরবর্তী ধাপে ব্র্যান্ড ডিজাইন সিস্টেম, নেভিগেশন ও ফুটার যুক্ত করা হবে।
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-heritage-border text-xs text-heritage-muted flex items-center justify-center gap-1.5">
          <span>ঐতিহ্য ৬৪ টিম দ্বারা ভালোবাসার সাথে নির্মিত</span>
          <Heart className="w-3.5 h-3.5 text-heritage-terracotta fill-heritage-terracotta" />
        </div>
      </div>
    </div>
  );
};

export default App;

