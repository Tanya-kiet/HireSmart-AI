import React, { useState, useMemo } from "react";
import MainLayout from "../components/layout/MainLayout";
import Breadcrumbs from "../components/common/Breadcrumbs";
import Alert from "../components/common/Alert";
import { useUser } from "../context/UserContext";
import {
  FaBell,
  FaCheckDouble,
  FaTrashAlt,
  FaSearch,
  FaUserCheck,
  FaCalendarCheck,
  FaBriefcase,
  FaChartBar,
  FaFileAlt,
  FaCheckCircle,
  FaFilter,
  FaEnvelopeOpen,
  FaEnvelope,
} from "react-icons/fa";

function NotificationsPage() {
  const {
    notifications,
    markNotificationRead,
    toggleNotificationRead,
    markAllNotificationsRead,
    deleteNotification,
    unreadCount,
  } = useUser();

  const [filterTab, setFilterTab] = useState("all"); // 'all' | 'unread'
  const [searchTerm, setSearchTerm] = useState("");
  const [alert, setAlert] = useState(null);

  const getCategoryIcon = (category) => {
    switch (category) {
      case "application":
        return <FaUserCheck className="text-purple-600 text-sm" />;
      case "interview":
        return <FaCalendarCheck className="text-blue-600 text-sm" />;
      case "job":
        return <FaBriefcase className="text-indigo-600 text-sm" />;
      case "analytics":
        return <FaChartBar className="text-emerald-600 text-sm" />;
      case "match":
        return <FaCheckCircle className="text-teal-600 text-sm" />;
      default:
        return <FaFileAlt className="text-slate-600 text-sm" />;
    }
  };

  const filteredNotifications = useMemo(() => {
    let result = [...notifications];

    if (filterTab === "unread") {
      result = result.filter((n) => n.unread);
    }

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.desc.toLowerCase().includes(q) ||
          n.group.toLowerCase().includes(q)
      );
    }

    return result;
  }, [notifications, filterTab, searchTerm]);

  // Group notifications into Today, Yesterday, Earlier
  const groupedTimeline = useMemo(() => {
    const groups = { Today: [], Yesterday: [], Earlier: [] };
    filteredNotifications.forEach((n) => {
      if (groups[n.group]) {
        groups[n.group].push(n);
      } else {
        groups["Earlier"].push(n);
      }
    });
    return groups;
  }, [filteredNotifications]);

  const handleDelete = (id, title) => {
    deleteNotification(id);
    setAlert({
      type: "info",
      title: "Notification Removed",
      message: `Notification "${title}" deleted.`,
    });
  };

  const handleMarkAllRead = () => {
    markAllNotificationsRead();
    setAlert({
      type: "success",
      title: "All Notifications Marked Read",
      message: "All items marked as read.",
    });
  };

  return (
    <MainLayout>
      <div className="space-y-6 max-w-[1600px] w-full mx-auto pb-16 font-sans">
        {/* Navigation Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "HireSmart AI", path: "/" },
            { label: "Notifications", path: "/notifications" },
          ]}
        />

        {/* Toast Alert */}
        {alert && (
          <Alert
            type={alert.type}
            title={alert.title}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center font-bold text-lg">
                <FaBell />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                  Notification Center
                </h1>
                <p className="text-xs text-slate-500 font-medium">
                  Stay updated on candidate applications, interview schedules, and platform activity.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="px-3.5 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-xl text-xs border border-blue-200 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <FaCheckDouble className="text-xs" />
                <span>Mark All as Read ({unreadCount})</span>
              </button>
            )}
          </div>
        </div>

        {/* Controls Bar: Filter Tabs & Search */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
            {/* Filter Tabs */}
            <div className="flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl">
              <button
                onClick={() => setFilterTab("all")}
                className={`px-4 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  filterTab === "all"
                    ? "bg-white text-slate-900 shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                All ({notifications.length})
              </button>

              <button
                onClick={() => setFilterTab("unread")}
                className={`px-4 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  filterTab === "unread"
                    ? "bg-white text-slate-900 shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Unread ({unreadCount})
              </button>
            </div>

            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-3.5 top-3 text-slate-400 text-xs" />
              <input
                type="text"
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-medium focus:outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* Timeline Grouped Notification Lists */}
        <div className="space-y-6">
          {["Today", "Yesterday", "Earlier"].map((groupName) => {
            const items = groupedTimeline[groupName];
            if (!items || items.length === 0) return null;

            return (
              <div key={groupName} className="space-y-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {groupName}
                  </h3>
                  <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                    {items.length}
                  </span>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs divide-y divide-slate-100 overflow-hidden">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className={`p-4 flex items-start justify-between gap-4 transition-colors hover:bg-slate-50 ${
                        item.unread ? "bg-blue-50/20" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3.5">
                        <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200/80">
                          {getCategoryIcon(item.category)}
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className={`text-xs font-bold ${item.unread ? "text-slate-900" : "text-slate-700"}`}>
                              {item.title}
                            </h4>
                            {item.unread && (
                              <span className="px-2 py-0.5 text-[9px] font-extrabold bg-blue-50 text-blue-700 rounded border border-blue-200 font-mono">
                                New
                              </span>
                            )}
                          </div>

                          <p className="text-xs text-slate-600 font-medium leading-relaxed">
                            {item.desc}
                          </p>

                          <span className="text-[10px] font-mono text-slate-400 block pt-0.5">
                            {item.time}
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-1.5 shrink-0 self-center">
                        <button
                          onClick={() => toggleNotificationRead(item.id)}
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                          title={item.unread ? "Mark as Read" : "Mark as Unread"}
                        >
                          {item.unread ? <FaEnvelope className="text-xs" /> : <FaEnvelopeOpen className="text-xs" />}
                        </button>

                        <button
                          onClick={() => handleDelete(item.id, item.title)}
                          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete notification"
                        >
                          <FaTrashAlt className="text-xs" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Empty State */}
          {filteredNotifications.length === 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3 shadow-2xs">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-lg mx-auto">
                <FaBell />
              </div>
              <h3 className="font-bold text-slate-800 text-sm">No Notifications Found</h3>
              <p className="text-xs text-slate-500 font-medium max-w-sm mx-auto">
                {searchTerm
                  ? `No notifications matching "${searchTerm}". Try a different keyword.`
                  : "All caught up! You have no pending notifications."}
              </p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}

export default NotificationsPage;
