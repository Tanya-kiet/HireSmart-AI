import React from "react";
import { FaFilter, FaChevronDown } from "react-icons/fa";

function ExecutiveFunnel() {
  const stages = [
    { label: "Applications", count: "1,420", conversion: "100%", trend: "+12% vs last mo", width: "w-full", bg: "bg-slate-900 text-white" },
    { label: "Screened", count: "850", conversion: "59.8%", trend: "+4.1% vs last mo", width: "w-[85%]", bg: "bg-blue-600 text-white" },
    { label: "Shortlisted", count: "620", conversion: "43.6%", trend: "+2.8% vs last mo", width: "w-[70%]", bg: "bg-indigo-600 text-white" },
    { label: "Interviewed", count: "420", conversion: "29.5%", trend: "+3.2% vs last mo", width: "w-[55%]", bg: "bg-purple-600 text-white" },
    { label: "Offer", count: "95", conversion: "6.7%", trend: "+1.5% vs last mo", width: "w-[40%]", bg: "bg-teal-600 text-white" },
    { label: "Hired", count: "68", conversion: "4.8%", trend: "+0.9% vs last mo", width: "w-[28%]", bg: "bg-emerald-600 text-white" },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4 font-sans text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <FaFilter className="text-slate-500 text-xs" />
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">
            Section 1 — Hiring Funnel Conversion
          </h3>
        </div>
        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
          4.8% Hired Conversion SLA
        </span>
      </div>

      <div className="space-y-2 pt-1">
        {stages.map((stg, idx) => (
          <div key={idx} className="space-y-1">
            <div className={`mx-auto p-3 rounded-xl ${stg.width} ${stg.bg} shadow-2xs flex items-center justify-between gap-3 transition-all`}>
              <span className="font-bold tracking-wide">{stg.label}</span>
              <div className="flex items-center gap-3">
                <span className="font-extrabold text-sm">{stg.count}</span>
                <span className="text-[10px] font-mono opacity-80 font-bold bg-black/20 px-1.5 py-0.5 rounded">
                  {stg.conversion}
                </span>
                <span className="text-[10px] opacity-75 font-semibold hidden sm:inline-block">
                  {stg.trend}
                </span>
              </div>
            </div>

            {idx < stages.length - 1 && (
              <div className="flex justify-center text-slate-300">
                <FaChevronDown className="text-[9px]" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExecutiveFunnel;
