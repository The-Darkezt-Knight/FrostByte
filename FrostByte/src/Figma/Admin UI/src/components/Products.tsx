import { useState } from 'react';
import { Search, Filter, Plus, Upload, Edit, Trash2, Eye, MoreVertical } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const products = [
  { id: 'PRD-1001', name: 'NVIDIA RTX 4090 Gaming GPU', category: 'Graphics Card', brand: 'NVIDIA', stock: 45, price: '$1,599', status: 'In Stock', image: 'gpu' },
  { id: 'PRD-1002', name: 'AMD Ryzen 9 7950X Processor', category: 'CPU', brand: 'AMD', stock: 82, price: '$699', status: 'In Stock', image: 'cpu' },
  { id: 'PRD-1003', name: 'Corsair Dominator DDR5 64GB', category: 'Memory', brand: 'Corsair', stock: 5, price: '$389', status: 'Low Stock', image: 'ram' },
  { id: 'PRD-1004', name: 'Samsung 990 PRO 2TB NVMe', category: 'Storage', brand: 'Samsung', stock: 128, price: '$249', status: 'In Stock', image: 'ssd' },
  { id: 'PRD-1005', name: 'ASUS ROG Strix X670E Motherboard', category: 'Motherboard', brand: 'ASUS', stock: 0, price: '$699', status: 'Out of Stock', image: 'motherboard' },
  { id: 'PRD-1006', name: 'Corsair RM1000x PSU 1000W', category: 'Power Supply', brand: 'Corsair', stock: 34, price: '$199', status: 'In Stock', image: 'psu' },
  { id: 'PRD-1007', name: 'NZXT Kraken Z73 AIO Cooler', category: 'Cooling', brand: 'NZXT', stock: 18, price: '$299', status: 'In Stock', image: 'cooler' },
  { id: 'PRD-1008', name: 'Lian Li O11 Dynamic Case', category: 'Case', brand: 'Lian Li', stock: 12, price: '$149', status: 'In Stock', image: 'case' },
];

export function Products() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl tracking-tight">Product Management</h1>
          <p className="text-sm text-[#E7ECF1]/60 mt-1">Manage inventory and product catalog</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#5EC8FF] text-[#171B21] text-sm hover:bg-[#5EC8FF]/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 border border-[#2F353F] text-sm hover:bg-[#2F353F] transition-colors">
            <Upload className="w-4 h-4" />
            Bulk Upload
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-[#20252D] border border-[#2F353F] p-5">
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#E7ECF1]/40" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#171B21] border border-[#2F353F] text-sm text-[#E7ECF1] placeholder:text-[#E7ECF1]/40 focus:outline-none focus:border-[#5EC8FF]"
              />
            </div>
          </div>
          <div>
            <select 
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#171B21] border border-[#2F353F] text-sm text-[#E7ECF1] focus:outline-none focus:border-[#5EC8FF]"
            >
              <option value="all">All Categories</option>
              <option value="gpu">Graphics Card</option>
              <option value="cpu">CPU</option>
              <option value="memory">Memory</option>
              <option value="storage">Storage</option>
              <option value="motherboard">Motherboard</option>
            </select>
          </div>
          <div>
            <select className="w-full px-4 py-2.5 bg-[#171B21] border border-[#2F353F] text-sm text-[#E7ECF1] focus:outline-none focus:border-[#5EC8FF]">
              <option value="all">All Stock Levels</option>
              <option value="in-stock">In Stock</option>
              <option value="low">Low Stock</option>
              <option value="out">Out of Stock</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-[#20252D] border border-[#2F353F]">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2F353F]">
                <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">Product</th>
                <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">Category</th>
                <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">Brand</th>
                <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">Stock</th>
                <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">Price</th>
                <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">Status</th>
                <th className="text-right px-5 py-4 text-xs text-[#E7ECF1]/60">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr 
                  key={product.id} 
                  className="border-b border-[#2F353F]/50 hover:bg-[#2F353F]/30 cursor-pointer"
                  onClick={() => setSelectedProduct(product.id)}
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#2F353F] flex items-center justify-center">
                        <ImageWithFallback 
                          src={`https://placehold.co/48x48/2F353F/5EC8FF?text=${product.image}`}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-sm">{product.name}</div>
                        <div className="text-xs text-[#E7ECF1]/50">{product.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm">{product.category}</td>
                  <td className="px-5 py-4 text-sm">{product.brand}</td>
                  <td className="px-5 py-4">
                    <div className="text-sm">{product.stock}</div>
                  </td>
                  <td className="px-5 py-4 text-sm">{product.price}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-block px-2 py-1 text-xs ${
                      product.status === 'In Stock' ? 'bg-green-500/10 text-green-400' :
                      product.status === 'Low Stock' ? 'bg-yellow-500/10 text-yellow-400' :
                      'bg-red-500/10 text-red-400'
                    }`}>
                      {product.status}
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

      {/* Product Detail Slide-over */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-end z-50" onClick={() => setSelectedProduct(null)}>
          <div className="w-[500px] h-full bg-[#20252D] border-l border-[#2F353F] p-6 overflow-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl">Product Details</h2>
              <button onClick={() => setSelectedProduct(null)} className="text-[#E7ECF1]/60 hover:text-[#E7ECF1]">
                ✕
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Product Image */}
              <div className="w-full h-64 bg-[#2F353F] flex items-center justify-center">
                <ImageWithFallback 
                  src="https://placehold.co/400x256/2F353F/5EC8FF?text=Product"
                  alt="Product"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Details */}
              <div className="space-y-4">
                <div>
                  <div className="text-xs text-[#E7ECF1]/60 mb-1">Product Name</div>
                  <div className="text-sm">NVIDIA RTX 4090 Gaming GPU</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-[#E7ECF1]/60 mb-1">Category</div>
                    <div className="text-sm">Graphics Card</div>
                  </div>
                  <div>
                    <div className="text-xs text-[#E7ECF1]/60 mb-1">Brand</div>
                    <div className="text-sm">NVIDIA</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-[#E7ECF1]/60 mb-1">Stock</div>
                    <div className="text-sm">45 units</div>
                  </div>
                  <div>
                    <div className="text-xs text-[#E7ECF1]/60 mb-1">Price</div>
                    <div className="text-sm">$1,599</div>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[#E7ECF1]/60 mb-1">Description</div>
                  <div className="text-sm text-[#E7ECF1]/80">
                    High-performance graphics card with 24GB GDDR6X memory, perfect for gaming and professional workloads.
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-[#2F353F]">
                <button className="flex-1 px-4 py-2.5 bg-[#5EC8FF] text-[#171B21] text-sm hover:bg-[#5EC8FF]/90 transition-colors">
                  Edit Product
                </button>
                <button className="px-4 py-2.5 border border-[#2F353F] text-sm hover:bg-[#2F353F] transition-colors text-red-400">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowAddModal(false)}>
          <div className="w-[600px] bg-[#20252D] border border-[#2F353F] p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl mb-6">Add New Product</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-[#E7ECF1]/60 mb-2">Product Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2.5 bg-[#171B21] border border-[#2F353F] text-sm text-[#E7ECF1] focus:outline-none focus:border-[#5EC8FF]"
                  placeholder="Enter product name"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#E7ECF1]/60 mb-2">Category</label>
                  <select className="w-full px-4 py-2.5 bg-[#171B21] border border-[#2F353F] text-sm text-[#E7ECF1] focus:outline-none focus:border-[#5EC8FF]">
                    <option>Graphics Card</option>
                    <option>CPU</option>
                    <option>Memory</option>
                    <option>Storage</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-[#E7ECF1]/60 mb-2">Brand</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2.5 bg-[#171B21] border border-[#2F353F] text-sm text-[#E7ECF1] focus:outline-none focus:border-[#5EC8FF]"
                    placeholder="Brand name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#E7ECF1]/60 mb-2">Price</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2.5 bg-[#171B21] border border-[#2F353F] text-sm text-[#E7ECF1] focus:outline-none focus:border-[#5EC8FF]"
                    placeholder="$0.00"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#E7ECF1]/60 mb-2">Stock Quantity</label>
                  <input 
                    type="number" 
                    className="w-full px-4 py-2.5 bg-[#171B21] border border-[#2F353F] text-sm text-[#E7ECF1] focus:outline-none focus:border-[#5EC8FF]"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#E7ECF1]/60 mb-2">Description</label>
                <textarea 
                  rows={4}
                  className="w-full px-4 py-2.5 bg-[#171B21] border border-[#2F353F] text-sm text-[#E7ECF1] focus:outline-none focus:border-[#5EC8FF] resize-none"
                  placeholder="Product description..."
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2.5 border border-[#2F353F] text-sm hover:bg-[#2F353F] transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2.5 bg-[#5EC8FF] text-[#171B21] text-sm hover:bg-[#5EC8FF]/90 transition-colors">
                Add Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
