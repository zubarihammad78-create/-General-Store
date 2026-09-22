import React, { useState } from 'react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';
import { Star, ShoppingCart, Check, Heart, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, compact = false }) => {
  const { addToCart, setQuickViewProduct, goToProduct, cart, showToast } = useStore();
  const [isWishlisted, setIsWishlisted] = useState(false);

  const cartItem = cart.find((item) => item.product.id === product.id);
  const isInCart = Boolean(cartItem);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    showToast(
      !isWishlisted ? `Added ${product.name} to wishlist` : `Removed from wishlist`,
      'info'
    );
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div
      onClick={() => goToProduct(product.id)}
      className="bg-white rounded-lg border border-gray-200/90 hover:border-emerald-500/80 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group cursor-pointer relative overflow-hidden h-full"
    >
      {/* Top Badges: Discount & Wishlist */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1 pointer-events-none">
        {product.discountPercent > 0 && (
          <span className="bg-red-600 text-white text-[10px] sm:text-[11px] font-extrabold px-1.5 sm:px-2 py-0.5 rounded shadow-xs">
            -{product.discountPercent}%
          </span>
        )}
        {product.stock <= product.lowStockThreshold && product.stock > 0 && (
          <span className="bg-amber-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs">
            Few Left
          </span>
        )}
      </div>

      <button
        type="button"
        onClick={toggleWishlist}
        className={`absolute top-2 right-2 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all ${
          isWishlisted
            ? 'bg-red-50 text-red-600 shadow-xs'
            : 'bg-white/80 backdrop-blur-xs text-gray-400 hover:text-red-500 hover:bg-white shadow-xs'
        }`}
        title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        aria-label="Wishlist"
      >
        <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
      </button>

      {/* Product Image (takes ~55-60% height) */}
      <div className="relative bg-gray-50/70 aspect-[4/3] sm:aspect-square flex items-center justify-center p-3 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Quick View Hover Pill */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none sm:pointer-events-auto">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="hidden sm:flex items-center gap-1.5 bg-white/95 text-gray-900 hover:text-emerald-700 hover:bg-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md transition-all scale-95 group-hover:scale-100"
          >
            <Eye className="w-3.5 h-3.5 text-emerald-600" />
            Quick View
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-2.5 sm:p-3 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Unit */}
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-gray-500 mb-1">
            <span className="font-semibold text-emerald-800 uppercase tracking-wider truncate max-w-[65%]">
              {product.brand}
            </span>
            <span className="text-gray-400 text-[10px] shrink-0">{product.unit}</span>
          </div>

          {/* Product Name (2-line clamp) */}
          <h3 className="font-semibold text-gray-900 text-xs sm:text-[13px] leading-snug line-clamp-2 min-h-[2.4rem] group-hover:text-emerald-700 transition-colors">
            {product.name}
          </h3>

          {/* Star Rating & Review Count */}
          <div className="flex items-center gap-1.5 mt-1">
            <div className="flex items-center text-amber-400">
              <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400" />
            </div>
            <span className="text-[11px] font-bold text-gray-800">{product.rating}</span>
            <span className="text-[10px] text-gray-400">({product.reviewCount})</span>
          </div>
        </div>

        {/* Pricing & Cart Action */}
        <div className="mt-2.5 pt-2 border-t border-gray-100">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="text-sm sm:text-base font-extrabold text-gray-900">
              Rs. {product.salePrice.toLocaleString()}
            </span>
            {product.price > product.salePrice && (
              <span className="text-[11px] sm:text-xs text-gray-400 line-through">
                Rs. {product.price.toLocaleString()}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            type="button"
            onClick={handleAddToCart}
            className={`w-full mt-2 py-1.5 sm:py-2 px-2 rounded-md text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs ${
              isInCart
                ? 'bg-emerald-800 text-white hover:bg-emerald-900'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white active:scale-[0.98]'
            }`}
          >
            {isInCart ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-300" />
                <span>In Cart ({cartItem?.quantity})</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
