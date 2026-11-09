import React from 'react';
import { Vote, Image as ImageIcon, Sparkles } from 'lucide-react';
import { District } from '../../types';
import { formatNumberBn } from '../../utils';

interface DistrictActionCardProps {
  district: District;
  onVoteClick: () => void;
  onPosterClick: () => void;
}

export const DistrictActionCard: React.FC<DistrictActionCardProps> = ({
  district,
  onVoteClick,
  onPosterClick,
}) => {
  return (
    <section id="actions" className="scroll-mt-32">
      <div className="bg-gradient-to-br from-heritage-deep to-[#0F2922] text-white rounded-3xl p-8 sm:p-12 shadow-md relative overflow-hidden">
        {/* Background Decorative Rings */}
        <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -left-12 -top-12 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-heritage-gold text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>আমার জেলা, আমার গর্ব</span>
          </div>

          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
            {district.nameBn} জেলাকে আপনার সমর্থন জানান
          </h3>

          <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-lg mx-auto">
            বর্তমানে এই জেলায় <strong className="text-heritage-gold">{formatNumberBn(district.voteCount)}টি</strong> নমুনা ভোট রয়েছে। নিজের জেলাকে শীর্ষে পৌঁছে দিতে ভোট দিন এবং আকর্ষণীয় পোস্টার তৈরি করুন।
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={onVoteClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-heritage-deep bg-white hover:bg-heritage-paper transition-all shadow-sm"
            >
              <Vote className="w-5 h-5 text-heritage-primary" />
              <span>এই জেলাকে ভোট দিন</span>
            </button>

            <button
              type="button"
              onClick={onPosterClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-white bg-heritage-terracotta hover:bg-[#A34F37] transition-all shadow-sm"
            >
              <ImageIcon className="w-5 h-5" />
              <span>নিজের জেলার পোস্টার তৈরি করুন</span>
            </button>
          </div>

          <p className="text-[11px] text-white/60 pt-2">
            * ভোট প্রদানের জন্য গুগল সাইন-ইন প্রয়োজন। পোস্টার তৈরিতে কোনো লগইন প্রয়োজন নেই।
          </p>
        </div>
      </div>
    </section>
  );
};
