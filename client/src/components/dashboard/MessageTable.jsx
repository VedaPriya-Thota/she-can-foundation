import { Trash2, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { formatDate } from "../../utils/dateFormatter";

const rowVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  },
  exit: { 
    opacity: 0, 
    x: -15, 
    transition: { duration: 0.25, ease: "easeIn" } 
  }
};

const MessageTable = ({
  loading,
  filteredMessages,
  handleDelete,
  handleStatusChange,
}) => {
  if (loading) {
    return (
      <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl animate-pulse">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-white/10 border-b border-white/10">
              <tr>
                <th className="p-5 text-left"><div className="h-4 bg-white/10 rounded w-16" /></th>
                <th className="p-5 text-left"><div className="h-4 bg-white/10 rounded w-20" /></th>
                <th className="p-5 text-left"><div className="h-4 bg-white/10 rounded w-32" /></th>
                <th className="p-5 text-left"><div className="h-4 bg-white/10 rounded w-24" /></th>
                <th className="p-5 text-left"><div className="h-4 bg-white/10 rounded w-16" /></th>
                <th className="p-5 text-center"><div className="h-4 bg-white/10 rounded w-12 mx-auto" /></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {[1, 2, 3, 4, 5].map((index) => (
                <tr key={index}>
                  <td className="p-5"><div className="h-4 bg-white/10 rounded w-24" /></td>
                  <td className="p-5"><div className="h-4 bg-white/10 rounded w-36" /></td>
                  <td className="p-5"><div className="h-4 bg-white/10 rounded w-48" /></td>
                  <td className="p-5"><div className="h-4 bg-white/10 rounded w-28" /></td>
                  <td className="p-5"><div className="h-8 bg-white/10 rounded-full w-32" /></td>
                  <td className="p-5 text-center"><div className="h-10 bg-white/10 rounded-xl w-10 mx-auto" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (filteredMessages.length === 0) {
    return (
      <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-16 text-center text-lg text-gray-300">
        No support submissions found
      </div>
    );
  }

  // Get dynamic glassmorphic styles based on status
  const getStatusStyle = (status) => {
    switch (status) {
      case "Reviewed":
        return "bg-amber-500/10 text-amber-400 border-amber-500/30 focus:border-amber-400 focus:ring-amber-400/30";
      case "Responded":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 focus:border-emerald-400 focus:ring-emerald-400/30";
      default: // New
        return "bg-sky-500/10 text-sky-400 border-sky-500/30 focus:border-sky-400 focus:ring-sky-400/30";
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-white/10 border-b border-white/10">
            <tr>
              <th className="text-left p-5 text-gray-300 font-semibold tracking-wider text-sm">
                Name
              </th>
              <th className="text-left p-5 text-gray-300 font-semibold tracking-wider text-sm">
                Email
              </th>
              <th className="text-left p-5 text-gray-300 font-semibold tracking-wider text-sm">
                Message
              </th>
              <th className="text-left p-5 text-gray-300 font-semibold tracking-wider text-sm">
                Submitted At
              </th>
              <th className="text-left p-5 text-gray-300 font-semibold tracking-wider text-sm">
                Status
              </th>
              <th className="text-center p-5 text-gray-300 font-semibold tracking-wider text-sm">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/10">
            <AnimatePresence initial={false}>
              {filteredMessages.map((msg) => (
                <motion.tr
                  key={msg._id}
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                  className="hover:bg-white/5 transition-colors duration-200"
                >
                  <td className="p-5 font-medium text-white">
                    {msg.name}
                  </td>

                  <td className="p-5 text-gray-300 font-mono text-sm">
                    {msg.email}
                  </td>

                  <td className="p-5 max-w-xs truncate text-gray-300" title={msg.message}>
                    {msg.message}
                  </td>

                  <td className="p-5 text-gray-300 text-sm">
                    {formatDate(msg.createdAt)}
                  </td>

                  <td className="p-5">
                    <div className="relative inline-block w-40">
                      <select
                        value={msg.status || "New"}
                        onChange={(e) => handleStatusChange(msg._id, e.target.value)}
                        className={`w-full appearance-none cursor-pointer text-xs font-semibold px-4 py-2 rounded-full border outline-none transition-all duration-300 pr-10 focus:ring-4 ${getStatusStyle(msg.status)}`}
                      >
                        <option value="New" className="bg-slate-950 text-sky-400">
                          New
                        </option>
                        <option value="Reviewed" className="bg-slate-950 text-amber-400">
                          Reviewed
                        </option>
                        <option value="Responded" className="bg-slate-950 text-emerald-400">
                          Responded
                        </option>
                      </select>
                      
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                        <ChevronDown size={14} />
                      </div>
                    </div>
                  </td>

                  <td className="p-5 text-center">
                    <button
                      onClick={() => {
                        if (window.confirm("Are you sure you want to delete this message?")) {
                          handleDelete(msg._id);
                        }
                      }}
                      className="bg-red-500/20 text-red-400 p-3 rounded-xl border border-red-500/30 hover:bg-red-500 hover:text-white transition duration-300 shadow-lg inline-flex items-center justify-center"
                      title="Delete Message"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MessageTable;