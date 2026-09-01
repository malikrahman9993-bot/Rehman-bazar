import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, ShieldCheck, Star, ShoppingBag, Truck, Flame } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { AnimatedAddToCartButton } from '../common/AddToCartButton';

export const HeroSection: React.FC = () => {
  const { setCurrentView, formatPrice, products, viewProductDetail, addToCart } = useStore();

  const heroFeaturedProduct = products[0]; // Swiss Chronograph
  const secondaryFeaturedProduct = products[1]; // ANC Headphones

  return (
    <section className="relative overflow-hidden bg-stone-950 pt-8 pb-20 lg:pt-16 lg:pb-32 border-b border-stone-800/80">
      {/* Background Ambient Luxury Light Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -right-40 w-[400px] h-[400px] bg-amber-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 -left-40 w-[400px] h-[400px] bg-amber-700/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Subtle Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#29252415_1px,transparent_1px),linear-gradient(to_bottom,#29252415_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* Promotional Tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold backdrop-blur-md"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '8s' }} />
              <span>THE 2026 USA &amp; UK LUXURY REQUISITE</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span className="text-white font-normal">Free Express Delivery</span>
            </motion.div>

            {/* Main Headline with Animated Words and Gradient Motion */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif-luxury font-black tracking-tight text-white leading-[1.08]">
                <motion.span
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className="inline-block"
                >
                  Everything You Love,
                </motion.span>{' '}
                <br />
                <motion.span
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent italic font-serif inline-block text-gradient-shimmer"
                >
                  All in One Place.
                </motion.span>
              </h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-base sm:text-lg text-stone-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed"
              >
                Discover exceptional fashion, Swiss horology, studio acoustics, organic beauty, and modern living. Crafted for refined taste across New York, London, and beyond.
              </motion.p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  setCurrentView('shop');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="relative overflow-hidden w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-stone-950 font-extrabold rounded-2xl shadow-xl shadow-amber-500/25 hover:shadow-amber-500/50 transition-all flex items-center justify-center gap-3 text-sm group cursor-pointer shimmer-effect"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Shop Collection Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  const el = document.getElementById('categories-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-8 py-4 bg-stone-900/90 hover:bg-stone-800 border border-stone-700/80 hover:border-amber-500/60 text-stone-200 font-semibold rounded-2xl hover:text-white transition-all text-sm flex items-center justify-center gap-2 backdrop-blur-md cursor-pointer group"
              >
                <span>Explore Departments</span>
                <span className="text-amber-400 group-hover:translate-x-1 transition-transform">→</span>
              </motion.button>
            </motion.div>

            {/* Trust and Social Proof Strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="pt-6 border-t border-stone-800/60 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-left"
            >
              <div className="space-y-0.5">
                <div className="text-xl sm:text-2xl font-bold text-white font-serif-luxury">50K+</div>
                <div className="text-xs text-stone-400">US &amp; UK Orders</div>
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-1 text-amber-400 text-sm font-bold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>4.9 / 5</span>
                </div>
                <div className="text-xs text-stone-400">TrustPilot Rating</div>
              </div>
              <div className="space-y-0.5">
                <div className="text-xl sm:text-2xl font-bold text-emerald-400 font-serif-luxury">24/7</div>
                <div className="text-xs text-stone-400">VIP Concierge</div>
              </div>
            </motion.div>
          </div>

          {/* Right Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative mx-auto max-w-md lg:max-w-none"
            >
              {/* Primary Showcase Card */}
              <div className="relative rounded-3xl bg-stone-900 border border-stone-800/80 p-5 shadow-2xl overflow-hidden group">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-950 mb-5">
                  <img
                    src={heroFeaturedProduct.images[0]}
                    alt={heroFeaturedProduct.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                  
                  {/* Floating Flash Tag */}
                  <div className="absolute top-3 left-3 bg-stone-950/90 border border-amber-500/40 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-xs text-amber-300 font-bold shadow-lg">
                    <Flame className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
                    <span>CURATOR&apos;S CHOICE</span>
                  </div>

                  {/* Stock Pill */}
                  <div className="absolute bottom-3 left-3 text-xs text-stone-200 bg-stone-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-stone-800">
                    Only <strong className="text-amber-400">{heroFeaturedProduct.stock} units</strong> remaining in New York Hub
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider text-amber-400 font-bold">
                      {heroFeaturedProduct.category}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-amber-400 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{heroFeaturedProduct.rating}</span>
                      <span className="text-stone-500 font-normal">({heroFeaturedProduct.reviewsCount})</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                    {heroFeaturedProduct.name}
                  </h3>

                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <span className="text-2xl font-black text-amber-400">
                        {formatPrice(heroFeaturedProduct.price)}
                      </span>
                      {heroFeaturedProduct.oldPrice && (
                        <span className="text-xs text-stone-500 line-through ml-2">
                          {formatPrice(heroFeaturedProduct.oldPrice)}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => viewProductDetail(heroFeaturedProduct.id)}
                        className="px-3.5 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-xl border border-stone-700 hover:border-stone-500 transition-all cursor-pointer"
                      >
                        Inspect
                      </motion.button>
                      
                      <AnimatedAddToCartButton
                        size="sm"
                        label="Add to Bag"
                        addedLabel="Added!"
                        onAdd={() => addToCart(heroFeaturedProduct, 1)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Secondary Floating Mini Card with Continuous Gentle Float */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  y: [0, -6, 0],
                }}
                transition={{
                  opacity: { duration: 0.6, delay: 0.4 },
                  x: { duration: 0.6, delay: 0.4 },
                  y: { repeat: Infinity, duration: 4.5, ease: 'easeInOut' },
                }}
                whileHover={{ scale: 1.04, y: -8 }}
                onClick={() => viewProductDetail(secondaryFeaturedProduct.id)}
                className="hidden sm:flex absolute -bottom-6 -left-8 bg-stone-900/95 border border-stone-700/80 rounded-2xl p-3.5 shadow-2xl backdrop-blur-xl items-center gap-3.5 cursor-pointer hover:border-amber-500/50 transition-all max-w-[280px] group select-none"
              >
                <img
                  src={secondaryFeaturedProduct.images[0]}
                  alt={secondaryFeaturedProduct.name}
                  className="w-14 h-14 rounded-xl object-cover bg-stone-950 shrink-0 group-hover:scale-108 transition-transform duration-300"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1 text-[10px] text-amber-400 font-bold uppercase">
                    <span>TRENDING TECH</span>
                  </div>
                  <p className="text-xs font-bold text-white truncate group-hover:text-amber-300 transition-colors">
                    {secondaryFeaturedProduct.name}
                  </p>
                  <p className="text-xs font-black text-amber-400 mt-0.5">
                    {formatPrice(secondaryFeaturedProduct.price)}
                  </p>
                </div>
              </motion.div>

              {/* Express US/UK Delivery Badge */}
              <div className="hidden sm:flex absolute -top-4 -right-4 bg-stone-900/90 border border-stone-800 rounded-xl px-3 py-2 shadow-xl backdrop-blur-md items-center gap-2 text-xs text-stone-200">
                <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>2-Day Priority to USA &amp; UK</span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
