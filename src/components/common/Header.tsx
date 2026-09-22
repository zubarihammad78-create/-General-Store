import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronDown,
  Truck,
  ShieldCheck,
  Package,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Store,
  ChevronRight,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    customerView,
    setCustomerView,
    currentMode,
    setCurrentMode,
    cartCount,
    subtotal,
    setIsCartDrawerOpen,
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    categories,
    products,
    goToProduct,
    isLoggedIn,
    user,
    logout,
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAllCategoriesOpen, setIsAllCategoriesOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);
  const allCategoriesRef = useRef<HTMLDivElement>(null);

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearchResults(false);
      }
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setIsAccountDropdownOpen(false);
      }
      if (allCategoriesRef.current && !allCategoriesRef.current.contains(e.target as Node)) {
        setIsAllCategoriesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter products for live search preview
  const liveSearchResults = searchQuery.trim()
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSearchResults(false);
    setCustomerView('shop');
  };

  const navCategories = [
    { name: 'Personal Care', filter: 'Personal Care' },
    { name: 'Beauty & Cosmetics', filter: 'Cosmetics' },
    { name: 'Hair Care', filter: 'Hair Care' },
    { name: 'Skin Care', filter: 'Skin Care' },
    { name: 'Tea & Coffee', filter: 'Tea & Coffee' },
    { name: 'Household', filter: 'Household' },
    { name: 'Cleaning', filter: 'Cleaning' },
    { name: 'Daily Essentials', filter: 'Daily Essentials' },
    { name: 'Groceries', filter: 'Daily Essentials' },
  ];

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-40 shadow-xs">
      {/* 1. TOP BAR (Slim, clean, non-intrusive) */}
      <div className="bg-gray-100 border-b border-gray-200 text-gray-600 text-[11px] py-1 px-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Left announcements */}
          <div className="flex items-center gap-2 sm:gap-4 overflow-hidden whitespace-nowrap">
            <span className="flex items-center gap-1.5 text-gray-700 font-medium">
              <Truck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <span>Free Delivery on orders over Rs. 2,000</span>
            </span>
            <span className="text-gray-300 hidden sm:inline">|</span>
            <span className="hidden md:flex items-center gap-1.5 text-gray-600">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <span>Cash on Delivery Available Nationwide</span>
            </span>
          </div>

          {/* Right quick utility links */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0 font-medium">
            <button
              onClick={() => setCustomerView('contact')}
              className="hover:text-emerald-700 transition-colors hidden sm:flex items-center gap-1"
            >
              <HelpCircle className="w-3 h-3 text-gray-400" />
              <span>Help Center</span>
            </button>
            <span className="text-gray-300 hidden sm:inline">|</span>
            <button
              onClick={() => setCustomerView('order-tracking')}
              className="hover:text-emerald-700 transition-colors flex items-center gap-1 text-emerald-800 font-semibold"
            >
              <Package className="w-3 h-3 text-emerald-700" />
              <span>Track Order</span>
            </button>
            <span className="text-gray-300">|</span>
            {/* Admin portal toggle */}
            <button
              onClick={() => setCurrentMode(currentMode === 'customer' ? 'admin' : 'customer')}
              className="bg-emerald-700 hover:bg-emerald-800 text-white px-2 py-0.5 rounded text-[10px] font-bold transition-colors flex items-center gap-1"
              title="Store Owner Portal"
            >
              <LayoutDashboard className="w-2.5 h-2.5" />
              <span>{currentMode === 'customer' ? 'Admin' : 'Storefront'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3">
        <div className="flex items-center justify-between gap-3 sm:gap-6">
          {/* Mobile Menu Icon */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-1.5 text-gray-700 hover:bg-gray-100 rounded-md"
            aria-label="Open Mobile Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo (Clean professional e-commerce style) */}
          <button
            onClick={() => {
              setCustomerView('home');
              setSearchQuery('');
            }}
            className="text-left flex items-center gap-2 sm:gap-2.5 group shrink-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-md bg-emerald-700 text-white flex items-center justify-center font-bold text-lg shadow-xs group-hover:bg-emerald-800 transition-colors">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-emerald-800">
                  IMRAN
                </span>
                <span className="font-bold text-base sm:text-lg tracking-normal text-gray-900">
                  GENERAL STORE
                </span>
              </div>
              <p className="text-[9px] sm:text-[10px] text-gray-400 font-semibold tracking-wider uppercase -mt-1 hidden xs:block">
                Online Shopping Pakistan
              </p>
            </div>
          </button>

          {/* Center Search Bar */}
          <div ref={searchRef} className="hidden lg:flex flex-1 max-w-2xl relative">
            <form onSubmit={handleSearchSubmit} className="w-full flex">
              <div className="relative w-full flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSearchResults(true);
                  }}
                  onFocus={() => setShowSearchResults(true)}
                  placeholder="Search for products, brands and categories..."
                  className="w-full pl-4 pr-16 py-2 text-sm bg-gray-50 border border-gray-300 rounded-l-md focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:border-emerald-600 transition-all text-gray-800 placeholder-gray-400"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 text-gray-400 hover:text-gray-600 text-xs"
                  >
                    ✕
                  </button>
                )}
              </div>
              <button
                type="submit"
                className="bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2 text-sm font-bold rounded-r-md transition-colors flex items-center gap-1.5 shrink-0"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </form>

            {/* Live Search Suggestions Dropdown */}
            {showSearchResults && searchQuery.trim() && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-md shadow-xl border border-gray-200 py-1.5 z-50">
                <div className="px-3 py-1 text-[11px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 flex justify-between items-center">
                  <span>Search Suggestions</span>
                  <span>Press Enter</span>
                </div>
                {liveSearchResults.length > 0 ? (
                  <div>
                    {liveSearchResults.map((prod) => (
                      <button
                        key={prod.id}
                        type="button"
                        onClick={() => {
                          goToProduct(prod.id);
                          setShowSearchResults(false);
                        }}
                        className="w-full px-3 py-2 text-left hover:bg-emerald-50/70 flex items-center gap-3 transition-colors border-b border-gray-50 last:border-0"
                      >
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-9 h-9 object-contain rounded border border-gray-200 shrink-0 bg-white"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-gray-900 truncate">
                            {prod.name}
                          </p>
                          <p className="text-[10px] text-gray-500">
                            {prod.brand} &bull; {prod.category}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-xs font-bold text-emerald-800">
                            Rs. {prod.salePrice}
                          </span>
                          {prod.price > prod.salePrice && (
                            <span className="text-[10px] text-gray-400 line-through block">
                              Rs. {prod.price}
                            </span>
                          )}
                        </div>
                      </button>
                    ))}
                    <div className="p-2 border-t border-gray-100 text-center">
                      <button
                        type="button"
                        onClick={() => {
                          setCustomerView('shop');
                          setShowSearchResults(false);
                        }}
                        className="text-xs font-bold text-emerald-700 hover:underline"
                      >
                        View all products matching &ldquo;{searchQuery}&rdquo; &rarr;
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 text-center text-xs text-gray-500">
                    No products found matching &ldquo;{searchQuery}&rdquo;. Try another term.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Action Icons: Login / Account, Orders, Cart */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* 1. Account / Login */}
            <div ref={accountRef} className="relative">
              <button
                onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
                className="flex items-center gap-1.5 sm:gap-2 text-gray-700 hover:text-emerald-700 py-1 transition-colors"
                aria-label="Account"
              >
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 border border-gray-200">
                  <User className="w-4 h-4" />
                </div>
                <div className="hidden sm:block text-left text-xs leading-tight">
                  <div className="text-[10px] text-gray-400">
                    {isLoggedIn ? 'Hello,' : 'Welcome'}
                  </div>
                  <div className="font-bold text-gray-900 truncate max-w-[85px]">
                    {isLoggedIn && user ? user.name.split(' ')[0] : 'Sign In'}
                  </div>
                </div>
                <ChevronDown className="w-3 h-3 text-gray-400 hidden sm:block" />
              </button>

              {/* Account Dropdown */}
              {isAccountDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-xl border border-gray-200 py-1.5 z-50 text-xs">
                  {isLoggedIn && user ? (
                    <>
                      <div className="px-3.5 py-2 border-b border-gray-100 bg-gray-50/70">
                        <p className="font-bold text-gray-900 truncate">{user.name}</p>
                        <p className="text-[10px] text-gray-500 truncate">{user.email}</p>
                      </div>
                      <button
                        onClick={() => {
                          setCustomerView('account');
                          setIsAccountDropdownOpen(false);
                        }}
                        className="w-full text-left px-3.5 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-800 font-medium"
                      >
                        My Account Dashboard
                      </button>
                      <button
                        onClick={() => {
                          setCustomerView('my-orders');
                          setIsAccountDropdownOpen(false);
                        }}
                        className="w-full text-left px-3.5 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-800 font-medium"
                      >
                        Orders &amp; History
                      </button>
                      <button
                        onClick={() => {
                          setCustomerView('order-tracking');
                          setIsAccountDropdownOpen(false);
                        }}
                        className="w-full text-left px-3.5 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-800 font-medium"
                      >
                        Track Order
                      </button>
                      <div className="border-t border-gray-100 my-1"></div>
                      <button
                        onClick={() => {
                          logout();
                          setIsAccountDropdownOpen(false);
                        }}
                        className="w-full text-left px-3.5 py-1.5 text-red-600 hover:bg-red-50 flex items-center gap-1.5 font-medium"
                      >
                        <LogOut className="w-3.5 h-3.5" /> Logout
                      </button>
                    </>
                  ) : (
                    <div className="p-3">
                      <button
                        onClick={() => {
                          setCustomerView('login');
                          setIsAccountDropdownOpen(false);
                        }}
                        className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-1.5 rounded text-xs text-center"
                      >
                        Sign In
                      </button>
                      <p className="text-[10px] text-gray-500 text-center mt-2">
                        New Customer?{' '}
                        <button
                          onClick={() => {
                            setCustomerView('register');
                            setIsAccountDropdownOpen(false);
                          }}
                          className="text-emerald-700 font-bold hover:underline"
                        >
                          Register
                        </button>
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 2. Orders */}
            <button
              onClick={() => setCustomerView(isLoggedIn ? 'my-orders' : 'login')}
              className="hidden md:flex flex-col text-left text-xs leading-tight text-gray-700 hover:text-emerald-700 transition-colors"
            >
              <span className="text-[10px] text-gray-400">Track &amp; View</span>
              <span className="font-bold text-gray-900">Orders</span>
            </button>

            {/* 3. Cart Button with: "Cart", "Rs. 630", small item count badge */}
            <button
              onClick={() => {
                setCustomerView('cart');
                setIsCartDrawerOpen(false);
              }}
              className="flex items-center gap-2 sm:gap-2.5 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 text-emerald-900 px-2.5 sm:px-3 py-1.5 rounded-md transition-all relative group"
              aria-label="Shopping Cart"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 text-emerald-700" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2.5 bg-emerald-700 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="text-left leading-tight hidden xs:block">
                <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                  Cart
                </div>
                <div className="text-xs font-black text-gray-900 font-mono">
                  Rs. {subtotal.toLocaleString()}
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar Row (Under logo on mobile) */}
        <div className="mt-2.5 lg:hidden">
          <form onSubmit={handleSearchSubmit} className="flex w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products, brands and categories..."
              className="w-full pl-3 pr-2 py-1.5 text-xs bg-gray-50 border border-gray-300 rounded-l-md focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600 text-gray-900"
            />
            <button
              type="submit"
              className="bg-emerald-700 text-white px-3.5 py-1.5 text-xs font-bold rounded-r-md flex items-center justify-center"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* 3. HORIZONTAL CATEGORY NAVIGATION BAR (Marketplace style) */}
      <div className="bg-emerald-800 text-white hidden lg:block border-t border-emerald-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center text-xs font-semibold">
            {/* "All Categories" dropdown toggle */}
            <div ref={allCategoriesRef} className="relative">
              <button
                onClick={() => setIsAllCategoriesOpen(!isAllCategoriesOpen)}
                className="bg-emerald-950 hover:bg-emerald-900 text-white px-4 py-2.5 flex items-center gap-2 transition-colors font-bold uppercase tracking-wider text-[11px]"
              >
                <Menu className="w-4 h-4 text-emerald-300" />
                <span>All Categories</span>
                <ChevronDown className="w-3 h-3 text-emerald-300" />
              </button>

              {isAllCategoriesOpen && (
                <div className="absolute top-full left-0 w-60 bg-white text-gray-800 shadow-2xl border border-gray-200 py-1.5 z-50 rounded-b-md">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setCategoryFilter(cat.name);
                        setCustomerView('shop');
                        setIsAllCategoriesOpen(false);
                      }}
                      className="w-full text-left px-3.5 py-2 hover:bg-emerald-50 hover:text-emerald-800 flex items-center justify-between text-xs font-medium border-b border-gray-50 last:border-0"
                    >
                      <span>{cat.name}</span>
                      <span className="text-[10px] text-gray-400">{cat.productCount}</span>
                    </button>
                  ))}
                  <div className="p-2 border-t border-gray-100 text-center bg-gray-50">
                    <button
                      onClick={() => {
                        setCategoryFilter('All');
                        setCustomerView('shop');
                        setIsAllCategoriesOpen(false);
                      }}
                      className="text-xs font-bold text-emerald-700 hover:underline"
                    >
                      View All Catalog &rarr;
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Horizontal Categories Links */}
            <div className="flex items-center space-x-1 pl-2">
              {navCategories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => {
                    setCategoryFilter(cat.filter);
                    setCustomerView('shop');
                  }}
                  className={`px-3 py-2.5 rounded-none hover:bg-emerald-700/80 transition-colors whitespace-nowrap ${
                    categoryFilter === cat.filter && customerView === 'shop'
                      ? 'bg-emerald-900 text-emerald-200'
                      : 'text-emerald-50'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Right link: "View All Categories" */}
          <button
            onClick={() => {
              setCategoryFilter('All');
              setCustomerView('shop');
            }}
            className="text-[11px] font-bold text-emerald-200 hover:text-white uppercase tracking-wider flex items-center gap-1 transition-colors"
          >
            <span>View All Categories</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Mobile Horizontal Scrollable Categories Bar */}
      <div className="lg:hidden bg-emerald-800 text-white px-3 py-1.5 overflow-x-auto scrollbar-none flex items-center gap-2 text-xs font-medium whitespace-nowrap">
        <button
          onClick={() => {
            setCategoryFilter('All');
            setCustomerView('shop');
          }}
          className="bg-emerald-950 px-2.5 py-1 rounded text-[11px] font-bold shrink-0"
        >
          All
        </button>
        {navCategories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => {
              setCategoryFilter(cat.filter);
              setCustomerView('shop');
            }}
            className="px-2 py-1 hover:bg-emerald-700 rounded text-[11px] text-emerald-100 shrink-0"
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Mobile Drawer Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50 flex">
          <div className="w-4/5 max-w-xs bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded bg-emerald-700 text-white flex items-center justify-center font-bold text-sm">
                    IG
                  </div>
                  <span className="font-bold text-gray-900 text-sm">Imran General Store</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 text-gray-400 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Customer status in drawer */}
              <div className="bg-gray-50 p-3 rounded-lg mb-4 text-xs">
                {isLoggedIn && user ? (
                  <div>
                    <p className="font-bold text-gray-900">{user.name}</p>
                    <p className="text-gray-500 text-[11px]">{user.email}</p>
                    <div className="mt-2 pt-2 border-t border-gray-200 flex gap-2">
                      <button
                        onClick={() => {
                          setCustomerView('account');
                          setIsMobileMenuOpen(false);
                        }}
                        className="text-emerald-700 font-bold"
                      >
                        Account
                      </button>
                      <span>&bull;</span>
                      <button
                        onClick={() => {
                          setCustomerView('my-orders');
                          setIsMobileMenuOpen(false);
                        }}
                        className="text-emerald-700 font-bold"
                      >
                        Orders
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <span>Welcome Shopper!</span>
                    <button
                      onClick={() => {
                        setCustomerView('login');
                        setIsMobileMenuOpen(false);
                      }}
                      className="bg-emerald-700 text-white px-3 py-1 rounded font-bold text-[11px]"
                    >
                      Login
                    </button>
                  </div>
                )}
              </div>

              {/* Drawer Categories */}
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 px-2 py-1">
                  Shop By Category
                </p>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setCategoryFilter(cat.name);
                      setCustomerView('shop');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-emerald-50 hover:text-emerald-800 rounded font-medium flex items-center justify-between"
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] text-gray-400">{cat.productCount}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Admin & Track order in Drawer */}
            <div className="p-4 border-t border-gray-200 bg-gray-50 space-y-2 text-xs">
              <button
                onClick={() => {
                  setCustomerView('order-tracking');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-2 bg-white border border-gray-300 rounded font-semibold text-gray-700 flex items-center justify-center gap-1.5"
              >
                <Package className="w-3.5 h-3.5 text-emerald-700" />
                Track Order
              </button>
              <button
                onClick={() => {
                  setCurrentMode(currentMode === 'customer' ? 'admin' : 'customer');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-2 bg-emerald-700 text-white rounded font-bold text-center"
              >
                Switch to Admin Portal
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
