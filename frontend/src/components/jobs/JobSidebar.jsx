import React from "react";
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaDollarSign,
  FaUsers,
  FaUserTie,
  FaCalendarAlt,
  FaEdit,
  FaCopy,
  FaArchive,
  FaShareAlt,
  FaClock,
  FaChevronLeft,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function JobSidebar({ job, onEdit, onDuplicate, onArchive, onShare }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-5 sticky top-6">
      {/* Back Button & Status Badge */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <button
          onClick={() => navigate("/jobs")}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors cursor-pointer"
        >
          <FaChevronLeft className="text-[10px]" />
          <span>All Jobs</span>
        </button>

        <span
          className={`px-2.5 py-0.5 text-xs font-bold rounded-md border uppercase ${
            job.status === "Open"
              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
              : "bg-slate-100 text-slate-600 border-slate-200"
          }`}
        >
          {job.status || "Open"}
        </span>
      </div>

      {/* Header Title */}
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight leading-snug">
          {job.title}
        </h2>
        <p className="text-xs text-slate-500 font-semibold">
          {job.company || "HireSmart AI"} • {job.department}
        </p>
      </div>

      {/* Key Metadata List */}
      <div className="space-y-3 pt-1 text-xs text-slate-700 border-t border-slate-100 font-medium">
        <div className="flex items-center justify-between">
          <span className="text-slate-400 flex items-center gap-1.5">
            <FaMapMarkerAlt className="text-slate-400 text-xs" />
            Location:
          </span>
          <span className="font-semibold text-slate-800 text-right">{job.location}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-400 flex items-center gap-1.5">
            <FaBriefcase className="text-slate-400 text-xs" />
            Employment:
          </span>
          <span className="font-semibold text-slate-800">{job.employmentType}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-400 flex items-center gap-1.5">
            <FaDollarSign className="text-slate-400 text-xs" />
            Salary Range:
          </span>
          <span className="font-bold text-slate-900">{job.salaryRange}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-400 flex items-center gap-1.5">
            <FaUsers className="text-slate-400 text-xs" />
            Applications:
          </span>
          <span className="px-2 py-0.5 bg-blue-50 text-blue-700 font-bold rounded border border-blue-200">
            {job.applications} Applicants
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-400 flex items-center gap-1.5">
            <FaUserTie className="text-slate-400 text-xs" />
            Hiring Manager:
          </span>
          <span className="font-semibold text-slate-800 text-right max-w-[140px] truncate" title={job.hiringManager}>
            {job.hiringManager}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-400 flex items-center gap-1.5">
            <FaUserTie className="text-slate-400 text-xs" />
            Recruiter:
          </span>
          <span className="font-semibold text-slate-800 text-right max-w-[140px] truncate" title={job.recruiter}>
            {job.recruiter}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-400 flex items-center gap-1.5">
            <FaCalendarAlt className="text-slate-400 text-xs" />
            Closing Date:
          </span>
          <span className="font-semibold text-slate-800">{job.closingDate || "Aug 30, 2026"}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-400 flex items-center gap-1.5">
            <FaClock className="text-slate-400 text-xs" />
            Created On:
          </span>
          <span className="font-semibold text-slate-800">{job.createdDate}</span>
        </div>
      </div>

      {/* Primary Action Buttons */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <button
          onClick={onEdit}
          className="w-full px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-2xs"
        >
          <FaEdit className="text-xs" />
          <span>Edit Job</span>
        </button>

        <div className="grid grid-cols-3 gap-1.5">
          <button
            onClick={onDuplicate}
            className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold rounded-lg border border-slate-200 text-xs transition-colors cursor-pointer flex items-center justify-center gap-1"
            title="Duplicate Job"
          >
            <FaCopy className="text-xs" />
            <span className="hidden sm:inline">Duplicate</span>
          </button>

          <button
            onClick={onShare}
            className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold rounded-lg border border-slate-200 text-xs transition-colors cursor-pointer flex items-center justify-center gap-1"
            title="Share Job Link"
          >
            <FaShareAlt className="text-xs" />
            <span className="hidden sm:inline">Share</span>
          </button>

          <button
            onClick={onArchive}
            className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold rounded-lg border border-rose-200 text-xs transition-colors cursor-pointer flex items-center justify-center gap-1"
            title="Archive Job"
          >
            <FaArchive className="text-xs" />
            <span className="hidden sm:inline">Archive</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobSidebar;
