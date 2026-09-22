import React from 'react';
import { useStore } from '../../context/StoreContext';
import {
  DollarSign,
  ShoppingBag,
  Package,
  Users,
  AlertTriangle,
  ArrowUpRight,
  Plus,
  Truck,
  CheckCircle2,
  TrendingUp,
  Tag,
  ArrowRight,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    orders,
    products,
    customers,
    setAdminTab,
    updateOrderStatus,
    updateInventoryStock,
  } = useStore();

  const totalSales = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const totalCustomers = customers.length;

  const pendingOrders = orders.filter((o) => o.status === 'Pending' || o.status === 'Processing');
  const lowStockProducts = products.filter((p) => p.stock <= p.lowStockThreshold);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Store Dashboard</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Real-time retail metrics, Cash on Delivery volume, and warehouse stock levels
          </p>
        </div>

        {/* Quick action buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setAdminTab('products')}
            className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-3.5 py-2 rounded flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Product
          </button>
          <button
            onClick={() => setAdminTab('orders')}
            className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-semibold px-3.5 py-2 rounded flex items-center gap-1.5 transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-emerald-700" />
            Manage Orders
          </button>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Sales */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-gray-500 block">Total Retail Revenue</span>
            <h3 className="text-xl font-extrabold text-emerald-900 mt-1">
              Rs. {totalSales.toLocaleString()}
            </h3>
            <span className="text-[11px] text-emerald-700 flex items-center gap-0.5 mt-1 font-medium">
              <TrendingUp className="w-3 h-3" /> +14.2% from last month
            </span>
          </div>
          <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <span className="font-extrabold text-sm">PKR</span>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-gray-500 block">Total Orders</span>
            <h3 className="text-xl font-extrabold text-gray-900 mt-1">{totalOrders} Orders</h3>
            <span className="text-[11px] text-amber-600 font-medium mt-1 block">
              {pendingOrders.length} requiring dispatch
            </span>
          </div>
          <div className="w-12 h-12 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>

        {/* Total Products */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-gray-500 block">Active Products</span>
            <h3 className="text-xl font-extrabold text-gray-900 mt-1">{totalProducts} SKUs</h3>
            <span className="text-[11px] text-gray-400 mt-1 block">8 Primary Categories</span>
          </div>
          <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
            <Package className="w-6 h-6" />
          </div>
        </div>

        {/* Total Customers */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-gray-500 block">Registered Customers</span>
            <h3 className="text-xl font-extrabold text-gray-900 mt-1">{totalCustomers} Profiles</h3>
            <span className="text-[11px] text-emerald-700 font-medium mt-1 block">
              100% verified Pakistani numbers
            </span>
          </div>
          <div className="w-12 h-12 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Sales Performance & Quick Category Revenue */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Monthly revenue bar breakdown */}
        <div className="lg:col-span-8 bg-white p-6 rounded-xl border border-gray-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-gray-900">
                Monthly Sales &amp; Dispatch Volume
              </h3>
              <p className="text-xs text-gray-400">Cash on Delivery settled receipts</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded">
              Current Year (2025)
            </span>
          </div>

          {/* Simple Clean CSS Bar Chart */}
          <div className="h-44 pt-6 flex items-end justify-between gap-3 border-b border-gray-200 pb-2">
            {[
              { month: 'Oct', amount: 145000, height: '40%' },
              { month: 'Nov', amount: 182000, height: '55%' },
              { month: 'Dec', amount: 230000, height: '70%' },
              { month: 'Jan', amount: 210000, height: '62%' },
              { month: 'Feb', amount: 265000, height: '80%' },
              { month: 'Mar (Ramadan)', amount: 320000, height: '95%' },
            ].map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                <span className="text-[10px] font-mono text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Rs. {(bar.amount / 1000).toFixed(0)}k
                </span>
                <div
                  className="w-full max-w-[40px] bg-emerald-600 group-hover:bg-emerald-700 rounded-t transition-all"
                  style={{ height: bar.height }}
                />
                <span className="text-[11px] font-medium text-gray-600 truncate max-w-full">
                  {bar.month}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
            <span>Average Order Value: <strong>Rs. 1,640</strong></span>
            <span>COD Collection Rate: <strong>98.4%</strong></span>
          </div>
        </div>

        {/* Right: Low Stock Alert Card */}
        <div className="lg:col-span-4 bg-white p-6 rounded-xl border border-gray-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                Low Stock Alert
              </h3>
              <button
                onClick={() => setAdminTab('inventory')}
                className="text-xs text-emerald-700 font-semibold hover:underline"
              >
                View All &rarr;
              </button>
            </div>

            <div className="divide-y divide-gray-100 max-h-56 overflow-y-auto">
              {lowStockProducts.map((p) => (
                <div key={p.id} className="py-2.5 flex items-center justify-between text-xs">
                  <div className="truncate pr-2">
                    <p className="font-semibold text-gray-900 truncate">{p.name}</p>
                    <p className="text-[10px] text-gray-400">{p.sku} &bull; {p.brand}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-red-600 font-bold block">{p.stock} units</span>
                    <button
                      onClick={() => updateInventoryStock(p.id, p.stock + 24)}
                      className="text-[10px] text-emerald-700 hover:underline font-semibold"
                    >
                      + Add 24
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setAdminTab('inventory')}
            className="w-full mt-4 bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-bold py-2 rounded border border-gray-200 transition-colors"
          >
            Manage Warehouse Inventory
          </button>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-gray-900">Recent Customer Orders</h3>
            <p className="text-xs text-gray-500">Live order stream requiring verification and dispatch</p>
          </div>
          <button
            onClick={() => setAdminTab('orders')}
            className="text-xs text-emerald-700 font-semibold hover:underline flex items-center gap-1"
          >
            View All Orders <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] font-bold border-b border-gray-200">
              <tr>
                <th className="p-3">Order Number</th>
                <th className="p-3">Customer &amp; City</th>
                <th className="p-3">Date</th>
                <th className="p-3">Items</th>
                <th className="p-3">Total Amount</th>
                <th className="p-3">Payment</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/80">
                  <td className="p-3 font-mono font-bold text-emerald-900">
                    {order.orderNumber}
                  </td>
                  <td className="p-3">
                    <p className="font-semibold text-gray-900">{order.customer.name}</p>
                    <p className="text-[11px] text-gray-400">{order.customer.city}</p>
                  </td>
                  <td className="p-3 text-gray-500">{order.date}</td>
                  <td className="p-3 text-gray-700">
                    {order.items.length} item(s)
                  </td>
                  <td className="p-3 font-bold text-gray-900">
                    Rs. {order.total.toLocaleString()}
                  </td>
                  <td className="p-3 text-gray-600">{order.paymentMethod}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        order.status === 'Delivered'
                          ? 'bg-emerald-100 text-emerald-800'
                          : order.status === 'Shipped'
                          ? 'bg-blue-100 text-blue-800'
                          : order.status === 'Processing'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                      className="text-[11px] border border-gray-300 rounded px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
