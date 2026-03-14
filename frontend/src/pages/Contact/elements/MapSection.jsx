'use client';

import { useState } from 'react';
import { 
  FaMapMarkerAlt, 
  FaBuilding, 
  FaCar, 
  FaTrain, 
  FaBus, 
  FaWalking,
  FaStar,
  FaDirections,
  FaShare,
  FaExpand,
  FaCompress,
  FaCrosshairs,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaParking,
  FaWifi,
  FaAccessibleIcon
} from 'react-icons/fa';

export default function MapSection() {
  const [selectedTransport, setSelectedTransport] = useState('car');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [mapView, setMapView] = useState('standard');

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header with Stats */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-full mb-4">
              <FaMapMarkerAlt className="text-orange-500 w-4 h-4" />
              <span className="text-sm font-semibold text-orange-600">Find Us</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
              Our <span className="text-orange-500">Location</span>
            </h2>
            <p className="text-gray-600">Visit our head office in the heart of Karachi</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3 mt-4 md:mt-0">
            <div className="bg-white rounded-xl p-3 shadow-md text-center">
              <p className="text-2xl font-bold text-orange-500">24/7</p>
              <p className="text-xs text-gray-500">Access</p>
            </div>
            <div className="bg-white rounded-xl p-3 shadow-md text-center">
              <p className="text-2xl font-bold text-orange-500">50+</p>
              <p className="text-xs text-gray-500">Parking</p>
            </div>
            <div className="bg-white rounded-xl p-3 shadow-md text-center">
              <p className="text-2xl font-bold text-orange-500">100m</p>
              <p className="text-xs text-gray-500">To Station</p>
            </div>
          </div>
        </div>

        {/* Main Map Card */}
        <div className={`bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 ${
          isFullscreen ? 'fixed inset-4 z-50' : 'relative'
        }`}>
          {/* Map Controls Header */}
          <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-white">
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Location Info */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center text-white shadow-lg">
                    <FaBuilding className="w-6 h-6" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">TezzRide Headquarters</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <FaStar className="text-yellow-400 w-4 h-4" />
                    <span>4.9 (2.5k+ reviews)</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span>Clifton, Karachi</span>
                  </div>
                </div>
              </div>

              {/* View Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMapView('standard')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    mapView === 'standard' 
                      ? 'bg-orange-500 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Standard
                </button>
                <button
                  onClick={() => setMapView('satellite')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    mapView === 'satellite' 
                      ? 'bg-orange-500 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Satellite
                </button>
                <button
                  onClick={toggleFullscreen}
                  className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-300"
                  title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                >
                  {isFullscreen ? <FaCompress className="w-4 h-4" /> : <FaExpand className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Map Container */}
          <div className="relative h-[500px] bg-gradient-to-br from-gray-800 to-gray-900">
            {/* Google Maps Iframe */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.0164725387895!2d67.0011!3d24.8607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDUxJzM4LjUiTiA2N8KwMDAnMDQuMCJF!5e0!3m2!1sen!2s!4v1234567890"
              className="w-full h-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>

            {/* Custom Map Marker */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <div 
                className="relative cursor-pointer group"
                onMouseEnter={() => setShowInfo(true)}
                onMouseLeave={() => setShowInfo(false)}
              >
                <div className="absolute -inset-3 bg-orange-500 rounded-full animate-ping opacity-30"></div>
                <div className="relative w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center text-white shadow-xl transform -rotate-12 group-hover:rotate-0 transition-all duration-300">
                  <FaMapMarkerAlt className="w-6 h-6" />
                </div>

                {/* Info Popup */}
                {showInfo && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 w-64 bg-white rounded-xl shadow-2xl p-4 z-20">
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rotate-45"></div>
                    <h4 className="font-bold text-gray-800 mb-2">TezzRide Head Office</h4>
                    <p className="text-sm text-gray-600 mb-2">123 Business Avenue, Clifton, Karachi</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <FaStar className="text-yellow-400 w-4 h-4" />
                      <span>4.9 (2.5k reviews)</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Nearby Places Labels */}
            <div className="absolute top-1/4 left-1/4">
              <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg flex items-center gap-2">
                <FaTrain className="text-blue-500" />
                <span>Railway Station (500m)</span>
              </div>
            </div>
            <div className="absolute bottom-1/3 right-1/4">
              <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg flex items-center gap-2">
                <FaBuilding className="text-green-500" />
                <span>Clifton Beach (1.2km)</span>
              </div>
            </div>

            {/* Map Scale */}
            <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg text-white text-sm">
              <div className="flex items-center gap-2">
                <div className="w-16 h-1 bg-white rounded-full"></div>
                <span>100m</span>
              </div>
            </div>

            {/* Zoom Controls */}
            <div className="absolute bottom-4 right-4 flex flex-col gap-2">
              <button className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-100 transition-all duration-300">
                <span className="text-xl font-bold text-gray-700">+</span>
              </button>
              <button className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-100 transition-all duration-300">
                <span className="text-xl font-bold text-gray-700">−</span>
              </button>
            </div>
          </div>

          {/* Map Footer with Details */}
          <div className="p-6 bg-white border-t border-gray-200">
            {/* Amenities */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <FaParking className="text-green-500 w-4 h-4" />
                <span>Free Parking</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <FaWifi className="text-blue-500 w-4 h-4" />
                <span>Free WiFi</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <FaAccessibleIcon className="text-purple-500 w-4 h-4" />
                <span>Wheelchair Access</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <FaClock className="text-orange-500 w-4 h-4" />
                <span>Open 24/7</span>
              </div>
            </div>

            {/* Transport and Actions */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              {/* Transport Mode */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-600">Get Directions:</span>
                <div className="flex gap-2">
                  {[
                    { icon: FaCar, mode: 'car', label: 'Driving' },
                    { icon: FaBus, mode: 'bus', label: 'Bus' },
                    { icon: FaTrain, mode: 'train', label: 'Train' },
                    { icon: FaWalking, mode: 'walk', label: 'Walking' }
                  ].map((transport) => (
                    <button
                      key={transport.mode}
                      onClick={() => setSelectedTransport(transport.mode)}
                      className={`p-2 rounded-lg transition-all duration-300 ${
                        selectedTransport === transport.mode
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                      title={transport.label}
                    >
                      <transport.icon className="w-4 h-4" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button className="px-6 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-all duration-300 hover:scale-105 flex items-center gap-2">
                  <FaDirections className="w-4 h-4" />
                  <span>Get Directions</span>
                </button>
                <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 hover:scale-105 flex items-center gap-2">
                  <FaShare className="w-4 h-4" />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* Contact Info */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <FaPhone className="text-orange-500 w-5 h-5" />
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="font-semibold text-gray-800">+92 21 1234567</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FaEnvelope className="text-orange-500 w-5 h-5" />
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="font-semibold text-gray-800">karachi@tezzride.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FaClock className="text-orange-500 w-5 h-5" />
                  <div>
                    <p className="text-xs text-gray-500">Hours</p>
                    <p className="font-semibold text-gray-800">Mon-Sun: 24/7</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Nearby Places Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[
            { name: 'Clifton Beach', distance: '1.2 km', time: '5 min', icon: '🏖️' },
            { name: 'Dolmen Mall', distance: '2.5 km', time: '8 min', icon: '🛍️' },
            { name: 'Karachi Golf Club', distance: '3.1 km', time: '10 min', icon: '⛳' },
            { name: 'Jinnah International', distance: '15 km', time: '25 min', icon: '✈️' }
          ].map((place, index) => (
            <div key={index} className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="text-2xl mb-2">{place.icon}</div>
              <h4 className="font-semibold text-gray-800 mb-1">{place.name}</h4>
              <p className="text-sm text-gray-500">{place.distance} • {place.time} drive</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}