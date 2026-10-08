import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import FeaturedProperties from '@/components/FeaturedProperties';
import ServicesSection from '@/components/ServicesSection';
import WhyChooseSection from '@/components/WhyChooseSection';
import TeamSection from '@/components/TeamSection';
import CTASection from '@/components/CTASection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <FeaturedProperties />
      <ServicesSection />
      <WhyChooseSection />
      <TeamSection />
      <CTASection />
    </>
  );
}
