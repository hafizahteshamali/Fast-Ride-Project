'use client';

import { FaApple, FaGoogle } from 'react-icons/fa';

export default function Hero() {
  return (
    <section
      className="py-16 md:py-24 px-4 md:px-8"
      style={{
        background: `linear-gradient(135deg, var(--gray-50) 0%, var(--white) 100%)`,
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight" style={{ color: 'var(--gray-900)' }}>
                TezzRide is your everyday,
                <span style={{ color: 'var(--primary-orange)' }}> everything platform</span>
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed">
                From quick rides to fast deliveries, we have everything you need. Affordable, fast, and secure—all in one app.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                className="px-8 py-3 rounded-lg font-semibold transition hover:shadow-lg hover:scale-105 flex items-center justify-center space-x-2 text-white"
                style={{ backgroundColor: 'var(--primary-orange)' }}
              >
                <FaApple size={20} />
                <span>App Store</span>
              </button>
              <button
                className="px-8 py-3 rounded-lg font-semibold transition hover:shadow-lg hover:scale-105 flex items-center justify-center space-x-2"
                style={{ backgroundColor: 'var(--gray-100)', color: 'var(--gray-900)' }}
              >
                <FaGoogle size={20} />
                <span>Play Store</span>
              </button>
            </div>
          </div>

          {/* Right Image - Vehicle Illustration */}
          <div className="flex justify-center items-center relative">
            {/* Background Yellow Circle */}
            <div
              className="absolute w-72 h-72 rounded-full"
              style={{ backgroundColor: 'var(--green-400)', opacity: 0.2 }}
            ></div>
            
            {/* Vehicle Container */}
            <div className="relative z-10 flex flex-col items-center justify-center">
              {/* Simplified Vehicle Shape */}
              <svg
                width="280"
                height="220"
                viewBox="0 0 280 220"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-lg"
              >
                {/* Car Body */}
                <rect x="40" y="100" width="200" height="60" rx="10" fill="var(--primary-orange)" />
                
                {/* Car Top */}
                <path d="M 80 100 L 100 40 L 180 40 L 200 100" fill="var(--primary-orange)" />
                
                {/* Windows */}
                <rect x="105" y="60" width="45" height="35" rx="5" fill="var(--gray-100)" opacity="0.7" />
                <rect x="155" y="60" width="45" height="35" rx="5" fill="var(--gray-100)" opacity="0.7" />
                
                {/* Front Bumper */}
                <rect x="45" y="158" width="190" height="8" fill="var(--secondary-orange)" />
                
                {/* Wheels */}
                <circle cx="90" cy="170" r="18" fill="var(--gray-900)" />
                <circle cx="90" cy="170" r="12" fill="var(--gray-200)" />
                
                <circle cx="190" cy="170" r="18" fill="var(--gray-900)" />
                <circle cx="190" cy="170" r="12" fill="var(--gray-200)" />
              </svg>

              {/* Badge */}
              <div
                className="mt-6 px-6 py-2 rounded-full text-white font-bold text-center"
                style={{ backgroundColor: 'var(--secondary-orange)' }}
              >
                🚗 Fast & Safe Rides
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
