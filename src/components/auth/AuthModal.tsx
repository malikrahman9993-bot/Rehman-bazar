import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Lock,
  Mail,
  User as UserIcon,
  Eye,
  EyeOff,
  Crown,
  ArrowRight,
  Sparkles,
  Check,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { AnimatedHuskyMascot } from './AnimatedHuskyMascot';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    login,
    signup,
    showToast,
    setCurrentView,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'login' | 'signup' | 'owner'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [ownerKey, setOwnerKey] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  // Focus and tracking states for the animated husky
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (activeTab === 'owner') {
      const ownerEmail = email.trim() || 'malikrahman9993@gmail.com';
      const key = ownerKey.trim() || 'rehman2026';
      const success = login(ownerEmail, key, 'admin');
      setIsSubmitting(false);
      if (success) {
        setIsAuthModalOpen(false);
        setCurrentView('admin');
      }
      return;
    }

    if (activeTab === 'login') {
      if (!email.trim() || !password.trim()) {
        showToast('Required Fields', 'Please enter your email and password.', 'warning');
        setIsSubmitting(false);
        return;
      }
      const success = login(email, password);
      setIsSubmitting(false);
      if (success) {
        setIsAuthModalOpen(false);
      }
    } else {
      if (!name.trim() || !email.trim() || !password.trim()) {
        showToast('Required Fields', 'Please fill out all registration fields.', 'warning');
        setIsSubmitting(false);
        return;
      }
      if (password.length < 6) {
        showToast('Password Length', 'Password should be at least 6 characters.', 'warning');
        setIsSubmitting(false);
        return;
      }
      const success = signup(name, email, password);
      setIsSubmitting(false);
      if (success) {
        setIsAuthModalOpen(false);
      }
    }
  };

  const handleQuickDemoUser = () => {
    login('alexander.wright@luxury.com', 'luxury123', 'customer');
    setIsAuthModalOpen(false);
  };

  const handleQuickDemoAdmin = () => {
    login('malikrahman9993@gmail.com', 'rehman2026', 'admin');
    setIsAuthModalOpen(false);
    setCurrentView('admin');
  };

  const handleSocialLogin = (provider: 'Google' | 'Apple') => {
    const demoEmail = provider === 'Google' ? 'patron.google@rehmanbazar.com' : 'patron.apple@icloud.com';
    login(demoEmail, 'social_auth_pass', 'customer');
    showToast(`Signed in with ${provider}`, `Welcome back via ${provider} secure authentication!`, 'success');
    setIsAuthModalOpen(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 25 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-[420px] my-auto"
        >
          {/* ANIMATED HUSKY MASCOT PERCHED ON TOP */}
          <div className="relative z-20 flex justify-center -mb-4">
            <AnimatedHuskyMascot
              emailText={email || name}
              isEmailFocused={isEmailFocused}
              isPasswordFocused={isPasswordFocused}
              isPasswordVisible={showPassword}
              isSubmitted={isSubmitting}
            />
          </div>

          {/* MAIN CARD */}
          <div className="relative bg-[#111622]/95 backdrop-blur-2xl border border-slate-700/60 rounded-[32px] p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(56,189,248,0.1)] text-slate-100 overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={() => setIsAuthModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 text-slate-400 hover:text-white border border-slate-700/80 hover:border-slate-500 transition-colors z-10"
              title="Close"
            >
              <X size={16} />
            </button>

            {/* Title & Subtitle */}
            <div className="text-center pt-2 mb-6">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-serif-luxury">
                {activeTab === 'owner' ? 'Owner Den' : 'Rehman Den'}
              </h2>
              <p className="text-xs text-slate-400 mt-1 font-medium">
                {activeTab === 'owner'
                  ? 'Welcome back, Director Malik. Husky is guarding the vault.'
                  : isPasswordFocused
                  ? 'Husky covered its eyes to protect your password!'
                  : 'Welcome back. Your husky is keeping watch.'}
              </p>
            </div>

            {/* Tab Pill Selector */}
            <div className="grid grid-cols-3 p-1 bg-slate-900/90 rounded-2xl border border-slate-800 mb-5 text-xs font-semibold gap-1">
              <button
                type="button"
                onClick={() => setActiveTab('login')}
                className={`py-1.5 rounded-xl transition-all ${
                  activeTab === 'login'
                    ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Sign in
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('signup')}
                className={`py-1.5 rounded-xl transition-all ${
                  activeTab === 'signup'
                    ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Register
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('owner');
                  if (!email) setEmail('malikrahman9993@gmail.com');
                }}
                className={`py-1.5 rounded-xl transition-all flex items-center justify-center gap-1 ${
                  activeTab === 'owner'
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 font-black shadow-md shadow-amber-500/20'
                    : 'text-amber-400/90 hover:text-amber-300'
                }`}
              >
                <Crown size={12} />
                <span>Owner</span>
              </button>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {activeTab === 'signup' && (
                <div>
                  <div className="relative">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onFocus={() => {
                        setIsEmailFocused(true);
                        setIsPasswordFocused(false);
                      }}
                      onBlur={() => setIsEmailFocused(false)}
                      placeholder="Full Name"
                      className="w-full bg-slate-900/80 border border-slate-700/80 focus:border-sky-400 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none transition-colors shadow-inner"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Username / Email field with dynamic tracking */}
              <div>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => {
                      setIsEmailFocused(true);
                      setIsPasswordFocused(false);
                    }}
                    onBlur={() => setIsEmailFocused(false)}
                    placeholder={activeTab === 'owner' ? 'Owner Email (malikrahman9993@gmail.com)' : 'Username or Email'}
                    className="w-full bg-slate-900/80 border border-slate-700/80 focus:border-sky-400 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none transition-colors shadow-inner font-medium"
                    required
                  />
                </div>
              </div>

              {/* Password field with eyes-cover triggers */}
              {activeTab === 'owner' ? (
                <div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={ownerKey}
                      onChange={(e) => setOwnerKey(e.target.value)}
                      onFocus={() => {
                        setIsPasswordFocused(true);
                        setIsEmailFocused(false);
                      }}
                      onBlur={() => setIsPasswordFocused(false)}
                      placeholder="Owner Passkey (rehman2026)"
                      className="w-full bg-slate-900/80 border border-slate-700/80 focus:border-amber-400 rounded-2xl pl-4 pr-11 py-3 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none transition-colors shadow-inner font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-1"
                      title={showPassword ? 'Hide password' : 'Peek password'}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => {
                        setIsPasswordFocused(true);
                        setIsEmailFocused(false);
                      }}
                      onBlur={() => setIsPasswordFocused(false)}
                      placeholder="Password"
                      className="w-full bg-slate-900/80 border border-slate-700/80 focus:border-sky-400 rounded-2xl pl-4 pr-11 py-3 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none transition-colors shadow-inner"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-1"
                      title={showPassword ? 'Hide password' : 'Peek password'}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              )}

              {/* Remember Me & Forgot Password Row */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none text-slate-400 hover:text-slate-300">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-sky-500 focus:ring-0 focus:ring-offset-0 cursor-pointer accent-sky-500"
                  />
                  <span>Remember me</span>
                </label>

                <button
                  type="button"
                  onClick={() => showToast('Password Recovery', 'A secure reset link has been dispatched to your email.', 'info')}
                  className="text-slate-400 hover:text-sky-400 transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              {/* Sign In Button with subtle luxury shine */}
              <button
                type="submit"
                className="w-full relative group overflow-hidden py-3.5 bg-gradient-to-r from-sky-600 via-sky-500 to-sky-600 hover:from-sky-500 hover:to-sky-400 text-slate-950 font-black rounded-2xl text-xs sm:text-sm transition-all shadow-[0_10px_25px_rgba(14,165,233,0.3)] hover:shadow-[0_15px_30px_rgba(14,165,233,0.45)] hover:scale-[1.01] flex items-center justify-center gap-2 mt-2"
              >
                <div className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none" />
                <span className="font-extrabold tracking-wide">
                  {activeTab === 'login' && 'Sign in'}
                  {activeTab === 'signup' && 'Create VIP Account'}
                  {activeTab === 'owner' && 'Unlock Store Owner Suite'}
                </span>
                <ArrowRight size={16} className="text-slate-950 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </form>

            {/* Social Authentication / Continue with */}
            <div className="mt-5">
              <div className="relative flex items-center justify-center my-4">
                <div className="border-t border-slate-800 w-full" />
                <span className="bg-[#111622] px-3 text-[11px] text-slate-500 uppercase tracking-wider font-medium">
                  or continue with
                </span>
                <div className="border-t border-slate-800 w-full" />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {/* Google Sign In */}
                <button
                  type="button"
                  onClick={() => handleSocialLogin('Google')}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl bg-slate-900 hover:bg-slate-800/90 border border-slate-700/80 text-xs font-semibold text-slate-200 transition-colors shadow-sm hover:border-slate-600"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#EA4335"
                      d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.8s.2-2.1.4-2.8L1.9 6.3C.7 8.7 0 10.8 0 12s.7 3.3 1.9 5.7l3.7-2.9z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
                    />
                  </svg>
                  <span>Google</span>
                </button>

                {/* Apple Sign In */}
                <button
                  type="button"
                  onClick={() => handleSocialLogin('Apple')}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl bg-slate-900 hover:bg-slate-800/90 border border-slate-700/80 text-xs font-semibold text-slate-200 transition-colors shadow-sm hover:border-slate-600"
                >
                  <svg className="w-4 h-4 fill-white" viewBox="0 0 170 170">
                    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.08-7.7-7.98-12.01-14.69-5.77-9.06-10.15-19.16-13.15-30.3-3-11.14-4.5-21.73-4.5-31.78 0-14.49 3.65-26.68 10.96-36.57 7.3-9.88 16.48-14.93 27.53-15.14 5.06 0 10.59 1.34 16.58 4.02 6 2.68 9.94 4.08 11.83 4.22 1.48-.14 5.6-1.57 12.35-4.29 6.75-2.73 12.44-3.95 17.07-3.67 12.63.63 22.84 5.56 30.63 14.78-10.98 6.64-16.35 15.65-16.1 27.02.26 9.4 3.86 17.3 10.81 23.71 6.95 6.41 15.17 10.02 24.66 10.83-2.12 6.54-4.7 13.06-7.75 19.57zM119.22 33.71c0-7.35 2.68-14.34 8.04-20.97 5.36-6.63 11.96-10.88 19.8-12.74.84 8.35-1.74 15.79-7.74 22.33-6 6.54-13.03 10.65-21.1 12.34-.33-.32-.67-.64-1-.96z" />
                  </svg>
                  <span>Apple</span>
                </button>
              </div>
            </div>

            {/* Bottom Toggle / Switch View */}
            <div className="mt-5 text-center text-xs text-slate-400">
              {activeTab === 'login' ? (
                <p>
                  New to Rehman Bazar?{' '}
                  <button
                    type="button"
                    onClick={() => setActiveTab('signup')}
                    className="text-sky-400 hover:text-sky-300 font-bold underline transition-colors"
                  >
                    Create account
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setActiveTab('login')}
                    className="text-sky-400 hover:text-sky-300 font-bold underline transition-colors"
                  >
                    Sign in here
                  </button>
                </p>
              )}
            </div>

            {/* Quick Demo Logins for instant preview testing */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={handleQuickDemoUser}
                className="px-2.5 py-1 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-[10px] text-slate-400 hover:text-sky-300 transition-colors border border-slate-800"
              >
                Demo Patron
              </button>
              <button
                type="button"
                onClick={handleQuickDemoAdmin}
                className="px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-[10px] text-amber-300 transition-colors border border-amber-500/30 font-bold"
              >
                Demo Owner
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
