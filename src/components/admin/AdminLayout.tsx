import React from 'react';
import { useStore } from '../../context/StoreContext';
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingBag,
  Users,
  Boxes,
  Tag,
  Star,
  Settings,
  Store,
  LogOut,
  Bell,
  Search,
  ExternalLink,
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const {
    adminTab,
    setAdminTab,
    setCurrentMode,
    orders,
    products,
    reviews,
    settings,
  } = useStore();

  const pendingOrdersCount = orders.filter((o) => o.status === 'Pending').length;
  const lowStockCount = products.filter((p) => p.stock <= p.lowStockThreshold).length;
  const pendingReviewsCount = reviews.filter((r) => r.status === 'Pending').length;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package, badge: products.length },
    { id: 'categories', label: 'Categories', icon: FolderTree },
    { id: 'orders', label: 'Orders (COD)', icon: ShoppingBag, badge: pendingOrdersCount, badgeColor: 'bg-amber-500' },
    { id: 'inventory', label: 'Inventory & Stock', icon: Boxes, badge: lowStockCount, badgeColor: 'bg-red-500' },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'coupons', label: 'Coupons & Promos', icon: Tag },
    { id: 'reviews', label: 'Product Reviews', icon: Star, badge: pendingReviewsCount, badgeColor: 'bg-blue-500' },
    { id: 'settings', label: 'Store Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col antialiased text-gray-900">
      {/* Top Admin Navigation Bar */}
      <header className="bg-emerald-900 text-white sticky top-0 z-40 shadow-sm">
        <div className="px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-emerald-700 flex items-center justify-center font-bold text-white shadow-xs">
              <Store className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-black tracking-wider uppercase block text-emerald-300">
                Administration Portal
              </span>
              <span className="text-sm font-bold text-white">Imran General Store (PK)</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentMode('customer')}
              className="bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-1.5 rounded flex items-center gap-1.5 transition-colors border border-emerald-600"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Back to Storefront</span>
            </button>
            <div className="text-right hidden sm:block">
              <span className="text-xs font-bold text-white block">Imran Nazir</span>
              <span className="text-[10px] text-emerald-300 block">Store Owner (Super Admin)</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-60 bg-white border-r border-gray-200 shrink-0 hidden md:flex flex-col justify-between p-3">
          <nav className="space-y-1">
            <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Management Menu
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = adminTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setAdminTab(item.id as any)}
                  className={`w-full text-left px-3 py-2 rounded-md text-xs font-semibold flex items-center justify-between transition-colors ${
                    isActive
                      ? 'bg-emerald-700 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && item.badge > 0 && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                        isActive
                          ? 'bg-emerald-800 text-white'
                          : `${item.badgeColor || 'bg-gray-200'} text-white`
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-xs text-gray-500 space-y-1">
            <p className="font-bold text-gray-800">Store Status: Active</p>
            <p className="text-[11px]">Free delivery over Rs. {settings.freeShippingThreshold.toLocaleString()}</p>
          </div>
        </aside>

        {/* Mobile Horizontal Tabs */}
        <div className="md:hidden bg-white border-b border-gray-200 p-2 overflow-x-auto flex gap-1.5 shrink-0">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = adminTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setAdminTab(item.id as any)}
                className={`px-3 py-1.5 rounded text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 ${
                  isActive ? 'bg-emerald-700 text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
