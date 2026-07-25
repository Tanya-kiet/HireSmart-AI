import React from "react";
import { FaBriefcase, FaUsers, FaCalendarCheck } from "react-icons/fa";

function JobStats({ totalJobs, totalApps, scheduledInterviews }) {
  const kpis = [
    {
      title: "Open Positions",
      value: totalJobs || 12,
      subtitle: "Active hiring requisitions",
      icon: FaBriefcase,
      color: "bg-blue-50 text-blue-600 border-blue-100",
    },
    {
      title: "Applications",
      value: (totalApps || 1420).toLocaleString(),
      subtitle: "Total applicants across roles",
      icon: FaUsers,
      color: "bg-emerald-50 text-emerald-600 border-emerald-100",
    },
    {
      title: "Interviews Scheduled",
      value: scheduledInterviews || 420,
      subtitle: "Upcoming candidate rounds",
      icon: FaCalendarCheck,
      color: "bg-purple-50 text-purple-600 border-purple-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-sans">
      {kpis.map((kpi, idx) => {
        const Icon = kpi.icon;
        return (
          <div
            key={idx}
            className="p-4 bg-white border border-slate-200 rounded-xl shadow-2xs space-y-2 flex items-center justify-between transition-all hover:border-slate-300"
          >
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                {kpi.title}
              </span>
              <span className="text-2xl font-black text-slate-900 tracking-tight block mt-0.5">
                {kpi.value}
              </span>
              <span className="text-[11px] text-slate-500 font-medium block mt-0.5">
                {kpi.subtitle}
              </span>
            </div>

            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm ${kpi.color} border shrink-0`}
            >
              <Icon />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default JobStats;
