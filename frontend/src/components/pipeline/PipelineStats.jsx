import React from "react";
import {
  FaUsers,
  FaFileContract,
  FaCalendarCheck,
  FaClock,
  FaStar,
  FaTachometerAlt,
  FaShieldAlt,
} from "react-icons/fa";

function PipelineStats({ stats }) {
  if (!stats) return null;

  const kpis = [
    {
      label: "Candidates in Pipeline",
      value: stats.totalPipelineCandidates?.toLocaleString() || "1,420",
      change: "+12% this week",
      icon: FaUsers,
      color: "bg-blue-600",
      textColor: "text-blue-700",
      bgColor: "bg-blue-50/70",
      borderColor: "border-blue-200/80",
    },
    {
      label: "Offers Pending",
      value: stats.offersPending || 18,
      change: "4 expiring soon",
      icon: FaFileContract,
      color: "bg-emerald-600",
      textColor: "text-emerald-700",
      bgColor: "bg-emerald-50/70",
      borderColor: "border-emerald-200/80",
    },
    {
      label: "Interviews Today",
      value: stats.interviewsToday || 14,
      change: "8 completed",
      icon: FaCalendarCheck,
      color: "bg-purple-600",
      textColor: "text-purple-700",
      bgColor: "bg-purple-50/70",
      borderColor: "border-purple-200/80",
    },
    {
      label: "Average Time to Hire",
      value: `${stats.avgTimeToHireDays || 19} Days`,
      change: "-3 days vs last mo",
      icon: FaClock,
      color: "bg-teal-600",
      textColor: "text-teal-700",
      bgColor: "bg-teal-50/70",
      borderColor: "border-teal-200/80",
    },
    {
      label: "Average Match Score",
      value: `${stats.avgMatchScore || 89.2}%`,
      change: "Top 5% quality",
      icon: FaStar,
      color: "bg-amber-600",
      textColor: "text-amber-700",
      bgColor: "bg-amber-50/70",
      borderColor: "border-amber-200/80",
    },
    {
      label: "Hiring Velocity",
      value: stats.hiringVelocity || "14 Days",
      change: "Fast-Track SLAs",
      icon: FaTachometerAlt,
      color: "bg-indigo-600",
      textColor: "text-indigo-700",
      bgColor: "bg-indigo-50/70",
      borderColor: "border-indigo-200/80",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {kpis.map((kpi, idx) => {
        const Icon = kpi.icon;
        return (
          <div
            key={idx}
            className={`p-3.5 rounded-xl border bg-white shadow-2xs space-y-2 transition-all hover:border-slate-300 ${kpi.borderColor}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {kpi.label}
              </span>
              <div
                className={`w-6 h-6 rounded-lg ${kpi.color} text-white flex items-center justify-center text-xs shrink-0 shadow-2xs`}
              >
                <Icon />
              </div>
            </div>

            <div>
              <span className="text-xl font-black text-slate-900 tracking-tight block">
                {kpi.value}
              </span>
              <span className={`text-[10px] font-semibold block mt-0.5 ${kpi.textColor}`}>
                {kpi.change}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PipelineStats;
