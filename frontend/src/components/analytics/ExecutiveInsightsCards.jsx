import React from "react";

function ExecutiveInsightsCards() {
  const insights = [
    {
      title: "React Hiring Surge",
      detail: "React 19 hiring requirements increased by 18% this month across Senior Frontend Lead roles.",
      category: "Skill Trend",
      color: "bg-blue-50/80 border-blue-200 text-blue-900",
    },
    {
      title: "Skill Gap Bottleneck",
      detail: "65% of rejected backend applicants lacked containerization (Docker & Kubernetes) experience.",
      category: "Attrition Risk",
      color: "bg-rose-50/80 border-rose-200 text-rose-900",
    },
    {
      title: "Backend SLA Delay",
      detail: "Backend and DevOps roles take 11 days longer to fill due to technical interview scheduling constraints.",
      category: "Requisition SLA",
      color: "bg-amber-50/80 border-amber-200 text-amber-900",
    },
    {
      title: "Top Application Volume",
      detail: "ML Engineer and Data Science positions receive the highest volume of qualified applicants (142 per job).",
      category: "Volume Peak",
      color: "bg-emerald-50/80 border-emerald-200 text-emerald-900",
    },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4 font-sans text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-sm font-bold text-slate-900 tracking-tight">
          Section 4 — Algorithmic Hiring Insights
        </h3>
        <span className="text-[10px] text-slate-400 font-mono">Executive Summary</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {insights.map((item, idx) => (
          <div
            key={idx}
            className={`p-3.5 rounded-xl border space-y-1.5 ${item.color}`}
          >
            <div className="flex items-center justify-between font-bold">
              <span className="text-slate-900 font-bold">{item.title}</span>
              <span className="px-2 py-0.5 text-[9px] font-bold bg-white text-slate-700 rounded border border-slate-200">
                {item.category}
              </span>
            </div>
            <p className="text-slate-700 font-medium leading-relaxed">
              {item.detail}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExecutiveInsightsCards;
