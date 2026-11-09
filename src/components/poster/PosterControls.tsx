import React, { useState } from 'react';
import { toPng } from 'html-to-image';
import { Download, Share2, Upload, Trash2, RefreshCw, Check, AlertCircle } from 'lucide-react';
import { PosterTemplate } from './PosterCard';
import { District } from '../../types';

interface PosterControlsProps {
  district: District;
  userName: string;
  onUserNameChange: (name: string) => void;
  userImage: string | null;
  onUserImageChange: (image: string | null) => void;
  template: PosterTemplate;
  onTemplateChange: (template: PosterTemplate) => void;
  posterRef: React.RefObject<HTMLDivElement>;
}

export const PosterControls: React.FC<PosterControlsProps> = ({
  district,
  userName,
  onUserNameChange,
  userImage,
  onUserImageChange,
  template,
  onTemplateChange,
  posterRef,
}) => {
  const [downloading, setDownloading] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'info'; text: string } | null>(null);

  // File Upload Handler with Validation (Task 4)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    setNotification(null);

    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type (image format only)
    if (!file.type.startsWith('image/')) {
      setFileError('শুধুমাত্র ছবি ফাইল (JPG, PNG, WebP) আপলোড করা যাবে।');
      return;
    }

    // Validate size (maximum 5MB)
    const maxSizeInBytes = 5 * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      setFileError('ছবির সাইজ সর্বোচ্চ ৫ মেগাবাইট (5 MB) হতে পারবে।');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      onUserImageChange(reader.result as string);
    };
    reader.onerror = () => {
      setFileError('ছবি লোড করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    };
    reader.readAsDataURL(file);
  };

  // Generate PNG Data URL (Task 8)
  const generatePngBlob = async (): Promise<{ dataUrl: string; blob: Blob | null }> => {
    if (!posterRef.current) {
      throw new Error('পোস্টার উপাদান পাওয়া যায়নি।');
    }

    const dataUrl = await toPng(posterRef.current, {
      quality: 0.95,
      pixelRatio: 2,
      cacheBust: true,
    });

    // Convert dataUrl to Blob for Web Share API
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    return { dataUrl, blob };
  };

  // Download Action (Task 9)
  const handleDownload = async () => {
    setDownloading(true);
    setNotification(null);
    try {
      const { dataUrl } = await generatePngBlob();
      const link = document.createElement('a');
      link.download = `oitijjo64-poster-${district.slug}.png`;
      link.href = dataUrl;
      link.click();
      setNotification({
        type: 'success',
        text: 'পোস্টারটি সফলভাবে ডাউনলোড হয়েছে!',
      });
    } catch {
      setNotification({
        type: 'info',
        text: 'পোস্টার রেন্ডার করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।',
      });
    } finally {
      setDownloading(false);
    }
  };

  // Share Action with Fallback (Task 10)
  const handleShare = async () => {
    setSharing(true);
    setNotification(null);
    const pageUrl = window.location.href;
    const shareTitle = `${district.nameBn} জেলার ঐতিহ্য পোস্টার • ঐতিহ্য ৬৪`;
    const shareText = `আমি ${district.nameBn} জেলার ঐতিহ্যকে ভালোবাসি! নিজের পোস্টার তৈরি করুন:`;

    try {
      const { blob } = await generatePngBlob();

      // Check if navigator.share and file sharing are supported
      if (
        navigator.share &&
        blob &&
        navigator.canShare &&
        navigator.canShare({ files: [new File([blob], 'poster.png', { type: 'image/png' })] })
      ) {
        const file = new File([blob], `oitijjo64-${district.slug}.png`, {
          type: 'image/png',
        });
        await navigator.share({
          title: shareTitle,
          text: shareText,
          files: [file],
        });
        setNotification({ type: 'success', text: 'পোস্টার সফলভাবে শেয়ার করা হয়েছে!' });
      } else if (navigator.share) {
        // Fallback: share text and URL
        await navigator.share({
          title: shareTitle,
          text: `${shareText} ${pageUrl}`,
          url: pageUrl,
        });
        setNotification({ type: 'success', text: 'লিংক সফলভাবে শেয়ার করা হয়েছে!' });
      } else {
        // Fallback when Web Share is not supported: copy URL & trigger download
        await navigator.clipboard.writeText(pageUrl);
        await handleDownload();
        setNotification({
          type: 'info',
          text: 'শেয়ার মেনু সমর্থিত নয়। পোস্টারটি ডাউনলোড হয়েছে এবং লিঙ্কটি ক্লিপবোর্ডে কপি করা হয়েছে!',
        });
      }
    } catch (err: unknown) {
      if ((err as Error)?.name !== 'AbortError') {
        // Fallback to copy URL
        try {
          await navigator.clipboard.writeText(pageUrl);
          setNotification({
            type: 'info',
            text: 'পৃষ্ঠার লিংক ক্লিপবোর্ডে কপি করা হয়েছে!',
          });
        } catch {
          // Ignore
        }
      }
    } finally {
      setSharing(false);
    }
  };

  return (
    <div className="bg-heritage-card border border-heritage-border rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
      <div>
        <h3 className="text-xl font-bold text-heritage-deep mb-1">
          পোস্টার কাস্টমাইজ করুন
        </h3>
        <p className="text-xs sm:text-sm text-heritage-muted leading-relaxed">
          কোনো লগইন ছাড়াই নিজের নাম ও ছবি যুক্ত করে পোস্টার প্রস্তুত করুন।
        </p>
      </div>

      {/* 1. Template Selector (Task 5) */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-heritage-deep uppercase tracking-wider block">
          টেমপ্লেট নির্বাচন করুন
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => onTemplateChange('heritage')}
            className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 border transition-all ${template === 'heritage'
                ? 'bg-heritage-deep text-white border-heritage-deep shadow-xs ring-2 ring-heritage-gold/50'
                : 'bg-heritage-paper text-heritage-muted border-heritage-border hover:bg-white'
              }`}
          >
            <span>ঐতিহ্য (ক্লাসিক)</span>
            {template === 'heritage' && <Check className="w-4 h-4 text-heritage-gold" />}
          </button>

          <button
            type="button"
            onClick={() => onTemplateChange('modern')}
            className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 border transition-all ${template === 'modern'
                ? 'bg-heritage-primary text-white border-heritage-primary shadow-xs ring-2 ring-heritage-terracotta/50'
                : 'bg-heritage-paper text-heritage-muted border-heritage-border hover:bg-white'
              }`}
          >
            <span>আধুনিক (মডার্ন)</span>
            {template === 'modern' && <Check className="w-4 h-4 text-white" />}
          </button>
        </div>
      </div>

      {/* 2. Optional Name Input (Task 2) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="user-name" className="text-xs font-bold text-heritage-deep uppercase tracking-wider">
            আপনার নাম
          </label>
          <span className="text-[11px] text-heritage-muted font-medium">
            (ঐচ্ছিক)
          </span>
        </div>
        <input
          id="user-name"
          type="text"
          value={userName}
          onChange={(e) => onUserNameChange(e.target.value)}
          placeholder="পোস্টারে নিজের নাম যুক্ত করতে পারেন..."
          maxLength={35}
          className="w-full py-2.5 px-3.5 bg-heritage-paper rounded-xl border border-heritage-border text-sm text-heritage-text placeholder:text-heritage-muted focus:outline-none focus:ring-2 focus:ring-heritage-primary"
        />
      </div>

      {/* 3. Optional Photo Upload (Task 3 & 4) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-heritage-deep uppercase tracking-wider">
            ব্যক্তিগত ছবি যুক্ত করুন
          </span>
          <span className="text-[11px] text-heritage-muted font-medium">
            (ঐচ্ছিক, সর্বোচ্চ ৫ MB)
          </span>
        </div>

        {userImage ? (
          <div className="flex items-center gap-3 p-3 bg-heritage-paper rounded-xl border border-heritage-border">
            <img
              src={userImage}
              alt="প্রিভিউ"
              className="w-12 h-12 rounded-lg object-cover border border-heritage-border flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <span className="text-xs font-bold text-heritage-deep block truncate">
                ছবি আপলোড সম্পন্ন
              </span>
              <span className="text-[11px] text-emerald-700 font-semibold block">
                পোস্টারে যুক্ত হয়েছে
              </span>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <label
                htmlFor="photo-upload-replace"
                className="p-2 text-xs font-semibold text-heritage-primary hover:bg-white rounded-lg border border-heritage-border cursor-pointer transition-colors"
                title="ছবি পরিবর্তন করুন"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <input
                  id="photo-upload-replace"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="sr-only"
                />
              </label>
              <button
                type="button"
                onClick={() => onUserImageChange(null)}
                className="p-2 text-xs font-semibold text-heritage-terracotta hover:bg-white rounded-lg border border-heritage-border transition-colors"
                title="ছবি মুছুন"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <div>
            <label
              htmlFor="photo-upload"
              className="w-full flex items-center justify-center gap-2.5 py-3 px-4 bg-heritage-paper hover:bg-white border border-dashed border-heritage-border rounded-xl text-xs sm:text-sm font-semibold text-heritage-deep cursor-pointer transition-colors"
            >
              <Upload className="w-4 h-4 text-heritage-primary" />
              <span>ছবি নির্বাচন করুন (JPG / PNG)</span>
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="sr-only"
              />
            </label>
          </div>
        )}

        {fileError && (
          <p className="text-xs text-red-600 font-semibold flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{fileError}</span>
          </p>
        )}
      </div>

      {/* Notifications */}
      {notification && (
        <div
          className={`p-3 rounded-xl border text-xs leading-relaxed flex items-start gap-2 ${notification.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-amber-50 border-amber-200 text-amber-900'
            }`}
        >
          {notification.type === 'success' ? (
            <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          )}
          <span>{notification.text}</span>
        </div>
      )}

      {/* Action Buttons: Download & Share */}
      <div className="pt-2 space-y-3">
        <button
          type="button"
          onClick={handleDownload}
          disabled={downloading || sharing}
          className="w-full py-3.5 px-5 rounded-xl font-bold text-white bg-heritage-primary hover:bg-heritage-deep transition-all shadow-xs flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {downloading ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Download className="w-4 h-4" />
          )}
          <span>{downloading ? 'পোস্টার তৈরি হচ্ছে...' : 'পোস্টার ডাউনলোড করুন (PNG)'}</span>
        </button>

        <button
          type="button"
          onClick={handleShare}
          disabled={downloading || sharing}
          className="w-full py-3 px-5 rounded-xl font-bold text-heritage-deep bg-heritage-paper hover:bg-heritage-border/60 border border-heritage-border transition-all flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {sharing ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Share2 className="w-4 h-4 text-heritage-terracotta" />
          )}
          <span>{sharing ? 'শেয়ার প্রস্তুত হচ্ছে...' : 'বন্ধুদের সাথে শেয়ার করুন'}</span>
        </button>
      </div>

      <p className="text-[11px] text-heritage-muted text-center leading-relaxed">
        * পোস্টার সম্পূর্ণ পাবলিক এবং কোনো অ্যাকাউন্টে প্রবেশের প্রয়োজন নেই।
      </p>
    </div>
  );
};

