import React from "react";
import {
  FaChevronRight,
  FaEdit,
  FaCopy,
  FaArchive,
  FaTrash,
  FaUsers,
  FaBriefcase,
  FaCheck,
  FaUndo,
  FaEye,
  FaFileAlt,
  FaTimesCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function JobTable({
  jobs = [],
  activeTab = "all",
  onEdit,
  onDuplicate,
  onPublish,
  onClosePosition,
  onArchive,
  onRestore,
  onDelete,
}) {
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

  const getStatusDot = (status) => {
    switch (status) {
      case "Open":
        return "bg-emerald-500";
      case "Draft":
        return "bg-amber-500";
      case "Closed":
        return "bg-rose-500";
      case "Archived":
        return "bg-slate-400";
      default:
        return "bg-slate-400";
    }
  };

  // Tab-specific empty state rendering
  if (jobs.length === 0) {
    const getEmptyStateDetails = () => {
      if (activeTab === "Draft") {
        return {
          title: "No Draft Jobs Found",
          desc: "You have no draft job requisitions. Create a draft position to prepare hiring requirements.",
        };
      }
      if (activeTab === "Closed") {
        return {
          title: "No Closed Jobs Found",
          desc: "No positions have been marked as closed. Closed requisitions will appear here when hiring completes.",
        };
      }
      if (activeTab === "Archived") {
        return {
          title: "No Archived Jobs Found",
          desc: "Archived positions will appear here after being archived for reference.",
        };
      }
      if (activeTab === "Open") {
        return {
          title: "No Open Jobs Found",
          desc: "There are currently no active open requisitions. Publish a draft or create a job to begin hiring.",
        };
      }
      return {
        title: "No Job Requisitions Found",
        desc: "No job requisitions match your active filter criteria.",
      };
    };

    const empty = getEmptyStateDetails();

    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center font-sans space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center text-xl mx-auto">
          <FaBriefcase />
        </div>
        <h3 className="text-sm font-bold text-slate-900">{empty.title}</h3>
        <p className="text-xs text-slate-500 font-medium max-w-sm mx-auto">
          {empty.desc}
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
              <th className="py-3 px-4">Job Title & Status Note</th>
              <th className="py-3 px-4">Department</th>
              <th className="py-3 px-4">Location</th>
              <th className="py-3 px-4">Employment</th>
              <th className="py-3 px-4">Applicants</th>
              <th className="py-3 px-4 w-44">Hiring Stage</th>
              <th className="py-3 px-4">Created / Updated</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {jobs.map((job) => {
              const appCount = job.applications || 0;
              const screened = Math.round(appCount * 0.4);
              const interview = Math.round(appCount * 0.15);
              const offer = Math.round(appCount * 0.04);

              return (
                <tr
                  key={job.id}
                  onClick={() => navigate(`/jobs/${job.id}`)}
                  className="hover:bg-slate-50/90 transition-colors cursor-pointer group"
                >
                  {/* Job Title & Helpful Status Note */}
                  <td className="py-3.5 px-4">
                    <div className="space-y-1 min-w-0">
                      <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate text-xs">
                        {job.title}
                      </div>

                      {/* Display helpful note for Draft / Closed / Archived */}
                      {job.status === "Draft" && (
                        <span className="text-[10px] text-amber-700 font-semibold block">
                          ● {job.note || "This role has not been published yet."}
                        </span>
                      )}

                      {job.status === "Closed" && (
                        <span className="text-[10px] text-rose-700 font-semibold block">
                          ● {job.note || "Hiring Completed • Offer Accepted"}
                        </span>
                      )}

                      {job.status === "Archived" && (
                        <span className="text-[10px] text-slate-500 font-semibold block">
                          ● {job.note || "Archived position stored for reference."}
                        </span>
                      )}

                      {job.status === "Open" && (
                        <div className="flex flex-wrap gap-1">
                          {(job.skills || []).slice(0, 3).map((s, idx) => (
                            <span
                              key={idx}
                              className="px-1.5 py-0.2 text-[9px] font-semibold bg-slate-100 text-slate-600 rounded"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Department */}
                  <td className="py-3.5 px-4 font-semibold text-slate-800">
                    {job.department}
                  </td>

                  {/* Location */}
                  <td className="py-3.5 px-4 font-medium text-slate-600 truncate max-w-[130px]">
                    {job.location}
                  </td>

                  {/* Employment Type */}
                  <td className="py-3.5 px-4 font-medium text-slate-600">
                    {job.employmentType || "Full-time"}
                  </td>

                  {/* Applicants Count */}
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200/80 font-mono">
                      {appCount} Applicants
                    </span>
                  </td>

                  {/* Hiring Progress Horizontal Stage Indicator */}
                  <td className="py-3.5 px-4">
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
                      </div>
                    </div>
                  </td>

                  {/* Created / Last Updated */}
                  <td className="py-3.5 px-4 text-slate-500 font-medium">
                    <div>{job.createdDate || "Jul 15, 2026"}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{job.lastUpdated || "2 days ago"}</div>
                  </td>

                  {/* Status Badge with colored dot */}
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2.5 py-0.5 text-[10px] font-bold rounded border flex items-center gap-1.5 w-fit ${getStatusBadgeStyle(
                        job.status
                      )}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${getStatusDot(job.status)}`} />
                      <span>{job.status}</span>
                    </span>
                  </td>

                  {/* Tab-scoped Action Buttons */}
                  <td className="py-3.5 px-4 text-right">
                    <div
                      className="flex items-center justify-end gap-1.5"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* OPEN JOBS ACTIONS */}
                      {job.status === "Open" && (
                        <>
                          <button
                            onClick={() => navigate(`/jobs/${job.id}`)}
                            className="px-2.5 py-1 text-[11px] font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded border border-blue-200 transition-colors cursor-pointer flex items-center gap-1"
                            title="Open Workspace"
                          >
                            <span>Workspace</span>
                            <FaChevronRight className="text-[9px]" />
                          </button>

                          <button
                            onClick={() => onEdit(job)}
                            className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors cursor-pointer"
                            title="Edit Job"
                          >
                            <FaEdit className="text-xs" />
                          </button>

                          <button
                            onClick={() => onDuplicate(job)}
                            className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded transition-colors cursor-pointer"
                            title="Duplicate Requisition"
                          >
                            <FaCopy className="text-xs" />
                          </button>

                          <button
                            onClick={() => onClosePosition(job)}
                            className="px-2 py-1 text-[11px] font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded border border-rose-200 transition-colors cursor-pointer"
                            title="Close Position"
                          >
                            Close
                          </button>
                        </>
                      )}

                      {/* DRAFT JOBS ACTIONS */}
                      {job.status === "Draft" && (
                        <>
                          <button
                            onClick={() => onPublish(job)}
                            className="px-2.5 py-1 text-[11px] font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                            title="Publish Draft"
                          >
                            <FaCheck className="text-[9px]" />
                            <span>Publish</span>
                          </button>

                          <button
                            onClick={() => onEdit(job)}
                            className="px-2 py-1 text-[11px] font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded transition-colors cursor-pointer"
                            title="Edit Draft"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => onDelete(job)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors cursor-pointer"
                            title="Delete Draft"
                          >
                            <FaTrash className="text-xs" />
                          </button>
                        </>
                      )}

                      {/* CLOSED JOBS ACTIONS */}
                      {job.status === "Closed" && (
                        <>
                          <button
                            onClick={() => navigate(`/jobs/${job.id}`)}
                            className="px-2 py-1 text-[11px] font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded transition-colors cursor-pointer flex items-center gap-1"
                            title="View Closed Workspace"
                          >
                            <FaEye className="text-[9px]" />
                            <span>View</span>
                          </button>

                          <button
                            onClick={() => onDuplicate(job)}
                            className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded transition-colors cursor-pointer"
                            title="Duplicate Job"
                          >
                            <FaCopy className="text-xs" />
                          </button>

                          <button
                            onClick={() => onArchive(job)}
                            className="px-2 py-1 text-[11px] font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded border border-slate-300 transition-colors cursor-pointer flex items-center gap-1"
                            title="Archive Position"
                          >
                            <FaArchive className="text-[9px]" />
                            <span>Archive</span>
                          </button>
                        </>
                      )}

                      {/* ARCHIVED JOBS ACTIONS */}
                      {job.status === "Archived" && (
                        <>
                          <button
                            onClick={() => onRestore(job)}
                            className="px-2.5 py-1 text-[11px] font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded border border-blue-200 transition-colors cursor-pointer flex items-center gap-1"
                            title="Restore Position"
                          >
                            <FaUndo className="text-[9px]" />
                            <span>Restore</span>
                          </button>

                          <button
                            onClick={() => onDelete(job)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors cursor-pointer"
                            title="Delete Permanently"
                          >
                            <FaTrash className="text-xs" />
                          </button>
                        </>
                      )}
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
