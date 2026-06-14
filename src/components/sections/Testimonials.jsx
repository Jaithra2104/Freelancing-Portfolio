import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import { testimonials } from '../../data/testimonials';
import { FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi';

const StarRating = ({ rating }) => (
  <div className="flex gap-1 mb-3">
    {Array.from({ length: 5 }).map((_, i) => (
      <FiStar
        key={i}
        size={11}
        className={i < rating ? 'text-amber-400 fill-amber-400' : 'text-text-muted'}
        style={i < rating ? { fill: '#fbbf24' } : {}}
      />
    ))}
  </div>
);

const TestimonialCard = ({ testimonial }) => (
  <motion.div
    whileHover={{ y: -4 }}
    className="glass-card rounded-2xl p-6 border border-white/[0.05] h-full flex flex-col justify-between hover:border-white/[0.09] transition-all duration-300 relative group"
  >
    {/* Softer glow effect on hover */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none bg-[radial-gradient(circle_at_10%_10%,rgba(124,58,237,0.03)_0%,transparent_60%)]" />

    <div className="relative z-10">
      <StarRating rating={testimonial.rating} />

      {/* Quote */}
      <blockquote className="text-text-secondary text-xs leading-relaxed mb-6 relative">
        <span className="absolute -top-3.5 -left-1.5 text-4xl text-accent/15 font-serif leading-none select-none">"</span>
        <span className="relative">{testimonial.quote}</span>
      </blockquote>
    </div>

    {/* Author */}
    <div className="flex items-center gap-3 pt-4 border-t border-white/[0.04] relative z-10">
      <div className="w-9 h-9 rounded-full bg-white/[0.02] border border-white/[0.06] flex items-center justify-center text-[10px] font-mono font-bold text-text-secondary select-none flex-shrink-0">
        {testimonial.name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .slice(0, 2)}
      </div>
      <div>
        <p className="text-text-primary font-semibold text-xs">{testimonial.name}</p>
        <p className="text-text-muted text-[10px]">
          {testimonial.role} · {testimonial.company}
        </p>
      </div>
    </div>
  </motion.div>
);

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const autoRef = useRef(null);

  const total = testimonials.length;

  const next = () => setCurrent((c) => (c + 1) % total);
  const prev = () => setCurrent((c) => (c - 1 + total) % total);

  useEffect(() => {
    if (!paused) {
      autoRef.current = setInterval(next, 5000);
    }
    return () => clearInterval(autoRef.current);
  }, [paused, current]);

  // Compute visible indices (show 1 on mobile, 2 on md, 3 on lg)
  const getVisible = () => {
    return [current, (current + 1) % total, (current + 2) % total];
  };

  return (
    <section id="testimonials" className="section-padding relative overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[300px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at right bottom, rgba(79,70,229,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="container-custom relative z-10">
        <SectionHeader
          label="Endorsements"
          title={<>Client <span className="gradient-text">Feedback</span></>}
          subtitle="Simple, authentic testimonials from people I've collaborated with on tools, projects, and guides."
        />

        <div
          className="relative max-w-5xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {getVisible().map((idx, i) => (
              <motion.div
                key={`${idx}-${i}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className={i === 2 ? 'hidden lg:block' : i === 1 ? 'hidden md:block' : ''}
              >
                <TestimonialCard testimonial={testimonials[idx]} />
              </motion.div>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={prev}
              className="w-8 h-8 rounded-full glass border border-white/[0.08] flex items-center justify-center text-text-secondary hover:text-accent-light transition-all duration-200"
              aria-label="Previous testimonial"
            >
              <FiChevronLeft size={16} />
            </motion.button>

            {/* Dots */}
            <div className="flex items-center gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="transition-all duration-300"
                  aria-label={`Go to testimonial ${i + 1}`}
                >
                  <div
                    className={`rounded-full transition-all duration-300 ${
                      i === current
                        ? 'w-4 h-1.5 bg-accent'
                        : 'w-1.5 h-1.5 bg-white/10 hover:bg-white/30'
                    }`}
                  />
                </button>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={next}
              className="w-8 h-8 rounded-full glass border border-white/[0.08] flex items-center justify-center text-text-secondary hover:text-accent-light transition-all duration-200"
              aria-label="Next testimonial"
            >
              <FiChevronRight size={16} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
