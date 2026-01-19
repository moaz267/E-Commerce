import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Minus, Plus, X, ArrowRight } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useCart } from '@/contexts/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  const shipping = 0;
  const total = cartTotal + shipping;

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
            Shopping Bag
          </motion.h1>

          {cartItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-muted-foreground mb-8">Your bag is empty</p>
              <Link to="/shop" className="btn-outline inline-block">
                <span>Continue Shopping</span>
              </Link>
            </motion.div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="border-b border-border pb-4 mb-8 hidden md:grid grid-cols-12 gap-4 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>

                <div className="space-y-8">
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={`${item.id}-${item.size}-${item.color}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="grid md:grid-cols-12 gap-4 items-center pb-8 border-b border-border"
                    >
                      {/* Product */}
                      <div className="md:col-span-6 flex gap-4">
                        <Link to={`/product/${item.id}`} className="w-24 aspect-[3/4] bg-muted flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </Link>
                        <div>
                          <Link to={`/product/${item.id}`} className="font-medium hover:text-secondary transition-colors">
                            {item.name}
                          </Link>
                          <p className="text-sm text-muted-foreground mt-1">
                            {item.color} / {item.size}
                          </p>
                          <button
                            onClick={() => removeFromCart(item.id, item.size, item.color)}
                            className="text-xs text-muted-foreground hover:text-foreground mt-2 flex items-center gap-1"
                          >
                            <X className="w-3 h-3" /> Remove
                          </button>
                        </div>
                      </div>

                      {/* Quantity */}
                      <div className="md:col-span-2 flex md:justify-center">
                        <div className="flex items-center border border-border">
                          <button
                            onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                            className="p-2 hover:bg-muted transition-colors"
                          >
                            <Minus className="w-3 h-3" strokeWidth={1} />
                          </button>
                          <span className="px-3 text-sm min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                            className="p-2 hover:bg-muted transition-colors"
                          >
                            <Plus className="w-3 h-3" strokeWidth={1} />
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="md:col-span-2 md:text-center">
                        <span className="md:hidden text-muted-foreground text-sm">Price: </span>
                        ${item.price.toLocaleString()}
                      </div>

                      {/* Total */}
                      <div className="md:col-span-2 md:text-right font-medium">
                        <span className="md:hidden text-muted-foreground text-sm font-normal">Total: </span>
                        ${(item.price * item.quantity).toLocaleString()}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-muted p-8"
                >
                  <h2 className="text-lg font-serif mb-8">Order Summary</h2>

                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${cartTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>{shipping === 0 ? 'Complimentary' : `$${shipping}`}</span>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4 mb-8">
                    <div className="flex justify-between">
                      <span className="font-medium">Total</span>
                      <span className="font-medium">${total.toLocaleString()}</span>
                    </div>
                  </div>

                  <Link
                    to="/checkout"
                    className="btn-primary w-full flex items-center justify-center gap-2"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" strokeWidth={1} />
                  </Link>

                  <Link
                    to="/shop"
                    className="block text-center mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </motion.div>

                {/* Promo Code */}
                <div className="mt-6 p-6 border border-border">
                  <p className="text-xs uppercase tracking-[0.15em] mb-4">Promo Code</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter code"
                      className="flex-1 bg-transparent border border-border px-4 py-3 text-sm focus:outline-none focus:border-foreground"
                    />
                    <button className="px-6 py-3 bg-foreground text-background text-xs uppercase tracking-[0.1em]">
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Cart;
