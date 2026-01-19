import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProductCard from '../product/ProductCard';

const products = [
  {
    id: 1,
    name: 'Silk Midi Dress',
    price: 890,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=800&fit=crop',
    category: 'Dresses',
    isNew: true,
  },
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
    originalPrice: 980,
    image: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=600&h=800&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop',
    category: 'Blazers',
    isSale: true,
  },
  {
    id: 4,
    name: 'Leather Tote Bag',
    price: 680,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=800&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=800&fit=crop',
    category: 'Bags',
    isNew: true,
  },
  {
    id: 5,
    name: 'Pleated Maxi Skirt',
    price: 420,
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0uj?w=600&h=800&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1577900232427-18219b9166a0?w=600&h=800&fit=crop',
    category: 'Skirts',
  },
  {
    id: 6,
    name: 'Linen Relaxed Shirt',
    price: 280,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=800&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1598300056393-4aac492f4344?w=600&h=800&fit=crop',
    category: 'Shirts',
  },
  {
    id: 7,
    name: 'Merino Turtleneck',
    price: 320,
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&h=800&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=600&h=800&fit=crop',
    category: 'Knitwear',
  },
  {
    id: 8,
    name: 'Wide Leg Trousers',
    price: 380,
    originalPrice: 480,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=800&fit=crop',
    category: 'Pants',
    isSale: true,
  },
];

const ProductGrid = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section-padding bg-background" ref={ref}>
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="section-subtitle">Handpicked For You</p>
          <h2 className="section-title">New Arrivals</h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <Link to="/shop" className="btn-outline inline-block">
            <span>View All Products</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductGrid;
