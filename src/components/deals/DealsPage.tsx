import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Flame, Clock, Sparkles, Percent, Tag, ArrowRight, ShieldCheck } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../shop/ProductCard';

export const DealsPage: React.FC = () => {
  const { products, formatPrice, setCurrentView } = useStore();
  const discountedProducts = products.filter((p) => p.discount || p.isFlashSale);

  const [timeLeft, setTimeLeft] = useState({ hours: 11, minutes: 24, seconds: 50 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="bg-stone-950 min-h-screen pb-24 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Deals Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-rose-950/80 via-stone-900 to-amber-950/60 border border-rose-500/30 p-8 sm:p-12 mb-12 shadow-2xl">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/40">
              <Flame size={14} className="animate-bounce" />
              <span>LIMITED QUANTITY VAULT DROPS</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white font-serif-luxury tracking-tight leading-tight">
              Exclusive Luxury Discounts &amp; Vault Deals
            </h1>

            <p className="text-xs sm:text-sm text-stone-300 max-w-xl leading-relaxed">
              Save up to 30% on certified Swiss chronographs, Italian tailoring, noise-canceling acoustics, and niche perfumery with expedited USA and UK delivery.
            </p>

            {/* Countdown Box */}
            <div className="pt-2 flex items-center gap-3">
              <span className="text-xs font-bold uppercase text-stone-400">Offer Expires In:</span>
              <div className="flex items-center gap-1.5 font-mono text-sm font-black text-amber-400 bg-stone-950/80 px-3 py-1.5 rounded-xl border border-stone-800">
                <Clock size={14} className="text-rose-400" />
                <span>{formatNumber(timeLeft.hours)}h : {formatNumber(timeLeft.minutes)}m : {formatNumber(timeLeft.seconds)}s</span>
              </div>
            </div>
          </div>
        </div>

        {/* Deals Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white font-serif-luxury">
              Active Promotional Drops ({discountedProducts.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {discountedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
