import React from "react";
import {
  FaUser,
  FaCalendarPlus,
  FaArrowRight,
  FaCheck,
  FaTimes,
  FaDownload,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ActionToolbar({ candidateId, onSchedule, onMoveStage, onShortlist, onReject, onDownload }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100 text-[11px] font-sans">
      {candidateId && (
        <button
          onClick={() => navigate(`/candidate/${candidateId}`)}
          className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-md transition-colors cursor-pointer flex items-center gap-1"
        >
          <FaUser className="text-[10px]" />
          <span>View Profile</span>
        </button>
      )}

      <button
        onClick={onSchedule}
        className="px-2 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-md transition-colors cursor-pointer flex items-center gap-1"
      >
        <FaCalendarPlus className="text-[10px]" />
        <span>Schedule</span>
      </button>

      <button
        onClick={onMoveStage}
        className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-md transition-colors cursor-pointer flex items-center gap-1"
      >
        <FaArrowRight className="text-[10px]" />
        <span>Move Stage</span>
      </button>

      <button
        onClick={onShortlist}
        className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold rounded-md transition-colors cursor-pointer flex items-center gap-1"
      >
        <FaCheck className="text-[10px]" />
        <span>Shortlist</span>
      </button>

      <button
        onClick={onDownload}
        className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-md transition-colors cursor-pointer flex items-center gap-1"
      >
        <FaDownload className="text-[10px]" />
        <span>Download</span>
      </button>

      <button
        onClick={onReject}
        className="px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold rounded-md transition-colors cursor-pointer flex items-center gap-1"
      >
        <FaTimes className="text-[10px]" />
        <span>Reject</span>
      </button>
    </div>
  );
}

export default ActionToolbar;
