import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../common/ProductCard';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  BadgeCheck,
  Clock,
  Flame,
  ChevronRight,
  ShoppingBag,
  Zap,
  Tag,
  Star,
  ChevronLeft,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const {
    products,
    categories,
    setCustomerView,
    setCategoryFilter,
    goToProduct,
    showToast,
  } = useStore();

  // Flash Sale Countdown State (02 : 15 : 42)
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 15,
    seconds: 42,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 2, minutes: 15, seconds: 42 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Filter products for each marketplace section
  // Flash sale products (5-6 products with noticeable discounts)
  const flashSaleProducts = products.filter((p) => p.discountPercent >= 10).slice(0, 6);

  // Popular products (10 products for a rich 2-row 5-column grid)
  const popularProducts = products.slice(0, 10);

  // Best sellers (5 products)
  const bestSellerProducts = products.filter((p) => p.isBestSeller).slice(0, 5);

  // New arrivals (5 products)
  const newArrivalProducts = products.filter((p) => p.isNewArrival || p.discountPercent > 5).slice(0, 5);

  // Compact category items with icons & representative imagery
  const categoryTiles = [
    {
      id: 'cat-personal-care',
      name: 'Personal Care',
      emoji: '🧼',
      image: 'https://images.unsplash.com/photo-1607006314633-8a07f66a2a06?w=300&auto=format&fit=crop&q=80',
      count: '28+ items',
    },
    {
      id: 'cat-hair-care',
      name: 'Hair Care',
      emoji: '🧴',
      image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=300&auto=format&fit=crop&q=80',
      count: '22+ items',
    },
    {
      id: 'cat-cosmetics',
      name: 'Beauty & Cosmetics',
      emoji: '💄',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&auto=format&fit=crop&q=80',
      count: '18+ items',
    },
    {
      id: 'cat-skin-care',
      name: 'Skin Care',
      emoji: '✨',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&auto=format&fit=crop&q=80',
      count: '30+ items',
    },
    {
      id: 'cat-tea-coffee',
      name: 'Tea & Coffee',
      emoji: '☕',
      image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=300&auto=format&fit=crop&q=80',
      count: '26+ items',
    },
    {
      id: 'cat-cleaning',
      name: 'Cleaning',
      emoji: '🧹',
      image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=300&auto=format&fit=crop&q=80',
      count: '24+ items',
    },
    {
      id: 'cat-household',
      name: 'Household',
      emoji: '🏠',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&auto=format&fit=crop&q=80',
      count: '34+ items',
    },
    {
      id: 'cat-daily-essentials',
      name: 'Daily Essentials',
      emoji: '🛒',
      image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=300&auto=format&fit=crop&q=80',
      count: '45+ items',
    },
  ];

  const heroSidebarCategories = [
    { name: 'Personal Care', emoji: '🧼' },
    { name: 'Hair Care', emoji: '🧴' },
    { name: 'Beauty & Cosmetics', emoji: '💄' },
    { name: 'Skin Care', emoji: '✨' },
    { name: 'Tea & Coffee', emoji: '☕' },
    { name: 'Spices & Pantry', emoji: '🌶️' },
    { name: 'Cleaning & Wash', emoji: '🧹' },
    { name: 'Household Goods', emoji: '🏠' },
    { name: 'Daily Essentials', emoji: '🛒' },
  ];

  return (
    <div className="bg-[#f5f5f5] min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 pt-3 sm:pt-4 space-y-5 sm:space-y-6">
        
        {/* ==================================================
            1. HOME PAGE HERO (3-COLUMN MARKETPLACE LAYOUT)
            Left: Category Sidebar (220-250px)
            Center: Main Promo Banner (55-60% width)
            Right: Two Stacked Promo Cards
           ================================================== */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 items-stretch min-w-0">
          {/* LEFT: Category Sidebar (Desktop only) */}
          <div className="hidden lg:block lg:col-span-3 bg-white rounded-lg border border-gray-200 shadow-xs overflow-hidden flex flex-col justify-between">
            <div className="bg-gray-50/80 px-3.5 py-2.5 border-b border-gray-200">
              <h3 className="text-xs font-black text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                Shop by Category
              </h3>
            </div>
            <div className="divide-y divide-gray-100 flex-1">
              {heroSidebarCategories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => {
                    setCategoryFilter(cat.name);
                    setCustomerView('shop');
                  }}
                  className="w-full px-3.5 py-2 text-left text-xs font-semibold text-gray-700 hover:text-emerald-700 hover:bg-emerald-50/60 flex items-center justify-between transition-colors group"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-sm">{cat.emoji}</span>
                    <span>{cat.name}</span>
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                </button>
              ))}
            </div>
            <div className="p-2 border-t border-gray-100 bg-gray-50/50 text-center">
              <button
                onClick={() => {
                  setCategoryFilter('All');
                  setCustomerView('shop');
                }}
                className="text-[11px] font-bold text-emerald-700 hover:underline"
              >
                View All Categories &rarr;
              </button>
            </div>
          </div>

          {/* CENTER: Main Promotional Banner (55-60% width on desktop) */}
          <div className="lg:col-span-6 min-w-0 bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-800 rounded-lg p-5 sm:p-7 text-white shadow-xs relative overflow-hidden flex flex-col justify-between min-h-[280px] sm:min-h-[340px]">
            {/* Background geometric accents */}
            <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-emerald-600/30 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute top-0 right-0 w-48 h-48 bg-teal-500/20 rounded-full blur-xl pointer-events-none" />

            <div className="relative z-10 max-w-md space-y-2.5 sm:space-y-3">
              <div className="inline-flex items-center gap-1.5 bg-emerald-900/60 border border-emerald-400/30 px-2.5 py-0.5 rounded-full text-[11px] font-bold text-emerald-200">
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>UP TO 40% OFF THIS WEEK</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight text-white uppercase">
                Everyday Essentials <br />
                <span className="text-amber-300 font-extrabold">At Great Prices</span>
              </h1>

              <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed max-w-sm">
                Shop personal care, beauty, tea, household products and more with fast home delivery across Pakistan.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => {
                    setCategoryFilter('All');
                    setCustomerView('shop');
                  }}
                  className="bg-amber-400 hover:bg-amber-300 text-gray-900 font-extrabold px-6 py-2.5 rounded-md text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Shop Now</span>
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById('flash-sale-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-white/15 hover:bg-white/25 text-white font-semibold px-4 py-2.5 rounded-md text-xs transition-colors"
                >
                  View Deals
                </button>
              </div>
            </div>

            {/* Bottom mini trust highlight inside banner */}
            <div className="relative z-10 pt-4 mt-2 border-t border-emerald-600/50 flex items-center gap-4 text-[11px] text-emerald-100">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-300" /> 100% Genuine
              </span>
              <span>&bull;</span>
              <span className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-amber-300" /> Cash on Delivery
              </span>
            </div>
          </div>

          {/* RIGHT: Two Stacked Promotional Cards (Desktop & Tablet) */}
          <div className="lg:col-span-3 min-w-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3.5 sm:gap-4">
            {/* Card 1: Special Offers */}
            <div
              onClick={() => {
                setCategoryFilter('Personal Care');
                setCustomerView('shop');
              }}
              className="bg-white rounded-lg border border-gray-200 p-4 shadow-xs hover:border-emerald-600 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden group"
            >
              <div className="space-y-1">
                <span className="bg-red-100 text-red-700 text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">
                  Special Offers
                </span>
                <h4 className="font-extrabold text-gray-900 text-sm leading-snug pt-1 group-hover:text-emerald-700 transition-colors">
                  Personal Care &amp; Haircare Week
                </h4>
                <p className="text-[11px] text-gray-500">
                  Save up to 30% on Lux, Sunsilk, Parachute &amp; Nivea essentials.
                </p>
              </div>

              <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
                <span className="text-xs font-bold text-emerald-700 flex items-center gap-1 group-hover:underline">
                  Grab Deals <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="text-[11px] font-extrabold text-red-600 bg-red-50 px-2 py-0.5 rounded">
                  -30% OFF
                </span>
              </div>
            </div>

            {/* Card 2: Free Delivery */}
            <div
              onClick={() => {
                setCategoryFilter('All');
                setCustomerView('shop');
              }}
              className="bg-white rounded-lg border border-gray-200 p-4 shadow-xs hover:border-emerald-600 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden group"
            >
              <div className="space-y-1">
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded uppercase flex items-center gap-1 w-fit">
                  <Truck className="w-3 h-3" /> Free Delivery
                </span>
                <h4 className="font-extrabold text-gray-900 text-sm leading-snug pt-1 group-hover:text-emerald-700 transition-colors">
                  Orders Over Rs. 2,000
                </h4>
                <p className="text-[11px] text-gray-500">
                  Reliable Cash on Delivery service to Karachi, Lahore, Islamabad &amp; all cities.
                </p>
              </div>

              <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
                <span className="text-xs font-bold text-emerald-700 flex items-center gap-1 group-hover:underline">
                  Shop Catalog <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="text-[10px] text-gray-500 font-mono font-bold">
                  COD Available
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
            2. TRUST / SERVICE FEATURES (HORIZONTAL STRIP)
            🚚 Fast Delivery "Across Pakistan"
            💵 Cash on Delivery "Available Nationwide"
            ✓ Quality Products "Trusted Essentials"
            🔄 Easy Returns "Simple & Convenient"
           ================================================== */}
        <section className="bg-white rounded-lg border border-gray-200 shadow-xs p-3 sm:p-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
            <div className="flex items-center gap-3 p-1">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-xs sm:text-sm">Fast Delivery</h4>
                <p className="text-[11px] text-gray-500">Across Pakistan</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-1 sm:pl-4">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-xs sm:text-sm">Cash on Delivery</h4>
                <p className="text-[11px] text-gray-500">Available Nationwide</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-1 sm:pl-4 pt-3 sm:pt-0">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <BadgeCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-xs sm:text-sm">Quality Products</h4>
                <p className="text-[11px] text-gray-500">Trusted Essentials</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-1 sm:pl-4 pt-3 sm:pt-0">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-xs sm:text-sm">Easy Returns</h4>
                <p className="text-[11px] text-gray-500">Simple &amp; Convenient</p>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
            3. CATEGORY SECTION ("Shop by Category")
            Compact cards with Product/Category image, name, product count
           ================================================== */}
        <section id="categories-section" className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-4 bg-emerald-600 rounded-xs"></span>
              <h2 className="text-base sm:text-lg font-black text-gray-900 uppercase tracking-tight">
                Shop by Category
              </h2>
            </div>
            <button
              onClick={() => {
                setCategoryFilter('All');
                setCustomerView('shop');
              }}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 hover:underline"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 sm:gap-3">
            {categoryTiles.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setCategoryFilter(cat.name);
                  setCustomerView('shop');
                }}
                className="bg-white rounded-lg border border-gray-200 p-2.5 sm:p-3 text-center hover:border-emerald-600 hover:shadow-md transition-all group flex flex-col items-center justify-between"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gray-50 border border-gray-100 overflow-hidden p-1 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover rounded-full"
                    loading="lazy"
                  />
                </div>
                <h4 className="text-xs font-bold text-gray-800 group-hover:text-emerald-700 line-clamp-1 transition-colors">
                  {cat.name}
                </h4>
                <span className="text-[10px] text-gray-400 mt-0.5">{cat.count}</span>
              </button>
            ))}
          </div>
        </section>

        {/* ==================================================
            4. FLASH SALE / DEALS
            Countdown: 02 : 15 : 42
            Product cards in horizontal row (5-6 products on desktop)
           ================================================== */}
        <section
          id="flash-sale-section"
          className="bg-white rounded-lg border border-red-200/80 p-3.5 sm:p-5 shadow-xs space-y-3.5"
        >
          {/* Header with countdown */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2 border-b border-gray-100">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-1.5 text-red-600 font-black text-sm sm:text-base uppercase tracking-tight">
                <Flame className="w-5 h-5 fill-red-500 text-red-500 animate-pulse" />
                <span>Flash Sale</span>
              </div>
              <span className="text-gray-300 hidden sm:inline">|</span>
              {/* Countdown clock */}
              <div className="flex items-center gap-1 text-xs font-bold text-gray-700">
                <span className="text-gray-400 font-medium text-[11px] mr-1 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-red-500" /> Ends In:
                </span>
                <span className="bg-red-600 text-white px-2 py-0.5 rounded font-mono text-xs">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="font-bold text-red-600">:</span>
                <span className="bg-red-600 text-white px-2 py-0.5 rounded font-mono text-xs">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="font-bold text-red-600">:</span>
                <span className="bg-red-600 text-white px-2 py-0.5 rounded font-mono text-xs">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                setCategoryFilter('All');
                setCustomerView('shop');
              }}
              className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 hover:underline"
            >
              <span>See All Flash Deals</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 5-6 Product cards on desktop (2 cols on mobile) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 sm:gap-3">
            {flashSaleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* ==================================================
            5. PROMOTIONAL BANNER SECTION ("SPECIAL OFFERS")
            Marketplace-style 2-column banners:
            - UP TO 30% OFF - Personal Care Essentials
            - Tea & Coffee Deals - Save More on Everyday Favorites
           ================================================== */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {/* Banner 1 */}
          <div
            onClick={() => {
              setCategoryFilter('Personal Care');
              setCustomerView('shop');
            }}
            className="bg-gradient-to-r from-emerald-900 to-teal-800 rounded-lg p-4 sm:p-5 text-white shadow-xs cursor-pointer hover:shadow-md transition-all flex items-center justify-between group overflow-hidden relative"
          >
            <div className="space-y-1 z-10 max-w-[65%]">
              <span className="bg-amber-400 text-gray-900 text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">
                UP TO 30% OFF
              </span>
              <h3 className="text-sm sm:text-base font-black tracking-tight text-white mt-1">
                Personal Care Essentials
              </h3>
              <p className="text-[11px] text-emerald-100">
                Premium soaps, shampoos, moisturizing lotions &amp; deodorants.
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-300 group-hover:underline">
                  Shop Now <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden shrink-0 border-2 border-white/20 shadow-md">
              <img
                src="https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&auto=format&fit=crop&q=80"
                alt="Personal Care"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
          </div>

          {/* Banner 2 */}
          <div
            onClick={() => {
              setCategoryFilter('Tea & Coffee');
              setCustomerView('shop');
            }}
            className="bg-gradient-to-r from-amber-800 to-yellow-900 rounded-lg p-4 sm:p-5 text-white shadow-xs cursor-pointer hover:shadow-md transition-all flex items-center justify-between group overflow-hidden relative"
          >
            <div className="space-y-1 z-10 max-w-[65%]">
              <span className="bg-white text-amber-900 text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">
                PAKISTANI FAVORITES
              </span>
              <h3 className="text-sm sm:text-base font-black tracking-tight text-white mt-1">
                Tea &amp; Coffee Deals
              </h3>
              <p className="text-[11px] text-amber-100">
                Save more on Tapal Danedar, Lipton Yellow Label, and Nescafe Coffee.
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-200 group-hover:underline">
                  Explore Deals <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden shrink-0 border-2 border-white/20 shadow-md">
              <img
                src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=300&auto=format&fit=crop&q=80"
                alt="Tea and Coffee"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
          </div>
        </section>

        {/* ==================================================
            6. PRODUCT GRID: "POPULAR PRODUCTS"
            5-column desktop product grid with lots of products!
            (Lux Soap, Herbal Shampoo, Face Wash, Moisturizing Cream,
             Green Tea, Instant Coffee, Hair Conditioner, Dishwashing Liquid,
             Laundry Detergent, Body Lotion)
           ================================================== */}
        <section className="space-y-3.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-4 bg-emerald-600 rounded-xs"></span>
              <div>
                <h2 className="text-base sm:text-lg font-black text-gray-900 uppercase tracking-tight">
                  Popular Products
                </h2>
                <p className="text-[11px] text-gray-500">
                  Most frequently purchased FMCG and grocery essentials in Pakistan
                </p>
              </div>
            </div>

            {/* Category Quick Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none text-xs">
              {['All', 'Personal Care', 'Skin Care', 'Hair Care', 'Tea & Coffee', 'Cleaning'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setCategoryFilter(cat);
                    setCustomerView('shop');
                  }}
                  className="px-2.5 py-1 bg-white hover:bg-emerald-50 border border-gray-200 rounded-full font-semibold text-gray-700 text-[11px] whitespace-nowrap transition-colors"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* 5-Column Desktop Grid (2 cols mobile, 3 tablet, 5 desktop) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-3.5">
            {popularProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Load more / explore catalog banner */}
          <div className="pt-2 text-center">
            <button
              onClick={() => {
                setCategoryFilter('All');
                setCustomerView('shop');
              }}
              className="bg-white hover:bg-gray-50 border border-gray-300 hover:border-emerald-600 text-gray-800 hover:text-emerald-700 font-bold px-6 py-2.5 rounded-md text-xs transition-all shadow-xs"
            >
              Browse Full Online Catalog ({products.length} Products) &rarr;
            </button>
          </div>
        </section>

        {/* ==================================================
            7. BEST SELLERS
            Horizontal product row / 5-column grid with "View All"
           ================================================== */}
        <section className="bg-white rounded-lg border border-gray-200 p-3.5 sm:p-4 shadow-xs space-y-3.5">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-4 bg-amber-500 rounded-xs"></span>
              <h2 className="text-base sm:text-lg font-black text-gray-900 uppercase tracking-tight">
                Best Sellers
              </h2>
            </div>
            <button
              onClick={() => {
                setCategoryFilter('All');
                setCustomerView('shop');
              }}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 hover:underline"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-3.5">
            {bestSellerProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* ==================================================
            8. NEW ARRIVALS
            5 products per row on desktop
           ================================================== */}
        <section className="space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-4 bg-teal-600 rounded-xs"></span>
              <h2 className="text-base sm:text-lg font-black text-gray-900 uppercase tracking-tight">
                New Arrivals
              </h2>
            </div>
            <button
              onClick={() => {
                setCategoryFilter('All');
                setCustomerView('shop');
              }}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 hover:underline"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-3.5">
            {newArrivalProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};
