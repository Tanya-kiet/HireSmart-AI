import React from "react";
import Card from "../common/Card";
import Badge from "../common/Badge";
import { FaRobot, FaUserCheck, FaCalendarAlt, FaFileAlt } from "react-icons/fa";

function SummaryCard({ candidate }) {
  const summaryText =
    candidate?.summary ||
    "This candidate has strong frontend and AI development experience with multiple full-stack projects. The resume demonstrates good technical knowledge and practical implementation.";

  return (
    <Card className="bg-white border-slate-200/90 shadow-2xs space-y-5">
      {/* Top Candidate Metadata Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200/70">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-extrabold text-lg shadow-2xs">
            {candidate?.name
              ? candidate.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
              : "SC"}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                {candidate?.name || "Sarah Chen"}
              </h3>
              <Badge variant="blue" size="sm">
                {candidate?.category || "Software Engineering"}
              </Badge>
            </div>
            <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
              <span className="flex items-center gap-1 font-medium">
                <FaFileAlt className="text-blue-600 text-[10px]" />
                {candidate?.filename || "Sarah_Chen_Resume_2026.pdf"}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-slate-400 font-medium">
                <FaCalendarAlt className="text-[10px]" />
                {candidate?.uploadedDate || "Jul 24, 2026"}
              </span>
            </div>
          </div>
        </div>

        {/* Score Badges */}
        <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200/80 shrink-0">
          <div className="text-center px-2">
            <span className="text-[10px] text-slate-400 font-medium uppercase block">
              ATS Score
            </span>
            <span className="text-lg font-extrabold text-slate-900">
              {candidate?.atsScore || 96}%
            </span>
          </div>
          <div className="w-px h-7 bg-slate-200" />
          <div className="text-center px-2">
            <span className="text-[10px] text-slate-400 font-medium uppercase block">
              Match Score
            </span>
            <span className="text-lg font-extrabold text-emerald-600">
              {candidate?.matchScore || 94}%
            </span>
          </div>
        </div>
      </div>

      {/* Professional AI Executive Summary */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
          <FaRobot className="text-blue-600 text-sm" />
          <span>Professional AI Summary</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed p-4 bg-blue-50/40 rounded-2xl border border-blue-100/80 font-medium">
          "{summaryText}"
        </p>
      </div>
    </Card>
  );
}

export default SummaryCard;
