import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaUsers,
  FaBriefcase,
  FaCalendarAlt,
  FaChartBar,
  FaCog,
  FaFileUpload,
  FaTimes,
  FaUserCheck,
} from "react-icons/fa";

function CommandPalette({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open triggered by keyboard
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    { id: "cands", label: "Search Candidates", path: "/candidates", icon: FaUsers, group: "Navigation" },
    { id: "upload", label: "Upload Resume PDF", path: "/candidates", icon: FaFileUpload, group: "Quick Actions" },
    { id: "sarah", label: "Jump to Sarah Chen (Senior Frontend Engineer)", path: "/candidate/cand-1", icon: FaUserCheck, group: "Candidates" },
    { id: "jobs", label: "Create or Manage Jobs", path: "/jobs", icon: FaBriefcase, group: "Navigation" },
    { id: "int", label: "Schedule New Interview", path: "/interviews", icon: FaCalendarAlt, group: "Quick Actions" },
    { id: "analytics", label: "Open Recruiter Analytics", path: "/analytics", icon: FaChartBar, group: "Navigation" },
    { id: "settings", label: "Recruiter Account Settings", path: "/settings", icon: FaCog, group: "System" },
  ];

  const filtered = actions.filter(
    (a) =>
      a.label.toLowerCase().includes(query.toLowerCase()) ||
      a.group.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-150 flex items-start justify-center pt-24 px-4">
      <div
        className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 space-y-0">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
          <FaSearch className="text-slate-400 text-sm shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Type a command or search candidates... (Press ESC to close)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden font-medium"
          />
          <kbd className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded-md text-[10px] font-mono border border-slate-200">
            ESC
          </kbd>
        </div>

        {/* Action Options List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs font-medium">
              No matching commands or candidates found.
            </div>
          ) : (
            filtered.map((action) => {
              const Icon = action.icon;
              return (
                <div
                  key={action.id}
                  onClick={() => handleSelect(action.path)}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-blue-50 text-slate-600 group-hover:text-blue-600 flex items-center justify-center text-xs transition-colors">
                      <Icon />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {action.label}
                      </h4>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {action.group}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] text-slate-400 font-mono font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Jump to →
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default CommandPalette;
