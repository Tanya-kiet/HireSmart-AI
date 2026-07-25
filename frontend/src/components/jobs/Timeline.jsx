import React from "react";
import { FaCheckCircle, FaClock, FaUser } from "react-icons/fa";

function Timeline({ events }) {
  if (!events || events.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 flex items-center justify-between">
        <span>Job Hiring Timeline & Audit Trail</span>
        <span className="text-slate-500 font-medium">{events.length} Historical Milestones</span>
      </div>

      <div className="relative pl-6 space-y-5 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
        {events.map((evt) => (
          <div key={evt.id} className="relative flex items-start gap-4 text-xs">
            <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center border-2 border-emerald-600 bg-white text-emerald-600">
              <FaCheckCircle className="text-[11px]" />
            </div>

            <div className="flex-1 p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h4 className="font-bold text-slate-900 text-sm">{evt.title}</h4>
                <span className="text-[11px] font-mono text-slate-400">{evt.date}</span>
              </div>

              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                {evt.desc}
              </p>

              <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-semibold pt-1 border-t border-slate-100">
                <FaUser className="text-slate-400 text-[10px]" />
                <span>Logged by: {evt.user}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Timeline;
