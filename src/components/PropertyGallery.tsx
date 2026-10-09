'use client';

import { useState, useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeftIcon, ChevronRightIcon, ExpandIcon, CloseIcon } from './Icons';

interface PropertyGalleryProps {
  images: string[];
  alt: string;
}

export default function PropertyGallery({ images, alt }: PropertyGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!fullscreen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setFullscreen(false);
      // RTL: ArrowLeft = next (reading direction), ArrowRight = prev
      if (e.key === 'ArrowLeft') goNext();
      if (e.key === 'ArrowRight') goPrev();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [fullscreen, goNext, goPrev]);

  return (
    <>
      {/* Main gallery */}
      <div className="relative">
        {/* Large image */}
        <div className="relative h-[300px] sm:h-[420px] lg:h-[520px] rounded-lg overflow-hidden bg-navy/5 group">
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${alt} — image ${i + 1}`}
              className={cn(
                'absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-luxury',
                i === activeIndex ? 'opacity-100' : 'opacity-0'
              )}
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          ))}

          {/* Expand button */}
          <button
            onClick={() => setFullscreen(true)}
            aria-label="مشاهده تمام صفحه"
            className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/90 text-navy flex items-center justify-center hover:bg-champagne transition-colors opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <ExpandIcon className="w-4 h-4" />
          </button>

          {/* Nav arrows — RTL: prev on right, next on left */}
          {images.length > 1 && (
            <>
              <button
                onClick={goPrev}
                aria-label="تصویر قبلی"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 text-navy flex items-center justify-center hover:bg-white transition-colors"
              >
                <ChevronRightIcon className="w-5 h-5" />
              </button>
              <button
                onClick={goNext}
                aria-label="تصویر بعدی"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 text-navy flex items-center justify-center hover:bg-white transition-colors"
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Counter */}
          <div className="absolute bottom-4 left-4 bg-navy/80 text-white px-3 py-1.5 text-xs font-medium">
            {(activeIndex + 1).toLocaleString('fa-IR')} / {images.length.toLocaleString('fa-IR')}
          </div>
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-3 mt-4 overflow-x-auto no-scrollbar">
            {images.map((src, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                aria-label={`View image ${i + 1}`}
                className={cn(
                  'shrink-0 w-20 h-16 sm:w-28 sm:h-20 rounded overflow-hidden border-2 transition-all duration-300',
                  i === activeIndex ? 'border-champagne' : 'border-transparent opacity-60 hover:opacity-100'
                )}
              >
                <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen viewer */}
      {fullscreen && (
        <div className="fixed inset-0 z-[100] bg-navy/95 flex items-center justify-center animate-fade-in">
          <button
            onClick={() => setFullscreen(false)}
            aria-label="بستن تمام صفحه"
            className="absolute top-6 left-6 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors z-10"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
          {/* RTL: prev on right, next on left */}
          <button
            onClick={goPrev}
            aria-label="تصویر قبلی"
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
          <img
            src={images[activeIndex]}
            alt={`${alt} — نمایش تمام صفحه`}
            className="max-w-[90vw] max-h-[85vh] object-contain"
          />
          <button
            onClick={goNext}
            aria-label="تصویر بعدی"
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm">
            {(activeIndex + 1).toLocaleString('fa-IR')} / {images.length.toLocaleString('fa-IR')}
          </div>
        </div>
      )}
    </>
  );
}
