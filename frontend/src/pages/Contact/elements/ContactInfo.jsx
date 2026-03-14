'use client';

import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaHeadset, FaWhatsapp } from 'react-icons/fa';

const contactMethods = [
  {
    icon: FaPhone,
    title: 'Phone Support',
    info: '+92 300 1234567',
    subInfo: 'Mon-Fri, 9am-6pm',
    color: 'blue',
    action: 'Call Now',
    link: 'tel:+923001234567'
  },
  {
    icon: FaWhatsapp,
    title: 'WhatsApp',
    info: '+92 300 1234567',
    subInfo: '24/7 Quick Support',
    color: 'green',
    action: 'Message Us',
    link: 'https://wa.me/923001234567'
  },
  {
    icon: FaEnvelope,
    title: 'Email Us',
    info: 'support@tezzride.com',
    subInfo: 'sales@tezzride.com',
    color: 'orange',
    action: 'Send Email',
    link: 'mailto:support@tezzride.com'
  },
  {
    icon: FaMapMarkerAlt,
    title: 'Head Office',
    info: '123 Business Avenue',
    subInfo: 'Karachi, Pakistan',
    color: 'red',
    action: 'Get Directions',
    link: 'https://maps.google.com'
  }
];

export default function ContactInfo() {
  return (
    <section className="py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactMethods.map((method, index) => (
            <div key={index} className="group">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-${method.color}-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <method.icon className={`text-${method.color}-500 w-7 h-7`} />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-gray-800 mb-2">{method.title}</h3>
                <p className="text-gray-600 font-medium">{method.info}</p>
                <p className="text-sm text-gray-500 mb-4">{method.subInfo}</p>

                {/* Action Link */}
                <a 
                  href={method.link}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors"
                  target={method.link.startsWith('http') ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                >
                  {method.action} →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}