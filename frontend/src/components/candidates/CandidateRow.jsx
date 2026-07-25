import React, { useState, useRef, useEffect } from "react";
import CandidateStatusBadge from "./CandidateStatusBadge";
import CandidateRecommendation from "./CandidateRecommendation";
import {
  FaEllipsisV,
  FaUser,
  FaCalendarPlus,
  FaCheck,
  FaTimes,
  FaEnvelope,
  FaDownload,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function CandidateRow({
  candidate,
  isSelected,
  onToggleSelect,
  onAction,
}) {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getMatchBadgeStyle = (score) => {
    if (score >= 90) return "bg-emerald-50 text-emerald-800 border-emerald-200";
    if (score >= 80) return "bg-blue-50 text-blue-800 border-blue-200";
    return "bg-slate-100 text-slate-800 border-slate-200";
  };

  const getMatchLabel = (score) => {
    if (score >= 90) return "Strong Match";
    if (score >= 80) return "Good Match";
    return "Potential Match";
  };

  return (
    <tr
      onClick={() => navigate(`/candidate/${candidate.id}`)}
      className={`hover:bg-slate-50/90 transition-colors cursor-pointer group text-xs ${
        isSelected ? "bg-blue-50/30" : ""
      }`}
    >
      {/* Checkbox & Candidate Avatar/Name/Email */}
      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => {
              e.stopPropagation();
              onToggleSelect(candidate.id);
            }}
            onClick={(e) => e.stopPropagation()}
            className="rounded text-blue-600 focus:ring-0 cursor-pointer shrink-0"
          />

          {candidate.photo ? (
            <img
              src={candidate.photo}
              alt={candidate.name}
              className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0"
            />
          ) : (
            <div
              className={`w-10 h-10 rounded-xl ${
                candidate.avatarBg || "bg-slate-900"
              } text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs`}
            >
              {candidate.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
          )}

          <div className="min-w-0">
            <span className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors block text-xs truncate">
              {candidate.name}
            </span>
            <span className="text-[11px] text-slate-400 font-medium truncate block">
              {candidate.email}
            </span>
          </div>
        </div>
      </td>

      {/* Applied Role */}
      <td className="py-4 px-4 font-medium text-slate-800">
        <span className="truncate block max-w-[200px]">{candidate.role}</span>
      </td>

      {/* Experience */}
      <td className="py-4 px-4 font-medium text-slate-700">
        {candidate.experience || "4 Years"}
      </td>

      {/* Match % + Recommendation Popover */}
      <td className="py-4 px-4">
        <div className="flex items-center gap-2">
          <span
            className={`px-2 py-0.5 text-[11px] font-extrabold rounded border ${getMatchBadgeStyle(
              candidate.matchScore || candidate.match || 88
            )}`}
          >
            {candidate.matchScore || candidate.match || 88}% {getMatchLabel(candidate.matchScore || candidate.match || 88)}
          </span>

          <CandidateRecommendation candidate={candidate} />
        </div>
      </td>

      {/* Current Stage */}
      <td className="py-4 px-4">
        <CandidateStatusBadge status={candidate.status} />
      </td>

      {/* Actions (Hover Quick Actions + Overflow Menu ⋮) */}
      <td className="py-4 px-4 text-right">
        <div className="flex items-center justify-end gap-1.5" ref={menuRef}>
          {/* Hover Quick Actions */}
          <div className="hidden sm:flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onAction("schedule", candidate);
              }}
              className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
              title="Schedule Interview"
            >
              <FaCalendarPlus />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onAction("shortlist", candidate);
              }}
              className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded transition-colors"
              title="Shortlist"
            >
              <FaCheck />
            </button>
          </div>

          {/* Compact Overflow Menu Trigger (⋮) */}
          <div className="relative">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(!showMenu);
              }}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              title="Actions"
            >
              <FaEllipsisV className="text-xs" />
            </button>

            {/* Overflow Dropdown */}
            {showMenu && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute right-0 mt-1 w-44 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-40 text-left animate-in fade-in duration-100"
              >
                <button
                  onClick={() => {
                    setShowMenu(false);
                    navigate(`/candidate/${candidate.id}`);
                  }}
                  className="w-full px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition-colors cursor-pointer font-medium"
                >
                  <FaUser className="text-slate-400 text-xs" />
                  <span>View Profile</span>
                </button>

                <button
                  onClick={() => {
                    setShowMenu(false);
                    onAction("schedule", candidate);
                  }}
                  className="w-full px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition-colors cursor-pointer font-medium"
                >
                  <FaCalendarPlus className="text-slate-400 text-xs" />
                  <span>Schedule Interview</span>
                </button>

                <button
                  onClick={() => {
                    setShowMenu(false);
                    onAction("shortlist", candidate);
                  }}
                  className="w-full px-3 py-2 text-xs text-emerald-700 hover:bg-emerald-50 flex items-center gap-2 transition-colors cursor-pointer font-semibold"
                >
                  <FaCheck className="text-emerald-500 text-xs" />
                  <span>Shortlist</span>
                </button>

                <button
                  onClick={() => {
                    setShowMenu(false);
                    onAction("email", candidate);
                  }}
                  className="w-full px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition-colors cursor-pointer font-medium"
                >
                  <FaEnvelope className="text-slate-400 text-xs" />
                  <span>Send Email</span>
                </button>

                <button
                  onClick={() => {
                    setShowMenu(false);
                    onAction("download", candidate);
                  }}
                  className="w-full px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition-colors cursor-pointer font-medium"
                >
                  <FaDownload className="text-slate-400 text-xs" />
                  <span>Download Resume</span>
                </button>

                <div className="border-t border-slate-100 my-1" />

                <button
                  onClick={() => {
                    setShowMenu(false);
                    onAction("reject", candidate);
                  }}
                  className="w-full px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition-colors cursor-pointer font-semibold"
                >
                  <FaTimes className="text-rose-500 text-xs" />
                  <span>Reject Candidate</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </td>
    </tr>
  );
}

export default CandidateRow;
