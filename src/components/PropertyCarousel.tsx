'use client';

import { useRef, useState, useCallback, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeftIcon, ChevronRightIcon } from './Icons';

interface PropertyCarouselProps {
  children: ReactNode[];
  className?: string;
}

export default function PropertyCarousel({ children, className = '' }: PropertyCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 5);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
  }, []);

  const scrollByAmount = (dir: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.7 * dir;
    el.scrollBy({ left: amount, behavior: 'smooth' });
  };

  // Mouse drag
  const onMouseDown = (e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    isDragging.current = true;
    startX.current = e.pageX - el.offsetLeft;
    scrollStart.current = el.scrollLeft;
    el.style.cursor = 'grabbing';
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const el = scrollRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    el.scrollLeft = scrollStart.current - walk;
  };

  const endDrag = () => {
    isDragging.current = false;
    const el = scrollRef.current;
    if (el) el.style.cursor = 'grab';
  };

  return (
    <div className={cn('relative', className)}>
      {/* Track */}
      <div
        ref={scrollRef}
        onScroll={updateScrollState}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
        className="flex gap-5 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-2 select-none cursor-grab"
        role="region"
        aria-label="Property carousel"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') scrollByAmount(-1);
          if (e.key === 'ArrowRight') scrollByAmount(1);
        }}
      >
        {children.map((child, i) => (
          <div key={i} className="snap-start shrink-0">
            {child}
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={() => scrollByAmount(-1)}
        disabled={!canScrollLeft}
        aria-label="Previous properties"
        className={cn(
          'absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 w-12 h-12 rounded-full bg-white text-navy shadow-lg flex items-center justify-center transition-all duration-500 ease-luxury hidden md:flex',
          canScrollLeft
            ? 'opacity-100 hover:bg-navy hover:text-white'
            : 'opacity-0 pointer-events-none'
        )}
      >
        <ChevronLeftIcon className="w-5 h-5" />
      </button>
      <button
        onClick={() => scrollByAmount(1)}
        disabled={!canScrollRight}
        aria-label="Next properties"
        className={cn(
          'absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-12 h-12 rounded-full bg-white text-navy shadow-lg flex items-center justify-center transition-all duration-500 ease-luxury hidden md:flex',
          canScrollRight
            ? 'opacity-100 hover:bg-navy hover:text-white'
            : 'opacity-0 pointer-events-none'
        )}
      >
        <ChevronRightIcon className="w-5 h-5" />
      </button>
    </div>
  );
}
