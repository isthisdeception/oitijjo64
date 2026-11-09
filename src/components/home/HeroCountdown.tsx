import React, { useState, useEffect } from 'react';
import { Clock, AlertCircle } from 'lucide-react';
import { APP_CONFIG } from '../../utils/constants';
import { formatNumberBn } from '../../utils';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isClosed: boolean;
}

export const HeroCountdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft());

  function calculateTimeLeft(): TimeLeft {
    const deadline = new Date(APP_CONFIG.votingDeadline).getTime();
    const now = new Date().getTime();
    const difference = deadline - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isClosed: true };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, isClosed: false };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (timeLeft.isClosed) {
    return (
      <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-amber-100/80 border border-amber-300 text-amber-900 text-sm font-semibold shadow-sm">
        <AlertCircle className="w-4 h-4 text-amber-700 flex-shrink-0" />
        <span>ভোট গ্রহণ শেষ হয়েছে ({APP_CONFIG.votingDeadlineBn})</span>
      </div>
    );
  }

  const units = [
    { label: 'দিন', value: timeLeft.days },
    { label: 'ঘণ্টা', value: timeLeft.hours },
    { label: 'মিনিট', value: timeLeft.minutes },
    { label: 'সেকেন্ড', value: timeLeft.seconds },
  ];

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-heritage-muted mb-1">
        <Clock className="w-4 h-4 text-heritage-terracotta" />
        <span>ভোট গ্রহণের সময় বাকি</span>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        {units.map((unit) => (
          <div
            key={unit.label}
            className="flex flex-col items-center justify-center w-14 h-16 sm:w-16 sm:h-20 bg-heritage-card border border-heritage-border rounded-xl shadow-xs"
          >
            <span className="text-xl sm:text-2xl font-bold text-heritage-deep font-mono">
              {formatNumberBn(unit.value)}
            </span>
            <span className="text-[11px] sm:text-xs text-heritage-muted font-medium">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
      <span className="text-[11px] text-heritage-muted mt-1">
        শেষ সময়: {APP_CONFIG.votingDeadlineBn}
      </span>
    </div>
  );
};

