import React from "react";
import { FaCalendarAlt, FaCalendarCheck, FaClock } from "react-icons/fa";

function InterviewStats({ upcomingCount, todayCount, pendingFeedbackCount }) {
  const kpis = [
    {
      title: "Upcoming Interviews",
      value: upcomingCount || 18,
      subtitle: "Next 7 days scheduled",
      icon: FaCalendarAlt,
      color: "bg-blue-50 text-blue-600 border-blue-100",
    },
    {
      title: "Today's Interviews",
      value: todayCount || 6,
      subtitle: "Scheduled for today",
      icon: FaCalendarCheck,
      color: "bg-emerald-50 text-emerald-600 border-emerald-100",
    },
    {
      title: "Feedback Pending",
      value: pendingFeedbackCount || 3,
      subtitle: "Awaiting scorecard review",
      icon: FaClock,
      color: "bg-amber-50 text-amber-600 border-amber-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-sans">
      {kpis.map((kpi, idx) => {
        const Icon = kpi.icon;
        return (
          <div
            key={idx}
            className="p-4 bg-white border border-slate-200 rounded-xl shadow-2xs space-y-1.5 flex items-center justify-between transition-all hover:border-slate-300"
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
              className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs ${kpi.color} border shrink-0`}
            >
              <Icon className="text-xs" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default InterviewStats;
