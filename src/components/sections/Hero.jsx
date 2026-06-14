import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FiGithub, FiLinkedin, FiMail, FiArrowDown, FiDownload, FiZap } from 'react-icons/fi';
import { SiPython, SiReact, SiFlask, SiOpenai, SiQiskit } from 'react-icons/si';

const socialLinks = [
  { icon: FiGithub, href: 'https://github.com/Jaithra2104', label: 'GitHub' },
  { icon: FiLinkedin, href: 'https://www.linkedin.com/in/jaithra-addepalli-510292334', label: 'LinkedIn' },
  { icon: FiMail, href: 'mailto:jaithraaddepalli17@gmail.com', label: 'Email' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const Hero = () => {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Mouse Parallax values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 90, damping: 25 };
  const xSpring = useSpring(mouseX, springConfig);
  const ySpring = useSpring(mouseY, springConfig);

  // Parallax offsets for background elements
  const ring1X = useTransform(xSpring, [-600, 600], [-35, 35]);
  const ring1Y = useTransform(ySpring, [-600, 600], [-35, 35]);

  const ring2X = useTransform(xSpring, [-600, 600], [25, -25]);
  const ring2Y = useTransform(ySpring, [-600, 600], [25, -25]);

  const contentX = useTransform(xSpring, [-600, 600], [-8, 8]);
  const contentY = useTransform(ySpring, [-600, 600], [-8, 8]);

  const orbX = useTransform(xSpring, [-600, 600], [45, -45]);
  const orbY = useTransform(ySpring, [-600, 600], [45, -45]);

  // Floating badges parallax offsets
  const badgePythonX = useTransform(xSpring, [-600, 600], [-20, 20]);
  const badgePythonY = useTransform(ySpring, [-600, 600], [-20, 20]);

  const badgeReactX = useTransform(xSpring, [-600, 600], [25, -25]);
  const badgeReactY = useTransform(ySpring, [-600, 600], [-15, 15]);

  const badgeFlaskX = useTransform(xSpring, [-600, 600], [-30, 30]);
  const badgeFlaskY = useTransform(ySpring, [-600, 600], [15, -15]);

  const badgeAIX = useTransform(xSpring, [-600, 600], [30, -30]);
  const badgeAIY = useTransform(ySpring, [-600, 600], [20, -20]);

  const badgeAutoX = useTransform(xSpring, [-600, 600], [-15, 15]);
  const badgeAutoY = useTransform(ySpring, [-600, 600], [25, -25]);

  const badgeQuantumX = useTransform(xSpring, [-600, 600], [18, -18]);
  const badgeQuantumY = useTransform(ySpring, [-600, 600], [30, -30]);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    mouseX.set(clientX - centerX);
    mouseY.set(clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Mesh background gradient lighting overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_30%,rgba(99,102,241,0.06)_0%,transparent_50%),radial-gradient(circle_at_70%_80%,rgba(124,58,237,0.05)_0%,transparent_60%)] pointer-events-none" />

      {/* Subtle decorative rings - Parallax enabled */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] rounded-full pointer-events-none opacity-50 border border-white/[0.04]"
        style={{
          x: ring1X,
          y: ring1Y,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full pointer-events-none opacity-40 border border-white/[0.03]"
        style={{
          x: ring2X,
          y: ring2Y,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Floating Gradient Orb behind text */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-[380px] h-[380px] rounded-full pointer-events-none opacity-30 bg-accent/15 blur-[90px]"
        style={{
          x: orbX,
          y: orbY,
        }}
        animate={{
          scale: [1, 1.12, 1],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ================= FLOATING PREMIUM BADGES ================= */}
      {/* Python Badge */}
      <motion.div
        className="absolute left-[8%] lg:left-[12%] top-[25%] hidden md:flex w-11 h-11 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-md shadow-card hover:border-[#3776AB]/30 flex items-center justify-center text-text-secondary select-none transition-all duration-300"
        style={{ x: badgePythonX, y: badgePythonY, boxShadow: '0 0 12px rgba(55, 118, 171, 0.15)' }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <SiPython size={18} className="text-[#3776AB]" />
      </motion.div>

      {/* React Badge */}
      <motion.div
        className="absolute right-[8%] lg:right-[12%] top-[22%] hidden md:flex w-11 h-11 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-md shadow-card hover:border-[#61DAFB]/30 flex items-center justify-center text-text-secondary select-none transition-all duration-300"
        style={{ x: badgeReactX, y: badgeReactY, boxShadow: '0 0 12px rgba(97, 218, 251, 0.15)' }}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      >
        <SiReact size={18} className="text-[#61DAFB]" />
      </motion.div>

      {/* Flask Badge */}
      <motion.div
        className="absolute left-[6%] lg:left-[10%] bottom-[32%] hidden md:flex w-11 h-11 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-md shadow-card hover:border-white/20 flex items-center justify-center text-text-secondary select-none transition-all duration-300"
        style={{ x: badgeFlaskX, y: badgeFlaskY, boxShadow: '0 0 12px rgba(255, 255, 255, 0.1)' }}
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
      >
        <SiFlask size={16} className="text-white" />
      </motion.div>

      {/* AI Badge */}
      <motion.div
        className="absolute right-[6%] lg:right-[10%] bottom-[35%] hidden md:flex w-11 h-11 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-md shadow-card hover:border-emerald-400/30 flex items-center justify-center text-text-secondary select-none transition-all duration-300"
        style={{ x: badgeAIX, y: badgeAIY, boxShadow: '0 0 12px rgba(16, 185, 129, 0.15)' }}
        animate={{ y: [0, -9, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
      >
        <SiOpenai size={18} className="text-emerald-400" />
      </motion.div>

      {/* Automation Badge */}
      <motion.div
        className="absolute left-[24%] bottom-[12%] hidden lg:flex w-11 h-11 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-md shadow-card hover:border-amber-400/30 flex items-center justify-center text-text-secondary select-none transition-all duration-300"
        style={{ x: badgeAutoX, y: badgeAutoY, boxShadow: '0 0 12px rgba(245, 158, 11, 0.15)' }}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      >
        <FiZap size={18} className="text-amber-400" />
      </motion.div>

      {/* Quantum Badge */}
      <motion.div
        className="absolute right-[22%] bottom-[14%] hidden lg:flex w-11 h-11 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-md shadow-card hover:border-pink-400/30 flex items-center justify-center text-text-secondary select-none transition-all duration-300"
        style={{ x: badgeQuantumX, y: badgeQuantumY, boxShadow: '0 0 12px rgba(236, 72, 153, 0.15)' }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 1.8 }}
      >
        <SiQiskit size={18} className="text-pink-400" />
      </motion.div>

      <div className="container-custom relative z-10 pt-28 pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ x: contentX, y: contentY }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Availability badge */}
          <motion.div variants={itemVariants} className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-white/[0.06] shadow-inner text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
              <span className="text-text-secondary text-[11px] font-mono tracking-wider uppercase">
                Open to freelance projects
              </span>
            </div>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className="font-display font-bold leading-[1.1] tracking-tight mb-5"
          >
            <span className="block text-3xl sm:text-5xl lg:text-6xl text-text-primary/95 mb-2 font-light">
              Hi, I'm
            </span>
            <span className="block text-5xl sm:text-7xl lg:text-8xl gradient-text glow-text font-black">
              Jaithra Addepalli
            </span>
          </motion.h1>

          {/* Typing role */}
          <motion.div
            variants={itemVariants}
            className="mb-6 h-10 md:h-12 flex items-center justify-center"
          >
            <TypeAnimation
              sequence={[
                'Python Developer.',
                1800,
                'Flask Developer.',
                1800,
                'Full Stack Developer.',
                1800,
                'AI Tools Builder.',
                1800,
              ]}
              wrapper="span"
              speed={55}
              repeat={Infinity}
              className="text-xl md:text-2xl text-accent-light font-mono font-semibold tracking-tight"
            />
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-text-secondary/80 text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-6"
          >
            I build intelligent web applications, automation tools, AI-powered systems,
            and modern digital experiences — from idea to working product.
          </motion.p>

          {/* Currently Building Status indicator */}
          <motion.div 
            variants={itemVariants} 
            className="flex justify-center mb-10"
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/[0.02] border border-white/[0.05] text-[11px] md:text-xs text-text-muted font-mono max-w-md shadow-card">
              <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0 animate-ping" />
              <span className="text-left leading-normal">
                Currently building: AI tools, automation systems, and modern web experiences.
              </span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            {/* Primary button with shine effect */}
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={scrollToProjects}
              className="btn-primary text-sm px-8 py-3.5 relative overflow-hidden group shadow-glow"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shine" />
              <span>View My Work</span>
            </motion.button>

            {/* Secondary button with border lift */}
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={scrollToContact}
              className="btn-secondary text-sm px-8 py-3.5 border-white/[0.08] hover:border-accent/40"
            >
              <span>Hire Me</span>
            </motion.button>

            {/* Resume button */}
            <motion.a
              href="/resume.pdf"
              whileHover={{ scale: 1.04, x: 2 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 text-text-secondary hover:text-accent-light text-sm font-medium transition-colors duration-300 px-3 py-2"
            >
              <FiDownload size={14} />
              Resume
            </motion.a>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-4"
          >
            {socialLinks.map(({ icon: Icon, href, label }, i) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.08 }}
                whileHover={{ y: -4, scale: 1.05 }}
                whileTap={{ scale: 0.92 }}
                className="w-11 h-11 rounded-xl glass border border-white/[0.06] hover:border-accent/30 flex items-center justify-center text-text-secondary hover:text-accent-light transition-all duration-300"
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer"
          onClick={scrollToProjects}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <FiArrowDown size={16} className="text-text-muted hover:text-accent-light transition-colors duration-200" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
