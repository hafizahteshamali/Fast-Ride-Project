import React, { useState, useEffect } from 'react';
import { 
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaIdCard,
  FaStar,
  FaCar,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaCalendarAlt,
  FaFileAlt,
  FaEye,
  FaDownload,
  FaRoad,
  FaTrophy,
  FaAward,
  FaShieldAlt,
  FaChartLine,
  FaDollarSign,
  FaSearch,
  FaFilter,
  FaSpinner,
  FaTimes,
  FaFilePdf,
  FaImage,
  FaCircle,
  FaUserCheck,
  FaUserClock,
  FaHistory
} from 'react-icons/fa';

const DriverProfile = () => {
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('profile');

  const [drivers] = useState([
    {
      id: 1,
      personalInfo: {
        fullName: "John Michael Doe",
        email: "john.doe@example.com",
        phone: "+1 234 567 8900",
        address: "123 Main Street, Apartment 4B, New York, NY 10001",
        dateOfBirth: "1985-05-15",
        nationality: "American",
        gender: "Male"
      },
      licenseInfo: {
        licenseNumber: "DL123456789",
        licenseType: "Commercial Driver License (CDL)",
        issueDate: "2020-01-15",
        expiryDate: "2025-01-15",
        issuingAuthority: "New York DMV",
        status: "active"
      },
      rating: 4.8,
      totalTrips: 156,
      totalEarnings: 12450.75,
      currentOnlineStatus: "online",
      joinedDate: "2024-01-15",
      lastActive: "2024-03-23 14:30:00",
      documents: {
        license: {
          front: { url: "license_front.jpg", status: "approved", uploadedAt: "2024-01-15" },
          back: { url: "license_back.jpg", status: "approved", uploadedAt: "2024-01-15" }
        },
        cnic: {
          front: { url: "cnic_front.jpg", status: "approved", uploadedAt: "2024-01-15" },
          back: { url: "cnic_back.jpg", status: "approved", uploadedAt: "2024-01-15" }
        },
        insurance: { url: "insurance.pdf", status: "approved", uploadedAt: "2024-01-15" },
        vehicleRegistration: { url: "registration.pdf", status: "approved", uploadedAt: "2024-01-15" },
        profilePhoto: { url: "profile.jpg", status: "approved", uploadedAt: "2024-01-15" }
      },
      vehicles: [
        {
          id: 101,
          model: "Toyota Camry",
          year: "2022",
          plateNumber: "ABC-1234",
          color: "Black",
          type: "Sedan",
          status: "active",
          isPrimary: true
        },
        {
          id: 102,
          model: "Honda Accord",
          year: "2023",
          plateNumber: "XYZ-7890",
          color: "White",
          type: "Sedan",
          status: "inactive",
          isPrimary: false
        }
      ],
      documentHistory: [
        { id: 1, documentType: "License", action: "Uploaded", date: "2024-01-15", status: "approved" },
        { id: 2, documentType: "License", action: "Verified", date: "2024-01-16", status: "approved" },
        { id: 3, documentType: "CNIC", action: "Uploaded", date: "2024-01-15", status: "approved" },
        { id: 4, documentType: "CNIC", action: "Verified", date: "2024-01-16", status: "approved" },
        { id: 5, documentType: "Insurance", action: "Uploaded", date: "2024-01-15", status: "approved" },
        { id: 6, documentType: "Insurance", action: "Verified", date: "2024-01-16", status: "approved" }
      ],
      recentTrips: [
        { id: 1001, date: "2024-03-23", from: "Airport", to: "Downtown", fare: 45.50, rating: 5.0 },
        { id: 1002, date: "2024-03-22", from: "Mall", to: "Residential Area", fare: 28.75, rating: 4.8 },
        { id: 1003, date: "2024-03-21", from: "Downtown", to: "Airport", fare: 52.00, rating: 4.9 }
      ]
    },
    {
      id: 2,
      personalInfo: {
        fullName: "Jane Elizabeth Smith",
        email: "jane.smith@example.com",
        phone: "+1 345 678 9012",
        address: "456 Oak Avenue, Los Angeles, CA 90001",
        dateOfBirth: "1990-08-22",
        nationality: "American",
        gender: "Female"
      },
      licenseInfo: {
        licenseNumber: "DL987654321",
        licenseType: "Standard Driver License",
        issueDate: "2021-03-10",
        expiryDate: "2026-03-10",
        issuingAuthority: "California DMV",
        status: "active"
      },
      rating: 4.9,
      totalTrips: 203,
      totalEarnings: 18750.25,
      currentOnlineStatus: "offline",
      joinedDate: "2024-02-10",
      lastActive: "2024-03-22 22:15:00",
      documents: {
        license: {
          front: { url: "license_front_2.jpg", status: "approved", uploadedAt: "2024-02-10" },
          back: { url: "license_back_2.jpg", status: "approved", uploadedAt: "2024-02-10" }
        },
        cnic: {
          front: { url: "cnic_front_2.jpg", status: "approved", uploadedAt: "2024-02-10" },
          back: { url: "cnic_back_2.jpg", status: "approved", uploadedAt: "2024-02-10" }
        },
        insurance: { url: "insurance_2.pdf", status: "approved", uploadedAt: "2024-02-10" },
        vehicleRegistration: { url: "registration_2.pdf", status: "approved", uploadedAt: "2024-02-10" },
        profilePhoto: { url: "profile_2.jpg", status: "approved", uploadedAt: "2024-02-10" }
      },
      vehicles: [
        {
          id: 201,
          model: "Honda Accord",
          year: "2023",
          plateNumber: "XYZ-7890",
          color: "White",
          type: "Sedan",
          status: "active",
          isPrimary: true
        }
      ],
      documentHistory: [
        { id: 1, documentType: "License", action: "Uploaded", date: "2024-02-10", status: "approved" },
        { id: 2, documentType: "License", action: "Verified", date: "2024-02-11", status: "approved" }
      ],
      recentTrips: [
        { id: 2001, date: "2024-03-22", from: "Beach", to: "Downtown", fare: 38.50, rating: 5.0 },
        { id: 2002, date: "2024-03-21", from: "Airport", to: "Hotel District", fare: 48.75, rating: 4.9 }
      ]
    },
    {
      id: 3,
      personalInfo: {
        fullName: "Michael Johnson",
        email: "michael.johnson@example.com",
        phone: "+1 456 789 0123",
        address: "789 Pine Street, Chicago, IL 60607",
        dateOfBirth: "1988-12-03",
        nationality: "American",
        gender: "Male"
      },
      licenseInfo: {
        licenseNumber: "DL456789012",
        licenseType: "Commercial Driver License (CDL)",
        issueDate: "2019-07-20",
        expiryDate: "2024-07-20",
        issuingAuthority: "Illinois DMV",
        status: "active"
      },
      rating: 4.7,
      totalTrips: 178,
      totalEarnings: 14230.50,
      currentOnlineStatus: "online",
      joinedDate: "2024-01-05",
      lastActive: "2024-03-23 15:45:00",
      documents: {
        license: {
          front: { url: "license_front_3.jpg", status: "approved", uploadedAt: "2024-01-05" },
          back: { url: "license_back_3.jpg", status: "approved", uploadedAt: "2024-01-05" }
        },
        cnic: {
          front: { url: "cnic_front_3.jpg", status: "pending", uploadedAt: "2024-01-05" },
          back: { url: "cnic_back_3.jpg", status: "pending", uploadedAt: "2024-01-05" }
        },
        insurance: { url: "insurance_3.pdf", status: "approved", uploadedAt: "2024-01-05" },
        vehicleRegistration: { url: "registration_3.pdf", status: "approved", uploadedAt: "2024-01-05" },
        profilePhoto: { url: "profile_3.jpg", status: "approved", uploadedAt: "2024-01-05" }
      },
      vehicles: [
        {
          id: 301,
          model: "Tesla Model 3",
          year: "2023",
          plateNumber: "TES-1234",
          color: "Red",
          type: "Electric",
          status: "active",
          isPrimary: true
        },
        {
          id: 302,
          model: "Chevrolet Bolt",
          year: "2022",
          plateNumber: "CHV-5678",
          color: "Blue",
          type: "Electric",
          status: "active",
          isPrimary: false
        }
      ],
      documentHistory: [
        { id: 1, documentType: "License", action: "Uploaded", date: "2024-01-05", status: "approved" },
        { id: 2, documentType: "CNIC", action: "Uploaded", date: "2024-01-05", status: "pending" }
      ],
      recentTrips: [
        { id: 3001, date: "2024-03-23", from: "Downtown", to: "Suburbs", fare: 32.50, rating: 4.7 },
        { id: 3002, date: "2024-03-22", from: "Airport", to: "City Center", fare: 55.00, rating: 4.8 }
      ]
    }
  ]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedDriver || showDocumentModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedDriver, showDocumentModal]);

  // Handle ESC key to close modals
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        if (selectedDriver) setSelectedDriver(null);
        if (showDocumentModal) setShowDocumentModal(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [selectedDriver, showDocumentModal]);

  const filteredDrivers = drivers.filter(driver =>
    driver.personalInfo.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.personalInfo.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.licenseInfo.licenseNumber.includes(searchTerm)
  );

  const getStatusBadge = (status) => {
    if (status === 'online') {
      return (
        <div className="flex items-center space-x-1 px-3 py-1 bg-green-100 rounded-full">
          <FaCircle className="text-green-500 text-xs" />
          <span className="text-xs font-medium text-green-700">Online</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center space-x-1 px-3 py-1 bg-gray-100 rounded-full">
          <FaCircle className="text-gray-400 text-xs" />
          <span className="text-xs font-medium text-gray-600">Offline</span>
        </div>
      );
    }
  };

  const getDocumentStatusBadge = (status) => {
    if (status === 'approved') {
      return (
        <div className="flex items-center space-x-1">
          <FaCheckCircle className="text-green-500 text-xs" />
          <span className="text-xs font-medium text-green-700">Approved</span>
        </div>
      );
    } else if (status === 'pending') {
      return (
        <div className="flex items-center space-x-1">
          <FaClock className="text-yellow-500 text-xs" />
          <span className="text-xs font-medium text-yellow-700">Pending</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center space-x-1">
          <FaTimesCircle className="text-red-500 text-xs" />
          <span className="text-xs font-medium text-red-700">Rejected</span>
        </div>
      );
    }
  };

  const getRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-yellow-500 text-xs" />);
    }
    if (rating % 1 >= 0.5) {
      stars.push(<FaStar key="half" className="text-yellow-500 text-xs opacity-50" />);
    }
    return stars;
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Driver Profile Management</h1>
        <p className="text-gray-600 mt-1">View complete driver profiles, documents, and history</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, or license number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF991C]"
          />
        </div>
      </div>

      {/* Drivers List */}
      <div className="space-y-4">
        {filteredDrivers.map((driver) => (
          <div key={driver.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex flex-wrap items-start justify-between">
                <div className="flex flex-wrap flex-1">
                  <div className="flex items-center space-x-4 mb-3 sm:mb-0">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-r from-[#FF991C] to-[#FF5C00] flex items-center justify-center">
                      <FaUserCircle className="text-white text-3xl" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-semibold text-gray-800">{driver.personalInfo.fullName}</h3>
                        {getStatusBadge(driver.currentOnlineStatus)}
                      </div>
                      <div className="flex flex-wrap items-center space-x-4 text-sm text-gray-500 mt-1">
                        <div className="flex items-center space-x-1">
                          <FaEnvelope size={12} />
                          <span>{driver.personalInfo.email}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FaPhone size={12} />
                          <span>{driver.personalInfo.phone}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center space-x-4 text-sm text-gray-500 mt-1">
                        <div className="flex items-center space-x-1">
                          <FaStar className="text-yellow-500" />
                          <span>{driver.rating}</span>
                          <div className="flex ml-1">{getRatingStars(driver.rating)}</div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FaRoad size={12} />
                          <span>{driver.totalTrips} trips</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FaIdCard size={12} />
                          <span>{driver.licenseInfo.licenseNumber}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedDriver(driver)}
                  className="mt-3 sm:mt-0 px-4 py-2 bg-[#FF991C] text-white rounded-lg hover:bg-[#FF5C00] transition-colors"
                >
                  View Full Profile
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredDrivers.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <FaSearch className="text-gray-400 text-4xl mx-auto mb-3" />
            <p className="text-gray-500">No drivers found</p>
          </div>
        )}
      </div>

      {/* Driver Profile Modal - Fixed */}
      {selectedDriver && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40" onClick={() => setSelectedDriver(null)}></div>
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-5xl w-full max-h-[90vh] flex flex-col">
              {/* Fixed Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between rounded-t-xl flex-shrink-0">
                <h3 className="text-xl font-semibold text-gray-800">Driver Profile</h3>
                <button
                  onClick={() => setSelectedDriver(null)}
                  className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              {/* Profile Tabs - Fixed */}
              <div className="sticky top-[73px] bg-white border-b border-gray-200 px-6 flex-shrink-0 z-10">
                <div className="flex space-x-4 overflow-x-auto">
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`px-4 py-3 font-medium transition-all duration-200 whitespace-nowrap ${
                      activeTab === 'profile'
                        ? 'text-[#FF991C] border-b-2 border-[#FF991C]'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Profile Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('documents')}
                    className={`px-4 py-3 font-medium transition-all duration-200 whitespace-nowrap ${
                      activeTab === 'documents'
                        ? 'text-[#FF991C] border-b-2 border-[#FF991C]'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Documents & History
                  </button>
                  <button
                    onClick={() => setActiveTab('vehicles')}
                    className={`px-4 py-3 font-medium transition-all duration-200 whitespace-nowrap ${
                      activeTab === 'vehicles'
                        ? 'text-[#FF991C] border-b-2 border-[#FF991C]'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Vehicles
                  </button>
                  <button
                    onClick={() => setActiveTab('trips')}
                    className={`px-4 py-3 font-medium transition-all duration-200 whitespace-nowrap ${
                      activeTab === 'trips'
                        ? 'text-[#FF991C] border-b-2 border-[#FF991C]'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Recent Trips
                  </button>
                </div>
              </div>

              {/* Scrollable Content - Hide scrollbar */}
              <div className="flex-1 overflow-y-auto p-6" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <style jsx>{`
                  div::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>
                
                {/* Profile Overview Tab */}
                {activeTab === 'profile' && (
                  <div className="space-y-6">
                    {/* Personal Information */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                        <FaUserCircle className="text-[#FF991C]" />
                        <span>Personal Information</span>
                      </h4>
                      <div className="flex flex-wrap">
                        <div className="w-full md:w-1/2 mb-3">
                          <p className="text-xs text-gray-500">Full Name</p>
                          <p className="text-sm font-medium">{selectedDriver.personalInfo.fullName}</p>
                        </div>
                        <div className="w-full md:w-1/2 mb-3">
                          <p className="text-xs text-gray-500">Email</p>
                          <p className="text-sm font-medium">{selectedDriver.personalInfo.email}</p>
                        </div>
                        <div className="w-full md:w-1/2 mb-3">
                          <p className="text-xs text-gray-500">Phone</p>
                          <p className="text-sm font-medium">{selectedDriver.personalInfo.phone}</p>
                        </div>
                        <div className="w-full md:w-1/2 mb-3">
                          <p className="text-xs text-gray-500">Date of Birth</p>
                          <p className="text-sm font-medium">{selectedDriver.personalInfo.dateOfBirth}</p>
                        </div>
                        <div className="w-full md:w-1/2 mb-3">
                          <p className="text-xs text-gray-500">Gender</p>
                          <p className="text-sm font-medium">{selectedDriver.personalInfo.gender}</p>
                        </div>
                        <div className="w-full md:w-1/2 mb-3">
                          <p className="text-xs text-gray-500">Nationality</p>
                          <p className="text-sm font-medium">{selectedDriver.personalInfo.nationality}</p>
                        </div>
                        <div className="w-full mb-3">
                          <p className="text-xs text-gray-500">Address</p>
                          <p className="text-sm font-medium">{selectedDriver.personalInfo.address}</p>
                        </div>
                      </div>
                    </div>

                    {/* License Information */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                        <FaIdCard className="text-[#FF991C]" />
                        <span>License Information</span>
                      </h4>
                      <div className="flex flex-wrap">
                        <div className="w-full md:w-1/2 mb-3">
                          <p className="text-xs text-gray-500">License Number</p>
                          <p className="text-sm font-medium">{selectedDriver.licenseInfo.licenseNumber}</p>
                        </div>
                        <div className="w-full md:w-1/2 mb-3">
                          <p className="text-xs text-gray-500">License Type</p>
                          <p className="text-sm font-medium">{selectedDriver.licenseInfo.licenseType}</p>
                        </div>
                        <div className="w-full md:w-1/2 mb-3">
                          <p className="text-xs text-gray-500">Issue Date</p>
                          <p className="text-sm font-medium">{selectedDriver.licenseInfo.issueDate}</p>
                        </div>
                        <div className="w-full md:w-1/2 mb-3">
                          <p className="text-xs text-gray-500">Expiry Date</p>
                          <p className="text-sm font-medium">{selectedDriver.licenseInfo.expiryDate}</p>
                        </div>
                        <div className="w-full md:w-1/2 mb-3">
                          <p className="text-xs text-gray-500">Issuing Authority</p>
                          <p className="text-sm font-medium">{selectedDriver.licenseInfo.issuingAuthority}</p>
                        </div>
                        <div className="w-full md:w-1/2 mb-3">
                          <p className="text-xs text-gray-500">Status</p>
                          {getDocumentStatusBadge(selectedDriver.licenseInfo.status)}
                        </div>
                      </div>
                    </div>

                    {/* Statistics */}
                    <div className="flex flex-wrap">
                      <div className="w-full md:w-1/3 p-2">
                        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 text-center">
                          <FaStar className="text-yellow-500 text-2xl mx-auto mb-2" />
                          <p className="text-2xl font-bold text-gray-800">{selectedDriver.rating}</p>
                          <p className="text-xs text-gray-500">Rating</p>
                        </div>
                      </div>
                      <div className="w-full md:w-1/3 p-2">
                        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4 text-center">
                          <FaRoad className="text-blue-500 text-2xl mx-auto mb-2" />
                          <p className="text-2xl font-bold text-gray-800">{selectedDriver.totalTrips}</p>
                          <p className="text-xs text-gray-500">Total Trips</p>
                        </div>
                      </div>
                      <div className="w-full md:w-1/3 p-2">
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 text-center">
                          <FaDollarSign className="text-green-500 text-2xl mx-auto mb-2" />
                          <p className="text-2xl font-bold text-gray-800">${selectedDriver.totalEarnings}</p>
                          <p className="text-xs text-gray-500">Total Earnings</p>
                        </div>
                      </div>
                    </div>

                    {/* Status Information */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                        <FaClock className="text-[#FF991C]" />
                        <span>Status Information</span>
                      </h4>
                      <div className="flex flex-wrap">
                        <div className="w-full md:w-1/2 mb-3">
                          <p className="text-xs text-gray-500">Current Status</p>
                          {getStatusBadge(selectedDriver.currentOnlineStatus)}
                        </div>
                        <div className="w-full md:w-1/2 mb-3">
                          <p className="text-xs text-gray-500">Joined Date</p>
                          <p className="text-sm font-medium">{selectedDriver.joinedDate}</p>
                        </div>
                        <div className="w-full md:w-1/2 mb-3">
                          <p className="text-xs text-gray-500">Last Active</p>
                          <p className="text-sm font-medium">{selectedDriver.lastActive}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Documents Tab */}
                {activeTab === 'documents' && (
                  <div className="space-y-6">
                    {/* Uploaded Documents */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                        <FaFileAlt className="text-[#FF991C]" />
                        <span>Uploaded Documents</span>
                      </h4>
                      <div className="flex flex-wrap">
                        {Object.entries(selectedDriver.documents).map(([docType, doc]) => (
                          <div key={docType} className="w-full sm:w-1/2 lg:w-1/3 p-2">
                            <div className="bg-gray-50 rounded-lg p-3">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-2">
                                  <FaFilePdf className="text-red-500" />
                                  <span className="text-sm font-medium capitalize">{docType}</span>
                                </div>
                                {getDocumentStatusBadge(doc.status)}
                              </div>
                              <div className="flex items-center justify-between mt-2">
                                <p className="text-xs text-gray-500">Uploaded: {doc.uploadedAt}</p>
                                <button
                                  onClick={() => {
                                    setSelectedDocument(doc);
                                    setShowDocumentModal(true);
                                  }}
                                  className="text-[#FF991C] hover:text-[#FF5C00] text-sm flex items-center space-x-1"
                                >
                                  <FaEye size={12} />
                                  <span>View</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Document History */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                        <FaHistory className="text-[#FF991C]" />
                        <span>Document History</span>
                      </h4>
                      <div className="space-y-2">
                        {selectedDriver.documentHistory.map((history) => (
                          <div key={history.id} className="flex flex-wrap items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <FaFileAlt className="text-gray-400" />
                              <div>
                                <p className="text-sm font-medium">{history.documentType}</p>
                                <p className="text-xs text-gray-500">{history.action} on {history.date}</p>
                              </div>
                            </div>
                            {getDocumentStatusBadge(history.status)}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Vehicles Tab */}
                {activeTab === 'vehicles' && (
                  <div className="space-y-4">
                    {selectedDriver.vehicles.map((vehicle) => (
                      <div key={vehicle.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex flex-wrap items-start justify-between">
                          <div className="flex items-center space-x-3">
                            <FaCar className="text-[#FF991C] text-2xl" />
                            <div>
                              <h4 className="text-lg font-semibold text-gray-800">{vehicle.model} ({vehicle.year})</h4>
                              <div className="flex flex-wrap space-x-4 text-sm text-gray-500 mt-1">
                                <span>Plate: {vehicle.plateNumber}</span>
                                <span>Color: {vehicle.color}</span>
                                <span>Type: {vehicle.type}</span>
                              </div>
                            </div>
                          </div>
                          <div className="mt-2 sm:mt-0">
                            {vehicle.isPrimary && (
                              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium mr-2">
                                Primary Vehicle
                              </span>
                            )}
                            {vehicle.status === 'active' ? (
                              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                Active
                              </span>
                            ) : (
                              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                                Inactive
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Recent Trips Tab */}
                {activeTab === 'trips' && (
                  <div className="space-y-4">
                    {selectedDriver.recentTrips.map((trip) => (
                      <div key={trip.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex flex-wrap items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <FaCalendarAlt className="text-gray-400" />
                              <span className="text-sm text-gray-600">{trip.date}</span>
                            </div>
                            <div className="flex flex-wrap items-center space-x-4">
                              <div>
                                <p className="text-xs text-gray-500">From</p>
                                <p className="text-sm font-medium">{trip.from}</p>
                              </div>
                              <FaRoad className="text-gray-400" />
                              <div>
                                <p className="text-xs text-gray-500">To</p>
                                <p className="text-sm font-medium">{trip.to}</p>
                              </div>
                            </div>
                          </div>
                          <div className="text-right mt-2 sm:mt-0">
                            <p className="text-lg font-bold text-gray-800">${trip.fare}</p>
                            <div className="flex items-center mt-1">
                              {getRatingStars(trip.rating)}
                              <span className="text-xs text-gray-500 ml-1">({trip.rating})</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Document View Modal - Fixed */}
      {showDocumentModal && selectedDocument && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-40" onClick={() => setShowDocumentModal(false)}></div>
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                      <FaFilePdf className="w-5 h-5 text-orange-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Document Preview</h3>
                  </div>
                  <button
                    onClick={() => setShowDocumentModal(false)}
                    className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <FaTimes className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 mb-6 flex items-center justify-center border border-gray-200">
                  <div className="text-center">
                    <FaFilePdf className="text-6xl text-red-500 mx-auto mb-4" />
                    <p className="text-sm text-gray-600 font-medium mb-4">Document Preview</p>
                    <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 inline-flex items-center space-x-2 font-semibold shadow-lg hover:shadow-xl">
                      <FaDownload size={16} />
                      <span>Download Document</span>
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => setShowDocumentModal(false)}
                  className="w-full px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200 font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DriverProfile;