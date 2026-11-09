import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass } from 'lucide-react';
import { District } from '../../types';
import { districtService } from '../../services';
import { DistrictCard } from '../districts/DistrictCard';
import { SectionHeading } from '../common/SectionHeading';

interface RelatedDistrictsProps {
  currentDistrict: District;
}

export const RelatedDistricts: React.FC<RelatedDistrictsProps> = ({
  currentDistrict,
}) => {
  const [related, setRelated] = useState<District[]>([]);

  useEffect(() => {
    districtService.getByDivision(currentDistrict.divisionBn).then((districts) => {
      // Filter out current district and take up to 3
      const filtered = districts
        .filter((d) => d.id !== currentDistrict.id)
        .slice(0, 3);
      setRelated(filtered);
    });
  }, [currentDistrict]);

  if (related.length === 0) {
    return null;
  }

  return (
    <section className="space-y-6 pt-6 border-t border-heritage-border/70">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <SectionHeading
          title={`${currentDistrict.divisionBn} বিভাগের অন্যান্য জেলা`}
          subtitle="একই বিভাগের আশেপাশের আরও আকর্ষণীয় জেলা ও ঐতিহ্য অন্বেষণ করুন।"
          badge="আরও অন্বেষণ"
          align="left"
        />

        <Link
          to={`/districts`}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-heritage-primary hover:text-heritage-deep transition-colors mb-8"
        >
          <Compass className="w-4 h-4" />
          <span>সকল জেলা দেখুন</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {related.map((district) => (
          <DistrictCard key={district.id} district={district} />
        ))}
      </div>
    </section>
  );
};
