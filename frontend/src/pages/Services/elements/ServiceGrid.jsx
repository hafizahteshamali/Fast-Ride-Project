'use client';

import { 
  FaCar, 
  FaMotorcycle, 
  FaTruck, 
  FaBicycle,
  FaWalking,
  FaBox,
  FaUtensils,
  FaShoppingBag,
  FaHome,
  FaMedkit,
  FaGraduationCap,
  FaPlane,
  FaArrowRight
} from 'react-icons/fa';

const services = [
  {
    icon: FaCar,
    title: 'Ride Sharing',
    description: 'Affordable and convenient rides anywhere in the city',
    color: 'var(--primary-orange)',
    features: ['24/7 availability', 'GPS tracking', 'Multiple options']
  },
  {
    icon: FaMotorcycle,
    title: 'Bike Taxi',
    description: 'Quick rides through traffic at budget-friendly prices',
    color: 'var(--secondary-orange)',
    features: ['Fast delivery', 'Eco-friendly', 'Low cost']
  },
  {
    icon: FaTruck,
    title: 'Parcel Delivery',
    description: 'Same-day delivery for packages and documents',
    color: 'var(--primary-orange)',
    features: ['Real-time tracking', 'Insured items', 'Express option']
  },
  {
    icon: FaUtensils,
    title: 'Food Delivery',
    description: 'Order from your favorite restaurants, delivered hot',
    color: 'var(--secondary-orange)',
    features: ['Live tracking', 'Contactless', 'Scheduled orders']
  },
  {
    icon: FaShoppingBag,
    title: 'Grocery Delivery',
    description: 'Fresh groceries delivered to your doorstep',
    color: 'var(--primary-orange)',
    features: ['Fresh items', 'Same-day', 'Weekly subscriptions']
  },
  {
    icon: FaMedkit,
    title: 'Medicine Delivery',
    description: 'Emergency medicine delivery in minutes',
    color: 'var(--secondary-orange)',
    features: ['24/7 service', 'Prescription check', 'Urgent delivery']
  },
  {
    icon: FaHome,
    title: 'Moving Services',
    description: 'Professional moving and shifting assistance',
    color: 'var(--primary-orange)',
    features: ['Packaging', 'Loading help', 'Insurance cover']
  },
  {
    icon: FaPlane,
    title: 'Airport Transfer',
    description: 'Reliable airport pickup and drop-off services',
    color: 'var(--secondary-orange)',
    features: ['Flight tracking', 'Meet & greet', 'Luggage help']
  }
];

export default function ServiceGrid() {
  return (
    <section className="py-20 px-4 md:px-8" style={{ backgroundColor: 'var(--white)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-12 h-0.5 rounded-full" style={{ background: 'var(--primary-orange)' }} />
            <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--primary-orange)' }}>
              What We Offer
            </span>
            <div className="w-12 h-0.5 rounded-full" style={{ background: 'var(--primary-orange)' }} />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Comprehensive{' '}
            <span style={{ color: 'var(--primary-orange)' }}>Services</span>
          </h2>
          
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            From daily commutes to special deliveries, we have a service for every need
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div key={index} className="group">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 h-full">
                {/* Icon Container */}
                <div className="relative mb-6">
                  <div 
                    className="w-16 h-16 rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300"
                    style={{ 
                      backgroundColor: service.color,
                      color: 'white'
                    }}
                  >
                    <service.icon size={32} />
                  </div>
                  
                  {/* Floating Badge */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    New
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--gray-800)' }}>
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-2 text-sm text-gray-500">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: service.color }} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Learn More Link */}
                <button 
                  className="flex items-center space-x-2 text-sm font-semibold group-hover:space-x-3 transition-all"
                  style={{ color: service.color }}
                >
                  <span>Learn More</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-12">
          <button className="px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-xl hover:scale-105 flex items-center space-x-2"
            style={{ 
              backgroundColor: 'transparent',
              color: 'var(--primary-orange)',
              border: `2px solid var(--primary-orange)`
            }}
          >
            <span>View All Services</span>
            <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
}