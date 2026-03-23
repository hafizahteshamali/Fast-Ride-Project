'use client';

import { FaCalendar, FaRocket, FaUsers, FaTruck, FaMobile, FaGlobe } from 'react-icons/fa';

const timeline = [
  { year: '2020', icon: FaRocket, title: 'The Beginning', desc: 'TezRide founded with a vision to transform urban mobility' },
  { year: '2021', icon: FaUsers, title: 'First Milestone', desc: 'Reached 100,000 users in first year of operation' },
  { year: '2022', icon: FaTruck, title: 'Delivery Launch', desc: 'Expanded services to include food and package delivery' },
  { year: '2023', icon: FaMobile, title: 'App Redesign', desc: 'Launched completely redesigned app with new features' },
  { year: '2024', icon: FaGlobe, title: 'National Expansion', desc: 'Now serving over 100 cities across the country' }
];

export default function TimelineSection() {
  return (
    <section className="py-20 px-4 md:px-8" style={{ backgroundColor: 'var(--gray-50)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our{' '}
            <span style={{ color: 'var(--primary-orange)' }}>Journey</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            The story of how we grew from an idea to a nationwide platform
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full"
            style={{ backgroundColor: 'var(--primary-orange)' }}
          />

          {/* Timeline Items */}
          <div className="space-y-12">
            {timeline.map((item, index) => (
              <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8`}>
                {/* Year Badge */}
                <div className="md:w-1/2 flex justify-center md:justify-end">
                  <div className="group">
                    <div className="w-24 h-24 rounded-full flex flex-col items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300"
                      style={{ backgroundColor: 'var(--primary-orange)', color: 'var(--white)' }}
                    >
                      <FaCalendar size={24} className="mb-1" />
                      <span className="text-sm font-bold">{item.year}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="md:w-1/2">
                  <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: 'var(--primary-orange)', color: 'var(--white)' }}
                      >
                        <item.icon size={20} />
                      </div>
                      <h3 className="text-xl font-bold" style={{ color: 'var(--gray-800)' }}>
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}