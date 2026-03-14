import React from 'react';
import ContactHero from './elements/ContactHero';
import ContactInfo from './elements/ContactInfo';
import ContactForm from './elements/ContactForm';
import OfficeLocations from './elements/OfficeLocations';
import MapSection from './elements/MapSection';
import FAQSection from './elements/FAQSection';
import SocialConnect from './elements/SocialConnect';

const Contact = () => {
  return (
    <main className="overflow-hidden">
      <ContactHero />
      <ContactInfo />
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto px-4 md:px-8 gap-8 py-16">
        <div className="flex-1 lg:w-1/2">
          <ContactForm />
        </div>
        <div className="flex-1 lg:w-1/2">
          <OfficeLocations />
        </div>
      </div>
      <MapSection />
      <FAQSection />
      <SocialConnect />
    </main>
  );
};

export default Contact;