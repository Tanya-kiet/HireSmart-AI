import React, { useState } from "react";
import { FaCheckCircle, FaThumbsUp, FaQuestionCircle, FaTimesCircle, FaRobot } from "react-icons/fa";

function RecommendationCard({ initialRecommendation = "Strong Hire", onChange }) {
  const [recommendation, setRecommendation] = useState(initialRecommendation);

  const options = [
    {
      id: "Strong Hire",
      label: "Strong Hire",
      desc: "Top 5% candidate - Expedite offer",
      icon: FaCheckCircle,
      activeColor: "bg-emerald-50 text-emerald-900 border-emerald-300 ring-2 ring-emerald-100",
      badgeColor: "bg-emerald-600 text-white",
      hoverColor: "hover:border-emerald-200 hover:bg-emerald-50/50",
    },
    {
      id: "Hire",
      label: "Hire",
      desc: "Meets all core job requirements",
      icon: FaThumbsUp,
      activeColor: "bg-blue-50 text-blue-900 border-blue-300 ring-2 ring-blue-100",
      badgeColor: "bg-blue-600 text-white",
      hoverColor: "hover:border-blue-200 hover:bg-blue-50/50",
    },
    {
      id: "Maybe",
      label: "Maybe / Hold",
      desc: "Secondary pool - Backup candidate",
      icon: FaQuestionCircle,
      activeColor: "bg-amber-50 text-amber-900 border-amber-300 ring-2 ring-amber-100",
      badgeColor: "bg-amber-600 text-white",
      hoverColor: "hover:border-amber-200 hover:bg-amber-50/50",
    },
    {
      id: "Reject",
      label: "Reject",
      desc: "Does not meet minimum criteria",
      icon: FaTimesCircle,
      activeColor: "bg-rose-50 text-rose-900 border-rose-300 ring-2 ring-rose-100",
      badgeColor: "bg-rose-600 text-white",
      hoverColor: "hover:border-rose-200 hover:bg-rose-50/50",
    },
  ];

  const handleSelect = (id) => {
    setRecommendation(id);
    if (onChange) onChange(id);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <FaRobot className="text-slate-500 text-sm" />
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">
            Decision Engine
          </h3>
        </div>
        <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
          Recruiter Consensus
        </span>
      </div>

      <p className="text-xs text-slate-500 font-medium">
        Select final hiring recommendation:
      </p>

      {/* Decision Option Cards */}
      <div className="space-y-2">
        {options.map((opt) => {
          const Icon = opt.icon;
          const isSelected = recommendation === opt.id;

          return (
            <div
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              className={`p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between gap-3 text-xs ${
                isSelected
                  ? opt.activeColor
                  : `bg-slate-50/50 border-slate-200 ${opt.hoverColor}`
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Icon
                  className={`text-sm shrink-0 ${
                    isSelected ? "text-slate-900" : "text-slate-400"
                  }`}
                />
                <div className="min-w-0">
                  <h4 className="font-bold text-slate-900 truncate">{opt.label}</h4>
                  <p className="text-[10px] text-slate-500 font-medium truncate">
                    {opt.desc}
                  </p>
                </div>
              </div>

              {isSelected && (
                <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${opt.badgeColor}`}>
                  Selected
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RecommendationCard;
