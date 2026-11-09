import React from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { DivisionBn, DivisionMeta } from '../../types';

export type SortOption = 'votes-desc' | 'votes-asc' | 'name-asc' | 'division';

interface DistrictFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedDivision: DivisionBn | 'all';
  onDivisionChange: (division: DivisionBn | 'all') => void;
  sortOption: SortOption;
  onSortChange: (sort: SortOption) => void;
  divisions: readonly DivisionMeta[];
  onReset: () => void;
}

export const DistrictFilters: React.FC<DistrictFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedDivision,
  onDivisionChange,
  sortOption,
  onSortChange,
  divisions,
  onReset,
}) => {
  const isFiltered = searchQuery.trim() !== '' || selectedDivision !== 'all';

  return (
    <div className="w-full bg-heritage-card border border-heritage-border rounded-2xl p-4 sm:p-6 shadow-xs space-y-4">
      {/* Top Row: Search Input & Sort Dropdown */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-heritage-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="জেলার নাম বা স্ল্যাগ দিয়ে খুঁজুন (যেমন: ঢাকা, বগুড়া, sylhet)..."
            className="w-full pl-10 pr-9 py-2.5 bg-heritage-paper rounded-xl border border-heritage-border text-sm text-heritage-text placeholder:text-heritage-muted focus:outline-none focus:ring-2 focus:ring-heritage-primary focus:border-transparent transition-all"
            aria-label="জেলা খুঁজুন"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-heritage-muted hover:text-heritage-deep p-1 rounded-md"
              aria-label="অনুসন্ধান মুছুন"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <SlidersHorizontal className="w-4 h-4 text-heritage-muted hidden sm:block" />
          <label htmlFor="district-sort" className="sr-only">
            সাজানোর ক্রম
          </label>
          <select
            id="district-sort"
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="w-full sm:w-auto py-2.5 px-3 bg-heritage-paper rounded-xl border border-heritage-border text-xs sm:text-sm font-semibold text-heritage-deep focus:outline-none focus:ring-2 focus:ring-heritage-primary"
          >
            <option value="votes-desc">বেশি ভোট পাওয়া (শীর্ষে)</option>
            <option value="votes-asc">কম ভোট পাওয়া</option>
            <option value="name-asc">নাম অনুযায়ী (ক-য়)</option>
            <option value="division">বিভাগ অনুযায়ী</option>
          </select>
        </div>
      </div>

      {/* Bottom Row: Division Chips */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-heritage-muted">
            বিভাগ অনুযায়ী ফিল্টার করুন:
          </span>
          {isFiltered && (
            <button
              type="button"
              onClick={onReset}
              className="text-xs font-semibold text-heritage-terracotta hover:underline"
            >
              ফিল্টার রিসেট
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none flex-wrap">
          <button
            type="button"
            onClick={() => onDivisionChange('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
              selectedDivision === 'all'
                ? 'bg-heritage-primary text-white shadow-xs'
                : 'bg-heritage-paper text-heritage-deep border border-heritage-border hover:bg-heritage-border/40'
            }`}
          >
            সকল বিভাগ (৬৪)
          </button>

          {divisions.map((div) => {
            const isSelected = selectedDivision === div.nameBn;
            return (
              <button
                key={div.slug}
                type="button"
                onClick={() => onDivisionChange(div.nameBn)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 whitespace-nowrap ${
                  isSelected
                    ? 'bg-heritage-primary text-white shadow-xs'
                    : 'bg-heritage-paper text-heritage-deep border border-heritage-border hover:bg-heritage-border/40'
                }`}
              >
                <span>{div.nameBn}</span>
                <span className="ml-1 text-[10px] opacity-75">
                  ({div.count})
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
