'use client';

import { useState } from 'react';
import { IoClose, IoMenu } from 'react-icons/io5';
import { Link, NavLink } from 'react-router-dom';
import { NavigationsData } from '../assets/ConstantData';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to get active link styles
  const getActiveStyles = ({ isActive }) => {
    return `px-4 py-2 rounded-lg text-[16px] transition-all duration-300 ${
      isActive 
        ? 'bg-white text-[var(--primary-orange)] font-semibold shadow-md' 
        : 'text-white'
    }`;
  };

  return (
    <header className="sticky top-0 z-50 bg-[var(--primary-orange)] border-b border-gray-200 p-3 shadow-lg">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img src="/assets/images/home/dark-logo.png" className='h-[60px] w-[150px] object-contain' alt="Logo" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1 items-center">
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
              className="px-6 py-2 rounded-lg bg-white text-[var(--primary-orange)] font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 ml-2"
            >
              Get App
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(true)} className="md:hidden p-2 text-white hover:bg-white/20 rounded-lg transition-all duration-300">
            <IoMenu size={28} />
          </button>
        </div>

        {/* Mobile Navigation - Right Side Modal */}
        <div className={isOpen ? "fixed right-0 top-0 bottom-0 h-[100vh] w-full bg-white shadow-xl md:hidden z-50 transform translate-x-[0%] transition-all duration-300 ease-in-out" : "fixed right-0 top-0 bottom-0 h-[100vh] w-full bg-white shadow-xl md:hidden z-50 transform translate-x-[100%] transition-all duration-300 ease-in-out"}>
          {/* Modal Header */}
          <div className="flex justify-between items-center p-5 border-b">
            <Link to="/" className="flex items-center justify-start" onClick={() => setIsOpen(false)}>
              <img src="/assets/images/home/dark-logo.png" className='h-[60px] w-[150px] object-contain' alt="Logo" />
            </Link>
            <button onClick={()=>setIsOpen(false)} className="p-1 bg-[var(--primary-orange)] rounded-full h-[40px] w-[40px] flex justify-center items-center hover:scale-110 transition-all duration-300">
              <IoClose size={24} className="text-white" />
            </button>
          </div>

          {/* Modal Content - Centered both vertically and horizontally */}
          <nav className="h-[calc(100vh-80px)] flex flex-col justify-center items-center px-5">
            <div className="w-full max-w-sm space-y-4">
              {NavigationsData.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.url}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block px-6 py-4 rounded-xl transition-all duration-300 w-full text-left text-lg font-medium ${
                      isActive
                        ? 'bg-[var(--primary-orange)] text-white shadow-lg scale-105'
                        : 'text-gray-700 hover:bg-gray-100 hover:scale-105 hover:shadow-md'
                    }`
                  }
                >
                  <span className="flex items-center">
                    {item.text}
                  </span>
                </NavLink>
              ))}

              <button
                onClick={() => setIsOpen(false)}
                className="w-full px-6 py-4 rounded-xl font-medium transition-all duration-300 text-white bg-[var(--primary-orange)] hover:opacity-90 mt-8 text-center hover:scale-105 hover:shadow-lg"
              >
                Get App
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;