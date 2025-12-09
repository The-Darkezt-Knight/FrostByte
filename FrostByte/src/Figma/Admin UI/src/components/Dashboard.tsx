import { DollarSign, ShoppingBag, TrendingUp, Package, Wrench, AlertTriangle, Plus, UserCheck, ClipboardCheck } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const salesData = [
  { month: 'Jan', sales: 45000 },
  { month: 'Feb', sales: 52000 },
  { month: 'Mar', sales: 48000 },
  { month: 'Apr', sales: 61000 },
  { month: 'May', sales: 55000 },
  { month: 'Jun', sales: 67000 },
];

const categoryData = [
  { category: 'CPU', value: 28000 },
  { category: 'GPU', value: 45000 },
  { category: 'RAM', value: 18000 },
  { category: 'Storage', value: 22000 },
  { category: 'Motherboard', value: 16000 },
];

const recentOrders = [
  { id: 'ORD-1847', customer: 'James Wilson', product: 'RTX 4080 Gaming GPU', amount: '$1,249', status: 'Processing', time: '12 min ago' },
  { id: 'ORD-1846', customer: 'Sarah Chen', product: 'AMD Ryzen 9 7950X', amount: '$699', status: 'Shipped', time: '1 hr ago' },
  { id: 'ORD-1845', customer: 'Michael Brown', product: 'Corsair 32GB DDR5', amount: '$189', status: 'Delivered', time: '3 hrs ago' },
  { id: 'ORD-1844', customer: 'Emily Davis', product: 'Samsung 2TB NVMe SSD', amount: '$249', status: 'Processing', time: '5 hrs ago' },
];

const serviceAppointments = [
  { id: 'SVC-428', customer: 'Robert Taylor', service: 'Custom PC Build', technician: 'Tech-A', date: '2025-11-28', status: 'Scheduled' },
  { id: 'SVC-427', customer: 'Linda Martinez', service: 'GPU Installation', technician: 'Tech-B', date: '2025-11-27', status: 'In Progress' },
  { id: 'SVC-426', customer: 'David Anderson', service: 'Water Cooling Setup', technician: 'Tech-C', date: '2025-11-27', status: 'Completed' },
];

export function Dashboard() {
  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl tracking-tight">System Overview</h1>
          <p className="text-sm text-[#E7ECF1]/60 mt-1">Real-time analytics and operational metrics</p>
        </div>
        <div className="text-sm text-[#E7ECF1]/60">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Critical Alerts */}
      <div className="bg-[#5EC8FF]/5 border border-[#5EC8FF]/20 p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-[#5EC8FF] mt-0.5" />
          <div className="flex-1">
            <div className="font-medium text-[#5EC8FF]">Critical Stock Alert</div>
            <p className="text-sm text-[#E7ECF1]/70 mt-1">
              12 products are below minimum stock threshold. Immediate restock recommended.
            </p>
          </div>
          <button className="px-4 py-1.5 bg-[#5EC8FF] text-[#171B21] text-sm hover:bg-[#5EC8FF]/90 transition-colors">
            View Details
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-5 gap-4">
        <div className="bg-[#20252D] border border-[#2F353F] p-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm text-[#E7ECF1]/60">Total Revenue</div>
              <div className="text-2xl mt-2">$67,429</div>
              <div className="flex items-center gap-1 text-xs text-[#5EC8FF] mt-2">
                <TrendingUp className="w-3 h-3" />
                <span>+12.5% vs last month</span>
              </div>
            </div>
            <div className="w-10 h-10 bg-[#5EC8FF]/10 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-[#5EC8FF]" />
            </div>
          </div>
        </div>

        <div className="bg-[#20252D] border border-[#2F353F] p-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm text-[#E7ECF1]/60">Orders</div>
              <div className="text-2xl mt-2">1,847</div>
              <div className="flex items-center gap-1 text-xs text-[#5EC8FF] mt-2">
                <TrendingUp className="w-3 h-3" />
                <span>+8.3% this week</span>
              </div>
            </div>
            <div className="w-10 h-10 bg-[#5EC8FF]/10 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-[#5EC8FF]" />
            </div>
          </div>
        </div>

        <div className="bg-[#20252D] border border-[#2F353F] p-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm text-[#E7ECF1]/60">Inventory Items</div>
              <div className="text-2xl mt-2">3,249</div>
              <div className="text-xs text-[#E7ECF1]/50 mt-2">
                12 items low stock
              </div>
            </div>
            <div className="w-10 h-10 bg-[#5EC8FF]/10 flex items-center justify-center">
              <Package className="w-5 h-5 text-[#5EC8FF]" />
            </div>
          </div>
        </div>

        <div className="bg-[#20252D] border border-[#2F353F] p-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm text-[#E7ECF1]/60">Service Requests</div>
              <div className="text-2xl mt-2">428</div>
              <div className="text-xs text-[#E7ECF1]/50 mt-2">
                23 pending assignments
              </div>
            </div>
            <div className="w-10 h-10 bg-[#5EC8FF]/10 flex items-center justify-center">
              <Wrench className="w-5 h-5 text-[#5EC8FF]" />
            </div>
          </div>
        </div>

        <div className="bg-[#20252D] border border-[#2F353F] p-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm text-[#E7ECF1]/60">Buyback Requests</div>
              <div className="text-2xl mt-2">89</div>
              <div className="text-xs text-[#E7ECF1]/50 mt-2">
                15 awaiting appraisal
              </div>
            </div>
            <div className="w-10 h-10 bg-[#5EC8FF]/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#5EC8FF]" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-[#20252D] border border-[#2F353F] p-5">
        <div className="text-sm text-[#E7ECF1]/60 mb-4">Quick Actions</div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#5EC8FF] text-[#171B21] text-sm hover:bg-[#5EC8FF]/90 transition-colors">
            <Plus className="w-4 h-4" />
            Add Product
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 border border-[#2F353F] text-sm hover:bg-[#2F353F] transition-colors">
            <UserCheck className="w-4 h-4" />
            Assign Technician
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 border border-[#2F353F] text-sm hover:bg-[#2F353F] transition-colors">
            <ClipboardCheck className="w-4 h-4" />
            View Appraisals
          </button>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6">
        {/* Sales Trend */}
        <div className="bg-[#20252D] border border-[#2F353F] p-5">
          <div className="text-sm text-[#E7ECF1]/60 mb-4">Monthly Sales Trend</div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2F353F" />
              <XAxis dataKey="month" stroke="#E7ECF1" tick={{ fill: '#E7ECF1' }} />
              <YAxis stroke="#E7ECF1" tick={{ fill: '#E7ECF1' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#20252D', 
                  border: '1px solid #2F353F',
                  color: '#E7ECF1'
                }} 
              />
              <Line type="monotone" dataKey="sales" stroke="#5EC8FF" strokeWidth={2} dot={{ fill: '#5EC8FF' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Performance */}
        <div className="bg-[#20252D] border border-[#2F353F] p-5">
          <div className="text-sm text-[#E7ECF1]/60 mb-4">Revenue by Category</div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2F353F" />
              <XAxis dataKey="category" stroke="#E7ECF1" tick={{ fill: '#E7ECF1' }} />
              <YAxis stroke="#E7ECF1" tick={{ fill: '#E7ECF1' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#20252D', 
                  border: '1px solid #2F353F',
                  color: '#E7ECF1'
                }} 
              />
              <Bar dataKey="value" fill="#5EC8FF" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-[#20252D] border border-[#2F353F]">
          <div className="p-5 border-b border-[#2F353F]">
            <div className="text-sm text-[#E7ECF1]/60">Recent Orders</div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#2F353F]">
                  <th className="text-left px-5 py-3 text-xs text-[#E7ECF1]/60">Order ID</th>
                  <th className="text-left px-5 py-3 text-xs text-[#E7ECF1]/60">Customer</th>
                  <th className="text-left px-5 py-3 text-xs text-[#E7ECF1]/60">Amount</th>
                  <th className="text-left px-5 py-3 text-xs text-[#E7ECF1]/60">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-[#2F353F]/50 hover:bg-[#2F353F]/30">
                    <td className="px-5 py-3 text-sm">{order.id}</td>
                    <td className="px-5 py-3 text-sm">{order.customer}</td>
                    <td className="px-5 py-3 text-sm">{order.amount}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-block px-2 py-1 text-xs ${
                        order.status === 'Processing' ? 'bg-[#5EC8FF]/10 text-[#5EC8FF]' :
                        order.status === 'Shipped' ? 'bg-yellow-500/10 text-yellow-400' :
                        'bg-green-500/10 text-green-400'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Active Service Appointments */}
        <div className="bg-[#20252D] border border-[#2F353F]">
          <div className="p-5 border-b border-[#2F353F]">
            <div className="text-sm text-[#E7ECF1]/60">Active Service Appointments</div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#2F353F]">
                  <th className="text-left px-5 py-3 text-xs text-[#E7ECF1]/60">Service ID</th>
                  <th className="text-left px-5 py-3 text-xs text-[#E7ECF1]/60">Customer</th>
                  <th className="text-left px-5 py-3 text-xs text-[#E7ECF1]/60">Technician</th>
                  <th className="text-left px-5 py-3 text-xs text-[#E7ECF1]/60">Status</th>
                </tr>
              </thead>
              <tbody>
                {serviceAppointments.map((service) => (
                  <tr key={service.id} className="border-b border-[#2F353F]/50 hover:bg-[#2F353F]/30">
                    <td className="px-5 py-3 text-sm">{service.id}</td>
                    <td className="px-5 py-3 text-sm">{service.customer}</td>
                    <td className="px-5 py-3 text-sm">{service.technician}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-block px-2 py-1 text-xs ${
                        service.status === 'Scheduled' ? 'bg-[#5EC8FF]/10 text-[#5EC8FF]' :
                        service.status === 'In Progress' ? 'bg-yellow-500/10 text-yellow-400' :
                        'bg-green-500/10 text-green-400'
                      }`}>
                        {service.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
