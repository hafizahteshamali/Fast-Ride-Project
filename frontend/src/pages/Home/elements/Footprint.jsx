'use client';

import { FaMapMarkerAlt, FaUsers, FaTruck } from 'react-icons/fa';

export default function Footprint() {
  const cities = [
    { name: 'Karachi', users: '500K+', icon: '🏙️' },
    { name: 'Lahore', users: '300K+', icon: '🏙️' },
    { name: 'Islamabad', users: '150K+', icon: '🏛️' },
    { name: 'Rawalpindi', users: '100K+', icon: '🏙️' },
    { name: 'Multan', users: '80K+', icon: '🏙️' },
  ];

  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--gray-900)' }}>
            Our Foot Print in Pakistan
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Growing rapidly across Pakistan's major cities with millions of satisfied users
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left - Map Placeholder */}
          <div
            className="h-96 rounded-3xl flex items-center justify-center text-white text-center relative overflow-hidden shadow-lg"
            style={{ backgroundColor: 'var(--green-400)' }}
          >
            {/* Animated Background */}
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
                <circle cx="30" cy="40" r="20" stroke="white" strokeWidth="0.5" />
                <circle cx="70" cy="60" r="15" stroke="white" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="25" stroke="white" strokeWidth="0.5" />
              </svg>
            </div>

            <div className="relative z-10">
              <FaMapMarkerAlt size={60} className="mx-auto mb-4 text-white drop-shadow-lg" />
              <p className="text-2xl font-bold drop-shadow-lg">Pakistan's Fastest Growing</p>
              <p className="text-sm mt-2 drop-shadow-lg">Mobility Platform</p>
            </div>
          </div>

          {/* Right - Cities List */}
          <div>
            <div className="space-y-3 mb-8">
              {cities.map((city, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-4 bg-white rounded-xl hover:shadow-lg transition duration-300 border-l-4"
                  style={{ borderLeftColor: 'var(--primary-orange)' }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white flex-shrink-0"
                    style={{ backgroundColor: 'var(--primary-orange)' }}
                  >
                    {city.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg" style={{ color: 'var(--gray-900)' }}>
                      {city.name}
                    </h3>
                    <p className="text-xs text-gray-500">Active Users</p>
                  </div>
                  <span className="text-primary-orange font-bold text-lg" style={{ color: 'var(--primary-orange)' }}>{city.users}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-4 text-white">
                <FaUsers size={24} className="mb-2" />
                <p className="text-2xl font-bold">2M+</p>
                <p className="text-sm opacity-90">Active Users</p>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white">
                <FaTruck size={24} className="mb-2" />
                <p className="text-2xl font-bold">15M+</p>
                <p className="text-sm opacity-90">Rides Completed</p>
              </div>
            </div>

            <p className="text-gray-600 text-sm mt-6">
              We are committed to bringing affordable and safe mobility to every corner of Pakistan. More cities coming soon! ✨
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
