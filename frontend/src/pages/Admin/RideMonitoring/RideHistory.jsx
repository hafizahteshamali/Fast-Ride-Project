import React, { useState, useEffect } from 'react';
import {
  FaHistory,
  FaSearch,
  FaFilter,
  FaCalendarAlt,
  FaUser,
  FaCar,
  FaMapMarkerAlt,
  FaClock,
  FaMoneyBillWave,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaDownload,
  FaShare,
  FaPrint,
  FaEye,
  FaTimes,
  FaCheckCircle,
  FaSpinner,
  FaExclamationTriangle,
  FaArrowLeft,
  FaExpand,
  FaCompress,
  FaBars,
  FaTruck,
  FaRoute,
  FaPhone,
  FaEnvelope,
  FaIdCard,
  FaGasPump,
  FaWifi,
  FaSnowflake,
  FaCoffee,
  FaChild,
  FaPaw,
  FaSmokingBan,
  FaHeadphones,
  FaChartLine,
  FaFileAlt,
  FaInfoCircle,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaChevronLeft,
  FaChevronRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight
} from 'react-icons/fa';

const RideHistory = () => {
  const [rides, setRides] = useState([]);
  const [filteredRides, setFilteredRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRide, setSelectedRide] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  
  // Filter states
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDriver, setSelectedDriver] = useState('all');
  const [selectedCustomer, setSelectedCustomer] = useState('all');
  const [selectedVehicleType, setSelectedVehicleType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortField, setSortField] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // UI states
  const [isMobileView, setIsMobileView] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [fullscreenMode, setFullscreenMode] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  const [viewMode, setViewMode] = useState('table'); // table or cards
  
  // Stats
  const [stats, setStats] = useState({
    totalRides: 0,
    totalRevenue: 0,
    avgRating: 0,
    completionRate: 0
  });

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setIsMobileView(isMobile);
      if (isMobile) {
        setShowFilters(false);
        setSidebarOpen(false);
      } else {
        setShowFilters(true);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch ride history data
  useEffect(() => {
    fetchRideHistory();
  }, []);

  const fetchRideHistory = async () => {
    setLoading(true);
    setTimeout(() => {
      const mockRides = generateMockRides(50);
      setRides(mockRides);
      setFilteredRides(mockRides);
      calculateStats(mockRides);
      setLoading(false);
    }, 1000);
  };

  const generateMockRides = (count) => {
    const rides = [];
    const statuses = ['completed', 'cancelled', 'pending'];
    const vehicleTypes = ['Standard', 'Premium', 'Luxury', 'Electric', 'SUV'];
    const customers = [
      { id: 'CUS001', name: 'John Anderson', email: 'john@email.com', phone: '+1 (555) 123-4567', rating: 4.5 },
      { id: 'CUS002', name: 'Sarah Williams', email: 'sarah@email.com', phone: '+1 (555) 234-5678', rating: 4.8 },
      { id: 'CUS003', name: 'Michael Brown', email: 'michael@email.com', phone: '+1 (555) 345-6789', rating: 4.2 },
      { id: 'CUS004', name: 'Emily Davis', email: 'emily@email.com', phone: '+1 (555) 456-7890', rating: 4.9 },
      { id: 'CUS005', name: 'David Wilson', email: 'david@email.com', phone: '+1 (555) 567-8901', rating: 4.6 }
    ];
    const drivers = [
      { id: 'DRV001', name: 'Michael Rodriguez', vehicle: 'Toyota Camry', plate: 'ABC-1234', rating: 4.8 },
      { id: 'DRV002', name: 'Emily Chen', vehicle: 'Tesla Model 3', plate: 'TESLA-123', rating: 4.9 },
      { id: 'DRV003', name: 'David Kim', vehicle: 'Honda Accord', plate: 'HONDA-456', rating: 4.7 },
      { id: 'DRV004', name: 'Lisa Wang', vehicle: 'BMW 5 Series', plate: 'BMW-789', rating: 4.9 },
      { id: 'DRV005', name: 'James Wilson', vehicle: 'Ford Fusion', plate: 'FORD-321', rating: 4.6 }
    ];
    
    for (let i = 0; i < count; i++) {
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * 90));
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const customer = customers[Math.floor(Math.random() * customers.length)];
      const driver = drivers[Math.floor(Math.random() * drivers.length)];
      const vehicleType = vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)];
      const fare = Math.random() * 50 + 10;
      
      rides.push({
        id: `RID${String(i + 1).padStart(6, '0')}`,
        rideId: `RID${String(i + 1).padStart(6, '0')}`,
        status: status,
        createdAt: date.toISOString(),
        completedAt: status === 'completed' ? new Date(date.getTime() + 1800000).toISOString() : null,
        customer: customer,
        driver: driver,
        vehicleType: vehicleType,
        pickup: {
          address: `${Math.floor(Math.random() * 900) + 100} Main St, New York, NY`,
          coordinates: { lat: 40.7128 + (Math.random() - 0.5) * 0.1, lng: -74.0060 + (Math.random() - 0.5) * 0.1 }
        },
        dropoff: {
          address: `${Math.floor(Math.random() * 900) + 100} Broadway, New York, NY`,
          coordinates: { lat: 40.7580 + (Math.random() - 0.5) * 0.1, lng: -73.9855 + (Math.random() - 0.5) * 0.1 }
        },
        distance: (Math.random() * 15 + 2).toFixed(1),
        duration: Math.floor(Math.random() * 60 + 10),
        fare: {
          base: 2.5,
          distance: (Math.random() * 10 + 2).toFixed(2),
          time: (Math.random() * 5 + 1).toFixed(2),
          surge: Math.random() > 0.7 ? (Math.random() * 2 + 1).toFixed(1) : 1,
          total: fare,
          paymentMethod: ['Credit Card', 'Cash', 'Apple Pay'][Math.floor(Math.random() * 3)]
        },
        rating: status === 'completed' ? (Math.random() * 2 + 3).toFixed(1) : null,
        feedback: status === 'completed' ? ['Great ride!', 'Excellent service', 'Very professional', 'On time', 'Clean vehicle'][Math.floor(Math.random() * 5)] : null
      });
    }
    return rides;
  };

  const calculateStats = (ridesData) => {
    const completedRides = ridesData.filter(r => r.status === 'completed');
    const totalRevenue = completedRides.reduce((sum, ride) => sum + ride.fare.total, 0);
    const avgRating = completedRides.reduce((sum, ride) => sum + parseFloat(ride.rating), 0) / completedRides.length;
    
    setStats({
      totalRides: ridesData.length,
      totalRevenue: totalRevenue,
      avgRating: avgRating.toFixed(1),
      completionRate: ((completedRides.length / ridesData.length) * 100).toFixed(1)
    });
  };

  // Filter and sort rides
  useEffect(() => {
    let filtered = [...rides];
    
    // Date range filter
    if (dateRange.start) {
      filtered = filtered.filter(ride => new Date(ride.createdAt) >= new Date(dateRange.start));
    }
    if (dateRange.end) {
      filtered = filtered.filter(ride => new Date(ride.createdAt) <= new Date(dateRange.end));
    }
    
    // Search term filter
    if (searchTerm) {
      filtered = filtered.filter(ride =>
        ride.rideId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ride.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ride.driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ride.pickup.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Driver filter
    if (selectedDriver !== 'all') {
      filtered = filtered.filter(ride => ride.driver.id === selectedDriver);
    }
    
    // Customer filter
    if (selectedCustomer !== 'all') {
      filtered = filtered.filter(ride => ride.customer.id === selectedCustomer);
    }
    
    // Vehicle type filter
    if (selectedVehicleType !== 'all') {
      filtered = filtered.filter(ride => ride.vehicleType === selectedVehicleType);
    }
    
    // Status filter
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(ride => ride.status === selectedStatus);
    }
    
    // Sorting
    filtered.sort((a, b) => {
      let aVal, bVal;
      
      switch(sortField) {
        case 'createdAt':
          aVal = new Date(a.createdAt);
          bVal = new Date(b.createdAt);
          break;
        case 'fare':
          aVal = a.fare.total;
          bVal = b.fare.total;
          break;
        case 'distance':
          aVal = parseFloat(a.distance);
          bVal = parseFloat(b.distance);
          break;
        case 'duration':
          aVal = a.duration;
          bVal = b.duration;
          break;
        case 'rating':
          aVal = parseFloat(a.rating) || 0;
          bVal = parseFloat(b.rating) || 0;
          break;
        default:
          aVal = a[sortField];
          bVal = b[sortField];
      }
      
      if (sortDirection === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });
    
    setFilteredRides(filtered);
    setCurrentPage(1);
  }, [rides, dateRange, searchTerm, selectedDriver, selectedCustomer, selectedVehicleType, selectedStatus, sortField, sortDirection]);

  // Format date and time
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
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

  // Get status badge
  const getStatusBadge = (status) => {
    const statusMap = {
      'completed': { color: 'text-green-600', bg: 'bg-green-100', icon: FaCheckCircle },
      'cancelled': { color: 'text-red-600', bg: 'bg-red-100', icon: FaExclamationTriangle },
      'pending': { color: 'text-yellow-600', bg: 'bg-yellow-100', icon: FaSpinner }
    };
    const info = statusMap[status] || statusMap['pending'];
    const Icon = info.icon;
    return { ...info, Icon };
  };

  // Render rating stars
  const renderRating = (rating) => {
    if (!rating) return null;
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`star-${i}`} className="w-3 h-3 text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half-star" className="w-3 h-3 text-yellow-400" />);
    }
    return stars;
  };

  // Toggle sort
  const toggleSort = (field) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
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

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRides.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredRides.length / itemsPerPage);

  // Get unique filters
  const uniqueDrivers = [...new Map(rides.map(ride => [ride.driver.id, ride.driver])).values()];
  const uniqueCustomers = [...new Map(rides.map(ride => [ride.customer.id, ride.customer])).values()];
  const uniqueVehicleTypes = [...new Set(rides.map(ride => ride.vehicleType))];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <FaSpinner className="w-10 h-10 sm:w-12 sm:h-12 animate-spin mx-auto mb-4" style={{ color: 'var(--primary-orange)' }} />
          <p className="text-sm sm:text-base text-gray-600">Loading ride history...</p>
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
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Ride History</h1>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Search and filter all historical rides</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
              >
                <FaFilter className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </button>
              <button
                onClick={() => setViewMode(viewMode === 'table' ? 'cards' : 'table')}
                className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {viewMode === 'table' ? <FaFileAlt className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" /> : <FaChartLine className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />}
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

      {/* Stats Cards */}
      <div className="sm:py-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
            <div className="flex items-center justify-between mb-2">
              <FaHistory className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
              <span className="text-xs text-gray-500">Total</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-gray-900">{stats.totalRides}</div>
            <div className="text-xs text-gray-600">Total Rides</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
            <div className="flex items-center justify-between mb-2">
              <FaMoneyBillWave className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
              <span className="text-xs text-gray-500">Revenue</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-gray-900">{formatCurrency(stats.totalRevenue)}</div>
            <div className="text-xs text-gray-600">Total Revenue</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
            <div className="flex items-center justify-between mb-2">
              <FaStar className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
              <span className="text-xs text-gray-500">Rating</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-gray-900">{stats.avgRating}</div>
            <div className="text-xs text-gray-600">Average Rating</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
            <div className="flex items-center justify-between mb-2">
              <FaCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
              <span className="text-xs text-gray-500">Completion</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-gray-900">{stats.completionRate}%</div>
            <div className="text-xs text-gray-600">Completion Rate</div>
          </div>
        </div>

        {/* Filters Section */}
        {(showFilters || !isMobileView) && (
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                <FaFilter className="w-5 h-5" style={{ color: 'var(--primary-orange)' }} />
                <span>Filters</span>
              </h2>
              <button
                onClick={() => {
                  setDateRange({ start: '', end: '' });
                  setSearchTerm('');
                  setSelectedDriver('all');
                  setSelectedCustomer('all');
                  setSelectedVehicleType('all');
                  setSelectedStatus('all');
                }}
                className="text-sm text-orange-600 hover:text-orange-700"
              >
                Clear All
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Date Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                <div className="flex space-x-2">
                  <input
                    type="date"
                    value={dateRange.start}
                    onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                    className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm"
                    style={{ borderColor: 'var(--gray-300)', focusRingColor: 'var(--primary-orange)' }}
                  />
                  <input
                    type="date"
                    value={dateRange.end}
                    onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                    className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm"
                    style={{ borderColor: 'var(--gray-300)', focusRingColor: 'var(--primary-orange)' }}
                  />
                </div>
              </div>
              
              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Ride ID, customer, driver..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm"
                    style={{ borderColor: 'var(--gray-300)', focusRingColor: 'var(--primary-orange)' }}
                  />
                </div>
              </div>
              
              {/* Driver Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Driver</label>
                <select
                  value={selectedDriver}
                  onChange={(e) => setSelectedDriver(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm"
                  style={{ borderColor: 'var(--gray-300)', focusRingColor: 'var(--primary-orange)' }}
                >
                  <option value="all">All Drivers</option>
                  {uniqueDrivers.map(driver => (
                    <option key={driver.id} value={driver.id}>{driver.name}</option>
                  ))}
                </select>
              </div>
              
              {/* Customer Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Customer</label>
                <select
                  value={selectedCustomer}
                  onChange={(e) => setSelectedCustomer(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm"
                  style={{ borderColor: 'var(--gray-300)', focusRingColor: 'var(--primary-orange)' }}
                >
                  <option value="all">All Customers</option>
                  {uniqueCustomers.map(customer => (
                    <option key={customer.id} value={customer.id}>{customer.name}</option>
                  ))}
                </select>
              </div>
              
              {/* Vehicle Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Type</label>
                <select
                  value={selectedVehicleType}
                  onChange={(e) => setSelectedVehicleType(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm"
                  style={{ borderColor: 'var(--gray-300)', focusRingColor: 'var(--primary-orange)' }}
                >
                  <option value="all">All Types</option>
                  {uniqueVehicleTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm"
                  style={{ borderColor: 'var(--gray-300)', focusRingColor: 'var(--primary-orange)' }}
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Results Summary */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <p className="text-sm text-gray-600">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredRides.length)} of {filteredRides.length} rides
          </p>
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-600">Show:</label>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 text-sm"
              style={{ borderColor: 'var(--gray-300)', focusRingColor: 'var(--primary-orange)' }}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>

        {/* Table View */}
        {viewMode === 'table' ? (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => toggleSort('rideId')}>
                      <div className="flex items-center space-x-1">
                        <span>Ride ID</span>
                        {sortField === 'rideId' && (sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />)}
                      </div>
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => toggleSort('createdAt')}>
                      <div className="flex items-center space-x-1">
                        <span>Date & Time</span>
                        {sortField === 'createdAt' && (sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />)}
                      </div>
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Driver</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => toggleSort('fare')}>
                      <div className="flex items-center space-x-1">
                        <span>Fare</span>
                        {sortField === 'fare' && (sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />)}
                      </div>
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentItems.map((ride) => {
                    const statusBadge = getStatusBadge(ride.status);
                    const rideTime = formatDateTime(ride.createdAt);
                    const StatusIcon = statusBadge.Icon;
                    
                    return (
                      <tr key={ride.id} className="hover:bg-gray-50">
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{ride.rideId}</p>
                            <p className="text-xs text-gray-500">{ride.vehicleType}</p>
                          </div>
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                          <div>
                            <p className="text-sm text-gray-900">{rideTime.date}</p>
                            <p className="text-xs text-gray-500">{rideTime.time}</p>
                          </div>
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                              <FaUser className="w-4 h-4 text-gray-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{ride.customer.name}</p>
                              <div className="flex items-center space-x-1">
                                {renderRating(ride.rating)}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                              <FaCar className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{ride.driver.name}</p>
                              <p className="text-xs text-gray-500">{ride.driver.vehicle}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                          <p className="text-sm font-semibold text-gray-900">{formatCurrency(ride.fare.total)}</p>
                          <p className="text-xs text-gray-500">{ride.distance} km • {ride.duration} min</p>
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${statusBadge.bg} ${statusBadge.color} flex items-center space-x-1 w-fit`}>
                            <StatusIcon className="w-3 h-3" />
                            <span>{ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}</span>
                          </span>
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => {
                              setSelectedRide(ride);
                              setShowDetailsModal(true);
                            }}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <FaEye className="w-4 h-4" style={{ color: 'var(--primary-orange)' }} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          // Cards View
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentItems.map((ride) => {
              const statusBadge = getStatusBadge(ride.status);
              const rideTime = formatDateTime(ride.createdAt);
              const StatusIcon = statusBadge.Icon;
              
              return (
                <div key={ride.id} className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-semibold text-gray-900">{ride.rideId}</p>
                      <p className="text-xs text-gray-500">{ride.vehicleType}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${statusBadge.bg} ${statusBadge.color} flex items-center space-x-1`}>
                      <StatusIcon className="w-3 h-3" />
                      <span>{ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}</span>
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Date:</span>
                      <span className="text-gray-900">{rideTime.date} {rideTime.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Customer:</span>
                      <span className="text-gray-900">{ride.customer.name}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Driver:</span>
                      <span className="text-gray-900">{ride.driver.name}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Distance:</span>
                      <span className="text-gray-900">{ride.distance} km</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Duration:</span>
                      <span className="text-gray-900">{ride.duration} min</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Fare:</span>
                      <span className="text-lg font-bold" style={{ color: 'var(--primary-orange)' }}>
                        {formatCurrency(ride.fare.total)}
                      </span>
                    </div>
                    {ride.rating && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">Rating:</span>
                        <div className="flex items-center space-x-1">
                          {renderRating(ride.rating)}
                          <span className="text-xs text-gray-600 ml-1">({ride.rating})</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <button
                    onClick={() => {
                      setSelectedRide(ride);
                      setShowDetailsModal(true);
                    }}
                    className="w-full mt-3 py-2 rounded-lg text-white text-sm font-medium transition-opacity hover:opacity-90"
                    style={{ backgroundColor: 'var(--primary-orange)' }}
                  >
                    View Details
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-6">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaAngleDoubleLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaAngleDoubleRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Ride Details Modal */}
      {showDetailsModal && selectedRide && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setShowDetailsModal(false)}></div>
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Ride Details</h3>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <FaTimes className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              
              <div className="p-6">
                {/* Ride Header */}
                <div className="mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Ride ID</p>
                      <p className="text-xl font-bold text-gray-900">{selectedRide.rideId}</p>
                    </div>
                    {selectedRide.status === 'completed' && selectedRide.rating && (
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Rating</p>
                        <div className="flex items-center space-x-1">
                          {renderRating(selectedRide.rating)}
                          <span className="text-sm font-semibold ml-1">({selectedRide.rating})</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Customer & Driver Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                      <FaUser className="w-4 h-4" style={{ color: 'var(--primary-orange)' }} />
                      <span>Customer Information</span>
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Name:</span> {selectedRide.customer.name}</p>
                      <p><span className="font-medium">Email:</span> {selectedRide.customer.email}</p>
                      <p><span className="font-medium">Phone:</span> {selectedRide.customer.phone}</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                      <FaCar className="w-4 h-4" style={{ color: 'var(--primary-orange)' }} />
                      <span>Driver Information</span>
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Name:</span> {selectedRide.driver.name}</p>
                      <p><span className="font-medium">Vehicle:</span> {selectedRide.driver.vehicle}</p>
                      <p><span className="font-medium">License Plate:</span> {selectedRide.driver.plate}</p>
                    </div>
                  </div>
                </div>
                
                {/* Trip Details */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                    <FaRoute className="w-4 h-4" style={{ color: 'var(--primary-orange)' }} />
                    <span>Trip Details</span>
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <FaMapMarkerAlt className="w-4 h-4 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Pickup Location</p>
                        <p className="text-sm text-gray-600">{selectedRide.pickup.address}</p>
                        <p className="text-xs text-gray-400">{formatDateTime(selectedRide.createdAt).time}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <FaLocationArrow className="w-4 h-4 text-red-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Dropoff Location</p>
                        <p className="text-sm text-gray-600">{selectedRide.dropoff.address}</p>
                        {selectedRide.completedAt && (
                          <p className="text-xs text-gray-400">{formatDateTime(selectedRide.completedAt).time}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Fare Breakdown */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                    <FaMoneyBillWave className="w-4 h-4" style={{ color: 'var(--primary-orange)' }} />
                    <span>Fare Breakdown</span>
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Base Fare</span>
                        <span>{formatCurrency(selectedRide.fare.base)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Distance Fare ({selectedRide.distance} km)</span>
                        <span>{formatCurrency(selectedRide.fare.distance)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Time Fare ({selectedRide.duration} min)</span>
                        <span>{formatCurrency(selectedRide.fare.time)}</span>
                      </div>
                      {selectedRide.fare.surge > 1 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Surge Multiplier ({selectedRide.fare.surge}x)</span>
                          <span className="text-orange-600">+{formatCurrency(selectedRide.fare.total * (selectedRide.fare.surge - 1))}</span>
                        </div>
                      )}
                      <div className="border-t pt-2 mt-2">
                        <div className="flex justify-between font-semibold">
                          <span>Total</span>
                          <span style={{ color: 'var(--primary-orange)' }}>{formatCurrency(selectedRide.fare.total)}</span>
                        </div>
                        <div className="flex justify-between text-sm mt-1">
                          <span className="text-gray-600">Payment Method</span>
                          <span>{selectedRide.fare.paymentMethod}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {selectedRide.feedback && (
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm font-medium text-blue-900 mb-1">Customer Feedback</p>
                    <p className="text-sm text-blue-800">"{selectedRide.feedback}"</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Mobile Sidebar */}
      {isMobileView && sidebarOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setSidebarOpen(false)}></div>
          <div className="fixed right-0 top-0 bottom-0 w-80 bg-white shadow-xl z-50 overflow-y-auto animate-slide-in">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-semibold text-gray-800">Quick Actions</h3>
              <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-lg hover:bg-gray-100">
                <FaTimes className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <FaDownload className="w-5 h-5 text-blue-500" />
                <span className="text-sm">Export Data</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <FaShare className="w-5 h-5 text-green-500" />
                <span className="text-sm">Share Report</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <FaPrint className="w-5 h-5 text-purple-500" />
                <span className="text-sm">Print Summary</span>
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

export default RideHistory;