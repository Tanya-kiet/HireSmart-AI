import React from "react";
import {
  FaShieldAlt,
  FaCheckCircle,
  FaLightbulb,
  FaSearch,
  FaExclamationCircle,
  FaUserCheck,
} from "react-icons/fa";

function QualityCard({ qualityMetrics }) {
  if (!qualityMetrics) return null;

  const metricsList = [
    {
      key: "keywordCoverage",
      title: "Keyword Coverage",
      data: qualityMetrics.keywordCoverage,
      color: "bg-blue-600",
    },
    {
      key: "roleClarity",
      title: "Role Clarity",
      data: qualityMetrics.roleClarity,
      color: "bg-emerald-600",
    },
    {
      key: "skillCompleteness",
      title: "Skill Completeness",
      data: qualityMetrics.skillCompleteness,
      color: "bg-indigo-600",
    },
    {
      key: "experienceClarity",
      title: "Experience Clarity",
      data: qualityMetrics.experienceClarity,
      color: "bg-teal-600",
    },
    {
      key: "biasDetection",
      title: "Bias Detection & Neutrality",
      data: qualityMetrics.biasDetection,
      color: "bg-purple-600",
    },
    {
      key: "estimatedCandidateReach",
      title: "Estimated Candidate Reach",
      data: qualityMetrics.estimatedCandidateReach,
      color: "bg-slate-800",
    },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-5">
      {/* Header Banner */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold border border-emerald-200">
            <FaShieldAlt className="text-sm" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Job Description Quality
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Objective evaluation across 6 core clarity and reach benchmarks
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">Overall Quality Rating:</span>
          <span className="px-3 py-1 text-sm font-black text-emerald-800 bg-emerald-100 rounded-lg border border-emerald-300">
            {qualityMetrics.overallQualityScore || 95} / 100
          </span>
        </div>
      </div>

      {/* Grid of 6 Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {metricsList.map((m) => (
          <div
            key={m.key}
            className="p-4 bg-slate-50/70 rounded-xl border border-slate-200 space-y-2.5"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900">{m.title}</span>
              <span className="font-extrabold text-slate-900">
                {m.data?.score}% • <span className="text-emerald-700 font-bold">{m.data?.label}</span>
              </span>
            </div>

            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${m.color}`}
                style={{ width: `${m.data?.score}%` }}
              />
            </div>

            <p className="text-xs text-slate-600 font-medium leading-relaxed bg-white p-2.5 rounded-lg border border-slate-200/70">
              {m.data?.explanation}
            </p>
          </div>
        ))}
      </div>

      {/* Improvement Suggestions List */}
      {qualityMetrics.improvementSuggestions && qualityMetrics.improvementSuggestions.length > 0 && (
        <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200/80 space-y-2 text-xs">
          <div className="flex items-center gap-2 text-amber-900 font-bold uppercase tracking-wider text-[11px]">
            <FaLightbulb className="text-amber-600 text-sm" />
            <span>Recommended Job Description Enhancements</span>
          </div>

          <ul className="space-y-1.5 text-amber-950 font-medium pl-1">
            {qualityMetrics.improvementSuggestions.map((sug, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span className="leading-relaxed">{sug}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default QualityCard;
