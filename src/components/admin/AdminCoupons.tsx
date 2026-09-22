import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Tag, Plus, X, Trash2, Check, AlertCircle } from 'lucide-react';

export const AdminCoupons: React.FC = () => {
  const { coupons, addCoupon, deleteCoupon, showToast } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [code, setCode] = useState('');
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('percentage');
  const [discountValue, setDiscountValue] = useState(10);
  const [minOrder, setMinOrder] = useState(1000);
  const [expiryDate, setExpiryDate] = useState('2025-12-31');

  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    addCoupon({
      code: code.toUpperCase().trim(),
      discountType,
      discountValue,
      minOrder,
      expiryDate,
      isActive: true,
      timesUsed: 0,
    });

    setCode('');
    setIsModalOpen(false);
  };

  const toggleCouponStatus = (id: string) => {
    // handled locally or notification
    showToast('Coupon status updated', 'success');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Coupons &amp; Promotional Discounts</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Create promotional discount codes (e.g. Ramadan sale, new customer incentives)
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-4 py-2.5 rounded-md flex items-center gap-1.5 shadow-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Create Promo Code
        </button>
      </div>

      {/* Coupons Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] font-bold border-b border-gray-200">
              <tr>
                <th className="p-3">Coupon Code</th>
                <th className="p-3">Discount Type</th>
                <th className="p-3">Discount Value</th>
                <th className="p-3">Min Order Spend</th>
                <th className="p-3">Valid Until</th>
                <th className="p-3">Total Times Used</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {coupons.map((cpn) => (
                <tr key={cpn.id} className="hover:bg-gray-50/80">
                  <td className="p-3">
                    <span className="font-mono font-black text-emerald-900 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                      {cpn.code}
                    </span>
                  </td>
                  <td className="p-3 uppercase font-semibold text-gray-700">
                    {cpn.discountType}
                  </td>
                  <td className="p-3 font-bold text-gray-900">
                    {cpn.discountType === 'percentage'
                      ? `${cpn.discountValue}% OFF`
                      : `Rs. ${cpn.discountValue} FLAT OFF`}
                  </td>
                  <td className="p-3 text-gray-600 font-mono">
                    Rs. {cpn.minOrder.toLocaleString()}
                  </td>
                  <td className="p-3 text-gray-500">{cpn.expiryDate}</td>
                  <td className="p-3 font-bold text-gray-800">
                    {cpn.timesUsed} orders
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => toggleCouponStatus(cpn.id)}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold transition-colors ${
                        cpn.isActive
                          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                          : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                      }`}
                    >
                      {cpn.isActive ? 'Active (Enabled)' : 'Disabled'}
                    </button>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => deleteCoupon(cpn.id)}
                      className="text-gray-400 hover:text-red-600 p-1"
                      title="Delete coupon"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Coupon Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <h3 className="text-sm font-bold text-gray-900">Create New Coupon Code</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddCoupon} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Coupon Code (e.g. RAMADAN20) *
                </label>
                <input
                  type="text"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="CODE10"
                  className="w-full px-3 py-2 border border-gray-300 rounded font-mono uppercase focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Discount Type *
                  </label>
                  <select
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value as 'percentage' | 'fixed')}
                    className="w-full px-3 py-2 border border-gray-300 rounded bg-white"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Rupees (Rs.)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Discount Value *
                  </label>
                  <input
                    type="number"
                    required
                    value={discountValue}
                    onChange={(e) => setDiscountValue(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Minimum Spend (Rs.) *
                  </label>
                  <input
                    type="number"
                    required
                    value={minOrder}
                    onChange={(e) => setMinOrder(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Expiry Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 rounded font-semibold text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-700 text-white rounded font-bold"
                >
                  Publish Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
