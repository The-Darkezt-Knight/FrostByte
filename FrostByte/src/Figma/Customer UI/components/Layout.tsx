import React, { useState } from 'react';
import { Home, ShoppingBag, Package, Wrench, DollarSign, User, Bell, HelpCircle, Menu, X, Search, ShoppingCart, Heart } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Layout({ children, currentPage, onNavigate }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [cartCount] = useState(3);
  const [wishlistCount] = useState(5);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'shop', label: 'Shop Products', icon: ShoppingBag },
    { id: 'orders', label: 'My Orders', icon: Package },
    { id: 'services', label: 'Services', icon: Wrench },
    { id: 'buyback', label: 'Sell Parts', icon: DollarSign },
    { id: 'account', label: 'My Account', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'help', label: 'Help Center', icon: HelpCircle }
  ];

  return (
    <div className="min-h-screen bg-[#0E1114] text-[#E7ECF1]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-[#171B21] border-b border-[#3A4047] z-50">
        <div className="h-full flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-[#2F353F] rounded transition-colors"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#5EC8FF] rounded flex items-center justify-center">
                <span className="text-[#0E1114]">PC</span>
              </div>
              <span className="text-lg tracking-tight">TechStore</span>
            </div>
          </div>

          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#E7ECF1]/40" size={18} />
              <input
                type="text"
                placeholder="Search products, services..."
                className="w-full bg-[#2F353F] border border-[#3A4047] rounded pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-[#5EC8FF] transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('wishlist')}
              className="relative p-2 hover:bg-[#2F353F] rounded transition-colors"
            >
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#5EC8FF] text-[#0E1114] rounded-full flex items-center justify-center text-xs">
                  {wishlistCount}
                </span>
              )}
            </button>
            <button className="relative p-2 hover:bg-[#2F353F] rounded transition-colors">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#5EC8FF] text-[#0E1114] rounded-full flex items-center justify-center text-xs">
                  {cartCount}
                </span>
              )}
            </button>
            <div className="w-8 h-8 bg-[#2F353F] rounded-full flex items-center justify-center">
              <User size={18} />
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 bottom-0 w-64 bg-[#171B21] border-r border-[#3A4047] transition-transform duration-300 z-40 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-all ${
                  isActive
                    ? 'bg-[#5EC8FF]/10 text-[#5EC8FF] border border-[#5EC8FF]/30'
                    : 'hover:bg-[#2F353F] text-[#E7ECF1]/70 hover:text-[#E7ECF1]'
                }`}
              >
                <Icon size={18} />
                <span className="text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main
        className={`pt-16 transition-all duration-300 ${
          sidebarOpen ? 'ml-64' : 'ml-0'
        }`}
      >
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
