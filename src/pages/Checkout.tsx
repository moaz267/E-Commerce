import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, CreditCard, Truck, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import Layout from '@/components/layout/Layout';
import { useCart } from '@/contexts/CartContext';

const steps = [
  { id: 1, name: 'Information', icon: MapPin },
  { id: 2, name: 'Shipping', icon: Truck },
  { id: 3, name: 'Payment', icon: CreditCard },
];

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    phone: '',
  });

  const shipping = 0;
  const total = cartTotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    toast.success('Order placed successfully!');
    clearCart();
    navigate('/');
  };

  if (cartItems.length === 0) {
    return (
      <Layout>
        <section className="pt-32 pb-20">
          <div className="container-luxury text-center py-20">
            <h1 className="text-4xl font-serif mb-8">Your bag is empty</h1>
            <a href="/shop" className="btn-outline inline-block">
              <span>Continue Shopping</span>
            </a>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="pt-32 pb-20">
        <div className="container-luxury">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-serif text-center mb-12"
          >
            Checkout
          </motion.h1>

          {/* Progress Steps */}
          <div className="flex justify-center mb-16">
            <div className="flex items-center gap-4 md:gap-8">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center gap-4 md:gap-8">
                  <button
                    onClick={() => setCurrentStep(step.id)}
                    className={`flex items-center gap-2 transition-colors ${
                      currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 flex items-center justify-center border transition-colors ${
                        currentStep > step.id
                          ? 'bg-foreground text-background border-foreground'
                          : currentStep === step.id
                          ? 'border-foreground'
                          : 'border-muted-foreground'
                      }`}
                    >
                      {currentStep > step.id ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <span className="text-xs">{step.id}</span>
                      )}
                    </div>
                    <span className="hidden md:block text-xs uppercase tracking-[0.15em]">
                      {step.name}
                    </span>
                  </button>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-8 md:w-16 h-px ${
                        currentStep > step.id ? 'bg-foreground' : 'bg-border'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Form */}
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              {currentStep === 1 && (
                <div>
                  <h2 className="text-xl font-serif mb-8">Contact Information</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs uppercase tracking-[0.15em] mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full border border-border px-4 py-3 text-sm focus:outline-none focus:border-foreground"
                        placeholder="your@email.com"
                      />
                    </div>

                    <h3 className="text-lg font-serif pt-4">Shipping Address</h3>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-[0.15em] mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full border border-border px-4 py-3 text-sm focus:outline-none focus:border-foreground"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-[0.15em] mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full border border-border px-4 py-3 text-sm focus:outline-none focus:border-foreground"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-[0.15em] mb-2">
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full border border-border px-4 py-3 text-sm focus:outline-none focus:border-foreground"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-[0.15em] mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full border border-border px-4 py-3 text-sm focus:outline-none focus:border-foreground"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-[0.15em] mb-2">
                          Postal Code
                        </label>
                        <input
                          type="text"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          className="w-full border border-border px-4 py-3 text-sm focus:outline-none focus:border-foreground"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-[0.15em] mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full border border-border px-4 py-3 text-sm focus:outline-none focus:border-foreground"
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div>
                  <h2 className="text-xl font-serif mb-8">Shipping Method</h2>
                  <div className="space-y-4">
                    {[
                      { name: 'Standard Shipping', time: '5-7 business days', price: 0 },
                      { name: 'Express Shipping', time: '2-3 business days', price: 25 },
                      { name: 'Next Day Delivery', time: '1 business day', price: 45 },
                    ].map((method) => (
                      <label
                        key={method.name}
                        className="flex items-center justify-between p-4 border border-border cursor-pointer hover:border-foreground transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <input
                            type="radio"
                            name="shipping"
                            className="w-4 h-4 accent-foreground"
                            defaultChecked={method.price === 0}
                          />
                          <div>
                            <p className="font-medium">{method.name}</p>
                            <p className="text-sm text-muted-foreground">{method.time}</p>
                          </div>
                        </div>
                        <span>
                          {method.price === 0 ? 'Free' : `$${method.price}`}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div>
                  <h2 className="text-xl font-serif mb-8">Payment</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs uppercase tracking-[0.15em] mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full border border-border px-4 py-3 text-sm focus:outline-none focus:border-foreground"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-[0.15em] mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full border border-border px-4 py-3 text-sm focus:outline-none focus:border-foreground"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-[0.15em] mb-2">
                          CVC
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full border border-border px-4 py-3 text-sm focus:outline-none focus:border-foreground"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-12">
                {currentStep > 1 ? (
                  <button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    ← Back
                  </button>
                ) : (
                  <div />
                )}
                <button
                  onClick={() => {
                    if (currentStep < 3) {
                      setCurrentStep(currentStep + 1);
                    } else {
                      handlePlaceOrder();
                    }
                  }}
                  className="btn-primary"
                >
                  <span>
                    {currentStep === 3 ? 'Place Order' : 'Continue'}
                  </span>
                </button>
              </div>
            </motion.div>

            {/* Order Summary */}
            <div>
              <div className="bg-muted p-8">
                <h2 className="text-lg font-serif mb-8">Order Summary</h2>

                <div className="space-y-6 mb-8">
                  {cartItems.map((item) => (
                    <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-4">
                      <div className="w-16 aspect-[3/4] bg-background">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium">{item.name}</h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          {item.color} / {item.size}
                        </p>
                        <div className="flex justify-between mt-2">
                          <span className="text-xs text-muted-foreground">
                            Qty: {item.quantity}
                          </span>
                          <span className="text-sm">${(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 py-6 border-t border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{shipping === 0 ? 'Complimentary' : `$${shipping}`}</span>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex justify-between text-lg font-medium">
                    <span>Total</span>
                    <span>${total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Checkout;
