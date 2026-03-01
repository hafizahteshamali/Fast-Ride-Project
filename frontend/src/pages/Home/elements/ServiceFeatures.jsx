// components/home/ServicesSection.jsx
import React, { useState } from 'react'
import { 
  FaMotorcycle, 
  FaClock, 
  FaShoppingBag, 
  FaTruck, 
  FaBoxOpen, 
  FaGift,
  FaArrowRight,
  FaStar,
  FaShieldAlt,
  FaBolt,
  FaCity,
  FaWeightHanging,
  FaRupeeSign,
  FaInfoCircle,
  FaTimes,
  FaCheckCircle
} from 'react-icons/fa'

const services = [
  {
    icon: FaMotorcycle,
    title: "Bike Delivery",
    description: "Fast delivery for small packages within city",
    price: "49",
    originalPrice: "99",
    discount: "50% off",
    features: [
      "Up to 5 kg weight",
      "Same city delivery",
      "Real-time tracking",
      "Live rider location",
      "SMS notifications"
    ],
    estimatedTime: "20-30 min",
    popularity: 95,
    color: "indigo",
    badge: "Popular"
  },
  {
    icon: FaClock,
    title: "Express Delivery",
    description: "Urgent delivery within 30 minutes",
    price: "99",
    originalPrice: "199",
    discount: "50% off",
    features: [
      "Up to 8 kg weight",
      "30 min guaranteed",
      "Priority support",
      "Insurance included",
      "Express tracking"
    ],
    estimatedTime: "15-25 min",
    popularity: 98,
    color: "violet",
    badge: "Fastest"
  },
  {
    icon: FaShoppingBag,
    title: "Package Delivery",
    description: "Shop to door delivery service",
    price: "79",
    originalPrice: "149",
    discount: "47% off",
    features: [
      "Up to 10 kg weight",
      "Shop pickup",
      "Package handling",
      "Delivery confirmation",
      "Photo proof"
    ],
    estimatedTime: "25-35 min",
    popularity: 92,
    color: "indigo",
    badge: "Most Used"
  },
  {
    icon: FaTruck,
    title: "Freight Service",
    description: "Heavy items and bulk delivery",
    price: "299",
    originalPrice: "499",
    discount: "40% off",
    features: [
      "Up to 100 kg weight",
      "Bulk items",
      "2 riders assigned",
      "Special handling",
      "Loading assistance"
    ],
    estimatedTime: "45-60 min",
    popularity: 88,
    color: "violet",
    badge: "Heavy Duty"
  },
  {
    icon: FaBoxOpen,
    title: "Document Delivery",
    description: "Secure and fast document courier",
    price: "39",
    originalPrice: "79",
    discount: "51% off",
    features: [
      "Up to 1 kg weight",
      "Document handling",
      "Secure packaging",
      "Delivery receipt",
      "Confidential"
    ],
    estimatedTime: "15-20 min",
    popularity: 96,
    color: "indigo",
    badge: "Best Value"
  },
  {
    icon: FaGift,
    title: "Gift Delivery",
    description: "Special occasion gift delivery",
    price: "59",
    originalPrice: "119",
    discount: "50% off",
    features: [
      "Up to 3 kg weight",
      "Gift wrapping",
      "Special handling",
      "Message card",
      "Delivery timing"
    ],
    estimatedTime: "25-40 min",
    popularity: 94,
    color: "violet",
    badge: "Special"
  }
]

const ServicesSection = () => {
  const [selectedService, setSelectedService] = useState(null)
  const [hoveredService, setHoveredService] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const handleBookNow = (service) => {
    setSelectedService(service)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedService(null)
  }

  return (
    <section className="py-20 bg-[var(--white)] relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 bg-[var(--indigo-600)] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-[var(--violet-600)] rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header with Enhanced Design */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[var(--indigo-50)] px-4 py-2 rounded-full mb-4">
            <FaBolt className="text-[var(--indigo-600)] animate-pulse" />
            <span className="text-[var(--indigo-600)] font-semibold text-sm uppercase tracking-wider">
              Premium Services
            </span>
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-bold text-[var(--gray-900)] mt-2 mb-4">
            What We Offer
          </h2>
          
          <p className="text-[var(--gray-600)] max-w-2xl mx-auto text-lg">
            Choose from our range of delivery services tailored to your needs
          </p>

          {/* Stats Bar */}
          <div className="flex flex-wrap justify-center gap-8 mt-8 p-6 bg-gradient-to-r from-[var(--indigo-50)] to-[var(--violet-50)] rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--white)] flex items-center justify-center">
                <FaMotorcycle className="text-[var(--indigo-600)]" />
              </div>
              <div className="text-left">
                <div className="text-xl font-bold text-[var(--gray-900)]">6 Services</div>
                <div className="text-sm text-[var(--gray-600)]">Available now</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--white)] flex items-center justify-center">
                <FaShieldAlt className="text-[var(--violet-600)]" />
              </div>
              <div className="text-left">
                <div className="text-xl font-bold text-[var(--gray-900)]">100% Safe</div>
                <div className="text-sm text-[var(--gray-600)]">Insured delivery</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--white)] flex items-center justify-center">
                <FaCity className="text-[var(--indigo-600)]" />
              </div>
              <div className="text-left">
                <div className="text-xl font-bold text-[var(--gray-900)]">50+ Cities</div>
                <div className="text-sm text-[var(--gray-600)]">Service coverage</div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Grid - Enhanced Cards */}
        <div className="flex flex-wrap gap-6 justify-center">
          {services.map((service, index) => {
            const Icon = service.icon
            const isIndigo = service.color === 'indigo'
            const isHovered = hoveredService === index
            
            return (
              <div 
                key={index}
                className="group relative flex-1 min-w-[300px] max-w-[380px]"
                onMouseEnter={() => setHoveredService(index)}
                onMouseLeave={() => setHoveredService(null)}
              >
                {/* Card */}
                <div className={`
                  relative bg-[var(--white)] rounded-2xl p-6 
                  border-2 transition-all duration-500
                  ${isHovered 
                    ? isIndigo 
                      ? 'border-[var(--indigo-600)] shadow-2xl scale-105' 
                      : 'border-[var(--violet-600)] shadow-2xl scale-105'
                    : 'border-[var(--gray-200)] shadow-lg'
                  }
                `}>
                  {/* Badge */}
                  <div className={`
                    absolute -top-3 -right-3 px-3 py-1 rounded-full text-xs font-bold text-[var(--white)]
                    ${isIndigo ? 'bg-[var(--indigo-600)]' : 'bg-[var(--violet-600)]'}
                    shadow-lg z-10
                  `}>
                    {service.badge}
                  </div>

                  {/* Popularity Indicator */}
                  <div className="absolute top-3 left-3 flex items-center gap-1">
                    <FaStar className="text-yellow-400 text-xs" />
                    <span className="text-xs text-[var(--gray-600)]">{service.popularity}%</span>
                  </div>

                  {/* Icon with Animation */}
                  <div className={`
                    relative w-20 h-20 rounded-2xl mx-auto mb-4
                    flex items-center justify-center
                    transition-all duration-500
                    ${isHovered ? 'rotate-12 scale-110' : ''}
                    ${isIndigo 
                      ? 'bg-gradient-to-br from-[var(--indigo-50)] to-[var(--indigo-100)]' 
                      : 'bg-gradient-to-br from-[var(--violet-50)] to-[var(--violet-100)]'
                    }
                  `}>
                    <Icon 
                      size={40} 
                      className={isIndigo ? 'text-[var(--indigo-600)]' : 'text-[var(--violet-600)]'}
                    />
                    
                    {/* Animated Rings */}
                    <div className={`
                      absolute inset-0 rounded-2xl
                      ${isIndigo ? 'ring-2 ring-[var(--indigo-600)]' : 'ring-2 ring-[var(--violet-600)]'}
                      opacity-0 group-hover:opacity-100 transition-all duration-500
                      animate-ping
                    `}></div>
                  </div>

                  {/* Title & Description */}
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-[var(--gray-900)] mb-2">
                      {service.title}
                    </h3>
                    <p className="text-[var(--gray-600)] text-sm">
                      {service.description}
                    </p>
                  </div>

                  {/* Price Section */}
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <span className="text-3xl font-bold text-[var(--gray-900)]">
                      ₹{service.price}
                    </span>
                    <span className="text-sm text-[var(--gray-500)] line-through">
                      ₹{service.originalPrice}
                    </span>
                    <span className={`
                      text-xs px-2 py-1 rounded-full font-semibold
                      ${isIndigo 
                        ? 'bg-[var(--indigo-100)] text-[var(--indigo-700)]' 
                        : 'bg-[var(--violet-100)] text-[var(--violet-700)]'
                      }
                    `}>
                      {service.discount}
                    </span>
                  </div>

                  {/* Features */}
                  <div className="space-y-2 mb-4">
                    {service.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <FaCheckCircle className={isIndigo ? 'text-[var(--indigo-600)]' : 'text-[var(--violet-600)]'} size={14} />
                        <span className="text-[var(--gray-600)]">{feature}</span>
                      </div>
                    ))}
                    {service.features.length > 3 && (
                      <div className="text-xs text-[var(--gray-500)] ml-6">
                        +{service.features.length - 3} more features
                      </div>
                    )}
                  </div>

                  {/* Time & Weight Info */}
                  <div className="flex items-center justify-between text-xs text-[var(--gray-500)] mb-4 p-2 bg-[var(--gray-50)] rounded-lg">
                    <div className="flex items-center gap-1">
                      <FaClock />
                      <span>{service.estimatedTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaWeightHanging />
                      <span>Up to {service.features[0].split(' ')[2]} kg</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleBookNow(service)}
                      className={`
                        flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold
                        transition-all duration-300 transform hover:scale-105
                        ${isIndigo 
                          ? 'bg-gradient-to-r from-[var(--indigo-600)] to-[var(--indigo-700)] hover:from-[var(--indigo-700)] hover:to-[var(--indigo-800)]' 
                          : 'bg-gradient-to-r from-[var(--violet-600)] to-[var(--violet-700)] hover:from-[var(--violet-700)] hover:to-[var(--violet-800)]'
                        }
                        text-[var(--white)] shadow-lg hover:shadow-xl
                      `}
                    >
                      <span>Book Now</span>
                      <FaArrowRight size={14} />
                    </button>
                    
                    <button className="w-12 h-12 rounded-xl bg-[var(--gray-100)] hover:bg-[var(--gray-200)] flex items-center justify-center text-[var(--gray-600)] transition-all">
                      <FaInfoCircle />
                    </button>
                  </div>

                  {/* Progress Bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--gray-200)] rounded-b-2xl overflow-hidden">
                    <div 
                      className={`
                        h-full transition-all duration-500
                        ${isIndigo ? 'bg-[var(--indigo-600)]' : 'bg-[var(--violet-600)]'}
                      `}
                      style={{ width: isHovered ? '100%' : '70%' }}
                    ></div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* View All Services Button */}
        <div className="text-center mt-12">
          <button className="group inline-flex items-center gap-3 bg-[var(--white)] hover:bg-[var(--gray-50)] text-[var(--gray-700)] px-8 py-4 rounded-xl font-semibold text-lg shadow-md hover:shadow-lg border-2 border-[var(--gray-200)] hover:border-[var(--indigo-600)] transition-all">
            <span>View All Services</span>
            <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>

      {/* Booking Modal */}
      {showModal && selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--black-opacity-50)]">
          <div className="bg-[var(--white)] rounded-2xl max-w-md w-full p-6 relative animate-fadeIn">
            <button 
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-[var(--gray-500)] hover:text-[var(--gray-700)]"
            >
              <FaTimes size={20} />
            </button>

            <div className="text-center mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--indigo-600)] to-[var(--violet-600)] flex items-center justify-center text-[var(--white)] mx-auto mb-4">
                <selectedService.icon size={32} />
              </div>
              <h3 className="text-2xl font-bold text-[var(--gray-900)]">Book {selectedService.title}</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--gray-700)] mb-2">
                  Pickup Location
                </label>
                <input 
                  type="text"
                  placeholder="Enter pickup address"
                  className="w-full p-3 border border-[var(--gray-200)] rounded-xl focus:outline-none focus:border-[var(--indigo-600)]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--gray-700)] mb-2">
                  Dropoff Location
                </label>
                <input 
                  type="text"
                  placeholder="Enter dropoff address"
                  className="w-full p-3 border border-[var(--gray-200)] rounded-xl focus:outline-none focus:border-[var(--violet-600)]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--gray-700)] mb-2">
                  Package Details
                </label>
                <textarea 
                  placeholder="Describe your package"
                  rows="3"
                  className="w-full p-3 border border-[var(--gray-200)] rounded-xl focus:outline-none focus:border-[var(--indigo-600)]"
                ></textarea>
              </div>

              <div className="flex items-center justify-between p-3 bg-[var(--gray-50)] rounded-xl">
                <span className="font-medium text-[var(--gray-700)]">Total Amount:</span>
                <span className="text-2xl font-bold text-[var(--gray-900)]">₹{selectedService.price}</span>
              </div>

              <button className="w-full bg-gradient-to-r from-[var(--indigo-600)] to-[var(--violet-600)] text-[var(--white)] py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </section>
  )
}

export default ServicesSection