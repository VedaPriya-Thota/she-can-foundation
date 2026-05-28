import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { motion } from "framer-motion";

const AnalyticsChart = ({ messages }) => {
  // 1. Compute Submissions Trend (Last 7 Days)
  const getTrendData = () => {
    const trendMap = {};
    // Seed last 7 days with zero counts so empty days show up nicely
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      trendMap[dateStr] = 0;
    }

    // Fill counts
    messages.forEach((msg) => {
      const dateStr = new Date(msg.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      if (trendMap[dateStr] !== undefined) {
        trendMap[dateStr]++;
      }
    });

    return Object.keys(trendMap).map((date) => ({
      date,
      Submissions: trendMap[date],
    }));
  };

  // 2. Compute Status Distribution
  const getStatusData = () => {
    const statuses = { New: 0, Reviewed: 0, Responded: 0 };
    messages.forEach((msg) => {
      const status = msg.status || "New";
      if (statuses[status] !== undefined) {
        statuses[status]++;
      }
    });

    return [
      { name: "New Messages", value: statuses.New, color: "#38bdf8" }, // sky-400
      { name: "Reviewed", value: statuses.Reviewed, color: "#fbbf24" }, // amber-400
      { name: "Responded", value: statuses.Responded, color: "#34d399" }, // emerald-400
    ];
  };

  // 3. Compute daily cumulative trend for area chart
  const getCumulativeData = () => {
    const dayMap = {};
    for (let i = 13; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      dayMap[dateStr] = 0;
    }

    messages.forEach((msg) => {
      const dateStr = new Date(msg.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      if (dayMap[dateStr] !== undefined) {
        dayMap[dateStr]++;
      }
    });

    let cumulative = 0;
    return Object.keys(dayMap).map((date) => {
      cumulative += dayMap[date];
      return { date, Total: cumulative, Daily: dayMap[date] };
    });
  };

  const trendData = getTrendData();
  const statusData = getStatusData();
  const cumulativeData = getCumulativeData();
  const hasSubmissions = messages.length > 0;

  const tooltipStyle = {
    backgroundColor: "#0f172a",
    borderColor: "rgba(255,255,255,0.1)",
    borderRadius: "12px",
    color: "#fff",
    fontSize: "12px",
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Submissions Trend Bar Chart (2/3 width) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        className="lg:col-span-2 bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl flex flex-col justify-between"
      >
        <div>
          <h2 className="text-xl font-bold text-white mb-2">Submission Trend</h2>
          <p className="text-gray-400 text-xs mb-6">Contact queries submitted over the last 7 days</p>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={trendData}>
              <defs>
                <linearGradient id="colorSubmissions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.2} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="date" 
                stroke="#64748b" 
                fontSize={11} 
                tickLine={false} 
                axisLine={false} 
              />
              <YAxis 
                stroke="#64748b" 
                fontSize={11} 
                tickLine={false} 
                axisLine={false} 
                allowDecimals={false}
              />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar 
                dataKey="Submissions" 
                fill="url(#colorSubmissions)" 
                radius={[8, 8, 0, 0]} 
                barSize={32}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Status Distribution Pie Chart (1/3 width) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl flex flex-col justify-between"
      >
        <div>
          <h2 className="text-xl font-bold text-white mb-2">Status Ratio</h2>
          <p className="text-gray-400 text-xs mb-6">Proportion of messages by active response status</p>
        </div>

        <div className="h-56 relative flex items-center justify-center">
          {hasSubmissions ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center text-gray-500 text-xs py-8">
              No data available to plot ratio
            </div>
          )}
        </div>

        {/* Legend block */}
        <div className="flex justify-around mt-4 border-t border-white/5 pt-4">
          {statusData.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="flex items-center gap-1.5 text-xs text-gray-300">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span>{item.name.split(" ")[0]}</span>
              </div>
              <span className="text-sm font-bold text-white mt-1">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Cumulative Growth Area Chart (full width) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        className="lg:col-span-3 bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white mb-2">Growth Overview</h2>
            <p className="text-gray-400 text-xs">Cumulative message growth over the last 14 days</p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-1.5 rounded-full bg-pink-500" />
              <span className="text-gray-400">Cumulative</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-1.5 rounded-full bg-purple-500" />
              <span className="text-gray-400">Daily</span>
            </div>
          </div>
        </div>

        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={cumulativeData}>
              <defs>
                <linearGradient id="colorCumulative" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorDaily" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="date"
                stroke="#64748b"
                fontSize={10}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#64748b"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />
              <Tooltip contentStyle={tooltipStyle} />
              <Area
                type="monotone"
                dataKey="Total"
                stroke="#ec4899"
                strokeWidth={2}
                fill="url(#colorCumulative)"
              />
              <Area
                type="monotone"
                dataKey="Daily"
                stroke="#8b5cf6"
                strokeWidth={2}
                fill="url(#colorDaily)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};

export default AnalyticsChart;