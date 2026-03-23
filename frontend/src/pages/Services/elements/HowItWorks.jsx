'use client';

import { FaMobile, FaMapPin, FaCreditCard, FaCheckCircle } from 'react-icons/fa';

const steps = [
  {
    icon: FaMobile,
    title: 'Download App',
    description: 'Get the TezRide app from App Store or Google Play',
    color: 'var(--primary-orange)'
  },
  {
    icon: FaMapPin,
    title: 'Choose Service',
    description: 'Select the service you need and set your location',
    color: 'var(--secondary-orange)'
  },
  {
    icon: FaCreditCard,
    title: 'Make Payment',
    description: 'Pay securely through multiple payment options',
    color: 'var(--primary-orange)'
  },
  {
    icon: FaCheckCircle,
    title: 'Enjoy Service',
    description: 'Get your service delivered quickly and efficiently',
    color: 'var(--secondary-orange)'
  }
];

export default function HowItWorks() {
  return (
    <section className="py-20 px-4 md:px-8" style={{ backgroundColor: 'var(--white)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How It{' '}
            <span style={{ color: 'var(--primary-orange)' }}>Works</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Get started with TezRide in four simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="flex flex-wrap justify-center gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex-1 min-w-[250px] max-w-[300px]">
              <div className="relative group">
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-2xl font-bold z-10"
                  style={{ color: step.color, border: `2px solid ${step.color}` }}
                >
                  {index + 1}
                </div>

                {/* Step Card */}
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 text-center pt-12">
                  <div className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center"
                    style={{ 
                      backgroundColor: step.color,
                      color: 'white'
                    }}
                  >
                    <step.icon size={36} />
                  </div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--gray-800)' }}>
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>

                  {/* Connector Line (except last) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform translate-x-1/2">
                      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={step.color} strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}