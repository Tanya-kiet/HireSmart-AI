import React from "react";
import { FaCheckCircle, FaCircle } from "react-icons/fa";

function InterviewTimeline({ currentStageIndex = 2 }) {
  const stages = [
    "Application",
    "Resume Screening",
    "Technical Round",
    "HR Round",
    "Final Round",
    "Offer",
  ];

  return (
    <div className="w-full bg-slate-50 p-4 rounded-2xl border border-slate-200/70 space-y-3">
      <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
        Interview Progress Timeline
      </div>

      <div className="flex items-center justify-between relative">
        {/* Connecting Line */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-slate-200 z-0" />
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-600 z-0 transition-all duration-500"
          style={{
            width: `${(currentStageIndex / (stages.length - 1)) * 100}%`,
          }}
        />

        {stages.map((stage, idx) => {
          const isCompleted = idx < currentStageIndex;
          const isCurrent = idx === currentStageIndex;

          return (
            <div
              key={idx}
              className="relative z-10 flex flex-col items-center group cursor-pointer"
            >
              {/* Circle Icon */}
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-xs ${
                  isCompleted
                    ? "bg-emerald-600 text-white ring-4 ring-white"
                    : isCurrent
                    ? "bg-blue-600 text-white ring-4 ring-blue-100 animate-pulse"
                    : "bg-white text-slate-400 border border-slate-300"
                }`}
              >
                {isCompleted ? (
                  <FaCheckCircle className="text-xs" />
                ) : (
                  <span>{idx + 1}</span>
                )}
              </div>

              {/* Stage Label */}
              <span
                className={`text-[10px] font-semibold mt-1.5 text-center max-w-[70px] truncate ${
                  isCurrent
                    ? "text-blue-600 font-bold"
                    : isCompleted
                    ? "text-slate-800"
                    : "text-slate-400"
                }`}
              >
                {stage}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default InterviewTimeline;
