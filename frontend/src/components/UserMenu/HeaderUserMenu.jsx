import React, { useState, useRef, useEffect } from "react";
import { FaUser, FaCog, FaBell, FaSignOutAlt, FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import AvatarUploader from "./AvatarUploader";
import ProfileDrawer from "./ProfileDrawer";
import NotificationPanel from "./NotificationPanel";
import SignOutDialog from "./SignOutDialog";

function HeaderUserMenu() {
  const { user, unreadCount } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
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
      <div className="flex items-center gap-2 font-sans text-xs">
        {/* Notifications Icon Button */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="View notifications"
          >
            <FaBell className="text-base" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white" />
            )}
          </button>

          {/* Notification Panel */}
          <NotificationPanel
            isOpen={isNotifOpen}
            onClose={() => setIsNotifOpen(false)}
          />
        </div>

        {/* Profile Trigger Button */}
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-100 transition-all cursor-pointer group"
          >
            <AvatarUploader avatarUrl={user.avatar} name={user.name} size="sm" />

            <div className="hidden xl:block text-left pr-1">
              <div className="text-xs font-bold text-slate-800 leading-tight group-hover:text-blue-600 transition-colors">
                {user.name}
              </div>
              <div className="text-[10px] text-slate-500 leading-tight font-medium">
                {user.role || user.jobTitle}
              </div>
            </div>

            <FaChevronDown
              className={`text-[10px] text-slate-400 group-hover:text-slate-700 transition-transform duration-200 ${
                isOpen ? "rotate-180 text-blue-600" : "rotate-0"
              }`}
            />
          </button>

          {/* Compact Dropdown Menu (360px max width) */}
          {isOpen && (
            <div className="absolute right-0 mt-2 w-[360px] bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 space-y-1">
              {/* User Summary Header */}
              <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-3">
                <AvatarUploader avatarUrl={user.avatar} name={user.name} size="md" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-900 truncate">{user.name}</p>
                    <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>Online</span>
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-medium truncate">{user.email}</p>
                  <p className="text-[10px] text-slate-500 font-medium">{user.role || user.jobTitle}</p>
                </div>
              </div>

              {/* Menu Items (Strictly ONLY 4) */}
              <div className="py-1 space-y-0.5">
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    setIsProfileOpen(true);
                  }}
                  className="w-full px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 transition-colors text-left font-medium cursor-pointer"
                >
                  <FaUser className="text-slate-400 text-xs" />
                  <span>My Profile</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    navigate("/settings");
                  }}
                  className="w-full px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 transition-colors text-left font-medium cursor-pointer"
                >
                  <FaCog className="text-slate-400 text-xs" />
                  <span>Settings</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    setIsNotifOpen(true);
                  }}
                  className="w-full px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center justify-between transition-colors text-left font-medium cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <FaBell className="text-slate-400 text-xs" />
                    <span>Notifications</span>
                  </span>
                  {unreadCount > 0 && (
                    <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-1.5 py-0.2 rounded border border-blue-100">
                      {unreadCount}
                    </span>
                  )}
                </button>
              </div>

              {/* Sign Out Action */}
              <div className="border-t border-slate-100 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    setIsSignOutOpen(true);
                  }}
                  className="w-full px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2.5 transition-colors text-left font-semibold cursor-pointer"
                >
                  <FaSignOutAlt className="text-xs" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Profile Drawer */}
      <ProfileDrawer
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />

      {/* Sign Out Confirmation Dialog */}
      <SignOutDialog
        isOpen={isSignOutOpen}
        onClose={() => setIsSignOutOpen(false)}
      />
    </>
  );
}

export default HeaderUserMenu;
