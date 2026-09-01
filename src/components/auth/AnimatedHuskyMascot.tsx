import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface AnimatedHuskyMascotProps {
  emailText: string;
  isEmailFocused: boolean;
  isPasswordFocused: boolean;
  isPasswordVisible: boolean;
  isSubmitted?: boolean;
}

export const AnimatedHuskyMascot: React.FC<AnimatedHuskyMascotProps> = ({
  emailText,
  isEmailFocused,
  isPasswordFocused,
  isPasswordVisible,
  isSubmitted = false,
}) => {
  const [isBlinking, setIsBlinking] = useState(false);

  // Natural periodic blinking when not covering eyes
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      if (!isPasswordFocused) {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 180);
      }
    }, 3800);
    return () => clearInterval(blinkInterval);
  }, [isPasswordFocused]);

  // Calculate gaze direction based on email character length
  const maxChars = 32;
  const progress = Math.min(Math.max(emailText.length / maxChars, 0), 1);
  // Pupil X moves from -4 to +4 based on input length
  const gazeX = isEmailFocused ? (progress - 0.5) * 9 : 0;
  // Pupil Y looks slightly downward when typing in the input
  const gazeY = isEmailFocused ? 3.5 : isSubmitted ? -2 : 0;

  // Determine ear tilt angle when typing
  const earLeftRotate = isEmailFocused ? -4 - (emailText.length % 3) * 2 : 0;
  const earRightRotate = isEmailFocused ? 4 + (emailText.length % 3) * 2 : 0;

  return (
    <div className="relative w-36 h-28 mx-auto -mb-3 select-none pointer-events-none z-20">
      <svg
        viewBox="0 0 160 130"
        className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Defs for gradients & shadows */}
        <defs>
          <radialGradient id="huskyFurGrad" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="60%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </radialGradient>
          <linearGradient id="whiteFurGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>
          <linearGradient id="earInnerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fda4af" />
            <stop offset="100%" stopColor="#f43f5e" />
          </linearGradient>
          <radialGradient id="huskyEyeGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="60%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#0369a1" />
          </radialGradient>
          <linearGradient id="pawGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* --- EARS --- */}
        {/* Left Ear */}
        <motion.g
          animate={{ rotate: earLeftRotate }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          style={{ originX: '45px', originY: '45px' }}
        >
          {/* Outer Ear */}
          <path
            d="M 32 45 L 20 10 C 24 6, 36 8, 48 24 Z"
            fill="url(#huskyFurGrad)"
            stroke="#0f172a"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Inner Ear Pink */}
          <path
            d="M 30 40 L 23 16 C 26 14, 34 16, 42 27 Z"
            fill="url(#earInnerGrad)"
            opacity="0.85"
          />
        </motion.g>

        {/* Right Ear */}
        <motion.g
          animate={{ rotate: earRightRotate }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          style={{ originX: '115px', originY: '45px' }}
        >
          {/* Outer Ear */}
          <path
            d="M 128 45 L 140 10 C 136 6, 124 8, 112 24 Z"
            fill="url(#huskyFurGrad)"
            stroke="#0f172a"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Inner Ear Pink */}
          <path
            d="M 130 40 L 137 16 C 134 14, 126 16, 118 27 Z"
            fill="url(#earInnerGrad)"
            opacity="0.85"
          />
        </motion.g>

        {/* --- HEAD BASE --- */}
        <ellipse
          cx="80"
          cy="68"
          rx="52"
          ry="44"
          fill="url(#huskyFurGrad)"
          stroke="#0f172a"
          strokeWidth="3"
        />

        {/* Husky Dark Cap / Forehead Pattern */}
        <path
          d="M 40 45 C 55 35, 105 35, 120 45 C 108 65, 96 52, 80 62 C 64 52, 52 65, 40 45 Z"
          fill="#0f172a"
        />

        {/* White Face Mask / Cheeks */}
        <path
          d="M 35 68 C 35 90, 52 104, 80 104 C 108 104, 125 90, 125 68 C 125 60, 118 52, 108 55 C 96 59, 88 52, 80 52 C 72 52, 64 59, 52 55 C 42 52, 35 60, 35 68 Z"
          fill="url(#whiteFurGrad)"
        />

        {/* Forehead Stripe */}
        <path
          d="M 76 34 C 76 32, 84 32, 84 34 L 83 54 C 81 55, 79 55, 77 54 Z"
          fill="#f8fafc"
        />

        {/* --- EYES --- */}
        {/* Left Eye Sclera */}
        <g id="left-eye-group">
          <ellipse
            cx="58"
            cy="65"
            rx="11"
            ry={isBlinking ? 1 : 12}
            fill="#ffffff"
            stroke="#1e293b"
            strokeWidth="2"
          />
          {!isBlinking && (
            <motion.g
              animate={{ x: gazeX, y: gazeY }}
              transition={{ type: 'spring', stiffness: 350, damping: 20 }}
            >
              {/* Blue Iris */}
              <circle cx="58" cy="65" r="7.5" fill="url(#huskyEyeGrad)" />
              {/* Pupil */}
              <circle cx="58" cy="65" r="4.5" fill="#090d16" />
              {/* Sparkle Highlight Top Left */}
              <circle cx="56" cy="63" r="2" fill="#ffffff" />
              <circle cx="60" cy="67" r="1" fill="#ffffff" opacity="0.8" />
            </motion.g>
          )}
          {/* Eyebrow */}
          <path
            d="M 48 51 Q 58 48 68 53"
            stroke="#0f172a"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* Right Eye Sclera */}
        <g id="right-eye-group">
          <ellipse
            cx="102"
            cy="65"
            rx="11"
            ry={isBlinking ? 1 : 12}
            fill="#ffffff"
            stroke="#1e293b"
            strokeWidth="2"
          />
          {!isBlinking && (
            <motion.g
              animate={{ x: gazeX, y: gazeY }}
              transition={{ type: 'spring', stiffness: 350, damping: 20 }}
            >
              {/* Blue Iris */}
              <circle cx="102" cy="65" r="7.5" fill="url(#huskyEyeGrad)" />
              {/* Pupil */}
              <circle cx="102" cy="65" r="4.5" fill="#090d16" />
              {/* Sparkle Highlight Top Left */}
              <circle cx="100" cy="63" r="2" fill="#ffffff" />
              <circle cx="104" cy="67" r="1" fill="#ffffff" opacity="0.8" />
            </motion.g>
          )}
          {/* Eyebrow */}
          <path
            d="M 92 53 Q 102 48 112 51"
            stroke="#0f172a"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* --- SNOUT & NOSE & MOUTH --- */}
        <ellipse cx="80" cy="84" rx="16" ry="11" fill="#ffffff" opacity="0.9" />

        {/* Cute Black Nose */}
        <path
          d="M 73 78 C 73 76, 87 76, 87 78 C 87 83, 82 86, 80 86 C 78 86, 73 83, 73 78 Z"
          fill="#090d16"
        />
        {/* Nose Highlight */}
        <ellipse cx="78" cy="78" rx="2.5" ry="1.2" fill="#ffffff" opacity="0.6" />

        {/* Mouth */}
        <path
          d="M 75 87 Q 80 91 80 87 Q 80 91 85 87"
          stroke="#090d16"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />

        {/* Cute Tongue if typing or submitted */}
        {isSubmitted && (
          <path
            d="M 77 88 C 77 94, 83 94, 83 88 Z"
            fill="#f43f5e"
            stroke="#090d16"
            strokeWidth="1.5"
          />
        )}

        {/* --- ANIMATED PAWS (Cover Eyes / Peek / Normal Rest Position) --- */}

        {/* Left Paw */}
        <motion.g
          animate={
            isPasswordFocused
              ? { x: 8, y: -44, rotate: 12 } // Covers left eye completely
              : { x: 0, y: 0, rotate: 0 } // Resting on bottom edge
          }
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          style={{ originX: '45px', originY: '110px' }}
        >
          {/* Paw Shadow */}
          <ellipse cx="44" cy="115" rx="16" ry="11" fill="#000000" opacity="0.25" />
          {/* Paw Base */}
          <ellipse
            cx="44"
            cy="114"
            rx="15"
            ry="11"
            fill="url(#pawGrad)"
            stroke="#0f172a"
            strokeWidth="2.5"
          />
          {/* Paw Pads / Claws details */}
          <circle cx="36" cy="116" r="2" fill="#64748b" opacity="0.7" />
          <circle cx="44" cy="118" r="2.2" fill="#64748b" opacity="0.7" />
          <circle cx="52" cy="116" r="2" fill="#64748b" opacity="0.7" />
          {/* Main Toe Separators */}
          <path d="M 39 110 L 39 117" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 48 110 L 48 117" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
        </motion.g>

        {/* Right Paw */}
        <motion.g
          animate={
            isPasswordFocused
              ? isPasswordVisible
                ? { x: 2, y: -24, rotate: 28 } // Peeking through right eye!
                : { x: -8, y: -44, rotate: -12 } // Covering right eye completely
              : { x: 0, y: 0, rotate: 0 } // Resting on bottom edge
          }
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          style={{ originX: '115px', originY: '110px' }}
        >
          {/* Paw Shadow */}
          <ellipse cx="116" cy="115" rx="16" ry="11" fill="#000000" opacity="0.25" />
          {/* Paw Base */}
          <ellipse
            cx="116"
            cy="114"
            rx="15"
            ry="11"
            fill="url(#pawGrad)"
            stroke="#0f172a"
            strokeWidth="2.5"
          />
          {/* Paw Pads */}
          <circle cx="108" cy="116" r="2" fill="#64748b" opacity="0.7" />
          <circle cx="116" cy="118" r="2.2" fill="#64748b" opacity="0.7" />
          <circle cx="124" cy="116" r="2" fill="#64748b" opacity="0.7" />
          {/* Separators */}
          <path d="M 111 110 L 111 117" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 120 110 L 120 117" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
        </motion.g>
      </svg>
    </div>
  );
};
