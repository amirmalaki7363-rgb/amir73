import ScrollReveal from './ScrollReveal';
import Button from './Button';
import { ArrowRightIcon } from './Icons';

export default function AboutSection() {
  return (
    <section id="about" className="bg-white py-section">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Text */}
          <ScrollReveal>
            <span className="text-xs uppercase tracking-[0.25em] text-champagne font-medium font-sans">
              About Us
            </span>
            <h2 className="mt-4 font-serif text-section text-navy font-bold text-balance">
              Who We Are
            </h2>
            <p className="mt-6 text-near-black/70 text-lg leading-relaxed max-w-lg">
              At Horizon Properties, we connect people with extraordinary homes and smart
              investments. Integrity, transparency, and client satisfaction are at the
              heart of everything we do.
            </p>
            <p className="mt-4 text-near-black/60 leading-relaxed max-w-lg">
              Our team brings decades of combined experience across the world&apos;s most
              desirable markets, offering a level of service and insight that discerning
              clients have come to trust.
            </p>
            <div className="mt-8">
              <Button href="/#services" variant="primary" showArrow>
                Learn More
              </Button>
            </div>
          </ScrollReveal>

          {/* Right: Asymmetric image composition */}
          <ScrollReveal delay={150} className="relative">
            <div className="relative grid grid-cols-5 gap-4 h-[480px] md:h-[560px]">
              {/* Main image */}
              <div className="col-span-4 img-zoom rounded-lg overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1706808849780-7a04fbac83ef?auto=format&fit=crop&w=900&q=80"
                  alt="Modern luxury home with pool"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              {/* Secondary narrower image */}
              <div className="col-span-2 img-zoom rounded-lg overflow-hidden shadow-xl self-end h-[65%]">
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=500&q=80"
                  alt="Modern architectural detail"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              {/* Circular arrow button */}
              <button
                aria-label="View more properties"
                className="absolute -bottom-4 left-[55%] w-14 h-14 rounded-full bg-navy text-white flex items-center justify-center shadow-xl hover:bg-champagne hover:text-navy transition-all duration-500 ease-luxury group"
              >
                <ArrowRightIcon className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-0.5" />
              </button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
