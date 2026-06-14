import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 300, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[100]"
      style={{
        scaleX,
        transformOrigin: '0%',
        background: 'linear-gradient(90deg, #7c3aed, #4f46e5, #2563eb)',
      }}
    />
  );
};

export default ScrollProgress;
