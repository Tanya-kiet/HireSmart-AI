import React from "react";
import RecommendationBadge from "./RecommendationBadge";
import ScoreBadge from "./ScoreBadge";
import Button from "../common/Button";
import { FaTimes, FaCheckCircle, FaStar, FaTrophy } from "react-icons/fa";

function ComparisonModal({ candidates = [], isOpen, onClose }) {
  if (!isOpen || candidates.length === 0) return null;

  // Find highest metrics for green highlighting
  const maxAts = Math.max(...candidates.map((c) => c.atsScore));
  const maxMatch = Math.max(...candidates.map((c) => c.matchScore));
  const maxOverall = Math.max(...candidates.map((c) => c.overallScore));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 z-10 space-y-6 my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 shrink-0">
          <div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <FaTrophy className="text-amber-500 text-base" />
              <span>Multi-Candidate AI Comparison Matrix</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Comparing <strong className="text-slate-900">{candidates.length}</strong> selected candidate profiles side-by-side.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-xl cursor-pointer"
          >
            <FaTimes className="text-base" />
          </button>
        </div>

        {/* Scrollable Matrix Area */}
        <div className="overflow-x-auto flex-1 p-1">
          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns: `repeat(${candidates.length}, minmax(240px, 1fr))`,
            }}
          >
            {candidates.map((cand) => {
              const isBestOverall = cand.overallScore === maxOverall;
              const isBestAts = cand.atsScore === maxAts;
              const isBestMatch = cand.matchScore === maxMatch;

              return (
                <div
                  key={cand.id}
                  className={`rounded-2xl border p-4 space-y-4 transition-all ${
                    isBestOverall
                      ? "border-emerald-400 bg-emerald-50/20 shadow-md ring-2 ring-emerald-400/30"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  {/* Candidate Profile Header */}
                  <div className="text-center space-y-2 pb-3 border-b border-slate-100">
                    <div className="relative inline-block">
                      <div
                        className={`w-14 h-14 rounded-2xl ${cand.avatarBg} text-white flex items-center justify-center font-extrabold text-lg mx-auto shadow-2xs`}
                      >
                        {cand.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      {isBestOverall && (
                        <span className="absolute -top-1 -right-1 bg-amber-400 text-slate-950 text-[10px] font-black px-1.5 py-0.5 rounded-full shadow-2xs border border-white">
                          #1 Best
                        </span>
                      )}
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">
                        {cand.name}
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">
                        {cand.category}
                      </p>
                    </div>

                    <RecommendationBadge recommendation={cand.recommendation} size="sm" />
                  </div>

                  {/* Score Highlights */}
                  <div className="space-y-2 text-xs">
                    <div
                      className={`p-2.5 rounded-xl border flex items-center justify-between ${
                        isBestOverall
                          ? "bg-emerald-100/70 border-emerald-300 font-extrabold text-emerald-900"
                          : "bg-slate-50 border-slate-200 text-slate-800 font-semibold"
                      }`}
                    >
                      <span>Overall Rank Score</span>
                      <span className="text-sm font-black">{cand.overallScore}%</span>
                    </div>

                    <div
                      className={`p-2.5 rounded-xl border flex items-center justify-between ${
                        isBestAts
                          ? "bg-blue-100/70 border-blue-300 font-extrabold text-blue-900"
                          : "bg-slate-50 border-slate-200 text-slate-700"
                      }`}
                    >
                      <span>ATS Score</span>
                      <span className="font-bold">{cand.atsScore}%</span>
                    </div>

                    <div
                      className={`p-2.5 rounded-xl border flex items-center justify-between ${
                        isBestMatch
                          ? "bg-emerald-100/70 border-emerald-300 font-extrabold text-emerald-900"
                          : "bg-slate-50 border-slate-200 text-slate-700"
                      }`}
                    >
                      <span>Vector Match</span>
                      <span className="font-bold">{cand.matchScore}%</span>
                    </div>
                  </div>

                  {/* Metadata Attributes */}
                  <div className="space-y-2 text-xs pt-1 border-t border-slate-100">
                    <div className="flex justify-between text-slate-600">
                      <span>Experience:</span>
                      <strong className="text-slate-900">{cand.experience}</strong>
                    </div>

                    <div className="flex justify-between text-slate-600">
                      <span>Projects Built:</span>
                      <strong className="text-slate-900">{cand.projects} Apps</strong>
                    </div>
                  </div>

                  {/* Verified Skills Badges */}
                  <div className="space-y-1.5 pt-1 border-t border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Top Verified Skills
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {cand.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200/60"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-slate-100 pt-4 shrink-0">
          <Button variant="secondary" size="md" onClick={onClose}>
            Close Comparison
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ComparisonModal;
