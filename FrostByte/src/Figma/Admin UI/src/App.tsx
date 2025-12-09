import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Products } from './components/Products';
import { Categories } from './components/Categories';
import { StockManagement } from './components/StockManagement';
import { UsedComponents } from './components/UsedComponents';
import { Orders } from './components/Orders';
import { ServiceManagement } from './components/ServiceManagement';
import { BuybackManagement } from './components/BuybackManagement';
import { UserManagement } from './components/UserManagement';
import { Logistics } from './components/Logistics';
import { Analytics } from './components/Analytics';
import { Settings } from './components/Settings';
import { AuditLogs } from './components/AuditLogs';

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'products':
        return <Products />;
      case 'categories':
        return <Categories />;
      case 'stock':
        return <StockManagement />;
      case 'used-components':
        return <UsedComponents />;
      case 'orders':
        return <Orders />;
      case 'service':
        return <ServiceManagement />;
      case 'buyback':
        return <BuybackManagement />;
      case 'users':
        return <UserManagement />;
      case 'logistics':
        return <Logistics />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <Settings />;
      case 'audit':
        return <AuditLogs />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-[#171B21] text-[#E7ECF1]">
      <Sidebar activePage={activePage} onPageChange={setActivePage} />
      <main className="flex-1 overflow-auto">
        {renderPage()}
      </main>
    </div>
  );
}
