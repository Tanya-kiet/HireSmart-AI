import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaBriefcase,
  FaCalendarAlt,
  FaChartBar,
  FaCog,
  FaRobot,
  FaTimes,
  FaChevronRight,
} from "react-icons/fa";
import SidebarUserMenu from "../UserMenu/SidebarUserMenu";

const menuItems = [
  { icon: FaHome, label: "Dashboard", path: "/" },
  { icon: FaUsers, label: "Candidates", path: "/candidates", count: "1,420" },
  { icon: FaBriefcase, label: "Jobs", path: "/jobs", badge: "12 Open" },
  { icon: FaCalendarAlt, label: "Interviews", path: "/interviews", badge: "8 Soon" },
  { icon: FaChartBar, label: "Analytics", path: "/analytics" },
];

function Sidebar({ isOpen = true, onClose }) {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Fixed Sidebar: 280px width, 100vh height, fixed positioning */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-40 w-[280px] h-screen bg-slate-950 text-slate-300 border-r border-slate-800/80 flex flex-col justify-between transition-transform duration-300 ease-in-out select-none overflow-hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
          {/* Company Logo Section */}
          <div className="h-[72px] px-6 flex items-center justify-between border-b border-slate-800/80 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-xs border border-blue-400/30">
                <FaRobot />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-slate-50 text-base tracking-tight">
                    HireSmart
                  </span>
                  <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded-md border border-blue-500/20">
                    AI
                  </span>
                </div>
                <p className="text-[10px] font-medium text-slate-400 tracking-wider uppercase">
                  Enterprise Recruiter OS
                </p>
              </div>
            </div>

            {/* Mobile Close Button */}
            {onClose && (
              <button
                onClick={onClose}
                className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/80 transition-colors"
                aria-label="Close sidebar"
              >
                <FaTimes className="text-base" />
              </button>
            )}
          </div>

          {/* Navigation Menu */}
          <div className="p-4 space-y-1 flex-1 overflow-hidden">
            <div className="px-3 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Navigation
            </div>
            <nav className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.label}
                    to={item.path}
                    onClick={() => {
                      if (onClose) onClose();
                    }}
                    className={({ isActive }) =>
                      `group relative flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-blue-600 text-white font-semibold shadow-xs"
                          : "text-slate-400 hover:text-slate-100 hover:bg-slate-900/90"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <div className="flex items-center gap-3">
                          <Icon
                            className={`text-sm transition-transform duration-200 group-hover:scale-110 ${
                              isActive ? "text-white" : "text-slate-400 group-hover:text-slate-200"
                            }`}
                          />
                          <span>{item.label}</span>
                        </div>

                        {item.badge && (
                          <span
                            className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${
                              isActive
                                ? "bg-white/20 text-white"
                                : "bg-slate-800 text-slate-300 border border-slate-700/60"
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}

                        {item.count && !isActive && (
                          <span className="text-[10px] text-slate-500 font-mono font-medium">
                            {item.count}
                          </span>
                        )}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Enterprise User Profile Footer */}
        <div className="p-4 border-t border-slate-800/80 shrink-0 bg-slate-950">
          <SidebarUserMenu />
        </div>
      </aside>
    </>
  );
}

export default Sidebar;