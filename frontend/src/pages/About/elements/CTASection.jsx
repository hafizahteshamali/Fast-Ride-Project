'use client';

import { FaApple, FaGoogle, FaArrowRight } from 'react-icons/fa';

export default function CTASection() {
  return (
    <section className="relative py-20 px-4 md:px-8 overflow-hidden">
      {/* Background with gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, var(--primary-orange) 0%, var(--secondary-orange) 100%)`,
        }}
      >
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white rounded-full filter blur-3xl" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Heading */}
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Ready to experience the{' '}
            <span className="text-white underline decoration-4 decoration-white/30">
              TezRide difference?
            </span>
          </h2>

          {/* Description */}
          <p className="text-white/90 text-lg md:text-xl max-w-2xl">
            Join millions of happy users and start your journey with TezRide today. 
            Download the app now and get your first ride free!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button className="group bg-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-2xl hover:scale-105 flex items-center justify-center space-x-3 text-gray-900">
              <FaApple size={24} />
              <span className="text-lg">App Store</span>
              <FaArrowRight className="opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300" />
            </button>
            
            <button className="group bg-white/10 backdrop-blur-sm px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-2xl hover:scale-105 flex items-center justify-center space-x-3 text-white border border-white/30">
              <FaGoogle size={24} />
              <span className="text-lg">Play Store</span>
              <FaArrowRight className="opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300" />
            </button>
          </div>

          {/* Trust Badge */}
          <p className="text-white/80 text-sm mt-4">
            ⚡ No credit card required • Free first ride • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
}