import { Truck, MapPin, Clock, Package } from 'lucide-react';

const deliveries = [
  { id: 'DEL-2847', order: 'ORD-1847', customer: 'James Wilson', address: '123 Tech St, SF', driver: 'Driver-A', status: 'In Transit', eta: '2:30 PM' },
  { id: 'DEL-2846', order: 'ORD-1845', customer: 'Michael Brown', address: '456 Main Ave, LA', driver: 'Driver-B', status: 'Delivered', eta: 'Completed' },
  { id: 'DEL-2845', order: 'ORD-1842', customer: 'Linda Martinez', address: '789 Oak Rd, SD', driver: 'Driver-C', status: 'Out for Delivery', eta: '4:15 PM' },
  { id: 'DEL-2844', order: 'ORD-1840', customer: 'David Anderson', address: '321 Pine St, SF', driver: 'Unassigned', status: 'Pending', eta: 'TBD' },
];

const drivers = [
  { id: 'DRV-01', name: 'John Martinez', vehicle: 'Van #1', activeDeliveries: 3, status: 'On Route' },
  { id: 'DRV-02', name: 'Lisa Chen', vehicle: 'Van #2', activeDeliveries: 2, status: 'On Route' },
  { id: 'DRV-03', name: 'Tom Brown', vehicle: 'Van #3', activeDeliveries: 1, status: 'Available' },
  { id: 'DRV-04', name: 'Maria Garcia', vehicle: 'Van #4', activeDeliveries: 0, status: 'Available' },
];

export function Logistics() {
  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl tracking-tight">Logistics & Delivery</h1>
        <p className="text-sm text-[#E7ECF1]/60 mt-1">Manage deliveries, pickups, and driver assignments</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-4">
        <div className="bg-[#20252D] border border-[#2F353F] p-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs text-[#E7ECF1]/60">Pending Delivery</div>
              <div className="text-2xl mt-2">34</div>
            </div>
            <Clock className="w-5 h-5 text-yellow-400" />
          </div>
        </div>
        <div className="bg-[#20252D] border border-[#2F353F] p-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs text-[#E7ECF1]/60">In Transit</div>
              <div className="text-2xl mt-2">28</div>
            </div>
            <Truck className="w-5 h-5 text-[#5EC8FF]" />
          </div>
        </div>
        <div className="bg-[#20252D] border border-[#2F353F] p-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs text-[#E7ECF1]/60">Out for Delivery</div>
              <div className="text-2xl mt-2">45</div>
            </div>
            <Package className="w-5 h-5 text-blue-400" />
          </div>
        </div>
        <div className="bg-[#20252D] border border-[#2F353F] p-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs text-[#E7ECF1]/60">Delivered Today</div>
              <div className="text-2xl mt-2">142</div>
            </div>
            <MapPin className="w-5 h-5 text-green-400" />
          </div>
        </div>
        <div className="bg-[#20252D] border border-[#2F353F] p-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs text-[#E7ECF1]/60">Active Drivers</div>
              <div className="text-2xl mt-2">8</div>
            </div>
            <Truck className="w-5 h-5 text-[#5EC8FF]" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-[#20252D] border border-[#2F353F] p-5">
        <div className="grid grid-cols-4 gap-4">
          <select className="px-4 py-2.5 bg-[#171B21] border border-[#2F353F] text-sm text-[#E7ECF1] focus:outline-none focus:border-[#5EC8FF]">
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="transit">In Transit</option>
            <option value="delivering">Out for Delivery</option>
            <option value="delivered">Delivered</option>
          </select>
          <select className="px-4 py-2.5 bg-[#171B21] border border-[#2F353F] text-sm text-[#E7ECF1] focus:outline-none focus:border-[#5EC8FF]">
            <option value="all">All Drivers</option>
            {drivers.map(driver => (
              <option key={driver.id} value={driver.id}>{driver.name}</option>
            ))}
          </select>
          <select className="px-4 py-2.5 bg-[#171B21] border border-[#2F353F] text-sm text-[#E7ECF1] focus:outline-none focus:border-[#5EC8FF]">
            <option value="all">All Zones</option>
            <option value="sf">San Francisco</option>
            <option value="la">Los Angeles</option>
            <option value="sd">San Diego</option>
          </select>
          <select className="px-4 py-2.5 bg-[#171B21] border border-[#2F353F] text-sm text-[#E7ECF1] focus:outline-none focus:border-[#5EC8FF]">
            <option value="today">Today</option>
            <option value="tomorrow">Tomorrow</option>
            <option value="week">This Week</option>
          </select>
        </div>
      </div>

      {/* Deliveries Table */}
      <div className="bg-[#20252D] border border-[#2F353F]">
        <div className="p-5 border-b border-[#2F353F]">
          <div className="text-sm text-[#E7ECF1]/60">Active Deliveries</div>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#2F353F]">
              <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">Delivery ID</th>
              <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">Order</th>
              <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">Customer</th>
              <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">Delivery Address</th>
              <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">Driver</th>
              <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">Status</th>
              <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">ETA</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.map((delivery) => (
              <tr key={delivery.id} className="border-b border-[#2F353F]/50 hover:bg-[#2F353F]/30">
                <td className="px-5 py-4 text-sm">{delivery.id}</td>
                <td className="px-5 py-4 text-sm">{delivery.order}</td>
                <td className="px-5 py-4 text-sm">{delivery.customer}</td>
                <td className="px-5 py-4 text-sm">{delivery.address}</td>
                <td className="px-5 py-4 text-sm">{delivery.driver}</td>
                <td className="px-5 py-4">
                  <span className={`inline-block px-2 py-1 text-xs ${
                    delivery.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-400' :
                    delivery.status === 'In Transit' ? 'bg-[#5EC8FF]/10 text-[#5EC8FF]' :
                    delivery.status === 'Out for Delivery' ? 'bg-blue-500/10 text-blue-400' :
                    'bg-green-500/10 text-green-400'
                  }`}>
                    {delivery.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-sm">{delivery.eta}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Driver Management */}
      <div className="bg-[#20252D] border border-[#2F353F]">
        <div className="p-5 border-b border-[#2F353F]">
          <div className="text-sm text-[#E7ECF1]/60">Driver Status</div>
        </div>
        <div className="grid grid-cols-4 gap-4 p-5">
          {drivers.map((driver) => (
            <div key={driver.id} className="bg-[#171B21] border border-[#2F353F] p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-sm">{driver.name}</div>
                  <div className="text-xs text-[#E7ECF1]/50 mt-1">{driver.vehicle}</div>
                </div>
                <Truck className="w-5 h-5 text-[#5EC8FF]" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#E7ECF1]/60">Active Deliveries</span>
                  <span>{driver.activeDeliveries}</span>
                </div>
                <span className={`inline-block px-2 py-1 text-xs ${
                  driver.status === 'Available' ? 'bg-green-500/10 text-green-400' : 'bg-[#5EC8FF]/10 text-[#5EC8FF]'
                }`}>
                  {driver.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
