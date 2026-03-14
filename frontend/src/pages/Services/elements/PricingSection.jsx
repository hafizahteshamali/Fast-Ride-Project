'use client';

import { FaCheck, FaTimes, FaStar, FaRupeeSign, FaGift, FaHeadset, FaRocket, FaShieldAlt } from 'react-icons/fa';
import { useState } from 'react';

const plans = [
  {
    name: 'Basic',
    price: '2,999',
    originalPrice: '3,599',
    period: 'month',
    description: 'Perfect for occasional users',
    features: [
      { name: 'Up to 10 rides/month', included: true },
      { name: 'Standard vehicles', included: true },
      { name: 'Basic support', included: true },
      { name: 'Priority booking', included: false },
      { name: 'Premium vehicles', included: false },
      { name: '24/7 VIP support', included: false }
    ],
    color: 'var(--gray-600)',
    popular: false,
    savings: 'Save 15%',
    icon: FaRocket
  },
  {
    name: 'Pro',
    price: '4,999',
    originalPrice: '5,999',
    period: 'month',
    description: 'Best for regular commuters',
    features: [
      { name: 'Up to 30 rides/month', included: true },
      { name: 'Standard vehicles', included: true },
      { name: 'Priority support', included: true },
      { name: 'Priority booking', included: true },
      { name: 'Premium vehicles', included: false },
      { name: '24/7 VIP support', included: false }
    ],
    color: 'var(--primary-orange)',
    popular: true,
    savings: 'Save 20%',
    icon: FaHeadset
  },
  {
    name: 'Premium',
    price: '7,999',
    originalPrice: '9,999',
    period: 'month',
    description: 'For power users and businesses',
    features: [
      { name: 'Unlimited rides', included: true },
      { name: 'Premium vehicles', included: true },
      { name: '24/7 VIP support', included: true },
      { name: 'Priority booking', included: true },
      { name: 'Business invoices', included: true },
      { name: 'Team accounts (up to 5)', included: true }
    ],
    color: 'var(--secondary-orange)',
    popular: false,
    savings: 'Save 25%',
    icon: FaShieldAlt
  }
];

export default function PricingSection() {
  const [annual, setAnnual] = useState(false);
  const [hoveredPlan, setHoveredPlan] = useState(null);

  // PKR Price Calculator
  const calculatePrice = (price, isAnnual) => {
    // Remove commas for calculation
    const numericPrice = parseFloat(price.replace(/,/g, ''));
    
    if (isAnnual) {
      // Annual discount: 2 months free (approximately 16.67% discount)
      const annualPrice = numericPrice * 10; // Pay for 10 months, get 2 free
      return annualPrice.toLocaleString('en-PK');
    }
    return price;
  };

  const calculateMonthlySavings = (originalPrice, currentPrice) => {
    const original = parseFloat(originalPrice.replace(/,/g, ''));
    const current = parseFloat(currentPrice.replace(/,/g, ''));
    const savings = original - current;
    return savings > 0 ? savings.toLocaleString('en-PK') : '0';
  };

  return (
    <section className="relative py-24 px-4 md:px-8 overflow-hidden" style={{ backgroundColor: 'var(--gray-50)' }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-200 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header with PKR Badge */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md mb-4">
            <FaRupeeSign className="text-green-600 w-4 h-4" />
            <span className="text-sm font-semibold text-gray-700">Prices in Pakistani Rupees (PKR)</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Simple &{' '}
            <span style={{ color: 'var(--primary-orange)' }}>Transparent</span>
            <br />
            <span style={{ color: 'var(--gray-900)' }}>Pricing Plans</span>
          </h2>
          
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Choose the perfect plan for your needs. All prices are in PKR with no hidden fees.
          </p>

          {/* Enhanced Billing Toggle */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
            <div className="flex items-center space-x-4 bg-white p-2 rounded-full shadow-lg">
              <button
                onClick={() => setAnnual(false)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  !annual ? 'text-white' : 'text-gray-600'
                }`}
                style={{ backgroundColor: !annual ? 'var(--primary-orange)' : 'transparent' }}
              >
                Monthly Billing
              </button>
              <button
                onClick={() => setAnnual(true)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 flex items-center space-x-2 ${
                  annual ? 'text-white' : 'text-gray-600'
                }`}
                style={{ backgroundColor: annual ? 'var(--primary-orange)' : 'transparent' }}
              >
                <span>Annual Billing</span>
                <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">Save 16%</span>
              </button>
            </div>
            
            {annual && (
              <div className="bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                <FaGift className="w-4 h-4" />
                <span>2 months free with annual plan</span>
              </div>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="flex flex-wrap justify-center gap-8">
          {plans.map((plan, index) => {
            const displayedPrice = calculatePrice(plan.price, annual);
            const monthlyPrice = annual 
              ? (parseFloat(plan.price.replace(/,/g, '')) * 0.84).toFixed(0) // 16% discount reflected in monthly
              : plan.price;
            const Icon = plan.icon;

            return (
              <div 
                key={index} 
                className="flex-1 min-w-[300px] max-w-[350px] relative group"
                onMouseEnter={() => setHoveredPlan(index)}
                onMouseLeave={() => setHoveredPlan(null)}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="bg-gradient-to-r from-orange-400 to-orange-600 text-white px-5 py-1.5 rounded-full text-sm font-semibold flex items-center space-x-1 shadow-lg">
                      <FaStar className="w-4 h-4" />
                      <span>Most Popular</span>
                    </div>
                  </div>
                )}

                {/* Savings Badge */}
                {annual && (
                  <div className="absolute -right-2 top-8 z-20">
                    <div className="bg-green-500 text-white px-3 py-1 rounded-l-full text-xs font-bold shadow-lg">
                      Save {plan.savings}
                    </div>
                  </div>
                )}

                {/* Card */}
                <div className={`bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden ${
                  plan.popular ? 'border-2' : 'border border-gray-100'
                } ${hoveredPlan === index ? 'ring-2 ring-offset-2' : ''}`}
                  style={{ 
                    borderColor: plan.popular ? plan.color : 'var(--gray-100)',
                    ringColor: plan.color
                  }}
                >
                  {/* Background Pattern */}
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                    <Icon size={80} />
                  </div>

                  {/* Plan Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br mb-6 flex items-center justify-center"
                    style={{ 
                      background: `linear-gradient(135deg, ${plan.color}20, ${plan.color}05)`,
                      color: plan.color
                    }}
                  >
                    <Icon size={32} />
                  </div>

                  {/* Plan Header */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold mb-2" style={{ color: plan.color }}>
                      {plan.name}
                    </h3>
                    <p className="text-gray-500 text-sm mb-4">{plan.description}</p>
                    
                    {/* Price Display */}
                    <div className="flex items-end justify-center gap-2">
                      <span className="text-5xl font-bold" style={{ color: 'var(--gray-800)' }}>
                        Rs. {displayedPrice}
                      </span>
                      <span className="text-gray-500 mb-1">/{annual ? 'year' : plan.period}</span>
                    </div>
                    
                    {/* Original Price & Savings */}
                    {annual && (
                      <div className="mt-2 text-sm">
                        <span className="text-gray-400 line-through mr-2">Rs. {calculatePrice(plan.originalPrice, false)}/month</span>
                        <span className="text-green-600 font-semibold">Save Rs. {calculateMonthlySavings(plan.originalPrice, plan.price)}/month</span>
                      </div>
                    )}
                    
                    {!annual && (
                      <div className="mt-2 text-sm text-gray-500">
                        Billed monthly • Cancel anytime
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-3">
                        {feature.included ? (
                          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                            <FaCheck className="text-green-500 w-3 h-3" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                            <FaTimes className="text-gray-400 w-3 h-3" />
                          </div>
                        )}
                        <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button
                    className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 relative overflow-hidden group/btn ${
                      plan.popular
                        ? 'text-white hover:shadow-xl'
                        : 'border-2 hover:bg-gray-50'
                    }`}
                    style={{
                      backgroundColor: plan.popular ? plan.color : 'transparent',
                      borderColor: plan.color,
                      color: plan.popular ? 'white' : plan.color
                    }}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <FaRupeeSign className="w-4 h-4" />
                      <span>Get Started with {plan.name}</span>
                    </span>
                  </button>

                  {/* Money Back Guarantee */}
                  {plan.popular && (
                    <p className="text-xs text-gray-400 text-center mt-4">
                      30-day money-back guarantee
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional PKR Information */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-6 p-6 bg-white rounded-2xl shadow-lg">
            <div className="flex items-center gap-2">
              <FaRupeeSign className="text-green-600 w-5 h-5" />
              <span className="text-gray-700">All prices in Pakistani Rupees</span>
            </div>
            <div className="w-px h-6 bg-gray-300 hidden sm:block"></div>
            <div className="flex items-center gap-2">
              <FaCheck className="text-green-500 w-5 h-5" />
              <span className="text-gray-700">No hidden fees</span>
            </div>
            <div className="w-px h-6 bg-gray-300 hidden sm:block"></div>
            <div className="flex items-center gap-2">
              <FaGift className="text-orange-500 w-5 h-5" />
              <span className="text-gray-700">Free first ride with any plan</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}