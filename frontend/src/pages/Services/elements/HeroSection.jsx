'use client';

import { 
  FaRocket, 
  FaShieldAlt, 
  FaClock, 
  FaArrowRight,
  FaPlay,
  FaStar,
  FaUsers,
  FaMapMarkerAlt,
  FaMobile,
  FaCheckCircle,
  FaAward,
  FaHeadset
} from 'react-icons/fa';
import { useState } from 'react';

export default function HeroSection() {
  const [hoverButton, setHoverButton] = useState(null);

  return (
    <section className="relative min-h-screen py-20 md:py-28 px-4 md:px-8 overflow-hidden">
      {/* Clean Background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(135deg, #fff8f0 0%, #fff 100%)',
        }}
      >
        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30L30 0Z' fill='%23FF991C' fill-opacity='0.1'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 min-h-[600px]">
          {/* Left Content */}
          <div className="flex-1 w-full lg:w-1/2 space-y-8">
            {/* Premium Badge */}
            <div className="inline-flex items-center space-x-2 bg-white shadow-lg px-6 py-3 rounded-full border border-orange-100">
              <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                <FaRocket className="text-white w-3 h-3" />
              </div>
              <span className="text-sm font-bold" style={{ color: 'var(--primary-orange)' }}>
                PREMIUM SERVICES
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-3">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="block" style={{ color: 'var(--gray-900)' }}>Premium</span>
                <span className="block relative">
                  <span style={{ color: 'var(--primary-orange)' }}>Services</span>
                  <span className="absolute -bottom-2 left-0 w-24 h-1 bg-orange-500 rounded-full"></span>
                </span>
                <span className="block" style={{ color: 'var(--gray-900)' }}>for Modern Living</span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-lg leading-relaxed max-w-lg">
              From quick rides to instant deliveries, we offer a comprehensive range of services 
              designed to make your life easier, faster, and more convenient.
            </p>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4 py-4">
              <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
                <p className="text-2xl font-bold text-orange-500">50k+</p>
                <p className="text-xs text-gray-500">Active Users</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
                <p className="text-2xl font-bold text-orange-500">4.9</p>
                <p className="text-xs text-gray-500">App Rating</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
                <p className="text-2xl font-bold text-orange-500">100+</p>
                <p className="text-xs text-gray-500">Cities</p>
              </div>
            </div>

            {/* Feature Tags */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center space-x-2 bg-white border border-gray-200 px-4 py-2.5 rounded-lg shadow-sm">
                <FaClock className="text-green-500 w-4 h-4" />
                <span className="text-sm font-medium text-gray-700">24/7 Availability</span>
              </div>
              <div className="flex items-center space-x-2 bg-white border border-gray-200 px-4 py-2.5 rounded-lg shadow-sm">
                <FaShieldAlt className="text-blue-500 w-4 h-4" />
                <span className="text-sm font-medium text-gray-700">Fully Insured</span>
              </div>
              <div className="flex items-center space-x-2 bg-white border border-gray-200 px-4 py-2.5 rounded-lg shadow-sm">
                <FaUsers className="text-purple-500 w-4 h-4" />
                <span className="text-sm font-medium text-gray-700">1M+ Users</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                className="group px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-xl flex items-center justify-center space-x-3 text-white"
                style={{ 
                  background: 'linear-gradient(145deg, var(--primary-orange), var(--secondary-orange))',
                  boxShadow: '0 10px 20px -5px rgba(255, 153, 28, 0.3)'
                }}
                onMouseEnter={() => setHoverButton('explore')}
                onMouseLeave={() => setHoverButton(null)}
              >
                <span>Explore Services</span>
                <FaArrowRight className={hoverButton === 'explore' ? 'translate-x-1' : ''} style={{ transition: 'transform 0.2s' }} />
              </button>
              
              <button 
                className="group px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-xl flex items-center justify-center space-x-3"
                style={{ 
                  backgroundColor: 'white',
                  color: 'var(--gray-900)',
                  border: '2px solid var(--gray-200)',
                  boxShadow: '0 10px 20px -5px rgba(0, 0, 0, 0.05)'
                }}
                onMouseEnter={() => setHoverButton('demo')}
                onMouseLeave={() => setHoverButton(null)}
              >
                <FaPlay className="w-4 h-4" />
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 pt-2 text-sm text-gray-500 border-t border-gray-200 pt-6">
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500 w-5 h-5" />
                <span>Secure payments</span>
              </div>
              <div className="flex items-center gap-2">
                <FaHeadset className="text-blue-500 w-5 h-5" />
                <span>24/7 support</span>
              </div>
              <div className="flex items-center gap-2">
                <FaAward className="text-yellow-500 w-5 h-5" />
                <span>ISO certified</span>
              </div>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="flex-1 w-full lg:w-1/2 flex justify-center">
            <div className="relative">
              {/* Background decorative elements */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-orange-100 rounded-full opacity-60"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-yellow-100 rounded-full opacity-60"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-orange-50 rounded-full"></div>
              
              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
                <img 
                  src="/assets/images/home/service-page-banner-img.png"
                  alt="Premium Services" 
                  className="w-full max-w-lg lg:max-w-xl object-cover h-auto"
                />
                
                {/* Image Overlay Badges */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1,2,3,4,5].map(star => (
                        <FaStar key={star} className="text-yellow-400 w-4 h-4" />
                      ))}
                    </div>
                    <span className="text-sm font-bold text-gray-800">4.9</span>
                  </div>
                </div>

                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-lg shadow-lg">
                  <div className="flex items-center gap-3">
                    <FaMobile className="text-orange-500 w-5 h-5" />
                    <span className="text-sm font-semibold text-gray-800">Download App</span>
                    <div className="flex gap-1">
                      <span className="text-xs bg-black text-white px-2 py-1 rounded">iOS</span>
                      <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">Android</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature Cards */}
              <div className="absolute -left-8 top-1/4 bg-white rounded-xl shadow-xl p-4 hidden lg:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <FaRocket className="text-green-600 w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Live Status</p>
                    <p className="text-sm font-bold text-gray-800">234 Active Rides</p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-8 bottom-1/3 bg-white rounded-xl shadow-xl p-4 hidden lg:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FaShieldAlt className="text-blue-600 w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Safety Rating</p>
                    <p className="text-sm font-bold text-gray-800">100% Secure</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}