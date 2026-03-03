'use client';

import { FaTrophy, FaMoneyBillWave, FaShieldAlt } from 'react-icons/fa';

export default function Features() {
  const features = [
    {
      icon: <FaShieldAlt size={40} />,
      title: 'Prioritize Your Safety',
      description:
        'Your safety is our priority. All drivers are verified and trained professionals. Every ride is insured and monitored for your peace of mind.',
      color: 'var(--primary-orange)',
    },
    {
      icon: <FaTrophy size={40} />,
      title: 'Maintain High Quality Standards',
      description:
        'We maintain the highest standards of service quality. Our fleet is regularly maintained and every driver undergoes rigorous background checks.',
      color: 'var(--secondary-orange)',
    },
    {
      icon: <FaMoneyBillWave size={40} />,
      title: 'Provide Transparent Pricing',
      description:
        'No hidden charges. You know the exact fare before you book. Our pricing is fair, competitive, and designed for everyone.',
      color: 'var(--green-400)',
    },
  ];

  return (
    <section id="features" className="py-16 md:py-24 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--gray-900)' }}>
            Why Choose TezzRide?
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Experience the perfect blend of safety, quality, and affordability
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition duration-300 border-t-4" style={{ borderTopColor: feature.color }}>
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-6 text-white"
                style={{ backgroundColor: feature.color }}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--gray-900)' }}>
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 rounded-2xl p-12 text-center" style={{ backgroundColor: 'var(--gray-50)' }}>
          <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: 'var(--gray-900)' }}>
            Join Millions of Happy Users
          </h3>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Download TezzRide today and enjoy safe, reliable, and affordable rides whenever you need them.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="px-8 py-3 rounded-lg font-semibold transition text-white"
              style={{ backgroundColor: 'var(--primary-orange)' }}
            >
              Download Now
            </button>
            <button
              className="px-8 py-3 rounded-lg font-semibold transition"
              style={{ backgroundColor: 'white', color: 'var(--primary-orange)', border: '2px solid var(--primary-orange)' }}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
