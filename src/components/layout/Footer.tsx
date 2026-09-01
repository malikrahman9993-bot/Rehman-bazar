import React, { useState } from 'react';
import {
  Mail,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  CreditCard,
  CheckCircle2,
  Lock,
  Phone,
  MapPin,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Logo } from '../common/Logo';

export const Footer: React.FC = () => {
  const { setCurrentView, setSelectedCategoryFilter, categories, showToast } = useStore();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Invalid Email', 'Please enter a valid email address.', 'warning');
      return;
    }
    setIsSubscribed(true);
    showToast('VIP Welcome Code Generated!', 'Check your inbox for 15% off code: VIP15', 'success');
  };

  const handleCategoryClick = (slug: string) => {
    setSelectedCategoryFilter(slug);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageClick = (page: string) => {
    setCurrentView(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800/80 pt-16 pb-24 lg:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Trust Banner */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 border-b border-stone-800/80">
          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-stone-900/50 border border-stone-800/60">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <Truck size={20} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Fast USA &amp; UK Delivery</h4>
              <p className="text-[11px] text-stone-400">FedEx Ground &amp; Royal Mail Tracked 24</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-stone-900/50 border border-stone-800/60">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <Lock size={20} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">256-Bit SSL Checkout</h4>
              <p className="text-[11px] text-stone-400">Bank-grade encrypted tokenization</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-stone-900/50 border border-stone-800/60">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <RotateCcw size={20} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">30-Day Easy Returns</h4>
              <p className="text-[11px] text-stone-400">Pre-paid labels &amp; instant refund</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-stone-900/50 border border-stone-800/60">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <Headphones size={20} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">VIP Concierge Care</h4>
              <p className="text-[11px] text-stone-400">24/7 dedicated support advisors</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12 border-b border-stone-800/80">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div onClick={() => handlePageClick('home')}>
              <Logo size="lg" showTagline={true} />
            </div>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Rehman Bazar is a distinguished multi-category luxury boutique serving clients across the United States and the United Kingdom. Curated with precision, crafted for longevity.
            </p>

            {/* Flagship Boutiques */}
            <div className="pt-2 space-y-2 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-amber-400 shrink-0 mt-0.5" />
                <span><strong>New York Flagship:</strong> 767 5th Ave, New York, NY 10153, USA</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-amber-400 shrink-0 mt-0.5" />
                <span><strong>London Suite:</strong> 14 New Bond St, Mayfair, London W1S 3PF, UK</span>
              </div>
              <div className="flex items-center gap-2 pt-1 text-stone-300">
                <Phone size={14} className="text-amber-400 shrink-0" />
                <span><strong>Toll-Free Concierge:</strong> +1 (800) 555-REHMAN / +44 20 7946 0912</span>
              </div>
            </div>
          </div>

          {/* Departments */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Top Departments
            </h4>
            <ul className="space-y-2 text-xs">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => handleCategoryClick(cat.slug)}
                    className="text-stone-400 hover:text-amber-400 transition-colors"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => handlePageClick('shop')}
                  className="text-amber-400 hover:underline font-semibold"
                >
                  All Categories &rarr;
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Client Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handlePageClick('contact')}
                  className="text-stone-400 hover:text-amber-400 transition-colors"
                >
                  Contact Client Support
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePageClick('faq')}
                  className="text-stone-400 hover:text-amber-400 transition-colors"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePageClick('account')}
                  className="text-stone-400 hover:text-amber-400 transition-colors"
                >
                  Track Order &amp; Delivery
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePageClick('shipping-policy')}
                  className="text-stone-400 hover:text-amber-400 transition-colors"
                >
                  USA &amp; UK Shipping Rates
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePageClick('returns-policy')}
                  className="text-stone-400 hover:text-amber-400 transition-colors"
                >
                  Returns &amp; Exchanges
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePageClick('admin')}
                  className="text-amber-400 hover:underline font-semibold"
                >
                  Store Owner Portal
                </button>
              </li>
            </ul>
          </div>

          {/* VIP Newsletter */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              VIP Private Club
            </h4>
            <p className="text-xs text-stone-400 mb-3">
              Subscribe to receive private seasonal drop invitations and an instant <strong>15% welcome discount</strong>.
            </p>

            {isSubscribed ? (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-400 flex items-center gap-2">
                <CheckCircle2 size={16} />
                <span>You&apos;re in the VIP club! Code: <strong>VIP15</strong></span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your VIP email..."
                    className="w-full bg-stone-900 border border-stone-800 focus:border-amber-500 text-xs text-white px-3 py-2.5 rounded-xl focus:outline-none placeholder:text-stone-500"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 px-3 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-lg text-xs font-bold transition-all flex items-center justify-center"
                    aria-label="Subscribe"
                  >
                    <ArrowRight size={14} />
                  </button>
                </div>
                <span className="text-[10px] text-stone-500 block">
                  Strictly zero spam. Unsubscribe anytime.
                </span>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar & Payment Gateways */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            &copy; {new Date().getFullYear()} <strong>Rehman Bazar Inc.</strong> All rights reserved. Registered in Delaware, USA &amp; Companies House, UK.
          </div>

          {/* Payment Badges */}
          <div className="flex items-center flex-wrap gap-2">
            {['Visa', 'Mastercard', 'Amex', 'Apple Pay', 'Google Pay', 'PayPal', 'Klarna'].map((badge) => (
              <span
                key={badge}
                className="px-2.5 py-1 rounded bg-stone-900 border border-stone-800 text-stone-400 text-[10px] font-semibold tracking-wider uppercase"
              >
                {badge}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button onClick={() => handlePageClick('privacy')} className="hover:text-stone-300">
              Privacy Policy
            </button>
            <button onClick={() => handlePageClick('terms')} className="hover:text-stone-300">
              Terms of Sale
            </button>
            <button onClick={() => handlePageClick('faq')} className="hover:text-stone-300">
              Cookie Settings
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
