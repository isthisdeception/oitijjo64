import React from 'react';
import { Vote, Check } from 'lucide-react';
import { District } from '../../types';
import { useVoting } from '../../context/VoteContext';

interface VoteButtonProps {
  district: District;
  variant?: 'primary' | 'secondary' | 'sm';
  className?: string;
}

export const VoteButton: React.FC<VoteButtonProps> = ({
  district,
  variant = 'primary',
  className = '',
}) => {
  const { openVoteModal, hasVoted, votedDistrictId, isDeadlinePassed } = useVoting();

  const isCurrentVoted = hasVoted && votedDistrictId === district.id;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openVoteModal(district);
  };

  if (isCurrentVoted) {
    return (
      <span
        className={`inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-100/80 border border-emerald-300 ${className}`}
      >
        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
        <span>ভোট দিয়েছেন</span>
      </span>
    );
  }

  if (isDeadlinePassed) {
    return (
      <button
        type="button"
        disabled
        className={`inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold text-slate-400 bg-slate-100 border border-slate-200 cursor-not-allowed ${className}`}
      >
        <span>ভোট বন্ধ</span>
      </button>
    );
  }

  const baseStyles =
    variant === 'sm'
      ? 'py-1.5 px-3 text-xs'
      : variant === 'secondary'
      ? 'py-2.5 px-5 text-sm bg-heritage-paper hover:bg-heritage-border/60 text-heritage-deep border border-heritage-border'
      : 'py-2 px-3.5 text-xs sm:text-sm font-semibold text-white bg-heritage-primary hover:bg-heritage-deep shadow-xs';

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center justify-center gap-1.5 rounded-xl transition-all ${baseStyles} ${className}`}
      aria-label={`${district.nameBn} জেলাকে ভোট দিন`}
    >
      <Vote className="w-3.5 h-3.5" />
      <span>ভোট দিন</span>
    </button>
  );
};

