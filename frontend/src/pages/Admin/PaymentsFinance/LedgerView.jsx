import React, { useState, useEffect } from 'react';
import {
  FaBook,
  FaMoneyBillWave,
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
  FaChartPie,
  FaChartBar,
  FaDollarSign,
  FaCreditCard,
  FaWallet,
  FaUniversity,
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
  FaBalanceScale,
  FaCalculator,
  FaHistory,
  FaUser,
  FaTruck,
  FaBuilding
} from 'react-icons/fa';

const LedgerView = () => {
  const [ledgerEntries, setLedgerEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  });
  const [selectedAccountType, setSelectedAccountType] = useState('all');
  const [selectedTransactionType, setSelectedTransactionType] = useState('all');
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
  
  // Financial stats
  const [stats, setStats] = useState({
    totalDebit: 0,
    totalCredit: 0,
    netBalance: 0,
    totalTransactions: 0,
    revenueAccounts: 0,
    expenseAccounts: 0,
    assetAccounts: 0,
    liabilityAccounts: 0
  });

  // Account categories
  const accountCategories = {
    'Revenue': ['Ride Revenue', 'Surge Revenue', 'Cancellation Fees', 'Subscription Fees'],
    'Expense': ['Driver Payout', 'Fuel Cost', 'Maintenance', 'Insurance', 'Marketing'],
    'Asset': ['Cash', 'Bank Account', 'Accounts Receivable', 'Vehicle Asset'],
    'Liability': ['Accounts Payable', 'Driver Payable', 'Tax Payable', 'Refund Payable']
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showDetailsModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showDetailsModal]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape' && showDetailsModal) {
        setShowDetailsModal(false);
        setSelectedEntry(null);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [showDetailsModal]);

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

  // Fetch ledger data
  useEffect(() => {
    fetchLedgerData();
  }, []);

  const fetchLedgerData = async () => {
    setLoading(true);
    setTimeout(() => {
      const mockEntries = generateMockLedgerEntries(50);
      setLedgerEntries(mockEntries);
      setFilteredEntries(mockEntries);
      calculateStats(mockEntries);
      setLoading(false);
    }, 1000);
  };

  const generateMockLedgerEntries = (count) => {
    const entries = [];
    const debitAccounts = [
      { name: 'Cash', category: 'Asset', code: '1001' },
      { name: 'Bank Account', category: 'Asset', code: '1002' },
      { name: 'Accounts Receivable', category: 'Asset', code: '1003' },
      { name: 'Ride Revenue', category: 'Revenue', code: '4001' },
      { name: 'Surge Revenue', category: 'Revenue', code: '4002' },
      { name: 'Cancellation Fees', category: 'Revenue', code: '4003' }
    ];
    
    const creditAccounts = [
      { name: 'Driver Payout', category: 'Expense', code: '5001' },
      { name: 'Fuel Cost', category: 'Expense', code: '5002' },
      { name: 'Maintenance', category: 'Expense', code: '5003' },
      { name: 'Accounts Payable', category: 'Liability', code: '2001' },
      { name: 'Driver Payable', category: 'Liability', code: '2002' },
      { name: 'Tax Payable', category: 'Liability', code: '2003' }
    ];
    
    const transactionTypes = ['Ride Payment', 'Driver Payout', 'Refund', 'Cancellation Fee', 'Surge Charge', 'Subscription Fee'];
    const referencePrefixes = ['RID', 'DRV', 'TXN', 'REF', 'INV', 'SUB'];
    
    for (let i = 0; i < count; i++) {
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * 90));
      date.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));
      
      const isDebitToRevenue = Math.random() > 0.5;
      const debitAccount = debitAccounts[Math.floor(Math.random() * debitAccounts.length)];
      const creditAccount = creditAccounts[Math.floor(Math.random() * creditAccounts.length)];
      const amount = Math.random() * 500 + 10;
      const transactionType = transactionTypes[Math.floor(Math.random() * transactionTypes.length)];
      const referencePrefix = referencePrefixes[Math.floor(Math.random() * referencePrefixes.length)];
      const referenceNumber = Math.floor(Math.random() * 10000);
      
      entries.push({
        id: `LEDGER${String(i + 1).padStart(6, '0')}`,
        date: date.toISOString(),
        debitAccount: debitAccount.name,
        debitAccountCode: debitAccount.code,
        debitCategory: debitAccount.category,
        creditAccount: creditAccount.name,
        creditAccountCode: creditAccount.code,
        creditCategory: creditAccount.category,
        amount: parseFloat(amount.toFixed(2)),
        transactionType: transactionType,
        referenceId: `${referencePrefix}${referenceNumber}`,
        description: `${transactionType} transaction for ${debitAccount.name} to ${creditAccount.name}`,
        status: 'completed',
        createdAt: date.toISOString(),
        createdBy: 'System',
        notes: Math.random() > 0.7 ? 'Additional notes for audit trail' : null
      });
    }
    
    return entries.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const calculateStats = (entriesData) => {
    const totalDebit = entriesData.reduce((sum, entry) => sum + entry.amount, 0);
    const totalCredit = entriesData.reduce((sum, entry) => sum + entry.amount, 0);
    const revenueAccounts = entriesData.filter(e => e.debitCategory === 'Revenue' || e.creditCategory === 'Revenue').length;
    const expenseAccounts = entriesData.filter(e => e.debitCategory === 'Expense' || e.creditCategory === 'Expense').length;
    const assetAccounts = entriesData.filter(e => e.debitCategory === 'Asset' || e.creditCategory === 'Asset').length;
    const liabilityAccounts = entriesData.filter(e => e.debitCategory === 'Liability' || e.creditCategory === 'Liability').length;
    
    setStats({
      totalDebit: totalDebit,
      totalCredit: totalCredit,
      netBalance: totalDebit - totalCredit,
      totalTransactions: entriesData.length,
      revenueAccounts: revenueAccounts,
      expenseAccounts: expenseAccounts,
      assetAccounts: assetAccounts,
      liabilityAccounts: liabilityAccounts
    });
  };

  // Filter and sort entries
  useEffect(() => {
    let filtered = [...ledgerEntries];
    
    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(entry =>
        entry.debitAccount.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.creditAccount.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.referenceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.transactionType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Date range filter
    if (dateRange.start) {
      filtered = filtered.filter(e => new Date(e.date) >= new Date(dateRange.start));
    }
    if (dateRange.end) {
      filtered = filtered.filter(e => new Date(e.date) <= new Date(dateRange.end));
    }
    
    // Account type filter
    if (selectedAccountType !== 'all') {
      filtered = filtered.filter(e => 
        e.debitCategory === selectedAccountType || 
        e.creditCategory === selectedAccountType
      );
    }
    
    // Transaction type filter
    if (selectedTransactionType !== 'all') {
      filtered = filtered.filter(e => e.transactionType === selectedTransactionType);
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
        case 'debitAccount':
          aVal = a.debitAccount;
          bVal = b.debitAccount;
          break;
        case 'creditAccount':
          aVal = a.creditAccount;
          bVal = b.creditAccount;
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
    
    setFilteredEntries(filtered);
    setCurrentPage(1);
  }, [ledgerEntries, searchTerm, dateRange, selectedAccountType, selectedTransactionType, sortField, sortDirection]);

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

  // Get category color
  const getCategoryColor = (category) => {
    const colorMap = {
      'Revenue': 'text-green-600 bg-green-100',
      'Expense': 'text-red-600 bg-red-100',
      'Asset': 'text-blue-600 bg-blue-100',
      'Liability': 'text-purple-600 bg-purple-100'
    };
    return colorMap[category] || 'text-gray-600 bg-gray-100';
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
  const currentItems = filteredEntries.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredEntries.length / itemsPerPage);

  // Get unique transaction types for filter
  const uniqueTransactionTypes = [...new Set(ledgerEntries.map(e => e.transactionType))];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <FaSpinner className="w-10 h-10 sm:w-12 sm:h-12 animate-spin mx-auto mb-4" style={{ color: 'var(--primary-orange)' }} />
          <p className="text-sm sm:text-base text-gray-600">Loading ledger entries...</p>
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
              <button 
                onClick={() => window.history.back()}
                className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <FaArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Finance Ledger</h1>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">View all ledger entries with debit/credit accounts</p>
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
                <div className="text-lg sm:text-xl font-bold text-gray-900">{stats.totalTransactions}</div>
                <div className="text-xs text-gray-600">Transactions</div>
              </div>
            </div>
            <div className="w-1/2 sm:w-1/3 lg:w-1/6 px-2 mb-4">
              <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
                <div className="flex items-center justify-between mb-2">
                  <FaDollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                  <span className="text-xs text-gray-500">Debit</span>
                </div>
                <div className="text-lg sm:text-xl font-bold text-green-600">{formatCurrency(stats.totalDebit)}</div>
                <div className="text-xs text-gray-600">Total Debit</div>
              </div>
            </div>
            <div className="w-1/2 sm:w-1/3 lg:w-1/6 px-2 mb-4">
              <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
                <div className="flex items-center justify-between mb-2">
                  <FaCreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                  <span className="text-xs text-gray-500">Credit</span>
                </div>
                <div className="text-lg sm:text-xl font-bold text-red-600">{formatCurrency(stats.totalCredit)}</div>
                <div className="text-xs text-gray-600">Total Credit</div>
              </div>
            </div>
            <div className="w-1/2 sm:w-1/3 lg:w-1/6 px-2 mb-4">
              <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
                <div className="flex items-center justify-between mb-2">
                  <FaBalanceScale className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
                  <span className="text-xs text-gray-500">Net</span>
                </div>
                <div className="text-lg sm:text-xl font-bold text-purple-600">{formatCurrency(stats.netBalance)}</div>
                <div className="text-xs text-gray-600">Net Balance</div>
              </div>
            </div>
            <div className="w-1/2 sm:w-1/3 lg:w-1/6 px-2 mb-4">
              <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
                <div className="flex items-center justify-between mb-2">
                  <FaChartLine className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                  <span className="text-xs text-gray-500">Revenue</span>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-green-600">{stats.revenueAccounts}</div>
                <div className="text-xs text-gray-600">Accounts</div>
              </div>
            </div>
            <div className="w-1/2 sm:w-1/3 lg:w-1/6 px-2 mb-4">
              <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
                <div className="flex items-center justify-between mb-2">
                  <FaCalculator className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                  <span className="text-xs text-gray-500">Expense</span>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-orange-600">{stats.expenseAccounts}</div>
                <div className="text-xs text-gray-600">Accounts</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* P&L Summary Chart */}
      {showChart && (
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <FaChartBar className="w-5 h-5" style={{ color: 'var(--primary-orange)' }} />
              <span>P&L Summary by Account Category</span>
            </h3>
            <div className="flex flex-wrap -mx-2">
              <div className="w-full sm:w-1/2 px-2 mb-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Revenue Accounts</p>
                  <div className="space-y-2">
                    {Object.keys(accountCategories).map(category => {
                      const count = ledgerEntries.filter(e => 
                        e.debitCategory === category || e.creditCategory === category
                      ).length;
                      const totalAmount = ledgerEntries.filter(e => 
                        e.debitCategory === category || e.creditCategory === category
                      ).reduce((sum, e) => sum + e.amount, 0);
                      
                      return (
                        <div key={category} className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">{category}</span>
                          <div className="text-right">
                            <span className="text-sm font-semibold text-gray-900">{formatCurrency(totalAmount)}</span>
                            <span className="text-xs text-gray-500 ml-2">({count} entries)</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="w-full sm:w-1/2 px-2 mb-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Top Transaction Types</p>
                  <div className="space-y-2">
                    {uniqueTransactionTypes.slice(0, 5).map(type => {
                      const count = ledgerEntries.filter(e => e.transactionType === type).length;
                      const totalAmount = ledgerEntries.filter(e => e.transactionType === type).reduce((sum, e) => sum + e.amount, 0);
                      
                      return (
                        <div key={type} className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">{type}</span>
                          <div className="text-right">
                            <span className="text-sm font-semibold text-gray-900">{formatCurrency(totalAmount)}</span>
                            <span className="text-xs text-gray-500 ml-2">({count})</span>
                          </div>
                        </div>
                      );
                    })}
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
                  setSelectedAccountType('all');
                  setSelectedTransactionType('all');
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
                    placeholder="Account, reference, type..."
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
                <select
                  value={selectedAccountType}
                  onChange={(e) => setSelectedAccountType(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm"
                  style={{ borderColor: 'var(--gray-300)', focusRingColor: 'var(--primary-orange)' }}
                >
                  <option value="all">All Types</option>
                  <option value="Revenue">Revenue</option>
                  <option value="Expense">Expense</option>
                  <option value="Asset">Asset</option>
                  <option value="Liability">Liability</option>
                </select>
              </div>
              
              <div className="w-full sm:w-1/2 lg:w-1/4 px-2 mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Transaction Type</label>
                <select
                  value={selectedTransactionType}
                  onChange={(e) => setSelectedTransactionType(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm"
                  style={{ borderColor: 'var(--gray-300)', focusRingColor: 'var(--primary-orange)' }}
                >
                  <option value="all">All Types</option>
                  {uniqueTransactionTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Results Summary */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <p className="text-sm text-gray-600">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredEntries.length)} of {filteredEntries.length} ledger entries
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
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => toggleSort('debitAccount')}>
                      <div className="flex items-center space-x-1">
                        <span>Debit Account</span>
                        {sortField === 'debitAccount' && (sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />)}
                      </div>
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => toggleSort('creditAccount')}>
                      <div className="flex items-center space-x-1">
                        <span>Credit Account</span>
                        {sortField === 'creditAccount' && (sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />)}
                      </div>
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => toggleSort('amount')}>
                      <div className="flex items-center space-x-1">
                        <span>Amount</span>
                        {sortField === 'amount' && (sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />)}
                      </div>
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentItems.map((entry) => {
                    const entryDate = formatDateTime(entry.date);
                    const debitCategoryColor = getCategoryColor(entry.debitCategory);
                    const creditCategoryColor = getCategoryColor(entry.creditCategory);
                    
                    return (
                      <tr key={entry.id} className="hover:bg-gray-50">
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                          <div>
                            <p className="text-sm text-gray-900">{entryDate.date}</p>
                            <p className="text-xs text-gray-500">{entryDate.time}</p>
                          </div>
                        </td>
                        <td className="px-3 sm:px-6 py-4">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{entry.debitAccount}</p>
                            <span className={`text-xs px-1.5 py-0.5 rounded-full ${debitCategoryColor}`}>
                              {entry.debitCategory}
                            </span>
                            <p className="text-xs text-gray-400">{entry.debitAccountCode}</p>
                          </div>
                        </td>
                        <td className="px-3 sm:px-6 py-4">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{entry.creditAccount}</p>
                            <span className={`text-xs px-1.5 py-0.5 rounded-full ${creditCategoryColor}`}>
                              {entry.creditCategory}
                            </span>
                            <p className="text-xs text-gray-400">{entry.creditAccountCode}</p>
                          </div>
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                          <p className="text-sm font-semibold text-gray-900">{formatCurrency(entry.amount)}</p>
                        </td>
                        <td className="px-3 sm:px-6 py-4">
                          <div>
                            <p className="text-sm text-gray-900">{entry.referenceId}</p>
                            <p className="text-xs text-gray-500">{entry.transactionType}</p>
                          </div>
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => {
                              setSelectedEntry(entry);
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
            {currentItems.map((entry) => {
              const entryDate = formatDateTime(entry.date);
              const debitCategoryColor = getCategoryColor(entry.debitCategory);
              const creditCategoryColor = getCategoryColor(entry.creditCategory);
              
              return (
                <div key={entry.id} className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
                  <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow h-full">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-xs text-gray-500">{entryDate.date} {entryDate.time}</p>
                        <p className="text-sm font-semibold text-gray-900">{entry.transactionType}</p>
                      </div>
                      <p className="text-lg font-bold" style={{ color: 'var(--primary-orange)' }}>
                        {formatCurrency(entry.amount)}
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="bg-gray-50 rounded-lg p-2">
                        <p className="text-xs text-gray-500 mb-1">Debit Account</p>
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">{entry.debitAccount}</p>
                          <span className={`text-xs px-1.5 py-0.5 rounded-full ${debitCategoryColor}`}>
                            {entry.debitCategory}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400">{entry.debitAccountCode}</p>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-2">
                        <p className="text-xs text-gray-500 mb-1">Credit Account</p>
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">{entry.creditAccount}</p>
                          <span className={`text-xs px-1.5 py-0.5 rounded-full ${creditCategoryColor}`}>
                            {entry.creditCategory}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400">{entry.creditAccountCode}</p>
                      </div>
                      
                      <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                        <div>
                          <p className="text-xs text-gray-500">Reference</p>
                          <p className="text-sm text-gray-900">{entry.referenceId}</p>
                        </div>
                        <button
                          onClick={() => {
                            setSelectedEntry(entry);
                            setShowDetailsModal(true);
                          }}
                          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <FaEye className="w-4 h-4" style={{ color: 'var(--primary-orange)' }} />
                        </button>
                      </div>
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

        {filteredEntries.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg">
            <FaInfoCircle className="w-12 h-12 mx-auto text-gray-400 mb-3" />
            <p className="text-gray-500">No ledger entries found</p>
          </div>
        )}
      </div>

      {/* Ledger Entry Details Modal - Fixed */}
      {showDetailsModal && selectedEntry && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40" onClick={() => setShowDetailsModal(false)}></div>
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col border border-gray-200">
              {/* Fixed Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between rounded-t-lg flex-shrink-0">
                <h3 className="text-lg font-semibold text-gray-900">Ledger Entry Details</h3>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <FaTimes className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              
              {/* Scrollable Content - Hide scrollbar */}
              <div className="flex-1 overflow-y-auto p-6" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <style jsx>{`
                  div::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>
                
                <div className="mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Entry ID</p>
                      <p className="text-xl font-bold text-gray-900">{selectedEntry.id}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Transaction Type</p>
                      <p className="text-lg font-semibold" style={{ color: 'var(--primary-orange)' }}>
                        {selectedEntry.transactionType}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap -mx-2 mb-6">
                  <div className="w-full md:w-1/2 px-2 mb-4">
                    <div className="bg-green-50 rounded-lg p-4">
                      <h4 className="font-semibold text-green-900 mb-3 flex items-center space-x-2">
                        <FaDollarSign className="w-4 h-4" />
                        <span>Debit Account</span>
                      </h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="font-medium">Account:</span> {selectedEntry.debitAccount}</p>
                        <p><span className="font-medium">Code:</span> {selectedEntry.debitAccountCode}</p>
                        <p><span className="font-medium">Category:</span> {selectedEntry.debitCategory}</p>
                        <p className="text-xl font-bold text-green-600 mt-2">{formatCurrency(selectedEntry.amount)}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-full md:w-1/2 px-2 mb-4">
                    <div className="bg-red-50 rounded-lg p-4">
                      <h4 className="font-semibold text-red-900 mb-3 flex items-center space-x-2">
                        <FaCreditCard className="w-4 h-4" />
                        <span>Credit Account</span>
                      </h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="font-medium">Account:</span> {selectedEntry.creditAccount}</p>
                        <p><span className="font-medium">Code:</span> {selectedEntry.creditAccountCode}</p>
                        <p><span className="font-medium">Category:</span> {selectedEntry.creditCategory}</p>
                        <p className="text-xl font-bold text-red-600 mt-2">{formatCurrency(selectedEntry.amount)}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Transaction Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium">Date & Time:</span>
                      <span>{formatDateTime(selectedEntry.date).full}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Reference ID:</span>
                      <span>{selectedEntry.referenceId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Status:</span>
                      <span className="text-green-600">{selectedEntry.status}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Created By:</span>
                      <span>{selectedEntry.createdBy}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Description</h4>
                  <p className="text-sm text-blue-800">{selectedEntry.description}</p>
                  {selectedEntry.notes && (
                    <div className="mt-3 pt-3 border-t border-blue-200">
                      <p className="text-xs font-medium text-blue-900">Notes:</p>
                      <p className="text-sm text-blue-800">{selectedEntry.notes}</p>
                    </div>
                  )}
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
                <span className="text-sm">Export Ledger</span>
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

export default LedgerView;