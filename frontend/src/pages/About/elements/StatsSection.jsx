'use client';

import { useState, useEffect, useRef } from 'react';
import { FaCity, FaUsers, FaTruck, FaStar, FaArrowUp, FaAward, FaChartLine } from 'react-icons/fa';

const stats = [
  { 
    icon: FaCity, 
    value: '100+', 
    label: 'Cities Covered', 
    color: 'var(--primary-orange)',
    bgColor: 'rgba(255, 153, 28, 0.1)',
    suffix: '+',
    trend: '+25%'
  },
  { 
    icon: FaUsers, 
    value: '1M+', 
    label: 'Happy Users', 
    color: 'var(--secondary-orange)',
    bgColor: 'rgba(255, 92, 0, 0.1)',
    suffix: '+',
    trend: '+50%'
  },
  { 
    icon: FaTruck, 
    value: '500K+', 
    label: 'Deliveries', 
    color: 'var(--primary-orange)',
    bgColor: 'rgba(255, 153, 28, 0.1)',
    suffix: '+',
    trend: '+35%'
  },
  { 
    icon: FaStar, 
    value: '4.8', 
    label: 'App Rating', 
    color: 'var(--secondary-orange)',
    bgColor: 'rgba(255, 92, 0, 0.1)',
    suffix: '',
    trend: 'Top Rated'
  }
];

export default function StatsSection() {
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const intervals = stats.map((stat, index) => {
        const target = parseFloat(stat.value) || 4.8;
        const step = target > 100 ? Math.ceil(target / 50) : 0.1;
        
        return setInterval(() => {
          setCounts(prev => {
            const newCounts = [...prev];
            if (newCounts[index] < target) {
              newCounts[index] = Math.min(
                parseFloat((newCounts[index] + step).toFixed(1)), 
                target
              );
            }
            return newCounts;
          });
        }, 20);
      });

      return () => intervals.forEach(interval => clearInterval(interval));
    }
  }, [isVisible]);

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 px-4 md:px-8 overflow-hidden"
      style={{ backgroundColor: 'var(--gray-50)' }}
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full filter blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-orange-300 to-orange-500 rounded-full filter blur-3xl animate-pulse-slower" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, var(--gray-300) 1px, transparent 0)`,
        backgroundSize: '40px 40px',
        opacity: 0.1
      }} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 transform transition-all duration-700 translate-y-0 opacity-100">
          <div className="inline-flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-0.5 rounded-full" style={{ background: 'var(--primary-orange)' }} />
            <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--primary-orange)' }}>
              Our Impact
            </span>
            <div className="w-12 h-0.5 rounded-full" style={{ background: 'var(--primary-orange)' }} />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            TezzRide by the{' '}
            <span style={{ color: 'var(--primary-orange)' }}>Numbers</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Thousands of happy customers, millions of successful rides and deliveries
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Card Background with Gradient */}
              <div 
                className="absolute inset-0 rounded-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"
                style={{
                  background: `linear-gradient(135deg, ${stat.color}20, ${stat.bgColor})`,
                  filter: 'blur(8px)',
                }}
              />
              
              {/* Main Card */}
              <div 
                className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
                style={{
                  border: `1px solid ${stat.color}20`,
                }}
              >
                {/* Animated Border */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${stat.color}40, transparent)`,
                    animation: 'shimmer 2s infinite',
                  }}
                />

                {/* Icon Container */}
                <div className="relative mb-6">
                  <div 
                    className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500"
                    style={{ 
                      backgroundColor: stat.bgColor,
                      color: stat.color,
                      boxShadow: `0 10px 30px -10px ${stat.color}`
                    }}
                  >
                    <stat.icon size={36} />
                  </div>

                  {/* Floating Trend Indicator */}
                  <div 
                    className={`absolute -top-2 -right-2 bg-green-100 text-green-600 text-xs font-bold px-2 py-1 rounded-full flex items-center space-x-1 transition-all duration-500 ${
                      hoveredIndex === index ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
                    }`}
                  >
                    <FaArrowUp size={10} />
                    <span>{stat.trend}</span>
                  </div>
                </div>

                {/* Counter Value */}
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <span className="text-5xl font-bold" style={{ color: stat.color }}>
                      {stat.value.includes('.') ? counts[index].toFixed(1) : Math.floor(counts[index])}
                    </span>
                    {stat.suffix && (
                      <span className="text-3xl font-bold" style={{ color: stat.color }}>
                        {stat.suffix}
                      </span>
                    )}
                  </div>
                  
                  {/* Label with Animated Underline */}
                  <div className="relative inline-block mt-2">
                    <span className="text-gray-600 font-medium text-lg">
                      {stat.label}
                    </span>
                    <div 
                      className="absolute bottom-0 left-0 w-full h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                      style={{ backgroundColor: stat.color }}
                    />
                  </div>

                  {/* Mini Progress Bar */}
                  <div className="mt-4 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-1000"
                      style={{ 
                        width: `${(counts[index] / parseFloat(stat.value)) * 100}%`,
                        backgroundColor: stat.color,
                        opacity: 0.5
                      }}
                    />
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-20 h-20 opacity-5">
                  <FaChartLine size={80} style={{ color: stat.color }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Decoration */}
        <div className="mt-16 flex justify-center items-center space-x-4">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((item) => (
              <div 
                key={item}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 border-2 border-white flex items-center justify-center text-white text-xs font-bold"
              >
                {item}
              </div>
            ))}
          </div>
          <p className="text-gray-500 text-sm">
            <span className="font-semibold" style={{ color: 'var(--primary-orange)' }}>10,000+</span> businesses trust us
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        .animate-pulse-slower {
          animation: pulse-slow 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}