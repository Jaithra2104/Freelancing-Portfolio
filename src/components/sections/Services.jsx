import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import { services } from '../../data/services';
import {
  FiCode, FiZap, FiLayout, FiBook, FiBarChart2, FiCpu, FiUsers, FiMonitor, FiCheck,
} from 'react-icons/fi';

const iconMap = {
  FiCode, FiZap, FiLayout, FiBook, FiBarChart2, FiCpu, FiUsers, FiMonitor,
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

const ServiceCard = ({ service }) => {
  const Icon = iconMap[service.icon] || FiCode;

  // Custom 3D Tilt values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 200, damping: 30 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), springConfig);

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
      className="relative glass-card rounded-2xl p-5 border border-white/[0.05] cursor-pointer transition-colors duration-300 hover:border-white/[0.1] hover:shadow-card group overflow-hidden flex flex-col justify-between"
    >
      {/* Dynamic background spotlight */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
        style={{
          background: `radial-gradient(circle at 15% 15%, ${service.color}07 0%, transparent 60%)`,
        }}
      />

      <div style={{ transform: 'translateZ(15px)' }}>
        {/* Header Icon + Title */}
        <div className="flex items-center gap-3.5 mb-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: `${service.color}15` }}
          >
            <Icon size={18} style={{ color: service.color }} />
          </div>
          <h3 className="font-display font-bold text-sm text-text-primary group-hover:text-white transition-colors duration-300">
            {service.title}
          </h3>
        </div>

        {/* Shortened Description */}
        <p className="text-text-secondary text-[11px] leading-relaxed mb-4">
          {service.description}
        </p>

        {/* Key bullets */}
        <div className="flex flex-wrap gap-1.5">
          {service.highlights.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/[0.02] border border-white/[0.04] text-[9px] font-mono text-text-muted"
            >
              <FiCheck size={8} style={{ color: service.color }} />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Subtle bottom edge decoration */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[1.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${service.color}, transparent)` }}
      />
    </motion.div>
  );
};

const Services = () => {
  return (
    <section id="services" className="section-padding relative">
      <div className="container-custom">
        <SectionHeader
          label="Services"
          title={<>Solutions I <span className="gradient-text">Deliver</span></>}
          subtitle="Visually clean, highly performant automation and web services tailored to client needs."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </motion.div>

        {/* Call to Action banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 rounded-2xl glass border border-white/[0.06] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <h3 className="font-display font-bold text-lg text-text-primary mb-1">
              Need a custom build?
            </h3>
            <p className="text-text-muted text-[11px] leading-relaxed max-w-xl">
              I collaborate with clients to construct automations, custom student final-year applications, and interactive web tools. Let's discuss your requirements.
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary text-xs py-3 px-6 whitespace-nowrap shadow-glow"
          >
            Get in Touch
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
