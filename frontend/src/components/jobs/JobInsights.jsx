import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { FaChartPie, FaGraduationCap, FaTools, FaBuilding, FaClock, FaCheckCircle } from "react-icons/fa";

function JobInsights({ insights }) {
  if (!insights) return null;

  const COLORS = ["#2563eb", "#0d9488", "#4f46e5", "#d97706", "#059669", "#64748b"];

  return (
    <div className="space-y-6 font-sans">
      {/* Top Banner */}
      <div className="p-4 bg-slate-900 text-white rounded-xl flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <FaChartPie className="text-blue-400 text-sm" />
          <span className="font-bold tracking-tight text-white">
            Job Intelligence Analytics & Market Benchmark
          </span>
        </div>
        <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-950 text-blue-300 rounded border border-blue-800">
          Realtime Data
        </span>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Hiring Velocity
          </span>
          <span className="text-base font-black text-slate-900 mt-1 block">
            {insights.hiringVelocity}
          </span>
        </div>

        <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Avg Match Score
          </span>
          <span className="text-base font-black text-emerald-600 mt-1 block">
            {insights.avgMatchScore}%
          </span>
        </div>

        <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Offer Acceptance
          </span>
          <span className="text-base font-black text-blue-600 mt-1 block">
            {insights.offerAcceptanceRate}%
          </span>
        </div>

        <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Total Pool
          </span>
          <span className="text-base font-black text-slate-900 mt-1 block">
            {insights.totalApplications} Applicants
          </span>
        </div>
      </div>

      {/* 2-Column Analytics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1. Most Common Skills in Pool */}
        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <FaTools className="text-slate-500 text-sm" />
            <h4 className="font-bold text-sm text-slate-900">Most Common Skills in Applicant Pool</h4>
          </div>

          <div className="space-y-2.5 text-xs">
            {insights.topSkills?.map((s, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between font-semibold text-slate-800">
                  <span>{s.skill}</span>
                  <span className="font-bold">{s.count} candidates ({s.percentage}%)</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: `${s.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Missing Skills in Candidate Pool */}
        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <FaTools className="text-slate-500 text-sm" />
            <h4 className="font-bold text-sm text-slate-900">Skill Gaps Identified in Pool</h4>
          </div>

          <div className="space-y-3">
            {insights.missingSkillsInPool?.map((g, idx) => (
              <div key={idx} className="p-3 bg-amber-50/70 rounded-lg border border-amber-200/80 text-xs space-y-1">
                <h5 className="font-bold text-amber-900">{g.skill}</h5>
                <p className="text-amber-800 font-medium leading-relaxed">{g.gap}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Experience Distribution Chart */}
        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-3">
          <h4 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-3">
            Candidate Experience Breakdown
          </h4>
          <div className="h-52 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={insights.experienceDistribution}>
                <XAxis dataKey="range" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#2563eb" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 4. Resume Sources Breakdown Chart */}
        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-3">
          <h4 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-3">
            Resume Channel Sources
          </h4>
          <div className="h-52 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={insights.resumeSources}
                  dataKey="count"
                  nameKey="source"
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  label={({ source, percent }) => `${source} (${(percent * 100).toFixed(0)}%)`}
                >
                  {insights.resumeSources?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobInsights;
