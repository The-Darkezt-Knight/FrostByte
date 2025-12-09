import { useState } from 'react';
import { Search, Filter, Eye, Download, Package } from 'lucide-react';

const orders = [
  { id: 'ORD-1847', customer: 'James Wilson', items: 3, total: '$1,249', payment: 'Credit Card', status: 'Processing', date: '2025-11-27 14:32' },
  { id: 'ORD-1846', customer: 'Sarah Chen', items: 1, total: '$699', payment: 'PayPal', status: 'Shipped', date: '2025-11-27 13:15' },
  { id: 'ORD-1845', customer: 'Michael Brown', items: 2, total: '$189', payment: 'Credit Card', status: 'Delivered', date: '2025-11-27 11:22' },
  { id: 'ORD-1844', customer: 'Emily Davis', items: 1, total: '$249', payment: 'Bank Transfer', status: 'Processing', date: '2025-11-27 09:45' },
  { id: 'ORD-1843', customer: 'Robert Taylor', items: 5, total: '$2,489', payment: 'Credit Card', status: 'Pending Payment', date: '2025-11-26 18:30' },
  { id: 'ORD-1842', customer: 'Linda Martinez', items: 2, total: '$799', payment: 'Credit Card', status: 'Shipped', date: '2025-11-26 16:20' },
  { id: 'ORD-1841', customer: 'David Anderson', items: 4, total: '$1,567', payment: 'PayPal', status: 'Delivered', date: '2025-11-26 14:10' },
];

export function Orders() {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl tracking-tight">Orders & Transactions</h1>
          <p className="text-sm text-[#E7ECF1]/60 mt-1">Manage customer orders and payment processing</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 border border-[#2F353F] text-sm hover:bg-[#2F353F] transition-colors">
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-4">
        <div className="bg-[#20252D] border border-[#2F353F] p-5">
          <div className="text-xs text-[#E7ECF1]/60">Total Orders</div>
          <div className="text-2xl mt-2">1,847</div>
        </div>
        <div className="bg-[#20252D] border border-[#2F353F] p-5">
          <div className="text-xs text-[#E7ECF1]/60">Pending Payment</div>
          <div className="text-2xl mt-2">23</div>
        </div>
        <div className="bg-[#20252D] border border-[#2F353F] p-5">
          <div className="text-xs text-[#E7ECF1]/60">Processing</div>
          <div className="text-2xl mt-2">67</div>
        </div>
        <div className="bg-[#20252D] border border-[#2F353F] p-5">
          <div className="text-xs text-[#E7ECF1]/60">Shipped</div>
          <div className="text-2xl mt-2">142</div>
        </div>
        <div className="bg-[#20252D] border border-[#2F353F] p-5">
          <div className="text-xs text-[#E7ECF1]/60">Delivered</div>
          <div className="text-2xl mt-2">1,615</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-[#20252D] border border-[#2F353F] p-5">
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#E7ECF1]/40" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#171B21] border border-[#2F353F] text-sm text-[#E7ECF1] placeholder:text-[#E7ECF1]/40 focus:outline-none focus:border-[#5EC8FF]"
              />
            </div>
          </div>
          <select className="px-4 py-2.5 bg-[#171B21] border border-[#2F353F] text-sm text-[#E7ECF1] focus:outline-none focus:border-[#5EC8FF]">
            <option value="all">All Status</option>
            <option value="pending">Pending Payment</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
          <select className="px-4 py-2.5 bg-[#171B21] border border-[#2F353F] text-sm text-[#E7ECF1] focus:outline-none focus:border-[#5EC8FF]">
            <option value="all">All Payments</option>
            <option value="card">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="bank">Bank Transfer</option>
          </select>
          <select className="px-4 py-2.5 bg-[#171B21] border border-[#2F353F] text-sm text-[#E7ECF1] focus:outline-none focus:border-[#5EC8FF]">
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="value-high">Highest Value</option>
            <option value="value-low">Lowest Value</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-[#20252D] border border-[#2F353F]">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#2F353F]">
              <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">Order ID</th>
              <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">Customer</th>
              <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">Items</th>
              <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">Total</th>
              <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">Payment</th>
              <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">Status</th>
              <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">Date</th>
              <th className="text-right px-5 py-4 text-xs text-[#E7ECF1]/60">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr 
                key={order.id} 
                className="border-b border-[#2F353F]/50 hover:bg-[#2F353F]/30 cursor-pointer"
                onClick={() => setSelectedOrder(order.id)}
              >
                <td className="px-5 py-4 text-sm">{order.id}</td>
                <td className="px-5 py-4 text-sm">{order.customer}</td>
                <td className="px-5 py-4 text-sm">{order.items}</td>
                <td className="px-5 py-4 text-sm">{order.total}</td>
                <td className="px-5 py-4 text-sm">{order.payment}</td>
                <td className="px-5 py-4">
                  <span className={`inline-block px-2 py-1 text-xs ${
                    order.status === 'Pending Payment' ? 'bg-yellow-500/10 text-yellow-400' :
                    order.status === 'Processing' ? 'bg-[#5EC8FF]/10 text-[#5EC8FF]' :
                    order.status === 'Shipped' ? 'bg-blue-500/10 text-blue-400' :
                    'bg-green-500/10 text-green-400'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-sm text-[#E7ECF1]/60">{order.date}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1.5 hover:bg-[#2F353F] transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 hover:bg-[#2F353F] transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Detail Panel */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-end z-50" onClick={() => setSelectedOrder(null)}>
          <div className="w-[600px] h-full bg-[#20252D] border-l border-[#2F353F] p-6 overflow-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl">Order Details</h2>
              <button onClick={() => setSelectedOrder(null)} className="text-[#E7ECF1]/60 hover:text-[#E7ECF1]">
                ✕
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Order Info */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-[#E7ECF1]/60">Order ID</div>
                  <div className="text-sm">ORD-1847</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-[#E7ECF1]/60">Date</div>
                  <div className="text-sm">2025-11-27 14:32</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-[#E7ECF1]/60">Status</div>
                  <span className="inline-block px-2 py-1 text-xs bg-[#5EC8FF]/10 text-[#5EC8FF]">
                    Processing
                  </span>
                </div>
              </div>

              {/* Customer Info */}
              <div className="border-t border-[#2F353F] pt-6">
                <div className="text-xs text-[#E7ECF1]/60 mb-4">Customer Information</div>
                <div className="space-y-3">
                  <div>
                    <div className="text-xs text-[#E7ECF1]/60">Name</div>
                    <div className="text-sm mt-1">James Wilson</div>
                  </div>
                  <div>
                    <div className="text-xs text-[#E7ECF1]/60">Email</div>
                    <div className="text-sm mt-1">james.wilson@email.com</div>
                  </div>
                  <div>
                    <div className="text-xs text-[#E7ECF1]/60">Shipping Address</div>
                    <div className="text-sm mt-1">
                      123 Tech Street, Suite 400<br />
                      San Francisco, CA 94102
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="border-t border-[#2F353F] pt-6">
                <div className="text-xs text-[#E7ECF1]/60 mb-4">Order Items</div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-[#171B21] border border-[#2F353F]">
                    <div className="w-12 h-12 bg-[#2F353F] flex items-center justify-center">
                      <Package className="w-6 h-6 text-[#5EC8FF]" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm">NVIDIA RTX 4080</div>
                      <div className="text-xs text-[#E7ECF1]/50">Qty: 1</div>
                    </div>
                    <div className="text-sm">$1,199</div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#171B21] border border-[#2F353F]">
                    <div className="w-12 h-12 bg-[#2F353F] flex items-center justify-center">
                      <Package className="w-6 h-6 text-[#5EC8FF]" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm">Installation Service</div>
                      <div className="text-xs text-[#E7ECF1]/50">Qty: 1</div>
                    </div>
                    <div className="text-sm">$50</div>
                  </div>
                </div>
              </div>

              {/* Payment Summary */}
              <div className="border-t border-[#2F353F] pt-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#E7ECF1]/60">Subtotal</span>
                    <span>$1,249</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#E7ECF1]/60">Shipping</span>
                    <span>$15</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#E7ECF1]/60">Tax</span>
                    <span>$101</span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-[#2F353F]">
                    <span>Total</span>
                    <span className="text-lg">$1,365</span>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="border-t border-[#2F353F] pt-6">
                <div className="text-xs text-[#E7ECF1]/60 mb-4">Order Timeline</div>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-400 mt-1.5"></div>
                    <div>
                      <div className="text-sm">Order Placed</div>
                      <div className="text-xs text-[#E7ECF1]/50">Nov 27, 2025 14:32</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-400 mt-1.5"></div>
                    <div>
                      <div className="text-sm">Payment Confirmed</div>
                      <div className="text-xs text-[#E7ECF1]/50">Nov 27, 2025 14:35</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#5EC8FF] mt-1.5"></div>
                    <div>
                      <div className="text-sm">Processing</div>
                      <div className="text-xs text-[#E7ECF1]/50">In progress</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-[#2F353F]">
                <button className="flex-1 px-4 py-2.5 bg-[#5EC8FF] text-[#171B21] text-sm hover:bg-[#5EC8FF]/90 transition-colors">
                  Update Status
                </button>
                <button className="px-4 py-2.5 border border-[#2F353F] text-sm hover:bg-[#2F353F] transition-colors">
                  Print Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
