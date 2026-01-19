import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-muted">
        <div className="container-luxury text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-serif mb-6"
          >
            About Suprema
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Crafting timeless elegance since 1985
          </motion.p>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-serif mb-8">Our Story</h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  Founded in Milan in 1985, Suprema began as a small atelier dedicated to 
                  creating exquisite garments for discerning clients who appreciate the 
                  art of fine fashion.
                </p>
                <p>
                  Over the decades, we have grown into a global luxury brand while 
                  maintaining our commitment to exceptional craftsmanship, sustainable 
                  practices, and timeless design.
                </p>
                <p>
                  Every piece in our collection is thoughtfully designed and meticulously 
                  crafted using only the finest materials sourced from around the world.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="aspect-[4/5] overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&h=1000&fit=crop"
                alt="Suprema Atelier"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-muted">
        <div className="container-luxury">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title text-center mb-16"
          >
            Our Values
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: 'Craftsmanship',
                description: 'Every garment is crafted with meticulous attention to detail by skilled artisans.',
              },
              {
                title: 'Sustainability',
                description: 'We are committed to ethical sourcing and environmentally responsible practices.',
              },
              {
                title: 'Timelessness',
                description: 'We design pieces that transcend trends and become cherished wardrobe staples.',
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <h3 className="text-xl font-serif mb-4">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding">
        <div className="container-luxury text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title mb-8">Visit Our Flagship Store</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Experience Suprema in person at our flagship location in the heart of Milan.
            </p>
            <p className="text-sm uppercase tracking-[0.2em]">
              Via Monte Napoleone 15, 20121 Milano MI, Italy
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
