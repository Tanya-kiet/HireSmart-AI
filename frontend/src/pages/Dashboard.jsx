import React, { useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import StatsCard from "../components/dashboard/StatsCard";
import TodaysPriorities from "../components/dashboard/TodaysPriorities";
import HiringFunnelVisual from "../components/dashboard/HiringFunnelVisual";
import ExplainabilityModal from "../components/dashboard/ExplainabilityModal";
import Card from "../components/common/Card";
import Alert from "../components/common/Alert";
import {
  FaBriefcase,
  FaUsers,
  FaCalendarCheck,
  FaStar,
  FaArrowRight,
  FaCheckCircle,
  FaQuestionCircle,
  FaCalendarPlus,
  FaCheck,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [explainCandidate, setExplainCandidate] = useState(null);
  const [alert, setAlert] = useState(null);

  const recentCandidates = [
    { id: "cand-1", name: "Sarah Chen", role: "Senior Lead Frontend Engineer", match: 94, stage: "Interview Scheduled", avatarBg: "bg-blue-600", experience: "6 Years" },
    { id: "cand-2", name: "Marcus Vance", role: "Staff Frontend Architect", match: 92, stage: "Shortlisted", avatarBg: "bg-purple-600", experience: "7 Years" },
    { id: "cand-3", name: "Sophia Martinez", role: "React Tech Lead", match: 91, stage: "Interview Scheduled", avatarBg: "bg-teal-600", experience: "6 Years" },
    { id: "cand-4", name: "Elena Rostova", role: "DevOps Infrastructure Lead", match: 89, stage: "HR Round", avatarBg: "bg-emerald-600", experience: "6 Years" },
    { id: "cand-5", name: "David Kim", role: "Senior Backend Developer", match: 88, stage: "Screened", avatarBg: "bg-amber-600", experience: "5 Years" },
  ];

  const skillsInDemand = [
    { name: "React 19 / 18", count: 84 },
    { name: "Python / FastAPI", count: 76 },
    { name: "TypeScript", count: 68 },
    { name: "SQL / PostgreSQL", count: 62 },
    { name: "Docker & AWS", count: 55 },
  ];

  const recentActivityList = [
    { id: "a-1", title: "Sarah Chen completed Technical Round", detail: "Evaluated as Strong Hire (5.0 rating) by David Miller", time: "2 hours ago" },
    { id: "a-2", title: "Marcus Vance ATS Parsed", detail: "Scored 94% vector match score for Frontend Architect", time: "4 hours ago" },
    { id: "a-3", title: "New Job Role Opened", detail: "Senior Lead Frontend Engineer requisition published", time: "1 day ago" },
    { id: "a-4", title: "Aisha Patel Offer Package Extended", detail: "Offer letter generated ($165k base + stock options)", time: "1 day ago" },
    { id: "a-5", title: "14 Resumes Parsed", detail: "Automated OCR vector embedding index complete", time: "2 days ago" },
  ];

  const handleQuickAction = (action, cand, e) => {
    e.stopPropagation();
    if (action === "schedule") {
      navigate("/interviews");
    } else if (action === "shortlist") {
      setAlert({
        type: "success",
        title: "Candidate Shortlisted",
        message: `${cand.name} added to priority shortlist.`,
      });
    } else if (action === "reject") {
      setAlert({
        type: "error",
        title: "Candidate Rejected",
        message: `${cand.name} moved to Rejected stage.`,
      });
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans">
        {/* Global Toast Alert */}
        {alert && (
          <Alert
            type={alert.type}
            title={alert.title}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}

        {/* 1. Today's Priorities Widget (First item recruiter sees) */}
        <TodaysPriorities />

        {/* 2. Focused 4 KPI Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Open Jobs"
            value="12"
            change="+2 active"
            changeType="increase"
            changePeriod="open roles"
            icon={FaBriefcase}
            iconBg="bg-blue-50 text-blue-600 border border-blue-100"
          />

          <StatsCard
            title="Total Candidates"
            value="1,420"
            change="+48 this week"
            changeType="increase"
            changePeriod="candidate pool"
            icon={FaUsers}
            iconBg="bg-emerald-50 text-emerald-600 border border-emerald-100"
          />

          <StatsCard
            title="Interviews This Week"
            value="8"
            change="Scheduled rounds"
            changeType="increase"
            changePeriod="next 7 days"
            icon={FaCalendarCheck}
            iconBg="bg-purple-50 text-purple-600 border border-purple-100"
          />

          <StatsCard
            title="Average Match Score"
            value="88.4%"
            change="Top 5% quality pool"
            changeType="increase"
            changePeriod="vector parsed"
            icon={FaStar}
            iconBg="bg-amber-50 text-amber-600 border border-amber-100"
          />
        </div>

        {/* 3. Main Dashboard Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column (8/12): Recent Applications & Hiring Funnel */}
          <div className="lg:col-span-8 space-y-6">
            {/* Recent Applicants Simplified Table */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900 tracking-tight">
                    Recent Candidate Applications
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Simplified applicant feed with match scores and explainability rationales
                  </p>
                </div>

                <button
                  onClick={() => navigate("/candidates")}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                >
                  <span>View All Candidates</span>
                  <FaArrowRight className="text-[10px]" />
                </button>
              </div>

              {/* Simplified Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                      <th className="py-2.5 px-3">Candidate</th>
                      <th className="py-2.5 px-3">Match %</th>
                      <th className="py-2.5 px-3">Current Stage</th>
                      <th className="py-2.5 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    {recentCandidates.map((cand) => (
                      <tr
                        key={cand.id}
                        onClick={() => navigate(`/candidate/${cand.id}`)}
                        className="hover:bg-slate-50/90 transition-colors cursor-pointer group"
                      >
                        {/* Candidate info */}
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-8 h-8 rounded-lg ${cand.avatarBg} text-white flex items-center justify-center font-bold text-xs shrink-0`}
                            >
                              {cand.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </div>
                            <div>
                              <span className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors block text-xs">
                                {cand.name}
                              </span>
                              <span className="text-[11px] text-slate-500 block truncate">
                                {cand.role}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Match % + Why button */}
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 font-extrabold text-emerald-800 bg-emerald-50 rounded border border-emerald-200">
                              {cand.match}%
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setExplainCandidate(cand);
                              }}
                              className="px-2 py-0.5 text-[10px] font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded border border-blue-200 flex items-center gap-1 cursor-pointer transition-colors"
                              title="Why was this candidate recommended?"
                            >
                              <FaQuestionCircle className="text-[9px]" />
                              <span>Why?</span>
                            </button>
                          </div>
                        </td>

                        {/* Stage */}
                        <td className="py-3 px-3 font-semibold text-slate-800">
                          <span className="px-2 py-0.5 text-[11px] bg-slate-100 text-slate-700 rounded border border-slate-200 font-bold">
                            {cand.stage}
                          </span>
                        </td>

                        {/* Hover Quick Actions */}
                        <td className="py-3 px-3 text-right">
                          <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              type="button"
                              onClick={(e) => handleQuickAction("schedule", cand, e)}
                              className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                              title="Schedule Interview"
                            >
                              <FaCalendarCheck />
                            </button>

                            <button
                              type="button"
                              onClick={(e) => handleQuickAction("shortlist", cand, e)}
                              className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded transition-colors"
                              title="Shortlist Candidate"
                            >
                              <FaCheck />
                            </button>

                            <button
                              type="button"
                              onClick={(e) => handleQuickAction("reject", cand, e)}
                              className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                              title="Reject Candidate"
                            >
                              <FaTimes />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Redesigned Hiring Funnel Visualization */}
            <HiringFunnelVisual />
          </div>

          {/* Right Column (4/12): Skills in Demand & Recent Activity */}
          <div className="lg:col-span-4 space-y-6">
            {/* Skills in Demand */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4 font-sans">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                  Skills in Demand
                </h3>
                <span className="text-[10px] font-semibold text-slate-400">Requisition Frequency</span>
              </div>

              <div className="space-y-3 text-xs">
                {skillsInDemand.map((sk, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between font-bold text-slate-800">
                      <span>{sk.name}</span>
                      <span className="text-slate-500 font-mono text-[11px]">{sk.count} Jobs</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-slate-900 h-full rounded-full"
                        style={{ width: `${(sk.count / 90) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity Stream (5 items max) */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4 font-sans">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                  Recent Activity
                </h3>
                <button
                  onClick={() => navigate("/pipeline")}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                >
                  <span>View All</span>
                  <FaArrowRight className="text-[10px]" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                {recentActivityList.map((act) => (
                  <div
                    key={act.id}
                    className="p-3 bg-slate-50/70 rounded-xl border border-slate-200/70 space-y-1"
                  >
                    <div className="flex items-center justify-between font-bold text-slate-900">
                      <span>{act.title}</span>
                      <span className="text-[10px] text-slate-400 font-normal">{act.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 font-medium leading-tight">
                      {act.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Match Rationale Explainability Modal */}
      <ExplainabilityModal
        candidate={explainCandidate}
        isOpen={!!explainCandidate}
        onClose={() => setExplainCandidate(null)}
      />
    </MainLayout>
  );
}

export default Dashboard;