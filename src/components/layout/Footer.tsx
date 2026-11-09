import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ShieldAlert, Heart } from 'lucide-react';
import { APP_CONFIG, NAV_ITEMS } from '../../utils/constants';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-heritage-deep text-white/90 border-t border-heritage-deep/60 mt-auto">
      {/* Top Footer Banner: Voting Deadline & Status */}
      <div className="bg-[#123128] border-b border-white/10 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-center sm:text-left">
          <div className="flex items-center gap-2 text-heritage-gold font-medium">
            <Clock className="w-4 h-4 flex-shrink-0" />
            <span>ভোট গ্রহণ শেষ হবে:</span>
            <strong className="text-white font-semibold">
              {APP_CONFIG.votingDeadlineBn}
            </strong>
          </div>
          <div className="text-xs text-white/70">
            ঐতিহ্যের হাট ৫.০ • ড্যাফোডিল ইন্টারন্যাশনাল ইউনিভার্সিটি
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand & Mission Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-heritage-primary flex items-center justify-center text-white font-bold text-lg border border-white/20">
                ৬৪
              </div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  {APP_CONFIG.brandNameBn}
                </h3>
                <span className="text-xs text-heritage-gold font-medium tracking-wide">
                  {APP_CONFIG.descriptorEn}
                </span>
              </div>
            </div>

            <p className="text-sm text-white/80 leading-relaxed max-w-sm">
              {APP_CONFIG.taglineBn} বাংলাদেশের প্রতিটি প্রান্তের সংস্কৃতি, ঐতিহ্যবাহী খাবার ও মানুষের ভালোবাসাকে এক প্ল্যাটফর্মে তুলে ধরার একটি ক্ষুদ্র প্রয়াস।
            </p>

            <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-heritage-gold border border-white/10">
              {APP_CONFIG.subTaglineBn}
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              দ্রুত নেভিগেশন
            </h4>
            <ul className="space-y-2.5 text-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-white/75 hover:text-white hover:underline transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-white rounded"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Unofficial Disclaimer Column */}
          <div className="md:col-span-4 space-y-4">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs leading-relaxed space-y-2">
              <div className="flex items-center gap-2 font-bold text-amber-300">
                <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                <span>গুরুত্বপূর্ণ ঘোষণা (Disclaimer)</span>
              </div>
              <p className="text-white/80">
                {APP_CONFIG.disclaimerBn}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>© {new Date().getFullYear()} {APP_CONFIG.brandNameBn} ({APP_CONFIG.domain}) — সর্বস্বত্ব সংরক্ষিত।</p>
          <div className="flex items-center gap-1.5">
            <span>কমিউনিটি উদ্যোগে ভালোবাসার সাথে নির্মিত</span>
            <Heart className="w-3.5 h-3.5 text-heritage-terracotta fill-heritage-terracotta" />
          </div>
        </div>
      </div>
    </footer>
  );
};
