'use client';

import { FaMap, FaPhone, FaCar, FaCheckCircle } from 'react-icons/fa';

export default function HowItWorks() {
  const steps = [
    {
      number: '1',
      icon: <FaMap size={32} />,
      title: 'Set Your Location',
      description: 'Open TezzRide and set your pickup and drop-off locations with a few taps.',
    },
    {
      number: '2',
      icon: <FaPhone size={32} />,
      title: 'Choose Your Service',
      description: 'Select from Ride, Delivery, or Money Transfer services based on your needs.',
    },
    {
      number: '3',
      icon: <FaCar size={32} />,
      title: 'Get Matched',
      description: 'Get matched with a verified driver or delivery partner instantly.',
    },
    {
      number: '4',
      icon: <FaCheckCircle size={32} />,
      title: 'Complete & Rate',
      description: 'Complete your journey and rate your experience to help us improve.',
    },
  ];

  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--gray-900)' }}>
            How It Works
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Getting a ride with TezzRide is simple, fast, and secure
          </p>
        </div>

        {/* Steps Container */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-20 left-0 right-0 h-1" style={{ backgroundColor: 'var(--green-400)', opacity: 0.3 }}></div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Step Card */}
                <div className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition duration-300">
                  {/* Number Badge */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-4 shadow-lg"
                    style={{ backgroundColor: 'var(--primary-orange)' }}
                  >
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white"
                    style={{ backgroundColor: 'var(--green-400)' }}
                  >
                    {step.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--gray-900)' }}>
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow between steps (hidden on last) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:flex absolute -right-4 top-20 items-center justify-center w-8 h-8 rounded-full bg-white border-4" style={{ borderColor: 'var(--primary-orange)' }}>
                    <span style={{ color: 'var(--primary-orange)' }}>→</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6">That's it! You're done. Enjoy your journey.</p>
          <button
            className="px-8 py-3 rounded-lg font-semibold transition hover:shadow-lg text-white"
            style={{ backgroundColor: 'var(--primary-orange)' }}
          >
            Get Started Now
          </button>
        </div>
      </div>
    </section>
  );
}
