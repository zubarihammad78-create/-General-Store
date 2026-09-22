import React, { useState, useMemo } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../common/ProductCard';
import {
  Filter,
  X,
  Star,
  Check,
  RotateCcw,
  SlidersHorizontal,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export const ShopPage: React.FC = () => {
  const {
    products,
    categories,
    categoryFilter,
    setCategoryFilter,
    searchQuery,
    setSearchQuery,
    setCustomerView,
  } = useStore();

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(1500);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  // Extract all unique brands
  const allBrands = useMemo(() => {
    const brandSet = new Set<string>();
    products.forEach((p) => brandSet.add(p.brand));
    return Array.from(brandSet).sort();
  }, [products]);

  // Handle brand toggle
  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
    setCurrentPage(1);
  };

  // Reset all filters
  const resetFilters = () => {
    setCategoryFilter('All');
    setSelectedBrands([]);
    setMaxPrice(1500);
    setInStockOnly(false);
    setMinRating(0);
    setSearchQuery('');
    setSortBy('featured');
    setCurrentPage(1);
  };

  // Filter and Sort logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category
        if (categoryFilter !== 'All' && p.category !== categoryFilter) {
          return false;
        }
        // Search
        if (
          searchQuery.trim() &&
          !p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !p.brand.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !p.category.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          return false;
        }
        // Brand
        if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) {
          return false;
        }
        // Price
        if (p.salePrice > maxPrice) {
          return false;
        }
        // In stock
        if (inStockOnly && p.stock <= 0) {
          return false;
        }
        // Rating
        if (minRating > 0 && p.rating < minRating) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.salePrice - b.salePrice;
        if (sortBy === 'price-high') return b.salePrice - a.salePrice;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return 0; // featured default
      });
  }, [
    products,
    categoryFilter,
    searchQuery,
    selectedBrands,
    maxPrice,
    inStockOnly,
    minRating,
    sortBy,
  ]);

  // Paginated slices
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  return (
    <div className="bg-[#f5f5f5] min-h-screen py-4 sm:py-6">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 space-y-4">
        {/* Breadcrumb & Header Row */}
        <div className="bg-white rounded-lg border border-gray-200 p-3.5 sm:p-4 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            {/* Breadcrumb: "Home > Shop" */}
            <div className="text-xs text-gray-500 mb-1 flex items-center gap-1.5">
              <button
                onClick={() => setCustomerView('home')}
                className="hover:text-emerald-700 hover:underline"
              >
                Home
              </button>
              <span>&gt;</span>
              <button
                onClick={() => {
                  setCategoryFilter('All');
                  setCurrentPage(1);
                }}
                className={`hover:text-emerald-700 ${
                  categoryFilter === 'All' ? 'font-bold text-gray-900' : 'hover:underline'
                }`}
              >
                Shop
              </button>
              {categoryFilter !== 'All' && (
                <>
                  <span>&gt;</span>
                  <span className="text-emerald-700 font-bold">{categoryFilter}</span>
                </>
              )}
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              {categoryFilter === 'All' ? 'All Products' : categoryFilter}
            </h1>
          </div>

          {/* Search/Sort Controls & Mobile Filter Toggle */}
          <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
            <button
              onClick={() => setIsMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 bg-gray-50 border border-gray-300 px-3 py-1.5 rounded-md text-xs font-semibold text-gray-700 shadow-xs"
            >
              <Filter className="w-3.5 h-3.5 text-emerald-700" />
              <span>Filters ({filteredProducts.length})</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 font-medium hidden sm:inline">Sort:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="bg-gray-50 hover:bg-white border border-gray-300 text-gray-800 text-xs font-semibold rounded-md pl-3 pr-8 py-1.5 focus:outline-none focus:ring-1 focus:ring-emerald-600 appearance-none shadow-xs cursor-pointer"
                >
                  <option value="featured">Best Match</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                  <option value="name">Product Name (A - Z)</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-2.5 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Layout: LEFT SIDEBAR + RIGHT PRODUCT GRID */}
        <div className="flex flex-col lg:flex-row gap-4 items-start">
          {/* ================= LEFT SIDEBAR ================= */}
          <aside
            className={`fixed inset-y-0 left-0 z-50 w-72 bg-white p-5 shadow-2xl lg:shadow-xs lg:static lg:w-60 xl:w-64 lg:p-4 lg:block rounded-none lg:rounded-lg border-r lg:border border-gray-200 overflow-y-auto transition-transform duration-200 shrink-0 ${
              isMobileFiltersOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
            }`}
          >
            <div className="space-y-4">
              {/* Mobile Drawer Header */}
              <div className="flex items-center justify-between lg:hidden border-b border-gray-200 pb-2.5">
                <span className="text-xs font-bold text-gray-900 flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-emerald-700" />
                  Filter Products
                </span>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="p-1 text-gray-500 hover:text-gray-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Reset All Filters */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-gray-900">
                  Filters
                </span>
                <button
                  onClick={resetFilters}
                  className="text-[11px] text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1 hover:underline"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>
              </div>

              {/* Active Search notification badge */}
              {searchQuery && (
                <div className="bg-emerald-50 border border-emerald-200 p-2 rounded text-xs flex items-center justify-between">
                  <span className="text-emerald-900 truncate text-[11px]">
                    &ldquo;{searchQuery}&rdquo;
                  </span>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-emerald-700 hover:text-emerald-900 font-bold"
                  >
                    ✕
                  </button>
                </div>
              )}

              {/* 1. Categories */}
              <div className="border-t border-gray-100 pt-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-gray-900 mb-2">
                  Categories
                </h3>
                <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                  <button
                    onClick={() => {
                      setCategoryFilter('All');
                      setCurrentPage(1);
                    }}
                    className={`w-full text-left px-2 py-1.5 rounded text-xs font-semibold transition-colors flex items-center justify-between ${
                      categoryFilter === 'All'
                        ? 'bg-emerald-700 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span>All Categories</span>
                    <span className="text-[10px] opacity-80">({products.length})</span>
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setCategoryFilter(cat.name);
                        setCurrentPage(1);
                      }}
                      className={`w-full text-left px-2 py-1.5 rounded text-xs font-semibold transition-colors flex items-center justify-between ${
                        categoryFilter === cat.name
                          ? 'bg-emerald-700 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span className="truncate">{cat.name}</span>
                      <span className="text-[10px] opacity-75">
                        ({products.filter((p) => p.category === cat.name).length})
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Price Filter */}
              <div className="border-t border-gray-100 pt-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-gray-900 mb-2 flex items-center justify-between">
                  <span>Price Range</span>
                  <span className="text-emerald-700 font-black">Rs. {maxPrice}</span>
                </h3>
                <input
                  type="range"
                  min="100"
                  max="1500"
                  step="50"
                  value={maxPrice}
                  onChange={(e) => {
                    setMaxPrice(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="w-full accent-emerald-700 h-1.5 bg-gray-200 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-400 mt-1 font-semibold">
                  <span>Rs. 100</span>
                  <span>Rs. 750</span>
                  <span>Rs. 1,500</span>
                </div>
              </div>

              {/* 3. Brand Filter */}
              <div className="border-t border-gray-100 pt-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-gray-900 mb-2">
                  Brand
                </h3>
                <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                  {allBrands.map((brand) => {
                    const isChecked = selectedBrands.includes(brand);
                    return (
                      <label
                        key={brand}
                        className="flex items-center gap-2 text-xs text-gray-700 hover:text-gray-900 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleBrand(brand)}
                          className="rounded text-emerald-700 focus:ring-emerald-600 h-3.5 w-3.5 border-gray-300"
                        />
                        <span className="truncate">{brand}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* 4. Availability Filter */}
              <div className="border-t border-gray-100 pt-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-gray-900 mb-2">
                  Availability
                </h3>
                <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => {
                      setInStockOnly(e.target.checked);
                      setCurrentPage(1);
                    }}
                    className="rounded text-emerald-700 focus:ring-emerald-600 h-3.5 w-3.5 border-gray-300"
                  />
                  <span>In Stock Only</span>
                </label>
              </div>

              {/* 5. Customer Rating */}
              <div className="border-t border-gray-100 pt-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-gray-900 mb-2">
                  Rating
                </h3>
                <div className="space-y-1 text-xs">
                  {[4, 3].map((star) => (
                    <button
                      key={star}
                      onClick={() => {
                        setMinRating(minRating === star ? 0 : star);
                        setCurrentPage(1);
                      }}
                      className={`w-full text-left px-2 py-1 rounded flex items-center justify-between ${
                        minRating === star
                          ? 'bg-emerald-50 text-emerald-800 font-bold'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{star} Stars &amp; Above</span>
                      </span>
                      {minRating === star && <Check className="w-3.5 h-3.5 text-emerald-700" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile apply button */}
              <div className="lg:hidden pt-2">
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="w-full bg-emerald-700 text-white font-bold py-2 rounded text-xs"
                >
                  Show Results ({filteredProducts.length})
                </button>
              </div>
            </div>
          </aside>

          {/* ================= RIGHT MAIN PRODUCT GRID (5-COLUMN ON DESKTOP) ================= */}
          <main className="flex-1 w-full min-w-0 space-y-4">
            {/* Status info bar */}
            <div className="flex items-center justify-between text-xs text-gray-500 bg-white px-3.5 py-2 rounded-lg border border-gray-200">
              <span>
                Showing{' '}
                <strong>
                  {filteredProducts.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}–
                  {Math.min(currentPage * itemsPerPage, filteredProducts.length)}
                </strong>{' '}
                of <strong>{filteredProducts.length}</strong> items
              </span>
              <span className="text-[11px] text-emerald-700 font-semibold hidden sm:inline">
                100% Genuine Brands &bull; Nationwide Delivery
              </span>
            </div>

            {/* Products or Empty State */}
            {filteredProducts.length > 0 ? (
              <>
                {/* 5-Column desktop grid, 2 cols mobile, 3-4 tablet */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2.5 sm:gap-3.5">
                  {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* PAGINATION CONTROLS */}
                {totalPages > 1 && (
                  <div className="bg-white rounded-lg border border-gray-200 p-3 flex items-center justify-between text-xs shadow-xs mt-4">
                    <button
                      onClick={() => {
                        setCurrentPage((prev) => Math.max(prev - 1, 1));
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      disabled={currentPage === 1}
                      className="px-3 py-1.5 rounded border border-gray-300 font-semibold text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Previous</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => {
                            setCurrentPage(page);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className={`w-8 h-8 rounded text-xs font-bold transition-colors ${
                            currentPage === page
                              ? 'bg-emerald-700 text-white shadow-xs'
                              : 'text-gray-700 hover:bg-gray-100 border border-gray-200'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => {
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1.5 rounded border border-gray-300 font-semibold text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
                    >
                      <span>Next</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            ) : (
              /* Empty Search / Filters Result */
              <div className="bg-white rounded-lg border border-gray-200 p-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto">
                  <SlidersHorizontal className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-gray-900">No products match your criteria</h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                  We couldn&rsquo;t find any FMCG products matching your selected category, price, or brand filters.
                </p>
                <button
                  onClick={resetFilters}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold px-4 py-2 rounded transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
