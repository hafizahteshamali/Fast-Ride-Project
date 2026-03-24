import React, { useState } from 'react';
import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaCar,
  FaWallet,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaEye,
  FaSearch,
  FaFilter,
  FaTimes,
  FaInfoCircle,
  FaStar,
  FaHistory,
  FaDollarSign,
  FaBan,
  FaUserCheck,
  FaUserClock,
  FaArrowUp,
  FaArrowDown,
  FaArrowRight
} from 'react-icons/fa';

const CustomerAccount = () => {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      phone: "+1 234 567 8901",
      address: "123 Maple Street, New York, NY 10001",
      accountStatus: "active",
      rideHistoryCount: 45,
      walletBalance: 125.50,
      totalSpent: 1245.75,
      joinDate: "2024-01-15",
      lastActive: "2024-03-24",
      rating: 4.8,
      avatar: "AJ",
      rides: [
        { id: 1001, date: "2024-03-20", from: "Airport", to: "Downtown", fare: 45.50, status: "completed" },
        { id: 1002, date: "2024-03-18", from: "Mall", to: "Residential Area", fare: 28.75, status: "completed" },
        { id: 1003, date: "2024-03-15", from: "Downtown", to: "Airport", fare: 52.00, status: "completed" }
      ]
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob.smith@example.com",
      phone: "+1 345 678 9012",
      address: "456 Oak Avenue, Los Angeles, CA 90001",
      accountStatus: "active",
      rideHistoryCount: 32,
      walletBalance: 89.75,
      totalSpent: 987.50,
      joinDate: "2024-02-10",
      lastActive: "2024-03-23",
      rating: 4.5,
      avatar: "BS",
      rides: [
        { id: 2001, date: "2024-03-22", from: "Beach", to: "Downtown", fare: 38.50, status: "completed" },
        { id: 2002, date: "2024-03-20", from: "Airport", to: "Hotel District", fare: 48.75, status: "completed" }
      ]
    },
    {
      id: 3,
      name: "Carol Davis",
      email: "carol.davis@example.com",
      phone: "+1 456 789 0123",
      address: "789 Pine Street, Chicago, IL 60607",
      accountStatus: "banned",
      rideHistoryCount: 12,
      walletBalance: 0.00,
      totalSpent: 245.25,
      joinDate: "2024-02-25",
      lastActive: "2024-03-10",
      rating: 2.5,
      avatar: "CD",
      banReason: "Multiple policy violations",
      bannedDate: "2024-03-15",
      rides: [
        { id: 3001, date: "2024-03-05", from: "Downtown", to: "Suburbs", fare: 32.50, status: "completed" },
        { id: 3002, date: "2024-03-01", from: "Airport", to: "City Center", fare: 55.00, status: "completed" }
      ]
    },
    {
      id: 4,
      name: "David Wilson",
      email: "david.wilson@example.com",
      phone: "+1 567 890 1234",
      address: "321 Elm Street, Houston, TX 77001",
      accountStatus: "pending",
      rideHistoryCount: 0,
      walletBalance: 0.00,
      totalSpent: 0.00,
      joinDate: "2024-03-20",
      lastActive: "2024-03-20",
      rating: 0,
      avatar: "DW",
      rides: []
    },
    {
      id: 5,
      name: "Emma Brown",
      email: "emma.brown@example.com",
      phone: "+1 678 901 2345",
      address: "654 Cedar Lane, Phoenix, AZ 85001",
      accountStatus: "active",
      rideHistoryCount: 28,
      walletBalance: 245.00,
      totalSpent: 876.50,
      joinDate: "2024-01-05",
      lastActive: "2024-03-24",
      rating: 4.9,
      avatar: "EB",
      rides: [
        { id: 5001, date: "2024-03-23", from: "Downtown", to: "Airport", fare: 48.00, status: "completed" },
        { id: 5002, date: "2024-03-21", from: "Mall", to: "Residential", fare: 24.50, status: "completed" },
        { id: 5003, date: "2024-03-19", from: "Airport", to: "Hotel", fare: 35.50, status: "completed" }
      ]
    }
  ]);

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'active':
        return (
          <div className="flex items-center space-x-1 px-2 py-1 bg-green-100 rounded-full">
            <FaCheckCircle className="text-green-600 text-xs" />
            <span className="text-xs font-medium text-green-700">Active</span>
          </div>
        );
      case 'banned':
        return (
          <div className="flex items-center space-x-1 px-2 py-1 bg-red-100 rounded-full">
            <FaBan className="text-red-600 text-xs" />
            <span className="text-xs font-medium text-red-700">Banned</span>
          </div>
        );
      case 'pending':
        return (
          <div className="flex items-center space-x-1 px-2 py-1 bg-yellow-100 rounded-full">
            <FaClock className="text-yellow-600 text-xs" />
            <span className="text-xs font-medium text-yellow-700">Pending</span>
          </div>
        );
      default:
        return null;
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'active':
        return <FaUserCheck className="text-green-500 text-lg" />;
      case 'banned':
        return <FaBan className="text-red-500 text-lg" />;
      case 'pending':
        return <FaUserClock className="text-yellow-500 text-lg" />;
      default:
        return <FaUserCircle className="text-gray-500 text-lg" />;
    }
  };

  const getRatingStars = (rating) => {
    if (rating === 0) return <span className="text-xs text-gray-400">No ratings yet</span>;
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-yellow-500 text-xs" />);
    }
    return stars;
  };

  const filteredAndSortedCustomers = customers
    .filter(customer => {
      if (searchTerm === '') return true;
      return customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
             customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
             customer.phone.includes(searchTerm);
    })
    .filter(customer => {
      if (filterStatus === 'all') return true;
      return customer.accountStatus === filterStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'name') {
        return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      } else if (sortBy === 'rides') {
        return sortOrder === 'asc' ? a.rideHistoryCount - b.rideHistoryCount : b.rideHistoryCount - a.rideHistoryCount;
      } else if (sortBy === 'wallet') {
        return sortOrder === 'asc' ? a.walletBalance - b.walletBalance : b.walletBalance - a.walletBalance;
      } else if (sortBy === 'spent') {
        return sortOrder === 'asc' ? a.totalSpent - b.totalSpent : b.totalSpent - a.totalSpent;
      } else if (sortBy === 'joined') {
        return sortOrder === 'asc' ? new Date(a.joinDate) - new Date(b.joinDate) : new Date(b.joinDate) - new Date(a.joinDate);
      }
      return 0;
    });

  return (
    <div className="">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Customer Account Management</h1>
        <p className="text-gray-600 mt-1">View customer profiles, ride history, and wallet balance</p>
      </div>

      {/* Statistics Cards */}
      <div className="flex flex-wrap mb-6">
        <div className="w-full md:w-1/4 p-2">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-2">
              <FaUserCheck className="text-green-500 text-xl" />
              <span className="text-xs text-gray-500">Active Customers</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">
              {customers.filter(c => c.accountStatus === 'active').length}
            </p>
            <p className="text-xs text-gray-500 mt-1">active accounts</p>
          </div>
        </div>
        <div className="w-full md:w-1/4 p-2">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-2">
              <FaBan className="text-red-500 text-xl" />
              <span className="text-xs text-gray-500">Banned Customers</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">
              {customers.filter(c => c.accountStatus === 'banned').length}
            </p>
            <p className="text-xs text-gray-500 mt-1">banned accounts</p>
          </div>
        </div>
        <div className="w-full md:w-1/4 p-2">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-2">
              <FaUserClock className="text-yellow-500 text-xl" />
              <span className="text-xs text-gray-500">Pending Approval</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">
              {customers.filter(c => c.accountStatus === 'pending').length}
            </p>
            <p className="text-xs text-gray-500 mt-1">awaiting verification</p>
          </div>
        </div>
        <div className="w-full md:w-1/4 p-2">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-2">
              <FaWallet className="text-blue-500 text-xl" />
              <span className="text-xs text-gray-500">Total Wallet Balance</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">
              {formatCurrency(customers.reduce((sum, c) => sum + c.walletBalance, 0))}
            </p>
            <p className="text-xs text-gray-500 mt-1">across all customers</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-between items-center mb-6">
        <div className="flex flex-wrap space-x-2 mb-2 sm:mb-0">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF991C] w-64"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF991C]"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="banned">Banned</option>
            <option value="pending">Pending</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF991C]"
          >
            <option value="name">Sort by Name</option>
            <option value="rides">Sort by Ride Count</option>
            <option value="wallet">Sort by Wallet Balance</option>
            <option value="spent">Sort by Total Spent</option>
            <option value="joined">Sort by Join Date</option>
          </select>
          <button
            onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
            className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {sortOrder === 'desc' ? '↓ Descending' : '↑ Ascending'}
          </button>
        </div>
      </div>

      {/* Customers List */}
      <div className="space-y-4">
        {filteredAndSortedCustomers.map((customer) => (
          <div key={customer.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex flex-wrap items-start justify-between">
                <div className="flex flex-wrap flex-1">
                  <div className="flex items-center space-x-4 mb-3 sm:mb-0">
                    <div className={`h-14 w-14 rounded-full ${
                      customer.accountStatus === 'active' ? 'bg-gradient-to-r from-green-500 to-green-600' :
                      customer.accountStatus === 'banned' ? 'bg-gradient-to-r from-red-500 to-red-600' :
                      'bg-gradient-to-r from-yellow-500 to-yellow-600'
                    } flex items-center justify-center`}>
                      <span className="text-white font-bold text-lg">{customer.avatar}</span>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-semibold text-gray-800">{customer.name}</h3>
                        {getStatusBadge(customer.accountStatus)}
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
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2 mt-3 sm:mt-0">
                  <button
                    onClick={() => {
                      setSelectedCustomer(customer);
                      setShowDetailsModal(true);
                    }}
                    className="flex items-center px-3 py-1.5 bg-[#FF991C] text-white rounded-lg hover:bg-[#FF5C00] transition-colors"
                  >
                    <FaEye className="mr-1" size={14} />
                    <span className="text-sm">View Profile</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredAndSortedCustomers.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <FaInfoCircle className="text-gray-400 text-4xl mx-auto mb-3" />
            <p className="text-gray-500">No customers found</p>
          </div>
        )}
      </div>

      {/* Customer Details Modal */}
      {showDetailsModal && selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-800">Customer Profile</h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes size={24} />
              </button>
            </div>

            <div className="p-6">
              {/* Profile Header */}
              <div className="flex flex-wrap items-center mb-6 pb-6 border-b border-gray-200">
                <div className={`h-20 w-20 rounded-full ${
                  selectedCustomer.accountStatus === 'active' ? 'bg-gradient-to-r from-green-500 to-green-600' :
                  selectedCustomer.accountStatus === 'banned' ? 'bg-gradient-to-r from-red-500 to-red-600' :
                  'bg-gradient-to-r from-yellow-500 to-yellow-600'
                } flex items-center justify-center`}>
                  <span className="text-white font-bold text-2xl">{selectedCustomer.avatar}</span>
                </div>
                <div className="ml-6 flex-1">
                  <div className="flex items-center space-x-3">
                    <h2 className="text-2xl font-bold text-gray-800">{selectedCustomer.name}</h2>
                    {getStatusBadge(selectedCustomer.accountStatus)}
                  </div>
                  <div className="flex flex-wrap items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <FaEnvelope />
                      <span className="text-sm">{selectedCustomer.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <FaPhone />
                      <span className="text-sm">{selectedCustomer.phone}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mt-2 text-gray-600">
                    <FaMapMarkerAlt />
                    <span className="text-sm">{selectedCustomer.address}</span>
                  </div>
                </div>
              </div>

              {/* Account Information */}
              <div className="flex flex-wrap mb-6">
                <div className="w-full md:w-1/3 p-2">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500">Account Status</p>
                    <div className="flex items-center space-x-2 mt-1">
                      {getStatusIcon(selectedCustomer.accountStatus)}
                      <span className="text-sm font-semibold capitalize">{selectedCustomer.accountStatus}</span>
                    </div>
                    {selectedCustomer.accountStatus === 'banned' && (
                      <p className="text-xs text-red-600 mt-2">Reason: {selectedCustomer.banReason}</p>
                    )}
                  </div>
                </div>
                <div className="w-full md:w-1/3 p-2">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500">Join Date</p>
                    <p className="text-sm font-semibold mt-1">{selectedCustomer.joinDate}</p>
                  </div>
                </div>
                <div className="w-full md:w-1/3 p-2">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500">Last Active</p>
                    <p className="text-sm font-semibold mt-1">{selectedCustomer.lastActive}</p>
                  </div>
                </div>
              </div>

              {/* Statistics Cards */}
              <div className="flex flex-wrap mb-6">
                <div className="w-full md:w-1/3 p-2">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <FaHistory className="text-blue-500 text-xl" />
                      <span className="text-xs text-gray-500">Total Rides</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-800 mt-2">{selectedCustomer.rideHistoryCount}</p>
                    <p className="text-xs text-gray-500 mt-1">completed trips</p>
                  </div>
                </div>
                <div className="w-full md:w-1/3 p-2">
                  <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <FaWallet className="text-green-500 text-xl" />
                      <span className="text-xs text-gray-500">Wallet Balance</span>
                    </div>
                    <p className="text-2xl font-bold text-green-600 mt-2">{formatCurrency(selectedCustomer.walletBalance)}</p>
                    <p className="text-xs text-gray-500 mt-1">available balance</p>
                  </div>
                </div>
                <div className="w-full md:w-1/3 p-2">
                  <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <FaDollarSign className="text-purple-500 text-xl" />
                      <span className="text-xs text-gray-500">Total Spent</span>
                    </div>
                    <p className="text-2xl font-bold text-purple-600 mt-2">{formatCurrency(selectedCustomer.totalSpent)}</p>
                    <p className="text-xs text-gray-500 mt-1">lifetime spending</p>
                  </div>
                </div>
              </div>

              {/* Rating Section */}
              {selectedCustomer.rating > 0 && (
                <div className="mb-6 p-4 bg-yellow-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Customer Rating</p>
                      <div className="flex items-center mt-1">
                        {getRatingStars(selectedCustomer.rating)}
                        <span className="ml-2 text-sm font-semibold text-gray-700">{selectedCustomer.rating}</span>
                      </div>
                    </div>
                    <FaStar className="text-yellow-500 text-2xl" />
                  </div>
                </div>
              )}

              {/* Ride History */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                  <FaHistory className="text-[#FF991C]" />
                  <span>Ride History</span>
                </h4>
                {selectedCustomer.rides.length > 0 ? (
                  <div className="space-y-3">
                    {selectedCustomer.rides.map((ride) => (
                      <div key={ride.id} className="flex flex-wrap items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <FaCalendarAlt className="text-gray-400 text-xs" />
                            <span className="text-xs text-gray-500">{ride.date}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">{ride.from}</span>
                            <FaArrowRight className="text-gray-400 text-xs" />
                            <span className="text-sm font-medium">{ride.to}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-gray-800">{formatCurrency(ride.fare)}</p>
                          <span className="text-xs text-green-600">{ride.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 text-center py-4">No ride history available</p>
                )}
              </div>

              {/* Info Note */}
              <div className="mt-4 bg-blue-50 rounded-lg p-3">
                <div className="flex items-start space-x-2">
                  <FaInfoCircle className="text-blue-500 mt-0.5" />
                  <p className="text-xs text-blue-700">
                    Customer account status determines their ability to book rides. 
                    Active customers can book rides, banned customers cannot, and pending accounts require verification.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerAccount;