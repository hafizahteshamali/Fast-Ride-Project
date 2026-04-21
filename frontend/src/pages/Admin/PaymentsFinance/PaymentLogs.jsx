import React, { useState, useEffect } from 'react';
import {
  FaMoneyBillWave,
  FaCreditCard,
  FaWallet,
  FaMoneyBill,
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner,
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
  FaHistory,
  FaUser,
  FaCar,
  FaClock,
  FaDollarSign,
  FaReceipt,
  FaFileInvoice,
  FaUniversity, // Changed from FaBank to FaUniversity
  FaApplePay,
  FaGooglePay,
  FaPaypal,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaChevronLeft,
  FaChevronRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaExclamationTriangle,
  FaCheck,
  FaCopy,
  FaPrint as FaPrintIcon,
  FaEnvelope,
  FaPhone,
  FaIdCard
} from 'react-icons/fa';

const PaymentLogs = () => {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  });
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedMethod, setSelectedMethod] = useState('all');
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
    totalPayments: 0,
    totalAmount: 0,
    completedAmount: 0,
    pendingAmount: 0,
    refundedAmount: 0,
    successRate: 0
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

  // Fetch payment logs
  useEffect(() => {
    fetchPaymentLogs();
  }, []);

  const fetchPaymentLogs = async () => {
    setLoading(true);
    setTimeout(() => {
      const mockPayments = generateMockPayments(50);
      setPayments(mockPayments);
      setFilteredPayments(mockPayments);
      calculateStats(mockPayments);
      setLoading(false);
    }, 1000);
  };

  const generateMockPayments = (count) => {
    const payments = [];
    const statuses = ['completed', 'pending', 'refunded', 'failed'];
    const methods = ['Cash', 'Wallet', 'Credit Card', 'Debit Card', 'Apple Pay', 'Google Pay', 'PayPal'];
    const customers = [
      { id: 'CUS001', name: 'John Anderson', email: 'john@email.com', phone: '+1 (555) 123-4567' },
      { id: 'CUS002', name: 'Sarah Williams', email: 'sarah@email.com', phone: '+1 (555) 234-5678' },
      { id: 'CUS003', name: 'Michael Brown', email: 'michael@email.com', phone: '+1 (555) 345-6789' },
      { id: 'CUS004', name: 'Emily Davis', email: 'emily@email.com', phone: '+1 (555) 456-7890' },
      { id: 'CUS005', name: 'David Wilson', email: 'david@email.com', phone: '+1 (555) 567-8901' }
    ];
    
    for (let i = 0; i < count; i++) {
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * 90));
      date.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));
      
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const method = methods[Math.floor(Math.random() * methods.length)];
      const customer = customers[Math.floor(Math.random() * customers.length)];
      const amount = Math.random() * 50 + 5;
      
      payments.push({
        id: `PAY${String(i + 1).padStart(6, '0')}`,
        transactionId: `TXN${String(i + 1).padStart(8, '0')}`,
        rideId: `RID${String(Math.floor(Math.random() * 1000)).padStart(6, '0')}`,
        customer: customer,
        amount: parseFloat(amount.toFixed(2)),
        paymentMethod: method,
        status: status,
        date: date.toISOString(),
        description: `Payment for ride ${`RID${String(Math.floor(Math.random() * 1000)).padStart(6, '0')}`}`,
        refundAmount: status === 'refunded' ? parseFloat((amount * 0.8).toFixed(2)) : null,
        refundDate: status === 'refunded' ? new Date(date.getTime() + 86400000).toISOString() : null,
        receiptUrl: `#receipt-${i}`,
        metadata: {
          cardLast4: method.includes('Card') ? Math.floor(Math.random() * 9000 + 1000) : null,
          walletId: method === 'Wallet' ? `WAL${Math.floor(Math.random() * 10000)}` : null,
          transactionReference: `REF${Math.floor(Math.random() * 100000)}`
        }
      });
    }
    
    return payments.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const calculateStats = (paymentsData) => {
    const totalAmount = paymentsData.reduce((sum, p) => sum + p.amount, 0);
    const completedAmount = paymentsData.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0);
    const pendingAmount = paymentsData.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);
    const refundedAmount = paymentsData.filter(p => p.status === 'refunded').reduce((sum, p) => sum + p.amount, 0);
    const completedCount = paymentsData.filter(p => p.status === 'completed').length;
    
    setStats({
      totalPayments: paymentsData.length,
      totalAmount: totalAmount,
      completedAmount: completedAmount,
      pendingAmount: pendingAmount,
      refundedAmount: refundedAmount,
      successRate: ((completedCount / paymentsData.length) * 100).toFixed(1)
    });
  };

  // Filter and sort payments
  useEffect(() => {
    let filtered = [...payments];
    
    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(payment =>
        payment.rideId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Date range filter
    if (dateRange.start) {
      filtered = filtered.filter(p => new Date(p.date) >= new Date(dateRange.start));
    }
    if (dateRange.end) {
      filtered = filtered.filter(p => new Date(p.date) <= new Date(dateRange.end));
    }
    
    // Status filter
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(p => p.status === selectedStatus);
    }
    
    // Payment method filter
    if (selectedMethod !== 'all') {
      filtered = filtered.filter(p => p.paymentMethod === selectedMethod);
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
        case 'rideId':
          aVal = a.rideId;
          bVal = b.rideId;
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
    
    setFilteredPayments(filtered);
    setCurrentPage(1);
  }, [payments, searchTerm, dateRange, selectedStatus, selectedMethod, sortField, sortDirection]);

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

  // Get status badge
  const getStatusBadge = (status) => {
    const statusMap = {
      'completed': { color: 'text-green-600', bg: 'bg-green-100', icon: FaCheckCircle, label: 'Completed' },
      'pending': { color: 'text-yellow-600', bg: 'bg-yellow-100', icon: FaSpinner, label: 'Pending' },
      'refunded': { color: 'text-red-600', bg: 'bg-red-100', icon: FaTimesCircle, label: 'Refunded' },
      'failed': { color: 'text-gray-600', bg: 'bg-gray-100', icon: FaExclamationTriangle, label: 'Failed' }
    };
    const info = statusMap[status] || statusMap['pending'];
    const Icon = info.icon;
    return { ...info, Icon };
  };

  // Get payment method icon
  const getMethodIcon = (method) => {
    const methodMap = {
      'Cash': FaMoneyBill,
      'Wallet': FaWallet,
      'Credit Card': FaCreditCard,
      'Debit Card': FaCreditCard,
      'Apple Pay': FaApplePay,
      'Google Pay': FaGooglePay,
      'PayPal': FaPaypal
    };
    return methodMap[method] || FaMoneyBillWave;
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
  const currentItems = filteredPayments.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);

  // Get unique payment methods for filter
  const uniqueMethods = [...new Set(payments.map(p => p.paymentMethod))];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <FaSpinner className="w-10 h-10 sm:w-12 sm:h-12 animate-spin mx-auto mb-4" style={{ color: 'var(--primary-orange)' }} />
          <p className="text-sm sm:text-base text-gray-600">Loading payment logs...</p>
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
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Payment Logs</h1>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">View all payment records and transaction history</p>
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

      {/* Stats Cards */}
      {showStats && (
        <div className="py-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-6">
            <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
              <div className="flex items-center justify-between mb-2">
                <FaReceipt className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                <span className="text-xs text-gray-500">Total</span>
              </div>
              <div className="text-xl sm:text-2xl font-bold text-gray-900">{stats.totalPayments}</div>
              <div className="text-xs text-gray-600">Transactions</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
              <div className="flex items-center justify-between mb-2">
                <FaDollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                <span className="text-xs text-gray-500">Revenue</span>
              </div>
              <div className="text-lg sm:text-xl font-bold text-gray-900">{formatCurrency(stats.totalAmount)}</div>
              <div className="text-xs text-gray-600">Total Amount</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
              <div className="flex items-center justify-between mb-2">
                <FaCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                <span className="text-xs text-gray-500">Completed</span>
              </div>
              <div className="text-lg sm:text-xl font-bold text-green-600">{formatCurrency(stats.completedAmount)}</div>
              <div className="text-xs text-gray-600">Completed</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
              <div className="flex items-center justify-between mb-2">
                <FaSpinner className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
                <span className="text-xs text-gray-500">Pending</span>
              </div>
              <div className="text-lg sm:text-xl font-bold text-yellow-600">{formatCurrency(stats.pendingAmount)}</div>
              <div className="text-xs text-gray-600">Pending</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
              <div className="flex items-center justify-between mb-2">
                <FaTimesCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                <span className="text-xs text-gray-500">Refunded</span>
              </div>
              <div className="text-lg sm:text-xl font-bold text-red-600">{formatCurrency(stats.refundedAmount)}</div>
              <div className="text-xs text-gray-600">Refunded</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
              <div className="flex items-center justify-between mb-2">
                <FaChartLine className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
                <span className="text-xs text-gray-500">Success Rate</span>
              </div>
              <div className="text-xl sm:text-2xl font-bold text-purple-600">{stats.successRate}%</div>
              <div className="text-xs text-gray-600">Completion Rate</div>
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
                  setSelectedStatus('all');
                  setSelectedMethod('all');
                }}
                className="text-sm text-orange-600 hover:text-orange-700"
              >
                Clear All
              </button>
            </div>
            
            <div className="flex justify-between flex-wracp gap-4">
  
  {/* Search */}
  <div className="w-full sm:w-[48%] lg:w-[23%]">
    <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
    <div className="relative">
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder="Ride ID, customer, transaction..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-9 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm"
        style={{ borderColor: 'var(--gray-300)' }}
      />
    </div>
  </div>

  {/* Date Range */}
  <div className="w-full sm:w-[48%] lg:w-[33%]">
    <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
    <div className="flex gap-2">
      <input
        type="date"
        value={dateRange.start}
        onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
        className="flex-1 px-1 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm"
        style={{ borderColor: 'var(--gray-300)' }}
      />
      <input
        type="date"
        value={dateRange.end}
        onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
        className="flex-1 px-1 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm"
        style={{ borderColor: 'var(--gray-300)' }}
      />
    </div>
  </div>

  {/* Status Filter */}
  <div className="w-full sm:w-[48%] lg:w-[20%]">
    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
    <select
      value={selectedStatus}
      onChange={(e) => setSelectedStatus(e.target.value)}
      className="w-full px-1 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm"
      style={{ borderColor: 'var(--gray-300)' }}
    >
      <option value="all">All Status</option>
      <option value="completed">Completed</option>
      <option value="pending">Pending</option>
      <option value="refunded">Refunded</option>
      <option value="failed">Failed</option>
    </select>
  </div>

  {/* Payment Method */}
  <div className="w-full sm:w-[48%] lg:w-[20%]">
    <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
    <select
      value={selectedMethod}
      onChange={(e) => setSelectedMethod(e.target.value)}
      className="w-full px-1 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm"
      style={{ borderColor: 'var(--gray-300)' }}
    >
      <option value="all">All Methods</option>
      {uniqueMethods.map(method => (
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
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredPayments.length)} of {filteredPayments.length} payments
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
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => toggleSort('date')}>
                      <div className="flex items-center space-x-1">
                        <span>Date</span>
                        {sortField === 'date' && (sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />)}
                      </div>
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => toggleSort('rideId')}>
                      <div className="flex items-center space-x-1">
                        <span>Ride ID</span>
                        {sortField === 'rideId' && (sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />)}
                      </div>
                    </th>
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
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentItems.map((payment) => {
                    const statusBadge = getStatusBadge(payment.status);
                    const MethodIcon = getMethodIcon(payment.paymentMethod);
                    const paymentDate = formatDateTime(payment.date);
                    const StatusIcon = statusBadge.Icon;
                    
                    return (
                      <tr key={payment.id} className="hover:bg-gray-50">
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                          <div>
                            <p className="text-sm text-gray-900">{paymentDate.date}</p>
                            <p className="text-xs text-gray-500">{paymentDate.time}</p>
                          </div>
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                          <p className="text-sm font-medium text-gray-900">{payment.rideId}</p>
                          <p className="text-xs text-gray-500">{payment.transactionId}</p>
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                              <FaUser className="w-4 h-4 text-gray-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{payment.customer.name}</p>
                              <p className="text-xs text-gray-500">{payment.customer.phone}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                          <p className="text-sm font-semibold text-gray-900">{formatCurrency(payment.amount)}</p>
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <MethodIcon className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">{payment.paymentMethod}</span>
                          </div>
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${statusBadge.bg} ${statusBadge.color} flex items-center space-x-1 w-fit`}>
                            <StatusIcon className="w-3 h-3" />
                            <span>{statusBadge.label}</span>
                          </span>
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => {
                              setSelectedPayment(payment);
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
            {currentItems.map((payment) => {
              const statusBadge = getStatusBadge(payment.status);
              const MethodIcon = getMethodIcon(payment.paymentMethod);
              const paymentDate = formatDateTime(payment.date);
              const StatusIcon = statusBadge.Icon;
              
              return (
                <div key={payment.id} className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-semibold text-gray-900">{payment.rideId}</p>
                      <p className="text-xs text-gray-500">{payment.transactionId}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${statusBadge.bg} ${statusBadge.color} flex items-center space-x-1`}>
                      <StatusIcon className="w-3 h-3" />
                      <span>{statusBadge.label}</span>
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Date:</span>
                      <span className="text-gray-900">{paymentDate.date} {paymentDate.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Customer:</span>
                      <span className="text-gray-900">{payment.customer.name}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Amount:</span>
                      <span className="text-lg font-bold" style={{ color: 'var(--primary-orange)' }}>
                        {formatCurrency(payment.amount)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Method:</span>
                      <div className="flex items-center space-x-2">
                        <MethodIcon className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">{payment.paymentMethod}</span>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => {
                      setSelectedPayment(payment);
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

        {filteredPayments.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg">
            <FaInfoCircle className="w-12 h-12 mx-auto text-gray-400 mb-3" />
            <p className="text-gray-500">No payment records found</p>
          </div>
        )}
      </div>

      {/* Payment Details Modal */}
      {showDetailsModal && selectedPayment && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-40 modal-enter"></div>
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50 modal-content-enter">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto modal-scroll border border-gray-200">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                    <FaMoneyBillWave className="w-5 h-5 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Payment Details</h3>
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
                      <p className="text-sm text-gray-500 font-medium">Transaction ID</p>
                      <p className="text-2xl font-bold text-gray-900">{selectedPayment.transactionId}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500 font-medium">Payment ID</p>
                      <p className="text-2xl font-bold text-gray-900">{selectedPayment.id}</p>
                    </div>
                  </div>
                </div>

                {/* Ride & Customer Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 border border-gray-200">
                    <h4 className="font-bold text-gray-900 mb-4 flex items-center space-x-2">
                      <FaCar className="w-5 h-5 text-orange-600" />
                      <span>Ride Information</span>
                    </h4>
                    <div className="space-y-3 text-sm">
                      <p><span className="font-semibold">Ride ID:</span> {selectedPayment.rideId}</p>
                      <p><span className="font-semibold">Date:</span> {formatDateTime(selectedPayment.date).full}</p>
                      <p><span className="font-semibold">Description:</span> {selectedPayment.description}</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 border border-gray-200">
                    <h4 className="font-bold text-gray-900 mb-4 flex items-center space-x-2">
                      <FaUser className="w-5 h-5 text-orange-600" />
                      <span>Customer Information</span>
                    </h4>
                    <div className="space-y-3 text-sm">
                      <p><span className="font-semibold">Name:</span> {selectedPayment.customer.name}</p>
                      <p><span className="font-semibold">Email:</span> {selectedPayment.customer.email}</p>
                      <p><span className="font-semibold">Phone:</span> {selectedPayment.customer.phone}</p>
                    </div>
                  </div>
                </div>

                {/* Payment Details */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 mb-8 border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-5 flex items-center space-x-2 text-lg">
                    <FaMoneyBillWave className="w-5 h-5 text-orange-600" />
                    <span>Payment Details</span>
                  </h4>
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between items-center pb-3 border-b border-gray-300">
                      <span className="font-semibold">Amount:</span>
                      <span className="text-2xl font-bold text-orange-600">
                        {formatCurrency(selectedPayment.amount)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-gray-300">
                      <span className="font-semibold">Payment Method:</span>
                      <span className="font-medium">{selectedPayment.paymentMethod}</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-gray-300">
                      <span className="font-semibold">Status:</span>
                      <span className={`font-bold text-lg ${getStatusBadge(selectedPayment.status).color}`}>
                        {getStatusBadge(selectedPayment.status).label}
                      </span>
                    </div>
                    {selectedPayment.metadata.cardLast4 && (
                      <div className="flex justify-between items-center pb-3 border-b border-gray-300">
                        <span className="font-semibold">Card Last 4:</span>
                        <span className="font-mono">**** {selectedPayment.metadata.cardLast4}</span>
                      </div>
                    )}
                    {selectedPayment.metadata.walletId && (
                      <div className="flex justify-between items-center pb-3 border-b border-gray-300">
                        <span className="font-semibold">Wallet ID:</span>
                        <span className="font-mono">{selectedPayment.metadata.walletId}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Reference:</span>
                      <span className="font-mono">{selectedPayment.metadata.transactionReference}</span>
                    </div>
                  </div>
                </div>

                {/* Refund Details (if applicable) */}
                {selectedPayment.status === 'refunded' && (
                  <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-6 mb-8 border border-red-200">
                    <h4 className="font-bold text-red-900 mb-5 flex items-center space-x-2 text-lg">
                      <FaTimesCircle className="w-5 h-5" />
                      <span>Refund Details</span>
                    </h4>
                    <div className="space-y-4 text-sm">
                      <div className="flex justify-between items-center pb-3 border-b border-red-300">
                        <span className="font-semibold">Refund Amount:</span>
                        <span className="font-bold text-red-600 text-xl">{formatCurrency(selectedPayment.refundAmount)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Refund Date:</span>
                        <span className="font-medium">{formatDateTime(selectedPayment.refundDate).full}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <button className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200 font-semibold transform hover:scale-105">
                    <FaDownload className="w-5 h-5" />
                    <span>Receipt</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200 font-semibold transform hover:scale-105">
                    <FaPrintIcon className="w-5 h-5" />
                    <span>Print</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200 font-semibold transform hover:scale-105">
                    <FaEnvelope className="w-5 h-5" />
                    <span>Email</span>
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
                <span className="text-sm">Export Logs</span>
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

export default PaymentLogs;