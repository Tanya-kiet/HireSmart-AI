import React from "react";
import RecommendationBadge from "./RecommendationBadge";
import ScoreBadge from "./ScoreBadge";
import Badge from "../common/Badge";
import Button from "../common/Button";
import {
  FaTimes,
  FaCheckCircle,
  FaExclamationTriangle,
  FaRobot,
  FaFileDownload,
  FaCrown,
  FaInfoCircle,
} from "react-icons/fa";

function RankingDrawer({ candidate, isOpen, onClose }) {
  if (!isOpen || !candidate) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Canvas */}
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
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200 flex items-center gap-1">
                    <FaCrown className="text-amber-500 text-[10px]" />
                    Rank #{candidate.rank}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                    {candidate.name}
                  </h3>
                </div>

                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  {candidate.email} • {candidate.category}
                </p>

                <div className="mt-1.5">
                  <RecommendationBadge recommendation={candidate.recommendation} size="sm" />
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

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Overall Score & Score Metrics */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-900 text-white border border-slate-800 text-center">
              <div>
                <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider block">
                  Overall Rank Score
                </span>
                <span className="text-2xl font-black text-amber-400 mt-0.5 block">
                  {candidate.overallScore}%
                </span>
              </div>
              <div className="border-l border-slate-800">
                <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider block">
                  ATS Index
                </span>
                <span className="text-2xl font-black text-blue-400 mt-0.5 block">
                  {candidate.atsScore}%
                </span>
              </div>
              <div className="border-l border-slate-800">
                <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider block">
                  Vector Match
                </span>
                <span className="text-2xl font-black text-emerald-400 mt-0.5 block">
                  {candidate.matchScore}%
                </span>
              </div>
            </div>

            {/* Why Ranked Here Explanation Card */}
            <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200/80 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 uppercase tracking-wider">
                <FaInfoCircle className="text-amber-600" />
                <span>Why Ranked #{candidate.rank}</span>
              </div>
              <p className="text-xs font-semibold text-amber-950 leading-relaxed">
                "{candidate.whyRanked}"
              </p>
            </div>

            {/* Resume Summary */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <FaRobot className="text-blue-600" />
                <span>AI Profile Overview</span>
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed p-3.5 bg-slate-50 rounded-xl border border-slate-200/70 font-medium">
                "{candidate.summary}"
              </p>
            </div>

            {/* Top Skills & Missing Skills */}
            <div className="grid grid-cols-1 gap-4">
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Top Verified Skills
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {candidate.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-800 text-xs font-semibold rounded-lg border border-emerald-200/80"
                    >
                      <FaCheckCircle className="text-emerald-600 text-[10px]" />
                      <span>{skill}</span>
                    </span>
                  ))}
                </div>
              </div>

              {candidate.missingSkills && candidate.missingSkills.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                    Missing Skill Gaps
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {candidate.missingSkills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 text-amber-800 text-xs font-semibold rounded-lg border border-amber-200/80"
                      >
                        <FaExclamationTriangle className="text-amber-600 text-[10px]" />
                        <span>{skill}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Strengths & Weaknesses */}
            <div className="space-y-3">
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                  Key Strengths
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
                  Improvement Areas
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

          {/* Drawer Actions */}
          <div className="p-4 border-t border-slate-200 bg-slate-50/80 flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              icon={FaFileDownload}
              onClick={() => alert(`Downloading resume for ${candidate.name}`)}
            >
              Download PDF
            </Button>
            <Button variant="primary" size="sm" onClick={onClose}>
              Close Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RankingDrawer;
