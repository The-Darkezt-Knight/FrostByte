import React from 'react';
import { Package, Wrench, DollarSign, TrendingUp, Clock, CheckCircle, ChevronRight } from 'lucide-react';
import { orders, services, buybackRequests, products, notifications } from '../data/mockData';

interface DashboardProps {
  onNavigate: (page: string, params?: any) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const recentOrders = orders.slice(0, 2);
  const activeService = services.find(s => s.status === 'In Progress');
  const activeBuyback = buybackRequests.find(b => b.status === 'Offer Received');
  const recommendedProducts = products.slice(0, 4);
  const recentNotifications = notifications.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-[#171B21] border border-[#3A4047] rounded p-6">
        <h1 className="mb-2">Welcome back, Alex</h1>
        <p className="text-[#E7ECF1]/60">Here's what's happening with your orders and services</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-[#171B21] border border-[#3A4047] rounded p-4">
          <div className="flex items-center justify-between mb-3">
            <Package size={20} className="text-[#5EC8FF]" />
            <TrendingUp size={16} className="text-green-400" />
          </div>
          <div className="text-2xl mb-1">3</div>
          <div className="text-sm text-[#E7ECF1]/60">Active Orders</div>
        </div>

        <div className="bg-[#171B21] border border-[#3A4047] rounded p-4">
          <div className="flex items-center justify-between mb-3">
            <Wrench size={20} className="text-[#5EC8FF]" />
            <Clock size={16} className="text-yellow-400" />
          </div>
          <div className="text-2xl mb-1">1</div>
          <div className="text-sm text-[#E7ECF1]/60">Pending Service</div>
        </div>

        <div className="bg-[#171B21] border border-[#3A4047] rounded p-4">
          <div className="flex items-center justify-between mb-3">
            <DollarSign size={20} className="text-[#5EC8FF]" />
            <CheckCircle size={16} className="text-green-400" />
          </div>
          <div className="text-2xl mb-1">1</div>
          <div className="text-sm text-[#E7ECF1]/60">Buyback Offer</div>
        </div>

        <div className="bg-[#171B21] border border-[#3A4047] rounded p-4">
          <div className="flex items-center justify-between mb-3">
            <Package size={20} className="text-[#5EC8FF]" />
            <TrendingUp size={16} className="text-green-400" />
          </div>
          <div className="text-2xl mb-1">12</div>
          <div className="text-sm text-[#E7ECF1]/60">Total Orders</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="col-span-2 space-y-4">
          <div className="bg-[#171B21] border border-[#3A4047] rounded">
            <div className="p-4 border-b border-[#3A4047] flex items-center justify-between">
              <h3>Recent Orders</h3>
              <button
                onClick={() => onNavigate('orders')}
                className="text-sm text-[#5EC8FF] hover:text-[#5EC8FF]/80 flex items-center gap-1"
              >
                View All <ChevronRight size={16} />
              </button>
            </div>
            <div className="p-4 space-y-3">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-[#2F353F] border border-[#3A4047] rounded p-4 hover:border-[#5EC8FF]/30 transition-colors cursor-pointer"
                  onClick={() => onNavigate('order-detail', { orderId: order.id })}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-sm mb-1">{order.id}</div>
                      <div className="text-xs text-[#E7ECF1]/60">{order.date}</div>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        order.status === 'Delivered'
                          ? 'bg-green-500/10 text-green-400'
                          : 'bg-[#5EC8FF]/10 text-[#5EC8FF]'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-[#E7ECF1]/70">
                      {order.items.length} item{order.items.length > 1 ? 's' : ''}
                    </div>
                    <div className="text-sm">₱{order.total.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Service Status */}
          {activeService && (
            <div className="bg-[#171B21] border border-[#3A4047] rounded">
              <div className="p-4 border-b border-[#3A4047]">
                <h3>Active Service Request</h3>
              </div>
              <div className="p-4">
                <div className="bg-[#2F353F] border border-[#3A4047] rounded p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-sm mb-1">{activeService.type}</div>
                      <div className="text-xs text-[#E7ECF1]/60">{activeService.id}</div>
                    </div>
                    <span className="text-xs px-2 py-1 rounded bg-yellow-500/10 text-yellow-400">
                      {activeService.status}
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs text-[#E7ECF1]/60 mb-2">
                      <span>Progress</span>
                      <span>{activeService.progress}%</span>
                    </div>
                    <div className="h-2 bg-[#171B21] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#5EC8FF] rounded-full transition-all"
                        style={{ width: `${activeService.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-[#E7ECF1]/60">Scheduled</span>
                      <span>{activeService.scheduledDate} • {activeService.scheduledTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#E7ECF1]/60">Technician</span>
                      <span>{activeService.technician.name}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigate('services')}
                    className="w-full mt-4 bg-[#5EC8FF]/10 text-[#5EC8FF] border border-[#5EC8FF]/30 rounded py-2 text-sm hover:bg-[#5EC8FF]/20 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Buyback Status */}
          {activeBuyback && (
            <div className="bg-[#171B21] border border-[#3A4047] rounded">
              <div className="p-4 border-b border-[#3A4047]">
                <h3>Buyback Appraisal</h3>
              </div>
              <div className="p-4">
                <div className="bg-[#2F353F] border border-[#3A4047] rounded p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-sm mb-1">{activeBuyback.productName}</div>
                      <div className="text-xs text-[#E7ECF1]/60">{activeBuyback.id}</div>
                    </div>
                    <span className="text-xs px-2 py-1 rounded bg-green-500/10 text-green-400">
                      {activeBuyback.status}
                    </span>
                  </div>
                  
                  <div className="bg-[#171B21] border border-[#5EC8FF]/30 rounded p-3 mb-3">
                    <div className="text-xs text-[#E7ECF1]/60 mb-1">Our Offer</div>
                    <div className="text-xl text-[#5EC8FF]">₱{activeBuyback.offer?.toLocaleString()}</div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => onNavigate('buyback')}
                      className="flex-1 bg-[#5EC8FF] text-[#0E1114] rounded py-2 text-sm hover:bg-[#5EC8FF]/90 transition-colors"
                    >
                      Accept Offer
                    </button>
                    <button className="flex-1 bg-[#2F353F] border border-[#3A4047] rounded py-2 text-sm hover:bg-[#3A4047] transition-colors">
                      Decline
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Notifications */}
          <div className="bg-[#171B21] border border-[#3A4047] rounded">
            <div className="p-4 border-b border-[#3A4047] flex items-center justify-between">
              <h4>Recent Notifications</h4>
              <button
                onClick={() => onNavigate('notifications')}
                className="text-xs text-[#5EC8FF] hover:text-[#5EC8FF]/80"
              >
                View All
              </button>
            </div>
            <div className="divide-y divide-[#3A4047]">
              {recentNotifications.map((notif) => (
                <div key={notif.id} className="p-3 hover:bg-[#2F353F]/50 transition-colors cursor-pointer">
                  <div className="flex items-start gap-2">
                    {!notif.read && (
                      <div className="w-2 h-2 bg-[#5EC8FF] rounded-full mt-1.5 flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="text-xs mb-1">{notif.title}</div>
                      <div className="text-xs text-[#E7ECF1]/60 line-clamp-2">{notif.message}</div>
                      <div className="text-xs text-[#E7ECF1]/40 mt-1">{notif.timestamp}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Products */}
          <div className="bg-[#171B21] border border-[#3A4047] rounded">
            <div className="p-4 border-b border-[#3A4047]">
              <h4>Recommended for You</h4>
            </div>
            <div className="p-4 space-y-3">
              {recommendedProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-3 p-2 rounded hover:bg-[#2F353F] transition-colors cursor-pointer"
                  onClick={() => onNavigate('product-detail', { productId: product.id })}
                >
                  <div className="w-12 h-12 bg-[#2F353F] rounded flex-shrink-0 overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs mb-1 truncate">{product.name}</div>
                    <div className="text-xs text-[#5EC8FF]">₱{product.price.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
