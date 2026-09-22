import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { pakistaniCities } from '../../data/mockData';
import {
  ShieldCheck,
  Truck,
  CheckCircle2,
  Lock,
  Building,
  CreditCard,
  Banknote,
  ArrowRight,
  Phone,
  MapPin,
  AlertCircle,
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    subtotal,
    shipping,
    discount,
    total,
    appliedCoupon,
    placeOrder,
    setCustomerView,
    user,
  } = useStore();

  const [fullName, setFullName] = useState(user?.name || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phone || '');
  const [email, setEmail] = useState(user?.email || '');
  const [address, setAddress] = useState(user?.address || '');
  const [city, setCity] = useState(user?.city || 'Karachi');
  const [area, setArea] = useState(user?.area || 'Clifton');
  const [postalCode, setPostalCode] = useState('75600');
  const [orderNotes, setOrderNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Cash on Delivery' | 'JazzCash' | 'EasyPaisa' | 'Bank Transfer'>('Cash on Delivery');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center px-4 space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Your cart is empty</h2>
        <p className="text-xs text-gray-500">Please add items to your cart before proceeding to checkout.</p>
        <button
          onClick={() => setCustomerView('shop')}
          className="bg-emerald-700 text-white px-5 py-2 rounded text-xs font-semibold"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim() || !phoneNumber.trim() || !address.trim() || !city) {
      setErrorMsg('Please complete all required delivery address fields.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      placeOrder(
        {
          fullName,
          phoneNumber,
          email: email || `${fullName.toLowerCase().replace(/\s+/g, '.')}@customer.pk`,
          address,
          city,
          area,
          postalCode,
          orderNotes,
        },
        paymentMethod
      );
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Checkout Header */}
      <div className="mb-6 border-b border-gray-200 pb-3">
        <h1 className="text-2xl font-extrabold text-gray-900">Checkout &amp; Delivery Details</h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Enter your Pakistani delivery address. Cash on Delivery is confirmed at your doorstep.
        </p>
      </div>

      {errorMsg && (
        <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-800 rounded-md text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form: Delivery & Customer Information */}
        <div className="lg:col-span-7 space-y-6">
          {/* Customer Information Box */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2 border-b border-gray-100 pb-2.5">
              <MapPin className="w-4 h-4 text-emerald-700" />
              1. Customer Information &amp; Delivery Address
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Full Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Muhammad Bilal"
                  className="w-full text-xs px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Phone / Mobile Number <span className="text-red-600">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="0300-1234567"
                  className="w-full text-xs px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-600 focus:outline-none"
                />
                <span className="text-[10px] text-gray-400">Rider will call before delivering</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Email Address (Optional)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@gmail.com for receipt tracking"
                className="w-full text-xs px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Complete Street Address <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="House / Flat No., Street, Building name, Landmark"
                className="w-full text-xs px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-600 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  City <span className="text-red-600">*</span>
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-600 focus:outline-none bg-white"
                >
                  {pakistaniCities.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Area / Sector / Town
                </label>
                <input
                  type="text"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="e.g. Clifton / F-8"
                  className="w-full text-xs px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Postal Code
                </label>
                <input
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="75600"
                  className="w-full text-xs px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-600 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Special Delivery Notes (Optional)
              </label>
              <textarea
                rows={2}
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                placeholder="e.g. Please deliver after 3:00 PM or call on gate..."
                className="w-full text-xs px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-600 focus:outline-none"
              />
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2 border-b border-gray-100 pb-2.5">
              <Banknote className="w-4 h-4 text-emerald-700" />
              2. Payment Options
            </h2>

            {/* Cash on Delivery option (Highlighted prominently) */}
            <div
              onClick={() => setPaymentMethod('Cash on Delivery')}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all flex items-start gap-3.5 ${
                paymentMethod === 'Cash on Delivery'
                  ? 'border-emerald-700 bg-emerald-50/70 shadow-xs'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === 'Cash on Delivery'}
                onChange={() => setPaymentMethod('Cash on Delivery')}
                className="mt-1 text-emerald-700 focus:ring-emerald-600 h-4 w-4"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                    💵 Cash on Delivery (COD)
                  </span>
                  <span className="bg-emerald-700 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    RECOMMENDED
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  Pay with exact cash directly to the courier delivery agent when your parcel arrives at your doorstep anywhere in Pakistan.
                </p>
                <div className="mt-2 flex items-center gap-2 text-[11px] text-emerald-800 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>No advance payment needed &bull; Safe &amp; verified</span>
                </div>
              </div>
            </div>

            {/* Other optional digital payment options */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <label
                onClick={() => setPaymentMethod('JazzCash')}
                className={`p-3 rounded border flex items-center gap-2 cursor-pointer ${
                  paymentMethod === 'JazzCash' ? 'border-emerald-700 bg-emerald-50 font-bold' : 'border-gray-200'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'JazzCash'}
                  onChange={() => setPaymentMethod('JazzCash')}
                  className="text-emerald-700"
                />
                <span>JazzCash Mobile Account</span>
              </label>

              <label
                onClick={() => setPaymentMethod('EasyPaisa')}
                className={`p-3 rounded border flex items-center gap-2 cursor-pointer ${
                  paymentMethod === 'EasyPaisa' ? 'border-emerald-700 bg-emerald-50 font-bold' : 'border-gray-200'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'EasyPaisa'}
                  onChange={() => setPaymentMethod('EasyPaisa')}
                  className="text-emerald-700"
                />
                <span>EasyPaisa Wallet</span>
              </label>

              <label
                onClick={() => setPaymentMethod('Bank Transfer')}
                className={`p-3 rounded border flex items-center gap-2 cursor-pointer ${
                  paymentMethod === 'Bank Transfer' ? 'border-emerald-700 bg-emerald-50 font-bold' : 'border-gray-200'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'Bank Transfer'}
                  onChange={() => setPaymentMethod('Bank Transfer')}
                  className="text-emerald-700"
                />
                <span>Direct Bank Transfer</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Order Summary & Place Order */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-gray-900 border-b border-gray-200 pb-3">
              Order Summary ({cart.length} items)
            </h2>

            {/* Item list preview */}
            <div className="max-h-60 overflow-y-auto space-y-3 pr-1 divide-y divide-gray-100">
              {cart.map(({ product, quantity }) => (
                <div key={product.id} className="pt-2 first:pt-0 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-10 h-10 object-contain rounded border border-gray-200 shrink-0"
                    />
                    <div className="truncate">
                      <p className="font-semibold text-gray-900 truncate">{product.name}</p>
                      <p className="text-[11px] text-gray-500">
                        Qty: {quantity} &times; Rs. {product.salePrice}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold text-gray-900 shrink-0">
                    Rs. {(product.salePrice * quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="border-t border-gray-200 pt-3 space-y-2 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900">Rs. {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping ({city})</span>
                <span>
                  {shipping === 0 ? (
                    <span className="text-emerald-700 font-bold">FREE</span>
                  ) : (
                    `Rs. ${shipping}`
                  )}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Coupon Discount ({appliedCoupon?.code})</span>
                  <span>- Rs. {discount.toLocaleString()}</span>
                </div>
              )}
              <div className="border-t border-gray-200 pt-3 flex justify-between items-baseline">
                <span className="text-sm font-bold text-gray-900">Total Payable</span>
                <span className="text-xl font-black text-emerald-800">
                  Rs. {total.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Trust badge */}
            <div className="bg-emerald-50 rounded p-3 text-[11px] text-emerald-900 space-y-1">
              <p className="font-bold flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-emerald-700" /> Expected Delivery: 2-3 Business Days
              </p>
              <p className="text-emerald-800">
                Couriers: TCS, Leopard &amp; Call Courier with SMS tracking alert.
              </p>
            </div>

            {/* Place Order Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold py-3.5 rounded-md text-sm transition-colors flex items-center justify-center gap-2 shadow-md"
            >
              {isSubmitting ? (
                <span>Confirming Order...</span>
              ) : (
                <>
                  <span>Place Order ({paymentMethod})</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <p className="text-[11px] text-center text-gray-400">
              By placing this order, you agree to receive dispatch verification notifications on WhatsApp / SMS.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};
