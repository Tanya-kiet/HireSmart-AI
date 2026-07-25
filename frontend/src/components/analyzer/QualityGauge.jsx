import React from "react";
import Card from "../common/Card";
import Badge from "../common/Badge";
import { FaStar, FaBriefcase, FaCodeBranch, FaCheckCircle, FaComments } from "react-icons/fa";

function QualityGauge({ score = 90 }) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const expMetrics = [
    { label: "Experience Level", val: "Mid-Level (5+ Yrs)", icon: FaBriefcase, color: "text-blue-600" },
    { label: "Project Complexity", val: "High (5 Apps)", icon: FaCodeBranch, color: "text-purple-600" },
    { label: "Technical Depth", val: "Excellent", icon: FaCheckCircle, color: "text-emerald-600" },
    { label: "Communication", val: "Good", icon: FaComments, color: "text-amber-600" },
  ];

  return (
    <Card
      title="Resume Quality & Experience Assessment"
      subtitle="AI evaluated depth, complexity, and communication clarity"
      headerBorder
      action={
        <Badge variant="emerald" size="sm" dot>
          Grade A+ (Top 5%)
        </Badge>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* SVG Circular Quality Gauge */}
        <div className="md:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl border border-slate-200/70 text-center">
          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r={radius}
                stroke="currentColor"
                strokeWidth="8"
                className="text-slate-200"
                fill="transparent"
              />
              <circle
                cx="64"
                cy="64"
                r={radius}
                stroke="currentColor"
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="text-blue-600 transition-all duration-1000 ease-out"
                fill="transparent"
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {score}%
              </span>
              <span className="text-[10px] font-semibold text-blue-600 uppercase tracking-wider">
                Resume Quality
              </span>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-1 text-xs font-bold text-slate-800">
            <FaStar className="text-amber-400 text-xs" />
            <span>Excellent Overall Rating</span>
          </div>
        </div>

        {/* Experience Metrics Grid */}
        <div className="md:col-span-7 grid grid-cols-2 gap-3 text-xs">
          {expMetrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={idx}
                className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70 flex flex-col justify-between"
              >
                <div className="flex items-center gap-1.5 text-slate-400 font-medium text-[11px]">
                  <Icon className={m.color} />
                  <span>{m.label}</span>
                </div>
                <div className="text-sm font-extrabold text-slate-900 mt-1">
                  {m.val}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}

export default QualityGauge;
