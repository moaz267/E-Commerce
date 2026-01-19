import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

// Products data for search
const searchableProducts = [
  { id: 1, name: 'Silk Midi Dress', category: 'Dresses', price: 890 },
  { id: 2, name: 'Cashmere Overcoat', category: 'Outerwear', price: 1450 },
  { id: 3, name: 'Tailored Wool Blazer', category: 'Blazers', price: 780 },
  { id: 4, name: 'Leather Tote Bag', category: 'Bags', price: 680 },
  { id: 5, name: 'Pleated Maxi Skirt', category: 'Skirts', price: 420 },
  { id: 6, name: 'Linen Relaxed Shirt', category: 'Shirts', price: 280 },
  { id: 7, name: 'Merino Turtleneck', category: 'Knitwear', price: 320 },
  { id: 8, name: 'Wide Leg Trousers', category: 'Pants', price: 380 },
  { id: 9, name: 'Structured Shoulder Bag', category: 'Bags', price: 520 },
  { id: 10, name: 'Floral Print Blouse', category: 'Tops', price: 340 },
  { id: 11, name: 'Velvet Evening Dress', category: 'Dresses', price: 1120 },
  { id: 12, name: 'Wool Blend Scarf', category: 'Accessories', price: 180 },
];

const SearchOverlay = ({ isOpen, onClose }: SearchOverlayProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<typeof searchableProducts>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
    if (!isOpen) {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Search logic
  useEffect(() => {
    if (query.trim().length > 0) {
      const searchTerm = query.toLowerCase();
      const filtered = searchableProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm) ||
          product.category.toLowerCase().includes(searchTerm)
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleProductClick = (productId: number) => {
    onClose();
    navigate(`/product/${productId}`);
  };

  const handleCategoryClick = (category: string) => {
    onClose();
    navigate(`/shop/${category.toLowerCase()}`);
  };

  const popularSearches = ['Dresses', 'Suits', 'Accessories', 'New Arrivals', 'Sale'];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[60] bg-background flex items-start justify-center pt-32 overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 hover:text-secondary transition-colors"
            aria-label="Close search"
          >
            <X className="w-6 h-6" strokeWidth={1} />
          </button>

          <div className="w-full max-w-3xl px-6 pb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-serif mb-4">Search</h2>
              <p className="text-muted-foreground text-sm">
                Find your perfect piece
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type to search..."
                className="w-full bg-transparent border-b-2 border-foreground py-4 text-2xl md:text-3xl font-light text-center focus:outline-none placeholder:text-muted-foreground"
              />
              <Search className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground" strokeWidth={1} />
            </motion.div>

            {/* Search Results */}
            {query.trim().length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-8"
              >
                {results.length > 0 ? (
                  <div className="space-y-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      {results.length} result{results.length !== 1 ? 's' : ''} found
                    </p>
                    <div className="grid gap-4">
                      {results.map((product) => (
                        <button
                          key={product.id}
                          onClick={() => handleProductClick(product.id)}
                          className="flex items-center justify-between p-4 border border-border hover:border-foreground transition-colors text-left"
                        >
                          <div>
                            <h4 className="font-medium">{product.name}</h4>
                            <p className="text-sm text-muted-foreground">{product.category}</p>
                          </div>
                          <p className="text-sm">${product.price}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground">
                    No results found for "{query}"
                  </p>
                )}
              </motion.div>
            )}

            {/* Popular Searches */}
            {query.trim().length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-12 text-center"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">
                  Popular Searches
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => handleCategoryClick(term)}
                      className="px-4 py-2 border border-border hover:border-foreground transition-colors text-sm"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;
