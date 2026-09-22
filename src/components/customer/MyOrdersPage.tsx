import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  Package,
  Truck,
  Eye,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Search,
} from 'lucide-react';

export const MyOrdersPage: React.FC = () => {
  const { orders, setCustomerView, goToOrderTracking } = useStore();
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = orders.filter((order) => {
    if (filterStatus !== 'All' && order.status !== filterStatus) return false;
    if (
      searchQuery &&
      !order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !order.customer.city.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-gray-200 pb-3">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">My Orders</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Review past purchases, current delivery progress, and Cash on Delivery slips
          </p>
        </div>

        <button
          onClick={() => setCustomerView('shop')}
          className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs px-4 py-2 rounded-md shadow-xs self-start sm:self-auto"
        >
          Browse More Essentials
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
        {/* Status Pills */}
        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto text-xs">
          {['All', 'Pending', 'Processing', 'Shipped', 'Delivered'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                filterStatus === st
                  ? 'bg-emerald-700 text-white font-bold'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Order Number..."
            className="w-full text-xs pl-8 pr-3 py-1.5 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-600 focus:outline-none"
          />
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5 pointer-events-none" />
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => {
            const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);

            return (
              <div
                key={order.id}
                className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden"
              >
                {/* Order Top Bar */}
                <div className="bg-gray-50 p-4 border-b border-gray-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex flex-wrap items-center gap-4">
                    <div>
                      <span className="text-gray-400 block text-[10px] uppercase font-bold">
                        Order Placed
                      </span>
                      <span className="font-semibold text-gray-800">{order.date}</span>
                    </div>

                    <div>
                      <span className="text-gray-400 block text-[10px] uppercase font-bold">
                        Total Amount
                      </span>
                      <span className="font-bold text-emerald-800">
                        Rs. {order.total.toLocaleString()}
                      </span>
                    </div>

                    <div>
                      <span className="text-gray-400 block text-[10px] uppercase font-bold">
                        Ship To
                      </span>
                      <span className="text-gray-800">{order.customer.city}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-gray-900">
                      {order.orderNumber}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded text-[11px] font-bold ${
                        order.status === 'Delivered'
                          ? 'bg-emerald-100 text-emerald-800'
                          : order.status === 'Shipped'
                          ? 'bg-blue-100 text-blue-800'
                          : order.status === 'Processing'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Order Body */}
                <div className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Items Preview */}
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3 overflow-x-auto pb-1">
                      {order.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 p-1.5 rounded border border-gray-200 bg-gray-50 text-xs shrink-0"
                        >
                          <img
                            src={item.image}
                            alt={item.productName}
                            className="w-10 h-10 object-contain rounded bg-white p-0.5"
                          />
                          <div>
                            <p className="font-medium text-gray-900 truncate max-w-[140px]">
                              {item.productName}
                            </p>
                            <p className="text-[10px] text-gray-500">
                              Qty: {item.quantity} &bull; Rs. {item.price}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="text-[11px] text-gray-500 flex items-center gap-3">
                      <span>{itemCount} total units</span>
                      <span>&bull;</span>
                      <span>Payment: <strong>{order.paymentMethod}</strong></span>
                      {order.trackingNumber && (
                        <>
                          <span>&bull;</span>
                          <span>Courier Ref: <strong>{order.trackingNumber}</strong></span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-gray-100">
                    <button
                      onClick={() => goToOrderTracking(order.id)}
                      className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold px-4 py-2 rounded flex items-center gap-1.5 transition-colors"
                    >
                      <Truck className="w-3.5 h-3.5" />
                      Track Order
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center space-y-3">
            <Package className="w-10 h-10 text-gray-400 mx-auto" />
            <h3 className="text-base font-bold text-gray-900">No Orders Found</h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              You haven&rsquo;t placed any orders matching this criteria yet.
            </p>
            <button
              onClick={() => {
                setFilterStatus('All');
                setSearchQuery('');
              }}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold px-4 py-2 rounded"
            >
              Clear Filter
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
