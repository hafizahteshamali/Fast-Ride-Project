import React, { useState } from 'react';
import { 
  FaUserSlash,
  FaUserCheck,
  FaSearch,
  FaFilter,
  FaClock,
  FaBan,
  FaUndo,
  FaEye,
  FaCalendarAlt,
  FaCar,
  FaStar,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaExclamationTriangle,
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner,
  FaBell,
  FaInfoCircle,
  FaHistory
} from 'react-icons/fa';

const DriverSuspension = () => {
  const [drivers, setDrivers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 234 567 8900",
      address: "123 Main St, New York, NY 10001",
      status: "active",
      rating: 4.8,
      totalRides: 156,
      joinDate: "2024-01-15",
      vehicle: {
        model: "Toyota Camry",
        plateNumber: "ABC-1234"
      },
      suspensionHistory: [
        { date: "2024-02-01", reason: "Safety violation", reinstated: true, reinstatedDate: "2024-02-05" }
      ],
      currentSuspensionReason: null,
      suspendedAt: null
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+1 345 678 9012",
      address: "456 Oak Ave, Los Angeles, CA 90001",
      status: "suspended",
      rating: 4.2,
      totalRides: 89,
      joinDate: "2024-02-10",
      vehicle: {
        model: "Honda Accord",
        plateNumber: "XYZ-7890"
      },
      suspensionHistory: [
        { date: "2024-03-01", reason: "Customer complaint - rude behavior", reinstated: false, reinstatedDate: null }
      ],
      currentSuspensionReason: "Customer complaint - rude behavior",
      suspendedAt: "2024-03-01"
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@example.com",
      phone: "+1 456 789 0123",
      address: "789 Pine St, Chicago, IL 60007",
      status: "active",
      rating: 4.9,
      totalRides: 234,
      joinDate: "2023-11-20",
      vehicle: {
        model: "Tesla Model 3",
        plateNumber: "TES-1234"
      },
      suspensionHistory: [],
      currentSuspensionReason: null,
      suspendedAt: null
    },
    {
      id: 4,
      name: "Sarah Williams",
      email: "sarah.williams@example.com",
      phone: "+1 567 890 1234",
      address: "321 Elm St, Houston, TX 77001",
      status: "suspended",
      rating: 3.5,
      totalRides: 45,
      joinDate: "2024-02-25",
      vehicle: {
        model: "Ford Mustang",
        plateNumber: "FRD-5678"
      },
      suspensionHistory: [
        { date: "2024-03-10", reason: "Document expired - License", reinstated: false, reinstatedDate: null }
      ],
      currentSuspensionReason: "Document expired - License",
      suspendedAt: "2024-03-10"
    },
    {
      id: 5,
      name: "Robert Brown",
      email: "robert.brown@example.com",
      phone: "+1 678 901 2345",
      address: "654 Cedar Ln, Phoenix, AZ 85001",
      status: "active",
      rating: 4.7,
      totalRides: 178,
      joinDate: "2024-01-05",
      vehicle: {
        model: "Chevrolet Malibu",
        plateNumber: "CHV-9012"
      },
      suspensionHistory: [
        { date: "2024-01-20", reason: "Late arrival multiple times", reinstated: true, reinstatedDate: "2024-01-25" }
      ],
      currentSuspensionReason: null,
      suspendedAt: null
    }
  ]);

  const [selectedDriver, setSelectedDriver] = useState(null);
  const [suspensionReason, setSuspensionReason] = useState('');
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [showReinstateModal, setShowReinstateModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [activeTab, setActiveTab] = useState('active');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRating, setFilterRating] = useState('all');

  const getStatusBadge = (status) => {
    if (status === 'active') {
      return (
        <div className="flex items-center space-x-1 px-3 py-1 bg-green-100 rounded-full">
          <FaCheckCircle className="text-green-600 text-xs" />
          <span className="text-xs font-medium text-green-700">Active</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center space-x-1 px-3 py-1 bg-red-100 rounded-full">
          <FaBan className="text-red-600 text-xs" />
          <span className="text-xs font-medium text-red-700">Suspended</span>
        </div>
      );
    }
  };

  const filteredDrivers = drivers.filter(driver => {
    if (activeTab === 'active') return driver.status === 'active';
    if (activeTab === 'suspended') return driver.status === 'suspended';
    return true;
  }).filter(driver => {
    if (searchTerm === '') return true;
    return driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           driver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
           driver.phone.includes(searchTerm);
  }).filter(driver => {
    if (filterRating === 'all') return true;
    if (filterRating === 'high') return driver.rating >= 4.5;
    if (filterRating === 'medium') return driver.rating >= 3.5 && driver.rating < 4.5;
    if (filterRating === 'low') return driver.rating < 3.5;
    return true;
  });

  const handleSuspendDriver = async () => {
    if (!suspensionReason.trim()) {
      alert('Please provide a reason for suspension');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setDrivers(prevDrivers =>
        prevDrivers.map(driver => {
          if (driver.id === selectedDriver.id) {
            const updatedHistory = [...driver.suspensionHistory, {
              date: new Date().toISOString().split('T')[0],
              reason: suspensionReason,
              reinstated: false,
              reinstatedDate: null
            }];
            return {
              ...driver,
              status: 'suspended',
              currentSuspensionReason: suspensionReason,
              suspendedAt: new Date().toISOString().split('T')[0],
              suspensionHistory: updatedHistory
            };
          }
          return driver;
        })
      );
      setLoading(false);
      setShowSuspendModal(false);
      setSuspensionReason('');
      setSelectedDriver(null);
      showNotification(`${selectedDriver.name} has been suspended successfully. Driver removed from GEO pool.`, 'success');
      
      // In real implementation, this would call an API to remove from Redis GEO pool
      console.log(`Driver ${selectedDriver.id} removed from Redis GEO pool`);
    }, 1000);
  };

  const handleReinstateDriver = async () => {
    setLoading(true);
    setTimeout(() => {
      setDrivers(prevDrivers =>
        prevDrivers.map(driver => {
          if (driver.id === selectedDriver.id) {
            const updatedHistory = driver.suspensionHistory.map(history =>
              history.date === driver.suspendedAt && !history.reinstated
                ? { ...history, reinstated: true, reinstatedDate: new Date().toISOString().split('T')[0] }
                : history
            );
            return {
              ...driver,
              status: 'active',
              currentSuspensionReason: null,
              suspendedAt: null,
              suspensionHistory: updatedHistory
            };
          }
          return driver;
        })
      );
      setLoading(false);
      setShowReinstateModal(false);
      setSelectedDriver(null);
      showNotification(`${selectedDriver.name} has been reinstated successfully. Driver added back to GEO pool.`, 'success');
      
      // In real implementation, this would call an API to add back to Redis GEO pool
      console.log(`Driver ${selectedDriver.id} added back to Redis GEO pool`);
    }, 1000);
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const getRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-yellow-500 text-xs" />);
    }
    if (halfStar) {
      stars.push(<FaStar key="half" className="text-yellow-500 text-xs opacity-50" />);
    }
    return stars;
  };

  return (
    <div className="">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Driver Suspension Management</h1>
        <p className="text-gray-600 mt-1">Suspend active drivers or reinstate suspended drivers after review</p>
      </div>

      {/* Notification */}
      {notification && (
        <div className={`mb-4 p-4 rounded-lg flex items-center space-x-2 ${
          notification.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-yellow-50 text-yellow-800'
        }`}>
          <FaBell />
          <span>{notification.message}</span>
        </div>
      )}

      {/* Tabs and Search */}
      <div className="flex flex-wrap justify-between items-center mb-6">
        <div className="flex space-x-2 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('active')}
            className={`px-4 py-2 font-medium transition-all duration-200 ${
              activeTab === 'active'
                ? 'text-[#FF991C] border-b-2 border-[#FF991C]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Active Drivers ({drivers.filter(d => d.status === 'active').length})
          </button>
          <button
            onClick={() => setActiveTab('suspended')}
            className={`px-4 py-2 font-medium transition-all duration-200 ${
              activeTab === 'suspended'
                ? 'text-[#FF991C] border-b-2 border-[#FF991C]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Suspended Drivers ({drivers.filter(d => d.status === 'suspended').length})
          </button>
        </div>
        
        <div className="flex flex-wrap space-x-2 mt-2 sm:mt-0">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search drivers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF991C] text-sm"
            />
          </div>
          <select
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value)}
            className="px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF991C] text-sm"
          >
            <option value="all">All Ratings</option>
            <option value="high">High (4.5+)</option>
            <option value="medium">Medium (3.5-4.5)</option>
            <option value="low">Low (&lt;3.5)</option>
          </select>
        </div>
      </div>

      {/* Drivers List */}
      <div className="space-y-4">
        {filteredDrivers.map((driver) => (
          <div key={driver.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex flex-wrap justify-between items-start">
                <div className="flex flex-wrap flex-1">
                  <div className="flex items-center space-x-4 mb-3 sm:mb-0">
                    <div className="h-14 w-14 rounded-full bg-gradient-to-r from-[#FF991C] to-[#FF5C00] flex items-center justify-center">
                      <span className="text-white font-bold text-xl">{driver.name.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-semibold text-gray-800">{driver.name}</h3>
                        {getStatusBadge(driver.status)}
                      </div>
                      <div className="flex flex-wrap items-center space-x-4 text-sm text-gray-500 mt-1">
                        <div className="flex items-center space-x-1">
                          <FaEnvelope size={12} />
                          <span>{driver.email}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FaPhone size={12} />
                          <span>{driver.phone}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center space-x-4 text-sm text-gray-500 mt-1">
                        <div className="flex items-center space-x-1">
                          <FaStar className="text-yellow-500" />
                          <span>{driver.rating}</span>
                          <div className="flex ml-1">{getRatingStars(driver.rating)}</div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FaCar size={12} />
                          <span>{driver.vehicle.model} ({driver.vehicle.plateNumber})</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FaCalendarAlt size={12} />
                          <span>Joined: {driver.joinDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2 mt-3 sm:mt-0">
                  <button
                    onClick={() => {
                      setSelectedDriver(driver);
                      setShowDetailModal(true);
                    }}
                    className="flex items-center px-3 py-1.5 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    <FaEye className="mr-1" size={14} />
                    <span className="text-sm">Details</span>
                  </button>
                  
                  {driver.status === 'active' && (
                    <button
                      onClick={() => {
                        setSelectedDriver(driver);
                        setShowSuspendModal(true);
                      }}
                      className="flex items-center px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <FaBan className="mr-1" size={14} />
                      <span className="text-sm">Suspend</span>
                    </button>
                  )}
                  
                  {driver.status === 'suspended' && (
                    <button
                      onClick={() => {
                        setSelectedDriver(driver);
                        setShowReinstateModal(true);
                      }}
                      className="flex items-center px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <FaUndo className="mr-1" size={14} />
                      <span className="text-sm">Reinstate</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Suspension Info (if suspended) */}
              {driver.status === 'suspended' && driver.currentSuspensionReason && (
                <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-start space-x-2">
                    <FaExclamationTriangle className="text-red-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-red-800">Suspension Details</p>
                      <p className="text-sm text-red-700">Reason: {driver.currentSuspensionReason}</p>
                      <p className="text-xs text-red-600 mt-1">Suspended on: {driver.suspendedAt}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {filteredDrivers.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <FaInfoCircle className="text-gray-400 text-4xl mx-auto mb-3" />
            <p className="text-gray-500">No drivers found</p>
          </div>
        )}
      </div>

      {/* Suspend Modal */}
      {showSuspendModal && selectedDriver && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="text-center">
                <div className="mx-auto h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                  <FaBan className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Suspend Driver</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Are you sure you want to suspend <span className="font-semibold">{selectedDriver.name}</span>? 
                  This will remove them from the GEO pool and they won't receive ride requests.
                </p>
                <textarea
                  value={suspensionReason}
                  onChange={(e) => setSuspensionReason(e.target.value)}
                  placeholder="Enter reason for suspension (e.g., Safety violation, Customer complaint, Document expired)..."
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 mb-4"
                />
                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      setShowSuspendModal(false);
                      setSuspensionReason('');
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSuspendDriver}
                    disabled={loading}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    {loading ? <FaSpinner className="animate-spin" /> : <FaBan />}
                    <span>Suspend Driver</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reinstate Modal */}
      {showReinstateModal && selectedDriver && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="text-center">
                <div className="mx-auto h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <FaUserCheck className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Reinstate Driver</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Are you sure you want to reinstate <span className="font-semibold">{selectedDriver.name}</span>? 
                  This will add them back to the GEO pool and they will start receiving ride requests.
                </p>
                <div className="bg-yellow-50 p-3 rounded-lg mb-4">
                  <p className="text-xs text-yellow-800">
                    <strong>Suspension Reason:</strong> {selectedDriver.currentSuspensionReason}
                  </p>
                  <p className="text-xs text-yellow-800 mt-1">
                    <strong>Suspended on:</strong> {selectedDriver.suspendedAt}
                  </p>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowReinstateModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleReinstateDriver}
                    disabled={loading}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    {loading ? <FaSpinner className="animate-spin" /> : <FaUserCheck />}
                    <span>Reinstate Driver</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Driver Details Modal */}
      {showDetailModal && selectedDriver && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800">Driver Details</h3>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimesCircle size={24} />
                </button>
              </div>

              <div className="space-y-4">
                {/* Driver Info */}
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-r from-[#FF991C] to-[#FF5C00] flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">{selectedDriver.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-800">{selectedDriver.name}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      {getStatusBadge(selectedDriver.status)}
                      <div className="flex items-center">
                        {getRatingStars(selectedDriver.rating)}
                        <span className="ml-1 text-sm text-gray-600">({selectedDriver.rating})</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="border-t border-gray-200 pt-4">
                  <h5 className="font-semibold text-gray-700 mb-3">Contact Information</h5>
                  <div className="flex flex-wrap space-y-2">
                    <div className="w-full md:w-1/2 flex items-center space-x-2 text-gray-600">
                      <FaEnvelope />
                      <span>{selectedDriver.email}</span>
                    </div>
                    <div className="w-full md:w-1/2 flex items-center space-x-2 text-gray-600">
                      <FaPhone />
                      <span>{selectedDriver.phone}</span>
                    </div>
                    <div className="w-full flex items-center space-x-2 text-gray-600">
                      <FaMapMarkerAlt />
                      <span>{selectedDriver.address}</span>
                    </div>
                  </div>
                </div>

                {/* Vehicle Info */}
                <div className="border-t border-gray-200 pt-4">
                  <h5 className="font-semibold text-gray-700 mb-3">Vehicle Information</h5>
                  <div className="flex flex-wrap space-y-2">
                    <div className="w-full md:w-1/2 flex items-center space-x-2 text-gray-600">
                      <FaCar />
                      <span>{selectedDriver.vehicle.model}</span>
                    </div>
                    <div className="w-full md:w-1/2 flex items-center space-x-2 text-gray-600">
                      <FaCar />
                      <span>Plate: {selectedDriver.vehicle.plateNumber}</span>
                    </div>
                  </div>
                </div>

                {/* Statistics */}
                <div className="border-t border-gray-200 pt-4">
                  <h5 className="font-semibold text-gray-700 mb-3">Statistics</h5>
                  <div className="flex flex-wrap space-y-2">
                    <div className="w-full md:w-1/2 flex items-center space-x-2 text-gray-600">
                      <FaStar className="text-yellow-500" />
                      <span>Rating: {selectedDriver.rating} / 5.0</span>
                    </div>
                    <div className="w-full md:w-1/2 flex items-center space-x-2 text-gray-600">
                      <FaCar />
                      <span>Total Rides: {selectedDriver.totalRides}</span>
                    </div>
                    <div className="w-full flex items-center space-x-2 text-gray-600">
                      <FaCalendarAlt />
                      <span>Joined: {selectedDriver.joinDate}</span>
                    </div>
                  </div>
                </div>

                {/* Suspension History */}
                {selectedDriver.suspensionHistory.length > 0 && (
                  <div className="border-t border-gray-200 pt-4">
                    <h5 className="font-semibold text-gray-700 mb-3 flex items-center space-x-2">
                      <FaHistory />
                      <span>Suspension History</span>
                    </h5>
                    <div className="space-y-2">
                      {selectedDriver.suspensionHistory.map((history, index) => (
                        <div key={index} className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-800">
                              {history.reason}
                            </p>
                            {history.reinstated && (
                              <span className="text-xs text-green-600 flex items-center space-x-1">
                                <FaCheckCircle size={12} />
                                <span>Reinstated</span>
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap justify-between mt-1">
                            <p className="text-xs text-gray-500">Suspended: {history.date}</p>
                            {history.reinstatedDate && (
                              <p className="text-xs text-green-600">Reinstated: {history.reinstatedDate}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                {selectedDriver.status === 'active' && (
                  <button
                    onClick={() => {
                      setShowDetailModal(false);
                      setShowSuspendModal(true);
                    }}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Suspend Driver
                  </button>
                )}
                {selectedDriver.status === 'suspended' && (
                  <button
                    onClick={() => {
                      setShowDetailModal(false);
                      setShowReinstateModal(true);
                    }}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Reinstate Driver
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DriverSuspension;