import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaRobot,
  FaBriefcase,
  FaFileAlt,
  FaCalendarCheck,
  FaUser,
  FaExchangeAlt,
  FaChevronDown,
  FaSignOutAlt,
} from "react-icons/fa";
import { useUser } from "../../context/UserContext";
import AvatarUploader from "../UserMenu/AvatarUploader";
import SignOutDialog from "../UserMenu/SignOutDialog";

const candidateNavItems = [
  { path: "/candidate/home", label: "Browse Jobs", icon: FaBriefcase },
  { path: "/candidate/applications", label: "My Applications", icon: FaFileAlt },
  { path: "/candidate/interviews", label: "My Interviews", icon: FaCalendarCheck },
  { path: "/candidate/profile", label: "My Profile", icon: FaUser },
];

function CandidateTopNavbar() {
  const { candidateUser, switchPortal } = useUser();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSignOutOpen, setIsSignOutOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSwitchToRecruiter = () => {
    switchPortal("recruiter");
    navigate("/dashboard");
  };

  return (
    <>
      <header className="sticky top-0 z-50 h-[70px] bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs font-sans text-xs select-none">
        <div className="max-w-[1600px] w-full mx-auto h-full px-6 flex items-center justify-between gap-4">
          {/* LEFT: Logo & Candidate Portal Badge */}
          <div className="flex items-center gap-4 shrink-0">
            <NavLink to="/candidate/home" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-xs border border-purple-400/30 group-hover:bg-purple-700 transition-colors">
                <FaRobot />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-slate-900 text-base tracking-tight group-hover:text-purple-600 transition-colors">
                  HireSmart
                </span>
                <span className="text-[10px] font-extrabold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
                  Candidate Portal
                </span>
              </div>
            </NavLink>
          </div>

          {/* CENTER: Horizontal Candidate Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {candidateNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/candidate/home"}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                      isActive
                        ? "bg-purple-900 text-white shadow-2xs"
                        : "text-slate-600 hover:text-slate-900 hover:bg-purple-50/80"
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

          {/* RIGHT: Switch Portal CTA & Candidate Avatar Profile */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Switch to Recruiter Portal Button */}
            <button
              onClick={handleSwitchToRecruiter}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs border border-slate-200 transition-colors cursor-pointer"
            >
              <FaExchangeAlt className="text-xs text-blue-600" />
              <span>Switch to Recruiter</span>
            </button>

            {/* CANDIDATE AVATAR PROFILE POPOVER */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer group"
              >
                <div className="relative">
                  <AvatarUploader avatarUrl={null} name={candidateUser.name} size="sm" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
                </div>
                <div className="hidden lg:block text-left">
                  <div className="text-xs font-bold text-slate-900 leading-tight group-hover:text-purple-600 transition-colors">
                    {candidateUser.name}
                  </div>
                  <div className="text-[10px] text-slate-400 font-medium">
                    {candidateUser.role}
                  </div>
                </div>
                <FaChevronDown className={`text-slate-400 text-[10px] transition-transform duration-200 ${isProfileOpen ? "rotate-180 text-purple-600" : ""}`} />
              </button>

              {/* Profile Popover Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 top-12 w-64 bg-slate-900 text-white rounded-2xl shadow-2xl border border-slate-800 p-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150 space-y-1">
                  <div className="px-3 py-2 border-b border-slate-800 flex items-center gap-3">
                    <AvatarUploader avatarUrl={null} name={candidateUser.name} size="sm" />
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-slate-100 truncate text-xs">
                        {candidateUser.name}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">
                        {candidateUser.email}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-0.5 pt-1">
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        navigate("/candidate/profile");
                      }}
                      className="w-full px-3 py-2 hover:bg-slate-800 text-slate-200 hover:text-white rounded-lg flex items-center gap-2.5 transition-colors text-left font-medium cursor-pointer text-xs"
                    >
                      <FaUser className="text-purple-400 text-xs shrink-0" />
                      <span>My Candidate Profile</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        navigate("/candidate/applications");
                      }}
                      className="w-full px-3 py-2 hover:bg-slate-800 text-slate-200 hover:text-white rounded-lg flex items-center gap-2.5 transition-colors text-left font-medium cursor-pointer text-xs"
                    >
                      <FaFileAlt className="text-slate-400 text-xs shrink-0" />
                      <span>My Applications</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        handleSwitchToRecruiter();
                      }}
                      className="w-full px-3 py-2 hover:bg-slate-800 text-slate-200 hover:text-white rounded-lg flex items-center gap-2.5 transition-colors text-left font-medium cursor-pointer text-xs"
                    >
                      <FaExchangeAlt className="text-blue-400 text-xs shrink-0" />
                      <span>Switch to Recruiter Portal</span>
                    </button>
                  </div>

                  <div className="border-t border-slate-800 pt-1">
                    <button
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

      {/* Sign Out Confirmation Dialog */}
      <SignOutDialog
        isOpen={isSignOutOpen}
        onClose={() => setIsSignOutOpen(false)}
      />
    </>
  );
}

export default CandidateTopNavbar;
