import React from "react";

function CandidateStatusBadge({ status }) {
  const getStyles = (s) => {
    switch (s) {
      case "New":
        return "bg-slate-100 text-slate-800 border-slate-300";
      case "Reviewed":
        return "bg-blue-50 text-blue-800 border-blue-200";
      case "Interview":
        return "bg-purple-50 text-purple-800 border-purple-200";
      case "Offer":
        return "bg-emerald-50 text-emerald-800 border-emerald-200";
      case "Hired":
        return "bg-emerald-100 text-emerald-900 border-emerald-300";
      case "Rejected":
        return "bg-rose-50 text-rose-800 border-rose-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <span
      className={`px-2.5 py-0.5 text-xs font-bold rounded-md border inline-flex items-center gap-1.5 ${getStyles(
        status
      )}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-75" />
      <span>{status || "New"}</span>
    </span>
  );
}

export default CandidateStatusBadge;
