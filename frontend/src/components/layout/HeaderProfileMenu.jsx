import React, { useState, useRef, useEffect } from "react";
import {
  FaUser,
  FaCog,
  FaBell,
  FaKeyboard,
  FaSun,
  FaQuestionCircle,
  FaInfoCircle,
  FaSignOutAlt,
  FaChevronDown,
  FaBuilding,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import MyProfileDrawer from "./MyProfileDrawer";

function HeaderProfileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  // Close dropdown on click outside or Esc key
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
      <div className="relative font-sans text-xs" ref={menuRef}>
        {/* Profile Pill Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-100 transition-all cursor-pointer group"
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs ring-2 ring-slate-200 group-hover:ring-blue-300 transition-all">
              TB
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
          </div>

          <div className="hidden xl:block text-left pr-1">
            <div className="text-xs font-bold text-slate-800 leading-tight group-hover:text-blue-600 transition-colors">
              Tanya Bhadana
            </div>
            <div className="text-[10px] text-slate-500 leading-tight font-medium">
              Senior Recruiter
            </div>
          </div>

          <FaChevronDown
            className={`text-[10px] text-slate-400 group-hover:text-slate-700 transition-transform duration-200 ${
              isOpen ? "rotate-180 text-blue-600" : "rotate-0"
            }`}
          />
        </button>

        {/* Enterprise Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 space-y-1">
            {/* Header User Card */}
            <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm ring-2 ring-slate-200">
                TB
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-900 truncate">Tanya Bhadana</p>
                <p className="text-[11px] text-slate-400 font-medium truncate">tanya@hiresmart.ai</p>
                <span className="px-1.5 py-0.2 text-[9px] font-bold bg-blue-50 text-blue-700 rounded border border-blue-200 inline-block mt-0.5">
                  Senior Recruiter
                </span>
              </div>
            </div>

            {/* Workspace Display */}
            <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between text-[11px]">
              <span className="text-slate-400 font-medium flex items-center gap-1.5">
                <FaBuilding className="text-slate-400 text-xs" />
                <span>Workspace:</span>
              </span>
              <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                HireSmart AI
              </span>
            </div>

            {/* Primary Actions */}
            <div className="py-1 space-y-0.5">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setIsProfileDrawerOpen(true);
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
                <span>Account Settings</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  navigate("/settings");
                }}
                className="w-full px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 transition-colors text-left font-medium cursor-pointer"
              >
                <FaBell className="text-slate-400 text-xs" />
                <span>Notification Preferences</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  alert("Keyboard Shortcuts:\n⌘K: Copilot Search\n⌘S: Schedule Interview\n⌘M: Move Stage");
                }}
                className="w-full px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center justify-between transition-colors text-left font-medium cursor-pointer"
              >
                <span className="flex items-center gap-2.5">
                  <FaKeyboard className="text-slate-400 text-xs" />
                  <span>Keyboard Shortcuts</span>
                </span>
                <kbd className="px-1.5 py-0.2 text-[9px] font-mono bg-slate-100 text-slate-500 rounded border border-slate-200">
                  ⌘/
                </kbd>
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-full px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 transition-colors text-left font-medium cursor-pointer"
              >
                <FaSun className="text-slate-400 text-xs" />
                <span>Appearance (Light)</span>
              </button>
            </div>

            {/* Secondary Support */}
            <div className="border-t border-slate-100 py-1 space-y-0.5">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  alert("HireSmart AI Support Desk: support@hiresmart.ai");
                }}
                className="w-full px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 transition-colors text-left font-medium cursor-pointer"
              >
                <FaQuestionCircle className="text-slate-400 text-xs" />
                <span>Help & Support</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  alert("HireSmart AI v2.4 Enterprise Recruiter OS");
                }}
                className="w-full px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 transition-colors text-left font-medium cursor-pointer"
              >
                <FaInfoCircle className="text-slate-400 text-xs" />
                <span>About HireSmart AI</span>
              </button>
            </div>

            {/* Sign Out */}
            <div className="border-t border-slate-100 pt-1">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-full px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2.5 transition-colors text-left font-semibold cursor-pointer"
              >
                <FaSignOutAlt className="text-xs" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* My Profile Drawer */}
      <MyProfileDrawer
        isOpen={isProfileDrawerOpen}
        onClose={() => setIsProfileDrawerOpen(false)}
      />
    </>
  );
}

export default HeaderProfileMenu;
