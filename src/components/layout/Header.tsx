import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag, Heart, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import MegaMenu from './MegaMenu';
import SearchOverlay from './SearchOverlay';
import CartDrawer from './CartDrawer';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const { cartCount, wishlistItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop', hasMega: true },
    { name: 'Collections', path: '/shop/collections' },
    { name: 'Lookbook', path: '/shop/new-arrivals' },
    { name: 'About', path: '/about' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-background border-b border-border-subtle'
            : 'bg-transparent'
        }`}
      >
        <div className="container-luxury">
          <div className="flex items-center justify-between h-20">
            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 -ml-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" strokeWidth={1} />
              ) : (
                <Menu className="w-5 h-5" strokeWidth={1} />
              )}
            </button>

            {/* Navigation - Desktop */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.hasMega && setActiveMenu(item.name)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <Link
                    to={item.path}
                    className="text-xs uppercase tracking-[0.2em] font-medium text-foreground hover:text-secondary transition-colors link-hover py-2"
                  >
                    {item.name}
                  </Link>

                  {/* Dropdown / Mega Menu */}
                  {item.hasMega && activeMenu === item.name && (
                    <div className="absolute top-[95%] left-1/2 -translate-x-[65%] -ml-24 scale-95 origin-top">
                      <MegaMenu onClose={() => setActiveMenu(null)} />
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Logo */}
            <Link to="/" className="absolute left-1/2 -translate-x-1/2">
              <h1 className="font-serif text-2xl md:text-3xl tracking-[0.1em]">
                SUPREMA
              </h1>
            </Link>

            {/* Actions */}
            <div className="flex items-center gap-4 md:gap-6">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 hover:text-secondary transition-colors"
              >
                <Search className="w-5 h-5" strokeWidth={1} />
              </button>

              <Link
                to="/wishlist"
                className="hidden md:block p-2 hover:text-secondary transition-colors relative"
              >
                <Heart className="w-5 h-5" strokeWidth={1} />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-foreground text-background text-[10px] flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setIsCartOpen(true)}
                className="p-2 hover:text-secondary transition-colors relative"
              >
                <ShoppingBag className="w-5 h-5" strokeWidth={1} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-foreground text-background text-[10px] flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background pt-20 lg:hidden"
          >
            <nav className="container-luxury py-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.path}
                    className="block py-4 text-2xl font-serif border-b border-border"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  );
};

export default Header;
