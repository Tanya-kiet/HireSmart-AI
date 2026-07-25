import React from "react";
import {
  FaTimes,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFileDownload,
  FaCheckCircle,
  FaExclamationTriangle,
  FaRobot,
  FaUserCheck,
  FaUserTimes,
  FaCalendarAlt,
  FaBriefcase,
} from "react-icons/fa";
import Badge from "../common/Badge";
import Button from "../common/Button";

function CandidateProfileDrawer({ candidate, isOpen, onClose, onUpdateStatus }) {
  if (!isOpen || !candidate) return null;

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case "Shortlisted":
        return "emerald";
      case "Interview":
        return "purple";
      case "Screened":
        return "blue";
      case "Pending":
        return "amber";
      case "Rejected":
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

      {/* Side Drawer Canvas */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md sm:max-w-lg bg-white shadow-2xl border-l border-slate-200 flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div
                className={`w-14 h-14 rounded-2xl ${candidate.avatarBg} text-white flex items-center justify-center font-extrabold text-xl ring-4 ring-white shadow-xs`}
              >
                {candidate.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                  {candidate.name}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {candidate.predictedCategory}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant={getStatusBadgeVariant(candidate.status)} size="sm" dot>
                    {candidate.status}
                  </Badge>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {candidate.experience}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              <FaTimes className="text-base" />
            </button>
          </div>

          {/* Scrollable Content Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* ATS Metric Box */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white flex items-center justify-between border border-slate-800">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-blue-400 font-semibold mb-1">
                  <FaRobot />
                  <span>AI Vector ATS Score</span>
                </div>
                <div className="text-3xl font-extrabold text-white">
                  {candidate.atsScore}%
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  Evaluated against target domain parameters
                </div>
              </div>

              <div className="w-14 h-14 rounded-full border-4 border-emerald-500 flex items-center justify-center text-emerald-400 font-extrabold text-base bg-emerald-500/10">
                {candidate.atsScore >= 90 ? "A+" : candidate.atsScore >= 80 ? "A" : "B"}
              </div>
            </div>

            {/* Candidate Info Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 flex items-center gap-2.5">
                <FaEnvelope className="text-blue-600 text-sm shrink-0" />
                <span className="truncate font-medium text-slate-700">
                  {candidate.email}
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 flex items-center gap-2.5">
                <FaPhone className="text-emerald-600 text-sm shrink-0" />
                <span className="truncate font-medium text-slate-700">
                  {candidate.phone}
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 flex items-center gap-2.5">
                <FaMapMarkerAlt className="text-rose-600 text-sm shrink-0" />
                <span className="truncate font-medium text-slate-700">
                  {candidate.location}
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 flex items-center gap-2.5">
                <FaBriefcase className="text-purple-600 text-sm shrink-0" />
                <span className="truncate font-medium text-slate-700">
                  {candidate.filename}
                </span>
              </div>
            </div>

            {/* Professional Summary */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Professional Summary
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed p-3.5 bg-slate-50 rounded-xl border border-slate-200/60 font-medium">
                "{candidate.summary}"
              </p>
            </div>

            {/* Matched Skills */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center justify-between">
                <span>Matching Skill Vectors</span>
                <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
                  {candidate.matchingSkills.length} Matched
                </span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {candidate.matchingSkills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-800 text-xs font-medium rounded-lg border border-emerald-200/60"
                  >
                    <FaCheckCircle className="text-emerald-600 text-[10px]" />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Missing Skills */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center justify-between">
                <span>Skill Gaps / Missing</span>
                <span className="text-[10px] text-amber-600 font-semibold bg-amber-50 px-2 py-0.5 rounded-full">
                  {candidate.missingSkills.length} Missing
                </span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {candidate.missingSkills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 text-amber-800 text-xs font-medium rounded-lg border border-amber-200/60"
                  >
                    <FaExclamationTriangle className="text-amber-600 text-[10px]" />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Drawer Actions Footer */}
          <div className="p-4 border-t border-slate-200 bg-slate-50/80 flex flex-wrap items-center justify-between gap-2">
            <Button
              variant="outline"
              size="sm"
              icon={FaFileDownload}
              onClick={() => alert(`Downloading resume: ${candidate.filename}`)}
            >
              Download CV
            </Button>

            <div className="flex items-center gap-2">
              <Button
                variant="danger"
                size="sm"
                icon={FaUserTimes}
                onClick={() => {
                  onUpdateStatus(candidate.id, "Rejected");
                  onClose();
                }}
              >
                Reject
              </Button>
              <Button
                variant="primary"
                size="sm"
                icon={FaUserCheck}
                onClick={() => {
                  onUpdateStatus(candidate.id, "Shortlisted");
                  onClose();
                }}
              >
                Shortlist
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CandidateProfileDrawer;
