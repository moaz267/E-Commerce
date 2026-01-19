import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
  image: string;
}

export interface WishlistItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface CartContextType {
  cartItems: CartItem[];
  wishlistItems: WishlistItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeFromCart: (id: number, size: string, color: string) => void;
  updateQuantity: (id: number, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: number) => void;
  isInWishlist: (id: number) => boolean;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Helper to get data from localStorage
const getStoredData = <T,>(key: string, defaultValue: T): T => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => 
    getStoredData('suprema_cart', [])
  );
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(() => 
    getStoredData('suprema_wishlist', [])
  );

  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem('suprema_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Persist wishlist to localStorage
  useEffect(() => {
    localStorage.setItem('suprema_wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToCart = (item: Omit<CartItem, 'quantity'>, quantity = 1) => {
    setCartItems(prev => {
      const existingItem = prev.find(
        i => i.id === item.id && i.size === item.size && i.color === item.color
      );
      
      if (existingItem) {
        toast.success('Updated quantity in bag');
        return prev.map(i =>
          i.id === item.id && i.size === item.size && i.color === item.color
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      
      toast.success('Added to bag');
      return [...prev, { ...item, quantity }];
    });
  };

  const removeFromCart = (id: number, size: string, color: string) => {
    setCartItems(prev => prev.filter(item => 
      !(item.id === id && item.size === size && item.color === color)
    ));
    toast.success('Removed from bag');
  };

  const updateQuantity = (id: number, size: string, color: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id, size, color);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === id && item.size === size && item.color === color 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const addToWishlist = (item: WishlistItem) => {
    setWishlistItems(prev => {
      if (prev.find(i => i.id === item.id)) {
        toast.info('Already in wishlist');
        return prev;
      }
      toast.success('Added to wishlist');
      return [...prev, item];
    });
  };

  const removeFromWishlist = (id: number) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
    toast.success('Removed from wishlist');
  };

  const isInWishlist = (id: number) => {
    return wishlistItems.some(item => item.id === id);
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        wishlistItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
