'use client';

import { useState, useEffect } from 'react';
import { HeartIcon } from './Icons';
import { cn } from '@/lib/utils';

interface FavoriteButtonProps {
  propertyId: string;
  className?: string;
}

export default function FavoriteButton({ propertyId, className = '' }: FavoriteButtonProps) {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('horizon-favorites');
      if (stored) setFavorites(JSON.parse(stored));
    } catch {}
  }, []);

  const isFav = favorites.includes(propertyId);

  const toggle = () => {
    const next = isFav
      ? favorites.filter((id) => id !== propertyId)
      : [...favorites, propertyId];
    setFavorites(next);
    try {
      localStorage.setItem('horizon-favorites', JSON.stringify(next));
    } catch {}
  };

  return (
    <button
      onClick={toggle}
      aria-label={isFav ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'}
      aria-pressed={isFav}
      className={cn(
        'inline-flex items-center gap-2 px-5 py-3 border transition-all duration-500 ease-luxury min-h-[48px]',
        isFav
          ? 'border-champagne bg-champagne/10 text-champagne'
          : 'border-navy/15 text-navy hover:border-champagne',
        className
      )}
    >
      <HeartIcon className="w-5 h-5" filled={isFav} />
      <span className="text-sm font-medium tracking-wide">
        {isFav ? 'ذخیره شد' : 'ذخیره'}
      </span>
    </button>
  );
}
