import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-foreground/20 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4 }}
            className="fixed top-0 right-0 bottom-0 z-[70] w-full max-w-md bg-background shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-lg font-serif">Shopping Bag ({cartCount})</h2>
              <button
                onClick={onClose}
                className="p-2 hover:text-secondary transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" strokeWidth={1} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">Your bag is empty</p>
                  <Link
                    to="/shop"
                    onClick={onClose}
                    className="text-sm underline hover:text-secondary transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={`${item.id}-${item.size}-${item.color}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex gap-4"
                    >
                      <div className="w-20 h-26 bg-muted flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="text-sm font-medium">{item.name}</h3>
                          <button 
                            onClick={() => removeFromCart(item.id, item.size, item.color)}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Trash2 className="w-4 h-4" strokeWidth={1} />
                          </button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {item.color} / {item.size}
                        </p>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center border border-border">
                            <button 
                              onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                              className="p-2 hover:bg-muted transition-colors"
                            >
                              <Minus className="w-3 h-3" strokeWidth={1} />
                            </button>
                            <span className="px-3 text-sm">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                              className="p-2 hover:bg-muted transition-colors"
                            >
                              <Plus className="w-3 h-3" strokeWidth={1} />
                            </button>
                          </div>
                          <p className="text-sm font-medium">
                            ${(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-border">
                <div className="flex justify-between mb-4">
                  <span className="text-sm">Subtotal</span>
                  <span className="text-sm font-medium">
                    ${cartTotal.toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-6">
                  Shipping and taxes calculated at checkout
                </p>
                <Link
                  to="/checkout"
                  onClick={onClose}
                  className="btn-primary w-full flex items-center justify-center"
                >
                  <span>Checkout</span>
                </Link>
                <Link
                  to="/cart"
                  onClick={onClose}
                  className="block text-center mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors link-hover"
                >
                  View Cart
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
