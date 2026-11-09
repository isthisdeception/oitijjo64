import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageContainer } from '../components/common/PageContainer';
import { EmptyState } from '../components/common/EmptyState';
import { MapPin, ArrowLeft } from 'lucide-react';

export const DistrictDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  return (
    <div className="py-10 md:py-16">
      <PageContainer>
        <div className="mb-8">
          <Link
            to="/districts"
            className="inline-flex items-center gap-2 text-sm font-semibold text-heritage-primary hover:text-heritage-deep transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>সকল জেলায় ফিরে যান</span>
          </Link>
        </div>

        <EmptyState
          icon={<MapPin className="w-8 h-8 text-heritage-primary stroke-[1.5]" />}
          title={`জেলার বিবরণী (${slug || 'অজানা'})`}
          description="স্টেপ ৫-এ বিস্তারিত জেলা পরিচিতি, ঐতিহ্যবাহী খাবার, দর্শনীয় স্থান ও আয়োজন যুক্ত করা হবে।"
        />
      </PageContainer>
    </div>
  );
};
