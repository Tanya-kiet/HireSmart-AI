import React, { useState } from "react";
import {
  FaTimes,
  FaVideo,
  FaRobot,
  FaStar,
  FaCheckCircle,
  FaExclamationTriangle,
  FaFileAlt,
  FaUserTie,
  FaCheck,
  FaBan,
  FaPauseCircle,
} from "react-icons/fa";

function InterviewDrawer({ interview, isOpen, onClose, onStatusChange }) {
  const [feedback, setFeedback] = useState({
    communication: 4,
    technical: 5,
    problemSolving: 4,
    cultureFit: 5,
    comments: "Demonstrated strong React 19 state isolation patterns and FastAPI async route design.",
    decision: "Hire",
  });

  if (!isOpen || !interview) return null;

  const handleSubmitScorecard = (e) => {
    e.preventDefault();
    onStatusChange(interview.id, "Completed");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans animate-fade-in text-xs">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs transition-opacity cursor-pointer"
        onClick={onClose}
      />

      {/* Side Drawer Container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-lg bg-white shadow-2xl border-l border-slate-200 flex flex-col justify-between overflow-hidden">
          {/* Drawer Header */}
          <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-xs">
                {interview.candidateName
                  ? interview.candidateName.split(" ").map((n) => n[0]).join("")
                  : "IN"}
              </div>
              <div>
                <h3 className="text-sm font-bold text-white tracking-tight">
                  {interview.candidateName}
                </h3>
                <p className="text-[11px] text-slate-400 font-medium">
                  {interview.jobRole} • {interview.round || "Technical Round"}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              <FaTimes className="text-sm" />
            </button>
          </div>

          {/* Drawer Body Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {/* 1. Meeting Join Banner */}
            <div className="p-3.5 bg-blue-600 text-white rounded-xl flex items-center justify-between shadow-2xs">
              <div className="space-y-0.5">
                <span className="font-bold block text-xs">Scheduled Session</span>
                <span className="text-[11px] opacity-90 block">
                  {interview.date || "Today"} at {interview.time || "02:00 PM PST"}
                </span>
              </div>

              {interview.meetingUrl ? (
                <a
                  href={interview.meetingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-white text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-1.5 shadow-2xs text-xs"
                >
                  <FaVideo className="text-xs" />
                  <span>Quick Join</span>
                </a>
              ) : (
                <span className="px-2.5 py-1 bg-blue-700 text-white font-semibold rounded text-[11px]">
                  Onsite Office
                </span>
              )}
            </div>

            {/* 2. Candidate Overview Card */}
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                <FaUserTie className="text-slate-500 text-xs" />
                <span>Candidate Dossier & Panel</span>
              </h4>

              <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                <div>
                  <span className="text-slate-400 font-medium block">Interviewer Panel:</span>
                  <span className="font-bold text-slate-800">{interview.interviewer}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-medium block">Candidate Match:</span>
                  <span className="font-bold text-emerald-600">94% Vector Fit</span>
                </div>
              </div>
            </div>

            {/* 3. AI Assistant Interview Intelligence */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center gap-1.5 font-bold text-slate-900 border-b border-slate-100 pb-2">
                <FaRobot className="text-blue-600 text-xs" />
                <span>AI Interview Intelligence & Suggested Criteria</span>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="font-bold text-slate-800 block text-[11px]">Candidate Background Summary:</span>
                  <p className="text-slate-600 font-medium leading-relaxed bg-slate-50 p-2 rounded border border-slate-100 text-[11px]">
                    "6+ years frontend engineering experience, architected React 19 micro-frontend systems with 40% performance gains."
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="font-bold text-slate-800 block text-[11px]">Suggested Technical Questions:</span>
                  <ul className="list-disc pl-4 text-slate-600 font-medium space-y-0.5 text-[11px]">
                    <li>How do you isolate global state in micro-frontend applications?</li>
                    <li>Describe how you optimize React 19 render performance under high DOM mutation.</li>
                  </ul>
                </div>

                <div className="p-2 bg-emerald-50 rounded border border-emerald-200 text-emerald-900 font-medium text-[11px] flex items-center gap-1.5">
                  <FaCheckCircle className="text-emerald-600 text-xs shrink-0" />
                  <span>Recommendation: Strong Hire (Matches 100% of core JD requirements)</span>
                </div>
              </div>
            </div>

            {/* 4. Scorecard Feedback Form */}
            <form onSubmit={handleSubmitScorecard} className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
              <h4 className="font-bold text-slate-900 border-b border-slate-100 pb-2">
                Submit Interviewer Scorecard
              </h4>

              {/* Score Sliders / Ratings */}
              <div className="grid grid-cols-2 gap-3 text-[11px]">
                {["communication", "technical", "problemSolving", "cultureFit"].map((key) => (
                  <div key={key} className="space-y-1">
                    <label className="font-bold text-slate-700 uppercase tracking-wider text-[10px] block">
                      {key.replace(/([A-Z])/g, " $1")} Rating
                    </label>
                    <select
                      value={feedback[key]}
                      onChange={(e) => setFeedback({ ...feedback, [key]: Number(e.target.value) })}
                      className="w-full px-2 py-1 bg-slate-50 border border-slate-200 rounded font-semibold text-slate-900 focus:outline-none"
                    >
                      <option value={5}>5 ★ - Exceptional</option>
                      <option value={4}>4 ★ - Strong</option>
                      <option value={3}>3 ★ - Acceptable</option>
                      <option value={2}>2 ★ - Marginal</option>
                      <option value={1}>1 ★ - Poor</option>
                    </select>
                  </div>
                ))}
              </div>

              {/* Comments */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700 uppercase tracking-wider text-[10px] block">
                  Interviewer Notes & Evaluation Comments
                </label>
                <textarea
                  rows={3}
                  value={feedback.comments}
                  onChange={(e) => setFeedback({ ...feedback, comments: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded text-slate-800 font-medium text-[11px] focus:outline-none"
                />
              </div>

              {/* Decision Radio Selector */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 uppercase tracking-wider text-[10px] block">
                  Final Hiring Decision Recommendation:
                </label>
                <div className="flex items-center gap-2">
                  {[
                    { id: "Hire", label: "Hire", icon: FaCheck, color: "bg-emerald-600 text-white" },
                    { id: "Hold", label: "Hold", icon: FaPauseCircle, color: "bg-amber-600 text-white" },
                    { id: "Reject", label: "Reject", icon: FaBan, color: "bg-rose-600 text-white" },
                  ].map((btn) => {
                    const Icon = btn.icon;
                    const isSelected = feedback.decision === btn.id;
                    return (
                      <button
                        key={btn.id}
                        type="button"
                        onClick={() => setFeedback({ ...feedback, decision: btn.id })}
                        className={`flex-1 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center justify-center gap-1 border ${
                          isSelected
                            ? `${btn.color} border-transparent shadow-2xs`
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        <Icon className="text-[10px]" />
                        <span>{btn.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-colors cursor-pointer shadow-2xs"
                >
                  Submit Scorecard & Complete Interview
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InterviewDrawer;
