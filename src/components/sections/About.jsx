import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { FiCode, FiUsers, FiPackage, FiCpu, FiCheck } from 'react-icons/fi';

const stats = [
  { icon: FiCode, value: '10+', label: 'Projects Built', color: '#7c3aed' },
  { icon: FiCpu, value: '3+', label: 'AI Tools Created', color: '#4f46e5' },
  { icon: FiUsers, value: '15+', label: 'Students Helped', color: '#2563eb' },
  { icon: FiPackage, value: '4+', label: 'Tech Stacks', color: '#7c3aed' },
];

const highlights = [
  "Clean, production-ready Flask backends & React frontends",
  "Tailored AI assistant integrations & custom automation script work",
  "CS/IT student project guidance with fully explained codebases",
  "Professional project execution with transparent daily progress updates"
];

const About = () => {
  // 3D Photo tilt mouse tracking
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 25 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), springConfig);

  // Parallax layers for image details
  const glowX = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), springConfig);
  const glowY = useSpring(useTransform(y, [-0.5, 0.5], [-15, 15]), springConfig);

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
    <section id="about" className="section-padding relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 lg:items-stretch items-center">

          {/* Left Side — Developer Photo (Takes 5 cols on lg) */}
          <div className="lg:col-span-5 flex justify-center lg:items-stretch">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[380px] lg:max-w-full lg:h-full aspect-[4/5] lg:aspect-auto cursor-pointer flex flex-col"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Outer floating shadow glow */}
              <motion.div
                className="absolute inset-0 rounded-[2.5rem] -z-10"
                style={{
                  background: 'radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 75%)',
                  filter: 'blur(35px)',
                  x: glowX,
                  y: glowY,
                }}
              />

              {/* 3D Rotated Card */}
              <motion.div
                className="w-full h-full relative rounded-[2.5rem] border border-white/[0.08] p-3 glass-card overflow-hidden select-none flex flex-col justify-between"
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: 'preserve-3d',
                }}
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                {/* Photo frame */}
                <div 
                  className="relative w-full h-[85%] rounded-[2rem] overflow-hidden border border-white/[0.06] bg-bg-card"
                  style={{ transform: 'translateZ(10px)' }}
                >
                  <img
                    src="/jaithra_profile.jpg"
                    alt="Jaithra Addepalli — Python & Full Stack Developer"
                    className="w-full h-full object-cover object-center pointer-events-none"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/90 via-transparent to-transparent" />
                </div>

                {/* Info badge at the bottom of the card */}
                <div 
                  className="flex items-center gap-3 px-3 py-1 mb-1.5"
                  style={{ transform: 'translateZ(20px)' }}
                >
                  <div className="w-8 h-8 rounded-full bg-accent-gradient flex items-center justify-center text-white font-bold text-xs flex-shrink-0 shadow-glow">
                    JA
                  </div>
                  <div>
                    <p className="text-text-primary font-bold text-xs leading-none">Jaithra Addepalli</p>
                    <p className="text-text-secondary text-[10px] mt-0.5">Python & Full Stack</p>
                  </div>
                  <div className="ml-auto flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-emerald-400 text-[9px] font-semibold uppercase tracking-wider">Available</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Side — Content (Takes 7 cols on lg) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-6 h-px bg-accent" />
                <span className="text-accent-light text-xs font-semibold uppercase tracking-[0.2em] font-mono">
                  About Me
                </span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary leading-[1.2] mb-6">
                I build things that{' '}
                <span className="gradient-text">actually work.</span>
              </h2>
            </div>

            <div className="space-y-4 text-text-secondary text-[0.98rem] leading-relaxed mb-6">
              <p>
                I'm Jaithra — a Python and full-stack developer who got into coding to build things that solve real-world problems. My first serious tool was a rank-based college predictor for engineering students, which taught me more about database systems and user experience than any textbook ever could.
              </p>
              <p>
                Since then, I've focused on creating Flask backends, dynamic React frontends, and practical AI integrations or automation tools. I believe technology is best learned by building and sharing, which is why I enjoy mentoring students in Python, DSA, and emerging technologies through beginner-friendly workshops and demo sessions.
              </p>
              <p>
                Lately, I've also been exploring quantum computing concepts and developer frameworks, with the goal of hosting beginner-friendly introductory quantum workshops.
              </p>
            </div>

            {/* Highlights bullet points */}
            <div className="mb-8 space-y-2.5">
              {highlights.map((h, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <span className="w-5 h-5 rounded-full flex items-center justify-center bg-accent/10 border border-accent/20 flex-shrink-0 mt-0.5">
                    <FiCheck size={11} className="text-accent-light" />
                  </span>
                  <span className="text-text-secondary text-sm">{h}</span>
                </motion.div>
              ))}
            </div>

            {/* Current stack */}
            <div className="flex flex-wrap gap-1.5 mb-8">
              {['Python', 'Flask', 'React', 'MySQL', 'Tailwind CSS', 'n8n'].map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono font-medium text-accent-light bg-accent/8 border border-accent/15"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map(({ icon: Icon, value, label, color }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.05 * i }}
                  whileHover={{ y: -3, scale: 1.02 }}
                  className="glass-card rounded-2xl p-4 border border-white/[0.06] transition-all duration-300 cursor-default hover:border-white/[0.12]"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                    style={{ background: `${color}15` }}
                  >
                    <Icon size={15} style={{ color }} />
                  </div>
                  <p className="font-display font-bold text-xl text-text-primary leading-none mb-1">
                    {value}
                  </p>
                  <p className="text-text-secondary text-[11px] leading-tight font-medium">{label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
