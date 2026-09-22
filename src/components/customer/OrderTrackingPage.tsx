import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  Truck,
  Search,
  CheckCircle2,
  Clock,
  Package,
  MapPin,
  Phone,
  ShieldCheck,
  Building2,
  Calendar,
} from 'lucide-react';

export const OrderTrackingPage: React.FC = () => {
  const { orders, selectedOrderId, setSelectedOrderId, setCustomerView } = useStore();

  const [inputOrderNumber, setInputOrderNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Active order to track
  const currentOrder =
    orders.find((o) => o.id === selectedOrderId) ||
    orders[0];

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const found = orders.find(
      (o) =>
        o.orderNumber.toLowerCase() === inputOrderNumber.trim().toLowerCase() ||
        o.id.toLowerCase() === inputOrderNumber.trim().toLowerCase() ||
        (o.trackingNumber && o.trackingNumber.toLowerCase() === inputOrderNumber.trim().toLowerCase())
    );

    if (found) {
      setSelectedOrderId(found.id);
    } else {
      setErrorMessage('No order found matching this reference number. Please verify.');
    }
  };

  const steps = [
    { title: 'Order Placed', desc: 'Received in store system' },
    { title: 'Confirmed', desc: 'Stock reserved & verified' },
    { title: 'Processing', desc: 'Packed & quality inspected' },
    { title: 'Shipped', desc: 'Handed to courier delivery' },
    { title: 'Delivered', desc: 'Paid via Cash on Delivery' },
  ];

  const getStepIndex = (status: string) => {
    switch (status) {
      case 'Pending':
        return 0;
      case 'Confirmed':
        return 1;
      case 'Processing':
        return 2;
      case 'Shipped':
        return 3;
      case 'Delivered':
        return 4;
      default:
        return 1;
    }
  };

  const currentStepIndex = currentOrder ? getStepIndex(currentOrder.status) : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
          Track Your Order
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          Enter your Imran General Store Order ID or Courier CN number to view real-time shipping progress.
        </p>
      </div>

      {/* Tracking Search Input */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-xs">
        <form onSubmit={handleTrackSubmit} className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={inputOrderNumber}
              onChange={(e) => setInputOrderNumber(e.target.value)}
              placeholder="e.g. #IGS-84920 or TCS-928341"
              className="w-full text-xs sm:text-sm pl-9 pr-3 py-2.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-emerald-600 focus:outline-none uppercase font-mono"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3.5 pointer-events-none" />
          </div>
          <button
            type="submit"
            className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-md transition-colors shadow-xs"
          >
            Track Parcel
          </button>
        </form>

        {errorMessage && (
          <p className="text-xs text-red-600 mt-2 font-medium">{errorMessage}</p>
        )}

        {/* Quick select chips for user convenience */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-gray-400">Quick Track:</span>
          {orders.slice(0, 4).map((ord) => (
            <button
              key={ord.id}
              onClick={() => {
                setSelectedOrderId(ord.id);
                setInputOrderNumber(ord.orderNumber);
              }}
              className={`px-2.5 py-1 rounded text-[11px] font-mono font-medium transition-colors ${
                currentOrder?.id === ord.id
                  ? 'bg-emerald-700 text-white font-bold'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {ord.orderNumber} ({ord.status})
            </button>
          ))}
        </div>
      </div>

      {/* Main Timeline Card */}
      {currentOrder && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 shadow-xs space-y-8">
          {/* Order Header Info */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-6">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-black text-gray-900 font-mono">
                  {currentOrder.orderNumber}
                </h2>
                <span
                  className={`px-2.5 py-0.5 rounded text-xs font-bold ${
                    currentOrder.status === 'Delivered'
                      ? 'bg-emerald-100 text-emerald-800'
                      : currentOrder.status === 'Shipped'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {currentOrder.status}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Placed on {currentOrder.date} &bull; Delivery to {currentOrder.customer.city}, Pakistan
              </p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-xs text-gray-400 block font-medium">Payment Mode</span>
              <span className="text-sm font-bold text-emerald-800">
                {currentOrder.paymentMethod} &bull; Rs. {currentOrder.total.toLocaleString()}
              </span>
            </div>
          </div>

          {/* VISUAL TIMELINE */}
          <div className="py-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-6">
              Delivery Progress
            </h3>

            <div className="relative">
              {/* Timeline Connector Line */}
              <div className="absolute top-5 left-4 right-4 h-0.5 bg-gray-200 hidden sm:block">
                <div
                  className="h-full bg-emerald-600 transition-all duration-500"
                  style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
                />
              </div>

              {/* Steps */}
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 sm:gap-2 relative z-10">
                {steps.map((step, idx) => {
                  const isCompleted = idx <= currentStepIndex;
                  const isCurrent = idx === currentStepIndex;

                  return (
                    <div key={idx} className="flex sm:flex-col items-center gap-3 sm:gap-2 text-center sm:text-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-colors shrink-0 ${
                          isCompleted
                            ? 'bg-emerald-700 text-white shadow-xs'
                            : 'bg-gray-100 text-gray-400 border border-gray-300'
                        } ${isCurrent ? 'ring-4 ring-emerald-100' : ''}`}
                      >
                        {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                      </div>

                      <div className="text-left sm:text-center">
                        <h4
                          className={`text-xs font-bold ${
                            isCompleted ? 'text-gray-900' : 'text-gray-400'
                          }`}
                        >
                          {step.title}
                        </h4>
                        <p className="text-[11px] text-gray-400 mt-0.5">{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Courier & Shipping Meta Details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100 text-xs">
            <div className="p-3.5 rounded-lg bg-gray-50 border border-gray-200">
              <span className="text-gray-400 block text-[10px] font-bold uppercase">
                Courier Service
              </span>
              <p className="font-bold text-gray-900 mt-0.5 flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-emerald-700" />
                {currentOrder.courier || 'TCS Express Pakistan'}
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-gray-50 border border-gray-200">
              <span className="text-gray-400 block text-[10px] font-bold uppercase">
                Consignment Number
              </span>
              <p className="font-mono font-bold text-emerald-800 mt-0.5">
                {currentOrder.trackingNumber || 'CN-74829103'}
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-gray-50 border border-gray-200">
              <span className="text-gray-400 block text-[10px] font-bold uppercase">
                Estimated Delivery
              </span>
              <p className="font-bold text-gray-900 mt-0.5 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-700" />
                {currentOrder.estimatedDelivery || '2 - 3 Business Days'}
              </p>
            </div>
          </div>

          {/* Timeline Event Logs */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-800">
              Consignment Event History
            </h4>
            <div className="space-y-2 text-xs">
              {(currentOrder.statusHistory || []).map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-md bg-gray-50 border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-1"
                >
                  <div>
                    <span className="font-semibold text-gray-900">{item.status}</span>
                    <p className="text-gray-500 text-[11px] mt-0.5">{item.note}</p>
                  </div>
                  <span className="text-[11px] text-gray-400 font-mono shrink-0">
                    {item.timestamp}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Destination Address */}
          <div className="p-4 rounded-lg bg-emerald-50/50 border border-emerald-200 text-xs flex items-start gap-3">
            <MapPin className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
            <div>
              <h5 className="font-bold text-gray-900">Delivery Destination</h5>
              <p className="text-gray-700 mt-0.5">
                {currentOrder.customer.address}, {currentOrder.customer.area ? `${currentOrder.customer.area}, ` : ''}{currentOrder.customer.city}
              </p>
              <p className="text-gray-500 text-[11px] mt-0.5">
                Recipient: {currentOrder.customer.name} ({currentOrder.customer.phone})
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
