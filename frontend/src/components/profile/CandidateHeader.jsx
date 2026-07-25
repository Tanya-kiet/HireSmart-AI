import React from "react";
import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaEnvelope,
  FaPhone,
  FaGlobe,
  FaLinkedin,
  FaGithub,
  FaChevronLeft,
  FaShareAlt,
  FaDownload,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function CandidateHeader({ candidate, onAction, onExpandAll, onCollapseAll, isAllExpanded }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
      {/* Top Breadcrumb & Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/candidates")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors cursor-pointer"
          >
            <FaChevronLeft className="text-[10px]" />
            <span>Back to Candidates</span>
          </button>

          <span className="text-slate-300">/</span>

          <span className="text-xs font-medium text-slate-500">
            {candidate.category || "Software Engineering"}
          </span>

          <span className="text-slate-300">/</span>

          <span className="px-2.5 py-0.5 text-xs font-semibold bg-emerald-50 text-emerald-700 rounded-md border border-emerald-200">
            {candidate.stage || "Interview Scheduled"}
          </span>
        </div>

        {/* Global Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={isAllExpanded ? onCollapseAll : onExpandAll}
            className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors cursor-pointer"
          >
            {isAllExpanded ? "Collapse All Sections" : "Expand All Sections"}
          </button>

          <button
            onClick={() => onAction("share")}
            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors cursor-pointer"
            title="Share Candidate"
          >
            <FaShareAlt className="text-xs" />
          </button>

          <button
            onClick={() => onAction("download")}
            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors cursor-pointer"
            title="Download Resume"
          >
            <FaDownload className="text-xs" />
          </button>
        </div>
      </div>

      {/* Main Candidate Info Header Grid */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="flex items-start md:items-center gap-4">
          {/* Candidate Profile Photo / Avatar */}
          <div className="relative shrink-0">
            {candidate.avatarUrl ? (
              <img
                src={candidate.avatarUrl}
                alt={candidate.name}
                className="w-16 h-16 rounded-xl object-cover border border-slate-200 shadow-xs"
              />
            ) : (
              <div className="w-16 h-16 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xl shadow-xs">
                {candidate.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
            )}
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white" title="Active Candidate" />
          </div>

          {/* Core Info */}
          <div className="space-y-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                {candidate.name}
              </h1>
              <span className="px-2.5 py-0.5 text-xs font-bold bg-blue-50 text-blue-700 rounded-md border border-blue-200">
                {candidate.recommendation || "Strong Hire"}
              </span>
            </div>

            <p className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <span>{candidate.role}</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500 font-medium flex items-center gap-1">
                <FaBriefcase className="text-xs text-slate-400" />
                {candidate.experience}
              </span>
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-0.5">
              <span className="flex items-center gap-1.5 font-medium">
                <FaMapMarkerAlt className="text-slate-400 text-xs" />
                {candidate.location}
              </span>
              <a
                href={`mailto:${candidate.email}`}
                className="flex items-center gap-1.5 font-medium text-slate-600 hover:text-blue-600 transition-colors"
              >
                <FaEnvelope className="text-slate-400 text-xs" />
                {candidate.email}
              </a>
              <a
                href={`tel:${candidate.phone}`}
                className="flex items-center gap-1.5 font-medium text-slate-600 hover:text-blue-600 transition-colors"
              >
                <FaPhone className="text-slate-400 text-xs" />
                {candidate.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Links & External Profiles */}
        <div className="flex flex-wrap items-center gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 shrink-0">
          {candidate.portfolioUrl && (
            <a
              href={candidate.portfolioUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
            >
              <FaGlobe className="text-slate-500 text-xs" />
              <span>Portfolio</span>
            </a>
          )}

          {candidate.linkedinUrl && (
            <a
              href={candidate.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50/70 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors"
            >
              <FaLinkedin className="text-blue-600 text-xs" />
              <span>LinkedIn</span>
            </a>
          )}

          {candidate.githubUrl && (
            <a
              href={candidate.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200 transition-colors"
            >
              <FaGithub className="text-slate-700 text-xs" />
              <span>GitHub</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default CandidateHeader;
