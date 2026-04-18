'use client';

import { FaApple, FaGoogle, FaUsers, FaStar, FaMotorcycle, FaArrowRight, FaClock } from 'react-icons/fa';

export default function CTA() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Main CTA Card */}
        <div
          className="rounded-3xl p-8 md:p-12 lg:p-16 text-center text-white overflow-hidden relative"
          style={{ background: 'linear-gradient(135deg, #FF991C, #FF5C00)' }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
              <circle cx="20" cy="20" r="15" stroke="white" strokeWidth="0.5" />
              <circle cx="80" cy="80" r="20" stroke="white" strokeWidth="0.5" />
              <circle cx="80" cy="20" r="12" stroke="white" strokeWidth="0.5" />
              <circle cx="20" cy="80" r="18" stroke="white" strokeWidth="0.5" />
            </svg>
          </div>

          {/* Content */}
          <div className="relative z-10">
            {/* Coming Soon Badge */}
            <div className="inline-flex items-center gap-2 bg-white bg-opacity-20 backdrop-blur-lg px-4 py-2 rounded-full mb-6">
              <FaClock className="animate-pulse" size={14} />
              <span className="text-sm font-semibold text-[var(--primary-orange)]">Launching 2026 in Karachi</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Experience TezRide?
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Be among the first to experience Pakistan's newest mobility platform. Join our waitlist and get early access to exclusive benefits!
            </p>

            {/* CTA Buttons - Changed to Waitlist */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button
                className="group relative px-8 py-4 rounded-xl bg-white text-[#FF5C00] font-semibold transition-all duration-300 hover:shadow-2xl hover:scale-105 flex items-center justify-center space-x-2 bg-opacity-20 backdrop-blur-lg border-2 border-white hover:bg-white hover:text-[#FF5C00] overflow-hidden"
              >
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <FaApple size={24} className="relative z-10" />
                <span className="relative z-10">Coming Soon on App Store</span>
              </button>
              <button
                className="group relative px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-2xl hover:scale-105 flex items-center justify-center space-x-2 bg-white text-[#FF5C00] bg-opacity-20 backdrop-blur-lg border-2 border-white hover:bg-white hover:text-[#FF5C00] overflow-hidden"
              >
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <FaGoogle size={24} className="relative z-10" />
                <span className="relative z-10">Coming Soon on Play Store</span>
              </button>
            </div>

            {/* Waitlist CTA */}
            <div className="mt-6">
              <button className="group relative inline-flex items-center gap-3 bg-white text-[#FF5C00] px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden">
                <span className="absolute inset-0 bg-gradient-to-r from-[#FF991C] to-[#FF5C00] opacity-0 group-hover:opacity-10 transition-opacity"></span>
                <FaUsers size={20} />
                <span>Join the Waitlist</span>
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Sub text */}
            <p className="text-sm opacity-80 mt-6">
              🚀 First 1,000 waitlist members get exclusive launch benefits!
            </p>
          </div>
        </div>

        {/* Trust Badges - Flex Layout */}
        <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center">
          <div className="flex-1 p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center">
            <div className="flex items-center justify-center mb-3">
              <FaUsers className="text-3xl text-[#FF991C]" />
            </div>
            <p className="text-3xl font-bold" style={{ color: 'var(--primary-orange)' }}>
              2,500+
            </p>
            <p className="text-gray-600 mt-1 text-sm">Waitlist Members</p>
            <p className="text-xs text-gray-400 mt-1">Growing daily</p>
          </div>
          
          <div className="flex-1 p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center">
            <div className="flex items-center justify-center mb-3">
              <FaStar className="text-3xl text-[#FF991C]" />
            </div>
            <p className="text-3xl font-bold" style={{ color: 'var(--primary-orange)' }}>
              4.9⭐
            </p>
            <p className="text-gray-600 mt-1 text-sm">Beta Rating</p>
            <p className="text-xs text-gray-400 mt-1">From 500+ reviews</p>
          </div>
          
          <div className="flex-1 p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center">
            <div className="flex items-center justify-center mb-3">
              <FaMotorcycle className="text-3xl text-[#FF991C]" />
            </div>
            <p className="text-3xl font-bold" style={{ color: 'var(--primary-orange)' }}>
              100+
            </p>
            <p className="text-gray-600 mt-1 text-sm">Partner Drivers</p>
            <p className="text-xs text-gray-400 mt-1">Onboarded in Karachi</p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-gray-500">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span>Launching first in Karachi, then expanding to Lahore, Islamabad, and more!</span>
          </div>
        </div>

        {/* Early Access Benefits */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center p-3">
            <p className="text-xs text-gray-500">🎁 Early bird discount</p>
          </div>
          <div className="text-center p-3">
            <p className="text-xs text-gray-500">🚀 Priority support</p>
          </div>
          <div className="text-center p-3">
            <p className="text-xs text-gray-500">⭐ Exclusive features</p>
          </div>
        </div>
      </div>
    </section>
  );
}