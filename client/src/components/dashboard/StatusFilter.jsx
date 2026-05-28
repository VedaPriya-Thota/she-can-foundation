import { motion } from "framer-motion";
import { Filter, Sparkles, Eye, CheckCircle } from "lucide-react";

const filters = [
  { key: "All", label: "All", icon: Filter, color: "pink" },
  { key: "New", label: "New", icon: Sparkles, color: "sky" },
  { key: "Reviewed", label: "Reviewed", icon: Eye, color: "amber" },
  { key: "Responded", label: "Responded", icon: CheckCircle, color: "emerald" },
];

const colorMap = {
  pink: {
    active: "bg-pink-500/20 border-pink-500/40 text-pink-300",
    badge: "bg-pink-500/30 text-pink-300",
  },
  sky: {
    active: "bg-sky-500/20 border-sky-500/40 text-sky-300",
    badge: "bg-sky-500/30 text-sky-300",
  },
  amber: {
    active: "bg-amber-500/20 border-amber-500/40 text-amber-300",
    badge: "bg-amber-500/30 text-amber-300",
  },
  emerald: {
    active: "bg-emerald-500/20 border-emerald-500/40 text-emerald-300",
    badge: "bg-emerald-500/30 text-emerald-300",
  },
};

const StatusFilter = ({ activeFilter, setActiveFilter, messageCounts }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => {
        const isActive = activeFilter === filter.key;
        const Icon = filter.icon;
        const colors = colorMap[filter.color];
        const count = messageCounts[filter.key] || 0;

        return (
          <motion.button
            key={filter.key}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveFilter(filter.key)}
            className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-300 ${
              isActive
                ? colors.active
                : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/20"
            }`}
          >
            <Icon size={14} />
            <span>{filter.label}</span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                isActive ? colors.badge : "bg-white/10 text-gray-500"
              }`}
            >
              {count}
            </span>

            {isActive && (
              <motion.div
                layoutId="activeFilterIndicator"
                className="absolute inset-0 rounded-xl border-2 border-white/20"
                transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

export default StatusFilter;
