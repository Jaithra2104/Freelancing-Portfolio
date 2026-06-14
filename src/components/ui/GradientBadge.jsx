const GradientBadge = ({ children, color }) => {
  const colorMap = {
    purple: 'bg-purple-500/10 text-purple-300 border-purple-500/20',
    indigo: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20',
    blue: 'bg-blue-500/10 text-blue-300 border-blue-500/20',
    green: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
    default: 'bg-white/5 text-text-secondary border-white/10',
  };

  const cls = colorMap[color] || colorMap.default;

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border font-mono tracking-wide ${cls}`}
    >
      {children}
    </span>
  );
};

export default GradientBadge;
