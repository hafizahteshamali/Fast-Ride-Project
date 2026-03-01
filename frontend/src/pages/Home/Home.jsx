import CTASection from "./elements/CTASection";
import DownloadApp from "./elements/DownloadApp";
import HeroSection from "./elements/HeroSection";
import HowItWorks from "./elements/HowItWorks";
import PricingSection from "./elements/PricingSection";
import ServicesSection from "./elements/ServiceFeatures";
import WhyChooseUs from "./elements/WhyChooseUs";


const Home = () => {
  return (
    <main className="overflow-hidden">
      <HeroSection />
      <ServicesSection />
      <HowItWorks />
      <WhyChooseUs />
      <PricingSection />
      <DownloadApp />
      <CTASection />
    </main>
  );
};

export default Home;