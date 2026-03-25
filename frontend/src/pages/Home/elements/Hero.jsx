'use client';

import { FaApple, FaGoogle, FaArrowRight, FaPlay, FaStar, FaShieldAlt, FaBolt } from 'react-icons/fa';
import { useState, useEffect } from 'react';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      className="relative py-16 md:py-24 px-4 md:px-8 overflow-hidden mt-20"
      style={{
        background: `linear-gradient(135deg, var(--gray-50) 0%, #fff5f0 100%)`,
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Content - Flex column with increased width on mobile */}
          <div className={`flex-1 w-full lg:w-1/2 space-y-8 transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            
            {/* Rating Badge */}
            <div className="flex items-start flex-col space-x-4">
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar key={star} className="text-yellow-400 w-5 h-5" />
                ))}
              </div>
              <span className="text-gray-600 font-medium">Join our early access community</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                <span className="block" style={{ color: 'var(--gray-900)' }}>TezRide is your</span>
                <span className="block" style={{ color: 'var(--gray-900)' }}>everyday,</span>
                <span className="relative inline-block">
                  <span style={{ color: 'var(--primary-orange)' }}>everything platform</span>
                  <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 300 12" fill="none">
                    <path d="M0 12L300 12" stroke="var(--primary-orange)" strokeWidth="4" strokeDasharray="8 8"/>
                  </svg>
                </span>
              </h1>
              
              <p className="text-gray-600 text-lg lg:text-xl leading-relaxed max-w-lg">
                From quick rides to fast deliveries, we have everything you need. 
                Affordable, fast, and secure—all in one app.
              </p>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <FaBolt className="text-yellow-500" />
                <span className="text-sm font-medium">Lightning Fast</span>
              </div>
              <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <FaShieldAlt className="text-green-500" />
                <span className="text-sm font-medium">100% Secure</span>
              </div>
              <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <FaStar className="text-yellow-500" />
                <span className="text-sm font-medium">24/7 Support</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                className="group relative px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-2xl hover:scale-105 flex items-center justify-center space-x-3 text-white overflow-hidden"
                style={{ backgroundColor: 'var(--primary-orange)' }}
              >
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                <FaApple size={24} />
                <span className="text-lg">Coming Soon</span>
                <FaArrowRight className="opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300" />
              </button>
              
              <button
                className="group relative px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-2xl hover:scale-105 flex items-center justify-center space-x-3 overflow-hidden"
                style={{ backgroundColor: 'var(--gray-100)', color: 'var(--gray-900)' }}
              >
                <span className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity duration-300"></span>
                <FaGoogle size={24} />
                <span className="text-lg">Coming Soon</span>
                <FaPlay size={16} className="opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300" />
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap sm:flex-row items-start sm:items-center space-x-4 lg:space-x-8 pt-4">
              <div className="flex flex-col">
                <span className="text-2xl font-bold" style={{ color: 'var(--primary-orange)' }}>Coming</span>
                <span className="text-sm text-gray-600">Soon</span>
              </div>
              <div className="w-px h-10 bg-gray-300"></div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold" style={{ color: 'var(--primary-orange)' }}>Be</span>
                <span className="text-sm text-gray-600">First</span>
              </div>
              <div className="w-px h-10 bg-gray-300"></div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold" style={{ color: 'var(--primary-orange)' }}>Launching</span>
                <span className="text-sm text-gray-600">Soon</span>
              </div>
            </div>
          </div>

          {/* Right Content - Image with animation */}
          <div className={`flex-1 w-full lg:w-1/2 flex justify-center transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <div className="relative w-full max-w-md lg:max-w-full">
              {/* Decorative elements */}
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-orange-100 rounded-full opacity-50"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-yellow-100 rounded-full opacity-50"></div>
              
              {/* Main image */}
              <img 
                src="/assets/images/home/banner-img.png" 
                alt="TezRide App Interface" 
                className="relative z-10 w-full h-auto object-contain transform hover:scale-105 transition-transform duration-500"
              />
              
              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 z-20 animate-bounce-slow">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <FaBolt className="text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Launching Soon</p>
                    <p className="text-xs text-gray-500">Get early access</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  );
}