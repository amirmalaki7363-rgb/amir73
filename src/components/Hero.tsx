import Link from 'next/link';
import { ArrowRightIcon } from './Icons';

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[640px] w-full overflow-hidden flex items-center justify-center">
      {/* Background image */}
      <div className="absolute inset-0 animate-scale-in">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80"
          alt="Modern luxury home at twilight with glass walls and swimming pool"
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
      </div>

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/20 to-navy/70" />

      {/* Content */}
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

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2">
        <span className="text-white/50 text-xs uppercase tracking-[0.2em]">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
}
