import React, { useState, useEffect } from 'react';
import {
  FaFile,
  FaFilePdf,
  FaFileImage,
  FaFileAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner,
  FaSearch,
  FaFilter,
  FaDownload,
  FaEye,
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
  FaClock,
  FaThumbsUp,
  FaThumbsDown,
  FaComment,
  FaHistory,
  FaCheck,
  FaExclamationTriangle,
  FaChevronLeft,
  FaChevronRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaUpload,
  FaRedo,
  FaTrash,
  FaEdit,
  FaPlus,
  FaMinus,
  FaPrint,
  FaShare,
  FaEnvelope,
  FaPhone,
  FaIdCard,
  FaFileContract,
  FaCamera
} from 'react-icons/fa';

const VerificationFileManagement = () => {
  const [files, setFiles] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionType, setActionType] = useState(null);
  const [actionComment, setActionComment] = useState('');
  const [processingAction, setProcessingAction] = useState(false);
  const [actionSuccess, setActionSuccess] = useState(null);
  const [showAuditLog, setShowAuditLog] = useState(false);
  const [selectedFileAudit, setSelectedFileAudit] = useState(null);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [filterEntity, setFilterEntity] = useState('all');
  const [sortField, setSortField] = useState('uploadDate');
  const [sortDirection, setSortDirection] = useState('desc');
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // UI states
  const [isMobileView, setIsMobileView] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [fullscreenMode, setFullscreenMode] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  const [viewMode, setViewMode] = useState('table');
  const [showStats, setShowStats] = useState(true);
  
  // Stats
  const [stats, setStats] = useState({
    totalFiles: 0,
    pendingFiles: 0,
    approvedFiles: 0,
    rejectedFiles: 0,
    reuploadRequested: 0,
    approvalRate: 0
  });

  // File types
  const fileTypes = [
    { id: 'license', name: 'Driver License', category: 'driver', icon: FaIdCard },
    { id: 'cnic', name: 'CNIC', category: 'driver', icon: FaIdCard },
    { id: 'insurance', name: 'Insurance', category: 'vehicle', icon: FaFileContract },
    { id: 'vehicleRegistration', name: 'Vehicle Registration', category: 'vehicle', icon: FaFileContract },
    { id: 'medicalCertificate', name: 'Medical Certificate', category: 'driver', icon: FaFileAlt },
    { id: 'backgroundCheck', name: 'Background Check', category: 'driver', icon: FaFileAlt },
    { id: 'vehicleFront', name: 'Vehicle Front Image', category: 'vehicle', icon: FaCamera },
    { id: 'vehicleBack', name: 'Vehicle Back Image', category: 'vehicle', icon: FaCamera },
    { id: 'vehicleLeft', name: 'Vehicle Left Side', category: 'vehicle', icon: FaCamera },
    { id: 'vehicleRight', name: 'Vehicle Right Side', category: 'vehicle', icon: FaCamera },
    { id: 'vehicleInterior', name: 'Vehicle Interior', category: 'vehicle', icon: FaCamera },
    { id: 'odometer', name: 'Odometer Reading', category: 'vehicle', icon: FaCamera }
  ];

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showPreviewModal || showActionModal || showAuditLog) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showPreviewModal, showActionModal, showAuditLog]);

  // Handle ESC key to close modals
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        if (showPreviewModal) setShowPreviewModal(false);
        if (showActionModal) setShowActionModal(false);
        if (showAuditLog) setShowAuditLog(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [showPreviewModal, showActionModal, showAuditLog]);

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

  // Fetch files data
  useEffect(() => {
    fetchFilesData();
  }, []);

  const fetchFilesData = async () => {
    setLoading(true);
    setTimeout(() => {
      const mockFiles = generateMockFiles(50);
      setFiles(mockFiles);
      setFilteredFiles(mockFiles);
      calculateStats(mockFiles);
      setLoading(false);
    }, 1000);
  };

  const generateMockFiles = (count) => {
    const files = [];
    const entities = [
      { id: 'DRV001', name: 'Michael Rodriguez', type: 'driver' },
      { id: 'DRV002', name: 'Emily Chen', type: 'driver' },
      { id: 'DRV003', name: 'David Kim', type: 'driver' },
      { id: 'VEH001', name: 'Toyota Camry (ABC-1234)', type: 'vehicle' },
      { id: 'VEH002', name: 'Tesla Model 3 (TESLA-123)', type: 'vehicle' },
      { id: 'DRV004', name: 'Lisa Wang', type: 'driver' },
      { id: 'VEH003', name: 'Honda Accord (HONDA-456)', type: 'vehicle' }
    ];
    
    const statuses = ['pending', 'approved', 'rejected', 'reupload_requested'];
    const actions = ['approve', 'reject', 'reupload_request'];
    
    for (let i = 0; i < count; i++) {
      const entity = entities[Math.floor(Math.random() * entities.length)];
      const fileType = fileTypes[Math.floor(Math.random() * fileTypes.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const uploadDate = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000);
      
      // Generate audit log entries
      const auditLog = [];
      const numActions = Math.floor(Math.random() * 3) + 1;
      for (let j = 0; j < numActions; j++) {
        const actionDate = new Date(uploadDate.getTime() + j * 24 * 60 * 60 * 1000);
        const action = actions[Math.floor(Math.random() * actions.length)];
        auditLog.push({
          id: `AUDIT_${i}_${j}`,
          action: action,
          performedBy: ['Admin User', 'System', 'Verification Team'][Math.floor(Math.random() * 3)],
          timestamp: actionDate.toISOString(),
          comment: action === 'reject' ? 'Document is blurry or incomplete' : 
                   action === 'reupload_request' ? 'Please upload clearer copy' : null,
          previousStatus: j === 0 ? 'pending' : ['pending', 'rejected', 'reupload_requested'][j - 1],
          newStatus: action === 'approve' ? 'approved' : (action === 'reject' ? 'rejected' : 'reupload_requested')
        });
      }
      
      files.push({
        id: `FILE_${String(i + 1).padStart(6, '0')}`,
        fileName: `${fileType.name}_${entity.name.replace(' ', '_')}.pdf`,
        fileSize: Math.floor(Math.random() * 5000) + 500,
        fileType: fileType.id,
        fileCategory: fileType.category,
        fileTypeName: fileType.name,
        entityId: entity.id,
        entityName: entity.name,
        entityType: entity.type,
        status: status,
        uploadDate: uploadDate.toISOString(),
        lastActionDate: auditLog.length > 0 ? auditLog[auditLog.length - 1].timestamp : uploadDate.toISOString(),
        lastActionBy: auditLog.length > 0 ? auditLog[auditLog.length - 1].performedBy : null,
        auditLog: auditLog,
        url: `#/files/${fileType.id}_${i}`,
        previewUrl: `https://picsum.photos/800/600?random=${i}`,
        comment: status === 'rejected' ? 'Document quality is poor, text not readable' :
                 status === 'reupload_requested' ? 'Please upload a clearer image' : null
      });
    }
    
    return files.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
  };

  const calculateStats = (filesData) => {
    const pendingFiles = filesData.filter(f => f.status === 'pending').length;
    const approvedFiles = filesData.filter(f => f.status === 'approved').length;
    const rejectedFiles = filesData.filter(f => f.status === 'rejected').length;
    const reuploadRequested = filesData.filter(f => f.status === 'reupload_requested').length;
    
    setStats({
      totalFiles: filesData.length,
      pendingFiles: pendingFiles,
      approvedFiles: approvedFiles,
      rejectedFiles: rejectedFiles,
      reuploadRequested: reuploadRequested,
      approvalRate: filesData.length > 0 ? ((approvedFiles / filesData.length) * 100).toFixed(1) : 0
    });
  };

  // Filter and sort files
  useEffect(() => {
    let filtered = [...files];
    
    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(file =>
        file.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        file.entityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        file.fileTypeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        file.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(file => file.status === filterStatus);
    }
    
    // File type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(file => file.fileType === filterType);
    }
    
    // Entity filter
    if (filterEntity !== 'all') {
      filtered = filtered.filter(file => file.entityType === filterEntity);
    }
    
    // Sorting
    filtered.sort((a, b) => {
      let aVal, bVal;
      
      switch(sortField) {
        case 'uploadDate':
          aVal = new Date(a.uploadDate);
          bVal = new Date(b.uploadDate);
          break;
        case 'fileName':
          aVal = a.fileName;
          bVal = b.fileName;
          break;
        case 'entityName':
          aVal = a.entityName;
          bVal = b.entityName;
          break;
        case 'fileSize':
          aVal = a.fileSize;
          bVal = b.fileSize;
          break;
        default:
          aVal = new Date(a.uploadDate);
          bVal = new Date(b.uploadDate);
      }
      
      if (sortDirection === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });
    
    setFilteredFiles(filtered);
    setCurrentPage(1);
  }, [files, searchTerm, filterStatus, filterType, filterEntity, sortField, sortDirection]);

  // Handle file action (approve/reject/reupload)
  const handleFileAction = async () => {
    if (!actionType) {
      alert('Please select an action');
      return;
    }
    
    if ((actionType === 'reject' || actionType === 'reupload_request') && !actionComment) {
      alert('Please provide a comment for this action');
      return;
    }
    
    setProcessingAction(true);
    
    setTimeout(() => {
      // Update file status
      const updatedFiles = files.map(file => {
        if (file.id === selectedFile.id) {
          const newStatus = actionType === 'approve' ? 'approved' : 
                           (actionType === 'reject' ? 'rejected' : 'reupload_requested');
          
          // Add audit log entry
          const newAuditEntry = {
            id: `AUDIT_${Date.now()}`,
            action: actionType,
            performedBy: 'Admin User',
            timestamp: new Date().toISOString(),
            comment: actionComment || null,
            previousStatus: file.status,
            newStatus: newStatus
          };
          
          return {
            ...file,
            status: newStatus,
            lastActionDate: new Date().toISOString(),
            lastActionBy: 'Admin User',
            comment: actionComment || file.comment,
            auditLog: [newAuditEntry, ...file.auditLog]
          };
        }
        return file;
      });
      
      setFiles(updatedFiles);
      calculateStats(updatedFiles);
      
      setActionSuccess({
        success: true,
        message: `File ${actionType === 'approve' ? 'approved' : (actionType === 'reject' ? 'rejected' : 're-upload requested')} successfully`
      });
      
      setShowActionModal(false);
      setActionComment('');
      setActionType(null);
      setProcessingAction(false);
      
      setTimeout(() => {
        setActionSuccess(null);
      }, 5000);
    }, 1500);
  };

  // Get status badge
  const getStatusBadge = (status) => {
    const statusMap = {
      'approved': { color: 'text-green-600', bg: 'bg-green-100', icon: FaCheckCircle, label: 'Approved' },
      'pending': { color: 'text-yellow-600', bg: 'bg-yellow-100', icon: FaSpinner, label: 'Pending' },
      'rejected': { color: 'text-red-600', bg: 'bg-red-100', icon: FaTimesCircle, label: 'Rejected' },
      'reupload_requested': { color: 'text-orange-600', bg: 'bg-orange-100', icon: FaRedo, label: 'Re-upload Requested' }
    };
    const info = statusMap[status] || statusMap['pending'];
    const Icon = info.icon;
    return { ...info, Icon };
  };

  // Get file icon
  const getFileIcon = (fileName) => {
    if (fileName.toLowerCase().includes('.pdf')) return FaFilePdf;
    if (fileName.toLowerCase().includes('.jpg') || fileName.toLowerCase().includes('.jpeg') || fileName.toLowerCase().includes('.png')) return FaFileImage;
    return FaFile;
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
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      full: date.toLocaleString('en-US')
    };
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
  const currentItems = filteredFiles.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredFiles.length / itemsPerPage);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <FaSpinner className="w-10 h-10 sm:w-12 sm:h-12 animate-spin mx-auto mb-4" style={{ color: 'var(--primary-orange)' }} />
          <p className="text-sm sm:text-base text-gray-600">Loading verification files...</p>
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
              <button 
                onClick={() => window.history.back()}
                className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <FaArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Verification File Management</h1>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Manage all uploaded verification files with audit trail</p>
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
                onClick={() => setViewMode(viewMode === 'table' ? 'cards' : 'table')}
                className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {viewMode === 'table' ? <FaFileAlt className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" /> : <FaHistory className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />}
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
      {actionSuccess && (
        <div className="fixed top-20 right-4 z-50 animate-slide-in max-w-sm">
          <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-lg shadow-lg">
            <div className="flex items-center space-x-3">
              <FaCheckCircle className="w-5 h-5 text-green-400" />
              <div>
                <p className="text-green-800 text-sm font-medium">Action Successful</p>
                <p className="text-green-700 text-xs">{actionSuccess.message}</p>
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
                  <FaFile className="w-5 h-5 text-blue-500" />
                  <span className="text-xs text-gray-500">Total</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">{stats.totalFiles}</div>
                <div className="text-xs text-gray-600">Total Files</div>
              </div>
            </div>
            <div className="w-1/2 sm:w-1/3 lg:w-1/6 px-2 mb-4">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center justify-between mb-2">
                  <FaSpinner className="w-5 h-5 text-yellow-500" />
                  <span className="text-xs text-gray-500">Pending</span>
                </div>
                <div className="text-2xl font-bold text-yellow-600">{stats.pendingFiles}</div>
                <div className="text-xs text-gray-600">Pending Review</div>
              </div>
            </div>
            <div className="w-1/2 sm:w-1/3 lg:w-1/6 px-2 mb-4">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center justify-between mb-2">
                  <FaCheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-xs text-gray-500">Approved</span>
                </div>
                <div className="text-2xl font-bold text-green-600">{stats.approvedFiles}</div>
                <div className="text-xs text-gray-600">Approved</div>
              </div>
            </div>
            <div className="w-1/2 sm:w-1/3 lg:w-1/6 px-2 mb-4">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center justify-between mb-2">
                  <FaTimesCircle className="w-5 h-5 text-red-500" />
                  <span className="text-xs text-gray-500">Rejected</span>
                </div>
                <div className="text-2xl font-bold text-red-600">{stats.rejectedFiles}</div>
                <div className="text-xs text-gray-600">Rejected</div>
              </div>
            </div>
            <div className="w-1/2 sm:w-1/3 lg:w-1/6 px-2 mb-4">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center justify-between mb-2">
                  <FaRedo className="w-5 h-5 text-orange-500" />
                  <span className="text-xs text-gray-500">Re-upload</span>
                </div>
                <div className="text-2xl font-bold text-orange-600">{stats.reuploadRequested}</div>
                <div className="text-xs text-gray-600">Requested</div>
              </div>
            </div>
            <div className="w-1/2 sm:w-1/3 lg:w-1/6 px-2 mb-4">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center justify-between mb-2">
                  <FaChartLine className="w-5 h-5 text-purple-500" />
                  <span className="text-xs text-gray-500">Rate</span>
                </div>
                <div className="text-2xl font-bold text-purple-600">{stats.approvalRate}%</div>
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
                  placeholder="Search by file name, entity..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm"
                  style={{ borderColor: 'var(--gray-300)', focusRingColor: 'var(--primary-orange)' }}
                />
              </div>
            </div>
            
            <div className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm"
                style={{ borderColor: 'var(--gray-300)', focusRingColor: 'var(--primary-orange)' }}
              >
                <option value="all">All Status</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
                <option value="reupload_requested">Re-upload Requested</option>
              </select>
            </div>
            
            <div className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Entity Type</label>
              <select
                value={filterEntity}
                onChange={(e) => setFilterEntity(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm"
                style={{ borderColor: 'var(--gray-300)', focusRingColor: 'var(--primary-orange)' }}
              >
                <option value="all">All Entities</option>
                <option value="driver">Drivers</option>
                <option value="vehicle">Vehicles</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <p className="text-sm text-gray-600">
          Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredFiles.length)} of {filteredFiles.length} files
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

      {/* Table View */}
      {viewMode === 'table' ? (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => toggleSort('fileName')}>
                    File Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => toggleSort('entityName')}>
                    Entity
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => toggleSort('fileSize')}>
                    Size
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => toggleSort('uploadDate')}>
                    Uploaded
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.map((file) => {
                  const statusBadge = getStatusBadge(file.status);
                  const StatusIcon = statusBadge.Icon;
                  const FileIcon = getFileIcon(file.fileName);
                  const uploadDate = formatDate(file.uploadDate);
                  
                  return (
                    <tr key={file.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-2">
                          <FileIcon className="w-5 h-5 text-gray-500" />
                          <span className="text-sm text-gray-900 truncate max-w-[200px]">{file.fileName}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{file.entityName}</p>
                          <p className="text-xs text-gray-500">{file.entityId}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-gray-600">{file.fileTypeName}</span>
                        <p className="text-xs text-gray-400">{file.entityType}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-gray-600">{formatFileSize(file.fileSize)}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div>
                          <p className="text-sm text-gray-900">{uploadDate.date}</p>
                          <p className="text-xs text-gray-500">{uploadDate.time}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 text-xs rounded-full ${statusBadge.bg} ${statusBadge.color} flex items-center space-x-1 w-fit`}>
                          <StatusIcon className="w-3 h-3" />
                          <span>{statusBadge.label}</span>
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => {
                              setSelectedFile(file);
                              setShowPreviewModal(true);
                            }}
                            className="p-1.5 rounded-lg hover:bg-gray-100"
                            title="Preview"
                          >
                            <FaEye className="w-4 h-4 text-orange-500" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedFile(file);
                              setShowAuditLog(true);
                            }}
                            className="p-1.5 rounded-lg hover:bg-gray-100"
                            title="Audit Log"
                          >
                            <FaHistory className="w-4 h-4 text-blue-500" />
                          </button>
                          {file.status === 'pending' && (
                            <>
                              <button
                                onClick={() => {
                                  setSelectedFile(file);
                                  setActionType('approve');
                                  setShowActionModal(true);
                                }}
                                className="p-1.5 rounded-lg hover:bg-green-50"
                                title="Approve"
                              >
                                <FaThumbsUp className="w-4 h-4 text-green-600" />
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedFile(file);
                                  setActionType('reject');
                                  setShowActionModal(true);
                                }}
                                className="p-1.5 rounded-lg hover:bg-red-50"
                                title="Reject"
                              >
                                <FaThumbsDown className="w-4 h-4 text-red-600" />
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedFile(file);
                                  setActionType('reupload_request');
                                  setShowActionModal(true);
                                }}
                                className="p-1.5 rounded-lg hover:bg-orange-50"
                                title="Request Re-upload"
                              >
                                <FaRedo className="w-4 h-4 text-orange-600" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        // Cards View
        <div className="flex flex-wrap -mx-2">
          {currentItems.map((file) => {
            const statusBadge = getStatusBadge(file.status);
            const StatusIcon = statusBadge.Icon;
            const FileIcon = getFileIcon(file.fileName);
            const uploadDate = formatDate(file.uploadDate);
            
            return (
              <div key={file.id} className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
                <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                        <FileIcon className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 truncate max-w-[130px]">{file.fileName}</p>
                        <p className="text-xs text-gray-500">{file.fileTypeName}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${statusBadge.bg} ${statusBadge.color} flex items-center space-x-1`}>
                      <StatusIcon className="w-3 h-3" />
                      <span>{statusBadge.label}</span>
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Entity:</span>
                      <span className="text-gray-900">{file.entityName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Type:</span>
                      <span className="text-gray-600">{file.entityType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Size:</span>
                      <span className="text-gray-600">{formatFileSize(file.fileSize)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Uploaded:</span>
                      <span className="text-gray-600">{uploadDate.date}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 mt-3 pt-3 border-t border-gray-100">
                    <button
                      onClick={() => {
                        setSelectedFile(file);
                        setShowPreviewModal(true);
                      }}
                      className="flex-1 py-1.5 rounded-lg border border-gray-300 text-gray-600 text-xs flex items-center justify-center space-x-1 hover:bg-gray-50"
                    >
                      <FaEye className="w-3 h-3" />
                      <span>Preview</span>
                    </button>
                    <button
                      onClick={() => {
                        setSelectedFile(file);
                        setShowAuditLog(true);
                      }}
                      className="flex-1 py-1.5 rounded-lg border border-gray-300 text-gray-600 text-xs flex items-center justify-center space-x-1 hover:bg-gray-50"
                    >
                      <FaHistory className="w-3 h-3" />
                      <span>Audit</span>
                    </button>
                  </div>
                  
                  {file.status === 'pending' && (
                    <div className="flex space-x-2 mt-2">
                      <button
                        onClick={() => {
                          setSelectedFile(file);
                          setActionType('approve');
                          setShowActionModal(true);
                        }}
                        className="flex-1 py-1.5 rounded-lg bg-green-500 text-white text-xs flex items-center justify-center space-x-1 hover:bg-green-600"
                      >
                        <FaThumbsUp className="w-3 h-3" />
                        <span>Approve</span>
                      </button>
                      <button
                        onClick={() => {
                          setSelectedFile(file);
                          setActionType('reject');
                          setShowActionModal(true);
                        }}
                        className="flex-1 py-1.5 rounded-lg bg-red-500 text-white text-xs flex items-center justify-center space-x-1 hover:bg-red-600"
                      >
                        <FaThumbsDown className="w-3 h-3" />
                        <span>Reject</span>
                      </button>
                      <button
                        onClick={() => {
                          setSelectedFile(file);
                          setActionType('reupload_request');
                          setShowActionModal(true);
                        }}
                        className="flex-1 py-1.5 rounded-lg bg-orange-500 text-white text-xs flex items-center justify-center space-x-1 hover:bg-orange-600"
                      >
                        <FaRedo className="w-3 h-3" />
                        <span>Re-upload</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
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

      {/* Preview Modal - Fixed with scrollable content */}
      {showPreviewModal && selectedFile && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-40" onClick={() => setShowPreviewModal(false)}></div>
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col border border-gray-200">
              {/* Fixed Header */}
              <div className="sticky top-0 bg-gradient-to-r from-orange-50 to-white border-b border-gray-200 p-6 rounded-t-2xl flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                      <FaEye className="w-6 h-6 text-orange-600" />
                      <span>File Preview</span>
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{selectedFile.fileName}</p>
                  </div>
                  <button
                    onClick={() => setShowPreviewModal(false)}
                    className="p-3 rounded-xl hover:bg-gray-100 transition-all duration-200"
                  >
                    <FaTimes className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>
              
              {/* Scrollable Content - Hide scrollbar */}
              <div className="flex-1 overflow-y-auto p-8" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <style jsx>{`
                  div::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>
                
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-10 flex items-center justify-center min-h-[400px] shadow-inner">
                  <div className="text-center">
                    <div className="relative">
                      <FaFilePdf className="w-32 h-32 text-red-500 mx-auto mb-6 animate-pulse" />
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                        <FaEye className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <p className="text-lg font-semibold text-gray-800 mb-2">{selectedFile.fileName}</p>
                    <p className="text-sm text-gray-600 mb-6">{formatFileSize(selectedFile.fileSize)}</p>
                    <button
                      onClick={() => window.open(selectedFile.url, '_blank')}
                      className="px-8 py-3 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
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
                    <span>File Details</span>
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-600 font-medium">Entity:</span>
                      <span className="text-blue-800">{selectedFile.entityName} ({selectedFile.entityId})</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-600 font-medium">File Type:</span>
                      <span className="text-blue-800">{selectedFile.fileTypeName}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-600 font-medium">Upload Date:</span>
                      <span className="text-blue-800">{formatDate(selectedFile.uploadDate).full}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-600 font-medium">Status:</span>
                      <span className={`font-medium ${getStatusBadge(selectedFile.status).color}`}>
                        {getStatusBadge(selectedFile.status).label}
                      </span>
                    </div>
                    {selectedFile.comment && (
                      <div className="mt-4 pt-4 border-t border-blue-200">
                        <p className="text-sm text-blue-600 font-medium mb-2">Comment:</p>
                        <p className="text-sm text-blue-800 bg-blue-100 p-3 rounded-lg">{selectedFile.comment}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Audit Log Modal - Fixed */}
      {showAuditLog && selectedFileAudit && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-40" onClick={() => setShowAuditLog(false)}></div>
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col border border-gray-200">
              {/* Fixed Header */}
              <div className="sticky top-0 bg-gradient-to-r from-orange-50 to-white border-b border-gray-200 p-6 rounded-t-2xl flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                      <FaHistory className="w-6 h-6 text-orange-600" />
                      <span>Audit Log</span>
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{selectedFileAudit.fileName}</p>
                  </div>
                  <button
                    onClick={() => setShowAuditLog(false)}
                    className="p-3 rounded-xl hover:bg-gray-100 transition-all duration-200"
                  >
                    <FaTimes className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>
              
              {/* Scrollable Content - Hide scrollbar */}
              <div className="flex-1 overflow-y-auto p-8" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <style jsx>{`
                  div::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>
                
                <div className="space-y-4">
                  {selectedFileAudit.auditLog.map((log, index) => {
                    const logDate = formatDate(log.timestamp);
                    const actionIcon = log.action === 'approve' ? <FaThumbsUp className="w-5 h-5 text-green-500" /> :
                                      log.action === 'reject' ? <FaThumbsDown className="w-5 h-5 text-red-500" /> :
                                      <FaRedo className="w-5 h-5 text-orange-500" />;
                    
                    return (
                      <div key={log.id} className="flex items-start space-x-4 p-5 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200">
                        <div className="p-2 bg-white rounded-lg shadow-sm">
                          {actionIcon}
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                            <div>
                              <p className="font-bold text-gray-900 capitalize text-lg">{log.action}</p>
                              <p className="text-sm text-gray-600">by {log.performedBy}</p>
                            </div>
                            <p className="text-sm text-gray-500 bg-white px-3 py-1 rounded-lg">{logDate.full}</p>
                          </div>
                          <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <p className="text-gray-700">
                              Status changed from <span className="font-semibold text-red-600">{log.previousStatus}</span> 
                              {' '}to <span className="font-semibold text-green-600">{log.newStatus}</span>
                            </p>
                            {log.comment && (
                              <p className="text-sm text-gray-600 mt-2 bg-gray-50 p-3 rounded-lg">
                                <span className="font-medium">Reason:</span> {log.comment}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Action Modal - Fixed */}
      {showActionModal && selectedFile && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-40" onClick={() => setShowActionModal(false)}></div>
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] flex flex-col border border-gray-200">
              {/* Fixed Header */}
              <div className="sticky top-0 bg-gradient-to-r from-orange-50 to-white border-b border-gray-200 p-6 rounded-t-2xl flex-shrink-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900 capitalize flex items-center space-x-2">
                    {actionType === 'approve' && <FaThumbsUp className="w-6 h-6 text-green-600" />}
                    {actionType === 'reject' && <FaThumbsDown className="w-6 h-6 text-red-600" />}
                    {actionType === 'reupload_request' && <FaRedo className="w-6 h-6 text-orange-600" />}
                    <span>{actionType} File</span>
                  </h3>
                  <button
                    onClick={() => setShowActionModal(false)}
                    className="p-3 rounded-xl hover:bg-gray-100 transition-all duration-200"
                  >
                    <FaTimes className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>
              
              {/* Scrollable Content - Hide scrollbar */}
              <div className="flex-1 overflow-y-auto p-8" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <style jsx>{`
                  div::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>
                
                <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                  <p className="text-sm font-semibold text-blue-800 mb-2 flex items-center space-x-2">
                    <FaFile className="w-4 h-4" />
                    <span>File Information</span>
                  </p>
                  <p className="font-bold text-blue-900 text-lg">{selectedFile.fileName}</p>
                  <p className="text-sm text-blue-700">{selectedFile.entityName} - {selectedFile.fileTypeName}</p>
                </div>
                
                {(actionType === 'reject' || actionType === 'reupload_request') && (
                  <div className="mb-8">
                    <label className="block text-sm font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                      <FaComment className="w-4 h-4 text-red-500" />
                      <span>Comment <span className="text-red-500">*</span></span>
                    </label>
                    <textarea
                      value={actionComment}
                      onChange={(e) => setActionComment(e.target.value)}
                      rows="4"
                      placeholder={actionType === 'reject' ? 
                        "Please provide a detailed reason for rejection..." : 
                        "Please provide clear instructions for re-upload..."}
                      className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 resize-none transition-all duration-200"
                      style={{ borderColor: 'var(--gray-300)', focusRingColor: 'var(--primary-orange)' }}
                    />
                  </div>
                )}
                
                {actionType === 'approve' && (
                  <div className="mb-8">
                    <label className="block text-sm font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                      <FaComment className="w-4 h-4 text-green-500" />
                      <span>Comment (Optional)</span>
                    </label>
                    <textarea
                      value={actionComment}
                      onChange={(e) => setActionComment(e.target.value)}
                      rows="3"
                      placeholder="Add any notes about this approval..."
                      className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 resize-none transition-all duration-200"
                      style={{ borderColor: 'var(--gray-300)', focusRingColor: 'var(--primary-orange)' }}
                    />
                  </div>
                )}
                
                <div className="flex space-x-4">
                  <button
                    onClick={() => setShowActionModal(false)}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleFileAction}
                    disabled={processingAction || ((actionType === 'reject' || actionType === 'reupload_request') && !actionComment)}
                    className={`flex-1 px-6 py-3 rounded-xl text-white font-semibold flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transition-all duration-300 ${
                      processingAction || ((actionType === 'reject' || actionType === 'reupload_request') && !actionComment)
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:opacity-90'
                    }`}
                    style={{ background: 'linear-gradient(135deg, var(--primary-orange), var(--secondary-orange))' }}
                  >
                    {processingAction ? (
                      <>
                        <FaSpinner className="w-5 h-5 animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <FaCheck className="w-5 h-5" />
                        <span>Confirm {actionType}</span>
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
                <span className="text-sm">Export Logs</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <FaShare className="w-5 h-5 text-green-500" />
                <span className="text-sm">Share Report</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <FaPrint className="w-5 h-5 text-purple-500" />
                <span className="text-sm">Print Summary</span>
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

export default VerificationFileManagement;