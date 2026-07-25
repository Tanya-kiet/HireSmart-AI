import React from "react";
import Button from "../common/Button";
import {
  FaCalendarPlus,
  FaCheck,
  FaTimes,
  FaFilePdf,
  FaChevronLeft,
  FaArrowRight,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ProfileHeader({ candidateName, onAction }) {
  const navigate = useNavigate();

  return (
    <div className="space-y-3">
      {/* Recruiter Priority Action Banner */}
      <div className="p-3 bg-blue-50/80 rounded-2xl border border-blue-100 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-blue-900 bg-blue-100 px-2.5 py-0.5 rounded-lg border border-blue-200">
            Recommended Action
          </span>
          <span className="text-slate-800 font-medium truncate">
            Schedule Technical Round 2 with Alex Mercer (Tech Lead)
          </span>
        </div>

        <button
          onClick={() => onAction("schedule")}
          className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 shrink-0 cursor-pointer"
        >
          <span>Schedule Now</span>
          <FaArrowRight className="text-[10px]" />
        </button>
      </div>

      {/* Main Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/candidates")}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer border border-slate-200"
            title="Back to Candidates"
          >
            <FaChevronLeft className="text-xs" />
          </button>

          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              {candidateName} Profile
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Candidate evaluation history, competency radar, and resume parsing breakdown.
            </p>
          </div>
        </div>

        {/* Quick Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={FaFilePdf}
            onClick={() => onAction("report")}
          >
            Export PDF
          </Button>
          <Button
            variant="danger"
            size="sm"
            icon={FaTimes}
            onClick={() => onAction("reject")}
          >
            Reject
          </Button>
          <Button
            variant="secondary"
            size="sm"
            icon={FaCheck}
            onClick={() => onAction("shortlist")}
          >
            Shortlist
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={FaCalendarPlus}
            onClick={() => onAction("schedule")}
          >
            Schedule Interview
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
