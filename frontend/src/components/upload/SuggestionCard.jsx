import React from "react";
import Card from "../common/Card";
import { FaLightbulb, FaCheck, FaArrowRight } from "react-icons/fa";

function SuggestionCard() {
  const suggestions = [
    {
      id: 1,
      title: "Add measurable achievements.",
      desc: "Include metrics like 'Improved page load by 40%' or 'Scaled database throughput to 10k QPS'.",
    },
    {
      id: 2,
      title: "Mention more frameworks & libraries.",
      desc: "Highlight specific modern libraries used in your production environment.",
    },
    {
      id: 3,
      title: "Add GitHub profile & portfolio links.",
      desc: "Provide direct hyperlinks to open-source repositories and live project demos.",
    },
    {
      id: 4,
      title: "Include relevant industry certifications.",
      desc: "List AWS, Cloud Architect, or React certifications to boost ATS index priority.",
    },
  ];

  return (
    <Card
      title="AI Optimization Suggestions"
      subtitle="Actionable recommendations to boost resume ATS match score"
      headerBorder
      action={
        <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-sm border border-amber-100">
          <FaLightbulb />
        </div>
      }
    >
      <div className="space-y-3">
        {suggestions.map((item) => (
          <div
            key={item.id}
            className="p-3.5 bg-slate-50 hover:bg-blue-50/30 rounded-xl border border-slate-200/70 hover:border-blue-200 transition-all flex items-start gap-3 group"
          >
            <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 shadow-2xs">
              <FaCheck className="text-[10px]" />
            </div>

            <div className="min-w-0">
              <h5 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                {item.title}
              </h5>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default SuggestionCard;
