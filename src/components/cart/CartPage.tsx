import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ShoppingBag,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Tag,
  Check,
  Plus,
  Minus,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../shop/ProductCard';

export const CartPage: React.FC = () => {
  const {
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
    products,
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  const freeThresholdUSD =
    currency === 'USD'
      ? currencyConfig.freeShippingThreshold
      : currencyConfig.freeShippingThreshold / currencyConfig.rate;
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
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Recommendations
  const crossSellProducts = products.filter(
    (p) => !cart.some((item) => item.product.id === p.id)
  ).slice(0, 4);

  if (cart.length === 0) {
    return (
      <div className="bg-stone-950 min-h-[70vh] flex items-center justify-center p-6">
        <div className="text-center max-w-md space-y-5 bg-stone-900 border border-stone-800 p-8 sm:p-12 rounded-3xl shadow-2xl">
          <div className="w-20 h-20 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center text-stone-500 mx-auto">
            <ShoppingBag size={36} />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white font-serif-luxury">
              Your Shopping Bag is Currently Empty
            </h2>
            <p className="text-xs sm:text-sm text-stone-400">
              Discover Swiss chronographs, Italian apparel, and luxury home additions with priority US &amp; UK delivery.
            </p>
          </div>
          <button
            onClick={() => setCurrentView('shop')}
            className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-2xl text-xs sm:text-sm transition-all shadow-xl shadow-amber-500/20"
          >
            Explore Catalog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-stone-950 min-h-screen pb-24 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title */}
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl sm:text-4xl font-black text-white font-serif-luxury tracking-tight">
            Review Your Shopping Bag
          </h1>
          <p className="text-xs sm:text-sm text-stone-400">
            {cart.reduce((s, i) => s + i.quantity, 0)} items in your cart
          </p>
        </div>

        {/* Free Shipping Meter */}
        <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 mb-8 max-w-3xl">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="flex items-center gap-2 text-stone-300 font-medium">
              <Truck size={16} className="text-emerald-400" />
              {differenceToFreeShippingUSD === 0 ? (
                <strong className="text-emerald-400 font-bold">
                  Complimentary FedEx / Royal Mail Tracked Shipping Unlocked!
                </strong>
              ) : (
                <span>
                  Add <strong className="text-amber-400">{formatPrice(differenceToFreeShippingUSD)}</strong> more for free express shipping.
                </span>
              )}
            </span>
            <span className="text-xs font-mono text-stone-400 font-bold">
              {Math.round(progressPercent)}%
            </span>
          </div>
          <div className="w-full h-2 bg-stone-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* 2-Column Layout: Table of Items + Order Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Left: Items Table */}
          <div className="lg:col-span-8 space-y-4">
            <div className="rounded-3xl bg-stone-900/60 border border-stone-800/80 overflow-hidden divide-y divide-stone-800 shadow-xl">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      onClick={() => viewProductDetail(item.product.id)}
                      className="w-20 h-20 rounded-2xl object-cover bg-stone-950 cursor-pointer hover:scale-105 transition-transform shrink-0"
                    />
                    <div className="space-y-1">
                      <span className="text-[10px] text-amber-400 uppercase font-bold tracking-wider">
                        {item.product.category}
                      </span>
                      <h3
                        onClick={() => viewProductDetail(item.product.id)}
                        className="text-sm font-bold text-white hover:text-amber-300 transition-colors cursor-pointer"
                      >
                        {item.product.name}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-stone-400">
                        {item.selectedColor && (
                          <span className="flex items-center gap-1">
                            <span
                              className="w-2.5 h-2.5 rounded-full"
                              style={{ backgroundColor: item.selectedColor.hex }}
                            />
                            {item.selectedColor.name}
                          </span>
                        )}
                        {item.selectedSize && <span>• Size: {item.selectedSize}</span>}
                      </div>
                      <div className="text-xs text-stone-400">
                        Unit Price: <strong className="text-stone-200">{formatPrice(item.product.price)}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Quantity & Item Total */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-800">
                    <div className="flex items-center bg-stone-950 border border-stone-800 rounded-xl">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="p-2 text-stone-300 hover:text-white"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-3 text-xs font-bold text-white font-mono">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="p-2 text-stone-300 hover:text-white"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <div className="text-right min-w-[90px]">
                      <div className="text-base font-black text-amber-400 font-serif-luxury">
                        {formatPrice(item.product.price * item.quantity)}
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-stone-500 hover:text-rose-400 transition-colors"
                      title="Remove"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setCurrentView('shop')}
                className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1.5"
              >
                &larr; Continue Shopping
              </button>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-3xl bg-stone-900 border border-stone-800/90 shadow-2xl space-y-5">
              <h3 className="text-base font-bold text-white font-serif-luxury pb-3 border-b border-stone-800">
                Order Summary
              </h3>

              {/* Coupon Engine */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-xs text-emerald-300">
                  <div className="flex items-center gap-2">
                    <Tag size={16} className="text-emerald-400" />
                    <span>Coupon <strong>{appliedCoupon.code}</strong> applied ({appliedCoupon.discountPercentage || 20}% OFF)</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-stone-400 hover:text-white text-xs font-bold"
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
                      placeholder="Coupon (e.g. REHMAN20)"
                      className="flex-1 bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-white uppercase font-mono focus:outline-none focus:border-amber-500"
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

              {/* Line Items */}
              <div className="space-y-2.5 text-xs text-stone-400">
                <div className="flex justify-between">
                  <span>Cart Subtotal</span>
                  <span className="text-stone-200 font-semibold">{formatPrice(cartSubtotalUSD)}</span>
                </div>
                {cartDiscountUSD > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Promotional Savings</span>
                    <span>-{formatPrice(cartDiscountUSD)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Express Courier Shipping</span>
                  <span className="text-stone-200 font-semibold">
                    {cartShippingCostUSD === 0 ? 'FREE' : formatPrice(cartShippingCostUSD)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Sales Tax / VAT</span>
                  <span className="text-stone-200 font-semibold">{formatPrice(cartTaxUSD)}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-white pt-3 border-t border-stone-800">
                  <span>Total Amount</span>
                  <span className="text-xl font-black text-amber-400 font-serif-luxury">
                    {formatPrice(cartGrandTotalUSD)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleProceedCheckout}
                className="w-full py-4 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-stone-950 font-black rounded-2xl text-sm transition-all shadow-xl shadow-amber-500/20 hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <ShieldCheck size={18} />
                <span>Proceed to Checkout</span>
                <ArrowRight size={18} />
              </button>

              <div className="pt-2 flex items-center justify-center gap-4 text-[11px] text-stone-400">
                <span className="flex items-center gap-1"><ShieldCheck size={14} className="text-amber-400" /> SSL Encrypted</span>
                <span className="flex items-center gap-1"><RotateCcw size={14} className="text-amber-400" /> 30-Day Returns</span>
              </div>
            </div>
          </div>

        </div>

        {/* Cross-Sell Recommendations */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-white font-serif-luxury">
            Recommended Additions to Your Bag
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {crossSellProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
