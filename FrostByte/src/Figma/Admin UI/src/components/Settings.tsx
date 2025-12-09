import { useState } from 'react';
import { Save, Upload } from 'lucide-react';

export function Settings() {
  const [activeTab, setActiveTab] = useState<'general' | 'payment' | 'delivery' | 'tax'>('general');

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl tracking-tight">System Settings</h1>
        <p className="text-sm text-[#E7ECF1]/60 mt-1">Configure platform settings and preferences</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#2F353F]">
        <button 
          onClick={() => setActiveTab('general')}
          className={`px-6 py-3 text-sm transition-colors ${
            activeTab === 'general' 
              ? 'border-b-2 border-[#5EC8FF] text-[#5EC8FF]' 
              : 'text-[#E7ECF1]/60 hover:text-[#E7ECF1]'
          }`}
        >
          General
        </button>
        <button 
          onClick={() => setActiveTab('payment')}
          className={`px-6 py-3 text-sm transition-colors ${
            activeTab === 'payment' 
              ? 'border-b-2 border-[#5EC8FF] text-[#5EC8FF]' 
              : 'text-[#E7ECF1]/60 hover:text-[#E7ECF1]'
          }`}
        >
          Payment Methods
        </button>
        <button 
          onClick={() => setActiveTab('delivery')}
          className={`px-6 py-3 text-sm transition-colors ${
            activeTab === 'delivery' 
              ? 'border-b-2 border-[#5EC8FF] text-[#5EC8FF]' 
              : 'text-[#E7ECF1]/60 hover:text-[#E7ECF1]'
          }`}
        >
          Delivery Zones
        </button>
        <button 
          onClick={() => setActiveTab('tax')}
          className={`px-6 py-3 text-sm transition-colors ${
            activeTab === 'tax' 
              ? 'border-b-2 border-[#5EC8FF] text-[#5EC8FF]' 
              : 'text-[#E7ECF1]/60 hover:text-[#E7ECF1]'
          }`}
        >
          Tax & Finance
        </button>
      </div>

      {activeTab === 'general' && (
        <div className="space-y-6">
          {/* Website Details */}
          <div className="bg-[#20252D] border border-[#2F353F] p-6">
            <h3 className="text-lg mb-6">Website Details</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-[#E7ECF1]/60 mb-2">Company Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2.5 bg-[#171B21] border border-[#2F353F] text-sm text-[#E7ECF1] focus:outline-none focus:border-[#5EC8FF]"
                  defaultValue="PC Hardware Inc."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#E7ECF1]/60 mb-2">Contact Email</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-2.5 bg-[#171B21] border border-[#2F353F] text-sm text-[#E7ECF1] focus:outline-none focus:border-[#5EC8FF]"
                    defaultValue="info@pchardware.com"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#E7ECF1]/60 mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    className="w-full px-4 py-2.5 bg-[#171B21] border border-[#2F353F] text-sm text-[#E7ECF1] focus:outline-none focus:border-[#5EC8FF]"
                    defaultValue="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#E7ECF1]/60 mb-2">Business Address</label>
                <textarea 
                  rows={3}
                  className="w-full px-4 py-2.5 bg-[#171B21] border border-[#2F353F] text-sm text-[#E7ECF1] focus:outline-none focus:border-[#5EC8FF] resize-none"
                  defaultValue="123 Tech Boulevard, Suite 500&#10;San Francisco, CA 94102&#10;United States"
                />
              </div>

              <div>
                <label className="block text-xs text-[#E7ECF1]/60 mb-2">Logo Upload</label>
                <button className="flex items-center gap-2 px-4 py-2.5 border border-[#2F353F] text-sm hover:bg-[#2F353F] transition-colors">
                  <Upload className="w-4 h-4" />
                  Upload New Logo
                </button>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="bg-[#20252D] border border-[#2F353F] p-6">
            <h3 className="text-lg mb-6">Business Hours</h3>
            
            <div className="space-y-3">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                <div key={day} className="flex items-center gap-4">
                  <div className="w-32 text-sm">{day}</div>
                  <input 
                    type="time" 
                    className="px-3 py-2 bg-[#171B21] border border-[#2F353F] text-sm text-[#E7ECF1] focus:outline-none focus:border-[#5EC8FF]"
                    defaultValue="09:00"
                  />
                  <span className="text-sm text-[#E7ECF1]/60">to</span>
                  <input 
                    type="time" 
                    className="px-3 py-2 bg-[#171B21] border border-[#2F353F] text-sm text-[#E7ECF1] focus:outline-none focus:border-[#5EC8FF]"
                    defaultValue="18:00"
                  />
                  <label className="flex items-center gap-2 ml-4">
                    <input type="checkbox" className="w-4 h-4" />
                    <span className="text-sm text-[#E7ECF1]/60">Closed</span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <button className="flex items-center gap-2 px-6 py-2.5 bg-[#5EC8FF] text-[#171B21] text-sm hover:bg-[#5EC8FF]/90 transition-colors">
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      )}

      {activeTab === 'payment' && (
        <div className="space-y-6">
          <div className="bg-[#20252D] border border-[#2F353F] p-6">
            <h3 className="text-lg mb-6">Payment Gateway Configuration</h3>
            
            <div className="space-y-6">
              {/* Credit Card */}
              <div className="border-b border-[#2F353F] pb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-sm">Credit / Debit Cards</div>
                    <div className="text-xs text-[#E7ECF1]/50 mt-1">Stripe, PayPal</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-[#2F353F] peer-checked:bg-[#5EC8FF] rounded-full peer"></div>
                  </label>
                </div>
                <div className="space-y-3">
                  <input 
                    type="text" 
                    className="w-full px-4 py-2.5 bg-[#171B21] border border-[#2F353F] text-sm text-[#E7ECF1] focus:outline-none focus:border-[#5EC8FF]"
                    placeholder="Stripe API Key"
                  />
                  <input 
                    type="text" 
                    className="w-full px-4 py-2.5 bg-[#171B21] border border-[#2F353F] text-sm text-[#E7ECF1] focus:outline-none focus:border-[#5EC8FF]"
                    placeholder="Stripe Secret Key"
                  />
                </div>
              </div>

              {/* PayPal */}
              <div className="border-b border-[#2F353F] pb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-sm">PayPal</div>
                    <div className="text-xs text-[#E7ECF1]/50 mt-1">Express checkout</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-[#2F353F] peer-checked:bg-[#5EC8FF] rounded-full peer"></div>
                  </label>
                </div>
                <div className="space-y-3">
                  <input 
                    type="text" 
                    className="w-full px-4 py-2.5 bg-[#171B21] border border-[#2F353F] text-sm text-[#E7ECF1] focus:outline-none focus:border-[#5EC8FF]"
                    placeholder="PayPal Client ID"
                  />
                </div>
              </div>

              {/* Bank Transfer */}
              <div className="pb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-sm">Bank Transfer</div>
                    <div className="text-xs text-[#E7ECF1]/50 mt-1">Manual verification required</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-[#2F353F] peer-checked:bg-[#5EC8FF] rounded-full peer"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <button className="flex items-center gap-2 px-6 py-2.5 bg-[#5EC8FF] text-[#171B21] text-sm hover:bg-[#5EC8FF]/90 transition-colors">
            <Save className="w-4 h-4" />
            Save Payment Settings
          </button>
        </div>
      )}

      {activeTab === 'delivery' && (
        <div className="space-y-6">
          <div className="bg-[#20252D] border border-[#2F353F] p-6">
            <h3 className="text-lg mb-6">Delivery Zones & Rates</h3>
            
            <div className="space-y-4">
              {[
                { zone: 'San Francisco Bay Area', fee: '$15', time: '1-2 days' },
                { zone: 'Los Angeles County', fee: '$20', time: '2-3 days' },
                { zone: 'San Diego County', fee: '$25', time: '3-4 days' },
                { zone: 'California (Other)', fee: '$30', time: '4-5 days' },
              ].map((zone, index) => (
                <div key={index} className="grid grid-cols-4 gap-4 items-center p-4 bg-[#171B21] border border-[#2F353F]">
                  <div className="text-sm">{zone.zone}</div>
                  <input 
                    type="text" 
                    className="px-3 py-2 bg-[#20252D] border border-[#2F353F] text-sm text-[#E7ECF1] focus:outline-none focus:border-[#5EC8FF]"
                    defaultValue={zone.fee}
                  />
                  <input 
                    type="text" 
                    className="px-3 py-2 bg-[#20252D] border border-[#2F353F] text-sm text-[#E7ECF1] focus:outline-none focus:border-[#5EC8FF]"
                    defaultValue={zone.time}
                  />
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" defaultChecked />
                    <span className="text-sm text-[#E7ECF1]/60">Active</span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <button className="flex items-center gap-2 px-6 py-2.5 bg-[#5EC8FF] text-[#171B21] text-sm hover:bg-[#5EC8FF]/90 transition-colors">
            <Save className="w-4 h-4" />
            Save Delivery Settings
          </button>
        </div>
      )}

      {activeTab === 'tax' && (
        <div className="space-y-6">
          <div className="bg-[#20252D] border border-[#2F353F] p-6">
            <h3 className="text-lg mb-6">Tax Configuration</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-[#E7ECF1]/60 mb-2">Default Tax Rate (%)</label>
                <input 
                  type="number" 
                  step="0.01"
                  className="w-full px-4 py-2.5 bg-[#171B21] border border-[#2F353F] text-sm text-[#E7ECF1] focus:outline-none focus:border-[#5EC8FF]"
                  defaultValue="8.5"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 mb-4">
                  <input type="checkbox" className="w-4 h-4" defaultChecked />
                  <span className="text-sm">Enable regional tax rates</span>
                </label>

                <div className="space-y-3">
                  {[
                    { state: 'California', rate: '8.5' },
                    { state: 'Texas', rate: '6.25' },
                    { state: 'New York', rate: '8.0' },
                  ].map((region, index) => (
                    <div key={index} className="grid grid-cols-3 gap-4 items-center">
                      <div className="text-sm text-[#E7ECF1]/60">{region.state}</div>
                      <input 
                        type="number" 
                        step="0.01"
                        className="px-3 py-2 bg-[#171B21] border border-[#2F353F] text-sm text-[#E7ECF1] focus:outline-none focus:border-[#5EC8FF]"
                        defaultValue={region.rate}
                      />
                      <span className="text-sm text-[#E7ECF1]/60">%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <button className="flex items-center gap-2 px-6 py-2.5 bg-[#5EC8FF] text-[#171B21] text-sm hover:bg-[#5EC8FF]/90 transition-colors">
            <Save className="w-4 h-4" />
            Save Tax Settings
          </button>
        </div>
      )}
    </div>
  );
}
