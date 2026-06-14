import { motion } from 'framer-motion';

const SectionHeader = ({ label, title, subtitle, centered = true }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`mb-14 ${centered ? 'text-center' : ''}`}
    >
      {/* Label */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={`inline-flex items-center gap-2 mb-4 ${centered ? 'justify-center' : ''}`}
      >
        <span className="w-6 h-px bg-accent" />
        <span className="text-accent-light text-xs font-semibold uppercase tracking-[0.2em] font-mono">
          {label}
        </span>
        <span className="w-6 h-px bg-accent" />
      </motion.div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="font-display text-4xl md:text-5xl font-bold text-text-primary leading-[1.15] mb-4"
      >
        {title}
      </motion.h2>

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={`text-text-secondary text-lg leading-relaxed ${centered ? 'max-w-2xl mx-auto' : 'max-w-xl'}`}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};

export default SectionHeader;
