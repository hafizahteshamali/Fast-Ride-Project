'use client';

import { useState, useEffect } from 'react';
import { 
  FaStar, 
  FaQuoteLeft, 
  FaArrowLeft, 
  FaArrowRight,
  FaRegHeart,
  FaShare,
  FaCheckCircle
} from 'react-icons/fa';

const testimonials = [
  {
    name: 'Emily Davis',
    role: 'Regular User',
    content: 'TezRide has completely changed how I commute. Fast, reliable, and the drivers are always professional. Highly recommended!',
    rating: 5,
    image: 'https://ui-avatars.com/api/?name=Emily+Davis&size=200&background=FF991C&color=fff&bold=true',
    location: 'New York',
    verified: true,
    date: '2 days ago'
  },
  {
    name: 'Robert Wilson',
    role: 'Business Professional',
    content: 'The delivery service is amazing. I get my packages delivered within minutes. The real-time tracking gives me peace of mind.',
    rating: 5,
    image: 'https://ui-avatars.com/api/?name=Robert+Wilson&size=200&background=FF5C00&color=fff&bold=true',
    location: 'Los Angeles',
    verified: true,
    date: '1 week ago'
  },
  {
    name: 'Lisa Chen',
    role: 'Frequent Traveler',
    content: 'As someone who travels often, TezRide is my go-to app in every city. Consistent quality and affordable prices.',
    rating: 5,
    image: 'https://ui-avatars.com/api/?name=Lisa+Chen&size=200&background=FF991C&color=fff&bold=true',
    location: 'San Francisco',
    verified: true,
    date: '3 days ago'
  },
  {
    name: 'Michael Brown',
    role: 'Food Enthusiast',
    content: 'The food delivery is incredibly fast and always hot. Best food delivery app I have ever used!',
    rating: 5,
    image: 'https://ui-avatars.com/api/?name=Michael+Brown&size=200&background=FF5C00&color=fff&bold=true',
    location: 'Chicago',
    verified: true,
    date: '5 days ago'
  },
  {
    name: 'Sarah Miller',
    role: 'Daily Commuter',
    content: 'I use TezRide every day for my office commute. The prices are reasonable and the service is always top-notch.',
    rating: 4,
    image: 'https://ui-avatars.com/api/?name=Sarah+Miller&size=200&background=FF991C&color=fff&bold=true',
    location: 'Houston',
    verified: true,
    date: '1 day ago'
  }
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState('next');
  const [liked, setLiked] = useState({});
  const [showShareTooltip, setShowShareTooltip] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    if (!isAnimating) {
      setDirection('next');
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handlePrev = () => {
    if (!isAnimating) {
      setDirection('prev');
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleDotClick = (index) => {
    if (!isAnimating && index !== currentIndex) {
      setDirection(index > currentIndex ? 'next' : 'prev');
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex(index);
        setIsAnimating(false);
      }, 300);
    }
  };

  const toggleLike = (index) => {
    setLiked(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <section className="relative py-24 px-4 md:px-8 overflow-hidden" style={{ backgroundColor: 'var(--gray-50)' }}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl animate-float"
          style={{ backgroundColor: 'var(--primary-orange)', opacity: 0.1 }}
        />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl animate-float animation-delay-2000"
          style={{ backgroundColor: 'var(--secondary-orange)', opacity: 0.1 }}
        />
      </div>

      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, var(--gray-400) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-12 h-0.5 rounded-full" style={{ background: 'var(--primary-orange)' }} />
            <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--primary-orange)' }}>
              Testimonials
            </span>
            <div className="w-12 h-0.5 rounded-full" style={{ background: 'var(--primary-orange)' }} />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What Our{' '}
            <span className="relative inline-block">
              <span style={{ color: 'var(--primary-orange)' }}>Users Say</span>
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent" />
            </span>
          </h2>
          
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Real stories from real people who use TezRide every day
          </p>

          {/* Rating Summary */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar key={star} className="text-yellow-400 w-5 h-5" />
                ))}
              </div>
              <span className="font-bold text-xl" style={{ color: 'var(--gray-800)' }}>4.8</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaCheckCircle className="text-green-500 w-5 h-5" />
              <span className="text-gray-600">Verified Reviews</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaRegHeart className="text-red-500 w-5 h-5" />
              <span className="text-gray-600">10k+ Likes</span>
            </div>
          </div>
        </div>

        {/* Main Testimonial Section */}
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Side - Stats */}
          <div className="flex-1 w-full lg:w-1/3">
            <div className="flex flex-col space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--gray-800)' }}>User Satisfaction</h3>
                <div className="space-y-4">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center space-x-3">
                      <span className="text-sm font-medium w-8">{rating} ★</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-500"
                          style={{ 
                            width: rating === 5 ? '75%' : rating === 4 ? '15%' : rating === 3 ? '7%' : '2%',
                            backgroundColor: rating >= 4 ? 'var(--primary-orange)' : 'var(--gray-400)'
                          }}
                        />
                      </div>
                      <span className="text-sm text-gray-500">
                        {rating === 5 ? '75%' : rating === 4 ? '15%' : rating === 3 ? '7%' : '3%'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--gray-800)' }}>Why Users Love Us</h3>
                <div className="flex flex-wrap gap-2">
                  {['Fast Service', 'Affordable', 'Safe', 'Reliable', '24/7 Support', 'Easy to Use'].map((tag, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 text-sm rounded-full"
                      style={{ 
                        backgroundColor: index % 2 === 0 ? 'rgba(255, 153, 28, 0.1)' : 'rgba(255, 92, 0, 0.1)',
                        color: index % 2 === 0 ? 'var(--primary-orange)' : 'var(--secondary-orange)',
                        border: `1px solid ${index % 2 === 0 ? 'rgba(255, 153, 28, 0.3)' : 'rgba(255, 92, 0, 0.3)'}`
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Testimonial Carousel */}
          <div className="flex-1 w-full lg:w-2/3">
            <div className="relative">
              {/* Quote Icon */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl transform rotate-12"
                  style={{ backgroundColor: 'var(--primary-orange)', color: 'var(--white)' }}
                >
                  <FaQuoteLeft size={24} />
                </div>
              </div>

              {/* Testimonial Card */}
              <div className="relative overflow-hidden rounded-3xl">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-white to-orange-50 opacity-50" />

                {/* Card Content */}
                <div className={`relative bg-white/80 backdrop-blur-sm p-8 md:p-12 shadow-2xl transform transition-all duration-500 ${
                  isAnimating 
                    ? direction === 'next' 
                      ? 'translate-x-full opacity-0' 
                      : '-translate-x-full opacity-0' 
                    : 'translate-x-0 opacity-100'
                }`}>
                  <div className="flex flex-col items-center text-center">
                    {/* Profile Image with Ring */}
                    <div className="relative mb-6">
                      <div className="absolute inset-0 rounded-full animate-ping opacity-20"
                        style={{ backgroundColor: 'var(--primary-orange)' }}
                      />
                      <div className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-orange-100 shadow-xl">
                        <img
                          src={testimonials[currentIndex].image}
                          alt={testimonials[currentIndex].name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {testimonials[currentIndex].verified && (
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center border-4 border-white">
                          <FaCheckCircle className="text-white w-4 h-4" />
                        </div>
                      )}
                    </div>

                    {/* Rating with Animation */}
                    <div className="flex space-x-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="relative">
                          <FaStar 
                            className={`w-6 h-6 transition-all duration-300 ${
                              i < testimonials[currentIndex].rating 
                                ? 'text-yellow-400 scale-110' 
                                : 'text-gray-300'
                            }`}
                          />
                          {i < testimonials[currentIndex].rating && (
                            <FaStar className="absolute inset-0 text-yellow-400 w-6 h-6 animate-ping opacity-30" />
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Content */}
                    <p className="text-gray-700 text-lg md:text-xl italic mb-6 leading-relaxed max-w-2xl">
                      "{testimonials[currentIndex].content}"
                    </p>

                    {/* Author Info */}
                    <div className="mb-4">
                      <h4 className="text-2xl font-bold mb-1" style={{ color: 'var(--gray-800)' }}>
                        {testimonials[currentIndex].name}
                      </h4>
                      <div className="flex items-center justify-center space-x-2 text-gray-500">
                        <span>{testimonials[currentIndex].role}</span>
                        <span>•</span>
                        <span>{testimonials[currentIndex].location}</span>
                      </div>
                    </div>

                    {/* Date and Actions */}
                    <div className="flex items-center justify-center space-x-6 text-sm text-gray-400">
                      <span>{testimonials[currentIndex].date}</span>
                      <div className="flex items-center space-x-4">
                        <button 
                          onClick={() => toggleLike(currentIndex)}
                          className="flex items-center space-x-1 hover:text-red-500 transition-colors"
                        >
                          <FaRegHeart className={liked[currentIndex] ? 'text-red-500 fill-current' : ''} />
                          <span>Helpful</span>
                        </button>
                        <div className="relative">
                          <button 
                            onMouseEnter={() => setShowShareTooltip(currentIndex)}
                            onMouseLeave={() => setShowShareTooltip(null)}
                            className="flex items-center space-x-1 hover:text-blue-500 transition-colors"
                          >
                            <FaShare />
                            <span>Share</span>
                          </button>
                          {showShareTooltip === currentIndex && (
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                              Share this review
                              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={handlePrev}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-300 hover:scale-110 group"
                style={{ color: 'var(--primary-orange)' }}
              >
                <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 md:translate-x-12 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-300 hover:scale-110 group"
                style={{ color: 'var(--primary-orange)' }}
              >
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center items-center space-x-3 mt-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className="group relative"
            >
              <div
                className={`rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'w-12 h-3' 
                    : 'w-3 h-3 hover:w-6'
                }`}
                style={{
                  backgroundColor: index === currentIndex ? 'var(--primary-orange)' : 'var(--gray-300)'
                }}
              />
              {index === currentIndex && (
                <div className="absolute -inset-1 rounded-full animate-ping opacity-20"
                  style={{ backgroundColor: 'var(--primary-orange)' }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Bottom Trust Badges */}
        <div className="flex flex-wrap justify-center items-center gap-8 mt-16">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <FaCheckCircle className="text-green-500 w-5 h-5" />
              <span className="text-gray-600 text-sm">Verified Review {item}</span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -20px) scale(1.1); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
}