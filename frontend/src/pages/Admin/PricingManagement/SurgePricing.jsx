import React, { useState, useEffect } from 'react';
import {
  FaChartLine,
  FaCar,
  FaClock,
  FaCalendarAlt,
  FaDollarSign,
  FaPercentage,
  FaSave,
  FaUndo,
  FaEdit,
  FaCheckCircle,
  FaExclamationTriangle,
  FaSpinner,
  FaArrowLeft,
  FaExpand,
  FaCompress,
  FaBars,
  FaTimes,
  FaSearch,
  FaFilter,
  FaRobot,
  FaBrain,
  FaChartBar,
  FaChartPie,
  FaBell,
  FaSlidersH,
  FaThermometerFull,
  FaThermometerHalf,
  FaThermometerEmpty,
  FaHistory,
  FaDownload,
  FaShare,
  FaPrint,
  FaEye,
  FaEyeSlash,
  FaPlus,
  FaMinus,
  FaUsers,
  FaMapMarkerAlt,
  FaCloudSun,
  FaCity,
  FaBuilding,
  FaPlane,
  FaUtensils,
  FaFutbol,
  FaTrain,
  FaInfoCircle,
  FaToggleOn,
  FaToggleOff
} from 'react-icons/fa';
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";

const SurgePricing = () => {
  const [surgeRules, setSurgeRules] = useState([]);
  const [originalRules, setOriginalRules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(null);
  const [useAIMode, setUseAIMode] = useState(false);
  const [selectedVehicleType, setSelectedVehicleType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileView, setIsMobileView] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [fullscreenMode, setFullscreenMode] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(true);
  const [demandData, setDemandData] = useState(null);
  const [peakHours, setPeakHours] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

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

  // Update current time for live surge display
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Fetch surge pricing rules
  useEffect(() => {
    fetchSurgeRules();
    fetchDemandData();
    fetchPeakHours();
  }, []);

  const fetchSurgeRules = async () => {
    setLoading(true);
    setTimeout(() => {
      const mockRules = [
        {
          id: 'SURGE001',
          vehicleType: 'Standard',
          currentMultiplier: 1.2,
          minMultiplier: 1.0,
          maxMultiplier: 3.0,
          baseMultiplier: 1.0,
          threshold: 70,
          isActive: true,
          lastUpdated: '2024-03-15T10:30:00Z',
          updatedBy: 'System Admin',
          peakHours: ['08:00-10:00', '17:00-19:00'],
          demandLevel: 'medium'
        },
        {
          id: 'SURGE002',
          vehicleType: 'Premium',
          currentMultiplier: 1.3,
          minMultiplier: 1.0,
          maxMultiplier: 3.5,
          baseMultiplier: 1.0,
          threshold: 65,
          isActive: true,
          lastUpdated: '2024-03-15T10:30:00Z',
          updatedBy: 'System Admin',
          peakHours: ['08:00-10:00', '17:00-19:00', '22:00-23:00'],
          demandLevel: 'high'
        },
        {
          id: 'SURGE003',
          vehicleType: 'Luxury',
          currentMultiplier: 1.5,
          minMultiplier: 1.0,
          maxMultiplier: 4.0,
          baseMultiplier: 1.0,
          threshold: 60,
          isActive: true,
          lastUpdated: '2024-03-15T10:30:00Z',
          updatedBy: 'System Admin',
          peakHours: ['18:00-22:00', '23:00-02:00'],
          demandLevel: 'very_high'
        },
        {
          id: 'SURGE004',
          vehicleType: 'Electric',
          currentMultiplier: 1.1,
          minMultiplier: 1.0,
          maxMultiplier: 2.8,
          baseMultiplier: 1.0,
          threshold: 75,
          isActive: true,
          lastUpdated: '2024-03-15T10:30:00Z',
          updatedBy: 'System Admin',
          peakHours: ['09:00-11:00', '16:00-18:00'],
          demandLevel: 'low'
        },
        {
          id: 'SURGE005',
          vehicleType: 'SUV',
          currentMultiplier: 1.25,
          minMultiplier: 1.0,
          maxMultiplier: 3.2,
          baseMultiplier: 1.0,
          threshold: 68,
          isActive: true,
          lastUpdated: '2024-03-15T10:30:00Z',
          updatedBy: 'System Admin',
          peakHours: ['07:00-09:00', '16:00-19:00'],
          demandLevel: 'medium'
        }
      ];
      
      setSurgeRules(mockRules);
      setOriginalRules(JSON.parse(JSON.stringify(mockRules)));
      setLoading(false);
    }, 1000);
  };

  const fetchDemandData = () => {
    setTimeout(() => {
      setDemandData({
        currentDemand: 78,
        historicalPeak: 92,
        demandTrend: 'increasing',
        activeUsers: 1245,
        availableDrivers: 342,
        waitTimeAvg: 4.5,
        zones: [
          { name: 'Downtown', demand: 85, multiplier: 1.4 },
          { name: 'Airport', demand: 92, multiplier: 1.6 },
          { name: 'Shopping District', demand: 78, multiplier: 1.3 },
          { name: 'Residential', demand: 45, multiplier: 1.0 },
          { name: 'Business District', demand: 88, multiplier: 1.5 }
        ]
      });
    }, 500);
  };

  const fetchPeakHours = () => {
    setTimeout(() => {
      setPeakHours([
        { time: '07:00-09:00', label: 'Morning Rush', multiplier: 1.3 },
        { time: '12:00-14:00', label: 'Lunch Hour', multiplier: 1.2 },
        { time: '17:00-19:00', label: 'Evening Rush', multiplier: 1.4 },
        { time: '22:00-02:00', label: 'Late Night', multiplier: 1.5 },
        { time: 'Weekend', label: 'Weekend Peak', multiplier: 1.6 }
      ]);
    }, 500);
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

  // Format date
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Handle surge multiplier change
  const handleSurgeChange = (id, value) => {
    setSurgeRules(prev => prev.map(rule =>
      rule.id === id ? { ...rule, currentMultiplier: parseFloat(value) || 1.0 } : rule
    ));
  };

  // Handle threshold change
  const handleThresholdChange = (id, value) => {
    setSurgeRules(prev => prev.map(rule =>
      rule.id === id ? { ...rule, threshold: parseInt(value) || 0 } : rule
    ));
  };

  // Toggle active status
  const toggleActive = (id) => {
    setSurgeRules(prev => prev.map(rule =>
      rule.id === id ? { ...rule, isActive: !rule.isActive } : rule
    ));
  };

  // Save changes
  const saveChanges = async () => {
    setSaving(true);
    setTimeout(() => {
      const updatedRules = surgeRules.map(rule => ({
        ...rule,
        lastUpdated: new Date().toISOString(),
        updatedBy: useAIMode ? 'AI System' : 'Admin User'
      }));
      setSurgeRules(updatedRules);
      setOriginalRules(JSON.parse(JSON.stringify(updatedRules)));
      setSaveSuccess({
        success: true,
        message: useAIMode 
          ? 'AI surge pricing rules updated and active!' 
          : 'Manual surge pricing rules updated successfully!'
      });
      setEditingId(null);
      setSaving(false);
      
      setTimeout(() => {
        setSaveSuccess(null);
      }, 5000);
    }, 1500);
  };

  // Reset changes
  const resetChanges = () => {
    setSurgeRules(JSON.parse(JSON.stringify(originalRules)));
    setEditingId(null);
    setSaveSuccess({
      success: true,
      message: 'Changes have been reverted to last saved version.'
    });
    setTimeout(() => {
      setSaveSuccess(null);
    }, 3000);
  };

  // AI-based surge prediction
  const applyAIPrediction = () => {
    setSurgeRules(prev => prev.map(rule => {
      let predictedMultiplier = rule.baseMultiplier;
      
      // AI logic based on time, demand, weather, etc.
      const hour = currentTime.getHours();
      const isWeekend = currentTime.getDay() === 0 || currentTime.getDay() === 6;
      
      if (hour >= 7 && hour <= 9) predictedMultiplier = 1.3;
      else if (hour >= 17 && hour <= 19) predictedMultiplier = 1.4;
      else if (hour >= 22 || hour <= 2) predictedMultiplier = 1.5;
      else if (isWeekend) predictedMultiplier = 1.2;
      else predictedMultiplier = 1.0;
      
      // Apply vehicle type specific adjustments
      if (rule.vehicleType === 'Luxury') predictedMultiplier *= 1.2;
      if (rule.vehicleType === 'Premium') predictedMultiplier *= 1.1;
      
      // Ensure within bounds
      predictedMultiplier = Math.min(rule.maxMultiplier, Math.max(rule.minMultiplier, predictedMultiplier));
      
      return {
        ...rule,
        currentMultiplier: parseFloat(predictedMultiplier.toFixed(1))
      };
    }));
    
    setSaveSuccess({
      success: true,
      message: 'AI system has automatically adjusted surge multipliers based on current demand patterns.'
    });
    setTimeout(() => {
      setSaveSuccess(null);
    }, 3000);
  };

  // Toggle AI mode
  const toggleAIMode = () => {
    setUseAIMode(!useAIMode);
    if (!useAIMode) {
      applyAIPrediction();
    }
  };

  // Check if changes exist
  const hasChanges = () => {
    return JSON.stringify(surgeRules) !== JSON.stringify(originalRules);
  };

  // Get demand level color
  const getDemandColor = (level) => {
    switch(level) {
      case 'very_high': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // Get surge indicator
  const getSurgeIndicator = (multiplier) => {
    if (multiplier >= 2.0) return <FaThermometerFull className="w-4 h-4 text-red-500" />;
    if (multiplier >= 1.5) return <FaThermometerHalf className="w-4 h-4 text-orange-500" />;
    if (multiplier >= 1.2) return <FaThermometerHalf className="w-4 h-4 text-yellow-500" />;
    return <FaThermometerEmpty className="w-4 h-4 text-green-500" />;
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

  // Filter rules
  const filteredRules = surgeRules.filter(rule => {
    const matchesSearch = rule.vehicleType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedVehicleType === 'all' || rule.vehicleType === selectedVehicleType;
    return matchesSearch && matchesType;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <FaSpinner className="w-10 h-10 sm:w-12 sm:h-12 animate-spin mx-auto mb-4" style={{ color: 'var(--primary-orange)' }} />
          <p className="text-sm sm:text-base text-gray-600">Loading surge pricing rules...</p>
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
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Surge Pricing</h1>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                  {useAIMode ? 'AI-based dynamic surge adjustment' : 'Manual surge multiplier control'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <button
                onClick={() => setShowAnalytics(!showAnalytics)}
                className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <FaChartBar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </button>
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <FaHistory className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
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

      {/* AI Mode Toggle Banner */}
      <div className="bg-gradient-to-r my-6 lg:my-0 from-purple-50 to-blue-50 border-b border-purple-200">
        <div className="sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center space-x-3">
              <FaRobot className="w-6 h-6 text-purple-600" />
              <div>
                <p className="text-sm font-semibold text-purple-900">AI-Powered Dynamic Pricing</p>
                <p className="text-xs text-purple-700">Real-time demand-based surge adjustment</p>
              </div>
            </div>
            <button
              onClick={toggleAIMode}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                useAIMode 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {useAIMode ? <FaToggleOn className="w-5 h-5" /> : <FaToggleOff className="w-5 h-5" />}
              <span className="text-sm font-medium">
                {useAIMode ? 'AI Mode Active' : 'Manual Mode'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Save Status Message */}
      {saveSuccess && (
        <div className={`fixed top-20 right-4 z-50 animate-slide-in max-w-sm`}>
          <div className={`${saveSuccess.success ? 'bg-green-50 border-l-4 border-green-400' : 'bg-red-50 border-l-4 border-red-400'} p-4 rounded-lg shadow-lg`}>
            <div className="flex items-center space-x-3">
              {saveSuccess.success ? 
                <FaCheckCircle className="w-5 h-5 text-green-400" /> : 
                <FaExclamationTriangle className="w-5 h-5 text-red-400" />
              }
              <div>
                <p className={`${saveSuccess.success ? 'text-green-800' : 'text-red-800'} text-sm`}>
                  {saveSuccess.message}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="sm:py-6">
        {/* Analytics Dashboard */}
        {showAnalytics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center justify-between mb-2">
                <FaUsers className="w-5 h-5 text-blue-500" />
                <span className="text-xs text-gray-500">Live</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{demandData?.activeUsers || 0}</div>
              <div className="text-xs text-gray-600">Active Users</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center justify-between mb-2">
                <FaCar className="w-5 h-5 text-green-500" />
                <span className="text-xs text-gray-500">Available</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{demandData?.availableDrivers || 0}</div>
              <div className="text-xs text-gray-600">Available Drivers</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center justify-between mb-2">
                <FaChartLine className="w-5 h-5 text-orange-500" />
                <span className="text-xs text-gray-500">Demand</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{demandData?.currentDemand || 0}%</div>
              <div className="text-xs text-gray-600">Current Demand Level</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center justify-between mb-2">
                <FaClock className="w-5 h-5 text-purple-500" />
                <span className="text-xs text-gray-500">Wait Time</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{demandData?.waitTimeAvg || 0} min</div>
              <div className="text-xs text-gray-600">Average Wait Time</div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by vehicle type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm"
                style={{ borderColor: 'var(--gray-300)', focusRingColor: 'var(--primary-orange)' }}
              />
            </div>
            <div className="relative">
              <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={selectedVehicleType}
                onChange={(e) => setSelectedVehicleType(e.target.value)}
                className="pl-9 pr-8 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm appearance-none bg-white"
                style={{ borderColor: 'var(--gray-300)', focusRingColor: 'var(--primary-orange)' }}
              >
                <option value="all">All Vehicle Types</option>
                {surgeRules.map(rule => (
                  <option key={rule.id} value={rule.vehicleType}>{rule.vehicleType}</option>
                ))}
              </select>
            </div>
            {useAIMode && (
              <button
                onClick={applyAIPrediction}
                className="px-4 py-2 rounded-lg text-white flex items-center space-x-2"
                style={{ backgroundColor: 'var(--primary-orange)' }}
              >
                <FaBrain className="w-4 h-4" />
                <span>Run AI Prediction</span>
              </button>
            )}
          </div>
        </div>

        {/* Surge Pricing Rules Cards */}
        <div className="space-y-4">
          {filteredRules.map((rule) => (
            <div key={rule.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 sm:p-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                      <FaCar className="w-5 h-5" style={{ color: 'var(--primary-orange)' }} />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-semibold text-gray-900">{rule.vehicleType}</h3>
                        <span className={`px-2 py-0.5 text-xs rounded-full ${getDemandColor(rule.demandLevel)}`}>
                          {rule.demandLevel.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">
                        Last updated: {formatDateTime(rule.lastUpdated)} by {rule.updatedBy}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => toggleActive(rule.id)}
                      className={`px-3 py-1.5 rounded-lg text-sm flex items-center space-x-1 ${
                        rule.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {rule.isActive ? <FaCheckCircle className="w-4 h-4" /> : <FaTimes className="w-4 h-4" />}
                      <span>{rule.isActive ? 'Active' : 'Inactive'}</span>
                    </button>
                    {editingId === rule.id ? (
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-3 py-1.5 rounded-lg border hover:bg-gray-50 text-sm"
                      >
                        Cancel
                      </button>
                    ) : (
                      <button
                        onClick={() => setEditingId(rule.id)}
                        className="px-3 py-1.5 rounded-lg border hover:bg-gray-50 text-sm flex items-center space-x-1"
                      >
                        <FaEdit className="w-4 h-4" />
                        <span>Edit</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Surge Display */}
                <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Current Surge Multiplier</p>
                      <div className="flex items-center space-x-2">
                        {getSurgeIndicator(rule.currentMultiplier)}
                        <p className="text-3xl font-bold" style={{ color: 'var(--primary-orange)' }}>
                          {rule.currentMultiplier}x
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600 mb-1">Price Impact</p>
                      <p className="text-lg font-semibold text-gray-900">
                        +{((rule.currentMultiplier - 1) * 100).toFixed(0)}%
                      </p>
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Surge Multiplier ({rule.minMultiplier}x - {rule.maxMultiplier}x)
                    </label>
                    {editingId === rule.id ? (
                      <div className="flex items-center space-x-3">
                        <input
                          type="range"
                          min={rule.minMultiplier}
                          max={rule.maxMultiplier}
                          step="0.1"
                          value={rule.currentMultiplier}
                          onChange={(e) => handleSurgeChange(rule.id, e.target.value)}
                          className="flex-1"
                          style={{ accentColor: 'var(--primary-orange)' }}
                        />
                        <input
                          type="number"
                          step="0.1"
                          value={rule.currentMultiplier}
                          onChange={(e) => handleSurgeChange(rule.id, e.target.value)}
                          className="w-20 px-2 py-1 border rounded-lg text-center"
                          style={{ borderColor: 'var(--gray-300)' }}
                        />
                        <span className="text-sm font-semibold">x</span>
                      </div>
                    ) : (
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all"
                          style={{
                            width: `${((rule.currentMultiplier - rule.minMultiplier) / (rule.maxMultiplier - rule.minMultiplier)) * 100}%`,
                            backgroundColor: 'var(--primary-orange)'
                          }}
                        ></div>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Surge Threshold (%)
                    </label>
                    {editingId === rule.id ? (
                      <div className="flex items-center space-x-3">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={rule.threshold}
                          onChange={(e) => handleThresholdChange(rule.id, e.target.value)}
                          className="flex-1"
                          style={{ accentColor: 'var(--primary-orange)' }}
                        />
                        <input
                          type="number"
                          value={rule.threshold}
                          onChange={(e) => handleThresholdChange(rule.id, e.target.value)}
                          className="w-20 px-2 py-1 border rounded-lg text-center"
                          style={{ borderColor: 'var(--gray-300)' }}
                        />
                        <span className="text-sm">%</span>
                      </div>
                    ) : (
                      <p className="text-lg font-semibold text-gray-900">{rule.threshold}%</p>
                    )}
                  </div>
                </div>

                {/* Peak Hours */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm font-medium text-gray-700 mb-2">Peak Hours</p>
                  <div className="flex flex-wrap gap-2">
                    {rule.peakHours.map((hour, idx) => (
                      <span key={idx} className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                        {hour}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Estimated Impact */}
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600 mb-2">Estimated Impact on 10km, 20min ride:</p>
                  <div className="flex justify-between text-sm">
                    <span>Normal fare: ~$15.00</span>
                    <span className="font-semibold" style={{ color: 'var(--primary-orange)' }}>
                      Surge fare: ~${(15 * rule.currentMultiplier).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        {hasChanges() && (
          <div className="fixed bottom-6 right-6 flex space-x-3 z-30">
            <button
              onClick={resetChanges}
              className="px-4 py-2 rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow flex items-center space-x-2"
            >
              <FaUndo className="w-4 h-4 text-gray-600" />
              <span>Reset</span>
            </button>
            <button
              onClick={saveChanges}
              disabled={saving}
              className="px-4 py-2 rounded-lg text-white shadow-lg hover:shadow-xl transition-shadow flex items-center space-x-2"
              style={{ backgroundColor: 'var(--primary-orange)' }}
            >
              {saving ? (
                <>
                  <FaSpinner className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <FaSave className="w-4 h-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Demand Zones Info */}
        {showAnalytics && demandData && (
          <div className="mt-6 bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <FaMapMarkerAlt className="w-5 h-5" style={{ color: 'var(--primary-orange)' }} />
              <span>High Demand Zones</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {demandData.zones.map((zone, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{zone.name}</p>
                    <p className="text-xs text-gray-500">Demand: {zone.demand}%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold" style={{ color: 'var(--primary-orange)' }}>
                      {zone.multiplier}x
                    </p>
                    <p className="text-xs text-gray-500">surge</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info Banner */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <FaInfoCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-blue-900">About Surge Pricing</p>
              <p className="text-xs text-blue-800 mt-1">
                • Surge multipliers apply during high demand periods<br />
                • {useAIMode ? 'AI automatically adjusts based on real-time demand' : 'Manual adjustments take effect immediately'}<br />
                • Each vehicle type has independent min/max limits<br />
                • Surge pricing helps balance supply and demand
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* History Modal */}
      {showHistory && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setShowHistory(false)}></div>
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Surge Price Change History</h3>
                <button
                  onClick={() => setShowHistory(false)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <FaTimes className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {surgeRules.map(rule => (
                    <div key={rule.id} className="border-b border-gray-100 pb-3">
                      <p className="font-semibold text-gray-900">{rule.vehicleType}</p>
                      <p className="text-sm text-gray-600">
                        Current Multiplier: {rule.currentMultiplier}x
                      </p>
                      <p className="text-sm text-gray-600">
                        Last updated: {formatDateTime(rule.lastUpdated)}
                      </p>
                      <p className="text-sm text-gray-600">
                        By: {rule.updatedBy}
                      </p>
                    </div>
                  ))}
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
              <button
                onClick={() => {
                  setShowAnalytics(!showAnalytics);
                  setSidebarOpen(false);
                }}
                className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FaChartBar className="w-5 h-5 text-blue-500" />
                <span className="text-sm">Toggle Analytics</span>
              </button>
              <button
                onClick={() => {
                  setShowHistory(true);
                  setSidebarOpen(false);
                }}
                className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FaHistory className="w-5 h-5 text-purple-500" />
                <span className="text-sm">View History</span>
              </button>
              <button
                onClick={() => {
                  toggleAIMode();
                  setSidebarOpen(false);
                }}
                className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FaRobot className="w-5 h-5 text-green-500" />
                <span className="text-sm">{useAIMode ? 'Disable AI Mode' : 'Enable AI Mode'}</span>
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

export default SurgePricing;