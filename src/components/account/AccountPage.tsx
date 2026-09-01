import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  User as UserIcon,
  Package,
  MapPin,
  CreditCard,
  LogOut,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  Clock,
  CheckCircle2,
  Truck,
  RotateCcw,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AccountPage: React.FC = () => {
  const { user, orders, formatPrice, logout, setCurrentView, setIsAuthModalOpen, viewProductDetail } = useStore();
  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'addresses'>('orders');

  if (!user) {
    return (
      <div className="bg-stone-950 min-h-[70vh] flex items-center justify-center p-6">
        <div className="text-center max-w-md space-y-4 bg-stone-900 border border-stone-800 p-8 sm:p-12 rounded-3xl shadow-2xl">
          <div className="w-16 h-16 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
            <UserIcon size={32} />
          </div>
          <h2 className="text-2xl font-bold text-white font-serif-luxury">
            Patron Sign-In Required
          </h2>
          <p className="text-xs sm:text-sm text-stone-400">
            Please authenticate to inspect your previous acquisitions and tracking statuses.
          </p>
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-2xl text-xs transition-all shadow-xl shadow-amber-500/20"
          >
            Sign In / Register
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-stone-950 min-h-screen pb-24 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* User Profile Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-stone-900 border border-stone-800 mb-8 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'}
              alt={user.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-500/40 shadow-lg"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-white font-serif-luxury">
                  {user.name}
                </h1>
                <span className="bg-amber-500/20 text-amber-300 text-[10px] uppercase font-black px-2.5 py-0.5 rounded-full border border-amber-500/30">
                  {user.role === 'admin' ? '⚡ STORE ADMIN' : '⭐ VIP PATRON'}
                </span>
              </div>
              <p className="text-xs text-stone-400">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {user.role === 'admin' && (
              <button
                onClick={() => setCurrentView('admin')}
                className="px-4 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-xl text-xs font-bold transition-colors"
              >
                Access Admin Suite
              </button>
            )}
            <button
              onClick={logout}
              className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white rounded-xl text-xs font-semibold border border-stone-700 transition-colors flex items-center gap-1.5"
            >
              <LogOut size={14} />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 border-b border-stone-800 pb-4 mb-8">
          {[
            { id: 'orders', label: `Order History (${orders.length})`, icon: Package },
            { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeTab === tab.id
                  ? 'bg-amber-500 text-stone-950 shadow-md'
                  : 'text-stone-400 hover:text-white hover:bg-stone-900'
              }`}
            >
              <tab.icon size={14} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {orders.length === 0 ? (
              <div className="p-8 text-center bg-stone-900/40 border border-stone-800 rounded-3xl">
                <p className="text-xs text-stone-400">No previous orders recorded on this account.</p>
              </div>
            ) : (
              orders.map((order) => (
                <div
                  key={order.id}
                  className="p-6 rounded-3xl bg-stone-900 border border-stone-800 shadow-xl space-y-4"
                >
                  {/* Order header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-800">
                    <div>
                      <span className="text-[11px] text-stone-500 block">Order Placed: {new Date(order.createdAt).toLocaleDateString()}</span>
                      <span className="text-sm font-mono font-bold text-amber-400">{order.orderNumber}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full border capitalize ${
                          order.status === 'delivered'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : order.status === 'shipped'
                            ? 'bg-sky-500/10 text-sky-400 border-sky-500/20'
                            : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        }`}
                      >
                        {order.status}
                      </span>
                      <span className="text-sm font-black text-white font-serif-luxury">
                        {formatPrice(order.total)}
                      </span>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between gap-4 p-2.5 rounded-xl bg-stone-950/60"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={item.product.images[0]}
                            alt=""
                            className="w-12 h-12 rounded-lg object-cover bg-stone-900 cursor-pointer"
                            onClick={() => viewProductDetail(item.product.id)}
                          />
                          <div>
                            <h4
                              className="text-xs font-bold text-white hover:text-amber-300 cursor-pointer"
                              onClick={() => viewProductDetail(item.product.id)}
                            >
                              {item.product.name}
                            </h4>
                            <span className="text-[10px] text-stone-400">Qty: {item.quantity}</span>
                          </div>
                        </div>

                        <span className="text-xs font-mono font-bold text-amber-400">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Tracking info */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-stone-400 pt-2 border-t border-stone-800/80 gap-2">
                    <span className="flex items-center gap-1.5">
                      <Truck size={14} className="text-emerald-400" />
                      Carrier Tracking: <strong className="text-stone-200 font-mono">{order.trackingNumber}</strong>
                    </span>
                    <span>Estimated Arrival: <strong className="text-white">{order.estimatedDelivery}</strong></span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'addresses' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-stone-900 border border-stone-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Primary US Address</span>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">Default</span>
              </div>
              <p className="text-sm font-bold text-white">Alexander Wright</p>
              <p className="text-xs text-stone-300 leading-relaxed">
                740 Park Avenue, Penthouse 14B<br />
                New York, NY 10021, United States<br />
                Phone: +1 (212) 555-0199
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-stone-900 border border-stone-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Secondary UK Address</span>
              </div>
              <p className="text-sm font-bold text-white">Alexander Wright</p>
              <p className="text-xs text-stone-300 leading-relaxed">
                14 Berkeley Square, Mayfair<br />
                London, W1J 6BT, United Kingdom<br />
                Phone: +44 20 7946 0991
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
