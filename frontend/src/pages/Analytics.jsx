import React, { useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import ExecutiveFunnel from "../components/analytics/ExecutiveFunnel";
import HiringPerformanceCards from "../components/analytics/HiringPerformanceCards";
import TopDemandSkills from "../components/analytics/TopDemandSkills";
import ExecutiveInsightsCards from "../components/analytics/ExecutiveInsightsCards";
import MonthlyActivityChart from "../components/analytics/MonthlyActivityChart";
import Alert from "../components/common/Alert";
import {
  FaFileExport,
  FaCalendarAlt,
  FaUsers,
  FaBriefcase,
  FaCalendarCheck,
  FaCheckCircle,
} from "react-icons/fa";

import Breadcrumbs from "../components/common/Breadcrumbs";

function Analytics() {
  const [dateRange, setDateRange] = useState("Last 30 Days");
  const [alert, setAlert] = useState(null);

  const handleExport = () => {
    setAlert({
      type: "info",
      title: "Report Exported",
      message: `Exported executive hiring report dossier (${dateRange}) to PDF & CSV.`,
    });
  };

  const kpis = [
    {
      title: "Applications",
      value: "1,420",
      comparison: "+12% vs last mo",
      trend: "📈",
      icon: FaUsers,
      color: "bg-blue-50 text-blue-600 border-blue-100",
    },
    {
      title: "Active Jobs",
      value: "12",
      comparison: "+2 new roles",
      trend: "✨",
      icon: FaBriefcase,
      color: "bg-emerald-50 text-emerald-600 border-emerald-100",
    },
    {
      title: "Interview Conversion",
      value: "29.5%",
      comparison: "+3.2% vs last mo",
      trend: "🚀",
      icon: FaCalendarCheck,
      color: "bg-purple-50 text-purple-600 border-purple-100",
    },
    {
      title: "Offer Acceptance Rate",
      value: "89.5%",
      comparison: "+5.1% vs last mo",
      trend: "🎯",
      icon: FaCheckCircle,
      color: "bg-teal-50 text-teal-600 border-teal-100",
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-6 max-w-[1600px] w-full mx-auto pb-16 font-sans">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs />
        {/* Top Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Analytics & Hiring Reports
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5 font-medium">
              Single-page executive dashboard for hiring throughput, conversion, and skill trends.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Date Range Selector */}
            <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 font-bold shadow-2xs">
              <FaCalendarAlt className="text-slate-400 text-xs" />
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="bg-transparent focus:outline-none cursor-pointer text-xs"
              >
                <option value="Last 30 Days">Last 30 Days</option>
                <option value="Last 90 Days">Last 90 Days</option>
                <option value="This Year">This Year (2026)</option>
              </select>
            </div>

            {/* Export Report Button */}
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
            >
              <FaFileExport className="text-xs" />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        {/* Global Toast Alert */}
        {alert && (
          <Alert
            type={alert.type}
            title={alert.title}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}

        {/* 4 Core Executive KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi, idx) => {
            const Icon = kpi.icon;
            return (
              <div
                key={idx}
                className="p-4 bg-white border border-slate-200 rounded-xl shadow-2xs space-y-1.5 flex items-center justify-between transition-all hover:border-slate-300"
              >
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    {kpi.title}
                  </span>
                  <span className="text-2xl font-black text-slate-900 tracking-tight block mt-0.5">
                    {kpi.value}
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-700 block mt-0.5">
                    {kpi.comparison}
                  </span>
                </div>

                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs ${kpi.color} border shrink-0`}
                >
                  <Icon />
                </div>
              </div>
            );
          })}
        </div>

        {/* SECTION 1 — Hiring Funnel */}
        <ExecutiveFunnel />

        {/* SECTION 2 — Hiring Performance Metrics */}
        <HiringPerformanceCards />

        {/* SECTION 3 — Most In-Demand Skills (Top 10) */}
        <TopDemandSkills />

        {/* SECTION 4 — Algorithmic Hiring Insights */}
        <ExecutiveInsightsCards />

        {/* SECTION 5 — Monthly Hiring Activity */}
        <MonthlyActivityChart />
      </div>
    </MainLayout>
  );
}

export default Analytics;