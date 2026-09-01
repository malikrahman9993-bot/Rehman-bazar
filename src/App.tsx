import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { StoreProvider, useStore } from './context/StoreContext';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Navbar } from './components/layout/Navbar';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { Footer } from './components/layout/Footer';

// Home Page Components
import { HeroSection } from './components/home/HeroSection';
import { MarqueeTicker } from './components/home/MarqueeTicker';
import { CategoryShowcase } from './components/home/CategoryShowcase';
import { FlashSaleSection } from './components/home/FlashSaleSection';
import { TrendingSection } from './components/home/TrendingSection';
import { PromoBanner } from './components/home/PromoBanner';
import { BestSellersSection } from './components/home/BestSellersSection';
import { NewArrivalsSection } from './components/home/NewArrivalsSection';
import { TrustSection } from './components/home/TrustSection';
import { CustomerReviewsSection } from './components/home/CustomerReviewsSection';

// Page Views
import { ShopPage } from './components/shop/ShopPage';
import { ProductDetailPage } from './components/product/ProductDetailPage';
import { CartPage } from './components/cart/CartPage';
import { CheckoutPage } from './components/checkout/CheckoutPage';
import { WishlistPage } from './components/wishlist/WishlistPage';
import { AccountPage } from './components/account/AccountPage';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { DealsPage } from './components/deals/DealsPage';

// Modals & Overlays
import { CartDrawer } from './components/cart/CartDrawer';
import { ProductQuickView } from './components/shop/ProductQuickView';
import { SearchModal } from './components/common/SearchModal';
import { AuthModal } from './components/auth/AuthModal';
import { ToastContainer } from './components/common/Toast';
import { ScrollMotionIndicator } from './components/common/ScrollMotionIndicator';

const MainLayout: React.FC = () => {
  const { currentView } = useStore();

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-500 selection:text-stone-950">
      {/* Golden Scroll Motion Progress Bar & Scroll-To-Top Button */}
      <ScrollMotionIndicator />

      {/* Toast Notifications */}
      <ToastContainer />

      {/* Top Announcement Bar */}
      <AnnouncementBar />

      {/* Sticky Primary Navigation */}
      <Navbar />

      {/* Dynamic View Router with Smooth Transitions */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {currentView === 'home' && (
              <>
                <HeroSection />
                <MarqueeTicker />
                <CategoryShowcase />
                <FlashSaleSection />
                <TrendingSection />
                <PromoBanner />
                <BestSellersSection />
                <NewArrivalsSection />
                <TrustSection />
                <CustomerReviewsSection />
              </>
            )}

            {currentView === 'shop' && <ShopPage />}
            {currentView === 'product-detail' && <ProductDetailPage />}
            {currentView === 'cart' && <CartPage />}
            {currentView === 'checkout' && <CheckoutPage />}
            {currentView === 'wishlist' && <WishlistPage />}
            {currentView === 'account' && <AccountPage />}
            {currentView === 'admin' && <AdminDashboard />}
            {currentView === 'deals' && <DealsPage />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Modals & Slide-overs */}
      <CartDrawer />
      <ProductQuickView />
      <SearchModal />
      <AuthModal />

      {/* Comprehensive Footer */}
      <Footer />

      {/* Mobile Sticky Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainLayout />
    </StoreProvider>
  );
}
