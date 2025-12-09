import { useState } from 'react';
import { Check, X, Eye, DollarSign } from 'lucide-react';

const usedComponents = [
  { id: 'UC-1428', sender: 'John Smith', email: 'john@email.com', component: 'RTX 3080 Ti', condition: 'Good', appraisal: '$650', status: 'Pending Review', date: '2025-11-27' },
  { id: 'UC-1427', sender: 'Sarah Johnson', email: 'sarah@email.com', component: 'Intel i9-12900K', condition: 'Excellent', appraisal: '$380', status: 'Approved', date: '2025-11-26' },
  { id: 'UC-1426', sender: 'Mike Chen', email: 'mike@email.com', component: 'Corsair 32GB DDR4', condition: 'Fair', appraisal: '$85', status: 'Pending Review', date: '2025-11-26' },
  { id: 'UC-1425', sender: 'Emily Davis', email: 'emily@email.com', component: 'Samsung 970 EVO 1TB', condition: 'Good', appraisal: '$65', status: 'Approved', date: '2025-11-25' },
  { id: 'UC-1424', sender: 'Robert Wilson', email: 'robert@email.com', component: 'ASUS ROG Strix B550', condition: 'Poor', appraisal: '$45', status: 'Rejected', date: '2025-11-25' },
];

export function UsedComponents() {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [showAppraisalModal, setShowAppraisalModal] = useState(false);

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl tracking-tight">Used Components Management</h1>
        <p className="text-sm text-[#E7ECF1]/60 mt-1">Review and manage 2nd-hand hardware submissions</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-[#20252D] border border-[#2F353F] p-5">
          <div className="text-xs text-[#E7ECF1]/60">Pending Review</div>
          <div className="text-2xl mt-2">23</div>
        </div>
        <div className="bg-[#20252D] border border-[#2F353F] p-5">
          <div className="text-xs text-[#E7ECF1]/60">Approved This Week</div>
          <div className="text-2xl mt-2">48</div>
        </div>
        <div className="bg-[#20252D] border border-[#2F353F] p-5">
          <div className="text-xs text-[#E7ECF1]/60">Total Value</div>
          <div className="text-2xl mt-2">$12,450</div>
        </div>
        <div className="bg-[#20252D] border border-[#2F353F] p-5">
          <div className="text-xs text-[#E7ECF1]/60">Rejection Rate</div>
          <div className="text-2xl mt-2">12%</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-[#20252D] border border-[#2F353F] p-5">
        <div className="grid grid-cols-4 gap-4">
          <select className="px-4 py-2.5 bg-[#171B21] border border-[#2F353F] text-sm text-[#E7ECF1] focus:outline-none focus:border-[#5EC8FF]">
            <option value="all">All Status</option>
            <option value="pending">Pending Review</option>
            <option value="approved">Approved</option>
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

      {/* Components Table */}
      <div className="bg-[#20252D] border border-[#2F353F]">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#2F353F]">
              <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">ID</th>
              <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">Sender Info</th>
              <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">Component</th>
              <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">Condition</th>
              <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">Appraisal Value</th>
              <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">Status</th>
              <th className="text-right px-5 py-4 text-xs text-[#E7ECF1]/60">Actions</th>
            </tr>
          </thead>
          <tbody>
            {usedComponents.map((item) => (
              <tr key={item.id} className="border-b border-[#2F353F]/50 hover:bg-[#2F353F]/30">
                <td className="px-5 py-4 text-sm">{item.id}</td>
                <td className="px-5 py-4">
                  <div className="text-sm">{item.sender}</div>
                  <div className="text-xs text-[#E7ECF1]/50">{item.email}</div>
                </td>
                <td className="px-5 py-4 text-sm">{item.component}</td>
                <td className="px-5 py-4">
                  <span className={`inline-block px-2 py-1 text-xs ${
                    item.condition === 'Excellent' ? 'bg-green-500/10 text-green-400' :
                    item.condition === 'Good' ? 'bg-[#5EC8FF]/10 text-[#5EC8FF]' :
                    item.condition === 'Fair' ? 'bg-yellow-500/10 text-yellow-400' :
                    'bg-red-500/10 text-red-400'
                  }`}>
                    {item.condition}
                  </span>
                </td>
                <td className="px-5 py-4 text-sm">{item.appraisal}</td>
                <td className="px-5 py-4">
                  <span className={`inline-block px-2 py-1 text-xs ${
                    item.status === 'Pending Review' ? 'bg-yellow-500/10 text-yellow-400' :
                    item.status === 'Approved' ? 'bg-green-500/10 text-green-400' :
                    'bg-red-500/10 text-red-400'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => {
                        setSelectedComponent(item.id);
                        setShowAppraisalModal(true);
                      }}
                      className="p-1.5 hover:bg-[#2F353F] transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    {item.status === 'Pending Review' && (
                      <>
                        <button className="p-1.5 hover:bg-[#2F353F] transition-colors text-green-400">
                          <Check className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 hover:bg-[#2F353F] transition-colors text-red-400">
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Appraisal Review Modal */}
      {showAppraisalModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowAppraisalModal(false)}>
          <div className="w-[700px] bg-[#20252D] border border-[#2F353F] p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl mb-6">Component Appraisal Review</h2>
            
            <div className="space-y-6">
              {/* Sender Info */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-xs text-[#E7ECF1]/60 mb-2">Sender Name</div>
                  <div className="text-sm">John Smith</div>
                </div>
                <div>
                  <div className="text-xs text-[#E7ECF1]/60 mb-2">Contact Email</div>
                  <div className="text-sm">john@email.com</div>
                </div>
              </div>

              {/* Component Details */}
              <div className="border-t border-[#2F353F] pt-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-xs text-[#E7ECF1]/60 mb-2">Component Type</div>
                    <div className="text-sm">Graphics Card</div>
                  </div>
                  <div>
                    <div className="text-xs text-[#E7ECF1]/60 mb-2">Model</div>
                    <div className="text-sm">NVIDIA RTX 3080 Ti</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mt-4">
                  <div>
                    <div className="text-xs text-[#E7ECF1]/60 mb-2">Purchase Date</div>
                    <div className="text-sm">March 2022</div>
                  </div>
                  <div>
                    <div className="text-xs text-[#E7ECF1]/60 mb-2">Original Price</div>
                    <div className="text-sm">$1,199</div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="text-xs text-[#E7ECF1]/60 mb-2">Condition Assessment</div>
                  <div className="text-sm">Good - Minor cosmetic wear, fully functional, includes original packaging</div>
                </div>
              </div>

              {/* Appraisal Section */}
              <div className="border-t border-[#2F353F] pt-6">
                <div className="text-xs text-[#E7ECF1]/60 mb-4">Set Appraisal Value</div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[#E7ECF1]/60 mb-2">Offer Price</label>
                    <div className="relative">
                      <DollarSign className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#E7ECF1]/40" />
                      <input 
                        type="number" 
                        className="w-full pl-10 pr-4 py-2.5 bg-[#171B21] border border-[#2F353F] text-sm text-[#E7ECF1] focus:outline-none focus:border-[#5EC8FF]"
                        placeholder="0.00"
                        defaultValue="650"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-[#E7ECF1]/60 mb-2">Condition</label>
                    <select className="w-full px-4 py-2.5 bg-[#171B21] border border-[#2F353F] text-sm text-[#E7ECF1] focus:outline-none focus:border-[#5EC8FF]">
                      <option>Excellent</option>
                      <option selected>Good</option>
                      <option>Fair</option>
                      <option>Poor</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-xs text-[#E7ECF1]/60 mb-2">Internal Notes</label>
                  <textarea 
                    rows={3}
                    className="w-full px-4 py-2.5 bg-[#171B21] border border-[#2F353F] text-sm text-[#E7ECF1] focus:outline-none focus:border-[#5EC8FF] resize-none"
                    placeholder="Add appraisal notes..."
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => setShowAppraisalModal(false)}
                className="px-4 py-2.5 border border-[#2F353F] text-sm hover:bg-[#2F353F] transition-colors"
              >
                Cancel
              </button>
              <button className="px-4 py-2.5 border border-red-500/50 text-sm hover:bg-red-500/10 transition-colors text-red-400">
                Reject
              </button>
              <button className="flex-1 px-4 py-2.5 bg-[#5EC8FF] text-[#171B21] text-sm hover:bg-[#5EC8FF]/90 transition-colors">
                Approve & Send Offer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
