import React, { useState, useRef, useEffect } from "react";
import { FaUser, FaBell, FaSignOutAlt, FaChevronUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import AvatarUploader from "./AvatarUploader";
import NotificationPanel from "./NotificationPanel";
import SignOutDialog from "./SignOutDialog";

function SidebarUserMenu() {
  const { user, unreadCount } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isSignOutOpen, setIsSignOutOpen] = useState(false);

  const navigate = useNavigate();
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
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
      <div className="relative font-sans text-xs" ref={menuRef}>
        {/* Clickable Sidebar Trigger Card */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-900 transition-all cursor-pointer group select-none"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative shrink-0">
              <AvatarUploader avatarUrl={user.avatar} name={user.name} size="sm" />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-950 rounded-full" />
            </div>

            <div className="text-left truncate">
              <div className="text-xs font-bold text-slate-200 group-hover:text-white transition-colors truncate">
                {user.name}
              </div>
              <div className="text-[10px] text-slate-400 font-medium truncate">
                {user.role || user.jobTitle}
              </div>
            </div>
          </div>

          <FaChevronUp
            className={`text-slate-500 text-xs group-hover:text-slate-300 transition-transform duration-200 shrink-0 ${
              isOpen ? "rotate-180 text-blue-400" : "rotate-0"
            }`}
          />
        </div>

        {/* Compact Popover Menu (340px wide, positioned above profile card) */}
        {isOpen && (
          <div className="absolute bottom-14 left-0 w-[340px] bg-slate-900 text-white rounded-2xl shadow-2xl border border-slate-800 p-3 z-50 animate-in fade-in slide-in-from-bottom-2 duration-150 space-y-2">
            {/* Popover Header Card */}
            <div className="px-2 py-2 border-b border-slate-800/80 flex items-center gap-3">
              <AvatarUploader avatarUrl={user.avatar} name={user.name} size="md" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-100 block truncate text-xs">
                    {user.name}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>Online</span>
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 font-medium block truncate">
                  {user.email}
                </span>
                <span className="text-[10px] text-slate-400 font-medium block truncate">
                  {user.role || user.jobTitle}
                </span>
              </div>
            </div>

            {/* Menu Actions (ONLY 3 Items) */}
            <div className="space-y-0.5 pt-0.5">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  navigate("/profile");
                }}
                className="w-full px-3 py-2 hover:bg-slate-800 text-slate-200 hover:text-white rounded-lg flex items-center gap-2.5 transition-colors text-left font-medium cursor-pointer text-xs"
              >
                <FaUser className="text-blue-400 text-xs shrink-0" />
                <span>My Profile</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setIsNotifOpen(true);
                }}
                className="w-full px-3 py-2 hover:bg-slate-800 text-slate-200 hover:text-white rounded-lg flex items-center justify-between transition-colors text-left font-medium cursor-pointer text-xs"
              >
                <span className="flex items-center gap-2.5">
                  <FaBell className="text-slate-400 text-xs shrink-0" />
                  <span>Notifications</span>
                </span>
                {unreadCount > 0 && (
                  <span className="text-[10px] font-bold bg-blue-500/20 text-blue-300 px-1.5 py-0.2 rounded border border-blue-500/30">
                    {unreadCount}
                  </span>
                )}
              </button>
            </div>

            {/* Sign Out Confirmation Action */}
            <div className="border-t border-slate-800 pt-1">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
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

        {/* Notification Panel Triggered from Popover */}
        <NotificationPanel
          isOpen={isNotifOpen}
          onClose={() => setIsNotifOpen(false)}
        />
      </div>

      {/* Sign Out Confirmation Dialog */}
      <SignOutDialog
        isOpen={isSignOutOpen}
        onClose={() => setIsSignOutOpen(false)}
      />
    </>
  );
}

export default SidebarUserMenu;
