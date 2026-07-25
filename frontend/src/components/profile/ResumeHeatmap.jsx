import React, { useState } from "react";
import Card from "../common/Card";
import Badge from "../common/Badge";
import { FaFire, FaCheckCircle, FaExclamationTriangle, FaEye } from "react-icons/fa";

function ResumeHeatmap({ resumeText, matchingSkills = [], missingSkills = [] }) {
  const [heatmapEnabled, setHeatmapEnabled] = useState(true);

  if (!resumeText) return null;

  const renderHeatmapText = () => {
    if (!heatmapEnabled) {
      return <p className="whitespace-pre-line font-mono text-xs leading-relaxed text-slate-800">{resumeText}</p>;
    }

    const matchedSet = new Set(matchingSkills.map((s) => s.toLowerCase()));
    const missingSet = new Set(missingSkills.map((s) => s.toLowerCase()));

    const words = resumeText.split(/(\s+)/);

    return (
      <div className="whitespace-pre-line font-mono text-xs leading-relaxed text-slate-800">
        {words.map((word, idx) => {
          const clean = word.toLowerCase().replace(/[^a-z0-9+#.]/g, "");

          if (matchedSet.has(clean)) {
            return (
              <mark
                key={idx}
                className="bg-emerald-100 text-emerald-900 font-bold px-1 rounded-sm border border-emerald-300"
                title="Matched Technical Skill"
              >
                {word}
              </mark>
            );
          }

          if (missingSet.has(clean)) {
            return (
              <mark
                key={idx}
                className="bg-amber-100 text-amber-900 font-bold px-1 rounded-sm border border-amber-300"
                title="Missing Job Keyword"
              >
                {word}
              </mark>
            );
          }

          return <span key={idx}>{word}</span>;
        })}
      </div>
    );
  };

  return (
    <Card
      title="Resume Keyword Heatmap"
      subtitle="Visual technical skill & keyword coverage markup"
      headerBorder
      action={
        <div className="flex items-center gap-2">
          <button
            onClick={() => setHeatmapEnabled(!heatmapEnabled)}
            className={`px-3 py-1 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              heatmapEnabled
                ? "bg-emerald-600 text-white shadow-2xs"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <FaFire className="text-xs" />
            <span>{heatmapEnabled ? "Heatmap Active" : "Plain View"}</span>
          </button>
        </div>
      }
    >
      <div className="space-y-4">
        {/* Heatmap Legend */}
        <div className="flex items-center gap-4 text-xs p-3 bg-slate-50 rounded-xl border border-slate-200/80">
          <span className="flex items-center gap-1.5 font-bold text-emerald-800">
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
            Matched Skills ({matchingSkills.length})
          </span>
          <span className="flex items-center gap-1.5 font-bold text-amber-800">
            <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
            Missing Keywords ({missingSkills.length})
          </span>
        </div>

        {/* Heatmap Text Container */}
        <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/90 max-h-96 overflow-y-auto font-mono text-xs">
          {renderHeatmapText()}
        </div>
      </div>
    </Card>
  );
}

export default ResumeHeatmap;
