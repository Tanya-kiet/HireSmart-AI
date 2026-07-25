import React from "react";
import {
  FaRobot,
  FaExclamationTriangle,
  FaLightbulb,
  FaTachometerAlt,
  FaShieldAlt,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

function RecruitmentInsights({ intelligence }) {
  if (!intelligence) return null;

  return (
    <div className="space-y-4 font-sans">
      {/* Header Banner */}
      <div className="p-3 bg-slate-900 text-white rounded-xl flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <FaRobot className="text-blue-400 text-sm" />
          <span className="font-bold tracking-tight text-white">
            Recruitment Intelligence Engine
          </span>
          <span className="hidden sm:inline-block text-slate-400 font-medium">
            • Algorithmic Bottleneck Analysis & Actionable Recruiter Guidance
          </span>
        </div>
        <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-950 text-blue-300 rounded border border-blue-800">
          Company-Wide Audit
        </span>
      </div>

      {/* Grid of Intelligence Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {/* 1. Hiring Bottlenecks & Candidates Stuck Too Long */}
        <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200 space-y-3">
          <div className="flex items-center gap-2 text-rose-800 font-bold uppercase tracking-wider text-[11px]">
            <FaExclamationTriangle className="text-rose-600 text-sm" />
            <span>Hiring Bottlenecks & Candidates Stuck Too Long</span>
          </div>

          <div className="space-y-2.5">
            {intelligence.bottlenecks?.map((b, idx) => (
              <div key={idx} className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs space-y-1.5">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>{b.issue}</span>
                  <span className="px-2 py-0.5 text-[10px] bg-rose-50 text-rose-700 rounded border border-rose-200">
                    {b.stage} Stage
                  </span>
                </div>
                <p className="text-slate-600 font-medium leading-relaxed">
                  {b.explanation}
                </p>
                <div className="p-2 bg-amber-50 rounded text-amber-900 font-bold text-[11px] flex items-center gap-1.5">
                  <FaLightbulb className="text-amber-600 text-xs shrink-0" />
                  <span>Suggested Action: {b.suggestedAction}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Hiring Risk Indicators */}
        <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200 space-y-3">
          <div className="flex items-center gap-2 text-amber-800 font-bold uppercase tracking-wider text-[11px]">
            <FaShieldAlt className="text-amber-600 text-sm" />
            <span>Hiring Risk Indicators</span>
          </div>

          <div className="space-y-2.5">
            {intelligence.riskIndicators?.map((r, idx) => (
              <div key={idx} className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs space-y-1">
                <h5 className="font-bold text-slate-900">{r.title}</h5>
                <p className="text-slate-600 font-medium leading-relaxed">
                  {r.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Fast-Moving vs Slow-Moving Jobs */}
        <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200 space-y-3">
          <div className="flex items-center gap-2 text-blue-800 font-bold uppercase tracking-wider text-[11px]">
            <FaTachometerAlt className="text-blue-600 text-sm" />
            <span>Requisition Velocity Breakdown</span>
          </div>

          <div className="space-y-2">
            <h6 className="font-bold text-emerald-800 text-[10px] uppercase">Fast-Moving Positions:</h6>
            {intelligence.fastMovingJobs?.map((f, idx) => (
              <div key={idx} className="p-2 bg-emerald-50/60 rounded border border-emerald-200/80 flex justify-between font-semibold">
                <span>{f.jobTitle}</span>
                <span className="text-emerald-700 font-bold">{f.velocity}</span>
              </div>
            ))}

            <h6 className="font-bold text-amber-800 text-[10px] uppercase pt-2">Slow-Moving Positions:</h6>
            {intelligence.slowMovingJobs?.map((s, idx) => (
              <div key={idx} className="p-2 bg-amber-50/60 rounded border border-amber-200/80 flex justify-between font-semibold">
                <span>{s.jobTitle}</span>
                <span className="text-amber-800 font-bold">{s.velocity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Jobs Receiving Weak Applicant Pools */}
        <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200 space-y-3">
          <div className="flex items-center gap-2 text-purple-800 font-bold uppercase tracking-wider text-[11px]">
            <FaTimesCircle className="text-purple-600 text-sm" />
            <span>Weak Applicant Pool Alerts</span>
          </div>

          <div className="space-y-2.5">
            {intelligence.weakApplicantJobs?.map((w, idx) => (
              <div key={idx} className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs space-y-1.5">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>{w.jobTitle}</span>
                  <span className="px-2 py-0.5 text-[10px] bg-rose-50 text-rose-700 rounded border border-rose-200 font-bold">
                    Avg Match {w.avgScore}%
                  </span>
                </div>
                <p className="text-slate-600 font-medium leading-relaxed">
                  {w.explanation}
                </p>
                <div className="p-2 bg-blue-50 rounded text-blue-900 font-bold text-[11px] flex items-center gap-1.5">
                  <FaLightbulb className="text-blue-600 text-xs shrink-0" />
                  <span>Action: {w.suggestedAction}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecruitmentInsights;
