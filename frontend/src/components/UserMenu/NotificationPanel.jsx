import React, { useRef, useEffect } from "react";
import { FaBell, FaCheckDouble } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

function NotificationPanel({ isOpen, onClose }) {
  const { notifications, markAllNotificationsRead, unreadCount } = useUser();
  const navigate = useNavigate();
  const panelRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        onClose();
      }
    }
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={panelRef}
      className="absolute right-0 mt-2 w-[360px] bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 font-sans text-xs"
    >
      {/* Header */}
      <div className="px-4 py-2.5 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FaBell className="text-slate-500 text-xs" />
          <span className="font-bold text-slate-900">Notifications</span>
          {unreadCount > 0 && (
            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
              {unreadCount} New
            </span>
          )}
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllNotificationsRead}
            className="text-[10px] font-bold text-slate-500 hover:text-blue-600 flex items-center gap-1 cursor-pointer transition-colors"
          >
            <FaCheckDouble className="text-[9px]" />
            <span>Mark all read</span>
          </button>
        )}
      </div>

      {/* Notifications List (Max 8) */}
      <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
        {notifications.slice(0, 8).map((n) => (
          <div
            key={n.id}
            className={`p-3 text-left hover:bg-slate-50 transition-colors cursor-pointer ${
              n.unread ? "bg-blue-50/20" : ""
            }`}
          >
            <div className="flex items-start justify-between">
              <span className={`font-bold ${n.unread ? "text-slate-900" : "text-slate-700"}`}>
                {n.title}
              </span>
              <span className="text-[10px] text-slate-400 font-mono shrink-0 ml-2">
                {n.time}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5 font-medium leading-normal">
              {n.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Footer Link */}
      <div className="p-2 border-t border-slate-100 text-center">
        <button
          onClick={() => {
            onClose();
            navigate("/notifications");
          }}
          className="w-full py-1.5 text-xs text-blue-600 hover:text-blue-700 font-bold hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
        >
          View All Notifications
        </button>
      </div>
    </div>
  );
}

export default NotificationPanel;
