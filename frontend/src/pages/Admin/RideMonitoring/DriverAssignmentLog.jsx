import React, { useState, useEffect } from 'react';
import {
  FaUserCheck,
  FaUserTimes,
  FaUserClock,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaSearch,
  FaFilter,
  FaCalendarAlt,
  FaUser,
  FaCar,
  FaTruck,
  FaMapMarkerAlt,
  FaPhone,
  FaStar,
  FaEye,
  FaDownload,
  FaShare,
  FaPrint,
  FaExpand,
  FaCompress,
  FaBars,
  FaTimes,
  FaSpinner,
  FaExclamationTriangle,
  FaInfoCircle,
  FaChartLine,
  FaHistory,
  FaArrowLeft,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaChevronLeft,
  FaChevronRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaUserCircle,
  FaEnvelope,
  FaIdCard,
  FaRoute,
  FaLocationArrow,
  FaRegClock
} from 'react-icons/fa';

const DriverAssignmentLog = () => {
  const [assignments, setAssignments] = useState([]);
  const [filteredAssignments, setFilteredAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  });
  const [selectedRide, setSelectedRide] = useState('all');
  const [selectedDriver, setSelectedDriver] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortField, setSortField] = useState('timestamp');
  const [sortDirection, setSortDirection] = useState('desc');
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // UI states
  const [isMobileView, setIsMobileView] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [fullscreenMode, setFullscreenMode] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  const [viewMode, setViewMode] = useState('table');
  
  // Stats
  const [stats, setStats] = useState({
    totalAttempts: 0,
    acceptedCount: 0,
    rejectedCount: 0,
    pendingCount: 0,
    acceptanceRate: 0,
    avgResponseTime: 0
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

  // Fetch assignment log data
  useEffect(() => {
    fetchAssignmentLog();
  }, []);

  const fetchAssignmentLog = async () => {
    setLoading(true);
    setTimeout(() => {
      const mockAssignments = generateMockAssignments(50);
      setAssignments(mockAssignments);
      setFilteredAssignments(mockAssignments);
      calculateStats(mockAssignments);
      setLoading(false);
    }, 1000);
  };

  const generateMockAssignments = (count) => {
    const assignments = [];
    const rides = [
      { id: 'RID001', rideId: 'RID20240315-001', pickup: '123 Main St, NYC', dropoff: '456 Broadway, NYC' },
      { id: 'RID002', rideId: 'RID20240315-002', pickup: '789 Park Ave, NYC', dropoff: '321 Madison Ave, NYC' },
      { id: 'RID003', rideId: 'RID20240315-003', pickup: '555 5th Ave, NYC', dropoff: '888 Broadway, NYC' },
      { id: 'RID004', rideId: 'RID20240316-001', pickup: '100 Wall St, NYC', dropoff: '200 Liberty St, NYC' },
      { id: 'RID005', rideId: 'RID20240316-002', pickup: '300 Columbus Cir, NYC', dropoff: '400 Central Park, NYC' }
    ];
    
    const drivers = [
      { id: 'DRV001', name: 'Michael Rodriguez', phone: '+1 (555) 987-6543', rating: 4.8, vehicle: 'Toyota Camry', plate: 'ABC-1234' },
      { id: 'DRV002', name: 'Emily Chen', phone: '+1 (555) 876-5432', rating: 4.9, vehicle: 'Tesla Model 3', plate: 'TESLA-123' },
      { id: 'DRV003', name: 'David Kim', phone: '+1 (555) 765-4321', rating: 4.7, vehicle: 'Honda Accord', plate: 'HONDA-456' },
      { id: 'DRV004', name: 'Lisa Wang', phone: '+1 (555) 654-3210', rating: 4.9, vehicle: 'BMW 5 Series', plate: 'BMW-789' },
      { id: 'DRV005', name: 'James Wilson', phone: '+1 (555) 543-2109', rating: 4.6, vehicle: 'Ford Fusion', plate: 'FORD-321' },
      { id: 'DRV006', name: 'Maria Garcia', phone: '+1 (555) 432-1098', rating: 4.8, vehicle: 'Hyundai Sonata', plate: 'HYU-789' },
      { id: 'DRV007', name: 'Robert Taylor', phone: '+1 (555) 321-0987', rating: 4.7, vehicle: 'Nissan Altima', plate: 'NIS-456' }
    ];
    
    const statuses = ['accepted', 'rejected', 'pending', 'expired', 'timeout'];
    const rejectionReasons = [
      'Driver too far',
      'Driver busy with another ride',
      'Vehicle unavailable',
      'Driver offline',
      'Ride type mismatch',
      'Time out',
      'Driver rejected manually'
    ];
    
    for (let i = 0; i < count; i++) {
      const ride = rides[Math.floor(Math.random() * rides.length)];
      const driver = drivers[Math.floor(Math.random() * drivers.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * 30));
      date.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));
      
      const assignmentTime = new Date(date);
      const responseTime = status !== 'pending' ? new Date(assignmentTime.getTime() + Math.random() * 30000) : null;
      
      assignments.push({
        id: `ASSIGN-${String(i + 1).padStart(4, '0')}`,
        rideId: ride.id,
        rideNumber: ride.rideId,
        pickup: ride.pickup,
        dropoff: ride.dropoff,
        driver: driver,
        status: status,
        assignmentTime: assignmentTime.toISOString(),
        responseTime: responseTime ? responseTime.toISOString() : null,
        responseDelay: responseTime ? Math.floor((responseTime - assignmentTime) / 1000) : null,
        rejectionReason: status === 'rejected' ? rejectionReasons[Math.floor(Math.random() * rejectionReasons.length)] : null,
        attemptNumber: Math.floor(Math.random() * 3) + 1,
        dispatchMethod: ['Auto-dispatch', 'Manual override', 'Broadcast'][Math.floor(Math.random() * 3)],
        metadata: {
          driverDistance: (Math.random() * 5 + 0.5).toFixed(1),
          driverETA: (Math.random() * 10 + 2).toFixed(1),
          surgeMultiplier: Math.random() > 0.7 ? (Math.random() * 2 + 1).toFixed(1) : 1,
          estimatedFare: (Math.random() * 30 + 10).toFixed(2)
        }
      });
    }
    
    // Sort by assignment time
    return assignments.sort((a, b) => new Date(b.assignmentTime) - new Date(a.assignmentTime));
  };

  const calculateStats = (assignmentsData) => {
    const acceptedCount = assignmentsData.filter(a => a.status === 'accepted').length;
    const rejectedCount = assignmentsData.filter(a => a.status === 'rejected').length;
    const pendingCount = assignmentsData.filter(a => a.status === 'pending').length;
    const respondedAssignments = assignmentsData.filter(a => a.responseDelay !== null);
    const avgResponseTime = respondedAssignments.reduce((sum, a) => sum + a.responseDelay, 0) / respondedAssignments.length;
    
    setStats({
      totalAttempts: assignmentsData.length,
      acceptedCount: acceptedCount,
      rejectedCount: rejectedCount,
      pendingCount: pendingCount,
      acceptanceRate: ((acceptedCount / assignmentsData.length) * 100).toFixed(1),
      avgResponseTime: Math.floor(avgResponseTime)
    });
  };

  // Filter and sort assignments
  useEffect(() => {
    let filtered = [...assignments];
    
    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(assignment =>
        assignment.rideNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assignment.driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assignment.driver.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assignment.pickup.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Date range filter
    if (dateRange.start) {
      filtered = filtered.filter(a => new Date(a.assignmentTime) >= new Date(dateRange.start));
    }
    if (dateRange.end) {
      filtered = filtered.filter(a => new Date(a.assignmentTime) <= new Date(dateRange.end));
    }
    
    // Ride filter
    if (selectedRide !== 'all') {
      filtered = filtered.filter(a => a.rideId === selectedRide);
    }
    
    // Driver filter
    if (selectedDriver !== 'all') {
      filtered = filtered.filter(a => a.driver.id === selectedDriver);
    }
    
    // Status filter
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(a => a.status === selectedStatus);
    }
    
    // Sorting
    filtered.sort((a, b) => {
      let aVal, bVal;
      
      switch(sortField) {
        case 'timestamp':
          aVal = new Date(a.assignmentTime);
          bVal = new Date(b.assignmentTime);
          break;
        case 'driver':
          aVal = a.driver.name;
          bVal = b.driver.name;
          break;
        case 'responseTime':
          aVal = a.responseDelay || Infinity;
          bVal = b.responseDelay || Infinity;
          break;
        case 'distance':
          aVal = parseFloat(a.metadata.driverDistance);
          bVal = parseFloat(b.metadata.driverDistance);
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
    
    setFilteredAssignments(filtered);
    setCurrentPage(1);
  }, [assignments, searchTerm, dateRange, selectedRide, selectedDriver, selectedStatus, sortField, sortDirection]);

  // Format date and time
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      full: date.toLocaleString('en-US')
    };
  };

  // Get status badge
  const getStatusBadge = (status) => {
    const statusMap = {
      'accepted': { color: 'text-green-600', bg: 'bg-green-100', icon: FaCheckCircle, label: 'Accepted' },
      'rejected': { color: 'text-red-600', bg: 'bg-red-100', icon: FaTimesCircle, label: 'Rejected' },
      'pending': { color: 'text-yellow-600', bg: 'bg-yellow-100', icon: FaUserClock, label: 'Pending' },
      'expired': { color: 'text-gray-600', bg: 'bg-gray-100', icon: FaClock, label: 'Expired' },
      'timeout': { color: 'text-orange-600', bg: 'bg-orange-100', icon: FaExclamationTriangle, label: 'Timeout' }
    };
    const info = statusMap[status] || statusMap['pending'];
    const Icon = info.icon;
    return { ...info, Icon };
  };

  // Get dispatch method badge
  const getDispatchMethodBadge = (method) => {
    const methodMap = {
      'Auto-dispatch': { color: 'text-blue-600', bg: 'bg-blue-100' },
      'Manual override': { color: 'text-purple-600', bg: 'bg-purple-100' },
      'Broadcast': { color: 'text-green-600', bg: 'bg-green-100' }
    };
    return methodMap[method] || methodMap['Auto-dispatch'];
  };

  // Format duration
  const formatDuration = (seconds) => {
    if (!seconds) return 'N/A';
    if (seconds < 60) return `${seconds} sec`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
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
  const currentItems = filteredAssignments.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAssignments.length / itemsPerPage);

  // Get unique filters
  const uniqueRides = [...new Map(assignments.map(a => [a.rideId, { id: a.rideId, number: a.rideNumber }])).values()];
  const uniqueDrivers = [...new Map(assignments.map(a => [a.driver.id, a.driver])).values()];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <FaSpinner className="w-10 h-10 sm:w-12 sm:h-12 animate-spin mx-auto mb-4" style={{ color: 'var(--primary-orange)' }} />
          <p className="text-sm sm:text-base text-gray-600">Loading assignment log...</p>
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
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Driver Assignment Log</h1>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">View all dispatch assignment attempts per ride</p>
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
                {viewMode === 'table' ? <FaChartLine className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" /> : <FaHistory className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />}
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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
            <div className="flex items-center justify-between mb-2">
              <FaUserCheck className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
              <span className="text-xs text-gray-500">Total</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-gray-900">{stats.totalAttempts}</div>
            <div className="text-xs text-gray-600">Total Attempts</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
            <div className="flex items-center justify-between mb-2">
              <FaCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
              <span className="text-xs text-gray-500">Accepted</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-green-600">{stats.acceptedCount}</div>
            <div className="text-xs text-gray-600">Accepted</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
            <div className="flex items-center justify-between mb-2">
              <FaTimesCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
              <span className="text-xs text-gray-500">Rejected</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-red-600">{stats.rejectedCount}</div>
            <div className="text-xs text-gray-600">Rejected</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
            <div className="flex items-center justify-between mb-2">
              <FaUserClock className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
              <span className="text-xs text-gray-500">Pending</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-yellow-600">{stats.pendingCount}</div>
            <div className="text-xs text-gray-600">Pending</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
            <div className="flex items-center justify-between mb-2">
              <FaChartLine className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
              <span className="text-xs text-gray-500">Rate</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-purple-600">{stats.acceptanceRate}%</div>
            <div className="text-xs text-gray-600">Acceptance</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
            <div className="flex items-center justify-between mb-2">
              <FaClock className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
              <span className="text-xs text-gray-500">Response</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-orange-600">{stats.avgResponseTime}s</div>
            <div className="text-xs text-gray-600">Avg Response</div>
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
                  setSearchTerm('');
                  setDateRange({ start: '', end: '' });
                  setSelectedRide('all');
                  setSelectedDriver('all');
                  setSelectedStatus('all');
                }}
                className="text-sm text-orange-600 hover:text-orange-700"
              >
                Clear All
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Ride #, driver, vehicle..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm"
                    style={{ borderColor: 'var(--gray-300)', focusRingColor: 'var(--primary-orange)' }}
                  />
                </div>
              </div>
              
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
              
              {/* Ride Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ride</label>
                <select
                  value={selectedRide}
                  onChange={(e) => setSelectedRide(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm"
                  style={{ borderColor: 'var(--gray-300)', focusRingColor: 'var(--primary-orange)' }}
                >
                  <option value="all">All Rides</option>
                  {uniqueRides.map(ride => (
                    <option key={ride.id} value={ride.id}>{ride.number}</option>
                  ))}
                </select>
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
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                  <option value="pending">Pending</option>
                  <option value="expired">Expired</option>
                  <option value="timeout">Timeout</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Results Summary */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <p className="text-sm text-gray-600">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredAssignments.length)} of {filteredAssignments.length} assignments
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
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => toggleSort('timestamp')}>
                      <div className="flex items-center space-x-1">
                        <span>Time</span>
                        {sortField === 'timestamp' && (sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />)}
                      </div>
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ride</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => toggleSort('driver')}>
                      <div className="flex items-center space-x-1">
                        <span>Driver</span>
                        {sortField === 'driver' && (sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />)}
                      </div>
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => toggleSort('responseTime')}>
                      <div className="flex items-center space-x-1">
                        <span>Response</span>
                        {sortField === 'responseTime' && (sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />)}
                      </div>
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentItems.map((assignment) => {
                    const statusBadge = getStatusBadge(assignment.status);
                    const dispatchBadge = getDispatchMethodBadge(assignment.dispatchMethod);
                    const assignmentTime = formatDateTime(assignment.assignmentTime);
                    const StatusIcon = statusBadge.Icon;
                    
                    return (
                      <tr key={assignment.id} className="hover:bg-gray-50">
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                          <div>
                            <p className="text-sm text-gray-900">{assignmentTime.date}</p>
                            <p className="text-xs text-gray-500">{assignmentTime.time}</p>
                          </div>
                        </td>
                        <td className="px-3 sm:px-6 py-4">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{assignment.rideNumber}</p>
                            <p className="text-xs text-gray-500">Attempt #{assignment.attemptNumber}</p>
                          </div>
                        </td>
                        <td className="px-3 sm:px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                              <FaUser className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{assignment.driver.name}</p>
                              <p className="text-xs text-gray-500">{assignment.driver.vehicle}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${statusBadge.bg} ${statusBadge.color} flex items-center space-x-1 w-fit`}>
                            <StatusIcon className="w-3 h-3" />
                            <span>{statusBadge.label}</span>
                          </span>
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                          {assignment.responseDelay ? (
                            <div>
                              <p className="text-sm font-medium text-gray-900">{formatDuration(assignment.responseDelay)}</p>
                              <p className="text-xs text-gray-500">Response time</p>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-400">No response</span>
                          )}
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${dispatchBadge.bg} ${dispatchBadge.color}`}>
                            {assignment.dispatchMethod}
                          </span>
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => {
                              setSelectedAssignment(assignment);
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
            {currentItems.map((assignment) => {
              const statusBadge = getStatusBadge(assignment.status);
              const assignmentTime = formatDateTime(assignment.assignmentTime);
              const StatusIcon = statusBadge.Icon;
              
              return (
                <div key={assignment.id} className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-semibold text-gray-900">{assignment.rideNumber}</p>
                      <p className="text-xs text-gray-500">Attempt #{assignment.attemptNumber}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${statusBadge.bg} ${statusBadge.color} flex items-center space-x-1`}>
                      <StatusIcon className="w-3 h-3" />
                      <span>{statusBadge.label}</span>
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Time:</span>
                      <span className="text-gray-900">{assignmentTime.date} {assignmentTime.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Driver:</span>
                      <span className="text-gray-900">{assignment.driver.name}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Vehicle:</span>
                      <span className="text-gray-900">{assignment.driver.vehicle}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Distance:</span>
                      <span className="text-gray-900">{assignment.metadata.driverDistance} km</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">ETA:</span>
                      <span className="text-gray-900">{assignment.metadata.driverETA} min</span>
                    </div>
                    {assignment.responseDelay && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">Response:</span>
                        <span className="text-orange-600 font-medium">{formatDuration(assignment.responseDelay)}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Method:</span>
                      <span className="text-purple-600">{assignment.dispatchMethod}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => {
                      setSelectedAssignment(assignment);
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

      {/* Assignment Details Modal */}
      {showDetailsModal && selectedAssignment && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setShowDetailsModal(false)}></div>
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Assignment Details</h3>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <FaTimes className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              
              <div className="p-6">
                {/* Header */}
                <div className="mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Assignment ID</p>
                      <p className="text-xl font-bold text-gray-900">{selectedAssignment.id}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Attempt</p>
                      <p className="text-xl font-bold text-gray-900">#{selectedAssignment.attemptNumber}</p>
                    </div>
                  </div>
                </div>
                
                {/* Ride & Driver Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                      <FaRoute className="w-4 h-4" style={{ color: 'var(--primary-orange)' }} />
                      <span>Ride Information</span>
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Ride Number:</span> {selectedAssignment.rideNumber}</p>
                      <div className="flex items-start space-x-2">
                        <FaMapMarkerAlt className="w-3 h-3 text-green-500 mt-0.5" />
                        <span className="text-gray-600">{selectedAssignment.pickup}</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <FaLocationArrow className="w-3 h-3 text-red-500 mt-0.5" />
                        <span className="text-gray-600">{selectedAssignment.dropoff}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                      <FaCar className="w-4 h-4" style={{ color: 'var(--primary-orange)' }} />
                      <span>Driver Information</span>
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Name:</span> {selectedAssignment.driver.name}</p>
                      <p><span className="font-medium">Vehicle:</span> {selectedAssignment.driver.vehicle}</p>
                      <p><span className="font-medium">License Plate:</span> {selectedAssignment.driver.plate}</p>
                      <p><span className="font-medium">Phone:</span> {selectedAssignment.driver.phone}</p>
                      <div className="flex items-center space-x-1">
                        <span className="font-medium">Rating:</span>
                        <div className="flex items-center">
                          <FaStar className="w-3 h-3 text-yellow-400" />
                          <span className="ml-1">{selectedAssignment.driver.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Assignment Details */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                    <FaClock className="w-4 h-4" style={{ color: 'var(--primary-orange)' }} />
                    <span>Assignment Timeline</span>
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Assignment Time</span>
                        <span className="text-sm font-medium text-gray-900">
                          {formatDateTime(selectedAssignment.assignmentTime).full}
                        </span>
                      </div>
                      {selectedAssignment.responseTime && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Response Time</span>
                          <span className="text-sm font-medium text-gray-900">
                            {formatDateTime(selectedAssignment.responseTime).full}
                          </span>
                        </div>
                      )}
                      {selectedAssignment.responseDelay && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Response Delay</span>
                          <span className="text-sm font-bold text-orange-600">
                            {formatDuration(selectedAssignment.responseDelay)}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Dispatch Method</span>
                        <span className="text-sm font-medium text-purple-600">{selectedAssignment.dispatchMethod}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Status & Metadata */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Status Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className={`font-medium ${getStatusBadge(selectedAssignment.status).color}`}>
                          {getStatusBadge(selectedAssignment.status).label}
                        </span>
                      </div>
                      {selectedAssignment.rejectionReason && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Reason:</span>
                          <span className="text-red-600">{selectedAssignment.rejectionReason}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Trip Metadata</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Driver Distance:</span>
                        <span>{selectedAssignment.metadata.driverDistance} km</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Driver ETA:</span>
                        <span>{selectedAssignment.metadata.driverETA} min</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Surge Multiplier:</span>
                        <span>{selectedAssignment.metadata.surgeMultiplier}x</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Estimated Fare:</span>
                        <span className="font-medium">${selectedAssignment.metadata.estimatedFare}</span>
                      </div>
                    </div>
                  </div>
                </div>
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
                <span className="text-sm">Export Log</span>
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

export default DriverAssignmentLog;