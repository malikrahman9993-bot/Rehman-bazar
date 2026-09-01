import React from 'react';
import { Home, Compass, Heart, ShoppingBag, User } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const MobileBottomNav: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    cartTotalCount,
    setIsCartOpen,
    wishlist,
    user,
    setIsAuthModalOpen,
  } = useStore();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'shop', label: 'Explore', icon: Compass },
    { id: 'wishlist', label: 'Wishlist', icon: Heart, badge: wishlist.length },
    { id: 'cart', label: 'Bag', icon: ShoppingBag, badge: cartTotalCount, isCart: true },
    { id: 'account', label: 'Account', icon: User, isAccount: true },
  ];

  const handleAction = (item: typeof navItems[0]) => {
    if (item.isCart) {
      setIsCartOpen(true);
      return;
    }
    if (item.isAccount) {
      if (!user) {
        setIsAuthModalOpen(true);
      } else {
        setCurrentView('account');
      }
      return;
    }
    if (item.id === 'wishlist') {
      setCurrentView('account');
      return;
    }
    setCurrentView(item.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-stone-950/95 backdrop-blur-xl border-t border-stone-800/80 px-4 py-2 flex items-center justify-around shadow-2xl">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive =
          (item.id === 'home' && currentView === 'home') ||
          (item.id === 'shop' && currentView === 'shop') ||
          (item.id === 'account' && currentView === 'account');

        return (
          <button
            key={item.id}
            onClick={() => handleAction(item)}
            className={`relative flex flex-col items-center justify-center p-1.5 transition-colors ${
              isActive ? 'text-amber-400' : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <div className="relative">
              <Icon size={20} className={isActive ? 'stroke-[2.5]' : 'stroke-2'} />
              {item.badge !== undefined && item.badge > 0 && (
                <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-amber-500 text-stone-950 rounded-full text-[10px] font-black flex items-center justify-center shadow-md">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] font-medium tracking-tight mt-0.5">
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
