import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles } from 'lucide-react';
import { APP_CONFIG, NAV_ITEMS } from '../../utils/constants';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle escape key to close menu
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-40 w-full bg-heritage-card/90 backdrop-blur-md border-b border-heritage-border transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Brand Wordmark */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-heritage-primary focus-visible:ring-offset-2 rounded-lg p-1"
            aria-label="ঐতিহ্য ৬৪ হোমপেজ"
          >
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-gradient-to-br from-heritage-primary to-heritage-deep flex items-center justify-center text-white shadow-sm border border-heritage-primary/20 group-hover:scale-105 transition-transform">
              <span className="font-bold text-lg md:text-xl">৬৪</span>
            </div>
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-2">
                <span className="text-xl md:text-2xl font-bold tracking-tight text-heritage-deep group-hover:text-heritage-primary transition-colors">
                  {APP_CONFIG.brandNameBn}
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-heritage-primary/10 text-heritage-primary">
                  অনানুষ্ঠানিক উদ্যোগ
                </span>
              </div>
              <span className="text-[11px] font-medium tracking-wide text-heritage-gold uppercase">
                {APP_CONFIG.descriptorEn}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center gap-1 lg:gap-2"
            aria-label="মূল নেভিগেশন"
          >
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-heritage-primary ${
                    isActive
                      ? 'bg-heritage-primary text-white shadow-sm'
                      : 'text-heritage-text hover:text-heritage-primary hover:bg-heritage-paper'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-heritage-deep hover:bg-heritage-paper focus:outline-none focus-visible:ring-2 focus-visible:ring-heritage-primary transition-colors"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? 'মেনু বন্ধ করুন' : 'মেনু খুলুন'}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 stroke-[2]" />
              ) : (
                <Menu className="w-6 h-6 stroke-[2]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 top-16 md:hidden bg-heritage-card/95 backdrop-blur-xl border-b border-heritage-border shadow-xl h-[calc(100vh-4rem)] overflow-y-auto p-4 transition-all"
        >
          <div className="flex flex-col gap-2 pt-2">
            <div className="p-3 mb-2 rounded-xl bg-heritage-paper border border-heritage-border flex items-center gap-2 text-xs text-heritage-muted">
              <Sparkles className="w-4 h-4 text-heritage-gold flex-shrink-0" />
              <span>ঐতিহ্যের হাট ৫.০ উপলক্ষে অনানুষ্ঠানিক উদ্যোগ</span>
            </div>

            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                    isActive
                      ? 'bg-heritage-primary text-white'
                      : 'text-heritage-text hover:bg-heritage-paper'
                  }`
                }
              >
                <span>{item.name}</span>
                <span className="text-xs opacity-60">→</span>
              </NavLink>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-heritage-border text-center text-xs text-heritage-muted">
            <p className="font-semibold text-heritage-deep mb-1">
              {APP_CONFIG.brandNameBn}
            </p>
            <p>{APP_CONFIG.taglineBn}</p>
          </div>
        </div>
      )}
    </header>
  );
};

