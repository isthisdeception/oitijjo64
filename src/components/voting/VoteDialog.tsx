import React, { useState } from 'react';
import { X, CheckCircle2, AlertCircle, Clock, ShieldAlert, Vote } from 'lucide-react';
import { useVoting } from '../../context/VoteContext';
import { APP_CONFIG } from '../../utils/constants';

export const VoteDialog: React.FC = () => {
  const {
    isVoteModalOpen,
    closeVoteModal,
    targetDistrict,
    currentUser,
    hasVoted,
    votedDistrictName,
    isDeadlinePassed,
    signInWithGoogleDemo,
    submitVote,
  } = useVoting();

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isVoteModalOpen || !targetDistrict) {
    return null;
  }

  const handleSignIn = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      await signInWithGoogleDemo();
    } catch {
      setErrorMessage('ডেমো লগইন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmVote = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const res = await submitVote();
      if (res.success) {
        setSuccessMessage(res.messageBn);
      } else {
        setErrorMessage(res.messageBn);
      }
    } catch {
      setErrorMessage('ভোট সাবমিট করতে সমস্যা হয়েছে।');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSuccessMessage(null);
    setErrorMessage(null);
    closeVoteModal();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="vote-dialog-title"
    >
      <div className="relative w-full max-w-lg bg-heritage-card border border-heritage-border rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-5 right-5 text-heritage-muted hover:text-heritage-deep p-1.5 rounded-full hover:bg-heritage-paper transition-colors focus:outline-none focus:ring-2 focus:ring-heritage-primary"
          aria-label="মোডাল বন্ধ করুন"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ========================================================
            CASE 1: Voting Deadline Passed
           ======================================================== */}
        {isDeadlinePassed ? (
          <div className="text-center space-y-4 py-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700">
              <Clock className="w-8 h-8 stroke-[1.8]" />
            </div>

            <div className="space-y-2">
              <h3
                id="vote-dialog-title"
                className="text-2xl font-bold text-heritage-deep"
              >
                ভোট গ্রহণ শেষ হয়েছে
              </h3>
              <p className="text-sm text-heritage-muted leading-relaxed">
                ভোট গ্রহণের নির্ধারিত সময়সীমা ছিল <strong>{APP_CONFIG.votingDeadlineBn}</strong>। নির্ধারিত সময় অতিক্রান্ত হওয়ায় এখন আর নতুন কোনো ভোট প্রদান করা সম্ভব নয়।
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-heritage-primary hover:bg-heritage-deep transition-colors"
              >
                ঠিক আছে
              </button>
            </div>
          </div>
        ) : successMessage ? (
          /* ========================================================
             CASE 2: Vote Submitted Successfully
             ======================================================== */
          <div className="text-center space-y-4 py-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-600 animate-in zoom-in-75">
              <CheckCircle2 className="w-9 h-9 stroke-[2]" />
            </div>

            <div className="space-y-2">
              <h3
                id="vote-dialog-title"
                className="text-2xl font-bold text-heritage-deep"
              >
                ভোট সফলভাবে সম্পন্ন হয়েছে!
              </h3>
              <p className="text-sm text-heritage-muted leading-relaxed">
                {successMessage}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-heritage-paper border border-heritage-border text-xs text-heritage-muted text-left space-y-1">
              <div className="font-semibold text-heritage-deep">
                ভোটের নিয়মাবলী অনুসৃত:
              </div>
              <p>
                একটি গুগল অ্যাকাউন্ট দিয়ে শুধুমাত্র একটি জেলায় ভোট প্রদান করা যায়। আপনার সমর্থন সংরক্ষিত হয়েছে।
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-heritage-primary hover:bg-heritage-deep transition-colors"
              >
                ধন্যবাদ
              </button>
            </div>
          </div>
        ) : hasVoted ? (
          /* ========================================================
             CASE 3: Already Voted
             ======================================================== */
          <div className="text-center space-y-4 py-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700">
              <AlertCircle className="w-8 h-8 stroke-[1.8]" />
            </div>

            <div className="space-y-2">
              <h3
                id="vote-dialog-title"
                className="text-2xl font-bold text-heritage-deep"
              >
                আপনি ইতিমধ্যে ভোট দিয়েছেন
              </h3>
              <p className="text-sm text-heritage-muted leading-relaxed">
                আপনার গুগল অ্যাকাউন্ট থেকে ইতিমধ্যে{' '}
                <strong className="text-heritage-deep font-bold">
                  {votedDistrictName || 'একটি'}
                </strong>{' '}
                জেলাকে ভোট প্রদান করা হয়েছে। নিয়ম অনুযায়ী এক অ্যাকাউন্টে একটির বেশি ভোট গ্রহণযোগ্য নয়।
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-heritage-primary hover:bg-heritage-deep transition-colors"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        ) : !currentUser ? (
          /* ========================================================
             CASE 4: Sign-In Required (Task 2 & 3)
             ======================================================== */
          <div className="space-y-5">
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-heritage-primary/10 text-heritage-primary flex items-center justify-center flex-shrink-0">
                <Vote className="w-6 h-6 stroke-[1.8]" />
              </div>
              <div>
                <h3
                  id="vote-dialog-title"
                  className="text-xl sm:text-2xl font-bold text-heritage-deep"
                >
                  {targetDistrict.nameBn} জেলাকে ভোট দিন
                </h3>
                <p className="text-xs sm:text-sm text-heritage-muted mt-0.5">
                  ভোট প্রদানের নিয়মাবলী ও সাইন-ইন
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-heritage-paper border border-heritage-border space-y-2.5 text-xs sm:text-sm text-heritage-muted leading-relaxed">
              <p className="font-semibold text-heritage-deep">
                ভোট প্রদানের পূর্বে জেনে নিন:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>ওয়েবসাইটের সকল তথ্য ব্রাউজ করতে কোনো লগইন প্রয়োজন নেই।</li>
                <li>সুষ্ঠু ও নিরপেক্ষ ভোট নিশ্চিত করতে <strong>শুধুমাত্র ভোট দেওয়ার সময়</strong> গুগল অ্যাকাউন্ট দিয়ে প্রবেশ করা বাধ্যতামূলক।</li>
                <li>একজন ব্যবহারকারী একটি অ্যাকাউন্ট থেকে <strong>শুধুমাত্র একটি জেলাতেই</strong> ভোট দিতে পারবেন।</li>
              </ul>
            </div>

            {/* Mock Notice (Task 4) */}
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block font-semibold">ডেমো মোড বিজ্ঞপ্তি:</strong>
                <span>
                  প্রকৃত Google লগইন ও ডাটাবেজ ব্যাকএন্ড পরবর্তী ধাপে যুক্ত করা হবে। নিচের বাটনে ক্লিক করলে একটি ডেমো অ্যাকাউন্টে প্রবেশ নিশ্চিত হবে (কোনো পাসওয়ার্ড বা তথ্য চাওয়া হবে না)।
                </span>
              </div>
            </div>

            {errorMessage && (
              <p className="text-xs text-red-600 font-semibold">{errorMessage}</p>
            )}

            {/* Google Sign In Button with Google Logo (Task 3) */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleSignIn}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white hover:bg-slate-50 border border-slate-300 rounded-2xl font-bold text-slate-700 shadow-xs hover:shadow transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-heritage-primary disabled:opacity-60"
              >
                {/* Official Google G Logo SVG */}
                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Google দিয়ে প্রবেশ করুন</span>
              </button>
            </div>
          </div>
        ) : (
          /* ========================================================
             CASE 5: Signed In - Confirmation Step (Task 6)
             ======================================================== */
          <div className="space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-heritage-border">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-heritage-primary text-white flex items-center justify-center font-bold text-sm">
                  {currentUser.displayName.charAt(0)}
                </div>
                <div>
                  <div className="text-xs font-bold text-heritage-deep">
                    {currentUser.displayName}
                  </div>
                  <div className="text-[11px] text-heritage-muted">
                    {currentUser.email}
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                লগইন সক্রিয় (ডেমো)
              </span>
            </div>

            <div className="text-center py-2 space-y-2">
              <h3
                id="vote-dialog-title"
                className="text-xl sm:text-2xl font-extrabold text-heritage-deep"
              >
                আপনি কি <span className="text-heritage-primary">{targetDistrict.nameBn}</span> জেলাকে ভোট দিতে চান?
              </h3>
              <p className="text-xs sm:text-sm text-heritage-muted leading-relaxed">
                ভোট একবার প্রদান করলে পরবর্তীতে আর পরিবর্তন করা যাবে না। অনুগ্রহ করে আপনার সিদ্ধান্ত নিশ্চিত করুন।
              </p>
            </div>

            {errorMessage && (
              <p className="text-xs text-red-600 font-semibold text-center">{errorMessage}</p>
            )}

            <div className="pt-3 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={handleConfirmVote}
                disabled={loading}
                className="w-full sm:flex-1 py-3 px-4 rounded-xl font-bold text-white bg-heritage-primary hover:bg-heritage-deep transition-all shadow-xs disabled:opacity-60 text-center"
              >
                {loading ? 'ভোট প্রসেস হচ্ছে...' : 'ভোট নিশ্চিত করুন'}
              </button>

              <button
                type="button"
                onClick={handleClose}
                disabled={loading}
                className="w-full sm:w-auto py-3 px-5 rounded-xl font-semibold text-heritage-muted hover:text-heritage-deep hover:bg-heritage-paper border border-heritage-border transition-colors text-center"
              >
                ফিরে যান
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
