import React, { useState } from 'react';
import { User, MapPin, CreditCard, Shield, Plus, Edit2, Trash2, CheckCircle } from 'lucide-react';

interface AccountProps {
  onNavigate: (page: string, params?: any) => void;
}

export function Account({ onNavigate }: AccountProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'addresses' | 'payment' | 'security'>('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'payment', label: 'Payment Methods', icon: CreditCard },
    { id: 'security', label: 'Security', icon: Shield }
  ];

  return (
    <div className="space-y-6">
      <h1>My Account</h1>

      <div className="flex gap-6">
        {/* Sidebar Tabs */}
        <div className="w-64 flex-shrink-0">
          <div className="bg-[#171B21] border border-[#3A4047] rounded p-2 space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded text-sm transition-all ${
                    activeTab === tab.id
                      ? 'bg-[#5EC8FF]/10 text-[#5EC8FF] border border-[#5EC8FF]/30'
                      : 'hover:bg-[#2F353F] text-[#E7ECF1]/70'
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          {/* Profile */}
          {activeTab === 'profile' && (
            <div className="bg-[#171B21] border border-[#3A4047] rounded">
              <div className="p-6 border-b border-[#3A4047]">
                <h3>Personal Information</h3>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex items-center gap-6 pb-6 border-b border-[#3A4047]">
                  <div className="w-20 h-20 bg-[#2F353F] rounded-full flex items-center justify-center">
                    <User size={32} />
                  </div>
                  <div>
                    <h4 className="mb-1">Alex Johnson</h4>
                    <p className="text-sm text-[#E7ECF1]/60">alex.johnson@email.com</p>
                  </div>
                  <button className="ml-auto px-4 py-2 bg-[#2F353F] border border-[#3A4047] rounded text-sm hover:bg-[#3A4047] transition-colors">
                    Change Photo
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2">First Name</label>
                    <input
                      type="text"
                      defaultValue="Alex"
                      className="w-full bg-[#2F353F] border border-[#3A4047] rounded px-4 py-2.5 focus:outline-none focus:border-[#5EC8FF]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Last Name</label>
                    <input
                      type="text"
                      defaultValue="Johnson"
                      className="w-full bg-[#2F353F] border border-[#3A4047] rounded px-4 py-2.5 focus:outline-none focus:border-[#5EC8FF]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-2">Email Address</label>
                  <input
                    type="email"
                    defaultValue="alex.johnson@email.com"
                    className="w-full bg-[#2F353F] border border-[#3A4047] rounded px-4 py-2.5 focus:outline-none focus:border-[#5EC8FF]"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2">Phone Number</label>
                  <input
                    type="tel"
                    defaultValue="+63 917 123 4567"
                    className="w-full bg-[#2F353F] border border-[#3A4047] rounded px-4 py-2.5 focus:outline-none focus:border-[#5EC8FF]"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t border-[#3A4047]">
                  <button className="px-6 py-2 bg-[#2F353F] border border-[#3A4047] rounded hover:bg-[#3A4047] transition-colors">
                    Cancel
                  </button>
                  <button className="px-6 py-2 bg-[#5EC8FF] text-[#0E1114] rounded hover:bg-[#5EC8FF]/90 transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Addresses */}
          {activeTab === 'addresses' && (
            <div className="bg-[#171B21] border border-[#3A4047] rounded">
              <div className="p-6 border-b border-[#3A4047] flex items-center justify-between">
                <h3>Saved Addresses</h3>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#5EC8FF] text-[#0E1114] rounded text-sm hover:bg-[#5EC8FF]/90 transition-colors">
                  <Plus size={16} />
                  Add Address
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="bg-[#2F353F] border border-[#3A4047] rounded p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="text-sm">Home</h4>
                        <span className="text-xs px-2 py-0.5 bg-[#5EC8FF]/10 text-[#5EC8FF] rounded">Default</span>
                      </div>
                      <p className="text-sm text-[#E7ECF1]/80">
                        Unit 4B, Tech Plaza Tower<br />
                        Makati City, Metro Manila 1226<br />
                        Philippines
                      </p>
                      <p className="text-sm text-[#E7ECF1]/60 mt-2">+63 917 123 4567</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 bg-[#171B21] rounded hover:bg-[#3A4047] transition-colors">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-2 bg-[#171B21] rounded hover:bg-red-500 hover:text-white transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-[#2F353F] border border-[#3A4047] rounded p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-sm mb-2">Office</h4>
                      <p className="text-sm text-[#E7ECF1]/80">
                        5th Floor, Business Center<br />
                        BGC, Taguig City 1634<br />
                        Philippines
                      </p>
                      <p className="text-sm text-[#E7ECF1]/60 mt-2">+63 917 123 4567</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 bg-[#171B21] rounded hover:bg-[#3A4047] transition-colors">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-2 bg-[#171B21] rounded hover:bg-red-500 hover:text-white transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Payment Methods */}
          {activeTab === 'payment' && (
            <div className="bg-[#171B21] border border-[#3A4047] rounded">
              <div className="p-6 border-b border-[#3A4047] flex items-center justify-between">
                <h3>Payment Methods</h3>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#5EC8FF] text-[#0E1114] rounded text-sm hover:bg-[#5EC8FF]/90 transition-colors">
                  <Plus size={16} />
                  Add Payment Method
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="bg-[#2F353F] border border-[#3A4047] rounded p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-8 bg-gradient-to-br from-[#5EC8FF] to-[#3A9FD5] rounded flex items-center justify-center text-xs">
                        VISA
                      </div>
                      <div>
                        <div className="text-sm mb-1">•••• •••• •••• 4532</div>
                        <div className="text-xs text-[#E7ECF1]/60">Expires 12/25</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-0.5 bg-[#5EC8FF]/10 text-[#5EC8FF] rounded">Default</span>
                      <button className="p-2 bg-[#171B21] rounded hover:bg-red-500 hover:text-white transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-[#2F353F] border border-[#3A4047] rounded p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-8 bg-[#00B0FF] rounded flex items-center justify-center text-xs">
                        GCASH
                      </div>
                      <div>
                        <div className="text-sm mb-1">+63 917 123 4567</div>
                        <div className="text-xs text-[#E7ECF1]/60">Verified</div>
                      </div>
                    </div>
                    <button className="p-2 bg-[#171B21] rounded hover:bg-red-500 hover:text-white transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="bg-[#2F353F] border border-[#3A4047] rounded p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-8 bg-[#00D632] rounded flex items-center justify-center text-xs text-black">
                        MAYA
                      </div>
                      <div>
                        <div className="text-sm mb-1">+63 917 123 4567</div>
                        <div className="text-xs text-[#E7ECF1]/60">Verified</div>
                      </div>
                    </div>
                    <button className="p-2 bg-[#171B21] rounded hover:bg-red-500 hover:text-white transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security */}
          {activeTab === 'security' && (
            <div className="space-y-4">
              <div className="bg-[#171B21] border border-[#3A4047] rounded">
                <div className="p-6 border-b border-[#3A4047]">
                  <h3>Change Password</h3>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm mb-2">Current Password</label>
                    <input
                      type="password"
                      className="w-full bg-[#2F353F] border border-[#3A4047] rounded px-4 py-2.5 focus:outline-none focus:border-[#5EC8FF]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">New Password</label>
                    <input
                      type="password"
                      className="w-full bg-[#2F353F] border border-[#3A4047] rounded px-4 py-2.5 focus:outline-none focus:border-[#5EC8FF]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      className="w-full bg-[#2F353F] border border-[#3A4047] rounded px-4 py-2.5 focus:outline-none focus:border-[#5EC8FF]"
                    />
                  </div>
                  <div className="flex justify-end pt-4 border-t border-[#3A4047]">
                    <button className="px-6 py-2 bg-[#5EC8FF] text-[#0E1114] rounded hover:bg-[#5EC8FF]/90 transition-colors">
                      Update Password
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-[#171B21] border border-[#3A4047] rounded">
                <div className="p-6 border-b border-[#3A4047]">
                  <h3>Two-Factor Authentication</h3>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="mb-1">2FA Status</h4>
                      <p className="text-sm text-[#E7ECF1]/60">Add an extra layer of security to your account</p>
                    </div>
                    <button className="px-6 py-2 bg-[#5EC8FF] text-[#0E1114] rounded hover:bg-[#5EC8FF]/90 transition-colors">
                      Enable 2FA
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-[#171B21] border border-[#3A4047] rounded">
                <div className="p-6 border-b border-[#3A4047]">
                  <h3>Login Sessions</h3>
                </div>
                <div className="p-6 space-y-3">
                  <div className="bg-[#2F353F] border border-[#3A4047] rounded p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <CheckCircle size={20} className="text-green-400" />
                        <div>
                          <div className="text-sm mb-1">Chrome on Windows</div>
                          <div className="text-xs text-[#E7ECF1]/60">Makati, Philippines • Current session</div>
                          <div className="text-xs text-[#E7ECF1]/40">Last active: Now</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#2F353F] border border-[#3A4047] rounded p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-[#171B21] rounded-full" />
                        <div>
                          <div className="text-sm mb-1">Mobile App on Android</div>
                          <div className="text-xs text-[#E7ECF1]/60">Makati, Philippines</div>
                          <div className="text-xs text-[#E7ECF1]/40">Last active: 2 hours ago</div>
                        </div>
                      </div>
                      <button className="text-sm text-red-400 hover:text-red-300">Revoke</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
