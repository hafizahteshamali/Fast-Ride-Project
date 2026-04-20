import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  FaTimes,
  FaSignOutAlt,
  FaChevronDown,
  FaChevronRight
} from 'react-icons/fa';
import { sidebarLinks } from '../assets/ConstantData';

const Sidebar = ({ sidebarOpen, toggleSidebar, closeSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openDropdowns, setOpenDropdowns] = useState({});

  // Load saved dropdown states from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('sidebarDropdowns');
    if (savedState) {
      setOpenDropdowns(JSON.parse(savedState));
    }
  }, []);

  // Save dropdown states to localStorage
  useEffect(() => {
    localStorage.setItem('sidebarDropdowns', JSON.stringify(openDropdowns));
  }, [openDropdowns]);

  // Auto-open dropdown if any child route is active
  useEffect(() => {
    const newOpenState = { ...openDropdowns };
    let hasChanges = false;

    sidebarLinks.forEach(link => {
      if (link.hasDropdown && link.dropdownItems.length > 0) {
        const isChildActive = link.dropdownItems.some(item => 
          location.pathname === item.url || location.pathname.startsWith(item.url + '/')
        );
        
        if (isChildActive && !openDropdowns[link.id]) {
          newOpenState[link.id] = true;
          hasChanges = true;
        }
      }
    });

    if (hasChanges) {
      setOpenDropdowns(newOpenState);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('adminUser');
    sessionStorage.clear();
    navigate('/auth/login');
  };

  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      closeSidebar();
    }
  };

  const toggleDropdown = (id) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Check if any dropdown item is active
  const isDropdownActive = (link) => {
    return link.dropdownItems.some(item => 
      location.pathname === item.url || location.pathname.startsWith(item.url + '/')
    );
  };

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-20 lg:hidden transition-all duration-300"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-all duration-300 ease-in-out w-72 bg-gradient-to-b from-gray-900 to-gray-800 shadow-2xl z-30 flex flex-col h-full`}
      >
        {/* Logo Section */}
        <div className="flex-shrink-0 flex items-center justify-between p-5 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#FF991C] to-[#FF5C00] flex items-center justify-center shadow-lg transform transition-transform hover:scale-105">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <div>
              <span className="text-xl font-bold text-white tracking-wide">AdminPanel</span>
              <p className="text-xs text-gray-400 mt-0.5">Management System</p>
            </div>
          </div>
          {/* Close Button for Mobile */}
          <button
            onClick={closeSidebar}
            className="lg:hidden text-gray-400 hover:text-white transition-colors"
          >
            <FaTimes size={22} />
          </button>
        </div>

        {/* Navigation Links - Scrollable area */}
        <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hide">
          <nav className="py-6">
            <ul className="space-y-1.5 px-3">
              {sidebarLinks.map((link) => {
                const Icon = link.icon;
                const isOpen = openDropdowns[link.id];
                const hasDropdown = link.hasDropdown && link.dropdownItems.length > 0;
                const isActiveParent = isDropdownActive(link);
                
                return (
                  <li key={link.id}>
                    {/* Main Menu Item */}
                    <div>
                      {hasDropdown ? (
                        <button
                          onClick={() => toggleDropdown(link.id)}
                          className={`w-full group relative flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ${
                            isActiveParent
                              ? 'bg-gradient-to-r from-[#FF991C]/20 to-[#FF5C00]/20 text-[#FF991C]'
                              : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <Icon size={20} className={`transition-all duration-300 ${
                              isActiveParent ? 'text-[#FF991C]' : 'text-gray-400 group-hover:text-white'
                            }`} />
                            <span className="font-medium text-sm">{link.title}</span>
                          </div>
                          {isOpen ? (
                            <FaChevronDown size={14} className="transition-transform duration-200" />
                          ) : (
                            <FaChevronRight size={14} className="transition-transform duration-200" />
                          )}
                        </button>
                      ) : (
                        <NavLink
                          to={link.url}
                          end={link.url === '/admin/dashboard'}
                          onClick={handleLinkClick}
                          className={({ isActive }) =>
                            `group relative flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                              isActive
                                ? 'bg-gradient-to-r from-[#FF991C] to-[#FF5C00] text-white shadow-lg shadow-orange-500/20'
                                : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                            }`
                          }
                        >
                          {({ isActive }) => (
                            <>
                              <Icon 
                                size={20} 
                                className={`transition-all duration-300 ${
                                  isActive 
                                    ? 'text-white scale-110' 
                                    : 'text-gray-400 group-hover:text-white group-hover:scale-105'
                                }`} 
                              />
                              <span className="font-medium text-sm">{link.title}</span>
                            </>
                          )}
                        </NavLink>
                      )}
                    </div>

                    {/* Dropdown Menu */}
                    {hasDropdown && isOpen && (
                      <ul className="mt-1 ml-3 space-y-1 pl-3 overflow-hidden transition-all duration-200">
                        {link.dropdownItems.map((item) => {
                          const ItemIcon = item.icon;
                          return (
                            <li key={item.id}>
                              <NavLink
                                to={item.url}
                                onClick={handleLinkClick}
                                className={({ isActive }) =>
                                  `flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                                    isActive
                                      ? 'bg-gradient-to-r from-[#FF991C] to-[#FF5C00] text-white shadow-md'
                                      : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
                                  }`
                                }
                              >
                                {({ isActive }) => (
                                  <>
                                    <ItemIcon size={14} className={isActive ? 'text-white' : ''} />
                                    <span className="text-xs">{item.title}</span>
                                    {isActive && (
                                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                    )}
                                  </>
                                )}
                              </NavLink>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Logout Button */}
        <div className="flex-shrink-0 p-5 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-gradient-to-r from-[#FF991C] to-[#FF5C00] hover:from-[#FF5C00] hover:to-[#FF991C] transition-all duration-300 group shadow-lg hover:shadow-xl"
          >
            <span className="text-white font-medium">Logout</span>
            <FaSignOutAlt className="text-white group-hover:translate-x-1 transition-transform duration-200" size={18} />
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;