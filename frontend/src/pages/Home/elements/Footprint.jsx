'use client';

import { FaMapMarkerAlt, FaUsers, FaTruck, FaClock } from 'react-icons/fa';

export default function Footprint() {
  const cities = [
    { name: 'Karachi', users: 'Active', icon: '🏙️', status: 'live', description: 'Now serving Karachi' },
    { name: 'Lahore', users: 'Coming Soon', icon: '🏙️', status: 'upcoming', description: 'Launching next' },
    { name: 'Islamabad', users: 'Coming Soon', icon: '🏛️', status: 'upcoming', description: 'Coming this year' },
    { name: 'Rawalpindi', users: 'Coming Soon', icon: '🏙️', status: 'upcoming', description: 'In development' },
    { name: 'Multan', users: 'Coming Soon', icon: '🏙️', status: 'upcoming', description: 'Coming soon' },
  ];

  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FFF1E0] to-[#FFE4D4] px-4 py-2 rounded-full mb-4 border border-[#FF991C] border-opacity-30">
            <FaMapMarkerAlt className="text-[#FF991C] animate-pulse" />
            <span className="text-[#FF991C] font-semibold text-sm uppercase tracking-wider">
              Live in Karachi
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--gray-900)' }}>
            Our Footprint in Pakistan
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Starting our journey from Karachi, expanding to major cities across Pakistan
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left - Karachi Map */}
          <div className="relative">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
              {/* Map Header */}
              <div className="bg-gradient-to-r from-[#FF991C] to-[#FF5C00] px-6 py-3">
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-white" />
                  <span className="text-white font-semibold">Karachi, Pakistan</span>
                </div>
              </div>
              
              {/* Embedded Google Map */}
              <div className="relative h-96">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115758.845261436!2d67.00114975820312!3d24.860734000000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e066b42d2c7%3A0xac5b9e4b1a1f4b8a!2sKarachi%2C%20Karachi%20City%2C%20Sindh%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                  title="Karachi Map"
                ></iframe>
                
                {/* Map Overlay Badge */}
                <div className="absolute bottom-4 left-4 bg-white bg-opacity-95 backdrop-blur-md rounded-xl px-4 py-2 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-gray-900">Live Service Area</span>
                  </div>
                </div>
              </div>

              {/* Map Footer */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FaClock className="text-gray-400" />
                    <span className="text-sm text-gray-600">24/7 Service Available</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-[#FF991C] rounded-full opacity-20 blur-2xl animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-[#FF5C00] rounded-full opacity-20 blur-2xl animate-pulse delay-1000"></div>
          </div>

          {/* Right - Cities List */}
          <div>
            <div className="space-y-3 mb-8">
              {cities.map((city, index) => (
                <div
                  key={index}
                  className={`group relative flex items-center space-x-4 p-4 bg-white rounded-xl hover:shadow-lg transition-all duration-300 border-l-4 ${
                    city.status === 'live' 
                      ? 'border-l-[#FF991C] hover:scale-[1.02]' 
                      : 'border-l-gray-300 opacity-80 hover:opacity-100'
                  }`}
                  style={city.status === 'live' ? { borderLeftColor: 'var(--primary-orange)' } : {}}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white flex-shrink-0 ${
                      city.status === 'live' 
                        ? 'bg-gradient-to-r from-[#FF991C] to-[#FF5C00]' 
                        : 'bg-gray-400'
                    }`}
                  >
                    {city.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-lg" style={{ color: 'var(--gray-900)' }}>
                        {city.name}
                      </h3>
                      {city.status === 'live' && (
                        <span className="bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded-full font-semibold">
                          LIVE
                        </span>
                      )}
                      {city.status === 'upcoming' && (
                        <span className="bg-orange-100 text-orange-600 text-xs px-2 py-0.5 rounded-full font-semibold">
                          Upcoming
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">{city.description}</p>
                  </div>
                  <span 
                    className={`font-bold text-lg ${
                      city.status === 'live' 
                        ? 'text-[#FF991C]' 
                        : 'text-gray-400'
                    }`}
                    style={city.status === 'live' ? { color: 'var(--primary-orange)' } : {}}
                  >
                    {city.users}
                  </span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-gradient-to-br from-[#FF991C] to-[#FF5C00] rounded-xl p-4 text-white transform hover:scale-105 transition-all duration-300">
                <FaUsers size={24} className="mb-2" />
                <p className="text-2xl font-bold">100+</p>
                <p className="text-sm opacity-90">Active Users</p>
                <p className="text-xs opacity-75 mt-1">in Karachi</p>
              </div>
              <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl p-4 text-white">
                <FaTruck size={24} className="mb-2" />
                <p className="text-2xl font-bold">Coming</p>
                <p className="text-sm opacity-90">Soon</p>
                <p className="text-xs opacity-75 mt-1">More cities</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </section>
  );
}