import React from "react";
import Card from "../common/Card";
import Badge from "../common/Badge";
import { FaRobot, FaCheckCircle, FaStar, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const mockPredictions = [
  {
    candidate: "Sarah Chen",
    role: "Senior React Developer",
    aiFitScore: 96,
    confidence: "High (99%)",
    recommendation: "Strong Hire",
    badgeVariant: "emerald",
    topSkills: ["React 19", "TypeScript", "State Mgmt", "Performance"],
    reasoning: "Exceptional architecture expertise and project alignment.",
  },
  {
    candidate: "Marcus Vance",
    role: "AI / ML Architect",
    aiFitScore: 92,
    confidence: "High (97%)",
    recommendation: "Shortlist Immediately",
    badgeVariant: "blue",
    topSkills: ["PyTorch", "LLM Fine-tuning", "RAG Systems", "Python"],
    reasoning: "5+ years enterprise ML pipelines & LLM vector search.",
  },
  {
    candidate: "Elena Rostova",
    role: "Lead Product Designer",
    aiFitScore: 88,
    confidence: "Medium-High",
    recommendation: "Interview Scheduled",
    badgeVariant: "purple",
    topSkills: ["Design Systems", "Figma", "User Research", "Prototyping"],
    reasoning: "Strong UX portfolio matching core design tokens.",
  },
];

function RecentPredictionsCard() {
  const navigate = useNavigate();

  return (
    <Card
      title="Recent AI Predictions"
      subtitle="Neural match scores & candidate suitability engine"
      headerBorder
      action={
        <Badge variant="blue" size="sm" dot>
          AI Vector Engine
        </Badge>
      }
    >
      <div className="space-y-4">
        {mockPredictions.map((pred, idx) => (
          <div
            key={idx}
            onClick={() => navigate("/candidates")}
            className="p-4 rounded-xl border border-slate-200/70 hover:border-blue-300 hover:bg-blue-50/20 transition-all cursor-pointer group"
          >
            {/* Header row */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xs font-bold shrink-0">
                  <FaRobot className="text-blue-400" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {pred.candidate}
                  </h4>
                  <p className="text-[11px] text-slate-500">{pred.role}</p>
                </div>
              </div>

              <div className="text-right">
                <div className="text-sm font-extrabold text-emerald-600">
                  {pred.aiFitScore}% Match
                </div>
                <Badge variant={pred.badgeVariant} size="sm">
                  {pred.recommendation}
                </Badge>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden my-3">
              <div
                className="bg-gradient-to-r from-blue-500 to-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${pred.aiFitScore}%` }}
              />
            </div>

            {/* Reasoning & Skill Badges */}
            <p className="text-xs text-slate-600 leading-relaxed mb-2.5">
              "{pred.reasoning}"
            </p>

            <div className="flex flex-wrap items-center gap-1.5">
              {pred.topSkills.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="text-[10px] bg-slate-100 text-slate-600 font-medium px-2 py-0.5 rounded-md border border-slate-200/50"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default RecentPredictionsCard;
