import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { X, ShoppingBag } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useCart } from '@/contexts/CartContext';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, addToCart } = useCart();

  const handleAddToCart = (item: typeof wishlistItems[0]) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      size: 'M',
      color: 'Default',
      image: item.image,
    });
  };

  return (
    <Layout>
      <section className="pt-32 pb-20">
        <div className="container-luxury">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-serif text-center mb-16"
          >
            Wishlist
          </motion.h1>

          {wishlistItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-muted-foreground mb-8">Your wishlist is empty</p>
              <Link to="/shop" className="btn-outline inline-block">
                <span>Explore Collection</span>
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
              {wishlistItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-muted mb-4">
                    <Link to={`/product/${item.id}`}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </Link>
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="absolute top-4 right-4 p-2 bg-background hover:bg-foreground hover:text-background transition-colors"
                      aria-label="Remove from wishlist"
                    >
                      <X className="w-4 h-4" strokeWidth={1.5} />
                    </button>
                    <div className="absolute bottom-4 left-4 right-4">
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="w-full px-4 py-3 bg-background hover:bg-foreground hover:text-background transition-colors text-xs uppercase tracking-[0.1em] font-medium flex items-center justify-center gap-2"
                      >
                        <ShoppingBag className="w-4 h-4" strokeWidth={1.5} />
                        Add to Bag
                      </button>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
                      {item.category}
                    </p>
                    <Link
                      to={`/product/${item.id}`}
                      className="text-sm font-medium hover:text-secondary transition-colors"
                    >
                      {item.name}
                    </Link>
                    <p className="text-sm mt-1">${item.price.toLocaleString()}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Wishlist;
