import { Mail, Users, Activity } from "lucide-react";
import { motion } from "framer-motion";

const cardContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const StatsCards = ({ messages, loading }) => {
  if (loading) {
    return (
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {[1, 2, 3].map((index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col justify-between animate-pulse h-32"
          >
            <div className="flex items-center justify-between w-full">
              <div className="space-y-3 w-2/3">
                <div className="h-4 bg-white/10 rounded w-1/2" />
                <div className="h-8 bg-white/10 rounded w-1/3" />
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  const totalMessages = messages.length;

  const todayMessages = messages.filter((msg) => {
    const today = new Date().toDateString();
    return new Date(msg.createdAt).toDateString() === today;
  }).length;

  return (
    <motion.div 
      variants={cardContainerVariants}
      initial="hidden"
      animate="visible"
      className="grid md:grid-cols-3 gap-6 mb-10"
    >
      {/* Total */}
      <motion.div 
        variants={cardItemVariants}
        whileHover={{ y: -5, borderColor: "rgba(236,72,153,0.3)" }}
        className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 transition-all duration-300 shadow-xl"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm font-medium">
              Total Messages
            </p>
            <h2 className="text-4xl font-bold mt-3 text-white">
              {totalMessages}
            </h2>
          </div>
          <div className="p-3 bg-pink-500/10 rounded-2xl border border-pink-500/20">
            <Mail size={24} className="text-pink-400" />
          </div>
        </div>
      </motion.div>

      {/* Today */}
      <motion.div 
        variants={cardItemVariants}
        whileHover={{ y: -5, borderColor: "rgba(139,92,246,0.3)" }}
        className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 transition-all duration-300 shadow-xl"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm font-medium">
              Today's Messages
            </p>
            <h2 className="text-4xl font-bold mt-3 text-white">
              {todayMessages}
            </h2>
          </div>
          <div className="p-3 bg-purple-500/10 rounded-2xl border border-purple-500/20">
            <Activity size={24} className="text-purple-400" />
          </div>
        </div>
      </motion.div>

      {/* Active Admin */}
      <motion.div 
        variants={cardItemVariants}
        whileHover={{ y: -5, borderColor: "rgba(236,72,153,0.3)" }}
        className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 transition-all duration-300 shadow-xl"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm font-medium">
              Active Admin
            </p>
            <h2 className="text-4xl font-bold mt-3 text-white">
              1
            </h2>
          </div>
          <div className="p-3 bg-pink-500/10 rounded-2xl border border-pink-500/20">
            <Users size={24} className="text-pink-400" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default StatsCards;