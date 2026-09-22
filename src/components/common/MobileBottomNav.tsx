import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Home, Grid, Search, ShoppingCart, User } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { customerView, setCustomerView, cartCount, isLoggedIn } = useStore();

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg px-2 pt-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))] flex items-center justify-around text-gray-600"
      aria-label="Mobile Navigation"
    >
      {/* Home */}
      <button
        onClick={() => setCustomerView('home')}
        className={`flex flex-col items-center justify-center p-1 min-w-[56px] transition-colors ${
          customerView === 'home' ? 'text-emerald-700 font-bold' : 'text-gray-500'
        }`}
      >
        <Home className="w-5 h-5" />
        <span className="text-[10px] mt-0.5">Home</span>
      </button>

      {/* Categories */}
      <button
        onClick={() => {
          setCustomerView('shop');
        }}
        className={`flex flex-col items-center justify-center p-1 min-w-[56px] transition-colors ${
          customerView === 'shop' ? 'text-emerald-700 font-bold' : 'text-gray-500'
        }`}
      >
        <Grid className="w-5 h-5" />
        <span className="text-[10px] mt-0.5">Categories</span>
      </button>

      {/* Search */}
      <button
        onClick={() => {
          setCustomerView('shop');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="flex flex-col items-center justify-center p-1 min-w-[56px] transition-colors text-gray-500 hover:text-emerald-700"
      >
        <Search className="w-5 h-5" />
        <span className="text-[10px] mt-0.5">Search</span>
      </button>

      {/* Cart with Badge */}
      <button
        onClick={() => setCustomerView('cart')}
        className={`flex flex-col items-center justify-center p-1 min-w-[56px] transition-colors relative ${
          customerView === 'cart' ? 'text-emerald-700 font-bold' : 'text-gray-500'
        }`}
      >
        <div className="relative">
          <ShoppingCart className="w-5 h-5" />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-2.5 bg-emerald-700 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
              {cartCount}
            </span>
          )}
        </div>
        <span className="text-[10px] mt-0.5">Cart</span>
      </button>

      {/* Account */}
      <button
        onClick={() => setCustomerView(isLoggedIn ? 'account' : 'login')}
        className={`flex flex-col items-center justify-center p-1 min-w-[56px] transition-colors ${
          customerView === 'account' || customerView === 'login' || customerView === 'register'
            ? 'text-emerald-700 font-bold'
            : 'text-gray-500'
        }`}
      >
        <User className="w-5 h-5" />
        <span className="text-[10px] mt-0.5">{isLoggedIn ? 'Account' : 'Login'}</span>
      </button>
    </nav>
  );
};
