import React, { useState, useEffect, useRef } from 'react';
import { 
  FaMapMarkerAlt, 
  FaCar, 
  FaUser, 
  FaCircle, 
  FaCompass,
  FaStreetView,
  FaRoute,
  FaUsers,
  FaClock,
  FaTruck,
  FaLocationArrow,
  FaCheckCircle,
  FaBars,
  FaTimes,
  FaMobile,
  FaDesktop,
  FaTablet,
  FaExpand,
  FaCompress,
  FaEye,
  FaEyeSlash,
  FaChevronRight
} from 'react-icons/fa';

const LiveMap = () => {
  const [activeRides, setActiveRides] = useState([]);
  const [driverPositions, setDriverPositions] = useState([]);
  const [selectedRide, setSelectedRide] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('connecting');
  const [lastUpdate, setLastUpdate] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lng: -74.0060 });
  const [mapZoom, setMapZoom] = useState(12);
  const [showDriverRoutes, setShowDriverRoutes] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileView, setIsMobileView] = useState(false);
  const [fullscreenMap, setFullscreenMap] = useState(false);
  const [showStats, setShowStats] = useState(true);
  const [stats, setStats] = useState({
    totalRides: 0,
    activeDrivers: 0,
    completedRides: 0,
    avgResponseTime: 0
  });

  const mapContainerRef = useRef(null);
  const wsRef = useRef(null);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setIsMobileView(isMobile);
      if (isMobile) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Simulate WebSocket connection
  useEffect(() => {
    initializeWebSocket();
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  const initializeWebSocket = () => {
    setConnectionStatus('connected');
    
    const generateMockData = () => {
      const rides = generateActiveRides();
      const drivers = generateDriverPositions();
      
      setActiveRides(rides);
      setDriverPositions(drivers);
      setLastUpdate(new Date());
      
      setStats({
        totalRides: rides.length,
        activeDrivers: drivers.length,
        completedRides: Math.floor(Math.random() * 50) + 10,
        avgResponseTime: Math.floor(Math.random() * 30) + 15
      });
    };
    
    generateMockData();
    
    const interval = setInterval(() => {
      generateMockData();
    }, Math.random() * 2000 + 3000);
    
    wsRef.current = { close: () => clearInterval(interval) };
  };

  const generateActiveRides = () => {
    const rides = [];
    const rideCount = Math.floor(Math.random() * 8) + 3;
    
    for (let i = 0; i < rideCount; i++) {
      const centerLat = mapCenter.lat;
      const centerLng = mapCenter.lng;
      const offset = 0.05;
      
      rides.push({
        id: `ride_${i}_${Date.now()}`,
        rideId: `RID${String(i + 1).padStart(4, '0')}`,
        status: ['pending', 'accepted', 'in_progress', 'completed'][Math.floor(Math.random() * 4)],
        customer: {
          name: `Customer ${i + 1}`,
          phone: `+1 (555) ${String(Math.floor(Math.random() * 900) + 100)}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
          rating: (Math.random() * 2 + 3).toFixed(1)
        },
        driver: {
          name: `Driver ${i + 1}`,
          vehicle: ['Toyota Camry', 'Honda Accord', 'Tesla Model 3', 'Ford Fusion'][Math.floor(Math.random() * 4)],
          plate: `${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(Math.random() * 9000) + 1000}`,
          rating: (Math.random() * 2 + 3).toFixed(1)
        },
        pickup: {
          lat: centerLat + (Math.random() - 0.5) * offset * 2,
          lng: centerLng + (Math.random() - 0.5) * offset * 2,
          address: `${Math.floor(Math.random() * 900) + 100} Main St, New York, NY`
        },
        dropoff: {
          lat: centerLat + (Math.random() - 0.5) * offset * 2,
          lng: centerLng + (Math.random() - 0.5) * offset * 2,
          address: `${Math.floor(Math.random() * 900) + 100} Broadway, New York, NY`
        },
        fare: `$${(Math.random() * 30 + 10).toFixed(2)}`,
        distance: `${(Math.random() * 10 + 2).toFixed(1)} miles`,
        duration: `${Math.floor(Math.random() * 30) + 10} mins`,
        progress: Math.random() * 100
      });
    }
    
    return rides;
  };

  const generateDriverPositions = () => {
    const drivers = [];
    const driverCount = Math.floor(Math.random() * 15) + 5;
    
    for (let i = 0; i < driverCount; i++) {
      const centerLat = mapCenter.lat;
      const centerLng = mapCenter.lng;
      const offset = 0.08;
      
      drivers.push({
        id: `driver_${i}`,
        driverId: `DRV${String(i + 1).padStart(3, '0')}`,
        name: `Driver ${i + 1}`,
        status: ['available', 'on_ride', 'idle'][Math.floor(Math.random() * 3)],
        position: {
          lat: centerLat + (Math.random() - 0.5) * offset * 2,
          lng: centerLng + (Math.random() - 0.5) * offset * 2,
          heading: Math.random() * 360,
          speed: Math.random() * 30 + 10
        },
        vehicle: {
          type: ['Sedan', 'SUV', 'Luxury', 'Electric'][Math.floor(Math.random() * 4)],
          color: ['White', 'Black', 'Silver', 'Blue'][Math.floor(Math.random() * 4)]
        },
        lastUpdate: new Date()
      });
    }
    
    return drivers;
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return (R * c).toFixed(1);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'available': return 'text-green-500';
      case 'on_ride': return 'text-blue-500';
      case 'idle': return 'text-yellow-500';
      case 'pending': return 'text-orange-500';
      case 'accepted': return 'text-purple-500';
      case 'in_progress': return 'text-indigo-500';
      case 'completed': return 'text-gray-500';
      default: return 'text-gray-500';
    }
  };

  const centerOnUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setMapCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      });
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setFullscreenMap(true);
    } else {
      document.exitFullscreen();
      setFullscreenMap(false);
    }
  };

  // Function to close sidebar
  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  // Function to open sidebar
  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const renderMockMap = () => {
    return (
      <div className="relative w-full h-full bg-gradient-to-br from-gray-100 to-gray-200">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" patternUnits="userSpaceOnUse" width="50" height="50">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="relative">
            <FaLocationArrow className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500 animate-pulse" />
            <div className="absolute top-0 left-0 w-full h-full animate-ping">
              <FaLocationArrow className="w-6 h-6 sm:w-8 sm:h-8 text-orange-300 opacity-75" />
            </div>
          </div>
        </div>
        
        {driverPositions.map((driver) => (
          <div
            key={driver.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-110 z-20"
            style={{
              left: `${50 + (driver.position.lng - mapCenter.lng) * 200}%`,
              top: `${50 + (driver.position.lat - mapCenter.lat) * 200}%`,
            }}
            onClick={() => setSelectedRide(driver)}
          >
            <div className="relative">
              <FaCar className={`w-4 h-4 sm:w-6 sm:h-6 ${getStatusColor(driver.status)}`} />
              <div 
                className="absolute top-0 left-0 w-full h-full rounded-full animate-pulse"
                style={{ transform: `rotate(${driver.position.heading}deg)` }}
              >
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-500 rounded-full absolute -top-1 left-1/2 transform -translate-x-1/2"></div>
              </div>
            </div>
            {!isMobileView && (
              <div className="absolute top-6 sm:top-8 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg px-1.5 py-0.5 sm:px-2 sm:py-1 text-xs whitespace-nowrap">
                {driver.name}
              </div>
            )}
          </div>
        ))}
        
        {activeRides.map((ride) => (
          <div key={ride.id}>
            <div
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20"
              style={{
                left: `${50 + (ride.pickup.lng - mapCenter.lng) * 200}%`,
                top: `${50 + (ride.pickup.lat - mapCenter.lat) * 200}%`,
              }}
              onClick={() => setSelectedRide(ride)}
            >
              <div className="relative">
                <FaMapMarkerAlt className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                <div className="absolute -top-1 -right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </div>
            
            <div
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20"
              style={{
                left: `${50 + (ride.dropoff.lng - mapCenter.lng) * 200}%`,
                top: `${50 + (ride.dropoff.lat - mapCenter.lat) * 200}%`,
              }}
            >
              <FaMapMarkerAlt className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
            </div>
            
            {showDriverRoutes && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <line
                  x1={`${50 + (ride.pickup.lng - mapCenter.lng) * 200}%`}
                  y1={`${50 + (ride.pickup.lat - mapCenter.lat) * 200}%`}
                  x2={`${50 + (ride.dropoff.lng - mapCenter.lng) * 200}%`}
                  y2={`${50 + (ride.dropoff.lat - mapCenter.lat) * 200}%`}
                  stroke="var(--primary-orange)"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  className="opacity-50"
                />
              </svg>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={`h-screen flex flex-col ${fullscreenMap ? 'fixed inset-0 z-50 bg-white' : ''}`}>
      {/* Header - Responsive */}
      <div className="bg-white shadow-md px-3 sm:px-4 md:px-6 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <FaCompass className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: 'var(--primary-orange)' }} />
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold" style={{ color: 'var(--gray-900)' }}>
                Live Fleet Tracking
              </h1>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${connectionStatus === 'connected' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
              <span className="text-xs sm:text-sm text-gray-600">
                {connectionStatus === 'connected' ? 'WebSocket Connected' : 'Connecting...'}
              </span>
            </div>
            {lastUpdate && !isMobileView && (
              <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500">
                <FaClock className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Last update: {lastUpdate.toLocaleTimeString()}</span>
              </div>
            )}
            
            {/* Responsive device info */}
            <div className="hidden md:flex items-center space-x-1 text-xs text-gray-400">
              <FaDesktop className="w-3 h-3" />
              <span>|</span>
              <FaTablet className="w-3 h-3" />
              <span>|</span>
              <FaMobile className="w-3 h-3" />
            </div>
          </div>
        </div>
        
        {lastUpdate && isMobileView && (
          <div className="flex items-center space-x-2 text-xs text-gray-500 mt-2">
            <FaClock className="w-3 h-3" />
            <span>Last update: {lastUpdate.toLocaleTimeString()}</span>
          </div>
        )}
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Map Container */}
        <div className={`flex-1 relative transition-all duration-300 ${sidebarOpen && !isMobileView ? 'lg:mr-96' : ''}`}>
          <div ref={mapContainerRef} className="w-full h-full relative">
            {renderMockMap()}
            
            {/* Map Controls - Responsive positioning */}
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex flex-col space-y-2 z-30">
              <button
                onClick={centerOnUserLocation}
                className="bg-white p-1.5 sm:p-2 rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-105"
                title="Center on my location"
              >
                <FaLocationArrow className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: 'var(--primary-orange)' }} />
              </button>
              <button
                onClick={() => setMapZoom(prev => Math.min(prev + 1, 18))}
                className="bg-white p-1.5 sm:p-2 rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-105"
              >
                <span className="text-lg sm:text-xl font-bold">+</span>
              </button>
              <button
                onClick={() => setMapZoom(prev => Math.max(prev - 1, 8))}
                className="bg-white p-1.5 sm:p-2 rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-105"
              >
                <span className="text-lg sm:text-xl font-bold">-</span>
              </button>
              <button
                onClick={() => setShowDriverRoutes(!showDriverRoutes)}
                className={`bg-white p-1.5 sm:p-2 rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-105 ${
                  showDriverRoutes ? 'bg-orange-50' : ''
                }`}
                title="Toggle routes"
              >
                <FaRoute className={`w-4 h-4 sm:w-5 sm:h-5 ${showDriverRoutes ? 'text-orange-500' : 'text-gray-500'}`} />
              </button>
              <button
                onClick={toggleFullscreen}
                className="bg-white p-1.5 sm:p-2 rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-105"
                title="Toggle fullscreen"
              >
                {fullscreenMap ? <FaCompress className="w-4 h-4 sm:w-5 sm:h-5" /> : <FaExpand className="w-4 h-4 sm:w-5 sm:h-5" />}
              </button>
              {isMobileView && (
                <button
                  onClick={() => setShowStats(!showStats)}
                  className="bg-white p-1.5 sm:p-2 rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-105"
                  title="Toggle stats"
                >
                  {showStats ? <FaEyeSlash className="w-4 h-4 sm:w-5 sm:h-5" /> : <FaEye className="w-4 h-4 sm:w-5 sm:h-5" />}
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Sidebar - Responsive with Close Button */}
        <div className={`
          ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}
          ${isMobileView ? 'fixed inset-y-0 right-0 w-80 z-40 transition-transform duration-300' : 'absolute right-0 w-80 lg:w-96'}
          bg-white border-l border-gray-200 overflow-y-auto shadow-lg
        `}>
          {/* Sidebar Header with Close Button */}
          <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between z-10">
            <h2 className="font-semibold text-gray-800">Live Updates</h2>
            <button
              onClick={closeSidebar}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              title="Close sidebar"
            >
              <FaTimes className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          
          {/* Stats Cards - Responsive grid */}
          {(!isMobileView || (isMobileView && showStats)) && (
            <div className="p-3 sm:p-4 grid grid-cols-2 gap-2 sm:gap-3">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-2 sm:p-3">
                <div className="flex items-center justify-between mb-1 sm:mb-2">
                  <FaUsers className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                  <span className="text-xs text-blue-600">Active</span>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-blue-700">{stats.activeDrivers}</div>
                <div className="text-xs text-blue-600">Active Drivers</div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-2 sm:p-3">
                <div className="flex items-center justify-between mb-1 sm:mb-2">
                  <FaCar className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                  <span className="text-xs text-green-600">Live</span>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-green-700">{stats.totalRides}</div>
                <div className="text-xs text-green-600">Active Rides</div>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-2 sm:p-3">
                <div className="flex items-center justify-between mb-1 sm:mb-2">
                  <FaCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
                  <span className="text-xs text-orange-600">Today</span>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-orange-700">{stats.completedRides}</div>
                <div className="text-xs text-orange-600">Completed</div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-2 sm:p-3">
                <div className="flex items-center justify-between mb-1 sm:mb-2">
                  <FaClock className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                  <span className="text-xs text-purple-600">Avg</span>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-purple-700">{stats.avgResponseTime}s</div>
                <div className="text-xs text-purple-600">Response Time</div>
              </div>
            </div>
          )}
          
          {/* Active Rides List */}
          <div className="px-3 sm:px-4 pb-4">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2 text-sm sm:text-base">
              <FaStreetView className="w-4 h-4" style={{ color: 'var(--primary-orange)' }} />
              <span>Active Rides ({activeRides.length})</span>
            </h3>
            <div className="space-y-2 sm:space-y-3 max-h-[calc(100vh-400px)] overflow-y-auto">
              {activeRides.map((ride) => (
                <div
                  key={ride.id}
                  className={`bg-gray-50 rounded-lg p-2 sm:p-3 cursor-pointer transition-all hover:shadow-md ${
                    selectedRide?.id === ride.id ? 'ring-2 ring-orange-500' : ''
                  }`}
                  onClick={() => setSelectedRide(ride)}
                >
                  <div className="flex items-center justify-between mb-1 sm:mb-2">
                    <span className="font-medium text-xs sm:text-sm text-gray-700">{ride.rideId}</span>
                    <span className={`text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full ${getStatusColor(ride.status)} bg-opacity-10`}
                      style={{ backgroundColor: `${getStatusColor(ride.status).replace('text-', 'bg-')}20` }}>
                      {ride.status}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 space-y-1">
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <FaUser className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      <span className="truncate">{ride.customer.name}</span>
                    </div>
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <FaTruck className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      <span className="truncate">{ride.driver.name} - {ride.driver.vehicle}</span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs">{ride.distance}</span>
                      <span className="text-xs font-medium">{ride.fare}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
                      <div
                        className="h-1 rounded-full transition-all"
                        style={{
                          width: `${ride.progress}%`,
                          backgroundColor: 'var(--primary-orange)'
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Selected Ride Details */}
          {selectedRide && (
            <div className="border-t border-gray-200 p-3 sm:p-4 bg-gray-50">
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Ride Details</h3>
                <button
                  onClick={() => setSelectedRide(null)}
                  className="p-1 hover:bg-gray-200 rounded-lg transition-colors"
                  title="Close details"
                >
                  <FaTimes className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                </button>
              </div>
              {'driverId' in selectedRide ? (
                <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                  <p><strong>Driver:</strong> {selectedRide.name}</p>
                  <p><strong>Vehicle:</strong> {selectedRide.vehicle?.color} {selectedRide.vehicle?.type}</p>
                  <p><strong>Status:</strong> {selectedRide.status}</p>
                  <p><strong>Speed:</strong> {selectedRide.position?.speed} mph</p>
                  <p><strong>Heading:</strong> {Math.round(selectedRide.position?.heading)}°</p>
                </div>
              ) : (
                <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                  <div>
                    <p className="font-medium text-gray-600 text-xs">Pickup</p>
                    <p className="text-gray-800 text-xs">{selectedRide.pickup.address}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Distance: {calculateDistance(mapCenter.lat, mapCenter.lng, selectedRide.pickup.lat, selectedRide.pickup.lng)} km
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-600 text-xs">Dropoff</p>
                    <p className="text-gray-800 text-xs">{selectedRide.dropoff.address}</p>
                  </div>
                  <div className="pt-2 border-t border-gray-200">
                    <p><strong>Driver:</strong> {selectedRide.driver.name}</p>
                    <p><strong>Vehicle:</strong> {selectedRide.driver.vehicle}</p>
                    <p><strong>Plate:</strong> {selectedRide.driver.plate}</p>
                    <p><strong>Fare:</strong> {selectedRide.fare}</p>
                    <p><strong>Duration:</strong> {selectedRide.duration}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile Bottom Sheet for Selected Ride */}
      {isMobileView && selectedRide && !sidebarOpen && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg rounded-t-xl z-50 animate-slide-up">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800">Ride Details</h3>
              <button
                onClick={() => setSelectedRide(null)}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <FaTimes className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            {'driverId' in selectedRide ? (
              <div className="space-y-2 text-sm">
                <p><strong>Driver:</strong> {selectedRide.name}</p>
                <p><strong>Vehicle:</strong> {selectedRide.vehicle?.color} {selectedRide.vehicle?.type}</p>
                <p><strong>Status:</strong> {selectedRide.status}</p>
              </div>
            ) : (
              <div className="space-y-2 text-sm">
                <p><strong>Pickup:</strong> {selectedRide.pickup.address}</p>
                <p><strong>Dropoff:</strong> {selectedRide.dropoff.address}</p>
                <p><strong>Driver:</strong> {selectedRide.driver.name}</p>
                <p><strong>Fare:</strong> {selectedRide.fare}</p>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Floating button to open sidebar on mobile when closed */}
      {isMobileView && !sidebarOpen && (
        <button
          onClick={openSidebar}
          className="fixed right-4 bottom-20 bg-white rounded-full shadow-lg p-3 z-40 hover:shadow-xl transition-all animate-bounce"
          style={{ backgroundColor: 'var(--primary-orange)' }}
        >
          <FaBars className="w-5 h-5 text-white" />
        </button>
      )}
      
      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default LiveMap;