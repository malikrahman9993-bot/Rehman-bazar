import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Headphones, Award, Lock, CheckCircle2 } from 'lucide-react';
import { ScrollReveal } from '../common/ScrollReveal';

export const TrustSection: React.FC = () => {
  const trustFeatures = [
    {
      icon: ShieldCheck,
      title: '100% Authentic Guarantee',
      desc: 'Every luxury item is certified and inspected by our master horologists and curators.',
    },
    {
      icon: Truck,
      title: 'Fast USA & UK Priority Delivery',
      desc: 'Dispatched via FedEx Express & Royal Mail Tracked 24 with signature confirmation.',
    },
    {
      icon: RotateCcw,
      title: '30-Day Hassle-Free Returns',
      desc: 'Pre-printed return labels included in every parcel for immediate exchanges or refunds.',
    },
    {
      icon: Lock,
      title: '256-Bit SSL Secure Checkout',
      desc: 'Enterprise-grade encryption supporting Apple Pay, Google Pay, Visa, Amex, and Klarna.',
    },
    {
      icon: Headphones,
      title: '24/7 VIP Concierge Care',
      desc: 'Direct access to client advisors ready to assist with sizing, styling, and order tracking.',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-stone-900/40 border-b border-stone-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              THE REHMAN BAZAR COMMITMENT
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-serif-luxury">
              Why Discerning Clients Choose Us
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {trustFeatures.map((item, idx) => {
            const Icon = item.icon;
            return (
              <ScrollReveal key={idx} direction="up" delay={idx * 0.1}>
                <div
                  className="p-6 rounded-2xl bg-stone-900 border border-stone-800/80 hover:border-amber-500/30 transition-all flex flex-col items-center text-center space-y-3 group h-full shadow-lg"
                >
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
