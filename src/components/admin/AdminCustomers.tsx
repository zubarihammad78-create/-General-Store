import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Users, Search, Phone, Mail, MapPin, ShoppingBag } from 'lucide-react';

export const AdminCustomers: React.FC = () => {
  const { customers, orders } = useStore();
  const [search, setSearch] = useState('');

  const filteredCustomers = customers.filter((c) => {
    if (
      search &&
      !c.name.toLowerCase().includes(search.toLowerCase()) &&
      !c.email.toLowerCase().includes(search.toLowerCase()) &&
      !c.city.toLowerCase().includes(search.toLowerCase()) &&
      !c.phone.includes(search)
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
          <h1 className="text-2xl font-black text-gray-900">Customer Directory</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Registered Pakistani consumer accounts, addresses, and Cash on Delivery purchase frequency
          </p>
        </div>

        <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded border border-emerald-200">
          Total Customers: {customers.length} Profiles
        </span>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by customer name, phone, or city..."
            className="w-full text-xs pl-8 pr-3 py-1.5 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-600"
          />
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5 pointer-events-none" />
        </div>

        <span className="text-xs text-gray-500 hidden sm:inline">
          Showing <strong>{filteredCustomers.length}</strong> active profiles
        </span>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] font-bold border-b border-gray-200">
              <tr>
                <th className="p-3">Customer Name</th>
                <th className="p-3">Contact (Phone &amp; WhatsApp)</th>
                <th className="p-3">Delivery City</th>
                <th className="p-3">Member Since</th>
                <th className="p-3">Total Orders</th>
                <th className="p-3">Total Spent (PKR)</th>
                <th className="p-3">Account Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCustomers.map((cust) => (
                <tr key={cust.id} className="hover:bg-gray-50/80">
                  <td className="p-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0">
                        {cust.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{cust.name}</p>
                        <p className="text-[11px] text-gray-400">{cust.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 font-mono font-medium text-gray-800">
                    {cust.phone}
                  </td>
                  <td className="p-3 font-semibold text-emerald-800">{cust.city}</td>
                  <td className="p-3 text-gray-600">
                    {cust.joinedDate}
                  </td>
                  <td className="p-3 font-bold text-gray-900">
                    {cust.ordersCount} Orders
                  </td>
                  <td className="p-3 font-extrabold text-emerald-900 font-mono">
                    Rs. {cust.totalSpent.toLocaleString()}
                  </td>
                  <td className="p-3">
                    <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">
                      {cust.status}
                    </span>
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
