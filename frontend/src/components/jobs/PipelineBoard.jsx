import React, { useState } from "react";
import CandidateCard from "./CandidateCard";
import { FaPlus, FaFilter } from "react-icons/fa";

function PipelineBoard({ applicants, onSelectCompare, selectedCompareList, onSchedule }) {
  const pipelineStages = [
    { id: "Applied", title: "Applied", color: "bg-slate-100 border-slate-200 text-slate-700" },
    { id: "Screened", title: "Screened", color: "bg-blue-50 border-blue-200 text-blue-800" },
    { id: "Shortlisted", title: "Shortlisted", color: "bg-indigo-50 border-indigo-200 text-indigo-800" },
    { id: "Interview Scheduled", title: "Interview", color: "bg-purple-50 border-purple-200 text-purple-800" },
    { id: "Final Round", title: "Final Round", color: "bg-amber-50 border-amber-200 text-amber-800" },
    { id: "Offer", title: "Offer", color: "bg-emerald-50 border-emerald-200 text-emerald-800" },
    { id: "Hired", title: "Hired", color: "bg-emerald-100 border-emerald-300 text-emerald-900" },
    { id: "Rejected", title: "Rejected", color: "bg-rose-50 border-rose-200 text-rose-800" },
  ];

  return (
    <div className="space-y-4">
      {/* Board Info Header */}
      <div className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between text-xs font-semibold text-slate-700 shadow-2xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-900">8 Stage Recruitment Pipeline Board</span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-500 font-medium">
            Total {applicants.length} Candidates Managed
          </span>
        </div>
        <span className="text-slate-400 font-mono text-[10px]">Kanban Active</span>
      </div>

      {/* Kanban Columns Horizontal Overflow Grid */}
      <div className="flex items-start gap-3 overflow-x-auto pb-4 pt-1">
        {pipelineStages.map((stage) => {
          const stageApplicants = applicants.filter((a) => a.stage === stage.id);

          return (
            <div
              key={stage.id}
              className="w-72 shrink-0 bg-slate-50 border border-slate-200/90 rounded-xl p-3 space-y-3 min-h-[480px]"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-200/80">
                <span className={`px-2.5 py-0.5 text-xs font-bold rounded-md border ${stage.color}`}>
                  {stage.title}
                </span>
                <span className="px-2 py-0.5 text-[11px] font-bold bg-white text-slate-700 rounded border border-slate-200 shadow-2xs">
                  {stageApplicants.length}
                </span>
              </div>

              {/* Cards Stream */}
              <div className="space-y-2.5">
                {stageApplicants.length === 0 ? (
                  <div className="p-4 border border-dashed border-slate-200 rounded-xl text-center text-[11px] text-slate-400 font-medium">
                    No candidates in this stage
                  </div>
                ) : (
                  stageApplicants.map((cand) => (
                    <CandidateCard
                      key={cand.id}
                      candidate={cand}
                      onSelectCompare={onSelectCompare}
                      isSelectedForCompare={selectedCompareList?.some((c) => c.id === cand.id)}
                      onSchedule={onSchedule}
                      compact
                    />
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PipelineBoard;
