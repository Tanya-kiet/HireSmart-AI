import React from "react";
import { FaChartLine, FaHistory, FaCheckCircle, FaUsers } from "react-icons/fa";

function StatsCard({ insights, recentActivity }) {
  return (
    <div className="space-y-4">
      {/* Snapshot Metrics Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <FaChartLine className="text-slate-500 text-sm" />
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Hiring Insights
            </h3>
          </div>
          <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-50 text-emerald-700 rounded border border-emerald-200">
            Realtime
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/80">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
              Avg Match
            </span>
            <span className="text-base font-black text-slate-900 mt-0.5 block">
              {insights?.avgMatchScore || 88.4}%
            </span>
          </div>

          <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/80">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
              ATS Score
            </span>
            <span className="text-base font-black text-slate-900 mt-0.5 block">
              {insights?.avgAtsScore || 91.2}%
            </span>
          </div>

          <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/80">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
              Velocity
            </span>
            <span className="text-xs font-extrabold text-blue-600 mt-1 block truncate">
              {insights?.hiringVelocity || "14 Days"}
            </span>
          </div>

          <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/80">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
              Offer Acceptance
            </span>
            <span className="text-base font-black text-emerald-600 mt-0.5 block">
              {insights?.offerAcceptanceRate || 85}%
            </span>
          </div>
        </div>
      </div>

      {/* Recent Activity Feed */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <FaHistory className="text-slate-500 text-sm" />
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Recent Activity
            </h3>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">Live Audit</span>
        </div>

        <div className="space-y-2.5 text-xs">
          {recentActivity?.map((act) => (
            <div key={act.id} className="p-2.5 bg-slate-50/70 rounded-lg border border-slate-200/60 space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-slate-900">{act.user}</span>
                <span className="text-[10px] text-slate-400 font-medium">{act.time}</span>
              </div>
              <p className="text-[11px] text-slate-600 font-medium leading-tight">
                {act.action}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StatsCard;
