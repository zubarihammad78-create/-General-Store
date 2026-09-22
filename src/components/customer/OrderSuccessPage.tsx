import React from 'react';
import { useStore } from '../../context/StoreContext';
import {
  CheckCircle2,
  Package,
  Truck,
  MapPin,
  Clock,
  ArrowRight,
  ShoppingBag,
  Printer,
  ShieldCheck,
  MessageCircle,
} from 'lucide-react';

export const OrderSuccessPage: React.FC = () => {
  const {
    lastPlacedOrder,
    orders,
    setCustomerView,
    setSelectedOrderId,
    goToOrderTracking,
    settings,
  } = useStore();

  const order = lastPlacedOrder || orders[0];
  const whatsappPhone = settings.whatsapp.replace(/\D/g, '');
  const whatsappMessage = `Order ${order?.orderNumber} confirmation: ${order?.items.map((item) => `${item.productName} x${item.quantity}`).join(', ')}. Total Rs. ${order?.total.toLocaleString()}`;

  if (!order) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center px-4">
        <h2 className="text-xl font-bold text-gray-900">No active order found</h2>
        <button
          onClick={() => setCustomerView('home')}
          className="mt-4 bg-emerald-700 text-white px-4 py-2 rounded text-xs"
        >
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* 1. Success Notification Card */}
      <div className="bg-white rounded-xl border border-emerald-200 p-8 text-center shadow-xs space-y-4">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div>
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Shukriya! Order Confirmed
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2">
            Order Placed Successfully
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-md mx-auto">
            Your order has been recorded in our dispatch system and will be delivered via Cash on Delivery.
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 max-w-md mx-auto border border-gray-200 flex items-center justify-between">
          <div className="text-left">
            <span className="text-[11px] text-gray-400 block font-medium">Order Reference #</span>
            <span className="text-base font-extrabold text-emerald-800">{order.orderNumber}</span>
          </div>
          <div className="text-right">
            <span className="text-[11px] text-gray-400 block font-medium">Order Date</span>
            <span className="text-xs font-bold text-gray-800">{order.date}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => goToOrderTracking(order.id)}
            className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-6 py-2.5 rounded-md flex items-center justify-center gap-2 transition-colors shadow-xs"
          >
            <Truck className="w-4 h-4" />
            Track Order Status
          </button>

          <button
            onClick={() => setCustomerView('shop')}
            className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold px-6 py-2.5 rounded-md flex items-center justify-center gap-2 transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            Continue Shopping
          </button>
          <a
            href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(whatsappMessage)}`}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto bg-[#25D366] hover:bg-[#1ebe5d] text-white text-xs font-bold px-6 py-2.5 rounded-md flex items-center justify-center gap-2 transition-colors shadow-xs"
          >
            <MessageCircle className="w-4 h-4" />
            Send on WhatsApp
          </a>
        </div>
      </div>

      {/* 2. Order Details Breakdown */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs space-y-6">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-3 flex items-center gap-2">
          <Package className="w-4 h-4 text-emerald-700" />
          Ordered FMCG Products
        </h2>

        {/* Item table */}
        <div className="divide-y divide-gray-100">
          {order.items.map((item, idx) => (
            <div key={idx} className="py-3 first:pt-0 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.productName}
                  className="w-12 h-12 object-contain rounded border border-gray-200 bg-gray-50 p-1 shrink-0"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{item.productName}</h4>
                  <p className="text-[11px] text-gray-400">
                    Quantity: {item.quantity} &bull; {item.unit}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="font-bold text-gray-900">
                  Rs. {(item.price * item.quantity).toLocaleString()}
                </span>
                <p className="text-[10px] text-gray-400">Rs. {item.price} each</p>
              </div>
            </div>
          ))}
        </div>

        {/* Financial Totals */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 space-y-2 text-xs">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span className="font-semibold text-gray-900">Rs. {order.subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span>{order.shipping === 0 ? <strong className="text-emerald-700">FREE</strong> : `Rs. ${order.shipping}`}</span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-emerald-700">
              <span>Coupon Discount ({order.couponCode})</span>
              <span>- Rs. {order.discount.toLocaleString()}</span>
            </div>
          )}
          <div className="border-t border-gray-200 pt-2 flex justify-between items-baseline font-bold text-sm">
            <span className="text-gray-900">Total Amount Payable</span>
            <span className="text-base text-emerald-800 font-extrabold">
              Rs. {order.total.toLocaleString()}
            </span>
          </div>
          <div className="pt-1 flex items-center justify-between text-[11px] text-gray-500">
            <span>Payment Method:</span>
            <span className="font-bold text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded">
              {order.paymentMethod}
            </span>
          </div>
        </div>

        {/* Customer & Delivery Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-gray-100 text-xs">
          <div className="space-y-1.5">
            <h3 className="font-bold text-gray-900 uppercase tracking-wider text-[11px]">
              Customer Information
            </h3>
            <p className="text-gray-700 font-medium">{order.customer.name}</p>
            <p className="text-gray-500">{order.customer.phone}</p>
            <p className="text-gray-500">{order.customer.email}</p>
          </div>

          <div className="space-y-1.5">
            <h3 className="font-bold text-gray-900 uppercase tracking-wider text-[11px]">
              Delivery Destination
            </h3>
            <p className="text-gray-700">{order.customer.address}</p>
            <p className="text-gray-700 font-medium">
              {order.customer.area ? `${order.customer.area}, ` : ''}{order.customer.city}
            </p>
            <p className="text-emerald-800 font-semibold flex items-center gap-1 pt-1">
              <Clock className="w-3.5 h-3.5 text-emerald-700" /> Expected Delivery: 2 - 3 Days
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
