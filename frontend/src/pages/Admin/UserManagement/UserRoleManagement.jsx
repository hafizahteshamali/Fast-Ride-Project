import React, { useState, useEffect } from 'react';
import { FaUser, FaTruck, FaUserShield, FaSearch, FaEdit, FaSave, FaTimes, FaCheckCircle } from 'react-icons/fa';

const UserRoleManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Customer', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Driver', status: 'active' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Admin', status: 'active' },
    { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', role: 'Customer', status: 'inactive' },
    { id: 5, name: 'Robert Brown', email: 'robert@example.com', role: 'Driver', status: 'active' },
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [editingRole, setEditingRole] = useState(null);
  const [tempRole, setTempRole] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  // Simulate JWT token update when role changes
  const updateUserRole = (userId, newRole) => {
    // In a real application, this would be an API call to update the user's role
    // and regenerate JWT with updated claims
    const updatedUsers = users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    );
    setUsers(updatedUsers);
    
    // Simulate API call to update JWT claims
    const user = updatedUsers.find(u => u.id === userId);
    if (user) {
      // In production, this would be a backend API call
      console.log(`JWT claims updated for ${user.email}: role = ${newRole}`);
      
      // Store updated user info in localStorage (for demo purposes)
      const jwtClaims = {
        userId: user.id,
        email: user.email,
        role: newRole,
        permissions: getPermissionsByRole(newRole),
        exp: Date.now() + 3600000 // 1 hour expiry
      };
      localStorage.setItem('userClaims', JSON.stringify(jwtClaims));
    }
    
    setSuccessMessage(`Role changed to ${newRole} successfully!`);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  // Get permissions based on role
  const getPermissionsByRole = (role) => {
    switch(role) {
      case 'Admin':
        return ['all_endpoints', 'manage_users', 'manage_roles', 'view_reports', 'manage_settings'];
      case 'Driver':
        return ['view_orders', 'update_order_status', 'view_assigned_routes', 'update_location'];
      case 'Customer':
        return ['view_profile', 'create_orders', 'view_orders', 'update_profile'];
      default:
        return [];
    }
  };

  // Handle role change submission
  const handleRoleChange = (userId) => {
    if (tempRole) {
      updateUserRole(userId, tempRole);
      setEditingRole(null);
      setTempRole('');
      setSelectedUser(null);
    }
  };

  // Cancel role editing
  const cancelEdit = () => {
    setEditingRole(null);
    setTempRole('');
    setSelectedUser(null);
  };

  // Start editing a user's role
  const startEdit = (user) => {
    setEditingRole(user.id);
    setTempRole(user.role);
    setSelectedUser(user);
  };

  // Get role icon
  const getRoleIcon = (role) => {
    switch(role) {
      case 'Admin':
        return <FaUserShield className="w-5 h-5" style={{ color: 'var(--primary-orange)' }} />;
      case 'Driver':
        return <FaTruck className="w-5 h-5" style={{ color: 'var(--primary-orange)' }} />;
      case 'Customer':
        return <FaUser className="w-5 h-5" style={{ color: 'var(--primary-orange)' }} />;
      default:
        return <FaUser className="w-5 h-5" style={{ color: 'var(--primary-orange)' }} />;
    }
  };

  // Get role badge color
  const getRoleBadgeColor = (role) => {
    switch(role) {
      case 'Admin':
        return 'bg-red-100 text-red-800';
      case 'Driver':
        return 'bg-blue-100 text-blue-800';
      case 'Customer':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Filter users based on search term and role filter
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  // Get role options for dropdown
  const roleOptions = ['Customer', 'Driver', 'Admin'];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Success Message Toast */}
      {successMessage && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-lg shadow-lg flex items-center space-x-3">
            <FaCheckCircle className="text-green-400 w-5 h-5" />
            <p className="text-green-800 font-medium">{successMessage}</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--gray-900)' }}>
          User Role Management
        </h1>
        <p className="text-gray-600">
          Assign or change user roles (Customer / Driver / Admin). Role controls which API endpoints and features are accessible via JWT claims.
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all"
            style={{
              borderColor: 'var(--gray-300)',
              focusRingColor: 'var(--primary-orange)'
            }}
          />
        </div>
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 bg-white"
          style={{
            borderColor: 'var(--gray-300)',
            focusRingColor: 'var(--primary-orange)'
          }}
        >
          <option value="all">All Roles</option>
          <option value="Customer">Customers</option>
          <option value="Driver">Drivers</option>
          <option value="Admin">Admins</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  JWT Permissions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        {getRoleIcon(user.role)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">ID: {user.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingRole === user.id ? (
                      <select
                        value={tempRole}
                        onChange={(e) => setTempRole(e.target.value)}
                        className="px-3 py-1 border rounded-lg focus:outline-none focus:ring-2"
                        style={{
                          borderColor: 'var(--gray-300)',
                          focusRingColor: 'var(--primary-orange)'
                        }}
                      >
                        {roleOptions.map(role => (
                          <option key={role} value={role}>{role}</option>
                        ))}
                      </select>
                    ) : (
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleBadgeColor(user.role)}`}>
                        {user.role}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {getPermissionsByRole(user.role).map((permission, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-600"
                        >
                          {permission}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingRole === user.id ? (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleRoleChange(user.id)}
                          className="p-2 rounded-lg hover:bg-green-50 transition-colors"
                          style={{ color: 'var(--green-400)' }}
                        >
                          <FaSave className="w-5 h-5" />
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                          style={{ color: 'var(--gray-500)' }}
                        >
                          <FaTimes className="w-5 h-5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => startEdit(user)}
                        className="p-2 rounded-lg hover:bg-orange-50 transition-colors flex items-center space-x-2"
                        style={{ color: 'var(--primary-orange)' }}
                      >
                        <FaEdit className="w-5 h-5" />
                        <span className="text-sm">Change Role</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Information Card */}
      <div className="mt-8 bg-gradient-to-r from-orange-50 to-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--gray-800)' }}>
          Role-Based Access Control (RBAC)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm border-l-4" style={{ borderLeftColor: 'var(--primary-orange)' }}>
            <div className="flex items-center space-x-2 mb-2">
              <FaUserShield className="w-5 h-5" style={{ color: 'var(--primary-orange)' }} />
              <h4 className="font-semibold text-gray-800">Admin</h4>
            </div>
            <p className="text-sm text-gray-600">Full system access, user management, role assignment, and system configuration.</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border-l-4" style={{ borderLeftColor: 'var(--primary-orange)' }}>
            <div className="flex items-center space-x-2 mb-2">
              <FaTruck className="w-5 h-5" style={{ color: 'var(--primary-orange)' }} />
              <h4 className="font-semibold text-gray-800">Driver</h4>
            </div>
            <p className="text-sm text-gray-600">Access to delivery routes, order status updates, and location tracking.</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border-l-4" style={{ borderLeftColor: 'var(--primary-orange)' }}>
            <div className="flex items-center space-x-2 mb-2">
              <FaUser className="w-5 h-5" style={{ color: 'var(--primary-orange)' }} />
              <h4 className="font-semibold text-gray-800">Customer</h4>
            </div>
            <p className="text-sm text-gray-600">Basic access to create orders, view profile, and track deliveries.</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
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
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default UserRoleManagement;