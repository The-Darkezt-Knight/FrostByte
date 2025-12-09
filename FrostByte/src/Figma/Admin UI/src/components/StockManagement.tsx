import { useState } from 'react';
import { AlertTriangle, Plus, TrendingDown, Package } from 'lucide-react';

const lowStockItems = [
  { id: 'PRD-1003', name: 'Corsair Dominator DDR5 64GB', category: 'Memory', currentStock: 5, minStock: 20, status: 'Critical' },
  { id: 'PRD-1008', name: 'Lian Li O11 Dynamic Case', category: 'Case', currentStock: 12, minStock: 15, status: 'Low' },
  { id: 'PRD-1012', name: 'Arctic Liquid Freezer II 360', category: 'Cooling', currentStock: 8, minStock: 15, status: 'Low' },
  { id: 'PRD-1015', name: 'Seasonic Prime TX-850', category: 'PSU', currentStock: 3, minStock: 10, status: 'Critical' },
  { id: 'PRD-1005', name: 'ASUS ROG Strix X670E', category: 'Motherboard', currentStock: 0, minStock: 10, status: 'Out of Stock' },
];

const stockHistory = [
  { date: '2025-11-25', product: 'NVIDIA RTX 4090', action: 'Restock', quantity: '+50', user: 'Admin-01', note: 'Supplier delivery' },
  { date: '2025-11-24', product: 'AMD Ryzen 9 7950X', action: 'Restock', quantity: '+30', user: 'Admin-02', note: 'Weekly restock' },
  { date: '2025-11-23', product: 'Samsung 990 PRO 2TB', action: 'Adjustment', quantity: '-5', user: 'Admin-01', note: 'Inventory correction' },
  { date: '2025-11-22', product: 'Corsair RM1000x PSU', action: 'Restock', quantity: '+40', user: 'Admin-03', note: 'Bulk order' },
];

export function StockManagement() {
  const [showRestockModal, setShowRestockModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl tracking-tight">Stock Management</h1>
        <p className="text-sm text-[#E7ECF1]/60 mt-1">Monitor and manage inventory levels</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-[#20252D] border border-[#2F353F] p-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs text-[#E7ECF1]/60">Low Stock Items</div>
              <div className="text-2xl mt-2">12</div>
            </div>
            <div className="w-10 h-10 bg-yellow-500/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="bg-[#20252D] border border-[#2F353F] p-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs text-[#E7ECF1]/60">Out of Stock</div>
              <div className="text-2xl mt-2">3</div>
            </div>
            <div className="w-10 h-10 bg-red-500/10 flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-red-400" />
            </div>
          </div>
        </div>

        <div className="bg-[#20252D] border border-[#2F353F] p-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs text-[#E7ECF1]/60">Total SKUs</div>
              <div className="text-2xl mt-2">3,249</div>
            </div>
            <div className="w-10 h-10 bg-[#5EC8FF]/10 flex items-center justify-center">
              <Package className="w-5 h-5 text-[#5EC8FF]" />
            </div>
          </div>
        </div>

        <div className="bg-[#20252D] border border-[#2F353F] p-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs text-[#E7ECF1]/60">Inventory Value</div>
              <div className="text-2xl mt-2">$2.4M</div>
            </div>
            <div className="w-10 h-10 bg-green-500/10 flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-green-400 rotate-180" />
            </div>
          </div>
        </div>
      </div>

      {/* Low Stock Alerts */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg">Low Stock Alerts</h2>
          <button 
            onClick={() => setShowRestockModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#5EC8FF] text-[#171B21] text-sm hover:bg-[#5EC8FF]/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Bulk Restock
          </button>
        </div>

        <div className="bg-[#20252D] border border-[#2F353F]">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2F353F]">
                <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">Product</th>
                <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">Category</th>
                <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">Current Stock</th>
                <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">Min Stock</th>
                <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">Status</th>
                <th className="text-right px-5 py-4 text-xs text-[#E7ECF1]/60">Actions</th>
              </tr>
            </thead>
            <tbody>
              {lowStockItems.map((item) => (
                <tr key={item.id} className="border-b border-[#2F353F]/50 hover:bg-[#2F353F]/30">
                  <td className="px-5 py-4">
                    <div className="text-sm">{item.name}</div>
                    <div className="text-xs text-[#E7ECF1]/50">{item.id}</div>
                  </td>
                  <td className="px-5 py-4 text-sm">{item.category}</td>
                  <td className="px-5 py-4 text-sm">{item.currentStock}</td>
                  <td className="px-5 py-4 text-sm">{item.minStock}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-block px-2 py-1 text-xs ${
                      item.status === 'Critical' ? 'bg-red-500/10 text-red-400' :
                      item.status === 'Low' ? 'bg-yellow-500/10 text-yellow-400' :
                      'bg-gray-500/10 text-gray-400'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end">
                      <button 
                        onClick={() => {
                          setSelectedProduct(item.id);
                          setShowRestockModal(true);
                        }}
                        className="px-4 py-1.5 bg-[#5EC8FF] text-[#171B21] text-xs hover:bg-[#5EC8FF]/90 transition-colors"
                      >
                        Restock
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stock History */}
      <div className="space-y-4">
        <h2 className="text-lg">Stock History</h2>

        <div className="bg-[#20252D] border border-[#2F353F]">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2F353F]">
                <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">Date</th>
                <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">Product</th>
                <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">Action</th>
                <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">Quantity</th>
                <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">User</th>
                <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">Note</th>
              </tr>
            </thead>
            <tbody>
              {stockHistory.map((entry, index) => (
                <tr key={index} className="border-b border-[#2F353F]/50 hover:bg-[#2F353F]/30">
                  <td className="px-5 py-4 text-sm">{entry.date}</td>
                  <td className="px-5 py-4 text-sm">{entry.product}</td>
                  <td className="px-5 py-4 text-sm">{entry.action}</td>
                  <td className="px-5 py-4">
                    <span className={`text-sm ${
                      entry.quantity.startsWith('+') ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {entry.quantity}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm">{entry.user}</td>
                  <td className="px-5 py-4 text-sm text-[#E7ECF1]/60">{entry.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Restock Modal */}
      {showRestockModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowRestockModal(false)}>
          <div className="w-[500px] bg-[#20252D] border border-[#2F353F] p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl mb-6">Restock Product</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-[#E7ECF1]/60 mb-2">Product</label>
                <select className="w-full px-4 py-2.5 bg-[#171B21] border border-[#2F353F] text-sm text-[#E7ECF1] focus:outline-none focus:border-[#5EC8FF]">
                  <option>Select product</option>
                  {lowStockItems.map(item => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-xs text-[#E7ECF1]/60 mb-2">Quantity to Add</label>
                <input 
                  type="number" 
                  className="w-full px-4 py-2.5 bg-[#171B21] border border-[#2F353F] text-sm text-[#E7ECF1] focus:outline-none focus:border-[#5EC8FF]"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-xs text-[#E7ECF1]/60 mb-2">Supplier</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2.5 bg-[#171B21] border border-[#2F353F] text-sm text-[#E7ECF1] focus:outline-none focus:border-[#5EC8FF]"
                  placeholder="Supplier name"
                />
              </div>

              <div>
                <label className="block text-xs text-[#E7ECF1]/60 mb-2">Note</label>
                <textarea 
                  rows={3}
                  className="w-full px-4 py-2.5 bg-[#171B21] border border-[#2F353F] text-sm text-[#E7ECF1] focus:outline-none focus:border-[#5EC8FF] resize-none"
                  placeholder="Add note..."
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => setShowRestockModal(false)}
                className="flex-1 px-4 py-2.5 border border-[#2F353F] text-sm hover:bg-[#2F353F] transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2.5 bg-[#5EC8FF] text-[#171B21] text-sm hover:bg-[#5EC8FF]/90 transition-colors">
                Confirm Restock
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
