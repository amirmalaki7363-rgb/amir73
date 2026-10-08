import ScrollReveal from './ScrollReveal';
import PropertyCarousel from './PropertyCarousel';
import PropertyCard from './PropertyCard';
import { properties } from '@/data/properties';
import Button from './Button';

export default function FeaturedProperties() {
  const featured = properties.filter((p) => p.featured);
  const allProps = [...featured, ...properties.filter((p) => !p.featured)];

  return (
    <section className="bg-ivory py-section">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <ScrollReveal className="text-center mb-12 lg:mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-champagne font-medium font-sans">
            Featured
          </span>
          <h2 className="mt-4 font-serif text-section text-navy font-bold">
            Featured Properties
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <PropertyCarousel>
            {allProps.map((property, i) => (
              <PropertyCard
                key={property.id}
                property={property}
                variant={i === 0 ? 'large' : 'default'}
              />
            ))}
          </PropertyCarousel>
        </ScrollReveal>

        <ScrollReveal delay={150} className="text-center mt-12">
          <Button href="/properties" variant="primary" showArrow>
            View All Properties
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}
