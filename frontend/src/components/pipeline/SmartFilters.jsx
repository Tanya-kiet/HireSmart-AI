import React from "react";
import {
  FaSearch,
  FaFilter,
  FaTimes,
  FaFire,
  FaClock,
  FaCalendarAlt,
  FaFileContract,
  FaStar,
  FaExclamationCircle,
} from "react-icons/fa";

function SmartFilters({
  searchTerm,
  onSearchChange,
  jobFilter,
  onJobFilterChange,
  deptFilter,
  onDeptFilterChange,
  recruiterFilter,
  onRecruiterFilterChange,
  activeSmartView,
  onSmartViewSelect,
  jobsList,
}) {
  const smartViews = [
    { id: "all", label: "All Candidates", icon: FaFilter, count: "1,420" },
    { id: "needs-review", label: "Needs Review", icon: FaExclamationCircle, count: "24", badgeColor: "bg-amber-100 text-amber-900 border-amber-300" },
    { id: "waiting-7-days", label: "Waiting > 7 Days", icon: FaClock, count: "18", badgeColor: "bg-rose-100 text-rose-900 border-rose-300" },
    { id: "interviews-today", label: "Interviews Today", icon: FaCalendarAlt, count: "14", badgeColor: "bg-purple-100 text-purple-900 border-purple-300" },
    { id: "offers-pending", label: "Offers Pending", icon: FaFileContract, count: "18", badgeColor: "bg-emerald-100 text-emerald-900 border-emerald-300" },
    { id: "high-match", label: "High Match (90%+)", icon: FaStar, count: "42", badgeColor: "bg-blue-100 text-blue-900 border-blue-300" },
  ];

  const departments = ["All Departments", "Engineering", "AI & Data", "Product", "Design"];
  const recruiters = ["All Recruiters", "Tanya Bhadana", "Alex Mercer"];

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3 font-sans sticky top-0 z-20">
      {/* Top Search & Dropdown Filters Row */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 text-xs">
        {/* Search Input */}
        <div className="relative flex-1">
          <FaSearch className="absolute left-3.5 top-3 text-slate-400 text-xs" />
          <input
            type="text"
            placeholder="Search candidates across all jobs by name, role, skills, or job title..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-medium placeholder-slate-400"
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-2.5 p-1 text-slate-400 hover:text-slate-600 rounded-md"
            >
              <FaTimes className="text-xs" />
            </button>
          )}
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Job Filter */}
          <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-semibold text-slate-700">
            <span className="text-slate-400 text-[10px]">Job:</span>
            <select
              value={jobFilter}
              onChange={(e) => onJobFilterChange(e.target.value)}
              className="bg-transparent text-xs font-bold text-slate-900 focus:outline-none cursor-pointer max-w-[140px] truncate"
            >
              <option value="All Jobs">All Open Jobs (12)</option>
              {jobsList?.map((j) => (
                <option key={j.id} value={j.id}>{j.title}</option>
              ))}
            </select>
          </div>

          {/* Department Filter */}
          <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-semibold text-slate-700">
            <span className="text-slate-400 text-[10px]">Dept:</span>
            <select
              value={deptFilter}
              onChange={(e) => onDeptFilterChange(e.target.value)}
              className="bg-transparent text-xs font-bold text-slate-900 focus:outline-none cursor-pointer"
            >
              {departments.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Recruiter Filter */}
          <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-semibold text-slate-700">
            <span className="text-slate-400 text-[10px]">Recruiter:</span>
            <select
              value={recruiterFilter}
              onChange={(e) => onRecruiterFilterChange(e.target.value)}
              className="bg-transparent text-xs font-bold text-slate-900 focus:outline-none cursor-pointer"
            >
              {recruiters.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Smart View Preset Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 border-t border-slate-100">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 shrink-0 mr-1">
          Smart Presets:
        </span>
        {smartViews.map((sv) => {
          const Icon = sv.icon;
          const isActive = activeSmartView === sv.id;

          return (
            <button
              key={sv.id}
              onClick={() => onSmartViewSelect(sv.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 border ${
                isActive
                  ? "bg-slate-900 text-white border-slate-900 shadow-2xs"
                  : "bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200"
              }`}
            >
              <Icon className={`text-xs ${isActive ? "text-blue-400" : "text-slate-500"}`} />
              <span>{sv.label}</span>
              <span
                className={`px-1.5 py-0.2 rounded text-[10px] ${
                  isActive
                    ? "bg-slate-800 text-white"
                    : sv.badgeColor || "bg-slate-200 text-slate-700"
                }`}
              >
                {sv.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default SmartFilters;
