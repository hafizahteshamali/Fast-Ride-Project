'use client';

import { useState, useEffect } from 'react';
import { IoClose, IoMenu } from 'react-icons/io5';
import { Link, NavLink } from 'react-router-dom';
import { NavigationsData } from '../assets/ConstantData';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Function to get active link styles for desktop
  const getActiveStyles = ({ isActive }) => {
    return `px-3 lg:px-4 py-2 rounded-lg text-sm lg:text-base transition-all duration-300 whitespace-nowrap ${
      isActive 
        ? 'bg-white text-[var(--primary-orange)] font-semibold shadow-md' 
        : 'text-white hover:bg-white/10'
    }`;
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[var(--primary-orange)] shadow-xl py-1 md:py-2' 
          : 'bg-[var(--primary-orange)] py-2 md:py-3'
      } border-b border-gray-200/20`}>
        <div className="w-full sm:px-6 md:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0">
              <Link to="/" className="flex items-center justify-start">
                <img 
                  src="/assets/images/home/white_logo_img.png" 
                  className='h-[50px] sm:h-[60px] md:h-[70px] md:w-[200px] w-[150px] object-contain' 
                  alt="Logo" 
                />
              </Link>
            </div>

            {/* Desktop Navigation - Hidden on tablet and below */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {NavigationsData.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.url}
                  className={getActiveStyles}
                >
                  {item.text}
                </NavLink>
              ))}
              <button
                className="px-4 xl:px-6 py-2 rounded-lg bg-white text-[var(--primary-orange)] font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 ml-2 text-sm xl:text-base whitespace-nowrap"
              >
                Get App
              </button>
            </nav>

            {/* Tablet Navigation - Visible on medium screens */}
            <nav className="hidden md:flex lg:hidden items-center space-x-1">
              {NavigationsData.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.url}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg text-sm transition-all duration-300 whitespace-nowrap ${
                      isActive 
                        ? 'bg-white text-[var(--primary-orange)] font-semibold shadow-md' 
                        : 'text-white hover:bg-white/10'
                    }`
                  }
                >
                  {item.text}
                </NavLink>
              ))}
              <button
                className="px-4 py-2 rounded-lg bg-white text-[var(--primary-orange)] font-medium transition-all duration-300 hover:shadow-lg text-sm whitespace-nowrap"
              >
                App
              </button>
            </nav>

            {/* Mobile Menu Button - Visible on small screens */}
            <button 
              onClick={() => setIsOpen(true)} 
              className="md:hidden p-2 text-white hover:bg-white/20 rounded-lg transition-all duration-300"
            >
              <IoMenu size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Slide-in Modal */}
        <div className={`
          fixed inset-y-0 right-0 w-full sm:w-[400px] bg-white shadow-2xl z-50 
          transition-all duration-300 ease-in-out transform
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
          lg:hidden
        `}>
          {/* Modal Header */}
          <div className="flex justify-between items-center py-4 sm:p-5 border-b border-[var(--primary-orange)]">
            <Link to="/" className="flex items-center" onClick={() => setIsOpen(false)}>
              <img 
                src="/assets/images/home/dark_logo_img.png" 
                className='h-[50px] sm:h-[60px] w-[200px] object-contain' 
                alt="Logo" 
              />
            </Link>
            <button 
              onClick={() => setIsOpen(false)} 
              className="p-2 bg-[var(--primary-orange)] rounded-full h-[40px] w-[40px] flex justify-center items-center hover:scale-110 transition-all duration-300"
            >
              <IoClose size={24} className="text-white" />
            </button>
          </div>

          {/* Modal Content - Scrollable */}
          <div className="h-[calc(100vh-80px)] overflow-y-auto">
            <nav className="flex flex-col justify-between min-h-full">
              <div className="flex-1 py-6 px-4 sm:px-6">
                <div className="space-y-2">
                  {NavigationsData.map((item, index) => (
                    <NavLink
                      key={index}
                      to={item.url}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `block px-4 sm:px-6 py-3 sm:py-4 rounded-xl transition-all duration-300 text-base sm:text-lg font-medium ${
                          isActive
                            ? 'bg-[var(--primary-orange)] text-white shadow-lg'
                            : 'text-gray-700 hover:bg-gray-100 hover:scale-105 hover:shadow-md'
                        }`
                      }
                    >
                      <span className="flex items-center">
                        {item.text}
                      </span>
                    </NavLink>
                  ))}
                </div>
              </div>

              {/* Bottom Section with Get App Button */}
              <div className="p-4 sm:p-6 border-t border-gray-200">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    // Add your app download logic here
                  }}
                  className="w-full px-6 py-3 sm:py-4 rounded-xl font-medium transition-all duration-300 text-white bg-[var(--primary-orange)] hover:opacity-90 text-center text-base sm:text-lg"
                >
                  Get App
                </button>
              </div>
            </nav>
          </div>
        </div>

        {/* Backdrop Overlay for Mobile Menu */}
        {isOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300"
            onClick={() => setIsOpen(false)}
          />
        )}
      </header>
    </>
  );
};

export default Header;