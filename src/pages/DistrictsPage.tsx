import React, { useState, useEffect, useMemo } from 'react';
import { PageContainer } from '../components/common/PageContainer';
import { SectionHeading } from '../components/common/SectionHeading';
import { EmptyState } from '../components/common/EmptyState';
import { LoadingState } from '../components/common/LoadingState';
import { DemoDataNotice } from '../components/common/DemoDataNotice';
import { DistrictCard, DistrictFilters, SortOption } from '../components/districts';
import { districtService } from '../services';
import { District, DivisionBn, DivisionMeta } from '../types';
import { formatNumberBn } from '../utils';
import { SearchX, RotateCcw } from 'lucide-react';

export const DistrictsPage: React.FC = () => {
  const [districts, setDistricts] = useState<District[]>([]);
  const [divisions, setDivisions] = useState<readonly DivisionMeta[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDivision, setSelectedDivision] = useState<DivisionBn | 'all'>('all');
  const [sortOption, setSortOption] = useState<SortOption>('votes-desc');

  // Load districts and division metadata
  useEffect(() => {
    Promise.all([districtService.getAll(), districtService.getDivisions()]).then(
      ([allDistricts, allDivisions]) => {
        setDistricts(allDistricts);
        setDivisions(allDivisions);
        setLoading(false);
      }
    );
  }, []);

  // Filtered and Sorted Districts
  const filteredDistricts = useMemo(() => {
    let result = [...districts];

    // 1. Division filter
    if (selectedDivision !== 'all') {
      result = result.filter((d) => d.divisionBn === selectedDivision);
    }

    // 2. Search query (Bangla name, slug, or division)
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (d) =>
          d.nameBn.includes(q) ||
          d.slug.toLowerCase().includes(q) ||
          d.divisionBn.includes(q)
      );
    }

    // 3. Sorting
    switch (sortOption) {
      case 'votes-desc':
        result.sort((a, b) => b.voteCount - a.voteCount);
        break;
      case 'votes-asc':
        result.sort((a, b) => a.voteCount - b.voteCount);
        break;
      case 'name-asc':
        result.sort((a, b) => a.nameBn.localeCompare(b.nameBn, 'bn'));
        break;
      case 'division':
        result.sort((a, b) => a.divisionBn.localeCompare(b.divisionBn, 'bn'));
        break;
    }

    return result;
  }, [districts, searchQuery, selectedDivision, sortOption]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedDivision('all');
    setSortOption('votes-desc');
  };

  return (
    <div className="py-8 sm:py-14 space-y-8">
      <PageContainer>
        {/* Page Title & Editorial Header */}
        <SectionHeading
          title="বাংলাদেশের ৬৪ জেলা"
          subtitle="আটটি প্রশাসনিক বিভাগের প্রতিটি জেলার সমৃদ্ধ ঐতিহ্য, ঐতিহ্যবাহী খাদ্যসংস্কৃতি ও দর্শনীয় স্থান অন্বেষণ করুন।"
          badge="জেলা ডিরেক্টরি"
        />

        {/* Demo Notice Banner */}
        <div className="flex justify-center mb-6">
          <DemoDataNotice
            variant="inline"
            text="নমুনা পরিসংখ্যান • জেলাভিত্তিক ভোটের তথ্য শুধুমাত্র প্রদর্শনের উদ্দেশ্যে তৈরি"
          />
        </div>

        {/* Filter & Search Bar */}
        <DistrictFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedDivision={selectedDivision}
          onDivisionChange={setSelectedDivision}
          sortOption={sortOption}
          onSortChange={setSortOption}
          divisions={divisions}
          onReset={resetFilters}
        />

        {/* Result Counter & Active Status */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 text-xs sm:text-sm text-heritage-muted border-b border-heritage-border/70 pb-4">
          <div>
            <span>মোট </span>
            <strong className="text-heritage-deep font-bold">
              {formatNumberBn(districts.length)}টি
            </strong>
            <span> জেলার মধ্যে </span>
            <strong className="text-heritage-primary font-bold">
              {formatNumberBn(filteredDistricts.length)}টি
            </strong>
            <span> জেলা দেখানো হচ্ছে</span>
            {selectedDivision !== 'all' && (
              <span className="ml-1 text-heritage-deep font-semibold">
                ({selectedDivision} বিভাগ)
              </span>
            )}
          </div>

          {(searchQuery || selectedDivision !== 'all') && (
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-heritage-terracotta hover:text-heritage-deep transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>সকল ফিল্টার মুছুন</span>
            </button>
          )}
        </div>

        {/* District Grid / Empty State / Loading State */}
        {loading ? (
          <LoadingState message="৬৪ জেলার তথ্য লোড হচ্ছে..." />
        ) : filteredDistricts.length === 0 ? (
          <EmptyState
            icon={<SearchX className="w-8 h-8 text-heritage-terracotta stroke-[1.5]" />}
            title="কোনো জেলা খুঁজে পাওয়া যায়নি"
            description={`"${searchQuery}" অনুসন্ধানের সাথে মিলে এমন কোনো জেলা খুঁজে পাওয়া যায়নি। অনুগ্রহ করে বানান পরীক্ষা করুন অথবা ফিল্টার রিসেট করুন।`}
            actionText="আবার চেষ্টা করুন (ফিল্টার রিসেট)"
            onAction={resetFilters}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-2">
            {filteredDistricts.map((district) => (
              <DistrictCard
                key={district.id}
                district={district}
              />
            ))}
          </div>
        )}
      </PageContainer>
    </div>
  );
};
