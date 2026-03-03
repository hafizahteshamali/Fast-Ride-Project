'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  FaUsers, 
  FaGlobeAmericas, 
  FaHandshake,
  FaHeart,
  FaRocket,
  FaMapMarkedAlt,
  FaMotorcycle,
  FaChartLine,
  FaQuoteRight,
  FaStar,
  FaAward,
  FaUsersCog,
  FaBullseye,
  FaEye
} from 'react-icons/fa';

export default function About() {
  const [activeValue, setActiveValue] = useState(null);
  const [counts, setCounts] = useState({
    users: 0,
    drivers: 0,
    rides: 0
  });
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const values = [
    {
      icon: <FaUsers size={32} />,
      title: 'User-Centric',
      description: 'Every decision we make is driven by what\'s best for our users. Your feedback shapes our platform.',
      color: '#FF991C',
      stats: '98% satisfaction rate',
      highlight: '1M+ daily active users'
    },
    {
      icon: <FaGlobeAmericas size={32} />,
      title: 'Accessible to All',
      description: 'We believe mobility should be affordable and accessible to everyone in Pakistan.',
      color: '#FF5C00',
      stats: '50+ cities covered',
      highlight: '24/7 service availability'
    },
    {
      icon: <FaHandshake size={32} />,
      title: 'Partnership First',
      description: 'We work closely with drivers, merchants, and partners to create a thriving ecosystem.',
      color: '#FF991C',
      stats: '50K+ partners',
      highlight: '95% partner retention'
    },
  ];

  const milestones = [
    { year: '2020', event: 'TezzRide Founded', icon: FaRocket },
    { year: '2021', event: '1M Rides Completed', icon: FaChartLine },
    { year: '2022', event: 'Expanded to 50+ Cities', icon: FaMapMarkedAlt },
    { year: '2023', event: '10M+ Downloads', icon: FaHeart },
    { year: '2024', event: '100K+ Partner Network', icon: FaUsersCog },
  ];

  const teamMembers = [
    { name: 'Ahmed Khan', role: 'CEO & Co-founder', quote: 'Building Pakistan\'s mobility future' },
    { name: 'Sara Ali', role: 'Head of Operations', quote: 'Making every ride count' },
    { name: 'Usman Malik', role: 'CTO', quote: 'Innovation at your service' },
    { name: 'Fatima Hassan', role: 'Customer Experience', quote: 'Your happiness, our mission' },
  ];

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
      const steps = 60;
      const interval = duration / steps;
      
      let currentStep = 0;
      
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setCounts({
          users: Math.min(Math.round(2.5 * progress), 2.5),
          drivers: Math.min(Math.round(55 * progress), 55),
          rides: Math.min(Math.round(18 * progress), 18)
        });

        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, interval);

      return () => clearInterval(timer);
    }
  }, [isVisible]);

  return (
    <section id="about" className="relative py-24 overflow-hidden bg-white" ref={sectionRef}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#FF991C] rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-[#FF5C00] rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-40 left-20 animate-bounce">
        <div className="w-16 h-16 bg-[#FFF1E0] rounded-2xl rotate-12 opacity-20"></div>
      </div>
      <div className="absolute bottom-40 right-20 animate-bounce delay-700">
        <div className="w-20 h-20 bg-[#FFE4D4] rounded-3xl -rotate-12 opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FFF1E0] to-[#FFE4D4] px-4 py-2 rounded-full mb-4 border border-[#FF991C] border-opacity-30">
            <FaHeart className="text-[#FF991C] animate-pulse" />
            <span className="text-[#FF991C] font-semibold text-sm uppercase tracking-wider">
              Who We Are
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gray-900">About </span>
            <span className="relative">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF991C] to-[#FF5C00]">
                TezzRide
              </span>
              <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8">
                <path d="M0,4 Q50,8 100,4 T200,4" stroke="#FF991C" fill="none" strokeWidth="2"/>
              </svg>
            </span>
          </h2>
          
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
            We are Pakistan's fastest-growing mobility and delivery platform, connecting millions of users daily
          </p>
        </div>

        {/* Stats Counter Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF991C] to-[#FF5C00] opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity"></div>
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#FFF1E0] to-[#FFE4D4] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FaUsers className="text-3xl text-[#FF991C]" />
              </div>
              <div className="text-5xl font-bold text-gray-900 mb-2 group-hover:text-[#FF991C] transition-colors">
                {counts.users}M+
              </div>
              <div className="text-gray-600 font-medium">Active Users</div>
              <div className="text-sm text-gray-500 mt-2">Across Pakistan</div>
              <div className="mt-4 h-1 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#FF991C] to-[#FF5C00] rounded-full transition-all duration-1000" style={{ width: '85%' }}></div>
              </div>
            </div>
          </div>

          <div className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF5C00] to-[#FF991C] opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity"></div>
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#FFE4D4] to-[#FFF1E0] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FaMotorcycle className="text-3xl text-[#FF5C00]" />
              </div>
              <div className="text-5xl font-bold text-gray-900 mb-2 group-hover:text-[#FF5C00] transition-colors">
                {counts.drivers}K+
              </div>
              <div className="text-gray-600 font-medium">Partner Drivers</div>
              <div className="text-sm text-gray-500 mt-2">Earning opportunities</div>
              <div className="mt-4 h-1 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#FF5C00] to-[#FF991C] rounded-full transition-all duration-1000" style={{ width: '92%' }}></div>
              </div>
            </div>
          </div>

          <div className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF991C] to-[#FF5C00] opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity"></div>
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#FFF1E0] to-[#FFE4D4] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FaChartLine className="text-3xl text-[#FF991C]" />
              </div>
              <div className="text-5xl font-bold text-gray-900 mb-2 group-hover:text-[#FF991C] transition-colors">
                {counts.rides}M+
              </div>
              <div className="text-gray-600 font-medium">Completed Rides</div>
              <div className="text-sm text-gray-500 mt-2">Safe journeys</div>
              <div className="mt-4 h-1 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#FF991C] to-[#FF5C00] rounded-full transition-all duration-1000" style={{ width: '95%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Image Section with Parallax */}
        <div className="mb-20 relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-[#FF991C] to-[#FF5C00] rounded-3xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
          <div className="relative h-[400px] rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF991C] to-[#FF5C00] opacity-90"></div>
            
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-white animate-float"
                  style={{
                    width: Math.random() * 100 + 50,
                    height: Math.random() * 100 + 50,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${Math.random() * 10 + 10}s`,
                  }}
                />
              ))}
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-4">
              <div className="w-20 h-20 rounded-full bg-white bg-opacity-20 backdrop-blur-lg flex items-center justify-center mb-6 animate-bounce">
                <FaUsers size={32} className="text-white" />
              </div>
              <h3 className="text-4xl md:text-5xl font-bold mb-4">Meet Our Team</h3>
              <p className="text-xl opacity-90 max-w-2xl">
                Passionate professionals dedicated to revolutionizing mobility across Pakistan
              </p>
              
              {/* Team Avatars */}
              <div className="flex -space-x-4 mt-8">
                {teamMembers.map((member, index) => (
                  <div
                    key={index}
                    className="w-16 h-16 rounded-full bg-white bg-opacity-20 backdrop-blur-lg border-2 border-white flex items-center justify-center text-white font-bold transform hover:scale-110 hover:-translate-y-2 transition-all duration-300 cursor-pointer group/avatar"
                    title={member.name}
                  >
                    {member.name.charAt(0)}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-white text-gray-900 text-sm rounded-lg p-2 opacity-0 group-hover/avatar:opacity-100 transition-opacity pointer-events-none">
                      <p className="font-bold">{member.name}</p>
                      <p className="text-xs text-gray-600">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Company Story with Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#FFF1E0] rounded-full opacity-50"></div>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#FFE4D4] rounded-full opacity-50"></div>
            
            <div className="relative">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FFF1E0] to-[#FFE4D4] px-4 py-2 rounded-full mb-4">
                <FaRocket className="text-[#FF991C]" />
                <span className="text-[#FF991C] font-semibold text-sm">Our Journey</span>
              </div>
              
              <h3 className="text-3xl font-bold mb-6 text-gray-900">
                From Vision to{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF991C] to-[#FF5C00]">
                  Reality
                </span>
              </h3>
              
              <div className="space-y-4 text-gray-600">
                <p className="leading-relaxed text-lg">
                  Founded with a mission to transform mobility in Pakistan, TezzRide combines cutting-edge technology with local expertise to deliver unparalleled service. We started small but dreamed big—to make every journey safe, affordable, and convenient.
                </p>
                <p className="leading-relaxed text-lg">
                  Today, millions of Pakistanis trust TezzRide for their daily rides, deliveries, and financial needs. We continue to innovate and expand, bringing economic opportunities to drivers and convenience to users across the country.
                </p>
              </div>

              {/* Mission & Vision */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="group p-4 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md hover:shadow-xl transition-all">
                  <FaBullseye className="text-2xl text-[#FF991C] mb-2 group-hover:scale-110 transition-transform" />
                  <h4 className="font-bold text-gray-900">Our Mission</h4>
                  <p className="text-sm text-gray-600">Connect Pakistan through safe, affordable mobility</p>
                </div>
                <div className="group p-4 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md hover:shadow-xl transition-all">
                  <FaEye className="text-2xl text-[#FF5C00] mb-2 group-hover:scale-110 transition-transform" />
                  <h4 className="font-bold text-gray-900">Our Vision</h4>
                  <p className="text-sm text-gray-600">Be Pakistan's most loved everyday platform</p>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-xl">
            <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FaAward className="text-[#FF991C]" />
              Our Milestones
            </h4>
            <div className="space-y-6">
              {milestones.map((milestone, index) => {
                const Icon = milestone.icon;
                return (
                  <div key={index} className="relative flex items-center gap-4 group">
                    <div className="absolute left-6 top-10 w-0.5 h-12 bg-gradient-to-b from-[#FF991C] to-[#FF5C00] opacity-30 group-last:hidden"></div>
                    <div className="relative z-10 w-12 h-12 rounded-xl bg-gradient-to-r from-[#FFF1E0] to-[#FFE4D4] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="text-[#FF991C]" size={20} />
                    </div>
                    <div className="flex-1">
                      <span className="text-sm font-bold text-[#FF991C]">{milestone.year}</span>
                      <p className="font-semibold text-gray-900">{milestone.event}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Achievement Badge */}
            <div className="mt-8 p-4 bg-gradient-to-r from-[#FFF1E0] to-[#FFE4D4] rounded-xl">
              <div className="flex items-center gap-2">
                <FaStar className="text-yellow-500" />
                <span className="font-semibold text-gray-900">Recognized as</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">Pakistan's Most Innovative Startup 2024</p>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold mb-12 text-center">
            <span className="text-gray-900">Our </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF991C] to-[#FF5C00]">
              Core Values
            </span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const isActive = activeValue === index;
              return (
                <div
                  key={index}
                  className="group relative"
                  onMouseEnter={() => setActiveValue(index)}
                  onMouseLeave={() => setActiveValue(null)}
                >
                  <div className={`
                    absolute inset-0 bg-gradient-to-r from-[#FF991C] to-[#FF5C00] rounded-2xl 
                    transition-all duration-500 opacity-0 group-hover:opacity-100 blur-xl
                  `}></div>
                  
                  <div className={`
                    relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl 
                    transition-all duration-500 transform hover:-translate-y-2
                    border-2 ${isActive ? 'border-[#FF991C]' : 'border-transparent'}
                  `}>
                    {/* Icon with Animation */}
                    <div className={`
                      w-20 h-20 rounded-2xl bg-gradient-to-br from-[#FFF1E0] to-[#FFE4D4] 
                      flex items-center justify-center mb-6 mx-auto
                      transform transition-all duration-500
                      ${isActive ? 'scale-110 rotate-6' : 'group-hover:scale-110 group-hover:rotate-3'}
                    `}>
                      <div className={`
                        transition-all duration-500
                        ${isActive ? 'text-[#FF5C00]' : 'text-[#FF991C]'}
                      `}>
                        {value.icon}
                      </div>
                    </div>

                    {/* Content */}
                    <h4 className="text-2xl font-bold text-gray-900 mb-3 text-center">
                      {value.title}
                    </h4>
                    <p className="text-gray-600 text-center mb-4">
                      {value.description}
                    </p>

                    {/* Stats */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">{value.stats}</span>
                        <FaStar className="text-yellow-400" size={12} />
                      </div>
                      <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#FF991C] to-[#FF5C00] rounded-full transition-all duration-1000"
                          style={{ width: isActive ? '100%' : '75%' }}
                        ></div>
                      </div>
                      <p className="text-xs text-[#FF991C] font-semibold mt-2">
                        {value.highlight}
                      </p>
                    </div>

                    {/* Quote Icon */}
                    <div className="absolute bottom-4 right-4 opacity-10">
                      <FaQuoteRight size={40} className="text-[#FF991C]" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#FFF1E0] to-[#FFE4D4] px-6 py-3 rounded-full mb-4">
            <FaHeart className="text-[#FF991C] animate-pulse" />
            <span className="text-gray-700">Join us in shaping the future of mobility</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-[#FF991C] to-[#FF5C00] text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden">
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></span>
              <FaUsers size={20} />
              <span>Join Our Team</span>
            </button>
            
            <button className="group relative inline-flex items-center gap-3 bg-white text-[#FF5C00] px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-[#FF991C] border-opacity-30 overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-r from-[#FF991C] to-[#FF5C00] opacity-0 group-hover:opacity-10 transition-opacity"></span>
              <FaHandshake size={20} />
              <span>Partner With Us</span>
            </button>
          </div>
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
        .delay-700 {
          animation-delay: 0.7s;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </section>
  );
}