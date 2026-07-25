import React from "react";
import { FaClock, FaStar, FaCheckCircle, FaTachometerAlt } from "react-icons/fa";

function HiringPerformanceCards() {
  const perfMetrics = [
    {
      title: "Time to Hire",
      value: "19 Days",
      comparison: "-3 days vs last mo",
      subtext: "Fast-Track Requisition SLA",
      icon: FaClock,
      color: "bg-teal-50 text-teal-700 border-teal-200",
    },
    {
      title: "Average ATS Score",
      value: "88.4%",
      comparison: "+1.8% vs last mo",
      subtext: "Top 5% Resume Quality",
      icon: FaStar,
      color: "bg-amber-50 text-amber-700 border-amber-200",
    },
    {
      title: "Average Match Score",
      value: "89.2%",
      comparison: "+2.4% vs last mo",
      subtext: "Vector Embedding Fit",
      icon: FaTachometerAlt,
      color: "bg-blue-50 text-blue-700 border-blue-200",
    },
    {
      title: "Average Interview Rating",
      value: "4.6 / 5.0",
      comparison: "+0.2 rating vs last mo",
      subtext: "Strong Evaluator Consensus",
      icon: FaCheckCircle,
      color: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4 font-sans text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-sm font-bold text-slate-900 tracking-tight">
          Section 2 — Hiring Performance Metrics
        </h3>
        <span className="text-[10px] text-slate-400 font-mono">Monthly Benchmarks</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {perfMetrics.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200/80 space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {item.title}
                </span>
                <Icon className="text-slate-400 text-xs" />
              </div>

              <div className="font-black text-xl text-slate-900 tracking-tight">
                {item.value}
              </div>

              <div className="flex items-center justify-between text-[10px]">
                <span className="font-semibold text-emerald-700">{item.comparison}</span>
                <span className="text-slate-400 font-medium">{item.subtext}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HiringPerformanceCards;
