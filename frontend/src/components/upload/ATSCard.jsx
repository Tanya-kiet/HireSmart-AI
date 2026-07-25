import React from "react";
import Card from "../common/Card";
import Badge from "../common/Badge";
import { FaCheckCircle, FaStar } from "react-icons/fa";

function ATSCard({ score = 86, quality = "Excellent" }) {
  // SVG Circular Gauge Math
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <Card
      title="ATS Score Rating"
      subtitle="Candidate overall resume compatibility score"
      headerBorder
      action={
        <Badge variant="emerald" size="sm" dot>
          Grade A
        </Badge>
      }
    >
      <div className="flex flex-col items-center justify-center p-4 text-center space-y-4">
        {/* SVG Circular Progress Gauge */}
        <div className="relative w-32 h-32 flex items-center justify-center">
          <svg className="w-32 h-32 transform -rotate-90">
            {/* Background track */}
            <circle
              cx="64"
              cy="64"
              r={radius}
              stroke="currentColor"
              strokeWidth="8"
              className="text-slate-100"
              fill="transparent"
            />
            {/* Progress arc */}
            <circle
              cx="64"
              cy="64"
              r={radius}
              stroke="currentColor"
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="text-emerald-500 transition-all duration-1000 ease-out"
              fill="transparent"
            />
          </svg>

          {/* Center Percentage Display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {score}%
            </span>
            <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
              ATS Score
            </span>
          </div>
        </div>

        {/* Quality Rating Below */}
        <div className="pt-2 border-t border-slate-100 w-full flex items-center justify-between text-xs">
          <span className="text-slate-500 font-medium">Resume Quality</span>
          <span className="font-extrabold text-emerald-600 flex items-center gap-1">
            <FaStar className="text-amber-400 text-xs" />
            <span>{quality}</span>
          </span>
        </div>
      </div>
    </Card>
  );
}

export default ATSCard;
