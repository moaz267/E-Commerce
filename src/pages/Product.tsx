import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Minus, Plus, Truck, RotateCcw, Shield } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/product/ProductCard';
import { useCart } from '@/contexts/CartContext';

const productsData: Record<number, {
  id: number;
  name: string;
  price: number;
  description: string;
  images: string[];
  sizes: string[];
  colors: string[];
  category: string;
  details: string[];
}> = {
  1: {
    id: 1,
    name: 'Silk Midi Dress',
    price: 890,
    description: 'An elegant silk midi dress featuring a flattering A-line silhouette. Crafted from 100% mulberry silk with a subtle sheen that catches the light beautifully. Perfect for both formal occasions and elevated everyday wear.',
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1200&fit=crop',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&h=1200&fit=crop',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=1200&fit=crop',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=1200&fit=crop',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Ivory', 'Black', 'Champagne'],
    category: 'Dresses',
    details: [
      '100% Mulberry Silk',
      'A-line silhouette',
      'Hidden back zipper',
      'Midi length',
      'Dry clean only',
      'Made in Italy',
    ],
  },
  2: {
    id: 2,
    name: 'Cashmere Overcoat',
    price: 1450,
    description: 'A luxurious cashmere overcoat that epitomizes timeless elegance. Features a relaxed fit with clean lines and impeccable tailoring.',
    images: [
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&h=1200&fit=crop',
      'https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=800&h=1200&fit=crop',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Camel', 'Black', 'Grey'],
    category: 'Outerwear',
    details: ['100% Cashmere', 'Relaxed fit', 'Two-button closure', 'Made in Italy'],
  },
  3: {
    id: 3,
    name: 'Tailored Wool Blazer',
    price: 780,
    description: 'A perfectly tailored wool blazer that transitions seamlessly from office to evening.',
    images: [
      'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=800&h=1200&fit=crop',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&h=1200&fit=crop',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Navy', 'Black', 'Charcoal'],
    category: 'Blazers',
    details: ['100% Wool', 'Slim fit', 'Single-breasted', 'Made in Italy'],
  },
  4: {
    id: 4,
    name: 'Leather Tote Bag',
    price: 680,
    description: 'A sophisticated leather tote crafted from premium Italian leather.',
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=1200&fit=crop',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&h=1200&fit=crop',
    ],
    sizes: ['One Size'],
    colors: ['Black', 'Tan', 'Burgundy'],
    category: 'Bags',
    details: ['Italian leather', 'Cotton lining', 'Interior pockets', 'Made in Italy'],
  },
};

const defaultProduct = productsData[1];

const relatedProducts = [
  {
    id: 2,
    name: 'Cashmere Overcoat',
    price: 1450,
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&h=800&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=600&h=800&fit=crop',
    category: 'Outerwear',
  },
  {
    id: 3,
    name: 'Tailored Wool Blazer',
    price: 780,
    image: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=600&h=800&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop',
    category: 'Blazers',
  },
  {
    id: 4,
    name: 'Leather Tote Bag',
    price: 680,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=800&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=800&fit=crop',
    category: 'Bags',
  },
  {
    id: 5,
    name: 'Pleated Maxi Skirt',
    price: 420,
    image: 'https://images.unsplash.com/photo-1577900232427-18219b9166a0?w=600&h=800&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1577900232427-18219b9166a0?w=600&h=800&fit=crop',
    category: 'Skirts',
  },
];

const Product = () => {
  const { id } = useParams();
  const productId = id ? parseInt(id) : 1;
  const product = productsData[productId] || defaultProduct;
  
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  const { addToCart, addToWishlist, isInWishlist } = useCart();

  const handleAddToCart = () => {
    if (!selectedSize) {
      return;
    }
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      color: selectedColor,
      image: product.images[0],
    }, quantity);
  };

  const handleAddToWishlist = () => {
    addToWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      category: product.category,
    });
  };

  const inWishlist = isInWishlist(product.id);

  return (
    <Layout>
      <section className="pt-28 pb-20">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Images - Main Image + Thumbnails */}
            <div className="space-y-4">
              {/* Main Image */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="aspect-[3/4] overflow-hidden bg-muted relative"
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImageIndex}
                    src={product.images[activeImageIndex]}
                    alt={`${product.name} ${activeImageIndex + 1}`}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>
              </motion.div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`aspect-[3/4] overflow-hidden bg-muted transition-all ${
                      activeImageIndex === index 
                        ? 'ring-2 ring-foreground' 
                        : 'ring-1 ring-border hover:ring-foreground/50'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="lg:sticky lg:top-28 lg:h-fit">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
                  {product.category}
                </p>
                <h1 className="text-3xl md:text-4xl font-serif mb-4">{product.name}</h1>
                <p className="text-xl mb-8">${product.price.toLocaleString()}</p>

                <p className="text-muted-foreground leading-relaxed mb-8">
                  {product.description}
                </p>

                {/* Color Selection */}
                <div className="mb-8">
                  <p className="text-xs uppercase tracking-[0.2em] mb-4">
                    Color: <span className="text-muted-foreground">{selectedColor}</span>
                  </p>
                  <div className="flex gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 border text-sm transition-colors ${
                          selectedColor === color
                            ? 'border-foreground'
                            : 'border-border hover:border-foreground'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Selection */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-xs uppercase tracking-[0.2em]">
                      Size {!selectedSize && <span className="text-destructive">*</span>}
                    </p>
                    <button className="text-xs text-muted-foreground underline">
                      Size Guide
                    </button>
                  </div>
                  <div className="flex gap-3">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-12 h-12 border text-sm transition-colors ${
                          selectedSize === size
                            ? 'border-foreground bg-foreground text-background'
                            : 'border-border hover:border-foreground'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity & Add to Cart */}
                <div className="flex gap-4 mb-8">
                  <div className="flex items-center border border-border">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-4 hover:bg-muted transition-colors"
                    >
                      <Minus className="w-4 h-4" strokeWidth={1} />
                    </button>
                    <span className="px-4 text-sm">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-4 hover:bg-muted transition-colors"
                    >
                      <Plus className="w-4 h-4" strokeWidth={1} />
                    </button>
                  </div>
                  <button 
                    onClick={handleAddToCart}
                    disabled={!selectedSize}
                    className={`btn-primary flex-1 ${!selectedSize ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <span>{selectedSize ? 'Add to Bag' : 'Select Size'}</span>
                  </button>
                  <button 
                    onClick={handleAddToWishlist}
                    className={`p-4 border transition-colors ${
                      inWishlist 
                        ? 'border-foreground bg-foreground text-background' 
                        : 'border-border hover:border-foreground'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} strokeWidth={1} />
                  </button>
                </div>

                {/* Features */}
                <div className="grid grid-cols-3 gap-4 py-8 border-y border-border mb-8">
                  <div className="text-center">
                    <Truck className="w-5 h-5 mx-auto mb-2" strokeWidth={1} />
                    <p className="text-xs text-muted-foreground">Free Shipping</p>
                  </div>
                  <div className="text-center">
                    <RotateCcw className="w-5 h-5 mx-auto mb-2" strokeWidth={1} />
                    <p className="text-xs text-muted-foreground">30 Day Returns</p>
                  </div>
                  <div className="text-center">
                    <Shield className="w-5 h-5 mx-auto mb-2" strokeWidth={1} />
                    <p className="text-xs text-muted-foreground">Secure Checkout</p>
                  </div>
                </div>

                {/* Tabs */}
                <div>
                  <div className="flex gap-8 border-b border-border">
                    {['description', 'details', 'reviews'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-4 text-xs uppercase tracking-[0.2em] transition-colors ${
                          activeTab === tab
                            ? 'border-b-2 border-foreground'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                  <div className="py-8">
                    {activeTab === 'description' && (
                      <p className="text-muted-foreground leading-relaxed">
                        {product.description}
                      </p>
                    )}
                    {activeTab === 'details' && (
                      <ul className="space-y-2">
                        {product.details.map((detail, index) => (
                          <li key={index} className="text-muted-foreground text-sm">
                            • {detail}
                          </li>
                        ))}
                      </ul>
                    )}
                    {activeTab === 'reviews' && (
                      <p className="text-muted-foreground">No reviews yet.</p>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="section-padding bg-muted">
        <div className="container-luxury">
          <h2 className="section-title mb-12">You May Also Like</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {relatedProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Product;
