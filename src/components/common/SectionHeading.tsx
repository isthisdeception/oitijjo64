import React from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  badge?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  badge,
  align = 'center',
  className = '',
}) => {
  const isCenter = align === 'center';

  return (
    <div
      className={`mb-8 md:mb-12 ${
        isCenter ? 'text-center mx-auto' : 'text-left'
      } ${className}`}
    >
      {badge && (
        <div className={`mb-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-heritage-primary/10 text-heritage-primary ${
          isCenter ? 'mx-auto' : ''
        }`}>
          <span>{badge}</span>
        </div>
      )}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-heritage-deep tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-base sm:text-lg text-heritage-muted max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
      <div
        className={`mt-4 flex items-center gap-1.5 ${
          isCenter ? 'justify-center' : 'justify-start'
        }`}
      >
        <span className="w-8 h-1 rounded-full bg-heritage-terracotta"></span>
        <span className="w-2 h-1 rounded-full bg-heritage-gold"></span>
        <span className="w-1 h-1 rounded-full bg-heritage-primary"></span>
      </div>
    </div>
  );
};

