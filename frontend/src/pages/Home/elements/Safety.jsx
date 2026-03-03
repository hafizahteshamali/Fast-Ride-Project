'use client';

import { FaShieldAlt, FaCamera, FaCheckCircle, FaPhone } from 'react-icons/fa';

export default function Safety() {
  const safetyFeatures = [
    {
      icon: <FaCamera size={32} />,
      title: 'HD Dashboard Cameras',
      description: 'Every ride is monitored with HD cameras for your complete safety and security.',
    },
    {
      icon: <FaShieldAlt size={32} />,
      title: 'Verified Drivers',
      description: 'All drivers undergo rigorous background checks and security screening.',
    },
    {
      icon: <FaCheckCircle size={32} />,
      title: 'Real-time Tracking',
      description: 'Share your live location with family and friends during every ride.',
    },
    {
      icon: <FaPhone size={32} />,
      title: '24/7 Support',
      description: 'Our dedicated support team is available around the clock to assist you.',
    },
  ];

  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--gray-900)' }}>
            Your Safety is Our Priority
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We've implemented comprehensive safety measures to ensure every ride is secure and worry-free
          </p>
        </div>

        {/* Safety Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {safetyFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl p-8 flex gap-6 hover:shadow-lg transition duration-300 border-l-4"
              style={{ borderLeftColor: 'var(--green-400)' }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-white flex-shrink-0"
                style={{ backgroundColor: 'var(--primary-orange)' }}
              >
                {feature.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--gray-900)' }}>
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Safety Promise */}
        <div
          className="rounded-2xl p-12 text-white"
          style={{ backgroundColor: 'var(--secondary-orange)' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold mb-2">100%</p>
              <p className="text-lg">Driver Verification</p>
              <p className="text-sm opacity-90">Every driver verified</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">24/7</p>
              <p className="text-lg">Emergency Support</p>
              <p className="text-sm opacity-90">Always available</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">4.9★</p>
              <p className="text-lg">Safety Rating</p>
              <p className="text-sm opacity-90">By millions of users</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
