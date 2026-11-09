import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageContainer } from '../components/common/PageContainer';
import { LoadingState } from '../components/common/LoadingState';
import { EmptyState } from '../components/common/EmptyState';
import { PosterCard, PosterControls, PosterTemplate } from '../components/poster';
import { districtService } from '../services';
import { District } from '../types';
import { ArrowLeft, Sparkles, MapPin } from 'lucide-react';

export const PosterPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [district, setDistrict] = useState<District | null>(null);
  const [loading, setLoading] = useState(true);

  // Poster customization states
  const [userName, setUserName] = useState('');
  const [userImage, setUserImage] = useState<string | null>(null);
  const [template, setTemplate] = useState<PosterTemplate>('heritage');

  const posterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    setLoading(true);
    districtService.getBySlug(slug).then((data) => {
      setDistrict(data);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="py-20">
        <PageContainer>
          <LoadingState message="পোস্টার ওয়ার্কস্পেস প্রস্তুত করা হচ্ছে..." />
        </PageContainer>
      </div>
    );
  }

  if (!district) {
    return (
      <div className="py-20">
        <PageContainer size="narrow">
          <EmptyState
            icon={<MapPin className="w-10 h-10 text-heritage-terracotta stroke-[1.5]" />}
            title="জেলাটি পাওয়া যায়নি"
            description="যে জেলার জন্য পোস্টার তৈরি করতে চাইছেন তা খুঁজে পাওয়া যায়নি।"
            actionText="সকল ৬৪ জেলা দেখুন"
            onAction={() => (window.location.href = '/districts')}
          />
        </PageContainer>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-14 space-y-8">
      <PageContainer>
        {/* Top Back Link & Heading */}
        <div className="space-y-4 mb-2">
          <Link
            to={`/district/${district.slug}`}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-heritage-primary hover:text-heritage-deep transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{district.nameBn} জেলার পাতায় ফিরে যান</span>
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-heritage-primary/10 text-heritage-primary text-xs font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-heritage-gold" />
                <span>পাবলিক পোস্টার জেনারেটর</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-heritage-deep tracking-tight">
                {district.nameBn} জেলার ডিজিটাল পোস্টার তৈরি করুন
              </h1>
            </div>

            <div className="text-xs text-heritage-muted sm:text-right">
              <span className="block font-medium">ঐতিহ্যের হাট ৫.০ ক্যাম্পেইন</span>
              <span className="text-[11px]">কোনো সাইন-ইন বা ফি ছাড়াই প্রস্তুত করুন</span>
            </div>
          </div>
        </div>

        {/* Generator Layout: Controls on Left, Live Preview on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
          {/* Controls Column */}
          <div className="lg:col-span-5 w-full">
            <PosterControls
              district={district}
              userName={userName}
              onUserNameChange={setUserName}
              userImage={userImage}
              onUserImageChange={setUserImage}
              template={template}
              onTemplateChange={setTemplate}
              posterRef={posterRef}
            />
          </div>

          {/* Live Preview Column */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="w-full bg-heritage-card/80 border border-heritage-border rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center shadow-xs overflow-hidden">
              <div className="text-xs font-bold text-heritage-muted uppercase tracking-wider mb-4">
                লাইভ পোস্টার প্রিভিউ (৪:৫ অনুপাত)
              </div>

              {/* Responsive Container for the Fixed Dimension Card */}
              <div className="w-full overflow-x-auto flex justify-center py-2">
                <div className="transform scale-[0.68] sm:scale-90 md:scale-100 origin-top transition-transform">
                  <PosterCard
                    district={district}
                    userName={userName}
                    userImage={userImage}
                    template={template}
                    posterRef={posterRef}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  );
};

