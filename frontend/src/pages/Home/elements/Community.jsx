'use client';

import { FaQuoteLeft, FaStar } from 'react-icons/fa';

export default function Community() {
  const stories = [
    {
      id: 1,
      title: 'A Community of Stories',
      author: 'Sarah K.',
      quote:
        'TezRide has made my daily commute so much easier. The drivers are professional and the app is super intuitive.',
      rating: 5,
      category: 'User Experience',
    },
    {
      id: 2,
      title: 'Safety First Always',
      author: 'Ahmed M.',
      quote:
        'I feel safe every time I book a TezRide. The safety features and professional drivers make all the difference.',
      rating: 5,
      category: 'Safety',
    },
    {
      id: 3,
      title: 'Affordable Mobility',
      author: 'Fatima H.',
      quote:
        'Finally, a ride-sharing app that is affordable without compromising on quality. Highly recommended!',
      rating: 5,
      category: 'Value',
    },
  ];

  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--gray-900)' }}>
            A Community Full of Stories
          </h2>
          <p className="text-gray-600 text-lg">
            Hear from our happy users about their TezRide experience
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {stories.map((story) => (
            <div key={story.id} className="bg-white rounded-2xl p-8 hover:shadow-xl transition duration-300 border-2 border-gray-100 hover:border-orange-300">
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
                <p className="text-gray-500 text-sm">Verified User ✓</p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div
          className="rounded-2xl p-12 text-center text-white"
          style={{ backgroundColor: 'var(--primary-orange)' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="text-4xl font-bold mb-2">2M+</p>
              <p className="text-lg">Active Users</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">15M+</p>
              <p className="text-lg">Completed Rides</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">4.8</p>
              <p className="text-lg">Average Rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
