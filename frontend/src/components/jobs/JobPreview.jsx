import React from "react";
import Badge from "../common/Badge";
import Button from "../common/Button";
import {
  FaTimes,
  FaBriefcase,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaUsers,
  FaRobot,
  FaCheckCircle,
  FaCopy,
} from "react-icons/fa";

function JobPreview({ job, isOpen, onClose }) {
  if (!isOpen || !job) return null;

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case "Open":
        return "emerald";
      case "Closed":
        return "rose";
      default:
        return "slate";
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-lg sm:max-w-xl bg-white shadow-2xl border-l border-slate-200 flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Badge variant={getStatusBadgeVariant(job.status)} size="sm" dot>
                  {job.status}
                </Badge>
                <span className="text-xs font-semibold text-slate-500">
                  {job.department}
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 tracking-tight mt-1">
                {job.title}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {job.company || "HireSmart AI"} • {job.location} ({job.workType})
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              <FaTimes className="text-base" />
            </button>
          </div>

          {/* Scrollable Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Meta Grid */}
            <div className="grid grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200/70 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 font-medium uppercase block">
                  Salary Range
                </span>
                <span className="font-extrabold text-slate-900 mt-0.5 block truncate">
                  {job.salaryRange}
                </span>
              </div>
              <div className="border-l border-slate-200 pl-3">
                <span className="text-[10px] text-slate-400 font-medium uppercase block">
                  Experience
                </span>
                <span className="font-extrabold text-slate-900 mt-0.5 block truncate">
                  {job.experience}
                </span>
              </div>
              <div className="border-l border-slate-200 pl-3">
                <span className="text-[10px] text-slate-400 font-medium uppercase block">
                  Applications
                </span>
                <span className="font-extrabold text-blue-600 mt-0.5 block truncate">
                  {job.applications} Applied
                </span>
              </div>
            </div>

            {/* AI Summary Card */}
            <div className="space-y-1.5 p-4 bg-blue-50/60 rounded-2xl border border-blue-100">
              <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900 uppercase tracking-wider">
                <FaRobot className="text-blue-600" />
                <span>AI Job Profile Summary</span>
              </div>
              <p className="text-xs text-slate-800 leading-relaxed font-semibold">
                "{job.aiSummary || `This position requires a ${job.title} with skills in ${job.skills?.slice(0, 3).join(", ")} and cloud deployment experience.`}"
              </p>
            </div>

            {/* Skills Required */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Required Skill Stack
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {job.skills?.map((skill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-800 text-xs font-semibold rounded-xl border border-blue-200/80"
                  >
                    <FaCheckCircle className="text-blue-600 text-[10px]" />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Responsibilities */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Responsibilities
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200/60 font-medium">
                {job.responsibilities}
              </p>
            </div>

            {/* Qualifications */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Qualifications & Requirements
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200/60 font-medium">
                {job.qualifications}
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Perks & Benefits
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200/60 font-medium">
                {job.benefits}
              </p>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-4 border-t border-slate-200 bg-slate-50/80 flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              icon={FaCopy}
              onClick={() => alert("Job Description copied to clipboard!")}
            >
              Copy JD Link
            </Button>
            <Button variant="primary" size="sm" onClick={onClose}>
              Close Preview
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobPreview;
