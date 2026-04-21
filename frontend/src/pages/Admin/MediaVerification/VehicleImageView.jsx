import React, { useState, useEffect } from 'react';
import {
  FaCar,
  FaCamera,
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
  FaFileImage,
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner,
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
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaIdCard,
  FaFileContract,
  FaFileAlt,
  FaPrint,
  FaShare,
  FaTrash,
  FaEdit,
  FaPlus,
  FaMinus
} from 'react-icons/fa';

const VehicleImageView = () => {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [verificationComment, setVerificationComment] = useState('');
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [processingVerification, setProcessingVerification] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(null);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterVerification, setFilterVerification] = useState('all');
  const [sortField, setSortField] = useState('driverName');
  const [sortDirection, setSortDirection] = useState('asc');
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  
  // UI states
  const [isMobileView, setIsMobileView] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [fullscreenMode, setFullscreenMode] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  const [viewMode, setViewMode] = useState('gallery');
  const [showStats, setShowStats] = useState(true);
  
  // Stats
  const [stats, setStats] = useState({
    totalVehicles: 0,
    totalImages: 0,
    verifiedVehicles: 0,
    pendingVehicles: 0,
    rejectedVehicles: 0,
    verificationRate: 0
  });

  // Image types
  const imageTypes = [
    { id: 'front', name: 'Front View', required: true },
    { id: 'back', name: 'Back View', required: true },
    { id: 'left', name: 'Left Side', required: true },
    { id: 'right', name: 'Right Side', required: true },
    { id: 'interior', name: 'Interior', required: false },
    { id: 'dashboard', name: 'Dashboard', required: false },
    { id: 'odometer', name: 'Odometer', required: false },
    { id: 'licensePlate', name: 'License Plate Close-up', required: true }
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

  // Fetch vehicles data
  useEffect(() => {
    fetchVehiclesData();
  }, []);

  const fetchVehiclesData = async () => {
    setLoading(true);
    setTimeout(() => {
      const mockVehicles = generateMockVehicles(20);
      setVehicles(mockVehicles);
      setFilteredVehicles(mockVehicles);
      calculateStats(mockVehicles);
      setLoading(false);
    }, 1000);
  };

  const generateMockVehicles = (count) => {
    const vehicles = [];
    const driverNames = [
      'Michael Rodriguez', 'Emily Chen', 'David Kim', 'Lisa Wang', 'James Wilson',
      'Maria Garcia', 'Robert Taylor', 'Jennifer Brown', 'William Davis', 'Patricia Miller'
    ];
    
    const makes = ['Toyota', 'Honda', 'Tesla', 'BMW', 'Ford', 'Hyundai', 'Nissan', 'Mercedes'];
    const models = ['Camry', 'Accord', 'Model 3', 'X5', 'F-150', 'Sonata', 'Altima', 'E-Class'];
    const colors = ['White', 'Black', 'Silver', 'Blue', 'Red', 'Gray', 'Green'];
    const statuses = ['pending', 'verified', 'rejected', 'in_review'];
    
    for (let i = 0; i < count; i++) {
      const driverName = driverNames[i % driverNames.length];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const verificationStatus = status === 'verified' ? 'approved' : (status === 'rejected' ? 'rejected' : 'pending');
      
      // Generate images for each vehicle
      const images = {};
      imageTypes.forEach(imgType => {
        const isUploaded = Math.random() > 0.1;
        if (isUploaded) {
          images[imgType.id] = {
            id: `IMG_${imgType.id}_${i}`,
            type: imgType.id,
            name: imgType.name,
            fileName: `${imgType.name}_${driverName.replace(' ', '_')}.jpg`,
            fileSize: Math.floor(Math.random() * 3000) + 500,
            uploadDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
            url: `https://picsum.photos/800/600?random=${i}${imgType.id}`,
            thumbnailUrl: `https://picsum.photos/200/150?random=${i}${imgType.id}`,
            status: verificationStatus,
            reviewComment: verificationStatus === 'rejected' ? 'Image is blurry, please upload clear photo' : null
          };
        } else {
          images[imgType.id] = null;
        }
      });
      
      vehicles.push({
        id: `VEH${String(i + 1).padStart(4, '0')}`,
        driverId: `DRV${String(i + 1).padStart(4, '0')}`,
        driverName: driverName,
        driverPhone: `+1 (555) ${String(Math.floor(Math.random() * 900) + 100)}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
        driverEmail: `${driverName.toLowerCase().replace(' ', '.')}@driver.com`,
        make: makes[Math.floor(Math.random() * makes.length)],
        model: models[Math.floor(Math.random() * models.length)],
        year: 2018 + Math.floor(Math.random() * 6),
        color: colors[Math.floor(Math.random() * colors.length)],
        licensePlate: `${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String(Math.floor(Math.random() * 9000) + 1000)}`,
        status: status,
        verificationStatus: verificationStatus,
        images: images,
        submittedDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        verifiedDate: status !== 'pending' ? new Date().toISOString() : null,
        verifiedBy: status !== 'pending' ? 'Admin User' : null,
        notes: status === 'rejected' ? 'License plate not clearly visible' : null
      });
    }
    return vehicles;
  };

  const calculateStats = (vehiclesData) => {
    let totalImages = 0;
    let verifiedVehicles = 0;
    let pendingVehicles = 0;
    let rejectedVehicles = 0;
    
    vehiclesData.forEach(vehicle => {
      Object.values(vehicle.images).forEach(img => {
        if (img) totalImages++;
      });
      if (vehicle.verificationStatus === 'approved') verifiedVehicles++;
      if (vehicle.verificationStatus === 'pending') pendingVehicles++;
      if (vehicle.verificationStatus === 'rejected') rejectedVehicles++;
    });
    
    setStats({
      totalVehicles: vehiclesData.length,
      totalImages: totalImages,
      verifiedVehicles: verifiedVehicles,
      pendingVehicles: pendingVehicles,
      rejectedVehicles: rejectedVehicles,
      verificationRate: vehiclesData.length > 0 ? ((verifiedVehicles / vehiclesData.length) * 100).toFixed(1) : 0
    });
  };

  // Filter and sort vehicles
  useEffect(() => {
    let filtered = [...vehicles];
    
    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(vehicle =>
        vehicle.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `${vehicle.make} ${vehicle.model}`.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(vehicle => vehicle.status === filterStatus);
    }
    
    // Verification filter
    if (filterVerification !== 'all') {
      filtered = filtered.filter(vehicle => vehicle.verificationStatus === filterVerification);
    }
    
    // Sorting
    filtered.sort((a, b) => {
      let aVal, bVal;
      
      switch(sortField) {
        case 'driverName':
          aVal = a.driverName;
          bVal = b.driverName;
          break;
        case 'licensePlate':
          aVal = a.licensePlate;
          bVal = b.licensePlate;
          break;
        case 'submittedDate':
          aVal = new Date(a.submittedDate);
          bVal = new Date(b.submittedDate);
          break;
        default:
          aVal = a.driverName;
          bVal = b.driverName;
      }
      
      if (sortDirection === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });
    
    setFilteredVehicles(filtered);
    setCurrentPage(1);
  }, [vehicles, searchTerm, filterStatus, filterVerification, sortField, sortDirection]);

  // Handle verification
  const handleVerification = async () => {
    if (!verificationStatus) {
      alert('Please select approve or reject');
      return;
    }
    
    if (verificationStatus === 'reject' && !verificationComment) {
      alert('Please provide a reason for rejection');
      return;
    }
    
    setProcessingVerification(true);
    
    setTimeout(() => {
      // Update vehicle status
      const updatedVehicles = vehicles.map(vehicle => {
        if (vehicle.id === selectedVehicle.id) {
          return {
            ...vehicle,
            verificationStatus: verificationStatus === 'approve' ? 'approved' : 'rejected',
            status: verificationStatus === 'approve' ? 'verified' : 'rejected',
            verifiedDate: new Date().toISOString(),
            verifiedBy: 'Admin User',
            notes: verificationStatus === 'reject' ? verificationComment : null
          };
        }
        return vehicle;
      });
      
      setVehicles(updatedVehicles);
      calculateStats(updatedVehicles);
      
      setVerificationSuccess({
        success: true,
        message: `Vehicle ${verificationStatus === 'approve' ? 'verified' : 'rejected'} successfully`
      });
      
      setShowVerificationModal(false);
      setVerificationComment('');
      setVerificationStatus(null);
      setProcessingVerification(false);
      
      setTimeout(() => {
        setVerificationSuccess(null);
      }, 5000);
    }, 1500);
  };

  // Get status badge
  const getStatusBadge = (status) => {
    const statusMap = {
      'verified': { color: 'text-green-600', bg: 'bg-green-100', icon: FaCheckCircle, label: 'Verified' },
      'pending': { color: 'text-yellow-600', bg: 'bg-yellow-100', icon: FaSpinner, label: 'Pending' },
      'rejected': { color: 'text-red-600', bg: 'bg-red-100', icon: FaTimesCircle, label: 'Rejected' },
      'in_review': { color: 'text-blue-600', bg: 'bg-blue-100', icon: FaEye, label: 'In Review' }
    };
    const info = statusMap[status] || statusMap['pending'];
    const Icon = info.icon;
    return { ...info, Icon };
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
  const currentItems = filteredVehicles.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <FaSpinner className="w-10 h-10 sm:w-12 sm:h-12 animate-spin mx-auto mb-4" style={{ color: 'var(--primary-orange)' }} />
          <p className="text-sm sm:text-base text-gray-600">Loading vehicle images...</p>
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
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Vehicle Images</h1>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">View uploaded vehicle images submitted by drivers</p>
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
                onClick={() => setViewMode(viewMode === 'gallery' ? 'list' : 'gallery')}
                className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {viewMode === 'gallery' ? <FaFileImage className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" /> : <FaCar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />}
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
      {verificationSuccess && (
        <div className="fixed top-20 right-4 z-50 animate-slide-in max-w-sm">
          <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-lg shadow-lg">
            <div className="flex items-center space-x-3">
              <FaCheckCircle className="w-5 h-5 text-green-400" />
              <div>
                <p className="text-green-800 text-sm font-medium">Verification Successful</p>
                <p className="text-green-700 text-xs">{verificationSuccess.message}</p>
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
                  <FaCar className="w-5 h-5 text-blue-500" />
                  <span className="text-xs text-gray-500">Vehicles</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">{stats.totalVehicles}</div>
                <div className="text-xs text-gray-600">Total Vehicles</div>
              </div>
            </div>
            <div className="w-1/2 sm:w-1/3 lg:w-1/6 px-2 mb-4">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center justify-between mb-2">
                  <FaCamera className="w-5 h-5 text-green-500" />
                  <span className="text-xs text-gray-500">Images</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">{stats.totalImages}</div>
                <div className="text-xs text-gray-600">Total Images</div>
              </div>
            </div>
            <div className="w-1/2 sm:w-1/3 lg:w-1/6 px-2 mb-4">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center justify-between mb-2">
                  <FaCheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-xs text-gray-500">Verified</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">{stats.verifiedVehicles}</div>
                <div className="text-xs text-gray-600">Verified</div>
              </div>
            </div>
            <div className="w-1/2 sm:w-1/3 lg:w-1/6 px-2 mb-4">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center justify-between mb-2">
                  <FaSpinner className="w-5 h-5 text-yellow-500" />
                  <span className="text-xs text-gray-500">Pending</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">{stats.pendingVehicles}</div>
                <div className="text-xs text-gray-600">Pending</div>
              </div>
            </div>
            <div className="w-1/2 sm:w-1/3 lg:w-1/6 px-2 mb-4">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center justify-between mb-2">
                  <FaTimesCircle className="w-5 h-5 text-red-500" />
                  <span className="text-xs text-gray-500">Rejected</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">{stats.rejectedVehicles}</div>
                <div className="text-xs text-gray-600">Rejected</div>
              </div>
            </div>
            <div className="w-1/2 sm:w-1/3 lg:w-1/6 px-2 mb-4">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center justify-between mb-2">
                  <FaChartLine className="w-5 h-5 text-purple-500" />
                  <span className="text-xs text-gray-500">Rate</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">{stats.verificationRate}%</div>
                <div className="text-xs text-gray-600">Verification Rate</div>
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
                  placeholder="Search by driver, plate, or vehicle..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm"
                  style={{ borderColor: 'var(--gray-300)', focusRingColor: 'var(--primary-orange)' }}
                />
              </div>
            </div>
            
            <div className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm"
                style={{ borderColor: 'var(--gray-300)', focusRingColor: 'var(--primary-orange)' }}
              >
                <option value="all">All Status</option>
                <option value="verified">Verified</option>
                <option value="pending">Pending</option>
                <option value="in_review">In Review</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            
            <div className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Verification Status</label>
              <select
                value={filterVerification}
                onChange={(e) => setFilterVerification(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm"
                style={{ borderColor: 'var(--gray-300)', focusRingColor: 'var(--primary-orange)' }}
              >
                <option value="all">All</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <p className="text-sm text-gray-600">
          Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredVehicles.length)} of {filteredVehicles.length} vehicles
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
            <option value={8}>8</option>
            <option value={12}>12</option>
            <option value={16}>16</option>
            <option value={24}>24</option>
          </select>
        </div>
      </div>

      {/* Gallery View */}
      {viewMode === 'gallery' ? (
        <div className="flex flex-wrap -mx-2">
          {currentItems.map((vehicle) => {
            const statusBadge = getStatusBadge(vehicle.status);
            const StatusIcon = statusBadge.Icon;
            
            // Get first available image for thumbnail
            const thumbnailImage = Object.values(vehicle.images).find(img => img !== null);
            
            return (
              <div key={vehicle.id} className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 px-2 mb-4">
                <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                  {/* Image Thumbnail */}
                  <div 
                    className="relative h-48 bg-gray-100 cursor-pointer overflow-hidden"
                    onClick={() => {
                      setSelectedVehicle(vehicle);
                      setSelectedImage(thumbnailImage);
                      setShowImageModal(true);
                    }}
                  >
                    {thumbnailImage ? (
                      <img 
                        src={thumbnailImage.thumbnailUrl} 
                        alt={vehicle.licensePlate}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <FaCar className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                    <div className="absolute top-2 right-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${statusBadge.bg} ${statusBadge.color} flex items-center space-x-1`}>
                        <StatusIcon className="w-3 h-3" />
                        <span>{statusBadge.label}</span>
                      </span>
                    </div>
                  </div>
                  
                  {/* Vehicle Info */}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{vehicle.make} {vehicle.model}</h3>
                      <p className="text-sm text-gray-500">{vehicle.year}</p>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{vehicle.licensePlate}</p>
                    <p className="text-sm text-gray-600">{vehicle.color}</p>
                    <div className="mt-2 pt-2 border-t border-gray-100">
                      <p className="text-xs text-gray-500">Driver: {vehicle.driverName}</p>
                      <p className="text-xs text-gray-500">Submitted: {formatDate(vehicle.submittedDate)}</p>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex space-x-2 mt-3">
                      <button
                        onClick={() => {
                          setSelectedVehicle(vehicle);
                          setShowImageModal(true);
                        }}
                        className="flex-1 py-1.5 rounded-lg border border-gray-300 text-gray-600 text-xs flex items-center justify-center space-x-1 hover:bg-gray-50"
                      >
                        <FaEye className="w-3 h-3" />
                        <span>View Images</span>
                      </button>
                      {vehicle.verificationStatus === 'pending' && (
                        <button
                          onClick={() => {
                            setSelectedVehicle(vehicle);
                            setShowVerificationModal(true);
                          }}
                          className="flex-1 py-1.5 rounded-lg text-white text-xs flex items-center justify-center space-x-1 hover:opacity-90"
                          style={{ backgroundColor: 'var(--primary-orange)' }}
                        >
                          <FaCheck className="w-3 h-3" />
                          <span>Verify</span>
                        </button>
                      )}
                    </div>
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
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => toggleSort('driverName')}>
                    Driver
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => toggleSort('licensePlate')}>
                    License Plate
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Images</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.map((vehicle) => {
                  const statusBadge = getStatusBadge(vehicle.status);
                  const StatusIcon = statusBadge.Icon;
                  const imageCount = Object.values(vehicle.images).filter(img => img !== null).length;
                  
                  return (
                    <tr key={vehicle.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{vehicle.driverName}</p>
                          <p className="text-xs text-gray-500">{vehicle.driverId}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm text-gray-700">{vehicle.make} {vehicle.model} ({vehicle.year})</p>
                        <p className="text-xs text-gray-500">{vehicle.color}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm font-mono text-gray-900">{vehicle.licensePlate}</p>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-1">
                          <FaCamera className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{imageCount} images</span>
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
                              setSelectedVehicle(vehicle);
                              setShowImageModal(true);
                            }}
                            className="p-1.5 rounded-lg hover:bg-gray-100"
                            title="View Images"
                          >
                            <FaEye className="w-4 h-4 text-orange-500" />
                          </button>
                          {vehicle.verificationStatus === 'pending' && (
                            <button
                              onClick={() => {
                                setSelectedVehicle(vehicle);
                                setShowVerificationModal(true);
                              }}
                              className="px-2 py-1 rounded-lg text-white text-xs"
                              style={{ backgroundColor: 'var(--primary-orange)' }}
                            >
                              Verify
                            </button>
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

      {/* Image Gallery Modal - Fixed Scrolling Issue */}
      {showImageModal && selectedVehicle && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-75 z-40" onClick={() => setShowImageModal(false)}></div>
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] flex flex-col border border-gray-200">
              {/* Fixed Header - No Scroll */}
              <div className="sticky top-0 bg-gradient-to-r from-orange-50 to-white border-b border-gray-200 p-6 rounded-t-2xl flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                      <FaCamera className="w-6 h-6 text-orange-600" />
                      <span>Vehicle Images</span>
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{selectedVehicle.make} {selectedVehicle.model} - {selectedVehicle.licensePlate}</p>
                    <p className="text-xs text-gray-500">Driver: {selectedVehicle.driverName}</p>
                  </div>
                  <button
                    onClick={() => setShowImageModal(false)}
                    className="p-3 rounded-xl hover:bg-gray-100 transition-all duration-200"
                  >
                    <FaTimes className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>
              
              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-8">
                <div className="flex flex-wrap -mx-2">
                  {imageTypes.map(imgType => {
                    const image = selectedVehicle.images[imgType.id];
                    const statusBadge = image ? getStatusBadge(image.status) : null;
                    
                    return (
                      <div key={imgType.id} className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-6">
                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200">
                          <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200">
                            {image ? (
                              <img 
                                src={image.url} 
                                alt={imgType.name}
                                className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-200"
                                onClick={() => setSelectedImage(image)}
                              />
                            ) : (
                              <div className="flex items-center justify-center h-full">
                                <div className="text-center">
                                  <FaCamera className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                  <p className="text-sm text-gray-500 font-medium">Not Uploaded</p>
                                </div>
                              </div>
                            )}
                            {image && (
                              <div className="absolute top-3 right-3">
                                <span className={`px-3 py-1 text-xs rounded-full font-semibold shadow-sm ${statusBadge.bg} ${statusBadge.color}`}>
                                  {statusBadge.label}
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="p-4">
                            <p className="text-sm font-bold text-gray-800 mb-2">{imgType.name}</p>
                            {image && (
                              <div className="flex justify-between items-center">
                                <p className="text-xs text-gray-600 bg-white px-2 py-1 rounded-lg">{formatDate(image.uploadDate)}</p>
                                <div className="flex items-center space-x-2">
                                  <button
                                    onClick={() => window.open(image.url, '_blank')}
                                    className="p-2 hover:bg-orange-100 rounded-lg transition-colors duration-200"
                                    title="Download"
                                  >
                                    <FaDownload className="w-4 h-4 text-blue-600" />
                                  </button>
                                  <button
                                    onClick={() => setSelectedImage(image)}
                                    className="p-2 hover:bg-orange-100 rounded-lg transition-colors duration-200"
                                    title="View Full Size"
                                  >
                                    <FaExpand className="w-4 h-4 text-gray-600" />
                                  </button>
                                </div>
                              </div>
                            )}
                            {image?.reviewComment && (
                              <p className="text-xs text-red-600 mt-3 bg-red-50 p-2 rounded-lg font-medium">{image.reviewComment}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {selectedVehicle.verificationStatus === 'pending' && (
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <button
                      onClick={() => {
                        setShowImageModal(false);
                        setShowVerificationModal(true);
                      }}
                      className="w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                      style={{ background: 'linear-gradient(135deg, var(--primary-orange), var(--secondary-orange))' }}
                    >
                      <span className="flex items-center justify-center space-x-2">
                        <FaCheck className="w-5 h-5" />
                        <span>Verify Vehicle</span>
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Full Image Modal */}
      {selectedImage && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-95 z-50" onClick={() => setSelectedImage(null)}></div>
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
            <div className="relative max-w-5xl w-full">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 p-2 rounded-lg text-white hover:bg-white/10"
              >
                <FaTimes className="w-6 h-6" />
              </button>
              <img 
                src={selectedImage.url} 
                alt={selectedImage.name}
                className="w-full h-auto rounded-lg shadow-2xl"
              />
              <div className="absolute bottom-4 left-0 right-0 text-center text-white bg-black/50 py-2 mx-4 rounded-lg">
                <p className="text-sm">{selectedImage.name}</p>
                <p className="text-xs opacity-75">{selectedVehicle?.make} {selectedVehicle?.model} - {selectedVehicle?.licensePlate}</p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Verification Modal */}
      {showVerificationModal && selectedVehicle && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-40" onClick={() => setShowVerificationModal(false)}></div>
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-gray-200">
              <div className="flex items-center justify-between p-6 border-b border-gray-200 rounded-t-2xl bg-gradient-to-r from-orange-50 to-white">
                <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                  <FaCheckCircle className="w-6 h-6 text-orange-600" />
                  <span>Verify Vehicle</span>
                </h3>
                <button
                  onClick={() => setShowVerificationModal(false)}
                  className="p-3 rounded-xl hover:bg-gray-100 transition-all duration-200"
                >
                  <FaTimes className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              
              <div className="p-8">
                <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                  <p className="text-sm font-semibold text-blue-800 mb-2 flex items-center space-x-2">
                    <FaCar className="w-4 h-4" />
                    <span>Vehicle Information</span>
                  </p>
                  <p className="font-bold text-blue-900 text-lg">{selectedVehicle.make} {selectedVehicle.model} ({selectedVehicle.year})</p>
                  <p className="text-sm text-blue-700">License Plate: {selectedVehicle.licensePlate}</p>
                  <p className="text-sm text-blue-700">Driver: {selectedVehicle.driverName}</p>
                </div>
                
                <div className="mb-6">
                  <label className="block text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                    <FaCheckCircle className="w-5 h-5 text-green-600" />
                    <span>Decision</span>
                  </label>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setVerificationStatus('approve')}
                      className={`flex-1 py-4 rounded-xl border-2 flex items-center justify-center space-x-3 font-semibold transition-all duration-300 ${
                        verificationStatus === 'approve'
                          ? 'bg-green-500 text-white border-green-500 shadow-lg'
                          : 'border-gray-300 text-gray-700 hover:bg-green-50 hover:border-green-300'
                      }`}
                    >
                      <FaThumbsUp className="w-5 h-5" />
                      <span>Approve</span>
                    </button>
                    <button
                      onClick={() => setVerificationStatus('reject')}
                      className={`flex-1 py-4 rounded-xl border-2 flex items-center justify-center space-x-3 font-semibold transition-all duration-300 ${
                        verificationStatus === 'reject'
                          ? 'bg-red-500 text-white border-red-500 shadow-lg'
                          : 'border-gray-300 text-gray-700 hover:bg-red-50 hover:border-red-300'
                      }`}
                    >
                      <FaThumbsDown className="w-5 h-5" />
                      <span>Reject</span>
                    </button>
                  </div>
                </div>
                
                {verificationStatus === 'reject' && (
                  <div className="mb-8">
                    <label className="block text-sm font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                      <FaComment className="w-4 h-4 text-red-500" />
                      <span>Reason for Rejection <span className="text-red-500">*</span></span>
                    </label>
                    <textarea
                      value={verificationComment}
                      onChange={(e) => setVerificationComment(e.target.value)}
                      rows="4"
                      placeholder="Please provide a detailed reason for rejecting these images..."
                      className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 resize-none transition-all duration-200"
                      style={{ borderColor: 'var(--gray-300)', focusRingColor: 'var(--primary-orange)' }}
                    />
                  </div>
                )}
                
                <div className="flex space-x-4">
                  <button
                    onClick={() => setShowVerificationModal(false)}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleVerification}
                    disabled={processingVerification || (verificationStatus === 'reject' && !verificationComment)}
                    className={`flex-1 px-6 py-3 rounded-xl text-white font-semibold flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transition-all duration-300 ${
                      processingVerification || (verificationStatus === 'reject' && !verificationComment)
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:opacity-90'
                    }`}
                    style={{ background: 'linear-gradient(135deg, var(--primary-orange), var(--secondary-orange))' }}
                  >
                    {processingVerification ? (
                      <>
                        <FaSpinner className="w-5 h-5 animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <FaCheck className="w-5 h-5" />
                        <span>Submit</span>
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

export default VehicleImageView;