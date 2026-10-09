import ScrollReveal from './ScrollReveal';
import { services } from '@/data/properties';

export default function ServicesSection() {
  return (
    <section id="services" className="bg-white py-section">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <ScrollReveal className="text-center mb-12 lg:mb-16">
          <span className="text-sm tracking-[0.15em] text-champagne font-medium font-sans">
            کارهای ما
          </span>
          <h2 className="mt-4 font-serif text-section text-navy font-bold">
            خدمات ما
          </h2>
          <p className="mt-4 text-near-black/60 text-lg max-w-2xl mx-auto">
            راه‌حل‌های جامع املاک متناسب با نیازهای مشتریان متمایز.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-navy/5">
          {services.map((service, i) => (
            <ScrollReveal
              key={service.number}
              delay={i * 80}
              className="bg-white p-8 lg:p-10 hover:bg-ivory transition-colors duration-500 group"
            >
              <div className="flex items-start gap-5">
                <span className="font-serif text-2xl text-champagne/40 group-hover:text-champagne transition-colors duration-500">
                  {service.number}
                </span>
                <div>
                  <h3 className="font-serif text-xl text-navy font-bold mb-3">
                    {service.title}
                  </h3>
                  <p className="text-near-black/60 leading-relaxed text-sm">
                    {service.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
