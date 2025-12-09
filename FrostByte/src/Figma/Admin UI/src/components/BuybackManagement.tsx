import { useState } from 'react';
import { DollarSign, Check, X, Eye } from 'lucide-react';

const buybackRequests = [
  { id: 'BB-2847', user: 'Mark Johnson', email: 'mark@email.com', component: 'RTX 3090', condition: 'Excellent', offerPrice: '$850', userPrice: '$900', status: 'Pending Review', date: '2025-11-27' },
  { id: 'BB-2846', user: 'Jennifer Lee', email: 'jen@email.com', component: 'AMD Ryzen 7 5800X', condition: 'Good', offerPrice: '$220', userPrice: '$250', status: 'Offer Sent', date: '2025-11-26' },
  { id: 'BB-2845', user: 'Thomas Brown', email: 'thomas@email.com', component: 'G.Skill 16GB DDR4', condition: 'Fair', offerPrice: '$45', userPrice: '$60', status: 'Negotiating', date: '2025-11-26' },
  { id: 'BB-2844', user: 'Jessica White', email: 'jessica@email.com', component: 'Samsung 860 EVO 500GB', condition: 'Good', offerPrice: '$40', userPrice: '$40', status: 'Accepted', date: '2025-11-25' },
  { id: 'BB-2843', user: 'Daniel Garcia', email: 'daniel@email.com', component: 'ASUS Prime B450M', condition: 'Poor', offerPrice: '$0', userPrice: '$80', status: 'Rejected', date: '2025-11-25' },
];

export function BuybackManagement() {
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const [showOfferModal, setShowOfferModal] = useState(false);

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl tracking-tight">2nd-Hand Buyback Management</h1>
        <p className="text-sm text-[#E7ECF1]/60 mt-1">Manage hardware buyback requests and pricing</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-4">
        <div className="bg-[#20252D] border border-[#2F353F] p-5">
          <div className="text-xs text-[#E7ECF1]/60">Pending Review</div>
          <div className="text-2xl mt-2">15</div>
        </div>
        <div className="bg-[#20252D] border border-[#2F353F] p-5">
          <div className="text-xs text-[#E7ECF1]/60">Offers Sent</div>
          <div className="text-2xl mt-2">28</div>
        </div>
        <div className="bg-[#20252D] border border-[#2F353F] p-5">
          <div className="text-xs text-[#E7ECF1]/60">Accepted</div>
          <div className="text-2xl mt-2">142</div>
        </div>
        <div className="bg-[#20252D] border border-[#2F353F] p-5">
          <div className="text-xs text-[#E7ECF1]/60">Total Value</div>
          <div className="text-2xl mt-2">$28.5K</div>
        </div>
        <div className="bg-[#20252D] border border-[#2F353F] p-5">
          <div className="text-xs text-[#E7ECF1]/60">This Month</div>
          <div className="text-2xl mt-2">$4.2K</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-[#20252D] border border-[#2F353F] p-5">
        <div className="grid grid-cols-4 gap-4">
          <select className="px-4 py-2.5 bg-[#171B21] border border-[#2F353F] text-sm text-[#E7ECF1] focus:outline-none focus:border-[#5EC8FF]">
            <option value="all">All Status</option>
            <option value="pending">Pending Review</option>
            <option value="offer">Offer Sent</option>
            <option value="negotiating">Negotiating</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
          <select className="px-4 py-2.5 bg-[#171B21] border border-[#2F353F] text-sm text-[#E7ECF1] focus:outline-none focus:border-[#5EC8FF]">
            <option value="all">All Components</option>
            <option value="gpu">Graphics Cards</option>
            <option value="cpu">Processors</option>
            <option value="ram">Memory</option>
            <option value="storage">Storage</option>
          </select>
          <select className="px-4 py-2.5 bg-[#171B21] border border-[#2F353F] text-sm text-[#E7ECF1] focus:outline-none focus:border-[#5EC8FF]">
            <option value="all">All Conditions</option>
            <option value="excellent">Excellent</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
            <option value="poor">Poor</option>
          </select>
          <select className="px-4 py-2.5 bg-[#171B21] border border-[#2F353F] text-sm text-[#E7ECF1] focus:outline-none focus:border-[#5EC8FF]">
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="value-high">Highest Value</option>
            <option value="value-low">Lowest Value</option>
          </select>
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-[#20252D] border border-[#2F353F]">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#2F353F]">
              <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">Request ID</th>
              <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">User Info</th>
              <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">Component</th>
              <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">Condition</th>
              <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">User Price</th>
              <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">Our Offer</th>
              <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">Status</th>
              <th className="text-right px-5 py-4 text-xs text-[#E7ECF1]/60">Actions</th>
            </tr>
          </thead>
          <tbody>
            {buybackRequests.map((request) => (
              <tr key={request.id} className="border-b border-[#2F353F]/50 hover:bg-[#2F353F]/30">
                <td className="px-5 py-4 text-sm">{request.id}</td>
                <td className="px-5 py-4">
                  <div className="text-sm">{request.user}</div>
                  <div className="text-xs text-[#E7ECF1]/50">{request.email}</div>
                </td>
                <td className="px-5 py-4 text-sm">{request.component}</td>
                <td className="px-5 py-4">
                  <span className={`inline-block px-2 py-1 text-xs ${
                    request.condition === 'Excellent' ? 'bg-green-500/10 text-green-400' :
                    request.condition === 'Good' ? 'bg-[#5EC8FF]/10 text-[#5EC8FF]' :
                    request.condition === 'Fair' ? 'bg-yellow-500/10 text-yellow-400' :
                    'bg-red-500/10 text-red-400'
                  }`}>
                    {request.condition}
                  </span>
                </td>
                <td className="px-5 py-4 text-sm">{request.userPrice}</td>
                <td className="px-5 py-4 text-sm">{request.offerPrice}</td>
                <td className="px-5 py-4">
                  <span className={`inline-block px-2 py-1 text-xs ${
                    request.status === 'Pending Review' ? 'bg-yellow-500/10 text-yellow-400' :
                    request.status === 'Offer Sent' ? 'bg-[#5EC8FF]/10 text-[#5EC8FF]' :
                    request.status === 'Negotiating' ? 'bg-blue-500/10 text-blue-400' :
                    request.status === 'Accepted' ? 'bg-green-500/10 text-green-400' :
                    'bg-red-500/10 text-red-400'
                  }`}>
                    {request.status}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => {
                        setSelectedRequest(request.id);
                        setShowOfferModal(true);
                      }}
                      className="p-1.5 hover:bg-[#2F353F] transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    {request.status === 'Pending Review' && (
                      <button className="px-3 py-1 text-xs bg-[#5EC8FF] text-[#171B21] hover:bg-[#5EC8FF]/90 transition-colors">
                        Make Offer
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Price Offer Modal */}
      {showOfferModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowOfferModal(false)}>
          <div className="w-[700px] bg-[#20252D] border border-[#2F353F] p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl mb-6">Buyback Offer Review</h2>
            
            <div className="space-y-6">
              {/* User Info */}
              <div className="bg-[#171B21] border border-[#2F353F] p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-[#E7ECF1]/60">User Name</div>
                    <div className="text-sm mt-1">Mark Johnson</div>
                  </div>
                  <div>
                    <div className="text-xs text-[#E7ECF1]/60">Contact Email</div>
                    <div className="text-sm mt-1">mark@email.com</div>
                  </div>
                </div>
              </div>

              {/* Component Details */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-[#E7ECF1]/60 mb-1">Component</div>
                    <div className="text-sm">NVIDIA RTX 3090</div>
                  </div>
                  <div>
                    <div className="text-xs text-[#E7ECF1]/60 mb-1">Condition</div>
                    <div className="text-sm">Excellent</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-[#E7ECF1]/60 mb-1">Purchase Date</div>
                    <div className="text-sm">January 2022</div>
                  </div>
                  <div>
                    <div className="text-xs text-[#E7ECF1]/60 mb-1">User Expected Price</div>
                    <div className="text-sm">$900</div>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[#E7ECF1]/60 mb-1">User Notes</div>
                  <div className="text-sm text-[#E7ECF1]/80">
                    Barely used, purchased for mining but decided against it. Original box and all accessories included.
                  </div>
                </div>
              </div>

              {/* Pricing Section */}
              <div className="border-t border-[#2F353F] pt-6">
                <div className="text-xs text-[#E7ECF1]/60 mb-4">Set Buyback Price</div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[#E7ECF1]/60 mb-2">Our Offer Price</label>
                    <div className="relative">
                      <DollarSign className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#E7ECF1]/40" />
                      <input 
                        type="number" 
                        className="w-full pl-10 pr-4 py-2.5 bg-[#171B21] border border-[#2F353F] text-sm text-[#E7ECF1] focus:outline-none focus:border-[#5EC8FF]"
                        placeholder="0.00"
                        defaultValue="850"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-[#E7ECF1]/60 mb-2">Market Value Reference</label>
                    <div className="text-sm mt-2.5">$800 - $900</div>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-xs text-[#E7ECF1]/60 mb-2">Offer Message (Optional)</label>
                  <textarea 
                    rows={3}
                    className="w-full px-4 py-2.5 bg-[#171B21] border border-[#2F353F] text-sm text-[#E7ECF1] focus:outline-none focus:border-[#5EC8FF] resize-none"
                    placeholder="Add custom message to the user..."
                  />
                </div>
              </div>

              {/* Workflow Actions */}
              <div className="border-t border-[#2F353F] pt-6">
                <div className="text-xs text-[#E7ECF1]/60 mb-3">Next Steps After Acceptance</div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="w-4 h-4" defaultChecked />
                    <span>Schedule pickup or shipping</span>
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="w-4 h-4" defaultChecked />
                    <span>Process payment upon verification</span>
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="w-4 h-4" defaultChecked />
                    <span>Add to inventory after inspection</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => setShowOfferModal(false)}
                className="px-4 py-2.5 border border-[#2F353F] text-sm hover:bg-[#2F353F] transition-colors"
              >
                Cancel
              </button>
              <button className="px-4 py-2.5 border border-red-500/50 text-sm hover:bg-red-500/10 transition-colors text-red-400">
                Reject Request
              </button>
              <button className="flex-1 px-4 py-2.5 bg-[#5EC8FF] text-[#171B21] text-sm hover:bg-[#5EC8FF]/90 transition-colors">
                Send Offer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
