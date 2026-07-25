import React from "react";
import {
  FaArrowRight,
  FaTimes,
  FaCalendarPlus,
  FaUserTie,
  FaFileExport,
  FaEnvelope,
  FaCheckSquare,
} from "react-icons/fa";

function BulkToolbar({
  selectedCount,
  onClearSelection,
  onBulkMoveStage,
  onBulkReject,
  onBulkSchedule,
  onBulkAssign,
  onBulkExport,
  onBulkEmail,
}) {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-800 flex flex-wrap items-center gap-3 animate-fade-in text-xs font-sans">
      <div className="flex items-center gap-2 border-r border-slate-700 pr-3">
        <FaCheckSquare className="text-blue-400 text-sm" />
        <span className="font-bold">{selectedCount} Candidates Selected</span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={onBulkMoveStage}
          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
        >
          <FaArrowRight className="text-[10px]" />
          <span>Move Stage</span>
        </button>

        <button
          onClick={onBulkSchedule}
          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 border border-slate-700"
        >
          <FaCalendarPlus className="text-[10px]" />
          <span>Schedule</span>
        </button>

        <button
          onClick={onBulkAssign}
          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 border border-slate-700"
        >
          <FaUserTie className="text-[10px]" />
          <span>Assign Recruiter</span>
        </button>

        <button
          onClick={onBulkExport}
          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 border border-slate-700"
        >
          <FaFileExport className="text-[10px]" />
          <span>Export</span>
        </button>

        <button
          onClick={onBulkEmail}
          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 border border-slate-700"
        >
          <FaEnvelope className="text-[10px]" />
          <span>Email</span>
        </button>

        <button
          onClick={onBulkReject}
          className="px-3 py-1.5 bg-rose-600/90 hover:bg-rose-700 text-white font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
        >
          <FaTimes className="text-[10px]" />
          <span>Reject</span>
        </button>
      </div>

      <button
        onClick={onClearSelection}
        className="ml-2 text-slate-400 hover:text-white underline text-[11px]"
      >
        Clear
      </button>
    </div>
  );
}

export default BulkToolbar;
