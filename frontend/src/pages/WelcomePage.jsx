import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import {
  FaRobot,
  FaUserTie,
  FaGraduationCap,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";

function WelcomePage() {
  const navigate = useNavigate();
  const { login } = useUser();

  const handleSelectRole = (role) => {
    login(role);
    if (role === "recruiter") {
      navigate("/dashboard");
    } else {
      navigate("/candidate/home");
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-900 text-slate-100 font-sans antialiased flex flex-col justify-between p-6 sm:p-12 relative overflow-hidden select-none">
      {/* Background Decorative Grid Accent */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* Top Header */}
      <div className="max-w-6xl w-full mx-auto flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-extrabold text-xl shadow-lg border border-blue-400/30">
            <FaRobot />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-black text-white text-xl tracking-tight">HireSmart</span>
            <span className="text-xs font-extrabold text-blue-400 bg-blue-950/80 px-2 py-0.5 rounded-md border border-blue-800">
              AI Enterprise
            </span>
          </div>
        </div>

        <span className="text-xs font-bold text-slate-400 hidden sm:inline-block">
          Select Your Workspace Portal
        </span>
      </div>

      {/* Hero Header & 2 Portal Cards */}
      <div className="max-w-5xl w-full mx-auto my-auto py-8 space-y-10 z-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            HireSmart AI
          </h1>
          <p className="text-sm sm:text-base text-slate-400 font-medium leading-relaxed">
            AI-powered recruitment platform for recruiters and candidates. Select your portal to continue.
          </p>
        </div>

        {/* 2 Large Role Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* 1. RECRUITER PORTAL CARD */}
          <div className="bg-slate-800/90 border border-slate-700/80 hover:border-blue-500 rounded-3xl p-8 space-y-6 flex flex-col justify-between transition-all duration-200 hover:shadow-2xl hover:shadow-blue-500/10 group">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center text-2xl border border-blue-500/30">
                  <FaUserTie />
                </div>
                <span className="px-3 py-1 text-xs font-bold bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20 font-mono">
                  Recruiter Portal
                </span>
              </div>

              <div>
                <h2 className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors">
                  Recruiter
                </h2>
                <p className="text-xs text-slate-400 font-medium mt-1 leading-relaxed">
                  Manage hiring, review candidates, create jobs, schedule interviews and analyse recruitment metrics.
                </p>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-300 font-medium pt-2">
                <li className="flex items-center gap-2.5">
                  <FaCheckCircle className="text-blue-400 text-xs shrink-0" />
                  <span>Review 1,420+ candidate pool with weighted match scoring</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <FaCheckCircle className="text-blue-400 text-xs shrink-0" />
                  <span>Create & publish job requisitions across 4 statuses</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <FaCheckCircle className="text-blue-400 text-xs shrink-0" />
                  <span>Schedule interview rounds & record multi-interviewer scorecards</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <FaCheckCircle className="text-blue-400 text-xs shrink-0" />
                  <span>Executive hiring throughput & conversion analytics</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleSelectRole("recruiter")}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl text-xs transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
            >
              <span>Continue as Recruiter</span>
              <FaArrowRight className="text-xs" />
            </button>
          </div>

          {/* 2. CANDIDATE PORTAL CARD */}
          <div className="bg-slate-800/90 border border-slate-700/80 hover:border-purple-500 rounded-3xl p-8 space-y-6 flex flex-col justify-between transition-all duration-200 hover:shadow-2xl hover:shadow-purple-500/10 group">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-purple-600/20 text-purple-400 flex items-center justify-center text-2xl border border-purple-500/30">
                  <FaGraduationCap />
                </div>
                <span className="px-3 py-1 text-xs font-bold bg-purple-500/10 text-purple-400 rounded-full border border-purple-500/20 font-mono">
                  Candidate Portal
                </span>
              </div>

              <div>
                <h2 className="text-2xl font-black text-white group-hover:text-purple-400 transition-colors">
                  Candidate
                </h2>
                <p className="text-xs text-slate-400 font-medium mt-1 leading-relaxed">
                  Browse jobs, apply online, track applications and manage interviews.
                </p>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-300 font-medium pt-2">
                <li className="flex items-center gap-2.5">
                  <FaCheckCircle className="text-purple-400 text-xs shrink-0" />
                  <span>Browse active enterprise job openings & requirements</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <FaCheckCircle className="text-purple-400 text-xs shrink-0" />
                  <span>One-click application submission with resume upload</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <FaCheckCircle className="text-purple-400 text-xs shrink-0" />
                  <span>Real-time status tracking across 10 recruitment stages</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <FaCheckCircle className="text-purple-400 text-xs shrink-0" />
                  <span>View recruiter feedback & technical evaluation notes</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleSelectRole("candidate")}
              className="w-full py-3.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-2xl text-xs transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-purple-600/20"
            >
              <span>Continue as Candidate</span>
              <FaArrowRight className="text-xs" />
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-6xl w-full mx-auto text-center text-xs text-slate-500 font-medium z-10 pt-4">
        HireSmart AI Enterprise Recruitment Ecosystem • Dual Role Authentication
      </div>
    </div>
  );
}

export default WelcomePage;
