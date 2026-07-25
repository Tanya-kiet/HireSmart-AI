import React, { useState, useRef, useEffect } from "react";
import { FaShieldAlt, FaTimes, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

function CandidateRecommendation({ candidate }) {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getTagColor = (rec) => {
    switch (rec) {
      case "Strong Hire":
        return "bg-emerald-50 text-emerald-800 border-emerald-200";
      case "Good Fit":
        return "bg-blue-50 text-blue-800 border-blue-200";
      case "Needs Review":
        return "bg-amber-50 text-amber-800 border-amber-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="relative inline-block" ref={popoverRef}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className={`px-2 py-0.5 text-[11px] font-bold rounded border transition-colors cursor-pointer ${getTagColor(
          candidate.recommendation || "Good Fit"
        )}`}
        title="Click to view AI recommendation rationale"
      >
        {candidate.recommendation || "Good Fit"}
      </button>

      {isOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50 animate-in fade-in duration-150 space-y-3 text-xs font-sans"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="font-bold text-slate-900 flex items-center gap-1.5">
              <FaShieldAlt className="text-blue-600 text-xs" />
              <span>Recommendation Rationale</span>
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-slate-400 hover:text-slate-600 rounded"
            >
              <FaTimes />
            </button>
          </div>

          <div className="space-y-2">
            <p className="text-slate-700 font-medium leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              "{candidate.name} demonstrates 94% vector match with core engineering benchmarks."
            </p>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                Matched Skills:
              </span>
              <div className="flex flex-wrap gap-1">
                {["React 19", "TypeScript", "FastAPI"].map((s, idx) => (
                  <span
                    key={idx}
                    className="px-1.5 py-0.5 bg-emerald-50 text-emerald-900 font-semibold text-[10px] rounded border border-emerald-200"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium pt-1 border-t border-slate-100">
              <span>Experience: <strong className="text-slate-800">{candidate.experience || "6 Years"}</strong></span>
              <span className="font-bold text-emerald-700">95% Confidence</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CandidateRecommendation;
