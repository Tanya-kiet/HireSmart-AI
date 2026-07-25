import React, { useState } from "react";
import { FaCheckCircle, FaBriefcase, FaClock, FaAward } from "react-icons/fa";

function SkillChip({ skill }) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Skill Chip Badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100/90 text-slate-800 text-xs font-semibold rounded-lg border border-slate-200 transition-all cursor-pointer shadow-2xs hover:border-slate-300">
        <span>{skill.name}</span>
        {skill.level >= 90 && (
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" title="Expert Level" />
        )}
      </div>

      {/* Hover Tooltip Card */}
      {showTooltip && (
        <div className="absolute left-0 bottom-full mb-2 w-64 p-3 bg-slate-900 text-white rounded-xl shadow-xl z-50 animate-fade-in text-xs space-y-2 border border-slate-800 pointer-events-none">
          {/* Tooltip Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="font-bold text-white text-sm">{skill.name}</span>
            <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-950 text-emerald-300 rounded border border-emerald-800">
              {skill.confidence || `${skill.level}% Confidence`}
            </span>
          </div>

          {/* Details */}
          <div className="space-y-1.5 text-slate-300">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-medium flex items-center gap-1">
                <FaClock className="text-slate-500 text-[10px]" />
                Years Used:
              </span>
              <span className="font-bold text-white">{skill.yearsUsed || "3+"} Years</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-medium flex items-center gap-1">
                <FaAward className="text-slate-500 text-[10px]" />
                Proficiency:
              </span>
              <span className="font-bold text-emerald-400">{skill.level}% Score</span>
            </div>

            {skill.projectReferences && skill.projectReferences.length > 0 && (
              <div className="pt-1 border-t border-slate-800 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                  <FaBriefcase className="text-slate-500 text-[10px]" />
                  Project References:
                </span>
                <ul className="space-y-0.5">
                  {skill.projectReferences.map((ref, idx) => (
                    <li key={idx} className="text-[11px] text-slate-200 flex items-center gap-1 truncate">
                      <FaCheckCircle className="text-emerald-400 text-[9px] shrink-0" />
                      <span className="truncate">{ref}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Tooltip arrow */}
          <div className="absolute top-full left-5 -mt-1 border-4 border-transparent border-t-slate-900" />
        </div>
      )}
    </div>
  );
}

export default SkillChip;
