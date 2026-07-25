import React, { useState, useMemo } from "react";
import MainLayout from "../components/layout/MainLayout";
import CandidateComparisonModal from "../components/candidates/CandidateComparisonModal";
import CandidatePagination from "../components/candidates/CandidatePagination";
import ScheduleDrawer from "../components/interviews/ScheduleDrawer";
import Alert from "../components/common/Alert";
import { mockCandidatesPool1420 } from "../components/candidates/mockCandidates";
import {
  FaSearch,
  FaTimes,
  FaFileUpload,
  FaBalanceScale,
  FaCalendarPlus,
  FaUser,
  FaUndo,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Candidates() {
  const navigate = useNavigate();

  // Full 1,420 Candidate Pool State
  const [candidatesList, setCandidatesList] = useState(mockCandidatesPool1420);

  // Dynamic Checkbox Selection for Comparison (Max 2 Candidates)
  const [selectedCandidateIds, setSelectedCandidateIds] = useState([]);

  // Search, Filter & Sorting States
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [expFilter, setExpFilter] = useState("All Experience");
  const [atsFilter, setAtsFilter] = useState("All ATS Scores");
  const [matchFilter, setMatchFilter] = useState("All Match Scores");
  const [sortBy, setSortBy] = useState("match-desc"); // 'match-desc', 'ats-desc', 'exp-desc', 'newest'

  // Pagination State (25 per page)
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 25;

  // Drawers / Modals / Alerts
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [scheduleCandidate, setScheduleCandidate] = useState(null);
  const [alert, setAlert] = useState(null);

  // Role Options
  const roleOptions = [
    "All Roles",
    "Senior Lead Frontend Engineer",
    "Staff Frontend Architect",
    "ML & AI Research Scientist",
    "Senior DevOps Cloud Engineer",
    "Fullstack React & Node Specialist",
    "Senior Product Manager",
    "Staff Data Engineer",
    "Principal UI/UX Designer",
    "Backend Python/FastAPI Engineer",
  ];

  // Status Options
  const statusOptions = ["All Statuses", "Interview", "Screened", "Shortlisted", "New", "Hired", "Rejected"];

  // Toggle Checkbox Selection with Max-2 Rule
  const handleToggleSelectCandidate = (cand, e) => {
    e.stopPropagation();
    const isSelected = selectedCandidateIds.includes(cand.id);

    if (isSelected) {
      setSelectedCandidateIds((prev) => prev.filter((id) => id !== cand.id));
    } else {
      if (selectedCandidateIds.length >= 2) {
        setAlert({
          type: "warning",
          title: "Comparison Limit Reached",
          message: "You can compare only two candidates at a time.",
        });
        return;
      }
      setSelectedCandidateIds((prev) => [...prev, cand.id]);
    }
  };

  // Selected candidate objects for modal
  const selectedCandidates = useMemo(() => {
    return candidatesList.filter((c) => selectedCandidateIds.includes(c.id));
  }, [candidatesList, selectedCandidateIds]);

  // Filter & Sort Logic
  const filteredCandidates = useMemo(() => {
    let result = [...candidatesList];

    // Search query across Name, Email, Role, Skills
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter((c) => {
        const matchName = c.name.toLowerCase().includes(q);
        const matchEmail = c.email.toLowerCase().includes(q);
        const matchRole = (c.targetRole || c.role).toLowerCase().includes(q);
        const matchSkill = c.skills && c.skills.some((s) => s.toLowerCase().includes(q));
        return matchName || matchEmail || matchRole || matchSkill;
      });
    }

    // Role Filter
    if (roleFilter !== "All Roles") {
      result = result.filter((c) => c.targetRole === roleFilter || c.role === roleFilter);
    }

    // Status Filter
    if (statusFilter !== "All Statuses") {
      result = result.filter((c) => c.status === statusFilter);
    }

    // Experience Filter
    if (expFilter === ">3 Years") {
      result = result.filter((c) => c.experienceYears >= 3);
    } else if (expFilter === ">5 Years") {
      result = result.filter((c) => c.experienceYears >= 5);
    } else if (expFilter === ">7 Years") {
      result = result.filter((c) => c.experienceYears >= 7);
    }

    // ATS Score Filter
    if (atsFilter === ">80%") {
      result = result.filter((c) => c.atsScore >= 80);
    } else if (atsFilter === ">90%") {
      result = result.filter((c) => c.atsScore >= 90);
    }

    // Match Score Filter
    if (matchFilter === ">80%") {
      result = result.filter((c) => c.matchScore >= 80);
    } else if (matchFilter === ">90%") {
      result = result.filter((c) => c.matchScore >= 90);
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === "match-desc") return b.matchScore - a.matchScore;
      if (sortBy === "ats-desc") return b.atsScore - a.atsScore;
      if (sortBy === "exp-desc") return b.experienceYears - a.experienceYears;
      if (sortBy === "newest") return b.id.localeCompare(a.id);
      return 0;
    });

    return result;
  }, [candidatesList, searchTerm, roleFilter, statusFilter, expFilter, atsFilter, matchFilter, sortBy]);

  // Reset page when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm, roleFilter, statusFilter, expFilter, atsFilter, matchFilter, sortBy]);

  // Paginated Slicing
  const totalItems = filteredCandidates.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const paginatedCandidates = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredCandidates.slice(start, start + pageSize);
  }, [filteredCandidates, currentPage, pageSize]);

  // Reset all filters
  const handleResetFilters = () => {
    setSearchTerm("");
    setRoleFilter("All Roles");
    setStatusFilter("All Statuses");
    setExpFilter("All Experience");
    setAtsFilter("All ATS Scores");
    setMatchFilter("All Match Scores");
    setSortBy("match-desc");
  };

  const hasActiveFilters =
    searchTerm ||
    roleFilter !== "All Roles" ||
    statusFilter !== "All Statuses" ||
    expFilter !== "All Experience" ||
    atsFilter !== "All ATS Scores" ||
    matchFilter !== "All Match Scores";

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case "Interview":
        return "bg-blue-50 text-blue-800 border-blue-200";
      case "Shortlisted":
        return "bg-purple-50 text-purple-800 border-purple-200";
      case "Screened":
        return "bg-indigo-50 text-indigo-800 border-indigo-200";
      case "Hired":
        return "bg-emerald-50 text-emerald-800 border-emerald-200";
      case "New":
        return "bg-amber-50 text-amber-800 border-amber-200";
      case "Rejected":
        return "bg-slate-100 text-slate-600 border-slate-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  // Compare Button Text & State
  const compareCount = selectedCandidateIds.length;
  const isCompareReady = compareCount === 2;
  const getCompareButtonLabel = () => {
    if (compareCount === 0) return "Select 2 candidates to compare";
    if (compareCount === 1) return "Select 1 more candidate";
    return `Compare Candidates (2 Selected)`;
  };

  return (
    <MainLayout>
      <div className="space-y-5 max-w-7xl mx-auto pb-16 font-sans">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
              <span>Candidate Pool</span>
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100 font-mono">
                {candidatesList.length.toLocaleString()} Applicants
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5 font-medium">
              Search, filter, rank, and manage all candidates in the recruitment pipeline.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Dynamic Compare Candidates Button */}
            <button
              onClick={() => {
                if (isCompareReady) setIsCompareOpen(true);
              }}
              disabled={!isCompareReady}
              className={`px-3.5 py-2 font-bold rounded-xl text-xs transition-all flex items-center gap-1.5 border cursor-pointer ${
                isCompareReady
                  ? "bg-blue-600 hover:bg-blue-700 text-white border-blue-600 shadow-2xs"
                  : "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed opacity-70"
              }`}
            >
              <FaBalanceScale className="text-xs" />
              <span>{getCompareButtonLabel()}</span>
            </button>

            <button
              onClick={() => navigate("/upload")}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
            >
              <FaFileUpload className="text-xs" />
              <span>Upload Resume</span>
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

        {/* Search, Filters & Sorting Bar */}
        <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-xs space-y-3 font-sans">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 text-xs">
            {/* Search Input */}
            <div className="relative flex-1">
              <FaSearch className="absolute left-3.5 top-3 text-slate-400 text-xs" />
              <input
                type="text"
                placeholder="Search candidates by name, email, role, or skills (e.g. React)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white font-medium placeholder-slate-400"
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

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-bold text-[10px] uppercase tracking-wider hidden sm:inline-block">
                Sort By:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold rounded-lg px-3 py-2 focus:outline-none cursor-pointer"
              >
                <option value="match-desc">Highest Match Score</option>
                <option value="ats-desc">Highest ATS Score</option>
                <option value="exp-desc">Most Experience</option>
                <option value="newest">Newest Applicants</option>
              </select>
            </div>
          </div>

          {/* Filter Controls Row */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold rounded-lg px-2.5 py-1.5 focus:outline-none cursor-pointer"
            >
              {roleOptions.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold rounded-lg px-2.5 py-1.5 focus:outline-none cursor-pointer"
            >
              {statusOptions.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            <select
              value={expFilter}
              onChange={(e) => setExpFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold rounded-lg px-2.5 py-1.5 focus:outline-none cursor-pointer"
            >
              <option value="All Experience">All Experience</option>
              <option value=">3 Years">&gt; 3 Years Experience</option>
              <option value=">5 Years">&gt; 5 Years Experience</option>
              <option value=">7 Years">&gt; 7 Years Experience</option>
            </select>

            <select
              value={atsFilter}
              onChange={(e) => setAtsFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold rounded-lg px-2.5 py-1.5 focus:outline-none cursor-pointer"
            >
              <option value="All ATS Scores">All ATS Scores</option>
              <option value=">80%">&gt; 80% ATS Score</option>
              <option value=">90%">&gt; 90% ATS Score</option>
            </select>

            <select
              value={matchFilter}
              onChange={(e) => setMatchFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold rounded-lg px-2.5 py-1.5 focus:outline-none cursor-pointer"
            >
              <option value="All Match Scores">All Match Scores</option>
              <option value=">80%">&gt; 80% Vector Match</option>
              <option value=">90%">&gt; 90% Vector Match</option>
            </select>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded-lg font-bold border border-rose-200 transition-colors cursor-pointer ml-auto flex items-center gap-1"
              >
                <FaUndo className="text-[10px]" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Candidate Table or Empty State */}
        {paginatedCandidates.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center font-sans space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center text-xl mx-auto">
              <FaUser />
            </div>
            <h3 className="text-sm font-bold text-slate-900">No candidates found</h3>
            <p className="text-xs text-slate-500 font-medium max-w-sm mx-auto">
              Try adjusting your filters or search query to find candidates.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer inline-flex items-center gap-1.5"
            >
              <FaUndo className="text-xs" />
              <span>Reset Filters</span>
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden font-sans">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="py-3 px-3.5 w-10 text-center">Select</th>
                    <th className="py-3 px-4">Candidate</th>
                    <th className="py-3 px-4">Target Role</th>
                    <th className="py-3 px-4">Experience</th>
                    <th className="py-3 px-4">ATS Score</th>
                    <th className="py-3 px-4">Match %</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Applied Date</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paginatedCandidates.map((cand) => {
                    const isChecked = selectedCandidateIds.includes(cand.id);
                    return (
                      <tr
                        key={cand.id}
                        onClick={() => navigate(`/candidate/${cand.id}`)}
                        className={`transition-colors cursor-pointer group ${
                          isChecked ? "bg-blue-50/50" : "hover:bg-slate-50/90"
                        }`}
                      >
                        {/* Checkbox Column */}
                        <td className="py-3.5 px-3.5 text-center" onClick={(e) => e.stopPropagation()}>
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => handleToggleSelectCandidate(cand, e)}
                            className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                          />
                        </td>

                        {/* Candidate Avatar, Name, Email */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-9 h-9 rounded-xl ${cand.avatarBg} text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs`}
                            >
                              {cand.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </div>
                            <div>
                              <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                                {cand.name}
                              </div>
                              <div className="text-[11px] text-slate-400 font-medium truncate">
                                {cand.email}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Target Role */}
                        <td className="py-3.5 px-4 font-semibold text-slate-800">
                          {cand.targetRole || cand.role}
                        </td>

                        {/* Experience */}
                        <td className="py-3.5 px-4 font-medium text-slate-700">
                          {cand.experience}
                        </td>

                        {/* ATS Score */}
                        <td className="py-3.5 px-4">
                          <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 font-mono">
                            {cand.atsScore}%
                          </span>
                        </td>

                        {/* Match Score */}
                        <td className="py-3.5 px-4">
                          <span className="font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-mono">
                            {cand.matchScore}%
                          </span>
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-4">
                          <span
                            className={`px-2.5 py-0.5 text-[10px] font-bold rounded border ${getStatusBadgeStyle(
                              cand.status
                            )}`}
                          >
                            {cand.status}
                          </span>
                        </td>

                        {/* Applied Date */}
                        <td className="py-3.5 px-4 font-mono text-slate-600">
                          {cand.applicationDate || "Jul 24, 2026"}
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => navigate(`/candidate/${cand.id}`)}
                              className="px-2.5 py-1 text-[11px] font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                            >
                              View Profile
                            </button>
                            <button
                              onClick={(e) => handleToggleSelectCandidate(cand, e)}
                              className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-colors cursor-pointer ${
                                isChecked
                                  ? "bg-blue-600 text-white"
                                  : "text-blue-600 hover:bg-blue-50"
                              }`}
                            >
                              {isChecked ? "Selected" : "Select"}
                            </button>
                            <button
                              onClick={() => {
                                setScheduleCandidate(cand);
                                setIsScheduleOpen(true);
                              }}
                              className="p-1.5 text-slate-400 hover:text-purple-600 rounded-lg hover:bg-purple-50 transition-colors cursor-pointer"
                              title="Schedule Interview"
                            >
                              <FaCalendarPlus className="text-xs" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Bottom Pagination */}
            <div className="p-4 bg-slate-50/50 border-t border-slate-100">
              <CandidatePagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                pageSize={pageSize}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </div>
        )}

        {/* Dynamic Side-by-Side Candidate Comparison Modal */}
        <CandidateComparisonModal
          isOpen={isCompareOpen}
          onClose={() => setIsCompareOpen(false)}
          candidates={selectedCandidates}
        />

        {/* Schedule Interview Drawer */}
        <ScheduleDrawer
          isOpen={isScheduleOpen}
          onClose={() => setIsScheduleOpen(false)}
          onSchedule={() => {
            setAlert({
              type: "success",
              title: "Interview Scheduled",
              message: `Scheduled technical interview for ${scheduleCandidate?.name || "candidate"}.`,
            });
          }}
        />
      </div>
    </MainLayout>
  );
}

export default Candidates;