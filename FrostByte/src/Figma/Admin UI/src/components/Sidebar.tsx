import {
  LayoutDashboard,
  Package,
  Tags,
  Warehouse,
  HardDrive,
  ShoppingCart,
  Wrench,
  RefreshCcw,
  Users,
  Truck,
  BarChart3,
  Settings,
  FileText,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  activePage: string;
  onPageChange: (page: string) => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: any;
  submenu?: { id: string; label: string }[];
}

export function Sidebar({ activePage, onPageChange }: SidebarProps) {
  const menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      id: 'products',
      label: 'Product & Inventory',
      icon: Package,
      submenu: [
        { id: 'products', label: 'Products' },
        { id: 'categories', label: 'Categories & Brands' },
        { id: 'stock', label: 'Stock Management' },
        { id: 'used-components', label: 'Used Components' },
      ],
    },
    {
      id: 'orders',
      label: 'Orders & Transactions',
      icon: ShoppingCart,
    },
    {
      id: 'service',
      label: 'Service & Installation',
      icon: Wrench,
    },
    {
      id: 'buyback',
      label: '2nd-Hand Buyback',
      icon: RefreshCcw,
    },
    {
      id: 'users',
      label: 'User & Staff Management',
      icon: Users,
    },
    {
      id: 'logistics',
      label: 'Logistics & Delivery',
      icon: Truck,
    },
    {
      id: 'analytics',
      label: 'Reports & Analytics',
      icon: BarChart3,
    },
    {
      id: 'settings',
      label: 'System Settings',
      icon: Settings,
    },
    {
      id: 'audit',
      label: 'Audit Logs',
      icon: FileText,
    },
  ];

  return (
    <aside className="w-64 bg-[#20252D] border-r border-[#2F353F] flex flex-col">
      {/* Logo Area */}
      <div className="p-6 border-b border-[#2F353F]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-[#5EC8FF] to-[#3B9FCC] flex items-center justify-center">
            <HardDrive className="w-5 h-5 text-[#171B21]" />
          </div>
          <div>
            <div className="font-semibold tracking-tight">PC HARDWARE</div>
            <div className="text-xs text-[#5EC8FF]">Admin Console</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id || item.submenu?.some(sub => sub.id === activePage);
          
          return (
            <div key={item.id}>
              <button
                onClick={() => onPageChange(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 transition-all ${
                  isActive
                    ? 'bg-[#5EC8FF]/10 text-[#5EC8FF] border-l-2 border-[#5EC8FF]'
                    : 'text-[#E7ECF1]/70 hover:bg-[#2F353F] hover:text-[#E7ECF1]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="flex-1 text-left text-sm">{item.label}</span>
                {item.submenu && <ChevronRight className="w-3 h-3" />}
              </button>

              {/* Submenu */}
              {item.submenu && isActive && (
                <div className="ml-6 mt-1 space-y-1">
                  {item.submenu.map((subItem) => (
                    <button
                      key={subItem.id}
                      onClick={() => onPageChange(subItem.id)}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-sm transition-all ${
                        activePage === subItem.id
                          ? 'text-[#5EC8FF]'
                          : 'text-[#E7ECF1]/60 hover:text-[#E7ECF1]'
                      }`}
                    >
                      <div className="w-1 h-1 rounded-full bg-current" />
                      {subItem.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[#2F353F]">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded bg-[#2F353F] flex items-center justify-center">
            <span className="text-xs">AD</span>
          </div>
          <div className="flex-1 text-sm">
            <div>Admin User</div>
            <div className="text-xs text-[#E7ECF1]/50">admin@pchardware.com</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
