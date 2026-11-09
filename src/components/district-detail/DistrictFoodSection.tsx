import React from 'react';
import { Utensils } from 'lucide-react';
import { District } from '../../types';
import { SectionHeading } from '../common/SectionHeading';
import { EmptyState } from '../common/EmptyState';

interface DistrictFoodSectionProps {
  district: District;
}

export const DistrictFoodSection: React.FC<DistrictFoodSectionProps> = ({
  district,
}) => {
  return (
    <section id="foods" className="scroll-mt-32 space-y-6">
      <SectionHeading
        title="বিখ্যাত খাবার ও রসনা বিলাস"
        subtitle={`${district.nameBn} জেলার শতাব্দীপ্রাচীন বিখ্যাত সব মিষ্টি, ঐতিহ্যবাহী খাবার ও বিশেষ স্বাদের গল্প।`}
        badge="খাদ্য ঐতিহ্য"
        align="left"
      />

      {district.foods.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {district.foods.map((food) => (
            <div
              key={food.id}
              className="bg-heritage-card border border-heritage-border rounded-2xl p-6 hover:shadow-xs transition-shadow flex gap-4 items-start"
            >
              <div className="w-12 h-12 rounded-xl bg-heritage-primary/10 text-heritage-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                <Utensils className="w-6 h-6 stroke-[1.8]" />
              </div>
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-lg font-bold text-heritage-deep">
                    {food.nameBn}
                  </h4>
                  {food.isDemo && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                      নমুনা তথ্য
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-heritage-muted leading-relaxed">
                  {food.descriptionBn}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Utensils className="w-8 h-8 text-heritage-muted stroke-[1.5]" />}
          title="খাবারের তথ্য শিগগিরই যোগ করা হবে"
          description={`ঐতিহ্যের হাট ৫.০-এর জন্য ${district.nameBn} জেলার বিখ্যাত খাবার ও মিষ্টির তথ্য এখনো হালনাগাদ করা হয়নি।`}
        />
      )}
    </section>
  );
};
