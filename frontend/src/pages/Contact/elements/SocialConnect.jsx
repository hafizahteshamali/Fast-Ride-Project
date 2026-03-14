'use client';

import { useState } from 'react';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn, 
  FaYoutube, 
  FaTiktok,
  FaEnvelope,
  FaBell,
  FaShare,
  FaHeart,
  FaComment,
  FaEye
} from 'react-icons/fa';

const socialLinks = [
  { 
    icon: FaFacebookF, 
    name: 'Facebook', 
    url: 'https://facebook.com/tezzride', 
    color: '#1877F2',
    bgColor: 'rgba(24, 119, 242, 0.1)',
    followers: '50k+',
    engagement: '2.5k',
    posts: '1.2k'
  },
  { 
    icon: FaTwitter, 
    name: 'Twitter', 
    url: 'https://twitter.com/tezzride', 
    color: '#1DA1F2',
    bgColor: 'rgba(29, 161, 242, 0.1)',
    followers: '25k+',
    engagement: '1.8k',
    posts: '890'
  },
  { 
    icon: FaInstagram, 
    name: 'Instagram', 
    url: 'https://instagram.com/tezzride', 
    color: '#E4405F',
    bgColor: 'rgba(228, 64, 95, 0.1)',
    followers: '100k+',
    engagement: '5.2k',
    posts: '2.1k'
  },
  { 
    icon: FaLinkedinIn, 
    name: 'LinkedIn', 
    url: 'https://linkedin.com/company/tezzride', 
    color: '#0A66C2',
    bgColor: 'rgba(10, 102, 194, 0.1)',
    followers: '30k+',
    engagement: '1.2k',
    posts: '450'
  },
  { 
    icon: FaYoutube, 
    name: 'YouTube', 
    url: 'https://youtube.com/tezzride', 
    color: '#FF0000',
    bgColor: 'rgba(255, 0, 0, 0.1)',
    followers: '40k+',
    engagement: '3.8k',
    videos: '120'
  },
  { 
    icon: FaTiktok, 
    name: 'TikTok', 
    url: 'https://tiktok.com/@tezzride', 
    color: '#000000',
    bgColor: 'rgba(0, 0, 0, 0.1)',
    followers: '60k+',
    engagement: '4.5k',
    videos: '350'
  }
];

export default function SocialConnect() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <section className="relative py-24 px-4 md:px-8 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      </div>

      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, var(--gray-400) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header with Animation */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-lg mb-6">
            <div className="relative">
              <FaShare className="text-orange-500 w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
            </div>
            <span className="text-sm font-bold text-gray-700">Join Our Community</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            Connect With{' '}
            <span className="relative">
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">Us</span>
              <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 100 8" fill="none">
                <path d="M0 4L100 4" stroke="url(#gradient)" strokeWidth="4" strokeDasharray="4 4"/>
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FF991C" />
                    <stop offset="100%" stopColor="#FF5C00" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h2>
          
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Follow us on social media for real-time updates, exclusive content, and special offers
          </p>

          {/* Live Stats Counter */}
          <div className="flex justify-center items-center gap-8 mt-8">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-500">305k+ Total Followers</span>
            </div>
            <div className="flex items-center gap-2">
              <FaHeart className="text-red-500 w-4 h-4" />
              <span className="text-sm text-gray-500">15k+ Engagements</span>
            </div>
            <div className="flex items-center gap-2">
              <FaEye className="text-blue-500 w-4 h-4" />
              <span className="text-sm text-gray-500">2M+ Monthly Views</span>
            </div>
          </div>
        </div>

        {/* Social Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Card Glow Effect */}
              <div 
                className="absolute inset-0 rounded-3xl transition-all duration-500 opacity-0 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${social.color}40, transparent 70%)`,
                  filter: 'blur(15px)'
                }}
              />

              {/* Main Card */}
              <div className="relative bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden">
                {/* Animated Background Pattern */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(45deg, ${social.color}20 25%, transparent 25%, transparent 50%, ${social.color}20 50%, ${social.color}20 75%, transparent 75%, transparent)`,
                    backgroundSize: '20px 20px'
                  }}
                />

                {/* Icon Container */}
                <div className="relative mb-4">
                  <div 
                    className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300"
                    style={{ 
                      backgroundColor: social.bgColor,
                      color: social.color,
                      boxShadow: `0 10px 20px -5px ${social.color}40`
                    }}
                  >
                    <social.icon size={28} />
                  </div>

                  {/* Live Indicator */}
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white">
                    <span className="absolute inset-0 rounded-full bg-green-500 animate-ping"></span>
                  </div>
                </div>

                {/* Stats */}
                <div className="text-center">
                  <h3 className="font-bold text-gray-800 text-lg mb-1 group-hover:text-orange-500 transition-colors">
                    {social.name}
                  </h3>
                  
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-2xl font-bold" style={{ color: social.color }}>
                      {social.followers}
                    </span>
                  </div>

                  {/* Engagement Stats (Visible on Hover) */}
                  <div className={`space-y-2 transition-all duration-300 ${
                    hoveredIndex === index ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 overflow-hidden'
                  }`}>
                    <div className="flex items-center justify-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <FaHeart className="text-red-400" />
                        {social.engagement}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaComment className="text-blue-400" />
                        {social.posts || social.videos}
                      </span>
                    </div>
                  </div>

                  {/* Follow Button */}
                  <div className="mt-3">
                    <span 
                      className="inline-block px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 group-hover:scale-105"
                      style={{
                        backgroundColor: social.color,
                        color: 'white'
                      }}
                    >
                      Follow
                    </span>
                  </div>
                </div>

                {/* Corner Decoration */}
                <div 
                  className="absolute -bottom-6 -right-6 w-12 h-12 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"
                  style={{ backgroundColor: social.color }}
                />
              </div>
            </a>
          ))}
        </div>

        {/* Newsletter Section - Enhanced */}
        <div className="mt-20">
          <div className="relative bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 rounded-3xl p-1">
            <div className="absolute inset-0 bg-white/10 rounded-3xl backdrop-blur-sm"></div>
            
            <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                {/* Left Content */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-full mb-4">
                    <FaBell className="text-orange-500 w-4 h-4 animate-swing" />
                    <span className="text-sm font-semibold text-orange-600">Never Miss an Update</span>
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                    Stay in the <span className="text-orange-500">Loop</span>
                  </h3>
                  
                  <p className="text-gray-600 mb-4 max-w-lg">
                    Subscribe to our newsletter and be the first to know about new features, 
                    promotions, and exclusive offers.
                  </p>

                  {/* Benefits */}
                  <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Weekly updates</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Exclusive offers</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">No spam</span>
                    </div>
                  </div>
                </div>

                {/* Right Content - Form */}
                <div className="flex-1 w-full max-w-md">
                  <form onSubmit={handleSubscribe} className="space-y-3">
                    <div className="relative">
                      <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        required
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 transition-all"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 group"
                    >
                      <span>Subscribe Now</span>
                      <FaEnvelope className="group-hover:rotate-12 transition-transform" />
                    </button>

                    {subscribed && (
                      <div className="bg-green-50 text-green-600 p-3 rounded-xl text-sm flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span>Thanks for subscribing! Check your inbox for confirmation.</span>
                      </div>
                    )}
                  </form>

                  <p className="text-xs text-gray-400 text-center mt-3">
                    By subscribing, you agree to our Privacy Policy and Terms of Service.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Join <span className="font-bold text-orange-500">300,000+</span> followers across all platforms
          </p>
          <div className="flex justify-center items-center gap-4 mt-4">
            {socialLinks.slice(0, 6).map((social, index) => (
              <div key={index} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: social.bgColor }}>
                <social.icon style={{ color: social.color }} size={14} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes swing {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }
        .animate-swing {
          animation: swing 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}