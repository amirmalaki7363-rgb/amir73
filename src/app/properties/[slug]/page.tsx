import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import PropertyGallery from '@/components/PropertyGallery';
import FavoriteButton from '@/components/FavoriteButton';
import PropertyCard from '@/components/PropertyCard';
import ScrollReveal from '@/components/ScrollReveal';
import Button from '@/components/Button';
import {
  MapPinIcon, BedIcon, BathIcon, RulerIcon, CheckIcon,
  PhoneIcon, MailIcon, CalendarIcon, ArrowRightIcon, ArrowLeftIcon,
} from '@/components/Icons';
import { properties, getPropertyBySlug, getSimilarProperties } from '@/data/properties';
import { formatPrice } from '@/lib/utils';

export function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const property = getPropertyBySlug(params.slug);
  if (!property) return { title: 'ملک یافت نشد' };
  return {
    title: `${property.name} | هورایزن املاک`,
    description: property.description.slice(0, 160),
  };
}

export default function PropertyDetailPage({ params }: { params: { slug: string } }) {
  const property = getPropertyBySlug(params.slug);
  if (!property) notFound();

  const similar = getSimilarProperties(property);

  const specs = [
    { icon: BedIcon, label: 'اتاق خواب', value: property.bedrooms.toLocaleString('fa-IR') },
    { icon: BathIcon, label: 'حمام', value: property.bathrooms.toLocaleString('fa-IR') },
    { icon: RulerIcon, label: 'مساحت', value: `${property.sqft.toLocaleString('fa-IR')} متر²` },
  ];

  return (
    <div className="pt-20 lg:pt-[88px]">
      {/* Breadcrumb */}
      <div className="bg-ivory border-b border-navy/5">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-4">
          <nav className="flex items-center gap-2 text-sm text-near-black/50" aria-label="مسیر">
            <Link href="/" className="hover:text-navy transition-colors">خانه</Link>
            <span>/</span>
            <Link href="/properties" className="hover:text-navy transition-colors">املاک</Link>
            <span>/</span>
            <span className="text-navy">{property.name}</span>
          </nav>
        </div>
      </div>

      {/* Gallery + header */}
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Gallery */}
          <div className="lg:col-span-2">
            <PropertyGallery images={property.images} alt={property.name} />
          </div>

          {/* Info sidebar */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-32">
              {/* Type tag */}
              <span className="inline-block text-sm tracking-wide text-champagne font-medium mb-3">
                {property.type}
              </span>
              <h1 className="font-serif text-3xl lg:text-4xl text-navy font-bold leading-tight">
                {property.name}
              </h1>
              <div className="flex items-center gap-1.5 mt-3 text-near-black/60">
                <MapPinIcon className="w-4 h-4 text-champagne" />
                {property.location}
              </div>

              {/* Price */}
              <div className="mt-6 pb-6 border-b border-navy/10">
                <span className="text-3xl font-serif font-bold text-navy">
                  {formatPrice(property.price)}
                </span>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-3 gap-4 py-6 border-b border-navy/10">
                {specs.map((spec) => (
                  <div key={spec.label} className="text-center">
                    <spec.icon className="w-5 h-5 text-champagne mx-auto mb-2" />
                    <div className="text-lg font-serif font-bold text-navy">{spec.value}</div>
                    <div className="text-xs text-near-black/50 tracking-wide">{spec.label}</div>
                  </div>
                ))}
              </div>

              {/* Additional info */}
              <div className="py-6 space-y-3 border-b border-navy/10">
                {property.yearBuilt && (
                  <div className="flex justify-between text-sm">
                    <span className="text-near-black/50">سال ساخت</span>
                    <span className="text-navy font-medium">{property.yearBuilt.toLocaleString('fa-IR')}</span>
                  </div>
                )}
                {property.lotSize && (
                  <div className="flex justify-between text-sm">
                    <span className="text-near-black/50">مساحت زمین</span>
                    <span className="text-navy font-medium">{property.lotSize}</span>
                  </div>
                )}
              </div>

              {/* Favorite */}
              <div className="py-6">
                <FavoriteButton propertyId={property.id} className="w-full justify-center" />
              </div>

              {/* Agent card */}
              <div className="bg-ivory rounded-lg p-6">
                <div className="flex items-center gap-4">
                  <img
                    src={property.agent.image}
                    alt={property.agent.name}
                    className="w-16 h-16 rounded-full object-cover"
                    loading="lazy"
                  />
                  <div>
                    <div className="font-serif text-lg text-navy font-bold">{property.agent.name}</div>
                    <div className="text-xs text-champagne tracking-wide">{property.agent.role}</div>
                  </div>
                </div>
                <div className="mt-5 space-y-3">
                  <a
                    href={`tel:${property.agent.phone.replace(/\D/g, '')}`}
                    className="flex items-center gap-3 text-sm text-near-black/70 hover:text-navy transition-colors"
                  >
                    <PhoneIcon className="w-4 h-4 text-champagne" />
                    {property.agent.phone}
                  </a>
                  <a
                    href={`mailto:${property.agent.email}`}
                    className="flex items-center gap-3 text-sm text-near-black/70 hover:text-navy transition-colors"
                  >
                    <MailIcon className="w-4 h-4 text-champagne" />
                    {property.agent.email}
                  </a>
                </div>
                <div className="mt-5 space-y-3">
                  <Button href="#" variant="primary" className="w-full justify-center" showArrow>
                    تماس با مشاور
                  </Button>
                  <button className="w-full inline-flex items-center justify-center gap-2 border border-navy/15 text-navy px-5 py-3.5 text-sm font-medium tracking-wide hover:bg-navy hover:text-white transition-all duration-500 min-h-[48px]">
                    <CalendarIcon className="w-4 h-4" />
                    رزرو بازدید
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description + Features */}
      <div className="bg-ivory py-16 lg:py-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Description */}
            <ScrollReveal>
              <span className="text-sm tracking-[0.15em] text-champagne font-medium font-sans">
                درباره این ملک
              </span>
              <h2 className="mt-3 font-serif text-2xl lg:text-3xl text-navy font-bold mb-6">
                توضیحات
              </h2>
              <p className="text-near-black/70 text-lg leading-relaxed">
                {property.description}
              </p>
            </ScrollReveal>

            {/* Key Features */}
            <ScrollReveal delay={100}>
              <span className="text-sm tracking-[0.15em] text-champagne font-medium font-sans">
                ویژگی‌های کلیدی
              </span>
              <h2 className="mt-3 font-serif text-2xl lg:text-3xl text-navy font-bold mb-6">
                چه چیزی آن را خاص می‌کند
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {property.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-near-black/70">
                    <span className="w-5 h-5 rounded-full bg-champagne/15 text-champagne flex items-center justify-center shrink-0 mt-0.5">
                      <CheckIcon className="w-3 h-3" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>

          {/* Amenities */}
          <ScrollReveal className="mt-16">
            <h3 className="font-serif text-xl text-navy font-bold mb-6">امکانات</h3>
            <div className="flex flex-wrap gap-3">
              {property.amenities.map((amenity) => (
                <span
                  key={amenity}
                  className="px-5 py-2.5 bg-white border border-navy/10 rounded text-sm text-navy/70"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Similar properties */}
      {similar.length > 0 && (
        <div className="bg-white py-16 lg:py-20">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
            <ScrollReveal className="flex items-center justify-between mb-10">
              <div>
                <span className="text-sm tracking-[0.15em] text-champagne font-medium font-sans">
                  ممکن است بپسندید
                </span>
                <h2 className="mt-3 font-serif text-2xl lg:text-3xl text-navy font-bold">
                  املاک مشابه
                </h2>
              </div>
              <Link
                href="/properties"
                className="hidden sm:inline-flex items-center gap-2 text-sm text-navy hover:text-champagne transition-colors group"
              >
                مشاهده همه
                <ArrowRightIcon className="w-4 h-4 ltr-arrow transition-transform group-hover:translate-x-1" />
              </Link>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {similar.map((p, i) => (
                <ScrollReveal key={p.id} delay={i * 80}>
                  <PropertyCard property={p} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Back link */}
      <div className="bg-white pb-16">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 text-sm text-navy hover:text-champagne transition-colors group"
          >
            <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            بازگشت به همه املاک
          </Link>
        </div>
      </div>

      {/* Sticky mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-navy/10 px-4 py-3 flex items-center gap-3 lg:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="flex-1">
          <div className="text-xs text-near-black/50">{property.type}</div>
          <div className="font-serif text-lg font-bold text-navy">{formatPrice(property.price)}</div>
        </div>
        <a
          href={`tel:${property.agent.phone.replace(/\D/g, '')}`}
          className="px-5 py-3 bg-navy text-white text-sm font-medium tracking-wide min-h-[48px] flex items-center"
        >
          <PhoneIcon className="w-4 h-4" />
        </a>
        <button className="px-5 py-3 bg-champagne text-navy text-sm font-medium tracking-wide min-h-[48px]">
          استعلام
        </button>
      </div>
    </div>
  );
}
