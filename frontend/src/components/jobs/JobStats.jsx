import React from "react";
import { FaBriefcase, FaUserCheck, FaFileAlt, FaCheckCircle, FaArchive, FaChartLine } from "react-icons/fa";

function JobStats({ jobsList = [], activeTab = "all" }) {
  const totalCount = jobsList.length;
  const openCount = jobsList.filter((j) => j.status === "Open").length;
  const draftCount = jobsList.filter((j) => j.status === "Draft").length;
  const closedCount = jobsList.filter((j) => j.status === "Closed").length;
  const archivedCount = jobsList.filter((j) => j.status === "Archived").length;

  const totalApps = jobsList.reduce((acc, j) => acc + (j.applications || 0), 0);

  // Tab-specific stats render
  const getCardsForTab = () => {
    if (activeTab === "Open") {
      return [
        { title: "Open Positions", value: openCount, subText: "Actively Hiring Now", icon: FaBriefcase, color: "bg-emerald-50 text-emerald-600 border-emerald-200" },
        { title: "Active Applicants", value: totalApps, subText: "In Candidate Pipeline", icon: FaUserCheck, color: "bg-blue-50 text-blue-600 border-blue-200" },
        { title: "Scheduled Interviews", value: 24, subText: "Next 7 Days", icon: FaChartLine, color: "bg-purple-50 text-purple-600 border-purple-200" },
        { title: "Avg Match Score", value: "92%", subText: "AI Vector Overlap", icon: FaCheckCircle, color: "bg-teal-50 text-teal-600 border-teal-200" },
      ];
    }

    if (activeTab === "Draft") {
      return [
        { title: "Draft Jobs", value: draftCount, subText: "Unpublished Requisitions", icon: FaFileAlt, color: "bg-amber-50 text-amber-600 border-amber-200" },
        { title: "Active Applicants", value: 0, subText: "Awaiting Launch", icon: FaUserCheck, color: "bg-slate-100 text-slate-500 border-slate-200" },
        { title: "Pre-approved JDs", value: draftCount, subText: "100% Quality Score", icon: FaCheckCircle, color: "bg-blue-50 text-blue-600 border-blue-200" },
        { title: "Pending Approvals", value: draftCount, subText: "Ready to Publish", icon: FaChartLine, color: "bg-purple-50 text-purple-600 border-purple-200" },
      ];
    }

    if (activeTab === "Closed") {
      return [
        { title: "Closed Positions", value: closedCount, subText: "Hiring Completed", icon: FaCheckCircle, color: "bg-rose-50 text-rose-600 border-rose-200" },
        { title: "Total Hired", value: 3, subText: "Offers Accepted", icon: FaUserCheck, color: "bg-emerald-50 text-emerald-600 border-emerald-200" },
        { title: "Offer Acceptance", value: "100%", subText: "Full Conversion", icon: FaChartLine, color: "bg-teal-50 text-teal-600 border-teal-200" },
        { title: "Avg Time-to-Hire", value: "18 Days", subText: "Fast SLA", icon: FaBriefcase, color: "bg-blue-50 text-blue-600 border-blue-200" },
      ];
    }

    if (activeTab === "Archived") {
      return [
        { title: "Archived Jobs", value: archivedCount, subText: "Stored for Reference", icon: FaArchive, color: "bg-slate-100 text-slate-700 border-slate-200" },
        { title: "Historical Applicants", value: 214, subText: "Saved in Database", icon: FaUserCheck, color: "bg-slate-100 text-slate-600 border-slate-200" },
        { title: "Active Pipeline", value: 0, subText: "Read-Only Mode", icon: FaFileAlt, color: "bg-slate-100 text-slate-500 border-slate-200" },
        { title: "Restore Available", value: archivedCount, subText: "Click to Restore", icon: FaCheckCircle, color: "bg-blue-50 text-blue-600 border-blue-200" },
      ];
    }

    // Default "all" tab
    return [
      { title: "Total Job Roles", value: totalCount, subText: "All Requisitions", icon: FaBriefcase, color: "bg-blue-50 text-blue-600 border-blue-200" },
      { title: "Open Positions", value: openCount, subText: "Actively Hiring", icon: FaUserCheck, color: "bg-emerald-50 text-emerald-600 border-emerald-200" },
      { title: "Draft Requisitions", value: draftCount, subText: "Unpublished Drafts", icon: FaFileAlt, color: "bg-amber-50 text-amber-600 border-amber-200" },
      { title: "Closed & Archived", value: closedCount + archivedCount, subText: "Completed / Stored", icon: FaCheckCircle, color: "bg-purple-50 text-purple-600 border-purple-200" },
    ];
  };

  const cards = getCardsForTab();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-sans text-xs">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className="p-4 bg-white border border-slate-200 rounded-xl shadow-2xs space-y-1.5 flex items-center justify-between transition-all hover:border-slate-300"
          >
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                {card.title}
              </span>
              <span className="text-2xl font-black text-slate-900 tracking-tight block mt-0.5 font-mono">
                {card.value}
              </span>
              <span className="text-[11px] font-semibold text-slate-500 block mt-0.5">
                {card.subText}
              </span>
            </div>

            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm ${card.color} border shrink-0`}>
              <Icon />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default JobStats;
