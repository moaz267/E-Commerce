import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  hoverImage: string;
  category: string;
  isNew?: boolean;
  isSale?: boolean;
}

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart, addToWishlist, isInWishlist } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      size: 'M',
      color: 'Default',
      image: product.image,
    });
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });
  };

  const inWishlist = isInWishlist(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.id}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-muted mb-4">
          {/* Primary Image */}
          <img
            src={product.image}
            alt={product.name}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              isHovered ? 'opacity-0' : 'opacity-100'
            }`}
          />
          {/* Hover Image */}
          <img
            src={product.hoverImage}
            alt={product.name}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.isNew && (
              <span className="px-3 py-1 bg-foreground text-background text-[10px] uppercase tracking-[0.15em]">
                New
              </span>
            )}
            {product.isSale && (
              <span className="px-3 py-1 bg-destructive text-background text-[10px] uppercase tracking-[0.15em]">
                Sale
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-4 left-4 right-4 flex justify-center gap-2"
          >
            <button
              className={`p-3 transition-colors ${
                inWishlist 
                  ? 'bg-foreground text-background' 
                  : 'bg-background hover:bg-foreground hover:text-background'
              }`}
              aria-label="Add to wishlist"
              onClick={handleAddToWishlist}
            >
              <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} strokeWidth={1.5} />
            </button>
            <button
              className="px-6 py-3 bg-background hover:bg-foreground hover:text-background transition-colors text-xs uppercase tracking-[0.1em] font-medium"
              onClick={handleAddToCart}
            >
              Add to Bag
            </button>
            <Link
              to={`/product/${product.id}`}
              className="p-3 bg-background hover:bg-foreground hover:text-background transition-colors"
              aria-label="Quick view"
              onClick={(e) => e.stopPropagation()}
            >
              <Eye className="w-4 h-4" strokeWidth={1.5} />
            </Link>
          </motion.div>
        </div>

        {/* Product Info */}
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
            {product.category}
          </p>
          <h3 className="text-sm font-medium mb-2 group-hover:text-secondary transition-colors">
            {product.name}
          </h3>
          <div className="flex justify-center items-center gap-3">
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
            <span className={`text-sm ${product.isSale ? 'text-destructive' : ''}`}>
              ${product.price.toLocaleString()}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
