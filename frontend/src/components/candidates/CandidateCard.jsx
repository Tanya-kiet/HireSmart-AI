import React from "react";
import Badge from "../common/Badge";
import Button from "../common/Button";
import { FaEye, FaTrash, FaCheckCircle, FaStar } from "react-icons/fa";

function CandidateCard({
  candidate,
  isChecked,
  onToggleSelect,
  onView,
  onDelete,
}) {
  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case "Hired":
        return "emerald";
      case "Interview":
        return "purple";
      case "Reviewed":
        return "indigo";
      case "New":
        return "blue";
      case "Rejected":
        return "rose";
      default:
        return "slate";
    }
  };

  return (
    <div
      onClick={() => onView(candidate)}
      className={`bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs space-y-3 md:hidden transition-all cursor-pointer ${
        isChecked ? "border-blue-400 bg-blue-50/20" : "hover:border-slate-300"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => {
              e.stopPropagation();
              onToggleSelect(candidate.id);
            }}
            className="w-4 h-4 text-blue-600 rounded-md border-slate-300 focus:ring-blue-500 cursor-pointer accent-blue-600"
          />

          <div
            className={`w-10 h-10 rounded-xl ${candidate.avatarBg} text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs`}
          >
            {candidate.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>

          <div>
            <h4 className="font-bold text-slate-900 text-sm">
              {candidate.name}
            </h4>
            <p className="text-xs text-slate-500">{candidate.email}</p>
          </div>
        </div>

        <Badge variant={getStatusBadgeVariant(candidate.status)} size="sm" dot>
          {candidate.status}
        </Badge>
      </div>

      <div className="flex flex-wrap items-center justify-between text-xs pt-2 border-t border-slate-100 gap-2">
        <div>
          <span className="text-[10px] text-slate-400 block">Category</span>
          <span className="font-bold text-slate-800">{candidate.predictedCategory}</span>
        </div>

        <div className="text-right">
          <span className="text-[10px] text-slate-400 block">Match / ATS</span>
          <span className="font-extrabold text-emerald-600">
            {candidate.matchScore}% Match
          </span>
          <span className="text-slate-400 text-[10px] ml-1">
            ({candidate.atsScore}% ATS)
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
        <span className="text-slate-400 font-medium">{candidate.uploadedDate}</span>

        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <Button variant="outline" size="xs" onClick={() => onView(candidate)}>
            View
          </Button>
          <button
            onClick={() => onDelete(candidate)}
            className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg"
          >
            <FaTrash className="text-xs" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CandidateCard;
