import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  HelpCircle,
  ChevronDown,
  CheckCircle2,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { showToast } = useStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Order Inquiry');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  // FAQ open states
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Do you deliver to my city with Cash on Delivery (COD)?',
      a: 'Yes! We offer Cash on Delivery (COD) services to more than 200 cities, towns, and sectors across Pakistan through our courier partners including TCS, Leopard Courier, and Call Courier.',
    },
    {
      q: 'How long does nationwide delivery take?',
      a: 'For major metropolitan hubs (Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad), orders are delivered within 24 to 48 hours. For other cities and regional districts, delivery takes 2 to 3 business days.',
    },
    {
      q: 'Are all products 100% original and authentic?',
      a: 'Absolutely. Imran General Store procures every single item directly from certified regional distributors of Unilever, Procter & Gamble, Reckitt, Colgate-Palmolive, and Tapal Tea.',
    },
    {
      q: 'What is the return policy if a bottle or packet leaks during transit?',
      a: 'We offer a 7-day hassle-free replacement policy for any item damaged or leaked during transit. Simply send us a photo of the parcel on our WhatsApp helpline, and we will dispatch a replacement immediately free of charge.',
    },
    {
      q: 'What are the shipping charges?',
      a: 'We charge a flat rate of Rs. 150 for orders below Rs. 2,000. All orders of Rs. 2,000 or more qualify for 100% FREE nationwide delivery.',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;
    setIsSent(true);
    showToast('Your message has been received! Our support agent will contact you shortly.', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl font-extrabold text-gray-900">Contact &amp; Customer Support</h1>
        <p className="text-xs sm:text-sm text-gray-500">
          Have a question about your order, bulk corporate grocery supply, or delivery? We are here to help!
        </p>
      </div>

      {/* Contact Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Address */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex flex-col items-center text-center">
          <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
            <MapPin className="w-5 h-5" />
          </div>
          <h3 className="text-xs font-bold text-gray-900 uppercase">Main Store Address</h3>
          <p className="text-xs text-gray-600 mt-1 leading-relaxed">
            Plot 42, Commercial Area, Main Market, Gulberg III, Lahore, Pakistan
          </p>
        </div>

        {/* Phone */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex flex-col items-center text-center">
          <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
            <Phone className="w-5 h-5" />
          </div>
          <h3 className="text-xs font-bold text-gray-900 uppercase">Phone &amp; WhatsApp</h3>
          <p className="text-xs text-gray-600 mt-1 font-semibold">
            +92 300 1234567 <br />
            <span className="font-normal text-gray-500">Landline: +92 42 35789000</span>
          </p>
        </div>

        {/* Email */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex flex-col items-center text-center">
          <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
            <Mail className="w-5 h-5" />
          </div>
          <h3 className="text-xs font-bold text-gray-900 uppercase">Email Address</h3>
          <p className="text-xs text-gray-600 mt-1">
            support@imrangeneralstore.pk <br />
            <span className="text-[11px] text-gray-400">Response within 3 hours</span>
          </p>
        </div>

        {/* Business Hours */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex flex-col items-center text-center">
          <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
            <Clock className="w-5 h-5" />
          </div>
          <h3 className="text-xs font-bold text-gray-900 uppercase">Store Timings</h3>
          <p className="text-xs text-gray-600 mt-1">
            Mon &ndash; Sat: 9:00 AM &ndash; 10:00 PM <br />
            <span className="text-emerald-700 font-medium">Sunday: 12:00 PM &ndash; 8:00 PM</span>
          </p>
        </div>
      </div>

      {/* Interactive Form & Google Maps placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-gray-200 p-6 sm:p-8 shadow-xs">
          <h2 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-emerald-700" />
            Send Us a Message
          </h2>
          <p className="text-xs text-gray-500 mb-6">
            Fill out the form below and our customer support team will respond promptly.
          </p>

          {isSent ? (
            <div className="p-6 bg-emerald-50 rounded-lg border border-emerald-200 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-700 mx-auto" />
              <h3 className="text-sm font-bold text-emerald-950">Thank You, {name}!</h3>
              <p className="text-xs text-emerald-800 max-w-sm mx-auto">
                Your message regarding &ldquo;{subject}&rdquo; has been received. Our team will contact your phone ({phone}) shortly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsSent(false);
                  setMessage('');
                }}
                className="text-xs font-semibold text-emerald-700 hover:underline pt-2"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Your Full Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Asad Ullah"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Mobile / WhatsApp Number <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0300-1234567"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Inquiry Subject
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-600 focus:outline-none bg-white"
                  >
                    <option value="Order Inquiry">Order Tracking &amp; Delivery Inquiry</option>
                    <option value="Product Availability">Product Stock / Batch Question</option>
                    <option value="Wholesale">Wholesale / Bulk Grocery Order</option>
                    <option value="Complaint">Feedback or Return Complaint</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Message Details <span className="text-red-600">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Please specify your order ID or question in detail..."
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-6 py-2.5 rounded text-xs transition-colors flex items-center gap-2 shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                Submit Support Message
              </button>
            </form>
          )}
        </div>

        {/* Right: Lahore Store Location & Fast WhatsApp Support */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-gray-900">
              Need Instant Help via WhatsApp?
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Our customer care team is online during business hours on WhatsApp for quick confirmation and live photo verification of orders.
            </p>
            <a
              href="https://wa.me/923001234567"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-md transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              Chat on WhatsApp (+92 300 1234567)
            </a>
          </div>

          <div className="bg-gray-100 rounded-xl border border-gray-200 p-6 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-gray-900">Visit Our Main Lahore Store</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Conveniently located in the commercial heart of Gulberg III, Lahore, with dedicated customer parking and wholesale collection counter.
            </p>
            <div className="p-3 bg-white rounded border border-gray-200 text-xs text-gray-500 font-mono">
              📍 31.5204° N, 74.3587° E &bull; Main Market Gulberg III, Lahore
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 flex items-center justify-center gap-2">
            <HelpCircle className="w-5 h-5 text-emerald-700" />
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Quick answers regarding Cash on Delivery, delivery schedules, and guarantees
          </p>
        </div>

        <div className="max-w-3xl mx-auto divide-y divide-gray-200">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="py-3">
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between text-left gap-3 focus:outline-none"
                >
                  <span className="text-xs sm:text-sm font-bold text-gray-900">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform ${
                      isOpen ? 'rotate-180 text-emerald-700' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="text-xs text-gray-600 mt-2 leading-relaxed pl-1">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
