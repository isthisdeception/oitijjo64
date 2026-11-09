import React from 'react';
import { BookOpen, Utensils, Sparkles, Landmark, Heart } from 'lucide-react';

interface SectionNavProps {
  activeSection?: string;
}

export const DistrictSectionNav: React.FC<SectionNavProps> = () => {
  const sections = [
    { id: 'overview', label: 'পরিচিতি', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: 'foods', label: 'বিখ্যাত খাবার', icon: <Utensils className="w-3.5 h-3.5" /> },
    { id: 'heritage', label: 'ঐতিহ্য ও সংস্কৃতি', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'event', label: 'মেলার আয়োজন', icon: <Landmark className="w-3.5 h-3.5" /> },
    { id: 'actions', label: 'ভোট ও পোস্টার', icon: <Heart className="w-3.5 h-3.5" /> },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="sticky top-16 md:top-20 z-30 py-3 bg-heritage-paper/95 backdrop-blur-md border-y border-heritage-border/70 overflow-x-auto scrollbar-none">
      <div className="flex items-center gap-2 max-w-7xl mx-auto px-4">
        {sections.map((sec) => (
          <button
            key={sec.id}
            type="button"
            onClick={() => scrollTo(sec.id)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold bg-heritage-card text-heritage-text border border-heritage-border hover:border-heritage-primary/40 hover:text-heritage-primary transition-all whitespace-nowrap shadow-2xs"
          >
            {sec.icon}
            <span>{sec.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
