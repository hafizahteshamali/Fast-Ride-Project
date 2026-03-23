import React, { useState } from 'react';
import { 
  FaCheckCircle, 
  FaTimesCircle, 
  FaUserCheck, 
  FaUserTimes,
  FaIdCard,
  FaCar,
  FaFileAlt,
  FaCalendarAlt,
  FaStar,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaEye,
  FaDownload,
  FaComments,
  FaBan,
  FaShieldAlt
} from 'react-icons/fa';

const DriverApproval = () => {
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [drivers, setDrivers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 234 567 8900",
      address: "123 Main St, New York, NY 10001",
      licenseNumber: "DL123456789",
      cnic: "12345-6789012-3",
      insuranceNumber: "INS987654321",
      vehicleModel: "Toyota Camry 2022",
      vehiclePlate: "ABC-1234",
      rating: 4.8,
      totalRides: 156,
      joinDate: "2024-01-15",
      status: "pending",
      documents: {
        license: "license_front.jpg",
        licenseBack: "license_back.jpg",
        cnicFront: "cnic_front.jpg",
        cnicBack: "cnic_back.jpg",
        insurance: "insurance_doc.pdf",
        vehiclePhoto: "vehicle_photo.jpg"
      }
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+1 345 678 9012",
      address: "456 Oak Ave, Los Angeles, CA 90001",
      licenseNumber: "DL987654321",
      cnic: "54321-9876543-2",
      insuranceNumber: "INS123456789",
      vehicleModel: "Honda Accord 2023",
      vehiclePlate: "XYZ-7890",
      rating: 4.9,
      totalRides: 203,
      joinDate: "2024-02-10",
      status: "pending",
      documents: {
        license: "license_front_2.jpg",
        licenseBack: "license_back_2.jpg",
        cnicFront: "cnic_front_2.jpg",
        cnicBack: "cnic_back_2.jpg",
        insurance: "insurance_doc_2.pdf",
        vehiclePhoto: "vehicle_photo_2.jpg"
      }
    }
  ]);

  const [activeTab, setActiveTab] = useState('pending');

  const filteredDrivers = drivers.filter(driver => {
    if (activeTab === 'pending') return driver.status === 'pending';
    if (activeTab === 'approved') return driver.status === 'active';
    if (activeTab === 'suspended') return driver.status === 'suspended';
    return true;
  });

  const handleApprove = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setDrivers(prevDrivers =>
        prevDrivers.map(driver =>
          driver.id === selectedDriver.id
            ? { ...driver, status: 'active' }
            : driver
        )
      );
      setLoading(false);
      setShowApproveModal(false);
      setSelectedDriver(null);
    }, 1000);
  };

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      alert('Please provide a reason for rejection');
      return;
    }
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setDrivers(prevDrivers =>
        prevDrivers.map(driver =>
          driver.id === selectedDriver.id
            ? { ...driver, status: 'suspended', rejectionReason: rejectionReason }
            : driver
        )
      );
      setLoading(false);
      setShowRejectModal(false);
      setRejectionReason('');
      setSelectedDriver(null);
    }, 1000);
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'active':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Approved</span>;
      case 'suspended':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">Rejected</span>;
      default:
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>;
    }
  };

  return (
    <div className="">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Driver Approval Management</h1>
        <p className="text-gray-600 mt-1">Review driver profiles and documents for approval</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('pending')}
          className={`px-4 py-2 font-medium transition-all duration-200 ${
            activeTab === 'pending'
              ? 'text-[#FF991C] border-b-2 border-[#FF991C]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Pending ({drivers.filter(d => d.status === 'pending').length})
        </button>
        <button
          onClick={() => setActiveTab('approved')}
          className={`px-4 py-2 font-medium transition-all duration-200 ${
            activeTab === 'approved'
              ? 'text-[#FF991C] border-b-2 border-[#FF991C]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Approved ({drivers.filter(d => d.status === 'active').length})
        </button>
        <button
          onClick={() => setActiveTab('suspended')}
          className={`px-4 py-2 font-medium transition-all duration-200 ${
            activeTab === 'suspended'
              ? 'text-[#FF991C] border-b-2 border-[#FF991C]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Rejected ({drivers.filter(d => d.status === 'suspended').length})
        </button>
      </div>

      {/* Drivers List */}
      <div className="space-y-4">
        {filteredDrivers.map((driver) => (
          <div key={driver.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-[#FF991C] to-[#FF5C00] flex items-center justify-center">
                      <span className="text-white font-bold text-lg">{driver.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{driver.name}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        {getStatusBadge(driver.status)}
                        <div className="flex items-center text-yellow-500">
                          <FaStar className="text-sm" />
                          <span className="text-sm text-gray-600 ml-1">{driver.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-2">
                      <div className="flex items-center text-gray-600">
                        <FaEnvelope className="w-4 h-4 mr-2" />
                        <span className="text-sm">{driver.email}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <FaPhone className="w-4 h-4 mr-2" />
                        <span className="text-sm">{driver.phone}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <FaMapMarkerAlt className="w-4 h-4 mr-2" />
                        <span className="text-sm">{driver.address}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <FaCalendarAlt className="w-4 h-4 mr-2" />
                        <span className="text-sm">Joined: {driver.joinDate}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center text-gray-600">
                        <FaIdCard className="w-4 h-4 mr-2" />
                        <span className="text-sm">License: {driver.licenseNumber}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <FaFileAlt className="w-4 h-4 mr-2" />
                        <span className="text-sm">CNIC: {driver.cnic}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <FaShieldAlt className="w-4 h-4 mr-2" />
                        <span className="text-sm">Insurance: {driver.insuranceNumber}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <FaCar className="w-4 h-4 mr-2" />
                        <span className="text-sm">{driver.vehicleModel} ({driver.vehiclePlate})</span>
                      </div>
                    </div>
                  </div>

                  {/* Documents Section */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Documents</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                      <button className="flex flex-col items-center p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <FaEye className="text-[#FF991C] mb-1" />
                        <span className="text-xs text-gray-600">License Front</span>
                      </button>
                      <button className="flex flex-col items-center p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <FaEye className="text-[#FF991C] mb-1" />
                        <span className="text-xs text-gray-600">License Back</span>
                      </button>
                      <button className="flex flex-col items-center p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <FaEye className="text-[#FF991C] mb-1" />
                        <span className="text-xs text-gray-600">CNIC Front</span>
                      </button>
                      <button className="flex flex-col items-center p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <FaEye className="text-[#FF991C] mb-1" />
                        <span className="text-xs text-gray-600">CNIC Back</span>
                      </button>
                      <button className="flex flex-col items-center p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <FaEye className="text-[#FF991C] mb-1" />
                        <span className="text-xs text-gray-600">Insurance</span>
                      </button>
                      <button className="flex flex-col items-center p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <FaEye className="text-[#FF991C] mb-1" />
                        <span className="text-xs text-gray-600">Vehicle Photo</span>
                      </button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {driver.status === 'pending' && (
                    <div className="flex space-x-3 mt-4 pt-4 border-t border-gray-200">
                      <button
                        onClick={() => {
                          setSelectedDriver(driver);
                          setShowApproveModal(true);
                        }}
                        className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <FaCheckCircle className="mr-2" />
                        Approve Driver
                      </button>
                      <button
                        onClick={() => {
                          setSelectedDriver(driver);
                          setShowRejectModal(true);
                        }}
                        className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <FaTimesCircle className="mr-2" />
                        Reject Driver
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Approve Modal */}
      {showApproveModal && selectedDriver && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <FaUserCheck className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Approve Driver</h3>
              <p className="text-sm text-gray-500 mb-4">
                Are you sure you want to approve <span className="font-semibold">{selectedDriver.name}</span>? 
                This will activate their account and allow them to start taking rides.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowApproveModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleApprove}
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Processing...' : 'Yes, Approve'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && selectedDriver && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <FaUserTimes className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Reject Driver Application</h3>
              <p className="text-sm text-gray-500 mb-4">
                Please provide a reason for rejecting <span className="font-semibold">{selectedDriver.name}</span>
              </p>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Enter rejection reason..."
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 mb-4"
              />
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setShowRejectModal(false);
                    setRejectionReason('');
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReject}
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Processing...' : 'Yes, Reject'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DriverApproval;