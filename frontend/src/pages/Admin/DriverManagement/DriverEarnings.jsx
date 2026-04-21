import React, { useState } from 'react';
import {
  FaDollarSign,
  FaWallet,
  FaClock,
  FaHistory,
  FaSearch,
  FaCalendarAlt,
  FaEye,
  FaTimes,
  FaArrowUp,
  FaArrowDown,
  FaInfoCircle,
  FaDownload,
  FaChartLine,
  FaCar,
  FaUserCircle,
  FaMoneyBillWave,
  FaCreditCard,
  FaCheckCircle,
  FaTimesCircle,
  FaFilter
} from 'react-icons/fa';

const DriverEarnings = () => {
  const [drivers, setDrivers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 234 567 8900",
      avatar: "JD",
      totalPaidOut: 12450.75,
      totalPending: 2450.50,
      totalEarnings: 14901.25,
      tripsCompleted: 156,
      joinDate: "2024-01-15",
      earningsHistory: [
        { id: 1001, date: "2024-03-23", tripId: "TRIP-001", from: "Airport", to: "Downtown", fare: 45.50, commission: 9.10, driverEarning: 36.40, status: "paid", paidDate: "2024-03-24" },
        { id: 1002, date: "2024-03-22", tripId: "TRIP-002", from: "Mall", to: "Residential Area", fare: 28.75, commission: 5.75, driverEarning: 23.00, status: "paid", paidDate: "2024-03-23" },
        { id: 1003, date: "2024-03-21", tripId: "TRIP-003", from: "Downtown", to: "Airport", fare: 52.00, commission: 10.40, driverEarning: 41.60, status: "paid", paidDate: "2024-03-22" },
        { id: 1004, date: "2024-03-20", tripId: "TRIP-004", from: "Hotel", to: "Convention Center", fare: 18.50, commission: 3.70, driverEarning: 14.80, status: "pending", paidDate: null },
        { id: 1005, date: "2024-03-19", tripId: "TRIP-005", from: "Airport", to: "Suburbs", fare: 67.25, commission: 13.45, driverEarning: 53.80, status: "pending", paidDate: null }
      ]
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+1 345 678 9012",
      avatar: "JS",
      totalPaidOut: 18750.25,
      totalPending: 1850.75,
      totalEarnings: 20601.00,
      tripsCompleted: 203,
      joinDate: "2024-02-10",
      earningsHistory: [
        { id: 2001, date: "2024-03-23", tripId: "TRIP-006", from: "Beach", to: "Downtown", fare: 38.50, commission: 7.70, driverEarning: 30.80, status: "paid", paidDate: "2024-03-24" },
        { id: 2002, date: "2024-03-22", tripId: "TRIP-007", from: "Airport", to: "Hotel District", fare: 48.75, commission: 9.75, driverEarning: 39.00, status: "paid", paidDate: "2024-03-23" },
        { id: 2003, date: "2024-03-21", tripId: "TRIP-008", from: "Mall", to: "Airport", fare: 55.00, commission: 11.00, driverEarning: 44.00, status: "paid", paidDate: "2024-03-22" },
        { id: 2004, date: "2024-03-20", tripId: "TRIP-009", from: "Downtown", to: "Stadium", fare: 22.50, commission: 4.50, driverEarning: 18.00, status: "pending", paidDate: null }
      ]
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@example.com",
      phone: "+1 456 789 0123",
      avatar: "MJ",
      totalPaidOut: 14230.50,
      totalPending: 3150.25,
      totalEarnings: 17380.75,
      tripsCompleted: 178,
      joinDate: "2024-01-05",
      earningsHistory: [
        { id: 3001, date: "2024-03-23", tripId: "TRIP-010", from: "Downtown", to: "Suburbs", fare: 32.50, commission: 6.50, driverEarning: 26.00, status: "paid", paidDate: "2024-03-24" },
        { id: 3002, date: "2024-03-22", tripId: "TRIP-011", from: "Airport", to: "City Center", fare: 55.00, commission: 11.00, driverEarning: 44.00, status: "paid", paidDate: "2024-03-23" },
        { id: 3003, date: "2024-03-21", tripId: "TRIP-012", from: "Hotel", to: "Airport", fare: 42.50, commission: 8.50, driverEarning: 34.00, status: "pending", paidDate: null },
        { id: 3004, date: "2024-03-20", tripId: "TRIP-013", from: "Mall", to: "Residential", fare: 24.50, commission: 4.90, driverEarning: 19.60, status: "pending", paidDate: null }
      ]
    },
    {
      id: 4,
      name: "Sarah Williams",
      email: "sarah.williams@example.com",
      phone: "+1 567 890 1234",
      avatar: "SW",
      totalPaidOut: 8900.00,
      totalPending: 1250.00,
      totalEarnings: 10150.00,
      tripsCompleted: 89,
      joinDate: "2024-02-25",
      earningsHistory: [
        { id: 4001, date: "2024-03-23", tripId: "TRIP-014", from: "Airport", to: "Downtown", fare: 48.00, commission: 9.60, driverEarning: 38.40, status: "paid", paidDate: "2024-03-24" },
        { id: 4002, date: "2024-03-22", tripId: "TRIP-015", from: "Beach", to: "Hotel", fare: 35.50, commission: 7.10, driverEarning: 28.40, status: "pending", paidDate: null }
      ]
    }
  ]);

  const [selectedDriver, setSelectedDriver] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPeriod, setFilterPeriod] = useState('all');
  const [sortBy, setSortBy] = useState('earnings');
  const [sortOrder, setSortOrder] = useState('desc');

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
    if (status === 'paid') {
      return (
        <div className="flex items-center space-x-1 px-2 py-1 bg-green-100 rounded-full">
          <FaCheckCircle className="text-green-600 text-xs" />
          <span className="text-xs font-medium text-green-700">Paid</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center space-x-1 px-2 py-1 bg-yellow-100 rounded-full">
          <FaClock className="text-yellow-600 text-xs" />
          <span className="text-xs font-medium text-yellow-700">Pending</span>
        </div>
      );
    }
  };

  const filteredAndSortedDrivers = drivers
    .filter(driver => {
      if (searchTerm === '') return true;
      return driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
             driver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
             driver.phone.includes(searchTerm);
    })
    .sort((a, b) => {
      if (sortBy === 'earnings') {
        return sortOrder === 'desc' ? b.totalEarnings - a.totalEarnings : a.totalEarnings - b.totalEarnings;
      } else if (sortBy === 'paid') {
        return sortOrder === 'desc' ? b.totalPaidOut - a.totalPaidOut : a.totalPaidOut - b.totalPaidOut;
      } else if (sortBy === 'pending') {
        return sortOrder === 'desc' ? b.totalPending - a.totalPending : a.totalPending - b.totalPending;
      } else if (sortBy === 'trips') {
        return sortOrder === 'desc' ? b.tripsCompleted - a.tripsCompleted : a.tripsCompleted - b.tripsCompleted;
      } else if (sortBy === 'name') {
        return sortOrder === 'desc' ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name);
      }
      return 0;
    });

  const getFilteredEarningsHistory = (history) => {
    if (filterPeriod === 'all') return history;
    if (filterPeriod === 'week') {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      return history.filter(trip => new Date(trip.date) >= oneWeekAgo);
    }
    if (filterPeriod === 'month') {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      return history.filter(trip => new Date(trip.date) >= oneMonthAgo);
    }
    if (filterPeriod === 'paid') {
      return history.filter(trip => trip.status === 'paid');
    }
    if (filterPeriod === 'pending') {
      return history.filter(trip => trip.status === 'pending');
    }
    return history;
  };

  return (
    <div className="">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Driver Earnings Management</h1>
        <p className="text-gray-600 mt-1">View earnings history per driver from Finance ledger</p>
      </div>

      {/* Statistics Cards */}
      <div className="flex flex-wrap mb-6">
        <div className="w-full md:w-1/3 p-2">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-2">
              <FaDollarSign className="text-green-500 text-xl" />
              <span className="text-xs text-gray-500">Total Paid Out</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">
              {formatCurrency(drivers.reduce((sum, d) => sum + d.totalPaidOut, 0))}
            </p>
            <p className="text-xs text-gray-500 mt-1">across all drivers</p>
          </div>
        </div>
        <div className="w-full md:w-1/3 p-2">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-2">
              <FaClock className="text-yellow-500 text-xl" />
              <span className="text-xs text-gray-500">Total Pending</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">
              {formatCurrency(drivers.reduce((sum, d) => sum + d.totalPending, 0))}
            </p>
            <p className="text-xs text-gray-500 mt-1">awaiting payout</p>
          </div>
        </div>
        <div className="w-full md:w-1/3 p-2">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-2">
              <FaWallet className="text-blue-500 text-xl" />
              <span className="text-xs text-gray-500">Total Earnings</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">
              {formatCurrency(drivers.reduce((sum, d) => sum + d.totalEarnings, 0))}
            </p>
            <p className="text-xs text-gray-500 mt-1">overall earnings</p>
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
              placeholder="Search drivers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF991C] w-64"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF991C]"
          >
            <option value="earnings">Sort by Total Earnings</option>
            <option value="paid">Sort by Paid Out</option>
            <option value="pending">Sort by Pending</option>
            <option value="trips">Sort by Trips</option>
            <option value="name">Sort by Name</option>
          </select>
          <button
            onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
            className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {sortOrder === 'desc' ? '↓ Descending' : '↑ Ascending'}
          </button>
        </div>
      </div>

      {/* Drivers List */}
      <div className="space-y-4">
        {filteredAndSortedDrivers.map((driver) => (
          <div key={driver.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex flex-wrap items-start justify-between">
                <div className="flex flex-wrap flex-1">
                  <div className="flex items-center space-x-4 mb-3 sm:mb-0">
                    <div className="h-14 w-14 rounded-full bg-gradient-to-r from-[#FF991C] to-[#FF5C00] flex items-center justify-center">
                      <span className="text-white font-bold text-lg">{driver.avatar}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{driver.name}</h3>
                      <div className="flex flex-wrap items-center space-x-4 text-sm text-gray-500 mt-1">
                        <div className="flex items-center space-x-1">
                          <FaCar size={12} />
                          <span>{driver.tripsCompleted} trips</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FaCalendarAlt size={12} />
                          <span>Joined: {driver.joinDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4 mt-3 sm:mt-0">
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Paid Out</p>
                    <p className="text-lg font-bold text-green-600">{formatCurrency(driver.totalPaidOut)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Pending</p>
                    <p className="text-lg font-bold text-yellow-600">{formatCurrency(driver.totalPending)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Total</p>
                    <p className="text-lg font-bold text-blue-600">{formatCurrency(driver.totalEarnings)}</p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedDriver(driver);
                      setShowDetailsModal(true);
                    }}
                    className="flex items-center px-3 py-1.5 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    <FaEye className="mr-1" size={14} />
                    <span className="text-sm">Details</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredAndSortedDrivers.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <FaInfoCircle className="text-gray-400 text-4xl mx-auto mb-3" />
            <p className="text-gray-500">No drivers found</p>
          </div>
        )}
      </div>

      {/* Earnings Details Modal */}
      {showDetailsModal && selectedDriver && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-40 modal-enter"></div>
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50 modal-content-enter">
            <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto modal-scroll border border-gray-200">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                    <FaDollarSign className="w-5 h-5 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Earnings Details - {selectedDriver.name}</h3>
                </div>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <FaTimes className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="p-6">
                {/* Earnings Summary */}
                <div className="flex flex-wrap mb-8">
                  <div className="w-full md:w-1/3 p-2">
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                      <p className="text-sm text-gray-600 font-medium mb-2">Total Paid Out</p>
                      <p className="text-3xl font-bold text-green-600">{formatCurrency(selectedDriver.totalPaidOut)}</p>
                      <p className="text-xs text-gray-500 mt-2">from {selectedDriver.tripsCompleted} trips</p>
                    </div>
                  </div>
                  <div className="w-full md:w-1/3 p-2">
                    <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 border border-yellow-200">
                      <p className="text-sm text-gray-600 font-medium mb-2">Pending Payouts</p>
                      <p className="text-3xl font-bold text-yellow-600">{formatCurrency(selectedDriver.totalPending)}</p>
                      <p className="text-xs text-gray-500 mt-2">awaiting processing</p>
                    </div>
                  </div>
                  <div className="w-full md:w-1/3 p-2">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                      <p className="text-sm text-gray-600 font-medium mb-2">Total Earnings</p>
                      <p className="text-3xl font-bold text-blue-600">{formatCurrency(selectedDriver.totalEarnings)}</p>
                      <p className="text-xs text-gray-500 mt-2">overall earnings</p>
                    </div>
                  </div>
                </div>

                {/* Earnings Filters */}
                <div className="flex flex-wrap items-center justify-between mb-6">
                  <h4 className="text-xl font-bold text-gray-900 flex items-center space-x-3">
                    <FaHistory className="w-5 h-5 text-orange-600" />
                    <span>Earnings History</span>
                  </h4>
                  <div className="flex space-x-3">
                    <select
                      value={filterPeriod}
                      onChange={(e) => setFilterPeriod(e.target.value)}
                      className="px-4 py-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:border-orange-500 transition-all duration-200"
                    >
                      <option value="all">All Trips</option>
                      <option value="week">Last 7 Days</option>
                      <option value="month">Last 30 Days</option>
                      <option value="paid">Paid Only</option>
                      <option value="pending">Pending Only</option>
                    </select>
                    <button className="px-4 py-2 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 font-semibold transform hover:scale-105">
                      <FaDownload className="inline mr-2" size={14} />
                      Export
                    </button>
                  </div>
                </div>

                {/* Earnings Table */}
                <div className="overflow-x-auto mb-8">
                  <table className="w-full border-collapse">
                    <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wide">Date</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wide">Trip ID</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wide">Route</th>
                        <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wide">Fare</th>
                        <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wide">Commission</th>
                        <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wide">Driver Earning</th>
                        <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wide">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {getFilteredEarningsHistory(selectedDriver.earningsHistory).map((trip) => (
                        <tr key={trip.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 text-sm text-gray-700 font-medium">{trip.date}</td>
                          <td className="px-6 py-4 text-sm text-gray-700 font-mono font-semibold">{trip.tripId}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">
                            {trip.from} → {trip.to}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-700 text-right font-semibold">{formatCurrency(trip.fare)}</td>
                          <td className="px-6 py-4 text-sm text-red-600 text-right font-semibold">{formatCurrency(trip.commission)}</td>
                          <td className="px-6 py-4 text-sm text-green-600 font-bold text-right">{formatCurrency(trip.driverEarning)}</td>
                          <td className="px-6 py-4 text-center">
                            {getStatusBadge(trip.status)}
                            {trip.status === 'paid' && (
                              <p className="text-xs text-gray-400 mt-1 font-medium">Paid: {trip.paidDate}</p>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Summary Statistics */}
                <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                  <h5 className="font-bold text-gray-800 mb-5 text-lg">Earnings Summary</h5>
                  <div className="flex flex-wrap">
                    <div className="w-full md:w-1/2 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 font-medium">Average per Trip:</span>
                        <span className="text-sm font-bold text-gray-900">
                          {formatCurrency(selectedDriver.totalEarnings / selectedDriver.tripsCompleted)}
                        </span>
                      </div>
                    </div>
                    <div className="w-full md:w-1/2 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 font-medium">Total Commission Paid:</span>
                        <span className="text-sm font-bold text-red-600">
                          {formatCurrency(selectedDriver.earningsHistory.reduce((sum, t) => sum + t.commission, 0))}
                        </span>
                      </div>
                    </div>
                    <div className="w-full md:w-1/2 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 font-medium">Pending Trips:</span>
                        <span className="text-sm font-bold text-yellow-600">
                          {selectedDriver.earningsHistory.filter(t => t.status === 'pending').length} trips
                        </span>
                      </div>
                    </div>
                    <div className="w-full md:w-1/2 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 font-medium">Completed Trips:</span>
                        <span className="text-sm font-bold text-green-600">
                          {selectedDriver.earningsHistory.filter(t => t.status === 'paid').length} trips
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Info Note */}
                <div className="mt-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
                  <div className="flex items-start space-x-3">
                    <FaInfoCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                    <p className="text-sm text-blue-800 font-medium leading-relaxed">
                      Earnings are calculated based on trip fare minus platform commission.
                      Pending payouts will be processed within 3-5 business days.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DriverEarnings;