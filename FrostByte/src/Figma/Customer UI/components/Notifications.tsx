import React, { useState } from 'react';
import { Bell, Package, Wrench, DollarSign, Tag, Shield, Check } from 'lucide-react';
import { notifications } from '../data/mockData';

interface NotificationsProps {
  onNavigate: (page: string, params?: any) => void;
}

export function Notifications({ onNavigate }: NotificationsProps) {
  const [filter, setFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'order', label: 'Orders' },
    { id: 'service', label: 'Services' },
    { id: 'buyback', label: 'Buyback' },
    { id: 'promo', label: 'Promotions' },
    { id: 'security', label: 'Security' }
  ];

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications.filter(n => n.type === filter);

  const getIcon = (type: string) => {
    switch (type) {
      case 'order': return Package;
      case 'service': return Wrench;
      case 'buyback': return DollarSign;
      case 'promo': return Tag;
      case 'security': return Shield;
      default: return Bell;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'order': return 'text-blue-400';
      case 'service': return 'text-yellow-400';
      case 'buyback': return 'text-green-400';
      case 'promo': return 'text-purple-400';
      case 'security': return 'text-red-400';
      default: return 'text-[#5EC8FF]';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1>Notifications</h1>
        <button className="px-4 py-2 bg-[#2F353F] border border-[#3A4047] rounded text-sm hover:bg-[#3A4047] transition-colors">
          Mark All as Read
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-4 py-2 rounded text-sm whitespace-nowrap transition-all ${
              filter === f.id
                ? 'bg-[#5EC8FF] text-[#0E1114]'
                : 'bg-[#171B21] border border-[#3A4047] hover:border-[#5EC8FF]'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-2">
        {filteredNotifications.map((notif) => {
          const Icon = getIcon(notif.type);
          const iconColor = getIconColor(notif.type);
          
          return (
            <div
              key={notif.id}
              className={`bg-[#171B21] border rounded p-4 hover:border-[#5EC8FF]/30 transition-all cursor-pointer ${
                notif.read ? 'border-[#3A4047]' : 'border-[#5EC8FF]/50 bg-[#5EC8FF]/5'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-2 bg-[#2F353F] rounded ${iconColor}`}>
                  <Icon size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h4 className="text-sm">{notif.title}</h4>
                    {!notif.read && (
                      <div className="w-2 h-2 bg-[#5EC8FF] rounded-full flex-shrink-0 mt-1.5" />
                    )}
                  </div>
                  <p className="text-sm text-[#E7ECF1]/70 mb-2">{notif.message}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#E7ECF1]/40">{notif.timestamp}</span>
                    {!notif.read && (
                      <button className="text-xs text-[#5EC8FF] hover:text-[#5EC8FF]/80 flex items-center gap-1">
                        <Check size={14} />
                        Mark as read
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredNotifications.length === 0 && (
        <div className="bg-[#171B21] border border-[#3A4047] rounded p-12 text-center">
          <Bell size={48} className="mx-auto mb-4 text-[#E7ECF1]/20" />
          <h3 className="mb-2">No notifications</h3>
          <p className="text-[#E7ECF1]/60">You're all caught up!</p>
        </div>
      )}
    </div>
  );
}
