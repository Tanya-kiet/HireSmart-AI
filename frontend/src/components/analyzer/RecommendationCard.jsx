import React from "react";
import Card from "../common/Card";
import { FaRobot, FaUserCheck } from "react-icons/fa";

function RecommendationCard({
  recommendation = "Highly recommended for technical interview.",
}) {
  return (
    <Card className="bg-white border border-slate-200/90 shadow-2xs p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          {/* Icon Container: light green bg, emerald icon */}
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl shrink-0 border border-emerald-100 shadow-2xs">
            <FaUserCheck />
          </div>

          <div className="space-y-1.5">
            {/* Title: Dark slate-900, font-bold */}
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
              <FaRobot className="text-emerald-600 text-sm" />
              <span>AI Decision Engine Verdict</span>
            </div>

            {/* Main recommendation quote */}
            <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              "{recommendation}"
            </h3>

            {/* Description text: text-slate-600 with highlighted text-emerald-600 font-semibold */}
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Candidate exhibits high domain fit, verified frontend technical skills, and{" "}
              <strong className="text-emerald-600 font-semibold">
                94% vector match confidence
              </strong>
              .
            </p>
          </div>
        </div>

        {/* Recommendation Badge: green bg, text-emerald-700, border-emerald-300 */}
        <div className="shrink-0 self-start sm:self-center">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-300 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            Strong Hire
          </span>
        </div>
      </div>
    </Card>
  );
}

export default RecommendationCard;
