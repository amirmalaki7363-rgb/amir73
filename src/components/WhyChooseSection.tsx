import ScrollReveal from './ScrollReveal';
import { reasons, stats } from '@/data/properties';
import { CheckIcon } from './Icons';

export default function WhyChooseSection() {
  return (
    <section className="bg-navy text-white py-section relative overflow-hidden">
      {/* Subtle background image */}
      <div className="absolute inset-0 opacity-10">
        <img
          src="https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1600&q=80"
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: heading + stats */}
          <ScrollReveal>
            <span className="text-xs uppercase tracking-[0.25em] text-champagne font-medium font-sans">
              Why Choose Us
            </span>
            <h2 className="mt-4 font-serif text-section text-white font-bold text-balance">
              Why Choose Horizon
            </h2>
            <p className="mt-6 text-white/70 text-lg leading-relaxed max-w-lg">
              We don&apos;t just sell properties — we build lasting relationships founded on
              trust, expertise, and an unwavering commitment to our clients&apos; success.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-serif text-3xl text-champagne font-bold">
                    {stat.value}
                  </div>
                  <div className="text-xs text-white/50 uppercase tracking-wide mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Right: reasons list */}
          <ScrollReveal delay={150} className="space-y-px">
            {reasons.map((reason) => (
              <div
                key={reason.number}
                className="flex items-start gap-4 py-6 border-b border-white/10 group"
              >
                <span className="w-10 h-10 rounded-full border border-champagne/40 flex items-center justify-center shrink-0 text-champagne group-hover:bg-champagne group-hover:text-navy transition-all duration-500">
                  <CheckIcon className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-serif text-lg text-white font-bold mb-1">
                    {reason.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
