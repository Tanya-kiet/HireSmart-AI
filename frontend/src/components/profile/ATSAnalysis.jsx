import React, { useState } from "react";
import Card from "../common/Card";
import Badge from "../common/Badge";
import { FaCheckCircle, FaChevronDown, FaChevronUp } from "react-icons/fa";

function ATSAnalysis({ metrics }) {
  const [showDetails, setShowDetails] = useState(false);

  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const score = metrics?.overall || 96;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const breakdown = [
    { label: "Keyword Coverage", value: metrics?.keywordCoverage || 92, status: "High Overlap" },
    { label: "Formatting & Parser Readability", value: metrics?.formattingScore || 98, status: "Clean Layout" },
    { label: "Experience Alignment", value: metrics?.experienceScore || 94, status: "Senior Level" },
    { label: "Education & Degree Credential", value: metrics?.educationScore || 90, status: "B.S. CS Stanford" },
    { label: "Projects & Technical Portfolio", value: metrics?.projectsScore || 95, status: "5 Production Apps" },
    { label: "Certifications", value: metrics?.certificationScore || 88, status: "AWS Certified" },
  ];

  return (
    <Card
      title="Resume Parser Compatibility"
      subtitle="Parsing evaluation across 6 key candidate parameters"
      headerBorder
      action={
        <Badge variant="emerald" size="sm" dot>
          Grade A+ Passed
        </Badge>
      }
    >
      <div className="space-y-4">
        {/* Main Essential Gauge & Top 3 Summary */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
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
                  className="text-emerald-500 transition-all duration-1000 ease-out"
                  fill="transparent"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  {score}%
                </span>
                <span className="text-[10px] font-semibold text-emerald-600 uppercase tracking-wider">
                  ATS Rating
                </span>
              </div>
            </div>

            <div className="mt-2 text-xs font-bold text-slate-800">
              Highly Compatible Resume
            </div>
          </div>

          {/* Core Summary Parameters */}
          <div className="md:col-span-7 space-y-2.5 text-xs">
            {breakdown.slice(0, 3).map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between font-semibold">
                  <span className="text-slate-700">{item.label}</span>
                  <span className="text-slate-900 font-mono font-bold">
                    {item.value}%
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progressive Disclosure Toggle */}
        <div className="pt-2 border-t border-slate-100 text-center">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1.5 cursor-pointer"
          >
            <span>{showDetails ? "Hide Detailed Parameter Breakdown" : "Expand Full Parameter Breakdown"}</span>
            {showDetails ? <FaChevronUp className="text-[10px]" /> : <FaChevronDown className="text-[10px]" />}
          </button>
        </div>

        {/* Expanded Details Section */}
        {showDetails && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs animate-in fade-in duration-200">
            {breakdown.map((item, idx) => (
              <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 space-y-1">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>{item.label}</span>
                  <span className="text-blue-600 font-mono">{item.value}%</span>
                </div>
                <span className="text-[11px] text-slate-500 font-medium block">
                  Status: {item.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}

export default ATSAnalysis;
