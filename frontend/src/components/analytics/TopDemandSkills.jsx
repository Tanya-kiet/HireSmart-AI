import React from "react";

function TopDemandSkills() {
  const top10Skills = [
    { name: "React 19 / 18", pct: 92, jobs: 84, trend: "+18%" },
    { name: "Python / FastAPI", pct: 84, jobs: 76, trend: "+14%" },
    { name: "TypeScript", pct: 75, jobs: 68, trend: "+12%" },
    { name: "SQL / PostgreSQL", pct: 68, jobs: 62, trend: "+8%" },
    { name: "Docker & AWS", pct: 60, jobs: 55, trend: "+5%" },
    { name: "Kubernetes Operators", pct: 40, jobs: 36, trend: "+10%" },
    { name: "GraphQL Schema", pct: 35, jobs: 32, trend: "+4%" },
    { name: "Next.js App Router", pct: 30, jobs: 28, trend: "+9%" },
    { name: "PyTorch / ML", pct: 25, jobs: 22, trend: "+15%" },
    { name: "Tailwind CSS", pct: 22, jobs: 20, trend: "+6%" },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4 font-sans text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-sm font-bold text-slate-900 tracking-tight">
          Section 3 — Most In-Demand Skills (Top 10)
        </h3>
        <span className="text-[10px] text-slate-400 font-mono">Job Requisition Overlap</span>
      </div>

      <div className="space-y-2.5">
        {top10Skills.map((sk, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center justify-between font-bold text-slate-800">
              <span className="flex items-center gap-2">
                <span className="w-5 text-slate-400 font-mono text-[10px]">#{idx + 1}</span>
                <span>{sk.name}</span>
              </span>
              <div className="flex items-center gap-3 font-mono text-[11px]">
                <span className="text-slate-500">{sk.jobs} Jobs ({sk.pct}%)</span>
                <span className="text-emerald-700 font-bold">{sk.trend}</span>
              </div>
            </div>

            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-slate-900 h-full rounded-full"
                style={{ width: `${sk.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopDemandSkills;
