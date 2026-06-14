import { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { FiGithub, FiExternalLink, FiArrowRight, FiX, FiCheckCircle } from 'react-icons/fi';
import SectionHeader from '../ui/SectionHeader';
import { projects } from '../../data/projects';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

// Compact project card with 3D Tilt and Mouse Spotlight Glow
const ProjectCard = ({ project, onSelect }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 180, damping: 28 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), springConfig);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseRelativeX = e.clientX - rect.left - width / 2;
    const mouseRelativeY = e.clientY - rect.top - height / 2;
    
    x.set(mouseRelativeX / width);
    y.set(mouseRelativeY / height);
    
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseEnter = () => setIsHovered(true);
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.article
      variants={cardVariants}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ y: -8 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(project)}
      className="group relative glass-card rounded-2xl border border-white/[0.06] overflow-hidden cursor-pointer transition-all duration-300 hover:border-white/[0.12] hover:shadow-card-hover"
    >
      {/* Spotlight Border Glow */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none z-10 opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(200px circle at ${mousePos.x}px ${mousePos.y}px, ${project.color}18, transparent 80%)`,
          }}
        />
      )}

      {/* Image Container */}
      <div className="relative h-48 overflow-hidden" style={{ transform: 'translateZ(10px)' }}>
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-bg-card/25 to-transparent" />

        {/* Status indicator */}
        <div
          className="absolute top-3.5 left-3.5 px-2 py-0.5 rounded-md text-[9px] font-mono font-bold tracking-wider uppercase"
          style={{ 
            background: `${project.color}18`, 
            color: project.color, 
            border: `1px solid ${project.color}25` 
          }}
        >
          {project.status}
        </div>

        {/* Tech Count */}
        <div className="absolute top-3.5 right-3.5 px-2 py-0.5 rounded bg-black/60 border border-white/[0.05] text-[9px] font-mono text-text-muted">
          {project.tags.length} Techs
        </div>
      </div>

      {/* Content */}
      <div className="p-5" style={{ transform: 'translateZ(15px)' }}>
        {/* Project Mini Metrics */}
        <div className="flex items-center gap-1.5 text-[9px] font-mono font-semibold tracking-wider text-text-muted mb-2 uppercase">
          <span>{project.timeline}</span>
          <span>•</span>
          <span>{project.category}</span>
        </div>

        <h3 className="font-display font-bold text-base text-text-primary mb-1.5 leading-snug group-hover:text-white transition-colors duration-300">
          {project.title}
        </h3>

        <p className="text-text-muted text-[11px] mb-4 font-medium line-clamp-2 leading-relaxed">
          {project.tagline}
        </p>

        {/* Tags with micro hover effect */}
        <div className="flex flex-wrap gap-1 mb-4">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded text-[9px] font-mono text-text-secondary bg-white/[0.03] border border-white/[0.06]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-white/[0.05]" style={{ transform: 'translateZ(5px)' }}>
          <span className="text-[10px] font-mono text-text-muted" style={{ color: `${project.color}bf` }}>
            {project.metrics}
          </span>
          <span className="text-[11px] text-text-secondary group-hover:text-accent-light transition-colors duration-300 flex items-center gap-1">
            Explore Details
            <FiArrowRight size={11} className="group-hover:translate-x-1 transition-transform duration-300" />
          </span>
        </div>
      </div>
    </motion.article>
  );
};

// Expanded Case Study Modal with gallery and stats details
const CaseStudyPanel = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-bg-primary/85 backdrop-blur-md" />

        {/* Panel */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.96 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="relative glass-card rounded-2xl border border-white/[0.08] w-full max-w-2xl max-h-[90vh] md:max-h-[85vh] overflow-y-auto shadow-card-hover z-[210]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header image banner */}
          <div className="relative h-48 sm:h-56 overflow-hidden rounded-t-2xl">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-bg-card/40 to-transparent" />
            
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-2.5 py-1 rounded bg-black/60 border border-white/[0.08] text-[9px] font-mono text-text-secondary uppercase">
                {project.type}
              </span>
              <span 
                className="px-2.5 py-1 rounded text-[9px] font-mono font-bold uppercase"
                style={{ background: `${project.color}25`, color: project.color, border: `1px solid ${project.color}35` }}
              >
                {project.status}
              </span>
            </div>

            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-lg glass flex items-center justify-center text-text-secondary hover:text-text-primary border border-white/[0.1] transition-colors duration-200"
              aria-label="Close"
            >
              <FiX size={15} />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div>
                <h2 className="font-display font-bold text-2xl text-text-primary mb-1">
                  {project.title}
                </h2>
                <p className="text-text-secondary text-xs">{project.tagline}</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono text-accent-light font-bold block">{project.metrics}</span>
                <span className="text-[10px] text-text-muted font-mono uppercase">{project.timeline}</span>
              </div>
            </div>

            {/* Problem & Solution block */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="rounded-xl p-4 border border-white/[0.06] bg-white/[0.01]">
                <p className="text-[9px] uppercase tracking-wider font-bold text-text-muted mb-2 font-mono">The Problem</p>
                <p className="text-text-secondary text-[11px] leading-relaxed">{project.problem}</p>
              </div>
              <div
                className="rounded-xl p-4 border"
                style={{ background: `${project.color}05`, borderColor: `${project.color}15` }}
              >
                <p className="text-[9px] uppercase tracking-wider font-bold mb-2 font-mono" style={{ color: project.color }}>The Solution</p>
                <p className="text-text-secondary text-[11px] leading-relaxed">{project.solution}</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-text-secondary text-xs leading-relaxed mb-6">
              {project.description}
            </p>

            {/* Features */}
            <div className="mb-6 bg-white/[0.01] border border-white/[0.04] p-5 rounded-xl">
              <p className="text-text-primary font-bold text-xs uppercase tracking-wider font-mono mb-3">Key Features</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[11px] text-text-secondary">
                    <FiCheckCircle size={13} className="mt-0.5 flex-shrink-0" style={{ color: project.color }} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Project Video Demo */}
            {project.video && (
              <div className="mb-6">
                <p className="text-text-primary font-bold text-xs uppercase tracking-wider font-mono mb-3">Project Video / Website Demo</p>
                <div className="relative rounded-xl overflow-hidden border border-white/[0.08] bg-bg-card shadow-inner w-full min-h-[220px] flex items-center justify-center group">
                  <video
                    src={project.video}
                    controls
                    playsInline
                    className="w-full h-auto max-h-[480px] object-contain z-10"
                    poster={project.image}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      const parent = e.target.parentElement;
                      const placeholder = parent.querySelector('.video-placeholder');
                      if (placeholder) {
                        placeholder.style.display = 'flex';
                      }
                    }}
                  />
                  <div className="video-placeholder absolute inset-0 hidden flex-col items-center justify-center p-4 text-center bg-black/60 z-0 select-none">
                    <div className="w-12 h-12 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center text-accent-light mb-3">
                      <FiExternalLink size={20} className="animate-pulse" />
                    </div>
                    <p className="text-text-primary font-semibold text-xs mb-1">Demo Video Placeholder</p>
                    <p className="text-text-muted text-[10px] max-w-[280px]">
                      Place your demo video file at: <code className="text-accent-light">{project.video}</code>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Additional Project Screenshots Gallery */}
            {project.screenshots && project.screenshots.length > 0 && (
              <div className="mb-6">
                <p className="text-text-primary font-bold text-xs uppercase tracking-wider font-mono mb-3">Implementation Views</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.screenshots.map((shot, idx) => (
                    <div key={idx} className="relative rounded-lg overflow-hidden h-32 border border-white/[0.06] bg-bg-card group">
                      <img
                        src={shot}
                        alt="Project screenshot"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          const parent = e.target.parentElement;
                          const fallback = parent.querySelector('.img-placeholder');
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                      <div className="img-placeholder absolute inset-0 hidden flex-col items-center justify-center p-2 text-center bg-black/50 font-mono text-[9px] text-text-muted select-none">
                        <span>View {idx + 1} Placeholder</span>
                        <span className="text-[8px] text-accent-light mt-1">{shot}</span>
                      </div>
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-[9px] font-mono uppercase bg-black/60 px-2 py-1 rounded text-text-secondary">
                          View {idx + 1}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech stack tags */}
            <div className="mb-6">
              <p className="text-text-primary font-bold text-xs uppercase tracking-wider font-mono mb-2.5">Tech stack</p>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded text-[10px] font-mono text-text-secondary bg-white/[0.04] border border-white/[0.06]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Links and Actions */}
            <div className="flex flex-wrap gap-3 pt-5 border-t border-white/[0.05]">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary text-[11px] py-2 px-4 flex items-center gap-1.5"
                >
                  <FiGithub size={13} />
                  Source Code
                </a>
              )}
              {project.live ? (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary text-[11px] py-2 px-4 flex items-center gap-1.5"
                >
                  <FiExternalLink size={13} />
                  Live Demo
                </a>
              ) : (
                <span className="text-[10px] text-text-muted flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/[0.01] border border-white/[0.04] font-mono">
                  🔒 Local Prototype / Private Repository
                </span>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Projects = () => {
  const [selected, setSelected] = useState(null);

  return (
    <section id="projects" className="section-padding relative">
      <div className="container-custom">
        <SectionHeader
          label="My Showcase"
          title={<>Featured <span className="gradient-text">Projects</span></>}
          subtitle="A handpicked collection of automation tools, web systems, and AI modules, built with clean coding architecture."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onSelect={setSelected} />
          ))}
        </motion.div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://github.com/Jaithra2104"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="btn-secondary inline-flex text-sm border-white/[0.08]"
          >
            <FiGithub size={15} />
            <span>See all projects on GitHub</span>
          </motion.a>
        </motion.div>
      </div>

      {/* Case Study Modal Panel */}
      <AnimatePresence>
        {selected && (
          <CaseStudyPanel project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
