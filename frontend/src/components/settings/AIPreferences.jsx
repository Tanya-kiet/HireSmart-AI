import React from "react";
import { FaMagic } from "react-icons/fa";

function AIPreferences({ settings, onChange }) {
  const aiToggles = [
    { key: "enableSummary", label: "Enable Resume Summary", desc: "Generate executive 3-bullet candidate background summaries on upload" },
    { key: "enableRecommendations", label: "Enable Candidate Recommendations", desc: "Display algorithmic recommendation tags (Strong Hire, Good Fit, Needs Review)" },
    { key: "enableSkillExtraction", label: "Enable Skill Extraction", desc: "Extract and categorize technical languages, frameworks, and tools automatically" },
    { key: "enableMatchExplanation", label: "Enable Match Explanation", desc: "Show detailed WHY rationale popovers explaining matched vs missing skills" },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4 font-sans text-xs">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3 font-bold text-slate-900 text-sm">
        <FaMagic className="text-blue-600 text-xs" />
        <span>5. AI Preferences (Minimal Controls)</span>
      </div>

      <div className="space-y-3">
        {/* Toggle Switches */}
        {aiToggles.map((item) => {
          const isChecked = settings[item.key] !== false; // Default true
          return (
            <div key={item.key} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200/70">
              <div>
                <span className="font-bold text-slate-900 block">{item.label}</span>
                <span className="text-[11px] text-slate-500 font-medium block">{item.desc}</span>
              </div>

              {/* Toggle Switch */}
              <button
                type="button"
                onClick={() => onChange(item.key, !isChecked)}
                className={`w-11 h-6 rounded-full p-1 transition-colors cursor-pointer shrink-0 ${
                  isChecked ? "bg-blue-600" : "bg-slate-300"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform shadow-xs ${
                    isChecked ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          );
        })}

        {/* Confidence Threshold Selector */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 space-y-1">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-900 block">AI Recommendation Confidence Threshold</span>
              <span className="text-[11px] text-slate-500 font-medium block">
                Minimum confidence score required before flagging candidate as 'Strong Hire'
              </span>
            </div>

            <select
              value={settings.confidenceThreshold || "85% High Confidence"}
              onChange={(e) => onChange("confidenceThreshold", e.target.value)}
              className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg font-bold text-slate-900 focus:outline-none cursor-pointer"
            >
              <option value="80% Standard Confidence">80% Standard Confidence</option>
              <option value="85% High Confidence">85% High Confidence</option>
              <option value="90% Strict Confidence">90% Strict Confidence</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIPreferences;
