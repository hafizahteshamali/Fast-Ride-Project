// components/home/DownloadApp.jsx
import React from 'react'
import { FaApple, FaGooglePlay, FaQrcode, FaStar, FaDownload } from 'react-icons/fa'

const DownloadApp = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-[var(--indigo-600)] to-[var(--violet-600)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-3xl lg:text-4xl font-bold text-[var(--white)] mb-4">
              Download Our App
            </h2>
            <p className="text-[var(--white)] text-opacity-90 mb-8 text-lg">
              Get the best delivery experience with our mobile app. Track orders, pay easily, and get exclusive discounts.
            </p>

            {/* App Store Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <button className="flex items-center gap-3 bg-[var(--black)] text-[var(--white)] px-6 py-3 rounded-xl hover:scale-105 transition-transform">
                <FaApple size={28} />
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="text-lg font-semibold">App Store</div>
                </div>
              </button>
              
              <button className="flex items-center gap-3 bg-[var(--black)] text-[var(--white)] px-6 py-3 rounded-xl hover:scale-105 transition-transform">
                <FaGooglePlay size={24} />
                <div className="text-left">
                  <div className="text-xs">Get it on</div>
                  <div className="text-lg font-semibold">Google Play</div>
                </div>
              </button>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4 justify-center lg:justify-start">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
              </div>
              <span className="text-[var(--white)] font-semibold">4.8</span>
              <span className="text-[var(--white)] text-opacity-80">(10k+ reviews)</span>
            </div>
          </div>

          {/* Right Content - QR Code */}
          <div className="flex-1 flex justify-center">
            <div className="bg-[var(--white)] p-6 rounded-3xl shadow-2xl">
              <div className="text-center mb-4">
                <FaQrcode size={120} className="text-[var(--gray-900)] mx-auto" />
                <p className="text-[var(--gray-600)] mt-2">Scan to download</p>
              </div>
              <div className="flex items-center justify-center gap-2 text-[var(--indigo-600)]">
                <FaDownload />
                <span className="font-semibold">10k+ Downloads</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DownloadApp