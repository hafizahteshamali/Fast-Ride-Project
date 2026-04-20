import React, { useState, useEffect } from 'react';
import {
  FaChartLine,
  FaMoneyBillWave,
  FaTruck,
  FaPercentage,
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
  FaWallet,
  FaCreditCard,
  FaReceipt,
  FaFileInvoice,
  FaCheckCircle,
  FaExclamationTriangle,
  FaSpinner,
  FaLongArrowAltUp,
  FaLongArrowAltDown,
  FaArrowUp,
  FaArrowDown,
  FaMinus,
  FaPlus,
  FaChevronLeft,
  FaChevronRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaBuilding,
  FaUsers,
  FaCalculator
} from 'react-icons/fa';

const ProfitLossReports = () => {
  const [financialData, setFinancialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedYear, setSelectedYear] = useState(2024);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [comparisonPeriod, setComparisonPeriod] = useState('previous');
  const [showDetails, setShowDetails] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  // UI states
  const [isMobileView, setIsMobileView] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [fullscreenMode, setFullscreenMode] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  const [viewMode, setViewMode] = useState('summary');
  
  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setIsMobileView(isMobile);
      if (isMobile) {
        setSidebarOpen(false);
      } else {
        setShowFilters(true);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch P&L data
  useEffect(() => {
    fetchProfitLossData();
  }, [selectedPeriod, selectedYear, selectedMonth]);

  const fetchProfitLossData = async () => {
    setLoading(true);
    setTimeout(() => {
      const mockData = generateMockPnlData();
      setFinancialData(mockData);
      setLoading(false);
    }, 1000);
  };

  const generateMockPnlData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonthData = {
      revenue: {
        total: 245890.75,
        rideRevenue: 198450.25,
        surgeRevenue: 32450.50,
        cancellationFees: 12500.00,
        subscriptionFees: 2490.00,
        otherRevenue: 0
      },
      driverPayouts: {
        total: 147534.45,
        basePayout: 123456.78,
        bonusPayout: 12000.00,
        adjustmentPayout: 12077.67
      },
      platformCommission: {
        total: 98356.30,
        commissionRate: 40.0,
        rideCommission: 79380.10,
        surgeCommission: 12980.20,
        feeCommission: 5996.00
      },
      expenses: {
        total: 24567.89,
        marketing: 8500.00,
        operations: 9876.54,
        support: 3191.35,
        technology: 3000.00
      },
      netProfit: {
        total: 73788.41,
        margin: 30.0
      },
      metrics: {
        totalRides: 12543,
        activeDrivers: 342,
        activeCustomers: 5678,
        avgRideValue: 19.60,
        avgCommissionPerRide: 7.84
      }
    };

    // Generate previous period data for comparison
    const previousMonthData = {
      revenue: { total: 221301.68 },
      driverPayouts: { total: 132781.01 },
      platformCommission: { total: 88520.67 },
      expenses: { total: 22111.10 },
      netProfit: { total: 66409.57 },
      metrics: { totalRides: 11289, avgRideValue: 19.60 }
    };

    // Generate last year data
    const lastYearData = {
      revenue: { total: 198450.25 },
      driverPayouts: { total: 119070.15 },
      platformCommission: { total: 79380.10 },
      expenses: { total: 19845.03 },
      netProfit: { total: 59535.07 },
      metrics: { totalRides: 9876 }
    };

    // Monthly trends for charts
    const monthlyTrends = months.map((month, index) => ({
      month: month,
      revenue: 150000 + Math.random() * 100000,
      commission: 60000 + Math.random() * 40000,
      profit: 45000 + Math.random() * 30000
    }));

    return {
      current: currentMonthData,
      previous: previousMonthData,
      lastYear: lastYearData,
      monthlyTrends: monthlyTrends,
      period: {
        currentPeriod: `${months[selectedMonth]} ${selectedYear}`,
        previousPeriod: comparisonPeriod === 'previous' ? `${months[selectedMonth - 1]} ${selectedYear}` : `${months[selectedMonth]} ${selectedYear - 1}`,
        comparisonChange: 11.1
      }
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

  // Format number
  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  // Calculate percentage change
  const calculateChange = (current, previous) => {
    if (!previous || previous === 0) return 0;
    const change = ((current - previous) / previous) * 100;
    return change;
  };

  // Get change color and icon
  const getChangeInfo = (change) => {
    if (change > 0) {
      return { color: 'text-green-600', bg: 'bg-green-100', icon: FaArrowUp, text: `+${change.toFixed(1)}%` };
    } else if (change < 0) {
      return { color: 'text-red-600', bg: 'bg-red-100', icon: FaArrowDown, text: `${change.toFixed(1)}%` };
    }
    return { color: 'text-gray-600', bg: 'bg-gray-100', icon: FaMinus, text: '0%' };
  };

  // Get comparison data
  const getComparisonValue = (currentValue, field, subField = null) => {
    let previousValue;
    if (comparisonPeriod === 'previous') {
      previousValue = subField ? financialData?.previous[field]?.[subField] : financialData?.previous[field]?.total;
    } else {
      previousValue = subField ? financialData?.lastYear[field]?.[subField] : financialData?.lastYear[field]?.total;
    }
    return calculateChange(currentValue, previousValue);
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

  if (loading || !financialData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <FaSpinner className="w-10 h-10 sm:w-12 sm:h-12 animate-spin mx-auto mb-4" style={{ color: 'var(--primary-orange)' }} />
          <p className="text-sm sm:text-base text-gray-600">Loading P&L data...</p>
        </div>
      </div>
    );
  }

  const current = financialData.current;
  const monthlyTrends = financialData.monthlyTrends;

  return (
    <div className={`min-h-screen bg-gray-50 ${fullscreenMode ? 'fixed inset-0 z-50 overflow-auto' : ''}`}>
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-20">
        <div className="p-2 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div>
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Profit & Loss Reports</h1>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Full P&L reporting from Finance module</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <button
                onClick={() => setViewMode(viewMode === 'summary' ? 'details' : 'summary')}
                className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {viewMode === 'summary' ? <FaChartBar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" /> : <FaFileInvoice className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />}
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

      {/* Period Selector */}
      <div className="pt-4">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-wrap -mx-2">
            <div className="w-full sm:w-auto px-2 mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Period Type</label>
              <div className="flex space-x-2">
                {['month', 'quarter', 'year'].map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedPeriod(period)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedPeriod === period
                        ? 'text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    style={selectedPeriod === period ? { backgroundColor: 'var(--primary-orange)' } : {}}
                  >
                    {period.charAt(0).toUpperCase() + period.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="w-full sm:w-auto px-2 mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm"
                style={{ borderColor: 'var(--gray-300)', focusRingColor: 'var(--primary-orange)' }}
              >
                {[2023, 2024, 2025].map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            
            {selectedPeriod === 'month' && (
              <div className="w-full sm:w-auto px-2 mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Month</label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm"
                  style={{ borderColor: 'var(--gray-300)', focusRingColor: 'var(--primary-orange)' }}
                >
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, idx) => (
                    <option key={idx} value={idx}>{month}</option>
                  ))}
                </select>
              </div>
            )}
            
            <div className="w-full sm:w-auto px-2 mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Compare with</label>
              <div className="flex space-x-2">
                <button
                  onClick={() => setComparisonPeriod('previous')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    comparisonPeriod === 'previous'
                      ? 'text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  style={comparisonPeriod === 'previous' ? { backgroundColor: 'var(--primary-orange)' } : {}}
                >
                  Previous Period
                </button>
                <button
                  onClick={() => setComparisonPeriod('lastYear')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    comparisonPeriod === 'lastYear'
                      ? 'text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  style={comparisonPeriod === 'lastYear' ? { backgroundColor: 'var(--primary-orange)' } : {}}
                >
                  Last Year
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary View */}
      {viewMode === 'summary' ? (
        <>
          {/* Key Metrics Cards */}
          <div>
            <div className="flex flex-wrap -mx-2">
              <div className="w-full sm:w-1/2 lg:w-1/4 px-2 mb-4">
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <FaMoneyBillWave className="w-5 h-5 text-green-500" />
                      <span className="text-[12px] text-gray-600">Total Revenue</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${getChangeInfo(getComparisonValue(current.revenue.total, 'revenue')).bg} ${getChangeInfo(getComparisonValue(current.revenue.total, 'revenue')).color}`}>
                      {getChangeInfo(getComparisonValue(current.revenue.total, 'revenue')).text}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(current.revenue.total)}</p>
                  <p className="text-xs text-gray-500">vs {comparisonPeriod === 'previous' ? 'previous period' : 'last year'}</p>
                </div>
              </div>
              
              <div className="w-full sm:w-1/2 lg:w-1/4 px-2 mb-4">
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <FaTruck className="w-5 h-5 text-purple-500" />
                      <span className="text-[12px] text-gray-600">Driver Payouts</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${getChangeInfo(getComparisonValue(current.driverPayouts.total, 'driverPayouts')).bg} ${getChangeInfo(getComparisonValue(current.driverPayouts.total, 'driverPayouts')).color}`}>
                      {getChangeInfo(getComparisonValue(current.driverPayouts.total, 'driverPayouts')).text}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(current.driverPayouts.total)}</p>
                  <p className="text-xs text-gray-500">60% of revenue</p>
                </div>
              </div>
              
              <div className="w-full sm:w-1/2 lg:w-1/4 px-2 mb-4">
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <FaPercentage className="w-5 h-5 text-orange-500" />
                      <span className="text-[12px] text-gray-600">Platform Commission</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${getChangeInfo(getComparisonValue(current.platformCommission.total, 'platformCommission')).bg} ${getChangeInfo(getComparisonValue(current.platformCommission.total, 'platformCommission')).color}`}>
                      {getChangeInfo(getComparisonValue(current.platformCommission.total, 'platformCommission')).text}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(current.platformCommission.total)}</p>
                  <p className="text-xs text-gray-500">{current.platformCommission.commissionRate}% of revenue</p>
                </div>
              </div>
              
              <div className="w-full sm:w-1/2 lg:w-1/4 px-2 mb-4">
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <FaChartLine className="w-5 h-5 text-blue-500" />
                      <span className="text-[12px] text-gray-600">Net Profit</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${getChangeInfo(getComparisonValue(current.netProfit.total, 'netProfit')).bg} ${getChangeInfo(getComparisonValue(current.netProfit.total, 'netProfit')).color}`}>
                      {getChangeInfo(getComparisonValue(current.netProfit.total, 'netProfit')).text}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(current.netProfit.total)}</p>
                  <p className="text-xs text-gray-500">{current.netProfit.margin}% margin</p>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed P&L Breakdown */}
          <div>
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <FaChartPie className="w-5 h-5" style={{ color: 'var(--primary-orange)' }} />
                <span>Profit & Loss Breakdown</span>
              </h2>
              
              {/* Revenue Section */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-800">Revenue</h3>
                  <p className="font-bold text-green-600">{formatCurrency(current.revenue.total)}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center pl-4">
                    <span className="text-sm text-gray-600">Ride Revenue</span>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{formatCurrency(current.revenue.rideRevenue)}</p>
                      <p className="text-xs text-gray-400">{((current.revenue.rideRevenue / current.revenue.total) * 100).toFixed(1)}%</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pl-4">
                    <span className="text-sm text-gray-600">Surge Revenue</span>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{formatCurrency(current.revenue.surgeRevenue)}</p>
                      <p className="text-xs text-gray-400">{((current.revenue.surgeRevenue / current.revenue.total) * 100).toFixed(1)}%</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pl-4">
                    <span className="text-sm text-gray-600">Cancellation Fees</span>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{formatCurrency(current.revenue.cancellationFees)}</p>
                      <p className="text-xs text-gray-400">{((current.revenue.cancellationFees / current.revenue.total) * 100).toFixed(1)}%</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pl-4">
                    <span className="text-sm text-gray-600">Subscription Fees</span>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{formatCurrency(current.revenue.subscriptionFees)}</p>
                      <p className="text-xs text-gray-400">{((current.revenue.subscriptionFees / current.revenue.total) * 100).toFixed(1)}%</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Driver Payouts Section */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-800">Driver Payouts</h3>
                  <p className="font-bold text-purple-600">-{formatCurrency(current.driverPayouts.total)}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center pl-4">
                    <span className="text-sm text-gray-600">Base Payout</span>
                    <p className="text-sm font-medium text-gray-900">{formatCurrency(current.driverPayouts.basePayout)}</p>
                  </div>
                  <div className="flex justify-between items-center pl-4">
                    <span className="text-sm text-gray-600">Bonus Payout</span>
                    <p className="text-sm font-medium text-gray-900">{formatCurrency(current.driverPayouts.bonusPayout)}</p>
                  </div>
                </div>
              </div>
              
              {/* Platform Commission Section */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-800">Platform Commission</h3>
                  <p className="font-bold text-orange-600">{formatCurrency(current.platformCommission.total)}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center pl-4">
                    <span className="text-sm text-gray-600">Ride Commission ({(current.platformCommission.commissionRate)}%)</span>
                    <p className="text-sm font-medium text-gray-900">{formatCurrency(current.platformCommission.rideCommission)}</p>
                  </div>
                  <div className="flex justify-between items-center pl-4">
                    <span className="text-sm text-gray-600">Surge Commission</span>
                    <p className="text-sm font-medium text-gray-900">{formatCurrency(current.platformCommission.surgeCommission)}</p>
                  </div>
                </div>
              </div>
              
              {/* Expenses Section */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-800">Operating Expenses</h3>
                  <p className="font-bold text-red-600">-{formatCurrency(current.expenses.total)}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center pl-4">
                    <span className="text-sm text-gray-600">Marketing</span>
                    <p className="text-sm font-medium text-gray-900">{formatCurrency(current.expenses.marketing)}</p>
                  </div>
                  <div className="flex justify-between items-center pl-4">
                    <span className="text-sm text-gray-600">Operations</span>
                    <p className="text-sm font-medium text-gray-900">{formatCurrency(current.expenses.operations)}</p>
                  </div>
                  <div className="flex justify-between items-center pl-4">
                    <span className="text-sm text-gray-600">Customer Support</span>
                    <p className="text-sm font-medium text-gray-900">{formatCurrency(current.expenses.support)}</p>
                  </div>
                  <div className="flex justify-between items-center pl-4">
                    <span className="text-sm text-gray-600">Technology</span>
                    <p className="text-sm font-medium text-gray-900">{formatCurrency(current.expenses.technology)}</p>
                  </div>
                </div>
              </div>
              
              {/* Net Profit */}
              <div className="pt-4 border-t-2 border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-900">Net Profit</h3>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">{formatCurrency(current.netProfit.total)}</p>
                    <p className="text-sm text-gray-500">{current.netProfit.margin}% margin</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Monthly Trends */}
          <div>
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <FaChartLine className="w-5 h-5" style={{ color: 'var(--primary-orange)' }} />
                <span>Monthly Trends</span>
              </h2>
              <div className="flex flex-wrap -mx-2">
                {monthlyTrends.map((trend, idx) => (
                  <div key={idx} className="w-full sm:w-1/2 lg:w-1/4 xl:w-1/6 px-2 mb-4">
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                      <p className="text-sm font-medium text-gray-600">{trend.month}</p>
                      <p className="text-xs text-gray-500 mt-1">Revenue</p>
                      <p className="text-sm font-semibold text-green-600">{formatCurrency(trend.revenue)}</p>
                      <p className="text-xs text-gray-500 mt-1">Commission</p>
                      <p className="text-sm font-semibold text-orange-600">{formatCurrency(trend.commission)}</p>
                      <p className="text-xs text-gray-500 mt-1">Profit</p>
                      <p className="text-sm font-semibold text-blue-600">{formatCurrency(trend.profit)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        // Detailed View - Key Metrics Breakdown
        <div>
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <FaCalculator className="w-5 h-5" style={{ color: 'var(--primary-orange)' }} />
              <span>Key Performance Metrics</span>
            </h2>
            <div className="flex flex-wrap -mx-2">
              <div className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Total Rides</p>
                  <p className="text-xl font-bold text-gray-900">{formatNumber(current.metrics.totalRides)}</p>
                  <p className="text-xs text-green-600 mt-1">↑ 11.1% vs previous</p>
                </div>
              </div>
              <div className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Active Drivers</p>
                  <p className="text-xl font-bold text-gray-900">{formatNumber(current.metrics.activeDrivers)}</p>
                  <p className="text-xs text-green-600 mt-1">↑ 8.5% vs previous</p>
                </div>
              </div>
              <div className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Active Customers</p>
                  <p className="text-xl font-bold text-gray-900">{formatNumber(current.metrics.activeCustomers)}</p>
                  <p className="text-xs text-green-600 mt-1">↑ 12.3% vs previous</p>
                </div>
              </div>
              <div className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Average Ride Value</p>
                  <p className="text-xl font-bold text-gray-900">{formatCurrency(current.metrics.avgRideValue)}</p>
                  <p className="text-xs text-gray-500 mt-1">Steady growth</p>
                </div>
              </div>
              <div className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Commission per Ride</p>
                  <p className="text-xl font-bold text-gray-900">{formatCurrency(current.metrics.avgCommissionPerRide)}</p>
                  <p className="text-xs text-gray-500 mt-1">{current.platformCommission.commissionRate}% rate</p>
                </div>
              </div>
              <div className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Profit per Ride</p>
                  <p className="text-xl font-bold text-gray-900">{formatCurrency(current.netProfit.total / current.metrics.totalRides)}</p>
                  <p className="text-xs text-gray-500 mt-1">Margin: {current.netProfit.margin}%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Period Comparison */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <FaCalendarAlt className="w-5 h-5" style={{ color: 'var(--primary-orange)' }} />
              <span>Period Comparison</span>
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Metric</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Current Period</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">{comparisonPeriod === 'previous' ? 'Previous Period' : 'Last Year'}</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Change</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-600">Total Revenue</td>
                    <td className="px-4 py-3 text-right text-sm font-medium text-gray-900">{formatCurrency(current.revenue.total)}</td>
                    <td className="px-4 py-3 text-right text-sm text-gray-600">{formatCurrency(comparisonPeriod === 'previous' ? financialData.previous.revenue.total : financialData.lastYear.revenue.total)}</td>
                    <td className="px-4 py-3 text-right">
                      <span className={`text-sm font-medium ${getChangeInfo(getComparisonValue(current.revenue.total, 'revenue')).color}`}>
                        {getChangeInfo(getComparisonValue(current.revenue.total, 'revenue')).text}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-600">Driver Payouts</td>
                    <td className="px-4 py-3 text-right text-sm font-medium text-gray-900">{formatCurrency(current.driverPayouts.total)}</td>
                    <td className="px-4 py-3 text-right text-sm text-gray-600">{formatCurrency(comparisonPeriod === 'previous' ? financialData.previous.driverPayouts.total : financialData.lastYear.driverPayouts.total)}</td>
                    <td className="px-4 py-3 text-right">
                      <span className={`text-sm font-medium ${getChangeInfo(getComparisonValue(current.driverPayouts.total, 'driverPayouts')).color}`}>
                        {getChangeInfo(getComparisonValue(current.driverPayouts.total, 'driverPayouts')).text}
                      </span>
                    </td>
                  </tr>
                  <tr className="bg-orange-50">
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900">Platform Commission</td>
                    <td className="px-4 py-3 text-right text-sm font-bold text-orange-600">{formatCurrency(current.platformCommission.total)}</td>
                    <td className="px-4 py-3 text-right text-sm text-gray-600">{formatCurrency(comparisonPeriod === 'previous' ? financialData.previous.platformCommission.total : financialData.lastYear.platformCommission.total)}</td>
                    <td className="px-4 py-3 text-right">
                      <span className={`text-sm font-bold ${getChangeInfo(getComparisonValue(current.platformCommission.total, 'platformCommission')).color}`}>
                        {getChangeInfo(getComparisonValue(current.platformCommission.total, 'platformCommission')).text}
                      </span>
                    </td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900">Net Profit</td>
                    <td className="px-4 py-3 text-right text-sm font-bold text-blue-600">{formatCurrency(current.netProfit.total)}</td>
                    <td className="px-4 py-3 text-right text-sm text-gray-600">{formatCurrency(comparisonPeriod === 'previous' ? financialData.previous.netProfit.total : financialData.lastYear.netProfit.total)}</td>
                    <td className="px-4 py-3 text-right">
                      <span className={`text-sm font-bold ${getChangeInfo(getComparisonValue(current.netProfit.total, 'netProfit')).color}`}>
                        {getChangeInfo(getComparisonValue(current.netProfit.total, 'netProfit')).text}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Info Banner */}
      <div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <FaInfoCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-blue-900">P&L Summary</p>
              <p className="text-xs text-blue-800 mt-1">
                • Total Revenue: Customer payments including base fare, surge, and fees<br />
                • Driver Payouts: Total paid to drivers including base and bonuses<br />
                • Platform Commission: Revenue minus driver payouts<br />
                • Net Profit: Platform commission minus operating expenses
              </p>
            </div>
          </div>
        </div>
      </div>

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

export default ProfitLossReports;