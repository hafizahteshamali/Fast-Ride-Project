// components/home/WhyChooseUs.jsx
import React from 'react'
import { 
  FaShieldAlt, 
  FaClock, 
  FaMoneyBillWave, 
  FaHeadset,
  FaMapMarkerAlt,
  FaUsers 
} from 'react-icons/fa'

const features = [
  {
    icon: FaShieldAlt,
    title: "Safe & Secure",
    description: "Your packages are insured and tracked",
    color: "indigo"
  },
  {
    icon: FaClock,
    title: "24/7 Service",
    description: "Available anytime, day or night",
    color: "violet"
  },
  {
    icon: FaMoneyBillWave,
    title: "Best Prices",
    description: "Competitive rates with no hidden charges",
    color: "indigo"
  },
  {
    icon: FaHeadset,
    title: "Live Support",
    description: "24/7 customer support assistance",
    color: "violet"
  },
  {
    icon: FaMapMarkerAlt,
    title: "Real-time Tracking",
    description: "Track your package live on map",
    color: "indigo"
  },
  {
    icon: FaUsers,
    title: "Professional Riders",
    description: "Verified and trained delivery partners",
    color: "violet"
  }
]

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-[var(--white)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Content */}
          <div className="flex-1">
            <span className="text-[var(--indigo-600)] font-semibold text-sm uppercase tracking-wider">
              Why Choose Us
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-[var(--gray-900)] mt-2 mb-4">
              We Make Delivery <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--indigo-600)] to-[var(--violet-600)]">Simple & Fast</span>
            </h2>
            <p className="text-[var(--gray-600)] mb-8">
              With thousands of successful deliveries, we've built a reputation for reliability and speed. Here's why customers love us:
            </p>

            {/* Features List */}
            <div className="flex flex-wrap gap-4">
              {features.slice(0, 3).map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div key={index} className="flex items-start gap-4 w-full sm:w-[calc(50%-0.5rem)]">
                    <div className={`w-12 h-12 rounded-xl ${
                      feature.color === 'indigo' ? 'bg-[var(--indigo-50)]' : 'bg-[var(--violet-50)]'
                    } flex items-center justify-center flex-shrink-0`}>
                      <Icon className={feature.color === 'indigo' ? 'text-[var(--indigo-600)]' : 'text-[var(--violet-600)]'} size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[var(--gray-900)]">{feature.title}</h4>
                      <p className="text-sm text-[var(--gray-600)]">{feature.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Content - Stats Card */}
          <div className="flex-1">
            <div className="bg-gradient-to-br from-[var(--indigo-600)] to-[var(--violet-600)] rounded-3xl p-8 text-[var(--white)]">
              <h3 className="text-2xl font-bold mb-6">Our Achievements</h3>
              
              <div className="flex flex-wrap justify-between gap-6">
                <div className="flex-1 min-w-[100px]">
                  <div className="text-3xl font-bold">50K+</div>
                  <div className="text-sm opacity-90">Deliveries</div>
                </div>
                <div className="flex-1 min-w-[100px]">
                  <div className="text-3xl font-bold">1000+</div>
                  <div className="text-sm opacity-90">Active Riders</div>
                </div>
                <div className="flex-1 min-w-[100px]">
                  <div className="text-3xl font-bold">50+</div>
                  <div className="text-sm opacity-90">Cities</div>
                </div>
                <div className="flex-1 min-w-[100px]">
                  <div className="text-3xl font-bold">4.8</div>
                  <div className="text-sm opacity-90">Rating</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-8">
                <div className="flex justify-between text-sm mb-2">
                  <span>Customer Satisfaction</span>
                  <span>98%</span>
                </div>
                <div className="h-2 bg-[var(--white)] bg-opacity-30 rounded-full overflow-hidden">
                  <div className="w-[98%] h-full bg-[var(--white)] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs