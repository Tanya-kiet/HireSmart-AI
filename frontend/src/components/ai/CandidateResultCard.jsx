import React from "react";
import ActionToolbar from "./ActionToolbar";
import { useNavigate } from "react-router-dom";

function CandidateResultCard({ candidate, onAction }) {
  const navigate = useNavigate();

  if (!candidate) return null;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs space-y-3 font-sans text-xs">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          {candidate.photo ? (
            <img
              src={candidate.photo}
              alt={candidate.name}
              className="w-10 h-10 rounded-lg object-cover border border-slate-200"
            />
          ) : (
            <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
              {candidate.name.split(" ").map((n) => n[0]).join("")}
            </div>
          )}

          <div>
            <h4
              onClick={() => navigate(`/candidate/${candidate.id}`)}
              className="font-bold text-slate-900 hover:text-blue-600 text-xs cursor-pointer block"
            >
              {candidate.name}
            </h4>
            <p className="text-[11px] text-slate-500 font-semibold">{candidate.role}</p>
          </div>
        </div>

        <span className="px-2 py-0.5 font-bold text-emerald-800 bg-emerald-50 rounded border border-emerald-200 text-[11px]">
          {candidate.matchScore}% Match
        </span>
      </div>

      {candidate.summary && (
        <p className="text-[11px] text-slate-600 font-medium leading-relaxed bg-slate-50 p-2 rounded border border-slate-100">
          "{candidate.summary}"
        </p>
      )}

      {candidate.skills && candidate.skills.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {candidate.skills.map((s, idx) => (
            <span key={idx} className="px-2 py-0.5 bg-slate-100 text-slate-700 font-semibold text-[10px] rounded">
              {s}
            </span>
          ))}
        </div>
      )}

      <ActionToolbar
        candidateId={candidate.id}
        onSchedule={() => onAction("schedule", candidate)}
        onMoveStage={() => onAction("move-stage", candidate)}
        onShortlist={() => onAction("shortlist", candidate)}
        onReject={() => onAction("reject", candidate)}
        onDownload={() => onAction("download", candidate)}
      />
    </div>
  );
}

export default CandidateResultCard;
