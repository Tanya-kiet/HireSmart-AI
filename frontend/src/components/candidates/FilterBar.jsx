import React from "react";
import { FaSearch, FaTimes, FaUndo } from "react-icons/fa";

function FilterBar({
  searchTerm,
  onSearchChange,
  roleFilter,
  onRoleFilterChange,
  statusFilter,
  onStatusFilterChange,
  expFilter,
  onExpFilterChange,
  locationFilter,
  onLocationFilterChange,
  sortBy,
  onSortByChange,
  onClearFilters,
  hasActiveFilters,
}) {
  const roles = ["All Job Roles", "Senior Frontend Engineer", "ML Engineer", "React Lead", "DevOps Engineer", "UI/UX Designer"];
  const statuses = ["All Statuses", "New", "Reviewed", "Interview", "Offer", "Hired", "Rejected"];
  const experiences = ["All Experience", "0-2 Years", "3-5 Years", "6+ Years"];
  const locations = ["All Locations", "San Francisco, CA", "New York, NY", "Austin, TX", "Seattle, WA"];

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-xs space-y-3 font-sans">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 text-xs">
        {/* Search Input */}
        <div className="relative flex-1">
          <FaSearch className="absolute left-3.5 top-3 text-slate-400 text-xs" />
          <input
            type="text"
            placeholder="Search by candidate, email, skill, company or role..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white font-medium placeholder-slate-400"
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

        {/* Compact Dropdown Filters Row */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Job Role */}
          <select
            value={roleFilter}
            onChange={(e) => onRoleFilterChange(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold rounded-lg px-2.5 py-2 focus:outline-none cursor-pointer max-w-[150px] truncate"
          >
            {roles.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>

          {/* Status */}
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold rounded-lg px-2.5 py-2 focus:outline-none cursor-pointer"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          {/* Experience */}
          <select
            value={expFilter}
            onChange={(e) => onExpFilterChange(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold rounded-lg px-2.5 py-2 focus:outline-none cursor-pointer"
          >
            {experiences.map((ex) => (
              <option key={ex} value={ex}>{ex}</option>
            ))}
          </select>

          {/* Location */}
          <select
            value={locationFilter}
            onChange={(e) => onLocationFilterChange(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold rounded-lg px-2.5 py-2 focus:outline-none cursor-pointer max-w-[140px] truncate"
          >
            {locations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold rounded-lg px-2.5 py-2 focus:outline-none cursor-pointer"
          >
            <option value="match">Sort by Match %</option>
            <option value="name">Sort by Name</option>
            <option value="recent">Sort by Recent</option>
          </select>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="px-2.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1 shrink-0"
              title="Clear active filters"
            >
              <FaUndo className="text-[10px]" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
