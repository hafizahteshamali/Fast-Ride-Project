import React, { useState, useEffect } from 'react';
import {
  FaPercentage,
  FaMoneyBillWave,
  FaChartLine,
  FaSearch,
  FaFilter,
  FaCalendarAlt,
  FaDownload,
  FaShare,
  FaPrint,
  FaEye,
  FaTimes,
  FaArrowLeft,
  FaExpand,
  FaCompress,
  FaBars,
  FaInfoCircle,
  FaChartPie,
  FaChartBar,
  FaDollarSign,
  FaUser,
  FaTruck,
  FaReceipt,
  FaFileInvoice,
  FaCheckCircle,
  FaExclamationTriangle,
  FaSpinner,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaChevronLeft,
  FaChevronRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaCalculator,
  FaHistory,
  FaBuilding,
  FaCreditCard,
  FaWallet,
  FaLongArrowAltUp,
  FaLongArrowAltDown,
  FaArrowRight
} from 'react-icons/fa';

const PlatformCommission = () => {
  const [commissionRides, setCommissionRides] = useState([]);
  const [filteredRides, setFilteredRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRide, setSelectedRide] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  });
  const [minCommission, setMinCommission] = useState('');
  const [maxCommission, setMaxCommission] = useState('');
  const [sortField, setSortField] = useState('date');
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
  const [showStats, setShowStats] = useState(true);
  const [showChart, setShowChart] = useState(false);
  
  // Commission stats
  const [stats, setStats] = useState({
    totalRides: 0,
    totalCustomerFare: 0,
    totalDriverPayout: 0,
    totalCommission: 0,
    avgCommissionRate: 0,
    maxCommission: 0,
    minCommission: 0
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

  // Fetch commission data
  useEffect(() => {
    fetchCommissionData();
  }, []);

  const fetchCommissionData = async () => {
    setLoading(true);
    setTimeout(() => {
      const mockRides = generateMockCommissionRides(50);
      setCommissionRides(mockRides);
      setFilteredRides(mockRides);
      calculateStats(mockRides);
      setLoading(false);
    }, 1000);
  };

  const generateMockCommissionRides = (count) => {
    const rides = [];
    const customers = [
      { id: 'CUS001', name: 'John Anderson', email: 'john@email.com' },
      { id: 'CUS002', name: 'Sarah Williams', email: 'sarah@email.com' },
      { id: 'CUS003', name: 'Michael Brown', email: 'michael@email.com' },
      { id: 'CUS004', name: 'Emily Davis', email: 'emily@email.com' },
      { id: 'CUS005', name: 'David Wilson', email: 'david@email.com' }
    ];
    
    const drivers = [
      { id: 'DRV001', name: 'Michael Rodriguez', vehicle: 'Toyota Camry' },
      { id: 'DRV002', name: 'Emily Chen', vehicle: 'Tesla Model 3' },
      { id: 'DRV003', name: 'David Kim', vehicle: 'Honda Accord' },
      { id: 'DRV004', name: 'Lisa Wang', vehicle: 'BMW 5 Series' },
      { id: 'DRV005', name: 'James Wilson', vehicle: 'Ford Fusion' }
    ];
    
    for (let i = 0; i < count; i++) {
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * 90));
      date.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));
      
      const customer = customers[Math.floor(Math.random() * customers.length)];
      const driver = drivers[Math.floor(Math.random() * drivers.length)];
      const customerFare = Math.random() * 50 + 10;
      const commissionRate = Math.random() * 0.3 + 0.1; // 10% to 40%
      const commission = customerFare * commissionRate;
      const driverPayout = customerFare - commission;
      
      rides.push({
        id: `RID${String(i + 1).padStart(6, '0')}`,
        date: date.toISOString(),
        customer: customer,
        driver: driver,
        customerFare: parseFloat(customerFare.toFixed(2)),
        driverPayout: parseFloat(driverPayout.toFixed(2)),
        commission: parseFloat(commission.toFixed(2)),
        commissionRate: parseFloat((commissionRate * 100).toFixed(1)),
        distance: (Math.random() * 15 + 2).toFixed(1),
        duration: Math.floor(Math.random() * 60 + 10),
        vehicleType: ['Standard', 'Premium', 'Luxury', 'Electric'][Math.floor(Math.random() * 4)],
        surgeMultiplier: Math.random() > 0.7 ? (Math.random() * 2 + 1).toFixed(1) : 1,
        ledgerEntryId: `LEDGER${String(i + 1).padStart(6, '0')}`,
        status: 'completed',
        paymentMethod: ['Credit Card', 'Wallet', 'Cash'][Math.floor(Math.random() * 3)]
      });
    }
    
    return rides.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const calculateStats = (ridesData) => {
    const totalCustomerFare = ridesData.reduce((sum, ride) => sum + ride.customerFare, 0);
    const totalDriverPayout = ridesData.reduce((sum, ride) => sum + ride.driverPayout, 0);
    const totalCommission = ridesData.reduce((sum, ride) => sum + ride.commission, 0);
    const avgCommissionRate = (totalCommission / totalCustomerFare) * 100;
    const maxCommission = Math.max(...ridesData.map(r => r.commission));
    const minCommission = Math.min(...ridesData.map(r => r.commission));
    
    setStats({
      totalRides: ridesData.length,
      totalCustomerFare: totalCustomerFare,
      totalDriverPayout: totalDriverPayout,
      totalCommission: totalCommission,
      avgCommissionRate: avgCommissionRate,
      maxCommission: maxCommission,
      minCommission: minCommission
    });
  };

  // Filter and sort rides
  useEffect(() => {
    let filtered = [...commissionRides];
    
    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(ride =>
        ride.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ride.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ride.driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ride.vehicleType.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Date range filter
    if (dateRange.start) {
      filtered = filtered.filter(r => new Date(r.date) >= new Date(dateRange.start));
    }
    if (dateRange.end) {
      filtered = filtered.filter(r => new Date(r.date) <= new Date(dateRange.end));
    }
    
    // Commission range filter
    if (minCommission) {
      filtered = filtered.filter(r => r.commission >= parseFloat(minCommission));
    }
    if (maxCommission) {
      filtered = filtered.filter(r => r.commission <= parseFloat(maxCommission));
    }
    
    // Sorting
    filtered.sort((a, b) => {
      let aVal, bVal;
      
      switch(sortField) {
        case 'date':
          aVal = new Date(a.date);
          bVal = new Date(b.date);
          break;
        case 'customerFare':
          aVal = a.customerFare;
          bVal = b.customerFare;
          break;
        case 'driverPayout':
          aVal = a.driverPayout;
          bVal = b.driverPayout;
          break;
        case 'commission':
          aVal = a.commission;
          bVal = b.commission;
          break;
        case 'commissionRate':
          aVal = a.commissionRate;
          bVal = b.commissionRate;
          break;
        default:
          aVal = new Date(a.date);
          bVal = new Date(b.date);
      }
      
      if (sortDirection === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });
    
    setFilteredRides(filtered);
    setCurrentPage(1);
  }, [commissionRides, searchTerm, dateRange, minCommission, maxCommission, sortField, sortDirection]);

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

  // Format date
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      full: date.toLocaleString('en-US')
    };
  };

  // Get commission rate color
  const getCommissionRateColor = (rate) => {
    if (rate >= 30) return 'text-red-600 bg-red-100';
    if (rate >= 20) return 'text-orange-600 bg-orange-100';
    if (rate >= 15) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <FaSpinner className="w-10 h-10 sm:w-12 sm:h-12 animate-spin mx-auto mb-4" style={{ color: 'var(--primary-orange)' }} />
          <p className="text-sm sm:text-base text-gray-600">Loading commission data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-50 ${fullscreenMode ? 'fixed inset-0 z-50 overflow-auto' : ''}`}>
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-20">
        <div className="p-2 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div>
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Platform Commission</h1>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Commission earned per ride (Customer fare - Driver payout)</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <button
                onClick={() => setShowStats(!showStats)}
                className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <FaChartLine className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </button>
              <button
                onClick={() => setShowChart(!showChart)}
                className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <FaChartPie className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </button>
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
                {viewMode === 'table' ? <FaFileInvoice className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" /> : <FaHistory className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />}
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

      {/* Stats Cards - Using Flexbox */}
      {showStats && (
        <div className="py-4">
          <div className="flex flex-wrap -mx-2">
            <div className="w-1/2 sm:w-1/3 lg:w-1/6 px-2 mb-4">
              <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
                <div className="flex items-center justify-between mb-2">
                  <FaReceipt className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                  <span className="text-xs text-gray-500">Total</span>
                </div>
                <div className="text-lg sm:text-xl font-bold text-gray-900">{stats.totalRides}</div>
                <div className="text-xs text-gray-600">Total Rides</div>
              </div>
            </div>
            <div className="w-1/2 sm:w-1/3 lg:w-1/6 px-2 mb-4">
              <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
                <div className="flex items-center justify-between mb-2">
                  <FaDollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                  <span className="text-xs text-gray-500">Revenue</span>
                </div>
                <div className="text-lg sm:text-xl font-bold text-green-600">{formatCurrency(stats.totalCustomerFare)}</div>
                <div className="text-xs text-gray-600">Customer Fare</div>
              </div>
            </div>
            <div className="w-1/2 sm:w-1/3 lg:w-1/6 px-2 mb-4">
              <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
                <div className="flex items-center justify-between mb-2">
                  <FaTruck className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
                  <span className="text-xs text-gray-500">Payout</span>
                </div>
                <div className="text-lg sm:text-xl font-bold text-purple-600">{formatCurrency(stats.totalDriverPayout)}</div>
                <div className="text-xs text-gray-600">Driver Payout</div>
              </div>
            </div>
            <div className="w-1/2 sm:w-1/3 lg:w-1/6 px-2 mb-4">
              <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
                <div className="flex items-center justify-between mb-2">
                  <FaPercentage className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                  <span className="text-xs text-gray-500">Commission</span>
                </div>
                <div className="text-lg sm:text-xl font-bold text-orange-600">{formatCurrency(stats.totalCommission)}</div>
                <div className="text-xs text-gray-600">Total Commission</div>
              </div>
            </div>
            <div className="w-1/2 sm:w-1/3 lg:w-1/6 px-2 mb-4">
              <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
                <div className="flex items-center justify-between mb-2">
                  <FaChartLine className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-500" />
                  <span className="text-xs text-gray-500">Rate</span>
                </div>
                <div className="text-lg sm:text-xl font-bold text-indigo-600">{stats.avgCommissionRate.toFixed(1)}%</div>
                <div className="text-xs text-gray-600">Avg Commission</div>
              </div>
            </div>
            <div className="w-1/2 sm:w-1/3 lg:w-1/6 px-2 mb-4">
              <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
                <div className="flex items-center justify-between mb-2">
                  <FaCalculator className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                  <span className="text-xs text-gray-500">Range</span>
                </div>
                <div className="text-sm font-bold text-gray-900">
                  {formatCurrency(stats.minCommission)} - {formatCurrency(stats.maxCommission)}
                </div>
                <div className="text-xs text-gray-600">Min - Max</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Commission Summary Chart */}
      {showChart && (
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <FaChartBar className="w-5 h-5" style={{ color: 'var(--primary-orange)' }} />
              <span>Commission Analysis</span>
            </h3>
            <div className="flex flex-wrap -mx-2">
              <div className="w-full sm:w-1/2 px-2 mb-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-700 mb-3">Commission by Vehicle Type</p>
                  <div className="space-y-3">
                    {['Standard', 'Premium', 'Luxury', 'Electric'].map(type => {
                      const ridesByType = commissionRides.filter(r => r.vehicleType === type);
                      const totalCommission = ridesByType.reduce((sum, r) => sum + r.commission, 0);
                      const avgRate = ridesByType.length > 0 ? (totalCommission / ridesByType.reduce((sum, r) => sum + r.customerFare, 0) * 100) : 0;
                      
                      return (
                        <div key={type} className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">{type}</span>
                          <div className="text-right">
                            <span className="text-sm font-semibold text-gray-900">{formatCurrency(totalCommission)}</span>
                            <span className="text-xs text-gray-500 ml-2">({avgRate.toFixed(1)}% rate)</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="w-full sm:w-1/2 px-2 mb-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-700 mb-3">Top Commission Rides</p>
                  <div className="space-y-3">
                    {commissionRides.sort((a, b) => b.commission - a.commission).slice(0, 5).map(ride => (
                      <div key={ride.id} className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{ride.id}</p>
                          <p className="text-xs text-gray-500">{ride.vehicleType}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-orange-600">{formatCurrency(ride.commission)}</p>
                          <p className="text-xs text-gray-500">{ride.commissionRate}% rate</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="sm:py-6 lg:py-2">
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
                  setMinCommission('');
                  setMaxCommission('');
                }}
                className="text-sm text-orange-600 hover:text-orange-700"
              >
                Clear All
              </button>
            </div>
            
            <div className="flex flex-wrap -mx-2">
              <div className="w-full sm:w-1/2 lg:w-1/4 px-2 mb-4">
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
              
              <div className="w-full sm:w-1/2 lg:w-1/4 px-2 mb-4">
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
              
              <div className="w-full sm:w-1/2 lg:w-1/4 px-2 mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Min Commission</label>
                <div className="relative">
                  <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Min amount"
                    value={minCommission}
                    onChange={(e) => setMinCommission(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm"
                    style={{ borderColor: 'var(--gray-300)', focusRingColor: 'var(--primary-orange)' }}
                  />
                </div>
              </div>
              
              <div className="w-full sm:w-1/2 lg:w-1/4 px-2 mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Commission</label>
                <div className="relative">
                  <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Max amount"
                    value={maxCommission}
                    onChange={(e) => setMaxCommission(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm"
                    style={{ borderColor: 'var(--gray-300)', focusRingColor: 'var(--primary-orange)' }}
                  />
                </div>
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
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
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
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => toggleSort('date')}>
                      <div className="flex items-center space-x-1">
                        <span>Date</span>
                        {sortField === 'date' && (sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />)}
                      </div>
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ride</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => toggleSort('customerFare')}>
                      <div className="flex items-center space-x-1">
                        <span>Customer Fare</span>
                        {sortField === 'customerFare' && (sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />)}
                      </div>
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => toggleSort('driverPayout')}>
                      <div className="flex items-center space-x-1">
                        <span>Driver Payout</span>
                        {sortField === 'driverPayout' && (sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />)}
                      </div>
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => toggleSort('commission')}>
                      <div className="flex items-center space-x-1">
                        <span>Commission</span>
                        {sortField === 'commission' && (sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />)}
                      </div>
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentItems.map((ride) => {
                    const rideDate = formatDateTime(ride.date);
                    const rateColor = getCommissionRateColor(ride.commissionRate);
                    
                    return (
                      <tr key={ride.id} className="hover:bg-gray-50">
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                          <div>
                            <p className="text-sm text-gray-900">{rideDate.date}</p>
                            <p className="text-xs text-gray-500">{rideDate.time}</p>
                          </div>
                        </td>
                        <td className="px-3 sm:px-6 py-4">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{ride.id}</p>
                            <p className="text-xs text-gray-500">{ride.vehicleType}</p>
                            <p className="text-xs text-gray-400">{ride.customer.name} → {ride.driver.name}</p>
                          </div>
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                          <p className="text-sm font-semibold text-green-600">{formatCurrency(ride.customerFare)}</p>
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                          <p className="text-sm font-semibold text-purple-600">{formatCurrency(ride.driverPayout)}</p>
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                          <p className="text-sm font-bold text-orange-600">{formatCurrency(ride.commission)}</p>
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${rateColor}`}>
                            {ride.commissionRate}%
                          </span>
                          {ride.surgeMultiplier > 1 && (
                            <p className="text-xs text-orange-500 mt-1">{ride.surgeMultiplier}x Surge</p>
                          )}
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
          // Cards View - Using Flexbox
          <div className="flex flex-wrap -mx-2">
            {currentItems.map((ride) => {
              const rideDate = formatDateTime(ride.date);
              const rateColor = getCommissionRateColor(ride.commissionRate);
              
              return (
                <div key={ride.id} className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
                  <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow h-full">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-semibold text-gray-900">{ride.id}</p>
                        <p className="text-xs text-gray-500">{rideDate.date} {rideDate.time}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${rateColor}`}>
                        {ride.commissionRate}% Commission
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="bg-gray-50 rounded-lg p-2">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-gray-500">Customer</span>
                          <span className="text-xs text-gray-500">Driver</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-sm font-medium text-gray-900">{ride.customer.name}</p>
                          <p className="text-sm font-medium text-gray-900">{ride.driver.name}</p>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">{ride.vehicleType}</p>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-xs text-gray-500">Customer Fare</p>
                          <p className="text-lg font-bold text-green-600">{formatCurrency(ride.customerFare)}</p>
                        </div>
                        <FaArrowRight className="w-4 h-4 text-gray-400" />
                        <div className="text-right">
                          <p className="text-xs text-gray-500">Driver Payout</p>
                          <p className="text-lg font-bold text-purple-600">{formatCurrency(ride.driverPayout)}</p>
                        </div>
                      </div>
                      
                      <div className="bg-orange-50 rounded-lg p-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Platform Commission</span>
                          <span className="text-xl font-bold text-orange-600">{formatCurrency(ride.commission)}</span>
                        </div>
                        {ride.surgeMultiplier > 1 && (
                          <p className="text-xs text-orange-500 mt-1">Surge Multiplier: {ride.surgeMultiplier}x</p>
                        )}
                      </div>
                      
                      <button
                        onClick={() => {
                          setSelectedRide(ride);
                          setShowDetailsModal(true);
                        }}
                        className="w-full mt-2 py-2 rounded-lg text-white text-sm font-medium transition-opacity hover:opacity-90"
                        style={{ backgroundColor: 'var(--primary-orange)' }}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
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

        {filteredRides.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg">
            <FaInfoCircle className="w-12 h-12 mx-auto text-gray-400 mb-3" />
            <p className="text-gray-500">No commission records found</p>
          </div>
        )}
      </div>

      {/* Commission Details Modal */}
      {showDetailsModal && selectedRide && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-40 modal-enter"></div>
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50 modal-content-enter">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto modal-scroll border border-gray-200">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                    <FaCalculator className="w-5 h-5 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Commission Details</h3>
                </div>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <FaTimes className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="p-6">
                {/* Header */}
                <div className="mb-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Ride ID</p>
                      <p className="text-2xl font-bold text-gray-900">{selectedRide.id}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500 font-medium">Date & Time</p>
                      <p className="text-sm text-gray-900 font-semibold">{formatDateTime(selectedRide.date).full}</p>
                    </div>
                  </div>
                </div>

                {/* Customer & Driver Info */}
                <div className="flex flex-wrap -mx-2 mb-8">
                  <div className="w-full md:w-1/2 px-2 mb-4">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
                      <h4 className="font-bold text-blue-900 mb-4 flex items-center space-x-2">
                        <FaUser className="w-5 h-5" />
                        <span>Customer Information</span>
                      </h4>
                      <div className="space-y-3 text-sm">
                        <p><span className="font-semibold">Name:</span> {selectedRide.customer.name}</p>
                        <p><span className="font-semibold">Email:</span> {selectedRide.customer.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-1/2 px-2 mb-4">
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 border border-purple-200">
                      <h4 className="font-bold text-purple-900 mb-4 flex items-center space-x-2">
                        <FaTruck className="w-5 h-5" />
                        <span>Driver Information</span>
                      </h4>
                      <div className="space-y-3 text-sm">
                        <p><span className="font-semibold">Name:</span> {selectedRide.driver.name}</p>
                        <p><span className="font-semibold">Vehicle:</span> {selectedRide.driver.vehicle}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Financial Breakdown */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 mb-8 border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-5 text-lg">Financial Breakdown</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-gray-300">
                      <span className="text-gray-700 font-medium">Customer Fare</span>
                      <span className="text-xl font-bold text-green-600">{formatCurrency(selectedRide.customerFare)}</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-gray-300">
                      <span className="text-gray-700 font-medium">Driver Payout</span>
                      <span className="text-xl font-bold text-purple-600">{formatCurrency(selectedRide.driverPayout)}</span>
                    </div>
                    <div className="flex justify-between items-center pt-3">
                      <span className="text-xl font-bold text-gray-900">Platform Commission</span>
                      <div className="text-right">
                        <span className="text-3xl font-bold text-orange-600">{formatCurrency(selectedRide.commission)}</span>
                        <p className="text-sm text-gray-600 font-medium">({selectedRide.commissionRate}% of fare)</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trip Details */}
                <div className="flex flex-wrap -mx-2 mb-8">
                  <div className="w-full sm:w-1/2 px-2 mb-4">
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
                      <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Distance</p>
                      <p className="text-xl font-bold text-gray-900">{selectedRide.distance} km</p>
                    </div>
                  </div>
                  <div className="w-full sm:w-1/2 px-2 mb-4">
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
                      <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Duration</p>
                      <p className="text-xl font-bold text-gray-900">{selectedRide.duration} min</p>
                    </div>
                  </div>
                  <div className="w-full sm:w-1/2 px-2 mb-4">
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
                      <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Vehicle Type</p>
                      <p className="text-xl font-bold text-gray-900">{selectedRide.vehicleType}</p>
                    </div>
                  </div>
                  <div className="w-full sm:w-1/2 px-2 mb-4">
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
                      <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Payment Method</p>
                      <p className="text-xl font-bold text-gray-900">{selectedRide.paymentMethod}</p>
                    </div>
                  </div>
                </div>

                {/* Ledger Reference */}
                <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
                  <p className="text-xs text-gray-600 font-medium uppercase tracking-wide">Ledger Entry Reference</p>
                  <p className="text-sm font-mono text-gray-800 font-semibold mt-1">{selectedRide.ledgerEntryId}</p>
                  <p className="text-xs text-gray-600 mt-2">This commission is recorded in the finance ledger</p>
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
                <span className="text-sm">Export Report</span>
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

export default PlatformCommission;