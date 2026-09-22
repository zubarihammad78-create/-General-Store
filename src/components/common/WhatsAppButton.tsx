import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const WhatsAppButton: React.FC = () => {
  const { settings } = useStore();
  const phone = settings.whatsapp.replace(/\D/g, '');
  return (
    <a
      href={`https://wa.me/${phone}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="whatsapp-float fixed right-0 top-[32%] z-50 bg-[#168b54] text-white shadow-xl flex items-center gap-2 rounded-l-lg px-3 py-3 hover:pr-5 transition-all"
    >
      <MessageCircle className="w-5 h-5 fill-current shrink-0" />
      <span className="text-[11px] font-bold tracking-wide whitespace-nowrap">WhatsApp Order</span>
    </a>
  );
};