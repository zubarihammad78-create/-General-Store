import React, { useState } from 'react';
import { Bot, Send, X } from 'lucide-react';

type ChatMessage = { role: 'user' | 'assistant'; text: string };

export const Chatbot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', text: 'Assalam-o-alaikum! Main Imran General Store ka assistant hoon. Roman Urdu ya Urdu mein pooch sakte hain.' },
  ]);

  const send = async (event: React.FormEvent) => {
    event.preventDefault();
    const text = message.trim();
    if (!text || busy) return;
    setMessage('');
    setMessages((current) => [...current, { role: 'user', text }]);
    setBusy(true);
    try {
      const response = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: text }) });
      const data = await response.json();
      setMessages((current) => [...current, { role: 'assistant', text: data.reply || data.error || 'Chat service abhi available nahi hai.' }]);
    } catch {
      setMessages((current) => [...current, { role: 'assistant', text: 'Chat service connect nahi ho saki. WhatsApp button se hum se rabta karein.' }]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <button onClick={() => setOpen(true)} aria-label="Open store assistant" className="fixed right-4 bottom-20 lg:bottom-6 z-40 w-12 h-12 rounded-full bg-gray-900 text-white shadow-xl flex items-center justify-center hover:bg-emerald-800 hover:scale-105 transition-transform"><Bot className="w-6 h-6" /></button>
      {open && <section className="fixed right-4 bottom-36 lg:bottom-20 z-50 w-[calc(100vw-2rem)] max-w-sm h-[28rem] bg-white border border-gray-200 rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4">
        <header className="bg-emerald-900 text-white p-4 flex items-center justify-between"><div><p className="font-bold text-sm">Store Assistant</p><p className="text-[10px] text-emerald-200">Roman Urdu, Urdu & English</p></div><button onClick={() => setOpen(false)} aria-label="Close assistant"><X className="w-5 h-5" /></button></header>
        <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50">{messages.map((item, index) => <div key={`${item.role}-${index}`} className={`max-w-[85%] rounded-lg px-3 py-2 text-xs ${item.role === 'user' ? 'ml-auto bg-emerald-700 text-white' : 'bg-white border border-gray-200 text-gray-700'}`}>{item.text}</div>)}{busy && <div className="text-[11px] text-gray-400">Assistant soch raha hai...</div>}</div>
        <form onSubmit={send} className="p-3 border-t border-gray-200 flex gap-2"><input value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Apna sawal likhein..." className="flex-1 min-w-0 border border-gray-300 rounded px-3 py-2 text-xs" /><button aria-label="Send message" className="w-9 h-9 rounded bg-emerald-700 text-white flex items-center justify-center"><Send className="w-4 h-4" /></button></form>
      </section>}
    </>
  );
};
