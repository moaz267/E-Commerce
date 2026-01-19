import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Instagram } from 'lucide-react';

const instagramImages = [
  'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=400&fit=crop',
];

const InstagramSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section ref={ref} className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Instagram className="w-5 h-5" strokeWidth={1} />
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            @suprema
          </span>
        </div>
        <h2 className="section-title">Follow Our Journey</h2>
      </motion.div>

      <div className="grid grid-cols-3 md:grid-cols-6">
        {instagramImages.map((image, index) => (
          <motion.a
            key={index}
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative group aspect-square overflow-hidden"
          >
            <img
              src={image}
              alt={`Instagram ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors duration-300 flex items-center justify-center">
              <Instagram
                className="w-8 h-8 text-background opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                strokeWidth={1}
              />
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default InstagramSection;
