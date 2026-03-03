'use client';

import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaApple, FaGoogle } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--gray-900)' }} className="text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <div className="text-2xl font-bold mb-4">
              <span style={{ color: 'var(--secondary-orange)' }}>Tezz</span>
              <span style={{ color: 'var(--primary-orange)' }}>Ride</span>
            </div>
            <p className="text-sm text-gray-400 mb-6">
              Your trusted mobility and delivery platform. Fast, safe, and affordable.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary-orange transition">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="hover:text-primary-orange transition">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="hover:text-primary-orange transition">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="hover:text-primary-orange transition">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* About Links */}
          <div>
            <h4 className="font-bold text-white mb-4">About</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:text-primary-orange transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-orange transition">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-orange transition">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-orange transition">
                  Press
                </a>
              </li>
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-bold text-white mb-4">Services</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:text-primary-orange transition">
                  Ride
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-orange transition">
                  Delivery
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-orange transition">
                  Money Transfer
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-orange transition">
                  Driver Partners
                </a>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-bold text-white mb-4">Support</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:text-primary-orange transition">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-orange transition">
                  Safety Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-orange transition">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-orange transition">
                  Report a Problem
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Download Section */}
        <div className="border-t border-gray-800 py-12">
          <h4 className="font-bold text-white mb-6 text-center">Download Our App</h4>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="#"
              className="px-6 py-3 rounded-lg font-semibold transition flex items-center justify-center space-x-2 text-white"
              style={{ backgroundColor: 'var(--gray-800)', border: '1px solid var(--primary-orange)' }}
            >
              <FaApple size={20} />
              <span>App Store</span>
            </a>
            <a
              href="#"
              className="px-6 py-3 rounded-lg font-semibold transition flex items-center justify-center space-x-2 text-white"
              style={{ backgroundColor: 'var(--gray-800)', border: '1px solid var(--primary-orange)' }}
            >
              <FaGoogle size={20} />
              <span>Play Store</span>
            </a>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; 2024 TezzRide. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary-orange transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary-orange transition">
              Terms of Service
            </a>
            <a href="#" className="hover:text-primary-orange transition">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
