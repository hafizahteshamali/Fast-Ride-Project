'use client';

import { useState } from 'react';
import { IoClose, IoMenu } from 'react-icons/io5';
import { Link, NavLink } from 'react-router-dom';
import { NavigationsData } from '../assets/ConstantData';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="text-2xl font-bold">
                <span style={{ color: 'var(--secondary-orange)' }}>Tezz</span>
                <span style={{ color: 'var(--primary-orange)' }}>Ride</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1 items-center">
            {NavigationsData.map((item, index)=>{
              return(
                <NavLink key={index} className="px-4 py-2 rounded-lg text-gray-600 hover:text-primary-orange hover:bg-gray-50 transition text-sm font-medium" to={item.url}>{item.text}</NavLink>
              )
            })}
            <button
              className="px-6 py-2 rounded-lg font-medium transition hover:shadow-lg hover:scale-105"
              style={{ backgroundColor: 'var(--primary-orange)', color: 'white' }}
            >
              Get App
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="md:hidden p-2">
            {isOpen ? <IoClose size={24} /> : <IoMenu  size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden pb-4 space-y-4">
            <a href="#services" className="block text-gray-600 hover:text-primary-orange transition">
              Services
            </a>
            <a href="#about" className="block text-gray-600 hover:text-primary-orange transition">
              About
            </a>
            <a href="#safety" className="block text-gray-600 hover:text-primary-orange transition">
              Safety
            </a>
            <a href="#features" className="block text-gray-600 hover:text-primary-orange transition">
              Features
            </a>
            <button
              className="w-full px-6 py-2 rounded-lg font-medium transition text-white"
              style={{ backgroundColor: 'var(--primary-orange)' }}
            >
              Get App
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}


export default Header