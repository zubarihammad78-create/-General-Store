import React, { useState } from 'react';
import { LockKeyhole, ShieldCheck, UserRound } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AdminLogin: React.FC = () => {
  const { adminLogin, setCurrentMode } = useStore();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('123');
  const [error, setError] = useState('');

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!adminLogin(username, password)) setError('Username or password is incorrect.');
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white border border-gray-200 shadow-xl rounded-xl overflow-hidden grid md:grid-cols-2">
        <section className="bg-emerald-950 text-white p-8 md:p-12 flex flex-col justify-between">
          <div><p className="text-emerald-300 text-xs font-bold uppercase tracking-widest">Imran General Store</p><h1 className="text-3xl font-black mt-3">Admin Portal</h1><p className="text-emerald-100/75 text-sm mt-3 leading-relaxed">Products, collections, customers and orders are managed from this private workspace.</p></div>
          <div className="mt-12 border border-emerald-700/70 rounded-lg p-4 text-sm"><p className="font-bold flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Default access</p><p className="text-emerald-200 mt-2">Username: <strong>admin</strong></p><p className="text-emerald-200">Password: <strong>123</strong></p></div>
        </section>
        <form onSubmit={submit} className="p-8 md:p-12 space-y-5">
          <div><h2 className="text-xl font-bold text-gray-900">Secure sign in</h2><p className="text-xs text-gray-500 mt-1">Customer storefront data is hidden until you authenticate.</p></div>
          {error && <p className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded">{error}</p>}
          <label className="block text-xs font-semibold text-gray-700">Username<div className="relative mt-1"><UserRound className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" /><input value={username} onChange={(event) => setUsername(event.target.value)} className="w-full border border-gray-300 rounded px-9 py-2.5 text-sm" /></div></label>
          <label className="block text-xs font-semibold text-gray-700">Password<div className="relative mt-1"><LockKeyhole className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" /><input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="w-full border border-gray-300 rounded px-9 py-2.5 text-sm" /></div></label>
          <button className="w-full bg-emerald-700 hover:bg-emerald-800 text-white rounded py-3 text-sm font-bold">Enter admin portal</button>
          <button type="button" onClick={() => setCurrentMode('customer')} className="w-full text-xs font-semibold text-gray-500 hover:text-gray-900">Back to storefront</button>
        </form>
      </div>
    </main>
  );
};