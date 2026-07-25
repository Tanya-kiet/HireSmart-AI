import React, { useState, useRef, useEffect } from "react";
import {
  FaUser,
  FaCog,
  FaBell,
  FaExchangeAlt,
  FaSignOutAlt,
  FaChevronRight,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import MyProfileDrawer from "./MyProfileDrawer";

function SidebarProfilePopover() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const popoverRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
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
      <div className="relative font-sans text-xs" ref={popoverRef}>
        {/* Clickable Sidebar Footer Card */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-900 transition-colors cursor-pointer group select-none"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative shrink-0">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs ring-2 ring-slate-800 group-hover:ring-blue-500 transition-all">
                TB
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-950 rounded-full" />
            </div>

            <div className="text-left truncate">
              <div className="text-xs font-bold text-slate-200 group-hover:text-white transition-colors truncate">
                Tanya Bhadana
              </div>
              <div className="text-[10px] text-slate-400 font-medium truncate">
                Senior Recruiter
              </div>
            </div>
          </div>

          <FaChevronRight
            className={`text-slate-500 text-xs group-hover:text-slate-300 transition-transform duration-200 shrink-0 ${
              isOpen ? "-rotate-90 text-blue-400" : "rotate-0"
            }`}
          />
        </div>

        {/* Compact Popover Menu */}
        {isOpen && (
          <div className="absolute bottom-12 left-0 w-60 bg-slate-900 text-white rounded-2xl shadow-2xl border border-slate-800 p-3 z-50 animate-in fade-in slide-in-from-bottom-2 duration-150 space-y-2">
            <div className="px-2 py-1.5 border-b border-slate-800 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                TB
              </div>
              <div className="min-w-0">
                <span className="font-bold text-slate-100 block truncate text-xs">Tanya Bhadana</span>
                <span className="text-[10px] text-slate-400 font-medium block truncate">tanya@hiresmart.ai</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-0.5">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setIsProfileDrawerOpen(true);
                }}
                className="w-full px-2.5 py-1.5 hover:bg-slate-800 text-slate-200 hover:text-white rounded-lg flex items-center gap-2 transition-colors text-left font-medium cursor-pointer text-xs"
              >
                <FaUser className="text-blue-400 text-xs" />
                <span>My Profile</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  navigate("/settings");
                }}
                className="w-full px-2.5 py-1.5 hover:bg-slate-800 text-slate-200 hover:text-white rounded-lg flex items-center gap-2 transition-colors text-left font-medium cursor-pointer text-xs"
              >
                <FaCog className="text-slate-400 text-xs" />
                <span>Settings</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  navigate("/settings");
                }}
                className="w-full px-2.5 py-1.5 hover:bg-slate-800 text-slate-200 hover:text-white rounded-lg flex items-center gap-2 transition-colors text-left font-medium cursor-pointer text-xs"
              >
                <FaBell className="text-slate-400 text-xs" />
                <span>Notifications</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  alert("Workspace Switcher: HireSmart AI Enterprise");
                }}
                className="w-full px-2.5 py-1.5 hover:bg-slate-800 text-slate-200 hover:text-white rounded-lg flex items-center gap-2 transition-colors text-left font-medium cursor-pointer text-xs"
              >
                <FaExchangeAlt className="text-slate-400 text-xs" />
                <span>Switch Workspace</span>
              </button>
            </div>

            <div className="border-t border-slate-800 pt-1">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-full px-2.5 py-1.5 hover:bg-rose-950/60 text-rose-400 hover:text-rose-300 rounded-lg flex items-center gap-2 transition-colors text-left font-semibold cursor-pointer text-xs"
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

export default SidebarProfilePopover;
