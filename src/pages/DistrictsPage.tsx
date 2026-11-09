import React from 'react';
import { PageContainer } from '../components/common/PageContainer';
import { SectionHeading } from '../components/common/SectionHeading';
import { EmptyState } from '../components/common/EmptyState';
import { MapPin } from 'lucide-react';

export const DistrictsPage: React.FC = () => {
  return (
    <div className="py-10 md:py-16">
      <PageContainer>
        <SectionHeading
          title="বাংলাদেশের ৬৪ জেলা"
          subtitle="আটটি প্রশাসনিক বিভাগের প্রতিটি জেলার ঐতিহ্য, বিখ্যাত খাবার ও সাংস্কৃতিক বৈচিত্র্য।"
          badge="৬৪ জেলা অন্বেষণ"
        />

        <EmptyState
          icon={<MapPin className="w-8 h-8 text-heritage-primary stroke-[1.5]" />}
          title="৬৪ জেলার তালিকা শীঘ্রই আসছে"
          description="স্টেপ ৩-এ আটটি বিভাগের সম্পূর্ণ ৬৪ জেলার সমৃদ্ধ ডেটা সেট এবং ব্রাউজিং ইন্টারফেস সংযুক্ত করা হবে।"
        />
      </PageContainer>
    </div>
  );
};
