import React from 'react';
import HeroSection from './elements/HeroSection';
import FeaturedService from './elements/FeaturedService';
import ServiceGrid from './elements/ServiceGrid';
import HowItWorks from './elements/HowItWorks';
import PricingSection from './elements/PricingSection';
import WhyChooseUs from './elements/WhyChooseUs';
import CTASection from './elements/CTASection';

const Services = () => {
  return (
    <main className="overflow-hidden">
      <HeroSection />
      <FeaturedService />
      <ServiceGrid />
      <HowItWorks />
      <PricingSection />
      <WhyChooseUs />
      <CTASection />
    </main>
  );
};

export default Services;