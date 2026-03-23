import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { 
  FaBars, 
  FaBell,
  FaSearch,
  FaUserCircle,
  FaChevronDown
} from 'react-icons/fa';
import Sidebar from '../components/Sidebar';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      {/* Sidebar Component with props */}
      <Sidebar 
        sidebarOpen={sidebarOpen} 
        toggleSidebar={toggleSidebar}
        closeSidebar={closeSidebar}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center space-x-3 sm:space-x-4">
              {/* Menu Button for Mobile */}
              <button
                onClick={toggleSidebar}
                className="lg:hidden text-gray-600 hover:text-[#FF991C] transition-colors p-2 rounded-lg hover:bg-gray-100"
              >
                <FaBars size={22} />
              </button>
              
              <div className="hidden lg:block">
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#FF991C] to-[#FF5C00] bg-clip-text text-transparent">
                  Welcome Back!
                </h1>
                <p className="text-xs text-gray-500 mt-0.5">{currentDate}</p>
              </div>
            </div>

            {/* Search Bar - Hidden on mobile */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-4 lg:mx-8">
              <div className="relative w-full">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search anything..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF991C] focus:border-transparent transition-all duration-200 bg-gray-50"
                />
              </div>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Notifications */}
              <button className="relative text-gray-600 hover:text-[#FF991C] transition-colors p-2 rounded-lg hover:bg-gray-100">
                <FaBell size={20} />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center animate-pulse">
                  3
                </span>
              </button>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-2 sm:space-x-3 hover:bg-gray-100 rounded-lg p-1 sm:p-2 transition-all duration-200"
                >
                  <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-gradient-to-r from-[#FF991C] to-[#FF5C00] flex items-center justify-center shadow-md">
                    <span className="text-white text-xs sm:text-sm font-bold">AD</span>
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-semibold text-gray-800">Admin User</p>
                    <p className="text-xs text-gray-500">Administrator</p>
                  </div>
                  <FaChevronDown size={14} className="text-gray-400 hidden sm:block" />
                </button>

                {/* Dropdown Menu */}
                {showProfileMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowProfileMenu(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 transform transition-all duration-200">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-800">Admin User</p>
                        <p className="text-xs text-gray-500">admin@example.com</p>
                      </div>
                      <button 
                        onClick={() => {
                          setShowProfileMenu(false);
                          // Add logout logic
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center space-x-2"
                      >
                        <FaSignOutAlt size={16} />
                        <span>Logout</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden px-4 pb-3">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-9 pr-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF991C] text-sm"
              />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="p-4">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;