'use client';

import { FaEye, FaBullseye, FaHeart } from 'react-icons/fa';

export default function MissionVision() {
  return (
    <section className="py-20 px-4 md:px-8" style={{ backgroundColor: 'var(--white)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Mission */}
          <div className="flex-1 group">
            <div className="bg-gradient-to-br from-orange-50 to-white rounded-3xl p-8 h-full border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: 'var(--primary-orange)' }}
              >
                <FaBullseye size={32} className="text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--gray-800)' }}>
                Our Mission
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                To revolutionize urban mobility by providing accessible, affordable, and sustainable 
                transportation solutions that connect people and communities seamlessly.
              </p>
              <div className="mt-6 h-1 w-20 rounded-full group-hover:w-32 transition-all duration-300"
                style={{ backgroundColor: 'var(--primary-orange)' }}
              />
            </div>
          </div>

          {/* Vision */}
          <div className="flex-1 group">
            <div className="bg-gradient-to-br from-yellow-50 to-white rounded-3xl p-8 h-full border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: 'var(--secondary-orange)' }}
              >
                <FaEye size={32} className="text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--gray-800)' }}>
                Our Vision
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                To create a world where transportation is effortless, sustainable, and accessible to 
                everyone, making cities more connected and communities stronger.
              </p>
              <div className="mt-6 h-1 w-20 rounded-full group-hover:w-32 transition-all duration-300"
                style={{ backgroundColor: 'var(--secondary-orange)' }}
              />
            </div>
          </div>

          {/* Core Value */}
          <div className="flex-1 group">
            <div className="bg-gradient-to-br from-red-50 to-white rounded-3xl p-8 h-full border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: 'var(--primary-orange)' }}
              >
                <FaHeart size={32} className="text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--gray-800)' }}>
                Our Promise
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                We promise to always prioritize safety, reliability, and customer satisfaction in 
                everything we do, ensuring the best experience for our users.
              </p>
              <div className="mt-6 h-1 w-20 rounded-full group-hover:w-32 transition-all duration-300"
                style={{ backgroundColor: 'var(--primary-orange)' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}