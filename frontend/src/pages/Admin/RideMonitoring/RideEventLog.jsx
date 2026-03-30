import React, { useState, useEffect } from 'react';
import {
  FaUserCheck,
  FaMapMarkerAlt,
  FaCar,
  FaFlagCheckered,
  FaClock,
  FaFilter,
  FaSearch,
  FaDownload,
  FaShare,
  FaPrint,
  FaChartLine,
  FaCalendarAlt,
  FaUser,
  FaTruck,
  FaRoute,
  FaInfoCircle,
  FaExclamationTriangle,
  FaCheckCircle,
  FaSpinner,
  FaBars,
  FaTimes,
  FaEye,
  FaEyeSlash,
  FaArrowLeft,
  FaCopy,
  FaCheck,
  FaExpand,
  FaCompress,
  FaMobile,
  FaDesktop,
  FaTablet,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaHistory
} from 'react-icons/fa';

const RideEventLog = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [eventTypeFilter, setEventTypeFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');
  const [sortField, setSortField] = useState('timestamp');
  const [sortDirection, setSortDirection] = useState('desc');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [fullscreenMode, setFullscreenMode] = useState(false);
  const [showStats, setShowStats] = useState(true);
  const [copiedField, setCopiedField] = useState(null);
  const [viewMode, setViewMode] = useState('timeline'); // timeline or list
  const [rideId, setRideId] = useState('RID20240315-001');

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setIsMobileView(isMobile);
      if (isMobile) {
        setSidebarOpen(false);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Simulate API call to fetch ride events
  useEffect(() => {
    fetchRideEvents();
  }, [rideId]);

  const fetchRideEvents = async () => {
    setLoading(true);
    setTimeout(() => {
      const mockEvents = [
        {
          id: 'EVT001',
          type: 'DriverAssigned',
          rideId: 'RID20240315-001',
          timestamp: '2024-03-15T14:30:00Z',
          description: 'Driver assigned to ride',
          metadata: {
            driverId: 'DRV9876',
            driverName: 'Michael Rodriguez',
            driverPhone: '+1 (555) 987-6543',
            driverRating: 4.8,
            vehicle: 'Toyota Camry 2023',
            licensePlate: 'ABC-1234',
            eta: 3.5,
            distanceFromPickup: 1.2,
            assignedBy: 'System Auto-assign'
          },
          status: 'completed',
          location: { lat: 40.7128, lng: -74.0060 }
        },
        {
          id: 'EVT002',
          type: 'DriverArrived',
          rideId: 'RID20240315-001',
          timestamp: '2024-03-15T14:32:00Z',
          description: 'Driver arrived at pickup location',
          metadata: {
            driverId: 'DRV9876',
            driverName: 'Michael Rodriguez',
            arrivalTime: '2024-03-15T14:32:00Z',
            waitTime: 120,
            pickupLocation: '123 Main Street, New York, NY 10001',
            coordinates: { lat: 40.7128, lng: -74.0060 },
            notifiedCustomer: true,
            customerResponse: 'Acknowledged'
          },
          status: 'completed',
          location: { lat: 40.7128, lng: -74.0060 }
        },
        {
          id: 'EVT003',
          type: 'TripStarted',
          rideId: 'RID20240315-001',
          timestamp: '2024-03-15T14:32:15Z',
          description: 'Trip started',
          metadata: {
            driverId: 'DRV9876',
            startOdometer: 45230,
            startLocation: '123 Main Street, New York, NY 10001',
            startCoordinates: { lat: 40.7128, lng: -74.0060 },
            estimatedDuration: 1980,
            estimatedDistance: 4.2,
            route: 'Optimal route calculated',
            trafficCondition: 'Moderate'
          },
          status: 'completed',
          location: { lat: 40.7128, lng: -74.0060 }
        },
        {
          id: 'EVT004',
          type: 'TripCompleted',
          rideId: 'RID20240315-001',
          timestamp: '2024-03-15T15:05:42Z',
          description: 'Trip completed successfully',
          metadata: {
            driverId: 'DRV9876',
            endOdometer: 45275,
            endLocation: '456 Broadway, New York, NY 10036',
            endCoordinates: { lat: 40.7580, lng: -73.9855 },
            actualDuration: 2007,
            actualDistance: 4.2,
            totalFare: 23.13,
            paymentMethod: 'Credit Card',
            tip: 3.00,
            rating: 4.5,
            feedback: 'Great ride! Driver was very professional.'
          },
          status: 'completed',
          location: { lat: 40.7580, lng: -73.9855 }
        }
      ];
      
      setEvents(mockEvents);
      setFilteredEvents(mockEvents);
      setLoading(false);
    }, 1000);
  };

  // Filter and sort events
  useEffect(() => {
    let filtered = [...events];
    
    // Filter by event type
    if (eventTypeFilter !== 'all') {
      filtered = filtered.filter(event => event.type === eventTypeFilter);
    }
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(event => 
        event.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.metadata.driverName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by date
    if (dateFilter) {
      filtered = filtered.filter(event => {
        const eventDate = new Date(event.timestamp).toISOString().split('T')[0];
        return eventDate === dateFilter;
      });
    }
    
    // Sort events
    filtered.sort((a, b) => {
      let aVal, bVal;
      
      switch(sortField) {
        case 'timestamp':
          aVal = new Date(a.timestamp);
          bVal = new Date(b.timestamp);
          break;
        case 'type':
          aVal = a.type;
          bVal = b.type;
          break;
        case 'duration':
          aVal = a.metadata.actualDuration || 0;
          bVal = b.metadata.actualDuration || 0;
          break;
        default:
          aVal = a[sortField];
          bVal = b[sortField];
      }
      
      if (sortDirection === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });
    
    setFilteredEvents(filtered);
  }, [events, eventTypeFilter, searchTerm, dateFilter, sortField, sortDirection]);

  // Format date and time
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      full: date.toLocaleString('en-US')
    };
  };

  // Calculate duration between events
  const calculateDuration = (startEvent, endEvent) => {
    if (!startEvent || !endEvent) return null;
    const start = new Date(startEvent.timestamp);
    const end = new Date(endEvent.timestamp);
    const durationMs = end - start;
    const seconds = Math.floor(durationMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return { minutes, seconds, formatted: `${minutes}m ${remainingSeconds}s` };
  };

  // Get event icon and color
  const getEventInfo = (type) => {
    const eventMap = {
      'DriverAssigned': {
        icon: FaUserCheck,
        color: 'text-blue-600',
        bg: 'bg-blue-100',
        border: 'border-blue-200',
        label: 'Driver Assigned'
      },
      'DriverArrived': {
        icon: FaMapMarkerAlt,
        color: 'text-purple-600',
        bg: 'bg-purple-100',
        border: 'border-purple-200',
        label: 'Driver Arrived'
      },
      'TripStarted': {
        icon: FaCar,
        color: 'text-green-600',
        bg: 'bg-green-100',
        border: 'border-green-200',
        label: 'Trip Started'
      },
      'TripCompleted': {
        icon: FaFlagCheckered,
        color: 'text-orange-600',
        bg: 'bg-orange-100',
        border: 'border-orange-200',
        label: 'Trip Completed'
      }
    };
    return eventMap[type] || {
      icon: FaInfoCircle,
      color: 'text-gray-600',
      bg: 'bg-gray-100',
      border: 'border-gray-200',
      label: type
    };
  };

  // Copy to clipboard
  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
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

  // Export events as JSON
  const exportEvents = () => {
    const dataStr = JSON.stringify(filteredEvents, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `ride_events_${rideId}_${new Date().toISOString()}.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // Calculate statistics
  const calculateStats = () => {
    const totalEvents = events.length;
    const completedEvents = events.filter(e => e.status === 'completed').length;
    const driverAssigned = events.find(e => e.type === 'DriverAssigned');
    const tripStarted = events.find(e => e.type === 'TripStarted');
    const tripCompleted = events.find(e => e.type === 'TripCompleted');
    
    const duration = calculateDuration(driverAssigned, tripCompleted);
    
    return {
      totalEvents,
      completedEvents,
      completionRate: ((completedEvents / totalEvents) * 100).toFixed(1),
      totalDuration: duration ? duration.formatted : 'N/A',
      avgEventTime: totalEvents > 0 ? (duration?.minutes / totalEvents).toFixed(1) : 'N/A'
    };
  };

  const stats = calculateStats();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <FaSpinner className="w-10 h-10 sm:w-12 sm:h-12 animate-spin mx-auto mb-4" style={{ color: 'var(--primary-orange)' }} />
          <p className="text-sm sm:text-base text-gray-600">Loading ride events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-50 ${fullscreenMode ? 'fixed inset-0 z-50 overflow-auto' : ''}`}>
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-20">
        <div className="px-2 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div>
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Ride Event Log</h1>
                <div className="flex items-center space-x-2 mt-0.5">
                  <p className="text-xs sm:text-sm text-gray-500">Ride ID: {rideId}</p>
                  <button
                    onClick={() => copyToClipboard(rideId, 'rideId')}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                  >
                    {copiedField === 'rideId' ? 
                      <FaCheck className="w-3 h-3 text-green-500" /> : 
                      <FaCopy className="w-3 h-3 text-gray-400" />
                    }
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <button
                onClick={exportEvents}
                className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors"
                title="Export events"
              >
                <FaDownload className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </button>
              <button className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <FaShare className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </button>
              <button className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <FaPrint className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
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

      <div className="sm:py-6">
        {/* Stats Cards */}
        {showStats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
              <div className="flex items-center justify-between mb-2">
                <FaHistory className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                <span className="text-xs text-gray-500">Total</span>
              </div>
              <div className="text-xl sm:text-2xl font-bold text-gray-900">{stats.totalEvents}</div>
              <div className="text-xs text-gray-600">Events</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
              <div className="flex items-center justify-between mb-2">
                <FaCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                <span className="text-xs text-gray-500">Completed</span>
              </div>
              <div className="text-xl sm:text-2xl font-bold text-gray-900">{stats.completedEvents}</div>
              <div className="text-xs text-gray-600">{stats.completionRate}% Rate</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
              <div className="flex items-center justify-between mb-2">
                <FaClock className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
                <span className="text-xs text-gray-500">Duration</span>
              </div>
              <div className="text-sm sm:text-base font-bold text-gray-900">{stats.totalDuration}</div>
              <div className="text-xs text-gray-600">Total Trip Time</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
              <div className="flex items-center justify-between mb-2">
                <FaChartLine className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                <span className="text-xs text-gray-500">Avg Time</span>
              </div>
              <div className="text-xl sm:text-2xl font-bold text-gray-900">{stats.avgEventTime}</div>
              <div className="text-xs text-gray-600">Minutes/Event</div>
            </div>
          </div>
        )}

        {/* Filters and Controls */}
        <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search events by type, description, or driver..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm"
                style={{
                  borderColor: 'var(--gray-300)',
                  focusRingColor: 'var(--primary-orange)'
                }}
              />
            </div>
            
            {/* Event Type Filter */}
            <div className="relative">
              <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={eventTypeFilter}
                onChange={(e) => setEventTypeFilter(e.target.value)}
                className="pl-9 pr-8 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm appearance-none bg-white"
                style={{
                  borderColor: 'var(--gray-300)',
                  focusRingColor: 'var(--primary-orange)'
                }}
              >
                <option value="all">All Events</option>
                <option value="DriverAssigned">Driver Assigned</option>
                <option value="DriverArrived">Driver Arrived</option>
                <option value="TripStarted">Trip Started</option>
                <option value="TripCompleted">Trip Completed</option>
              </select>
            </div>
            
            {/* Date Filter */}
            <div className="relative">
              <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="pl-9 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm"
                style={{
                  borderColor: 'var(--gray-300)',
                  focusRingColor: 'var(--primary-orange)'
                }}
              />
            </div>
            
            {/* View Mode Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('timeline')}
                className={`px-3 py-1 rounded-md text-sm transition-colors ${
                  viewMode === 'timeline' ? 'bg-white shadow-sm' : 'text-gray-600'
                }`}
              >
                Timeline
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1 rounded-md text-sm transition-colors ${
                  viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-600'
                }`}
              >
                List
              </button>
            </div>
            
            {/* Toggle Stats */}
            <button
              onClick={() => setShowStats(!showStats)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              title={showStats ? 'Hide stats' : 'Show stats'}
            >
              {showStats ? <FaEyeSlash className="w-4 h-4 text-gray-600" /> : <FaEye className="w-4 h-4 text-gray-600" />}
            </button>
          </div>
        </div>

        {/* Events Display */}
        {viewMode === 'timeline' ? (
          // Timeline View
          <div className="relative">
            <div className="absolute left-5 sm:left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            <div className="space-y-6 sm:space-y-8">
              {filteredEvents.map((event, index) => {
                const EventIcon = getEventInfo(event.type).icon;
                const eventInfo = getEventInfo(event.type);
                const eventTime = formatDateTime(event.timestamp);
                const prevEvent = index > 0 ? filteredEvents[index - 1] : null;
                const duration = prevEvent ? calculateDuration(prevEvent, event) : null;
                
                return (
                  <div key={event.id} className="relative">
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <div className="relative z-10">
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${eventInfo.bg} flex items-center justify-center ring-4 ring-white`}>
                          <EventIcon className={`w-5 h-5 sm:w-6 sm:h-6 ${eventInfo.color}`} />
                        </div>
                      </div>
                      <div className="flex-1 bg-white rounded-lg shadow-sm p-4 sm:p-6 hover:shadow-md transition-shadow">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                          <div>
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                              {eventInfo.label}
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-600 mt-1">{event.description}</p>
                          </div>
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <FaClock className="w-3 h-3" />
                            <span>{eventTime.date} at {eventTime.time}</span>
                          </div>
                        </div>
                        
                        {/* Duration from previous event */}
                        {duration && (
                          <div className="mb-3 p-2 bg-gray-50 rounded-lg text-xs text-gray-600">
                            ⏱️ Duration since previous event: {duration.formatted}
                          </div>
                        )}
                        
                        {/* Metadata */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 pt-3 border-t border-gray-100">
                          {Object.entries(event.metadata).map(([key, value]) => (
                            <div key={key} className="text-xs">
                              <span className="font-medium text-gray-700">
                                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
                              </span>
                              <span className="ml-2 text-gray-600 break-words">
                                {typeof value === 'object' ? JSON.stringify(value) : value}
                              </span>
                              {typeof value === 'string' && (value.includes('@') || value.includes('+1')) && (
                                <button
                                  onClick={() => copyToClipboard(value, key)}
                                  className="ml-2 p-1 hover:bg-gray-100 rounded"
                                >
                                  {copiedField === key ? 
                                    <FaCheck className="w-3 h-3 text-green-500" /> : 
                                    <FaCopy className="w-3 h-3 text-gray-400" />
                                  }
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {filteredEvents.length === 0 && (
              <div className="text-center py-12">
                <FaExclamationTriangle className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                <p className="text-gray-500">No events found matching your filters</p>
              </div>
            )}
          </div>
        ) : (
          // List View
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {['Event Type', 'Description', 'Timestamp', 'Metadata', ''].map((header, idx) => (
                      <th key={idx} className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredEvents.map((event) => {
                    const EventIcon = getEventInfo(event.type).icon;
                    const eventInfo = getEventInfo(event.type);
                    const eventTime = formatDateTime(event.timestamp);
                    
                    return (
                      <tr key={event.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedEvent(event)}>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <EventIcon className={`w-4 h-4 sm:w-5 sm:h-5 ${eventInfo.color}`} />
                            <span className="text-xs sm:text-sm font-medium text-gray-900">{eventInfo.label}</span>
                          </div>
                        </td>
                        <td className="px-3 sm:px-6 py-4">
                          <div className="text-xs sm:text-sm text-gray-600">{event.description}</div>
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                          <div className="text-xs sm:text-sm text-gray-600">{eventTime.time}</div>
                          <div className="text-xs text-gray-400">{eventTime.date}</div>
                        </td>
                        <td className="px-3 sm:px-6 py-4">
                          <div className="text-xs text-gray-600 truncate max-w-xs">
                            {event.metadata.driverName || event.metadata.driverId || 'View details'}
                          </div>
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                          <button className="text-orange-500 hover:text-orange-600 text-xs sm:text-sm">
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {filteredEvents.length === 0 && (
              <div className="text-center py-12">
                <FaExclamationTriangle className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                <p className="text-gray-500">No events found matching your filters</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setSelectedEvent(null)}></div>
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Event Details</h3>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <FaTimes className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase">Event Type</label>
                    <p className="text-sm text-gray-900 mt-1">{selectedEvent.type}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase">Timestamp</label>
                    <p className="text-sm text-gray-900 mt-1">{formatDateTime(selectedEvent.timestamp).full}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase">Description</label>
                    <p className="text-sm text-gray-900 mt-1">{selectedEvent.description}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase">Metadata</label>
                    <div className="mt-2 bg-gray-50 rounded-lg p-3">
                      {Object.entries(selectedEvent.metadata).map(([key, value]) => (
                        <div key={key} className="mb-2 text-sm">
                          <span className="font-medium text-gray-700">
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
                          </span>
                          <span className="ml-2 text-gray-600 break-words">
                            {typeof value === 'object' ? JSON.stringify(value, null, 2) : value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
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
              <h3 className="font-semibold text-gray-800">Quick Filters</h3>
              <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-lg hover:bg-gray-100">
                <FaTimes className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
                <select
                  value={eventTypeFilter}
                  onChange={(e) => setEventTypeFilter(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                  style={{ borderColor: 'var(--gray-300)', focusRingColor: 'var(--primary-orange)' }}
                >
                  <option value="all">All Events</option>
                  <option value="DriverAssigned">Driver Assigned</option>
                  <option value="DriverArrived">Driver Arrived</option>
                  <option value="TripStarted">Trip Started</option>
                  <option value="TripCompleted">Trip Completed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                  style={{ borderColor: 'var(--gray-300)', focusRingColor: 'var(--primary-orange)' }}
                />
              </div>
              <button
                onClick={() => {
                  setEventTypeFilter('all');
                  setDateFilter('');
                  setSearchTerm('');
                  setSidebarOpen(false);
                }}
                className="w-full py-2 rounded-lg text-white"
                style={{ backgroundColor: 'var(--primary-orange)' }}
              >
                Clear Filters
              </button>
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default RideEventLog;