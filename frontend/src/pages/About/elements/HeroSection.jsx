'use client';

import { FaUsers, FaRocket, FaShieldAlt } from 'react-icons/fa';

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
              <FaUsers className="mr-2" />
              About TezRide
            </span>
          </div>

          {/* Heading */}
          <h1 className={`text-4xl md:text-6xl font-bold leading-tight max-w-4xl transform transition-all duration-1000 delay-200 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            We're on a mission to{' '}
            <span style={{ color: 'var(--primary-orange)' }}>transform</span>{' '}
            the way you move
          </h1>

          {/* Description */}
          <p className={`text-lg md:text-xl text-gray-600 max-w-3xl leading-relaxed transform transition-all duration-1000 delay-400 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            Founded in 2020, TezRide has grown from a small startup to a leading mobility platform, 
            serving millions of customers across the country with innovative transportation solutions.
          </p>

          {/* Feature Cards */}
          <div className={`flex flex-col md:flex-row gap-6 pt-8 w-full max-w-4xl transform transition-all duration-1000 delay-600 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            {[
              { icon: FaRocket, title: 'Fast Growth', desc: 'Expanding to 100+ cities' },
              { icon: FaUsers, title: 'Happy Customers', desc: 'Over 1 million served' },
              { icon: FaShieldAlt, title: 'Safe & Secure', desc: 'Top-rated safety features' }
            ].map((item, index) => (
              <div key={index} className="flex-1 bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: 'var(--primary-orange)', color: 'var(--white)' }}
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