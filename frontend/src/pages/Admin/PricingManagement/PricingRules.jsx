import React, { useState, useEffect } from 'react';
import {
  FaMoneyBillWave,
  FaCar,
  FaTachometerAlt,
  FaClock,
  FaChartLine,
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
  FaCalculator,
  FaRoad,
  FaStopwatch,
  FaPercentage,
  FaDollarSign,
  FaInfoCircle,
  FaHistory,
  FaDownload,
  FaShare,
  FaPrint,
  FaEye,
  FaEyeSlash,
  FaPlus,
  FaMinus,
  FaTrash,
  FaCopy
} from 'react-icons/fa';

const PricingRules = () => {
  const [pricingRules, setPricingRules] = useState([]);
  const [originalRules, setOriginalRules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVehicleType, setSelectedVehicleType] = useState('all');
  const [isMobileView, setIsMobileView] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [fullscreenMode, setFullscreenMode] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [estimateDetails, setEstimateDetails] = useState({
    distance: 5,
    duration: 15,
    vehicleType: 'Standard'
  });
  const [estimatedFare, setEstimatedFare] = useState(0);
  const [showEstimate, setShowEstimate] = useState(true);

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

  // Fetch pricing rules
  useEffect(() => {
    fetchPricingRules();
  }, []);

  const fetchPricingRules = async () => {
    setLoading(true);
    setTimeout(() => {
      const mockRules = [
        {
          id: 'PR001',
          vehicleType: 'Standard',
          baseFare: 2.50,
          pricePerKM: 1.50,
          pricePerMinute: 0.35,
          surgeMultiplier: 1.0,
          minFare: 5.00,
          cancellationFee: 3.00,
          waitingChargePerMin: 0.25,
          lastUpdated: '2024-03-15T10:30:00Z',
          updatedBy: 'System Admin',
          isActive: true
        },
        {
          id: 'PR002',
          vehicleType: 'Premium',
          baseFare: 4.00,
          pricePerKM: 2.20,
          pricePerMinute: 0.50,
          surgeMultiplier: 1.0,
          minFare: 8.00,
          cancellationFee: 5.00,
          waitingChargePerMin: 0.35,
          lastUpdated: '2024-03-15T10:30:00Z',
          updatedBy: 'System Admin',
          isActive: true
        },
        {
          id: 'PR003',
          vehicleType: 'Luxury',
          baseFare: 8.00,
          pricePerKM: 3.50,
          pricePerMinute: 0.80,
          surgeMultiplier: 1.0,
          minFare: 15.00,
          cancellationFee: 10.00,
          waitingChargePerMin: 0.50,
          lastUpdated: '2024-03-15T10:30:00Z',
          updatedBy: 'System Admin',
          isActive: true
        },
        {
          id: 'PR004',
          vehicleType: 'Electric',
          baseFare: 3.00,
          pricePerKM: 1.80,
          pricePerMinute: 0.40,
          surgeMultiplier: 1.0,
          minFare: 6.00,
          cancellationFee: 4.00,
          waitingChargePerMin: 0.30,
          lastUpdated: '2024-03-15T10:30:00Z',
          updatedBy: 'System Admin',
          isActive: true
        },
        {
          id: 'PR005',
          vehicleType: 'SUV',
          baseFare: 5.00,
          pricePerKM: 2.50,
          pricePerMinute: 0.60,
          surgeMultiplier: 1.0,
          minFare: 10.00,
          cancellationFee: 6.00,
          waitingChargePerMin: 0.40,
          lastUpdated: '2024-03-15T10:30:00Z',
          updatedBy: 'System Admin',
          isActive: true
        }
      ];
      
      setPricingRules(mockRules);
      setOriginalRules(JSON.parse(JSON.stringify(mockRules)));
      setLoading(false);
    }, 1000);
  };

  // Calculate estimated fare
  useEffect(() => {
    calculateEstimatedFare();
  }, [estimateDetails, pricingRules]);

  const calculateEstimatedFare = () => {
    const rule = pricingRules.find(r => r.vehicleType === estimateDetails.vehicleType);
    if (rule) {
      const distanceFare = rule.pricePerKM * estimateDetails.distance;
      const timeFare = rule.pricePerMinute * estimateDetails.duration;
      const subtotal = rule.baseFare + distanceFare + timeFare;
      const total = Math.max(subtotal * rule.surgeMultiplier, rule.minFare);
      setEstimatedFare(total);
    }
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
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Handle input change
  const handleInputChange = (id, field, value) => {
    setPricingRules(prev => prev.map(rule =>
      rule.id === id ? { ...rule, [field]: parseFloat(value) || 0 } : rule
    ));
  };

  // Handle surge multiplier change
  const handleSurgeChange = (id, value) => {
    setPricingRules(prev => prev.map(rule =>
      rule.id === id ? { ...rule, surgeMultiplier: parseFloat(value) || 1.0 } : rule
    ));
  };

  // Save changes
  const saveChanges = async () => {
    setSaving(true);
    setTimeout(() => {
      const updatedRules = pricingRules.map(rule => ({
        ...rule,
        lastUpdated: new Date().toISOString(),
        updatedBy: 'Admin User'
      }));
      setPricingRules(updatedRules);
      setOriginalRules(JSON.parse(JSON.stringify(updatedRules)));
      setSaveSuccess({
        success: true,
        message: 'Pricing rules updated successfully! Changes are now active for new ride estimates.'
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
    setPricingRules(JSON.parse(JSON.stringify(originalRules)));
    setEditingId(null);
    setSaveSuccess({
      success: true,
      message: 'Changes have been reverted to last saved version.'
    });
    setTimeout(() => {
      setSaveSuccess(null);
    }, 3000);
  };

  // Check if changes exist
  const hasChanges = () => {
    return JSON.stringify(pricingRules) !== JSON.stringify(originalRules);
  };

  // Filter rules
  const filteredRules = pricingRules.filter(rule => {
    const matchesSearch = rule.vehicleType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedVehicleType === 'all' || rule.vehicleType === selectedVehicleType;
    return matchesSearch && matchesType;
  });

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
          <p className="text-sm sm:text-base text-gray-600">Loading pricing rules...</p>
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
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Pricing Rules</h1>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Configure fare components per vehicle type</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <button
                onClick={() => setShowEstimate(!showEstimate)}
                className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors"
                title="Toggle fare estimator"
              >
                <FaCalculator className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
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
        {/* Fare Estimator Section */}
        {showEstimate && (
          <div className="bg-gradient-to-r from-orange-50 to-white rounded-lg shadow-sm p-4 sm:p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <FaCalculator className="w-5 h-5" style={{ color: 'var(--primary-orange)' }} />
              <span>Fare Estimator (New Ride)</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Type</label>
                <select
                  value={estimateDetails.vehicleType}
                  onChange={(e) => setEstimateDetails({ ...estimateDetails, vehicleType: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                  style={{ borderColor: 'var(--gray-300)', focusRingColor: 'var(--primary-orange)' }}
                >
                  {pricingRules.map(rule => (
                    <option key={rule.id} value={rule.vehicleType}>{rule.vehicleType}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Distance (km)</label>
                <input
                  type="number"
                  step="0.5"
                  value={estimateDetails.distance}
                  onChange={(e) => setEstimateDetails({ ...estimateDetails, distance: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                  style={{ borderColor: 'var(--gray-300)', focusRingColor: 'var(--primary-orange)' }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration (min)</label>
                <input
                  type="number"
                  step="1"
                  value={estimateDetails.duration}
                  onChange={(e) => setEstimateDetails({ ...estimateDetails, duration: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                  style={{ borderColor: 'var(--gray-300)', focusRingColor: 'var(--primary-orange)' }}
                />
              </div>
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">Estimated Fare</p>
                  <p className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--primary-orange)' }}>
                    {formatCurrency(estimatedFare)}
                  </p>
                </div>
              </div>
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
                {pricingRules.map(rule => (
                  <option key={rule.id} value={rule.vehicleType}>{rule.vehicleType}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Pricing Rules Cards/Table */}
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
                      <h3 className="text-lg font-semibold text-gray-900">{rule.vehicleType}</h3>
                      <p className="text-xs text-gray-500">
                        Last updated: {formatDateTime(rule.lastUpdated)} by {rule.updatedBy}
                      </p>
                    </div>
                  </div>
                  {editingId === rule.id ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-3 py-1.5 rounded-lg border hover:bg-gray-50 text-sm"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={saveChanges}
                        className="px-3 py-1.5 rounded-lg text-white text-sm flex items-center space-x-1"
                        style={{ backgroundColor: 'var(--primary-orange)' }}
                      >
                        <FaSave className="w-4 h-4" />
                        <span>Save All</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setEditingId(rule.id)}
                      className="px-3 py-1.5 rounded-lg border hover:bg-gray-50 text-sm flex items-center space-x-1"
                    >
                      <FaEdit className="w-4 h-4" />
                      <span>Edit Rules</span>
                    </button>
                  )}
                </div>

                {/* Pricing Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                      <FaDollarSign className="w-4 h-4" />
                      <span>Base Fare</span>
                    </label>
                    {editingId === rule.id ? (
                      <input
                        type="number"
                        step="0.5"
                        value={rule.baseFare}
                        onChange={(e) => handleInputChange(rule.id, 'baseFare', e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                        style={{ borderColor: 'var(--gray-300)', focusRingColor: 'var(--primary-orange)' }}
                      />
                    ) : (
                      <p className="text-xl font-semibold text-gray-900">{formatCurrency(rule.baseFare)}</p>
                    )}
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                      <FaRoad className="w-4 h-4" />
                      <span>Price Per KM</span>
                    </label>
                    {editingId === rule.id ? (
                      <input
                        type="number"
                        step="0.1"
                        value={rule.pricePerKM}
                        onChange={(e) => handleInputChange(rule.id, 'pricePerKM', e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                        style={{ borderColor: 'var(--gray-300)', focusRingColor: 'var(--primary-orange)' }}
                      />
                    ) : (
                      <p className="text-xl font-semibold text-gray-900">{formatCurrency(rule.pricePerKM)}/km</p>
                    )}
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                      <FaClock className="w-4 h-4" />
                      <span>Price Per Minute</span>
                    </label>
                    {editingId === rule.id ? (
                      <input
                        type="number"
                        step="0.05"
                        value={rule.pricePerMinute}
                        onChange={(e) => handleInputChange(rule.id, 'pricePerMinute', e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                        style={{ borderColor: 'var(--gray-300)', focusRingColor: 'var(--primary-orange)' }}
                      />
                    ) : (
                      <p className="text-xl font-semibold text-gray-900">{formatCurrency(rule.pricePerMinute)}/min</p>
                    )}
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                      <FaChartLine className="w-4 h-4" />
                      <span>Surge Multiplier</span>
                    </label>
                    {editingId === rule.id ? (
                      <div className="flex items-center space-x-2">
                        <input
                          type="range"
                          min="1.0"
                          max="3.0"
                          step="0.1"
                          value={rule.surgeMultiplier}
                          onChange={(e) => handleSurgeChange(rule.id, e.target.value)}
                          className="flex-1"
                          style={{ accentColor: 'var(--primary-orange)' }}
                        />
                        <input
                          type="number"
                          step="0.1"
                          value={rule.surgeMultiplier}
                          onChange={(e) => handleSurgeChange(rule.id, e.target.value)}
                          className="w-20 px-2 py-1 border rounded-lg text-center"
                          style={{ borderColor: 'var(--gray-300)' }}
                        />
                        <span className="text-sm">x</span>
                      </div>
                    ) : (
                      <p className="text-xl font-semibold text-gray-900">{rule.surgeMultiplier}x</p>
                    )}
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                      <FaMoneyBillWave className="w-4 h-4" />
                      <span>Minimum Fare</span>
                    </label>
                    {editingId === rule.id ? (
                      <input
                        type="number"
                        step="0.5"
                        value={rule.minFare}
                        onChange={(e) => handleInputChange(rule.id, 'minFare', e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                        style={{ borderColor: 'var(--gray-300)', focusRingColor: 'var(--primary-orange)' }}
                      />
                    ) : (
                      <p className="text-xl font-semibold text-gray-900">{formatCurrency(rule.minFare)}</p>
                    )}
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                      <FaTimes className="w-4 h-4" />
                      <span>Cancellation Fee</span>
                    </label>
                    {editingId === rule.id ? (
                      <input
                        type="number"
                        step="0.5"
                        value={rule.cancellationFee}
                        onChange={(e) => handleInputChange(rule.id, 'cancellationFee', e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                        style={{ borderColor: 'var(--gray-300)', focusRingColor: 'var(--primary-orange)' }}
                      />
                    ) : (
                      <p className="text-xl font-semibold text-gray-900">{formatCurrency(rule.cancellationFee)}</p>
                    )}
                  </div>
                </div>

                {/* Fare Breakdown Example */}
                {showEstimate && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-2">Example fare for 5km, 15min ride:</p>
                    <div className="flex flex-wrap gap-3 text-sm">
                      <span>Base: {formatCurrency(rule.baseFare)}</span>
                      <span>+ Distance: {formatCurrency(rule.pricePerKM * 5)}</span>
                      <span>+ Time: {formatCurrency(rule.pricePerMinute * 15)}</span>
                      <span>= Subtotal: {formatCurrency(rule.baseFare + rule.pricePerKM * 5 + rule.pricePerMinute * 15)}</span>
                      {rule.surgeMultiplier > 1 && (
                        <span className="text-orange-600">×{rule.surgeMultiplier} surge</span>
                      )}
                      <span className="font-semibold" style={{ color: 'var(--primary-orange)' }}>
                        Total: {formatCurrency(Math.max((rule.baseFare + rule.pricePerKM * 5 + rule.pricePerMinute * 15) * rule.surgeMultiplier, rule.minFare))}
                      </span>
                    </div>
                  </div>
                )}
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

        {/* Info Banner */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <FaInfoCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-blue-900">About Pricing Rules</p>
              <p className="text-xs text-blue-800 mt-1">
                • Changes apply immediately to new ride estimates<br />
                • Active rides continue with pricing at time of booking<br />
                • Surge multipliers affect total fare calculation<br />
                • Minimum fare ensures baseline pricing for short trips
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
                <h3 className="text-lg font-semibold text-gray-900">Price Change History</h3>
                <button
                  onClick={() => setShowHistory(false)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <FaTimes className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {pricingRules.map(rule => (
                    <div key={rule.id} className="border-b border-gray-100 pb-3">
                      <p className="font-semibold text-gray-900">{rule.vehicleType}</p>
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
              <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <FaDownload className="w-5 h-5 text-blue-500" />
                <span className="text-sm">Export Rules</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <FaShare className="w-5 h-5 text-green-500" />
                <span className="text-sm">Share Rules</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <FaPrint className="w-5 h-5 text-purple-500" />
                <span className="text-sm">Print Summary</span>
              </button>
              <button
                onClick={() => {
                  setShowEstimate(!showEstimate);
                  setSidebarOpen(false);
                }}
                className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FaCalculator className="w-5 h-5 text-orange-500" />
                <span className="text-sm">Toggle Estimator</span>
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

export default PricingRules;