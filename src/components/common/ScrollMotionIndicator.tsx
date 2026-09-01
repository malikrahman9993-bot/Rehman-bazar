import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { ArrowUp } from 'lucide-react';

export const ScrollMotionIndicator: React.FC = () => {
  const { scrollY } = useScroll();
  const [showScrollTop, setShowScrollTop] = React.useState(false);

  React.useEffect(() => {
    return scrollY.on('change', (latest) => {
      setShowScrollTop(latest > 400);
    });
  }, [scrollY]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Floating Smooth Scroll-to-Top Button */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          title="Scroll to top"
          className="fixed bottom-20 sm:bottom-8 right-6 z-40 p-3 rounded-full bg-stone-900/90 hover:bg-amber-500 text-amber-400 hover:text-stone-950 border border-amber-500/40 shadow-2xl backdrop-blur-md transition-colors"
        >
          <ArrowUp size={18} className="stroke-[2.5]" />
        </motion.button>
      )}
    </>
  );
};
