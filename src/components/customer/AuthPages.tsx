import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Store, Lock, Mail, User, Phone, CheckCircle2, ShieldCheck } from 'lucide-react';

interface AuthPageProps {
  initialMode?: 'login' | 'register';
}

export const AuthPages: React.FC<AuthPageProps> = ({ initialMode = 'login' }) => {
  const { setCustomerView, login, showToast } = useStore();
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);

  // Login form states
  const [loginEmail, setLoginEmail] = useState('tariq.khan@gmail.com');
  const [loginPassword, setLoginPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);

  // Register form states
  const [regFullName, setRegFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim() || !loginPassword.trim()) {
      setError('Please enter your email and password');
      return;
    }
    login(loginEmail, 'Muhammad Tariq Khan');
    setCustomerView('account');
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!regFullName.trim() || !regEmail.trim() || !regPhone.trim() || !regPassword.trim()) {
      setError('Please fill all required registration fields');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setError('Passwords do not match');
      return;
    }
    login(regEmail, regFullName);
    showToast('Account created successfully! Welcome to Imran General Store.', 'success');
    setCustomerView('account');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      {/* Brand Header */}
      <div className="text-center mb-6 space-y-2">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-700 text-white shadow-md mx-auto">
          <Store className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-black text-gray-900 tracking-tight">
            IMRAN <span className="text-emerald-700">GENERAL STORE</span>
          </h1>
          <p className="text-xs text-gray-500">
            {mode === 'login' ? 'Sign in to access your orders and addresses' : 'Register for faster checkout and order tracking'}
          </p>
        </div>
      </div>

      {/* Card container */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 shadow-xs">
        {/* Toggle Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setError('');
            }}
            className={`flex-1 pb-3 text-xs font-bold text-center border-b-2 transition-colors ${
              mode === 'login'
                ? 'border-emerald-700 text-emerald-800'
                : 'border-transparent text-gray-400 hover:text-gray-700'
            }`}
          >
            Customer Login
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setError('');
            }}
            className={`flex-1 pb-3 text-xs font-bold text-center border-b-2 transition-colors ${
              mode === 'register'
                ? 'border-emerald-700 text-emerald-800'
                : 'border-transparent text-gray-400 hover:text-gray-700'
            }`}
          >
            Create New Account
          </button>
        </div>

        {error && (
          <div className="mb-4 p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded">
            {error}
          </div>
        )}

        {/* LOGIN FORM */}
        {mode === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full text-xs pl-9 pr-3 py-2.5 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-600 focus:outline-none"
                />
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full text-xs pl-9 pr-3 py-2.5 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-600 focus:outline-none"
                />
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3 pointer-events-none" />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-emerald-700 focus:ring-emerald-600 h-3.5 w-3.5"
                />
                <span>Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => showToast('Password reset link sent to your email.', 'info')}
                className="text-emerald-700 hover:underline font-medium"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2.5 rounded text-xs transition-colors shadow-xs"
            >
              Login to Account
            </button>

            <div className="pt-2 text-center text-xs text-gray-500">
              Don&rsquo;t have an account yet?{' '}
              <button
                type="button"
                onClick={() => setMode('register')}
                className="text-emerald-700 font-bold hover:underline"
              >
                Create Account
              </button>
            </div>
          </form>
        ) : (
          /* REGISTER FORM */
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={regFullName}
                  onChange={(e) => setRegFullName(e.target.value)}
                  placeholder="e.g. Asad Ullah Khan"
                  className="w-full text-xs pl-9 pr-3 py-2.5 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-600 focus:outline-none"
                />
                <User className="w-4 h-4 text-gray-400 absolute left-3 top-3 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="asad@gmail.com"
                  className="w-full text-xs pl-9 pr-3 py-2.5 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-600 focus:outline-none"
                />
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Phone Number
              </label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  placeholder="0300-1234567"
                  className="w-full text-xs pl-9 pr-3 py-2.5 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-600 focus:outline-none"
                />
                <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3 pointer-events-none" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full text-xs px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  required
                  value={regConfirmPassword}
                  onChange={(e) => setRegConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full text-xs px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-600 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2.5 rounded text-xs transition-colors shadow-xs"
            >
              Create Account
            </button>

            <div className="pt-2 text-center text-xs text-gray-500">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-emerald-700 font-bold hover:underline"
              >
                Sign In
              </button>
            </div>
          </form>
        )}
      </div>

      <div className="mt-6 text-center text-[11px] text-gray-400 flex items-center justify-center gap-1.5">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
        <span>Your information is protected and never shared with third parties.</span>
      </div>
    </div>
  );
};
