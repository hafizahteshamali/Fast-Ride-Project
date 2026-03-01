// components/home/HowItWorks.jsx
import React, { useState, useEffect } from 'react'
import { 
  FaMapMarkerAlt, 
  FaMotorcycle, 
  FaCreditCard, 
  FaCheckCircle,
  FaArrowRight,
  FaClock,
  FaMobile,
  FaUserCheck,
  FaRoute,
  FaBell,
  FaSmile,
  FaPlay,
  FaPause
} from 'react-icons/fa'

const steps = [
  {
    icon: FaMapMarkerAlt,
    title: "Enter Locations",
    description: "Tell us where to pick up and drop off your package",
    details: "Simply enter pickup and dropoff locations in our app or website",
    time: "30 seconds",
    color: "indigo",
    illustration: "📍"
  },
  {
    icon: FaMotorcycle,
    title: "Get a Rider",
    description: "We'll assign the nearest available rider to you",
    details: "Our system automatically finds the closest rider for fastest service",
    time: "2 minutes",
    color: "violet",
    illustration: "🏍️"
  },
  {
    icon: FaCreditCard,
    title: "Track & Pay",
    description: "Track your delivery in real-time and pay securely",
    details: "Watch your package move on live map and pay digitally",
    time: "Real-time",
    color: "indigo",
    illustration: "💳"
  },
  {
    icon: FaCheckCircle,
    title: "Get Delivered",
    description: "Your package reaches its destination safely",
    details: "Receive confirmation with photo proof of delivery",
    time: "15-30 min",
    color: "violet",
    illustration: "✅"
  }
]

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  // Auto-play simulation
  useEffect(() => {
    let interval
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setActiveStep((prevStep) => (prevStep + 1) % steps.length)
            return 0
          }
          return prev + 1
        })
      }, 50)
    }
    return () => clearInterval(interval)
  }, [isPlaying])

  const handleStepClick = (index) => {
    setActiveStep(index)
    setProgress(0)
    setIsPlaying(false)
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-[var(--white)] to-[var(--gray-50)] relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[var(--indigo-600)] rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[var(--violet-600)] rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-bounce">
        <div className="w-16 h-16 bg-[var(--indigo-100)] rounded-2xl rotate-12 opacity-20"></div>
      </div>
      <div className="absolute bottom-20 right-10 animate-bounce delay-1000">
        <div className="w-20 h-20 bg-[var(--violet-100)] rounded-3xl -rotate-12 opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header with Animation */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--indigo-50)] to-[var(--violet-50)] px-4 py-2 rounded-full mb-4 border border-[var(--indigo-200)]">
            <FaRoute className="text-[var(--indigo-600)] animate-pulse" />
            <span className="text-[var(--indigo-600)] font-semibold text-sm uppercase tracking-wider">
              Simple 4-Step Process
            </span>
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-bold text-[var(--gray-900)] mt-2 mb-4">
            How It{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--indigo-600)] to-[var(--violet-600)]">
              Works
            </span>
          </h2>
          
          <p className="text-[var(--gray-600)] max-w-2xl mx-auto text-lg">
            Get your delivery done in four simple steps - faster than ever!
          </p>

          {/* Timer Controls */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button 
              onClick={togglePlay}
              className="flex items-center gap-2 px-4 py-2 bg-[var(--white)] rounded-full shadow-md hover:shadow-lg transition-all border border-[var(--gray-200)]"
            >
              {isPlaying ? (
                <>
                  <FaPause className="text-[var(--indigo-600)]" />
                  <span className="text-sm font-medium">Pause Demo</span>
                </>
              ) : (
                <>
                  <FaPlay className="text-[var(--violet-600)]" />
                  <span className="text-sm font-medium">Play Demo</span>
                </>
              )}
            </button>
            <span className="text-sm text-[var(--gray-500)]">
              Step {activeStep + 1} of {steps.length}
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-16">
          {/* Left Side - Steps Visualization */}
          <div className="flex-1">
            <div className="relative">              
              {/* Steps */}
              <div className="space-y-8">
                {steps.map((step, index) => {
                  const Icon = step.icon
                  const isActive = activeStep === index
                  const isIndigo = step.color === 'indigo'
                  
                  return (
                    <div 
                      key={index}
                      className={`relative flex items-center p-2 border border-gray-400 rounded-lg gap-6 cursor-pointer group transition-all duration-500 ${
                        isActive ? 'scale-105' : 'opacity-60 hover:opacity-100'
                      }`}
                      onClick={() => handleStepClick(index)}
                    >
                      {/* Timeline Dot */}
                      <div className={`
                        relative w-16 h-16 rounded-2xl flex items-center justify-center
                        transition-all duration-500 z-10
                        ${isActive 
                          ? isIndigo 
                            ? 'bg-gradient-to-br from-[var(--indigo-600)] to-[var(--indigo-700)] shadow-xl scale-110' 
                            : 'bg-gradient-to-br from-[var(--violet-600)] to-[var(--violet-700)] shadow-xl scale-110'
                          : isIndigo
                            ? 'bg-[var(--indigo-100)]'
                            : 'bg-[var(--violet-100)]'
                        }
                      `}>
                        <Icon 
                          size={28} 
                          className={isActive 
                            ? 'text-[var(--white)]' 
                            : isIndigo 
                              ? 'text-[var(--indigo-600)]' 
                              : 'text-[var(--violet-600)]'
                          } 
                        />
                        
                        {/* Pulse Animation for Active Step */}
                        {isActive && (
                          <div className={`
                            absolute inset-0 rounded-2xl
                            ${isIndigo ? 'bg-[var(--indigo-600)]' : 'bg-[var(--violet-600)]'}
                            animate-ping opacity-30
                          `}></div>
                        )}
                      </div>

                      {/* Step Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className={`text-xl font-bold transition-colors duration-300
                            ${isActive 
                              ? isIndigo 
                                ? 'text-[var(--indigo-600)]' 
                                : 'text-[var(--violet-600)]'
                              : 'text-[var(--gray-900)]'
                            }`}>
                            {step.title}
                          </h3>
                          <span className="text-xs px-2 py-1 bg-[var(--gray-100)] rounded-full text-[var(--gray-600)]">
                            {step.time}
                          </span>
                        </div>
                        <p className="text-[var(--gray-600)] mb-1">{step.description}</p>
                        {isActive && (
                          <p className="text-sm text-[var(--gray-500)] animate-fadeIn">
                            {step.details}
                          </p>
                        )}
                      </div>

                      {/* Step Number */}
                      <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                        ${isActive
                          ? 'bg-gradient-to-r from-[var(--indigo-600)] to-[var(--violet-600)] text-[var(--white)]'
                          : 'bg-[var(--gray-200)] text-[var(--gray-600)]'
                        }
                      `}>
                        {index + 1}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Progress Bar */}
              <div className="mt-8 p-4 bg-[var(--white)] rounded-xl shadow-md border border-[var(--gray-200)]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-[var(--gray-700)]">Overall Progress</span>
                  <span className="text-sm text-[var(--gray-600)]">{Math.round((activeStep + 1) / steps.length * 100)}%</span>
                </div>
                <div className="h-2 bg-[var(--gray-200)] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[var(--indigo-600)] to-[var(--violet-600)] rounded-full transition-all duration-500"
                    style={{ width: `${(activeStep + 1) / steps.length * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Live Preview */}
          <div className="flex-1">
            <div className="bg-[var(--white)] rounded-3xl shadow-2xl p-8 border border-[var(--gray-200)] relative overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-sm font-medium text-[var(--gray-600)]">Live Preview</span>
              </div>

              {/* Live Content */}
              <div className="space-y-4">
                {steps.map((step, index) => {
                  const isActive = activeStep === index
                  const isIndigo = step.color === 'indigo'
                  const isCompleted = index < activeStep
                  
                  if (!isActive && !isCompleted) return null
                  
                  return (
                    <div 
                      key={index}
                      className={`
                        p-4 rounded-xl transition-all duration-500
                        ${isActive 
                          ? isIndigo
                            ? 'bg-gradient-to-r from-[var(--indigo-50)] to-[var(--indigo-100)] border-2 border-[var(--indigo-600)]'
                            : 'bg-gradient-to-r from-[var(--violet-50)] to-[var(--violet-100)] border-2 border-[var(--violet-600)]'
                          : 'bg-[var(--gray-50)] border border-[var(--gray-200)]'
                        }
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`
                          w-10 h-10 rounded-lg flex items-center justify-center
                          ${isCompleted 
                            ? 'bg-gradient-to-r from-[var(--green-400)] to-[var(--green-500)]' 
                            : isIndigo
                              ? 'bg-[var(--indigo-600)]'
                              : 'bg-[var(--violet-600)]'
                          }
                        `}>
                          {isCompleted ? (
                            <FaCheckCircle className="text-[var(--white)]" />
                          ) : (
                            <step.icon className="text-[var(--white)]" size={20} />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-[var(--gray-900)]">{step.title}</h4>
                            {isActive && (
                              <span className="text-xs px-2 py-1 bg-[var(--white)] rounded-full animate-pulse">
                                In Progress
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-[var(--gray-600)]">{step.illustration} {step.description}</p>
                        </div>
                      </div>

                      {/* Live Animation for Active Step */}
                      {isActive && (
                        <div className="mt-3 space-y-2">
                          <div className="h-1.5 bg-[var(--gray-200)] rounded-full overflow-hidden">
                            <div 
                              className={`
                                h-full transition-all duration-300
                                ${isIndigo ? 'bg-[var(--indigo-600)]' : 'bg-[var(--violet-600)]'}
                              `}
                              style={{ width: `${progress}%` }}
                            ></div>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-[var(--gray-500)]">Processing...</span>
                            <span className="text-[var(--gray-700)] font-medium">{Math.round(progress)}%</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Additional Info Cards */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="p-3 bg-[var(--gray-50)] rounded-xl">
                  <FaClock className="text-[var(--indigo-600)] mb-2" />
                  <div className="text-sm font-medium">Avg. Time</div>
                  <div className="text-lg font-bold">15-30 min</div>
                </div>
                <div className="p-3 bg-[var(--gray-50)] rounded-xl">
                  <FaUserCheck className="text-[var(--violet-600)] mb-2" />
                  <div className="text-sm font-medium">Active Riders</div>
                  <div className="text-lg font-bold">1,000+</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="flex items-center gap-3 p-4 bg-[var(--white)] rounded-xl shadow-sm border border-[var(--gray-200)]">
            <FaMobile className="text-2xl text-[var(--indigo-600)]" />
            <div>
              <h4 className="font-semibold text-sm">Mobile Friendly</h4>
              <p className="text-xs text-[var(--gray-500)]">Book from any device</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-[var(--white)] rounded-xl shadow-sm border border-[var(--gray-200)]">
            <FaBell className="text-2xl text-[var(--violet-600)]" />
            <div>
              <h4 className="font-semibold text-sm">Real-time Alerts</h4>
              <p className="text-xs text-[var(--gray-500)]">Get instant updates</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-[var(--white)] rounded-xl shadow-sm border border-[var(--gray-200)]">
            <FaSmile className="text-2xl text-[var(--indigo-600)]" />
            <div>
              <h4 className="font-semibold text-sm">Satisfaction</h4>
              <p className="text-xs text-[var(--gray-500)]">98% happy customers</p>
            </div>
          </div>
        </div>

        {/* CTA with Enhanced Design */}
        <div className="text-center">
          <button className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-[var(--indigo-600)] to-[var(--violet-600)] hover:from-[var(--indigo-700)] hover:to-[var(--violet-700)] text-[var(--white)] px-10 py-5 rounded-xl font-semibold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
            
            {/* Content */}
            <FaMotorcycle size={24} className="animate-bounce" />
            <span>Get Started Now</span>
            <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
            
            {/* Shine Effect */}
            <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine"></div>
          </button>
          
          <p className="mt-4 text-sm text-[var(--gray-500)]">
            No credit card required • Free delivery on first order
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        
        @keyframes shine {
          100% {
            left: 200%;
          }
        }
        .animate-shine {
          animation: shine 1.5s infinite;
        }
      `}</style>
    </section>
  )
}

export default HowItWorks