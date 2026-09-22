import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Settings, Save, CheckCircle2, Store, Truck, Bell } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { settings, updateSettings, showToast } = useStore();

  const [storeName, setStoreName] = useState(settings.storeName);
  const [phone, setPhone] = useState(settings.phone);
  const [whatsapp, setWhatsapp] = useState(settings.whatsapp);
  const [email, setEmail] = useState(settings.email);
  const [address, setAddress] = useState(settings.address);
  const [flatShippingRate, setFlatShippingRate] = useState(settings.flatShippingRate);
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(settings.freeShippingThreshold);
  const [lowStockAlertThreshold, setLowStockAlertThreshold] = useState(settings.lowStockAlertThreshold || 10);
  const [announcementText, setAnnouncementText] = useState(
    settings.announcementText || '🚚 Free Delivery all across Pakistan on orders above Rs. 2,000! Cash on Delivery Available'
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      storeName,
      phone,
      whatsapp,
      email,
      address,
      flatShippingRate,
      freeShippingThreshold,
      lowStockAlertThreshold,
      announcementText,
    });
    showToast('Store settings saved successfully!', 'success');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Store Settings &amp; Policies</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Configure Cash on Delivery shipping rules, hotline numbers, and store announcement banners
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        {/* General Store Details */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2 border-b border-gray-100 pb-3">
            <Store className="w-4 h-4 text-emerald-700" />
            1. Store Identity &amp; Contact Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Store Name</label>
              <input
                type="text"
                required
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-600 font-bold text-gray-900"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Customer Support Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Support Phone</label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-600 font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">WhatsApp Order Support</label>
              <input
                type="text"
                required
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-600 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Physical Store &amp; Warehouse Address</label>
            <input
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-600"
            />
          </div>
        </div>

        {/* Shipping & Thresholds */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2 border-b border-gray-100 pb-3">
            <Truck className="w-4 h-4 text-emerald-700" />
            2. Nationwide Shipping &amp; Inventory Alerts
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Standard Delivery Fee (PKR)</label>
              <input
                type="number"
                required
                value={flatShippingRate}
                onChange={(e) => setFlatShippingRate(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-600 font-mono"
              />
              <span className="text-[10px] text-gray-400">Flat rate for orders below threshold</span>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Free Delivery Threshold (PKR)</label>
              <input
                type="number"
                required
                value={freeShippingThreshold}
                onChange={(e) => setFreeShippingThreshold(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-600 font-bold text-emerald-800 font-mono"
              />
              <span className="text-[10px] text-gray-400">Orders above this get free delivery</span>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Low Stock Alert Quantity</label>
              <input
                type="number"
                required
                value={lowStockAlertThreshold}
                onChange={(e) => setLowStockAlertThreshold(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-600 font-mono"
              />
              <span className="text-[10px] text-gray-400">Triggers admin low-stock warning</span>
            </div>
          </div>
        </div>

        {/* Announcement Banner */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2 border-b border-gray-100 pb-3">
            <Bell className="w-4 h-4 text-emerald-700" />
            3. Store Announcement Ticker
          </h2>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Top Bar Announcement Message</label>
            <input
              type="text"
              required
              value={announcementText}
              onChange={(e) => setAnnouncementText(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-600"
            />
            <span className="text-[10px] text-gray-400">Visible on the top bar for all visiting shoppers</span>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-6 py-3 rounded-md shadow-md flex items-center gap-2 transition-colors"
          >
            <Save className="w-4 h-4" />
            Save Store Configuration
          </button>
        </div>
      </form>
    </div>
  );
};
