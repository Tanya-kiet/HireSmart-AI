import React from "react";
import RecommendationBadge from "./RecommendationBadge";
import ScoreBadge from "./ScoreBadge";
import Badge from "../common/Badge";
import { FaCrown, FaInfoCircle } from "react-icons/fa";

function RankingTable({
  candidates,
  selectedIds,
  onToggleSelect,
  onViewCandidate,
}) {
  const getRankBadge = (rank) => {
    if (rank === 1) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 font-black text-xs">
          <FaCrown className="text-amber-500 text-[10px]" />
          #1
        </span>
      );
    }
    if (rank === 2) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-100 text-slate-700 border border-slate-300 font-extrabold text-xs">
          #2
        </span>
      );
    }
    if (rank === 3) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-orange-50 text-orange-800 border border-orange-200 font-extrabold text-xs">
          #3
        </span>
      );
    }
    return (
      <span className="text-slate-500 font-mono font-bold text-xs px-2 py-0.5">
        #{rank}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden hidden md:block">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-100 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              <th className="py-3.5 px-3 text-center w-8">Select</th>
              <th className="py-3.5 px-3 text-center w-14">Rank</th>
              <th className="py-3.5 px-4">Candidate</th>
              <th className="py-3.5 px-4">Category</th>
              <th className="py-3.5 px-4 text-center w-28">ATS Score</th>
              <th className="py-3.5 px-4 text-center w-28">Match Score</th>
              <th className="py-3.5 px-4">Experience</th>
              <th className="py-3.5 px-4">Top Skills</th>
              <th className="py-3.5 px-4">Recommendation</th>
              <th className="py-3.5 px-6 text-right">Overall</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {candidates.map((cand) => {
              const isChecked = selectedIds.includes(cand.id);
              return (
                <tr
                  key={cand.id}
                  onClick={() => onViewCandidate(cand)}
                  className={`hover:bg-slate-50/90 transition-all group cursor-pointer ${
                    isChecked ? "bg-blue-50/40" : ""
                  }`}
                >
                  {/* Selection Checkbox */}
                  <td
                    className="py-3.5 px-3 text-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => onToggleSelect(cand.id)}
                      className="w-4 h-4 text-blue-600 rounded-md border-slate-300 focus:ring-blue-500 cursor-pointer accent-blue-600"
                    />
                  </td>

                  {/* Rank Badge */}
                  <td className="py-3.5 px-3 text-center font-bold">
                    {getRankBadge(cand.rank)}
                  </td>

                  {/* Candidate Overview */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl ${cand.avatarBg} text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs`}
                      >
                        {cand.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate flex items-center gap-1.5">
                          <span>{cand.name}</span>
                        </div>
                        <div className="text-[10px] text-slate-400 truncate flex items-center gap-1">
                          <FaInfoCircle className="text-slate-400 text-[9px]" />
                          <span>{cand.whyRanked}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-3.5 px-4">
                    <Badge variant="blue" size="sm">
                      {cand.category}
                    </Badge>
                  </td>

                  {/* ATS Score Progress */}
                  <td className="py-3.5 px-4 text-center">
                    <div className="space-y-1">
                      <span className="font-bold text-slate-800 text-xs">
                        {cand.atsScore}%
                      </span>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-blue-600 h-full rounded-full"
                          style={{ width: `${cand.atsScore}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Match Score Progress */}
                  <td className="py-3.5 px-4 text-center">
                    <div className="space-y-1">
                      <span className="font-bold text-emerald-600 text-xs">
                        {cand.matchScore}%
                      </span>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-emerald-500 h-full rounded-full"
                          style={{ width: `${cand.matchScore}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Experience */}
                  <td className="py-3.5 px-4 font-medium text-slate-700">
                    {cand.experience}
                  </td>

                  {/* Top Skills Badges */}
                  <td className="py-3.5 px-4">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {cand.skills.slice(0, 3).map((skill, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200/60"
                        >
                          {skill}
                        </span>
                      ))}
                      {cand.skills.length > 3 && (
                        <span className="text-[10px] font-bold text-slate-400">
                          +{cand.skills.length - 3}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Recommendation Badge */}
                  <td className="py-3.5 px-4">
                    <RecommendationBadge recommendation={cand.recommendation} size="sm" />
                  </td>

                  {/* Overall Score */}
                  <td className="py-3.5 px-6 text-right">
                    <ScoreBadge score={cand.overallScore} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RankingTable;
