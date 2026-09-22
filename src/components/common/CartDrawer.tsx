import React from 'react';
import { useStore } from '../../context/StoreContext';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    subtotal,
    setCustomerView,
  } = useStore();

  if (!isCartDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 border-b border-gray-200 flex items-center justify-between bg-gray-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-700" />
              <h2 className="text-sm font-bold text-gray-900">
                Shopping Basket ({cart.length} items)
              </h2>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1.5 text-gray-400 hover:text-gray-700 rounded-md"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart items */}
          <div className="flex-1 overflow-y-auto p-4 divide-y divide-gray-100">
            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto" />
                <p className="text-xs text-gray-500 font-medium">Your basket is currently empty.</p>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    setCustomerView('shop');
                  }}
                  className="bg-emerald-700 text-white text-xs font-semibold px-4 py-2 rounded shadow-xs"
                >
                  Shop FMCG Essentials
                </button>
              </div>
            ) : (
              cart.map(({ product, quantity }) => (
                <div key={product.id} className="py-3.5 flex items-center justify-between gap-3 text-xs">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-14 h-14 object-contain rounded border border-gray-200 p-1 bg-white shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-emerald-800 uppercase block">
                      {product.brand}
                    </span>
                    <h4 className="font-semibold text-gray-900 truncate">{product.name}</h4>
                    <p className="text-emerald-800 font-bold font-mono mt-0.5">
                      Rs. {product.salePrice.toLocaleString()}
                    </p>

                    <div className="flex items-center gap-2 mt-1">
                      <div className="inline-flex items-center border border-gray-300 rounded bg-white">
                        <button
                          onClick={() => updateCartQuantity(product.id, quantity - 1)}
                          className="px-2 py-0.5 text-gray-600 hover:bg-gray-100 font-bold"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-gray-800 font-mono">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(product.id, quantity + 1)}
                          className="px-2 py-0.5 text-gray-600 hover:bg-gray-100 font-bold"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="text-gray-400 hover:text-red-600 p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-bold text-gray-900 font-mono">
                      Rs. {(product.salePrice * quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-gray-200 bg-gray-50 space-y-3">
              <div className="flex justify-between items-baseline text-xs">
                <span className="text-gray-600 font-medium">Subtotal</span>
                <span className="text-base font-black text-emerald-800 font-mono">
                  Rs. {subtotal.toLocaleString()}
                </span>
              </div>
              <p className="text-[11px] text-gray-400">
                Shipping and promotional discounts calculated at checkout
              </p>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    setCustomerView('cart');
                  }}
                  className="w-full bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 text-xs font-semibold py-2.5 rounded transition-colors text-center"
                >
                  View Full Cart
                </button>

                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    setCustomerView('checkout');
                  }}
                  className="w-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold py-2.5 rounded transition-colors text-center flex items-center justify-center gap-1.5 shadow-xs"
                >
                  Checkout (COD)
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
