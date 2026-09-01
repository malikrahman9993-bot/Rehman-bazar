import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Copy, Check, ShieldAlert } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const PromoBanner: React.FC = () => {
  const { setCurrentView, showToast } = useStore();
  const [copied, setCopied] = useState(false);
  const promoCode = 'REHMAN20';

  const handleCopy = () => {
    navigator.clipboard.writeText(promoCode);
    setCopied(true);
    showToast('Promo Code Copied!', `${promoCode} copied. Apply at checkout for 20% off!`, 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-12 bg-stone-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-stone-900 via-amber-950/60 to-stone-900 border border-amber-500/30 p-8 sm:p-12 lg:p-16 shadow-2xl">
          {/* Subtle Ambient Light */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/40">
                <Sparkles size={14} />
                <span>EXCLUSIVE SEASONAL EVENT</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-serif-luxury tracking-tight leading-tight">
                Save 20% on Your First <br />
                <span className="text-amber-400 italic">Rehman Bazar</span> Luxury Order
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 max-w-xl leading-relaxed">
                Applies to all Swiss timepieces, Italian cashmere outerwear, audiophile acoustics, and beauty collections across USA and UK destinations.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center lg:items-end gap-4">
              <div className="flex items-center gap-2 p-2 bg-stone-950/80 border border-amber-500/50 rounded-2xl backdrop-blur-md shadow-xl w-full sm:w-auto justify-between">
                <div className="px-3 text-left">
                  <span className="text-[10px] text-stone-400 uppercase font-bold tracking-widest block">
                    Use Coupon Code
                  </span>
                  <span className="text-base sm:text-lg font-black font-mono text-amber-400 tracking-wider">
                    {promoCode}
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={handleCopy}
                  className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </motion.button>
              </div>

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentView('shop');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-8 py-3.5 bg-white text-stone-950 hover:bg-stone-100 font-extrabold rounded-2xl text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-xl cursor-pointer group"
              >
                <span>Shop Qualified Products</span>
                <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
