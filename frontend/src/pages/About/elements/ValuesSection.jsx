'use client';

import { FaShieldAlt, FaBolt, FaHandsHelping, FaLeaf, FaUsers, FaRocket } from 'react-icons/fa';

const values = [
  { icon: FaShieldAlt, title: 'Safety First', desc: 'Your safety is our top priority with rigorous checks and 24/7 support' },
  { icon: FaBolt, title: 'Lightning Fast', desc: 'Quick rides and deliveries with our optimized route planning' },
  { icon: FaHandsHelping, title: 'Customer First', desc: 'We put our customers at the heart of everything we do' },
  { icon: FaLeaf, title: 'Eco-Friendly', desc: 'Committed to sustainable transportation solutions' },
  { icon: FaUsers, title: 'Community', desc: 'Building stronger communities through better mobility' },
  { icon: FaRocket, title: 'Innovation', desc: 'Constantly evolving to serve you better' }
];

export default function ValuesSection() {
  return (
    <section className="py-20 px-4 md:px-8" style={{ backgroundColor: 'var(--white)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our Core{' '}
            <span style={{ color: 'var(--primary-orange)' }}>Values</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            The principles that guide everything we do at TezzRide
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div key={index} className="group">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 h-full border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300"
                  style={{ backgroundColor: 'var(--primary-orange)', color: 'var(--white)' }}
                >
                  <value.icon size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--gray-800)' }}>
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.desc}
                </p>
                <div className="mt-4 h-0.5 w-0 group-hover:w-full transition-all duration-300"
                  style={{ backgroundColor: 'var(--primary-orange)' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}