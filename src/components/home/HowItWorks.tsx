import React from 'react';
import { Search, Vote, Share2 } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '০১',
      title: 'জেলা অন্বেষণ করুন',
      description:
        'বাংলাদেশের ৬৪ জেলার সমৃদ্ধ ইতিহাস, বিখ্যাত লোকজ খাবার ও ঐতিহ্যবাহী সংস্কৃতির গল্প জানুন।',
      icon: <Search className="w-6 h-6 text-heritage-primary" />,
    },
    {
      step: '০২',
      title: 'পছন্দের জেলায় ভোট দিন',
      description:
        'আপনার ভালো লাগার যেকোনো একটি জেলাকে বেছে নিয়ে সমর্থন জানান। এক গুগল অ্যাকাউন্টে একটিই ভোট।',
      icon: <Vote className="w-6 h-6 text-heritage-terracotta" />,
    },
    {
      step: '০৩',
      title: 'পোস্টার তৈরি ও শেয়ার',
      description:
        'নিজের নাম ও ছবি দিয়ে আকর্ষণীয় ব্রান্ডেড পোস্টার তৈরি করুন এবং সোশ্যাল মিডিয়ায় গর্বের সাথে শেয়ার করুন।',
      icon: <Share2 className="w-6 h-6 text-heritage-gold" />,
    },
  ];

  return (
    <section className="w-full bg-heritage-card border border-heritage-border rounded-3xl p-8 sm:p-12 shadow-xs">
      <SectionHeading
        title="কীভাবে অংশ নেবেন?"
        subtitle="ঐতিহ্য ৬৪ প্ল্যাটফর্মে যুক্ত হয়ে নিজের জেলাকে তুলে ধরা খুবই সহজ ও আনন্দদায়ক।"
        badge="সহজ ৩ ধাপ"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {steps.map((item) => (
          <div
            key={item.step}
            className="flex flex-col items-center text-center p-6 rounded-2xl bg-heritage-paper/80 border border-heritage-border hover:bg-heritage-paper transition-colors"
          >
            <div className="w-14 h-14 rounded-2xl bg-white shadow-xs border border-heritage-border flex items-center justify-center mb-4 relative">
              {item.icon}
              <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-heritage-deep text-white text-[10px] font-bold">
                {item.step}
              </span>
            </div>

            <h3 className="text-lg font-bold text-heritage-deep mb-2">
              {item.title}
            </h3>

            <p className="text-xs sm:text-sm text-heritage-muted leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
