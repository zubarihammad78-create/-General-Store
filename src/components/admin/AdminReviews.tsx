import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Star, Check, X, MessageSquare, Trash2 } from 'lucide-react';

export const AdminReviews: React.FC = () => {
  const { reviews, updateReviewStatus, products } = useStore();
  const [filter, setFilter] = useState<'All' | 'Pending' | 'Approved' | 'Rejected'>('All');

  const filteredReviews = reviews.filter((r) => {
    if (filter !== 'All' && r.status !== filter) return false;
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Customer Product Reviews</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Moderate testimonials submitted by verified Pakistani shoppers across the country
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-1.5 text-xs">
          {['All', 'Pending', 'Approved', 'Rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status as any)}
              className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${
                filter === status
                  ? 'bg-emerald-700 text-white'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] font-bold border-b border-gray-200">
              <tr>
                <th className="p-3">Customer</th>
                <th className="p-3">City</th>
                <th className="p-3">Product Reviewed</th>
                <th className="p-3">Rating</th>
                <th className="p-3">Comment / Feedback</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Moderation Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredReviews.map((rev) => {
                const product = products.find((p) => p.id === rev.productId);

                return (
                  <tr key={rev.id} className="hover:bg-gray-50/80">
                    <td className="p-3">
                      <p className="font-bold text-gray-900">{rev.customerName}</p>
                      <p className="text-[10px] text-gray-400">{rev.date}</p>
                    </td>
                    <td className="p-3 font-medium text-gray-700">{rev.customerCity}</td>
                    <td className="p-3 max-w-xs truncate">
                      <span className="font-semibold text-emerald-800 truncate block">
                        {product ? product.name : rev.productId}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex text-amber-400 items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span className="font-bold text-gray-800">{rev.rating}</span>
                      </div>
                    </td>
                    <td className="p-3 max-w-sm text-gray-700 leading-relaxed">
                      &ldquo;{rev.comment}&rdquo;
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          rev.status === 'Approved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : rev.status === 'Pending'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {rev.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {rev.status !== 'Approved' && (
                          <button
                            onClick={() => updateReviewStatus(rev.id, 'Approved')}
                            className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold px-2 py-1 rounded text-[11px] flex items-center gap-1"
                            title="Approve Review"
                          >
                            <Check className="w-3 h-3" /> Approve
                          </button>
                        )}
                        {rev.status !== 'Rejected' && (
                          <button
                            onClick={() => updateReviewStatus(rev.id, 'Rejected')}
                            className="bg-red-50 hover:bg-red-100 text-red-700 font-bold px-2 py-1 rounded text-[11px] flex items-center gap-1"
                            title="Reject Review"
                          >
                            <X className="w-3 h-3" /> Reject
                          </button>
                        )}
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
