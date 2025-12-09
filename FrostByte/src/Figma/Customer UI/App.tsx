import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { Shop } from './components/Shop';
import { ProductDetail } from './components/ProductDetail';
import { Wishlist } from './components/Wishlist';
import { Orders } from './components/Orders';
import { OrderDetail } from './components/OrderDetail';
import { Services } from './components/Services';
import { Buyback } from './components/Buyback';
import { Account } from './components/Account';
import { Notifications } from './components/Notifications';
import { Help } from './components/Help';

type PageType = 
  | 'dashboard' 
  | 'shop' 
  | 'product-detail' 
  | 'wishlist'
  | 'orders'
  | 'order-detail'
  | 'services'
  | 'buyback'
  | 'account'
  | 'notifications'
  | 'help';

interface NavigationState {
  page: PageType;
  params?: any;
}

export default function App() {
  const [navigation, setNavigation] = useState<NavigationState>({
    page: 'dashboard'
  });

  const handleNavigate = (page: string, params?: any) => {
    setNavigation({ page: page as PageType, params });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (navigation.page) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      case 'shop':
        return <Shop onNavigate={handleNavigate} />;
      case 'product-detail':
        return (
          <ProductDetail 
            productId={navigation.params?.productId} 
            onNavigate={handleNavigate} 
          />
        );
      case 'wishlist':
        return <Wishlist onNavigate={handleNavigate} />;
      case 'orders':
        return <Orders onNavigate={handleNavigate} />;
      case 'order-detail':
        return (
          <OrderDetail 
            orderId={navigation.params?.orderId} 
            onNavigate={handleNavigate} 
          />
        );
      case 'services':
        return <Services onNavigate={handleNavigate} />;
      case 'buyback':
        return <Buyback onNavigate={handleNavigate} />;
      case 'account':
        return <Account onNavigate={handleNavigate} />;
      case 'notifications':
        return <Notifications onNavigate={handleNavigate} />;
      case 'help':
        return <Help onNavigate={handleNavigate} />;
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <Layout currentPage={navigation.page} onNavigate={handleNavigate}>
      {renderPage()}
    </Layout>
  );
}
