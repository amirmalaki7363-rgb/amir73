import ScrollVideoHero from '@/components/ScrollVideoHero';
import AboutSection from '@/components/AboutSection';
import FeaturedProperties from '@/components/FeaturedProperties';
import ServicesSection from '@/components/ServicesSection';
import WhyChooseSection from '@/components/WhyChooseSection';
import TeamSection from '@/components/TeamSection';
import CTASection from '@/components/CTASection';

export default function HomePage() {
  return (
    <>
      <ScrollVideoHero />
      <AboutSection />
      <FeaturedProperties />
      <ServicesSection />
      <WhyChooseSection />
      <TeamSection />
      <CTASection />
    </>
  );
}
