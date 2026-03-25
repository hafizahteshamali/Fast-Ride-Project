'use client';

import { FaQuoteLeft, FaStar, FaUsers, FaMotorcycle, FaStarHalfAlt } from 'react-icons/fa';

export default function Community() {
  const stories = [
    {
      id: 1,
      title: 'A Community of Stories',
      author: 'Sarah K.',
      quote: 'I love how easy it is to use TezRide. The app is smooth and the drivers are very professional. Can\'t wait for the full launch!',
      rating: 5,
      category: 'User Experience',
    },
    {
      id: 2,
      title: 'Safety First Always',
      author: 'Ahmed M.',
      quote: 'As a beta tester, I appreciate the safety features. The real-time tracking and driver verification give me peace of mind.',
      rating: 5,
      category: 'Safety',
    },
    {
      id: 3,
      title: 'Affordable Mobility',
      author: 'Fatima H.',
      quote: 'Finally, a ride-sharing app that understands Pakistani needs. Affordable rates without compromising on quality. Highly recommended!',
      rating: 5,
      category: 'Value',
    },
  ];

  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FFF1E0] to-[#FFE4D4] px-4 py-2 rounded-full mb-4 border border-[#FF991C] border-opacity-30">
            <FaStar className="text-[#FF991C] animate-pulse" />
            <span className="text-[#FF991C] font-semibold text-sm uppercase tracking-wider">
              Beta Tester Stories
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--gray-900)' }}>
            A Community Full of Stories
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Hear from our early beta testers about their TezRide experience
          </p>
        </div>

        {/* Stories - Flex Layout */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 mb-16 justify-center">
          {stories.map((story) => (
            <div 
              key={story.id} 
              className="flex-1 bg-white rounded-2xl p-6 md:p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 group"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(story.rating)].map((_, i) => (
                  <FaStar key={i} size={18} style={{ color: 'var(--primary-orange)' }} />
                ))}
              </div>

              {/* Category Badge */}
              <div className="mb-4 inline-block px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ backgroundColor: 'var(--secondary-orange)' }}>
                {story.category}
              </div>

              {/* Quote */}
              <div className="mb-6">
                <FaQuoteLeft size={24} style={{ color: 'var(--primary-orange)', marginBottom: '1rem' }} />
                <p className="text-gray-700 text-base italic leading-relaxed">"{story.quote}"</p>
              </div>

              {/* Author Info */}
              <div className="border-t border-gray-200 pt-4">
                <p className="font-bold text-gray-900">{story.author}</p>
                <p className="text-gray-500 text-sm">Beta Tester ✓</p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section - Flex Layout */}
        <div
          className="rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden"
          style={{ 
            background: 'linear-gradient(135deg, #FF991C, #FF5C00)',
          }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-2">Our Growing Community</h3>
            <p className="mb-8 text-lg opacity-95">Join thousands of Pakistanis waiting for TezRide</p>
            
            <div className="flex flex-wrap justify-center gap-8 md:gap-12 text-white">
              <div className="text-center min-w-[140px]">
                <div className="flex items-center justify-center gap-1 mb-2">
                  <FaUsers size={28} className="opacity-90" />
                </div>
                <p className="text-3xl md:text-4xl font-bold">2,500+</p>
                <p className="text-sm opacity-90">Waitlist Users</p>
                <p className="text-xs opacity-75 mt-1">Growing daily</p>
              </div>
              
              <div className="text-center min-w-[140px]">
                <div className="flex items-center justify-center gap-1 mb-2">
                  <FaMotorcycle size={28} className="opacity-90" />
                </div>
                <p className="text-3xl md:text-4xl font-bold">100+</p>
                <p className="text-sm opacity-90">Partner Drivers</p>
                <p className="text-xs opacity-75 mt-1">Onboarded</p>
              </div>
              
              <div className="text-center min-w-[140px]">
                <div className="flex items-center justify-center gap-1 mb-2">
                  <FaStar size={28} className="opacity-90" />
                </div>
                <p className="text-3xl md:text-4xl font-bold">4.9</p>
                <p className="text-sm opacity-90">Beta Rating</p>
                <p className="text-xs opacity-75 mt-1">From 500+ reviews</p>
              </div>
              
              <div className="text-center min-w-[140px]">
                <div className="flex items-center justify-center gap-1 mb-2">
                  <FaStarHalfAlt size={28} className="opacity-90" />
                </div>
                <p className="text-3xl md:text-4xl font-bold">Karachi</p>
                <p className="text-sm opacity-90">Launch City</p>
                <p className="text-xs opacity-75 mt-1">Coming 2026</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-8 max-w-md mx-auto">
              <div className="flex justify-between text-sm mb-2">
                <span>Launch Readiness</span>
                <span>75%</span>
              </div>
              <div className="h-2 bg-white bg-opacity-30 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white rounded-full transition-all duration-1000"
                  style={{ width: '75%' }}
                ></div>
              </div>
              <p className="text-xs opacity-75 mt-2">Target: Full launch in Q2 2026</p>
            </div>
          </div>
        </div>

        {/* Join Community CTA */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#FFF1E0] to-[#FFE4D4] px-6 py-3 rounded-full">
            <FaStar className="text-[#FF991C]" />
            <span className="text-gray-700">Be part of our story</span>
          </div>
          <div className="mt-6">
            <button className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-[#FF991C] to-[#FF5C00] text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden">
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></span>
              <FaUsers size={20} />
              <span>Join the Waitlist</span>
            </button>
            <p className="text-gray-500 text-sm mt-3">
              Be among the first to experience TezRide in Karachi
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}