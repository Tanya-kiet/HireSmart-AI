import React from "react";
import { FaCheck, FaExclamationTriangle, FaExchangeAlt, FaCodeBranch } from "react-icons/fa";

function MatchAnalysis({ data }) {
  if (!data) return null;

  return (
    <div className="space-y-4">
      {/* Header Info Bar */}
      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <FaCodeBranch className="text-slate-600 text-sm" />
          <span className="font-bold text-slate-900">
            Target Job: {data.jobTitle || "Senior Lead Frontend Engineer"}
          </span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-600 font-medium">
            {data.department || "Core Engineering"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-medium">Overall Alignment:</span>
          <span className="px-2.5 py-0.5 font-black text-emerald-700 bg-emerald-100 rounded-md border border-emerald-200">
            {data.overallScore || 94}% Diff Score
          </span>
        </div>
      </div>

      {/* GitHub Diff View Header Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-bold text-slate-700 uppercase tracking-wider px-2">
        <div className="flex items-center gap-2 text-slate-800">
          <span className="w-2 h-2 rounded-full bg-slate-900" />
          <span>Candidate Resume Credentials</span>
        </div>
        <div className="flex items-center gap-2 text-slate-800">
          <span className="w-2 h-2 rounded-full bg-blue-600" />
          <span>Job Description Criteria</span>
        </div>
      </div>

      {/* Diff Table Comparison Rows */}
      <div className="space-y-3">
        {data.comparison?.map((row, idx) => {
          const isMatch = row.status === "match";

          return (
            <div
              key={idx}
              className={`rounded-xl border transition-all ${
                isMatch
                  ? "bg-emerald-50/40 border-emerald-200/90"
                  : "bg-amber-50/40 border-amber-200/90"
              }`}
            >
              {/* Row Category Title & Status Pill */}
              <div className="px-4 py-2.5 border-b border-slate-200/60 flex items-center justify-between gap-2 text-xs">
                <span className="font-bold text-slate-900 flex items-center gap-2">
                  {isMatch ? (
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-[10px]">
                      <FaCheck />
                    </span>
                  ) : (
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-[10px]">
                      <FaExclamationTriangle />
                    </span>
                  )}
                  <span>{row.category}</span>
                </span>

                <span
                  className={`px-2 py-0.5 text-[10px] font-bold rounded-md border ${
                    isMatch
                      ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                      : "bg-amber-100 text-amber-800 border-amber-300"
                  }`}
                >
                  {isMatch ? "MATCHED" : "GAP / ATTENTION"}
                </span>
              </div>

              {/* Two Column Split (Resume vs JD) */}
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200/60 p-3 text-xs">
                {/* Resume Side */}
                <div className="p-2 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Resume Excerpt:
                  </span>
                  <p className="font-semibold text-slate-800 font-mono leading-relaxed bg-white/80 p-2 rounded border border-slate-200/70">
                    {row.resume}
                  </p>
                </div>

                {/* JD Side */}
                <div className="p-2 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Job Description Requirement:
                  </span>
                  <p className="font-semibold text-slate-800 font-mono leading-relaxed bg-white/80 p-2 rounded border border-slate-200/70">
                    {row.jobDescription}
                  </p>
                </div>
              </div>

              {/* Explanation Note */}
              {row.detail && (
                <div className="px-4 py-2 bg-white/60 border-t border-slate-200/60 text-[11px] text-slate-600 font-medium flex items-center gap-1.5">
                  <FaExchangeAlt className="text-slate-400 text-[10px] shrink-0" />
                  <span>{row.detail}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MatchAnalysis;
