import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, Heart, Trophy } from 'lucide-react';
import { LeaderboardEntry, DivisionBn } from '../../types';
import { formatNumberBn } from '../../utils';

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
}

export const LeaderboardTable: React.FC<LeaderboardTableProps> = ({
  entries,
}) => {
  const [search, setSearch] = useState('');
  const [divisionFilter, setDivisionFilter] = useState<DivisionBn | 'all'>('all');

  const divisions: DivisionBn[] = [
    'ঢাকা',
    'চট্টগ্রাম',
    'খুলনা',
    'রাজশাহী',
    'রংপুর',
    'সিলেট',
    'বরিশাল',
    'ময়মনসিংহ',
  ];

  const filteredEntries = useMemo(() => {
    let list = [...entries];

    if (divisionFilter !== 'all') {
      list = list.filter((item) => item.divisionBn === divisionFilter);
    }

    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (item) =>
          item.districtNameBn.includes(q) ||
          item.districtSlug.toLowerCase().includes(q) ||
          item.divisionBn.includes(q)
      );
    }

    return list;
  }, [entries, search, divisionFilter]);

  return (
    <div className="w-full space-y-4">
      {/* Search and Division Filter Bar */}
      <div className="bg-heritage-card border border-heritage-border rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-heritage-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="র‍্যাঙ্কিংয়ে নিজের জেলা খুঁজুন..."
            className="w-full pl-10 pr-4 py-2 bg-heritage-paper rounded-xl border border-heritage-border text-sm text-heritage-text placeholder:text-heritage-muted focus:outline-none focus:ring-2 focus:ring-heritage-primary focus:border-transparent transition-all"
          />
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="division-filter" className="text-xs font-semibold text-heritage-muted sr-only">
            বিভাগ ফিল্টার
          </label>
          <select
            id="division-filter"
            value={divisionFilter}
            onChange={(e) => setDivisionFilter(e.target.value as DivisionBn | 'all')}
            className="py-2 px-3 bg-heritage-paper rounded-xl border border-heritage-border text-xs sm:text-sm font-semibold text-heritage-deep focus:outline-none focus:ring-2 focus:ring-heritage-primary"
          >
            <option value="all">সকল বিভাগ</option>
            {divisions.map((div) => (
              <option key={div} value={div}>
                {div} বিভাগ
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Result Status Count */}
      <div className="flex items-center justify-between text-xs text-heritage-muted px-1">
        <span>
          প্রদর্শিত হচ্ছে: <strong className="text-heritage-deep">{formatNumberBn(filteredEntries.length)}টি</strong> জেলা
        </span>
        <span className="text-[11px] font-medium text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
          ডেমো ভোটের তালিকা
        </span>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-heritage-card border border-heritage-border rounded-2xl overflow-hidden shadow-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-heritage-paper border-b border-heritage-border text-xs font-bold text-heritage-deep uppercase tracking-wider">
              <th className="py-3.5 px-6 w-20 text-center">স্থান</th>
              <th className="py-3.5 px-6">জেলার নাম</th>
              <th className="py-3.5 px-6">প্রশাসনিক বিভাগ</th>
              <th className="py-3.5 px-6 text-right">নমুনা ভোট</th>
              <th className="py-3.5 px-6 text-center w-32">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-heritage-border/70 text-sm">
            {filteredEntries.map((item) => {
              const isTop3 = item.rank <= 3;
              return (
                <tr
                  key={item.districtId}
                  className={`hover:bg-heritage-paper/50 transition-colors ${
                    isTop3 ? 'bg-amber-50/20 font-medium' : ''
                  }`}
                >
                  <td className="py-4 px-6 text-center">
                    <span
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold ${
                        item.rank === 1
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : item.rank === 2
                          ? 'bg-slate-200 text-slate-800 border border-slate-300'
                          : item.rank === 3
                          ? 'bg-orange-100 text-orange-800 border border-orange-300'
                          : 'bg-heritage-paper text-heritage-muted border border-heritage-border'
                      }`}
                    >
                      {formatNumberBn(item.rank)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-heritage-deep text-base">
                        {item.districtNameBn}
                      </span>
                      {isTop3 && (
                        <Trophy className="w-3.5 h-3.5 text-heritage-gold flex-shrink-0" />
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-heritage-muted">
                    {item.divisionBn} বিভাগ
                  </td>
                  <td className="py-4 px-6 text-right">
                    <span className="font-bold text-heritage-primary text-base font-mono">
                      {formatNumberBn(item.voteCount)}
                    </span>
                    <span className="text-xs text-heritage-muted ml-1">ভোট</span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <Link
                      to={`/district/${item.districtSlug}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-heritage-primary hover:text-heritage-deep hover:underline"
                    >
                      <span>বিস্তারিত</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Cards View (no horizontal scroll) */}
      <div className="md:hidden space-y-3">
        {filteredEntries.map((item) => {
          const isTop3 = item.rank <= 3;
          return (
            <div
              key={item.districtId}
              className={`p-4 rounded-2xl border transition-all ${
                isTop3
                  ? 'bg-gradient-to-r from-amber-50/50 to-heritage-card border-amber-200 shadow-xs'
                  : 'bg-heritage-card border-heritage-border'
              } flex items-center justify-between gap-3`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold flex-shrink-0 ${
                    item.rank === 1
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : item.rank === 2
                      ? 'bg-slate-200 text-slate-800 border border-slate-300'
                      : item.rank === 3
                      ? 'bg-orange-100 text-orange-800 border border-orange-300'
                      : 'bg-heritage-paper text-heritage-muted border border-heritage-border'
                  }`}
                >
                  {formatNumberBn(item.rank)}
                </span>
                <div>
                  <h4 className="font-bold text-heritage-deep text-base leading-snug">
                    {item.districtNameBn}
                  </h4>
                  <p className="text-xs text-heritage-muted">
                    {item.divisionBn} বিভাগ
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                <div className="flex items-center gap-1 text-xs font-bold text-heritage-primary bg-heritage-paper px-2.5 py-1 rounded-lg border border-heritage-border">
                  <Heart className="w-3 h-3 text-heritage-terracotta fill-heritage-terracotta/40" />
                  <span>{formatNumberBn(item.voteCount)} ডেমো ভোট</span>
                </div>
                <Link
                  to={`/district/${item.districtSlug}`}
                  className="text-[11px] font-semibold text-heritage-primary hover:underline flex items-center gap-0.5"
                >
                  <span>বিস্তারিত</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

