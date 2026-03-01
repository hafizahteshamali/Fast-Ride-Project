// Header.jsx - Updated with CSS variables (Dropdown Removed)
import React, { useState, useEffect } from "react";
import { 
  FaBars, 
  FaTimes, 
  FaUserCircle, 
  FaMotorcycle,
  FaHeadset,
  FaClock,
  FaMapMarkerAlt,
  FaPhone
} from "react-icons/fa";
import { NavigationsData } from "../assets/ConstantData";
import { NavLink, useLocation } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const headerClasses = `sticky top-0 z-50 transition-all duration-300 ${
    scrolled 
      ? "bg-[var(--bg-white-95)] backdrop-blur-md shadow-lg py-2" 
      : "bg-[var(--white)] shadow-sm py-3"
  } border-b border-[var(--gray-200)]`;

  const navLinkClasses = ({ isActive }) => 
    `relative font-medium transition-all duration-200 px-3 py-2 rounded-lg ${
      isActive 
        ? "text-[var(--indigo-600)] bg-[var(--indigo-50)]" 
        : "text-[var(--gray-700)] hover:text-[var(--indigo-600)] hover:bg-[var(--indigo-50)]/50"
    }`;

  return (
    <header className={headerClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar with contact info - Hidden on mobile */}
        <div className="hidden lg:flex justify-between items-center pt-2 mb-2 border-b border-[var(--gray-200)] text-sm">
          <div className="flex items-center gap-4 text-[var(--gray-600)]">
            <div className="flex items-center gap-1">
              <FaMapMarkerAlt className="text-[var(--indigo-600)] text-xs" />
              <span>Serving 50+ cities</span>
            </div>
            <div className="flex items-center gap-1">
              <FaClock className="text-[var(--indigo-600)] text-xs" />
              <span>24/7 Service</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:+18001234567" className="flex items-center gap-2 text-[var(--indigo-600)] hover:text-[var(--indigo-700)] font-medium">
              <FaPhone className="text-sm" />
              <span>1-800-123-4567</span>
            </a>
          </div>
        </div>

        {/* Main Header Content */}
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <NavLink to="/" className="flex items-center gap-3 group cursor-pointer">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--indigo-600)] via-[var(--indigo-500)] to-[var(--violet-600)] flex items-center justify-center text-[var(--white)] shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <FaMotorcycle size={24} className="transform group-hover:rotate-12 transition-transform" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[var(--green-400)] rounded-full border-2 border-[var(--white)]"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-[var(--indigo-600)] to-[var(--violet-600)] bg-clip-text text-transparent leading-tight">
                TezRide
              </span>
              <span className="text-xs text-[var(--gray-500)] hidden sm:block">Fast & Reliable Delivery</span>
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {NavigationsData.map((nav, index) => (
              <NavLink
                key={index}
                to={nav.url}
                className={navLinkClasses}
              >
                {nav.text}
              </NavLink>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Support Icon */}
            <button className="p-2 text-[var(--gray-600)] hover:text-[var(--indigo-600)] hover:bg-[var(--indigo-50)] rounded-full transition-all relative group">
              <FaHeadset size={20} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--red-500)] text-[var(--white)] text-xs rounded-full flex items-center justify-center">
                3
              </span>
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-[var(--gray-700)] text-[var(--white)] text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Support 24/7
              </span>
            </button>

            {/* Track Order */}
            <button className="flex items-center gap-2 px-4 py-2 text-[var(--gray-700)] hover:text-[var(--indigo-600)] hover:bg-[var(--indigo-50)] rounded-xl font-medium transition-all">
              <FaMapMarkerAlt />
              <span>Track Order</span>
            </button>

            {/* Login/Profile Button */}
            <NavLink
              to="/login"
              className="flex items-center gap-3 bg-gradient-to-r from-[var(--indigo-600)] to-[var(--violet-600)] hover:from-[var(--indigo-700)] hover:to-[var(--violet-700)] text-[var(--white)] px-5 py-2.5 rounded-xl font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 group"
            >
              <FaUserCircle size={20} className="group-hover:rotate-12 transition-transform" />
              <span>Sign In</span>
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-lg bg-[var(--gray-100)] hover:bg-[var(--gray-200)] transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <FaTimes className="text-2xl text-[var(--gray-700)]" />
            ) : (
              <FaBars className="text-2xl text-[var(--gray-700)]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Enhanced */}
      <div 
        className={`lg:hidden fixed inset-0 bg-[var(--black-opacity-50)] z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsOpen(false)}
      >
        <div 
          className={`fixed top-0 right-0 w-full max-w-sm h-full bg-[var(--white)] shadow-2xl transform transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col h-full">
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-5 border-b border-[var(--gray-200)]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--indigo-600)] to-[var(--violet-600)] flex items-center justify-center text-[var(--white)]">
                  <FaMotorcycle />
                </div>
                <span className="text-xl font-bold text-[var(--gray-900)]">TezRide</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-[var(--gray-100)] hover:bg-[var(--gray-200)] transition-colors"
              >
                <FaTimes className="text-[var(--gray-600)]" />
              </button>
            </div>

            {/* Mobile Menu Content */}
            <div className="flex-1 overflow-y-auto py-4">
              {/* Quick Actions */}
              <div className="px-4 mb-4">
                <div className="bg-gradient-to-r from-[var(--indigo-50)] to-[var(--violet-50)] p-4 rounded-xl">
                  <h3 className="font-semibold text-[var(--gray-900)] mb-2">Quick Actions</h3>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-[var(--white)] py-2 px-3 rounded-lg text-[var(--indigo-600)] font-medium text-sm shadow-sm">
                      Track Order
                    </button>
                    <button className="flex-1 bg-[var(--white)] py-2 px-3 rounded-lg text-[var(--indigo-600)] font-medium text-sm shadow-sm">
                      Support
                    </button>
                  </div>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="px-4 space-y-1">
                {NavigationsData.map((nav, index) => (
                  <NavLink
                    key={index}
                    to={nav.url}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-lg font-medium transition-all ${
                        isActive 
                          ? "bg-[var(--indigo-50)] text-[var(--indigo-600)]" 
                          : "text-[var(--gray-700)] hover:bg-[var(--gray-50)]"
                      }`
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    {nav.text}
                  </NavLink>
                ))}
              </div>
            </div>

            {/* Mobile Menu Footer */}
            <div className="border-t border-[var(--gray-200)] p-4 bg-[var(--gray-50)]">
              <div className="flex items-center gap-3 mb-3">
                <FaPhone className="text-[var(--indigo-600)]" />
                <span className="text-sm text-[var(--gray-600)]">24/7 Support:</span>
                <a href="tel:+18001234567" className="text-[var(--indigo-600)] font-semibold text-sm">
                  1-800-123-4567
                </a>
              </div>
              
              <NavLink
                to="/login"
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-[var(--indigo-600)] to-[var(--violet-600)] text-[var(--white)] w-full py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all"
                onClick={() => setIsOpen(false)}
              >
                <FaUserCircle size={20} />
                <span>Sign In / Register</span>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;