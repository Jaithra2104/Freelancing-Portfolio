import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import { exploringCards } from '../../data/exploring';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const ExploreCard = ({ exp }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 180, damping: 28 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), springConfig);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      variants={cardVariants}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative glass-card rounded-2xl p-5 border border-white/[0.05] transition-colors duration-300 hover:border-white/[0.1] hover:shadow-card cursor-pointer overflow-hidden flex flex-col justify-between"
    >
      {/* Background radial spotlight */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
        style={{
          background: `radial-gradient(circle at 20% 20%, ${exp.color}08 0%, transparent 60%)`,
        }}
      />

      <div style={{ transform: 'translateZ(12px)' }}>
        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <span className="text-[10px] font-mono text-accent-light font-bold uppercase tracking-wider">
            {exp.subtitle}
          </span>
          <span
            className="px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase tracking-wider"
            style={{
              background: `${exp.color}15`,
              color: exp.color,
              border: `1px solid ${exp.color}25`,
            }}
          >
            {exp.status}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-sm text-text-primary group-hover:text-white transition-colors duration-300 mb-2">
          {exp.title}
        </h3>

        {/* Description */}
        <p className="text-text-secondary text-[11px] leading-relaxed mb-4">
          {exp.description}
        </p>
      </div>

      {/* Tech/Concept Tags */}
      <div className="flex flex-wrap gap-1 pt-3 border-t border-white/[0.04]" style={{ transform: 'translateZ(8px)' }}>
        {exp.concepts.map((concept) => (
          <span
            key={concept}
            className="px-1.5 py-0.5 text-[9px] font-mono rounded bg-white/[0.02] text-text-muted border border-white/[0.04]"
          >
            {concept}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

const Experience = () => {
  return (
    <section id="exploring" className="section-padding relative">
      <div className="container-custom">
        <SectionHeader
          label="Interests & R&D"
          title={<>What I'm <span className="gradient-text">Exploring</span></>}
          subtitle="Curiosity-driven study notes, developmental frameworks, and technological investigations outside daily code routines."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {exploringCards.map((exp) => (
            <ExploreCard key={exp.id} exp={exp} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
