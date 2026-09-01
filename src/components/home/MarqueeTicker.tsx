import React from 'react';
import { Sparkles, ShieldCheck, Truck, Clock, Award, Star, Flame, Crown } from 'lucide-react';

export const MarqueeTicker: React.FC = () => {
  const items = [
    { text: 'EXPRESS FEDEX & ROYAL MAIL DELIVERY', icon: Truck },
    { text: 'SWISS CHRONOGRAPHS & FINE JEWELRY', icon: Crown },
    { text: '100% AUTHENTICITY CERTIFIED', icon: Award },
    { text: '30-DAY HASSLE-FREE PRE-PAID RETURNS', icon: ShieldCheck },
    { text: 'FLASH SALE UP TO 30% OFF', icon: Flame },
    { text: 'NEW YORK & LONDON DEDICATED CONCIERGE', icon: Star },
    { text: 'ITALIAN CASHMERE & SILK COUTURE', icon: Sparkles },
    { text: '256-BIT ENCRYPTED STRIPE CHECKOUT', icon: Clock },
  ];

  return (
    <div className="bg-stone-900 border-y border-stone-800/80 py-3.5 overflow-hidden select-none">
      <div className="animate-marquee flex items-center whitespace-nowrap gap-10">
        {[...items, ...items, ...items].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-stone-300 hover:text-amber-400 transition-colors"
            >
              <Icon className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{item.text}</span>
              <span className="text-stone-600 font-normal">•</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
