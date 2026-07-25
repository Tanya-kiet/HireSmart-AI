import React, { useState } from "react";
import { FaSearch, FaFileUpload, FaBars, FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";
import AICopilotDrawer from "../ai/AICopilotDrawer";
import NotificationPanel from "../UserMenu/NotificationPanel";
import { useUser } from "../../context/UserContext";

function Navbar({ onToggleSidebar }) {
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const { user, unreadCount } = useUser();
  const navigate = useNavigate();

  const firstName = user.name ? user.name.split(" ")[0] : "Tanya";

  return (
    <>
      {/* Top Navbar Header */}
      <header className="fixed top-0 right-0 left-0 lg:left-[280px] h-[80px] bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs z-30 px-6 flex items-center justify-between transition-all font-sans">
        {/* Left Section: Greeting */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 lg:hidden transition-colors cursor-pointer"
            aria-label="Toggle Navigation"
          >
            <FaBars className="text-lg" />
          </button>

          <div>
            <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Good Morning, {firstName}.
            </h1>
          </div>
        </div>

        {/* Right Section: Command Search (⌘K), Upload Resume, Notifications Bell (NO Header Profile) */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Command Search Trigger (⌘K) */}
          <button
            onClick={() => setIsCopilotOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 bg-slate-100/80 hover:bg-slate-100 text-slate-500 hover:text-slate-800 text-xs rounded-xl border border-slate-200/70 transition-all w-44 sm:w-80 justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-2 truncate">
              <FaSearch className="text-slate-400 group-hover:text-blue-600 transition-colors shrink-0" />
              <span className="truncate">Ask Copilot or search...</span>
            </div>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-white rounded-md border border-slate-200 shadow-2xs">
              ⌘K
            </kbd>
          </button>

          {/* Quick Upload Button */}
          <Button
            variant="primary"
            size="sm"
            icon={FaFileUpload}
            onClick={() => navigate("/upload")}
            className="hidden md:inline-flex"
          >
            Upload Resume
          </Button>

          {/* Notifications Bell */}
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
        </div>
      </header>

      {/* Global AI Copilot Drawer Triggered by ⌘K */}
      <AICopilotDrawer
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
      />
    </>
  );
}

export default Navbar;