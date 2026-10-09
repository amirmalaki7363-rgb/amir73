'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRightIcon } from './Icons';

/**
 * ScrollVideoHero — Premium scroll-driven 3D video experience.
 * The user's vertical scroll position directly controls the video's timeline.
 */

const SCROLL_VH = 300;
const SMOOTHING = 0.35;
const SEEK_THRESHOLD = 0.004;
const VIDEO_SRC = '/videos/hero-scroll.mp4';
const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80';

export default function ScrollVideoHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const targetTimeRef = useRef(0);
  const durationRef = useRef(0);
  const readyRef = useRef(false);

  const [videoReady, setVideoReady] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion) return;

    const onLoaded = () => {
      const dur = video.duration;
      if (isFinite(dur) && dur > 0) {
        durationRef.current = dur;
        readyRef.current = true;
        video.currentTime = 0;
        setVideoReady(true);
      } else {
        setTimeout(() => {
          if (isFinite(video.duration) && video.duration > 0) {
            durationRef.current = video.duration;
            readyRef.current = true;
            video.currentTime = 0;
            setVideoReady(true);
          }
        }, 300);
      }
    };

    const onError = () => setVideoError(true);

    video.addEventListener('loadeddata', onLoaded);
    video.addEventListener('loadedmetadata', onLoaded);
    video.addEventListener('error', onError);
    if (video.readyState >= 2) onLoaded();

    return () => {
      video.removeEventListener('loadeddata', onLoaded);
      video.removeEventListener('loadedmetadata', onLoaded);
      video.removeEventListener('error', onError);
    };
  }, [reducedMotion]);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section || reducedMotion) return;

    const computeProgress = () => {
      const rect = section.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return 0;
      const scrolled = Math.max(0, -rect.top);
      return Math.min(1, Math.max(0, scrolled / scrollable));
    };

    const onScroll = () => {
      targetTimeRef.current = computeProgress() * durationRef.current;
    };

    const tick = () => {
      if (readyRef.current && durationRef.current > 0) {
        const target = targetTimeRef.current;
        const diff = target - video.currentTime;
        const next = video.currentTime + diff * SMOOTHING;

        if (Math.abs(diff) > SEEK_THRESHOLD) {
          video.currentTime = Math.min(durationRef.current, Math.max(0, next));
        }

        if (textRef.current) {
          const progress = target / durationRef.current;
          const opacity = Math.max(0, 1 - progress * 6);
          const translateY = progress * -40;
          textRef.current.style.opacity = String(opacity);
          textRef.current.style.transform = `translateY(${translateY}px)`;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    onScroll();
    rafRef.current = requestAnimationFrame(tick);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [reducedMotion]);

  if (reducedMotion || videoError) {
    return <StaticHero />;
  }

  return (
    <div
      ref={sectionRef}
      style={{ height: `${SCROLL_VH}vh` }}
      className="relative w-full"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          preload="auto"
          muted
          playsInline
          poster={FALLBACK_IMAGE}
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-b from-navy/40 via-transparent to-navy/30 pointer-events-none" />

        {!videoReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-navy/60">
            <div className="flex flex-col items-center gap-4">
              <div className="w-8 h-8 border-2 border-white/20 border-t-champagne rounded-full animate-spin" />
              <span className="text-white/60 text-xs tracking-[0.15em]">
                در حال بارگذاری
              </span>
            </div>
          </div>
        )}

        {/* Hero text — fades out on scroll */}
        <div
          ref={textRef}
          className="absolute inset-0 z-10 flex items-center justify-center px-6"
          style={{ willChange: 'opacity, transform' }}
        >
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-serif text-white text-hero font-bold text-balance">
              کشف خانه‌های استثنایی
              <br />
              و سرمایه‌گذاری
            </h1>
            <p className="mt-6 text-white/85 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
              املاک لوکس در بهترین موقعیت‌ها. خانه رویایی خود یا بهترین سرمایه‌گذاری
              را با اطمینان پیدا کنید.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/properties"
                className="group inline-flex items-center justify-center gap-2 bg-white text-navy px-9 py-4 text-sm font-medium tracking-wide hover:bg-ivory transition-all duration-500 ease-luxury min-h-[48px]"
              >
                مشاهده املاک
                <ArrowRightIcon className="w-4 h-4 ltr-arrow transition-transform duration-500 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/#about"
                className="inline-flex items-center justify-center gap-2 border border-white/30 text-white px-9 py-4 text-sm font-medium tracking-wide hover:bg-white/10 transition-all duration-500 ease-luxury min-h-[48px]"
              >
                بیشتر بدانید
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 pointer-events-none">
          <span className="text-white/50 text-xs tracking-[0.15em]">
            برای کاوش اسکرول کنید
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </div>
    </div>
  );
}

function StaticHero() {
  return (
    <section className="relative h-screen min-h-[640px] w-full overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0">
        <img
          src={FALLBACK_IMAGE}
          alt="خانه لوکس مدرن در گرگ و میها با دیوارهای شیشه‌ای و استخر"
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/20 to-navy/70" />
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="font-serif text-white text-hero font-bold text-balance">
          کشف خانه‌های استثنایی
          <br />
          و سرمایه‌گذاری
        </h1>
        <p className="mt-6 text-white/85 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
          املاک لوکس در بهترین موقعیت‌ها. خانه رویایی خود یا بهترین سرمایه‌گذاری
          را با اطمینان پیدا کنید.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/properties"
            className="group inline-flex items-center justify-center gap-2 bg-white text-navy px-9 py-4 text-sm font-medium tracking-wide hover:bg-ivory transition-all duration-500 ease-luxury min-h-[48px]"
          >
            مشاهده املاک
            <ArrowRightIcon className="w-4 h-4 ltr-arrow transition-transform duration-500 group-hover:translate-x-1" />
          </Link>
          <Link
            href="/#about"
            className="inline-flex items-center justify-center gap-2 border border-white/30 text-white px-9 py-4 text-sm font-medium tracking-wide hover:bg-white/10 transition-all duration-500 ease-luxury min-h-[48px]"
          >
            بیشتر بدانید
          </Link>
        </div>
      </div>
    </section>
  );
}
