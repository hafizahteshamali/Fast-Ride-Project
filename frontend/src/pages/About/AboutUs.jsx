'use client';

import { useState, useEffect } from 'react';
import HeroSection from './elements/HeroSection';
import StatsSection from './elements/StatsSection';
import MissionVision from './elements/MissionVision';
import ValuesSection from './elements/ValuesSection';
import TimelineSection from './elements/TimelineSection';
import TeamSection from './elements/TeamSection';
import TestimonialsSection from './elements/TestimonialsSection';
import CTASection from './elements/CTASection';

export default function AboutUs() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <main className="overflow-hidden">
      <HeroSection isVisible={isVisible} />
      <StatsSection />
      <MissionVision />
      <ValuesSection />
      <TimelineSection />
      <TeamSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
}