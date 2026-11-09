// Core constants for Oitijjo 64

export const APP_CONFIG = {
  brandNameBn: 'ঐতিহ্য ৬৪',
  brandNameEn: 'Oitijjo 64',
  taglineBn: '৬৪ জেলার খাবার, ঐতিহ্য ও গল্প।',
  subTaglineBn: 'আমার জেলা, আমার গর্ব।',
  descriptorEn: '64 Districts. One Heritage.',
  domain: 'oitijjo64.site',
  eventContextBn: 'ঐতিহ্যের হাট ৫.০, ২১ নভেম্বর ২০২৬',
  votingDeadline: '2026-11-21T22:00:00+06:00',
  votingDeadlineBn: '২১ নভেম্বর ২০২৬, রাত ১০:০০টা (বাংলাদেশ সময়)',
  disclaimerBn:
    'ঐতিহ্য ৬৪ একটি স্বাধীন ও অনানুষ্ঠানিক শিক্ষার্থী/কমিউনিটি উদ্যোগ। এটি ঐতিহ্যের হাট ৫.০, ড্যাফোডিল ইন্টারন্যাশনাল ইউনিভার্সিটি বা আয়োজকদের কোনো অফিসিয়াল ওয়েবসাইট নয় এবং তাদের দ্বারা পরিচালিত বা অনুমোদিত নয়। এই ওয়েবসাইটের ভোট, র‍্যাঙ্কিং বা ফলাফল মূল আয়োজনের বিচার, নম্বর, অবস্থান বা পুরস্কারে কোনো প্রভাব ফেলে না।',
  demoNoticeBn: 'নমুনা তথ্য • এটি শুধুমাত্র ইন্টারফেস প্রদর্শনের জন্য তৈরি',
} as const;

export interface NavItem {
  name: string;
  path: string;
}

export const NAV_ITEMS: readonly NavItem[] = [
  { name: 'হোম', path: '/' },
  { name: '৬৪ জেলা', path: '/districts' },
  { name: 'লিডারবোর্ড', path: '/leaderboard' },
  { name: 'আমাদের সম্পর্কে', path: '/about' },
] as const;
