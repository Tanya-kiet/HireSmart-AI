import React from "react";
import { FaCheckCircle, FaClock, FaUser, FaCircle } from "react-icons/fa";

function Timeline({ timeline }) {
  if (!timeline || timeline.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 flex items-center justify-between">
        <span>Recruitment Stage Lifecycle</span>
        <span className="text-slate-500 font-medium">9 Milestone Tracking</span>
      </div>

      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
        {timeline.map((item, idx) => {
          const isCompleted = item.status === "completed";
          const isCurrent = item.status === "current";

          return (
            <div key={idx} className="relative flex items-start gap-4 text-xs">
              {/* Vertical Dot Indicator */}
              <div
                className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center border-2 bg-white transition-all ${
                  isCompleted
                    ? "border-emerald-600 text-emerald-600"
                    : isCurrent
                    ? "border-blue-600 text-blue-600 ring-4 ring-blue-50"
                    : "border-slate-300 text-slate-300"
                }`}
              >
                {isCompleted ? (
                  <FaCheckCircle className="text-[11px]" />
                ) : isCurrent ? (
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                ) : (
                  <FaCircle className="text-[6px]" />
                )}
              </div>

              {/* Card Details */}
              <div
                className={`flex-1 p-3.5 rounded-xl border transition-all ${
                  isCurrent
                    ? "bg-blue-50/50 border-blue-200 shadow-2xs"
                    : isCompleted
                    ? "bg-white border-slate-200"
                    : "bg-slate-50/50 border-slate-200/60 opacity-60"
                }`}
              >
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="font-bold text-slate-900 text-sm">
                    {item.stage}
                  </span>
                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold rounded-md border uppercase ${
                      isCompleted
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : isCurrent
                        ? "bg-blue-50 text-blue-700 border-blue-200"
                        : "bg-slate-100 text-slate-500 border-slate-200"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-slate-500 font-medium text-[11px] mt-2 pt-2 border-t border-slate-100">
                  <span className="flex items-center gap-1">
                    <FaClock className="text-slate-400 text-[10px]" />
                    {item.date} {item.time !== "--" && `at ${item.time}`}
                  </span>

                  <span className="flex items-center gap-1 text-slate-700">
                    <FaUser className="text-slate-400 text-[10px]" />
                    {item.user}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Timeline;
