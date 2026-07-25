import React from "react";
import CandidateRow from "./CandidateRow";
import { FaUserPlus, FaFileUpload } from "react-icons/fa";

function CandidateTable({
  candidates,
  selectedIds,
  onToggleSelect,
  onSelectAll,
  onAction,
  onUploadClick,
}) {
  const isAllSelected =
    candidates.length > 0 && candidates.every((c) => selectedIds.includes(c.id));

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden font-sans">
      {candidates.length === 0 ? (
        /* Professional Empty State */
        <div className="p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto text-lg">
            <FaUserPlus />
          </div>
          <h3 className="text-sm font-bold text-slate-900">No Candidates Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto font-medium leading-relaxed">
            No candidates matched your search criteria or active filters. Try adjusting your query or upload new candidate resumes.
          </p>
          <div className="pt-2">
            <button
              onClick={onUploadClick}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer inline-flex items-center gap-2 shadow-2xs"
            >
              <FaFileUpload className="text-xs" />
              <span>Upload Resume PDF</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4 w-10">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={onSelectAll}
                    className="rounded text-blue-600 focus:ring-0 cursor-pointer"
                  />
                </th>
                <th className="py-3 px-4">Candidate</th>
                <th className="py-3 px-4">Applied Role</th>
                <th className="py-3 px-4">Experience</th>
                <th className="py-3 px-4">Match</th>
                <th className="py-3 px-4">Current Stage</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {candidates.map((cand) => (
                <CandidateRow
                  key={cand.id}
                  candidate={cand}
                  isSelected={selectedIds.includes(cand.id)}
                  onToggleSelect={onToggleSelect}
                  onAction={onAction}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default CandidateTable;
