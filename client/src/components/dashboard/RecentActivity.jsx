import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, CheckCircle2, Clock, Inbox } from "lucide-react";
import { formatDate } from "../../utils/dateFormatter";

const getActivityIcon = (status) => {
  switch (status) {
    case "Responded":
      return <CheckCircle2 size={16} className="text-emerald-400" />;
    case "Reviewed":
      return <Clock size={16} className="text-amber-400" />;
    default:
      return <MessageSquare size={16} className="text-sky-400" />;
  }
};

const getActivityText = (msg) => {
  switch (msg.status) {
    case "Responded":
      return `Responded to ${msg.name}'s message`;
    case "Reviewed":
      return `Marked ${msg.name}'s message as reviewed`;
    default:
      return `${msg.name} submitted a new message`;
  }
};

const getStatusDot = (status) => {
  switch (status) {
    case "Responded":
      return "bg-emerald-400";
    case "Reviewed":
      return "bg-amber-400";
    default:
      return "bg-sky-400";
  }
};

const activityItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const RecentActivity = ({ messages }) => {
  // Show the 8 most recent messages as activity feed
  const recentItems = messages.slice(0, 8);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
      className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Recent Activity</h2>
          <p className="text-gray-400 text-xs mt-1">Latest operations and submissions</p>
        </div>
        <div className="p-2.5 bg-purple-500/10 rounded-xl border border-purple-500/20">
          <Inbox size={18} className="text-purple-400" />
        </div>
      </div>

      {recentItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
            <Inbox size={24} className="text-gray-500" />
          </div>
          <p className="text-gray-400 text-sm font-medium">No recent activity</p>
          <p className="text-gray-500 text-xs mt-1">Activity will appear as messages arrive</p>
        </div>
      ) : (
        <div className="space-y-1">
          <AnimatePresence>
            {recentItems.map((msg, index) => (
              <motion.div
                key={msg._id}
                variants={activityItemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.05 }}
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors duration-200 group"
              >
                {/* Timeline dot and line */}
                <div className="flex flex-col items-center mt-1">
                  <div className={`w-2 h-2 rounded-full ${getStatusDot(msg.status)} ring-4 ring-white/5`} />
                  {index < recentItems.length - 1 && (
                    <div className="w-px h-8 bg-white/10 mt-1" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    {getActivityIcon(msg.status)}
                    <p className="text-sm text-gray-200 truncate">
                      {getActivityText(msg)}
                    </p>
                  </div>
                  <p className="text-xs text-gray-500">
                    {formatDate(msg.createdAt)}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
};

export default RecentActivity;
