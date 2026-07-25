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
  FaGraduationCap,
  FaBriefcase,
  FaFolderOpen,
} from "react-icons/fa";
import Badge from "../common/Badge";
import Button from "../common/Button";

function CandidateDrawer({ candidate, isOpen, onClose, onUpdateStatus }) {
  if (!isOpen || !candidate) return null;

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case "Hired":
        return "emerald";
      case "Interview":
        return "purple";
      case "Reviewed":
        return "indigo";
      case "New":
        return "blue";
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

          {/* Scrollable Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* ATS Score & Match Score Banner */}
            <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-900 text-white border border-slate-800">
              <div>
                <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider block">
                  ATS Score
                </span>
                <span className="text-2xl font-extrabold text-emerald-400 mt-0.5 block">
                  {candidate.atsScore}%
                </span>
              </div>
              <div className="border-l border-slate-800 pl-3">
                <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider block">
                  Semantic Match
                </span>
                <span className="text-2xl font-extrabold text-blue-400 mt-0.5 block">
                  {candidate.matchScore}%
                </span>
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 flex items-center gap-2.5">
                <FaEnvelope className="text-blue-600 text-sm shrink-0" />
                <span className="truncate font-medium text-slate-700">
                  {candidate.email}
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 flex items-center gap-2.5">
                <FaPhone className="text-emerald-600 text-sm shrink-0" />
                <span className="truncate font-medium text-slate-700">
                  {candidate.phone}
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 flex items-center gap-2.5">
                <FaMapMarkerAlt className="text-rose-600 text-sm shrink-0" />
                <span className="truncate font-medium text-slate-700">
                  {candidate.location}
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 flex items-center gap-2.5">
                <FaGraduationCap className="text-purple-600 text-sm shrink-0" />
                <span className="truncate font-medium text-slate-700">
                  {candidate.education}
                </span>
              </div>
            </div>

            {/* AI Recommendation */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <FaRobot className="text-blue-600" />
                <span>AI Recommendation</span>
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed p-3.5 bg-blue-50/60 rounded-xl border border-blue-100 font-semibold">
                "{candidate.recommendation}"
              </p>
            </div>

            {/* Skills */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Extracted Skills
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {candidate.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200/80"
                  >
                    <FaCheckCircle className="text-blue-600 text-[10px]" />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Strengths & Weaknesses */}
            <div className="space-y-3">
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                  Candidate Strengths
                </h4>
                <div className="space-y-1.5">
                  {candidate.strengths.map((str, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 bg-emerald-50 text-emerald-900 text-xs rounded-xl border border-emerald-200/60 font-medium"
                    >
                      ✓ {str}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                  Weaknesses & Skill Gaps
                </h4>
                <div className="space-y-1.5">
                  {candidate.weaknesses.map((weak, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 bg-amber-50 text-amber-900 text-xs rounded-xl border border-amber-200/60 font-medium"
                    >
                      ⚠ {weak}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Drawer Actions Footer */}
          <div className="p-4 border-t border-slate-200 bg-slate-50/80 flex items-center justify-between gap-2">
            <Button
              variant="outline"
              size="sm"
              icon={FaFileDownload}
              onClick={() => alert(`Downloading resume: ${candidate.filename}`)}
            >
              Download Resume
            </Button>

            <div className="flex items-center gap-2">
              <Button
                variant="danger"
                size="sm"
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
                onClick={() => {
                  onUpdateStatus(candidate.id, "Interview");
                  onClose();
                }}
              >
                Schedule Interview
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CandidateDrawer;
