import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark' | 'gold';
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  variant = 'gold',
  showTagline = false,
}) => {
  const iconSizes = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-11 h-11 text-base',
    xl: 'w-14 h-14 text-xl',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl sm:text-4xl',
  };

  return (
    <div className="flex items-center gap-2.5 select-none cursor-pointer group">
      {/* Luxury Crest / Monogram Emblem */}
      <div
        className={`relative ${iconSizes[size]} rounded-xl flex items-center justify-center font-bold tracking-tighter transition-all duration-300 group-hover:scale-105 shadow-lg ${
          variant === 'gold'
            ? 'bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 text-stone-950 shadow-amber-500/20'
            : variant === 'light'
            ? 'bg-white text-stone-950 shadow-stone-900/10'
            : 'bg-stone-900 text-amber-400 border border-stone-800'
        }`}
      >
        <span className="font-serif-luxury font-black text-center leading-none">RB</span>
        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full border-2 border-stone-950 animate-pulse" />
      </div>

      {/* Brand Wordmark */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className={`font-serif-luxury font-extrabold tracking-tight text-white leading-none ${textSizes[size]}`}>
            REHMAN
          </span>
          <span className={`font-serif-luxury font-light text-amber-400 tracking-wider leading-none ${textSizes[size]}`}>
            BAZAR
          </span>
        </div>
        {showTagline && (
          <span className="text-[10px] tracking-[0.25em] text-stone-400 uppercase font-medium mt-1">
            USA & UK Luxury Destination
          </span>
        )}
      </div>
    </div>
  );
};
