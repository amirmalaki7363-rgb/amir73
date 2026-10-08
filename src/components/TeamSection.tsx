import ScrollReveal from './ScrollReveal';
import { team } from '@/data/properties';
import { MailIcon, PhoneIcon } from './Icons';

export default function TeamSection() {
  return (
    <section id="team" className="bg-ivory py-section">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <ScrollReveal className="text-center mb-12 lg:mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-champagne font-medium font-sans">
            Our Team
          </span>
          <h2 className="mt-4 font-serif text-section text-navy font-bold">
            Meet the Experts
          </h2>
          <p className="mt-4 text-near-black/60 text-lg max-w-2xl mx-auto">
            A dedicated team of professionals with deep market knowledge and a passion for
            exceptional service.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {team.map((member, i) => (
            <ScrollReveal key={member.name} delay={i * 80} className="group">
              <div className="relative img-zoom rounded-lg overflow-hidden shadow-lg aspect-[4/5]">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/40 transition-all duration-500 flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100">
                  <div className="flex gap-3">
                    <a
                      href={`mailto:${member.email}`}
                      aria-label={`Email ${member.name}`}
                      className="w-10 h-10 rounded-full bg-white/90 text-navy flex items-center justify-center hover:bg-champagne transition-colors"
                    >
                      <MailIcon className="w-4 h-4" />
                    </a>
                    <a
                      href={`tel:${member.phone.replace(/\D/g, '')}`}
                      aria-label={`Call ${member.name}`}
                      className="w-10 h-10 rounded-full bg-white/90 text-navy flex items-center justify-center hover:bg-champagne transition-colors"
                    >
                      <PhoneIcon className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <h3 className="font-serif text-lg text-navy font-bold">{member.name}</h3>
                <p className="text-sm text-champagne mt-1 uppercase tracking-wide">
                  {member.role}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
