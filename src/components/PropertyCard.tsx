import Link from 'next/link';
import { MapPinIcon, BedIcon, BathIcon, RulerIcon, HeartIcon } from './Icons';
import { formatPrice, cn } from '@/lib/utils';
import type { Property } from '@/data/properties';

interface PropertyCardProps {
  property: Property;
  variant?: 'default' | 'large';
  className?: string;
}

export default function PropertyCard({ property, variant = 'default', className = '' }: PropertyCardProps) {
  const isLarge = variant === 'large';

  return (
    <Link
      href={`/properties/${property.slug}`}
      className={cn(
        'group flex flex-col bg-white rounded-lg overflow-hidden border border-navy/5 hover:border-champagne/30 transition-all duration-500 ease-luxury hover:shadow-2xl',
        isLarge ? 'min-w-[420px] sm:min-w-[480px]' : 'min-w-[300px] sm:min-w-[340px]',
        className
      )}
    >
      {/* Image */}
      <div className={cn('relative img-zoom', isLarge ? 'h-[360px]' : 'h-[280px]')}>
        <img
          src={property.images[0]}
          alt={property.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {/* Price badge */}
        <div className="absolute bottom-4 left-4 bg-navy/85 backdrop-blur-sm text-white px-4 py-2 text-sm font-medium">
          {formatPrice(property.price)}
        </div>
        {/* Type tag */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-navy px-3 py-1 text-xs tracking-wide font-medium">
          {property.type}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <h3 className="font-serif text-lg text-navy font-bold leading-tight group-hover:text-champagne transition-colors duration-300">
          {property.name}
        </h3>
        <div className="flex items-center gap-1.5 text-sm text-near-black/50">
          <MapPinIcon className="w-4 h-4 text-champagne" />
          {property.location}
        </div>

        {/* Specs */}
        <div className="flex items-center gap-5 mt-auto pt-3 border-t border-navy/5 text-sm text-near-black/60">
          <span className="flex items-center gap-1.5">
            <BedIcon className="w-4 h-4 text-champagne/70" />
            {property.bedrooms.toLocaleString('fa-IR')}
          </span>
          <span className="flex items-center gap-1.5">
            <BathIcon className="w-4 h-4 text-champagne/70" />
            {property.bathrooms.toLocaleString('fa-IR')}
          </span>
          <span className="flex items-center gap-1.5">
            <RulerIcon className="w-4 h-4 text-champagne/70" />
            {property.sqft.toLocaleString('fa-IR')} متر²
          </span>
        </div>
      </div>
    </Link>
  );
}
