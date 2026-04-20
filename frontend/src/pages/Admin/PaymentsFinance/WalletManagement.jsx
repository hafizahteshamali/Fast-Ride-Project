import React, { useState, useEffect } from 'react';
import {
  FaWallet,
  FaMoneyBillWave,
  FaPlus,
  FaMinus,
  FaHistory,
  FaSearch,
  FaFilter,
  FaUser,
  FaTruck,
  FaEye,
  FaTimes,
  FaArrowLeft,
  FaExpand,
  FaCompress,
  FaBars,
  FaInfoCircle,
  FaChartLine,
  FaDownload,
  FaShare,
  FaPrint,
  FaCheckCircle,
  FaExclamationTriangle,
  FaSpinner,
  FaCreditCard,
  FaCalendarAlt,
  FaClock,
  FaReceipt,
  FaFileInvoice,
  FaUserCircle,
  FaPhone,
  FaEnvelope,
  FaIdCard,
  FaDollarSign,
  FaLongArrowAltUp, // Changed from FaTrendUp
  FaLongArrowAltDown, // Changed from FaTrendDown
  FaChevronLeft,
  FaChevronRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaCopy,
  FaCheck
} from 'react-icons/fa';

const WalletManagement = () => {
  const [users, setUsers] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [activeTab, setActiveTab] = useState('users');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [transactionType, setTransactionType] = useState('credit');
  const [transactionAmount, setTransactionAmount] = useState('');
  const [transactionReason, setTransactionReason] = useState('');
  const [processingTransaction, setProcessingTransaction] = useState(false);
  const [transactionSuccess, setTransactionSuccess] = useState(null);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [walletHistory, setWalletHistory] = useState([]);
  const [isMobileView, setIsMobileView] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [fullscreenMode, setFullscreenMode] = useState(false);
  const [showStats, setShowStats] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [stats, setStats] = useState({
    totalWalletBalance: 0,
    totalUsers: 0,
    totalDrivers: 0,
    totalTransactions: 0,
    totalCredited: 0,
    totalDebited: 0
  });

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

  // Fetch data
  useEffect(() => {
    fetchUsersAndDrivers();
  }, []);

  const fetchUsersAndDrivers = async () => {
    setLoading(true);
    setTimeout(() => {
      const mockUsers = generateMockUsers(15);
      const mockDrivers = generateMockDrivers(12);
      setUsers(mockUsers);
      setDrivers(mockDrivers);
      calculateStats(mockUsers, mockDrivers);
      setLoading(false);
    }, 1000);
  };

  const generateMockUsers = (count) => {
    const users = [];
    const names = ['John Anderson', 'Sarah Williams', 'Michael Brown', 'Emily Davis', 'David Wilson', 
                    'Lisa Martinez', 'James Taylor', 'Maria Garcia', 'Robert Johnson', 'Jennifer Lee'];
    
    for (let i = 0; i < count; i++) {
      const name = names[i % names.length] + (i > 9 ? ` ${Math.floor(i/10)}` : '');
      const balance = Math.random() * 500 + 10;
      users.push({
        id: `USR${String(i + 1).padStart(4, '0')}`,
        name: name,
        email: `${name.toLowerCase().replace(' ', '.')}@email.com`,
        phone: `+1 (555) ${String(Math.floor(Math.random() * 900) + 100)}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
        walletBalance: parseFloat(balance.toFixed(2)),
        totalRides: Math.floor(Math.random() * 50),
        totalSpent: parseFloat((balance * 1.5).toFixed(2)),
        memberSince: '2024-01-01',
        status: 'active',
        type: 'user',
        avatar: name.charAt(0) + (name.split(' ')[1]?.charAt(0) || name.charAt(1))
      });
    }
    return users;
  };

  const generateMockDrivers = (count) => {
    const drivers = [];
    const names = ['Michael Rodriguez', 'Emily Chen', 'David Kim', 'Lisa Wang', 'James Wilson',
                    'Maria Garcia', 'Robert Taylor', 'Jennifer Brown', 'William Davis', 'Patricia Miller'];
    
    for (let i = 0; i < count; i++) {
      const name = names[i % names.length] + (i > 9 ? ` ${Math.floor(i/10)}` : '');
      const balance = Math.random() * 1000 + 50;
      drivers.push({
        id: `DRV${String(i + 1).padStart(4, '0')}`,
        name: name,
        email: `${name.toLowerCase().replace(' ', '.')}@driver.com`,
        phone: `+1 (555) ${String(Math.floor(Math.random() * 900) + 100)}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
        walletBalance: parseFloat(balance.toFixed(2)),
        totalRides: Math.floor(Math.random() * 500),
        totalEarned: parseFloat((balance * 2).toFixed(2)),
        memberSince: '2023-06-01',
        status: 'active',
        type: 'driver',
        vehicle: ['Toyota Camry', 'Honda Accord', 'Tesla Model 3'][Math.floor(Math.random() * 3)],
        rating: (Math.random() * 2 + 3).toFixed(1),
        avatar: name.charAt(0) + (name.split(' ')[1]?.charAt(0) || name.charAt(1))
      });
    }
    return drivers;
  };

  const calculateStats = (usersData, driversData) => {
    const totalWalletBalance = [...usersData, ...driversData].reduce((sum, item) => sum + item.walletBalance, 0);
    const totalUsers = usersData.length;
    const totalDrivers = driversData.length;
    
    setStats({
      totalWalletBalance: totalWalletBalance,
      totalUsers: totalUsers,
      totalDrivers: totalDrivers,
      totalTransactions: 0,
      totalCredited: 0,
      totalDebited: 0
    });
  };

  // Generate mock wallet history
  const generateWalletHistory = (userId, userType) => {
    const history = [];
    const transactions = [
      { type: 'credit', amount: 25.00, reason: 'Ride completion bonus' },
      { type: 'credit', amount: 10.00, reason: 'Referral bonus' },
      { type: 'debit', amount: 15.50, reason: 'Ride payment' },
      { type: 'credit', amount: 5.00, reason: 'Promo code applied' },
      { type: 'debit', amount: 8.75, reason: 'Cancellation fee' },
      { type: 'credit', amount: 50.00, reason: 'Wallet top-up' },
      { type: 'debit', amount: 12.00, reason: 'Ride payment' },
      { type: 'credit', amount: 20.00, reason: 'Compensation' }
    ];
    
    for (let i = 0; i < 8; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i * 3);
      const transaction = transactions[i % transactions.length];
      history.push({
        id: `TXN${String(i + 1).padStart(6, '0')}`,
        userId: userId,
        userType: userType,
        type: transaction.type,
        amount: transaction.amount,
        reason: transaction.reason,
        date: date.toISOString(),
        status: 'completed',
        referenceId: `REF${Math.floor(Math.random() * 100000)}`,
        balanceAfter: Math.random() * 500
      });
    }
    
    return history.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  // Handle transaction
  const handleTransaction = async () => {
    if (!transactionAmount || transactionAmount <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    
    if (!transactionReason) {
      alert('Please provide a reason for this transaction');
      return;
    }
    
    setProcessingTransaction(true);
    
    setTimeout(() => {
      const amount = parseFloat(transactionAmount);
      const selected = selectedWallet;
      
      // Update wallet balance
      if (selected.type === 'user') {
        setUsers(prev => prev.map(user => 
          user.id === selected.id 
            ? { ...user, walletBalance: transactionType === 'credit' 
                ? user.walletBalance + amount 
                : user.walletBalance - amount }
            : user
        ));
      } else {
        setDrivers(prev => prev.map(driver => 
          driver.id === selected.id 
            ? { ...driver, walletBalance: transactionType === 'credit' 
                ? driver.walletBalance + amount 
                : driver.walletBalance - amount }
            : driver
        ));
      }
      
      // Create transaction record
      const newTransaction = {
        id: `TXN${Date.now()}`,
        userId: selected.id,
        userType: selected.type,
        type: transactionType,
        amount: amount,
        reason: transactionReason,
        date: new Date().toISOString(),
        status: 'completed',
        referenceId: `ADMIN${Date.now()}`,
        balanceAfter: transactionType === 'credit' 
          ? selected.walletBalance + amount 
          : selected.walletBalance - amount
      };
      
      setTransactionSuccess({
        success: true,
        message: `Successfully ${transactionType === 'credit' ? 'credited' : 'debited'} ${formatCurrency(amount)} to ${selected.name}'s wallet`
      });
      
      // Close modal and reset
      setShowTransactionModal(false);
      setTransactionAmount('');
      setTransactionReason('');
      setProcessingTransaction(false);
      setSelectedWallet(null);
      
      // Refresh stats
      calculateStats(users, drivers);
      
      setTimeout(() => {
        setTransactionSuccess(null);
      }, 5000);
    }, 1500);
  };

  // View wallet history
  const viewWalletHistory = (item) => {
    const history = generateWalletHistory(item.id, item.type);
    setWalletHistory(history);
    setSelectedWallet(item);
    setShowHistoryModal(true);
  };

  // Open transaction modal
  const openTransactionModal = (item, type) => {
    setSelectedWallet(item);
    setTransactionType(type);
    setShowTransactionModal(true);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
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

  // Filter items based on search
  const getFilteredItems = () => {
    const items = activeTab === 'users' ? users : drivers;
    if (!searchTerm) return items;
    
    return items.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Pagination
  const filteredItems = getFilteredItems();
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <FaSpinner className="w-10 h-10 sm:w-12 sm:h-12 animate-spin mx-auto mb-4" style={{ color: 'var(--primary-orange)' }} />
          <p className="text-sm sm:text-base text-gray-600">Loading wallet data...</p>
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
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Wallet Management</h1>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">View balances and manage wallet transactions</p>
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
      {transactionSuccess && (
        <div className="fixed top-20 right-4 z-50 animate-slide-in max-w-sm">
          <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-lg shadow-lg">
            <div className="flex items-center space-x-3">
              <FaCheckCircle className="w-5 h-5 text-green-400" />
              <div>
                <p className="text-green-800 text-sm font-medium">Transaction Successful</p>
                <p className="text-green-700 text-xs">{transactionSuccess.message}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Cards - Using Flexbox */}
      {showStats && (
        <div className="py-4">
          <div className="flex flex-wrap -mx-2">
            <div className="w-1/2 sm:w-1/3 lg:w-1/6 px-2 mb-4">
              <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
                <div className="flex items-center justify-between mb-2">
                  <FaWallet className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                  <span className="text-xs text-gray-500">Total</span>
                </div>
                <div className="text-lg sm:text-xl font-bold text-gray-900">{formatCurrency(stats.totalWalletBalance)}</div>
                <div className="text-xs text-gray-600">Total Balance</div>
              </div>
            </div>
            <div className="w-1/2 sm:w-1/3 lg:w-1/6 px-2 mb-4">
              <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
                <div className="flex items-center justify-between mb-2">
                  <FaUser className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                  <span className="text-xs text-gray-500">Users</span>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-gray-900">{stats.totalUsers}</div>
                <div className="text-xs text-gray-600">Active Users</div>
              </div>
            </div>
            <div className="w-1/2 sm:w-1/3 lg:w-1/6 px-2 mb-4">
              <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
                <div className="flex items-center justify-between mb-2">
                  <FaTruck className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
                  <span className="text-xs text-gray-500">Drivers</span>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-gray-900">{stats.totalDrivers}</div>
                <div className="text-xs text-gray-600">Active Drivers</div>
              </div>
            </div>
            <div className="w-1/2 sm:w-1/3 lg:w-1/6 px-2 mb-4">
              <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
                <div className="flex items-center justify-between mb-2">
                  <FaHistory className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                  <span className="text-xs text-gray-500">Transactions</span>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-gray-900">{stats.totalTransactions}</div>
                <div className="text-xs text-gray-600">Total</div>
              </div>
            </div>
            <div className="w-1/2 sm:w-1/3 lg:w-1/6 px-2 mb-4">
              <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
                <div className="flex items-center justify-between mb-2">
                  <FaLongArrowAltUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                  <span className="text-xs text-gray-500">Credited</span>
                </div>
                <div className="text-lg sm:text-xl font-bold text-green-600">{formatCurrency(stats.totalCredited)}</div>
                <div className="text-xs text-gray-600">Total Credited</div>
              </div>
            </div>
            <div className="w-1/2 sm:w-1/3 lg:w-1/6 px-2 mb-4">
              <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
                <div className="flex items-center justify-between mb-2">
                  <FaLongArrowAltDown className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                  <span className="text-xs text-gray-500">Debited</span>
                </div>
                <div className="text-lg sm:text-xl font-bold text-red-600">{formatCurrency(stats.totalDebited)}</div>
                <div className="text-xs text-gray-600">Total Debited</div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="sm:py-6 lg:py-2">
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => {
                setActiveTab('users');
                setCurrentPage(1);
                setSearchTerm('');
              }}
              className={`flex-1 px-4 py-3 text-center font-medium transition-colors ${
                activeTab === 'users'
                  ? 'text-orange-500 border-b-2 border-orange-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <FaUser className="w-4 h-4" />
                <span>Users</span>
              </div>
            </button>
            <button
              onClick={() => {
                setActiveTab('drivers');
                setCurrentPage(1);
                setSearchTerm('');
              }}
              className={`flex-1 px-4 py-3 text-center font-medium transition-colors ${
                activeTab === 'drivers'
                  ? 'text-orange-500 border-b-2 border-orange-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <FaTruck className="w-4 h-4" />
                <span>Drivers</span>
              </div>
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={`Search by name, ID, or email...`}
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-9 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm"
                style={{ borderColor: 'var(--gray-300)', focusRingColor: 'var(--primary-orange)' }}
              />
            </div>
            <button
              onClick={() => setSearchTerm('')}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors text-sm"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <p className="text-sm text-gray-600">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredItems.length)} of {filteredItems.length} {activeTab}
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

        {/* Cards View - Using Flexbox */}
        <div className="flex flex-wrap -mx-2">
          {currentItems.map((item) => (
            <div key={item.id} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-2 mb-4">
              <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow h-full">
                <div className="p-4">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-sm">
                        {item.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.id}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => openTransactionModal(item, 'credit')}
                        className="p-1.5 rounded-lg hover:bg-green-50 transition-colors"
                        title="Credit Wallet"
                      >
                        <FaPlus className="w-3.5 h-3.5 text-green-600" />
                      </button>
                      <button
                        onClick={() => openTransactionModal(item, 'debit')}
                        className="p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                        title="Debit Wallet"
                      >
                        <FaMinus className="w-3.5 h-3.5 text-red-600" />
                      </button>
                      <button
                        onClick={() => viewWalletHistory(item)}
                        className="p-1.5 rounded-lg hover:bg-blue-50 transition-colors"
                        title="View History"
                      >
                        <FaHistory className="w-3.5 h-3.5 text-blue-600" />
                      </button>
                    </div>
                  </div>

                  {/* Wallet Balance */}
                  <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-3 mb-3">
                    <p className="text-xs text-gray-600 mb-1">Wallet Balance</p>
                    <p className="text-2xl font-bold" style={{ color: 'var(--primary-orange)' }}>
                      {formatCurrency(item.walletBalance)}
                    </p>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Email:</span>
                      <span className="text-gray-700 text-xs truncate ml-2">{item.email}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Phone:</span>
                      <span className="text-gray-700 text-xs">{item.phone}</span>
                    </div>
                    {item.type === 'driver' && (
                      <>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Vehicle:</span>
                          <span className="text-gray-700 text-xs">{item.vehicle}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Rating:</span>
                          <div className="flex items-center space-x-1">
                            <span className="text-yellow-500">★</span>
                            <span className="text-gray-700 text-xs">{item.rating}</span>
                          </div>
                        </div>
                      </>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Total {item.type === 'driver' ? 'Earned' : 'Spent'}:</span>
                      <span className="text-gray-700 text-xs">
                        {formatCurrency(item.type === 'driver' ? item.totalEarned : item.totalSpent)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Total Rides:</span>
                      <span className="text-gray-700 text-xs">{item.totalRides}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 mt-3 pt-3 border-t border-gray-100">
                    <button
                      onClick={() => openTransactionModal(item, 'credit')}
                      className="flex-1 py-1.5 rounded-lg text-white text-xs flex items-center justify-center space-x-1 hover:opacity-90"
                      style={{ backgroundColor: 'var(--primary-orange)' }}
                    >
                      <FaPlus className="w-3 h-3" />
                      <span>Credit</span>
                    </button>
                    <button
                      onClick={() => openTransactionModal(item, 'debit')}
                      className="flex-1 py-1.5 rounded-lg border border-red-500 text-red-600 text-xs flex items-center justify-center space-x-1 hover:bg-red-50"
                    >
                      <FaMinus className="w-3 h-3" />
                      <span>Debit</span>
                    </button>
                    <button
                      onClick={() => viewWalletHistory(item)}
                      className="flex-1 py-1.5 rounded-lg border border-gray-300 text-gray-600 text-xs flex items-center justify-center space-x-1 hover:bg-gray-50"
                    >
                      <FaHistory className="w-3 h-3" />
                      <span>History</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

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

        {filteredItems.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg">
            <FaInfoCircle className="w-12 h-12 mx-auto text-gray-400 mb-3" />
            <p className="text-gray-500">No {activeTab} found</p>
          </div>
        )}
      </div>

      {/* Transaction Modal */}
      {showTransactionModal && selectedWallet && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setShowTransactionModal(false)}></div>
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  {transactionType === 'credit' ? (
                    <FaPlus className="w-5 h-5 text-green-600" />
                  ) : (
                    <FaMinus className="w-5 h-5 text-red-600" />
                  )}
                  <h3 className="text-lg font-semibold text-gray-900">
                    {transactionType === 'credit' ? 'Credit Wallet' : 'Debit Wallet'}
                  </h3>
                </div>
                <button
                  onClick={() => setShowTransactionModal(false)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <FaTimes className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              
              <div className="p-6">
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">User/Driver</p>
                  <p className="font-semibold text-gray-900">{selectedWallet.name}</p>
                  <p className="text-xs text-gray-500">{selectedWallet.id}</p>
                  <p className="text-sm text-gray-600 mt-2">Current Balance</p>
                  <p className="text-xl font-bold" style={{ color: 'var(--primary-orange)' }}>
                    {formatCurrency(selectedWallet.walletBalance)}
                  </p>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      step="0.01"
                      min="0.01"
                      value={transactionAmount}
                      onChange={(e) => setTransactionAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full pl-9 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                      style={{ borderColor: 'var(--gray-300)', focusRingColor: 'var(--primary-orange)' }}
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={transactionReason}
                    onChange={(e) => setTransactionReason(e.target.value)}
                    rows="3"
                    placeholder={transactionType === 'credit' 
                      ? "e.g., Compensation for inconvenience, Bonus, Dispute resolution..." 
                      : "e.g., Adjustment, Penalty, Refund recovery..."}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 resize-none"
                    style={{ borderColor: 'var(--gray-300)', focusRingColor: 'var(--primary-orange)' }}
                  />
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowTransactionModal(false)}
                    className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleTransaction}
                    disabled={processingTransaction || !transactionAmount || !transactionReason}
                    className={`flex-1 px-4 py-2 rounded-lg text-white font-medium flex items-center justify-center space-x-2 ${
                      processingTransaction || !transactionAmount || !transactionReason
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:opacity-90'
                    }`}
                    style={{ backgroundColor: 'var(--primary-orange)' }}
                  >
                    {processingTransaction ? (
                      <>
                        <FaSpinner className="w-4 h-4 animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        {transactionType === 'credit' ? <FaPlus className="w-4 h-4" /> : <FaMinus className="w-4 h-4" />}
                        <span>Confirm {transactionType === 'credit' ? 'Credit' : 'Debit'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Wallet History Modal */}
      {showHistoryModal && selectedWallet && walletHistory.length > 0 && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setShowHistoryModal(false)}></div>
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[80vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Wallet Transaction History</h3>
                  <p className="text-sm text-gray-500">{selectedWallet.name} ({selectedWallet.id})</p>
                </div>
                <button
                  onClick={() => setShowHistoryModal(false)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <FaTimes className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              
              <div className="p-6">
                <div className="space-y-3">
                  {walletHistory.map((transaction) => {
                    const transactionDate = formatDateTime(transaction.date);
                    return (
                      <div key={transaction.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className={`p-2 rounded-full ${
                          transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                          {transaction.type === 'credit' ? (
                            <FaPlus className="w-4 h-4 text-green-600" />
                          ) : (
                            <FaMinus className="w-4 h-4 text-red-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <div>
                              <p className="font-medium text-gray-900">{transaction.reason}</p>
                              <p className="text-xs text-gray-500">{transactionDate.date} at {transactionDate.time}</p>
                            </div>
                            <div className="text-right">
                              <p className={`font-semibold ${
                                transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {transaction.type === 'credit' ? '+' : '-'}{formatCurrency(transaction.amount)}
                              </p>
                              <p className="text-xs text-gray-500">Ref: {transaction.referenceId}</p>
                            </div>
                          </div>
                          <div className="mt-2 pt-2 border-t border-gray-200">
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-500">Transaction ID: {transaction.id}</span>
                              <span className="text-gray-500">Balance: {formatCurrency(transaction.balanceAfter)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
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

export default WalletManagement;