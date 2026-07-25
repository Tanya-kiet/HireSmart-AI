import React from "react";
import RecommendationBadge from "./RecommendationBadge";
import ScoreBadge from "./ScoreBadge";
import Badge from "../common/Badge";
import { FaCrown, FaStar } from "react-icons/fa";

function RankingCard({ candidate, isChecked, onToggleSelect, onView }) {
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

          <span className="font-extrabold text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
            #{candidate.rank}
          </span>

          <div
            className={`w-9 h-9 rounded-xl ${candidate.avatarBg} text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs`}
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
            <p className="text-xs text-slate-500">{candidate.category}</p>
          </div>
        </div>

        <ScoreBadge score={candidate.overallScore} />
      </div>

      <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 italic">
        "{candidate.whyRanked}"
      </p>

      <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
        <div className="flex items-center gap-3">
          <span>ATS: <strong className="text-slate-900">{candidate.atsScore}%</strong></span>
          <span>Match: <strong className="text-emerald-600">{candidate.matchScore}%</strong></span>
        </div>

        <RecommendationBadge recommendation={candidate.recommendation} size="sm" />
      </div>
    </div>
  );
}

export default RankingCard;
