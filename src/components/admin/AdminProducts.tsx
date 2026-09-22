import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Product } from '../../types';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  X,
  Check,
  Filter,
  Image,
} from 'lucide-react';

export const AdminProducts: React.FC = () => {
  const {
    products,
    categories,
    addProduct,
    updateProduct,
    deleteProduct,
    updateInventoryStock,
  } = useStore();

  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('Personal Care');
  const [price, setPrice] = useState(250);
  const [salePrice, setSalePrice] = useState(220);
  const [stock, setStock] = useState(50);
  const [unit, setUnit] = useState('Pack of 1');
  const [sku, setSku] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isBestSeller, setIsBestSeller] = useState(false);

  const openAddModal = () => {
    setEditingProduct(null);
    setName('');
    setBrand('');
    setCategory(categories[0]?.name || 'Personal Care');
    setPrice(300);
    setSalePrice(270);
    setStock(40);
    setUnit('100g');
    setSku(`IGS-${Math.floor(1000 + Math.random() * 9000)}`);
    setImage('https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&auto=format&fit=crop&q=60');
    setDescription('');
    setIsFeatured(false);
    setIsBestSeller(false);
    setIsModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setName(p.name);
    setBrand(p.brand);
    setCategory(p.category);
    setPrice(p.price);
    setSalePrice(p.salePrice);
    setStock(p.stock);
    setUnit(p.unit);
    setSku(p.sku);
    setImage(p.image);
    setDescription(p.description);
    setIsFeatured(p.isFeatured || false);
    setIsBestSeller(p.isBestSeller || false);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const discount = Math.max(0, Math.round(((price - salePrice) / price) * 100));

    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        name,
        brand,
        category,
        price,
        salePrice,
        discountPercent: discount,
        stock,
        unit,
        sku,
        image,
        description,
        isFeatured,
        isBestSeller,
      });
    } else {
      addProduct({
        name,
        brand,
        category,
        price,
        salePrice,
        discountPercent: discount,
        stock,
        unit,
        sku,
        image,
        gallery: [image],
        description,
        isFeatured,
        isBestSeller,
        isNewArrival: true,
        isActive: true,
        rating: 4.8,
        reviewCount: 1,
        lowStockThreshold: 10,
        specifications: {
          Category: category,
          Brand: brand,
          Origin: 'Pakistan',
        },
      });
    }
    setIsModalOpen(false);
  };

  const filteredProducts = products.filter((p) => {
    if (selectedCat !== 'All' && p.category !== selectedCat) return false;
    if (
      search &&
      !p.name.toLowerCase().includes(search.toLowerCase()) &&
      !p.brand.toLowerCase().includes(search.toLowerCase()) &&
      !p.sku.toLowerCase().includes(search.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Products Catalog</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Add, update prices, manage discounts, and control FMCG inventory items
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-4 py-2.5 rounded-md flex items-center gap-1.5 shadow-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Add New Product
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-emerald-700 shrink-0" />
          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className="w-full sm:w-auto text-xs px-3 py-1.5 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-600 bg-white"
          >
            <option value="All">All Categories ({products.length})</option>
            {categories.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="relative w-full sm:w-72">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by product, brand, or SKU..."
            className="w-full text-xs pl-8 pr-3 py-1.5 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-600"
          />
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5 pointer-events-none" />
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] font-bold border-b border-gray-200">
              <tr>
                <th className="p-3">Product Info</th>
                <th className="p-3">Category</th>
                <th className="p-3">Retail Price</th>
                <th className="p-3">Sale Price</th>
                <th className="p-3">Discount</th>
                <th className="p-3">Stock Level</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50/80">
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-10 h-10 object-contain rounded border border-gray-200 bg-white p-0.5 shrink-0"
                      />
                      <div className="max-w-xs">
                        <span className="font-bold text-[10px] text-emerald-800 uppercase block">
                          {p.brand}
                        </span>
                        <span className="font-semibold text-gray-900 truncate block">
                          {p.name}
                        </span>
                        <span className="text-[10px] text-gray-400 font-mono">
                          {p.sku} &bull; {p.unit}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 font-medium text-gray-700">{p.category}</td>
                  <td className="p-3 text-gray-400 line-through font-mono">
                    Rs. {p.price.toLocaleString()}
                  </td>
                  <td className="p-3 font-bold text-emerald-800 font-mono">
                    Rs. {p.salePrice.toLocaleString()}
                  </td>
                  <td className="p-3">
                    {p.discountPercent > 0 ? (
                      <span className="bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded text-[10px]">
                        {p.discountPercent}% OFF
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-1.5">
                      <input
                        type="number"
                        value={p.stock}
                        onChange={(e) => updateInventoryStock(p.id, Number(e.target.value))}
                        className={`w-16 px-1.5 py-1 text-center text-xs font-bold border rounded ${
                          p.stock <= p.lowStockThreshold
                            ? 'border-red-400 text-red-700 bg-red-50'
                            : 'border-gray-300 text-gray-800'
                        }`}
                      />
                      <span className="text-[10px] text-gray-400">units</span>
                    </div>
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => openEditModal(p)}
                        className="p-1.5 text-gray-600 hover:text-emerald-700 rounded hover:bg-gray-100"
                        title="Edit product"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteProduct(p.id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 rounded hover:bg-red-50"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <h3 className="text-base font-bold text-gray-900">
                {editingProduct ? 'Edit Product Information' : 'Add New Grocery / FMCG Product'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Product Title / Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Dettol Original Anti-Bacterial Soap 100g"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Brand Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="e.g. Dettol / Unilever / Tapal"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-600 bg-white"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Regular Price (PKR) *
                  </label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Sale Price (PKR) *
                  </label>
                  <input
                    type="number"
                    required
                    value={salePrice}
                    onChange={(e) => setSalePrice(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-600 font-bold text-emerald-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Warehouse Stock (Units) *
                  </label>
                  <input
                    type="number"
                    required
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Unit / Size Packaging *
                  </label>
                  <input
                    type="text"
                    required
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    placeholder="e.g. 100g / 450g / 500ml"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    SKU Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    placeholder="IGS-1049"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-600 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Product Image URL
                </label>
                <input
                  type="url"
                  required
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Details regarding formulation, genuine distributor warranty, etc."
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              <div className="flex items-center gap-6 pt-1">
                <label className="flex items-center gap-2 cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="rounded text-emerald-700"
                  />
                  <span>Show in Featured Section</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    checked={isBestSeller}
                    onChange={(e) => setIsBestSeller(e.target.checked)}
                    className="rounded text-emerald-700"
                  />
                  <span>Mark as Best Seller</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded text-gray-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded font-bold transition-colors"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
