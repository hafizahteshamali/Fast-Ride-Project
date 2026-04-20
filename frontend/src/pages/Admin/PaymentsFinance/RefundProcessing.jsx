import React, { useState, useEffect } from 'react';
import {
  FaMoneyBillWave,
  FaUndo,
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
  FaChartLine,
  FaCheckCircle,
  FaExclamationTriangle,
  FaSpinner,
  FaUser,
  FaTruck,
  FaCreditCard,
  FaWallet,
  FaReceipt,
  FaFileInvoice,
  FaDollarSign,
  FaClock,
  FaHistory,
  FaPlus,
  FaMinus,
  FaChevronLeft,
  FaChevronRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaCopy,
  FaEnvelope,
  FaPhone,
  FaIdCard,
  FaCalculator,
  FaSortDown
} from 'react-icons/fa';

const RefundProcessing = () => {
  const [completedRides, setCompletedRides] = useState([]);
  const [filteredRides, setFilteredRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRide, setSelectedRide] = useState(null);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [refundAmount, setRefundAmount] = useState('');
  const [refundReason, setRefundReason] = useState('');
  const [refundMethod, setRefundMethod] = useState('original');
  const [processingRefund, setProcessingRefund] = useState(false);
  const [refundSuccess, setRefundSuccess] = useState(null);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  });
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('all');
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
  
  // Stats
  const [stats, setStats] = useState({
    totalRides: 0,
    totalRefundable: 0,
    totalRefundedAmount: 0,
    pendingRefunds: 0,
    completedRefunds: 0,
    avgRefundAmount: 0
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

  // Fetch completed rides data
  useEffect(() => {
    fetchCompletedRides();
  }, []);

  const fetchCompletedRides = async () => {
    setLoading(true);
    setTimeout(() => {
      const mockRides = generateMockCompletedRides(50);
      setCompletedRides(mockRides);
      setFilteredRides(mockRides);
      calculateStats(mockRides);
      setLoading(false);
    }, 1000);
  };

  const generateMockCompletedRides = (count) => {
    const rides = [];
    const customers = [
      { id: 'CUS001', name: 'John Anderson', email: 'john@email.com', phone: '+1 (555) 123-4567' },
      { id: 'CUS002', name: 'Sarah Williams', email: 'sarah@email.com', phone: '+1 (555) 234-5678' },
      { id: 'CUS003', name: 'Michael Brown', email: 'michael@email.com', phone: '+1 (555) 345-6789' },
      { id: 'CUS004', name: 'Emily Davis', email: 'emily@email.com', phone: '+1 (555) 456-7890' },
      { id: 'CUS005', name: 'David Wilson', email: 'david@email.com', phone: '+1 (555) 567-8901' }
    ];
    
    const drivers = [
      { id: 'DRV001', name: 'Michael Rodriguez', vehicle: 'Toyota Camry' },
      { id: 'DRV002', name: 'Emily Chen', vehicle: 'Tesla Model 3' },
      { id: 'DRV003', name: 'David Kim', vehicle: 'Honda Accord' }
    ];
    
    for (let i = 0; i < count; i++) {
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * 30));
      date.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));
      
      const customer = customers[Math.floor(Math.random() * customers.length)];
      const driver = drivers[Math.floor(Math.random() * drivers.length)];
      const amount = Math.random() * 50 + 10;
      const isRefunded = Math.random() > 0.8;
      const paymentMethod = ['Credit Card', 'Wallet', 'Cash'][Math.floor(Math.random() * 3)];
      
      rides.push({
        id: `RID${String(i + 1).padStart(6, '0')}`,
        date: date.toISOString(),
        customer: customer,
        driver: driver,
        amount: parseFloat(amount.toFixed(2)),
        paymentMethod: paymentMethod,
        status: isRefunded ? 'refunded' : 'completed',
        refundAmount: isRefunded ? parseFloat((amount * 0.8).toFixed(2)) : null,
        refundDate: isRefunded ? new Date(date.getTime() + 86400000).toISOString() : null,
        refundReason: isRefunded ? ['Customer complaint', 'Wrong route taken', 'Driver issue', 'Payment error'][Math.floor(Math.random() * 4)] : null,
        transactionId: `TXN${String(i + 1).padStart(8, '0')}`,
        distance: (Math.random() * 15 + 2).toFixed(1),
        duration: Math.floor(Math.random() * 60 + 10),
        vehicleType: ['Standard', 'Premium', 'Luxury'][Math.floor(Math.random() * 3)],
        eligibleForRefund: !isRefunded && Math.random() > 0.3
      });
    }
    
    return rides.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const calculateStats = (ridesData) => {
    const totalRides = ridesData.length;
    const totalRefundable = ridesData.filter(r => r.eligibleForRefund).length;
    const totalRefundedAmount = ridesData.filter(r => r.status === 'refunded').reduce((sum, r) => sum + (r.refundAmount || 0), 0);
    const completedRefunds = ridesData.filter(r => r.status === 'refunded').length;
    const avgRefundAmount = completedRefunds > 0 ? totalRefundedAmount / completedRefunds : 0;
    
    setStats({
      totalRides: totalRides,
      totalRefundable: totalRefundable,
      totalRefundedAmount: totalRefundedAmount,
      pendingRefunds: 0,
      completedRefunds: completedRefunds,
      avgRefundAmount: avgRefundAmount
    });
  };

  // Filter and sort rides
  useEffect(() => {
    let filtered = [...completedRides];
    
    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(ride =>
        ride.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ride.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ride.driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ride.transactionId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Date range filter
    if (dateRange.start) {
      filtered = filtered.filter(r => new Date(r.date) >= new Date(dateRange.start));
    }
    if (dateRange.end) {
      filtered = filtered.filter(r => new Date(r.date) <= new Date(dateRange.end));
    }
    
    // Payment method filter
    if (selectedPaymentMethod !== 'all') {
      filtered = filtered.filter(r => r.paymentMethod === selectedPaymentMethod);
    }
    
    // Sorting
    filtered.sort((a, b) => {
      let aVal, bVal;
      
      switch(sortField) {
        case 'date':
          aVal = new Date(a.date);
          bVal = new Date(b.date);
          break;
        case 'amount':
          aVal = a.amount;
          bVal = b.amount;
          break;
        case 'customer':
          aVal = a.customer.name;
          bVal = b.customer.name;
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
  }, [completedRides, searchTerm, dateRange, selectedPaymentMethod, sortField, sortDirection]);

  // Handle refund processing
  const handleRefund = async () => {
    if (!refundAmount || refundAmount <= 0) {
      alert('Please enter a valid refund amount');
      return;
    }
    
    if (!refundReason) {
      alert('Please provide a reason for the refund');
      return;
    }
    
    setProcessingRefund(true);
    
    setTimeout(() => {
      // Update ride status
      const updatedRides = completedRides.map(ride =>
        ride.id === selectedRide.id
          ? {
              ...ride,
              status: 'refunded',
              refundAmount: parseFloat(refundAmount),
              refundDate: new Date().toISOString(),
              refundReason: refundReason
            }
          : ride
      );
      
      setCompletedRides(updatedRides);
      
      // Create WalletTransaction record
      const walletTransaction = {
        id: `WLTXN${Date.now()}`,
        userId: selectedRide.customer.id,
        userType: 'customer',
        type: 'refund',
        amount: parseFloat(refundAmount),
        reason: refundReason,
        date: new Date().toISOString(),
        status: 'completed',
        referenceId: selectedRide.id,
        rideId: selectedRide.id,
        paymentMethod: refundMethod,
        refundMethod: refundMethod
      };
      
      console.log('WalletTransaction created:', walletTransaction);
      console.log('Payment Status updated to: REFUNDED for ride:', selectedRide.id);
      
      setRefundSuccess({
        success: true,
        message: `Successfully processed refund of ${formatCurrency(parseFloat(refundAmount))} for ride ${selectedRide.id}`
      });
      
      // Close modal and reset
      setShowRefundModal(false);
      setRefundAmount('');
      setRefundReason('');
      setSelectedRide(null);
      setProcessingRefund(false);
      
      // Refresh stats
      calculateStats(updatedRides);
      
      setTimeout(() => {
        setRefundSuccess(null);
      }, 5000);
    }, 1500);
  };

  // Open refund modal
  const openRefundModal = (ride) => {
    setSelectedRide(ride);
    setRefundAmount(ride.amount.toString());
    setShowRefundModal(true);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
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

  // Get status badge
  const getStatusBadge = (status) => {
    if (status === 'refunded') {
      return { color: 'text-green-600', bg: 'bg-green-100', icon: FaCheckCircle, label: 'Refunded' };
    }
    return { color: 'text-blue-600', bg: 'bg-blue-100', icon: FaCheckCircle, label: 'Completed' };
  };

  // Get payment method icon
  const getPaymentMethodIcon = (method) => {
    const methodMap = {
      'Credit Card': FaCreditCard,
      'Wallet': FaWallet,
      'Cash': FaMoneyBillWave
    };
    return methodMap[method] || FaCreditCard;
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

  // Get unique payment methods
  const uniquePaymentMethods = [...new Set(completedRides.map(r => r.paymentMethod))];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <FaSpinner className="w-10 h-10 sm:w-12 sm:h-12 animate-spin mx-auto mb-4" style={{ color: 'var(--primary-orange)' }} />
          <p className="text-sm sm:text-base text-gray-600">Loading ride data...</p>
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
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Refund Processing</h1>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Initiate manual refund for disputed rides</p>
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

      {/* Success Message */}
      {refundSuccess && (
        <div className="fixed top-20 right-4 z-50 animate-slide-in max-w-sm">
          <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-lg shadow-lg">
            <div className="flex items-center space-x-3">
              <FaCheckCircle className="w-5 h-5 text-green-400" />
              <div>
                <p className="text-green-800 text-sm font-medium">Refund Successful</p>
                <p className="text-green-700 text-xs">{refundSuccess.message}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Cards - Using Flexbox */}
      {showStats && (
        <div className="py-4">
          <div className="flex flex-wrap -mx-2">
            <div className="w-1/2 sm:w-1/3 lg:w-1/5 px-2 mb-4">
              <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
                <div className="flex items-center justify-between mb-2">
                  <FaReceipt className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                  <span className="text-xs text-gray-500">Total</span>
                </div>
                <div className="text-lg sm:text-xl font-bold text-gray-900">{stats.totalRides}</div>
                <div className="text-xs text-gray-600">Total Rides</div>
              </div>
            </div>
            <div className="w-1/2 sm:w-1/3 lg:w-1/5 px-2 mb-4">
              <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
                <div className="flex items-center justify-between mb-2">
                  <FaUndo className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                  <span className="text-xs text-gray-500">Refundable</span>
                </div>
                <div className="text-lg sm:text-xl font-bold text-orange-600">{stats.totalRefundable}</div>
                <div className="text-xs text-gray-600">Eligible Rides</div>
              </div>
            </div>
            <div className="w-1/2 sm:w-1/3 lg:w-1/5 px-2 mb-4">
              <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
                <div className="flex items-center justify-between mb-2">
                  <FaMoneyBillWave className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                  <span className="text-xs text-gray-500">Refunded</span>
                </div>
                <div className="text-lg sm:text-xl font-bold text-green-600">{formatCurrency(stats.totalRefundedAmount)}</div>
                <div className="text-xs text-gray-600">Total Refunded</div>
              </div>
            </div>
            <div className="w-1/2 sm:w-1/3 lg:w-1/5 px-2 mb-4">
              <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
                <div className="flex items-center justify-between mb-2">
                  <FaCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
                  <span className="text-xs text-gray-500">Completed</span>
                </div>
                <div className="text-lg sm:text-xl font-bold text-purple-600">{stats.completedRefunds}</div>
                <div className="text-xs text-gray-600">Refunds Processed</div>
              </div>
            </div>
            <div className="w-1/2 sm:w-1/3 lg:w-1/5 px-2 mb-4">
              <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
                <div className="flex items-center justify-between mb-2">
                  <FaCalculator className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-500" />
                  <span className="text-xs text-gray-500">Average</span>
                </div>
                <div className="text-lg sm:text-xl font-bold text-indigo-600">{formatCurrency(stats.avgRefundAmount)}</div>
                <div className="text-xs text-gray-600">Avg Refund</div>
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
                  setSelectedPaymentMethod('all');
                }}
                className="text-sm text-orange-600 hover:text-orange-700"
              >
                Clear All
              </button>
            </div>
            
            <div className="flex flex-wrap -mx-2">
              <div className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4">
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
              
              <div className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4">
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
              
              <div className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                <select
                  value={selectedPaymentMethod}
                  onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm"
                  style={{ borderColor: 'var(--gray-300)', focusRingColor: 'var(--primary-orange)' }}
                >
                  <option value="all">All Methods</option>
                  {uniquePaymentMethods.map(method => (
                    <option key={method} value={method}>{method}</option>
                  ))}
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
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ride ID</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => toggleSort('customer')}>
                      <div className="flex items-center space-x-1">
                        <span>Customer</span>
                        {sortField === 'customer' && (sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />)}
                      </div>
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => toggleSort('amount')}>
                      <div className="flex items-center space-x-1">
                        <span>Amount</span>
                        {sortField === 'amount' && (sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />)}
                      </div>
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentItems.map((ride) => {
                    const rideDate = formatDateTime(ride.date);
                    const statusBadge = getStatusBadge(ride.status);
                    const PaymentIcon = getPaymentMethodIcon(ride.paymentMethod);
                    const StatusIcon = statusBadge.icon;
                    
                    return (
                      <tr key={ride.id} className="hover:bg-gray-50">
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                          <div>
                            <p className="text-sm text-gray-900">{rideDate.date}</p>
                            <p className="text-xs text-gray-500">{rideDate.time}</p>
                          </div>
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                          <p className="text-sm font-medium text-gray-900">{ride.id}</p>
                          <p className="text-xs text-gray-500">{ride.transactionId}</p>
                        </td>
                        <td className="px-3 sm:px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                              <FaUser className="w-4 h-4 text-gray-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{ride.customer.name}</p>
                              <p className="text-xs text-gray-500">{ride.driver.name}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                          <p className="text-sm font-semibold text-gray-900">{formatCurrency(ride.amount)}</p>
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <PaymentIcon className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">{ride.paymentMethod}</span>
                          </div>
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${statusBadge.bg} ${statusBadge.color} flex items-center space-x-1 w-fit`}>
                            <StatusIcon className="w-3 h-3" />
                            <span>{statusBadge.label}</span>
                          </span>
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                          {ride.eligibleForRefund ? (
                            <button
                              onClick={() => openRefundModal(ride)}
                              className="px-3 py-1.5 rounded-lg text-white text-sm flex items-center space-x-1 hover:opacity-90"
                              style={{ backgroundColor: 'var(--primary-orange)' }}
                            >
                              <FaUndo className="w-4 h-4" />
                              <span>Refund</span>
                            </button>
                          ) : ride.status === 'refunded' ? (
                            <span className="text-xs text-green-600">Already Refunded</span>
                          ) : (
                            <span className="text-xs text-gray-400">Not Eligible</span>
                          )}
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
              const statusBadge = getStatusBadge(ride.status);
              const PaymentIcon = getPaymentMethodIcon(ride.paymentMethod);
              const StatusIcon = statusBadge.icon;
              
              return (
                <div key={ride.id} className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
                  <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow h-full">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-semibold text-gray-900">{ride.id}</p>
                        <p className="text-xs text-gray-500">{rideDate.date} {rideDate.time}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${statusBadge.bg} ${statusBadge.color} flex items-center space-x-1`}>
                        <StatusIcon className="w-3 h-3" />
                        <span>{statusBadge.label}</span>
                      </span>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">Customer:</span>
                        <span className="text-gray-900">{ride.customer.name}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">Driver:</span>
                        <span className="text-gray-900">{ride.driver.name}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">Amount:</span>
                        <span className="text-lg font-bold" style={{ color: 'var(--primary-orange)' }}>
                          {formatCurrency(ride.amount)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">Payment:</span>
                        <div className="flex items-center space-x-2">
                          <PaymentIcon className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600">{ride.paymentMethod}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">Vehicle:</span>
                        <span className="text-gray-600">{ride.vehicleType}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">Distance:</span>
                        <span className="text-gray-600">{ride.distance} km</span>
                      </div>
                    </div>
                    
                    {ride.eligibleForRefund ? (
                      <button
                        onClick={() => openRefundModal(ride)}
                        className="w-full mt-3 py-2 rounded-lg text-white text-sm font-medium transition-opacity hover:opacity-90 flex items-center justify-center space-x-2"
                        style={{ backgroundColor: 'var(--primary-orange)' }}
                      >
                        <FaUndo className="w-4 h-4" />
                        <span>Process Refund</span>
                      </button>
                    ) : ride.status === 'refunded' ? (
                      <div className="w-full mt-3 py-2 bg-green-100 text-green-700 text-sm font-medium rounded-lg text-center">
                        Refund Processed
                      </div>
                    ) : (
                      <div className="w-full mt-3 py-2 bg-gray-100 text-gray-500 text-sm font-medium rounded-lg text-center">
                        Not Eligible for Refund
                      </div>
                    )}
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
            <p className="text-gray-500">No rides found</p>
          </div>
        )}
      </div>

      {/* Refund Modal */}
      {showRefundModal && selectedRide && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setShowRefundModal(false)}></div>
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  <FaUndo className="w-5 h-5 text-orange-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Process Refund</h3>
                </div>
                <button
                  onClick={() => setShowRefundModal(false)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <FaTimes className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              
              <div className="p-6">
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Ride Information</p>
                  <p className="font-semibold text-gray-900">{selectedRide.id}</p>
                  <p className="text-xs text-gray-500">{selectedRide.customer.name} - {selectedRide.driver.name}</p>
                  <p className="text-sm text-gray-600 mt-2">Original Amount</p>
                  <p className="text-xl font-bold" style={{ color: 'var(--primary-orange)' }}>
                    {formatCurrency(selectedRide.amount)}
                  </p>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Refund Amount <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      step="0.01"
                      min="0.01"
                      max={selectedRide.amount}
                      value={refundAmount}
                      onChange={(e) => setRefundAmount(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                      style={{ borderColor: 'var(--gray-300)', focusRingColor: 'var(--primary-orange)' }}
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Refund Method
                  </label>
                  <select
                    value={refundMethod}
                    onChange={(e) => setRefundMethod(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                    style={{ borderColor: 'var(--gray-300)', focusRingColor: 'var(--primary-orange)' }}
                  >
                    <option value="original">Original Payment Method</option>
                    <option value="wallet">Wallet Credit</option>
                    <option value="bank">Bank Transfer</option>
                  </select>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Refund Reason <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={refundReason}
                    onChange={(e) => setRefundReason(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 mb-2"
                    style={{ borderColor: 'var(--gray-300)', focusRingColor: 'var(--primary-orange)' }}
                  >
                    <option value="">Select a reason...</option>
                    <option value="Customer complaint">Customer complaint</option>
                    <option value="Wrong route taken">Wrong route taken</option>
                    <option value="Driver issue">Driver issue</option>
                    <option value="Payment error">Payment error</option>
                    <option value="Technical issue">Technical issue</option>
                    <option value="Dispute resolution">Dispute resolution</option>
                  </select>
                  <textarea
                    value={refundReason}
                    onChange={(e) => setRefundReason(e.target.value)}
                    rows="2"
                    placeholder="Or provide custom reason..."
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 resize-none"
                    style={{ borderColor: 'var(--gray-300)', focusRingColor: 'var(--primary-orange)' }}
                  />
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowRefundModal(false)}
                    className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleRefund}
                    disabled={processingRefund || !refundAmount || !refundReason}
                    className={`flex-1 px-4 py-2 rounded-lg text-white font-medium flex items-center justify-center space-x-2 ${
                      processingRefund || !refundAmount || !refundReason
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:opacity-90'
                    }`}
                    style={{ backgroundColor: 'var(--primary-orange)' }}
                  >
                    {processingRefund ? (
                      <>
                        <FaSpinner className="w-4 h-4 animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <FaUndo className="w-4 h-4" />
                        <span>Process Refund</span>
                      </>
                    )}
                  </button>
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
                <span className="text-sm">Export Refunds</span>
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

export default RefundProcessing;