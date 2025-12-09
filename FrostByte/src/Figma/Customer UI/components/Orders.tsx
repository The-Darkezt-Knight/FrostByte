import React, { useState } from 'react';
import { Package, Search, Download, ChevronRight } from 'lucide-react';
import { orders, products } from '../data/mockData';

interface OrdersProps {
  onNavigate: (page: string, params?: any) => void;
}

export function Orders({ onNavigate }: OrdersProps) {
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const statuses = ['All', 'Pending', 'To Ship', 'Out for Delivery', 'Delivered', 'Cancelled'];

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = filterStatus === 'All' || order.status === filterStatus;
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-500/10 text-green-400';
      case 'Out for Delivery':
        return 'bg-blue-500/10 text-blue-400';
      case 'Cancelled':
        return 'bg-red-500/10 text-red-400';
      default:
        return 'bg-yellow-500/10 text-yellow-400';
    }
  };

  return (
    <div className="space-y-6">
      <h1>My Orders</h1>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#E7ECF1]/40" size={18} />
          <input
            type="text"
            placeholder="Search by order ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#171B21] border border-[#3A4047] rounded pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#5EC8FF]"
          />
        </div>
        <div className="flex gap-2">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2.5 rounded text-sm transition-all ${
                filterStatus === status
                  ? 'bg-[#5EC8FF] text-[#0E1114]'
                  : 'bg-[#171B21] border border-[#3A4047] hover:border-[#5EC8FF]'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="bg-[#171B21] border border-[#3A4047] rounded hover:border-[#5EC8FF]/30 transition-all cursor-pointer"
            onClick={() => onNavigate('order-detail', { orderId: order.id })}
          >
            <div className="p-4 border-b border-[#3A4047]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div>
                    <div className="text-sm mb-1">{order.id}</div>
                    <div className="text-xs text-[#E7ECF1]/60">Placed on {order.date}</div>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-xs text-[#E7ECF1]/60 mb-1">Total</div>
                    <div className="text-sm">₱{order.total.toLocaleString()}</div>
                  </div>
                  <ChevronRight size={20} className="text-[#E7ECF1]/40" />
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="space-y-3">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#2F353F] rounded overflow-hidden">
                        <img
                          src={products.find(p => p.id === item.productId)?.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-sm">{item.name}</div>
                        <div className="text-xs text-[#E7ECF1]/60">Qty: {item.quantity}</div>
                      </div>
                    </div>
                    <div className="text-sm">₱{item.price.toLocaleString()}</div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 mt-4 pt-4 border-t border-[#3A4047]">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate('order-detail', { orderId: order.id });
                  }}
                  className="flex-1 bg-[#5EC8FF] text-[#0E1114] rounded py-2 text-sm hover:bg-[#5EC8FF]/90 transition-colors"
                >
                  View Details
                </button>
                {order.status === 'Delivered' && (
                  <button className="px-4 py-2 bg-[#2F353F] border border-[#3A4047] rounded text-sm hover:bg-[#3A4047] transition-colors">
                    Reorder
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="bg-[#171B21] border border-[#3A4047] rounded p-12 text-center">
          <Package size={48} className="mx-auto mb-4 text-[#E7ECF1]/20" />
          <h3 className="mb-2">No orders found</h3>
          <p className="text-[#E7ECF1]/60">Try adjusting your filters or search query</p>
        </div>
      )}
    </div>
  );
}
