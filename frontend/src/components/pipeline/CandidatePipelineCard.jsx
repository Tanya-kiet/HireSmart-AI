import React from "react";
import {
  FaClock,
  FaUserTie,
  FaBriefcase,
  FaChevronRight,
  FaCheck,
  FaCalendarCheck,
  FaExclamationCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function CandidatePipelineCard({
  candidate,
  onMoveStage,
  isSelected,
  onToggleSelect,
}) {
  const navigate = useNavigate();

  const getPriorityPill = () => {
    if (candidate.stuckTooLong) {
      return (
        <span className="px-2 py-0.5 text-[10px] font-bold bg-rose-50 text-rose-700 rounded border border-rose-200 flex items-center gap-1">
          <FaClock className="text-[9px]" />
          <span>Stuck {candidate.daysInStage}d</span>
        </span>
      );
    }
    if (candidate.interviewToday) {
      return (
        <span className="px-2 py-0.5 text-[10px] font-bold bg-purple-50 text-purple-700 rounded border border-purple-200 flex items-center gap-1">
          <FaCalendarCheck className="text-[9px]" />
          <span>Interview Today</span>
        </span>
      );
    }
    if (candidate.stage === "Offer") {
      return (
        <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-50 text-emerald-700 rounded border border-emerald-200">
          Offer Pending
        </span>
      );
    }
    if (candidate.matchScore >= 90) {
      return (
        <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-50 text-blue-700 rounded border border-blue-200">
          High Match
        </span>
      );
    }
    return null;
  };

  return (
    <div
      className={`bg-white border rounded-xl p-3.5 shadow-2xs space-y-3 transition-all ${
        isSelected
          ? "border-blue-500 ring-2 ring-blue-100 bg-blue-50/20"
          : "border-slate-200 hover:border-slate-300"
      }`}
    >
      {/* Header Info Row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onToggleSelect(candidate.id)}
            className="rounded text-blue-600 focus:ring-0 cursor-pointer shrink-0 mt-0.5"
          />

          {candidate.photo ? (
            <img
              src={candidate.photo}
              alt={candidate.name}
              className="w-9 h-9 rounded-lg object-cover border border-slate-200 shrink-0"
            />
          ) : (
            <div className="w-9 h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
              {candidate.name.split(" ").map((n) => n[0]).join("")}
            </div>
          )}

          <div className="min-w-0">
            <span
              onClick={() => navigate(`/candidate/${candidate.id}`)}
              className="font-bold text-xs text-slate-900 hover:text-blue-600 transition-colors truncate block cursor-pointer"
            >
              {candidate.name}
            </span>
            <p className="text-[11px] text-slate-500 font-medium truncate">
              {candidate.role}
            </p>
          </div>
        </div>

        <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-50 text-emerald-700 rounded border border-emerald-200 shrink-0">
          {candidate.matchScore}% Match
        </span>
      </div>

      {/* Applied Job Info & Priority */}
      <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/70 text-[11px] space-y-1">
        <div className="flex items-center justify-between gap-2">
          <span
            onClick={() => navigate(`/jobs/${candidate.appliedJobId}`)}
            className="font-bold text-slate-800 hover:text-blue-600 truncate flex items-center gap-1 cursor-pointer"
            title={candidate.appliedJobTitle}
          >
            <FaBriefcase className="text-slate-400 text-[10px] shrink-0" />
            <span className="truncate">{candidate.appliedJobTitle}</span>
          </span>
        </div>

        <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium">
          <span>Exp: <strong className="text-slate-700">{candidate.experience}</strong></span>
          <span>ATS: <strong className="text-slate-700">{candidate.atsScore}%</strong></span>
        </div>
      </div>

      {/* Footer Details: Recruiter & Days in Stage */}
      <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium pt-0.5">
        <span className="flex items-center gap-1 truncate max-w-[120px]" title={candidate.recruiter}>
          <FaUserTie className="text-slate-400 text-[9px] shrink-0" />
          <span className="truncate">{candidate.recruiter}</span>
        </span>

        {getPriorityPill()}
      </div>

      {/* Quick Action Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px]">
        <button
          type="button"
          onClick={() => onMoveStage(candidate)}
          className="font-bold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
        >
          Move Stage →
        </button>

        <button
          type="button"
          onClick={() => navigate(`/candidate/${candidate.id}`)}
          className="text-slate-500 hover:text-slate-900 font-semibold transition-colors cursor-pointer"
        >
          Profile
        </button>
      </div>
    </div>
  );
}

export default CandidatePipelineCard;
