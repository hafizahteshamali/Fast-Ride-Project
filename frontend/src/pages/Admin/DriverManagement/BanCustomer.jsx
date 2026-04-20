import React, { useState } from 'react';
import {
  FaUserCircle,
  FaBan,
  FaCheckCircle,
  FaUndo,
  FaSearch,
  FaFilter,
  FaEye,
  FaTimes,
  FaExclamationTriangle,
  FaInfoCircle,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaCar,
  FaWallet,
  FaHistory,
  FaSpinner,
  FaClock,
  FaUserCheck,
  FaUserTimes,
  FaShieldAlt
} from 'react-icons/fa';

const BanCustomer = () => {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      phone: "+1 234 567 8901",
      address: "123 Maple Street, New York, NY 10001",
      status: "active",
      rideHistoryCount: 45,
      walletBalance: 125.50,
      totalSpent: 1245.75,
      joinDate: "2024-01-15",
      lastActive: "2024-03-24",
      rating: 4.8,
      avatar: "AJ"
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob.smith@example.com",
      phone: "+1 345 678 9012",
      address: "456 Oak Avenue, Los Angeles, CA 90001",
      status: "active",
      rideHistoryCount: 32,
      walletBalance: 89.75,
      totalSpent: 987.50,
      joinDate: "2024-02-10",
      lastActive: "2024-03-23",
      rating: 4.5,
      avatar: "BS"
    },
    {
      id: 3,
      name: "Carol Davis",
      email: "carol.davis@example.com",
      phone: "+1 456 789 0123",
      address: "789 Pine Street, Chicago, IL 60607",
      status: "banned",
      rideHistoryCount: 12,
      walletBalance: 0.00,
      totalSpent: 245.25,
      joinDate: "2024-02-25",
      lastActive: "2024-03-10",
      rating: 2.5,
      avatar: "CD",
      banReason: "Multiple policy violations - inappropriate behavior with drivers",
      bannedDate: "2024-03-15",
      bannedBy: "Admin User"
    },
    {
      id: 4,
      name: "David Wilson",
      email: "david.wilson@example.com",
      phone: "+1 567 890 1234",
      address: "321 Elm Street, Houston, TX 77001",
      status: "active",
      rideHistoryCount: 8,
      walletBalance: 45.00,
      totalSpent: 189.50,
      joinDate: "2024-03-01",
      lastActive: "2024-03-22",
      rating: 4.2,
      avatar: "DW"
    },
    {
      id: 5,
      name: "Emma Brown",
      email: "emma.brown@example.com",
      phone: "+1 678 901 2345",
      address: "654 Cedar Lane, Phoenix, AZ 85001",
      status: "banned",
      rideHistoryCount: 28,
      walletBalance: 245.00,
      totalSpent: 876.50,
      joinDate: "2024-01-05",
      lastActive: "2024-03-01",
      rating: 4.9,
      avatar: "EB",
      banReason: "Fraudulent activity - multiple chargebacks",
      bannedDate: "2024-03-05",
      bannedBy: "System Admin"
    },
    {
      id: 6,
      name: "Frank Miller",
      email: "frank.miller@example.com",
      phone: "+1 789 012 3456",
      address: "987 Birch Road, Seattle, WA 98101",
      status: "active",
      rideHistoryCount: 15,
      walletBalance: 67.25,
      totalSpent: 432.00,
      joinDate: "2024-02-20",
      lastActive: "2024-03-24",
      rating: 4.6,
      avatar: "FM"
    }
  ]);

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showBanModal, setShowBanModal] = useState(false);
  const [showUnbanModal, setShowUnbanModal] = useState(false);
  const [banReason, setBanReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [activeTab, setActiveTab] = useState('active');

  const formatCurrency = (amount) => {
    const pkrAmount = amount * 28;
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(pkrAmount);
  };

  const getStatusBadge = (status) => {
    if (status === 'active') {
      return (
        <div className="flex items-center space-x-1 px-2 py-1 bg-green-100 rounded-full">
          <FaUserCheck className="text-green-600 text-xs" />
          <span className="text-xs font-medium text-green-700">Active</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center space-x-1 px-2 py-1 bg-red-100 rounded-full">
          <FaBan className="text-red-600 text-xs" />
          <span className="text-xs font-medium text-red-700">Banned</span>
        </div>
      );
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleBanCustomer = async () => {
    if (!banReason.trim()) {
      alert('Please provide a reason for banning');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setCustomers(prevCustomers =>
        prevCustomers.map(customer =>
          customer.id === selectedCustomer.id
            ? {
                ...customer,
                status: 'banned',
                banReason: banReason,
                bannedDate: new Date().toISOString().split('T')[0],
                bannedBy: 'Admin User'
              }
            : customer
        )
      );
      setLoading(false);
      setShowBanModal(false);
      setBanReason('');
      setSelectedCustomer(null);
      showNotification(`${selectedCustomer.name} has been banned successfully. User will see error on login.`, 'warning');
    }, 1000);
  };

  const handleUnbanCustomer = async () => {
    setLoading(true);
    setTimeout(() => {
      setCustomers(prevCustomers =>
        prevCustomers.map(customer =>
          customer.id === selectedCustomer.id
            ? {
                ...customer,
                status: 'active',
                banReason: null,
                bannedDate: null,
                bannedBy: null
              }
            : customer
        )
      );
      setLoading(false);
      setShowUnbanModal(false);
      setSelectedCustomer(null);
      showNotification(`${selectedCustomer.name} has been reinstated successfully. User can now log in and book rides.`, 'success');
    }, 1000);
  };

  const filteredCustomers = customers
    .filter(customer => {
      if (activeTab === 'active') return customer.status === 'active';
      if (activeTab === 'banned') return customer.status === 'banned';
      return true;
    })
    .filter(customer => {
      if (searchTerm === '') return true;
      return customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
             customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
             customer.phone.includes(searchTerm);
    });

  return (
    <div className="">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Customer Ban Management</h1>
        <p className="text-gray-600 mt-1">Ban/unban customers to control ride access</p>
      </div>

      {/* Notification */}
      {notification && (
        <div className={`mb-4 p-4 rounded-lg flex items-center space-x-2 ${
          notification.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        }`}>
          {notification.type === 'success' ? <FaCheckCircle /> : <FaExclamationTriangle />}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Statistics Cards */}
      <div className="flex flex-wrap mb-6">
        <div className="w-full md:w-1/2 p-2">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-2">
              <FaUserCheck className="text-green-500 text-xl" />
              <span className="text-xs text-gray-500">Active Customers</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">
              {customers.filter(c => c.status === 'active').length}
            </p>
            <p className="text-xs text-gray-500 mt-1">can book rides</p>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-2">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-2">
              <FaBan className="text-red-500 text-xl" />
              <span className="text-xs text-gray-500">Banned Customers</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">
              {customers.filter(c => c.status === 'banned').length}
            </p>
            <p className="text-xs text-gray-500 mt-1">cannot book rides</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('active')}
          className={`px-4 py-2 font-medium transition-all duration-200 ${
            activeTab === 'active'
              ? 'text-[#FF991C] border-b-2 border-[#FF991C]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Active Customers ({customers.filter(c => c.status === 'active').length})
        </button>
        <button
          onClick={() => setActiveTab('banned')}
          className={`px-4 py-2 font-medium transition-all duration-200 ${
            activeTab === 'banned'
              ? 'text-[#FF991C] border-b-2 border-[#FF991C]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Banned Customers ({customers.filter(c => c.status === 'banned').length})
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex flex-wrap justify-between items-center mb-6">
        <div className="relative w-full md:w-64">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF991C]"
          />
        </div>
      </div>

      {/* Customers List */}
      <div className="space-y-4">
        {filteredCustomers.map((customer) => (
          <div key={customer.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex flex-wrap items-start justify-between">
                <div className="flex flex-wrap flex-1">
                  <div className="flex items-center space-x-4 mb-3 sm:mb-0">
                    <div className={`h-14 w-14 rounded-full ${
                      customer.status === 'active' 
                        ? 'bg-gradient-to-r from-green-500 to-green-600'
                        : 'bg-gradient-to-r from-red-500 to-red-600'
                    } flex items-center justify-center`}>
                      <span className="text-white font-bold text-lg">{customer.avatar}</span>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-semibold text-gray-800">{customer.name}</h3>
                        {getStatusBadge(customer.status)}
                      </div>
                      <div className="flex flex-wrap items-center space-x-4 text-sm text-gray-500 mt-1">
                        <div className="flex items-center space-x-1">
                          <FaEnvelope size={12} />
                          <span>{customer.email}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FaPhone size={12} />
                          <span>{customer.phone}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center space-x-4 text-sm text-gray-500 mt-1">
                        <div className="flex items-center space-x-1">
                          <FaCar size={12} />
                          <span>{customer.rideHistoryCount} rides</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FaWallet size={12} />
                          <span>{formatCurrency(customer.walletBalance)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FaCalendarAlt size={12} />
                          <span>Joined: {customer.joinDate}</span>
                        </div>
                      </div>
                      {customer.status === 'banned' && customer.banReason && (
                        <div className="mt-2 flex items-start space-x-1 text-red-600">
                          <FaExclamationTriangle size={12} className="mt-0.5" />
                          <span className="text-xs">Banned: {customer.banReason}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2 mt-3 sm:mt-0">
                  {customer.status === 'active' ? (
                    <button
                      onClick={() => {
                        setSelectedCustomer(customer);
                        setShowBanModal(true);
                      }}
                      className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <FaBan className="mr-2" size={14} />
                      <span className="text-sm">Ban Customer</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setSelectedCustomer(customer);
                        setShowUnbanModal(true);
                      }}
                      className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <FaUndo className="mr-2" size={14} />
                      <span className="text-sm">Unban Customer</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredCustomers.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <FaInfoCircle className="text-gray-400 text-4xl mx-auto mb-3" />
            <p className="text-gray-500">No customers found</p>
          </div>
        )}
      </div>

      {/* Ban Modal */}
      {showBanModal && selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="text-center">
                <div className="mx-auto h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                  <FaBan className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Ban Customer</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Are you sure you want to ban <span className="font-semibold">{selectedCustomer.name}</span>? 
                  This will prevent them from making ride requests. They will see an error message when trying to log in.
                </p>
                <textarea
                  value={banReason}
                  onChange={(e) => setBanReason(e.target.value)}
                  placeholder="Enter reason for banning (e.g., Policy violation, Fraudulent activity, Harassment)..."
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 mb-4"
                />
                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      setShowBanModal(false);
                      setBanReason('');
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleBanCustomer}
                    disabled={loading}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    {loading ? <FaSpinner className="animate-spin" /> : <FaBan />}
                    <span>Ban Customer</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Unban Modal */}
      {showUnbanModal && selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="text-center">
                <div className="mx-auto h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <FaUndo className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Unban Customer</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Are you sure you want to unban <span className="font-semibold">{selectedCustomer.name}</span>? 
                  This will restore their access to make ride requests.
                </p>
                <div className="bg-yellow-50 p-3 rounded-lg mb-4">
                  <div className="flex items-start space-x-2">
                    <FaExclamationTriangle className="text-yellow-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs font-medium text-yellow-800">Previous Ban Details:</p>
                      <p className="text-xs text-yellow-700 mt-1">Reason: {selectedCustomer.banReason}</p>
                      <p className="text-xs text-yellow-700">Date: {selectedCustomer.bannedDate}</p>
                      <p className="text-xs text-yellow-700">Banned by: {selectedCustomer.bannedBy}</p>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowUnbanModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUnbanCustomer}
                    disabled={loading}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    {loading ? <FaSpinner className="animate-spin" /> : <FaCheckCircle />}
                    <span>Unban Customer</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Info Section */}
      <div className="mt-6 bg-blue-50 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <FaShieldAlt className="text-blue-500 text-xl mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-blue-800">Ban Information</h4>
            <p className="text-xs text-blue-700 mt-1">
              • Banned customers will see an error message when trying to log in: "Your account has been suspended. Please contact support."<br />
              • Banned users cannot make new ride requests or access the app features.<br />
              • Unbanning restores full access immediately.<br />
              • All ban actions are logged for audit purposes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BanCustomer;