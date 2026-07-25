import React from "react";
import Card from "../common/Card";
import { FaExclamationCircle, FaChartLine } from "react-icons/fa";

function ImprovementCard({ improvements = [] }) {
  const defaultImprovements = [
    "Expand cloud infrastructure skills (Docker containerization & AWS deployment).",
    "Add quantified metric impacts to project descriptions (e.g. '% speed increase').",
    "Include relevant technical certifications to boost recruiter index rating.",
  ];

  const items = improvements.length > 0 ? improvements : defaultImprovements;

  return (
    <Card
      title="Areas of Improvement"
      subtitle="Potential skill gaps & resume recommendations"
      headerBorder
      action={
        <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-sm border border-amber-100">
          <FaExclamationCircle />
        </div>
      }
    >
      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="p-3.5 bg-amber-50/40 hover:bg-amber-50 rounded-xl border border-amber-100 flex items-start gap-3 transition-colors"
          >
            <FaExclamationCircle className="text-amber-600 text-sm shrink-0 mt-0.5" />
            <p className="text-xs font-semibold text-slate-800 leading-relaxed">
              {item}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default ImprovementCard;
