import React, { useState, useEffect } from 'react';
import {
  FaIdCard,
  FaFileContract,
  FaFileAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner,
  FaSearch,
  FaDownload,
  FaEye,
  FaPrint,
  FaShare,
  FaTimes,
  FaArrowLeft,
  FaExpand,
  FaCompress,
  FaBars,
  FaInfoCircle,
  FaChartLine,
  FaUser,
  FaTruck,
  FaCalendarAlt,
  FaFilePdf,
  FaFileImage,
  FaFile,
  FaThumbsUp,
  FaThumbsDown,
  FaComment,
  FaHistory,
  FaCheck,
  FaExclamationTriangle,
  FaTrash,
  FaEdit,
  FaPlus,
  FaMinus,
  FaChevronLeft,
  FaChevronRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaMotorcycle,
  FaCar,
  FaCertificate,
  FaClipboardList,
  FaAmbulance,
  FaFirstAid
} from 'react-icons/fa';

const DriverDocumentView = () => {
  const [drivers, setDrivers] = useState([]);
  const [filteredDrivers, setFilteredDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewAction, setReviewAction] = useState(null);
  const [processingReview, setProcessingReview] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(null);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDocumentType, setFilterDocumentType] = useState('all');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // UI states
  const [isMobileView, setIsMobileView] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [fullscreenMode, setFullscreenMode] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  const [viewMode, setViewMode] = useState('cards');
  const [showStats, setShowStats] = useState(true);
  
  // Stats
  const [stats, setStats] = useState({
    totalDrivers: 0,
    documentsUploaded: 0,
    documentsPending: 0,
    documentsApproved: 0,
    documentsRejected: 0,
    approvalRate: 0
  });

  // Document types - Using only icons that exist
  const documentTypes = [
    { id: 'license', name: 'Driver License', icon: FaIdCard, required: true },
    { id: 'cnic', name: 'CNIC', icon: FaIdCard, required: true },
    { id: 'insurance', name: 'Insurance', icon: FaFileContract, required: true },
    { id: 'vehicleRegistration', name: 'Vehicle Registration', icon: FaCar, required: false },
    { id: 'medicalCertificate', name: 'Medical Certificate', icon: FaFirstAid, required: false },
    { id: 'backgroundCheck', name: 'Background Check', icon: FaClipboardList, required: false }
  ];

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setIsMobileView(isMobile);
      if (isMobile) {
        setSidebarOpen(false);
      } else {
        setShowFilters(true);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch drivers data
  useEffect(() => {
    fetchDriversData();
  }, []);

  const fetchDriversData = async () => {
    setLoading(true);
    setTimeout(() => {
      const mockDrivers = generateMockDrivers(25);
      setDrivers(mockDrivers);
      setFilteredDrivers(mockDrivers);
      calculateStats(mockDrivers);
      setLoading(false);
    }, 1000);
  };

  const generateMockDrivers = (count) => {
    const drivers = [];
    const names = [
      'Michael Rodriguez', 'Emily Chen', 'David Kim', 'Lisa Wang', 'James Wilson',
      'Maria Garcia', 'Robert Taylor', 'Jennifer Brown', 'William Davis', 'Patricia Miller',
      'John Anderson', 'Sarah Williams', 'Michael Brown', 'Emily Davis', 'David Wilson'
    ];
    
    const statuses = ['pending', 'approved', 'rejected', 'in_review'];
    
    for (let i = 0; i < count; i++) {
      const name = names[i % names.length] + (i > 14 ? ` ${Math.floor(i/15)}` : '');
      const overallStatus = statuses[Math.floor(Math.random() * statuses.length)];
      
      // Generate documents for each driver
      const documents = {};
      documentTypes.forEach(docType => {
        const docStatus = Math.random() > 0.2 ? 'uploaded' : 'missing';
        if (docStatus === 'uploaded') {
          documents[docType.id] = {
            id: `DOC_${docType.id}_${i}`,
            type: docType.id,
            name: docType.name,
            fileName: `${docType.name}_${name.replace(' ', '_')}.pdf`,
            fileSize: Math.floor(Math.random() * 5000) + 500,
            fileType: 'application/pdf',
            uploadDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
            status: overallStatus === 'pending' ? 'pending' : 
                    overallStatus === 'approved' ? 'approved' : 
                    overallStatus === 'rejected' ? 'rejected' : 'in_review',
            reviewComment: overallStatus === 'rejected' ? 'Document is blurry, please upload clear copy' : null,
            reviewedBy: overallStatus !== 'pending' ? 'Admin User' : null,
            reviewedDate: overallStatus !== 'pending' ? new Date().toISOString() : null,
            url: `#/documents/${docType.id}_${i}`,
            previewUrl: `https://via.placeholder.com/800x600?text=${docType.name}`
          };
        } else {
          documents[docType.id] = null;
        }
      });
      
      drivers.push({
        id: `DRV${String(i + 1).padStart(4, '0')}`,
        name: name,
        email: `${name.toLowerCase().replace(' ', '.')}@driver.com`,
        phone: `+1 (555) ${String(Math.floor(Math.random() * 900) + 100)}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
        status: overallStatus,
        documents: documents,
        vehicle: {
          make: ['Toyota', 'Honda', 'Tesla', 'BMW', 'Ford'][Math.floor(Math.random() * 5)],
          model: ['Camry', 'Accord', 'Model 3', '5 Series', 'Fusion'][Math.floor(Math.random() * 5)],
          year: 2020 + Math.floor(Math.random() * 4),
          licensePlate: `${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String(Math.floor(Math.random() * 9000) + 1000)}`
        },
        rating: (Math.random() * 2 + 3).toFixed(1),
        totalRides: Math.floor(Math.random() * 500),
        memberSince: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)).toISOString(),
        avatar: name.charAt(0) + (name.split(' ')[1]?.charAt(0) || name.charAt(1))
      });
    }
    return drivers;
  };

  const calculateStats = (driversData) => {
    let documentsUploaded = 0;
    let documentsPending = 0;
    let documentsApproved = 0;
    let documentsRejected = 0;
    
    driversData.forEach(driver => {
      Object.values(driver.documents).forEach(doc => {
        if (doc) {
          documentsUploaded++;
          if (doc.status === 'pending') documentsPending++;
          if (doc.status === 'approved') documentsApproved++;
          if (doc.status === 'rejected') documentsRejected++;
        }
      });
    });
    
    setStats({
      totalDrivers: driversData.length,
      documentsUploaded: documentsUploaded,
      documentsPending: documentsPending,
      documentsApproved: documentsApproved,
      documentsRejected: documentsRejected,
      approvalRate: documentsUploaded > 0 ? ((documentsApproved / documentsUploaded) * 100).toFixed(1) : 0
    });
  };

  // Filter and sort drivers
  useEffect(() => {
    let filtered = [...drivers];
    
    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(driver =>
        driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(driver => driver.status === filterStatus);
    }
    
    // Document type filter
    if (filterDocumentType !== 'all') {
      filtered = filtered.filter(driver => driver.documents[filterDocumentType] !== null);
    }
    
    // Sorting
    filtered.sort((a, b) => {
      let aVal, bVal;
      
      switch(sortField) {
        case 'name':
          aVal = a.name;
          bVal = b.name;
          break;
        case 'status':
          aVal = a.status;
          bVal = b.status;
          break;
        case 'rating':
          aVal = parseFloat(a.rating);
          bVal = parseFloat(b.rating);
          break;
        case 'totalRides':
          aVal = a.totalRides;
          bVal = b.totalRides;
          break;
        default:
          aVal = a.name;
          bVal = b.name;
      }
      
      if (sortDirection === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });
    
    setFilteredDrivers(filtered);
    setCurrentPage(1);
  }, [drivers, searchTerm, filterStatus, filterDocumentType, sortField, sortDirection]);

  // Handle document review
  const handleDocumentReview = async () => {
    if (!reviewAction) {
      alert('Please select approve or reject');
      return;
    }
    
    if (reviewAction === 'reject' && !reviewComment) {
      alert('Please provide a reason for rejection');
      return;
    }
    
    setProcessingReview(true);
    
    setTimeout(() => {
      // Update document status
      const updatedDrivers = drivers.map(driver => {
        if (driver.id === selectedDriver.id) {
          const updatedDocs = { ...driver.documents };
          if (updatedDocs[selectedDocument.type]) {
            updatedDocs[selectedDocument.type] = {
              ...updatedDocs[selectedDocument.type],
              status: reviewAction === 'approve' ? 'approved' : 'rejected',
              reviewComment: reviewAction === 'reject' ? reviewComment : null,
              reviewedBy: 'Admin User',
              reviewedDate: new Date().toISOString()
            };
          }
          
          // Update overall driver status based on all documents
          let allApproved = true;
          let anyPending = false;
          
          Object.values(updatedDocs).forEach(doc => {
            if (doc && doc.status === 'pending') anyPending = true;
            if (doc && doc.status !== 'approved') allApproved = false;
          });
          
          let newStatus = driver.status;
          if (allApproved && Object.keys(updatedDocs).length === documentTypes.filter(dt => driver.documents[dt.id]).length) {
            newStatus = 'approved';
          } else if (anyPending) {
            newStatus = 'in_review';
          } else if (!allApproved) {
            newStatus = 'rejected';
          }
          
          return { ...driver, documents: updatedDocs, status: newStatus };
        }
        return driver;
      });
      
      setDrivers(updatedDrivers);
      calculateStats(updatedDrivers);
      
      setReviewSuccess({
        success: true,
        message: `Document ${reviewAction === 'approve' ? 'approved' : 'rejected'} successfully`
      });
      
      setShowReviewModal(false);
      setReviewComment('');
      setReviewAction(null);
      setProcessingReview(false);
      
      setTimeout(() => {
        setReviewSuccess(null);
      }, 5000);
    }, 1500);
  };

  // Get status badge
  const getStatusBadge = (status) => {
    const statusMap = {
      'approved': { color: 'text-green-600', bg: 'bg-green-100', icon: FaCheckCircle, label: 'Approved' },
      'pending': { color: 'text-yellow-600', bg: 'bg-yellow-100', icon: FaSpinner, label: 'Pending' },
      'rejected': { color: 'text-red-600', bg: 'bg-red-100', icon: FaTimesCircle, label: 'Rejected' },
      'in_review': { color: 'text-blue-600', bg: 'bg-blue-100', icon: FaEye, label: 'In Review' }
    };
    const info = statusMap[status] || statusMap['pending'];
    const Icon = info.icon;
    return { ...info, Icon };
  };

  // Get document icon
  const getDocumentIcon = (docType) => {
    const type = documentTypes.find(dt => dt.id === docType);
    return type?.icon || FaFile;
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Toggle sort
  const toggleSort = (field) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
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

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDrivers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredDrivers.length / itemsPerPage);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <FaSpinner className="w-10 h-10 sm:w-12 sm:h-12 animate-spin mx-auto mb-4" style={{ color: 'var(--primary-orange)' }} />
          <p className="text-sm sm:text-base text-gray-600">Loading driver documents...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-50 ${fullscreenMode ? 'fixed inset-0 z-50 overflow-auto' : ''}`}>
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-20">
        <div className="p-2 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div>
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Driver Documents</h1>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">View and manage driver documents for approval workflow</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <button
                onClick={() => setShowStats(!showStats)}
                className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <FaChartLine className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </button>
              <button
                onClick={() => setViewMode(viewMode === 'cards' ? 'list' : 'cards')}
                className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {viewMode === 'cards' ? <FaFileAlt className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" /> : <FaFile className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />}
              </button>
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
      {reviewSuccess && (
        <div className="fixed top-20 right-4 z-50 animate-slide-in max-w-sm">
          <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-lg shadow-lg">
            <div className="flex items-center space-x-3">
              <FaCheckCircle className="w-5 h-5 text-green-400" />
              <div>
                <p className="text-green-800 text-sm font-medium">Review Successful</p>
                <p className="text-green-700 text-xs">{reviewSuccess.message}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      {showStats && (
        <div className="py-4">
          <div className="flex flex-wrap -mx-2">
            <div className="w-1/2 sm:w-1/3 lg:w-1/6 px-2 mb-4">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center justify-between mb-2">
                  <FaUser className="w-5 h-5 text-blue-500" />
                  <span className="text-xs text-gray-500">Drivers</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">{stats.totalDrivers}</div>
                <div className="text-xs text-gray-600">Total Drivers</div>
              </div>
            </div>
            <div className="w-1/2 sm:w-1/3 lg:w-1/6 px-2 mb-4">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center justify-between mb-2">
                  <FaFileAlt className="w-5 h-5 text-green-500" />
                  <span className="text-xs text-gray-500">Uploaded</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">{stats.documentsUploaded}</div>
                <div className="text-xs text-gray-600">Documents</div>
              </div>
            </div>
            <div className="w-1/2 sm:w-1/3 lg:w-1/6 px-2 mb-4">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center justify-between mb-2">
                  <FaSpinner className="w-5 h-5 text-yellow-500" />
                  <span className="text-xs text-gray-500">Pending</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">{stats.documentsPending}</div>
                <div className="text-xs text-gray-600">Pending Review</div>
              </div>
            </div>
            <div className="w-1/2 sm:w-1/3 lg:w-1/6 px-2 mb-4">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center justify-between mb-2">
                  <FaCheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-xs text-gray-500">Approved</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">{stats.documentsApproved}</div>
                <div className="text-xs text-gray-600">Approved</div>
              </div>
            </div>
            <div className="w-1/2 sm:w-1/3 lg:w-1/6 px-2 mb-4">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center justify-between mb-2">
                  <FaTimesCircle className="w-5 h-5 text-red-500" />
                  <span className="text-xs text-gray-500">Rejected</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">{stats.documentsRejected}</div>
                <div className="text-xs text-gray-600">Rejected</div>
              </div>
            </div>
            <div className="w-1/2 sm:w-1/3 lg:w-1/6 px-2 mb-4">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center justify-between mb-2">
                  <FaChartLine className="w-5 h-5 text-purple-500" />
                  <span className="text-xs text-gray-500">Rate</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">{stats.approvalRate}%</div>
                <div className="text-xs text-gray-600">Approval Rate</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters Section */}
      <div className="py-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex flex-wrap -mx-2">
            <div className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, ID, or plate..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm"
                  style={{ borderColor: 'var(--gray-300)', focusRingColor: 'var(--primary-orange)' }}
                />
              </div>
            </div>
            
            <div className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Driver Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm"
                style={{ borderColor: 'var(--gray-300)', focusRingColor: 'var(--primary-orange)' }}
              >
                <option value="all">All Status</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="in_review">In Review</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            
            <div className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Document Type</label>
              <select
                value={filterDocumentType}
                onChange={(e) => setFilterDocumentType(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm"
                style={{ borderColor: 'var(--gray-300)', focusRingColor: 'var(--primary-orange)' }}
              >
                <option value="all">All Documents</option>
                {documentTypes.map(doc => (
                  <option key={doc.id} value={doc.id}>{doc.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <p className="text-sm text-gray-600">
          Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredDrivers.length)} of {filteredDrivers.length} drivers
        </p>
        <div className="flex items-center space-x-2">
          <label className="text-sm text-gray-600">Show:</label>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 text-sm"
            style={{ borderColor: 'var(--gray-300)', focusRingColor: 'var(--primary-orange)' }}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>

      {/* Cards View */}
      {viewMode === 'cards' ? (
        <div className="flex flex-wrap -mx-2">
          {currentItems.map((driver) => {
            const driverStatus = getStatusBadge(driver.status);
            const StatusIcon = driverStatus.Icon;
            
            return (
              <div key={driver.id} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/3 px-2 mb-4">
                <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-4">
                    {/* Driver Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-sm">
                          {driver.avatar}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{driver.name}</p>
                          <p className="text-xs text-gray-500">{driver.id}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${driverStatus.bg} ${driverStatus.color} flex items-center space-x-1`}>
                        <StatusIcon className="w-3 h-3" />
                        <span>{driverStatus.label}</span>
                      </span>
                    </div>

                    {/* Driver Details */}
                    <div className="bg-gray-50 rounded-lg p-3 mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-500">Vehicle:</span>
                        <span className="text-gray-700">{driver.vehicle.make} {driver.vehicle.model}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-500">Plate:</span>
                        <span className="text-gray-700">{driver.vehicle.licensePlate}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Rating:</span>
                        <div className="flex items-center space-x-1">
                          <span className="text-yellow-500">★</span>
                          <span className="text-gray-700">{driver.rating}</span>
                        </div>
                      </div>
                    </div>

                    {/* Documents List */}
                    <p className="text-sm font-medium text-gray-700 mb-2">Documents:</p>
                    <div className="space-y-2 mb-3">
                      {documentTypes.map(docType => {
                        const doc = driver.documents[docType.id];
                        const DocIcon = getDocumentIcon(docType.id);
                        const docStatus = doc ? getStatusBadge(doc.status) : null;
                        
                        return (
                          <div key={docType.id} className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <DocIcon className="w-4 h-4 text-gray-500" />
                              <span className="text-sm text-gray-600">{docType.name}</span>
                            </div>
                            {doc ? (
                              <div className="flex items-center space-x-2">
                                <span className={`text-xs px-1.5 py-0.5 rounded-full ${docStatus.bg} ${docStatus.color}`}>
                                  {docStatus.label}
                                </span>
                                <button
                                  onClick={() => {
                                    setSelectedDriver(driver);
                                    setSelectedDocument(doc);
                                    setShowPreviewModal(true);
                                  }}
                                  className="p-1 hover:bg-gray-100 rounded"
                                  title="Preview"
                                >
                                  <FaEye className="w-3 h-3 text-orange-500" />
                                </button>
                                <button
                                  onClick={() => {
                                    window.open(doc.url, '_blank');
                                  }}
                                  className="p-1 hover:bg-gray-100 rounded"
                                  title="Download"
                                >
                                  <FaDownload className="w-3 h-3 text-blue-500" />
                                </button>
                              </div>
                            ) : (
                              <span className="text-xs text-gray-400">Not Uploaded</span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Action Buttons */}
                    {driver.status !== 'approved' && (
                      <button
                        onClick={() => {
                          setSelectedDriver(driver);
                          setShowReviewModal(true);
                        }}
                        className="w-full py-2 rounded-lg text-white text-sm font-medium transition-opacity hover:opacity-90"
                        style={{ backgroundColor: 'var(--primary-orange)' }}
                      >
                        Review Documents
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        // List View
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => toggleSort('name')}>
                    <div className="flex items-center space-x-1">Driver</div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => toggleSort('status')}>
                    <div className="flex items-center space-x-1">Status</div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documents</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.map((driver) => {
                  const driverStatus = getStatusBadge(driver.status);
                  const StatusIcon = driverStatus.Icon;
                  
                  return (
                    <tr key={driver.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-xs">
                            {driver.avatar}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{driver.name}</p>
                            <p className="text-xs text-gray-500">{driver.id}</p>
                          </div>
                        </div>
                        </td>
                      <td className="px-4 py-3">
                        <p className="text-sm text-gray-700">{driver.vehicle.make} {driver.vehicle.model}</p>
                        <p className="text-xs text-gray-500">{driver.vehicle.licensePlate}</p>
                        </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 text-xs rounded-full ${driverStatus.bg} ${driverStatus.color} flex items-center space-x-1 w-fit`}>
                          <StatusIcon className="w-3 h-3" />
                          <span>{driverStatus.label}</span>
                        </span>
                        </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-2">
                          {documentTypes.map(docType => {
                            const doc = driver.documents[docType.id];
                            return doc ? (
                              <button
                                key={docType.id}
                                onClick={() => {
                                  setSelectedDriver(driver);
                                  setSelectedDocument(doc);
                                  setShowPreviewModal(true);
                                }}
                                className="p-1 hover:bg-gray-100 rounded"
                                title={docType.name}
                              >
                                <FaEye className="w-4 h-4 text-orange-500" />
                              </button>
                            ) : (
                              <FaTimesCircle key={docType.id} className="w-4 h-4 text-gray-300" title={`${docType.name} not uploaded`} />
                            );
                          })}
                        </div>
                        </td>
                      <td className="px-4 py-3">
                        {driver.status !== 'approved' && (
                          <button
                            onClick={() => {
                              setSelectedDriver(driver);
                              setShowReviewModal(true);
                            }}
                            className="px-3 py-1 rounded-lg text-white text-sm"
                            style={{ backgroundColor: 'var(--primary-orange)' }}
                          >
                            Review
                          </button>
                        )}
                        </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-6">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaAngleDoubleLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaAngleDoubleRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Document Preview Modal */}
      {showPreviewModal && selectedDocument && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-40 modal-enter" onClick={() => setShowPreviewModal(false)}></div>
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50 modal-content-enter">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] modal-scroll overflow-y-auto border border-gray-200">
              <div className="sticky top-0 bg-gradient-to-r from-orange-50 to-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                    <FaFilePdf className="w-6 h-6 text-red-500" />
                    <span>{selectedDocument.name}</span>
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{selectedDriver.name} - {selectedDriver.id}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => window.open(selectedDocument.url, '_blank')}
                    className="p-3 rounded-xl hover:bg-orange-100 transition-all duration-200 transform hover:scale-105"
                    title="Download"
                  >
                    <FaDownload className="w-5 h-5 text-orange-600" />
                  </button>
                  <button
                    onClick={() => setShowPreviewModal(false)}
                    className="p-3 rounded-xl hover:bg-gray-100 transition-all duration-200 transform hover:scale-105"
                  >
                    <FaTimes className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>
              <div className="p-8">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-10 flex items-center justify-center min-h-[400px] shadow-inner">
                  <div className="text-center">
                    <div className="relative">
                      <FaFilePdf className="w-32 h-32 text-red-500 mx-auto mb-6 animate-pulse" />
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                        <FaEye className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <p className="text-lg font-semibold text-gray-800 mb-2">{selectedDocument.fileName}</p>
                    <p className="text-sm text-gray-600 mb-6">{formatFileSize(selectedDocument.fileSize)}</p>
                    <button
                      onClick={() => window.open(selectedDocument.url, '_blank')}
                      className="px-8 py-3 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                      style={{ background: 'linear-gradient(135deg, var(--primary-orange), var(--secondary-orange))' }}
                    >
                      <span className="flex items-center space-x-2">
                        <FaEye className="w-5 h-5" />
                        <span>Open Document</span>
                      </span>
                    </button>
                  </div>
                </div>
                
                <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                  <h4 className="text-sm font-semibold text-blue-800 mb-4 flex items-center space-x-2">
                    <FaInfoCircle className="w-4 h-4" />
                    <span>Document Details</span>
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-600 font-medium">Uploaded:</span>
                      <span className="text-blue-800">{formatDate(selectedDocument.uploadDate)}</span>
                    </div>
                    {selectedDocument.reviewedDate && (
                      <div className="flex justify-between text-sm">
                        <span className="text-blue-600 font-medium">Reviewed:</span>
                        <span className="text-blue-800">{formatDate(selectedDocument.reviewedDate)} by {selectedDocument.reviewedBy}</span>
                      </div>
                    )}
                    {selectedDocument.reviewComment && (
                      <div className="flex justify-between text-sm">
                        <span className="text-blue-600 font-medium">Comment:</span>
                        <span className="text-blue-800">{selectedDocument.reviewComment}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Review Modal */}
      {showReviewModal && selectedDriver && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-40 modal-enter" onClick={() => setShowReviewModal(false)}></div>
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50 modal-content-enter">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] modal-scroll overflow-y-auto border border-gray-200">
              <div className="sticky top-0 bg-gradient-to-r from-orange-50 to-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl">
                <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                  <FaClipboardList className="w-6 h-6 text-orange-600" />
                  <span>Review Documents</span>
                </h3>
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="p-3 rounded-xl hover:bg-gray-100 transition-all duration-200 transform hover:scale-105"
                >
                  <FaTimes className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              
              <div className="p-8">
                <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                  <p className="text-sm font-semibold text-green-800 mb-2 flex items-center space-x-2">
                    <FaUser className="w-4 h-4" />
                    <span>Driver Information</span>
                  </p>
                  <p className="font-bold text-green-900 text-lg">{selectedDriver.name}</p>
                  <p className="text-sm text-green-700">{selectedDriver.id}</p>
                </div>
                
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                    <FaFileAlt className="w-5 h-5 text-blue-600" />
                    <span>Documents to Review</span>
                  </h4>
                  <div className="space-y-4">
                    {documentTypes.map(docType => {
                      const doc = selectedDriver.documents[docType.id];
                      const DocIcon = getDocumentIcon(docType.id);
                      
                      if (!doc) return null;
                      
                      return (
                        <div key={docType.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200">
                          <div className="flex items-center space-x-4">
                            <div className="p-2 bg-white rounded-lg shadow-sm">
                              <DocIcon className="w-6 h-6 text-gray-600" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900">{docType.name}</p>
                              <p className="text-xs text-gray-600">{formatDate(doc.uploadDate)}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              setSelectedDocument(doc);
                              setShowPreviewModal(true);
                            }}
                            className="px-4 py-2 rounded-lg text-white font-medium shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                            style={{ background: 'linear-gradient(135deg, var(--primary-orange), var(--secondary-orange))' }}
                          >
                            <span className="flex items-center space-x-2">
                              <FaEye className="w-4 h-4" />
                              <span>Preview</span>
                            </span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                    <FaCheckCircle className="w-5 h-5 text-green-600" />
                    <span>Decision</span>
                  </label>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setReviewAction('approve')}
                      className={`flex-1 py-4 rounded-xl border-2 flex items-center justify-center space-x-3 font-semibold transition-all duration-300 transform hover:scale-105 ${
                        reviewAction === 'approve'
                          ? 'bg-green-500 text-white border-green-500 shadow-lg'
                          : 'border-gray-300 text-gray-700 hover:bg-green-50 hover:border-green-300'
                      }`}
                    >
                      <FaThumbsUp className="w-5 h-5" />
                      <span>Approve</span>
                    </button>
                    <button
                      onClick={() => setReviewAction('reject')}
                      className={`flex-1 py-4 rounded-xl border-2 flex items-center justify-center space-x-3 font-semibold transition-all duration-300 transform hover:scale-105 ${
                        reviewAction === 'reject'
                          ? 'bg-red-500 text-white border-red-500 shadow-lg'
                          : 'border-gray-300 text-gray-700 hover:bg-red-50 hover:border-red-300'
                      }`}
                    >
                      <FaThumbsDown className="w-5 h-5" />
                      <span>Reject</span>
                    </button>
                  </div>
                </div>
                
                {reviewAction === 'reject' && (
                  <div className="mb-8">
                    <label className="block text-sm font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                      <FaComment className="w-4 h-4 text-red-500" />
                      <span>Reason for Rejection <span className="text-red-500">*</span></span>
                    </label>
                    <textarea
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      rows="4"
                      placeholder="Please provide a detailed reason for rejecting these documents..."
                      className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 resize-none transition-all duration-200"
                      style={{ borderColor: 'var(--gray-300)', focusRingColor: 'var(--primary-orange)' }}
                    />
                  </div>
                )}
                
                <div className="flex space-x-4">
                  <button
                    onClick={() => setShowReviewModal(false)}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 font-semibold transform hover:scale-105"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDocumentReview}
                    disabled={processingReview || (reviewAction === 'reject' && !reviewComment)}
                    className={`flex-1 px-6 py-3 rounded-xl text-white font-semibold flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
                      processingReview || (reviewAction === 'reject' && !reviewComment)
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:opacity-90'
                    }`}
                    style={{ background: 'linear-gradient(135deg, var(--primary-orange), var(--secondary-orange))' }}
                  >
                    {processingReview ? (
                      <>
                        <FaSpinner className="w-5 h-5 animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <FaCheck className="w-5 h-5" />
                        <span>Submit Review</span>
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
              <h3 className="font-semibold text-gray-800">Quick Actions</h3>
              <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-lg hover:bg-gray-100">
                <FaTimes className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <FaDownload className="w-5 h-5 text-blue-500" />
                <span className="text-sm">Export Report</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <FaShare className="w-5 h-5 text-green-500" />
                <span className="text-sm">Share Summary</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <FaPrint className="w-5 h-5 text-purple-500" />
                <span className="text-sm">Print Report</span>
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

export default DriverDocumentView;