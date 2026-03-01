// components/Footer.jsx
import React, { useState } from 'react'
import { 
  FaMotorcycle, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn, 
  FaYoutube,
  FaApple,
  FaGooglePlay,
  FaArrowRight,
  FaHeart,
  FaShieldAlt,
  FaClock,
  FaCreditCard,
  FaTruck,
  FaStar
} from 'react-icons/fa'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  const footerLinks = {
    company: [
      { name: 'About Us', url: '/about' },
      { name: 'Careers', url: '/careers', badge: 'Hiring' },
      { name: 'Blog', url: '/blog' },
      { name: 'Press', url: '/press' },
      { name: 'Contact Us', url: '/contact' }
    ],
    services: [
      { name: 'Bike Delivery', url: '/services/bike' },
      { name: 'Express Delivery', url: '/services/express' },
      { name: 'Package Delivery', url: '/services/package' },
      { name: 'Freight Service', url: '/services/freight' },
      { name: 'Document Delivery', url: '/services/document' },
      { name: 'Gift Delivery', url: '/services/gift' }
    ],
    support: [
      { name: 'Help Center', url: '/help' },
      { name: 'FAQs', url: '/faqs' },
      { name: 'Track Order', url: '/track' },
      { name: 'Shipping Info', url: '/shipping' },
      { name: 'Returns Policy', url: '/returns' },
      { name: 'Terms & Conditions', url: '/terms' }
    ],
    cities: [
      { name: 'Mumbai', url: '/mumbai' },
      { name: 'Delhi', url: '/delhi' },
      { name: 'Bangalore', url: '/bangalore' },
      { name: 'Chennai', url: '/chennai' },
      { name: 'Kolkata', url: '/kolkata' },
      { name: 'Pune', url: '/pune' }
    ]
  }

  const socialLinks = [
    { icon: FaFacebookF, url: 'https://facebook.com', name: 'Facebook' },
    { icon: FaTwitter, url: 'https://twitter.com', name: 'Twitter' },
    { icon: FaInstagram, url: 'https://instagram.com', name: 'Instagram' },
    { icon: FaLinkedinIn, url: 'https://linkedin.com', name: 'LinkedIn' },
    { icon: FaYoutube, url: 'https://youtube.com', name: 'YouTube' }
  ]

  const features = [
    { icon: FaShieldAlt, text: 'Safe Delivery', color: 'indigo' },
    { icon: FaClock, text: '24/7 Support', color: 'violet' },
    { icon: FaCreditCard, text: 'Secure Payment', color: 'indigo' },
    { icon: FaTruck, text: 'Fast Delivery', color: 'violet' }
  ]

  return (
    <footer className="bg-[var(--gray-900)] text-[var(--gray-300)] relative">
      {/* Top Decorative Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--indigo-600)] via-[var(--violet-600)] to-[var(--indigo-600)]"></div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="py-16 border-b border-[var(--gray-800)]">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-[var(--gray-800)] px-4 py-2 rounded-full mb-4">
              <FaStar className="text-[var(--indigo-600)]" />
              <span className="text-sm font-medium text-[var(--gray-300)]">Join 50,000+ Subscribers</span>
            </div>
            
            <h3 className="text-2xl lg:text-3xl font-bold text-[var(--white)] mb-3">
              Stay Updated with TezRide
            </h3>
            
            <p className="text-[var(--gray-400)] mb-6 max-w-2xl mx-auto">
              Subscribe to get special offers, free giveaways, and exclusive deals directly in your inbox.
            </p>
            
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="relative flex-1">
                <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--gray-500)]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-[var(--gray-800)] text-[var(--white)] placeholder-[var(--gray-500)] border border-[var(--gray-700)] focus:outline-none focus:border-[var(--indigo-600)] transition-colors"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-[var(--indigo-600)] to-[var(--violet-600)] hover:from-[var(--indigo-700)] hover:to-[var(--violet-700)] text-[var(--white)] rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 group whitespace-nowrap"
              >
                <span>Subscribe</span>
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            {/* Success Message */}
            {subscribed && (
              <div className="mt-4 p-3 bg-green-500 text-[var(--white)] rounded-lg text-sm">
                Successfully subscribed! Thank you for joining.
              </div>
            )}
          </div>
        </div>

        {/* Links Grid */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[var(--indigo-600)] to-[var(--violet-600)] flex items-center justify-center">
                <FaMotorcycle className="text-[var(--white)] text-xl" />
              </div>
              <span className="text-xl font-bold text-[var(--white)]">TezRide</span>
            </div>
            
            <p className="text-sm text-[var(--gray-400)] mb-6 leading-relaxed">
              India's fastest growing pick & drop service. We deliver happiness to your doorstep with speed and care.
            </p>

            {/* Features Mini Grid */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div key={index} className="flex items-center gap-2 text-xs">
                    <div className={`w-6 h-6 rounded-full bg-[var(--${feature.color}-100)] flex items-center justify-center`}>
                      <Icon className={`text-[var(--${feature.color}-600)]`} size={12} />
                    </div>
                    <span className="text-[var(--gray-300)]">{feature.text}</span>
                  </div>
                )
              })}
            </div>

            {/* Contact Info */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-[var(--indigo-600)] text-xs" />
                <span className="text-[var(--gray-400)]">123 Business Park, Mumbai</span>
              </div>
              <div className="flex items-center gap-2">
                <FaPhone className="text-[var(--violet-600)] text-xs" />
                <a href="tel:+18001234567" className="text-[var(--gray-400)] hover:text-[var(--white)] transition-colors">
                  1-800-123-4567
                </a>
              </div>
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-[var(--indigo-600)] text-xs" />
                <a href="mailto:support@tezride.com" className="text-[var(--gray-400)] hover:text-[var(--white)] transition-colors">
                  support@tezride.com
                </a>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-[var(--white)] font-semibold text-base mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    className="text-sm text-[var(--gray-400)] hover:text-[var(--indigo-600)] transition-colors flex items-center gap-2"
                  >
                    {link.name}
                    {link.badge && (
                      <span className="text-[10px] px-2 py-0.5 bg-gradient-to-r from-[var(--indigo-600)] to-[var(--violet-600)] text-[var(--white)] rounded-full">
                        {link.badge}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-[var(--white)] font-semibold text-base mb-4">Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.slice(0, 5).map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    className="text-sm text-[var(--gray-400)] hover:text-[var(--violet-600)] transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li>
                <a href="/services" className="text-sm text-[var(--indigo-600)] hover:text-[var(--violet-600)] transition-colors font-medium">
                  View All →
                </a>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-[var(--white)] font-semibold text-base mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    className="text-sm text-[var(--gray-400)] hover:text-[var(--indigo-600)] transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Cities & App */}
          <div>
            <h3 className="text-[var(--white)] font-semibold text-base mb-4">We're in</h3>
            <ul className="space-y-2 mb-4">
              {footerLinks.cities.slice(0, 4).map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    className="text-sm text-[var(--gray-400)] hover:text-[var(--violet-600)] transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            {/* App Store Buttons */}
            <div className="space-y-2">
              <button className="flex items-center gap-2 bg-[var(--gray-800)] hover:bg-[var(--gray-700)] text-[var(--white)] px-3 py-2 rounded-lg transition-colors w-full">
                <FaApple size={18} />
                <div className="text-left">
                  <div className="text-[8px] text-[var(--gray-400)]">Download on</div>
                  <div className="text-xs font-semibold">App Store</div>
                </div>
              </button>
              <button className="flex items-center gap-2 bg-[var(--gray-800)] hover:bg-[var(--gray-700)] text-[var(--white)] px-3 py-2 rounded-lg transition-colors w-full">
                <FaGooglePlay size={16} />
                <div className="text-left">
                  <div className="text-[8px] text-[var(--gray-400)]">Get it on</div>
                  <div className="text-xs font-semibold">Google Play</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-[var(--gray-800)]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-xs text-[var(--gray-500)] text-center md:text-left">
              © {new Date().getFullYear()} TezRide. All rights reserved. Made with{" "}
              <FaHeart className="inline text-red-500 text-xs" /> in India
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-[var(--gray-800)] hover:bg-gradient-to-r hover:from-[var(--indigo-600)] hover:to-[var(--violet-600)] flex items-center justify-center transition-all group"
                    aria-label={social.name}
                  >
                    <Icon className="text-[var(--gray-400)] group-hover:text-[var(--white)] text-sm" />
                  </a>
                )
              })}
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-4 text-xs">
              <a href="/privacy" className="text-[var(--gray-500)] hover:text-[var(--white)] transition-colors">
                Privacy
              </a>
              <a href="/terms" className="text-[var(--gray-500)] hover:text-[var(--white)] transition-colors">
                Terms
              </a>
              <a href="/cookies" className="text-[var(--gray-500)] hover:text-[var(--white)] transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer