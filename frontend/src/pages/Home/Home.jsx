import About from "./elements/About";
import AppShowcase from "./elements/AppShowcase";
import Community from "./elements/Community";
import CTA from "./elements/CTA";
import Features from "./elements/Features";
import Footprint from "./elements/Footprint";
import Hero from "./elements/Hero";
import HowItWorks from "./elements/HowItWorks";
import Partners from "./elements/Partners";
import Safety from "./elements/Safety";
import Services from "./elements/Services";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <Services />
      <HowItWorks />
      <AppShowcase />
      <Features />
      <Safety />
      <Footprint />
      <About />
      <Partners />
      <Community />
      <CTA />
    </main>
  );
}
