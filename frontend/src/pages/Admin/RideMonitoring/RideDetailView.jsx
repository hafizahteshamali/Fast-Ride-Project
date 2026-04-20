import React, { useState, useEffect } from 'react';
import { 
  FaUser, 
  FaUserCircle, 
  FaCar, 
  FaMapMarkerAlt, 
  FaClock, 
  FaMoneyBillWave, 
  FaRoute,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaPhone,
  FaEnvelope,
  FaIdCard,
  FaCalendarAlt,
  FaCheckCircle,
  FaSpinner,
  FaExclamationTriangle,
  FaArrowLeft,
  FaDownload,
  FaShare,
  FaPrint,
  FaHistory,
  FaReceipt,
  FaTachometerAlt,
  FaRoad,
  FaRegClock,
  FaChartLine,
  FaWhatsapp,
  FaBars,
  FaTimes,
  FaMobile,
  FaDesktop,
  FaTablet,
  FaExpand,
  FaCompress,
  FaEye,
  FaEyeSlash,
  FaCopy,
  FaCheck,
  FaInfoCircle
} from 'react-icons/fa';

const RideDetailView = () => {
  const [ride, setRide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('details');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [copiedField, setCopiedField] = useState(null);
  const [fullscreenMode, setFullscreenMode] = useState(false);
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setIsMobileView(isMobile);
      if (!isMobile) {
        setSidebarOpen(false);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Simulate API call to fetch ride details
  useEffect(() => {
    fetchRideDetails();
  }, []);

  const fetchRideDetails = async () => {
    setLoading(true);
    setTimeout(() => {
      const mockRide = {
        id: 'RID20240315-001',
        status: 'completed',
        createdAt: '2024-03-15T14:30:00Z',
        startedAt: '2024-03-15T14:32:15Z',
        completedAt: '2024-03-15T15:05:42Z',
        
        rider: {
          id: 'CUS12345',
          name: 'John Anderson',
          email: 'john.anderson@email.com',
          phone: '+1 (555) 123-4567',
          rating: 4.5,
          totalRides: 127,
          memberSince: '2023-01-15',
          avatar: 'JA',
          preferredPayment: 'Credit Card'
        },
        
        driver: {
          id: 'DRV9876',
          name: 'Michael Rodriguez',
          email: 'michael.rodriguez@rideapp.com',
          phone: '+1 (555) 987-6543',
          rating: 4.8,
          totalRides: 2456,
          memberSince: '2022-06-10',
          avatar: 'MR',
          licenseNumber: 'DL-987654321',
          vehicleId: 'VEH456',
          status: 'active'
        },
        
        vehicle: {
          id: 'VEH456',
          make: 'Toyota',
          model: 'Camry',
          year: 2023,
          color: 'Silver',
          licensePlate: 'ABC-1234',
          type: 'Sedan',
          capacity: 4,
          features: ['Air Conditioning', 'USB Charging', 'GPS Navigation', 'Bluetooth']
        },
        
        trip: {
          pickup: {
            coordinates: { lat: 40.7128, lng: -74.0060 },
            address: '123 Main Street, New York, NY 10001',
            location: 'Empire State Building',
            instructions: 'Pick up at the main entrance',
            time: '2024-03-15T14:32:15Z'
          },
          dropoff: {
            coordinates: { lat: 40.7580, lng: -73.9855 },
            address: '456 Broadway, New York, NY 10036',
            location: 'Times Square',
            instructions: 'Drop off at the Marriott Hotel entrance',
            time: '2024-03-15T15:05:42Z'
          },
          distance: 4.2,
          distanceMiles: 2.6,
          duration: 2007,
          durationFormatted: '33 min 27 sec',
          route: [
            { lat: 40.7128, lng: -74.0060 },
            { lat: 40.7150, lng: -74.0100 },
            { lat: 40.7200, lng: -74.0150 },
            { lat: 40.7300, lng: -74.0200 },
            { lat: 40.7400, lng: -73.9900 },
            { lat: 40.7500, lng: -73.9850 },
            { lat: 40.7580, lng: -73.9855 }
          ]
        },
        
        fare: {
          baseFare: 2.50,
          distanceFare: 8.40,
          timeFare: 5.58,
          surgeMultiplier: 1.2,
          surgeAmount: 3.30,
          tolls: 1.50,
          taxes: 1.85,
          total: 23.13,
          paymentMethod: 'Credit Card',
          paymentStatus: 'completed',
          promoApplied: null,
          tip: 3.00
        },
        
        timeline: [
          { status: 'Requested', time: '2024-03-15T14:30:00Z', description: 'Ride requested by customer', completed: true },
          { status: 'Accepted', time: '2024-03-15T14:30:45Z', description: 'Driver accepted the ride', completed: true },
          { status: 'Arrived', time: '2024-03-15T14:32:00Z', description: 'Driver arrived at pickup location', completed: true },
          { status: 'Started', time: '2024-03-15T14:32:15Z', description: 'Trip started', completed: true },
          { status: 'Completed', time: '2024-03-15T15:05:42Z', description: 'Trip completed successfully', completed: true }
        ],
        
        additionalInfo: {
          weather: 'Clear, 18°C',
          traffic: 'Moderate',
          estimatedWaitTime: 120,
          actualWaitTime: 135,
          cancellationPolicy: 'Free cancellation within 5 minutes',
          supportContact: 'support@rideapp.com',
          emergencyContact: '+1 (800) 555-0123'
        }
      };
      
      setRide(mockRide);
      setLoading(false);
    }, 1000);
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      full: date.toLocaleString('en-US')
    };
  };

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m ${secs}s`;
  };

  const formatCurrency = (amount) => {
    const pkrAmount = amount * 28;
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(pkrAmount);
  };

  const renderRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`star-${i}`} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half-star" className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />);
    }
    
    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaRegStar key={`empty-star-${i}`} className="w-3 h-3 sm:w-4 sm:h-4 text-gray-300" />);
    }
    
    return stars;
  };

  const getStatusInfo = (status) => {
    const statusMap = {
      'requested': { color: 'text-yellow-600', bg: 'bg-yellow-100', icon: FaSpinner },
      'accepted': { color: 'text-blue-600', bg: 'bg-blue-100', icon: FaCheckCircle },
      'arrived': { color: 'text-purple-600', bg: 'bg-purple-100', icon: FaMapMarkerAlt },
      'started': { color: 'text-indigo-600', bg: 'bg-indigo-100', icon: FaCar },
      'completed': { color: 'text-green-600', bg: 'bg-green-100', icon: FaCheckCircle },
      'cancelled': { color: 'text-red-600', bg: 'bg-red-100', icon: FaExclamationTriangle }
    };
    return statusMap[status] || statusMap['requested'];
  };

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setFullscreenMode(true);
    } else {
      document.exitFullscreen();
      setFullscreenMode(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <FaSpinner className="w-10 h-10 sm:w-12 sm:h-12 animate-spin mx-auto mb-4" style={{ color: 'var(--primary-orange)' }} />
          <p className="text-sm sm:text-base text-gray-600">Loading ride details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="text-center">
          <FaExclamationTriangle className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4 text-red-500" />
          <p className="text-gray-600 mb-2 text-sm sm:text-base">Error loading ride details</p>
          <button 
            onClick={fetchRideDetails}
            className="px-4 py-2 rounded-lg text-white text-sm sm:text-base"
            style={{ backgroundColor: 'var(--primary-orange)' }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!ride) return null;

  const rideTiming = {
    created: formatDateTime(ride.createdAt),
    started: formatDateTime(ride.startedAt),
    completed: formatDateTime(ride.completedAt)
  };

  const statusInfo = getStatusInfo(ride.status);

  return (
    <div className={`min-h-screen bg-gray-50 ${fullscreenMode ? 'fixed inset-0 z-50 overflow-auto' : ''}`}>
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-20">
        <div className="px-2 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div>
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Ride Details</h1>
                <div className="flex items-center space-x-2 mt-0.5">
                  <p className="text-xs sm:text-sm text-gray-500">Ride ID: {ride.id}</p>
                  <button
                    onClick={() => copyToClipboard(ride.id, 'rideId')}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                  >
                    {copiedField === 'rideId' ? 
                      <FaCheck className="w-3 h-3 text-green-500" /> : 
                      <FaCopy className="w-3 h-3 text-gray-400" />
                    }
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <button className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <FaDownload className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </button>
              <button className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <FaShare className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </button>
              <button className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <FaPrint className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </button>
              <button
                onClick={toggleFullscreen}
                className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {fullscreenMode ? 
                  <FaCompress className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" /> : 
                  <FaExpand className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                }
              </button>
              {isMobileView && (
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <FaBars className="w-5 h-5 text-gray-600" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="py-6">
        {/* Status Banner */}
        <div className={`${statusInfo.bg} rounded-lg p-3 sm:p-4 mb-4 sm:mb-6`}>
          <div className="flex items-center space-x-2 sm:space-x-3">
            <statusInfo.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${statusInfo.color}`} />
            <div>
              <p className={`font-semibold text-sm sm:text-base ${statusInfo.color}`}>
                Ride {ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}
              </p>
              <p className="text-xs sm:text-sm text-gray-600">
                {ride.status === 'completed' ? `Completed on ${rideTiming.completed.date} at ${rideTiming.completed.time}` : 
                  ride.status === 'started' ? 'Trip in progress' : 'Ride confirmed'}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs - Responsive */}
        <div className="border-b border-gray-200 mb-4 sm:mb-6">
          <div className="flex min-w-max">
            {['details', 'fare', 'timeline'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-2 py-2 font-medium transition-colors relative text-sm sm:text-base ${
                  activeTab === tab
                    ? 'text-orange-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab === 'details' && 'Ride Details'}
                {tab === 'fare' && 'Fare Breakdown'}
                {tab === 'timeline' && 'Timeline'}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Ride Details Tab */}
        {activeTab === 'details' && (
          <div className="space-y-4 sm:space-y-6">
            {/* Rider and Driver Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {/* Rider Card */}
              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center space-x-2">
                    <FaUser className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: 'var(--primary-orange)' }} />
                    <span>Rider Information</span>
                  </h3>
                  <div className="flex items-center space-x-1">
                    {renderRating(ride.rider.rating)}
                    <span className="ml-1 sm:ml-2 text-xs sm:text-sm text-gray-600">({ride.rider.rating})</span>
                  </div>
                </div>
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-lg sm:text-xl">
                    {ride.rider.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{ride.rider.name}</h4>
                    <div className="space-y-1 mt-2">
                      <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
                        <FaEnvelope className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span className="truncate">{ride.rider.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
                        <FaPhone className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span>{ride.rider.phone}</span>
                        <button
                          onClick={() => copyToClipboard(ride.rider.phone, 'riderPhone')}
                          className="ml-auto p-1 hover:bg-gray-100 rounded"
                        >
                          {copiedField === 'riderPhone' ? 
                            <FaCheck className="w-3 h-3 text-green-500" /> : 
                            <FaCopy className="w-3 h-3 text-gray-400" />
                          }
                        </button>
                      </div>
                      <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
                        <FaHistory className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{ride.rider.totalRides} total rides</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Driver Card */}
              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center space-x-2">
                    <FaCar className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: 'var(--primary-orange)' }} />
                    <span>Driver Information</span>
                  </h3>
                  <div className="flex items-center space-x-1">
                    {renderRating(ride.driver.rating)}
                    <span className="ml-1 sm:ml-2 text-xs sm:text-sm text-gray-600">({ride.driver.rating})</span>
                  </div>
                </div>
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-lg sm:text-xl">
                    {ride.driver.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{ride.driver.name}</h4>
                    <div className="space-y-1 mt-2">
                      <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
                        <FaIdCard className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="truncate">License: {ride.driver.licenseNumber}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
                        <FaPhone className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{ride.driver.phone}</span>
                        <button
                          onClick={() => copyToClipboard(ride.driver.phone, 'driverPhone')}
                          className="ml-auto p-1 hover:bg-gray-100 rounded"
                        >
                          {copiedField === 'driverPhone' ? 
                            <FaCheck className="w-3 h-3 text-green-500" /> : 
                            <FaCopy className="w-3 h-3 text-gray-400" />
                          }
                        </button>
                      </div>
                      <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
                        <FaHistory className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{ride.driver.totalRides} total rides</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Vehicle Details */}
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center space-x-2">
                <FaCar className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: 'var(--primary-orange)' }} />
                <span>Vehicle Details</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-2">
                  <p className="text-xs sm:text-sm text-gray-600">
                    <span className="font-medium">Make & Model:</span> {ride.vehicle.make} {ride.vehicle.model} ({ride.vehicle.year})
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600">
                    <span className="font-medium">Color:</span> {ride.vehicle.color}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600">
                    <span className="font-medium">License Plate:</span> {ride.vehicle.licensePlate}
                    <button
                      onClick={() => copyToClipboard(ride.vehicle.licensePlate, 'plate')}
                      className="ml-2 p-1 hover:bg-gray-100 rounded"
                    >
                      {copiedField === 'plate' ? 
                        <FaCheck className="w-3 h-3 text-green-500" /> : 
                        <FaCopy className="w-3 h-3 text-gray-400" />
                      }
                    </button>
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs sm:text-sm text-gray-600">
                    <span className="font-medium">Type:</span> {ride.vehicle.type}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600">
                    <span className="font-medium">Capacity:</span> {ride.vehicle.capacity} passengers
                  </p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {ride.vehicle.features.map((feature, idx) => (
                      <span key={idx} className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-gray-100 text-xs text-gray-600 rounded">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Trip Details */}
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center space-x-2">
                <FaRoute className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: 'var(--primary-orange)' }} />
                <span>Trip Details</span>
              </h3>
              
              {/* Pickup */}
              <div className="mb-4 sm:mb-6">
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <div className="relative">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <FaMapMarkerAlt className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                    </div>
                    <div className="absolute top-6 sm:top-8 left-2 sm:left-4 w-0.5 h-8 sm:h-12 bg-gray-300"></div>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-sm sm:text-base">Pickup Location</p>
                    <p className="text-xs sm:text-sm text-gray-600 break-words">{ride.trip.pickup.address}</p>
                    {ride.trip.pickup.location && (
                      <p className="text-xs text-gray-500 mt-0.5">{ride.trip.pickup.location}</p>
                    )}
                    {ride.trip.pickup.instructions && (
                      <p className="text-xs text-orange-600 mt-0.5">Note: {ride.trip.pickup.instructions}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-1">{formatDateTime(ride.trip.pickup.time).time}</p>
                  </div>
                </div>
              </div>
              
              {/* Dropoff */}
              <div className="mb-4 sm:mb-6">
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-red-100 flex items-center justify-center">
                    <FaMapMarkerAlt className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-sm sm:text-base">Dropoff Location</p>
                    <p className="text-xs sm:text-sm text-gray-600 break-words">{ride.trip.dropoff.address}</p>
                    {ride.trip.dropoff.location && (
                      <p className="text-xs text-gray-500 mt-0.5">{ride.trip.dropoff.location}</p>
                    )}
                    {ride.trip.dropoff.instructions && (
                      <p className="text-xs text-orange-600 mt-0.5">Note: {ride.trip.dropoff.instructions}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-1">{formatDateTime(ride.trip.dropoff.time).time}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-200 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div>
                  <p className="text-xs text-gray-500">Distance</p>
                  <p className="text-sm sm:text-lg font-semibold text-gray-900">{ride.trip.distance} km <span className="text-xs">({ride.trip.distanceMiles} mi)</span></p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Duration</p>
                  <p className="text-sm sm:text-lg font-semibold text-gray-900">{ride.trip.durationFormatted}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Start Time</p>
                  <p className="text-xs sm:text-sm font-medium text-gray-900">{rideTiming.started.time}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">End Time</p>
                  <p className="text-xs sm:text-sm font-medium text-gray-900">{rideTiming.completed.time}</p>
                </div>
              </div>
            </div>

            {/* Additional Info Toggle */}
            <button
              onClick={() => setShowAdditionalInfo(!showAdditionalInfo)}
              className="w-full flex items-center justify-between p-3 sm:p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="flex items-center space-x-2 text-sm sm:text-base font-medium text-gray-700">
                <FaInfoCircle className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: 'var(--primary-orange)' }} />
                <span>Additional Information</span>
              </span>
              {showAdditionalInfo ? <FaTimes className="w-4 h-4" /> : <FaBars className="w-4 h-4" />}
            </button>

            {showAdditionalInfo && (
              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Weather</p>
                    <p className="text-sm text-gray-900">{ride.additionalInfo.weather}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Traffic Condition</p>
                    <p className="text-sm text-gray-900">{ride.additionalInfo.traffic}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Estimated Wait Time</p>
                    <p className="text-sm text-gray-900">{ride.additionalInfo.estimatedWaitTime} seconds</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Actual Wait Time</p>
                    <p className="text-sm text-gray-900">{ride.additionalInfo.actualWaitTime} seconds</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Fare Breakdown Tab */}
        {activeTab === 'fare' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center space-x-2">
                  <FaMoneyBillWave className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: 'var(--primary-orange)' }} />
                  <span>Fare Breakdown</span>
                </h3>
                
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-100 text-sm sm:text-base">
                    <span className="text-gray-600">Base Fare</span>
                    <span className="font-medium text-gray-900">{formatCurrency(ride.fare.baseFare)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100 text-sm sm:text-base">
                    <span className="text-gray-600">Distance Fare ({ride.trip.distance} km × $2.00/km)</span>
                    <span className="font-medium text-gray-900">{formatCurrency(ride.fare.distanceFare)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100 text-sm sm:text-base">
                    <span className="text-gray-600">Time Fare ({Math.floor(ride.trip.duration / 60)} min × $0.166/min)</span>
                    <span className="font-medium text-gray-900">{formatCurrency(ride.fare.timeFare)}</span>
                  </div>
                  {ride.fare.surgeMultiplier > 1 && (
                    <div className="flex justify-between py-2 border-b border-gray-100 text-sm sm:text-base">
                      <span className="text-gray-600">Surge Multiplier ({ride.fare.surgeMultiplier}x)</span>
                      <span className="font-medium text-orange-600">{formatCurrency(ride.fare.surgeAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-2 border-b border-gray-100 text-sm sm:text-base">
                    <span className="text-gray-600">Tolls</span>
                    <span className="font-medium text-gray-900">{formatCurrency(ride.fare.tolls)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100 text-sm sm:text-base">
                    <span className="text-gray-600">Taxes & Fees</span>
                    <span className="font-medium text-gray-900">{formatCurrency(ride.fare.taxes)}</span>
                  </div>
                  {ride.fare.tip > 0 && (
                    <div className="flex justify-between py-2 border-b border-gray-100 text-sm sm:text-base">
                      <span className="text-gray-600">Tip</span>
                      <span className="font-medium text-gray-900">{formatCurrency(ride.fare.tip)}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-3 mt-2 border-t-2 border-gray-200">
                    <span className="text-base sm:text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-lg sm:text-xl font-bold" style={{ color: 'var(--primary-orange)' }}>
                      {formatCurrency(ride.fare.total)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Payment Details</h3>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-600">Payment Method</span>
                    <span className="font-medium text-gray-900">{ride.fare.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-600">Payment Status</span>
                    <span className={`font-medium ${
                      ride.fare.paymentStatus === 'completed' ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {ride.fare.paymentStatus.charAt(0).toUpperCase() + ride.fare.paymentStatus.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="bg-orange-50 rounded-lg p-3 sm:p-4 mt-3 sm:mt-4">
                <div className="flex items-start space-x-2">
                  <FaReceipt className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 mt-0.5" />
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-900">Invoice Available</p>
                    <p className="text-xs text-gray-600 mt-1">Download receipt for expense claims</p>
                    <button className="mt-2 text-xs sm:text-sm text-orange-600 font-medium hover:underline">
                      Download Invoice →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Timeline Tab */}
        {activeTab === 'timeline' && (
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Ride Timeline</h3>
            <div className="relative">
              {ride.timeline.map((event, index) => {
                const eventTime = formatDateTime(event.time);
                const isLast = index === ride.timeline.length - 1;
                
                return (
                  <div key={index} className="mb-4 sm:mb-6 relative">
                    {!isLast && (
                      <div className="absolute left-3 sm:left-4 top-6 sm:top-8 bottom-0 w-0.5 bg-gray-200"></div>
                    )}
                    <div className="flex items-start space-x-2 sm:space-x-3">
                      <div className="relative z-10">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-orange-100 flex items-center justify-center">
                          <FaCheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-orange-600" />
                        </div>
                      </div>
                      <div className="flex-1 pb-3 sm:pb-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                          <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{event.status}</h4>
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <FaClock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                            <span>{eventTime.date} at {eventTime.time}</span>
                          </div>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 mt-1">{event.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Sidebar */}
      {isMobileView && sidebarOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setSidebarOpen(false)}
          ></div>
          <div className="fixed right-0 top-0 bottom-0 w-80 bg-white shadow-xl z-50 overflow-y-auto animate-slide-in">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-semibold text-gray-800">Quick Actions</h3>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <FaTimes className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-4 space-y-3">
              <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <FaWhatsapp className="w-5 h-5 text-green-500" />
                <span className="text-sm">Contact Support</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <FaDownload className="w-5 h-5 text-blue-500" />
                <span className="text-sm">Download Receipt</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <FaShare className="w-5 h-5 text-purple-500" />
                <span className="text-sm">Share Ride Details</span>
              </button>
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default RideDetailView;