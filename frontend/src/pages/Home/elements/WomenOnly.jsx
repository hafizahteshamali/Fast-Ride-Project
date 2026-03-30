// WomenOnly.jsx
import React, { useState, useEffect, useRef } from 'react';
import { 
  FaFemale, 
  FaShieldAlt, 
  FaUserCheck, 
  FaHeart,
  FaStar,
  FaClock,
  FaCheckCircle,
  FaArrowRight,
  FaPlay,
  FaPause,
  FaMobileAlt,
  FaLock,
  FaHandsHelping,
  FaMoneyBillWave,
  FaChartLine
} from 'react-icons/fa';
import { MdVerified, MdSecurity } from 'react-icons/md';

const WomenOnly = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [counters, setCounters] = useState({
    riders: 0,
    safety: 0,
    rating: 0
  });
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const [autoplay, setAutoplay] = useState(true);

  const features = [
    {
      icon: FaUserCheck,
      title: "Verified Female Riders",
      description: "Every female rider undergoes strict verification process including background checks, ID verification, and safety training.",
      longDescription: "Our comprehensive 5-step verification ensures you ride with trusted, vetted female drivers who prioritize your safety and comfort.",
      color: "#FF991C",
      highlights: [
        "Background check certified",
        "ID & license verification",
        "Safety training completed",
        "Defensive driving certified"
      ]
    },
    {
      icon: FaShieldAlt,
      title: "Priority Safety First",
      description: "Real-time GPS tracking, emergency SOS button, and 24/7 dedicated support team for complete peace of mind.",
      longDescription: "Advanced safety features including ride sharing, location sharing with trusted contacts, and instant emergency response system.",
      color: "#FF5C00",
      highlights: [
        "24/7 emergency support",
        "Real-time GPS tracking",
        "SOS panic button",
        "Trip sharing feature"
      ]
    },
    {
      icon: FaHeart,
      title: "Comfort & Trust",
      description: "Travel with confidence knowing you're in safe hands with our community of professional female drivers.",
      longDescription: "Built on mutual respect and understanding, our service creates a supportive community where women feel valued and protected.",
      color: "#FF991C",
      highlights: [
        "100% female community",
        "Supportive environment",
        "Quality guaranteed",
        "Respect & dignity"
      ]
    }
  ];

  const benefits = [
    { icon: FaClock, title: "Quick Response", text: "Avg 5-min pickup", description: "Fastest response time in Karachi" },
    { icon: FaLock, title: "Safe & Secure", text: "End-to-end encrypted", description: "Your privacy protected" },
    { icon: FaHandsHelping, title: "Supportive Community", text: "Women helping women", description: "Join 100+ Karachi riders" },
    { icon: FaMobileAlt, title: "Easy Booking", text: "One-tap booking", description: "Book in under 10 seconds" },
    { icon: FaMoneyBillWave, title: "Fair Pricing", text: "Competitive rates", description: "No surge pricing" },
    { icon: FaChartLine, title: "Track Record", text: "99% satisfaction", description: "5-star rated by Karachi women" }
  ];

  const stats = [
    { value: "100+", label: "Active Riders", suffix: "+", icon: FaFemale, target: 100 },
    { value: "99%", label: "Safety Rating", suffix: "%", icon: MdSecurity, target: 99 },
    { value: "24/7", label: "Support", suffix: "", icon: FaClock, target: 24 }
  ];

  // Updated testimonials with Karachi-based Pakistani girls
  const testimonials = [
    {
      name: "Ayesha Khan",
      role: "University Student, DHA Karachi",
      text: "As a student who travels late from university in DHA, this service has been a lifesaver. The female riders are professional and make me feel completely safe.",
      rating: 5,
      location: "Karachi"
    },
    {
      name: "Fatima Ahmed",
      role: "Software Engineer, Gulshan-e-Iqbal",
      text: "I use Women Only for my daily commute to corporate office in Gulshan. The drivers are punctual, friendly, and I feel secure knowing it's a female rider.",
      rating: 5,
      location: "Karachi"
    },
    {
      name: "Zara Malik",
      role: "Business Owner, Clifton",
      text: "Being a female entrepreneur, I often have late meetings in Clifton. This service gives me peace of mind. The drivers are well-trained and very professional.",
      rating: 5,
      location: "Karachi"
    },
    {
      name: "Hira Tariq",
      role: "Medical Student, Saddar",
      text: "My night shifts at the hospital are no longer stressful. Women Only provides safe rides with amazing female drivers who understand our needs.",
      rating: 5,
      location: "Karachi"
    }
  ];

  // Counter animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const duration = 2000;
      const interval = 20;
      const steps = duration / interval;
      
      let currentStep = 0;
      
      const intervalId = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setCounters({
          riders: Math.min(Math.floor(progress * 100), 100),
          safety: Math.min(Math.floor(progress * 99), 99),
          rating: Math.min(parseFloat((progress * 4.9).toFixed(1)), 4.9)
        });
        
        if (currentStep >= steps) {
          clearInterval(intervalId);
        }
      }, interval);
      
      return () => clearInterval(intervalId);
    }
  }, [isVisible]);

  // Auto-rotate features
  useEffect(() => {
    let interval;
    if (autoplay) {
      interval = setInterval(() => {
        setActiveFeature((prev) => (prev + 1) % features.length);
      }, 5000);
    }
    
    return () => clearInterval(interval);
  }, [autoplay]);

  const handlePrevSlide = () => {
    setAutoplay(false);
    setActiveFeature((prev) => (prev - 1 + features.length) % features.length);
    setTimeout(() => setAutoplay(true), 10000);
  };

  const handleNextSlide = () => {
    setAutoplay(false);
    setActiveFeature((prev) => (prev + 1) % features.length);
    setTimeout(() => setAutoplay(true), 10000);
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-orange-50/30"
    >
      {/* Animated Background Elements - Hidden on mobile for performance */}
      <div className="absolute inset-0 overflow-hidden hidden md:block">
        <div className="absolute top-0 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-orange-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-orange-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Badge - Responsive text sizes */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF991C]/10 to-[#FF5C00]/10 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-3 sm:mb-4 backdrop-blur-sm border border-[#FF991C]/20">
            <FaFemale className="text-[#FF5C00] text-sm sm:text-lg animate-pulse" />
            <span className="text-[#FF5C00] font-semibold text-xs sm:text-sm">Women's Exclusive Service - Karachi</span>
            <MdVerified className="text-[#FF991C] text-sm sm:text-lg" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">
            Safe Rides for{' '}
            <span className="bg-gradient-to-r from-[#FF991C] to-[#FF5C00] bg-clip-text text-transparent">
              Women, By Women
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Empowering female passengers across Karachi with the choice to ride with verified female drivers
          </p>
        </div>

        {/* Main Interactive Card */}
        <div className="relative group">
          <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl overflow-hidden border border-gray-100">
            <div className="flex flex-col lg:flex-row">
              {/* Left Side - Interactive Visual */}
              <div className="relative bg-gradient-to-br from-[#FF991C] to-[#FF5C00] w-full lg:w-1/2 overflow-hidden">
                {/* Floating Icons - Hidden on mobile */}
                <div className="absolute top-5 right-5 md:top-10 md:right-10 animate-bounce-slow hidden sm:block">
                  <FaFemale className="text-white/10 sm:text-white/20 text-5xl sm:text-7xl" />
                </div>
                <div className="absolute bottom-5 left-5 md:bottom-10 md:left-10 animate-spin-slow hidden sm:block">
                  <FaHeart className="text-white/10 sm:text-white/20 text-4xl sm:text-5xl" />
                </div>
                
                {/* Content Container */}
                <div className="relative z-10 flex items-center min-h-[400px] sm:min-h-[450px] md:min-h-[500px] lg:min-h-full">
                  <div className="p-6 sm:p-8 md:p-10 lg:p-12 w-full">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-4 sm:mb-6">
                      <FaFemale className="text-white text-sm sm:text-lg animate-pulse" />
                      <span className="text-white text-xs sm:text-sm font-semibold tracking-wide">Women Only • Karachi</span>
                    </div>
                    
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 leading-tight">
                      Choose Your
                      <br />
                      <span className="text-white/95">Female Rider</span>
                    </h3>
                    
                    <p className="text-white/90 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 leading-relaxed">
                      Female passengers in Karachi can now exclusively request female riders. Experience the comfort of traveling with women who prioritize your safety.
                    </p>

                    {/* Stats - Responsive grid */}
                    <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
                      {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        const currentValue = counters[stat.label.includes('Riders') ? 'riders' : 
                                                          stat.label.includes('Safety') ? 'safety' : 'rating'];
                        const displayValue = stat.label.includes('Rating') ? currentValue.toFixed(1) : currentValue;
                        
                        return (
                          <div key={index} className="text-center group/stat">
                            <div className="flex justify-center mb-1 sm:mb-2">
                              <Icon className="text-white/80 text-lg sm:text-2xl group-hover/stat:scale-110 transition-transform duration-300" />
                            </div>
                            <div className="text-white font-bold text-lg sm:text-2xl">
                              {displayValue}{stat.suffix}
                            </div>
                            <div className="text-white/70 text-[10px] sm:text-xs uppercase tracking-wide">{stat.label}</div>
                          </div>
                        );
                      })}
                    </div>

                    {/* CTA Buttons - Responsive layout */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                      <button 
                        className="group relative bg-white text-[#FF5C00] px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          <FaFemale className="text-base sm:text-lg" />
                          <span className="hidden xs:inline">Request Female Rider</span>
                          <span className="xs:hidden">Request</span>
                          <FaArrowRight className={`transform transition-all duration-300 ${isHovered ? 'translate-x-1' : ''} hidden sm:block`} />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-100 to-orange-200 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                      </button>
                      <button className="group border-2 border-white/30 text-white px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base hover:bg-white/10 hover:border-white/50 transition-all duration-300 flex items-center justify-center gap-2">
                        <FaPlay className="text-xs sm:text-sm group-hover:scale-110 transition-transform" />
                        <span className="hidden xs:inline">Watch Demo</span>
                        <span className="xs:hidden">Demo</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Interactive Features */}
              <div className="p-5 sm:p-6 md:p-8 lg:p-12 bg-white w-full lg:w-1/2">
                <div className="mb-6 sm:mb-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <FaStar className="text-[#FF991C] text-xl sm:text-2xl animate-spin-slow" />
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Why Karachi Women Choose Us</h3>
                    </div>
                    {/* Carousel Controls - Responsive */}
                    <div className="flex gap-2">
                      <button
                        onClick={handlePrevSlide}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all duration-300 text-sm"
                      >
                        ←
                      </button>
                      <button
                        onClick={handleNextSlide}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all duration-300 text-sm"
                      >
                        →
                      </button>
                      <button
                        onClick={() => setAutoplay(!autoplay)}
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-300 text-xs sm:text-sm ${
                          autoplay ? 'bg-[#FF991C]/20 text-[#FF991C]' : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {autoplay ? <FaPause size={12} /> : <FaPlay size={12} />}
                      </button>
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-gray-600">
                    Join our growing community of Karachi women who trust us for safe and comfortable rides
                  </p>
                </div>

                {/* Feature Carousel - Responsive */}
                <div className="relative mb-6 sm:mb-8">
                  <div className="overflow-hidden">
                    <div 
                      className="flex transition-transform duration-500 ease-in-out"
                      style={{ transform: `translateX(-${activeFeature * 100}%)` }}
                    >
                      {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                          <div key={index} className="w-full flex-shrink-0 px-1 sm:px-2">
                            <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-100 hover:shadow-lg transition-all duration-300">
                              <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#FF991C]/10 to-[#FF5C00]/10 flex items-center justify-center flex-shrink-0">
                                  <Icon className="text-[#FF5C00] text-xl sm:text-3xl" />
                                </div>
                                <div className="flex-1">
                                  <h4 className="text-base sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">{feature.title}</h4>
                                  <p className="text-xs sm:text-sm text-gray-600">{feature.description}</p>
                                </div>
                              </div>
                              <p className="text-gray-500 text-xs sm:text-sm mt-3 sm:mt-4 border-l-4 border-[#FF991C] pl-3 sm:pl-4 mb-3 sm:mb-4">
                                {feature.longDescription}
                              </p>
                              <div className="grid grid-cols-2 gap-1 sm:gap-2 mt-3 sm:mt-4">
                                {feature.highlights.map((highlight, idx) => (
                                  <div key={idx} className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs text-gray-600">
                                    <FaCheckCircle className="text-[#FF991C] text-[8px] sm:text-xs flex-shrink-0" />
                                    <span className="truncate">{highlight}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* Carousel Indicators */}
                  <div className="flex justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-6">
                    {features.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setAutoplay(false);
                          setActiveFeature(index);
                          setTimeout(() => setAutoplay(true), 10000);
                        }}
                        className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                          activeFeature === index 
                            ? 'w-6 sm:w-8 bg-gradient-to-r from-[#FF991C] to-[#FF5C00]' 
                            : 'w-1.5 sm:w-2 bg-gray-300 hover:bg-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Benefits Grid - Responsive */}
                <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-6">
                  {benefits.map((benefit, index) => {
                    const Icon = benefit.icon;
                    return (
                      <div 
                        key={index}
                        className="group flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gray-50 hover:bg-gradient-to-r hover:from-[#FF991C]/5 hover:to-[#FF5C00]/5 transition-all duration-300 cursor-pointer"
                      >
                        <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-[#FF991C]/10 to-[#FF5C00]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                          <Icon className="text-[#FF5C00] text-sm sm:text-lg" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 text-xs sm:text-sm truncate">{benefit.title}</p>
                          <p className="text-[10px] sm:text-xs text-gray-500 truncate">{benefit.text}</p>
                          <p className="text-[8px] sm:text-xs text-gray-400 mt-0.5 hidden group-hover:block transition-all truncate">{benefit.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Testimonials with Karachi Women - Updated */}
                <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                    <h4 className="text-xs sm:text-sm font-semibold text-gray-900">Passengers Reviews</h4>
                    <div className="flex items-center gap-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className="text-[#FF991C] text-[10px] sm:text-xs" />
                        ))}
                      </div>
                      <span className="text-[10px] sm:text-xs font-semibold">5.0</span>
                      <span className="text-[10px] sm:text-xs text-gray-500">(100+ reviews)</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
                    {testimonials.slice(0, 4).map((testimonial, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-lg p-2 sm:p-3 hover:bg-orange-50 transition-all duration-300">
                        <p className="text-[10px] sm:text-xs text-gray-600 italic line-clamp-3">"{testimonial.text}"</p>
                        <div className="flex items-center gap-2 mt-1.5 sm:mt-2">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-[#FF991C] to-[#FF5C00] flex items-center justify-center text-white">
                            <FaFemale size={10} className="sm:text-xs" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-[10px] sm:text-xs font-semibold text-gray-900 block truncate">{testimonial.name}</span>
                            <span className="text-[8px] sm:text-xs text-gray-500 block truncate">{testimonial.role}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Trust Badge */}
                  <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-3 pt-2 sm:pt-3 border-t border-gray-200">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="flex -space-x-1 sm:-space-x-2">
                        {[1, 2, 3, 4].map((i) => (
                          <div 
                            key={i} 
                            className="w-6 h-6 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-[#FF991C] to-[#FF5C00] flex items-center justify-center text-white border-2 border-white animate-pulse"
                            style={{ animationDelay: `${i * 0.1}s` }}
                          >
                            <FaFemale size={8} className="sm:text-xs" />
                          </div>
                        ))}
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-semibold text-gray-900">100+ Active Riders in Karachi</p>
                        <p className="text-[10px] sm:text-xs text-gray-500">Growing community daily</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2 bg-orange-50 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
                      <MdVerified className="text-[#FF991C] text-xs sm:text-sm" />
                      <span className="text-[10px] sm:text-xs font-semibold text-gray-900">100% Verified</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce 2s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
        
        @media (max-width: 640px) {
          .animate-bounce-slow {
            animation: none;
          }
          .animate-spin-slow {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};

export default WomenOnly;