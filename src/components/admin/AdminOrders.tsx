import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Order } from '../../types';
import {
  Search,
  Eye,
  Truck,
  Printer,
  X,
  CheckCircle2,
  AlertCircle,
  FileText,
  MapPin,
  Phone,
  Calendar,
} from 'lucide-react';

export const AdminOrders: React.FC = () => {
  const { orders, updateOrderStatus, showToast } = useStore();
  const [filterStatus, setFilterStatus] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);

  const filteredOrders = orders.filter((o) => {
    if (filterStatus !== 'All' && o.status !== filterStatus) return false;
    if (
      search &&
      !o.orderNumber.toLowerCase().includes(search.toLowerCase()) &&
      !o.customer.name.toLowerCase().includes(search.toLowerCase()) &&
      !o.customer.city.toLowerCase().includes(search.toLowerCase()) &&
      !o.customer.phone.includes(search)
    ) {
      return false;
    }
    return true;
  });

  const printInvoice = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Orders &amp; Dispatch</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Manage Cash on Delivery processing, courier consignment numbers, and dispatch verification
          </p>
        </div>

        <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded border border-emerald-200">
          Total Orders: {orders.length}
        </span>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="flex flex-wrap gap-1 w-full sm:w-auto text-xs">
          {['All', 'Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(
            (st) => (
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
            )
          )}
        </div>

        <div className="relative w-full sm:w-72">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Order #, customer, phone, city..."
            className="w-full text-xs pl-8 pr-3 py-1.5 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-600"
          />
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5 pointer-events-none" />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] font-bold border-b border-gray-200">
              <tr>
                <th className="p-3">Order Number</th>
                <th className="p-3">Customer Details</th>
                <th className="p-3">Destination City</th>
                <th className="p-3">Date</th>
                <th className="p-3">Total Payable</th>
                <th className="p-3">Payment</th>
                <th className="p-3">Courier Ref</th>
                <th className="p-3">Dispatch Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/80">
                  <td className="p-3 font-mono font-bold text-emerald-900">
                    {order.orderNumber}
                  </td>
                  <td className="p-3">
                    <p className="font-semibold text-gray-900">{order.customer.name}</p>
                    <p className="text-[11px] text-gray-500">{order.customer.phone}</p>
                  </td>
                  <td className="p-3 font-medium text-gray-700">
                    {order.customer.city}
                  </td>
                  <td className="p-3 text-gray-500 whitespace-nowrap">{order.date}</td>
                  <td className="p-3 font-bold text-emerald-800 font-mono">
                    Rs. {order.total.toLocaleString()}
                  </td>
                  <td className="p-3">
                    <span className="text-[10px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded font-semibold">
                      {order.paymentMethod}
                    </span>
                  </td>
                  <td className="p-3 font-mono text-gray-600">
                    {order.trackingNumber || <span className="text-gray-400 italic">Not assigned</span>}
                  </td>
                  <td className="p-3">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                      className={`text-[11px] font-bold rounded px-2 py-1 border focus:outline-none ${
                        order.status === 'Delivered'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : order.status === 'Shipped'
                          ? 'bg-blue-50 text-blue-800 border-blue-300'
                          : order.status === 'Processing'
                          ? 'bg-amber-50 text-amber-800 border-amber-300'
                          : 'bg-white text-gray-700 border-gray-300'
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="bg-gray-100 hover:bg-emerald-50 text-gray-700 hover:text-emerald-800 px-2.5 py-1 rounded text-[11px] font-semibold flex items-center gap-1 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <div>
                <h3 className="text-base font-bold text-gray-900 font-mono">
                  Order Details: {selectedOrder.orderNumber}
                </h3>
                <p className="text-xs text-gray-400">
                  Recorded on {selectedOrder.date} &bull; Payment: {selectedOrder.paymentMethod}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1 text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer & Address Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-lg bg-gray-50 border border-gray-200 text-xs">
              <div className="space-y-1">
                <span className="font-bold text-gray-800 uppercase text-[10px] block">
                  Customer Profile
                </span>
                <p className="font-semibold text-gray-900">{selectedOrder.customer.name}</p>
                <p className="text-gray-600 flex items-center gap-1">
                  <Phone className="w-3 h-3 text-emerald-700" /> {selectedOrder.customer.phone}
                </p>
                <p className="text-gray-600">{selectedOrder.customer.email}</p>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-gray-800 uppercase text-[10px] block">
                  Delivery Destination
                </span>
                <p className="text-gray-700">{selectedOrder.customer.address}</p>
                <p className="text-gray-700 font-semibold">
                  {selectedOrder.customer.area ? `${selectedOrder.customer.area}, ` : ''}
                  {selectedOrder.customer.city}
                </p>
                {selectedOrder.customer.orderNotes && (
                  <p className="text-[11px] text-amber-800 italic pt-1">
                    Note: &ldquo;{selectedOrder.customer.orderNotes}&rdquo;
                  </p>
                )}
              </div>
            </div>

            {/* Items table */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                Order Items &amp; Units
              </h4>
              <div className="border border-gray-200 rounded-lg overflow-hidden divide-y divide-gray-200 text-xs">
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="p-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="w-10 h-10 object-contain rounded border border-gray-100 bg-gray-50 p-1"
                      />
                      <div>
                        <p className="font-semibold text-gray-900">{item.productName}</p>
                        <p className="text-[11px] text-gray-400">
                          {item.quantity} &times; Rs. {item.price} ({item.unit})
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-gray-900 font-mono">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial summary */}
            <div className="bg-emerald-50/70 p-4 rounded-lg border border-emerald-200 text-xs space-y-1.5">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal:</span>
                <span>Rs. {selectedOrder.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Shipping Charges:</span>
                <span>{selectedOrder.shipping === 0 ? 'FREE' : `Rs. ${selectedOrder.shipping}`}</span>
              </div>
              {selectedOrder.discount > 0 && (
                <div className="flex justify-between text-emerald-800 font-semibold">
                  <span>Coupon Discount ({selectedOrder.couponCode}):</span>
                  <span>- Rs. {selectedOrder.discount.toLocaleString()}</span>
                </div>
              )}
              <div className="border-t border-emerald-200 pt-2 flex justify-between font-extrabold text-sm text-emerald-950">
                <span>Total Cash on Delivery:</span>
                <span>Rs. {selectedOrder.total.toLocaleString()}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-200">
              <button
                type="button"
                onClick={() => {
                  showToast(`Invoice generated for order ${selectedOrder.orderNumber}`, 'info');
                }}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold px-4 py-2 rounded flex items-center gap-1.5 transition-colors"
              >
                <Printer className="w-4 h-4" />
                Print Packing Slip &amp; Invoice
              </button>

              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-5 py-2 rounded"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
