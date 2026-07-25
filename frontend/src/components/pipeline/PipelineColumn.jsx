import React from "react";
import CandidatePipelineCard from "./CandidatePipelineCard";

function PipelineColumn({
  stageKey,
  stageTitle,
  candidates,
  metric,
  onMoveStage,
  selectedIds,
  onToggleSelect,
}) {
  const getStageBadgeColor = (key) => {
    switch (key) {
      case "Applied":
        return "bg-slate-100 text-slate-800 border-slate-300";
      case "Screening":
        return "bg-blue-50 text-blue-800 border-blue-200";
      case "Assessment":
        return "bg-cyan-50 text-cyan-800 border-cyan-200";
      case "Technical":
        return "bg-purple-50 text-purple-800 border-purple-200";
      case "HR":
        return "bg-indigo-50 text-indigo-800 border-indigo-200";
      case "Final Interview":
        return "bg-amber-50 text-amber-800 border-amber-200";
      case "Offer":
        return "bg-emerald-50 text-emerald-800 border-emerald-200";
      case "Hired":
        return "bg-emerald-100 text-emerald-900 border-emerald-300";
      case "Rejected":
        return "bg-rose-50 text-rose-800 border-rose-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  return (
    <div className="w-72 shrink-0 bg-slate-50/90 border border-slate-200/90 rounded-xl p-3 space-y-3 min-h-[500px] flex flex-col">
      {/* Column Header */}
      <div className="space-y-1.5 pb-2 border-b border-slate-200/80">
        <div className="flex items-center justify-between gap-2">
          <span
            className={`px-2.5 py-0.5 text-xs font-bold rounded-md border uppercase ${getStageBadgeColor(
              stageKey
            )}`}
          >
            {stageTitle}
          </span>
          <span className="px-2 py-0.5 text-[11px] font-bold bg-white text-slate-900 rounded border border-slate-200 shadow-2xs">
            {candidates.length}
          </span>
        </div>

        {metric && (
          <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium pt-0.5">
            <span>Avg {metric.avgDays} days</span>
            <span className="text-slate-400">•</span>
            <span>Drop {metric.dropRate}%</span>
          </div>
        )}
      </div>

      {/* Cards Stream */}
      <div className="space-y-2.5 flex-1 overflow-y-auto pr-0.5">
        {candidates.length === 0 ? (
          <div className="p-4 border border-dashed border-slate-200 rounded-xl text-center text-[11px] text-slate-400 font-medium">
            No candidates in this stage
          </div>
        ) : (
          candidates.map((cand) => (
            <CandidatePipelineCard
              key={cand.id}
              candidate={cand}
              onMoveStage={onMoveStage}
              isSelected={selectedIds.includes(cand.id)}
              onToggleSelect={onToggleSelect}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default PipelineColumn;
