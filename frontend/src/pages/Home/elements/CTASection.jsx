// components/home/CTASection.jsx
import React from 'react'
import { FaMotorcycle, FaArrowRight } from 'react-icons/fa'

const CTASection = () => {
  return (
    <section className="py-20 bg-[var(--white)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[var(--indigo-50)] to-[var(--violet-50)] rounded-3xl p-12 text-center relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--indigo-600)] rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--violet-600)] rounded-full blur-3xl"></div>
          </div>

          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-[var(--indigo-600)] to-[var(--violet-600)] flex items-center justify-center text-[var(--white)] mx-auto mb-6">
              <FaMotorcycle size={40} />
            </div>

            <h2 className="text-3xl lg:text-4xl font-bold text-[var(--gray-900)] mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-[var(--gray-600)] text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of happy customers who trust us for their delivery needs
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group flex items-center justify-center gap-3 bg-gradient-to-r from-[var(--indigo-600)] to-[var(--violet-600)] hover:from-[var(--indigo-700)] hover:to-[var(--violet-700)] text-[var(--white)] px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                <FaMotorcycle size={24} />
                <span>Book a Ride Now</span>
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="bg-[var(--white)] hover:bg-[var(--gray-50)] text-[var(--gray-700)] px-8 py-4 rounded-xl font-semibold text-lg shadow-md hover:shadow-lg border border-[var(--gray-200)] transition-all">
                Become a Rider
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-[var(--gray-600)]">
              <span>✓ No hidden charges</span>
              <span>✓ Secure payments</span>
              <span>✓ 24/7 support</span>
              <span>✓ Real-time tracking</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTASection