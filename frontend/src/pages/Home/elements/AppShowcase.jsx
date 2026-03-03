'use client';

import { useRef, useState, useEffect } from 'react';
import Slider from 'react-slick';
import { 
  FaChevronLeft, 
  FaChevronRight,
  FaMobile,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaStar,
  FaHeadset,
  FaHeart,
  FaBolt,
  FaClock,
  FaCreditCard,
  FaBell,
  FaRoute,
  FaUserCheck
} from 'react-icons/fa';

// Import slick carousel styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function AppShowcase() {
  const sliderRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowWidth, setWindowWidth] = useState(0);

  const screens = [
    {
      id: 1,
      title: 'Easy Booking',
      description: 'Book rides in just 2 taps',
      badge: '⚡',
      icon: FaBolt,
      features: ['Quick pickup', 'Smart routing', 'Instant confirmation'],
      color: '#FF991C'
    },
    {
      id: 2,
      title: 'Live Tracking',
      description: 'Track your ride in real-time',
      badge: '📍',
      icon: FaMapMarkerAlt,
      features: ['GPS enabled', 'ETA updates', 'Share location'],
      color: '#FF5C00'
    },
    {
      id: 3,
      title: 'Secure Payments',
      description: 'Multiple payment options',
      badge: '💳',
      icon: FaShieldAlt,
      features: ['Card on file', 'Digital wallet', 'Cash option'],
      color: '#FF991C'
    },
    {
      id: 4,
      title: 'Top Rated',
      description: 'Professional drivers',
      badge: '⭐',
      icon: FaStar,
      features: ['4.8 avg rating', 'Verified drivers', 'Reviews'],
      color: '#FF5C00'
    },
    {
      id: 5,
      title: '24/7 Support',
      description: 'Round-the-clock service',
      badge: '💬',
      icon: FaHeadset,
      features: ['Live chat', 'Emergency support', 'Call center'],
      color: '#FF991C'
    },
    {
      id: 6,
      title: 'Favorites',
      description: 'Save frequent locations',
      badge: '❤️',
      icon: FaHeart,
      features: ['Home', 'Work', 'Gym', 'School'],
      color: '#FF5C00'
    },
  ];

  // Track window width for responsive adjustments
  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isHovered && windowWidth > 768) {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        });
      }
    };

    const element = document.querySelector('.showcase-container');
    if (element) {
      element.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (element) {
        element.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [isHovered, windowWidth]);

  const getSlidesToShow = () => {
    if (windowWidth < 640) return 1;
    if (windowWidth < 1024) return 2;
    return 3;
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: getSlidesToShow(),
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: false,
    beforeChange: (current, next) => setActiveSlide(next),
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  // Custom CSS to hide any remaining dots
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .slick-dots, .slick-dots li, .slick-dots button {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const getCardHeight = () => {
    if (windowWidth < 640) return '400px';
    if (windowWidth < 768) return '420px';
    return '450px';
  };

  const getPhoneSize = () => {
    if (windowWidth < 640) return 'w-40';
    if (windowWidth < 768) return 'w-44';
    return 'w-48';
  };

  const getNavButtonPosition = () => {
    if (windowWidth < 640) return '-left-2';
    if (windowWidth < 768) return '-left-3';
    return '-left-4';
  };

  return (
    <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
      {/* Animated Background with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF991C] via-[#FF7A2C] to-[#FF5C00]">
        {/* Animated Particles - Hidden on mobile for performance */}
        <div className="absolute inset-0 opacity-10 sm:opacity-20 hidden sm:block">
          {[...Array(windowWidth < 768 ? 10 : 20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white animate-float"
              style={{
                width: Math.random() * (windowWidth < 768 ? 50 : 100) + 30,
                height: Math.random() * (windowWidth < 768 ? 50 : 100) + 30,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 10 + 10}s`,
                opacity: 0.1 + Math.random() * 0.1
              }}
            />
          ))}
        </div>

        {/* Moving Gradient Overlay - Only on desktop */}
        {windowWidth > 768 && (
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255,255,255,0.3) 0%, transparent 50%)`,
              transition: 'background 0.1s ease'
            }}
          />
        )}
      </div>

      {/* Decorative Elements - Hidden on mobile */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-white rounded-full opacity-10 blur-3xl animate-pulse hidden lg:block"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full opacity-10 blur-3xl animate-pulse delay-1000 hidden lg:block"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-white bg-opacity-20 backdrop-blur-lg px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-3 sm:mb-4 border border-white border-opacity-30">
            <FaMobile className="text-white text-sm sm:text-base animate-bounce" />
            <span className="text-white font-semibold text-xs sm:text-sm uppercase tracking-wider">
              Mobile Experience
            </span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 text-white px-2">
            Experience{' '}
            <span className="relative inline-block">
              TezzRide
              <svg className="absolute -bottom-2 left-0 w-full hidden sm:block" height="8" viewBox="0 0 200 8">
                <path d="M0,4 Q50,8 100,4 T200,4" stroke="white" fill="none" strokeWidth="2"/>
              </svg>
            </span>
          </h2>
          
          <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl opacity-90 max-w-2xl mx-auto px-4">
            Intuitive, user-friendly interface designed for your convenience
          </p>

          {/* Stats Counter - Responsive grid */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 mt-6 sm:mt-8">
            <div className="text-center min-w-[80px] sm:min-w-[100px]">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">100K+</div>
              <div className="text-white text-xs sm:text-sm opacity-80">Downloads</div>
            </div>
            <div className="text-center min-w-[80px] sm:min-w-[100px]">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">4.8</div>
              <div className="text-white text-xs sm:text-sm opacity-80">App Rating</div>
            </div>
            <div className="text-center min-w-[80px] sm:min-w-[100px]">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">50+</div>
              <div className="text-white text-xs sm:text-sm opacity-80">Cities</div>
            </div>
          </div>
        </div>

        {/* Main Showcase Container */}
        <div 
          className="showcase-container relative"
          onMouseEnter={() => windowWidth > 768 && setIsHovered(true)}
          onMouseLeave={() => windowWidth > 768 && setIsHovered(false)}
        >
          {/* Slider */}
          <div className="relative px-6 sm:px-8 md:px-10 lg:px-12">
            <Slider ref={sliderRef} {...settings}>
              {screens.map((screen, index) => {
                const Icon = screen.icon;
                
                return (
                  <div key={screen.id} className="px-2 sm:px-3 pb-8 sm:pb-10 md:pb-12">
                    <div className={`
                      group relative h-[${getCardHeight()}] rounded-2xl sm:rounded-3xl
                      transform transition-all duration-500
                      ${activeSlide === index ? 'scale-105 z-10' : 'scale-100 hover:scale-102'}
                    `}>
                      {/* Card Background with Glass Effect */}
                      <div className="absolute inset-0 bg-white bg-opacity-10 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white border-opacity-20 shadow-xl sm:shadow-2xl overflow-hidden">
                        {/* Animated Gradient Overlay */}
                        <div 
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{
                            background: `radial-gradient(circle at 50% 50%, ${screen.color}40, transparent 70%)`
                          }}
                        />
                        
                        {/* Floating Icons Background - Hidden on mobile */}
                        <div className="absolute inset-0 opacity-5 hidden sm:block">
                          {[...Array(2)].map((_, i) => (
                            <Icon 
                              key={i}
                              className="absolute text-white"
                              style={{
                                left: `${Math.random() * 80 + 10}%`,
                                top: `${Math.random() * 80 + 10}%`,
                                fontSize: Math.random() * 20 + 15,
                                transform: `rotate(${Math.random() * 360}deg)`,
                                animation: `float ${Math.random() * 5 + 5}s infinite`
                              }}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Phone Mockup Container */}
                      <div className="relative z-10 h-full flex flex-col items-center justify-center p-3 sm:p-4 md:p-5 lg:p-6">
                        {/* Phone Frame with 3D Effect */}
                        <div className={`
                          relative ${getPhoneSize()} transform transition-all duration-700
                          ${activeSlide === index ? 'rotate-0 scale-105 sm:scale-110' : 'rotate-2 hover:rotate-0'}
                        `}>
                          {/* Phone Shadow */}
                          <div className="absolute -inset-2 sm:-inset-3 md:-inset-4 bg-gradient-to-r from-[#FF991C] to-[#FF5C00] rounded-2xl sm:rounded-[3rem] opacity-20 blur-md sm:blur-xl group-hover:opacity-40 transition-opacity"></div>
                          
                          {/* Main Phone */}
                          <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl sm:rounded-[2.5rem] p-2 sm:p-3 shadow-xl sm:shadow-2xl border-2 sm:border-4 border-gray-700">
                            {/* Notch - Hidden on very small screens */}
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 sm:w-20 md:w-24 h-4 sm:h-5 md:h-6 bg-gray-800 rounded-b-lg sm:rounded-b-xl hidden xs:block"></div>
                            
                            {/* Screen Content */}
                            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl sm:rounded-2xl p-2 sm:p-3 md:p-4 h-64 sm:h-72 md:h-80 flex flex-col items-center justify-center text-center">
                              {/* Badge Icon */}
                              <div className={`
                                text-3xl sm:text-4xl md:text-5xl mb-2 sm:mb-3 transform transition-all duration-500
                                ${activeSlide === index ? 'scale-110 rotate-0' : 'rotate-6'}
                              `}>
                                {screen.badge}
                              </div>
                              
                              {/* Icon */}
                              <div className={`
                                w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl mb-2 sm:mb-3 
                                flex items-center justify-center bg-gradient-to-r from-[#FF991C] to-[#FF5C00] text-white
                                transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6
                              `}>
                                <Icon size={windowWidth < 640 ? 16 : windowWidth < 768 ? 20 : 24} />
                              </div>
                              
                              {/* Title with Animation */}
                              <h3 className="text-white font-bold text-sm sm:text-base md:text-lg mb-1 sm:mb-2 relative">
                                {screen.title}
                                <span className={`
                                  absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-0.5
                                  bg-gradient-to-r from-[#FF991C] to-[#FF5C00] rounded-full
                                  transition-all duration-500
                                  ${activeSlide === index ? 'opacity-100 w-8 sm:w-10 md:w-12' : 'opacity-0 w-0'}
                                `}></span>
                              </h3>
                              
                              {/* Description */}
                              <p className="text-gray-300 text-xs sm:text-sm mb-2 sm:mb-3 md:mb-4 px-1">
                                {screen.description}
                              </p>
                              
                              {/* Features List - Condensed on mobile */}
                              <div className="space-y-1 sm:space-y-2">
                                {screen.features.slice(0, windowWidth < 640 ? 2 : 3).map((feature, idx) => (
                                  <div key={idx} className="flex items-center gap-1 sm:gap-2 text-xs">
                                    <div className="w-1 h-1 bg-[#FF991C] rounded-full flex-shrink-0"></div>
                                    <span className="text-gray-400 text-[10px] sm:text-xs truncate">
                                      {feature}
                                    </span>
                                  </div>
                                ))}
                              </div>

                              {/* Interactive Button - Hidden on mobile, shown on hover on tablet/desktop */}
                              <button className={`
                                mt-2 sm:mt-3 md:mt-4 px-2 sm:px-3 md:px-4 py-1 sm:py-2 
                                rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-semibold
                                bg-gradient-to-r from-[#FF991C] to-[#FF5C00] text-white
                                transform transition-all duration-300 hover:scale-105 hover:shadow-xl
                                ${windowWidth < 768 ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} 
                                translate-y-2 group-hover:translate-y-0
                              `}>
                                Try Now
                              </button>
                            </div>

                            {/* Home Button */}
                            <div className="absolute bottom-1 sm:bottom-2 left-1/2 transform -translate-x-1/2 w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 bg-gray-700 rounded-full border-2 sm:border-4 border-gray-600"></div>
                          </div>
                        </div>

                        {/* Feature Badge - Adjusted for mobile */}
                        <div className={`
                          absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 
                          bg-white bg-opacity-20 backdrop-blur-md
                          rounded-full px-2 sm:px-3 py-0.5 sm:py-1 flex items-center gap-0.5 sm:gap-1
                          transform transition-all duration-500 hover:scale-110
                          border border-white border-opacity-30
                        `}>
                          <FaStar className="text-yellow-400" size={windowWidth < 640 ? 8 : 10} />
                          <span className="text-white text-[8px] sm:text-xs font-semibold">New</span>
                        </div>

                        {/* Quick Action Button - Adjusted for mobile */}
                        <button className={`
                          absolute -bottom-4 sm:-bottom-5 md:-bottom-6 left-1/2 transform -translate-x-1/2
                          w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 rounded-full bg-white shadow-xl
                          flex items-center justify-center
                          transition-all duration-300 hover:scale-110 hover:rotate-180
                          ${activeSlide === index ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
                        `}
                        style={{ color: screen.color }}>
                          <FaBolt size={windowWidth < 640 ? 14 : 16} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Slider>

            {/* Custom Navigation Buttons - Responsive positioning */}
            <button
              onClick={() => sliderRef.current?.slickPrev()}
              className={`
                absolute ${getNavButtonPosition()} top-1/2 -translate-y-1/2 z-20
                w-8 sm:w-10 md:w-12 lg:w-14 h-8 sm:h-10 md:h-12 lg:h-14 
                rounded-full bg-white shadow-lg sm:shadow-xl
                flex items-center justify-center
                transform transition-all duration-300
                hover:scale-110 hover:shadow-2xl hover:bg-gradient-to-r hover:from-[#FF991C] hover:to-[#FF5C00] hover:text-white
                disabled:opacity-50 disabled:cursor-not-allowed
                focus:outline-none group
                ${windowWidth < 640 ? 'hidden' : 'flex'}
              `}
              style={{ color: '#FF991C' }}
              aria-label="Previous slide"
            >
              <FaChevronLeft size={windowWidth < 768 ? 16 : 20} className="group-hover:text-white transition-colors" />
            </button>
            
            <button
              onClick={() => sliderRef.current?.slickNext()}
              className={`
                absolute -right-2 sm:-right-3 md:-right-4 top-1/2 -translate-y-1/2 z-20
                w-8 sm:w-10 md:w-12 lg:w-14 h-8 sm:h-10 md:h-12 lg:h-14 
                rounded-full bg-white shadow-lg sm:shadow-xl
                flex items-center justify-center
                transform transition-all duration-300
                hover:scale-110 hover:shadow-2xl hover:bg-gradient-to-r hover:from-[#FF5C00] hover:to-[#FF991C] hover:text-white
                disabled:opacity-50 disabled:cursor-not-allowed
                focus:outline-none group
                ${windowWidth < 640 ? 'hidden' : 'flex'}
              `}
              style={{ color: '#FF5C00' }}
              aria-label="Next slide"
            >
              <FaChevronRight size={windowWidth < 768 ? 16 : 20} className="group-hover:text-white transition-colors" />
            </button>

            {/* Mobile Navigation Dots */}
            {windowWidth < 640 && (
              <div className="flex justify-center mt-4 gap-2">
                {screens.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => sliderRef.current?.slickGoTo(index)}
                    className={`
                      h-1.5 rounded-full transition-all duration-300
                      ${index === activeSlide 
                        ? 'w-6 bg-white' 
                        : 'w-1.5 bg-white bg-opacity-50'
                      }
                    `}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Progress Indicators - Hidden on mobile */}
          {windowWidth >= 640 && (
            <div className="flex justify-center mt-6 sm:mt-8 gap-1 sm:gap-2">
              {screens.map((_, index) => (
                <button
                  key={index}
                  onClick={() => sliderRef.current?.slickGoTo(index)}
                  className={`
                    h-1 rounded-full transition-all duration-300
                    ${index === activeSlide 
                      ? 'w-6 sm:w-8 bg-white' 
                      : 'w-1 sm:w-2 bg-white bg-opacity-30 hover:bg-opacity-50'
                    }
                  `}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Bottom CTA - Responsive */}
        <div className="text-center mt-12 sm:mt-16 md:mt-20">
          <button className="group relative inline-flex items-center gap-2 sm:gap-3
            bg-white text-[#FF5C00] px-5 sm:px-6 md:px-8 py-3 sm:py-3.5 md:py-4 
            rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base md:text-lg
            shadow-xl sm:shadow-2xl hover:shadow-3xl transform hover:scale-105
            transition-all duration-300 overflow-hidden">
            <span className="absolute inset-0 bg-gradient-to-r from-[#FF991C] to-[#FF5C00] opacity-0 group-hover:opacity-10 transition-opacity"></span>
            <FaMobile className="animate-bounce text-sm sm:text-base" />
            <span>Download the App</span>
            <FaChevronRight className="group-hover:translate-x-2 transition-transform text-sm sm:text-base" />
          </button>
          <p className="text-white text-xs sm:text-sm opacity-80 mt-3 sm:mt-4">
            Available on iOS and Android • Free to download
          </p>
        </div>
      </div>

      {/* Animation Keyframes */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        .animate-float {
          animation: float 10s infinite ease-in-out;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }
        /* Custom breakpoint for extra small devices */
        @media (min-width: 400px) {
          .xs\\:block {
            display: block;
          }
        }
      `}</style>
    </section>
  );
}