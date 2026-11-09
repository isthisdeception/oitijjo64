import React from 'react';
import { PageContainer } from '../components/common/PageContainer';
import { SectionHeading } from '../components/common/SectionHeading';
import { EmptyState } from '../components/common/EmptyState';
import { DemoDataNotice } from '../components/common/DemoDataNotice';
import { Trophy } from 'lucide-react';

export const LeaderboardPage: React.FC = () => {
  return (
    <div className="py-10 md:py-16">
      <PageContainer>
        <SectionHeading
          title="জেলা ভোটের লিডারবোর্ড"
          subtitle="জনপ্রিয়তার ভিত্তিতে জেলার অবস্থান ও নমুনা ভোটের পরিসংখ্যান।"
          badge="র‍্যাঙ্কিং ও ফলাফল"
        />

        <div className="flex justify-center mb-8">
          <DemoDataNotice variant="inline" />
        </div>

        <EmptyState
          icon={<Trophy className="w-8 h-8 text-heritage-gold stroke-[1.5]" />}
          title="লিডারবোর্ড তথ্য লোড হচ্ছে"
          description="স্টেপ ৬-এ সম্পূর্ণ ৬৪ জেলার রিয়েলটাইম লিডারবোর্ড ও শীর্ষ জেলার তালিকা বাস্তবায়িত হবে।"
        />
      </PageContainer>
    </div>
  );
};
