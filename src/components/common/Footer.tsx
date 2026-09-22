import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  Store,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCustomerView, setCategoryFilter, categories, showToast } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      showToast('Shukriya! You are subscribed to Imran General Store deals.', 'success');
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800 mt-12">
      {/* Main Footer Grid with exact columns: Customer Service, About, Categories, Contact */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Customer Service */}
          <div className="space-y-3 text-xs">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-gray-800 pb-2">
              Customer Service
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button
                  onClick={() => setCustomerView('order-tracking')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Track Your Order
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCustomerView('my-orders')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Orders &amp; Purchase History
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCustomerView('cart')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Shopping Cart
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCustomerView('contact')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Help Center &amp; FAQs
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCustomerView('contact')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Returns &amp; Replacement Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: About */}
          <div className="space-y-3 text-xs">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-gray-800 pb-2">
              About
            </h4>
            <p className="text-gray-400 leading-relaxed">
              Imran General Store is a leading Pakistani FMCG retailer delivering authentic everyday personal care, cosmetics, tea, coffee, grocery essentials, and cleaning products directly to your doorstep.
            </p>
            <ul className="space-y-1.5 text-gray-400 pt-1">
              <li>
                <button
                  onClick={() => setCustomerView('about')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  About Our Store
                </button>
              </li>
              <li>
                <span className="text-emerald-400 font-semibold">100% Genuine Brands Guarantee</span>
              </li>
              <li>
                <span>Cash on Delivery (Nationwide)</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Categories */}
          <div className="space-y-3 text-xs">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-gray-800 pb-2">
              Categories
            </h4>
            <ul className="space-y-2 text-gray-400">
              {categories.slice(0, 7).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      setCategoryFilter(cat.name);
                      setCustomerView('shop');
                    }}
                    className="hover:text-emerald-400 transition-colors text-left"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="space-y-3 text-xs">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-gray-800 pb-2">
              Contact
            </h4>
            <div className="space-y-2 text-gray-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Shop # 14-16, Commercial Market, Clifton, Karachi, Pakistan</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+92 21 3456 7890 / +92 300 1234567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>support@imrangeneralstore.pk</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Mon - Sat: 9:00 AM - 10:00 PM</span>
              </div>
            </div>

            {/* Newsletter */}
            <form onSubmit={handleSubscribe} className="pt-2 flex gap-1.5">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full px-2.5 py-1.5 text-xs bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold px-3 py-1.5 rounded text-xs shrink-0 transition-colors"
              >
                {subscribed ? '✓' : 'Join'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-gray-800 py-4 text-xs text-gray-500 text-center px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>Copyright &copy; {new Date().getFullYear()} Imran General Store. All rights reserved.</p>
          <div className="flex items-center gap-2 text-[11px] text-gray-400">
            <span>Karachi</span> &bull; <span>Lahore</span> &bull; <span>Islamabad</span> &bull; <span>Nationwide COD</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
