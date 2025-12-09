import React from 'react';
import { ArrowLeft, Download, Package, MapPin, Phone, CheckCircle } from 'lucide-react';
import { orders, products } from '../data/mockData';

interface OrderDetailProps {
  orderId: string;
  onNavigate: (page: string, params?: any) => void;
}

export function OrderDetail({ orderId, onNavigate }: OrderDetailProps) {
  const order = orders.find(o => o.id === orderId);

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => onNavigate('orders')}
        className="flex items-center gap-2 text-[#E7ECF1]/60 hover:text-[#5EC8FF] transition-colors"
      >
        <ArrowLeft size={18} />
        Back to Orders
      </button>

      {/* Header */}
      <div className="bg-[#171B21] border border-[#3A4047] rounded p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="mb-2">Order {order.id}</h2>
            <div className="text-sm text-[#E7ECF1]/60">Placed on {order.date}</div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#2F353F] border border-[#3A4047] rounded text-sm hover:bg-[#3A4047] transition-colors">
            <Download size={16} />
            Download Invoice
          </button>
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-sm px-3 py-1 rounded ${
            order.status === 'Delivered'
              ? 'bg-green-500/10 text-green-400'
              : 'bg-blue-500/10 text-blue-400'
          }`}>
            {order.status}
          </span>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-[#171B21] border border-[#3A4047] rounded p-6">
        <h3 className="mb-6">Order Timeline</h3>
        <div className="space-y-4">
          {order.timeline.map((step, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                  step.completed
                    ? 'border-[#5EC8FF] bg-[#5EC8FF]/10'
                    : 'border-[#3A4047] bg-[#171B21]'
                }`}>
                  {step.completed ? (
                    <CheckCircle size={20} className="text-[#5EC8FF]" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-[#3A4047]" />
                  )}
                </div>
                {idx < order.timeline.length - 1 && (
                  <div className={`w-0.5 h-12 ${step.completed ? 'bg-[#5EC8FF]' : 'bg-[#3A4047]'}`} />
                )}
              </div>
              <div className="flex-1 pb-4">
                <div className="text-sm mb-1">{step.status}</div>
                <div className="text-xs text-[#E7ECF1]/60">
                  {step.date || 'Pending'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Items */}
        <div className="col-span-2 bg-[#171B21] border border-[#3A4047] rounded">
          <div className="p-4 border-b border-[#3A4047]">
            <h3>Order Items</h3>
          </div>
          <div className="p-4 space-y-4">
            {order.items.map((item, idx) => {
              const product = products.find(p => p.id === item.productId);
              return (
                <div key={idx} className="flex items-center gap-4 p-4 bg-[#2F353F] border border-[#3A4047] rounded">
                  <div className="w-20 h-20 bg-[#171B21] rounded overflow-hidden flex-shrink-0">
                    <img
                      src={product?.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm mb-1">{item.name}</div>
                    <div className="text-xs text-[#E7ECF1]/60">Quantity: {item.quantity}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm mb-1">₱{item.price.toLocaleString()}</div>
                    <div className="text-xs text-[#E7ECF1]/60">₱{(item.price * item.quantity).toLocaleString()}</div>
                  </div>
                </div>
              );
            })}

            <div className="pt-4 border-t border-[#3A4047] space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#E7ECF1]/60">Subtotal</span>
                <span>₱{order.total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#E7ECF1]/60">Shipping</span>
                <span className="text-green-400">Free</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#3A4047]">
                <span>Total</span>
                <span className="text-lg text-[#5EC8FF]">₱{order.total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Info */}
        <div className="space-y-4">
          <div className="bg-[#171B21] border border-[#3A4047] rounded p-4">
            <h4 className="mb-4 flex items-center gap-2">
              <MapPin size={16} />
              Delivery Address
            </h4>
            <p className="text-sm text-[#E7ECF1]/80">{order.address}</p>
          </div>

          <div className="bg-[#171B21] border border-[#3A4047] rounded p-4">
            <h4 className="mb-4 flex items-center gap-2">
              <Phone size={16} />
              Need Help?
            </h4>
            <div className="space-y-2">
              <button className="w-full bg-[#5EC8FF]/10 text-[#5EC8FF] border border-[#5EC8FF]/30 rounded py-2 text-sm hover:bg-[#5EC8FF]/20 transition-colors">
                Contact Support
              </button>
              {order.status === 'Delivered' && (
                <>
                  <button className="w-full bg-[#2F353F] border border-[#3A4047] rounded py-2 text-sm hover:bg-[#3A4047] transition-colors">
                    Request Return
                  </button>
                  <button className="w-full bg-[#2F353F] border border-[#3A4047] rounded py-2 text-sm hover:bg-[#3A4047] transition-colors">
                    Reorder
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
