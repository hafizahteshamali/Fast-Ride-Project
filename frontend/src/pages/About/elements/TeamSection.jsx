'use client';

import { FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

const team = [
  {
    name: 'John Smith',
    role: 'CEO & Co-founder',
    bio: '10+ years in mobility tech, leading TezRide\'s vision for Pakistan',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC1XNkm9ZIsKAObeWJz_Gr4pkfhiK7NTlLIQ&s',
    color: 'var(--primary-orange)'
  },
  {
    name: 'Sarah Johnson',
    role: 'CTO & Co-founder',
    bio: 'Tech visionary with expertise in scalable platforms',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnvTbL5WSUuKYddpZI-SXU6JbudFjCtFCGuw&s',
    color: 'var(--secondary-orange)'
  },
  {
    name: 'Michael Chen',
    role: 'Head of Operations',
    bio: 'Logistics expert ensuring smooth rides and deliveries',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1k4s9nlyItll_j3yUsfgxYoycieFgHkyKmA&s',
    color: 'var(--primary-orange)'
  }
];

export default function TeamSection() {
  return (
    <section className="py-20 px-4 md:px-8" style={{ backgroundColor: 'var(--white)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Meet Our{' '}
            <span style={{ color: 'var(--primary-orange)' }}>Team</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            The passionate people behind TezRide working to make your journey better
          </p>
        </div>

        {/* Team Grid */}
        <div className="flex flex-wrap justify-center gap-8">
          {team.map((member, index) => (
            <div key={index} className="w-full md:w-80 group">
              <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-4">
                {/* Image Container */}
                <div className="relative h-80 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Social Links */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
                    <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
                      style={{ color: 'var(--white)' }}
                    >
                      <FaLinkedin size={18} />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
                      style={{ color: 'var(--white)' }}
                    >
                      <FaTwitter size={18} />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
                      style={{ color: 'var(--white)' }}
                    >
                      <FaEnvelope size={18} />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--gray-800)' }}>
                    {member.name}
                  </h3>
                  <p className="font-medium mb-3" style={{ color: member.color }}>
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}