import React, { useState, useEffect } from 'react';
import { 
  FaTachometerAlt, 
  FaClock, 
  FaHourglassHalf, 
  FaRedoAlt, 
  FaChartLine, 
  FaSave, 
  FaUndo, 
  FaCheckCircle,
  FaExclamationTriangle,
  FaCog,
  FaGlobe,
  FaUserClock,
  FaBell,
  FaRocket
} from 'react-icons/fa';

const SystemConfiguration = () => {
  // Configuration state
  const [config, setConfig] = useState({
    dispatchRadius: 5, // in kilometers
    driverAcceptanceTimeout: 10, // in seconds
    staleDriverThreshold: 30, // in seconds
    maxRetryAttempts: 3,
    surgeMultiplier: {
      min: 1.0,
      max: 3.0,
      current: 1.5,
      threshold: 80 // percentage of active drivers
    }
  });

  const [originalConfig, setOriginalConfig] = useState({});
  const [saveStatus, setSaveStatus] = useState({
    loading: false,
    success: false,
    error: null
  });
  const [activeTab, setActiveTab] = useState('general');
  const [validationErrors, setValidationErrors] = useState({});

  // Load saved configuration on mount
  useEffect(() => {
    loadConfiguration();
  }, []);

  // Load configuration from localStorage (simulating API call)
  const loadConfiguration = () => {
    const savedConfig = localStorage.getItem('systemConfig');
    if (savedConfig) {
      const parsedConfig = JSON.parse(savedConfig);
      setConfig(parsedConfig);
      setOriginalConfig(parsedConfig);
    } else {
      setOriginalConfig(config);
    }
  };

  // Validate configuration values
  const validateConfig = () => {
    const errors = {};
    
    if (config.dispatchRadius < 1 || config.dispatchRadius > 50) {
      errors.dispatchRadius = 'Dispatch radius must be between 1 and 50 kilometers';
    }
    
    if (config.driverAcceptanceTimeout < 5 || config.driverAcceptanceTimeout > 60) {
      errors.driverAcceptanceTimeout = 'Driver acceptance timeout must be between 5 and 60 seconds';
    }
    
    if (config.staleDriverThreshold < 10 || config.staleDriverThreshold > 120) {
      errors.staleDriverThreshold = 'Stale driver threshold must be between 10 and 120 seconds';
    }
    
    if (config.maxRetryAttempts < 1 || config.maxRetryAttempts > 10) {
      errors.maxRetryAttempts = 'Max retry attempts must be between 1 and 10';
    }
    
    if (config.surgeMultiplier.current < config.surgeMultiplier.min || 
        config.surgeMultiplier.current > config.surgeMultiplier.max) {
      errors.surgeMultiplier = `Surge multiplier must be between ${config.surgeMultiplier.min} and ${config.surgeMultiplier.max}`;
    }
    
    if (config.surgeMultiplier.threshold < 1 || config.surgeMultiplier.threshold > 100) {
      errors.surgeThreshold = 'Surge threshold must be between 1 and 100 percent';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    setConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle surge multiplier changes
  const handleSurgeChange = (field, value) => {
    setConfig(prev => ({
      ...prev,
      surgeMultiplier: {
        ...prev.surgeMultiplier,
        [field]: parseFloat(value)
      }
    }));
  };

  // Save configuration
  const saveConfiguration = async () => {
    if (!validateConfig()) {
      return;
    }
    
    setSaveStatus({ loading: true, success: false, error: null });
    
    // Simulate API call
    setTimeout(() => {
      try {
        localStorage.setItem('systemConfig', JSON.stringify(config));
        setOriginalConfig(config);
        setSaveStatus({ loading: false, success: true, error: null });
        
        // Auto-hide success message after 3 seconds
        setTimeout(() => {
          setSaveStatus(prev => ({ ...prev, success: false }));
        }, 3000);
      } catch (error) {
        setSaveStatus({ loading: false, success: false, error: 'Failed to save configuration' });
      }
    }, 1000);
  };

  // Reset to last saved configuration
  const resetConfiguration = () => {
    setConfig(originalConfig);
    setValidationErrors({});
    setSaveStatus({ loading: false, success: false, error: null });
  };

  // Reset to default configuration
  const resetToDefault = () => {
    const defaultConfig = {
      dispatchRadius: 5,
      driverAcceptanceTimeout: 10,
      staleDriverThreshold: 30,
      maxRetryAttempts: 3,
      surgeMultiplier: {
        min: 1.0,
        max: 3.0,
        current: 1.5,
        threshold: 80
      }
    };
    setConfig(defaultConfig);
    setValidationErrors({});
  };

  // Check if changes are made
  const hasChanges = () => {
    return JSON.stringify(config) !== JSON.stringify(originalConfig);
  };

  // Configuration cards data
  const configCards = [
    {
      id: 'dispatchRadius',
      title: 'Dispatch Radius',
      description: 'Maximum distance to search for available drivers',
      value: config.dispatchRadius,
      unit: 'km',
      icon: <FaGlobe className="w-6 h-6" />,
      range: '1-50 km',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      id: 'driverAcceptanceTimeout',
      title: 'Driver Acceptance Timeout',
      description: 'Time allowed for driver to accept a ride',
      value: config.driverAcceptanceTimeout,
      unit: 'seconds',
      icon: <FaClock className="w-6 h-6" />,
      range: '5-60 seconds',
      gradient: 'from-green-500 to-green-600'
    },
    {
      id: 'staleDriverThreshold',
      title: 'Stale Driver Threshold',
      description: 'Time before marking inactive driver as stale',
      value: config.staleDriverThreshold,
      unit: 'seconds',
      icon: <FaHourglassHalf className="w-6 h-6" />,
      range: '10-120 seconds',
      gradient: 'from-yellow-500 to-yellow-600'
    },
    {
      id: 'maxRetryAttempts',
      title: 'Max Retry Attempts',
      description: 'Maximum attempts for failed operations',
      value: config.maxRetryAttempts,
      unit: 'attempts',
      icon: <FaRedoAlt className="w-6 h-6" />,
      range: '1-10 attempts',
      gradient: 'from-purple-500 to-purple-600'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <FaCog className="w-8 h-8" style={{ color: 'var(--primary-orange)' }} />
          <h1 className="text-3xl font-bold" style={{ color: 'var(--gray-900)' }}>
            System Configuration
          </h1>
        </div>
        <p className="text-gray-600">
          Configure platform-wide settings for dispatch optimization, driver management, and surge pricing
        </p>
      </div>

      {/* Save Status Messages */}
      {saveStatus.success && (
        <div className="mb-6 bg-green-50 border-l-4 border-green-400 p-4 rounded-lg flex items-center space-x-3 animate-slide-in">
          <FaCheckCircle className="text-green-400 w-5 h-5" />
          <p className="text-green-800 font-medium">Configuration saved successfully!</p>
        </div>
      )}
      
      {saveStatus.error && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4 rounded-lg flex items-center space-x-3">
          <FaExclamationTriangle className="text-red-400 w-5 h-5" />
          <p className="text-red-800 font-medium">{saveStatus.error}</p>
        </div>
      )}

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('general')}
            className={`px-4 py-2 font-medium transition-colors relative ${
              activeTab === 'general'
                ? 'text-orange-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            General Settings
            {activeTab === 'general' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab('surge')}
            className={`px-4 py-2 font-medium transition-colors relative ${
              activeTab === 'surge'
                ? 'text-orange-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Surge Pricing
            {activeTab === 'surge' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"></div>
            )}
          </button>
        </div>
      </div>

      {/* General Settings Tab */}
      {activeTab === 'general' && (
        <div className="space-y-6">
          {/* Configuration Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {configCards.map((card) => (
              <div key={card.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className={`bg-gradient-to-r ${card.gradient} p-4`}>
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center space-x-3">
                      {card.icon}
                      <h3 className="font-semibold text-lg">{card.title}</h3>
                    </div>
                    <span className="text-sm opacity-90">{card.range}</span>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-600 text-sm mb-4">{card.description}</p>
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      min={card.id === 'dispatchRadius' ? 1 : card.id === 'driverAcceptanceTimeout' ? 5 : card.id === 'staleDriverThreshold' ? 10 : 1}
                      max={card.id === 'dispatchRadius' ? 50 : card.id === 'driverAcceptanceTimeout' ? 60 : card.id === 'staleDriverThreshold' ? 120 : 10}
                      value={card.value}
                      onChange={(e) => handleInputChange(card.id, parseFloat(e.target.value))}
                      className="flex-1 h-2 rounded-lg appearance-none cursor-pointer"
                      style={{ accentColor: 'var(--primary-orange)' }}
                    />
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        value={card.value}
                        onChange={(e) => handleInputChange(card.id, parseFloat(e.target.value))}
                        className="w-20 px-2 py-1 border rounded-md text-center focus:outline-none focus:ring-2"
                        style={{
                          borderColor: 'var(--gray-300)',
                          focusRingColor: 'var(--primary-orange)'
                        }}
                      />
                      <span className="text-gray-500 text-sm">{card.unit}</span>
                    </div>
                  </div>
                  {validationErrors[card.id] && (
                    <p className="mt-2 text-red-500 text-xs">{validationErrors[card.id]}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Additional Settings */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-3 mb-4">
              <FaUserClock className="w-6 h-6" style={{ color: 'var(--primary-orange)' }} />
              <h3 className="text-lg font-semibold text-gray-800">Driver Management</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stale Driver Detection Time
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="range"
                    min="10"
                    max="120"
                    value={config.staleDriverThreshold}
                    onChange={(e) => handleInputChange('staleDriverThreshold', parseFloat(e.target.value))}
                    className="flex-1"
                    style={{ accentColor: 'var(--primary-orange)' }}
                  />
                  <span className="text-sm text-gray-600 min-w-[60px]">
                    {config.staleDriverThreshold}s
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Drivers inactive for this duration will be marked as stale
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Retry Attempts for Failed Operations
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={config.maxRetryAttempts}
                    onChange={(e) => handleInputChange('maxRetryAttempts', parseFloat(e.target.value))}
                    className="flex-1"
                    style={{ accentColor: 'var(--primary-orange)' }}
                  />
                  <span className="text-sm text-gray-600 min-w-[40px]">
                    {config.maxRetryAttempts}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Number of retry attempts for failed API calls
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Surge Pricing Tab */}
      {activeTab === 'surge' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-3 mb-6">
              <FaChartLine className="w-6 h-6" style={{ color: 'var(--primary-orange)' }} />
              <h3 className="text-lg font-semibold text-gray-800">Surge Multiplier Configuration</h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Surge Multiplier
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    min={config.surgeMultiplier.min}
                    max={config.surgeMultiplier.max}
                    step="0.1"
                    value={config.surgeMultiplier.current}
                    onChange={(e) => handleSurgeChange('current', e.target.value)}
                    className="flex-1"
                    style={{ accentColor: 'var(--primary-orange)' }}
                  />
                  <div className="text-2xl font-bold" style={{ color: 'var(--primary-orange)' }}>
                    {config.surgeMultiplier.current}x
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Current pricing multiplier applied during high demand
                </p>
                {validationErrors.surgeMultiplier && (
                  <p className="mt-2 text-red-500 text-xs">{validationErrors.surgeMultiplier}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Surge Multiplier
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={config.surgeMultiplier.min}
                    onChange={(e) => handleSurgeChange('min', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                    style={{
                      borderColor: 'var(--gray-300)',
                      focusRingColor: 'var(--primary-orange)'
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maximum Surge Multiplier
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={config.surgeMultiplier.max}
                    onChange={(e) => handleSurgeChange('max', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                    style={{
                      borderColor: 'var(--gray-300)',
                      focusRingColor: 'var(--primary-orange)'
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Surge Activation Threshold
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={config.surgeMultiplier.threshold}
                    onChange={(e) => handleSurgeChange('threshold', parseFloat(e.target.value))}
                    className="flex-1"
                    style={{ accentColor: 'var(--primary-orange)' }}
                  />
                  <div className="text-lg font-semibold text-gray-700">
                    {config.surgeMultiplier.threshold}%
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Percentage of active drivers threshold to activate surge pricing
                </p>
                {validationErrors.surgeThreshold && (
                  <p className="mt-2 text-red-500 text-xs">{validationErrors.surgeThreshold}</p>
                )}
              </div>
            </div>

            {/* Surge Info Card */}
            <div className="mt-8 bg-orange-50 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <FaRocket className="w-5 h-5 text-orange-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">How Surge Pricing Works</h4>
                  <p className="text-sm text-gray-600">
                    When available drivers drop below {config.surgeMultiplier.threshold}%, 
                    the surge multiplier automatically increases up to {config.surgeMultiplier.max}x 
                    based on demand. Current multiplier: {config.surgeMultiplier.current}x
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row justify-end gap-4">
        <button
          onClick={resetToDefault}
          className="px-6 py-2 border rounded-lg transition-colors hover:bg-gray-50"
          style={{ borderColor: 'var(--gray-300)', color: 'var(--gray-700)' }}
        >
          Reset to Default
        </button>
        <button
          onClick={resetConfiguration}
          disabled={!hasChanges()}
          className={`px-6 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
            hasChanges()
              ? 'hover:bg-gray-100'
              : 'opacity-50 cursor-not-allowed'
          }`}
          style={{ border: `1px solid var(--gray-300)`, color: 'var(--gray-700)' }}
        >
          <FaUndo className="w-4 h-4" />
          <span>Reset Changes</span>
        </button>
        <button
          onClick={saveConfiguration}
          disabled={saveStatus.loading || !hasChanges()}
          className={`px-6 py-2 rounded-lg transition-colors flex items-center space-x-2 text-white ${
            hasChanges() && !saveStatus.loading
              ? 'hover:opacity-90'
              : 'opacity-50 cursor-not-allowed'
          }`}
          style={{ backgroundColor: 'var(--primary-orange)' }}
        >
          {saveStatus.loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Saving...</span>
            </>
          ) : (
            <>
              <FaSave className="w-4 h-4" />
              <span>Save Configuration</span>
            </>
          )}
        </button>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default SystemConfiguration;