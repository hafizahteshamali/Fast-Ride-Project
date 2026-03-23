'use client';

import { FaAward, FaBriefcase, FaUsers } from 'react-icons/fa';

export default function Partners() {
  const partnerTypes = [
    {
      title: 'Become a Driver',
      icon: <FaBriefcase size={40} />,
      description: 'Join our growing community of earning partners and work on your own terms.',
      benefits: ['Flexible hours', 'Daily payouts', 'Support & incentives', 'Vehicle options'],
      cta: 'Apply Now',
    },
    {
      title: 'Merchant Partner',
      icon: <FaUsers size={40} />,
      description: 'Expand your business reach with TezRide\'s reliable delivery network.',
      benefits: ['Wide customer base', 'Real-time tracking', 'Marketing support', 'Competitive rates'],
      cta: 'Partner With Us',
    },
    {
      title: 'Corporate Solutions',
      icon: <FaAward size={40} />,
      description: 'Enterprise mobility and delivery solutions tailored for your business needs.',
      benefits: ['Custom pricing', 'Account management', 'API integration', 'Priority support'],
      cta: 'Contact Sales',
    },
  ];

  return (
    <section className="py-16 md:py-24 px-4 md:px-8" style={{ backgroundColor: 'var(--gray-50)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--gray-900)' }}>
            Partnership Opportunities
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Join our ecosystem and grow with TezRide. Whether you're a driver, merchant, or corporation, we have opportunities for you.
          </p>
        </div>

        {/* Partner Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {partnerTypes.map((partner, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 hover:shadow-xl transition duration-300 border-t-4"
              style={{ borderTopColor: 'var(--primary-orange)' }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-white mb-6"
                style={{ backgroundColor: 'var(--primary-orange)' }}
              >
                {partner.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3" style={{ color: 'var(--gray-900)' }}>
                {partner.title}
              </h3>
              <p className="text-gray-600 mb-6">{partner.description}</p>

              {/* Benefits */}
              <ul className="space-y-2 mb-8">
                {partner.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-700">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: 'var(--primary-orange)' }}
                    ></span>
                    {benefit}
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                className="w-full px-6 py-3 rounded-lg font-semibold transition hover:shadow-lg text-white"
                style={{ backgroundColor: 'var(--primary-orange)' }}
              >
                {partner.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Trust Section */}
        <div
          className="mt-16 rounded-2xl p-12 text-center text-white"
          style={{ backgroundColor: 'var(--primary-orange)' }}
        >
          <h3 className="text-2xl font-bold mb-4">Why Partners Trust TezRide?</h3>
          <p className="mb-8 text-lg opacity-90 max-w-2xl mx-auto">
            With transparent operations, reliable support, and fair compensation, thousands of partners have already joined our growing community.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
            <div>
              <p className="text-3xl font-bold">50K+</p>
              <p className="text-sm opacity-90">Active Partners</p>
            </div>
            <div>
              <p className="text-3xl font-bold">24/7</p>
              <p className="text-sm opacity-90">Customer Support</p>
            </div>
            <div>
              <p className="text-3xl font-bold">100%</p>
              <p className="text-sm opacity-90">Transparent</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
