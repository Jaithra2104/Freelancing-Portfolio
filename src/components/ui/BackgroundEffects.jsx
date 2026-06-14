import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const BackgroundEffects = () => {
  // Spring configurations for smooth lag-following mouse glow
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 60, damping: 20, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX - 150); // Offset to center the 300px width orb
      mouseY.set(e.clientY - 150);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-bg-primary">
      {/* Primary ambient orb — top left */}
      <motion.div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.5, 0.85, 0.5],
          x: [0, 20, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Secondary orb — bottom right */}
      <motion.div
        className="absolute -bottom-40 -right-20 w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(79,70,229,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.4, 0.75, 0.4],
          x: [0, -30, 0],
          y: [0, 20, 0],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      {/* Tertiary accent — mid left */}
      <motion.div
        className="absolute top-1/4 left-1/3 w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(37,99,235,0.05) 0%, transparent 70%)',
          filter: 'blur(45px)',
        }}
        animate={{
          y: [0, 40, 0],
          x: [0, -20, 0],
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* Interactive mouse-following soft glow */}
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full opacity-60 hidden md:block"
        style={{
          x: smoothX,
          y: smoothY,
          background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Modern mesh grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Subtle noise texture */}
      <div
        className="absolute inset-0 opacity-20 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default BackgroundEffects;
