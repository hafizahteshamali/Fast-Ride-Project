import React, { useState } from 'react';
import { 
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaChartLine,
  FaCalendarAlt,
  FaSearch,
  FaFilter,
  FaUserCircle,
  FaCar,
  FaEye,
  FaTimes,
  FaArrowUp,
  FaArrowDown,
  FaMinusCircle,
  FaInfoCircle,
  FaTachometerAlt
} from 'react-icons/fa';

const DriverRating = () => {
  const [drivers, setDrivers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 234 567 8900",
      avatar: "JD",
      rating: 4.8,
      previousRating: 4.7,
      totalTrips: 156,
      recentTrips: 32,
      vehicle: "Toyota Camry",
      plateNumber: "ABC-1234",
      ratingHistory: [
        { date: "2024-03-20", rating: 4.9 },
        { date: "2024-03-19", rating: 4.8 },
        { date: "2024-03-18", rating: 4.7 },
        { date: "2024-03-17", rating: 4.8 },
        { date: "2024-03-16", rating: 4.9 },
        { date: "2024-03-15", rating: 4.7 },
        { date: "2024-03-14", rating: 4.8 }
      ],
      status: "active",
      joinDate: "2024-01-15"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+1 345 678 9012",
      avatar: "JS",
      rating: 4.9,
      previousRating: 4.8,
      totalTrips: 203,
      recentTrips: 45,
      vehicle: "Honda Accord",
      plateNumber: "XYZ-7890",
      ratingHistory: [
        { date: "2024-03-20", rating: 5.0 },
        { date: "2024-03-19", rating: 4.9 },
        { date: "2024-03-18", rating: 4.9 },
        { date: "2024-03-17", rating: 4.8 },
        { date: "2024-03-16", rating: 4.9 },
        { date: "2024-03-15", rating: 5.0 },
        { date: "2024-03-14", rating: 4.9 }
      ],
      status: "active",
      joinDate: "2024-02-10"
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@example.com",
      phone: "+1 456 789 0123",
      avatar: "MJ",
      rating: 3.2,
      previousRating: 3.5,
      totalTrips: 89,
      recentTrips: 12,
      vehicle: "Ford Mustang",
      plateNumber: "FRD-5678",
      ratingHistory: [
        { date: "2024-03-20", rating: 3.0 },
        { date: "2024-03-19", rating: 3.2 },
        { date: "2024-03-18", rating: 3.1 },
        { date: "2024-03-17", rating: 3.3 },
        { date: "2024-03-16", rating: 3.2 },
        { date: "2024-03-15", rating: 3.4 },
        { date: "2024-03-14", rating: 3.5 }
      ],
      status: "active",
      joinDate: "2024-02-25"
    },
    {
      id: 4,
      name: "Sarah Williams",
      email: "sarah.williams@example.com",
      phone: "+1 567 890 1234",
      avatar: "SW",
      rating: 4.7,
      previousRating: 4.6,
      totalTrips: 178,
      recentTrips: 28,
      vehicle: "Tesla Model 3",
      plateNumber: "TES-1234",
      ratingHistory: [
        { date: "2024-03-20", rating: 4.8 },
        { date: "2024-03-19", rating: 4.7 },
        { date: "2024-03-18", rating: 4.6 },
        { date: "2024-03-17", rating: 4.7 },
        { date: "2024-03-16", rating: 4.8 },
        { date: "2024-03-15", rating: 4.6 },
        { date: "2024-03-14", rating: 4.7 }
      ],
      status: "active",
      joinDate: "2024-01-05"
    },
    {
      id: 5,
      name: "Robert Brown",
      email: "robert.brown@example.com",
      phone: "+1 678 901 2345",
      avatar: "RB",
      rating: 4.2,
      previousRating: 4.3,
      totalTrips: 145,
      recentTrips: 22,
      vehicle: "Chevrolet Malibu",
      plateNumber: "CHV-9012",
      ratingHistory: [
        { date: "2024-03-20", rating: 4.1 },
        { date: "2024-03-19", rating: 4.2 },
        { date: "2024-03-18", rating: 4.2 },
        { date: "2024-03-17", rating: 4.3 },
        { date: "2024-03-16", rating: 4.1 },
        { date: "2024-03-15", rating: 4.2 },
        { date: "2024-03-14", rating: 4.3 }
      ],
      status: "inactive",
      joinDate: "2024-02-18"
    }
  ]);

  const [selectedDriver, setSelectedDriver] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRating, setFilterRating] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [sortOrder, setSortOrder] = useState('desc');

  const getRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-yellow-500 text-sm" />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-500 text-sm" />);
    }
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-gray-300 text-sm" />);
    }
    return stars;
  };

  const getRatingTrend = (currentRating, previousRating) => {
    if (currentRating > previousRating) {
      return {
        icon: <FaArrowUp className="text-green-500 text-xs" />,
        text: "Up",
        color: "text-green-600"
      };
    } else if (currentRating < previousRating) {
      return {
        icon: <FaArrowDown className="text-red-500 text-xs" />,
        text: "Down",
        color: "text-red-600"
      };
    } else {
      return {
        icon: <FaMinusCircle className="text-gray-500 text-xs" />,
        text: "Stable",
        color: "text-gray-600"
      };
    }
  };

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return "text-green-600";
    if (rating >= 3.5) return "text-yellow-600";
    if (rating >= 2.5) return "text-orange-600";
    return "text-red-600";
  };

  const getRatingBackground = (rating) => {
    if (rating >= 4.5) return "bg-green-100";
    if (rating >= 3.5) return "bg-yellow-100";
    if (rating >= 2.5) return "bg-orange-100";
    return "bg-red-100";
  };

  const filteredAndSortedDrivers = drivers
    .filter(driver => {
      if (searchTerm === '') return true;
      return driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
             driver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
             driver.phone.includes(searchTerm);
    })
    .filter(driver => {
      if (filterRating === 'all') return true;
      if (filterRating === 'high') return driver.rating >= 4.5;
      if (filterRating === 'good') return driver.rating >= 3.5 && driver.rating < 4.5;
      if (filterRating === 'average') return driver.rating >= 2.5 && driver.rating < 3.5;
      if (filterRating === 'poor') return driver.rating < 2.5;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') {
        return sortOrder === 'desc' ? b.rating - a.rating : a.rating - b.rating;
      } else if (sortBy === 'name') {
        return sortOrder === 'desc' ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name);
      } else if (sortBy === 'trips') {
        return sortOrder === 'desc' ? b.totalTrips - a.totalTrips : a.totalTrips - b.totalTrips;
      }
      return 0;
    });

  const calculateAverageTrend = (ratingHistory) => {
    const recent = ratingHistory.slice(0, 3);
    const older = ratingHistory.slice(3, 6);
    const recentAvg = recent.reduce((sum, r) => sum + r.rating, 0) / recent.length;
    const olderAvg = older.length > 0 ? older.reduce((sum, r) => sum + r.rating, 0) / older.length : recentAvg;
    return recentAvg - olderAvg;
  };

  const getTrendIcon = (trend) => {
    if (trend > 0.1) return <FaArrowUp className="text-green-500 text-xs" />;
    if (trend < -0.1) return <FaArrowDown className="text-red-500 text-xs" />;
    return <FaMinusCircle className="text-gray-500 text-xs" />;
  };

  return (
    <div className="">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Driver Rating Management</h1>
        <p className="text-gray-600 mt-1">View and analyze driver ratings updated after each trip completion</p>
      </div>

      {/* Statistics Cards */}
      <div className="flex flex-wrap mb-6">
        <div className="w-full md:w-1/4 p-2">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-2">
              <FaStar className="text-yellow-500 text-xl" />
              <span className="text-xs text-gray-500">Overall Average</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">
              {(drivers.reduce((sum, d) => sum + d.rating, 0) / drivers.length).toFixed(1)}
            </p>
            <p className="text-xs text-gray-500 mt-1">out of 5.0</p>
          </div>
        </div>
        <div className="w-full md:w-1/4 p-2">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-2">
              <FaTachometerAlt className="text-blue-500 text-xl" />
              <span className="text-xs text-gray-500">Total Drivers</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">{drivers.length}</p>
            <p className="text-xs text-gray-500 mt-1">active drivers</p>
          </div>
        </div>
        <div className="w-full md:w-1/4 p-2">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-2">
              <FaStar className="text-green-500 text-xl" />
              <span className="text-xs text-gray-500">High Rated (4.5+)</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">
              {drivers.filter(d => d.rating >= 4.5).length}
            </p>
            <p className="text-xs text-gray-500 mt-1">drivers</p>
          </div>
        </div>
        <div className="w-full md:w-1/4 p-2">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-2">
              <FaArrowUp className="text-green-500 text-xl" />
              <span className="text-xs text-gray-500">Rating Trend</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">
              {drivers.filter(d => d.rating > d.previousRating).length}
            </p>
            <p className="text-xs text-gray-500 mt-1">improving drivers</p>
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
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF991C]"
          >
            <option value="all">All Ratings</option>
            <option value="high">High (4.5+)</option>
            <option value="good">Good (3.5-4.5)</option>
            <option value="average">Average (2.5-3.5)</option>
            <option value="poor">Poor (&lt;2.5)</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF991C]"
          >
            <option value="rating">Sort by Rating</option>
            <option value="name">Sort by Name</option>
            <option value="trips">Sort by Trips</option>
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
        {filteredAndSortedDrivers.map((driver) => {
          const trend = getRatingTrend(driver.rating, driver.previousRating);
          const ratingColor = getRatingColor(driver.rating);
          const ratingBg = getRatingBackground(driver.rating);
          
          return (
            <div key={driver.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex flex-wrap items-start justify-between">
                  <div className="flex flex-wrap flex-1">
                    <div className="flex items-center space-x-4 mb-3 sm:mb-0">
                      <div className="h-14 w-14 rounded-full bg-gradient-to-r from-[#FF991C] to-[#FF5C00] flex items-center justify-center">
                        <span className="text-white font-bold text-lg">{driver.avatar}</span>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="text-lg font-semibold text-gray-800">{driver.name}</h3>
                          <div className={`px-2 py-1 rounded-full ${ratingBg}`}>
                            <span className={`text-xs font-bold ${ratingColor}`}>{driver.rating.toFixed(1)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            {trend.icon}
                            <span className={`text-xs ${trend.color}`}>{trend.text}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center space-x-4 text-sm text-gray-500 mt-1">
                          <div className="flex items-center space-x-1">
                            <FaCar size={12} />
                            <span>{driver.vehicle}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span className="text-xs">Plate: {driver.plateNumber}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center space-x-4 text-sm text-gray-500 mt-1">
                          <div className="flex items-center space-x-1">
                            <FaCalendarAlt size={12} />
                            <span>{driver.totalTrips} total trips</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span className="text-xs">Last 30 days: {driver.recentTrips} trips</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2 mt-3 sm:mt-0">
                    <div className="text-right mr-3">
                      <div className="flex mb-1">{getRatingStars(driver.rating)}</div>
                      <p className="text-xs text-gray-500">Updated after each trip</p>
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
          );
        })}

        {filteredAndSortedDrivers.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <FaInfoCircle className="text-gray-400 text-4xl mx-auto mb-3" />
            <p className="text-gray-500">No drivers found</p>
          </div>
        )}
      </div>

      {/* Rating Details Modal */}
      {showDetailsModal && selectedDriver && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-800">Rating Details - {selectedDriver.name}</h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes size={24} />
              </button>
            </div>

            <div className="p-6">
              {/* Current Rating */}
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-6 mb-6">
                <div className="flex flex-wrap items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Current Rating</p>
                    <p className="text-4xl font-bold text-gray-800">{selectedDriver.rating.toFixed(1)}</p>
                    <div className="flex mt-2">{getRatingStars(selectedDriver.rating)}</div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 mb-1">Rating Trend</p>
                    <div className="flex items-center space-x-2">
                      {getRatingTrend(selectedDriver.rating, selectedDriver.previousRating).icon}
                      <span className="text-lg font-semibold">
                        {selectedDriver.rating > selectedDriver.previousRating ? '+' : ''}
                        {(selectedDriver.rating - selectedDriver.previousRating).toFixed(1)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Previous: {selectedDriver.previousRating.toFixed(1)}</p>
                  </div>
                </div>
              </div>

              {/* Statistics */}
              <div className="flex flex-wrap mb-6">
                <div className="w-full md:w-1/2 p-2">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500">Total Trips</p>
                    <p className="text-xl font-bold text-gray-800">{selectedDriver.totalTrips}</p>
                  </div>
                </div>
                <div className="w-full md:w-1/2 p-2">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500">Recent Trips (30 days)</p>
                    <p className="text-xl font-bold text-gray-800">{selectedDriver.recentTrips}</p>
                  </div>
                </div>
              </div>

              {/* Rating Trend Chart */}
              <div className="border border-gray-200 rounded-lg p-4 mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                  <FaChartLine className="text-[#FF991C]" />
                  <span>Rating Trend (Last 7 Days)</span>
                </h4>
                <div className="space-y-2">
                  {selectedDriver.ratingHistory.map((history, index) => {
                    const barHeight = (history.rating / 5) * 100;
                    const barColor = getRatingColor(history.rating);
                    return (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-24 text-xs text-gray-500">{history.date}</div>
                        <div className="flex-1">
                          <div className="h-8 bg-gray-200 rounded-lg overflow-hidden">
                            <div 
                              className={`h-full ${barColor === 'text-green-600' ? 'bg-green-500' : barColor === 'text-yellow-600' ? 'bg-yellow-500' : barColor === 'text-orange-600' ? 'bg-orange-500' : 'bg-red-500'} transition-all duration-300`}
                              style={{ width: `${barHeight}%` }}
                            />
                          </div>
                        </div>
                        <div className="w-12 text-right text-sm font-medium text-gray-700">
                          {history.rating.toFixed(1)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Rating Info */}
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <FaInfoCircle className="text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-blue-800 font-medium">How rating is calculated:</p>
                    <p className="text-xs text-blue-600 mt-1">
                      Driver rating is automatically updated after each completed trip based on customer feedback. 
                      The rating is an average of all trip ratings received. Ratings range from 0.0 to 5.0 stars.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DriverRating;