import { motion } from "framer-motion";

const EmptyState = ({ icon: Icon, title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-16 flex flex-col items-center justify-center text-center relative overflow-hidden"
    >
      {/* Decorative gradient blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Icon container */}
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center">
          <Icon size={36} className="text-gray-400" />
        </div>
      </div>

      {/* Text */}
      <h3 className="text-xl font-bold text-white mb-2 relative">{title}</h3>
      <p className="text-gray-400 text-sm max-w-xs relative">{description}</p>
    </motion.div>
  );
};

export default EmptyState;
