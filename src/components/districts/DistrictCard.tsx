import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Vote, Heart } from 'lucide-react';
import { District } from '../../types';
import { formatNumberBn } from '../../utils';
import { DistrictPlaceholderThumbnail } from './DistrictPlaceholderThumbnail';

interface DistrictCardProps {
  district: District;
  onVoteClick?: (district: District) => void;
}

export const DistrictCard: React.FC<DistrictCardProps> = ({
  district,
  onVoteClick,
}) => {
  return (
    <article className="group bg-heritage-card border border-heritage-border rounded-2xl p-4 sm:p-5 flex flex-col justify-between hover:border-heritage-primary/50 hover:shadow-md transition-all duration-200">
      <div>
        {/* Visual / Thumbnail Placeholder */}
        <Link
          to={`/district/${district.slug}`}
          className="block mb-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-heritage-primary rounded-xl"
          tabIndex={-1}
          aria-hidden="true"
        >
          <DistrictPlaceholderThumbnail district={district} size="sm" />
        </Link>

        {/* Division & Demo Vote Counter */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-heritage-paper text-heritage-primary border border-heritage-border">
            {district.divisionBn} বিভাগ
          </span>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
            <Heart className="w-3 h-3 text-heritage-terracotta fill-heritage-terracotta/40" />
            <span>{formatNumberBn(district.voteCount)} নমুনা ভোট</span>
          </div>
        </div>

        {/* District Name */}
        <h3 className="text-xl font-bold text-heritage-deep group-hover:text-heritage-primary transition-colors mb-2">
          <Link
            to={`/district/${district.slug}`}
            className="focus:outline-none focus-visible:underline"
          >
            {district.nameBn}
          </Link>
        </h3>

        {/* Short Introduction */}
        <p className="text-xs sm:text-sm text-heritage-muted line-clamp-2 leading-relaxed mb-4">
          {district.introBn}
        </p>
      </div>

      {/* Action Buttons: বিস্তারিত দেখুন & ভোট দিন */}
      <div className="pt-3.5 border-t border-heritage-border/80 flex items-center gap-2">
        <Link
          to={`/district/${district.slug}`}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs sm:text-sm font-semibold text-heritage-deep bg-heritage-paper hover:bg-heritage-border/50 border border-heritage-border transition-colors text-center"
        >
          <span>বিস্তারিত দেখুন</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        <button
          type="button"
          onClick={() => {
            if (onVoteClick) {
              onVoteClick(district);
            } else {
              // Default fallback: navigate to district detail with vote action query
              window.location.href = `/district/${district.slug}?action=vote`;
            }
          }}
          className="inline-flex items-center justify-center gap-1.5 py-2 px-3.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-heritage-primary hover:bg-heritage-deep transition-colors shadow-xs"
          aria-label={`${district.nameBn} জেলাকে ভোট দিন`}
        >
          <Vote className="w-3.5 h-3.5" />
          <span>ভোট দিন</span>
        </button>
      </div>
    </article>
  );
};

