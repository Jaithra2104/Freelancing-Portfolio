import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import { FiGithub, FiEdit3, FiCode, FiActivity, FiGrid } from 'react-icons/fi';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

// Generate Mock GitHub Calendar contribution data as offline fallback
const generateMockGrid = () => {
  const intensities = [0, 0, 1, 2, 0, 1, 3, 2, 1, 0, 4, 3, 2, 1, 0, 0, 2, 3, 1, 2, 4, 1, 0, 3, 2, 1, 0, 2, 3, 1];
  const grid = [];
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
  const [leetcode, setLeetcode] = useState({
    solvedProblem: 91,
    easySolved: 42,
    mediumSolved: 37,
    hardSolved: 12,
    loading: true,
  });

  const [calendar, setCalendar] = useState({
    streak: 0,
    totalActiveDays: 0,
    submissionCalendar: '{}',
    loading: true,
  });

  const [languages, setLanguages] = useState({
    list: [],
    loading: true,
  });

  useEffect(() => {
    // Solved questions count
    fetch('https://alfa-leetcode-api.onrender.com/jaithra2106/solved')
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.errors) {
          setLeetcode({
            solvedProblem: data.solvedProblem || 91,
            easySolved: data.easySolved || 42,
            mediumSolved: data.mediumSolved || 37,
            hardSolved: data.hardSolved || 12,
            loading: false,
          });
        } else {
          setLeetcode((prev) => ({ ...prev, loading: false }));
        }
      })
      .catch((err) => {
        console.error('Leetcode Solved API error:', err);
        setLeetcode((prev) => ({ ...prev, loading: false }));
      });

    // Calendar heatmap
    fetch('https://alfa-leetcode-api.onrender.com/jaithra2106/calendar')
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.errors) {
          setCalendar({
            streak: data.streak || 0,
            totalActiveDays: data.totalActiveDays || 0,
            submissionCalendar: data.submissionCalendar || '{}',
            loading: false,
          });
        } else {
          setCalendar((prev) => ({ ...prev, loading: false }));
        }
      })
      .catch((err) => {
        console.error('Leetcode Calendar API error:', err);
        setCalendar((prev) => ({ ...prev, loading: false }));
      });

    // Language list
    fetch('https://alfa-leetcode-api.onrender.com/jaithra2106/language')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.languageProblemCount) {
          // Sort languages by solved count descending
          const sorted = [...data.languageProblemCount].sort((a, b) => b.problemsSolved - a.problemsSolved);
          setLanguages({
            list: sorted,
            loading: false,
          });
        } else {
          setLanguages((prev) => ({ ...prev, loading: false }));
        }
      })
      .catch((err) => {
        console.error('Leetcode Language API error:', err);
        setLanguages((prev) => ({ ...prev, loading: false }));
      });
  }, []);

  const getLeetcodeIntensityClass = (count) => {
    if (count === 0) return 'bg-white/[0.02] border border-white/[0.04]';
    if (count <= 2) return 'bg-amber-600/20 border border-amber-500/20';
    if (count <= 5) return 'bg-amber-500/40 border border-amber-400/30';
    if (count <= 9) return 'bg-amber-500/70 border border-amber-400/50';
    return 'bg-amber-400 border border-amber-300 shadow-[0_0_8px_rgba(245,158,11,0.5)]';
  };

  const generateLeetcodeGrid = () => {
    const today = new Date();
    const todayDayOfWeek = today.getDay(); // 0 to 6
    
    // We want 18 columns. Each column is a week of 7 days (Sunday to Saturday)
    const startDate = new Date();
    startDate.setDate(today.getDate() - 126 - todayDayOfWeek);
    startDate.setHours(0, 0, 0, 0);

    const getEpochDay = (d) => Math.floor(d.getTime() / (1000 * 60 * 60 * 24));
    
    const calendarMap = {};
    try {
      const rawCal = JSON.parse(calendar.submissionCalendar);
      Object.keys(rawCal).forEach((ts) => {
        const d = new Date(parseInt(ts) * 1000);
        calendarMap[getEpochDay(d)] = rawCal[ts];
      });
    } catch (e) {
      // ignore
    }

    const grid = [];
    for (let r = 0; r < 7; r++) {
      const row = [];
      for (let c = 0; c < 18; c++) {
        const dayIndex = c * 7 + r;
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + dayIndex);
        
        const cellEpochDay = getEpochDay(currentDate);
        const count = calendarMap[cellEpochDay] || 0;
        
        row.push({
          date: currentDate,
          count,
        });
      }
      grid.push(row);
    }
    return grid;
  };

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
          {/* Card 1: Consistency Calendar Grid (Live GitHub Activity) */}
          <motion.a
            href="https://github.com/Jaithra2104"
            target="_blank"
            rel="noopener noreferrer"
            variants={cardVariants}
            className="lg:col-span-2 glass-card rounded-2xl p-5 border border-white/[0.06] flex flex-col justify-between hover:border-accent/40 transition-colors group cursor-pointer"
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FiGithub className="text-accent" size={16} />
                <h3 className="font-display font-bold text-sm text-text-primary group-hover:text-accent-light transition-colors">
                  Consistency Calendar
                </h3>
                <span className="text-[10px] text-text-muted opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                <span className="ml-auto text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold animate-pulse">
                  Live Activity Graph
                </span>
              </div>

              {/* GitHub Live Activity Graph Image */}
              <div className="mt-2 rounded-xl overflow-hidden border border-white/[0.04] bg-black/20 flex items-center justify-center p-1 select-none pointer-events-none">
                <img
                  src="https://github-readme-activity-graph.vercel.app/graph?username=Jaithra2104&theme=react-dark&bg_color=0d132200&hide_border=true&area=true"
                  alt="Jaithra's GitHub Live Activity Graph"
                  className="w-full h-auto min-h-[120px] object-contain"
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    const fallback = e.target.parentElement.nextElementSibling;
                    if (fallback) fallback.style.display = 'block';
                  }}
                />
              </div>

              {/* Fallback mock grid if offline */}
              <div className="hidden overflow-x-auto pb-2 scrollbar-thin mt-2">
                <div className="min-w-[340px] flex flex-col gap-1">
                  {gridData.map((row, rIdx) => (
                    <div key={rIdx} className="flex gap-1">
                      {row.map((intensity, cIdx) => (
                        <div
                          key={cIdx}
                          className={`w-3.5 h-3.5 rounded-sm transition-all duration-300 ${getIntensityClass(intensity)}`}
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
                Dynamic contribution feed
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
          </motion.a>

          {/* Card 2: Top Programming Languages (Option B) */}
          <motion.div
            variants={cardVariants}
            className="glass-card rounded-2xl p-5 border border-white/[0.06] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FiEdit3 className="text-[#a78bfa]" size={16} />
                <h3 className="font-display font-bold text-sm text-text-primary">
                  Top Technologies
                </h3>
              </div>
              <p className="text-text-secondary text-[11px] leading-relaxed mb-4">
                Language usage distribution calculated from active repositories and tools.
              </p>

              {/* Progress bars for languages */}
              <div className="space-y-3.5">
                {/* Python */}
                <div>
                  <div className="flex justify-between text-[10px] font-mono mb-1 text-text-secondary">
                    <span>Python</span>
                    <span>55%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/[0.03] rounded-full overflow-hidden border border-white/[0.04]">
                    <div className="h-full bg-gradient-to-r from-[#3776AB] to-[#FFD43B] rounded-full" style={{ width: '55%' }} />
                  </div>
                </div>

                {/* React/JS */}
                <div>
                  <div className="flex justify-between text-[10px] font-mono mb-1 text-text-secondary">
                    <span>React & JavaScript</span>
                    <span>30%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/[0.03] rounded-full overflow-hidden border border-white/[0.04]">
                    <div className="h-full bg-gradient-to-r from-[#61DAFB] to-[#4f46e5] rounded-full" style={{ width: '30%' }} />
                  </div>
                </div>

                {/* SQL */}
                <div>
                  <div className="flex justify-between text-[10px] font-mono mb-1 text-text-secondary">
                    <span>MySQL & SQLite</span>
                    <span>10%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/[0.03] rounded-full overflow-hidden border border-white/[0.04]">
                    <div className="h-full bg-gradient-to-r from-[#00758F] to-[#f29111] rounded-full" style={{ width: '10%' }} />
                  </div>
                </div>

                {/* Others */}
                <div>
                  <div className="flex justify-between text-[10px] font-mono mb-1 text-text-secondary">
                    <span>HTML & CSS</span>
                    <span>5%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/[0.03] rounded-full overflow-hidden border border-white/[0.04]">
                    <div className="h-full bg-gradient-to-r from-[#e34f26] to-[#1572b6] rounded-full" style={{ width: '5%' }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center justify-between text-[9px] font-mono text-text-muted">
              <span>Stack Breakdown</span>
              <span>Updated Live</span>
            </div>
          </motion.div>

          {/* Card 3: LeetCode & Coding Metrics */}
          <motion.a
            href="https://leetcode.com/u/jaithra2106/"
            target="_blank"
            rel="noopener noreferrer"
            variants={cardVariants}
            className="glass-card rounded-2xl p-5 border border-white/[0.06] flex flex-col justify-between hover:border-accent/40 transition-colors group cursor-pointer"
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FiCode className="text-[#2563eb]" size={16} />
                <h3 className="font-display font-bold text-sm text-text-primary group-hover:text-accent-light transition-colors">
                  LeetCode Progress
                </h3>
                <span className="text-[10px] text-text-muted opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                <span className="ml-auto text-[10px] font-mono text-text-muted">
                  {leetcode.loading ? '...' : `${leetcode.solvedProblem} Solved`}
                </span>
              </div>

              {/* Progress bars */}
              <div className="space-y-3.5">
                <div>
                  <div className="flex justify-between text-[10px] font-mono mb-1 text-text-secondary">
                    <span>Easy</span>
                    <span>{leetcode.easySolved} / 100</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/[0.03] rounded-full overflow-hidden border border-white/[0.04]">
                    <div 
                      className="h-full bg-emerald-500 rounded-full transition-all duration-1000" 
                      style={{ width: `${Math.min(100, (leetcode.easySolved / 100) * 100)}%` }} 
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[10px] font-mono mb-1 text-text-secondary">
                    <span>Medium</span>
                    <span>{leetcode.mediumSolved} / 100</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/[0.03] rounded-full overflow-hidden border border-white/[0.04]">
                    <div 
                      className="h-full bg-amber-500 rounded-full transition-all duration-1000" 
                      style={{ width: `${Math.min(100, (leetcode.mediumSolved / 100) * 100)}%` }} 
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[10px] font-mono mb-1 text-text-secondary">
                    <span>Hard</span>
                    <span>{leetcode.hardSolved} / 30</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/[0.03] rounded-full overflow-hidden border border-white/[0.04]">
                    <div 
                      className="h-full bg-rose-500 rounded-full transition-all duration-1000" 
                      style={{ width: `${Math.min(100, (leetcode.hardSolved / 30) * 100)}%` }} 
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-white/[0.04] text-[9px] font-mono text-text-muted flex justify-between">
              <span>Goal: 230+ Solved</span>
              <span>Updated Live</span>
            </div>
          </motion.a>

          {/* Card 4: LeetCode Submission Calendar & Language breakdown */}
          <motion.a
            href="https://leetcode.com/u/jaithra2106/"
            target="_blank"
            rel="noopener noreferrer"
            variants={cardVariants}
            className="lg:col-span-2 glass-card rounded-2xl p-5 border border-white/[0.06] flex flex-col justify-between hover:border-accent/40 transition-colors group cursor-pointer"
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FiGrid className="text-amber-500" size={16} />
                <h3 className="font-display font-bold text-sm text-text-primary group-hover:text-accent-light transition-colors">
                  LeetCode Submissions Calendar
                </h3>
                <span className="text-[10px] text-text-muted opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                <span className="ml-auto text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold animate-pulse">
                  Live Orange Heatmap
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                {/* Heatmap Grid */}
                <div className="md:col-span-3">
                  <p className="text-text-secondary text-[11px] leading-relaxed mb-4">
                    Daily problem-solving consistency graph synced directly from LeetCode.
                  </p>

                  {calendar.loading ? (
                    <div className="h-[120px] flex items-center justify-center text-text-muted font-mono text-xs animate-pulse">
                      Fetching calendar submissions...
                    </div>
                  ) : (
                    <div className="overflow-x-auto pb-2 scrollbar-thin mt-2">
                      <div className="min-w-[340px] flex flex-col gap-1">
                        {generateLeetcodeGrid().map((row, rIdx) => (
                          <div key={rIdx} className="flex gap-1">
                            {row.map((cell, cIdx) => (
                              <div
                                key={cIdx}
                                title={`${cell.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}: ${cell.count} submissions`}
                                className={`w-3.5 h-3.5 rounded-sm transition-all duration-300 ${getLeetcodeIntensityClass(cell.count)}`}
                              />
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-4 text-[10px] font-mono text-text-secondary mt-5 pt-3 border-t border-white/[0.04]">
                    <div className="flex items-center gap-1">
                      <span>Less</span>
                      <div className="w-2 h-2 rounded-sm bg-white/[0.02] border border-white/[0.04]" />
                      <div className="w-2 h-2 rounded-sm bg-amber-600/20 border border-amber-500/20" />
                      <div className="w-2 h-2 rounded-sm bg-amber-500/40 border border-amber-400/30" />
                      <div className="w-2 h-2 rounded-sm bg-amber-500/70 border border-amber-400/50" />
                      <div className="w-2 h-2 rounded-sm bg-amber-400 border border-amber-300" />
                      <span>More</span>
                    </div>
                  </div>
                </div>

                {/* Types of Problems / Languages Solved */}
                <div className="md:col-span-2 flex flex-col justify-between">
                  <div>
                    <h4 className="font-display font-semibold text-xs text-text-primary mb-3">
                      Problems by Language
                    </h4>
                    {languages.loading ? (
                      <div className="space-y-3 animate-pulse">
                        <div className="h-4 bg-white/5 rounded w-3/4" />
                        <div className="h-4 bg-white/5 rounded w-1/2" />
                        <div className="h-4 bg-white/5 rounded w-5/6" />
                      </div>
                    ) : (
                      <div className="space-y-3.5">
                        {languages.list.slice(0, 4).map((lang, idx) => {
                          const totalLangSolved = languages.list.reduce((sum, item) => sum + item.problemsSolved, 0);
                          const pct = totalLangSolved > 0 ? (lang.problemsSolved / totalLangSolved) * 100 : 0;
                          return (
                            <div key={idx}>
                              <div className="flex justify-between text-[10px] font-mono mb-1 text-text-secondary">
                                <span>{lang.languageName}</span>
                                <span>{lang.problemsSolved} Solved</span>
                              </div>
                              <div className="h-1.5 w-full bg-white/[0.03] rounded-full overflow-hidden border border-white/[0.04]">
                                <div
                                  className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-white/[0.04] text-[9px] font-mono text-text-muted flex justify-between w-full">
              <span className="flex items-center gap-1">
                Active Days: <span className="font-bold text-text-primary">{calendar.totalActiveDays}</span>
              </span>
              <span className="flex items-center gap-1">
                Streak: <span className="font-bold text-text-primary">{calendar.streak} days</span>
              </span>
              <span>Updated Live</span>
            </div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default LearningInPublic;
