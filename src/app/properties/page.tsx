'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import PropertyCard from '@/components/PropertyCard';
import ScrollReveal from '@/components/ScrollReveal';
import { properties, propertyTypes, locations } from '@/data/properties';
import { SearchIcon, ChevronDownIcon, MapPinIcon } from '@/components/Icons';
import { formatPrice } from '@/lib/utils';

type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'bedrooms-desc' | 'sqft-desc';

export default function PropertiesPage() {
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('all');
  const [type, setType] = useState('all');
  const [minBedrooms, setMinBedrooms] = useState(0);
  const [minBathrooms, setMinBathrooms] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10_000_000);
  const [sort, setSort] = useState<SortKey>('featured');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = properties.filter((p) => {
      if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.location.toLowerCase().includes(search.toLowerCase()))
        return false;
      if (location !== 'all' && !p.location.includes(location.split(',')[0])) return false;
      if (type !== 'all' && p.type !== type) return false;
      if (p.bedrooms < minBedrooms) return false;
      if (p.bathrooms < minBathrooms) return false;
      if (p.price > maxPrice) return false;
      return true;
    });

    switch (sort) {
      case 'price-asc': result = [...result].sort((a, b) => a.price - b.price); break;
      case 'price-desc': result = [...result].sort((a, b) => b.price - a.price); break;
      case 'bedrooms-desc': result = [...result].sort((a, b) => b.bedrooms - a.bedrooms); break;
      case 'sqft-desc': result = [...result].sort((a, b) => b.sqft - a.sqft); break;
      default: result = [...result].sort((a, b) => Number(b.featured) - Number(a.featured));
    }
    return result;
  }, [search, location, type, minBedrooms, minBathrooms, maxPrice, sort]);

  const resetFilters = () => {
    setSearch(''); setLocation('all'); setType('all');
    setMinBedrooms(0); setMinBathrooms(0); setMaxPrice(10_000_000);
    setSort('featured');
  };

  const selectClass = 'appearance-none bg-white border border-navy/15 px-4 py-3 pr-10 text-sm text-navy focus:border-champagne focus:outline-none transition-colors cursor-pointer min-h-[48px]';

  return (
    <div className="pt-20 lg:pt-[88px]">
      {/* Page header */}
      <div className="bg-navy text-white py-16 lg:py-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <ScrollReveal>
            <span className="text-xs uppercase tracking-[0.25em] text-champagne font-medium font-sans">
              Browse
            </span>
            <h1 className="mt-3 font-serif text-4xl lg:text-5xl font-bold">All Properties</h1>
            <p className="mt-3 text-white/60 text-lg max-w-xl">
              Explore our curated collection of premium homes and investment opportunities.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* Filter bar */}
      <div className="sticky top-20 lg:top-[88px] z-30 bg-white/95 backdrop-blur-md border-b border-navy/8">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-4">
          {/* Search + toggle */}
          <div className="flex items-center gap-3 mb-3">
            <div className="relative flex-1 max-w-md">
              <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-navy/40" />
              <input
                type="text"
                placeholder="Search by name or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search properties"
                className="w-full pl-11 pr-4 py-3 border border-navy/15 text-sm text-navy placeholder-navy/40 focus:border-champagne focus:outline-none transition-colors min-h-[48px]"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden px-5 py-3 border border-navy/15 text-sm text-navy hover:bg-ivory transition-colors min-h-[48px]"
            >
              Filters
            </button>
          </div>

          {/* Filter selects */}
          <div className={`${showFilters ? 'flex' : 'hidden'} lg:flex flex-wrap items-center gap-3`}>
            <div className="relative">
              <select value={location} onChange={(e) => setLocation(e.target.value)} className={selectClass} aria-label="Filter by location">
                <option value="all">All Locations</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
              <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy/40 pointer-events-none" />
            </div>
            <div className="relative">
              <select value={type} onChange={(e) => setType(e.target.value)} className={selectClass} aria-label="Filter by type">
                <option value="all">All Types</option>
                {propertyTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy/40 pointer-events-none" />
            </div>
            <div className="relative">
              <select value={minBedrooms} onChange={(e) => setMinBedrooms(Number(e.target.value))} className={selectClass} aria-label="Minimum bedrooms">
                <option value={0}>Any Beds</option>
                {[2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n}+ Beds</option>)}
              </select>
              <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy/40 pointer-events-none" />
            </div>
            <div className="relative">
              <select value={minBathrooms} onChange={(e) => setMinBathrooms(Number(e.target.value))} className={selectClass} aria-label="Minimum bathrooms">
                <option value={0}>Any Baths</option>
                {[2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}+ Baths</option>)}
              </select>
              <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy/40 pointer-events-none" />
            </div>
            <div className="relative">
              <select value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className={selectClass} aria-label="Maximum price">
                <option value={10_000_000}>Any Price</option>
                <option value={2_000_000}>Under $2M</option>
                <option value={3_000_000}>Under $3M</option>
                <option value={4_000_000}>Under $4M</option>
                <option value={5_000_000}>Under $5M</option>
              </select>
              <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy/40 pointer-events-none" />
            </div>
            <div className="relative">
              <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className={selectClass} aria-label="Sort properties">
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="bedrooms-desc">Most Bedrooms</option>
                <option value="sqft-desc">Largest Area</option>
              </select>
              <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy/40 pointer-events-none" />
            </div>
            <button
              onClick={resetFilters}
              className="text-sm text-champagne hover:text-champagne-dark transition-colors px-3 py-3"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="bg-ivory min-h-[60vh] py-12 lg:py-16">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="flex items-center justify-between mb-8">
            <p className="text-sm text-near-black/50">
              Showing <span className="text-navy font-medium">{filtered.length}</span> {filtered.length === 1 ? 'property' : 'properties'}
            </p>
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filtered.map((property, i) => (
                <ScrollReveal key={property.id} delay={Math.min(i * 60, 300)}>
                  <PropertyCard property={property} />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-near-black/50 text-lg">No properties match your filters.</p>
              <button onClick={resetFilters} className="mt-4 text-champagne hover:text-champagne-dark transition-colors">
                Reset filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
