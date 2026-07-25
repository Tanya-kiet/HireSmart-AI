import React from "react";
import { FaSearch, FaFilter, FaSortAmountDown, FaTimes } from "react-icons/fa";

function CandidateFilterBar({
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy,
  onResetFilters,
  totalCount,
}) {
  const categories = [
    "All Categories",
    "Software Engineering",
    "Data Science & AI",
    "Product & UI/UX Design",
    "DevOps & Cloud",
    "Product Management",
  ];

  const statuses = [
    "All Statuses",
    "Shortlisted",
    "Interview",
    "Screened",
    "Pending",
    "Rejected",
  ];

  const sortOptions = [
    { label: "ATS Score (High to Low)", value: "score-desc" },
    { label: "ATS Score (Low to High)", value: "score-asc" },
    { label: "Newest Uploaded", value: "newest" },
    { label: "Name (A-Z)", value: "name-asc" },
  ];

  const hasActiveFilters =
    searchTerm || categoryFilter !== "All Categories" || statusFilter !== "All Statuses";

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs space-y-3">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Search Bar Input */}
        <div className="relative flex-1">
          <FaSearch className="absolute left-3.5 top-3 text-slate-400 text-xs" />
          <input
            type="text"
            placeholder="Search candidates by name, email, or skill keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-2.5 p-1 text-slate-400 hover:text-slate-600 rounded-md"
            >
              <FaTimes className="text-xs" />
            </button>
          )}
        </div>

        {/* Filters Group */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-xl p-2 font-medium focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-xl p-2 font-medium focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
          >
            {statuses.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>

          {/* Sort Selector */}
          <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-700 font-medium">
            <FaSortAmountDown className="text-slate-400 text-xs" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-slate-800 text-xs font-semibold focus:outline-hidden cursor-pointer"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Reset Filters */}
          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded-xl font-semibold border border-rose-200 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
        <span>
          Showing <span className="font-bold text-slate-800">{totalCount}</span> candidates matching search criteria
        </span>
      </div>
    </div>
  );
}

export default CandidateFilterBar;
