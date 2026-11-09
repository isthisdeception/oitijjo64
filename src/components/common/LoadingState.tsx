import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'লোড হচ্ছে...',
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center py-16 px-4 text-center ${className}`}
      role="status"
      aria-live="polite"
    >
      <Loader2 className="w-8 h-8 text-heritage-primary animate-spin mb-3 stroke-[2]" />
      <p className="text-sm font-medium text-heritage-muted">{message}</p>
      <span className="sr-only">লোড হচ্ছে</span>
    </div>
  );
};

