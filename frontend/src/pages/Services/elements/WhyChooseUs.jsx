'use client';

import { 
  FaShieldAlt, 
  FaBolt, 
  FaClock, 
  FaHeadset,
  FaMoneyBillWave,
  FaMapMarkedAlt
} from 'react-icons/fa';

const reasons = [
  {
    icon: FaShieldAlt,
    title: 'Safety First',
    description: 'All drivers are verified and vehicles regularly inspected',
    color: 'var(--primary-orange)'
  },
  {
    icon: FaBolt,
    title: 'Lightning Fast',
    description: 'Quick pickup and delivery with optimized routes',
    color: 'var(--secondary-orange)'
  },
  {
    icon: FaClock,
    title: '24/7 Availability',
    description: 'Round-the-clock service, whenever you need it',
    color: 'var(--primary-orange)'
  },
  {
    icon: FaHeadset,
    title: 'Premium Support',
    description: 'Dedicated customer support team always ready to help',
    color: 'var(--secondary-orange)'
  },
  {
    icon: FaMoneyBillWave,
    title: 'Best Prices',
    description: 'Competitive rates with no hidden charges',
    color: 'var(--primary-orange)'
  },
  {
    icon: FaMapMarkedAlt,
    title: 'Wide Coverage',
    description: 'Serving 100+ cities across the country',
    color: 'var(--secondary-orange)'
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 px-4 md:px-8" style={{ backgroundColor: 'var(--white)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose{' '}
            <span style={{ color: 'var(--primary-orange)' }}>TezzRide</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Experience the difference with our premium features and benefits
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div key={index} className="group">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
                {/* Icon */}
                <div className="relative mb-6">
                  <div 
                    className="w-16 h-16 rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300"
                    style={{ 
                      backgroundColor: reason.color,
                      color: 'white'
                    }}
                  >
                    <reason.icon size={32} />
                  </div>
                  
                  {/* Glow Effect */}
                  <div 
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                    style={{ 
                      backgroundColor: reason.color,
                      filter: 'blur(12px)'
                    }}
                  />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--gray-800)' }}>
                  {reason.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {reason.description}
                </p>

                {/* Decorative Line */}
                <div className="mt-4 h-0.5 w-0 group-hover:w-full transition-all duration-300"
                  style={{ backgroundColor: reason.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}