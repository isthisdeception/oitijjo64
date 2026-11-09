import React from 'react';
import { Utensils, Landmark, Sparkles, Palette } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';

export const HeritageIntro: React.FC = () => {
  const facets = [
    {
      title: 'বিখ্যাত লোকজ খাবার',
      desc: 'পুরান ঢাকার বাকরখানি, বগুড়ার দই, কুমিল্লার রসমালাই থেকে শুরু করে প্রতিটি অঞ্চলের খাঁটি স্বাদ।',
      icon: <Utensils className="w-5 h-5 text-heritage-primary" />,
      tag: 'খাদ্য ঐতিহ্য',
    },
    {
      title: 'ঐতিহ্য ও লোকসংস্কৃতি',
      desc: 'লালনের গান, বাউল সুর, জারি-সারি ও শত শত বছরের পল্লী সংস্কৃতির জীবন্ত ধারা।',
      icon: <Sparkles className="w-5 h-5 text-heritage-gold" />,
      tag: 'কৃষ্টি ও ধারা',
    },
    {
      title: 'কারু ও হস্তশিল্প',
      desc: 'ঢাকাই জামদানি, টাঙ্গাইলের তাঁত, সিলেটের শীতলপাটি ও নকশিকাঁথার নিপুণ কারুকাজ।',
      icon: <Palette className="w-5 h-5 text-heritage-terracotta" />,
      tag: 'শিল্পকর্ম',
    },
    {
      title: 'মেলা ও প্রদর্শনী আয়োজন',
      desc: 'ঐতিহ্যের হাট ৫.০-তে প্রতিটি জেলার প্রদর্শনী ও উৎসবের আয়োজন সম্পর্কিত তথ্যাবলী।',
      icon: <Landmark className="w-5 h-5 text-heritage-deep" />,
      tag: 'ঐতিহ্যের হাট ৫.০',
    },
  ];

  return (
    <section className="w-full">
      <SectionHeading
        title="যেসব ঐতিহ্য আপনি খুঁজে পাবেন"
        subtitle="বাংলাদেশের প্রতিটি কোণে লুকিয়ে থাকা সংস্কৃতির বৈচিত্র্যময় সম্পদসমূহ।"
        badge="ঐতিহ্যের রূপরেখা"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {facets.map((facet) => (
          <div
            key={facet.title}
            className="bg-heritage-card border border-heritage-border rounded-2xl p-6 hover:shadow-sm transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-heritage-paper border border-heritage-border flex items-center justify-center">
                  {facet.icon}
                </div>
                <span className="text-[11px] font-semibold text-heritage-muted px-2 py-0.5 rounded bg-heritage-paper">
                  {facet.tag}
                </span>
              </div>

              <h3 className="text-lg font-bold text-heritage-deep mb-2">
                {facet.title}
              </h3>
              <p className="text-xs sm:text-sm text-heritage-muted leading-relaxed">
                {facet.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
