import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
  ShieldCheck,
  Truck,
  Tag,
  Check,
  X,
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    subtotal,
    shipping,
    discount,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    setCustomerView,
    settings,
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput('');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-100">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Your Shopping Cart is Empty</h2>
        <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
          You haven&rsquo;t added any grocery or personal care items to your basket yet. Check out our daily discounts on soaps, teas, and cleaners!
        </p>
        <div className="pt-2">
          <button
            onClick={() => setCustomerView('shop')}
            className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs px-6 py-3 rounded-md shadow-xs transition-colors"
          >
            Start Shopping Everyday Essentials
          </button>
        </div>
      </div>
    );
  }

  const freeShippingNeeded = Math.max(0, settings.freeShippingThreshold - subtotal);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6 border-b border-gray-200 pb-3 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Shopping Cart</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Review your items and proceed to Cash on Delivery checkout
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-red-600 hover:text-red-700 font-medium"
        >
          Clear Cart
        </button>
      </div>

      {/* Free shipping progress bar */}
      {freeShippingNeeded > 0 ? (
        <div className="mb-6 bg-emerald-50 border border-emerald-200 p-3.5 rounded-lg text-xs text-emerald-900 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>
              Add <strong>Rs. {freeShippingNeeded.toLocaleString()}</strong> more to get{' '}
              <strong>FREE Nationwide Delivery!</strong>
            </span>
          </div>
          <button
            onClick={() => setCustomerView('shop')}
            className="text-xs font-bold text-emerald-700 hover:underline shrink-0"
          >
            Add items &rarr;
          </button>
        </div>
      ) : (
        <div className="mb-6 bg-emerald-100 border border-emerald-300 p-3 rounded-lg text-xs text-emerald-950 font-semibold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-700" />
          Congratulations! You qualified for FREE Delivery on this order.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cart Items Table/List */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs">
          <div className="p-4 sm:p-6 divide-y divide-gray-200">
            {cart.map(({ product, quantity }) => {
              const itemTotal = product.salePrice * quantity;
              return (
                <div
                  key={product.id}
                  className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-contain rounded border border-gray-200 bg-gray-50 p-1 shrink-0"
                    />
                    <div>
                      <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                        {product.brand}
                      </span>
                      <h3 className="text-xs sm:text-sm font-semibold text-gray-900 line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Unit Price: <strong>Rs. {product.salePrice.toLocaleString()}</strong> ({product.unit})
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                    {/* Quantity Controls */}
                    <div className="flex items-center border border-gray-300 rounded bg-white">
                      <button
                        onClick={() => updateCartQuantity(product.id, quantity - 1)}
                        className="px-2.5 py-1 text-gray-600 hover:bg-gray-100 text-xs font-bold"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 py-1 text-xs font-bold text-gray-800 min-w-[2rem] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(product.id, quantity + 1)}
                        className="px-2.5 py-1 text-gray-600 hover:bg-gray-100 text-xs font-bold"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Subtotal */}
                    <div className="text-right min-w-[5rem]">
                      <span className="text-xs sm:text-sm font-bold text-emerald-900">
                        Rs. {itemTotal.toLocaleString()}
                      </span>
                    </div>

                    {/* Remove button */}
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="text-gray-400 hover:text-red-600 p-1 rounded transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-gray-50 p-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => setCustomerView('shop')}
              className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1.5"
            >
              &larr; Continue Shopping
            </button>
            <span className="text-xs text-gray-500">
              Prices include applicable Pakistani sales tax
            </span>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-gray-900 border-b border-gray-200 pb-3">
              Order Summary
            </h2>

            {/* Coupon Code Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-emerald-700" />
                Have a Promo / Coupon Code?
              </label>

              {appliedCoupon ? (
                <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-md flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-emerald-900">{appliedCoupon.code}</span>
                    <span className="text-emerald-700 ml-1.5">
                      (-Rs. {discount.toLocaleString()})
                    </span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-gray-400 hover:text-red-600 p-0.5"
                    title="Remove coupon"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-1.5">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="e.g. IMRAN10 or FIRST50"
                    className="flex-1 text-xs px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-emerald-600 uppercase"
                  />
                  <button
                    type="submit"
                    className="bg-gray-800 hover:bg-gray-900 text-white text-xs font-semibold px-3 py-2 rounded transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponError && <p className="text-[11px] text-red-600">{couponError}</p>}
            </div>

            {/* Price Calculations */}
            <div className="space-y-2.5 text-xs border-t border-gray-100 pt-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-bold text-gray-900">Rs. {subtotal.toLocaleString()}</span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Nationwide Shipping</span>
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
                  <span>Coupon Discount</span>
                  <span>- Rs. {discount.toLocaleString()}</span>
                </div>
              )}

              <div className="border-t border-gray-200 pt-3 flex justify-between items-baseline">
                <span className="text-sm font-bold text-gray-900">Total Amount</span>
                <span className="text-lg font-black text-emerald-800">
                  Rs. {total.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Checkout CTA */}
            <div className="pt-2 space-y-2">
              <button
                onClick={() => setCustomerView('checkout')}
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-md text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                Proceed to Checkout
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-center text-gray-500 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                Pay with Cash on Delivery at your door
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
