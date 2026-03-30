// RentADriver.jsx
import React, { useState, useEffect, useRef } from 'react';
import { 
  FaUserTie, 
  FaCar, 
  FaClock, 
  FaStar, 
  FaCheckCircle,
  FaArrowRight,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaWhatsapp,
  FaShieldAlt,
  FaUsers,
  FaWallet,
  FaAward,
  FaComments,
  FaQuoteLeft,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';
import { MdVerified, MdSecurity, MdSupportAgent } from 'react-icons/md';

const RentADriver = () => {
  const [selectedDriver, setSelectedDriver] = useState(0);
  const [activeTab, setActiveTab] = useState('hourly');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const driverPackages = [
    {
      id: 1,
      name: "Hourly Package",
      icon: FaClock,
      price: "500",
      unit: "/hour",
      description: "Perfect for short trips and errands",
      features: [
        "Professional male/female driver",
        "Fuel included",
        "24/7 support",
        "Free cancellation"
      ],
      popular: false,
      color: "from-[#FF991C]/10 to-[#FF5C00]/10"
    },
    {
      id: 2,
      name: "Daily Package",
      icon: FaCalendarAlt,
      price: "3,500",
      unit: "/day",
      description: "Best for full-day travel needs",
      features: [
        "8 hours of service",
        "80 km included",
        "Professional driver",
        "Complimentary water"
      ],
      popular: true,
      color: "from-[#FF991C]/20 to-[#FF5C00]/20"
    },
    {
      id: 3,
      name: "Weekly Package",
      icon: FaCalendarAlt,
      price: "22,000",
      unit: "/week",
      description: "Great value for weekly commutes",
      features: [
        "7 days service",
        "500 km included",
        "Priority support",
        "Flexible timing"
      ],
      popular: false,
      color: "from-[#FF991C]/10 to-[#FF5C00]/10"
    }
  ];

  const benefits = [
    {
      icon: FaShieldAlt,
      title: "Fully Insured",
      description: "All our drivers and vehicles are fully insured for your safety"
    },
    {
      icon: MdVerified,
      title: "Background Verified",
      description: "Thorough background checks and police verification"
    },
    {
      icon: FaUsers,
      title: "Experienced Drivers",
      description: "Minimum 5 years of driving experience"
    },
    {
      icon: FaClock,
      title: "24/7 Availability",
      description: "Drivers available round the clock for your convenience"
    },
    {
      icon: FaWallet,
      title: "Transparent Pricing",
      description: "No hidden charges, clear pricing structure"
    },
    {
      icon: MdSupportAgent,
      title: "Dedicated Support",
      description: "24/7 customer support for all your needs"
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Business Traveler",
      text: "The driver was punctual, professional, and very courteous. Made my business trip hassle-free!",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      name: "Priya Sharma",
      role: "Regular User",
      text: "I use Rent a Driver for my daily office commute. The service is reliable and drivers are very professional.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
      name: "Amit Patel",
      role: "Family Man",
      text: "Perfect for family outings. Safe driving and comfortable journey every time.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/2.jpg"
    },
    {
      name: "Neha Gupta",
      role: "Event Planner",
      text: "Amazing service for event transportation. Always on time and very accommodating.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/2.jpg"
    }
  ];

  const steps = [
    {
      icon: FaCalendarAlt,
      title: "Choose Package",
      description: "Select hourly, daily, or weekly plan"
    },
    {
      icon: FaMapMarkerAlt,
      title: "Set Location",
      description: "Specify pickup and drop locations"
    },
    {
      icon: FaUserTie,
      title: "Select Driver",
      description: "Choose preferred driver or let us assign"
    },
    {
      icon: FaWallet,
      title: "Make Payment",
      description: "Secure payment with multiple options"
    }
  ];

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-orange-50/30"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF991C]/10 to-[#FF5C00]/10 rounded-full px-4 py-2 mb-4 backdrop-blur-sm border border-[#FF991C]/20">
            <FaUserTie className="text-[#FF5C00] text-lg animate-pulse" />
            <span className="text-[#FF5C00] font-semibold text-sm">Professional Service</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Rent a{' '}
            <span className="bg-gradient-to-r from-[#FF991C] to-[#FF5C00] bg-clip-text text-transparent">
              Professional Driver
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Get a verified, experienced driver for your vehicle. Perfect for long trips, daily commute, or special occasions
          </p>
        </div>

        {/* How It Works - Steps */}
        <div className="mb-15">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">How It Works</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div 
                  key={index}
                  className={`relative text-center group cursor-pointer p-5 rounded-lg border-2 border-[var(--primary-orange)] transition-all duration-300
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#FF991C]/10 to-[#FF5C00]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="text-[var(--primary-orange)] text-2xl" />
                  </div>
                  <div className="absolute top-8 -right-6 hidden lg:block">
                    {index < steps.length - 1 && (
                      <FaArrowRight className="text-[var(--primary-orange)] text-xl" />
                    )}
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">{step.title}</h4>
                  <p className="text-sm text-gray-500">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-in {
          animation: slideIn 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default RentADriver;