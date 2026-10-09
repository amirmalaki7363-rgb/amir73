'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRightIcon } from './Icons';

/**
 * ScrollVideoHero — Premium scroll-driven 3D video experience.
 *
 * The user's vertical scroll position directly controls the video's timeline.
 * The video is NEVER played via video.play(). Instead, we scrub video.currentTime
 * based on scroll progress through a pinned (sticky) hero section.
 *
 * The video is re-encoded as H.264 Baseline (no B-frames) with a keyframe every
 * 12 frames and +faststart, specifically for fast random-access seeking.
 *
 * Architecture:
 *  - A tall outer wrapper (300vh) creates the scroll distance.
 *  - An inner sticky container (100vh) pins the video viewport.
 *  - scroll progress (0→1) maps linearly to video.currentTime (0→duration).
 *  - A requestAnimationFrame loop smoothly interpolates currentTime toward the
 *    scroll-derived target, preventing harsh jumps while staying responsive.
 *
 * Performance:
 *  - No React state updates on scroll (uses refs only).
 *  - Passive scroll listener; rAF-gated seeking.
 *  - Only writes currentTime when the delta exceeds a threshold.
 *  - The rAF loop starts immediately (not gated on React state) and polls
 *    readyRef internally, so there's no startup delay from re-renders.
 *
 * Accessibility:
 *  Respects prefers-reduced-motion: shows a static image fallback.
 */

// ── Constants ──────────────────────────────────────────────
const SCROLL_VH = 300;          // total scroll distance in viewport heights
const SMOOTHING = 0.35;         // interpolation factor (0–1); higher = more responsive
const SEEK_THRESHOLD = 0.004;   // min seconds delta before we actually seek (4ms)
const VIDEO_SRC = '/videos/hero-scroll.mp4';
const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80';

export default function ScrollVideoHero() {
  // ── Refs (no re-renders on scroll) ──────────────────────
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const targetTimeRef = useRef(0);
  const durationRef = useRef(0);
  const readyRef = useRef(false);

  // ── State (only for loading / error UI) ─────────────────
  const [videoReady, setVideoReady] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // ── Detect reduced-motion preference ───────────────────
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // ── Video setup ─────────────────────────────────────────
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
        // Retry — metadata may not be fully parsed yet.
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

    const onError = () => {
      setVideoError(true);
    };

    // 'loadeddata' fires when the first frame is available.
    video.addEventListener('loadeddata', onLoaded);
    video.addEventListener('loadedmetadata', onLoaded);
    video.addEventListener('error', onError);

    // Also handle the case where the video is already cached
    if (video.readyState >= 2) onLoaded();

    return () => {
      video.removeEventListener('loadeddata', onLoaded);
      video.removeEventListener('loadedmetadata', onLoaded);
      video.removeEventListener('error', onError);
    };
  }, [reducedMotion]);

  // ── Scroll-driven animation loop ────────────────────────
  // NOTE: This effect does NOT depend on videoReady state.
  // The rAF loop starts immediately and polls readyRef.current
  // internally, so there's no startup delay from React re-renders.
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
      const progress = computeProgress();
      targetTimeRef.current = progress * durationRef.current;
    };

    // ── rAF loop: smooth interpolation ──
    // Uses a higher smoothing factor (0.35) for responsiveness.
    // The video is Baseline H.264 with frequent keyframes so seeking
    // is nearly instant — we can afford to seek aggressively.
    const tick = () => {
      if (readyRef.current && durationRef.current > 0) {
        const target = targetTimeRef.current;

        // Smoothly interpolate toward the target time.
        const diff = target - video.currentTime;
        const next = video.currentTime + diff * SMOOTHING;

        // Only seek if the delta is meaningful (prevents seeking flood).
        if (Math.abs(diff) > SEEK_THRESHOLD) {
          const clamped = Math.min(durationRef.current, Math.max(0, next));
          video.currentTime = clamped;
        }

        // ── Fade hero text as user scrolls ──
        if (textRef.current) {
          const progress = target / durationRef.current;
          // Text fully visible at 0%, fades out by ~15% scroll.
          const opacity = Math.max(0, 1 - progress * 6);
          const translateY = progress * -40;
          textRef.current.style.opacity = String(opacity);
          textRef.current.style.transform = `translateY(${translateY}px)`;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    // Start
    onScroll(); // set initial target
    rafRef.current = requestAnimationFrame(tick);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [reducedMotion]);

  // ── Reduced motion / video error: show static fallback ──
  if (reducedMotion || videoError) {
    return <StaticHero />;
  }

  return (
    <div
      ref={sectionRef}
      style={{ height: `${SCROLL_VH}vh` }}
      className="relative w-full"
    >
      {/* Sticky pinned viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Video layer */}
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

        {/* Subtle overlay for text readability (not too dark) */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy/40 via-transparent to-navy/30 pointer-events-none" />

        {/* Loading state */}
        {!videoReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-navy/60">
            <div className="flex flex-col items-center gap-4">
              <div className="w-8 h-8 border-2 border-white/20 border-t-champagne rounded-full animate-spin" />
              <span className="text-white/60 text-xs uppercase tracking-[0.2em]">
                Loading Experience
              </span>
            </div>
          </div>
        )}

        {/* Hero text — fades out on scroll.
             Uses opacity via rAF (not CSS animation) so they don't fight. */}
        <div
          ref={textRef}
          className="absolute inset-0 z-10 flex items-center justify-center px-6"
          style={{ willChange: 'opacity, transform' }}
        >
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-serif text-white text-hero font-bold text-balance">
              Discover Exceptional
              <br />
              Homes &amp; Investments
            </h1>
            <p className="mt-6 text-white/85 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
              Premium properties in prime locations. Find your dream home or the
              perfect investment with confidence.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/properties"
                className="group inline-flex items-center justify-center gap-2 bg-white text-navy px-9 py-4 text-sm font-medium uppercase tracking-wide hover:bg-ivory transition-all duration-500 ease-luxury min-h-[48px]"
              >
                Explore Properties
                <ArrowRightIcon className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/#about"
                className="inline-flex items-center justify-center gap-2 border border-white/30 text-white px-9 py-4 text-sm font-medium uppercase tracking-wide hover:bg-white/10 transition-all duration-500 ease-luxury min-h-[48px]"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 pointer-events-none">
          <span className="text-white/50 text-xs uppercase tracking-[0.2em]">
            Scroll to Explore
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </div>
    </div>
  );
}

// ── Static fallback hero (reduced-motion or video error) ───
function StaticHero() {
  return (
    <section className="relative h-screen min-h-[640px] w-full overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0">
        <img
          src={FALLBACK_IMAGE}
          alt="Modern luxury home at twilight with glass walls and swimming pool"
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/20 to-navy/70" />
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="font-serif text-white text-hero font-bold animate-fade-up text-balance">
          Discover Exceptional
          <br />
          Homes &amp; Investments
        </h1>
        <p
          className="mt-6 text-white/85 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto animate-fade-up"
          style={{ animationDelay: '200ms', opacity: 0, animationFillMode: 'forwards' }}
        >
          Premium properties in prime locations. Find your dream home or the perfect
          investment with confidence.
        </p>
        <div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up"
          style={{ animationDelay: '400ms', opacity: 0, animationFillMode: 'forwards' }}
        >
          <Link
            href="/properties"
            className="group inline-flex items-center justify-center gap-2 bg-white text-navy px-9 py-4 text-sm font-medium uppercase tracking-wide hover:bg-ivory transition-all duration-500 ease-luxury min-h-[48px]"
          >
            Explore Properties
            <ArrowRightIcon className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
          </Link>
          <Link
            href="/#about"
            className="inline-flex items-center justify-center gap-2 border border-white/30 text-white px-9 py-4 text-sm font-medium uppercase tracking-wide hover:bg-white/10 transition-all duration-500 ease-luxury min-h-[48px]"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
