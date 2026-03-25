'use client';

import { FaAward, FaBriefcase, FaUsers, FaMotorcycle, FaStore, FaBuilding, FaClock, FaRupeeSign, FaHeadset, FaShieldAlt, FaArrowRight } from 'react-icons/fa';

export default function Partners() {
  const partnerTypes = [
    {
      title: 'Become a Driver',
      icon: <FaMotorcycle size={40} />,
      description: 'Join our growing community of earning partners and work on your own terms.',
      benefits: ['Flexible hours', 'Daily payouts', 'Training & support', 'Vehicle options'],
      cta: 'Apply Now',
      status: 'Open Registration',
      color: '#FF991C'
    },
    {
      title: 'Merchant Partner',
      icon: <FaStore size={40} />,
      description: 'Expand your business reach with TezRide\'s reliable delivery network.',
      benefits: ['Wide customer reach', 'Real-time tracking', 'Marketing support', 'Competitive rates'],
      cta: 'Partner With Us',
      status: 'Limited Slots',
      color: '#FF5C00'
    },
    {
      title: 'Corporate Solutions',
      icon: <FaBuilding size={40} />,
      description: 'Enterprise mobility and delivery solutions tailored for your business needs.',
      benefits: ['Custom pricing', 'Dedicated support', 'API integration', 'Priority service'],
      cta: 'Contact Sales',
      status: 'Coming Soon',
      color: '#FF991C'
    },
  ];

  return (
    <section className="py-16 md:py-24 px-4 md:px-8" style={{ backgroundColor: 'var(--gray-50)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FFF1E0] to-[#FFE4D4] px-4 py-2 rounded-full mb-4 border border-[#FF991C] border-opacity-30">
            <FaUsers className="text-[#FF991C] animate-pulse" />
            <span className="text-[#FF991C] font-semibold text-sm uppercase tracking-wider">
              Join Our Ecosystem
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--gray-900)' }}>
            Partnership Opportunities
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Be part of Pakistan's newest mobility platform. We're looking for passionate partners to grow with us.
          </p>
        </div>

        {/* Partner Types - Flex Layout */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 justify-center items-stretch">
          {partnerTypes.map((partner, index) => (
            <div
              key={index}
              className="flex-1 bg-white rounded-2xl p-6 md:p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 group"
              style={{ borderTopColor: partner.color }}
            >
              {/* Status Badge */}
              <div className="flex justify-end mb-2">
                <span 
                  className="text-xs px-3 py-1 rounded-full font-semibold"
                  style={{ 
                    backgroundColor: `${partner.color}10`,
                    color: partner.color
                  }}
                >
                  {partner.status}
                </span>
              </div>

              {/* Icon */}
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 transform group-hover:scale-110 transition-all duration-300"
                style={{ 
                  background: `linear-gradient(135deg, ${partner.color}, ${partner.color === '#FF991C' ? '#FF5C00' : '#FF991C'})`,
                  boxShadow: `0 10px 25px -5px ${partner.color}40`
                }}
              >
                {partner.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold mb-3" style={{ color: 'var(--gray-900)' }}>
                {partner.title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-600 mb-6 leading-relaxed">{partner.description}</p>

              {/* Benefits */}
              <ul className="space-y-2.5 mb-8">
                {partner.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-700 text-sm">
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: partner.color }}
                    ></span>
                    {benefit}
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                className="group/btn w-full px-6 py-3 rounded-xl font-semibold transition-all duration-300 text-white relative overflow-hidden"
                style={{ 
                  background: `linear-gradient(135deg, ${partner.color}, ${partner.color === '#FF991C' ? '#FF5C00' : '#FF991C'})`,
                  boxShadow: `0 4px 15px 0 ${partner.color}40`
                }}
              >
                <span className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300"></span>
                <span className="relative flex items-center justify-center gap-2">
                  {partner.cta}
                  <FaArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>
          ))}
        </div>

        {/* Why Partner With Us Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: 'var(--gray-900)' }}>
              Why Partner With TezRide?
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're building Pakistan's most partner-friendly platform with transparency and growth opportunities
            </p>
          </div>

          {/* Features Grid - Flex */}
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex-1 min-w-[200px] bg-white rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FF991C] to-[#FF5C00] flex items-center justify-center text-white mx-auto mb-4">
                <FaClock size={20} />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Flexible Hours</h4>
              <p className="text-sm text-gray-600">Work on your own schedule, no minimum hours</p>
            </div>

            <div className="flex-1 min-w-[200px] bg-white rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FF991C] to-[#FF5C00] flex items-center justify-center text-white mx-auto mb-4">
                <FaRupeeSign size={20} />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Daily Earnings</h4>
              <p className="text-sm text-gray-600">Get paid daily with transparent calculations</p>
            </div>

            <div className="flex-1 min-w-[200px] bg-white rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FF991C] to-[#FF5C00] flex items-center justify-center text-white mx-auto mb-4">
                <FaHeadset size={20} />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">24/7 Support</h4>
              <p className="text-sm text-gray-600">Dedicated partner support team always available</p>
            </div>

            <div className="flex-1 min-w-[200px] bg-white rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FF991C] to-[#FF5C00] flex items-center justify-center text-white mx-auto mb-4">
                <FaShieldAlt size={20} />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Safe & Secure</h4>
              <p className="text-sm text-gray-600">Insurance and safety protocols for all partners</p>
            </div>
          </div>
        </div>

        {/* Trust Section */}
        <div
          className="mt-16 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden"
          style={{ 
            background: 'linear-gradient(135deg, #FF991C, #FF5C00)',
          }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Start Your Journey With Us</h3>
            <p className="mb-8 text-lg opacity-95 max-w-2xl mx-auto">
              We're currently onboarding our first partners in Karachi. Be among the first to join Pakistan's newest mobility platform.
            </p>
            
            {/* Stats - Flex Layout */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-12 text-white">
              <div className="text-center min-w-[120px]">
                <p className="text-3xl md:text-4xl font-bold">Opening</p>
                <p className="text-sm opacity-90">Partner Slots</p>
              </div>
              <div className="text-center min-w-[120px]">
                <p className="text-3xl md:text-4xl font-bold">24/7</p>
                <p className="text-sm opacity-90">Support</p>
              </div>
              <div className="text-center min-w-[120px]">
                <p className="text-3xl md:text-4xl font-bold">100%</p>
                <p className="text-sm opacity-90">Transparent</p>
              </div>
              <div className="text-center min-w-[120px]">
                <p className="text-3xl md:text-4xl font-bold">Karachi</p>
                <p className="text-sm opacity-90">Launch City</p>
              </div>
            </div>

            {/* CTA Button */}
            <button className="mt-8 bg-white text-[#FF5C00] px-8 py-3 rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-2 group">
              <span>Register Your Interest</span>
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}