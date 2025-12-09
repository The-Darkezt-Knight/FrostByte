import { TrendingUp, DollarSign, Package, Wrench } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const salesData = [
  { month: 'Jan', revenue: 45000, profit: 12000 },
  { month: 'Feb', revenue: 52000, profit: 15000 },
  { month: 'Mar', revenue: 48000, profit: 13500 },
  { month: 'Apr', revenue: 61000, profit: 18000 },
  { month: 'May', revenue: 55000, profit: 16500 },
  { month: 'Jun', revenue: 67000, profit: 20000 },
];

const categoryRevenue = [
  { name: 'GPU', value: 45000 },
  { name: 'CPU', value: 28000 },
  { name: 'RAM', value: 18000 },
  { name: 'Storage', value: 22000 },
  { name: 'Other', value: 16000 },
];

const technicianPerformance = [
  { name: 'Alex T.', jobs: 45, rating: 4.8 },
  { name: 'Brian F.', jobs: 38, rating: 4.6 },
  { name: 'Catherine W.', jobs: 52, rating: 4.9 },
  { name: 'Daniel R.', jobs: 41, rating: 4.7 },
];

const COLORS = ['#5EC8FF', '#3B9FCC', '#2F7A9E', '#235B73', '#173D4D'];

export function Analytics() {
  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl tracking-tight">Reports & Analytics</h1>
        <p className="text-sm text-[#E7ECF1]/60 mt-1">Comprehensive business intelligence and performance metrics</p>
      </div>

      {/* Time Period Selector */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-[#5EC8FF] text-[#171B21] text-sm transition-colors">
            This Month
          </button>
          <button className="px-4 py-2 border border-[#2F353F] text-sm hover:bg-[#2F353F] transition-colors">
            Last Month
          </button>
          <button className="px-4 py-2 border border-[#2F353F] text-sm hover:bg-[#2F353F] transition-colors">
            Last Quarter
          </button>
          <button className="px-4 py-2 border border-[#2F353F] text-sm hover:bg-[#2F353F] transition-colors">
            This Year
          </button>
        </div>
        <button className="px-4 py-2 border border-[#2F353F] text-sm hover:bg-[#2F353F] transition-colors">
          Export Report
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-[#20252D] border border-[#2F353F] p-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs text-[#E7ECF1]/60">Total Revenue</div>
              <div className="text-2xl mt-2">$328K</div>
              <div className="flex items-center gap-1 text-xs text-green-400 mt-2">
                <TrendingUp className="w-3 h-3" />
                <span>+15.3%</span>
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
              <div className="text-xs text-[#E7ECF1]/60">Net Profit</div>
              <div className="text-2xl mt-2">$95K</div>
              <div className="flex items-center gap-1 text-xs text-green-400 mt-2">
                <TrendingUp className="w-3 h-3" />
                <span>+18.7%</span>
              </div>
            </div>
            <div className="w-10 h-10 bg-green-500/10 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-[#20252D] border border-[#2F353F] p-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs text-[#E7ECF1]/60">Products Sold</div>
              <div className="text-2xl mt-2">3,847</div>
              <div className="flex items-center gap-1 text-xs text-green-400 mt-2">
                <TrendingUp className="w-3 h-3" />
                <span>+12.4%</span>
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
              <div className="text-xs text-[#E7ECF1]/60">Services Completed</div>
              <div className="text-2xl mt-2">428</div>
              <div className="flex items-center gap-1 text-xs text-green-400 mt-2">
                <TrendingUp className="w-3 h-3" />
                <span>+8.9%</span>
              </div>
            </div>
            <div className="w-10 h-10 bg-[#5EC8FF]/10 flex items-center justify-center">
              <Wrench className="w-5 h-5 text-[#5EC8FF]" />
            </div>
          </div>
        </div>
      </div>

      {/* Revenue & Profit Chart */}
      <div className="bg-[#20252D] border border-[#2F353F] p-5">
        <div className="text-sm text-[#E7ECF1]/60 mb-4">Revenue & Profit Trend</div>
        <ResponsiveContainer width="100%" height={300}>
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
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#5EC8FF" strokeWidth={2} name="Revenue" />
            <Line type="monotone" dataKey="profit" stroke="#5EFF8F" strokeWidth={2} name="Profit" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Category Revenue & Technician Performance */}
      <div className="grid grid-cols-2 gap-6">
        {/* Category Revenue */}
        <div className="bg-[#20252D] border border-[#2F353F] p-5">
          <div className="text-sm text-[#E7ECF1]/60 mb-4">Revenue by Category</div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryRevenue}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryRevenue.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#20252D', 
                  border: '1px solid #2F353F',
                  color: '#E7ECF1'
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Technician Performance */}
        <div className="bg-[#20252D] border border-[#2F353F] p-5">
          <div className="text-sm text-[#E7ECF1]/60 mb-4">Technician Performance</div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={technicianPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2F353F" />
              <XAxis dataKey="name" stroke="#E7ECF1" tick={{ fill: '#E7ECF1' }} />
              <YAxis stroke="#E7ECF1" tick={{ fill: '#E7ECF1' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#20252D', 
                  border: '1px solid #2F353F',
                  color: '#E7ECF1'
                }} 
              />
              <Bar dataKey="jobs" fill="#5EC8FF" name="Jobs Completed" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Inventory Analysis */}
      <div className="bg-[#20252D] border border-[#2F353F]">
        <div className="p-5 border-b border-[#2F353F]">
          <div className="text-sm text-[#E7ECF1]/60">Inventory Analysis</div>
        </div>
        <div className="grid grid-cols-5 gap-4 p-5">
          <div className="text-center">
            <div className="text-xs text-[#E7ECF1]/60">Total Items</div>
            <div className="text-2xl mt-2">3,249</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-[#E7ECF1]/60">Total Value</div>
            <div className="text-2xl mt-2">$2.4M</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-[#E7ECF1]/60">Low Stock</div>
            <div className="text-2xl mt-2 text-yellow-400">12</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-[#E7ECF1]/60">Out of Stock</div>
            <div className="text-2xl mt-2 text-red-400">3</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-[#E7ECF1]/60">Turnover Rate</div>
            <div className="text-2xl mt-2 text-green-400">45%</div>
          </div>
        </div>
      </div>
    </div>
  );
}
