import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from 'react-icons/fi';
import { SiLeetcode } from 'react-icons/si';

const footerLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Journey', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks = [
  { icon: FiGithub, href: 'https://github.com/Jaithra2104', label: 'GitHub' },
  { icon: FiLinkedin, href: 'https://www.linkedin.com/in/jaithra-addepalli-510292334', label: 'LinkedIn' },
  { icon: SiLeetcode, href: 'https://leetcode.com/u/jaithra2106/', label: 'LeetCode' },
  { icon: FiMail, href: 'mailto:jaithraaddepalli17@gmail.com', label: 'Email' },
];

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const handleNavClick = (href) => {
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/[0.06] bg-bg-secondary">
      <div className="container-custom py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-accent-gradient flex items-center justify-center shadow-glow">
                <span className="text-white font-display font-bold text-xs">JA</span>
              </div>
              <span className="font-display font-bold text-text-primary text-lg">
                Jaithra<span className="text-accent-light">.</span>
              </span>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
              Python & full-stack developer. Building web apps, automation tools, and AI systems. Open to freelance work.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-text-primary font-semibold text-sm mb-4 uppercase tracking-wider">Navigation</p>
            <div className="grid grid-cols-2 gap-2">
              {footerLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left text-text-secondary text-sm hover:text-accent-light transition-colors duration-200"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Social + Status */}
          <div>
            <p className="text-text-primary font-semibold text-sm mb-4 uppercase tracking-wider">Connect</p>
            <div className="flex gap-3 mb-5">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  whileHover={{ y: -3, color: '#a78bfa' }}
                  className="w-9 h-9 rounded-lg glass-light flex items-center justify-center text-text-secondary hover:text-accent-light transition-colors duration-200"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 text-xs font-medium">Available for new projects</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-white/[0.06] gap-4">
          <p className="text-text-muted text-xs">
            © {new Date().getFullYear()} Jaithra Addepalli. Built with care.
          </p>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.9 }}
            className="w-9 h-9 rounded-lg glass-light flex items-center justify-center text-text-secondary hover:text-accent-light transition-all duration-200 border border-white/[0.08]"
            aria-label="Scroll to top"
          >
            <FiArrowUp size={15} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
