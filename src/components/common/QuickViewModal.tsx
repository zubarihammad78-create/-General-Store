import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Star, ShoppingCart, Check, ShieldCheck, Truck } from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, goToProduct } = useStore();
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs">
      <div className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden border border-gray-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2">
          {/* Left: Image */}
          <div className="bg-gray-50 p-6 flex items-center justify-center border-b sm:border-b-0 sm:border-r border-gray-200">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-64 object-contain"
            />
          </div>

          {/* Right: Info */}
          <div className="p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-emerald-800 font-semibold mb-1">
                <span>{product.brand}</span>
                <span className="text-gray-500 font-normal">SKU: {product.sku}</span>
              </div>

              <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-1.5 mt-2">
                <div className="flex text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                </div>
                <span className="text-xs font-bold text-gray-800">{product.rating}</span>
                <span className="text-xs text-gray-500">
                  ({product.reviewCount} customer reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-xl font-extrabold text-emerald-800">
                  Rs. {product.salePrice.toLocaleString()}
                </span>
                {product.price > product.salePrice && (
                  <span className="text-sm text-gray-400 line-through">
                    Rs. {product.price.toLocaleString()}
                  </span>
                )}
                {product.discountPercent > 0 && (
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded">
                    Save {product.discountPercent}%
                  </span>
                )}
              </div>

              <p className="text-xs text-gray-600 mt-3 line-clamp-3 leading-relaxed">
                {product.description}
              </p>

              {/* Stock status */}
              <div className="mt-3 flex items-center gap-2 text-xs">
                <span className="font-semibold text-gray-700">Availability:</span>
                {product.stock > 0 ? (
                  <span className="text-emerald-700 font-medium flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> In Stock ({product.stock} units)
                  </span>
                ) : (
                  <span className="text-red-600 font-medium">Out of Stock</span>
                )}
              </div>

              <div className="mt-2 text-[11px] text-gray-500 flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-emerald-600" /> Delivery: 2-3 Days
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Cash on Delivery
                </span>
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="mt-6 pt-4 border-t border-gray-100 space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-2.5 py-1 text-gray-600 hover:bg-gray-100 font-bold"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-xs font-bold text-gray-800 min-w-[2rem] text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    className="px-2.5 py-1 text-gray-600 hover:bg-gray-100 font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white py-2 px-4 rounded-md text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  goToProduct(product.id);
                  setQuickViewProduct(null);
                }}
                className="w-full text-center text-xs text-emerald-700 hover:text-emerald-800 font-semibold py-1"
              >
                View Full Specifications &amp; Reviews &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
