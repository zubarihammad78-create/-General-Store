import React from 'react';
import { useStore } from '../../context/StoreContext';
import {
  Store,
  ShieldCheck,
  Truck,
  HeartHandshake,
  BadgeCheck,
  CheckCircle2,
  Users,
  Award,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setCustomerView } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      {/* Hero / Store Story */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">
          <Store className="w-3.5 h-3.5" />
          <span>Serving Pakistani Families Since 2012</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
          About Imran General Store
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
          Founded in Lahore, Pakistan, Imran General Store began as a trusted neighbourhood retail grocery shop dedicated to providing genuine household essentials at fair market prices. Over the past decade, we have expanded into a modern nationwide e-commerce platform delivering daily fast-moving consumer goods (FMCG) to every province in Pakistan.
        </p>
      </section>

      {/* Visual Stats Row */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-200 text-center shadow-xs">
          <span className="text-2xl sm:text-3xl font-black text-emerald-800">12+</span>
          <p className="text-xs text-gray-500 mt-1 font-medium">Years of Trust</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 text-center shadow-xs">
          <span className="text-2xl sm:text-3xl font-black text-emerald-800">25,000+</span>
          <p className="text-xs text-gray-500 mt-1 font-medium">Happy Pakistani Homes</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 text-center shadow-xs">
          <span className="text-2xl sm:text-3xl font-black text-emerald-800">100%</span>
          <p className="text-xs text-gray-500 mt-1 font-medium">Original Distributor Stock</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 text-center shadow-xs">
          <span className="text-2xl sm:text-3xl font-black text-emerald-800">50+</span>
          <p className="text-xs text-gray-500 mt-1 font-medium">Pakistani Cities Covered</p>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-gray-900">Our Mission</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            To make high-quality, authentic everyday FMCG items easily accessible and affordable for every Pakistani household without the stress of market rush or fake products.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-gray-900">Honesty &amp; Transparency</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Every product price listed on Imran General Store includes all taxes with zero hidden charges. What you see on checkout is exactly what you pay in Cash on Delivery.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-gray-900">100% Originality Guarantee</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            We partner strictly with authorized FMCG national distributors such as Unilever Pakistan, Procter &amp; Gamble, Reckitt, Colgate-Palmolive, and Tapal Tea.
          </p>
        </div>
      </section>

      {/* Our Promises Grid */}
      <section className="bg-gray-50 rounded-2xl border border-gray-200 p-8 sm:p-10 space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">The Imran General Store Promise</h2>
          <p className="text-xs text-gray-500 mt-1">
            Built on traditional values with modern e-commerce convenience
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto text-xs">
          <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200">
            <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-gray-900">Fresh Stock &amp; Long Expiry Dates</h4>
              <p className="text-gray-500 mt-0.5">
                Every unit in our warehouse is regularly audited so you never receive close-to-expiry stock.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200">
            <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-gray-900">Hassle-free Cash on Delivery</h4>
              <p className="text-gray-500 mt-0.5">
                Pay safely in rupees when your package arrives at your home anywhere in Pakistan.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200">
            <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-gray-900">Secure Bubble &amp; Corrugated Packaging</h4>
              <p className="text-gray-500 mt-0.5">
                Liquid shampoos, cleaning bottles, and glass jars are double-sealed to prevent transit spills.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200">
            <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-gray-900">Friendly Urdu &amp; English Customer Helpline</h4>
              <p className="text-gray-500 mt-0.5">
                Our helpline team is just a call or WhatsApp away to assist you with order questions.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center pt-4">
          <button
            onClick={() => setCustomerView('shop')}
            className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-6 py-3 rounded-md shadow-xs transition-colors inline-flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            Start Shopping Our Everyday Essentials
          </button>
        </div>
      </section>
    </div>
  );
};
