import {
  LayoutDashboard,
  LogOut,
  X,
} from "lucide-react";

const Sidebar = ({
  handleLogout,
  sidebarOpen,
  setSidebarOpen,
}) => {
  return (
    <>
      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed md:static top-0 left-0 z-50
          w-72 min-h-screen
          bg-slate-900 border-r border-white/10
          p-6 flex flex-col justify-between
          transition-transform duration-300
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >

        <div>

          {/* Top */}
          <div className="flex items-center justify-between mb-12">

            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                She Can
              </h1>

              <p className="text-gray-400 text-sm mt-2">
                Admin Dashboard
              </p>
            </div>

            {/* Mobile Close */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden"
            >
              <X size={24} />
            </button>
          </div>

          {/* Nav */}
          <div className="space-y-4">

            <div className="flex items-center gap-3 bg-pink-500/20 p-4 rounded-xl">

              <LayoutDashboard size={20} />

              <span>Dashboard</span>
            </div>

          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="bg-red-500 p-4 rounded-xl flex items-center justify-center gap-2 hover:bg-red-600 transition"
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>
    </>
  );
};

export default Sidebar;