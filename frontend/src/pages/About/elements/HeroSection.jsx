'use client';

import { FaUsers, FaRocket, FaShieldAlt, FaStar, FaMotorcycle, FaCity } from 'react-icons/fa';

export default function HeroSection({ isVisible }) {
  return (
    <section className="relative py-20 md:py-32 px-4 md:px-8 overflow-hidden">
      {/* Background with gradient */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: `linear-gradient(135deg, var(--gray-50) 0%, #fff5f0 100%)`,
        }}
      >
        {/* Animated circles */}
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"
          style={{ backgroundColor: 'var(--primary-orange)' }}
        />
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float animation-delay-2000"
          style={{ backgroundColor: 'var(--secondary-orange)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Badge */}
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium"
              style={{ backgroundColor: 'var(--primary-orange)', color: 'var(--white)' }}
            >
              <FaRocket className="mr-2" />
              Launching 2026 in Karachi
            </span>
          </div>

          {/* Heading */}
          <h1 className={`text-4xl md:text-6xl font-bold leading-tight max-w-4xl transform transition-all duration-1000 delay-200 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            We're on a mission to{' '}
            <span style={{ color: 'var(--primary-orange)' }}>transform</span>{' '}
            the way Pakistan moves
          </h1>

          {/* Description */}
          <p className={`text-lg md:text-xl text-gray-600 max-w-3xl leading-relaxed transform transition-all duration-1000 delay-400 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            Founded in 2026, TezRide is Pakistan's newest mobility platform, starting from Karachi. 
            We're building a safer, more affordable, and reliable transportation network for everyone.
          </p>

          {/* Feature Cards - Flex Layout */}
          <div className={`flex flex-col md:flex-row gap-6 pt-8 w-full max-w-4xl transform transition-all duration-1000 delay-600 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            {[
              { icon: FaCity, title: 'Starting Strong', desc: 'Launching in Karachi first', color: '#FF991C' },
              { icon: FaUsers, title: 'Growing Community', desc: '2,500+ waitlist members', color: '#FF5C00' },
              { icon: FaShieldAlt, title: 'Safe & Secure', desc: 'Built with safety first', color: '#FF991C' }
            ].map((item, index) => (
              <div key={index} className="flex-1 bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                  style={{ 
                    background: `linear-gradient(135deg, ${item.color}, ${item.color === '#FF991C' ? '#FF5C00' : '#FF991C'})`,
                    color: 'var(--white)'
                  }}
                >
                  <item.icon size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--gray-800)' }}>
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Stats Section - Flex Layout */}
          <div className={`flex flex-wrap justify-center gap-6 pt-12 w-full transform transition-all duration-1000 delay-800 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="flex-1 min-w-[150px] text-center p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-md">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FF991C] to-[#FF5C00] flex items-center justify-center mx-auto mb-3">
                <FaUsers className="text-white" size={16} />
              </div>
              <p className="text-2xl font-bold" style={{ color: 'var(--primary-orange)' }}>2,500+</p>
              <p className="text-sm text-gray-600 mt-1">Waitlist Members</p>
              <p className="text-xs text-gray-400">and growing</p>
            </div>

            <div className="flex-1 min-w-[150px] text-center p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-md">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FF991C] to-[#FF5C00] flex items-center justify-center mx-auto mb-3">
                <FaMotorcycle className="text-white" size={16} />
              </div>
              <p className="text-2xl font-bold" style={{ color: 'var(--primary-orange)' }}>100+</p>
              <p className="text-sm text-gray-600 mt-1">Partner Drivers</p>
              <p className="text-xs text-gray-400">onboarded</p>
            </div>

            <div className="flex-1 min-w-[150px] text-center p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-md">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FF991C] to-[#FF5C00] flex items-center justify-center mx-auto mb-3">
                <FaStar className="text-white" size={16} />
              </div>
              <p className="text-2xl font-bold" style={{ color: 'var(--primary-orange)' }}>4.9</p>
              <p className="text-sm text-gray-600 mt-1">Beta Rating</p>
              <p className="text-xs text-gray-400">from 500+ reviews</p>
            </div>
          </div>

          {/* CTA Button */}
          <div className={`pt-8 transform transition-all duration-1000 delay-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <button className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-[#FF991C] to-[#FF5C00] text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden">
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></span>
              <FaRocket size={20} />
              <span>Join the Waitlist</span>
            </button>
            <p className="text-sm text-gray-500 mt-3">
              Be among the first to experience TezRide in Karachi
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -20px) scale(1.1); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
}