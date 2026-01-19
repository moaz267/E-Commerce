import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface Collection {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  link: string;
}

const collections: Collection[] = [
  {
    id: 1,
    title: 'Women',
    subtitle: 'Explore Collection',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&h=1000&fit=crop',
    link: '/shop/women',
  },
  {
    id: 2,
    title: 'Men',
    subtitle: 'Explore Collection',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop',
    link: '/shop/men',
  },
  {
    id: 3,
    title: 'Accessories',
    subtitle: 'Explore Collection',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=1000&fit=crop',
    link: '/shop/accessories',
  },
];

const CollectionBanners = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section-padding" ref={ref}>
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="section-subtitle">Curated For You</p>
          <h2 className="section-title">Shop By Category</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.15 }}
            >
              <Link to={collection.link} className="block group relative overflow-hidden">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={collection.image}
                    alt={collection.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent flex items-end p-8">
                  <div className="text-background">
                    <h3 className="text-3xl font-serif mb-2">{collection.title}</h3>
                    <p className="text-xs uppercase tracking-[0.2em] text-background/80 link-hover inline-block">
                      {collection.subtitle}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionBanners;
