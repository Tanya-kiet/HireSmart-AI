import React from "react";
import Modal from "../ui/Modal";
import Badge from "../ui/Badge";
import { FaCheckCircle, FaStar, FaBalanceScale, FaTachometerAlt, FaAward, FaUserCheck } from "react-icons/fa";

function CandidateComparisonModal({ isOpen, onClose, candidates = [] }) {
  if (!isOpen) return null;

  const candA = candidates[0];
  const candB = candidates[1];

  // Empty state if less than 2 candidates selected
  if (!candA || !candB) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Candidate Comparison" maxWidth="max-w-md">
        <div className="p-6 text-center space-y-3 font-sans text-xs">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl mx-auto border border-blue-100">
            <FaBalanceScale />
          </div>
          <h3 className="text-sm font-bold text-slate-900">Compare Candidates</h3>
          <p className="text-slate-500 font-medium">
            Select two candidates from the candidate pool to compare their skills, experience, and ATS performance side-by-side.
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
          >
            Got it
          </button>
        </div>
      </Modal>
    );
  }

  // Determine winners for score highlighting
  const isAtsWinnerA = candA.atsScore >= candB.atsScore;
  const isMatchWinnerA = candA.matchScore >= candB.matchScore;
  const isExpWinnerA = (candA.experienceYears || 0) >= (candB.experienceYears || 0);

  // Dynamic Synthesis Statement
  const getSynthesis = () => {
    if (candA.matchScore > candB.matchScore && isExpWinnerA) {
      return `${candA.name} demonstrates higher overall vector match (${candA.matchScore}%) and more experience (${candA.experience}).`;
    }
    if (candB.matchScore > candA.matchScore && !isExpWinnerA) {
      return `${candB.name} demonstrates higher overall vector match (${candB.matchScore}%) and more experience (${candB.experience}).`;
    }
    if (candA.matchScore > candB.matchScore) {
      return `${candA.name} leads in vector match (${candA.matchScore}% vs ${candB.matchScore}%), while ${candB.name} brings ${candB.experience} of experience.`;
    }
    return `${candB.name} leads in vector match (${candB.matchScore}% vs ${candA.matchScore}%), while ${candA.name} brings ${candA.experience} of experience.`;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Dynamic Side-by-Side Candidate Comparison"
      maxWidth="max-w-3xl"
    >
      <div className="space-y-4 font-sans text-xs">
        {/* Candidate Headers */}
        <div className="grid grid-cols-2 gap-4 text-center pb-3 border-b border-slate-100">
          {/* Candidate A */}
          <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/80 space-y-1">
            <div
              className={`w-11 h-11 rounded-2xl ${
                candA.avatarBg || "bg-blue-600"
              } text-white flex items-center justify-center font-bold text-sm mx-auto shadow-2xs`}
            >
              {candA.name
                ? candA.name.split(" ").map((n) => n[0]).join("")
                : "CA"}
            </div>
            <h4 className="font-extrabold text-slate-900 text-sm truncate">{candA.name}</h4>
            <p className="text-[11px] text-slate-500 font-semibold truncate">{candA.targetRole || candA.role}</p>
            <span className="text-[10px] text-slate-400 font-medium block">{candA.location || "San Francisco, CA"}</span>
          </div>

          {/* Candidate B */}
          <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/80 space-y-1">
            <div
              className={`w-11 h-11 rounded-2xl ${
                candB.avatarBg || "bg-purple-600"
              } text-white flex items-center justify-center font-bold text-sm mx-auto shadow-2xs`}
            >
              {candB.name
                ? candB.name.split(" ").map((n) => n[0]).join("")
                : "CB"}
            </div>
            <h4 className="font-extrabold text-slate-900 text-sm truncate">{candB.name}</h4>
            <p className="text-[11px] text-slate-500 font-semibold truncate">{candB.targetRole || candB.role}</p>
            <span className="text-[10px] text-slate-400 font-medium block">{candB.location || "New York, NY"}</span>
          </div>
        </div>

        {/* Vector Match Score Row */}
        <div className="grid grid-cols-2 gap-4 p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-center font-semibold">
          <div className={`p-2 rounded-lg transition-colors ${isMatchWinnerA ? "bg-emerald-50 text-emerald-900 border border-emerald-200" : ""}`}>
            <span className="text-[10px] text-slate-400 block uppercase font-bold">Vector Match Score</span>
            <span className={`text-lg font-black ${isMatchWinnerA ? "text-emerald-700" : "text-slate-800"}`}>
              {candA.matchScore}% {isMatchWinnerA && "★"}
            </span>
          </div>
          <div className={`p-2 rounded-lg transition-colors border-l border-slate-200 ${!isMatchWinnerA ? "bg-emerald-50 text-emerald-900 border border-emerald-200" : ""}`}>
            <span className="text-[10px] text-slate-400 block uppercase font-bold">Vector Match Score</span>
            <span className={`text-lg font-black ${!isMatchWinnerA ? "text-emerald-700" : "text-slate-800"}`}>
              {candB.matchScore}% {!isMatchWinnerA && "★"}
            </span>
          </div>
        </div>

        {/* ATS Score Row */}
        <div className="grid grid-cols-2 gap-4 p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-center font-semibold">
          <div className={`p-2 rounded-lg transition-colors ${isAtsWinnerA ? "bg-emerald-50 text-emerald-900 border border-emerald-200" : ""}`}>
            <span className="text-[10px] text-slate-400 block uppercase font-bold">ATS Parser Score</span>
            <span className={`text-base font-black ${isAtsWinnerA ? "text-emerald-700" : "text-slate-800"}`}>
              {candA.atsScore}%
            </span>
          </div>
          <div className={`p-2 rounded-lg transition-colors border-l border-slate-200 ${!isAtsWinnerA ? "bg-emerald-50 text-emerald-900 border border-emerald-200" : ""}`}>
            <span className="text-[10px] text-slate-400 block uppercase font-bold">ATS Parser Score</span>
            <span className={`text-base font-black ${!isAtsWinnerA ? "text-emerald-700" : "text-slate-800"}`}>
              {candB.atsScore}%
            </span>
          </div>
        </div>

        {/* Experience Row */}
        <div className="grid grid-cols-2 gap-4 p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-center font-semibold">
          <div className={`p-2 rounded-lg ${isExpWinnerA ? "bg-emerald-50 text-emerald-900 border border-emerald-200" : ""}`}>
            <span className="text-[10px] text-slate-400 block uppercase font-bold">Experience</span>
            <span className="text-xs font-bold text-slate-900">{candA.experience}</span>
          </div>
          <div className={`p-2 rounded-lg border-l border-slate-200 ${!isExpWinnerA ? "bg-emerald-50 text-emerald-900 border border-emerald-200" : ""}`}>
            <span className="text-[10px] text-slate-400 block uppercase font-bold">Experience</span>
            <span className="text-xs font-bold text-slate-900">{candB.experience}</span>
          </div>
        </div>

        {/* Core Technical Skills Chips */}
        <div className="grid grid-cols-2 gap-4 p-3 bg-slate-50 rounded-xl border border-slate-200/70">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Technical Skills</span>
            <div className="flex flex-wrap gap-1 pt-0.5">
              {(candA.skills || ["React", "TypeScript", "Node.js"]).map((s, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 text-[10px] font-bold bg-blue-50 text-blue-700 rounded border border-blue-200"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-1 border-l border-slate-200 pl-3">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Technical Skills</span>
            <div className="flex flex-wrap gap-1 pt-0.5">
              {(candB.skills || ["Python", "PyTorch", "FastAPI"]).map((s, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 text-[10px] font-bold bg-purple-50 text-purple-700 rounded border border-purple-200"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic AI Comparative Synthesis Statement */}
        <div className="p-3.5 bg-blue-50 rounded-xl border border-blue-200 space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-blue-900 text-xs">
            <FaUserCheck className="text-blue-600 text-xs" />
            <span>AI Comparative Synthesis</span>
          </div>
          <p className="text-slate-700 font-medium leading-relaxed text-[11px]">
            {getSynthesis()}
          </p>
        </div>
      </div>
    </Modal>
  );
}

export default CandidateComparisonModal;
