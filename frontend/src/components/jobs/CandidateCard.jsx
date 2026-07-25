import React from "react";
import {
  FaCheckCircle,
  FaCalendarPlus,
  FaUser,
  FaExchangeAlt,
  FaChevronRight,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function CandidateCard({
  candidate,
  onSelectCompare,
  isSelectedForCompare,
  onSchedule,
  compact = false,
}) {
  const navigate = useNavigate();

  return (
    <div
      className={`bg-white border rounded-xl p-3.5 shadow-2xs space-y-3 transition-all ${
        isSelectedForCompare
          ? "border-blue-500 ring-2 ring-blue-100 bg-blue-50/20"
          : "border-slate-200 hover:border-slate-300"
      }`}
    >
      {/* Header Info */}
      <div className="flex items-start justify-between gap-2">
        <div
          onClick={() => navigate(`/candidate/${candidate.id}`)}
          className="flex items-center gap-2.5 cursor-pointer group min-w-0"
        >
          {candidate.photo ? (
            <img
              src={candidate.photo}
              alt={candidate.name}
              className="w-9 h-9 rounded-lg object-cover border border-slate-200 shrink-0"
            />
          ) : (
            <div className="w-9 h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
              {candidate.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
          )}

          <div className="min-w-0">
            <h4 className="font-bold text-xs text-slate-900 group-hover:text-blue-600 transition-colors truncate">
              {candidate.name}
            </h4>
            <p className="text-[11px] text-slate-500 font-medium truncate">
              {candidate.role}
            </p>
          </div>
        </div>

        <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-50 text-emerald-700 rounded border border-emerald-200 shrink-0">
          {candidate.matchScore}% Match
        </span>
      </div>

      {/* Experience & ATS Score Row */}
      <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1 border-t border-slate-100 font-medium">
        <span>Exp: <strong className="text-slate-800">{candidate.experience}</strong></span>
        <span>ATS: <strong className="text-slate-800">{candidate.atsScore}%</strong></span>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between gap-1.5 pt-1">
        {onSelectCompare && (
          <button
            type="button"
            onClick={() => onSelectCompare(candidate)}
            className={`px-2 py-1 rounded text-[10px] font-bold transition-colors cursor-pointer flex items-center gap-1 ${
              isSelectedForCompare
                ? "bg-blue-600 text-white"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700"
            }`}
          >
            <FaExchangeAlt className="text-[9px]" />
            <span>{isSelectedForCompare ? "Selected" : "Compare"}</span>
          </button>
        )}

        <div className="flex items-center gap-1 ml-auto">
          {onSchedule && (
            <button
              type="button"
              onClick={() => onSchedule(candidate)}
              className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors cursor-pointer"
              title="Schedule Interview"
            >
              <FaCalendarPlus className="text-xs" />
            </button>
          )}

          <button
            type="button"
            onClick={() => navigate(`/candidate/${candidate.id}`)}
            className="px-2 py-1 text-[10px] font-bold text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded border border-slate-200 flex items-center gap-1 cursor-pointer"
          >
            <span>Profile</span>
            <FaChevronRight className="text-[8px]" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CandidateCard;
