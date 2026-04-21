import React, { useState, useEffect } from 'react';
import {
  FaBan,
  FaExclamationTriangle,
  FaCheckCircle,
  FaSpinner,
  FaArrowLeft,
  FaSearch,
  FaFilter,
  FaClock,
  FaUser,
  FaCar,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaTimes,
  FaInfoCircle,
  FaShieldAlt,
  FaTrash,
  FaUndo,
  FaDownload,
  FaShare,
  FaPrint,
  FaExpand,
  FaCompress,
  FaBars,
  FaEye,
  FaEyeSlash,
  FaHistory,
  FaFlag,
  FaUserCheck,
  FaPhone,
  FaEnvelope,
  FaIdCard,
  FaRoute,
  FaLocationArrow,
  FaRegClock,
  FaUserSlash,
  FaChartLine
} from 'react-icons/fa';

const RideCancellation = () => {
  const [activeRides, setActiveRides] = useState([]);
  const [selectedRide, setSelectedRide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [cancellationSuccess, setCancellationSuccess] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancellationReason, setCancellationReason] = useState('');
  const [cancellationType, setCancellationType] = useState('admin_force');
  const [refundAmount, setRefundAmount] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [fullscreenMode, setFullscreenMode] = useState(false);
  const [stats, setStats] = useState({
    totalActive: 0,
    totalCancelled: 0,
    cancellationRate: 0,
    avgRideDuration: 0
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

  // Simulate API call to fetch active rides
  useEffect(() => {
    fetchActiveRides();
  }, []);

  const fetchActiveRides = async () => {
    setLoading(true);
    setTimeout(() => {
      const mockActiveRides = [
        {
          id: 'RID001',
          rideId: 'RID20240315-001',
          status: 'pending',
          createdAt: '2024-03-15T14:30:00Z',
          customer: {
            name: 'John Anderson',
            phone: '+1 (555) 123-4567',
            email: 'john@email.com',
            rating: 4.5,
            avatar: 'JA'
          },
          driver: {
            name: 'Michael Rodriguez',
            phone: '+1 (555) 987-6543',
            rating: 4.8,
            avatar: 'MR',
            vehicle: 'Toyota Camry (ABC-1234)'
          },
          pickup: {
            address: '123 Main Street, New York, NY 10001',
            coordinates: { lat: 40.7128, lng: -74.0060 },
            time: '2024-03-15T14:32:15Z'
          },
          dropoff: {
            address: '456 Broadway, New York, NY 10036',
            coordinates: { lat: 40.7580, lng: -73.9855 }
          },
          fare: {
            estimated: 23.13,
            surgeMultiplier: 1.2
          },
          distance: 4.2,
          duration: 33,
          stage: 'pending',
          cancellationEligible: true
        },
        {
          id: 'RID002',
          rideId: 'RID20240315-002',
          status: 'accepted',
          createdAt: '2024-03-15T14:45:00Z',
          customer: {
            name: 'Sarah Williams',
            phone: '+1 (555) 234-5678',
            email: 'sarah@email.com',
            rating: 4.8,
            avatar: 'SW'
          },
          driver: {
            name: 'Emily Chen',
            phone: '+1 (555) 876-5432',
            rating: 4.9,
            avatar: 'EC',
            vehicle: 'Tesla Model 3 (TESLA-123)'
          },
          pickup: {
            address: '789 Park Avenue, New York, NY 10021',
            coordinates: { lat: 40.7640, lng: -73.9730 },
            time: '2024-03-15T14:50:00Z'
          },
          dropoff: {
            address: '321 Madison Avenue, New York, NY 10022',
            coordinates: { lat: 40.7600, lng: -73.9710 }
          },
          fare: {
            estimated: 28.50,
            surgeMultiplier: 1.5
          },
          distance: 3.8,
          duration: 25,
          stage: 'accepted',
          cancellationEligible: true
        },
        {
          id: 'RID003',
          rideId: 'RID20240315-003',
          status: 'in_progress',
          createdAt: '2024-03-15T15:00:00Z',
          customer: {
            name: 'Michael Brown',
            phone: '+1 (555) 345-6789',
            email: 'michael@email.com',
            rating: 4.2,
            avatar: 'MB'
          },
          driver: {
            name: 'David Kim',
            phone: '+1 (555) 765-4321',
            rating: 4.7,
            avatar: 'DK',
            vehicle: 'Honda Accord (HONDA-456)'
          },
          pickup: {
            address: '555 5th Avenue, New York, NY 10017',
            coordinates: { lat: 40.7550, lng: -73.9760 },
            time: '2024-03-15T15:05:00Z'
          },
          dropoff: {
            address: '888 Broadway, New York, NY 10003',
            coordinates: { lat: 40.7330, lng: -73.9930 }
          },
          fare: {
            estimated: 28.90,
            surgeMultiplier: 1.0
          },
          distance: 5.1,
          duration: 42,
          stage: 'started',
          cancellationEligible: false // Trip already started
        }
      ];

      setActiveRides(mockActiveRides);
      setStats({
        totalActive: mockActiveRides.length,
        totalCancelled: 0,
        cancellationRate: 0,
        avgRideDuration: 33
      });
      setLoading(false);
    }, 1000);
  };

  // Format date and time
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      full: date.toLocaleString('en-US')
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

  // Get stage color and badge
  const getStageInfo = (stage) => {
    const stageMap = {
      'pending': { color: 'text-yellow-600', bg: 'bg-yellow-100', label: 'Pending' },
      'accepted': { color: 'text-blue-600', bg: 'bg-blue-100', label: 'Accepted' },
      'started': { color: 'text-green-600', bg: 'bg-green-100', label: 'In Progress' },
      'cancelled': { color: 'text-red-600', bg: 'bg-red-100', label: 'Cancelled' }
    };
    return stageMap[stage] || stageMap['pending'];
  };

  // Handle ride cancellation
  const handleCancelRide = async () => {
    if (!selectedRide) return;
    
    if (!cancellationReason) {
      alert('Please provide a cancellation reason');
      return;
    }
    
    setCancelling(true);
    
    // Simulate API call
    setTimeout(() => {
      // Create cancellation record
      const cancellationRecord = {
        id: `CANCEL-${Date.now()}`,
        rideId: selectedRide.id,
        cancelledBy: 'Admin',
        cancelledAt: new Date().toISOString(),
        reason: cancellationReason,
        cancellationType: cancellationType,
        refundAmount: refundAmount,
        status: 'cancelled'
      };
      
      console.log('Ride Cancellation Record:', cancellationRecord);
      console.log('RideRequest.Status updated to: CANCELLED');
      console.log('RideEvent logged: Force cancellation by admin');
      
      // Update rides list
      setActiveRides(prev => prev.filter(ride => ride.id !== selectedRide.id));
      
      // Update stats
      setStats(prev => ({
        ...prev,
        totalActive: prev.totalActive - 1,
        totalCancelled: prev.totalCancelled + 1,
        cancellationRate: ((prev.totalCancelled + 1) / (prev.totalActive + prev.totalCancelled)) * 100
      }));
      
      setCancellationSuccess({
        success: true,
        message: `Ride ${selectedRide.rideId} has been successfully cancelled`,
        record: cancellationRecord
      });
      
      // Close modal and reset
      setShowCancelModal(false);
      setSelectedRide(null);
      setCancellationReason('');
      setRefundAmount(0);
      setCancelling(false);
      
      // Auto hide success message
      setTimeout(() => {
        setCancellationSuccess(null);
      }, 5000);
    }, 1500);
  };

  // Calculate refund amount
  const calculateRefund = () => {
    if (!selectedRide) return 0;
    
    if (selectedRide.stage === 'pending') {
      return selectedRide.fare.estimated; // Full refund
    } else if (selectedRide.stage === 'accepted') {
      return selectedRide.fare.estimated * 0.5; // 50% refund
    } else {
      return 0; // No refund if trip started
    }
  };

  // Open cancel modal
  const openCancelModal = (ride) => {
    setSelectedRide(ride);
    setRefundAmount(calculateRefund(ride));
    setShowCancelModal(true);
  };

  // Filter rides
  const getFilteredRides = () => {
    let filtered = [...activeRides];
    
    if (searchTerm) {
      filtered = filtered.filter(ride => 
        ride.rideId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ride.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ride.driver.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filterStatus !== 'all') {
      filtered = filtered.filter(ride => ride.stage === filterStatus);
    }
    
    return filtered;
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

  const filteredRides = getFilteredRides();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <FaSpinner className="w-10 h-10 sm:w-12 sm:h-12 animate-spin mx-auto mb-4" style={{ color: 'var(--primary-orange)' }} />
          <p className="text-sm sm:text-base text-gray-600">Loading active rides...</p>
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
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Ride Cancellation</h1>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Force-cancel active rides before trip start</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3">
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
      {cancellationSuccess && (
        <div className="fixed top-20 right-4 z-50 animate-slide-in max-w-sm">
          <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-lg shadow-lg">
            <div className="flex items-center space-x-3">
              <FaCheckCircle className="w-5 h-5 text-green-400" />
              <div>
                <p className="text-green-800 text-sm font-medium">Cancellation Successful</p>
                <p className="text-green-700 text-xs">{cancellationSuccess.message}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="sm:py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
            <div className="flex items-center justify-between mb-2">
              <FaCar className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
              <span className="text-xs text-gray-500">Active</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-gray-900">{stats.totalActive}</div>
            <div className="text-xs text-gray-600">Active Rides</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
            <div className="flex items-center justify-between mb-2">
              <FaBan className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
              <span className="text-xs text-gray-500">Cancelled</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-gray-900">{stats.totalCancelled}</div>
            <div className="text-xs text-gray-600">Total Cancelled</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
            <div className="flex items-center justify-between mb-2">
              <FaChartLine className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
              <span className="text-xs text-gray-500">Rate</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-gray-900">{stats.cancellationRate.toFixed(1)}%</div>
            <div className="text-xs text-gray-600">Cancellation Rate</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
            <div className="flex items-center justify-between mb-2">
              <FaClock className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
              <span className="text-xs text-gray-500">Avg Ride</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-gray-900">{stats.avgRideDuration}</div>
            <div className="text-xs text-gray-600">Minutes/Ride</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by ride ID, customer, or driver..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm"
                style={{
                  borderColor: 'var(--gray-300)',
                  focusRingColor: 'var(--primary-orange)'
                }}
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
                <option value="all">All Stages</option>
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="in_progress">In Progress</option>
              </select>
            </div>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterStatus('all');
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Active Rides List */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ride Details</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Driver</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fare</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRides.map((ride) => {
                  const stageInfo = getStageInfo(ride.stage);
                  const rideTime = formatDateTime(ride.createdAt);
                  
                  return (
                    <tr key={ride.id} className="hover:bg-gray-50">
                      <td className="px-3 sm:px-6 py-4">
                        <div>
                          <p className="font-medium text-sm text-gray-900">{ride.rideId}</p>
                          <div className="flex items-center space-x-1 text-xs text-gray-500 mt-1">
                            <FaMapMarkerAlt className="w-3 h-3" />
                            <span className="truncate max-w-[150px]">{ride.pickup.address.split(',')[0]}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-xs text-gray-500 mt-0.5">
                            <FaLocationArrow className="w-3 h-3" />
                            <span className="truncate max-w-[150px]">{ride.dropoff.address.split(',')[0]}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                            <FaUser className="w-4 h-4 text-gray-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{ride.customer.name}</p>
                            <p className="text-xs text-gray-500">{ride.distance} km • {ride.duration} min</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <FaCar className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{ride.driver.name}</p>
                            <p className="text-xs text-gray-500">{ride.driver.vehicle.split('(')[0].trim()}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${stageInfo.bg} ${stageInfo.color}`}>
                          {stageInfo.label}
                        </span>
                        {ride.stage !== 'started' && (
                          <p className="text-xs text-green-600 mt-1">✓ Cancellation Eligible</p>
                        )}
                      </td>
                      <td className="px-3 sm:px-6 py-4">
                        <p className="text-sm font-semibold text-gray-900">{formatCurrency(ride.fare.estimated)}</p>
                        {ride.fare.surgeMultiplier > 1 && (
                          <p className="text-xs text-orange-600">{ride.fare.surgeMultiplier}x Surge</p>
                        )}
                      </td>
                      <td className="px-3 sm:px-6 py-4">
                        {ride.cancellationEligible ? (
                          <button
                            onClick={() => openCancelModal(ride)}
                            className="px-3 py-1.5 rounded-lg text-white text-sm flex items-center space-x-1 hover:opacity-90 transition-opacity"
                            style={{ backgroundColor: 'var(--primary-orange)' }}
                          >
                            <FaBan className="w-4 h-4" />
                            <span>Cancel Ride</span>
                          </button>
                        ) : (
                          <button
                            disabled
                            className="px-3 py-1.5 rounded-lg bg-gray-300 text-gray-500 text-sm cursor-not-allowed"
                          >
                            Cannot Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          {filteredRides.length === 0 && (
            <div className="text-center py-12">
              <FaInfoCircle className="w-12 h-12 mx-auto text-gray-400 mb-3" />
              <p className="text-gray-500">No active rides found</p>
            </div>
          )}
        </div>

        {/* Info Banner */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <FaShieldAlt className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-blue-900">Cancellation Policy</p>
              <p className="text-xs text-blue-800 mt-1">
                • Pending rides: Full refund available<br />
                • Accepted rides: 50% refund available<br />
                • In-progress rides: Cannot be cancelled (trip already started)<br />
                • All cancellations are logged in RideEvent log with admin metadata
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Cancellation Modal */}
      {showCancelModal && selectedRide && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-40 modal-enter"></div>
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50 modal-content-enter">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] modal-scroll border border-gray-200">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                    <FaExclamationTriangle className="w-5 h-5 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Confirm Cancellation</h3>
                </div>
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <FaTimes className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="p-6">
                <div className="mb-6">
                  <p className="text-gray-600 mb-4 leading-relaxed">You are about to cancel the following ride:</p>
                  <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                    <p className="font-bold text-gray-900 text-lg mb-2">{selectedRide.rideId}</p>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p><span className="font-medium">Customer:</span> {selectedRide.customer.name}</p>
                      <p><span className="font-medium">Driver:</span> {selectedRide.driver.name}</p>
                      <p><span className="font-medium">Stage:</span> <span className="text-orange-600 font-semibold">{getStageInfo(selectedRide.stage).label}</span></p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-bold text-gray-800 mb-3">
                    Cancellation Reason <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={cancellationReason}
                    onChange={(e) => setCancellationReason(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:border-orange-500 transition-all duration-200"
                  >
                    <option value="">Select a reason...</option>
                    <option value="customer_request">Customer Request</option>
                    <option value="driver_unavailable">Driver Unavailable</option>
                    <option value="technical_issue">Technical Issue</option>
                    <option value="payment_issue">Payment Issue</option>
                    <option value="safety_concern">Safety Concern</option>
                    <option value="policy_violation">Policy Violation</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-bold text-gray-800 mb-3">
                    Cancellation Type
                  </label>
                  <select
                    value={cancellationType}
                    onChange={(e) => setCancellationType(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:border-orange-500 transition-all duration-200"
                  >
                    <option value="admin_force">Admin Force Cancel</option>
                    <option value="customer_initiated">Customer Initiated</option>
                    <option value="system_auto">System Auto-cancel</option>
                  </select>
                </div>

                <div className="mb-6 p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl border border-orange-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-gray-800">Refund Amount:</span>
                    <span className="text-xl font-bold text-orange-600">{formatCurrency(refundAmount)}</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    {selectedRide.stage === 'pending' && 'Full refund applicable for pending rides'}
                    {selectedRide.stage === 'accepted' && '50% refund applicable for accepted rides'}
                    {selectedRide.stage === 'started' && 'No refund for started rides'}
                  </p>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => setShowCancelModal(false)}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200 font-semibold transform hover:scale-105"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCancelRide}
                    disabled={!cancellationReason || cancelling}
                    className={`flex-1 px-6 py-3 rounded-xl text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center space-x-2 transition-all duration-300 ${
                      !cancellationReason || cancelling
                        ? 'bg-gray-400 cursor-not-allowed transform-none'
                        : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700'
                    }`}
                  >
                    {cancelling ? (
                      <>
                        <FaSpinner className="w-5 h-5 animate-spin" />
                        <span>Cancelling...</span>
                      </>
                    ) : (
                      <>
                        <FaBan className="w-5 h-5" />
                        <span>Confirm Cancellation</span>
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
              <h3 className="font-semibold text-gray-800">Quick Filters</h3>
              <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-lg hover:bg-gray-100">
                <FaTimes className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ride Stage</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                  style={{ borderColor: 'var(--gray-300)', focusRingColor: 'var(--primary-orange)' }}
                >
                  <option value="all">All Stages</option>
                  <option value="pending">Pending</option>
                  <option value="accepted">Accepted</option>
                  <option value="in_progress">In Progress</option>
                </select>
              </div>
              <button
                onClick={() => {
                  setFilterStatus('all');
                  setSearchTerm('');
                  setSidebarOpen(false);
                }}
                className="w-full py-2 rounded-lg text-white"
                style={{ backgroundColor: 'var(--primary-orange)' }}
              >
                Clear All Filters
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

export default RideCancellation;