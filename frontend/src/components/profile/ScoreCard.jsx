import React from "react";
import { FaChartBar, FaShieldAlt } from "react-icons/fa";

function ScoreCard({ scores }) {
  const scoreItems = [
    { label: "Overall Match", score: scores?.overallMatch || 94, color: "bg-emerald-600" },
    { label: "ATS Score", score: scores?.atsScore || 96, color: "bg-blue-600" },
    { label: "Skill Score", score: scores?.skillScore || 92, color: "bg-indigo-600" },
    { label: "Experience Score", score: scores?.experienceScore || 95, color: "bg-teal-600" },
    { label: "Education Score", score: scores?.educationScore || 90, color: "bg-slate-700" },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <FaChartBar className="text-slate-500 text-sm" />
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">
            Overall Match & Scores
          </h3>
        </div>
        <span className="px-2 py-0.5 text-[11px] font-bold bg-emerald-50 text-emerald-700 rounded-md border border-emerald-200 flex items-center gap-1">
          <FaShieldAlt className="text-[10px]" />
          <span>{scores?.confidence || "High (95%)"}</span>
        </span>
      </div>

      {/* Primary Score Hero Indicator */}
      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200/80">
        <div>
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            Overall Fit Rating
          </span>
          <span className="text-2xl font-black text-slate-900 tracking-tight">
            {scores?.overallMatch || 94}%
          </span>
        </div>
        <div className="text-right">
          <span className="text-[11px] font-medium text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200 inline-block font-semibold">
            Top 5% Candidate
          </span>
          <p className="text-[10px] text-slate-500 mt-1 font-medium">
            Based on vector analysis
          </p>
        </div>
      </div>

      {/* Individual Progress Bars */}
      <div className="space-y-3 pt-1">
        {scoreItems.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">{item.label}</span>
              <span className="font-bold text-slate-900">{item.score}%</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${item.color}`}
                style={{ width: `${item.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScoreCard;
