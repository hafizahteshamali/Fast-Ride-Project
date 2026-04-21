import React, { useState } from 'react';
import { 
  FaEye, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaClock, 
  FaFileAlt,
  FaIdCard,
  FaCar,
  FaFilePdf,
  FaImage,
  FaDownload,
  FaUserCircle,
  FaPhone,
  FaEnvelope,
  FaUpload,
  FaBell,
  FaSpinner
} from 'react-icons/fa';

const DocumentVerification = () => {
  const [drivers, setDrivers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 234 567 8900",
      documents: {
        license: { 
          front: { status: "pending", url: "license_front.jpg", uploadedAt: "2024-01-15" },
          back: { status: "approved", url: "license_back.jpg", uploadedAt: "2024-01-15" }
        },
        cnic: { 
          front: { status: "pending", url: "cnic_front.jpg", uploadedAt: "2024-01-15" },
          back: { status: "pending", url: "cnic_back.jpg", uploadedAt: "2024-01-15" }
        },
        insurance: { status: "rejected", url: "insurance.pdf", uploadedAt: "2024-01-15", rejectionReason: "Document is blurry" },
        vehiclePhoto: { status: "pending", url: "vehicle.jpg", uploadedAt: "2024-01-15" }
      }
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+1 345 678 9012",
      documents: {
        license: { 
          front: { status: "approved", url: "license_front_2.jpg", uploadedAt: "2024-02-10" },
          back: { status: "approved", url: "license_back_2.jpg", uploadedAt: "2024-02-10" }
        },
        cnic: { 
          front: { status: "approved", url: "cnic_front_2.jpg", uploadedAt: "2024-02-10" },
          back: { status: "approved", url: "cnic_back_2.jpg", uploadedAt: "2024-02-10" }
        },
        insurance: { status: "pending", url: "insurance_2.pdf", uploadedAt: "2024-02-10" },
        vehiclePhoto: { status: "pending", url: "vehicle_2.jpg", uploadedAt: "2024-02-10" }
      }
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@example.com",
      phone: "+1 456 789 0123",
      documents: {
        license: { 
          front: { status: "rejected", url: "license_front_3.jpg", uploadedAt: "2024-03-01", rejectionReason: "Document expired" },
          back: { status: "rejected", url: "license_back_3.jpg", uploadedAt: "2024-03-01", rejectionReason: "Document expired" }
        },
        cnic: { 
          front: { status: "pending", url: "cnic_front_3.jpg", uploadedAt: "2024-03-01" },
          back: { status: "pending", url: "cnic_back_3.jpg", uploadedAt: "2024-03-01" }
        },
        insurance: { status: "pending", url: "insurance_3.pdf", uploadedAt: "2024-03-01" },
        vehiclePhoto: { status: "pending", url: "vehicle_3.jpg", uploadedAt: "2024-03-01" }
      }
    }
  ]);

  const [selectedDriver, setSelectedDriver] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

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

  const handleApproveDocument = async (driverId, documentType, subType = null) => {
    setLoading(true);
    setTimeout(() => {
      setDrivers(prevDrivers =>
        prevDrivers.map(driver => {
          if (driver.id === driverId) {
            const updatedDocuments = { ...driver.documents };
            if (subType) {
              updatedDocuments[documentType][subType].status = 'approved';
            } else {
              updatedDocuments[documentType].status = 'approved';
            }
            return { ...driver, documents: updatedDocuments };
          }
          return driver;
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
      setDrivers(prevDrivers =>
        prevDrivers.map(driver => {
          if (driver.id === selectedDriver.id) {
            const updatedDocuments = { ...driver.documents };
            if (selectedDocument.subType) {
              updatedDocuments[selectedDocument.type][selectedDocument.subType] = {
                ...updatedDocuments[selectedDocument.type][selectedDocument.subType],
                status: 'rejected',
                rejectionReason: rejectionReason
              };
            } else {
              updatedDocuments[selectedDocument.type] = {
                ...updatedDocuments[selectedDocument.type],
                status: 'rejected',
                rejectionReason: rejectionReason
              };
            }
            
            // Trigger re-upload notification
            triggerReuploadNotification(selectedDriver, selectedDocument);
            
            return { ...driver, documents: updatedDocuments };
          }
          return driver;
        })
      );
      setLoading(false);
      setShowRejectModal(false);
      setRejectionReason('');
      setSelectedDocument(null);
      setSelectedDriver(null);
      showNotification('Document rejected. Driver notified for re-upload.', 'warning');
    }, 800);
  };

  const triggerReuploadNotification = (driver, document) => {
    const documentName = document.subType 
      ? `${document.type.toUpperCase()} (${document.subType})`
      : document.type.toUpperCase();
    
    console.log(`Notification sent to ${driver.name}: Please re-upload ${documentName}`);
    // In real app, this would be an API call to send notification
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const openDocumentModal = (driver, documentType, subType = null) => {
    setSelectedDriver(driver);
    setSelectedDocument({ type: documentType, subType });
    setShowDocumentModal(true);
  };

  const getDocumentTitle = (type, subType) => {
    if (subType) return `${type.toUpperCase()} - ${subType.toUpperCase()}`;
    return type.toUpperCase();
  };

  const getDocumentStatus = (driver, type, subType = null) => {
    if (subType) {
      return driver.documents[type][subType]?.status || 'pending';
    }
    return driver.documents[type]?.status || 'pending';
  };

  const getRejectionReason = (driver, type, subType = null) => {
    if (subType) {
      return driver.documents[type][subType]?.rejectionReason;
    }
    return driver.documents[type]?.rejectionReason;
  };

  return (
    <div className="">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Document Verification</h1>
        <p className="text-gray-600 mt-1">Review and verify driver documents</p>
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

      {/* Drivers List */}
      <div className="space-y-6">
        {drivers.map((driver) => (
          <div key={driver.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            {/* Driver Header */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 border-b border-gray-200">
              <div className="flex flex-wrap items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-[#FF991C] to-[#FF5C00] flex items-center justify-center">
                    <FaUserCircle className="text-white text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{driver.name}</h3>
                    <div className="flex flex-wrap items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <FaEnvelope size={12} />
                        <span>{driver.email}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FaPhone size={12} />
                        <span>{driver.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Documents Grid - Using Flex instead of Grid */}
            <div className="p-4">
              <div className="flex flex-wrap">
                {/* License Documents */}
                <div className="w-full lg:w-1/2 p-3">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <FaIdCard className="text-[#FF991C]" />
                      <h4 className="font-semibold text-gray-700">License Documents</h4>
                    </div>
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center justify-between p-2 bg-white rounded">
                        <div className="flex items-center space-x-3">
                          <FaFileAlt className="text-gray-500" />
                          <span className="text-sm">License Front</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusBadge(getDocumentStatus(driver, 'license', 'front'))}
                          <button
                            onClick={() => openDocumentModal(driver, 'license', 'front')}
                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                          >
                            <FaEye className="text-blue-500" />
                          </button>
                          {getDocumentStatus(driver, 'license', 'front') === 'pending' && (
                            <button
                              onClick={() => handleApproveDocument(driver.id, 'license', 'front')}
                              disabled={loading}
                              className="px-2 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600 transition-colors disabled:opacity-50"
                            >
                              Approve
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center justify-between p-2 bg-white rounded">
                        <div className="flex items-center space-x-3">
                          <FaFileAlt className="text-gray-500" />
                          <span className="text-sm">License Back</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusBadge(getDocumentStatus(driver, 'license', 'back'))}
                          <button
                            onClick={() => openDocumentModal(driver, 'license', 'back')}
                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                          >
                            <FaEye className="text-blue-500" />
                          </button>
                          {getDocumentStatus(driver, 'license', 'back') === 'pending' && (
                            <button
                              onClick={() => handleApproveDocument(driver.id, 'license', 'back')}
                              disabled={loading}
                              className="px-2 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600 transition-colors disabled:opacity-50"
                            >
                              Approve
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CNIC Documents */}
                <div className="w-full lg:w-1/2 p-3">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <FaIdCard className="text-[#FF991C]" />
                      <h4 className="font-semibold text-gray-700">CNIC Documents</h4>
                    </div>
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center justify-between p-2 bg-white rounded">
                        <div className="flex items-center space-x-3">
                          <FaFileAlt className="text-gray-500" />
                          <span className="text-sm">CNIC Front</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusBadge(getDocumentStatus(driver, 'cnic', 'front'))}
                          <button
                            onClick={() => openDocumentModal(driver, 'cnic', 'front')}
                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                          >
                            <FaEye className="text-blue-500" />
                          </button>
                          {getDocumentStatus(driver, 'cnic', 'front') === 'pending' && (
                            <button
                              onClick={() => handleApproveDocument(driver.id, 'cnic', 'front')}
                              disabled={loading}
                              className="px-2 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600 transition-colors disabled:opacity-50"
                            >
                              Approve
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center justify-between p-2 bg-white rounded">
                        <div className="flex items-center space-x-3">
                          <FaFileAlt className="text-gray-500" />
                          <span className="text-sm">CNIC Back</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusBadge(getDocumentStatus(driver, 'cnic', 'back'))}
                          <button
                            onClick={() => openDocumentModal(driver, 'cnic', 'back')}
                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                          >
                            <FaEye className="text-blue-500" />
                          </button>
                          {getDocumentStatus(driver, 'cnic', 'back') === 'pending' && (
                            <button
                              onClick={() => handleApproveDocument(driver.id, 'cnic', 'back')}
                              disabled={loading}
                              className="px-2 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600 transition-colors disabled:opacity-50"
                            >
                              Approve
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Insurance Document */}
                <div className="w-full lg:w-1/2 p-3">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <FaFilePdf className="text-[#FF991C]" />
                      <h4 className="font-semibold text-gray-700">Insurance Document</h4>
                    </div>
                    <div className="flex flex-wrap items-center justify-between p-2 bg-white rounded">
                      <div className="flex items-center space-x-3">
                        <FaFilePdf className="text-red-500" />
                        <span className="text-sm">Insurance Certificate</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(driver.documents.insurance.status)}
                        <button
                          onClick={() => openDocumentModal(driver, 'insurance')}
                          className="p-1 hover:bg-gray-200 rounded transition-colors"
                        >
                          <FaEye className="text-blue-500" />
                        </button>
                        {driver.documents.insurance.status === 'pending' && (
                          <button
                            onClick={() => handleApproveDocument(driver.id, 'insurance')}
                            disabled={loading}
                            className="px-2 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600 transition-colors disabled:opacity-50"
                          >
                            Approve
                          </button>
                        )}
                      </div>
                    </div>
                    {driver.documents.insurance.status === 'rejected' && (
                      <div className="mt-2 p-2 bg-red-50 rounded text-xs text-red-600 flex items-center space-x-1">
                        <FaTimesCircle />
                        <span>Reason: {driver.documents.insurance.rejectionReason}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Vehicle Photo */}
                <div className="w-full lg:w-1/2 p-3">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <FaCar className="text-[#FF991C]" />
                      <h4 className="font-semibold text-gray-700">Vehicle Photo</h4>
                    </div>
                    <div className="flex flex-wrap items-center justify-between p-2 bg-white rounded">
                      <div className="flex items-center space-x-3">
                        <FaImage className="text-purple-500" />
                        <span className="text-sm">Vehicle Image</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(driver.documents.vehiclePhoto.status)}
                        <button
                          onClick={() => openDocumentModal(driver, 'vehiclePhoto')}
                          className="p-1 hover:bg-gray-200 rounded transition-colors"
                        >
                          <FaEye className="text-blue-500" />
                        </button>
                        {driver.documents.vehiclePhoto.status === 'pending' && (
                          <button
                            onClick={() => handleApproveDocument(driver.id, 'vehiclePhoto')}
                            disabled={loading}
                            className="px-2 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600 transition-colors disabled:opacity-50"
                          >
                            Approve
                          </button>
                        )}
                      </div>
                    </div>
                    {driver.documents.vehiclePhoto.status === 'rejected' && (
                      <div className="mt-2 p-2 bg-red-50 rounded text-xs text-red-600 flex items-center space-x-1">
                        <FaTimesCircle />
                        <span>Reason: {driver.documents.vehiclePhoto.rejectionReason}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Document View Modal */}
      {showDocumentModal && selectedDriver && selectedDocument && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-40 modal-enter"></div>
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 modal-content-enter">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-gray-200 modal-scroll">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {getDocumentTitle(selectedDocument.type, selectedDocument.subType)}
                  </h3>
                  <button
                    onClick={() => setShowDocumentModal(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
                  >
                    <FaTimesCircle size={24} />
                  </button>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 mb-6 flex items-center justify-center border border-gray-200">
                  <div className="text-center">
                    <FaFileAlt className="text-6xl text-gray-400 mx-auto mb-4" />
                    <p className="text-lg text-gray-600 mb-4">Document Preview</p>
                    <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 inline-flex items-center space-x-2 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105">
                      <FaDownload size={16} />
                      <span>Download Document</span>
                    </button>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => {
                      setShowDocumentModal(false);
                      setShowRejectModal(true);
                    }}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center space-x-2"
                  >
                    <FaTimesCircle />
                    <span>Reject</span>
                  </button>
                  <button
                    onClick={() => {
                      if (selectedDocument.subType) {
                        handleApproveDocument(selectedDriver.id, selectedDocument.type, selectedDocument.subType);
                      } else {
                        handleApproveDocument(selectedDriver.id, selectedDocument.type);
                      }
                    }}
                    disabled={loading}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:transform-none"
                  >
                    {loading ? <FaSpinner className="w-5 h-5 animate-spin" /> : <FaCheckCircle />}
                    <span>Approve</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Reject Modal with Reason */}
      {showRejectModal && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-40 modal-enter"></div>
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 modal-content-enter">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-gray-200">
              <div className="text-center p-8">
                <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center mb-6 shadow-lg">
                  <FaTimesCircle className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Reject Document</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Please provide a reason for rejecting this document. The driver will be notified to re-upload.
                </p>
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Enter detailed rejection reason (e.g., Document blurry, expired, incorrect format)..."
                  rows="4"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:border-red-500 mb-6 resize-none transition-all duration-200"
                />
                <div className="flex space-x-4">
                  <button
                    onClick={() => {
                      setShowRejectModal(false);
                      setRejectionReason('');
                    }}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200 font-semibold transform hover:scale-105"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleRejectDocument}
                    disabled={loading || !rejectionReason.trim()}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:transform-none flex items-center justify-center space-x-2"
                  >
                    {loading ? <FaSpinner className="w-5 h-5 animate-spin" /> : <FaTimesCircle />}
                    <span>Reject Document</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DocumentVerification;