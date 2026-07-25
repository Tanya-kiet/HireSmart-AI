import React from "react";
import Card from "../common/Card";
import Badge from "../common/Badge";
import {
  FaRobot,
  FaCheckCircle,
  FaExclamationTriangle,
  FaLightbulb,
  FaChartPie,
  FaLayerGroup,
  FaStar,
} from "react-icons/fa";

function PredictionResultsCard({ prediction }) {
  if (!prediction) return null;

  const {
    category = "Software Engineering",
    atsScore = 88,
    matchingSkills = [
      "Python",
      "React.js",
      "TypeScript",
      "REST APIs",
      "SQL",
      "Git & GitHub",
    ],
    missingSkills = [
      "Docker",
      "Kubernetes",
      "CI/CD Pipelines",
      "AWS Cloud",
    ],
    suggestions = [
      "Add quantifiable metrics to your work achievements (e.g., 'Improved API latency by 40%').",
      "Include key cloud infrastructure keywords (AWS, Docker) to boost ATS index rating.",
      "Expand the summary section to highlight cross-functional engineering leadership.",
    ],
  } = prediction;

  const getScoreColor = (score) => {
    if (score >= 85) return "text-emerald-600 bg-emerald-50 border-emerald-200";
    if (score >= 70) return "text-blue-600 bg-blue-50 border-blue-200";
    return "text-amber-600 bg-amber-50 border-amber-200";
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Top Banner / Summary Header */}
      <Card className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white border-slate-800 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-400/20">
              <FaRobot className="text-xs" />
              <span>AI Resume Analysis Complete</span>
            </div>

            <div className="flex items-center gap-3">
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                Category: <span className="text-blue-400">{category}</span>
              </h2>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Resume classified by HireSmart AI vector model with high confidence match rating.
            </p>
          </div>

          {/* ATS Score Circular Badge */}
          <div className="flex items-center gap-4 bg-slate-950/80 p-4 rounded-2xl border border-slate-700/80 shrink-0">
            <div className="text-center">
              <div className="text-xs text-slate-400 font-medium">ATS Match Score</div>
              <div className="text-3xl font-extrabold text-emerald-400 mt-0.5">
                {atsScore} <span className="text-xs font-normal text-slate-400">/ 100</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-full border-4 border-emerald-500 flex items-center justify-center text-emerald-400 text-xs font-bold bg-emerald-500/10">
              {atsScore >= 85 ? "A+" : "B+"}
            </div>
          </div>
        </div>
      </Card>

      {/* Grid: Skills Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Matching Skills */}
        <Card
          title="Matching Skills"
          subtitle="Key technical competencies identified in resume"
          headerBorder
          action={
            <Badge variant="emerald" size="sm" dot>
              {matchingSkills.length} Verified
            </Badge>
          }
        >
          <div className="flex flex-wrap gap-2">
            {matchingSkills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-medium border border-emerald-200/80"
              >
                <FaCheckCircle className="text-emerald-600 text-xs" />
                <span>{skill}</span>
              </span>
            ))}
          </div>
        </Card>

        {/* Missing Skills */}
        <Card
          title="Missing Skills"
          subtitle="Recommended skills to increase ATS competitiveness"
          headerBorder
          action={
            <Badge variant="amber" size="sm" dot>
              {missingSkills.length} Suggestions
            </Badge>
          }
        >
          <div className="flex flex-wrap gap-2">
            {missingSkills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 text-xs font-medium border border-amber-200/80"
              >
                <FaExclamationTriangle className="text-amber-600 text-xs" />
                <span>{skill}</span>
              </span>
            ))}
          </div>
        </Card>
      </div>

      {/* Suggestions Section */}
      <Card
        title="Optimization Suggestions"
        subtitle="Actionable feedback to improve resume ranking & ATS compatibility"
        headerBorder
        action={
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-sm">
            <FaLightbulb />
          </div>
        }
      >
        <div className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200/60"
            >
              <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                {index + 1}
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {suggestion}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default PredictionResultsCard;
