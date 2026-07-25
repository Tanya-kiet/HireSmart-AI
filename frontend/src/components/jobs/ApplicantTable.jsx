import React, { useState, useMemo } from "react";
import {
  FaSearch,
  FaFilter,
  FaSortAmountDown,
  FaFileAlt,
  FaCalendarPlus,
  FaChevronRight,
  FaCheckSquare,
  FaSquare,
  FaExchangeAlt,
  FaTrash,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ApplicantTable({ applicants, onSelectCompare, selectedCompareList, onSchedule }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [stageFilter, setStageFilter] = useState("All Stages");
  const [sortBy, setSortBy] = useState("match-desc");
  const [selectedIds, setSelectedIds] = useState([]);
  const [previewCandidate, setPreviewCandidate] = useState(null);

  // Search & Filter
  const filteredApplicants = useMemo(() => {
    let result = [...applicants];

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.role.toLowerCase().includes(q) ||
          a.email.toLowerCase().includes(q) ||
          a.skills.some((s) => s.toLowerCase().includes(q))
      );
    }

    if (stageFilter !== "All Stages") {
      result = result.filter((a) => a.stage === stageFilter);
    }

    result.sort((a, b) => {
      if (sortBy === "match-desc") return b.matchScore - a.matchScore;
      if (sortBy === "ats-desc") return b.atsScore - a.atsScore;
      if (sortBy === "name-asc") return a.name.localeCompare(b.name);
      return 0;
    });

    return result;
  }, [applicants, searchTerm, stageFilter, sortBy]);

  const handleSelectAll = () => {
    if (selectedIds.length === filteredApplicants.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredApplicants.map((a) => a.id));
    }
  };

  const handleToggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const stagesOptions = [
    "All Stages",
    "Applied",
    "Screened",
    "Shortlisted",
    "Interview Scheduled",
    "Final Round",
    "Offer",
    "Hired",
    "Rejected",
  ];

  return (
    <div className="space-y-4 font-sans">
      {/* Search, Filter & Bulk Actions Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 text-xs">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3.5 top-3 text-slate-400 text-xs" />
          <input
            type="text"
            placeholder="Search applicants by name, role, email, or skill..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-medium"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Stage Filter */}
          <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium text-slate-700">
            <FaFilter className="text-slate-400 text-[10px]" />
            <select
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
              className="bg-transparent text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
            >
              {stagesOptions.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium text-slate-700">
            <FaSortAmountDown className="text-slate-400 text-[10px]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
            >
              <option value="match-desc">Highest Match %</option>
              <option value="ats-desc">Highest ATS Score</option>
              <option value="name-asc">Candidate Name A-Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bulk Selection Bar if active */}
      {selectedIds.length > 0 && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between text-xs text-blue-900 font-bold">
          <span>{selectedIds.length} applicants selected</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedIds([])}
              className="px-3 py-1 bg-white border border-blue-200 rounded-md text-blue-700 hover:bg-blue-100 transition-colors"
            >
              Deselect All
            </button>
          </div>
        </div>
      )}

      {/* Table Container */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
              <th className="py-3 px-4 w-10 text-center">
                <input
                  type="checkbox"
                  checked={selectedIds.length === filteredApplicants.length && filteredApplicants.length > 0}
                  onChange={handleSelectAll}
                  className="rounded text-blue-600 focus:ring-0 cursor-pointer"
                />
              </th>
              <th className="py-3 px-4">Candidate</th>
              <th className="py-3 px-4">Experience</th>
              <th className="py-3 px-4">Match Score</th>
              <th className="py-3 px-4">ATS Score</th>
              <th className="py-3 px-4">Current Stage</th>
              <th className="py-3 px-4">Interview Status</th>
              <th className="py-3 px-4">Applied Date</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {filteredApplicants.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-8 text-center text-slate-400 font-medium">
                  No applicants match the current search criteria.
                </td>
              </tr>
            ) : (
              filteredApplicants.map((cand) => {
                const isSelectedForCompare = selectedCompareList?.some((c) => c.id === cand.id);

                return (
                  <tr
                    key={cand.id}
                    className="hover:bg-slate-50/80 transition-colors group"
                  >
                    <td className="py-3 px-4 text-center">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(cand.id)}
                        onChange={() => handleToggleSelect(cand.id)}
                        className="rounded text-blue-600 focus:ring-0 cursor-pointer"
                      />
                    </td>

                    {/* Candidate Name & Info */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        {cand.photo ? (
                          <img src={cand.photo} alt={cand.name} className="w-8 h-8 rounded-lg object-cover border border-slate-200 shrink-0" />
                        ) : (
                          <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
                            {cand.name.split(" ").map((n) => n[0]).join("")}
                          </div>
                        )}
                        <div>
                          <span
                            onClick={() => navigate(`/candidate/${cand.id}`)}
                            className="font-bold text-slate-900 hover:text-blue-600 cursor-pointer block text-xs"
                          >
                            {cand.name}
                          </span>
                          <span className="text-[10px] text-slate-500 block truncate max-w-[160px]">
                            {cand.role}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 font-semibold text-slate-800">
                      {cand.experience}
                    </td>

                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 font-bold text-emerald-800 bg-emerald-50 rounded border border-emerald-200">
                        {cand.matchScore}%
                      </span>
                    </td>

                    <td className="py-3 px-4 font-bold text-slate-900">
                      {cand.atsScore}%
                    </td>

                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 text-[11px] font-bold bg-blue-50 text-blue-700 rounded border border-blue-200">
                        {cand.stage}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-slate-500 font-medium">
                      {cand.interviewStatus}
                    </td>

                    <td className="py-3 px-4 text-slate-400 font-mono text-[11px]">
                      {cand.appliedDate}
                    </td>

                    {/* Hover Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => onSelectCompare(cand)}
                          className={`p-1.5 rounded transition-colors text-xs ${
                            isSelectedForCompare
                              ? "bg-blue-600 text-white"
                              : "text-slate-400 hover:text-slate-800 hover:bg-slate-100"
                          }`}
                          title="Compare Candidate"
                        >
                          <FaExchangeAlt />
                        </button>

                        <button
                          onClick={() => onSchedule(cand)}
                          className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors text-xs"
                          title="Schedule Interview"
                        >
                          <FaCalendarPlus />
                        </button>

                        <button
                          onClick={() => setPreviewCandidate(cand)}
                          className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded transition-colors text-xs"
                          title="Quick Preview"
                        >
                          <FaFileAlt />
                        </button>

                        <button
                          onClick={() => navigate(`/candidate/${cand.id}`)}
                          className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors text-xs"
                          title="View Full Profile"
                        >
                          <FaChevronRight />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Quick Preview Modal */}
      {previewCandidate && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                Quick Candidate Summary
              </h3>
              <button
                onClick={() => setPreviewCandidate(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg text-xs"
              >
                Close
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-3">
                {previewCandidate.photo ? (
                  <img src={previewCandidate.photo} alt={previewCandidate.name} className="w-12 h-12 rounded-xl object-cover border border-slate-200" />
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                    {previewCandidate.name.split(" ").map(n => n[0]).join("")}
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{previewCandidate.name}</h4>
                  <p className="text-xs text-slate-500 font-semibold">{previewCandidate.role}</p>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-700 leading-relaxed font-medium">
                "{previewCandidate.summary}"
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  onClick={() => {
                    const cand = previewCandidate;
                    setPreviewCandidate(null);
                    navigate(`/candidate/${cand.id}`);
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
                >
                  View Full Candidate Profile →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ApplicantTable;
