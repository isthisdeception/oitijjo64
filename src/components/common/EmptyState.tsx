import React from 'react';
import { PackageOpen } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'কোনো তথ্য পাওয়া যায়নি',
  description = 'এই জেলার তথ্য শিগগিরই যোগ করা হবে।',
  icon,
  actionText,
  onAction,
  className = '',
}) => {
  return (
    <div
      className={`text-center py-12 px-4 rounded-2xl border border-dashed border-heritage-border bg-heritage-card/60 max-w-lg mx-auto ${className}`}
    >
      <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-heritage-paper flex items-center justify-center text-heritage-muted border border-heritage-border">
        {icon || <PackageOpen className="w-7 h-7 stroke-[1.5]" />}
      </div>
      <h3 className="text-lg font-bold text-heritage-deep mb-2">{title}</h3>
      <p className="text-sm text-heritage-muted max-w-sm mx-auto leading-relaxed mb-6">
        {description}
      </p>
      {actionText && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="inline-flex items-center justify-center px-4 py-2 rounded-xl text-sm font-semibold text-white bg-heritage-primary hover:bg-heritage-deep transition-colors focus:outline-none focus:ring-2 focus:ring-heritage-primary focus:ring-offset-2"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

