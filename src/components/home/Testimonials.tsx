import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    text: "The quality is exceptional. Every piece I've purchased has become a staple in my wardrobe. Truly timeless design.",
    author: 'Alexandra Chen',
    title: 'Fashion Editor',
  },
  {
    id: 2,
    text: "SUPREMA understands that true luxury lies in the details. The craftsmanship is unparalleled.",
    author: 'Marcus Sterling',
    title: 'Creative Director',
  },
  {
    id: 3,
    text: "I appreciate brands that prioritize quality over trends. These pieces age beautifully and never go out of style.",
    author: 'Isabella Romano',
    title: 'Art Curator',
  },
];

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section ref={ref} className="section-padding bg-muted">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <Quote className="w-12 h-12 mx-auto mb-8 text-muted-foreground/30" strokeWidth={1} />
          
          <div className="relative min-h-[200px]">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{
                  opacity: index === current ? 1 : 0,
                  x: index === current ? 0 : 50,
                }}
                transition={{ duration: 0.5 }}
                className={`${index === current ? 'block' : 'hidden'}`}
              >
                <p className="text-xl md:text-2xl font-serif leading-relaxed mb-8 italic">
                  "{testimonial.text}"
                </p>
                <div>
                  <p className="font-medium">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center gap-4 mt-10">
            <button
              onClick={prev}
              className="p-3 border border-border hover:border-foreground transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" strokeWidth={1} />
            </button>
            <button
              onClick={next}
              className="p-3 border border-border hover:border-foreground transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" strokeWidth={1} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
