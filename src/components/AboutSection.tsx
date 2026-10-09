import ScrollReveal from './ScrollReveal';
import Button from './Button';
import { ArrowRightIcon } from './Icons';

export default function AboutSection() {
  return (
    <section id="about" className="bg-white py-section">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Right: Text (RTL: visually on the right) */}
          <ScrollReveal>
            <span className="text-sm tracking-[0.15em] text-champagne font-medium font-sans">
              درباره ما
            </span>
            <h2 className="mt-4 font-serif text-section text-navy font-bold text-balance">
              ما چه کسی هستیم
            </h2>
            <p className="mt-6 text-near-black/70 text-lg leading-relaxed max-w-lg">
              در هورایزن املاک، ما مردم را با خانه‌های استثنایی و سرمایه‌گذاری‌های هوشمند
              پیوند می‌دهیم. صداقت، شفافیت و رضایت مشتری در قلب همه کارهای ما قرار دارد.
            </p>
            <p className="mt-4 text-near-black/60 leading-relaxed max-w-lg">
              تیم ما ده‌ها سال تجربه ترکیبی در مطلوب‌ترین بازارهای جهان را به ارمغان
              می‌آورد و سطحی از خدمات و بینش ارائه می‌دهد که مشتریان متمایز به آن
              اعتماد کرده‌اند.
            </p>
            <div className="mt-8">
              <Button href="/#services" variant="primary" showArrow>
                بیشتر بدانید
              </Button>
            </div>
          </ScrollReveal>

          {/* Left: Asymmetric image composition */}
          <ScrollReveal delay={150} className="relative">
            <div className="relative grid grid-cols-5 gap-4 h-[480px] md:h-[560px]">
              {/* Main image */}
              <div className="col-span-4 img-zoom rounded-lg overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1706808849780-7a04fbac83ef?auto=format&fit=crop&w=900&q=80"
                  alt="خانه لوکس مدرن با استخر"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              {/* Secondary narrower image */}
              <div className="col-span-2 img-zoom rounded-lg overflow-hidden shadow-xl self-end h-[65%]">
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=500&q=80"
                  alt="جزئیات معماری مدرن"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              {/* Circular arrow button */}
              <button
                aria-label="مشاهده املاک بیشتر"
                className="absolute -bottom-4 right-[55%] w-14 h-14 rounded-full bg-navy text-white flex items-center justify-center shadow-xl hover:bg-champagne hover:text-navy transition-all duration-500 ease-luxury group"
              >
                <ArrowRightIcon className="w-5 h-5 ltr-arrow transition-transform duration-500 group-hover:translate-x-0.5" />
              </button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
