import ScrollReveal from './ScrollReveal';
import Button from './Button';
import { KeyIcon } from './Icons';

export default function CTASection() {
  return (
    <section className="bg-off-white py-20 lg:py-24">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-white rounded-2xl shadow-lg px-8 py-10 lg:px-14 lg:py-12">
            {/* Left: icon + text */}
            <div className="flex items-center gap-6 flex-1">
              <div className="w-16 h-16 rounded-full bg-navy text-champagne flex items-center justify-center shrink-0">
                <KeyIcon className="w-7 h-7" />
              </div>
              <div>
                <h2 className="font-serif text-2xl lg:text-3xl text-navy font-bold leading-tight">
                  Ready to Find Your Perfect Property?
                </h2>
                <p className="mt-2 text-near-black/60 text-base">
                  Let our experts guide you to the right home or investment.
                </p>
              </div>
            </div>

            {/* Right: CTA */}
            <div className="shrink-0">
              <Button href="/properties" variant="primary" showArrow size="lg">
                Get In Touch
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
