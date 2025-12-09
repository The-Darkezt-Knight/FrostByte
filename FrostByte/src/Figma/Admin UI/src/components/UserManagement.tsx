import { useState } from 'react';
import { Search, Eye, Edit, Ban, Shield } from 'lucide-react';

const customers = [
  { id: 'USR-1001', name: 'James Wilson', email: 'james@email.com', orders: 12, spent: '$4,250', joinDate: '2024-03-15', status: 'Active' },
  { id: 'USR-1002', name: 'Sarah Chen', email: 'sarah@email.com', orders: 8, spent: '$2,890', joinDate: '2024-06-22', status: 'Active' },
  { id: 'USR-1003', name: 'Michael Brown', email: 'michael@email.com', orders: 5, spent: '$1,450', joinDate: '2024-09-10', status: 'Active' },
  { id: 'USR-1004', name: 'Emily Davis', email: 'emily@email.com', orders: 15, spent: '$6,780', joinDate: '2023-12-05', status: 'VIP' },
];

const staff = [
  { id: 'STF-101', name: 'Alex Thompson', email: 'alex@pchardware.com', role: 'Technician', department: 'Service', status: 'Active' },
  { id: 'STF-102', name: 'Brian Foster', email: 'brian@pchardware.com', role: 'Technician', department: 'Service', status: 'Active' },
  { id: 'STF-103', name: 'Catherine Wong', email: 'catherine@pchardware.com', role: 'Manager', department: 'Operations', status: 'Active' },
  { id: 'STF-104', name: 'Daniel Rivera', email: 'daniel@pchardware.com', role: 'Support', department: 'Customer Service', status: 'Active' },
];

export function UserManagement() {
  const [activeTab, setActiveTab] = useState<'customers' | 'staff' | 'admins'>('customers');

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl tracking-tight">User & Staff Management</h1>
        <p className="text-sm text-[#E7ECF1]/60 mt-1">Manage customers, technicians, and administrative access</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#2F353F]">
        <button 
          onClick={() => setActiveTab('customers')}
          className={`px-6 py-3 text-sm transition-colors ${
            activeTab === 'customers' 
              ? 'border-b-2 border-[#5EC8FF] text-[#5EC8FF]' 
              : 'text-[#E7ECF1]/60 hover:text-[#E7ECF1]'
          }`}
        >
          Customers
        </button>
        <button 
          onClick={() => setActiveTab('staff')}
          className={`px-6 py-3 text-sm transition-colors ${
            activeTab === 'staff' 
              ? 'border-b-2 border-[#5EC8FF] text-[#5EC8FF]' 
              : 'text-[#E7ECF1]/60 hover:text-[#E7ECF1]'
          }`}
        >
          Technicians / Staff
        </button>
        <button 
          onClick={() => setActiveTab('admins')}
          className={`px-6 py-3 text-sm transition-colors ${
            activeTab === 'admins' 
              ? 'border-b-2 border-[#5EC8FF] text-[#5EC8FF]' 
              : 'text-[#E7ECF1]/60 hover:text-[#E7ECF1]'
          }`}
        >
          Admin Controls
        </button>
      </div>

      {activeTab === 'customers' && (
        <>
          {/* Stats */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-[#20252D] border border-[#2F353F] p-5">
              <div className="text-xs text-[#E7ECF1]/60">Total Customers</div>
              <div className="text-2xl mt-2">3,847</div>
            </div>
            <div className="bg-[#20252D] border border-[#2F353F] p-5">
              <div className="text-xs text-[#E7ECF1]/60">Active This Month</div>
              <div className="text-2xl mt-2">892</div>
            </div>
            <div className="bg-[#20252D] border border-[#2F353F] p-5">
              <div className="text-xs text-[#E7ECF1]/60">VIP Customers</div>
              <div className="text-2xl mt-2">145</div>
            </div>
            <div className="bg-[#20252D] border border-[#2F353F] p-5">
              <div className="text-xs text-[#E7ECF1]/60">New This Week</div>
              <div className="text-2xl mt-2">28</div>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="bg-[#20252D] border border-[#2F353F] p-5">
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-2">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#E7ECF1]/40" />
                  <input
                    type="text"
                    placeholder="Search customers..."
                    className="w-full pl-10 pr-4 py-2.5 bg-[#171B21] border border-[#2F353F] text-sm text-[#E7ECF1] placeholder:text-[#E7ECF1]/40 focus:outline-none focus:border-[#5EC8FF]"
                  />
                </div>
              </div>
              <select className="px-4 py-2.5 bg-[#171B21] border border-[#2F353F] text-sm text-[#E7ECF1] focus:outline-none focus:border-[#5EC8FF]">
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="vip">VIP</option>
                <option value="inactive">Inactive</option>
              </select>
              <select className="px-4 py-2.5 bg-[#171B21] border border-[#2F353F] text-sm text-[#E7ECF1] focus:outline-none focus:border-[#5EC8FF]">
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="spent-high">Highest Spent</option>
                <option value="spent-low">Lowest Spent</option>
              </select>
            </div>
          </div>

          {/* Customers Table */}
          <div className="bg-[#20252D] border border-[#2F353F]">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#2F353F]">
                  <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">User ID</th>
                  <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">Name</th>
                  <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">Email</th>
                  <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">Orders</th>
                  <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">Total Spent</th>
                  <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">Join Date</th>
                  <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">Status</th>
                  <th className="text-right px-5 py-4 text-xs text-[#E7ECF1]/60">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id} className="border-b border-[#2F353F]/50 hover:bg-[#2F353F]/30">
                    <td className="px-5 py-4 text-sm">{customer.id}</td>
                    <td className="px-5 py-4 text-sm">{customer.name}</td>
                    <td className="px-5 py-4 text-sm">{customer.email}</td>
                    <td className="px-5 py-4 text-sm">{customer.orders}</td>
                    <td className="px-5 py-4 text-sm">{customer.spent}</td>
                    <td className="px-5 py-4 text-sm">{customer.joinDate}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-block px-2 py-1 text-xs ${
                        customer.status === 'VIP' ? 'bg-[#5EC8FF]/10 text-[#5EC8FF]' : 'bg-green-500/10 text-green-400'
                      }`}>
                        {customer.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-1.5 hover:bg-[#2F353F] transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 hover:bg-[#2F353F] transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 hover:bg-[#2F353F] transition-colors text-red-400">
                          <Ban className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {activeTab === 'staff' && (
        <>
          {/* Staff Stats */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-[#20252D] border border-[#2F353F] p-5">
              <div className="text-xs text-[#E7ECF1]/60">Total Staff</div>
              <div className="text-2xl mt-2">24</div>
            </div>
            <div className="bg-[#20252D] border border-[#2F353F] p-5">
              <div className="text-xs text-[#E7ECF1]/60">Technicians</div>
              <div className="text-2xl mt-2">12</div>
            </div>
            <div className="bg-[#20252D] border border-[#2F353F] p-5">
              <div className="text-xs text-[#E7ECF1]/60">Support Staff</div>
              <div className="text-2xl mt-2">8</div>
            </div>
            <div className="bg-[#20252D] border border-[#2F353F] p-5">
              <div className="text-xs text-[#E7ECF1]/60">Managers</div>
              <div className="text-2xl mt-2">4</div>
            </div>
          </div>

          {/* Staff Table */}
          <div className="bg-[#20252D] border border-[#2F353F]">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#2F353F]">
                  <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">Staff ID</th>
                  <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">Name</th>
                  <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">Email</th>
                  <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">Role</th>
                  <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">Department</th>
                  <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">Status</th>
                  <th className="text-right px-5 py-4 text-xs text-[#E7ECF1]/60">Actions</th>
                </tr>
              </thead>
              <tbody>
                {staff.map((member) => (
                  <tr key={member.id} className="border-b border-[#2F353F]/50 hover:bg-[#2F353F]/30">
                    <td className="px-5 py-4 text-sm">{member.id}</td>
                    <td className="px-5 py-4 text-sm">{member.name}</td>
                    <td className="px-5 py-4 text-sm">{member.email}</td>
                    <td className="px-5 py-4 text-sm">{member.role}</td>
                    <td className="px-5 py-4 text-sm">{member.department}</td>
                    <td className="px-5 py-4">
                      <span className="inline-block px-2 py-1 text-xs bg-green-500/10 text-green-400">
                        {member.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-1.5 hover:bg-[#2F353F] transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 hover:bg-[#2F353F] transition-colors">
                          <Shield className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {activeTab === 'admins' && (
        <div className="bg-[#20252D] border border-[#2F353F] p-6">
          <h3 className="text-lg mb-6">Administrator Controls</h3>
          
          <div className="space-y-6">
            <div>
              <div className="text-sm mb-4">Permission Matrix</div>
              <div className="bg-[#171B21] border border-[#2F353F] p-4">
                <div className="grid grid-cols-5 gap-4 text-xs text-[#E7ECF1]/60 mb-3">
                  <div>Module</div>
                  <div>View</div>
                  <div>Create</div>
                  <div>Edit</div>
                  <div>Delete</div>
                </div>
                {['Products', 'Orders', 'Users', 'Reports', 'Settings'].map(module => (
                  <div key={module} className="grid grid-cols-5 gap-4 py-3 border-t border-[#2F353F]">
                    <div className="text-sm">{module}</div>
                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                    <input type="checkbox" className="w-4 h-4" />
                  </div>
                ))}
              </div>
            </div>

            <button className="px-4 py-2.5 bg-[#5EC8FF] text-[#171B21] text-sm hover:bg-[#5EC8FF]/90 transition-colors">
              Save Permission Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
