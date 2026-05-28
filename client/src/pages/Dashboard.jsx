import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Menu } from "lucide-react";
import { CSVLink } from "react-csv";
import Sidebar from "../components/dashboard/Sidebar";
import StatsCards from "../components/dashboard/StatsCards";
import SearchBar from "../components/dashboard/SearchBar";
import MessageTable from "../components/dashboard/MessageTable";
import AnalyticsChart from "../components/dashboard/AnalyticsChart";
import { getMessages, deleteMessage, updateMessageStatus } from "../api/messageApi";

const Dashboard = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  // Fetch Messages
  const fetchMessages = async () => {
    try {
      const data = await getMessages(token);

      if (data.success) {
        setMessages(data.data);
      } else {
        toast.error(data.message || "Failed to fetch messages");
      }

    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch messages");
    } finally {
      setLoading(false);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    try {
      const data = await deleteMessage(token, id);

      if (data.success) {
        toast.success("Message deleted");
        setMessages(
          messages.filter(
            (msg) => msg._id !== id
          )
        );
      } else {
        toast.error(data.message || "Delete failed");
      }

    } catch (error) {
      console.error(error);
      toast.error("Delete failed");
    }
  };

  // Inline Status Change
  const handleStatusChange = async (id, newStatus) => {
    try {
      const data = await updateMessageStatus(token, id, newStatus);

      if (data.success) {
        toast.success(`Status updated to ${newStatus}`);
        setMessages(
          messages.map((msg) =>
            msg._id === id ? { ...msg, status: newStatus } : msg
          )
        );
      } else {
        toast.error(data.message || "Failed to update status");
      }
    } catch (error) {
      console.error(error);
      toast.error("Status update failed");
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");

    toast.success("Logged out");

    navigate("/admin/login");
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Filter
  const filteredMessages = messages.filter(
    (msg) =>
      msg.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      msg.email
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">

      {/* Sidebar */}
      <Sidebar
        handleLogout={handleLogout}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main */}
      <div className="flex-1 p-6 md:p-10">

        {/* Mobile Topbar */}
        <div className="flex items-center justify-between mb-8 md:hidden">

          <button
            onClick={() =>
              setSidebarOpen(true)
            }
          >
            <Menu size={28} />
          </button>

          <h1 className="text-2xl font-bold">
            Dashboard
          </h1>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">

          <div>
            <h1 className="text-4xl font-bold">
              Dashboard Overview
            </h1>

            <p className="text-gray-400 mt-2">
              Manage all support and contact submissions.
            </p>
          </div>

          {/* Export */}
          <CSVLink
            data={messages}
            filename="shecan-messages.csv"
            className="bg-green-500 hover:bg-green-600 transition px-5 py-3 rounded-xl font-semibold"
          >
            Export CSV
          </CSVLink>

        </div>

        {/* Stats */}
        <StatsCards messages={messages} loading={loading} />

        {/* Analytics */}
        <AnalyticsChart messages={messages} />

        {/* Search */}
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        {/* Table */}
        <MessageTable
          loading={loading}
          filteredMessages={filteredMessages}
          handleDelete={handleDelete}
          handleStatusChange={handleStatusChange}
        />

      </div>
    </div>
  );
};

export default Dashboard;