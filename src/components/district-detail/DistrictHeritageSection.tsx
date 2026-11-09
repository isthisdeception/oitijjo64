import React from 'react';
import { Sparkles, MapPin, Palette } from 'lucide-react';
import { District } from '../../types';
import { SectionHeading } from '../common/SectionHeading';
import { EmptyState } from '../common/EmptyState';

interface DistrictHeritageSectionProps {
  district: District;
}

export const DistrictHeritageSection: React.FC<
  DistrictHeritageSectionProps
> = ({ district }) => {
  return (
    <section id="heritage" className="scroll-mt-32 space-y-8">
      {/* 1. Heritage & Craft Section */}
      <div className="space-y-6">
        <SectionHeading
          title="ঐতিহ্য, সংস্কৃতি ও হস্তশিল্প"
          subtitle={`${district.nameBn} জেলার কৃষ্টি, লোকউৎসব এবং কারুশিল্পীদের হাতের নিপুণ ঐতিহ্যবাহী পণ্য।`}
          badge="লোকসংস্কৃতি"
          align="left"
        />

        {district.heritageItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {district.heritageItems.map((item) => (
              <div
                key={item.id}
                className="bg-heritage-card border border-heritage-border rounded-2xl p-6 hover:shadow-xs transition-shadow flex gap-4 items-start"
              >
                <div className="w-12 h-12 rounded-xl bg-heritage-gold/15 text-heritage-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Palette className="w-6 h-6 stroke-[1.8]" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-lg font-bold text-heritage-deep">
                      {item.titleBn}
                    </h4>
                    {item.isDemo && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                        নমুনা তথ্য
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-heritage-muted leading-relaxed">
                    {item.descriptionBn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<Sparkles className="w-8 h-8 text-heritage-muted stroke-[1.5]" />}
            title="ঐতিহ্যের তথ্য শিগগিরই যোগ করা হবে"
            description={`${district.nameBn} জেলার লোকসংস্কৃতি ও ঐতিহ্যবাহী হস্তশিল্পের বিবরণী শীঘ্রই প্ল্যাটফর্মে যুক্ত হবে।`}
          />
        )}
      </div>

      {/* 2. Places of Interest (Only if data exists as required by task 5) */}
      {district.places.length > 0 && (
        <div className="space-y-6 pt-6 border-t border-heritage-border/70">
          <SectionHeading
            title="ঐতিহাসিক ও দর্শনীয় স্থান"
            subtitle={`${district.nameBn} জেলার বিখ্যাত স্থাপত্য, প্রকৃতি ও দর্শনীয় স্থানসমূহ।`}
            badge="পর্যটন ও ইতিহাস"
            align="left"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {district.places.map((place) => (
              <div
                key={place.id}
                className="bg-heritage-card border border-heritage-border rounded-2xl p-6 hover:shadow-xs transition-shadow flex gap-4 items-start"
              >
                <div className="w-12 h-12 rounded-xl bg-heritage-terracotta/10 text-heritage-terracotta flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-6 h-6 stroke-[1.8]" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <h4 className="text-lg font-bold text-heritage-deep">
                    {place.titleBn}
                  </h4>
                  <p className="text-xs sm:text-sm text-heritage-muted leading-relaxed">
                    {place.descriptionBn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

