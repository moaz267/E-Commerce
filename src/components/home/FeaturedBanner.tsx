import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';

const FeaturedBanner = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative h-[80vh] overflow-hidden">
      <motion.div
        initial={{ scale: 1.1 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 1.5 }}
        className="absolute inset-0"
      >
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop"
          alt="Featured Collection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/30" />
      </motion.div>

      <div className="relative h-full flex items-center">
        <div className="container-luxury">
          <div className="max-w-xl">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xs uppercase tracking-[0.4em] text-background/80 mb-6"
            >
              Exclusive Collection
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-4xl md:text-5xl lg:text-6xl font-serif text-background mb-6 leading-tight"
            >
              The Art of
              <br />
              <em>Understated</em>
              <br />
              Luxury
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-background/80 mb-10 font-light leading-relaxed"
            >
              Discover pieces that transcend seasons. Meticulously crafted, 
              endlessly wearable, and designed to become the foundation of 
              your personal style.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Link
                to="/shop/collections"
                className="inline-block border border-background text-background px-10 py-4 text-xs uppercase tracking-[0.2em] font-medium hover:bg-background hover:text-foreground transition-all duration-500"
              >
                Explore Collection
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBanner;
