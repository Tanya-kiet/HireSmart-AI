import React from "react";
import Card from "../common/Card";
import { FaCheckCircle, FaStar, FaShieldAlt } from "react-icons/fa";

function StrengthCard({ strengths = [] }) {
  const defaultStrengths = [
    "Strong frontend knowledge & React 19 architecture expertise.",
    "Good AI experience with semantic vector search & LLM integrations.",
    "Relevant hands-on projects & clean production codebase history.",
    "Well-formatted resume structure with high ATS readability.",
  ];

  const items = strengths.length > 0 ? strengths : defaultStrengths;

  return (
    <Card
      title="Candidate Strengths"
      subtitle="Key competitive advantages identified by AI parser"
      headerBorder
      action={
        <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm border border-emerald-100">
          <FaShieldAlt />
        </div>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="p-3.5 bg-emerald-50/40 hover:bg-emerald-50 rounded-xl border border-emerald-100 flex items-start gap-3 transition-colors"
          >
            <FaCheckCircle className="text-emerald-600 text-sm shrink-0 mt-0.5" />
            <p className="text-xs font-semibold text-slate-800 leading-relaxed">
              {item}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default StrengthCard;
