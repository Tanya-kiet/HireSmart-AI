import React from "react";
import Card from "../common/Card";
import Badge from "../common/Badge";
import SkillBadge from "./SkillBadge";
import {
  FaCheckCircle,
  FaClock,
  FaRobot,
  FaPercentage,
  FaLayerGroup,
  FaUserCheck,
} from "react-icons/fa";

function AnalysisCard({ prediction }) {
  if (!prediction) return null;

  const category = prediction.predicted_category || "Testing";
  const confidence = "94%";
  const status = "Successfully Processed";
  const processingTime = "0.8 sec";

  const technicalSkills = ["React", "Python", "SQL", "Git"];
  const softSkills = ["Communication", "Teamwork", "Leadership"];

  return (
    <Card className="bg-white border-slate-200/90 shadow-2xs space-y-6">
      {/* Header & Status Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl border border-slate-800 shadow-sm">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-400/20">
            <FaRobot className="text-xs" />
            <span>AI Classification Complete</span>
          </div>

          <div className="flex items-center gap-3 pt-1">
            <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wider">
              Predicted Job Category
            </h3>
          </div>

          {/* Large Badge for Category */}
          <div className="flex items-center gap-3">
            <span className="text-xl sm:text-2xl font-extrabold text-blue-400 tracking-tight">
              {category}
            </span>
            <Badge variant="blue" size="lg">
              Primary Fit
            </Badge>
          </div>
        </div>

        {/* Processing Details Pill */}
        <div className="flex flex-wrap items-center gap-3 bg-slate-950/80 p-3.5 rounded-xl border border-slate-700/80 text-xs">
          <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <FaCheckCircle className="text-xs" />
            <span>{status}</span>
          </div>
          <div className="h-3 w-px bg-slate-700" />
          <div className="flex items-center gap-1.5 text-slate-300">
            <FaPercentage className="text-blue-400 text-xs" />
            <span>Confidence: <strong className="text-white">{confidence}</strong></span>
          </div>
          <div className="h-3 w-px bg-slate-700" />
          <div className="flex items-center gap-1.5 text-slate-300">
            <FaClock className="text-amber-400 text-xs" />
            <span>Time: <strong className="text-white">{processingTime}</strong></span>
          </div>
        </div>
      </div>

      {/* Skills Section (Section 8) */}
      <div className="space-y-4 pt-2">
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <FaLayerGroup className="text-blue-600 text-xs" />
          <span>Extracted Skills Breakdown</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Technical Skills */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/70 space-y-2.5">
            <div className="text-xs font-bold text-slate-800 flex items-center justify-between">
              <span>Technical Skills</span>
              <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                {technicalSkills.length} Identified
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {technicalSkills.map((skill, idx) => (
                <SkillBadge key={idx} name={skill} category="technical" />
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/70 space-y-2.5">
            <div className="text-xs font-bold text-slate-800 flex items-center justify-between">
              <span>Soft & General Skills</span>
              <span className="text-[10px] font-semibold text-slate-600 bg-slate-200/60 px-2 py-0.5 rounded-full">
                {softSkills.length} Identified
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {softSkills.map((skill, idx) => (
                <SkillBadge key={idx} name={skill} category="soft" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default AnalysisCard;
