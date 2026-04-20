import React, { useState, useEffect } from 'react';
import {
  FaUser,
  FaCar,
  FaMapMarkerAlt,
  FaClock,
  FaMoneyBillWave,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaPhone,
  FaEnvelope,
  FaIdCard,
  FaCheckCircle,
  FaSpinner,
  FaExclamationTriangle,
  FaArrowLeft,
  FaSearch,
  FaFilter,
  FaUserCheck,
  FaUserPlus,
  FaTruck,
  FaRoute,
  FaGavel,
  FaUserShield,
  FaHistory,
  FaLocationArrow,
  FaRoad,
  FaGasPump,
  FaWifi,
  FaBatteryFull,
  FaSnowflake,
  FaCoffee,
  FaChild,
  FaPaw, // Changed from FaPets to FaPaw
  FaSmokingBan, // Changed from FaSmoking
  FaHeadphones, // Changed from FaMusic
  FaUsers,
  FaTimes,
  FaCheck,
  FaCopy,
  FaDownload,
  FaShare,
  FaPrint,
  FaExpand,
  FaCompress,
  FaBars,
  FaEye,
  FaEyeSlash,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaCalendarAlt,
  FaUserCircle,
  FaRegClock,
  FaInfoCircle
} from 'react-icons/fa';

const ManualRideAssignment = () => {
  const [pendingRides, setPendingRides] = useState([]);
  const [availableDrivers, setAvailableDrivers] = useState([]);
  const [selectedRide, setSelectedRide] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState(false);
  const [assignmentSuccess, setAssignmentSuccess] = useState(null);
  const [searchRideTerm, setSearchRideTerm] = useState('');
  const [searchDriverTerm, setSearchDriverTerm] = useState('');
  const [filterDriverStatus, setFilterDriverStatus] = useState('all');
  const [filterRideType, setFilterRideType] = useState('all');
  const [sortDriversBy, setSortDriversBy] = useState('distance');
  const [sortDirection, setSortDirection] = useState('asc');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [selectedRideDetails, setSelectedRideDetails] = useState(null);
  const [selectedDriverDetails, setSelectedDriverDetails] = useState(null);
  const [isMobileView, setIsMobileView] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [fullscreenMode, setFullscreenMode] = useState(false);
  const [assignmentNote, setAssignmentNote] = useState('');
  const [adminName, setAdminName] = useState('Admin User');

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setIsMobileView(isMobile);
      if (isMobile) {
        setSidebarOpen(false);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Simulate API call to fetch pending rides and available drivers
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setTimeout(() => {
      // Mock pending rides
      const mockPendingRides = [
        {
          id: 'RID001',
          rideId: 'RID20240315-001',
          status: 'pending',
          createdAt: '2024-03-15T14:30:00Z',
          customer: {
            name: 'John Anderson',
            phone: '+1 (555) 123-4567',
            rating: 4.5,
            avatar: 'JA',
            preferredPayment: 'Credit Card'
          },
          pickup: {
            address: '123 Main Street, New York, NY 10001',
            coordinates: { lat: 40.7128, lng: -74.0060 },
            instructions: 'Pick up at the main entrance'
          },
          dropoff: {
            address: '456 Broadway, New York, NY 10036',
            coordinates: { lat: 40.7580, lng: -73.9855 },
            instructions: 'Drop off at the Marriott Hotel entrance'
          },
          rideType: 'Standard',
          estimatedDistance: 4.2,
          estimatedDuration: 33,
          estimatedFare: 23.13,
          surgeMultiplier: 1.2,
          specialRequests: ['Air Conditioning', 'USB Charging']
        },
        {
          id: 'RID002',
          rideId: 'RID20240315-002',
          status: 'pending',
          createdAt: '2024-03-15T14:45:00Z',
          customer: {
            name: 'Sarah Williams',
            phone: '+1 (555) 234-5678',
            rating: 4.8,
            avatar: 'SW',
            preferredPayment: 'Cash'
          },
          pickup: {
            address: '789 Park Avenue, New York, NY 10021',
            coordinates: { lat: 40.7640, lng: -73.9730 },
            instructions: 'Call upon arrival'
          },
          dropoff: {
            address: '321 Madison Avenue, New York, NY 10022',
            coordinates: { lat: 40.7600, lng: -73.9710 },
            instructions: 'Deliver to reception'
          },
          rideType: 'Premium',
          estimatedDistance: 3.8,
          estimatedDuration: 25,
          estimatedFare: 28.50,
          surgeMultiplier: 1.5,
          specialRequests: ['Luxury Vehicle', 'Extra Luggage']
        },
        {
          id: 'RID003',
          rideId: 'RID20240315-003',
          status: 'pending',
          createdAt: '2024-03-15T15:00:00Z',
          customer: {
            name: 'Michael Brown',
            phone: '+1 (555) 345-6789',
            rating: 4.2,
            avatar: 'MB',
            preferredPayment: 'Credit Card'
          },
          pickup: {
            address: '555 5th Avenue, New York, NY 10017',
            coordinates: { lat: 40.7550, lng: -73.9760 },
            instructions: 'Pick up at the corner'
          },
          dropoff: {
            address: '888 Broadway, New York, NY 10003',
            coordinates: { lat: 40.7330, lng: -73.9930 },
            instructions: 'Drop off at the main entrance'
          },
          rideType: 'Standard',
          estimatedDistance: 5.1,
          estimatedDuration: 42,
          estimatedFare: 28.90,
          surgeMultiplier: 1.0,
          specialRequests: ['Child Seat']
        }
      ];

      // Mock available drivers
      const mockAvailableDrivers = [
        {
          id: 'DRV001',
          driverId: 'DRV9876',
          name: 'Michael Rodriguez',
          phone: '+1 (555) 987-6543',
          rating: 4.8,
          avatar: 'MR',
          status: 'available',
          location: {
            lat: 40.7150,
            lng: -74.0100,
            address: 'Near Main Street'
          },
          distanceToPickup: 1.2,
          etaToPickup: 3.5,
          vehicle: {
            make: 'Toyota',
            model: 'Camry',
            year: 2023,
            color: 'Silver',
            licensePlate: 'ABC-1234',
            type: 'Sedan',
            capacity: 4,
            features: ['Air Conditioning', 'USB Charging', 'GPS Navigation']
          },
          stats: {
            totalRides: 2456,
            acceptanceRate: 98,
            completionRate: 99,
            avgResponseTime: 45
          },
          preferences: ['Long Trips', 'Airport Trips']
        },
        {
          id: 'DRV002',
          driverId: 'DRV9877',
          name: 'Emily Chen',
          phone: '+1 (555) 876-5432',
          rating: 4.9,
          avatar: 'EC',
          status: 'available',
          location: {
            lat: 40.7200,
            lng: -74.0150,
            address: 'Near Broadway'
          },
          distanceToPickup: 2.5,
          etaToPickup: 5.2,
          vehicle: {
            make: 'Tesla',
            model: 'Model 3',
            year: 2023,
            color: 'White',
            licensePlate: 'TESLA-123',
            type: 'Electric',
            capacity: 4,
            features: ['Air Conditioning', 'USB Charging', 'WiFi', 'Premium Sound']
          },
          stats: {
            totalRides: 1842,
            acceptanceRate: 97,
            completionRate: 98,
            avgResponseTime: 52
          },
          preferences: ['Premium Rides', 'Quiet Riders']
        },
        {
          id: 'DRV003',
          driverId: 'DRV9878',
          name: 'David Kim',
          phone: '+1 (555) 765-4321',
          rating: 4.7,
          avatar: 'DK',
          status: 'available',
          location: {
            lat: 40.7100,
            lng: -74.0080,
            address: 'Near Wall Street'
          },
          distanceToPickup: 1.8,
          etaToPickup: 4.0,
          vehicle: {
            make: 'Honda',
            model: 'Accord',
            year: 2022,
            color: 'Black',
            licensePlate: 'HONDA-456',
            type: 'Sedan',
            capacity: 4,
            features: ['Air Conditioning', 'USB Charging', 'Heated Seats']
          },
          stats: {
            totalRides: 3421,
            acceptanceRate: 99,
            completionRate: 100,
            avgResponseTime: 38
          },
          preferences: ['Pet Friendly', 'Flexible Routes']
        },
        {
          id: 'DRV004',
          driverId: 'DRV9879',
          name: 'Lisa Wang',
          phone: '+1 (555) 654-3210',
          rating: 4.9,
          avatar: 'LW',
          status: 'available',
          location: {
            lat: 40.7250,
            lng: -74.0200,
            address: 'Near Times Square'
          },
          distanceToPickup: 3.2,
          etaToPickup: 6.5,
          vehicle: {
            make: 'BMW',
            model: '5 Series',
            year: 2023,
            color: 'Blue',
            licensePlate: 'BMW-789',
            type: 'Luxury',
            capacity: 4,
            features: ['Air Conditioning', 'USB Charging', 'Leather Seats', 'Sunroof']
          },
          stats: {
            totalRides: 1256,
            acceptanceRate: 96,
            completionRate: 97,
            avgResponseTime: 48
          },
          preferences: ['Luxury Rides', 'Business Travelers']
        },
        {
          id: 'DRV005',
          driverId: 'DRV9880',
          name: 'James Wilson',
          phone: '+1 (555) 543-2109',
          rating: 4.6,
          avatar: 'JW',
          status: 'available',
          location: {
            lat: 40.7180,
            lng: -74.0120,
            address: 'Near Financial District'
          },
          distanceToPickup: 2.1,
          etaToPickup: 4.5,
          vehicle: {
            make: 'Ford',
            model: 'Fusion',
            year: 2022,
            color: 'Gray',
            licensePlate: 'FORD-321',
            type: 'Sedan',
            capacity: 4,
            features: ['Air Conditioning', 'USB Charging', 'Bluetooth']
          },
          stats: {
            totalRides: 2890,
            acceptanceRate: 95,
            completionRate: 96,
            avgResponseTime: 55
          },
          preferences: ['Short Trips', 'Night Rides']
        }
      ];

      setPendingRides(mockPendingRides);
      setAvailableDrivers(mockAvailableDrivers);
      setLoading(false);
    }, 1500);
  };

  // Format date and time
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      full: date.toLocaleString('en-US')
    };
  };

  // Format currency
  const formatCurrency = (amount) => {
    const pkrAmount = amount * 28;
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(pkrAmount);
  };

  // Render star rating
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

  // Filter and sort drivers
  const getFilteredDrivers = () => {
    let filtered = [...availableDrivers];
    
    // Filter by search term
    if (searchDriverTerm) {
      filtered = filtered.filter(driver => 
        driver.name.toLowerCase().includes(searchDriverTerm.toLowerCase()) ||
        driver.driverId.toLowerCase().includes(searchDriverTerm.toLowerCase()) ||
        driver.vehicle.licensePlate.toLowerCase().includes(searchDriverTerm.toLowerCase())
      );
    }
    
    // Filter by status
    if (filterDriverStatus !== 'all') {
      filtered = filtered.filter(driver => driver.status === filterDriverStatus);
    }
    
    // Sort drivers
    filtered.sort((a, b) => {
      let aVal, bVal;
      
      switch(sortDriversBy) {
        case 'distance':
          aVal = a.distanceToPickup;
          bVal = b.distanceToPickup;
          break;
        case 'rating':
          aVal = a.rating;
          bVal = b.rating;
          break;
        case 'eta':
          aVal = a.etaToPickup;
          bVal = b.etaToPickup;
          break;
        case 'totalRides':
          aVal = a.stats.totalRides;
          bVal = b.stats.totalRides;
          break;
        default:
          aVal = a.distanceToPickup;
          bVal = b.distanceToPickup;
      }
      
      if (sortDirection === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });
    
    return filtered;
  };

  // Filter pending rides
  const getFilteredRides = () => {
    let filtered = [...pendingRides];
    
    if (searchRideTerm) {
      filtered = filtered.filter(ride => 
        ride.rideId.toLowerCase().includes(searchRideTerm.toLowerCase()) ||
        ride.customer.name.toLowerCase().includes(searchRideTerm.toLowerCase()) ||
        ride.pickup.address.toLowerCase().includes(searchRideTerm.toLowerCase())
      );
    }
    
    if (filterRideType !== 'all') {
      filtered = filtered.filter(ride => ride.rideType === filterRideType);
    }
    
    return filtered;
  };

  // Handle manual assignment
  const handleAssignDriver = async () => {
    if (!selectedRide || !selectedDriver) {
      alert('Please select both a ride and a driver');
      return;
    }
    
    setAssigning(true);
    
    // Simulate API call
    setTimeout(() => {
      // Create assignment record
      const assignmentRecord = {
        id: `ASSIGN-${Date.now()}`,
        rideId: selectedRide.id,
        driverId: selectedDriver.id,
        assignedBy: adminName,
        assignedAt: new Date().toISOString(),
        status: 'assigned',
        note: assignmentNote || 'Manual override by admin',
        type: 'manual_override'
      };
      
      console.log('DriverAssignment record created:', assignmentRecord);
      
      // Remove assigned ride from pending list
      setPendingRides(prev => prev.filter(ride => ride.id !== selectedRide.id));
      
      // Update driver status
      setAvailableDrivers(prev => prev.map(driver => 
        driver.id === selectedDriver.id 
          ? { ...driver, status: 'assigned' }
          : driver
      ));
      
      setAssignmentSuccess({
        success: true,
        message: `Successfully assigned ${selectedDriver.name} to ride ${selectedRide.rideId}`,
        assignment: assignmentRecord
      });
      
      // Reset selections
      setSelectedRide(null);
      setSelectedDriver(null);
      setAssignmentNote('');
      setAssigning(false);
      
      // Auto hide success message
      setTimeout(() => {
        setAssignmentSuccess(null);
      }, 5000);
    }, 1500);
  };

  // Toggle sort direction
  const toggleSort = (field) => {
    if (sortDriversBy === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortDriversBy(field);
      setSortDirection('asc');
    }
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setFullscreenMode(true);
    } else {
      document.exitFullscreen();
      setFullscreenMode(false);
    }
  };

  const filteredDrivers = getFilteredDrivers();
  const filteredRides = getFilteredRides();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <FaSpinner className="w-10 h-10 sm:w-12 sm:h-12 animate-spin mx-auto mb-4" style={{ color: 'var(--primary-orange)' }} />
          <p className="text-sm sm:text-base text-gray-600">Loading ride and driver data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-50 ${fullscreenMode ? 'fixed inset-0 z-50 overflow-auto' : ''}`}>
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-20">
        <div className="px-2 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div>
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Manual Ride Assignment</h1>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Override dispatch engine and manually assign drivers to pending rides</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3">
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

      {/* Success/Error Message */}
      {assignmentSuccess && (
        <div className={`fixed top-20 right-4 z-50 animate-slide-in max-w-sm`}>
          <div className={`${assignmentSuccess.success ? 'bg-green-50 border-l-4 border-green-400' : 'bg-red-50 border-l-4 border-red-400'} p-4 rounded-lg shadow-lg`}>
            <div className="flex items-center space-x-3">
              {assignmentSuccess.success ? 
                <FaCheckCircle className="w-5 h-5 text-green-400" /> : 
                <FaExclamationTriangle className="w-5 h-5 text-red-400" />
              }
              <p className={`${assignmentSuccess.success ? 'text-green-800' : 'text-red-800'} text-sm`}>
                {assignmentSuccess.message}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="sm:py-6">
        {/* Main Content - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          
          {/* Left Column - Pending Rides */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                  <FaUser className="w-5 h-5" style={{ color: 'var(--primary-orange)' }} />
                  <span>Pending Rides ({filteredRides.length})</span>
                </h2>
                <button
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <FaFilter className="w-4 h-4 text-gray-500" />
                </button>
              </div>
              
              {/* Search and Filters */}
              <div className="space-y-3 mb-4">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by ride ID, customer name, or address..."
                    value={searchRideTerm}
                    onChange={(e) => setSearchRideTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm"
                    style={{
                      borderColor: 'var(--gray-300)',
                      focusRingColor: 'var(--primary-orange)'
                    }}
                  />
                </div>
                
                {showAdvancedFilters && (
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={filterRideType}
                      onChange={(e) => setFilterRideType(e.target.value)}
                      className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm"
                      style={{ borderColor: 'var(--gray-300)', focusRingColor: 'var(--primary-orange)' }}
                    >
                      <option value="all">All Ride Types</option>
                      <option value="Standard">Standard</option>
                      <option value="Premium">Premium</option>
                      <option value="Luxury">Luxury</option>
                    </select>
                  </div>
                )}
              </div>
              
              {/* Rides List */}
              <div className="space-y-3">
                {filteredRides.map((ride) => (
                  <div
                    key={ride.id}
                    className={`border border-gray-300 rounded-lg p-3 sm:p-4 cursor-pointer transition-all hover:shadow-md ${
                      selectedRide?.id === ride.id ? 'ring-2 ring-orange-500 bg-orange-50' : 'bg-white'
                    }`}
                    onClick={() => setSelectedRide(ride)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <FaUser className="w-4 h-4 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-gray-900">{ride.customer.name}</p>
                          <p className="text-xs text-gray-500">{ride.rideId}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        {renderRating(ride.customer.rating)}
                      </div>
                    </div>
                    
                    <div className="space-y-1 text-xs text-gray-600 mt-2">
                      <div className="flex items-center space-x-2">
                        <FaMapMarkerAlt className="w-3 h-3 text-green-500" />
                        <span className="truncate">{ride.pickup.address.split(',')[0]}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FaLocationArrow className="w-3 h-3 text-red-500" />
                        <span className="truncate">{ride.dropoff.address.split(',')[0]}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between mt-2 pt-2 border-t border-gray-100 text-xs">
                      <span>{ride.estimatedDistance} km</span>
                      <span>{ride.estimatedDuration} min</span>
                      <span className="font-semibold" style={{ color: 'var(--primary-orange)' }}>
                        {formatCurrency(ride.estimatedFare)}
                      </span>
                    </div>
                    
                    {ride.specialRequests.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {ride.specialRequests.map((req, idx) => (
                          <span key={idx} className="px-2 py-0.5 bg-gray-100 text-xs rounded">
                            {req}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                {filteredRides.length === 0 && (
                  <div className="text-center py-8">
                    <FaInfoCircle className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-500">No pending rides found</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Right Column - Available Drivers */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                  <FaCar className="w-5 h-5" style={{ color: 'var(--primary-orange)' }} />
                  <span>Available Drivers ({filteredDrivers.length})</span>
                </h2>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleSort('distance')}
                    className="p-2 rounded-lg hover:bg-gray-100 text-xs"
                  >
                    Sort by Distance
                    {sortDriversBy === 'distance' && (
                      sortDirection === 'asc' ? <FaSortUp className="inline ml-1" /> : <FaSortDown className="inline ml-1" />
                    )}
                  </button>
                </div>
              </div>
              
              {/* Search and Filters */}
              <div className="space-y-3 mb-4">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by driver name, ID, or plate..."
                    value={searchDriverTerm}
                    onChange={(e) => setSearchDriverTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm"
                    style={{
                      borderColor: 'var(--gray-300)',
                      focusRingColor: 'var(--primary-orange)'
                    }}
                  />
                </div>
                
                <select
                  value={filterDriverStatus}
                  onChange={(e) => setFilterDriverStatus(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm"
                  style={{ borderColor: 'var(--gray-300)', focusRingColor: 'var(--primary-orange)' }}
                >
                  <option value="all">All Drivers</option>
                  <option value="available">Available</option>
                  <option value="assigned">Assigned</option>
                </select>
              </div>
              
              {/* Drivers List */}
              <div className="space-y-3">
                {filteredDrivers.map((driver) => (
                  <div
                    key={driver.id}
                    className={`border border-gray-300 rounded-lg p-3 sm:p-4 cursor-pointer transition-all hover:shadow-md ${
                      selectedDriver?.id === driver.id ? 'ring-2 ring-orange-500 bg-orange-50' : 'bg-white'
                    }`}
                    onClick={() => setSelectedDriver(driver)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                          {driver.avatar}
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-gray-900">{driver.name}</p>
                          <p className="text-xs text-gray-500">{driver.driverId}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        {renderRating(driver.rating)}
                        <span className="text-xs ml-1">({driver.rating})</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mt-2">
                      <div className="flex items-center space-x-1">
                        <FaTruck className="w-3 h-3" />
                        <span>{driver.vehicle.color} {driver.vehicle.model}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FaRoute className="w-3 h-3" />
                        <span>{driver.distanceToPickup} km away</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FaClock className="w-3 h-3" />
                        <span>ETA: {driver.etaToPickup} min</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FaHistory className="w-3 h-3" />
                        <span>{driver.stats.totalRides} rides</span>
                      </div>
                    </div>
                    
                    <div className="mt-2 flex flex-wrap gap-1">
                      {driver.vehicle.features.slice(0, 2).map((feature, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-gray-100 text-xs rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
                
                {filteredDrivers.length === 0 && (
                  <div className="text-center py-8">
                    <FaInfoCircle className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-500">No available drivers found</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Assignment Panel */}
        {(selectedRide || selectedDriver) && (
          <div className="mt-6 bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <FaGavel className="w-5 h-5" style={{ color: 'var(--primary-orange)' }} />
              <span>Manual Assignment Panel</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Selected Ride Summary */}
              <div className="border border-gray-300 rounded-lg p-3">
                <p className="font-medium text-sm text-gray-700 mb-2">Selected Ride:</p>
                {selectedRide ? (
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Ride ID:</span> {selectedRide.rideId}</p>
                    <p><span className="font-medium">Customer:</span> {selectedRide.customer.name}</p>
                    <p><span className="font-medium">Pickup:</span> {selectedRide.pickup.address.split(',')[0]}</p>
                    <p><span className="font-medium">Dropoff:</span> {selectedRide.dropoff.address.split(',')[0]}</p>
                    <p><span className="font-medium">Fare:</span> {formatCurrency(selectedRide.estimatedFare)}</p>
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No ride selected</p>
                )}
              </div>
              
              {/* Selected Driver Summary */}
              <div className="border border-gray-300 rounded-lg p-3">
                <p className="font-medium text-sm text-gray-700 mb-2">Selected Driver:</p>
                {selectedDriver ? (
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Driver:</span> {selectedDriver.name}</p>
                    <p><span className="font-medium">Vehicle:</span> {selectedDriver.vehicle.color} {selectedDriver.vehicle.model}</p>
                    <p><span className="font-medium">License:</span> {selectedDriver.vehicle.licensePlate}</p>
                    <p><span className="font-medium">Distance:</span> {selectedDriver.distanceToPickup} km away</p>
                    <p><span className="font-medium">ETA:</span> {selectedDriver.etaToPickup} minutes</p>
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No driver selected</p>
                )}
              </div>
            </div>
            
            {/* Assignment Note */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Assignment Note (Optional)</label>
              <textarea
                value={assignmentNote}
                onChange={(e) => setAssignmentNote(e.target.value)}
                placeholder="Add a note about this manual assignment..."
                rows="2"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm"
                style={{ borderColor: 'var(--gray-300)', focusRingColor: 'var(--primary-orange)' }}
              />
            </div>
            
            {/* Assign Button */}
            <button
              onClick={handleAssignDriver}
              disabled={!selectedRide || !selectedDriver || assigning}
              className={`w-full py-3 rounded-lg text-white font-semibold transition-all flex items-center justify-center space-x-2 ${
                !selectedRide || !selectedDriver || assigning
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:opacity-90'
              }`}
              style={{ backgroundColor: 'var(--primary-orange)' }}
            >
              {assigning ? (
                <>
                  <FaSpinner className="w-5 h-5 animate-spin" />
                  <span>Assigning...</span>
                </>
              ) : (
                <>
                  <FaUserPlus className="w-5 h-5" />
                  <span>Assign Driver to Ride</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Mobile Sidebar */}
      {isMobileView && sidebarOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setSidebarOpen(false)}></div>
          <div className="fixed right-0 top-0 bottom-0 w-80 bg-white shadow-xl z-50 overflow-y-auto animate-slide-in">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-semibold text-gray-800">Quick Filters</h3>
              <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-lg hover:bg-gray-100">
                <FaTimes className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ride Type</label>
                <select
                  value={filterRideType}
                  onChange={(e) => setFilterRideType(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                  style={{ borderColor: 'var(--gray-300)', focusRingColor: 'var(--primary-orange)' }}
                >
                  <option value="all">All Ride Types</option>
                  <option value="Standard">Standard</option>
                  <option value="Premium">Premium</option>
                  <option value="Luxury">Luxury</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Driver Status</label>
                <select
                  value={filterDriverStatus}
                  onChange={(e) => setFilterDriverStatus(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                  style={{ borderColor: 'var(--gray-300)', focusRingColor: 'var(--primary-orange)' }}
                >
                  <option value="all">All Drivers</option>
                  <option value="available">Available</option>
                  <option value="assigned">Assigned</option>
                </select>
              </div>
              <button
                onClick={() => {
                  setFilterRideType('all');
                  setFilterDriverStatus('all');
                  setSearchRideTerm('');
                  setSearchDriverTerm('');
                  setSidebarOpen(false);
                }}
                className="w-full py-2 rounded-lg text-white"
                style={{ backgroundColor: 'var(--primary-orange)' }}
              >
                Clear All Filters
              </button>
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ManualRideAssignment;