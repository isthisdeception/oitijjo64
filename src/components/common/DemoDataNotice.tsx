import React from 'react';
import { Info } from 'lucide-react';
import { APP_CONFIG } from '../../utils/constants';

interface DemoDataNoticeProps {
  text?: string;
  className?: string;
  variant?: 'banner' | 'inline' | 'tag';
}

export const DemoDataNotice: React.FC<DemoDataNoticeProps> = ({
  text = APP_CONFIG.demoNoticeBn,
  className = '',
  variant = 'tag',
}) => {
  if (variant === 'tag') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200/70 ${className}`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
        <span>{text}</span>
      </span>
    );
  }

  if (variant === 'inline') {
    return (
      <div
        className={`inline-flex items-center gap-2 text-xs text-amber-700 bg-amber-50/80 px-3 py-1.5 rounded-lg border border-amber-200/60 ${className}`}
      >
        <Info className="w-3.5 h-3.5 flex-shrink-0 text-amber-600" />
        <span>{text}</span>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center gap-3 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-sm ${className}`}
    >
      <Info className="w-4 h-4 flex-shrink-0 text-amber-600" />
      <div className="leading-snug">{text}</div>
    </div>
  );
};
