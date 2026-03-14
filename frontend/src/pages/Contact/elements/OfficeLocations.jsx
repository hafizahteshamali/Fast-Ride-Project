'use client';

import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaBuilding } from 'react-icons/fa';

const offices = [
  {
    city: 'Karachi',
    address: '123 Business Avenue, Block 6, Clifton',
    phone: '+92 21 1234567',
    email: 'karachi@tezzride.com',
    hours: 'Mon-Fri: 9am-6pm',
    isHead: true
  },
  {
    city: 'Lahore',
    address: '456 Main Boulevard, Gulberg III',
    phone: '+92 42 1234567',
    email: 'lahore@tezzride.com',
    hours: 'Mon-Fri: 9am-6pm',
    isHead: false
  },
  {
    city: 'Islamabad',
    address: '789 Blue Area, F-6',
    phone: '+92 51 1234567',
    email: 'islamabad@tezzride.com',
    hours: 'Mon-Fri: 9am-6pm',
    isHead: false
  }
];

export default function OfficeLocations() {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Our Offices</h2>
        <p className="text-gray-600">Visit us at any of our locations</p>
      </div>

      {/* Offices List */}
      <div className="space-y-6">
        {offices.map((office, index) => (
          <div key={index} className={`p-6 rounded-2xl transition-all duration-300 hover:shadow-lg ${office.isHead ? 'bg-orange-50 border-2 border-orange-200' : 'bg-gray-50'}`}>
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${office.isHead ? 'bg-orange-500' : 'bg-gray-500'} flex items-center justify-center text-white`}>
                  <FaBuilding className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{office.city}</h3>
                  {office.isHead && (
                    <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded-full">Head Office</span>
                  )}
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-gray-400 w-5 h-5 mt-0.5" />
                <span className="text-gray-600">{office.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <FaPhone className="text-gray-400 w-5 h-5" />
                <span className="text-gray-600">{office.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-gray-400 w-5 h-5" />
                <span className="text-gray-600">{office.email}</span>
              </div>
              <div className="mt-3 text-sm text-gray-500">
                <span className="font-medium">Hours:</span> {office.hours}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}