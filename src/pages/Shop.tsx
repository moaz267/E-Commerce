import { useState, useRef, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { SlidersHorizontal, ChevronDown, X, Check } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/product/ProductCard';

const allProducts = [
  {
    id: 1,
    name: 'Silk Midi Dress',
    price: 890,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=800&fit=crop',
    category: 'Dresses',
    color: 'Black',
    isNew: true,
  },
  {
    id: 2,
    name: 'Cashmere Overcoat',
    price: 1450,
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&h=800&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=600&h=800&fit=crop',
    category: 'Outerwear',
    color: 'Camel',
  },
  {
    id: 3,
    name: 'Tailored Wool Blazer',
    price: 780,
    originalPrice: 980,
    image: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=600&h=800&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop',
    category: 'Blazers',
    color: 'Navy',
    isSale: true,
  },
  {
    id: 4,
    name: 'Leather Tote Bag',
    price: 680,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=800&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=800&fit=crop',
    category: 'Bags',
    color: 'Black',
    isNew: true,
  },
  {
    id: 5,
    name: 'Pleated Maxi Skirt',
    price: 420,
    image: 'https://images.unsplash.com/photo-1577900232427-18219b9166a0?w=600&h=800&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1577900232427-18219b9166a0?w=600&h=800&fit=crop',
    category: 'Skirts',
    color: 'White',
  },
  {
    id: 6,
    name: 'Linen Relaxed Shirt',
    price: 280,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=800&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1598300056393-4aac492f4344?w=600&h=800&fit=crop',
    category: 'Shirts',
    color: 'White',
  },
  {
    id: 7,
    name: 'Merino Turtleneck',
    price: 320,
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&h=800&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=600&h=800&fit=crop',
    category: 'Knitwear',
    color: 'Camel',
  },
  {
    id: 8,
    name: 'Wide Leg Trousers',
    price: 380,
    originalPrice: 480,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=800&fit=crop',
    category: 'Pants',
    color: 'Black',
    isSale: true,
  },
  {
    id: 9,
    name: 'Structured Shoulder Bag',
    price: 520,
    image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&h=800&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=800&fit=crop',
    category: 'Bags',
    color: 'Burgundy',
  },
  {
    id: 10,
    name: 'Floral Print Blouse',
    price: 340,
    image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&h=800&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=800&fit=crop',
    category: 'Tops',
    color: 'White',
    isNew: true,
  },
  {
    id: 11,
    name: 'Velvet Evening Dress',
    price: 1120,
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&h=800&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop',
    category: 'Dresses',
    color: 'Burgundy',
  },
  {
    id: 12,
    name: 'Wool Blend Scarf',
    price: 180,
    image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=600&h=800&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&h=800&fit=crop',
    category: 'Accessories',
    color: 'Camel',
  },
];

const categories = ['All', 'Dresses', 'Outerwear', 'Blazers', 'Bags', 'Skirts', 'Shirts', 'Knitwear', 'Pants', 'Tops', 'Accessories'];
const colors = [
  { name: 'Black', value: '#1b1b1b' },
  { name: 'White', value: '#ffffff' },
  { name: 'Camel', value: '#c19a6b' },
  { name: 'Navy', value: '#1e3a5f' },
  { name: 'Burgundy', value: '#722f37' },
];

type SortOption = 'featured' | 'price-low' | 'price-high' | 'newest';

const Shop = () => {
  const { category: urlCategory } = useParams();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [expandedFilters, setExpandedFilters] = useState<string[]>(['category', 'price', 'color']);

  // Sync URL category with state
  const effectiveCategory = urlCategory 
    ? categories.find(c => c.toLowerCase() === urlCategory.toLowerCase()) || 'All'
    : selectedCategory;

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let products = allProducts;

    // Filter by category
    if (effectiveCategory !== 'All') {
      products = products.filter(p => p.category.toLowerCase() === effectiveCategory.toLowerCase());
    }

    // Filter by color
    if (selectedColor) {
      products = products.filter(p => p.color === selectedColor);
    }

    // Filter by price range
    products = products.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sort
    switch (sortBy) {
      case 'price-low':
        products = [...products].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        products = [...products].sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        products = [...products].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        // featured - keep original order
        break;
    }

    return products;
  }, [effectiveCategory, selectedColor, priceRange, sortBy]);

  const toggleFilter = (filter: string) => {
    setExpandedFilters(prev => 
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    );
  };

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest' },
  ];

  const pageTitle = urlCategory 
    ? urlCategory.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    : 'Shop All';

  return (
    <Layout>
      {/* Hero Banner */}
      <section className="pt-32 pb-16 bg-muted">
        <div className="container-luxury text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-serif mb-4"
          >
            {pageTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-muted-foreground"
          >
            Discover our curated collection of timeless pieces
          </motion.p>
        </div>
      </section>

      <section ref={ref} className="section-padding">
        <div className="container-luxury">
          <div className="flex gap-12">
            {/* Sidebar - Desktop */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24">
                {/* Category Filter */}
                <div className="border-b border-border pb-6 mb-6">
                  <button
                    onClick={() => toggleFilter('category')}
                    className="flex items-center justify-between w-full text-left mb-4"
                  >
                    <span className="text-xs uppercase tracking-[0.2em] font-semibold">
                      Category
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        expandedFilters.includes('category') ? 'rotate-180' : ''
                      }`}
                      strokeWidth={1}
                    />
                  </button>
                  {expandedFilters.includes('category') && (
                    <div className="space-y-3">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`block text-sm transition-colors ${
                            (urlCategory ? effectiveCategory : selectedCategory) === category
                              ? 'text-foreground font-medium'
                              : 'text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Price Filter */}
                <div className="border-b border-border pb-6 mb-6">
                  <button
                    onClick={() => toggleFilter('price')}
                    className="flex items-center justify-between w-full text-left mb-4"
                  >
                    <span className="text-xs uppercase tracking-[0.2em] font-semibold">
                      Price Range
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        expandedFilters.includes('price') ? 'rotate-180' : ''
                      }`}
                      strokeWidth={1}
                    />
                  </button>
                  {expandedFilters.includes('price') && (
                    <div>
                      <input
                        type="range"
                        min="0"
                        max="2000"
                        step="50"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                        className="w-full h-1 bg-border rounded-lg appearance-none cursor-pointer accent-foreground"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground mt-2">
                        <span>$0</span>
                        <span>${priceRange[1].toLocaleString()}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Color Filter */}
                <div className="border-b border-border pb-6 mb-6">
                  <button
                    onClick={() => toggleFilter('color')}
                    className="flex items-center justify-between w-full text-left mb-4"
                  >
                    <span className="text-xs uppercase tracking-[0.2em] font-semibold">
                      Color
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        expandedFilters.includes('color') ? 'rotate-180' : ''
                      }`}
                      strokeWidth={1}
                    />
                  </button>
                  {expandedFilters.includes('color') && (
                    <div className="flex flex-wrap gap-3">
                      {colors.map((color) => (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColor(selectedColor === color.name ? null : color.name)}
                          className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${
                            selectedColor === color.name 
                              ? 'ring-2 ring-offset-2 ring-foreground border-foreground' 
                              : 'border-border hover:border-foreground'
                          }`}
                          style={{ backgroundColor: color.value }}
                          title={color.name}
                        >
                          {selectedColor === color.name && (
                            <Check className={`w-4 h-4 ${color.name === 'White' ? 'text-foreground' : 'text-background'}`} strokeWidth={2} />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Clear Filters */}
                {(selectedColor || priceRange[1] < 2000 || selectedCategory !== 'All') && (
                  <button
                    onClick={() => {
                      setSelectedCategory('All');
                      setSelectedColor(null);
                      setPriceRange([0, 2000]);
                    }}
                    className="text-sm text-muted-foreground hover:text-foreground underline"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-border">
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="lg:hidden flex items-center gap-2 text-sm"
                >
                  <SlidersHorizontal className="w-4 h-4" strokeWidth={1} />
                  Filters
                </button>
                <p className="text-sm text-muted-foreground">
                  Showing {filteredProducts.length} products
                </p>
                
                {/* Custom Sort Dropdown */}
                <div className="relative">
                  <button 
                    onClick={() => setIsSortOpen(!isSortOpen)}
                    className="flex items-center gap-2 text-sm border border-border px-4 py-2 hover:border-foreground transition-colors bg-background"
                  >
                    <span>Sort by: {sortOptions.find(o => o.value === sortBy)?.label}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} strokeWidth={1} />
                  </button>
                  
                  {isSortOpen && (
                    <>
                      <div 
                        className="fixed inset-0 z-10" 
                        onClick={() => setIsSortOpen(false)} 
                      />
                      <div className="absolute right-0 top-full mt-1 bg-background border border-border shadow-lg z-20 min-w-[200px]">
                        {sortOptions.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => {
                              setSortBy(option.value);
                              setIsSortOpen(false);
                            }}
                            className={`block w-full text-left px-4 py-3 text-sm hover:bg-muted transition-colors ${
                              sortBy === option.value ? 'font-medium' : 'text-muted-foreground'
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>

              {/* No Results */}
              {filteredProducts.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-muted-foreground mb-4">No products found matching your criteria.</p>
                  <button
                    onClick={() => {
                      setSelectedCategory('All');
                      setSelectedColor(null);
                      setPriceRange([0, 2000]);
                    }}
                    className="text-sm underline hover:text-foreground"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Filter Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            className="absolute left-0 top-0 bottom-0 w-80 bg-background p-6 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-8">
              <span className="text-lg font-serif">Filters</span>
              <button onClick={() => setIsSidebarOpen(false)}>
                <X className="w-5 h-5" strokeWidth={1} />
              </button>
            </div>

            {/* Categories */}
            <div className="mb-8">
              <p className="text-xs uppercase tracking-[0.2em] font-semibold mb-4">Category</p>
              <div className="space-y-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                    }}
                    className={`block text-sm ${
                      selectedCategory === category ? 'font-medium' : 'text-muted-foreground'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="mb-8">
              <p className="text-xs uppercase tracking-[0.2em] font-semibold mb-4">Price Range</p>
              <input
                type="range"
                min="0"
                max="2000"
                step="50"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                className="w-full h-1 bg-border rounded-lg appearance-none cursor-pointer accent-foreground"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>$0</span>
                <span>${priceRange[1].toLocaleString()}</span>
              </div>
            </div>

            {/* Colors */}
            <div className="mb-8">
              <p className="text-xs uppercase tracking-[0.2em] font-semibold mb-4">Color</p>
              <div className="flex flex-wrap gap-3">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(selectedColor === color.name ? null : color.name)}
                    className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${
                      selectedColor === color.name 
                        ? 'ring-2 ring-offset-2 ring-foreground border-foreground' 
                        : 'border-border hover:border-foreground'
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  >
                    {selectedColor === color.name && (
                      <Check className={`w-4 h-4 ${color.name === 'White' ? 'text-foreground' : 'text-background'}`} strokeWidth={2} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Apply Button */}
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="btn-primary w-full"
            >
              <span>Apply Filters</span>
            </button>
          </motion.div>
        </div>
      )}
    </Layout>
  );
};

export default Shop;
