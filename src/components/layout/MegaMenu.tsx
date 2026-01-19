import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface MegaMenuProps {
  onClose: () => void;
}

const MegaMenu = ({ onClose }: MegaMenuProps) => {
  const categories = [
    {
      title: 'Women',
      links: [
        { name: 'Dresses', path: '/shop/dresses' },
        { name: 'Tops', path: '/shop/tops' },
        { name: 'Pants', path: '/shop/pants' },
        { name: 'Skirts', path: '/shop/skirts' },
        { name: 'Outerwear', path: '/shop/outerwear' },
        { name: 'Accessories', path: '/shop/accessories' },
      ],
    },
    {
      title: 'Men',
      links: [
        { name: 'Shirts', path: '/shop/shirts' },
        { name: 'Pants', path: '/shop/pants' },
        { name: 'Suits', path: '/shop/suits' },
        { name: 'Outerwear', path: '/shop/outerwear' },
        { name: 'Accessories', path: '/shop/accessories' },
        { name: 'Shoes', path: '/shop/shoes' },
      ],
    },
    {
      title: 'Collections',
      links: [
        { name: 'New Arrivals', path: '/shop/new-arrivals' },
        { name: 'Best Sellers', path: '/shop/best-sellers' },
        { name: 'Sale', path: '/shop/sale' },
        { name: 'Limited Edition', path: '/shop/limited-edition' },
      ],
    },
    {
      title: 'Accessories',
      links: [
        { name: 'Bags', path: '/shop/bags' },
        { name: 'Jewelry', path: '/shop/jewelry' },
        { name: 'Watches', path: '/shop/watches' },
        { name: 'Scarves', path: '/shop/scarves' },
        { name: 'Belts', path: '/shop/belts' },
      ],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="absolute top-full left-1/2 -translate-x-1/2 w-screen bg-background border-b border-border-subtle shadow-sm"
      onMouseLeave={onClose}
    >
      <div className="container-luxury py-12">
        <div className="grid grid-cols-5 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <h3 className="text-xs uppercase tracking-[0.2em] font-semibold mb-6">
                {category.title}
              </h3>
              <ul className="space-y-3">
                {category.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      onClick={onClose}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Promo Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative overflow-hidden group cursor-pointer"
          >
            <Link to="/shop/new-arrivals" onClick={onClose}>
              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=500&fit=crop"
                alt="New Collection"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-foreground/20 flex items-end p-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-background/80 mb-2">
                    New Season
                  </p>
                  <h4 className="text-xl font-serif text-background">
                    Spring Collection
                  </h4>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default MegaMenu;
