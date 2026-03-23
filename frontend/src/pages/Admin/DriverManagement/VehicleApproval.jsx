import React, { useState } from 'react';
import { 
  FaEye, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaClock, 
  FaCar,
  FaFileAlt,
  FaFilePdf,
  FaImage,
  FaDownload,
  FaUserCircle,
  FaPhone,
  FaEnvelope,
  FaCalendarAlt,
  FaRoad,
  FaGasPump,
  FaCog,
  FaSpinner,
  FaBell,
  FaTimes
} from 'react-icons/fa';

const VehicleApproval = () => {
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      driverName: "John Doe",
      driverEmail: "john.doe@example.com",
      driverPhone: "+1 234 567 8900",
      vehicle: {
        model: "Toyota Camry",
        year: "2022",
        plateNumber: "ABC-1234",
        color: "Black",
        type: "Sedan",
        seatingCapacity: 4,
        fuelType: "Petrol",
        transmission: "Automatic"
      },
      documents: {
        registration: {
          status: "pending",
          url: "registration.pdf",
          uploadedAt: "2024-01-15",
          documentNumber: "REG123456789"
        },
        insurance: {
          status: "pending",
          url: "insurance.pdf",
          uploadedAt: "2024-01-15",
          documentNumber: "INS987654321",
          expiryDate: "2025-01-15"
        },
        inspection: {
          status: "approved",
          url: "inspection.pdf",
          uploadedAt: "2024-01-10",
          documentNumber: "INSP456789"
        }
      },
      status: "pending",
      submittedAt: "2024-01-15"
    },
    {
      id: 2,
      driverName: "Jane Smith",
      driverEmail: "jane.smith@example.com",
      driverPhone: "+1 345 678 9012",
      vehicle: {
        model: "Honda Accord",
        year: "2023",
        plateNumber: "XYZ-7890",
        color: "White",
        type: "Sedan",
        seatingCapacity: 4,
        fuelType: "Petrol",
        transmission: "Automatic"
      },
      documents: {
        registration: {
          status: "approved",
          url: "registration_2.pdf",
          uploadedAt: "2024-02-10",
          documentNumber: "REG987654321"
        },
        insurance: {
          status: "pending",
          url: "insurance_2.pdf",
          uploadedAt: "2024-02-10",
          documentNumber: "INS123456789",
          expiryDate: "2025-02-10"
        },
        inspection: {
          status: "pending",
          url: "inspection_2.pdf",
          uploadedAt: "2024-02-10",
          documentNumber: "INSP789012"
        }
      },
      status: "pending",
      submittedAt: "2024-02-10"
    },
    {
      id: 3,
      driverName: "Mike Johnson",
      driverEmail: "mike.johnson@example.com",
      driverPhone: "+1 456 789 0123",
      vehicle: {
        model: "Tesla Model 3",
        year: "2023",
        plateNumber: "TES-1234",
        color: "Red",
        type: "Electric",
        seatingCapacity: 4,
        fuelType: "Electric",
        transmission: "Automatic"
      },
      documents: {
        registration: {
          status: "rejected",
          url: "registration_3.pdf",
          uploadedAt: "2024-03-01",
          documentNumber: "REG456789012",
          rejectionReason: "Document is blurry and incomplete"
        },
        insurance: {
          status: "pending",
          url: "insurance_3.pdf",
          uploadedAt: "2024-03-01",
          documentNumber: "INS456789012",
          expiryDate: "2025-03-01"
        },
        inspection: {
          status: "pending",
          url: "inspection_3.pdf",
          uploadedAt: "2024-03-01",
          documentNumber: "INSP123456"
        }
      },
      status: "pending",
      submittedAt: "2024-03-01"
    }
  ]);

  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [activeTab, setActiveTab] = useState('pending');

  const getStatusBadge = (status) => {
    switch(status) {
      case 'approved':
        return (
          <div className="flex items-center space-x-1">
            <FaCheckCircle className="text-green-500 text-xs" />
            <span className="text-xs font-medium text-green-700">Approved</span>
          </div>
        );
      case 'rejected':
        return (
          <div className="flex items-center space-x-1">
            <FaTimesCircle className="text-red-500 text-xs" />
            <span className="text-xs font-medium text-red-700">Rejected</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center space-x-1">
            <FaClock className="text-yellow-500 text-xs" />
            <span className="text-xs font-medium text-yellow-700">Pending</span>
          </div>
        );
    }
  };

  const getVehicleStatusBadge = (status) => {
    switch(status) {
      case 'active':
        return (
          <div className="flex items-center space-x-1 px-2 py-1 bg-green-100 rounded-full">
            <FaCheckCircle className="text-green-600 text-xs" />
            <span className="text-xs font-medium text-green-700">Active</span>
          </div>
        );
      case 'suspended':
        return (
          <div className="flex items-center space-x-1 px-2 py-1 bg-red-100 rounded-full">
            <FaTimesCircle className="text-red-600 text-xs" />
            <span className="text-xs font-medium text-red-700">Suspended</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center space-x-1 px-2 py-1 bg-yellow-100 rounded-full">
            <FaClock className="text-yellow-600 text-xs" />
            <span className="text-xs font-medium text-yellow-700">Pending</span>
          </div>
        );
    }
  };

  const filteredVehicles = vehicles.filter(vehicle => {
    if (activeTab === 'pending') return vehicle.status === 'pending';
    if (activeTab === 'approved') return vehicle.status === 'active';
    if (activeTab === 'suspended') return vehicle.status === 'suspended';
    return true;
  });

  const handleApproveVehicle = async () => {
    setLoading(true);
    setTimeout(() => {
      setVehicles(prevVehicles =>
        prevVehicles.map(vehicle =>
          vehicle.id === selectedVehicle.id
            ? { ...vehicle, status: 'active' }
            : vehicle
        )
      );
      setLoading(false);
      setShowApproveModal(false);
      setSelectedVehicle(null);
      showNotification('Vehicle approved successfully! Driver notified.', 'success');
    }, 1000);
  };

  const handleRejectVehicle = async () => {
    if (!rejectionReason.trim()) {
      alert('Please provide a reason for rejection');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setVehicles(prevVehicles =>
        prevVehicles.map(vehicle =>
          vehicle.id === selectedVehicle.id
            ? { ...vehicle, status: 'suspended', rejectionReason: rejectionReason }
            : vehicle
        )
      );
      setLoading(false);
      setShowRejectModal(false);
      setRejectionReason('');
      setSelectedVehicle(null);
      showNotification('Vehicle rejected. Driver notified with reason.', 'warning');
    }, 1000);
  };

  const handleApproveDocument = async (vehicleId, documentType) => {
    setLoading(true);
    setTimeout(() => {
      setVehicles(prevVehicles =>
        prevVehicles.map(vehicle => {
          if (vehicle.id === vehicleId) {
            const updatedDocuments = { ...vehicle.documents };
            updatedDocuments[documentType].status = 'approved';
            return { ...vehicle, documents: updatedDocuments };
          }
          return vehicle;
        })
      );
      setLoading(false);
      setShowDocumentModal(false);
      showNotification('Document approved successfully!', 'success');
    }, 800);
  };

  const handleRejectDocument = async () => {
    if (!rejectionReason.trim()) {
      alert('Please provide a reason for rejection');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setVehicles(prevVehicles =>
        prevVehicles.map(vehicle => {
          if (vehicle.id === selectedVehicle.id) {
            const updatedDocuments = { ...vehicle.documents };
            updatedDocuments[selectedDocument.type] = {
              ...updatedDocuments[selectedDocument.type],
              status: 'rejected',
              rejectionReason: rejectionReason
            };
            return { ...vehicle, documents: updatedDocuments };
          }
          return vehicle;
        })
      );
      setLoading(false);
      setShowRejectModal(false);
      setRejectionReason('');
      setSelectedDocument(null);
      setSelectedVehicle(null);
      showNotification('Document rejected. Driver notified for re-upload.', 'warning');
    }, 800);
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const openDocumentModal = (vehicle, documentType) => {
    setSelectedVehicle(vehicle);
    setSelectedDocument({ type: documentType });
    setShowDocumentModal(true);
  };

  const getDocumentTitle = (type) => {
    switch(type) {
      case 'registration': return 'Vehicle Registration';
      case 'insurance': return 'Insurance Certificate';
      case 'inspection': return 'Inspection Certificate';
      default: return type;
    }
  };

  const canApproveVehicle = (vehicle) => {
    return vehicle.documents.registration.status === 'approved' &&
           vehicle.documents.insurance.status === 'approved' &&
           vehicle.documents.inspection.status === 'approved';
  };

  return (
    <div className="">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Vehicle Approval Management</h1>
        <p className="text-gray-600 mt-1">Review registered vehicles and documents for approval</p>
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
          Pending ({vehicles.filter(v => v.status === 'pending').length})
        </button>
        <button
          onClick={() => setActiveTab('approved')}
          className={`px-4 py-2 font-medium transition-all duration-200 ${
            activeTab === 'approved'
              ? 'text-[#FF991C] border-b-2 border-[#FF991C]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Approved ({vehicles.filter(v => v.status === 'active').length})
        </button>
        <button
          onClick={() => setActiveTab('suspended')}
          className={`px-4 py-2 font-medium transition-all duration-200 ${
            activeTab === 'suspended'
              ? 'text-[#FF991C] border-b-2 border-[#FF991C]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Rejected ({vehicles.filter(v => v.status === 'suspended').length})
        </button>
      </div>

      {/* Vehicles List */}
      <div className="space-y-6">
        {filteredVehicles.map((vehicle) => (
          <div key={vehicle.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            {/* Driver Header */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 border-b border-gray-200">
              <div className="flex flex-wrap items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-[#FF991C] to-[#FF5C00] flex items-center justify-center">
                    <FaUserCircle className="text-white text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{vehicle.driverName}</h3>
                    <div className="flex flex-wrap items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <FaEnvelope size={12} />
                        <span>{vehicle.driverEmail}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FaPhone size={12} />
                        <span>{vehicle.driverPhone}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FaCalendarAlt size={12} />
                        <span>Submitted: {vehicle.submittedAt}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-2 sm:mt-0">
                  {getVehicleStatusBadge(vehicle.status)}
                </div>
              </div>
            </div>

            {/* Vehicle Details */}
            <div className="p-4">
              <div className="flex flex-wrap">
                <div className="w-full p-3">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <FaCar className="text-[#FF991C]" />
                      <h4 className="font-semibold text-gray-700">Vehicle Information</h4>
                    </div>
                    <div className="flex flex-wrap">
                      <div className="w-full md:w-1/3 mb-3">
                        <p className="text-xs text-gray-500">Model</p>
                        <p className="text-sm font-medium">{vehicle.vehicle.model} ({vehicle.vehicle.year})</p>
                      </div>
                      <div className="w-full md:w-1/3 mb-3">
                        <p className="text-xs text-gray-500">Plate Number</p>
                        <p className="text-sm font-medium">{vehicle.vehicle.plateNumber}</p>
                      </div>
                      <div className="w-full md:w-1/3 mb-3">
                        <p className="text-xs text-gray-500">Color</p>
                        <p className="text-sm font-medium">{vehicle.vehicle.color}</p>
                      </div>
                      <div className="w-full md:w-1/3 mb-3">
                        <p className="text-xs text-gray-500">Vehicle Type</p>
                        <p className="text-sm font-medium">{vehicle.vehicle.type}</p>
                      </div>
                      <div className="w-full md:w-1/3 mb-3">
                        <p className="text-xs text-gray-500">Seating Capacity</p>
                        <p className="text-sm font-medium">{vehicle.vehicle.seatingCapacity} seats</p>
                      </div>
                      <div className="w-full md:w-1/3 mb-3">
                        <p className="text-xs text-gray-500">Fuel Type</p>
                        <p className="text-sm font-medium">{vehicle.vehicle.fuelType}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Documents Section */}
              <div className="flex flex-wrap mt-2">
                {/* Registration Document */}
                <div className="w-full md:w-1/3 p-3">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <FaFilePdf className="text-[#FF991C]" />
                      <h4 className="font-semibold text-gray-700">Registration</h4>
                    </div>
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center justify-between p-2 bg-white rounded">
                        <div className="flex items-center space-x-2">
                          <FaFilePdf className="text-red-500" />
                          <span className="text-sm">Registration Certificate</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusBadge(vehicle.documents.registration.status)}
                          <button
                            onClick={() => openDocumentModal(vehicle, 'registration')}
                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                          >
                            <FaEye className="text-blue-500" />
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">Doc No: {vehicle.documents.registration.documentNumber}</p>
                      {vehicle.documents.registration.status === 'rejected' && (
                        <div className="p-2 bg-red-50 rounded text-xs text-red-600 flex items-center space-x-1">
                          <FaTimesCircle />
                          <span>Reason: {vehicle.documents.registration.rejectionReason}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Insurance Document */}
                <div className="w-full md:w-1/3 p-3">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <FaFilePdf className="text-[#FF991C]" />
                      <h4 className="font-semibold text-gray-700">Insurance</h4>
                    </div>
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center justify-between p-2 bg-white rounded">
                        <div className="flex items-center space-x-2">
                          <FaFilePdf className="text-blue-500" />
                          <span className="text-sm">Insurance Certificate</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusBadge(vehicle.documents.insurance.status)}
                          <button
                            onClick={() => openDocumentModal(vehicle, 'insurance')}
                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                          >
                            <FaEye className="text-blue-500" />
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">Policy No: {vehicle.documents.insurance.documentNumber}</p>
                      <p className="text-xs text-gray-500">Expires: {vehicle.documents.insurance.expiryDate}</p>
                      {vehicle.documents.insurance.status === 'rejected' && (
                        <div className="p-2 bg-red-50 rounded text-xs text-red-600 flex items-center space-x-1">
                          <FaTimesCircle />
                          <span>Reason: {vehicle.documents.insurance.rejectionReason}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Inspection Document */}
                <div className="w-full md:w-1/3 p-3">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <FaFileAlt className="text-[#FF991C]" />
                      <h4 className="font-semibold text-gray-700">Inspection</h4>
                    </div>
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center justify-between p-2 bg-white rounded">
                        <div className="flex items-center space-x-2">
                          <FaFileAlt className="text-green-500" />
                          <span className="text-sm">Inspection Report</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusBadge(vehicle.documents.inspection.status)}
                          <button
                            onClick={() => openDocumentModal(vehicle, 'inspection')}
                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                          >
                            <FaEye className="text-blue-500" />
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">Report No: {vehicle.documents.inspection.documentNumber}</p>
                      {vehicle.documents.inspection.status === 'rejected' && (
                        <div className="p-2 bg-red-50 rounded text-xs text-red-600 flex items-center space-x-1">
                          <FaTimesCircle />
                          <span>Reason: {vehicle.documents.inspection.rejectionReason}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Vehicle Approval Actions */}
              {vehicle.status === 'pending' && (
                <div className="flex flex-wrap space-x-3 mt-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => {
                      if (canApproveVehicle(vehicle)) {
                        setSelectedVehicle(vehicle);
                        setShowApproveModal(true);
                      } else {
                        showNotification('Please approve all documents first before approving the vehicle.', 'warning');
                      }
                    }}
                    disabled={!canApproveVehicle(vehicle)}
                    className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                      canApproveVehicle(vehicle)
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <FaCheckCircle className="mr-2" />
                    Approve Vehicle
                  </button>
                  <button
                    onClick={() => {
                      setSelectedVehicle(vehicle);
                      setShowRejectModal(true);
                    }}
                    className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <FaTimesCircle className="mr-2" />
                    Reject Vehicle
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Document View Modal */}
      {showDocumentModal && selectedVehicle && selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {getDocumentTitle(selectedDocument.type)}
                </h3>
                <button
                  onClick={() => setShowDocumentModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes size={24} />
                </button>
              </div>
              
              <div className="bg-gray-100 rounded-lg p-8 mb-4 flex items-center justify-center">
                <div className="text-center">
                  <FaFilePdf className="text-6xl text-red-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Document Preview</p>
                  <button className="mt-2 px-4 py-2 bg-[#FF991C] text-white rounded-lg hover:bg-[#FF5C00] transition-colors inline-flex items-center space-x-2">
                    <FaDownload size={14} />
                    <span>Download Document</span>
                  </button>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setShowDocumentModal(false);
                    setShowRejectModal(true);
                  }}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <FaTimesCircle />
                  <span>Reject Document</span>
                </button>
                <button
                  onClick={() => handleApproveDocument(selectedVehicle.id, selectedDocument.type)}
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {loading ? <FaSpinner className="animate-spin" /> : <FaCheckCircle />}
                  <span>Approve Document</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Vehicle Approval Modal */}
      {showApproveModal && selectedVehicle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <FaCar className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Approve Vehicle</h3>
              <p className="text-sm text-gray-500 mb-4">
                Are you sure you want to approve this vehicle for <span className="font-semibold">{selectedVehicle.driverName}</span>? 
                This will activate the vehicle and make it available for dispatch.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowApproveModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleApproveVehicle}
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  {loading ? <FaSpinner className="animate-spin mx-auto" /> : 'Yes, Approve'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <FaTimesCircle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {selectedDocument ? 'Reject Document' : 'Reject Vehicle'}
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Please provide a reason for rejection. The driver will be notified.
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
                  onClick={selectedDocument ? handleRejectDocument : handleRejectVehicle}
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {loading ? <FaSpinner className="animate-spin mx-auto" /> : 'Reject'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleApproval;