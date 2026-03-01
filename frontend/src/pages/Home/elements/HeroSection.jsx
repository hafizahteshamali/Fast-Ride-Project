// components/home/HeroSection.jsx
import React, { useState } from 'react'
import { 
  FaMotorcycle, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaArrowRight,
  FaSpinner,
  FaCheckCircle,
  FaExclamationCircle
} from 'react-icons/fa'

const HeroSection = () => {
  const [pickup, setPickup] = useState('')
  const [dropoff, setDropoff] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showRiders, setShowRiders] = useState(false)
  const [nearbyRiders, setNearbyRiders] = useState([])

  // Mock riders data
  const mockRiders = [
    { id: 1, name: 'Rajesh Kumar', distance: '0.5 km', time: '2 mins', rating: 4.8 },
    { id: 2, name: 'Amit Singh', distance: '0.8 km', time: '3 mins', rating: 4.9 },
    { id: 3, name: 'Vikram Mehta', distance: '1.2 km', time: '4 mins', rating: 4.7 },
  ]

  // Validate locations
  const validateLocations = () => {
    if (!pickup.trim()) {
      setError('Please enter pickup location')
      return false
    }
    if (!dropoff.trim()) {
      setError('Please enter dropoff location')
      return false
    }
    if (pickup.toLowerCase() === dropoff.toLowerCase()) {
      setError('Pickup and dropoff locations cannot be the same')
      return false
    }
    return true
  }

  // Handle find riders
  const handleFindRiders = async () => {
    setError('')
    setSuccess('')
    
    if (!validateLocations()) {
      return
    }

    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setNearbyRiders(mockRiders)
      setShowRiders(true)
      setSuccess(`Found ${mockRiders.length} riders near ${pickup}`)
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError('Failed to find riders. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // Handle book ride
  const handleBookRide = (riderId) => {
    setSuccess(`Rider booked successfully! Your rider will arrive shortly.`)
    setShowRiders(false)
    setPickup('')
    setDropoff('')
    
    setTimeout(() => setSuccess(''), 3000)
  }

  // Handle call now
  const handleCallNow = () => {
    window.location.href = 'tel:+18001234567'
  }

  // Handle key press for inputs
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleFindRiders()
    }
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[var(--indigo-50)] to-[var(--violet-50)] py-16 lg:py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--indigo-600)] rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-[var(--violet-600)] rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-[var(--white)] px-4 py-2 rounded-full shadow-sm mb-6">
              <span className="w-2 h-2 bg-[var(--green-400)] rounded-full animate-pulse"></span>
              <span className="text-sm font-medium text-[var(--gray-600)]">Available in 50+ Cities</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-[var(--gray-900)] leading-tight mb-4">
              Fast & Reliable
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[var(--indigo-600)] to-[var(--violet-600)]">
                Pick & Drop Service
              </span>
            </h1>
            
            <p className="text-lg text-[var(--gray-600)] mb-8 max-w-xl mx-auto lg:mx-0">
              Get your parcels delivered in minutes. Professional riders, real-time tracking, and the best rates in town.
            </p>

            {/* Alert Messages */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
                <FaExclamationCircle />
                <span>{error}</span>
                <button 
                  onClick={() => setError('')}
                  className="ml-auto text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            )}

            {success && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700">
                <FaCheckCircle />
                <span>{success}</span>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <button 
                onClick={handleFindRiders}
                disabled={isLoading}
                className="group flex items-center justify-center gap-3 bg-gradient-to-r from-[var(--indigo-600)] to-[var(--violet-600)] hover:from-[var(--indigo-700)] hover:to-[var(--violet-700)] text-[var(--white)] px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <FaSpinner className="animate-spin" size={24} />
                    <span>Finding Riders...</span>
                  </>
                ) : (
                  <>
                    <FaMotorcycle size={24} />
                    <span>Book a Ride</span>
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
              
              <button 
                onClick={handleCallNow}
                className="flex items-center justify-center gap-3 bg-[var(--white)] hover:bg-[var(--gray-50)] text-[var(--gray-700)] px-8 py-4 rounded-xl font-semibold text-lg shadow-md hover:shadow-lg border border-[var(--gray-200)] transition-all"
              >
                <FaPhone size={20} className="text-[var(--indigo-600)]" />
                <span>Call Now</span>
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 justify-center lg:justify-start">
              <div>
                <div className="text-2xl font-bold text-[var(--gray-900)]">50K+</div>
                <div className="text-sm text-[var(--gray-500)]">Happy Customers</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[var(--gray-900)]">1000+</div>
                <div className="text-sm text-[var(--gray-500)]">Active Riders</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[var(--gray-900)]">15 min</div>
                <div className="text-sm text-[var(--gray-500)]">Avg. Delivery</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image/Card */}
          <div className="flex-1 w-full max-w-md lg:max-w-none">
            <div className="relative">
              {/* Main Card */}
              <div className="bg-[var(--white)] rounded-3xl shadow-2xl p-6 border border-[var(--gray-200)]">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--indigo-600)] to-[var(--violet-600)] flex items-center justify-center text-[var(--white)]">
                    <FaMotorcycle size={28} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--gray-900)]">Quick Delivery</h3>
                    <p className="text-sm text-[var(--gray-500)]">Enter your details</p>
                  </div>
                </div>

                {/* Booking Form */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-[var(--gray-50)] rounded-xl border border-[var(--gray-200)] focus-within:border-[var(--indigo-600)] focus-within:ring-2 focus-within:ring-[var(--indigo-600)] focus-within:ring-opacity-20 transition-all">
                    <FaMapMarkerAlt className="text-[var(--indigo-600)]" />
                    <input 
                      type="text" 
                      placeholder="Pickup Location"
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="bg-transparent border-none outline-none flex-1 text-[var(--gray-700)] placeholder-[var(--gray-400)]"
                      disabled={isLoading}
                    />
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-[var(--gray-50)] rounded-xl border border-[var(--gray-200)] focus-within:border-[var(--violet-600)] focus-within:ring-2 focus-within:ring-[var(--violet-600)] focus-within:ring-opacity-20 transition-all">
                    <FaMapMarkerAlt className="text-[var(--violet-600)]" />
                    <input 
                      type="text" 
                      placeholder="Dropoff Location"
                      value={dropoff}
                      onChange={(e) => setDropoff(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="bg-transparent border-none outline-none flex-1 text-[var(--gray-700)] placeholder-[var(--gray-400)]"
                      disabled={isLoading}
                    />
                  </div>

                  <button 
                    onClick={handleFindRiders}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-[var(--indigo-600)] to-[var(--violet-600)] text-[var(--white)] py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Searching...' : 'Find Riders Near You'}
                  </button>
                </div>

                {/* Live Tracking Preview */}
                <div className="mt-6 pt-6 border-t border-[var(--gray-200)]">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-[var(--gray-700)]">Live Tracking Available</span>
                    <span className="text-xs text-[var(--green-400)]">● Active</span>
                  </div>
                  <div className="h-2 bg-[var(--gray-200)] rounded-full overflow-hidden">
                    <div className="w-2/3 h-full bg-gradient-to-r from-[var(--indigo-600)] to-[var(--violet-600)] rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Nearby Riders Modal */}
              {showRiders && (
                <div className="absolute top-0 left-0 w-full h-full bg-[var(--white)] rounded-3xl shadow-2xl p-6 border border-[var(--gray-200)] overflow-y-auto">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-[var(--gray-900)]">Nearby Riders</h3>
                    <button 
                      onClick={() => setShowRiders(false)}
                      className="text-[var(--gray-500)] hover:text-[var(--gray-700)]"
                    >
                      ×
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    {nearbyRiders.map((rider) => (
                      <div 
                        key={rider.id}
                        className="p-3 bg-[var(--gray-50)] rounded-xl border border-[var(--gray-200)] hover:border-[var(--indigo-600)] transition-all cursor-pointer"
                        onClick={() => handleBookRide(rider.id)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-[var(--gray-900)]">{rider.name}</span>
                          <span className="text-sm text-[var(--gray-600)]">⭐ {rider.rating}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-[var(--gray-600)]">📍 {rider.distance}</span>
                          <span className="text-[var(--green-400)]">🕐 {rider.time}</span>
                        </div>
                        <button className="w-full mt-2 bg-gradient-to-r from-[var(--indigo-600)] to-[var(--violet-600)] text-[var(--white)] py-2 rounded-lg text-sm font-semibold hover:shadow-lg transition-all">
                          Book Now
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection