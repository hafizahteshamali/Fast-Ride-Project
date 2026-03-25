'use client';

import { FaHeadset, FaEnvelope, FaMapMarkerAlt, FaClock, FaRocket } from 'react-icons/fa';

export default function ContactHero() {
  return (
    <section className="relative py-20 md:py-28 px-4 md:px-8 overflow-hidden bg-gradient-to-br from-orange-50 to-white mt-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-200 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-lg mb-8">
          <FaHeadset className="text-orange-500 w-5 h-5" />
          <span className="text-sm font-semibold text-gray-700">Launch Support Coming Soon</span>
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
          Have questions about TezRide? We're preparing to launch in Karachi. Join our waitlist and be the first to know when we go live!
        </p>

        {/* Quick Contact Stats - Flex Layout */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <FaEnvelope className="text-orange-500 w-5 h-5" />
            <span className="text-gray-700">Early Access Inquiries</span>
          </div>
          <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <FaMapMarkerAlt className="text-orange-500 w-5 h-5" />
            <span className="text-gray-700">Launching in Karachi</span>
          </div>
          <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <FaClock className="text-orange-500 w-5 h-5" />
            <span className="text-gray-700">Q2 2026 Launch</span>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 p-6 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl border border-orange-100">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <FaRocket className="text-orange-500 w-6 h-6 animate-pulse" />
            <p className="text-gray-700 font-medium">
              Be among the first 1,000 waitlist members to get exclusive launch benefits!
            </p>
          </div>
        </div>

        {/* Contact Options */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <FaEnvelope className="text-white w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Email Us</h3>
            <p className="text-sm text-gray-500 mb-3">For general inquiries and support</p>
            <a href="mailto:hello@tezride.pk" className="text-orange-500 font-semibold hover:underline">
              hello@tezride.pk
            </a>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <FaHeadset className="text-white w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Join Waitlist</h3>
            <p className="text-sm text-gray-500 mb-3">Get early access and launch updates</p>
            <button className="text-orange-500 font-semibold hover:underline">
              Sign up now →
            </button>
          </div>
        </div>

        {/* Trust Indicator */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400">
            We'll never share your information. Early access members get priority support and exclusive offers.
          </p>
        </div>
      </div>
    </section>
  );
}