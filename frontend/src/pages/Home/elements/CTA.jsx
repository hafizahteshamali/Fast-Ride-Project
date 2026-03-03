'use client';

import { FaApple, FaGoogle } from 'react-icons/fa';

export default function CTA() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Main CTA Card */}
        <div
          className="rounded-3xl p-12 md:p-16 text-center text-white overflow-hidden relative"
          style={{ backgroundColor: 'var(--primary-orange)' }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
              <circle cx="20" cy="20" r="15" stroke="white" strokeWidth="0.5" />
              <circle cx="80" cy="80" r="20" stroke="white" strokeWidth="0.5" />
              <circle cx="80" cy="20" r="12" stroke="white" strokeWidth="0.5" />
            </svg>
          </div>

          {/* Content */}
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Experience TezzRide?
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Join millions of Pakistanis who trust TezzRide for their daily rides, deliveries, and payments. Download the app today!
            </p>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button
                className="px-8 py-4 rounded-lg font-semibold transition hover:shadow-xl hover:scale-105 flex items-center justify-center space-x-2 text-white border-2 border-white hover:bg-white hover:text-orange-500"
              >
                <FaApple size={24} />
                <span>Download on App Store</span>
              </button>
              <button
                className="px-8 py-4 rounded-lg font-semibold transition hover:shadow-xl hover:scale-105 flex items-center justify-center space-x-2 text-white border-2 border-white hover:bg-white hover:text-orange-500"
              >
                <FaGoogle size={24} />
                <span>Get it on Play Store</span>
              </button>
            </div>

            {/* Sub text */}
            <p className="text-sm opacity-80">
              ⚡ Available in Karachi, Lahore, Islamabad, and more cities!
            </p>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-6 bg-gray-50 rounded-xl">
            <p className="text-3xl font-bold" style={{ color: 'var(--primary-orange)' }}>
              2M+
            </p>
            <p className="text-gray-600 mt-2">Active Users</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-xl">
            <p className="text-3xl font-bold" style={{ color: 'var(--primary-orange)' }}>
              4.9⭐
            </p>
            <p className="text-gray-600 mt-2">App Rating</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-xl">
            <p className="text-3xl font-bold" style={{ color: 'var(--primary-orange)' }}>
              50K+
            </p>
            <p className="text-gray-600 mt-2">Partner Drivers</p>
          </div>
        </div>
      </div>
    </section>
  );
}
