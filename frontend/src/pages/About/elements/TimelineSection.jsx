'use client';

import { FaCalendar, FaRocket, FaUsers, FaTruck, FaMobile, FaGlobe, FaCity, FaChartLine, FaHandshake, FaStar } from 'react-icons/fa';

const timeline = [
  { 
    year: '2026', 
    icon: FaRocket, 
    title: 'The Beginning', 
    desc: 'TezRide founded in Karachi with a vision to transform urban mobility in Pakistan',
    status: 'Current',
    highlight: 'Launching in Karachi'
  },
  { 
    year: '2026', 
    icon: FaUsers, 
    title: 'First Milestone', 
    desc: 'Target: 2,500+ waitlist members and 100+ partner drivers onboarded',
    status: 'Upcoming',
    highlight: 'Q3 2026 Target'
  },
  { 
    year: '2027', 
    icon: FaTruck, 
    title: 'Delivery Services', 
    desc: 'Expand services to include food and package delivery across Karachi',
    status: 'Planned',
    highlight: 'Q1 2027'
  },
  { 
    year: '2027', 
    icon: FaCity, 
    title: 'City Expansion', 
    desc: 'Launch operations in Lahore and Islamabad, reaching 1M+ users',
    status: 'Planned',
    highlight: 'Q3 2027'
  },
  { 
    year: '2028', 
    icon: FaGlobe, 
    title: 'Nationwide Growth', 
    desc: 'Serve over 10 major cities across Pakistan with 50,000+ daily rides',
    status: 'Planned',
    highlight: 'Target: 2028'
  }
];

export default function TimelineSection() {
  return (
    <section className="py-20 px-4 md:px-8" style={{ backgroundColor: 'var(--gray-50)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FFF1E0] to-[#FFE4D4] px-4 py-2 rounded-full mb-4 border border-[#FF991C] border-opacity-30">
            <FaRocket className="text-[#FF991C] animate-pulse" />
            <span className="text-[#FF991C] font-semibold text-sm uppercase tracking-wider">
              Our Roadmap 2026-2028
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our{' '}
            <span style={{ color: 'var(--primary-orange)' }}>Journey</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            From an idea to Pakistan's most anticipated mobility platform
          </p>
        </div>

        {/* Timeline - Flex Layout */}
        <div className="relative">
          {/* Center Line - Hidden on mobile, visible on md and up */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full"
            style={{ backgroundColor: 'var(--primary-orange)' }}
          />

          {/* Timeline Items */}
          <div className="flex flex-col space-y-12">
            {timeline.map((item, index) => (
              <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8`}>
                {/* Year Badge */}
                <div className="md:w-1/2 flex justify-center md:justify-end">
                  <div className="group relative">
                    <div className="w-24 h-24 rounded-full flex flex-col items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-300 relative overflow-hidden"
                      style={{ 
                        background: `linear-gradient(135deg, #FF991C, #FF5C00)`,
                        color: 'var(--white)'
                      }}
                    >
                      {/* Animated Pulse Effect */}
                      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                      <FaCalendar size={24} className="mb-1" />
                      <span className="text-sm font-bold">{item.year}</span>
                    </div>
                    
                    {/* Status Badge */}
                    <div className="absolute -top-2 -right-2">
                      <span className={`text-xs px-2 py-1 rounded-full font-semibold whitespace-nowrap ${
                        item.status === 'Current' 
                          ? 'bg-green-100 text-green-600' 
                          : item.status === 'Upcoming'
                          ? 'bg-orange-100 text-orange-600'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="md:w-1/2">
                  <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                        style={{ 
                          background: `linear-gradient(135deg, #FF991C, #FF5C00)`,
                          color: 'var(--white)'
                        }}
                      >
                        <item.icon size={20} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold" style={{ color: 'var(--gray-800)' }}>
                          {item.title}
                        </h3>
                        {item.highlight && (
                          <p className="text-xs font-semibold" style={{ color: 'var(--primary-orange)' }}>
                            {item.highlight}
                          </p>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                    
                    {/* Progress Indicator for Current Year */}
                    {item.status === 'Current' && (
                      <div className="mt-4">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-500">Launch Progress</span>
                          <span className="text-[#FF991C] font-semibold">75%</span>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-[#FF991C] to-[#FF5C00] rounded-full transition-all duration-1000"
                            style={{ width: '75%' }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#FFF1E0] to-[#FFE4D4] px-6 py-3 rounded-full mb-4">
            <FaStar className="text-[#FF991C]" />
            <span className="text-gray-700">Join us on this exciting journey</span>
          </div>
          <div>
            <button className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-[#FF991C] to-[#FF5C00] text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden">
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></span>
              <FaUsers size={20} />
              <span>Be Part of Our Story</span>
            </button>
            <p className="text-gray-500 text-sm mt-3">
              Join the waitlist and be among the first to experience TezRide
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}