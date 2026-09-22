import React, { useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { Toast } from './components/common/Toast';
import { QuickViewModal } from './components/common/QuickViewModal';
import { CartDrawer } from './components/common/CartDrawer';
import { MobileBottomNav } from './components/common/MobileBottomNav';

// Customer Pages
import { HomePage } from './components/customer/HomePage';
import { ShopPage } from './components/customer/ShopPage';
import { ProductDetailsPage } from './components/customer/ProductDetailsPage';
import { CartPage } from './components/customer/CartPage';
import { CheckoutPage } from './components/customer/CheckoutPage';
import { OrderSuccessPage } from './components/customer/OrderSuccessPage';
import { AuthPages } from './components/customer/AuthPages';
import { AccountPage } from './components/customer/AccountPage';
import { MyOrdersPage } from './components/customer/MyOrdersPage';
import { OrderTrackingPage } from './components/customer/OrderTrackingPage';
import { AboutPage } from './components/customer/AboutPage';
import { ContactPage } from './components/customer/ContactPage';

// Admin Pages
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminProducts } from './components/admin/AdminProducts';
import { AdminOrders } from './components/admin/AdminOrders';
import { AdminInventory } from './components/admin/AdminInventory';
import { AdminCategories } from './components/admin/AdminCategories';
import { AdminCustomers } from './components/admin/AdminCustomers';
import { AdminCoupons } from './components/admin/AdminCoupons';
import { AdminReviews } from './components/admin/AdminReviews';
import { AdminSettings } from './components/admin/AdminSettings';

const StoreContent: React.FC = () => {
  const { customerView, currentMode, adminTab } = useStore();

  // Scroll to top upon view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [customerView, currentMode, adminTab]);

  // If in Admin Mode, render the comprehensive administration back-office
  if (currentMode === 'admin') {
    return (
      <AdminLayout>
        {adminTab === 'dashboard' && <AdminDashboard />}
        {adminTab === 'products' && <AdminProducts />}
        {adminTab === 'categories' && <AdminCategories />}
        {adminTab === 'orders' && <AdminOrders />}
        {adminTab === 'inventory' && <AdminInventory />}
        {adminTab === 'customers' && <AdminCustomers />}
        {adminTab === 'coupons' && <AdminCoupons />}
        {adminTab === 'reviews' && <AdminReviews />}
        {adminTab === 'settings' && <AdminSettings />}
      </AdminLayout>
    );
  }

  // Customer-Facing Storefront
  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col antialiased text-gray-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top Header & Navigation */}
      <Header />

      {/* Main Screen Content */}
      <main className="flex-1 pb-14 lg:pb-0">
        {customerView === 'home' && <HomePage />}
        {customerView === 'shop' && <ShopPage />}
        {customerView === 'product-details' && <ProductDetailsPage />}
        {customerView === 'cart' && <CartPage />}
        {customerView === 'checkout' && <CheckoutPage />}
        {customerView === 'order-success' && <OrderSuccessPage />}
        {customerView === 'login' && <AuthPages initialMode="login" />}
        {customerView === 'register' && <AuthPages initialMode="register" />}
        {customerView === 'account' && <AccountPage />}
        {customerView === 'my-orders' && <MyOrdersPage />}
        {customerView === 'order-tracking' && <OrderTrackingPage />}
        {customerView === 'about' && <AboutPage />}
        {customerView === 'contact' && <ContactPage />}
      </main>

      {/* Professional Store Footer */}
      <Footer />

      {/* Mobile Bottom Sticky Navigation */}
      <MobileBottomNav />

      {/* Reusable Modals & Global Overlays */}
      <QuickViewModal />
      <CartDrawer />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <StoreContent />
    </StoreProvider>
  );
}
