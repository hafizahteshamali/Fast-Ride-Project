'use client';

import { FaHeadset, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function ContactHero() {
  return (
    <section className="relative py-20 md:py-28 px-4 md:px-8 overflow-hidden bg-gradient-to-br from-orange-50 to-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-200 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-lg mb-8">
          <FaHeadset className="text-orange-500 w-5 h-5" />
          <span className="text-sm font-semibold text-gray-700">24/7 Customer Support</span>
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          <span className="text-gray-900">Get in </span>
          <span className="relative">
            <span className="text-orange-500">Touch</span>
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"></span>
          </span>
        </h1>

        {/* Description */}
        <p className="text-gray-600 text-xl max-w-2xl mx-auto mb-12">
          Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>

        {/* Quick Contact Stats */}
        <div className="flex flex-wrap justify-center gap-8">
          <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-md">
            <FaEnvelope className="text-orange-500 w-5 h-5" />
            <span className="text-gray-700">Response within 24h</span>
          </div>
          <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-md">
            <FaMapMarkerAlt className="text-orange-500 w-5 h-5" />
            <span className="text-gray-700">Offices in 10+ cities</span>
          </div>
        </div>
      </div>
    </section>
  );
}