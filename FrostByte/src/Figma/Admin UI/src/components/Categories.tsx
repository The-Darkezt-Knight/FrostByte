import { useState } from 'react';
import { Plus, Edit, Trash2, Package } from 'lucide-react';

const categories = [
  { id: 'CAT-01', name: 'Graphics Cards', productCount: 124, icon: '🎮' },
  { id: 'CAT-02', name: 'Processors', productCount: 89, icon: '⚡' },
  { id: 'CAT-03', name: 'Memory (RAM)', productCount: 156, icon: '💾' },
  { id: 'CAT-04', name: 'Storage', productCount: 203, icon: '💿' },
  { id: 'CAT-05', name: 'Motherboards', productCount: 78, icon: '🔲' },
  { id: 'CAT-06', name: 'Power Supplies', productCount: 92, icon: '🔋' },
  { id: 'CAT-07', name: 'Cooling Systems', productCount: 145, icon: '❄️' },
  { id: 'CAT-08', name: 'PC Cases', productCount: 67, icon: '📦' },
];

const brands = [
  { id: 'BRD-01', name: 'NVIDIA', category: 'Graphics Cards', productCount: 45 },
  { id: 'BRD-02', name: 'AMD', category: 'Multiple', productCount: 78 },
  { id: 'BRD-03', name: 'Intel', category: 'Processors', productCount: 52 },
  { id: 'BRD-04', name: 'ASUS', category: 'Multiple', productCount: 134 },
  { id: 'BRD-05', name: 'Corsair', category: 'Multiple', productCount: 89 },
  { id: 'BRD-06', name: 'Samsung', category: 'Storage', productCount: 67 },
  { id: 'BRD-07', name: 'MSI', category: 'Multiple', productCount: 98 },
  { id: 'BRD-08', name: 'Gigabyte', category: 'Multiple', productCount: 76 },
];

export function Categories() {
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showBrandModal, setShowBrandModal] = useState(false);

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl tracking-tight">Categories & Brands</h1>
        <p className="text-sm text-[#E7ECF1]/60 mt-1">Manage product categories and brand partnerships</p>
      </div>

      {/* Categories Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg">Product Categories</h2>
          <button 
            onClick={() => setShowCategoryModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#5EC8FF] text-[#171B21] text-sm hover:bg-[#5EC8FF]/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Category
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {categories.map((category) => (
            <div key={category.id} className="bg-[#20252D] border border-[#2F353F] p-5 hover:border-[#5EC8FF]/50 transition-colors group">
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 bg-[#2F353F] flex items-center justify-center text-2xl">
                  <Package className="w-6 h-6 text-[#5EC8FF]" />
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 hover:bg-[#2F353F] transition-colors">
                    <Edit className="w-3 h-3" />
                  </button>
                  <button className="p-1.5 hover:bg-[#2F353F] transition-colors text-red-400">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
              <div className="text-sm mb-1">{category.name}</div>
              <div className="text-xs text-[#E7ECF1]/50">{category.productCount} products</div>
            </div>
          ))}
        </div>
      </div>

      {/* Brands Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg">Brand Management</h2>
          <button 
            onClick={() => setShowBrandModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#5EC8FF] text-[#171B21] text-sm hover:bg-[#5EC8FF]/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Brand
          </button>
        </div>

        <div className="bg-[#20252D] border border-[#2F353F]">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2F353F]">
                <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">Brand Name</th>
                <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">Primary Category</th>
                <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">Product Count</th>
                <th className="text-right px-5 py-4 text-xs text-[#E7ECF1]/60">Actions</th>
              </tr>
            </thead>
            <tbody>
              {brands.map((brand) => (
                <tr key={brand.id} className="border-b border-[#2F353F]/50 hover:bg-[#2F353F]/30">
                  <td className="px-5 py-4 text-sm">{brand.name}</td>
                  <td className="px-5 py-4 text-sm">{brand.category}</td>
                  <td className="px-5 py-4 text-sm">{brand.productCount}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 hover:bg-[#2F353F] transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 hover:bg-[#2F353F] transition-colors text-red-400">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowCategoryModal(false)}>
          <div className="w-[500px] bg-[#20252D] border border-[#2F353F] p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl mb-6">Add New Category</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-[#E7ECF1]/60 mb-2">Category Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2.5 bg-[#171B21] border border-[#2F353F] text-sm text-[#E7ECF1] focus:outline-none focus:border-[#5EC8FF]"
                  placeholder="Enter category name"
                />
              </div>
              
              <div>
                <label className="block text-xs text-[#E7ECF1]/60 mb-2">Description</label>
                <textarea 
                  rows={3}
                  className="w-full px-4 py-2.5 bg-[#171B21] border border-[#2F353F] text-sm text-[#E7ECF1] focus:outline-none focus:border-[#5EC8FF] resize-none"
                  placeholder="Category description..."
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => setShowCategoryModal(false)}
                className="flex-1 px-4 py-2.5 border border-[#2F353F] text-sm hover:bg-[#2F353F] transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2.5 bg-[#5EC8FF] text-[#171B21] text-sm hover:bg-[#5EC8FF]/90 transition-colors">
                Add Category
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Brand Modal */}
      {showBrandModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowBrandModal(false)}>
          <div className="w-[500px] bg-[#20252D] border border-[#2F353F] p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl mb-6">Add New Brand</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-[#E7ECF1]/60 mb-2">Brand Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2.5 bg-[#171B21] border border-[#2F353F] text-sm text-[#E7ECF1] focus:outline-none focus:border-[#5EC8FF]"
                  placeholder="Enter brand name"
                />
              </div>
              
              <div>
                <label className="block text-xs text-[#E7ECF1]/60 mb-2">Primary Category</label>
                <select className="w-full px-4 py-2.5 bg-[#171B21] border border-[#2F353F] text-sm text-[#E7ECF1] focus:outline-none focus:border-[#5EC8FF]">
                  <option>Select category</option>
                  <option>Graphics Cards</option>
                  <option>Processors</option>
                  <option>Multiple</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-[#E7ECF1]/60 mb-2">Website</label>
                <input 
                  type="url" 
                  className="w-full px-4 py-2.5 bg-[#171B21] border border-[#2F353F] text-sm text-[#E7ECF1] focus:outline-none focus:border-[#5EC8FF]"
                  placeholder="https://"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => setShowBrandModal(false)}
                className="flex-1 px-4 py-2.5 border border-[#2F353F] text-sm hover:bg-[#2F353F] transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2.5 bg-[#5EC8FF] text-[#171B21] text-sm hover:bg-[#5EC8FF]/90 transition-colors">
                Add Brand
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
