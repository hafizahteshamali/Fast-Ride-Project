'use client';

import { 
  FaStar, 
  FaUsers, 
  FaMapMarkedAlt, 
  FaMobile,
  FaShieldAlt,
  FaClock,
  FaArrowRight,
  FaCheckCircle,
  FaCar,
  FaUserCheck,
  FaCreditCard
} from 'react-icons/fa';
import { useState } from 'react';

export default function FeaturedService() {
  const [hoverFeature, setHoverFeature] = useState(null);
  const [isHovering, setIsHovering] = useState(false);

  return (
    <section className="relative py-24 px-4 md:px-8 overflow-hidden" style={{ backgroundColor: 'var(--gray-50)' }}>
      {/* Decorative Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-orange-100 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-yellow-100 rounded-full opacity-30 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left Content - Enhanced Image Section */}
          <div className="flex-1 w-full lg:w-1/2">
            <div className="relative group" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
              {/* Background Decorations */}
              <div className="absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl rotate-12 opacity-20 group-hover:rotate-45 transition-all duration-500"></div>
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full opacity-20 group-hover:scale-110 transition-all duration-500"></div>
              
              {/* Main Image Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl transform group-hover:-translate-y-2 transition-all duration-500">
                {/* Image with Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 via-transparent to-blue-500/20 z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                  alt="Premium Ride Sharing Service" 
                  className="w-full max-w-lg mx-auto h-[400px] object-cover group-hover:scale-105 transition-all duration-700"
                />
                
                {/* Floating Badges */}
                <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-xl z-20 flex items-center gap-2 border-2 border-white">
                  <div className="flex">
                    {[1,2,3,4,5].map(star => (
                      <FaStar key={star} className="text-yellow-400 w-4 h-4" />
                    ))}
                  </div>
                  <span className="font-bold text-gray-800">4.9</span>
                  <span className="text-gray-500 text-sm">(2.5k+ reviews)</span>
                </div>

                <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-xl z-20 flex items-center gap-2 border-2 border-white">
                  <FaShieldAlt className="text-green-500 w-4 h-4" />
                  <span className="font-semibold text-gray-800">Safety First</span>
                </div>

                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-xl shadow-xl z-20 border-2 border-white">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <FaCar className="text-white w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Available Now</p>
                      <p className="font-bold text-gray-800">234 Nearby Cars</p>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-xl shadow-xl z-20 border-2 border-white">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                      <FaUserCheck className="text-white w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Verified Drivers</p>
                      <p className="font-bold text-gray-800">500+ Active</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Card - Enhanced */}
              <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl shadow-2xl p-5 min-w-[200px] border border-gray-100 transform group-hover:-translate-y-2 transition-all duration-500">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg">
                    <FaUsers className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gray-800">50k+</p>
                    <p className="text-sm text-gray-500">Happy Customers</p>
                    <div className="flex items-center gap-1 mt-1">
                      <FaCheckCircle className="text-green-500 w-3 h-3" />
                      <span className="text-xs text-green-600">Verified Reviews</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Enhanced */}
          <div className="flex-1 w-full lg:w-1/2 space-y-8">
            {/* Featured Badge */}
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-100 to-orange-50 px-5 py-2.5 rounded-full shadow-lg border border-orange-200">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <FaStar className="text-white w-4 h-4" />
              </div>
              <span className="font-bold" style={{ color: 'var(--primary-orange)' }}>
                ⚡ FEATURED SERVICE
              </span>
            </div>

            {/* Heading with Decoration */}
            <div className="space-y-4">
              <h2 className="text-5xl md:text-6xl font-bold leading-tight">
                <span className="block text-gray-900">Premium</span>
                <span className="relative inline-block">
                  <span style={{ color: 'var(--primary-orange)' }}>Ride Sharing</span>
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"></span>
                </span>
                <span className="block text-gray-900">Experience</span>
              </h2>
            </div>

            {/* Description with Icon */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <p className="text-gray-700 text-lg leading-relaxed">
                Our flagship ride-sharing service combines comfort, safety, and affordability. 
                With thousands of verified drivers and real-time tracking, we ensure you reach 
                your destination safely and on time.
              </p>
            </div>

            {/* Features Grid - Enhanced */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { 
                  icon: FaMapMarkedAlt, 
                  title: 'Real-time Tracking', 
                  desc: 'Live location updates',
                  color: 'orange',
                  features: ['GPS enabled', 'Share trip', 'ETA updates']
                },
                { 
                  icon: FaMobile, 
                  title: 'Easy Booking', 
                  desc: 'One-tap booking',
                  color: 'blue',
                  features: ['Quick booking', 'Saved addresses', 'Schedule rides']
                },
                { 
                  icon: FaShieldAlt, 
                  title: 'Safe Rides', 
                  desc: 'Verified drivers',
                  color: 'green',
                  features: ['Background check', 'Emergency button', 'Ride tracking']
                },
                { 
                  icon: FaCreditCard, 
                  title: 'Flexible Payment', 
                  desc: 'Multiple options',
                  color: 'purple',
                  features: ['Cards', 'Digital wallets', 'Cash']
                }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="group relative"
                  onMouseEnter={() => setHoverFeature(index)}
                  onMouseLeave={() => setHoverFeature(null)}
                >
                  <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-orange-200">
                    <div className={`w-12 h-12 rounded-lg bg-${feature.color}-100 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className={`text-${feature.color}-500 w-6 h-6`} />
                    </div>
                    <h4 className="font-bold text-gray-800 mb-1">{feature.title}</h4>
                    <p className="text-sm text-gray-500 mb-2">{feature.desc}</p>
                    
                    {/* Hover Features */}
                    <div className={`space-y-1 transition-all duration-300 ${hoverFeature === index ? 'opacity-100' : 'opacity-0 h-0'}`}>
                      {feature.features.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-1 text-xs text-gray-500">
                          <FaCheckCircle className="text-green-500 w-3 h-3" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button className="group relative px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-2xl flex items-center justify-center gap-3 text-white overflow-hidden"
                style={{ 
                  background: 'linear-gradient(145deg, var(--primary-orange), var(--secondary-orange))',
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <FaCar className="w-5 h-5" />
                  <span>Book a Ride Now</span>
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              
              <button className="group px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-xl flex items-center justify-center gap-3"
                style={{ 
                  backgroundColor: 'white',
                  color: 'var(--gray-900)',
                  border: '2px solid var(--gray-200)'
                }}
              >
                <FaClock className="w-5 h-5 text-gray-500" />
                <span>Schedule Later</span>
              </button>
            </div>

            {/* Quick Stats */}
            <div className="flex items-center gap-6 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">2 min pickup</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-sm text-gray-600">24/7 support</span>
              </div>
              <div className="flex items-center gap-2">
                <FaShieldAlt className="text-green-500 w-4 h-4" />
                <span className="text-sm text-gray-600">Safety assured</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}