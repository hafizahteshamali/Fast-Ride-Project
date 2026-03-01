// components/home/PricingSection.jsx
import React from 'react'
import { FaCheckCircle, FaMotorcycle, FaClock, FaMapMarkerAlt } from 'react-icons/fa'

const pricingPlans = [
  {
    name: "Basic",
    price: "49",
    period: "per delivery",
    features: [
      "Same city delivery",
      "Up to 5 kg weight",
      "Basic tracking",
      "24/7 support",
      "2 hours delivery"
    ],
    popular: false,
    color: "indigo"
  },
  {
    name: "Express",
    price: "99",
    period: "per delivery",
    features: [
      "Same city delivery",
      "Up to 10 kg weight",
      "Real-time tracking",
      "Priority support",
      "30 mins delivery",
      "Insurance included"
    ],
    popular: true,
    color: "violet"
  },
  {
    name: "Business",
    price: "199",
    period: "per delivery",
    features: [
      "Intercity delivery",
      "Up to 50 kg weight",
      "Premium tracking",
      "Dedicated manager",
      "Same day delivery",
      "Full insurance",
      "Bulk discounts"
    ],
    popular: false,
    color: "indigo"
  }
]

const PricingSection = () => {
  return (
    <section className="py-20 bg-[var(--gray-50)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[var(--indigo-600)] font-semibold text-sm uppercase tracking-wider">
            Pricing Plans
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-[var(--gray-900)] mt-2 mb-4">
            Simple & Transparent Pricing
          </h2>
          <p className="text-[var(--gray-600)] max-w-2xl mx-auto">
            Choose the perfect plan for your delivery needs
          </p>
        </div>

        <div className="flex flex-wrap gap-6 justify-center">
          {pricingPlans.map((plan, index) => (
            <div 
              key={index}
              className={`flex-1 min-w-[280px] max-w-[350px] bg-[var(--white)] rounded-2xl p-8 border ${
                plan.popular 
                  ? 'border-transparent shadow-xl relative' 
                  : 'border-[var(--gray-200)] hover:border-[var(--indigo-600)]'
              } transition-all duration-300`}
            >
              {plan.popular && (
                <>
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[var(--indigo-600)] to-[var(--violet-600)] text-[var(--white)] px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-[var(--indigo-600)] to-[var(--violet-600)] opacity-5 rounded-2xl"></div>
                </>
              )}

              <div className="relative">
                <h3 className="text-2xl font-bold text-[var(--gray-900)] mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-[var(--gray-900)]">₹{plan.price}</span>
                  <span className="text-[var(--gray-500)]">/{plan.period}</span>
                </div>

                <div className="flex items-center gap-2 mb-6 text-sm text-[var(--gray-600)]">
                  <FaClock className={plan.popular ? 'text-[var(--violet-600)]' : 'text-[var(--indigo-600)]'} />
                  <span>Starting from {plan.features[4]}</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <FaCheckCircle className={`mt-1 flex-shrink-0 ${
                        plan.popular ? 'text-[var(--violet-600)]' : 'text-[var(--indigo-600)]'
                      }`} />
                      <span className="text-[var(--gray-600)]">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-3 rounded-xl font-semibold transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-r from-[var(--indigo-600)] to-[var(--violet-600)] text-[var(--white)] hover:shadow-lg hover:scale-105'
                    : 'border-2 border-[var(--indigo-600)] text-[var(--indigo-600)] hover:bg-[var(--indigo-50)]'
                }`}>
                  Choose Plan
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Quote */}
        <div className="mt-12 text-center">
          <p className="text-[var(--gray-600)]">
            Need a custom plan?{" "}
            <button className="text-[var(--indigo-600)] font-semibold hover:text-[var(--violet-600)] underline">
              Contact us for bulk pricing
            </button>
          </p>
        </div>
      </div>
    </section>
  )
}

export default PricingSection