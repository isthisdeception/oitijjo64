import React from 'react';
import { Landmark, Calendar, MapPin } from 'lucide-react';
import { District } from '../../types';
import { SectionHeading } from '../common/SectionHeading';
import { APP_CONFIG } from '../../utils/constants';

interface DistrictEventSectionProps {
  district: District;
}

export const DistrictEventSection: React.FC<DistrictEventSectionProps> = ({
  district,
}) => {
  return (
    <section id="event" className="scroll-mt-32 space-y-6">
      <SectionHeading
        title="ঐতিহ্যের হাট ৫.০-তে এই জেলার আয়োজন"
        subtitle={`${APP_CONFIG.eventContextBn}-এ ${district.nameBn} জেলার স্টল ও প্রদর্শনীর আনুষ্ঠানিক তথ্যাবলী।`}
        badge="মেলার আয়োজন"
        align="left"
      />

      {district.eventItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {district.eventItems.map((event) => (
            <div
              key={event.id}
              className="bg-heritage-card border border-heritage-border rounded-2xl p-6 shadow-xs flex gap-4 items-start"
            >
              <div className="w-12 h-12 rounded-xl bg-heritage-primary/10 text-heritage-primary flex items-center justify-center flex-shrink-0">
                <Landmark className="w-6 h-6 stroke-[1.8]" />
              </div>
              <div className="space-y-1.5 flex-1">
                <h4 className="text-lg font-bold text-heritage-deep">
                  {event.titleBn}
                </h4>
                <p className="text-xs sm:text-sm text-heritage-muted leading-relaxed">
                  {event.descriptionBn}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Exact required empty state from plan.md rule 7 & Task 6 */
        <div className="bg-heritage-card border border-dashed border-heritage-border rounded-2xl p-8 sm:p-10 text-center max-w-2xl mx-auto space-y-4">
          <div className="w-14 h-14 mx-auto rounded-full bg-heritage-paper flex items-center justify-center text-heritage-muted border border-heritage-border">
            <Landmark className="w-7 h-7 stroke-[1.5]" />
          </div>

          <div className="space-y-1.5">
            <h4 className="text-base sm:text-lg font-bold text-heritage-deep">
              এই জেলার মেলার প্রদর্শনীর তথ্য এখনো যোগ করা হয়নি।
            </h4>
            <p className="text-xs sm:text-sm text-heritage-muted leading-relaxed max-w-md mx-auto">
              আয়োজক কমিটি বা সংশ্লিষ্ট জেলা দল থেকে যাচাইকৃত স্টল ও প্রদর্শনীর তালিকা পাওয়া মাত্রই এখানে যুক্ত করা হবে।
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs text-heritage-muted">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-heritage-paper border border-heritage-border">
              <Calendar className="w-3.5 h-3.5 text-heritage-primary" />
              <span>{APP_CONFIG.eventContextBn}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-heritage-paper border border-heritage-border">
              <MapPin className="w-3.5 h-3.5 text-heritage-terracotta" />
              <span>ড্যাফোডিল স্মার্ট সিটি</span>
            </span>
          </div>
        </div>
      )}
    </section>
  );
};

