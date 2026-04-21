import React, { useState, useEffect } from 'react';
import {
  FaCar,
  FaMotorcycle,
  FaTruck,
  FaPlus,
  FaEdit,
  FaTrash,
  FaSave,
  FaTimes,
  FaCheckCircle,
  FaExclamationTriangle,
  FaSpinner,
  FaArrowLeft,
  FaExpand,
  FaCompress,
  FaBars,
  FaSearch,
  FaFilter,
  FaDollarSign,
  FaRoad,
  FaClock,
  FaChartLine,
  FaInfoCircle,
  FaToggleOn,
  FaToggleOff,
  FaCopy,
  FaDownload,
  FaShare,
  FaPrint,
  FaEye,
  FaEyeSlash,
  FaHistory,
  FaUserFriends,
  FaSnowflake,
  FaWifi,
  FaBatteryFull,
  FaChild,
  FaPaw,
  FaHeadphones,
  FaCoffee,
  FaBicycle,
  FaBus,
  FaTaxi,
  FaShuttleVan,
  FaTruckPickup,
  FaMotorcycle as FaBike,
  FaStar
} from 'react-icons/fa';

const VehicleClassification = () => {
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [originalVehicleTypes, setOriginalVehicleTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isMobileView, setIsMobileView] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [fullscreenMode, setFullscreenMode] = useState(false);
  const [newVehicle, setNewVehicle] = useState({
    name: '',
    icon: 'Car',
    category: 'standard',
    capacity: 4,
    luggageCapacity: 2,
    features: [],
    isActive: true,
    pricingRules: {
      baseFare: 2.50,
      pricePerKM: 1.50,
      pricePerMinute: 0.35,
      minFare: 5.00,
      cancellationFee: 3.00,
      surgeMultiplier: 1.0
    }
  });
  const [editingVehicle, setEditingVehicle] = useState(null);

  // Available icons
  const iconOptions = [
    { name: 'Car', icon: FaCar },
    { name: 'Motorcycle', icon: FaBike },
    { name: 'Van', icon: FaShuttleVan },
    { name: 'SUV', icon: FaTruckPickup },
    { name: 'Taxi', icon: FaTaxi },
    { name: 'Bus', icon: FaBus },
    { name: 'Bicycle', icon: FaBicycle }
  ];

  // Available features
  const featureOptions = [
    { name: 'Air Conditioning', icon: FaSnowflake },
    { name: 'WiFi', icon: FaWifi },
    { name: 'USB Charging', icon: FaBatteryFull },
    { name: 'Child Seat', icon: FaChild },
    { name: 'Pet Friendly', icon: FaPaw },
    { name: 'Premium Sound', icon: FaHeadphones },
    { name: 'Free Water', icon: FaCoffee },
    { name: 'Extra Luggage', icon: FaUserFriends }
  ];

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

  // Fetch vehicle types
  useEffect(() => {
    fetchVehicleTypes();
  }, []);

  const fetchVehicleTypes = async () => {
    setLoading(true);
    setTimeout(() => {
      const mockVehicleTypes = [
        {
          id: 'VEH001',
          name: 'Car',
          icon: 'Car',
          category: 'standard',
          capacity: 4,
          luggageCapacity: 2,
          features: ['Air Conditioning', 'USB Charging'],
          isActive: true,
          createdAt: '2024-01-01T10:00:00Z',
          updatedAt: '2024-03-15T10:30:00Z',
          totalRides: 12500,
          avgRating: 4.7,
          pricingRules: {
            baseFare: 2.50,
            pricePerKM: 1.50,
            pricePerMinute: 0.35,
            minFare: 5.00,
            cancellationFee: 3.00,
            surgeMultiplier: 1.0
          }
        },
        {
          id: 'VEH002',
          name: 'Bike',
          icon: 'Motorcycle',
          category: 'economy',
          capacity: 1,
          luggageCapacity: 0,
          features: ['Helmet Provided'],
          isActive: true,
          createdAt: '2024-01-01T10:00:00Z',
          updatedAt: '2024-03-15T10:30:00Z',
          totalRides: 8500,
          avgRating: 4.5,
          pricingRules: {
            baseFare: 1.50,
            pricePerKM: 0.80,
            pricePerMinute: 0.20,
            minFare: 3.00,
            cancellationFee: 2.00,
            surgeMultiplier: 1.0
          }
        },
        {
          id: 'VEH003',
          name: 'Van',
          icon: 'Van',
          category: 'premium',
          capacity: 6,
          luggageCapacity: 4,
          features: ['Air Conditioning', 'USB Charging', 'Extra Space'],
          isActive: true,
          createdAt: '2024-01-01T10:00:00Z',
          updatedAt: '2024-03-15T10:30:00Z',
          totalRides: 3200,
          avgRating: 4.8,
          pricingRules: {
            baseFare: 5.00,
            pricePerKM: 2.20,
            pricePerMinute: 0.50,
            minFare: 10.00,
            cancellationFee: 6.00,
            surgeMultiplier: 1.0
          }
        },
        {
          id: 'VEH004',
          name: 'SUV',
          icon: 'SUV',
          category: 'premium',
          capacity: 5,
          luggageCapacity: 3,
          features: ['Air Conditioning', 'USB Charging', 'Premium Sound'],
          isActive: true,
          createdAt: '2024-02-01T10:00:00Z',
          updatedAt: '2024-03-15T10:30:00Z',
          totalRides: 2100,
          avgRating: 4.9,
          pricingRules: {
            baseFare: 4.00,
            pricePerKM: 1.90,
            pricePerMinute: 0.45,
            minFare: 8.00,
            cancellationFee: 5.00,
            surgeMultiplier: 1.0
          }
        }
      ];
      
      setVehicleTypes(mockVehicleTypes);
      setOriginalVehicleTypes(JSON.parse(JSON.stringify(mockVehicleTypes)));
      setLoading(false);
    }, 1000);
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
      year: 'numeric'
    });
  };

  // Get icon component
  const getIconComponent = (iconName) => {
    const icon = iconOptions.find(opt => opt.name === iconName);
    return icon ? icon.icon : FaCar;
  };

  // Handle add new vehicle
  const handleAddVehicle = () => {
    if (!newVehicle.name.trim()) {
      alert('Please enter vehicle name');
      return;
    }
    
    const newId = `VEH${String(vehicleTypes.length + 1).padStart(3, '0')}`;
    const vehicleToAdd = {
      id: newId,
      ...newVehicle,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      totalRides: 0,
      avgRating: 0
    };
    
    setVehicleTypes([...vehicleTypes, vehicleToAdd]);
    setShowAddModal(false);
    setNewVehicle({
      name: '',
      icon: 'Car',
      category: 'standard',
      capacity: 4,
      luggageCapacity: 2,
      features: [],
      isActive: true,
      pricingRules: {
        baseFare: 2.50,
        pricePerKM: 1.50,
        pricePerMinute: 0.35,
        minFare: 5.00,
        cancellationFee: 3.00,
        surgeMultiplier: 1.0
      }
    });
    
    setSaveSuccess({
      success: true,
      message: `${vehicleToAdd.name} added successfully!`
    });
    setTimeout(() => setSaveSuccess(null), 3000);
  };

  // Handle edit vehicle
  const handleEditVehicle = (vehicle) => {
    setEditingVehicle({ ...vehicle });
    setEditingId(vehicle.id);
  };

  // Handle save edit
  const handleSaveEdit = () => {
    if (!editingVehicle.name.trim()) {
      alert('Please enter vehicle name');
      return;
    }
    
    setVehicleTypes(prev => prev.map(vehicle =>
      vehicle.id === editingId
        ? { ...editingVehicle, updatedAt: new Date().toISOString() }
        : vehicle
    ));
    setEditingId(null);
    setEditingVehicle(null);
    
    setSaveSuccess({
      success: true,
      message: `${editingVehicle.name} updated successfully!`
    });
    setTimeout(() => setSaveSuccess(null), 3000);
  };

  // Handle delete vehicle
  const handleDeleteVehicle = () => {
    const vehicleToDelete = vehicleTypes.find(v => v.id === showDeleteModal);
    setVehicleTypes(prev => prev.filter(vehicle => vehicle.id !== showDeleteModal));
    setShowDeleteModal(null);
    
    setSaveSuccess({
      success: true,
      message: `${vehicleToDelete.name} removed successfully!`
    });
    setTimeout(() => setSaveSuccess(null), 3000);
  };

  // Handle toggle active status
  const toggleActiveStatus = (id) => {
    setVehicleTypes(prev => prev.map(vehicle =>
      vehicle.id === id
        ? { ...vehicle, isActive: !vehicle.isActive }
        : vehicle
    ));
  };

  // Handle pricing rule change in edit mode
  const handlePricingChange = (field, value) => {
    setEditingVehicle(prev => ({
      ...prev,
      pricingRules: {
        ...prev.pricingRules,
        [field]: parseFloat(value) || 0
      }
    }));
  };

  // Handle feature toggle in add/edit
  const toggleFeature = (featureName) => {
    if (editingId) {
      setEditingVehicle(prev => ({
        ...prev,
        features: prev.features.includes(featureName)
          ? prev.features.filter(f => f !== featureName)
          : [...prev.features, featureName]
      }));
    } else {
      setNewVehicle(prev => ({
        ...prev,
        features: prev.features.includes(featureName)
          ? prev.features.filter(f => f !== featureName)
          : [...prev.features, featureName]
      }));
    }
  };

  // Save all changes
  const saveAllChanges = async () => {
    setSaving(true);
    setTimeout(() => {
      setOriginalVehicleTypes(JSON.parse(JSON.stringify(vehicleTypes)));
      setSaving(false);
      setSaveSuccess({
        success: true,
        message: 'All vehicle configurations saved successfully!'
      });
      setTimeout(() => setSaveSuccess(null), 3000);
    }, 1500);
  };

  // Check if changes exist
  const hasChanges = () => {
    return JSON.stringify(vehicleTypes) !== JSON.stringify(originalVehicleTypes);
  };

  // Filter vehicle types
  const filteredVehicles = vehicleTypes.filter(vehicle => {
    const matchesSearch = vehicle.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || 
      (filterStatus === 'active' && vehicle.isActive) ||
      (filterStatus === 'inactive' && !vehicle.isActive);
    return matchesSearch && matchesStatus;
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
          <p className="text-sm sm:text-base text-gray-600">Loading vehicle types...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-50 ${fullscreenMode ? 'fixed inset-0 z-50 overflow-auto' : ''}`}>
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-20 my-5 lg:my-0">
        <div className="p-2 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div>
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Vehicle Classification</h1>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Manage vehicle types and their pricing rules</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <button
                onClick={() => setShowAddModal(true)}
                className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-white flex items-center space-x-2 text-sm"
                style={{ backgroundColor: 'var(--primary-orange)' }}
              >
                <FaPlus className="w-4 h-4" />
                <span>Add Vehicle</span>
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
        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
            <div className="flex items-center justify-between mb-2">
              <FaCar className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
              <span className="text-xs text-gray-500">Total</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-gray-900">{vehicleTypes.length}</div>
            <div className="text-xs text-gray-600">Vehicle Types</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
            <div className="flex items-center justify-between mb-2">
              <FaCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
              <span className="text-xs text-gray-500">Active</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-green-600">
              {vehicleTypes.filter(v => v.isActive).length}
            </div>
            <div className="text-xs text-gray-600">Active Types</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
            <div className="flex items-center justify-between mb-2">
              <FaHistory className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
              <span className="text-xs text-gray-500">Total Rides</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-gray-900">
              {vehicleTypes.reduce((sum, v) => sum + v.totalRides, 0).toLocaleString()}
            </div>
            <div className="text-xs text-gray-600">All Time</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
            <div className="flex items-center justify-between mb-2">
              <FaStar className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
              <span className="text-xs text-gray-500">Avg Rating</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-gray-900">
              {(vehicleTypes.reduce((sum, v) => sum + v.avgRating, 0) / vehicleTypes.length).toFixed(1)}
            </div>
            <div className="text-xs text-gray-600">Stars</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by vehicle name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm"
                style={{ borderColor: 'var(--gray-300)', focusRingColor: 'var(--primary-orange)' }}
              />
            </div>
            <div className="relative">
              <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-9 pr-8 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm appearance-none bg-white"
                style={{ borderColor: 'var(--gray-300)', focusRingColor: 'var(--primary-orange)' }}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Vehicle Types Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredVehicles.map((vehicle) => {
            const VehicleIcon = getIconComponent(vehicle.icon);
            const isEditing = editingId === vehicle.id;
            
            return (
              <div key={vehicle.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 sm:p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                        <VehicleIcon className="w-6 h-6" style={{ color: 'var(--primary-orange)' }} />
                      </div>
                      <div>
                        {isEditing ? (
                          <input
                            type="text"
                            value={editingVehicle.name}
                            onChange={(e) => setEditingVehicle({ ...editingVehicle, name: e.target.value })}
                            className="text-lg font-semibold border rounded px-2 py-1"
                            style={{ borderColor: 'var(--gray-300)' }}
                          />
                        ) : (
                          <h3 className="text-lg font-semibold text-gray-900">{vehicle.name}</h3>
                        )}
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`px-2 py-0.5 text-xs rounded-full ${
                            vehicle.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                          }`}>
                            {vehicle.isActive ? 'Active' : 'Inactive'}
                          </span>
                          <span className="text-xs text-gray-500">
                            {vehicle.totalRides.toLocaleString()} rides
                          </span>
                          <div className="flex items-center space-x-1">
                            <FaStar className="w-3 h-3 text-yellow-400" />
                            <span className="text-xs text-gray-600">{vehicle.avgRating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleActiveStatus(vehicle.id)}
                        className="p-2 rounded-lg hover:bg-gray-100"
                        title={vehicle.isActive ? 'Deactivate' : 'Activate'}
                      >
                        {vehicle.isActive ? <FaToggleOn className="w-5 h-5 text-green-500" /> : <FaToggleOff className="w-5 h-5 text-gray-400" />}
                      </button>
                      {!isEditing ? (
                        <button
                          onClick={() => handleEditVehicle(vehicle)}
                          className="p-2 rounded-lg hover:bg-gray-100"
                        >
                          <FaEdit className="w-4 h-4 text-gray-600" />
                        </button>
                      ) : (
                        <button
                          onClick={handleSaveEdit}
                          className="p-2 rounded-lg hover:bg-green-50"
                        >
                          <FaSave className="w-4 h-4 text-green-600" />
                        </button>
                      )}
                      <button
                        onClick={() => setShowDeleteModal(vehicle.id)}
                        className="p-2 rounded-lg hover:bg-red-50"
                      >
                        <FaTrash className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </div>

                  {/* Vehicle Specs */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-gray-50 rounded-lg p-2">
                      <p className="text-xs text-gray-500">Capacity</p>
                      {isEditing ? (
                        <input
                          type="number"
                          value={editingVehicle.capacity}
                          onChange={(e) => setEditingVehicle({ ...editingVehicle, capacity: parseInt(e.target.value) })}
                          className="text-sm font-semibold border rounded px-2 py-1 w-full mt-1"
                        />
                      ) : (
                        <p className="text-sm font-semibold text-gray-900">{vehicle.capacity} persons</p>
                      )}
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2">
                      <p className="text-xs text-gray-500">Luggage Capacity</p>
                      {isEditing ? (
                        <input
                          type="number"
                          value={editingVehicle.luggageCapacity}
                          onChange={(e) => setEditingVehicle({ ...editingVehicle, luggageCapacity: parseInt(e.target.value) })}
                          className="text-sm font-semibold border rounded px-2 py-1 w-full mt-1"
                        />
                      ) : (
                        <p className="text-sm font-semibold text-gray-900">{vehicle.luggageCapacity} bags</p>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Features</p>
                    <div className="flex flex-wrap gap-1">
                      {isEditing ? (
                        <div className="flex flex-wrap gap-2">
                          {featureOptions.map(feature => {
                            const FeatureIcon = feature.icon;
                            const isSelected = editingVehicle.features.includes(feature.name);
                            return (
                              <button
                                key={feature.name}
                                onClick={() => toggleFeature(feature.name)}
                                className={`px-2 py-1 rounded-lg text-xs flex items-center space-x-1 ${
                                  isSelected
                                    ? 'bg-orange-100 text-orange-700'
                                    : 'bg-gray-100 text-gray-600'
                                }`}
                              >
                                <FeatureIcon className="w-3 h-3" />
                                <span>{feature.name}</span>
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        vehicle.features.map((feature, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                            {feature}
                          </span>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Pricing Rules */}
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-sm font-semibold text-gray-900 mb-3">Pricing Rules</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      <div>
                        <p className="text-xs text-gray-500">Base Fare</p>
                        {isEditing ? (
                          <input
                            type="number"
                            step="0.5"
                            value={editingVehicle.pricingRules.baseFare}
                            onChange={(e) => handlePricingChange('baseFare', e.target.value)}
                            className="text-sm font-semibold border rounded px-2 py-1 w-full"
                          />
                        ) : (
                          <p className="text-sm font-semibold text-gray-900">{formatCurrency(vehicle.pricingRules.baseFare)}</p>
                        )}
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Per KM</p>
                        {isEditing ? (
                          <input
                            type="number"
                            step="0.1"
                            value={editingVehicle.pricingRules.pricePerKM}
                            onChange={(e) => handlePricingChange('pricePerKM', e.target.value)}
                            className="text-sm font-semibold border rounded px-2 py-1 w-full"
                          />
                        ) : (
                          <p className="text-sm font-semibold text-gray-900">{formatCurrency(vehicle.pricingRules.pricePerKM)}</p>
                        )}
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Per Minute</p>
                        {isEditing ? (
                          <input
                            type="number"
                            step="0.05"
                            value={editingVehicle.pricingRules.pricePerMinute}
                            onChange={(e) => handlePricingChange('pricePerMinute', e.target.value)}
                            className="text-sm font-semibold border rounded px-2 py-1 w-full"
                          />
                        ) : (
                          <p className="text-sm font-semibold text-gray-900">{formatCurrency(vehicle.pricingRules.pricePerMinute)}</p>
                        )}
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Min Fare</p>
                        {isEditing ? (
                          <input
                            type="number"
                            step="0.5"
                            value={editingVehicle.pricingRules.minFare}
                            onChange={(e) => handlePricingChange('minFare', e.target.value)}
                            className="text-sm font-semibold border rounded px-2 py-1 w-full"
                          />
                        ) : (
                          <p className="text-sm font-semibold text-gray-900">{formatCurrency(vehicle.pricingRules.minFare)}</p>
                        )}
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Cancellation Fee</p>
                        {isEditing ? (
                          <input
                            type="number"
                            step="0.5"
                            value={editingVehicle.pricingRules.cancellationFee}
                            onChange={(e) => handlePricingChange('cancellationFee', e.target.value)}
                            className="text-sm font-semibold border rounded px-2 py-1 w-full"
                          />
                        ) : (
                          <p className="text-sm font-semibold text-gray-900">{formatCurrency(vehicle.pricingRules.cancellationFee)}</p>
                        )}
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Surge</p>
                        {isEditing ? (
                          <input
                            type="number"
                            step="0.1"
                            value={editingVehicle.pricingRules.surgeMultiplier}
                            onChange={(e) => handlePricingChange('surgeMultiplier', e.target.value)}
                            className="text-sm font-semibold border rounded px-2 py-1 w-full"
                          />
                        ) : (
                          <p className="text-sm font-semibold text-gray-900">{vehicle.pricingRules.surgeMultiplier}x</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Last Updated */}
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-400">
                      Last updated: {formatDateTime(vehicle.updatedAt)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Save All Changes Button */}
        {hasChanges() && (
          <div className="fixed bottom-6 right-6 z-30">
            <button
              onClick={saveAllChanges}
              disabled={saving}
              className="px-6 py-3 rounded-lg text-white shadow-lg hover:shadow-xl transition-shadow flex items-center space-x-2"
              style={{ backgroundColor: 'var(--primary-orange)' }}
            >
              {saving ? (
                <>
                  <FaSpinner className="w-5 h-5 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <FaSave className="w-5 h-5" />
                  <span>Save All Changes</span>
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
              <p className="text-sm font-semibold text-blue-900">About Vehicle Classification</p>
              <p className="text-xs text-blue-800 mt-1">
                • Each vehicle type has its own pricing rules row<br />
                • Changes to pricing affect new ride estimates immediately<br />
                • Deactivating a vehicle type hides it from user selection<br />
                • Vehicle features help users choose the right ride
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Vehicle Modal */}
      {showAddModal && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-40 modal-enter"></div>
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50 modal-content-enter">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto modal-scroll border border-gray-200">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                    <FaPlus className="w-5 h-5 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Add New Vehicle Type</h3>
                </div>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <FaTimes className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="p-6 space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-3">Vehicle Name</label>
                    <input
                      type="text"
                      value={newVehicle.name}
                      onChange={(e) => setNewVehicle({ ...newVehicle, name: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:border-orange-500 transition-all duration-200"
                      placeholder="e.g., Electric Scooter"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-3">Icon</label>
                    <select
                      value={newVehicle.icon}
                      onChange={(e) => setNewVehicle({ ...newVehicle, icon: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:border-orange-500 transition-all duration-200"
                    >
                      {iconOptions.map(icon => (
                        <option key={icon.name} value={icon.name}>{icon.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Capacity */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-3">Passenger Capacity</label>
                    <input
                      type="number"
                      value={newVehicle.capacity}
                      onChange={(e) => setNewVehicle({ ...newVehicle, capacity: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:border-orange-500 transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-3">Luggage Capacity</label>
                    <input
                      type="number"
                      value={newVehicle.luggageCapacity}
                      onChange={(e) => setNewVehicle({ ...newVehicle, luggageCapacity: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:border-orange-500 transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Features */}
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-3">Features</label>
                  <div className="flex flex-wrap gap-3">
                    {featureOptions.map(feature => {
                      const FeatureIcon = feature.icon;
                      const isSelected = newVehicle.features.includes(feature.name);
                      return (
                        <button
                          key={feature.name}
                          onClick={() => toggleFeature(feature.name)}
                          className={`px-4 py-3 rounded-xl text-sm flex items-center space-x-2 font-semibold transition-all duration-200 transform hover:scale-105 ${
                            isSelected
                              ? 'bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800 border-2 border-orange-300 shadow-md'
                              : 'bg-gray-100 text-gray-600 border-2 border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <FeatureIcon className="w-4 h-4" />
                          <span>{feature.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Pricing Rules */}
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-4">Pricing Rules</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-2 block">Base Fare</label>
                      <input
                        type="number"
                        step="0.5"
                        value={newVehicle.pricingRules.baseFare}
                        onChange={(e) => setNewVehicle({
                          ...newVehicle,
                          pricingRules: { ...newVehicle.pricingRules, baseFare: parseFloat(e.target.value) }
                        })}
                        className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-orange-500 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-2 block">Per KM</label>
                      <input
                        type="number"
                        step="0.1"
                        value={newVehicle.pricingRules.pricePerKM}
                        onChange={(e) => setNewVehicle({
                          ...newVehicle,
                          pricingRules: { ...newVehicle.pricingRules, pricePerKM: parseFloat(e.target.value) }
                        })}
                        className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-orange-500 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-2 block">Per Minute</label>
                      <input
                        type="number"
                        step="0.05"
                        value={newVehicle.pricingRules.pricePerMinute}
                        onChange={(e) => setNewVehicle({
                          ...newVehicle,
                          pricingRules: { ...newVehicle.pricingRules, pricePerMinute: parseFloat(e.target.value) }
                        })}
                        className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-orange-500 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-2 block">Min Fare</label>
                      <input
                        type="number"
                        step="0.5"
                        value={newVehicle.pricingRules.minFare}
                        onChange={(e) => setNewVehicle({
                          ...newVehicle,
                          pricingRules: { ...newVehicle.pricingRules, minFare: parseFloat(e.target.value) }
                        })}
                        className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-orange-500 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-2 block">Cancellation Fee</label>
                      <input
                        type="number"
                        step="0.5"
                        value={newVehicle.pricingRules.cancellationFee}
                        onChange={(e) => setNewVehicle({
                          ...newVehicle,
                          pricingRules: { ...newVehicle.pricingRules, cancellationFee: parseFloat(e.target.value) }
                        })}
                        className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-orange-500 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-2 block">Surge Multiplier</label>
                      <input
                        type="number"
                        step="0.1"
                        value={newVehicle.pricingRules.surgeMultiplier}
                        onChange={(e) => setNewVehicle({
                          ...newVehicle,
                          pricingRules: { ...newVehicle.pricingRules, surgeMultiplier: parseFloat(e.target.value) }
                        })}
                        className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-orange-500 transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4 pt-6">
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200 font-semibold transform hover:scale-105"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddVehicle}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Add Vehicle
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-40 modal-enter" onClick={() => setShowDeleteModal(null)}></div>
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 modal-content-enter">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-gray-200">
              <div className="text-center p-8">
                <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center mb-6 shadow-lg">
                  <FaExclamationTriangle className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Confirm Deletion</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Are you sure you want to remove this vehicle type? This action cannot be undone.
                </p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setShowDeleteModal(null)}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200 font-semibold transform hover:scale-105"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteVehicle}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Yes, Delete
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
              <button
                onClick={() => {
                  setShowAddModal(true);
                  setSidebarOpen(false);
                }}
                className="w-full flex items-center space-x-3 p-3 rounded-lg bg-orange-50 text-orange-700"
              >
                <FaPlus className="w-5 h-5" />
                <span className="text-sm">Add New Vehicle</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <FaDownload className="w-5 h-5 text-blue-500" />
                <span className="text-sm">Export Data</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <FaShare className="w-5 h-5 text-green-500" />
                <span className="text-sm">Share Report</span>
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

export default VehicleClassification;