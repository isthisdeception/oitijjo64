import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { PageContainer } from '../components/common/PageContainer';
import { LoadingState } from '../components/common/LoadingState';
import { EmptyState } from '../components/common/EmptyState';
import {
  DistrictHero,
  DistrictSectionNav,
  DistrictFoodSection,
  DistrictHeritageSection,
  DistrictEventSection,
  DistrictActionCard,
  RelatedDistricts,
} from '../components/district-detail';
import { districtService } from '../services';
import { District } from '../types';
import { useVoting } from '../context/VoteContext';
import { MapPin, Compass } from 'lucide-react';

export const DistrictDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const [district, setDistrict] = useState<District | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { openVoteModal } = useVoting();

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    setLoading(true);
    districtService.getBySlug(slug).then((data) => {
      setDistrict(data);
      setLoading(false);

      // If URL has ?action=vote, automatically trigger the voting modal
      if (data && searchParams.get('action') === 'vote') {
        openVoteModal(data);
      }
    });
  }, [slug, searchParams]);

  // Handle vote button click using the real Step 8 voting dialog
  const handleVoteClick = () => {
    if (district) {
      openVoteModal(district);
    }
  };

  // Handle poster button click navigating to poster generator (Step 9)
  const handlePosterClick = () => {
    if (district) {
      navigate(`/poster/${district.slug}`);
    }
  };

  if (loading) {
    return (
      <div className="py-20">
        <PageContainer>
          <LoadingState message="জেলার তথ্য সংগ্রহ করা হচ্ছে..." />
        </PageContainer>
      </div>
    );
  }

  // 404 / Invalid slug state
  if (!district) {
    return (
      <div className="py-20">
        <PageContainer size="narrow">
          <EmptyState
            icon={<MapPin className="w-10 h-10 text-heritage-terracotta stroke-[1.5]" />}
            title="জেলাটি খুঁজে পাওয়া যায়নি"
            description={`"${slug}" নামে কোনো জেলার রেকর্ড সংরক্ষিত নেই। অনুগ্রহ করে বানান পরীক্ষা করুন অথবা ৬৪ জেলার তালিকায় ফিরে যান।`}
            actionText="সকল ৬৪ জেলা দেখুন"
            onAction={() => (window.location.href = '/districts')}
          />
        </PageContainer>
      </div>
    );
  }

  return (
    <div className="pb-16 sm:pb-24 space-y-10 sm:space-y-14">
      {/* 1. District Hero & Breadcrumbs */}
      <section className="pt-6 sm:pt-10">
        <PageContainer>
          <DistrictHero
            district={district}
            onVoteClick={handleVoteClick}
            onPosterClick={handlePosterClick}
          />
        </PageContainer>
      </section>

      {/* 2. Compact Section Navigation */}
      <DistrictSectionNav />

      {/* 3. Main Content Sections */}
      <PageContainer>
        <div className="space-y-16">
          {/* Overview Section */}
          <section id="overview" className="scroll-mt-32 space-y-4">
            <div className="bg-heritage-card border border-heritage-border rounded-3xl p-6 sm:p-10 shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <Compass className="w-5 h-5 text-heritage-primary" />
                <h3 className="text-xl sm:text-2xl font-bold text-heritage-deep">
                  জেলার পরিচিতি ও ভৌগোলিক গুরুত্ব
                </h3>
              </div>
              <p className="text-sm sm:text-base text-heritage-muted leading-relaxed">
                {district.introBn} {district.nameBn} জেলাটি {district.divisionBn} বিভাগের একটি অন্যতম গুরুত্বপূর্ণ ঐতিহ্যবাহী প্রশাসনিক অঞ্চল। এ অঞ্চলের সংস্কৃতি, কৃষ্টি এবং ঐতিহাসিক নিদর্শনসমূহ বাংলাদেশের জাতীয় সমৃদ্ধির অবিচ্ছেদ্য অংশ।
              </p>
            </div>
          </section>

          {/* Foods Section */}
          <DistrictFoodSection district={district} />

          {/* Heritage & Places Section */}
          <DistrictHeritageSection district={district} />

          {/* Event Section */}
          <DistrictEventSection district={district} />

          {/* Vote & Poster Action Card */}
          <DistrictActionCard
            district={district}
            onVoteClick={handleVoteClick}
            onPosterClick={handlePosterClick}
          />

          {/* Related / Other Districts in Division */}
          <RelatedDistricts currentDistrict={district} />
        </div>
      </PageContainer>
    </div>
  );
};
