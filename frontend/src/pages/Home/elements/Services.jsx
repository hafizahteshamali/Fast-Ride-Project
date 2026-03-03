'use client';

import { useState, useEffect } from 'react';
import { 
  FaCar, 
  FaTruck, 
  FaWallet,
  FaClock,
  FaShieldAlt,
  FaStar,
  FaArrowRight,
  FaMapMarkerAlt,
  FaMotorcycle,
  FaRupeeSign,
  FaMobile,
  FaCreditCard
} from 'react-icons/fa';

export default function Services() {
  const [activeTab, setActiveTab] = useState('ride');
  const [isAnimating, setIsAnimating] = useState(false);

  // Service data with different images for each
  const services = {
    ride: {
      id: 'ride',
      title: 'Ride',
      description: 'Fast, safe, and affordable rides. Enjoy professional drivers and clean vehicles for your daily commute.',
      longDescription: 'Book a ride in seconds and reach your destination comfortably. Available 24/7 with real-time tracking.',
      icon: FaCar,
      color: '#FF991C',
      features: [
        'Professional drivers',
        'GPS tracking',
        '24/7 availability',
        'Clean vehicles',
        'Affordable rates'
      ],
      stats: [
        { label: 'Active Riders', value: '1000+' },
        { label: 'Cities', value: '50+' },
        { label: 'Avg. Rating', value: '4.8' }
      ],
      imageUrl: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      bgColor: 'from-[#FF991C] to-[#FF5C00]',
      benefits: [
        { icon: FaClock, text: 'Quick pickup within 5 mins' },
        { icon: FaShieldAlt, text: 'Safe rides guaranteed' },
        { icon: FaStar, text: 'Top-rated drivers' }
      ]
    },
    delivery: {
      id: 'delivery',
      title: 'Delivery',
      description: 'Get your packages delivered quickly and safely to your doorstep.',
      longDescription: 'Same-day delivery available. Track your orders in real-time and connect with delivery partners.',
      icon: FaTruck,
      color: '#FF5C00',
      features: [
        'Same-day delivery',
        'Real-time tracking',
        'Package insurance',
        'Flexible scheduling',
        'SMS notifications'
      ],
      stats: [
        { label: 'Deliveries/Day', value: '10K+' },
        { label: 'Delivery Partners', value: '500+' },
        { label: 'Success Rate', value: '99%' }
      ],
      imageUrl: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      bgColor: 'from-[#FF5C00] to-[#FF991C]',
      benefits: [
        { icon: FaClock, text: 'Delivery in 30 mins' },
        { icon: FaMapMarkerAlt, text: 'Live tracking' },
        { icon: FaMotorcycle, text: 'Dedicated riders' }
      ]
    },
    wallet: {
      id: 'wallet',
      title: 'Money',
      description: 'Send and receive money instantly with our secure digital wallet.',
      longDescription: 'Easy peer-to-peer transfers, bill payments, and financial services in one app.',
      icon: FaWallet,
      color: '#FF991C',
      features: [
        'Instant transfers',
        'Bill payments',
        'Bank integration',
        'Secure transactions',
        'Rewards program'
      ],
      stats: [
        { label: 'Transactions', value: '5M+' },
        { label: 'Users', value: '500K+' },
        { label: 'Processing', value: '24/7' }
      ],
      imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      bgColor: 'from-[#FF991C] to-[#FF5C00]',
      benefits: [
        { icon: FaCreditCard, text: 'Instant transfers' },
        { icon: FaShieldAlt, text: 'Bank-grade security' },
        { icon: FaMobile, text: 'Easy to use' }
      ]
    }
  };

  const currentService = services[activeTab];
  const Icon = currentService.icon;

  // Handle tab change with animation
  const handleTabChange = (tab) => {
    if (tab === activeTab) return;
    setIsAnimating(true);
    setActiveTab(tab);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <section id="services" className="relative py-16 md:py-24 overflow-hidden bg-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-72 h-72 bg-[#FF991C] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-[#FF5C00] rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FFF1E0] to-[#FFE4D4] px-4 py-2 rounded-full mb-4 border border-[#FF991C] border-opacity-30">
            <FaStar className="text-[#FF991C] animate-pulse" />
            <span className="text-[#FF991C] font-semibold text-sm uppercase tracking-wider">
              What We Offer
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-gray-900">Our </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF991C] to-[#FF5C00]">
              Services
            </span>
          </h2>
          
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Everything you need in one app. From rides to deliveries to payments.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {Object.entries(services).map(([key, service]) => {
            const ServiceIcon = service.icon;
            const isActive = activeTab === key;
            
            return (
              <button
                key={key}
                onClick={() => handleTabChange(key)}
                className={`
                  relative group px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold 
                  transition-all duration-300 transform hover:scale-105
                  flex items-center gap-2 overflow-hidden
                  ${isActive ? 'text-white shadow-xl' : 'text-gray-700 bg-gray-100 hover:bg-gray-200'}
                `}
                style={{
                  background: isActive ? `linear-gradient(135deg, ${service.color}, ${service.color === '#FF991C' ? '#FF5C00' : '#FF991C'})` : undefined
                }}
              >
                {!isActive && (
                  <ServiceIcon className="text-lg" style={{ color: service.color }} />
                )}
                <span>{service.title}</span>
                {isActive && (
                  <div className="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Service Content */}
        <div 
          className={`
            bg-gradient-to-br from-gray-50 to-white rounded-3xl p-6 md:p-8 lg:p-12 
            shadow-2xl border border-gray-100
            transform transition-all duration-500
            ${isAnimating ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}
          `}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              {/* Icon with Animation */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF991C] to-[#FF5C00] rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div 
                  className="relative w-20 h-20 rounded-2xl bg-gradient-to-r from-[#FF991C] to-[#FF5C00] 
                    flex items-center justify-center text-white transform group-hover:scale-110 
                    transition-all duration-300 group-hover:rotate-6"
                >
                  <Icon size={36} />
                </div>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {currentService.title}
                  <span className="block text-lg font-normal text-gray-600 mt-2">
                    {currentService.description}
                  </span>
                </h3>
                
                <p className="text-gray-600 text-lg mb-6">
                  {currentService.longDescription}
                </p>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {currentService.benefits.map((benefit, idx) => {
                  const BenefitIcon = benefit.icon;
                  return (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-md">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#FFF1E0] to-[#FFE4D4] flex items-center justify-center">
                        <BenefitIcon className="text-[#FF991C]" size={16} />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{benefit.text}</span>
                    </div>
                  );
                })}
              </div>

              {/* Features List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentService.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#FF991C] to-[#FF5C00]"></div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 p-6 bg-gradient-to-r from-[#FFF1E0] to-[#FFE4D4] rounded-2xl">
                {currentService.stats.map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button 
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-[#FF991C] to-[#FF5C00] 
                  text-white px-8 py-4 rounded-xl font-semibold text-lg 
                  shadow-xl hover:shadow-2xl transform hover:scale-105 
                  transition-all duration-300 overflow-hidden"
              >
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></span>
                <span>Get Started with {currentService.title}</span>
                <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>

            {/* Right Content - Image with Overlay */}
            <div className="relative group">
              {/* Image Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl transform group-hover:scale-105 transition-all duration-500">
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${currentService.bgColor} opacity-20 group-hover:opacity-30 transition-opacity`}></div>
                
                {/* Main Image */}
                <img 
                  src={currentService.imageUrl} 
                  alt={currentService.title}
                  className="w-full h-[400px] md:h-[500px] object-cover"
                />

                {/* Floating Stats Card */}
                <div className="absolute bottom-6 left-6 right-6 bg-white bg-opacity-95 backdrop-blur-lg rounded-xl p-4 transform translate-y-0 group-hover:-translate-y-2 transition-transform duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FF991C] to-[#FF5C00] flex items-center justify-center text-white">
                        <Icon size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{currentService.title} Service</p>
                        <p className="text-xs text-gray-500">Available 24/7</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-400" />
                      <span className="font-bold text-gray-900">4.8</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-600">Response Time</span>
                      <span className="font-bold text-gray-900">
                        {activeTab === 'ride' ? '< 3 mins' : activeTab === 'delivery' ? '< 30 mins' : 'Instant'}
                      </span>
                    </div>
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#FF991C] to-[#FF5C00] rounded-full"
                        style={{ width: activeTab === 'ride' ? '95%' : activeTab === 'delivery' ? '85%' : '100%' }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Badge */}
                <div className="absolute top-6 right-6 bg-white bg-opacity-95 backdrop-blur-lg rounded-full px-4 py-2 shadow-lg">
                  <span className="font-bold text-gray-900">Starting at </span>
                  <span className="text-xl font-bold text-[#FF991C]">
                    ₹{activeTab === 'ride' ? '49' : activeTab === 'delivery' ? '39' : '0'}
                  </span>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#FF991C] rounded-full opacity-20 blur-2xl animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-[#FF5C00] rounded-full opacity-20 blur-2xl animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600">
            Want to know more about our services?{' '}
            <button className="text-[#FF991C] font-semibold hover:text-[#FF5C00] transition-colors underline">
              View all services →
            </button>
          </p>
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