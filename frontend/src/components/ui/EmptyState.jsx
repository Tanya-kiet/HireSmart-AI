import React from "react";
import { FaFolderOpen } from "react-icons/fa";

function EmptyState({
  title = "No data found",
  description = "There are no records matching your current filter criteria.",
  icon: Icon = FaFolderOpen,
  action,
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-12 text-center space-y-3">
      <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center text-xl mx-auto">
        <Icon />
      </div>
      <div>
        <h3 className="text-base font-bold text-slate-800">{title}</h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 leading-relaxed">
          {description}
        </p>
      </div>
      {action && <div className="pt-2">{action}</div>}
    </div>
  );
}

export default EmptyState;
