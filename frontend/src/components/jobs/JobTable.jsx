import React from "react";
import {
  FaChevronRight,
  FaEdit,
  FaCopy,
  FaArchive,
  FaTrash,
  FaUsers,
  FaBriefcase,
  FaArrowRight,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function JobTable({ jobs, onEdit, onDuplicate, onToggleStatus, onDelete }) {
  const navigate = useNavigate();

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case "Open":
        return "bg-emerald-50 text-emerald-800 border-emerald-200";
      case "Draft":
        return "bg-amber-50 text-amber-800 border-amber-200";
      case "Closed":
        return "bg-rose-50 text-rose-800 border-rose-200";
      case "Archived":
        return "bg-slate-100 text-slate-700 border-slate-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  const getAiBadgeStyle = (tag) => {
    switch (tag) {
      case "Needs Better JD":
        return "bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100";
      case "Few Qualified Candidates":
        return "bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100";
      default:
        return "bg-blue-50 text-blue-800 border-blue-200 hover:bg-blue-100";
    }
  };

  if (jobs.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center font-sans space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center text-xl mx-auto">
          <FaBriefcase />
        </div>
        <h3 className="text-sm font-bold text-slate-900">No Job Requisitions Found</h3>
        <p className="text-xs text-slate-500 font-medium max-w-sm mx-auto">
          No job requisitions match your active filter criteria. Try clearing search filters or create a new job.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden font-sans">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              <th className="py-3 px-4">Job Title</th>
              <th className="py-3 px-4">Department</th>
              <th className="py-3 px-4">Location</th>
              <th className="py-3 px-4">Employment</th>
              <th className="py-3 px-4">Applications</th>
              <th className="py-3 px-4 w-48">Hiring Progress</th>
              <th className="py-3 px-4">Last Updated</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {jobs.map((job) => {
              const appCount = job.applications || 48;
              const screened = Math.round(appCount * 0.4);
              const interview = Math.round(appCount * 0.15);
              const offer = Math.round(appCount * 0.04);
              const aiTag = job.aiTag || "High Match Pool";

              return (
                <tr
                  key={job.id}
                  onClick={() => navigate(`/jobs/${job.id}`)}
                  className="hover:bg-slate-50/90 transition-colors cursor-pointer group"
                >
                  {/* Job Title & Tiny AI Tag */}
                  <td className="py-3 px-4">
                    <div className="space-y-1 min-w-0">
                      <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                        {job.title}
                      </div>
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/jobs/${job.id}`);
                        }}
                        className={`inline-block px-1.5 py-0.2 text-[9px] font-bold rounded border transition-colors cursor-pointer ${getAiBadgeStyle(
                          aiTag
                        )}`}
                      >
                        {aiTag}
                      </span>
                    </div>
                  </td>

                  {/* Department */}
                  <td className="py-3 px-4 font-semibold text-slate-800">
                    {job.department}
                  </td>

                  {/* Location */}
                  <td className="py-3 px-4 font-medium text-slate-600 truncate max-w-[130px]">
                    {job.location}
                  </td>

                  {/* Employment Type */}
                  <td className="py-3 px-4 font-medium text-slate-600">
                    {job.employmentType || "Full-time"}
                  </td>

                  {/* Applications */}
                  <td className="py-3 px-4 font-bold text-slate-900">
                    <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200/80">
                      {appCount} Applicants
                    </span>
                  </td>

                  {/* Hiring Progress Horizontal Stage Indicator */}
                  <td className="py-3 px-4">
                    <div className="space-y-1">
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden flex">
                        <div className="bg-blue-600 h-full" style={{ width: "40%" }} title={`${screened} Screened`} />
                        <div className="bg-purple-600 h-full" style={{ width: "25%" }} title={`${interview} Interview`} />
                        <div className="bg-emerald-500 h-full" style={{ width: "15%" }} title={`${offer} Offer`} />
                      </div>
                      <div className="flex justify-between text-[9px] text-slate-400 font-mono">
                        <span>{appCount} App</span>
                        <span>{screened} Scr</span>
                        <span>{interview} Int</span>
                        <span>{offer} Off</span>
                      </div>
                    </div>
                  </td>

                  {/* Last Updated */}
                  <td className="py-3 px-4 text-slate-500 font-medium">
                    {job.lastUpdated || "2 days ago"}
                  </td>

                  {/* Status Badge */}
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold rounded border ${getStatusBadgeStyle(
                        job.status
                      )}`}
                    >
                      {job.status}
                    </span>
                  </td>

                  {/* Hover Quick Actions */}
                  <td className="py-3 px-4 text-right">
                    <div
                      className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => navigate(`/jobs/${job.id}`)}
                        className="px-2 py-1 text-[11px] font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded border border-blue-200 transition-colors cursor-pointer flex items-center gap-1"
                        title="Open Workspace"
                      >
                        <span>Workspace</span>
                        <FaChevronRight className="text-[9px]" />
                      </button>

                      <button
                        onClick={() => navigate(`/jobs/${job.id}`)}
                        className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded transition-colors cursor-pointer"
                        title="View Applicants"
                      >
                        <FaUsers className="text-xs" />
                      </button>

                      <button
                        onClick={() => onDuplicate(job)}
                        className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded transition-colors cursor-pointer"
                        title="Duplicate Requisition"
                      >
                        <FaCopy className="text-xs" />
                      </button>

                      <button
                        onClick={() => onToggleStatus(job)}
                        className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded transition-colors cursor-pointer"
                        title="Archive Job"
                      >
                        <FaArchive className="text-xs" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default JobTable;
