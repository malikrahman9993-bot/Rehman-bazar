import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  Lock,
  CreditCard,
  Truck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Printer,
  ChevronRight,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ShippingAddress, Order } from '../../types';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartSubtotalUSD,
    cartDiscountUSD,
    cartShippingCostUSD,
    cartTaxUSD,
    cartGrandTotalUSD,
    formatPrice,
    currency,
    currencyConfig,
    appliedCoupon,
    selectedShippingMethod,
    createOrder,
    setCurrentView,
    user,
  } = useStore();

  const [step, setStep] = useState<'details' | 'success'>('details');
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Address Form State
  const [address, setAddress] = useState<ShippingAddress>({
    firstName: user?.name?.split(' ')[0] || 'Alexander',
    lastName: user?.name?.split(' ')[1] || 'Wright',
    email: user?.email || 'alexander.wright@luxurypatron.com',
    phone: '+1 (212) 555-0199',
    street: '740 Park Avenue',
    apartment: 'Penthouse 14B',
    city: currency === 'GBP' ? 'London' : 'New York',
    stateOrCounty: currency === 'GBP' ? 'Greater London' : 'New York',
    postalCode: currency === 'GBP' ? 'W1K 7TN' : '10021',
    country: currency === 'GBP' ? 'GB' : 'US',
  });

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple_pay' | 'google_pay' | 'paypal' | 'klarna'>('card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');

  const handleInputChange = (field: keyof ShippingAddress, value: any) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
  };

  const handleCompleteOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const order = createOrder({
        items: [...cart],
        shippingAddress: address,
        shippingMethod: selectedShippingMethod,
        paymentDetails: {
          method: paymentMethod,
          cardNumberMasked: '•••• 4242',
          expiry: cardExpiry,
        },
        subtotal: cartSubtotalUSD,
        discountTotal: cartDiscountUSD,
        couponCode: appliedCoupon?.code,
        shippingCost: cartShippingCostUSD,
        tax: cartTaxUSD,
        total: cartGrandTotalUSD,
        currency,
        currencySymbol: currencyConfig.symbol,
        estimatedDelivery: currency === 'GBP' ? '1-2 Business Days via Royal Mail' : '2-3 Business Days via FedEx Express',
      });

      if (order) {
        setPlacedOrder(order);
        setStep('success');
      }
      setIsSubmitting(false);
    }, 1200);
  };

  if (cart.length === 0 && step !== 'success') {
    return (
      <div className="bg-stone-950 min-h-[70vh] flex items-center justify-center p-6">
        <div className="text-center max-w-md space-y-4 bg-stone-900 border border-stone-800 p-8 rounded-3xl">
          <ShoppingBag size={40} className="text-amber-400 mx-auto" />
          <h2 className="text-xl font-bold text-white font-serif-luxury">No items to checkout</h2>
          <p className="text-xs text-stone-400">Please add items to your cart before proceeding to checkout.</p>
          <button
            onClick={() => setCurrentView('shop')}
            className="px-6 py-2.5 bg-amber-500 text-stone-950 font-bold rounded-xl text-xs"
          >
            Explore Catalog
          </button>
        </div>
      </div>
    );
  }

  // Order Success Screen
  if (step === 'success' && placedOrder) {
    return (
      <div className="bg-stone-950 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-stone-900 border border-stone-800 rounded-3xl p-8 sm:p-12 shadow-2xl text-center space-y-6"
          >
            <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 size={40} />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                PAYMENT CONFIRMED &amp; DISPATCH QUEUED
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-white font-serif-luxury">
                Thank You For Your Order
              </h1>
              <p className="text-xs sm:text-sm text-stone-300 max-w-md mx-auto">
                A confirmation receipt and courier tracking link have been dispatched to{' '}
                <strong className="text-white">{placedOrder.shippingAddress.email}</strong>.
              </p>
            </div>

            {/* Order Meta Box */}
            <div className="p-6 rounded-2xl bg-stone-950 border border-stone-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              <div>
                <span className="text-[10px] text-stone-500 uppercase font-bold block">Order Number</span>
                <span className="text-xs font-mono font-bold text-amber-400">{placedOrder.orderNumber}</span>
              </div>
              <div>
                <span className="text-[10px] text-stone-500 uppercase font-bold block">Estimated Arrival</span>
                <span className="text-xs font-bold text-white">{placedOrder.estimatedDelivery}</span>
              </div>
              <div>
                <span className="text-[10px] text-stone-500 uppercase font-bold block">Carrier &amp; Tracking</span>
                <span className="text-xs font-mono font-bold text-stone-300">{placedOrder.trackingNumber}</span>
              </div>
              <div>
                <span className="text-[10px] text-stone-500 uppercase font-bold block">Total Amount</span>
                <span className="text-xs font-bold text-amber-400 font-serif-luxury">
                  {formatPrice(placedOrder.total)}
                </span>
              </div>
            </div>

            {/* Purchased Items Overview */}
            <div className="rounded-2xl border border-stone-800 overflow-hidden divide-y divide-stone-800 text-left">
              {placedOrder.items.map((item) => (
                <div key={item.id} className="p-4 flex items-center justify-between gap-4 bg-stone-900/60">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.images[0]}
                      alt=""
                      className="w-12 h-12 rounded-xl object-cover bg-stone-950"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-white line-clamp-1">{item.product.name}</h4>
                      <span className="text-[10px] text-stone-400">Qty: {item.quantity}</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-amber-400 font-mono">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={() => window.print()}
                className="w-full sm:w-auto px-6 py-3 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-bold border border-stone-700 flex items-center justify-center gap-2"
              >
                <Printer size={16} />
                <span>Print Official Invoice</span>
              </button>
              <button
                onClick={() => {
                  setCurrentView('shop');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-8 py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-xl text-xs font-bold shadow-lg shadow-amber-500/20"
              >
                Continue Shopping
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-stone-950 min-h-screen pb-24 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Checkout Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-stone-800">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              SECURE ENCRYPTED CHECKOUT
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white font-serif-luxury">
              Finalize Your Rehman Bazar Acquisition
            </h1>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full">
            <Lock size={14} />
            <span>256-Bit SSL Encrypted</span>
          </div>
        </div>

        <form onSubmit={handleCompleteOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Customer & Shipping Details */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Section 1: Customer Contact */}
              <div className="p-6 rounded-3xl bg-stone-900 border border-stone-800 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-stone-950 text-xs font-black flex items-center justify-center">
                    1
                  </span>
                  Customer &amp; Contact Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-stone-400 block mb-1">First Name</label>
                    <input
                      type="text"
                      value={address.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs text-stone-400 block mb-1">Last Name</label>
                    <input
                      type="text"
                      value={address.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-stone-400 block mb-1">Email Address</label>
                    <input
                      type="email"
                      value={address.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs text-stone-400 block mb-1">Phone (for Courier Tracking)</label>
                    <input
                      type="tel"
                      value={address.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Delivery Address */}
              <div className="p-6 rounded-3xl bg-stone-900 border border-stone-800 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-stone-950 text-xs font-black flex items-center justify-center">
                    2
                  </span>
                  Destination Address (USA &amp; UK)
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="text-xs text-stone-400 block mb-1">Country / Region</label>
                    <select
                      value={address.country}
                      onChange={(e) => handleInputChange('country', e.target.value as 'US' | 'GB')}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="US">🇺🇸 United States (FedEx Express / UPS)</option>
                      <option value="GB">🇬🇧 United Kingdom (Royal Mail Tracked 24)</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs text-stone-400 block mb-1">Street Address</label>
                    <input
                      type="text"
                      value={address.street}
                      onChange={(e) => handleInputChange('street', e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs text-stone-400 block mb-1">City</label>
                    <input
                      type="text"
                      value={address.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs text-stone-400 block mb-1">State / Province / County</label>
                    <input
                      type="text"
                      value={address.stateOrCounty}
                      onChange={(e) => handleInputChange('stateOrCounty', e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                      required
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs text-stone-400 block mb-1">Postal / ZIP Code</label>
                    <input
                      type="text"
                      value={address.postalCode}
                      onChange={(e) => handleInputChange('postalCode', e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Payment Method */}
              <div className="p-6 rounded-3xl bg-stone-900 border border-stone-800 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-stone-950 text-xs font-black flex items-center justify-center">
                    3
                  </span>
                  Payment Selection
                </h3>

                {/* Method selector */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'card', label: 'Credit Card', icon: CreditCard },
                    { id: 'apple_pay', label: 'Apple Pay', icon: Lock },
                    { id: 'paypal', label: 'PayPal', icon: ShieldCheck },
                    { id: 'klarna', label: 'Klarna Pay in 4', icon: Sparkles },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentMethod(m.id as any)}
                      className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                        paymentMethod === m.id
                          ? 'bg-amber-500/10 border-amber-500 text-amber-300 font-bold'
                          : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-white'
                      }`}
                    >
                      <m.icon size={18} />
                      <span className="text-xs">{m.label}</span>
                    </button>
                  ))}
                </div>

                {/* Card Fields */}
                {paymentMethod === 'card' && (
                  <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-3">
                    <div>
                      <label className="text-[11px] text-stone-400 block mb-1">Card Number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-amber-500"
                        placeholder="•••• •••• •••• ••••"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] text-stone-400 block mb-1">Expiration Date</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-amber-500"
                          placeholder="MM/YY"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-stone-400 block mb-1">CVC / CVV</label>
                        <input
                          type="text"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-amber-500"
                          placeholder="•••"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'klarna' && (
                  <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 text-xs text-stone-300 space-y-2">
                    <p className="font-bold text-amber-400">Klarna 4 Interest-Free Payments</p>
                    <p>Pay 4 installments of {formatPrice(cartGrandTotalUSD / 4)} bi-weekly. No hidden fees or interest charges.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Order Review & Submit */}
            <div className="lg:col-span-5 space-y-6 sticky top-28">
              <div className="p-6 rounded-3xl bg-stone-900 border border-stone-800/90 shadow-2xl space-y-5">
                <h3 className="text-base font-bold text-white font-serif-luxury pb-3 border-b border-stone-800">
                  Acquisition Summary
                </h3>

                {/* Items preview */}
                <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={item.product.images[0]}
                          alt=""
                          className="w-10 h-10 rounded-lg object-cover bg-stone-950 shrink-0"
                        />
                        <div className="truncate">
                          <p className="text-stone-200 font-medium truncate">{item.product.name}</p>
                          <span className="text-[10px] text-stone-400">Qty: {item.quantity}</span>
                        </div>
                      </div>
                      <span className="text-amber-400 font-bold font-mono shrink-0">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Calculations */}
                <div className="space-y-2 text-xs text-stone-400 pt-3 border-t border-stone-800">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-stone-200 font-semibold">{formatPrice(cartSubtotalUSD)}</span>
                  </div>
                  {cartDiscountUSD > 0 && (
                    <div className="flex justify-between text-emerald-400 font-semibold">
                      <span>Discount ({appliedCoupon?.code})</span>
                      <span>-{formatPrice(cartDiscountUSD)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Express Delivery</span>
                    <span className="text-stone-200 font-semibold">
                      {cartShippingCostUSD === 0 ? 'FREE' : formatPrice(cartShippingCostUSD)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Sales Tax / VAT</span>
                    <span className="text-stone-200 font-semibold">{formatPrice(cartTaxUSD)}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-white pt-3 border-t border-stone-800">
                    <span>Total Due</span>
                    <span className="text-xl font-black text-amber-400 font-serif-luxury">
                      {formatPrice(cartGrandTotalUSD)}
                    </span>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-stone-950 font-black rounded-2xl text-sm transition-all shadow-xl shadow-amber-500/20 hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full animate-spin" />
                      Authorizing Payment...
                    </span>
                  ) : (
                    <>
                      <Lock size={16} />
                      <span>Authorize &amp; Place Order</span>
                    </>
                  )}
                </button>

                <div className="text-[11px] text-stone-400 text-center space-y-1">
                  <p>By placing this order, you agree to Rehman Bazar&apos;s Terms of Service &amp; 30-Day Guarantee.</p>
                </div>
              </div>
            </div>

          </div>
        </form>

      </div>
    </div>
  );
};
