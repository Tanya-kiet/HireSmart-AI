import React, { useState, useRef, useEffect } from "react";
import {
  FaEllipsisV,
  FaCalendarPlus,
  FaCheck,
  FaTimes,
  FaUser,
  FaCalendarAlt,
} from "react-icons/fa";

function InterviewTable({
  interviews,
  onViewDetails,
  onReschedule,
  onMarkComplete,
  onCancel,
  onScheduleClick,
}) {
  const [activeMenuId, setActiveMenuId] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setActiveMenuId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case "Scheduled":
        return "bg-blue-50 text-blue-800 border-blue-200";
      case "Completed":
        return "bg-emerald-50 text-emerald-800 border-emerald-200";
      case "Rescheduled":
        return "bg-amber-50 text-amber-800 border-amber-200";
      case "Cancelled":
        return "bg-rose-50 text-rose-800 border-rose-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  if (interviews.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center font-sans space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center text-xl mx-auto">
          <FaCalendarAlt />
        </div>
        <h3 className="text-sm font-bold text-slate-900">No interviews scheduled</h3>
        <p className="text-xs text-slate-500 font-medium max-w-sm mx-auto">
          No interview sessions match your search or filter selection. Schedule a new interview or import your calendar.
        </p>
        <div className="flex items-center justify-center gap-2 pt-2">
          <button
            onClick={onScheduleClick}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
          >
            Schedule Interview
          </button>
          <button
            onClick={onScheduleClick}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors cursor-pointer"
          >
            Import Calendar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden font-sans">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              <th className="py-3 px-4">Candidate</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Interviewer</th>
              <th className="py-3 px-4">Date & Time</th>
              <th className="py-3 px-4">Stage</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {interviews.map((item) => (
              <tr
                key={item.id}
                onClick={() => onViewDetails(item)}
                className="hover:bg-slate-50/90 transition-colors cursor-pointer group"
              >
                {/* Candidate Avatar & Name */}
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl ${
                        item.avatarBg || "bg-blue-600"
                      } text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs`}
                    >
                      {item.candidateName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <span className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                      {item.candidateName}
                    </span>
                  </div>
                </td>

                {/* Role */}
                <td className="py-3.5 px-4 font-semibold text-slate-800">
                  {item.jobRole || item.role}
                </td>

                {/* Interviewer */}
                <td className="py-3.5 px-4 font-medium text-slate-700">
                  {item.interviewer}
                </td>

                {/* Date & Time */}
                <td className="py-3.5 px-4 font-mono font-medium text-slate-700">
                  {item.date || "Jul 28, 2026"} • {item.time || "02:00 PM"}
                </td>

                {/* Stage */}
                <td className="py-3.5 px-4 font-semibold text-slate-800">
                  {item.round || item.stage || "Technical Round"}
                </td>

                {/* Status Badge */}
                <td className="py-3.5 px-4">
                  <span
                    className={`px-2.5 py-0.5 text-[10px] font-bold rounded border ${getStatusBadgeStyle(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </td>

                {/* Actions (Overflow Menu •••) */}
                <td className="py-3.5 px-4 text-right">
                  <div
                    className="relative inline-block text-left"
                    ref={activeMenuId === item.id ? menuRef : null}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveMenuId(activeMenuId === item.id ? null : item.id)}
                      className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      <FaEllipsisV className="text-xs" />
                    </button>

                    {activeMenuId === item.id && (
                      <div className="absolute right-0 mt-1 w-44 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-40 text-left animate-in fade-in duration-100">
                        <button
                          onClick={() => {
                            setActiveMenuId(null);
                            onViewDetails(item);
                          }}
                          className="w-full px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 font-medium cursor-pointer"
                        >
                          <FaUser className="text-slate-400 text-xs" />
                          <span>View Details</span>
                        </button>

                        <button
                          onClick={() => {
                            setActiveMenuId(null);
                            onReschedule(item);
                          }}
                          className="w-full px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 font-medium cursor-pointer"
                        >
                          <FaCalendarPlus className="text-slate-400 text-xs" />
                          <span>Reschedule</span>
                        </button>

                        <button
                          onClick={() => {
                            setActiveMenuId(null);
                            onMarkComplete(item.id, "Completed");
                          }}
                          className="w-full px-3 py-2 text-xs text-emerald-700 hover:bg-emerald-50 flex items-center gap-2 font-semibold cursor-pointer"
                        >
                          <FaCheck className="text-emerald-500 text-xs" />
                          <span>Mark Complete</span>
                        </button>

                        <div className="border-t border-slate-100 my-1" />

                        <button
                          onClick={() => {
                            setActiveMenuId(null);
                            onCancel(item);
                          }}
                          className="w-full px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-semibold cursor-pointer"
                        >
                          <FaTimes className="text-rose-500 text-xs" />
                          <span>Cancel Interview</span>
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InterviewTable;
