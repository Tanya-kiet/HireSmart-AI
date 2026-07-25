import React, { useState } from "react";
import PipelineColumn from "./PipelineColumn";
import { FaTimes, FaArrowRight, FaExclamationTriangle } from "react-icons/fa";

function PipelineBoard({
  candidates,
  stageMetrics,
  onUpdateCandidateStage,
  selectedIds,
  onToggleSelect,
}) {
  const [targetMoveCandidate, setTargetMoveCandidate] = useState(null);
  const [selectedTargetStage, setSelectedTargetStage] = useState("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const stagesList = [
    { key: "Applied", title: "Applied" },
    { key: "Screening", title: "Screening" },
    { key: "Assessment", title: "Assessment" },
    { key: "Technical", title: "Technical" },
    { key: "HR", title: "HR Round" },
    { key: "Final Interview", title: "Final Interview" },
    { key: "Offer", title: "Offer Extended" },
    { key: "Hired", title: "Hired" },
    { key: "Rejected", title: "Rejected" },
  ];

  const handleInitiateMove = (candidate) => {
    setTargetMoveCandidate(candidate);
    setSelectedTargetStage(candidate.stage);
    setIsConfirmOpen(true);
  };

  const handleConfirmMove = () => {
    if (!targetMoveCandidate || !selectedTargetStage) return;
    onUpdateCandidateStage(targetMoveCandidate.id, selectedTargetStage);
    setIsConfirmOpen(false);
    setTargetMoveCandidate(null);
  };

  return (
    <div className="space-y-3 font-sans">
      {/* Kanban Board Container */}
      <div className="flex items-start gap-3 overflow-x-auto pb-4 pt-1">
        {stagesList.map((stage) => {
          const stageCandidates = candidates.filter(
            (c) => c.stage === stage.key
          );
          const metric = stageMetrics ? stageMetrics[stage.key] : null;

          return (
            <PipelineColumn
              key={stage.key}
              stageKey={stage.key}
              stageTitle={stage.title}
              candidates={stageCandidates}
              metric={metric}
              onMoveStage={handleInitiateMove}
              selectedIds={selectedIds}
              onToggleSelect={onToggleSelect}
            />
          );
        })}
      </div>

      {/* Sensitive Action Confirmation Modal */}
      {isConfirmOpen && targetMoveCandidate && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in text-xs font-sans">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <FaExclamationTriangle className="text-amber-500 text-sm" />
                <h3 className="text-base font-bold text-slate-900">
                  Update Candidate Stage
                </h3>
              </div>
              <button
                onClick={() => setIsConfirmOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <FaTimes />
              </button>
            </div>

            <p className="text-slate-600 font-medium">
              Move candidate <strong className="text-slate-900">{targetMoveCandidate.name}</strong> for position <span className="text-blue-600 font-bold">{targetMoveCandidate.appliedJobTitle}</span>:
            </p>

            <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
              {stagesList.map((s) => (
                <div
                  key={s.key}
                  onClick={() => setSelectedTargetStage(s.key)}
                  className={`p-2.5 rounded-xl border font-semibold cursor-pointer transition-all flex items-center justify-between ${
                    selectedTargetStage === s.key
                      ? "bg-blue-50 text-blue-900 border-blue-300 shadow-2xs"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <span>{s.title}</span>
                  {selectedTargetStage === s.key && (
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                  )}
                </div>
              ))}
            </div>

            {(selectedTargetStage === "Rejected" || selectedTargetStage === "Offer") && (
              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-[11px] text-amber-900 font-medium">
                ⚠️ Notice: Moving to '{selectedTargetStage}' triggers automated recruiter notification and candidate communication logs.
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setIsConfirmOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmMove}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
              >
                <span>Confirm Move</span>
                <FaArrowRight className="text-[10px]" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PipelineBoard;
