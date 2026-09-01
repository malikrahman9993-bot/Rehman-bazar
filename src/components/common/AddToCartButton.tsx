import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ShoppingCart, Sparkles, PackageCheck } from 'lucide-react';

interface AnimatedAddToCartButtonProps {
  onAdd: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'compact';
  fullWidth?: boolean;
  label?: string;
  addedLabel?: string;
  disabled?: boolean;
  id?: string;
}

export const AnimatedAddToCartButton: React.FC<AnimatedAddToCartButtonProps> = ({
  onAdd,
  className = '',
  size = 'md',
  fullWidth = false,
  label = 'Add to Bag',
  addedLabel = 'Added to Bag',
  disabled = false,
  id,
}) => {
  // animStep: 'idle' -> 'dropping' -> 'driving' -> 'success'
  const [animStep, setAnimStep] = useState<'idle' | 'dropping' | 'driving' | 'success'>('idle');

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabled || animStep !== 'idle') return;

    // Trigger state changes with intentional timing for high visibility
    onAdd();
    setAnimStep('dropping');

    // 1. Box drops and cart bounces
    setTimeout(() => {
      setAnimStep('driving');
    }, 750);

    // 2. Cart rolls away to the right
    setTimeout(() => {
      setAnimStep('success');
    }, 1500);

    // 3. Reset back to original idle state after showing success
    setTimeout(() => {
      setAnimStep('idle');
    }, 3800);
  };

  const isCompact = size === 'compact';

  // Size styling variants
  const sizeClasses = {
    sm: 'h-9 px-4 text-xs rounded-xl min-w-[95px]',
    md: 'h-11 px-5 text-xs sm:text-sm rounded-xl min-w-[140px]',
    lg: 'h-13 px-8 text-sm sm:text-base rounded-2xl min-w-[180px]',
    compact: 'h-9 w-9 p-0 rounded-xl',
  }[size];

  return (
    <motion.button
      id={id}
      type="button"
      whileHover={animStep === 'idle' ? { scale: 1.03, y: -1 } : {}}
      whileTap={animStep === 'idle' ? { scale: 0.95 } : {}}
      onClick={handleClick}
      disabled={disabled}
      className={`relative overflow-hidden cursor-pointer select-none transition-colors duration-300 font-bold ${
        fullWidth ? 'w-full' : ''
      } ${sizeClasses} ${
        animStep === 'success'
          ? 'bg-stone-900 border border-emerald-500/80 text-emerald-400 shadow-lg shadow-emerald-500/20'
          : animStep === 'dropping' || animStep === 'driving'
          ? 'bg-stone-950 border border-amber-500/50 text-amber-400 shadow-inner'
          : 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-stone-950 shadow-md shadow-amber-500/25 hover:shadow-amber-500/40'
      } flex items-center justify-center ${className}`}
    >
      {/* Background Animated Road / Track for the cart during animation */}
      {(animStep === 'dropping' || animStep === 'driving') && (
        <div className="absolute inset-x-0 bottom-1.5 h-[2px] bg-stone-800 flex justify-around opacity-60">
          <div className="w-2 h-full bg-amber-500/40 animate-pulse" />
          <div className="w-2 h-full bg-amber-500/40 animate-pulse" />
          <div className="w-2 h-full bg-amber-500/40 animate-pulse" />
        </div>
      )}

      {/* 1. IDLE VIEW */}
      {animStep === 'idle' && (
        <motion.div
          key="idle"
          initial={{ opacity: 0, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="flex items-center justify-center gap-2 relative z-10 w-full"
        >
          <ShoppingCart size={isCompact ? 16 : size === 'lg' ? 19 : 16} className="shrink-0" />
          {!isCompact && <span className="tracking-tight whitespace-nowrap">{label}</span>}
        </motion.div>
      )}

      {/* 2. ANIMATION VIEW: BOX DROPPING & CART ZOOMING */}
      {(animStep === 'dropping' || animStep === 'driving') && (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden z-10">
          {/* Main animated carriage group */}
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            animate={
              animStep === 'dropping'
                ? { x: 0, opacity: 1 }
                : { x: 120, opacity: [1, 1, 0] }
            }
            transition={
              animStep === 'dropping'
                ? { type: 'spring', stiffness: 350, damping: 22 }
                : { duration: 0.65, ease: [0.32, 0, 0.67, 0] }
            }
            className="relative flex items-center"
          >
            {/* The 3D Box / Parcel falling with bounce */}
            <AnimatePresence>
              {animStep === 'dropping' && (
                <motion.div
                  initial={{ y: -32, x: 2, scale: 0.5, rotate: -35, opacity: 0 }}
                  animate={{
                    y: [-32, -4, -10, -4],
                    x: 2,
                    scale: 1,
                    rotate: [-35, 10, -5, 0],
                    opacity: 1,
                  }}
                  transition={{
                    duration: 0.65,
                    times: [0, 0.45, 0.7, 1],
                    ease: 'easeOut',
                  }}
                  className="absolute -top-1.5 left-1 z-20"
                >
                  <div className="w-4 h-4 bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 rounded-[3px] border border-amber-200 shadow-md flex items-center justify-center">
                    <div className="w-2.5 h-[1.5px] bg-stone-900/60 rounded-full" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Shopping Cart Body with Impact Squash-and-Stretch */}
            <motion.div
              animate={
                animStep === 'dropping'
                  ? {
                      scaleY: [1, 1, 0.7, 1.25, 0.95, 1],
                      scaleX: [1, 1, 1.2, 0.85, 1.05, 1],
                      y: [0, 0, 2, -3, 1, 0],
                    }
                  : {
                      rotate: [0, 6, -4, 4, 0],
                      y: [0, -1, 1, 0],
                    }
              }
              transition={
                animStep === 'dropping'
                  ? { duration: 0.7, times: [0, 0.4, 0.5, 0.65, 0.85, 1] }
                  : { duration: 0.3, repeat: Infinity }
              }
              className="relative text-amber-400 flex items-center"
            >
              <ShoppingCart size={size === 'lg' ? 22 : 18} className="stroke-[2.2]" />

              {/* Little smoke / speed trails when driving */}
              {animStep === 'driving' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: [0.9, 0], scale: [1, 2], x: [-6, -22] }}
                  transition={{ duration: 0.25, repeat: Infinity }}
                  className="absolute -bottom-1 -left-2 w-2 h-2 rounded-full bg-amber-400/60 blur-[0.5px]"
                />
              )}
            </motion.div>

            {/* Speed trail lines behind cart */}
            {animStep === 'driving' && (
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: [0, 1, 0], scaleX: [0, 1.5, 2], x: -14 }}
                transition={{ duration: 0.3, repeat: Infinity }}
                className="absolute left-0 w-6 h-[2px] bg-gradient-to-r from-amber-400/80 to-transparent"
              />
            )}
          </motion.div>

          {/* Micro state text (Packing... / In Motion...) */}
          {!isCompact && size !== 'sm' && (
            <motion.span
              initial={{ opacity: 0, x: 5 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="text-[11px] font-black uppercase tracking-wider text-amber-400 ml-2"
            >
              {animStep === 'dropping' ? 'Packing...' : 'Added!'}
            </motion.span>
          )}
        </div>
      )}

      {/* 3. SUCCESS CELEBRATION VIEW */}
      {animStep === 'success' && (
        <motion.div
          key="success"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 450, damping: 16 }}
          className="flex items-center justify-center gap-1.5 relative z-10 w-full font-extrabold text-emerald-400"
        >
          {/* Popping Checkmark Circle */}
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 600, damping: 14 }}
            className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center shadow-sm"
          >
            <Check size={13} className="stroke-[3.5] text-emerald-400" />
          </motion.div>

          {!isCompact && (
            <motion.span
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="text-xs sm:text-sm tracking-tight whitespace-nowrap"
            >
              {addedLabel}
            </motion.span>
          )}

          {/* Tiny Golden Sparkle Accents */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.2, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="absolute -top-1 -right-1 text-amber-300 pointer-events-none"
          >
            <Sparkles size={14} />
          </motion.div>
        </motion.div>
      )}
    </motion.button>
  );
};
