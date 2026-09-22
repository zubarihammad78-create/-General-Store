import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../common/ProductCard';
import {
  Star,
  ShoppingCart,
  Zap,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  Share2,
  Heart,
  FileText,
  ListCheck,
  HelpCircle,
  MessageSquare,
  BadgeCheck,
} from 'lucide-react';

export const ProductDetailsPage: React.FC = () => {
  const {
    products,
    selectedProductId,
    addToCart,
    setCustomerView,
    reviews,
    showToast,
  } = useStore();

  const product =
    products.find((p) => p.id === selectedProductId) || products[0];

  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'ingredients' | 'reviews'>('description');
  
  // New review state
  const [newRating, setNewRating] = useState<number>(5);
  const [newComment, setNewComment] = useState<string>('');
  const [reviewerName, setReviewerName] = useState<string>('');

  // Related products in same category
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // Reviews for this product
  const productReviews = reviews.filter(
    (r) => r.productId === product.id && r.status === 'Approved'
  );

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    setCustomerView('checkout');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !newComment.trim()) return;
    showToast('Thank you! Your product review has been submitted for verification.', 'success');
    setReviewerName('');
    setNewComment('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-10">
      {/* Breadcrumbs */}
      <div className="text-xs text-gray-500 flex items-center gap-1.5">
        <button onClick={() => setCustomerView('home')} className="hover:text-emerald-700">Home</button>
        <span>/</span>
        <button onClick={() => setCustomerView('shop')} className="hover:text-emerald-700">Shop</button>
        <span>/</span>
        <span className="text-gray-400">{product.category}</span>
        <span>/</span>
        <span className="text-emerald-800 font-semibold truncate max-w-xs">{product.name}</span>
      </div>

      {/* Main Product Screen Top Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white p-6 rounded-xl border border-gray-200 shadow-xs">
        {/* Left: Product Gallery */}
        <div className="lg:col-span-5 space-y-4">
          <div className="aspect-square bg-gray-50 rounded-lg border border-gray-200 overflow-hidden flex items-center justify-center p-4 relative group">
            {product.discountPercent > 0 && (
              <span className="absolute top-3 left-3 bg-emerald-700 text-white text-xs font-bold px-2.5 py-1 rounded shadow-xs">
                {product.discountPercent}% OFF
              </span>
            )}
            <img
              src={activeImage || product.image}
              alt={product.name}
              className="max-h-80 object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Thumbnail Gallery */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setActiveImage(product.image)}
              className={`w-16 h-16 rounded border-2 p-1 bg-gray-50 shrink-0 transition-colors ${
                activeImage === product.image ? 'border-emerald-700' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
            </button>
            {product.gallery?.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`w-16 h-16 rounded border-2 p-1 bg-gray-50 shrink-0 transition-colors ${
                  activeImage === img ? 'border-emerald-700' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-contain" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product Details & Purchase Actions */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div className="space-y-4">
            {/* Brand & SKU */}
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded border border-emerald-100">
                Brand: {product.brand}
              </span>
              <span className="text-gray-400">SKU: {product.sku}</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-gray-800">{product.rating} / 5.0</span>
              <span className="text-xs text-gray-400">
                ({product.reviewCount} customer reviews)
              </span>
              <span className="text-emerald-700 text-xs font-medium border-l border-gray-200 pl-3">
                {product.unit}
              </span>
            </div>

            {/* Price Box */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-black text-emerald-800">
                Rs. {product.salePrice.toLocaleString()}
              </span>
              {product.price > product.salePrice && (
                <span className="text-base text-gray-400 line-through">
                  Rs. {product.price.toLocaleString()}
                </span>
              )}
              {product.discountPercent > 0 && (
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded">
                  Save Rs. {product.price - product.salePrice} ({product.discountPercent}%)
                </span>
              )}
            </div>

            {/* Stock status */}
            <div className="flex items-center gap-2 text-xs">
              <span className="font-semibold text-gray-700">Stock Status:</span>
              {product.stock > 0 ? (
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <Check className="w-4 h-4" /> In Stock ({product.stock} units available at warehouse)
                </span>
              ) : (
                <span className="text-red-600 font-bold">Currently Out of Stock</span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {product.description}
            </p>

            {/* Quantity Selector & Action Buttons */}
            <div className="pt-2 space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-gray-700">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-md bg-white">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 font-bold"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-xs font-bold text-gray-800 min-w-[2.5rem] text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 font-bold"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-gray-500">
                  Total: <strong>Rs. {(product.salePrice * quantity).toLocaleString()}</strong>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 px-6 rounded-md text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="bg-amber-500 hover:bg-amber-600 text-amber-950 font-bold py-3 px-6 rounded-md text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  <Zap className="w-4 h-4 fill-amber-950" />
                  Buy Now (Cash on Delivery)
                </button>
              </div>
            </div>
          </div>

          {/* Value props footer in detail card */}
          <div className="grid grid-cols-3 gap-3 border-t border-gray-100 pt-4 mt-6 text-center text-xs text-gray-600">
            <div className="flex flex-col items-center gap-1">
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
              <span className="font-semibold text-gray-800">Cash on Delivery</span>
              <span className="text-[10px] text-gray-400">Pay at your doorstep</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Truck className="w-5 h-5 text-emerald-700" />
              <span className="font-semibold text-gray-800">2-3 Day Delivery</span>
              <span className="text-[10px] text-gray-400">Karachi, LHR, ISB &amp; more</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <BadgeCheck className="w-5 h-5 text-emerald-700" />
              <span className="font-semibold text-gray-800">100% Genuine</span>
              <span className="text-[10px] text-gray-400">Original FMCG pack</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs for Description, Specifications, Ingredients, Customer Reviews */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs">
        <div className="flex border-b border-gray-200 bg-gray-50 overflow-x-auto">
          <button
            onClick={() => setActiveTab('description')}
            className={`px-5 py-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${
              activeTab === 'description'
                ? 'border-emerald-700 text-emerald-800 bg-white'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`px-5 py-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${
              activeTab === 'specs'
                ? 'border-emerald-700 text-emerald-800 bg-white'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Product Specifications
          </button>
          <button
            onClick={() => setActiveTab('ingredients')}
            className={`px-5 py-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${
              activeTab === 'ingredients'
                ? 'border-emerald-700 text-emerald-800 bg-white'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Ingredients &amp; Details
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-5 py-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'reviews'
                ? 'border-emerald-700 text-emerald-800 bg-white'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Customer Reviews ({productReviews.length})
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'description' && (
            <div className="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed max-w-3xl">
              <p>{product.description}</p>
              <p>
                At Imran General Store, all our fast-moving consumer goods (FMCG) are directly sourced from authorized brand distributors across Pakistan. Each item undergoes strict expiry date inspection and is sealed securely before dispatch.
              </p>
              <h4 className="font-bold text-gray-900 text-sm pt-2">Usage &amp; Storage Instructions:</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>Store in a cool, dry place away from direct sunlight and heat.</li>
                <li>Keep lid/cap securely closed after every use.</li>
                <li>For external application products, avoid contact with eyes.</li>
              </ul>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="max-w-2xl">
              <table className="w-full text-xs text-left border-collapse border border-gray-200">
                <tbody>
                  {Object.entries(product.specifications).map(([key, val], idx) => (
                    <tr key={key} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="p-3 font-semibold text-gray-800 border-b border-gray-200 w-1/3">
                        {key}
                      </td>
                      <td className="p-3 text-gray-600 border-b border-gray-200">
                        {val}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50">
                    <td className="p-3 font-semibold text-gray-800 border-b border-gray-200">Store SKU</td>
                    <td className="p-3 text-gray-600 border-b border-gray-200">{product.sku}</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-3 font-semibold text-gray-800 border-b border-gray-200">Payment Option</td>
                    <td className="p-3 text-gray-600 border-b border-gray-200">Cash on Delivery (COD) Available</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'ingredients' && (
            <div className="space-y-3 text-xs sm:text-sm text-gray-700 max-w-2xl">
              <h4 className="font-bold text-gray-900">Formulation &amp; Active Ingredients:</h4>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-xs text-gray-600 font-mono leading-relaxed">
                {product.ingredients || 'Standard certified packaging formulation according to Pakistan Standards and Quality Control Authority (PSQCA) regulations.'}
              </div>
              <p className="text-xs text-gray-500">
                Manufactured under GMP standards and tested for consumer safety.
              </p>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-8">
              {/* Existing Reviews List */}
              <div className="space-y-4">
                {productReviews.length > 0 ? (
                  productReviews.map((rev) => (
                    <div key={rev.id} className="p-4 rounded-lg bg-gray-50 border border-gray-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-gray-900">{rev.customerName}</span>
                          <span className="text-[11px] text-gray-400">({rev.customerCity})</span>
                          {rev.verifiedPurchase && (
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                              Verified Purchase
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-gray-400">{rev.date}</span>
                      </div>
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < rev.rating ? 'fill-amber-400' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-gray-700 leading-relaxed">{rev.comment}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-gray-500">
                    No verified customer reviews yet for this product. Be the first to review!
                  </p>
                )}
              </div>

              {/* Submit a Review Form */}
              <div className="border-t border-gray-200 pt-6 max-w-xl">
                <h4 className="text-sm font-bold text-gray-900 mb-3">Write a Customer Review</h4>
                <form onSubmit={handleReviewSubmit} className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-gray-700">Your Rating:</span>
                    <div className="flex gap-1 text-amber-400 cursor-pointer">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewRating(star)}
                          className="p-0.5 hover:scale-110 transition-transform"
                        >
                          <Star
                            className={`w-4 h-4 ${
                              star <= newRating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <input
                      type="text"
                      required
                      value={reviewerName}
                      onChange={(e) => setReviewerName(e.target.value)}
                      placeholder="Your Full Name & City (e.g. Asad Ali, Lahore)"
                      className="w-full text-xs px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-emerald-600"
                    />
                  </div>

                  <div>
                    <textarea
                      required
                      rows={3}
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Share your experience with product quality, packaging, and delivery..."
                      className="w-full text-xs px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-emerald-600"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-4 py-2 rounded transition-colors"
                  >
                    Submit Review
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-2">
            <h3 className="text-lg font-bold text-gray-900">
              Related Everyday Products
            </h3>
            <button
              onClick={() => setCustomerView('shop')}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
            >
              See All in {product.category} &rarr;
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
