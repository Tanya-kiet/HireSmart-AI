import React from "react";
import Card from "../common/Card";
import Badge from "../common/Badge";
import { FaCheckCircle, FaStar, FaRobot } from "react-icons/fa";

function MatchScoreCard({ score = 92, matchLevel = "Excellent Fit" }) {
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <Card className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white border-slate-800 shadow-md">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-2">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-400/20">
            <FaRobot className="text-xs" />
            <span>AI Semantic Vector Alignment</span>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Semantic Match Score
            </h2>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed max-w-md">
              High semantic vector overlap between candidate resume skills and Job Description requirements.
            </p>
          </div>

          <div className="flex items-center gap-3 pt-1">
            <Badge variant="emerald" size="lg" dot>
              {matchLevel}
            </Badge>
            <span className="text-xs text-slate-400 font-medium">
              Confidence Index: <strong className="text-white">96.4%</strong>
            </span>
          </div>
        </div>

        {/* Circular Progress Gauge */}
        <div className="relative w-36 h-36 flex items-center justify-center shrink-0 mx-auto md:mx-0">
          <svg className="w-36 h-36 transform -rotate-90">
            <circle
              cx="72"
              cy="72"
              r={radius}
              stroke="currentColor"
              strokeWidth="10"
              className="text-slate-800"
              fill="transparent"
            />
            <circle
              cx="72"
              cy="72"
              r={radius}
              stroke="currentColor"
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="text-emerald-400 transition-all duration-1000 ease-out"
              fill="transparent"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-black text-white tracking-tight">
              {score}%
            </span>
            <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider">
              Match Fit
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default MatchScoreCard;
