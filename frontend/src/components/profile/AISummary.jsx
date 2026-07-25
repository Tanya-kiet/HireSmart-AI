import React from "react";
import Card from "../common/Card";
import Badge from "../common/Badge";
import { FaFileAlt, FaCheckCircle, FaStar } from "react-icons/fa";

function AISummary({ summary, role }) {
  return (
    <Card className="bg-white border-slate-200/90 shadow-2xs space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
          <FaFileAlt className="text-blue-600 text-sm" />
          <span>Resume Executive Summary</span>
        </div>
        <Badge variant="blue" size="sm">
          Target Role: {role}
        </Badge>
      </div>

      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed p-4 bg-slate-50 rounded-2xl border border-slate-200/80 font-medium">
        "{summary}"
      </p>

      <div className="flex items-center gap-4 text-xs text-slate-500 pt-1 border-t border-slate-100">
        <span className="flex items-center gap-1 font-semibold text-emerald-700">
          <FaCheckCircle className="text-emerald-500 text-xs" />
          Top 5% Candidate Percentile
        </span>
        <span className="flex items-center gap-1 font-semibold text-slate-700">
          <FaStar className="text-amber-400 text-xs" />
          94% Skill Alignment
        </span>
      </div>
    </Card>
  );
}

export default AISummary;
