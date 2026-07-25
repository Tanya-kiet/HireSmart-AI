import React from "react";
import { FaChevronDown, FaFilter } from "react-icons/fa";

function HiringFunnelVisual() {
  const funnelStages = [
    { label: "Applications", count: "1,420", conversion: "100%", width: "w-full", bg: "bg-slate-900 text-white" },
    { label: "Screened", count: "850", conversion: "59.8%", width: "w-[82%]", bg: "bg-blue-600 text-white" },
    { label: "Interview", count: "420", conversion: "29.5%", width: "w-[64%]", bg: "bg-indigo-600 text-white" },
    { label: "Offer", count: "95", conversion: "6.7%", width: "w-[46%]", bg: "bg-teal-600 text-white" },
    { label: "Hired", count: "68", conversion: "4.8%", width: "w-[30%]", bg: "bg-emerald-600 text-white" },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4 font-sans">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <FaFilter className="text-slate-500 text-sm" />
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">
            Hiring Funnel Stage Conversion
          </h3>
        </div>
        <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
          4.8% Overall Hired Rate
        </span>
      </div>

      {/* Visual Funnel Blocks */}
      <div className="space-y-2.5 pt-1">
        {funnelStages.map((stage, idx) => (
          <div key={idx} className="space-y-1">
            <div className={`mx-auto p-3 rounded-xl ${stage.width} ${stage.bg} shadow-2xs flex items-center justify-between gap-3 text-xs transition-all`}>
              <span className="font-bold tracking-wide">{stage.label}</span>
              <div className="flex items-center gap-3">
                <span className="font-extrabold text-sm">{stage.count}</span>
                <span className="text-[10px] font-mono opacity-80 font-bold bg-black/20 px-1.5 py-0.5 rounded">
                  {stage.conversion}
                </span>
              </div>
            </div>

            {idx < funnelStages.length - 1 && (
              <div className="flex justify-center text-slate-300">
                <FaChevronDown className="text-[10px]" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default HiringFunnelVisual;
