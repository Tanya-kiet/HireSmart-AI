import React from "react";
import {
  FaTimes,
  FaCheckCircle,
  FaExclamationTriangle,
  FaShieldAlt,
  FaBriefcase,
  FaAward,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ExplainabilityModal({ candidate, isOpen, onClose }) {
  const navigate = useNavigate();

  if (!isOpen || !candidate) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in font-sans">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5 text-xs">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <FaShieldAlt className="text-blue-600 text-sm" />
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Match Rationale & Explanation
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg text-xs"
          >
            <FaTimes />
          </button>
        </div>

        {/* Candidate Info Header */}
        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200/80">
          <div>
            <h4 className="font-bold text-sm text-slate-900">{candidate.name}</h4>
            <p className="text-xs text-slate-500 font-medium">{candidate.role}</p>
          </div>
          <div className="text-right">
            <span className="px-2.5 py-1 text-xs font-black text-emerald-800 bg-emerald-100 rounded-md border border-emerald-300 block">
              {candidate.match}% Match
            </span>
            <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">
              95% High Confidence
            </span>
          </div>
        </div>

        {/* Reasoning Breakdown */}
        <div className="space-y-3">
          {/* Why Explanation */}
          <div className="space-y-1">
            <span className="font-bold text-slate-800 uppercase tracking-wider text-[10px] block">
              Algorithmic Recommendation Rationale:
            </span>
            <p className="p-3 bg-slate-50 rounded-lg border border-slate-200/70 text-slate-700 leading-relaxed font-medium">
              "{candidate.name} possesses {candidate.experience || '6 years'} of senior engineering experience directly matching required React 19, TypeScript, and FastAPI micro-frontend architecture benchmarks."
            </p>
          </div>

          {/* Matched Skills */}
          <div className="space-y-1.5">
            <span className="font-bold text-emerald-800 uppercase tracking-wider text-[10px] flex items-center gap-1">
              <FaCheckCircle className="text-emerald-600" />
              <span>Matched Skills Overlap</span>
            </span>
            <div className="flex flex-wrap gap-1.5">
              {candidate.matchedSkills?.map((s, idx) => (
                <span key={idx} className="px-2 py-0.5 bg-emerald-50 text-emerald-900 rounded font-semibold border border-emerald-200">
                  {s}
                </span>
              )) || (
                <>
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-900 rounded font-semibold border border-emerald-200">React 19</span>
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-900 rounded font-semibold border border-emerald-200">TypeScript</span>
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-900 rounded font-semibold border border-emerald-200">Tailwind CSS</span>
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-900 rounded font-semibold border border-emerald-200">FastAPI</span>
                </>
              )}
            </div>
          </div>

          {/* Missing Skills */}
          <div className="space-y-1.5 pt-1">
            <span className="font-bold text-amber-800 uppercase tracking-wider text-[10px] flex items-center gap-1">
              <FaExclamationTriangle className="text-amber-600" />
              <span>Identified Skill Gaps</span>
            </span>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-2 py-0.5 bg-amber-50 text-amber-900 rounded font-semibold border border-amber-200">
                Kubernetes Operators
              </span>
              <span className="px-2 py-0.5 bg-amber-50 text-amber-900 rounded font-semibold border border-amber-200">
                GraphQL Schema Federation
              </span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              navigate(`/candidate/${candidate.id}`);
            }}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors cursor-pointer"
          >
            View Candidate Profile →
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExplainabilityModal;
