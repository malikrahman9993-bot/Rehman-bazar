import React from 'react';
import { motion } from 'motion/react';
import { useStore } from '../../context/StoreContext';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '', showLabel = false }) => {
  const { theme, toggleTheme } = useStore();
  const isDark = theme === 'dark';

  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      <button
        type="button"
        id="celestial-theme-toggle-btn"
        role="switch"
        aria-checked={isDark}
        aria-label={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
        onClick={toggleTheme}
        className="relative w-[60px] h-[30px] rounded-full p-1 transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950 overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.5),0_2px_8px_rgba(0,0,0,0.4)] border border-stone-700/60 hover:border-amber-400/60 group cursor-pointer"
        style={{
          background: isDark
            ? 'linear-gradient(135deg, #090d16 0%, #172554 60%, #1e1b4b 100%)'
            : 'linear-gradient(135deg, #38bdf8 0%, #60a5fa 60%, #93c5fd 100%)',
        }}
        title={isDark ? 'Switch to Daylight Luxe Theme' : 'Switch to Midnight Dark Theme'}
      >
        {/* Ambient background glow */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
            isDark ? 'opacity-30 bg-indigo-900/40' : 'opacity-40 bg-amber-300/30'
          }`}
        />

        {/* --- NIGHT SKY ELEMENTS (Stars & Constellations) --- */}
        <motion.div
          animate={{
            opacity: isDark ? 1 : 0,
            y: isDark ? 0 : -8,
            scale: isDark ? 1 : 0.6,
          }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="absolute inset-0 pointer-events-none"
        >
          {/* Star 1 - Twinkling Top Left */}
          <motion.svg
            animate={{ scale: [1, 1.25, 0.9, 1], opacity: [0.7, 1, 0.6, 0.7] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
            viewBox="0 0 10 10"
            className="absolute top-1.5 left-2.5 w-2 h-2 fill-amber-200 drop-shadow-[0_0_3px_#fde047]"
          >
            <path d="M5 0L6 3.5L9.5 5L6 6.5L5 10L4 6.5L0.5 5L4 3.5Z" />
          </motion.svg>

          {/* Star 2 - Micro Star Middle */}
          <motion.svg
            animate={{ scale: [0.9, 1.3, 1, 0.9], opacity: [0.6, 1, 0.7, 0.6] }}
            transition={{ repeat: Infinity, duration: 1.8, delay: 0.4, ease: 'easeInOut' }}
            viewBox="0 0 10 10"
            className="absolute top-4 left-5 w-1.5 h-1.5 fill-sky-200 drop-shadow-[0_0_2px_#bae6fd]"
          >
            <path d="M5 0L6 3.5L9.5 5L6 6.5L5 10L4 6.5L0.5 5L4 3.5Z" />
          </motion.svg>

          {/* Star 3 - Micro Star Dots SVG */}
          <svg viewBox="0 0 60 30" className="absolute inset-0 w-full h-full">
            <circle cx="10" cy="20" r="0.9" fill="#ffffff" opacity="0.8" />
            <circle cx="18" cy="8" r="0.7" fill="#fde047" opacity="0.9" />
          </svg>
        </motion.div>

        {/* --- DAY SKY ELEMENTS (Fluffy Clouds & Sunbeams) --- */}
        <motion.div
          animate={{
            opacity: isDark ? 0 : 1,
            y: isDark ? 8 : 0,
            scale: isDark ? 0.6 : 1,
          }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="absolute inset-0 pointer-events-none"
        >
          {/* Back Cloud */}
          <svg
            viewBox="0 0 28 14"
            className="absolute bottom-0 right-1.5 w-7 h-3.5 fill-white/60 drop-shadow-sm"
          >
            <path d="M4 14C2 14 0 12.5 0 10.5C0 8.8 1.4 7.5 3 7.2C3.4 4.5 5.8 2.5 8.7 2.5C11 2.5 13 3.8 13.8 5.7C14.6 5.3 15.6 5 16.7 5C19.6 5 22 7.3 22 10.2C22 10.5 22 10.7 21.9 11C23.1 11.2 24 12.2 24 13.5C24 13.8 23.9 14 23.8 14H4Z" />
          </svg>

          {/* Front Cloud */}
          <svg
            viewBox="0 0 24 12"
            className="absolute -bottom-0.5 right-3 w-6 h-3 fill-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]"
          >
            <path d="M3 12C1.3 12 0 10.7 0 9C0 7.5 1.1 6.3 2.5 6.1C2.8 3.8 4.8 2 7.2 2C9.1 2 10.8 3.1 11.5 4.7C12.2 4.3 13 4 14 4C16.2 4 18 5.8 18 8C18 8.3 18 8.5 17.9 8.7C18.9 8.9 19.6 9.8 19.6 10.8C19.6 11.5 19.1 12 18.5 12H3Z" />
          </svg>
        </motion.div>

        {/* --- THE CELESTIAL SLIDING KNOB (Sun / Moon) --- */}
        <motion.div
          animate={{
            x: isDark ? 30 : 0,
            rotate: isDark ? 360 : 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 450,
            damping: 26,
          }}
          className="relative w-[22px] h-[22px] rounded-full z-10 flex items-center justify-center pointer-events-none"
        >
          {/* DAYTIME: THE RADIANT GOLDEN SUN */}
          <motion.div
            animate={{
              opacity: isDark ? 0 : 1,
              scale: isDark ? 0.3 : 1,
              rotate: isDark ? -180 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* Sun Halo Glow */}
            <div className="absolute inset-0 rounded-full bg-amber-300 blur-[3px] opacity-80" />

            {/* Sun Core */}
            <div className="relative w-full h-full rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-200 shadow-[0_0_8px_rgba(251,191,36,0.9)] border border-amber-300">
              {/* Sun Ray Micro Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
                className="absolute -inset-1 border border-dashed border-amber-200/60 rounded-full"
              />
              {/* Center Glint */}
              <div className="absolute top-1 left-1.5 w-1.5 h-1.5 rounded-full bg-white/70" />
            </div>
          </motion.div>

          {/* NIGHTTIME: THE MYSTICAL CRATERED MOON */}
          <motion.div
            animate={{
              opacity: isDark ? 1 : 0,
              scale: isDark ? 1 : 0.3,
              rotate: isDark ? 0 : 180,
            }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* Moon Halo Glow */}
            <div className="absolute inset-0 rounded-full bg-slate-200 blur-[2px] opacity-40" />

            {/* Moon Orb */}
            <div className="relative w-full h-full rounded-full bg-gradient-to-tr from-slate-300 via-slate-100 to-white shadow-[0_0_8px_rgba(255,255,255,0.7)] border border-slate-200 overflow-hidden">
              {/* Moon Shadow / Shading */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-slate-400/20 to-slate-600/50 rounded-full" />

              {/* Moon Crater 1 */}
              <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-slate-400/40 shadow-inner border border-slate-400/20" />
              {/* Moon Crater 2 */}
              <div className="absolute bottom-1.5 left-2 w-1.5 h-1.5 rounded-full bg-slate-400/35 shadow-inner" />
              {/* Moon Crater 3 */}
              <div className="absolute top-3 left-1.5 w-1 h-1 rounded-full bg-slate-400/30" />

              {/* Specular Highlight */}
              <div className="absolute top-0.5 left-1 w-1.5 h-1 rounded-full bg-white/80" />
            </div>
          </motion.div>
        </motion.div>
      </button>

      {showLabel && (
        <span className="text-xs font-semibold text-stone-300 capitalize">
          {isDark ? 'Midnight' : 'Daylight'}
        </span>
      )}
    </div>
  );
};
