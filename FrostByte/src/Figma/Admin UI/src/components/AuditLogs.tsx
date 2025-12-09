import { Search, Download, Filter } from 'lucide-react';

const auditLogs = [
  { id: 1, timestamp: '2025-11-27 14:32:15', user: 'admin@pchardware.com', action: 'Product Updated', module: 'Inventory', details: 'Updated stock for RTX 4090', status: 'Success' },
  { id: 2, timestamp: '2025-11-27 14:28:42', user: 'manager@pchardware.com', action: 'Order Status Changed', module: 'Orders', details: 'Changed ORD-1847 to Processing', status: 'Success' },
  { id: 3, timestamp: '2025-11-27 14:15:33', user: 'admin@pchardware.com', action: 'User Created', module: 'User Management', details: 'Created new customer account', status: 'Success' },
  { id: 4, timestamp: '2025-11-27 13:58:12', user: 'tech@pchardware.com', action: 'Service Assignment', module: 'Services', details: 'Assigned SVC-428 to Tech-A', status: 'Success' },
  { id: 5, timestamp: '2025-11-27 13:45:27', user: 'admin@pchardware.com', action: 'Price Updated', module: 'Products', details: 'Changed price for AMD Ryzen 9', status: 'Success' },
  { id: 6, timestamp: '2025-11-27 13:32:18', user: 'admin@pchardware.com', action: 'Login Failed', module: 'Security', details: 'Invalid password attempt', status: 'Failed' },
  { id: 7, timestamp: '2025-11-27 13:21:45', user: 'manager@pchardware.com', action: 'Report Generated', module: 'Analytics', details: 'Monthly sales report exported', status: 'Success' },
  { id: 8, timestamp: '2025-11-27 13:08:53', user: 'admin@pchardware.com', action: 'Settings Modified', module: 'System', details: 'Updated payment gateway config', status: 'Success' },
  { id: 9, timestamp: '2025-11-27 12:55:31', user: 'tech@pchardware.com', action: 'Service Completed', module: 'Services', details: 'Completed SVC-426', status: 'Success' },
  { id: 10, timestamp: '2025-11-27 12:42:19', user: 'admin@pchardware.com', action: 'Buyback Approved', module: 'Buyback', details: 'Approved BB-2847 for $850', status: 'Success' },
];

export function AuditLogs() {
  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl tracking-tight">Audit Logs</h1>
          <p className="text-sm text-[#E7ECF1]/60 mt-1">System activity tracking and security monitoring</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 border border-[#2F353F] text-sm hover:bg-[#2F353F] transition-colors">
          <Download className="w-4 h-4" />
          Export Logs
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-4">
        <div className="bg-[#20252D] border border-[#2F353F] p-5">
          <div className="text-xs text-[#E7ECF1]/60">Total Activities</div>
          <div className="text-2xl mt-2">8,427</div>
        </div>
        <div className="bg-[#20252D] border border-[#2F353F] p-5">
          <div className="text-xs text-[#E7ECF1]/60">Today</div>
          <div className="text-2xl mt-2">142</div>
        </div>
        <div className="bg-[#20252D] border border-[#2F353F] p-5">
          <div className="text-xs text-[#E7ECF1]/60">This Week</div>
          <div className="text-2xl mt-2">1,248</div>
        </div>
        <div className="bg-[#20252D] border border-[#2F353F] p-5">
          <div className="text-xs text-[#E7ECF1]/60">Failed Actions</div>
          <div className="text-2xl mt-2 text-red-400">8</div>
        </div>
        <div className="bg-[#20252D] border border-[#2F353F] p-5">
          <div className="text-xs text-[#E7ECF1]/60">Active Users</div>
          <div className="text-2xl mt-2">12</div>
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
                placeholder="Search logs..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#171B21] border border-[#2F353F] text-sm text-[#E7ECF1] placeholder:text-[#E7ECF1]/40 focus:outline-none focus:border-[#5EC8FF]"
              />
            </div>
          </div>
          <select className="px-4 py-2.5 bg-[#171B21] border border-[#2F353F] text-sm text-[#E7ECF1] focus:outline-none focus:border-[#5EC8FF]">
            <option value="all">All Modules</option>
            <option value="inventory">Inventory</option>
            <option value="orders">Orders</option>
            <option value="users">User Management</option>
            <option value="services">Services</option>
            <option value="security">Security</option>
            <option value="system">System</option>
          </select>
          <select className="px-4 py-2.5 bg-[#171B21] border border-[#2F353F] text-sm text-[#E7ECF1] focus:outline-none focus:border-[#5EC8FF]">
            <option value="all">All Users</option>
            <option value="admin">Admins</option>
            <option value="manager">Managers</option>
            <option value="tech">Technicians</option>
          </select>
          <select className="px-4 py-2.5 bg-[#171B21] border border-[#2F353F] text-sm text-[#E7ECF1] focus:outline-none focus:border-[#5EC8FF]">
            <option value="all">All Status</option>
            <option value="success">Success</option>
            <option value="failed">Failed</option>
            <option value="warning">Warning</option>
          </select>
        </div>
      </div>

      {/* Date Range */}
      <div className="bg-[#20252D] border border-[#2F353F] p-5">
        <div className="flex items-center gap-4">
          <span className="text-sm text-[#E7ECF1]/60">Date Range:</span>
          <input 
            type="date" 
            className="px-4 py-2 bg-[#171B21] border border-[#2F353F] text-sm text-[#E7ECF1] focus:outline-none focus:border-[#5EC8FF]"
            defaultValue="2025-11-20"
          />
          <span className="text-sm text-[#E7ECF1]/60">to</span>
          <input 
            type="date" 
            className="px-4 py-2 bg-[#171B21] border border-[#2F353F] text-sm text-[#E7ECF1] focus:outline-none focus:border-[#5EC8FF]"
            defaultValue="2025-11-27"
          />
          <button className="px-4 py-2 bg-[#5EC8FF] text-[#171B21] text-sm hover:bg-[#5EC8FF]/90 transition-colors">
            Apply Filter
          </button>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-[#20252D] border border-[#2F353F]">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#2F353F]">
              <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">Timestamp</th>
              <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">User</th>
              <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">Action</th>
              <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">Module</th>
              <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">Details</th>
              <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">Status</th>
            </tr>
          </thead>
          <tbody>
            {auditLogs.map((log) => (
              <tr key={log.id} className="border-b border-[#2F353F]/50 hover:bg-[#2F353F]/30">
                <td className="px-5 py-4 text-sm text-[#E7ECF1]/80">{log.timestamp}</td>
                <td className="px-5 py-4 text-sm">{log.user}</td>
                <td className="px-5 py-4 text-sm">{log.action}</td>
                <td className="px-5 py-4">
                  <span className="inline-block px-2 py-1 text-xs bg-[#2F353F] text-[#E7ECF1]/80">
                    {log.module}
                  </span>
                </td>
                <td className="px-5 py-4 text-sm text-[#E7ECF1]/70">{log.details}</td>
                <td className="px-5 py-4">
                  <span className={`inline-block px-2 py-1 text-xs ${
                    log.status === 'Success' ? 'bg-green-500/10 text-green-400' :
                    log.status === 'Failed' ? 'bg-red-500/10 text-red-400' :
                    'bg-yellow-500/10 text-yellow-400'
                  }`}>
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Security Alerts */}
      <div className="bg-[#20252D] border border-[#2F353F] p-5">
        <h3 className="text-sm text-[#E7ECF1]/60 mb-4">Recent Security Alerts</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-red-500/5 border border-red-500/20">
            <div className="w-2 h-2 rounded-full bg-red-400 mt-1.5"></div>
            <div className="flex-1">
              <div className="text-sm">Failed login attempt detected</div>
              <div className="text-xs text-[#E7ECF1]/50 mt-1">admin@pchardware.com - 2025-11-27 13:32:18</div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-yellow-500/5 border border-yellow-500/20">
            <div className="w-2 h-2 rounded-full bg-yellow-400 mt-1.5"></div>
            <div className="flex-1">
              <div className="text-sm">Unusual activity pattern detected</div>
              <div className="text-xs text-[#E7ECF1]/50 mt-1">Multiple price updates in short timeframe - 2025-11-27 12:15:00</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
