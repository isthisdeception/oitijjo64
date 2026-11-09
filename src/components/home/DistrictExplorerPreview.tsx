import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, Heart } from 'lucide-react';
import { districtService } from '../../services';
import { District } from '../../types';
import { formatNumberBn } from '../../utils';
import { SectionHeading } from '../common/SectionHeading';

export const DistrictExplorerPreview: React.FC = () => {
  const [districts, setDistricts] = useState<District[]>([]);

  useEffect(() => {
    districtService.getAll().then((data) => {
      // Pick a representative preview selection (8 districts across divisions)
      const previewSlugs = [
        'dhaka',
        'chattogram',
        'sylhet',
        'bogura',
        'barishal',
        'khulna',
        'rangpur',
        'mymensingh',
      ];
      const selected = data.filter((d) => previewSlugs.includes(d.slug));
      setDistricts(selected);
    });
  }, []);

  return (
    <section className="w-full">
      <SectionHeading
        title="৬৪ জেলার ঐতিহ্য অন্বেষণ"
        subtitle="বাংলাদেশের প্রতিটি জনপদের ইতিহাস, কৃষ্টি ও অনন্য খাদ্যসংস্কৃতি এক নজরে জানুন।"
        badge="জেলা অনুসন্ধান"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {districts.map((district) => (
          <div
            key={district.id}
            className="group bg-heritage-card border border-heritage-border rounded-2xl p-5 hover:border-heritage-primary/40 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              {/* Card Header & Division Tag */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-heritage-paper text-heritage-primary border border-heritage-border">
                  {district.divisionBn} বিভাগ
                </span>
                <span className="text-[11px] text-heritage-muted flex items-center gap-1 font-medium">
                  <Heart className="w-3 h-3 text-heritage-terracotta fill-heritage-terracotta/40" />
                  <span>{formatNumberBn(district.voteCount)} ডেমো ভোট</span>
                </span>
              </div>

              {/* District Name & Intro */}
              <h3 className="text-xl font-bold text-heritage-deep group-hover:text-heritage-primary transition-colors mb-2">
                {district.nameBn}
              </h3>
              <p className="text-xs text-heritage-muted line-clamp-2 leading-relaxed mb-4">
                {district.introBn}
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-heritage-border flex items-center justify-between text-xs">
              <Link
                to={`/district/${district.slug}`}
                className="font-semibold text-heritage-primary hover:text-heritage-deep flex items-center gap-1"
              >
                <span>বিস্তারিত দেখুন</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <span className="text-[10px] text-heritage-muted">ঐতিহ্য ৬৪</span>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link
          to="/districts"
          className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-white bg-heritage-primary hover:bg-heritage-deep transition-all shadow-xs hover:shadow"
        >
          <MapPin className="w-4 h-4" />
          <span>সকল ৬৪ জেলা দেখুন ও অনুসন্ধান করুন</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};
