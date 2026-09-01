import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ShoppingBag,
  Trash2,
  ArrowRight,
  Sparkles,
  Tag,
  Check,
  Truck,
  ShieldCheck,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    cartSubtotalUSD,
    cartDiscountUSD,
    cartShippingCostUSD,
    cartTaxUSD,
    cartGrandTotalUSD,
    formatPrice,
    currencyConfig,
    currency,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    setCurrentView,
    viewProductDetail,
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartOpen) return null;

  // Free shipping progress calculation
  const freeThresholdUSD = currency === 'USD' ? currencyConfig.freeShippingThreshold : currencyConfig.freeShippingThreshold / currencyConfig.rate;
  const differenceToFreeShippingUSD = Math.max(0, freeThresholdUSD - cartSubtotalUSD);
  const progressPercent = Math.min(100, (cartSubtotalUSD / freeThresholdUSD) * 100);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput('');
    }
  };

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewFullCart = () => {
    setIsCartOpen(false);
    setCurrentView('cart');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/80 backdrop-blur-md flex justify-end">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="w-full max-w-md bg-stone-900 border-l border-stone-800 shadow-2xl h-full flex flex-col justify-between"
        >
          {/* Top Header */}
          <div className="p-5 border-b border-stone-800 flex items-center justify-between bg-stone-900/90">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <h2 className="text-base font-bold text-white font-serif-luxury">
                Your Shopping Bag
              </h2>
              <span className="bg-amber-500/20 text-amber-300 text-xs px-2 py-0.5 rounded-full font-bold border border-amber-500/30">
                {cart.reduce((s, i) => s + i.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="px-5 py-3 bg-stone-950 border-b border-stone-800/80">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="flex items-center gap-1.5 text-stone-300">
                <Truck size={14} className="text-emerald-400" />
                {differenceToFreeShippingUSD === 0 ? (
                  <strong className="text-emerald-400 font-bold">
                    You unlocked FREE Express Delivery!
                  </strong>
                ) : (
                  <span>
                    Add <strong className="text-amber-400">{formatPrice(differenceToFreeShippingUSD)}</strong> more for FREE shipping
                  </span>
                )}
              </span>
              <span className="text-[10px] text-stone-500 font-mono">
                {Math.round(progressPercent)}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-stone-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-stone-800 border border-stone-700 flex items-center justify-center text-stone-500">
                  <ShoppingBag size={28} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-serif-luxury">
                    Your Shopping Bag is Empty
                  </h3>
                  <p className="text-xs text-stone-400 max-w-xs mt-1">
                    Explore our luxury timepieces, apparel, and acoustics to elevate your lifestyle.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setCurrentView('shop');
                  }}
                  className="px-6 py-2.5 bg-amber-500 text-stone-950 font-bold rounded-xl text-xs hover:bg-amber-400 transition-all shadow-md"
                >
                  Start Exploring
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3.5 p-3 rounded-2xl bg-stone-800/50 border border-stone-800/80 hover:border-stone-700 transition-all group"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    onClick={() => {
                      setIsCartOpen(false);
                      viewProductDetail(item.product.id);
                    }}
                    className="w-16 h-16 rounded-xl object-cover bg-stone-950 shrink-0 cursor-pointer group-hover:scale-105 transition-transform"
                  />

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4
                        onClick={() => {
                          setIsCartOpen(false);
                          viewProductDetail(item.product.id);
                        }}
                        className="text-xs font-bold text-white line-clamp-1 cursor-pointer hover:text-amber-300 transition-colors"
                      >
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-stone-500 hover:text-rose-400 p-0.5 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    {/* Variant specs */}
                    <div className="flex items-center gap-2 text-[10px] text-stone-400">
                      {item.selectedColor && (
                        <span className="flex items-center gap-1">
                          <span
                            className="w-2 h-2 rounded-full inline-block"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          {item.selectedColor.name}
                        </span>
                      )}
                      {item.selectedSize && (
                        <span>Size: <strong>{item.selectedSize}</strong></span>
                      )}
                    </div>

                    {/* Price and Quantity Controls */}
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs font-bold text-amber-400 font-serif-luxury">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>

                      <div className="flex items-center bg-stone-900 border border-stone-700 rounded-lg">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-stone-300 hover:text-white text-xs font-bold"
                        >
                          -
                        </button>
                        <span className="px-2 py-0.5 text-xs font-bold text-white min-w-[20px] text-center font-mono">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-stone-300 hover:text-white text-xs font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Bottom Summary & Actions */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-stone-800 bg-stone-900/95 space-y-4">
              {/* Coupon input */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-300">
                  <div className="flex items-center gap-2">
                    <Tag size={14} className="text-emerald-400" />
                    <span>Coupon <strong>{appliedCoupon.code}</strong> applied</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-stone-400 hover:text-white text-[11px] font-bold"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-1">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      placeholder="Promo Code (e.g. REHMAN20)"
                      className="flex-1 bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-white placeholder:text-stone-500 uppercase font-mono focus:outline-none focus:border-amber-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-bold border border-stone-700 transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && (
                    <p className="text-[11px] text-rose-400 pl-1">{couponError}</p>
                  )}
                </form>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-stone-200 font-semibold">{formatPrice(cartSubtotalUSD)}</span>
                </div>
                {cartDiscountUSD > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount</span>
                    <span>-{formatPrice(cartDiscountUSD)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="text-stone-200 font-semibold">
                    {cartShippingCostUSD === 0 ? 'FREE' : formatPrice(cartShippingCostUSD)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Sales Tax / VAT</span>
                  <span className="text-stone-200 font-semibold">{formatPrice(cartTaxUSD)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-stone-800">
                  <span>Total</span>
                  <span className="text-base font-black text-amber-400 font-serif-luxury">
                    {formatPrice(cartGrandTotalUSD)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={handleProceedCheckout}
                  className="w-full py-3.5 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-stone-950 font-extrabold rounded-2xl text-xs sm:text-sm transition-all shadow-xl shadow-amber-500/20 hover:brightness-110 flex items-center justify-center gap-2"
                >
                  <ShieldCheck size={18} />
                  <span>Proceed to Secure Checkout</span>
                  <ArrowRight size={16} />
                </button>

                <button
                  onClick={handleViewFullCart}
                  className="w-full py-2.5 bg-stone-950 text-stone-300 hover:text-white rounded-xl text-xs font-semibold border border-stone-800 transition-colors"
                >
                  View Full Cart Page
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
