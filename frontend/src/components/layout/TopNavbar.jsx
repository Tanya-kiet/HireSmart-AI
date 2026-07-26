import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaRobot,
  FaHome,
  FaUsers,
  FaBriefcase,
  FaCalendarAlt,
  FaChartBar,
  FaSearch,
  FaFileUpload,
  FaBell,
  FaUser,
  FaQuestionCircle,
  FaSignOutAlt,
  FaChevronDown,
} from "react-icons/fa";
import { useUser } from "../../context/UserContext";
import AICopilotDrawer from "../ai/AICopilotDrawer";
import NotificationPanel from "../UserMenu/NotificationPanel";
import SignOutDialog from "../UserMenu/SignOutDialog";
import AvatarUploader from "../UserMenu/AvatarUploader";
import Alert from "../common/Alert";

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: FaHome },
  { path: "/candidates", label: "Candidates", icon: FaUsers },
  { path: "/jobs", label: "Jobs", icon: FaBriefcase },
  { path: "/interviews", label: "Interviews", icon: FaCalendarAlt },
  { path: "/analytics", label: "Analytics", icon: FaChartBar },
];

function TopNavbar() {
  const { user, unreadCount } = useUser();
  const navigate = useNavigate();

  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSignOutOpen, setIsSignOutOpen] = useState(false);
  const [alert, setAlert] = useState(null);

  const profileRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsProfileOpen(false);
        setIsNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 h-[70px] bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs font-sans text-xs select-none">
        <div className="max-w-[1600px] w-full mx-auto h-full px-6 flex items-center justify-between gap-4">
          {/* LEFT: Logo & Product Name */}
          <div className="flex items-center gap-6 shrink-0">
            <NavLink to="/dashboard" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-xs border border-blue-400/30 group-hover:bg-blue-700 transition-colors">
                <FaRobot />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-slate-900 text-base tracking-tight group-hover:text-blue-600 transition-colors">
                  HireSmart
                </span>
                <span className="text-[10px] font-extrabold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-md border border-blue-200">
                  AI
                </span>
              </div>
            </NavLink>
          </div>

          {/* CENTER: Horizontal Navigation Menu Items */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                      isActive
                        ? "bg-slate-900 text-white shadow-2xs"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon className={`text-xs ${isActive ? "text-white" : "text-slate-400"}`} />
                      <span>{item.label}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* RIGHT: Search (⌘K), Quick Add, Notifications, Avatar Profile */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Global Search / Command Palette Trigger (⌘K) */}
            <button
              onClick={() => setIsCopilotOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-100/80 hover:bg-slate-100 text-slate-500 hover:text-slate-800 text-xs rounded-xl border border-slate-200/80 transition-all w-36 lg:w-64 justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-2 truncate">
                <FaSearch className="text-slate-400 group-hover:text-blue-600 transition-colors shrink-0 text-xs" />
                <span className="truncate">Search or ask...</span>
              </div>
              <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[9px] font-mono text-slate-400 bg-white rounded border border-slate-200 shadow-2xs">
                ⌘K
              </kbd>
            </button>

            {/* Quick Add / Upload Resume CTA */}
            <button
              onClick={() => navigate("/upload")}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer shadow-2xs"
            >
              <FaFileUpload className="text-xs" />
              <span>Upload Resume</span>
            </button>

            {/* Notifications Bell */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="View notifications"
              >
                <FaBell className="text-sm" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white" />
                )}
              </button>

              <NotificationPanel
                isOpen={isNotifOpen}
                onClose={() => setIsNotifOpen(false)}
              />
            </div>

            {/* SINGLE RECRUITER AVATAR PROFILE DROPDOWN */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer group"
              >
                <div className="relative">
                  <AvatarUploader avatarUrl={user.avatar} name={user.name} size="sm" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
                </div>
                <div className="hidden lg:block text-left">
                  <div className="text-xs font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
                    {user.name}
                  </div>
                  <div className="text-[10px] text-slate-400 font-medium">
                    {user.role || user.jobTitle}
                  </div>
                </div>
                <FaChevronDown className={`text-slate-400 text-[10px] transition-transform duration-200 ${isProfileOpen ? "rotate-180 text-blue-600" : ""}`} />
              </button>

              {/* Single Profile Popover Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 top-12 w-64 bg-slate-900 text-white rounded-2xl shadow-2xl border border-slate-800 p-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150 space-y-1">
                  {/* Profile Header */}
                  <div className="px-3 py-2 border-b border-slate-800 flex items-center gap-3">
                    <AvatarUploader avatarUrl={user.avatar} name={user.name} size="sm" />
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-slate-100 truncate text-xs">
                        {user.name}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">
                        {user.email}
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="space-y-0.5 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setIsProfileOpen(false);
                        navigate("/profile");
                      }}
                      className="w-full px-3 py-2 hover:bg-slate-800 text-slate-200 hover:text-white rounded-lg flex items-center gap-2.5 transition-colors text-left font-medium cursor-pointer text-xs"
                    >
                      <FaUser className="text-blue-400 text-xs shrink-0" />
                      <span>My Profile & Preferences</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setIsProfileOpen(false);
                        navigate("/help");
                      }}
                      className="w-full px-3 py-2 hover:bg-slate-800 text-slate-200 hover:text-white rounded-lg flex items-center gap-2.5 transition-colors text-left font-medium cursor-pointer text-xs"
                    >
                      <FaQuestionCircle className="text-slate-400 text-xs shrink-0" />
                      <span>Help & Documentation</span>
                    </button>
                  </div>

                  {/* Sign Out */}
                  <div className="border-t border-slate-800 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setIsProfileOpen(false);
                        setIsSignOutOpen(true);
                      }}
                      className="w-full px-3 py-2 hover:bg-rose-950/60 text-rose-400 hover:text-rose-300 rounded-lg flex items-center gap-2.5 transition-colors text-left font-semibold cursor-pointer text-xs"
                    >
                      <FaSignOutAlt className="text-xs shrink-0" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Global AI Copilot Drawer */}
      <AICopilotDrawer
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
      />

      {/* Sign Out Confirmation Dialog */}
      <SignOutDialog
        isOpen={isSignOutOpen}
        onClose={() => setIsSignOutOpen(false)}
      />

      {/* Help Toast Alert */}
      {alert && (
        <Alert
          type={alert.type}
          title={alert.title}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
    </>
  );
}

export default TopNavbar;
