import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import { FiGithub, FiEdit3, FiCode, FiActivity } from 'react-icons/fi';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

// Generate Mock GitHub Calendar contribution data
const generateMockGrid = () => {
  const intensities = [0, 0, 1, 2, 0, 1, 3, 2, 1, 0, 4, 3, 2, 1, 0, 0, 2, 3, 1, 2, 4, 1, 0, 3, 2, 1, 0, 2, 3, 1];
  const grid = [];
  // 7 rows (days of week) x 18 columns (weeks)
  for (let r = 0; r < 7; r++) {
    const row = [];
    for (let c = 0; c < 18; c++) {
      const idx = (r * 18 + c) % intensities.length;
      row.push(intensities[idx]);
    }
    grid.push(row);
  }
  return grid;
};

const LearningInPublic = () => {
  const gridData = generateMockGrid();

  const getIntensityClass = (level) => {
    switch (level) {
      case 1: return 'bg-emerald-950 border border-emerald-900/50';
      case 2: return 'bg-emerald-800 border border-emerald-700/50';
      case 3: return 'bg-emerald-600 border border-emerald-500/50';
      case 4: return 'bg-emerald-400 border border-emerald-300/50';
      default: return 'bg-white/[0.02] border border-white/[0.04]';
    }
  };

  return (
    <section id="learning-in-public" className="section-padding relative">
      <div className="container-custom">
        <SectionHeader
          label="Transparency"
          title={<>Learning In <span className="gradient-text">Public</span></>}
          subtitle="Building coding habits, documenting concepts, and maintaining algorithmic consistency."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-5 max-w-6xl mx-auto"
        >
          {/* Card 1: Consistency Calendar Grid */}
          <motion.div
            variants={cardVariants}
            className="lg:col-span-2 glass-card rounded-2xl p-5 border border-white/[0.06] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FiGithub className="text-accent" size={16} />
                <h3 className="font-display font-bold text-sm text-text-primary">
                  Consistency Calendar
                </h3>
                <span className="ml-auto text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                  45-Day Commit Streak
                </span>
              </div>

              {/* GitHub Grid Visual */}
              <div className="overflow-x-auto pb-2 scrollbar-thin">
                <div className="min-w-[340px] flex flex-col gap-1">
                  {gridData.map((row, rIdx) => (
                    <div key={rIdx} className="flex gap-1">
                      {row.map((intensity, cIdx) => (
                        <div
                          key={cIdx}
                          className={`w-3.5 h-3.5 rounded-sm transition-all duration-300 hover:scale-115 cursor-pointer ${getIntensityClass(intensity)}`}
                          title={`Contributions intensity: ${intensity}`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[9px] font-mono text-text-muted mt-5 pt-3 border-t border-white/[0.04]">
              <span className="flex items-center gap-1">
                <FiActivity size={10} />
                380+ commits logged over past months
              </span>
              <div className="flex items-center gap-1">
                <span>Less</span>
                <div className="w-2 h-2 rounded-sm bg-white/[0.02] border border-white/[0.04]" />
                <div className="w-2 h-2 rounded-sm bg-emerald-950 border border-emerald-900/50" />
                <div className="w-2 h-2 rounded-sm bg-emerald-800 border border-emerald-700/50" />
                <div className="w-2 h-2 rounded-sm bg-emerald-600 border border-emerald-500/50" />
                <div className="w-2 h-2 rounded-sm bg-emerald-400 border border-emerald-300/50" />
                <span>More</span>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Handwritten DSA Explanations Mockup */}
          <motion.div
            variants={cardVariants}
            className="glass-card rounded-2xl p-5 border border-white/[0.06] flex flex-col justify-between group overflow-hidden"
          >
            <div>
              <div className="flex items-center gap-2 mb-3.5">
                <FiEdit3 className="text-[#4f46e5]" size={16} />
                <h3 className="font-display font-bold text-sm text-text-primary">
                  Handwritten DSA Notes
                </h3>
              </div>
              <p className="text-text-secondary text-[11px] leading-relaxed mb-4">
                Sketching diagrams to internalize tree balancing, pointers, and memory layout.
              </p>

              {/* Dotted Grid Drawing Preview */}
              <div className="relative rounded-xl border border-white/[0.05] h-28 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] bg-[size:10px_10px] overflow-hidden flex items-center justify-center bg-black/40">
                <svg className="w-full h-full opacity-65 p-2" viewBox="0 0 200 80">
                  {/* Draw Binary Search Tree Node Visual */}
                  <circle cx="100" cy="20" r="8" fill="none" stroke="#6366f1" strokeWidth="1.2" />
                  <text x="100" y="23" fill="#6366f1" fontSize="8" textAnchor="middle" fontFamily="monospace">15</text>
                  
                  <line x1="94" y1="25" x2="76" y2="45" stroke="#4b5563" strokeWidth="1" strokeDasharray="2" />
                  <circle cx="70" cy="50" r="8" fill="none" stroke="#a78bfa" strokeWidth="1.2" />
                  <text x="70" y="53" fill="#a78bfa" fontSize="8" textAnchor="middle" fontFamily="monospace">8</text>
                  
                  <line x1="106" y1="25" x2="124" y2="45" stroke="#4b5563" strokeWidth="1" strokeDasharray="2" />
                  <circle cx="130" cy="50" r="8" fill="none" stroke="#a78bfa" strokeWidth="1.2" />
                  <text x="130" y="53" fill="#a78bfa" fontSize="8" textAnchor="middle" fontFamily="monospace">22</text>
                </svg>
                <div className="absolute inset-0 bg-gradient-to-t from-bg-card/90 to-transparent" />
                <span className="absolute bottom-2 left-3 text-[9px] font-mono text-text-muted">
                  Topic: BST Insertion Flow
                </span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center justify-between">
              <span className="text-[9px] font-mono text-text-muted">QuickSort.pdf, Trees.png</span>
              <span className="text-[10px] font-semibold text-accent-light group-hover:underline cursor-pointer">
                View Repository
              </span>
            </div>
          </motion.div>

          {/* Card 3: LeetCode & Coding Metrics */}
          <motion.div
            variants={cardVariants}
            className="glass-card rounded-2xl p-5 border border-white/[0.06] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FiCode className="text-[#2563eb]" size={16} />
                <h3 className="font-display font-bold text-sm text-text-primary">
                  LeetCode Progress
                </h3>
                <span className="ml-auto text-[10px] font-mono text-text-muted">180+ Solved</span>
              </div>

              {/* Progress bars */}
              <div className="space-y-3.5">
                <div>
                  <div className="flex justify-between text-[10px] font-mono mb-1 text-text-secondary">
                    <span>Easy</span>
                    <span>90 / 120</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/[0.03] rounded-full overflow-hidden border border-white/[0.04]">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '75%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[10px] font-mono mb-1 text-text-secondary">
                    <span>Medium</span>
                    <span>70 / 200</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/[0.03] rounded-full overflow-hidden border border-white/[0.04]">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: '35%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[10px] font-mono mb-1 text-text-secondary">
                    <span>Hard</span>
                    <span>20 / 50</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/[0.03] rounded-full overflow-hidden border border-white/[0.04]">
                    <div className="h-full bg-rose-500 rounded-full" style={{ width: '40%' }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-white/[0.04] text-[9px] font-mono text-text-muted flex justify-between">
              <span>Goal: 300+ Solved</span>
              <span>Updated Weekly</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default LearningInPublic;
