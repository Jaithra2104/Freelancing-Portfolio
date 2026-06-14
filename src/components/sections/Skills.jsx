import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import { skills } from '../../data/skills';
import {
  FiMonitor, FiServer, FiTool, FiFeather, FiCpu,
} from 'react-icons/fi';

const iconMap = {
  FiMonitor,
  FiServer,
  FiTool,
  FiFeather,
  FiCpu,
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const SkillCard = ({ category, icon, color, items, index }) => {
  const Icon = iconMap[icon] || FiMonitor;

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -6, borderColor: `${color}40` }}
      className="glass-card rounded-2xl p-6 border border-white/[0.07] transition-all duration-400 group"
      style={{ '--accent-color': color }}
    >
      {/* Category header */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
          style={{ background: `${color}22` }}
        >
          <Icon size={18} style={{ color }} />
        </div>
        <h3 className="font-display font-semibold text-text-primary text-lg">{category}</h3>
      </div>

      {/* Skills list */}
      <div className="space-y-3.5">
        {items.map(({ name, level }) => (
          <div key={name}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-text-secondary text-sm font-medium">{name}</span>
              <span className="text-text-muted text-xs font-mono">{level}%</span>
            </div>
            <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${level}%` }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${color}, ${color}aa)`,
                  boxShadow: `0 0 8px ${color}44`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="section-padding relative">
      <div className="container-custom">
        <SectionHeader
          label="Toolkit"
          title={<>Skills & <span className="gradient-text">Technologies</span></>}
          subtitle="The languages, frameworks, and tools I actually use day-to-day — no keyword stuffing, just what I know well."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5"
        >
          {skills.map((skill, i) => (
            <SkillCard key={skill.category} {...skill} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
