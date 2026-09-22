import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Boxes, AlertTriangle, Check, Plus, Minus, Search } from 'lucide-react';

export const AdminInventory: React.FC = () => {
  const { products, updateInventoryStock, showToast } = useStore();
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'low' | 'healthy'>('all');

  const lowStockCount = products.filter((p) => p.stock <= p.lowStockThreshold).length;

  const filteredProducts = products.filter((p) => {
    const isLow = p.stock <= p.lowStockThreshold;
    if (filterType === 'low' && !isLow) return false;
    if (filterType === 'healthy' && isLow) return false;
    if (
      search &&
      !p.name.toLowerCase().includes(search.toLowerCase()) &&
      !p.sku.toLowerCase().includes(search.toLowerCase()) &&
      !p.brand.toLowerCase().includes(search.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const handleBulkRestock = (qty: number) => {
    products.forEach((p) => {
      if (p.stock <= p.lowStockThreshold) {
        updateInventoryStock(p.id, p.stock + qty);
      }
    });
    showToast(`Bulk restocked low items by +${qty} units each!`, 'success');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Inventory &amp; Stock Levels</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Monitor FMCG warehouse inventory, trigger distributor re-orders, and manage stock safety thresholds
          </p>
        </div>

        {lowStockCount > 0 && (
          <button
            onClick={() => handleBulkRestock(30)}
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-4 py-2 rounded-md shadow-xs transition-colors self-start sm:self-auto flex items-center gap-1.5"
          >
            <AlertTriangle className="w-4 h-4" />
            Bulk Restock Low Items (+30)
          </button>
        )}
      </div>

      {/* Summary Chips */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          onClick={() => setFilterType('all')}
          className={`p-4 rounded-xl border cursor-pointer transition-all ${
            filterType === 'all'
              ? 'bg-emerald-50 border-emerald-600 shadow-xs'
              : 'bg-white border-gray-200'
          }`}
        >
          <span className="text-xs font-semibold text-gray-500 block">Total Tracked SKUs</span>
          <h3 className="text-xl font-extrabold text-gray-900 mt-1">{products.length} Products</h3>
          <span className="text-[11px] text-emerald-700 font-medium">Full inventory view</span>
        </div>

        <div
          onClick={() => setFilterType('low')}
          className={`p-4 rounded-xl border cursor-pointer transition-all ${
            filterType === 'low'
              ? 'bg-red-50 border-red-600 shadow-xs'
              : 'bg-white border-gray-200'
          }`}
        >
          <span className="text-xs font-semibold text-gray-500 block">Low Stock Alert (&le; 10 units)</span>
          <h3 className="text-xl font-extrabold text-red-600 mt-1">{lowStockCount} Products</h3>
          <span className="text-[11px] text-red-500 font-medium">Immediate distributor order needed</span>
        </div>

        <div
          onClick={() => setFilterType('healthy')}
          className={`p-4 rounded-xl border cursor-pointer transition-all ${
            filterType === 'healthy'
              ? 'bg-emerald-50 border-emerald-600 shadow-xs'
              : 'bg-white border-gray-200'
          }`}
        >
          <span className="text-xs font-semibold text-gray-500 block">Healthy Stock</span>
          <h3 className="text-xl font-extrabold text-emerald-800 mt-1">
            {products.length - lowStockCount} Products
          </h3>
          <span className="text-[11px] text-emerald-600 font-medium">Sufficient for 2+ weeks</span>
        </div>
      </div>

      {/* Search Filter */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by SKU, Brand, or Name..."
            className="w-full text-xs pl-8 pr-3 py-1.5 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-600"
          />
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5 pointer-events-none" />
        </div>

        <span className="text-xs text-gray-500 hidden sm:inline">
          Click +/- to instantly adjust warehouse counts
        </span>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] font-bold border-b border-gray-200">
              <tr>
                <th className="p-3">Product &amp; SKU</th>
                <th className="p-3">Category</th>
                <th className="p-3">Packaging Unit</th>
                <th className="p-3">Current Stock</th>
                <th className="p-3">Threshold</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Quick Stock Adjustment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.map((p) => {
                const isLow = p.stock <= p.lowStockThreshold;

                return (
                  <tr key={p.id} className="hover:bg-gray-50/80">
                    <td className="p-3">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-9 h-9 object-contain rounded border border-gray-100 bg-gray-50 p-0.5"
                        />
                        <div>
                          <p className="font-semibold text-gray-900">{p.name}</p>
                          <p className="text-[10px] text-gray-400 font-mono">
                            {p.sku} &bull; {p.brand}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 text-gray-600">{p.category}</td>
                    <td className="p-3 text-gray-500">{p.unit}</td>
                    <td className="p-3">
                      <span
                        className={`text-sm font-extrabold font-mono ${
                          isLow ? 'text-red-600' : 'text-emerald-900'
                        }`}
                      >
                        {p.stock} units
                      </span>
                    </td>
                    <td className="p-3 text-gray-400 font-mono">{p.lowStockThreshold} units</td>
                    <td className="p-3">
                      {isLow ? (
                        <span className="bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded text-[10px] inline-flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" /> Low Stock
                        </span>
                      ) : (
                        <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px] inline-flex items-center gap-1">
                          <Check className="w-3 h-3" /> In Stock
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-right">
                      <div className="inline-flex items-center border border-gray-300 rounded bg-white overflow-hidden shadow-xs">
                        <button
                          onClick={() => updateInventoryStock(p.id, Math.max(0, p.stock - 5))}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100 text-xs font-bold"
                          title="Decrease by 5"
                        >
                          -5
                        </button>
                        <button
                          onClick={() => updateInventoryStock(p.id, Math.max(0, p.stock - 1))}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100 text-xs font-bold border-l border-gray-200"
                          title="Decrease by 1"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 py-1 text-xs font-bold font-mono text-gray-800 bg-gray-50 border-x border-gray-200">
                          {p.stock}
                        </span>
                        <button
                          onClick={() => updateInventoryStock(p.id, p.stock + 1)}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100 text-xs font-bold border-r border-gray-200"
                          title="Increase by 1"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => updateInventoryStock(p.id, p.stock + 12)}
                          className="px-2 py-1 text-emerald-700 hover:bg-emerald-50 text-xs font-bold"
                          title="Add 1 Dozen (+12)"
                        >
                          +12
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
