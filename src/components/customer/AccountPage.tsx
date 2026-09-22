import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { pakistaniCities } from '../../data/mockData';
import {
  User,
  Package,
  MapPin,
  KeyRound,
  LogOut,
  LayoutDashboard,
  Clock,
  CheckCircle2,
  Truck,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';

export const AccountPage: React.FC = () => {
  const {
    user,
    logout,
    orders,
    setCustomerView,
    updateUserProfile,
    showToast,
    goToOrderTracking,
  } = useStore();

  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'profile' | 'orders' | 'addresses' | 'password'
  >('dashboard');

  // Profile form state
  const [profileName, setProfileName] = useState(user?.name || '');
  const [profilePhone, setProfilePhone] = useState(user?.phone || '');
  const [profileAddress, setProfileAddress] = useState(user?.address || '');
  const [profileCity, setProfileCity] = useState(user?.city || 'Islamabad');
  const [profileArea, setProfileArea] = useState(user?.area || 'F-8 Markaz');

  // Password state
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name: profileName,
      phone: profilePhone,
      address: profileAddress,
      city: profileCity,
      area: profileArea,
    });
  };

  const handlePasswordSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      showToast('New passwords do not match', 'error');
      return;
    }
    showToast('Password changed successfully!', 'success');
    setOldPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  };

  const userOrders = orders; // simulated all customer's orders
  const recentOrders = userOrders.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-6 border-b border-gray-200 pb-3">
        <h1 className="text-2xl font-extrabold text-gray-900">Customer Account</h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Manage your personal details, saved shipping addresses, and purchase history.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Navigation */}
        <aside className="lg:col-span-3 space-y-3">
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-xs">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
              <div className="w-11 h-11 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-base">
                {user?.name ? user.name.charAt(0) : 'U'}
              </div>
              <div className="truncate">
                <h3 className="text-xs font-bold text-gray-900 truncate">{user?.name || 'Customer'}</h3>
                <p className="text-[11px] text-gray-500 truncate">{user?.email || 'customer@gmail.com'}</p>
              </div>
            </div>

            <nav className="mt-3 space-y-1 text-xs font-medium">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full text-left px-3 py-2.5 rounded-md flex items-center gap-2.5 transition-colors ${
                  activeTab === 'dashboard'
                    ? 'bg-emerald-700 text-white font-bold'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard Overview
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full text-left px-3 py-2.5 rounded-md flex items-center gap-2.5 transition-colors ${
                  activeTab === 'profile'
                    ? 'bg-emerald-700 text-white font-bold'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <User className="w-4 h-4" />
                My Profile
              </button>

              <button
                onClick={() => {
                  setCustomerView('my-orders');
                }}
                className="w-full text-left px-3 py-2.5 rounded-md flex items-center gap-2.5 text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <Package className="w-4 h-4" />
                My Orders ({userOrders.length})
              </button>

              <button
                onClick={() => setActiveTab('addresses')}
                className={`w-full text-left px-3 py-2.5 rounded-md flex items-center gap-2.5 transition-colors ${
                  activeTab === 'addresses'
                    ? 'bg-emerald-700 text-white font-bold'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <MapPin className="w-4 h-4" />
                Saved Delivery Addresses
              </button>

              <button
                onClick={() => setActiveTab('password')}
                className={`w-full text-left px-3 py-2.5 rounded-md flex items-center gap-2.5 transition-colors ${
                  activeTab === 'password'
                    ? 'bg-emerald-700 text-white font-bold'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <KeyRound className="w-4 h-4" />
                Change Password
              </button>

              <div className="border-t border-gray-100 pt-2 my-2"></div>

              <button
                onClick={logout}
                className="w-full text-left px-3 py-2 rounded-md flex items-center gap-2.5 text-red-600 hover:bg-red-50 text-xs"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="lg:col-span-9">
          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Welcome Banner */}
              <div className="bg-emerald-900 text-white p-6 rounded-xl shadow-xs relative overflow-hidden">
                <div className="relative z-10 space-y-2">
                  <span className="text-xs text-emerald-300 font-bold uppercase tracking-wider">
                    Customer Account
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black">
                    Assalam-o-Alaikum, {user?.name || 'Customer'}!
                  </h2>
                  <p className="text-xs sm:text-sm text-emerald-100 max-w-xl">
                    From your Imran General Store dashboard, you can track current deliveries, review purchase receipts, and manage your delivery details.
                  </p>
                </div>
              </div>

              {/* Status Summary Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 font-medium">Total Orders</span>
                    <h4 className="text-lg font-black text-gray-900">{userOrders.length} Orders</h4>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 font-medium">Active Shipments</span>
                    <h4 className="text-lg font-black text-gray-900">
                      {userOrders.filter((o) => o.status === 'Shipped' || o.status === 'Processing').length} In Transit
                    </h4>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 font-medium">Payment Preference</span>
                    <h4 className="text-lg font-black text-gray-900">Cash on Delivery</h4>
                  </div>
                </div>
              </div>

              {/* Recent Orders Overview */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <h3 className="text-sm font-bold text-gray-900">Recent Orders</h3>
                  <button
                    onClick={() => setCustomerView('my-orders')}
                    className="text-xs text-emerald-700 font-semibold hover:underline"
                  >
                    View All Orders &rarr;
                  </button>
                </div>

                <div className="divide-y divide-gray-100">
                  {recentOrders.map((ord) => (
                    <div
                      key={ord.id}
                      className="py-3 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-900">{ord.orderNumber}</span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              ord.status === 'Delivered'
                                ? 'bg-emerald-100 text-emerald-800'
                                : ord.status === 'Shipped'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {ord.status}
                          </span>
                        </div>
                        <p className="text-gray-400 text-[11px] mt-0.5">
                          {ord.date} &bull; {ord.items.length} item(s) &bull; {ord.paymentMethod}
                        </p>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-3">
                        <span className="font-bold text-emerald-800">
                          Rs. {ord.total.toLocaleString()}
                        </span>
                        <button
                          onClick={() => goToOrderTracking(ord.id)}
                          className="bg-gray-100 hover:bg-emerald-50 text-gray-700 hover:text-emerald-800 px-3 py-1.5 rounded font-medium text-[11px]"
                        >
                          Track
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Primary Address Quick View */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-3">
                  <h3 className="text-sm font-bold text-gray-900">Primary Delivery Address</h3>
                  <button
                    onClick={() => setActiveTab('profile')}
                    className="text-xs text-emerald-700 hover:underline font-semibold"
                  >
                    Edit
                  </button>
                </div>
                <div className="text-xs text-gray-600 space-y-1">
                  <p className="font-bold text-gray-900">{user?.name}</p>
                  <p>{user?.address}</p>
                  <p>{user?.area}, {user?.city}, Pakistan</p>
                  <p className="text-gray-500">Phone: {user?.phone}</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROFILE */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs space-y-4">
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-3">
                Edit Profile Information
              </h2>
              <form onSubmit={handleProfileSave} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={profilePhone}
                      onChange={(e) => setProfilePhone(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Delivery Address</label>
                  <input
                    type="text"
                    value={profileAddress}
                    onChange={(e) => setProfileAddress(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">City</label>
                    <select
                      value={profileCity}
                      onChange={(e) => setProfileCity(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-600 bg-white"
                    >
                      {pakistaniCities.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Area / Sector</label>
                    <input
                      type="text"
                      value={profileArea}
                      onChange={(e) => setProfileArea(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-600"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-5 py-2.5 rounded text-xs transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 3: ADDRESSES */}
          {activeTab === 'addresses' && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-3 mb-4">
                  Saved Pakistani Delivery Addresses
                </h2>
                <div className="p-4 rounded-lg border border-emerald-300 bg-emerald-50/50 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900">{user?.name} (Home)</span>
                    <span className="bg-emerald-700 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      DEFAULT
                    </span>
                  </div>
                  <p className="text-gray-700">{user?.address}</p>
                  <p className="text-gray-700">{user?.area}, {user?.city}, Pakistan</p>
                  <p className="text-gray-500">Phone: {user?.phone}</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PASSWORD */}
          {activeTab === 'password' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs space-y-4 max-w-md">
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-3">
                Change Account Password
              </h2>
              <form onSubmit={handlePasswordSave} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Current Password</label>
                  <input
                    type="password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">New Password</label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    required
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="pt-2">
                  <button
                    type="submit"
                    className="bg-emerald-700 text-white font-bold px-5 py-2.5 rounded text-xs"
                  >
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
