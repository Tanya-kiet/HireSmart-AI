import React from "react";
import { FaBriefcase, FaMapMarkerAlt, FaUsers, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function JobResultCard({ job }) {
  const navigate = useNavigate();

  if (!job) return null;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs space-y-2.5 font-sans text-xs">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h4
            onClick={() => navigate(`/jobs/${job.id}`)}
            className="font-bold text-slate-900 hover:text-blue-600 cursor-pointer text-xs"
          >
            {job.title}
          </h4>
          <p className="text-[11px] text-slate-500 font-medium">{job.department} • {job.location}</p>
        </div>

        <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-50 text-emerald-700 rounded border border-emerald-200">
          {job.status}
        </span>
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-600 font-medium pt-1 border-t border-slate-100">
        <span>Salary: <strong className="text-slate-800">{job.salaryRange}</strong></span>
        <span className="font-extrabold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
          {job.applications} Applications
        </span>
      </div>

      <div className="flex justify-end pt-1">
        <button
          onClick={() => navigate(`/jobs/${job.id}`)}
          className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg text-[11px] transition-colors cursor-pointer flex items-center gap-1"
        >
          <span>Open Workspace</span>
          <FaChevronRight className="text-[9px]" />
        </button>
      </div>
    </div>
  );
}

export default JobResultCard;
