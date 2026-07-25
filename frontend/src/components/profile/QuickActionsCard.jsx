import React from "react";
import {
  FaCalendarPlus,
  FaArrowRight,
  FaDownload,
  FaShareAlt,
  FaTimes,
  FaCheck,
  FaBolt,
  FaBalanceScale,
} from "react-icons/fa";

function QuickActionsCard({ onAction }) {
  const actions = [
    {
      id: "schedule",
      label: "Schedule Interview",
      icon: FaCalendarPlus,
      shortcut: "⌘S",
      variant: "bg-blue-600 hover:bg-blue-700 text-white font-bold",
    },
    {
      id: "compare",
      label: "Compare Candidate",
      icon: FaBalanceScale,
      shortcut: "⌘C",
      variant: "bg-indigo-50 hover:bg-indigo-100 text-indigo-800 font-bold border border-indigo-200",
    },
    {
      id: "move-stage",
      label: "Move Stage",
      icon: FaArrowRight,
      shortcut: "⌘M",
      variant: "bg-slate-900 hover:bg-slate-800 text-white font-bold",
    },
    {
      id: "shortlist",
      label: "Shortlist Candidate",
      icon: FaCheck,
      shortcut: "⌘L",
      variant: "bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold border border-emerald-200",
    },
    {
      id: "download",
      label: "Download Resume",
      icon: FaDownload,
      shortcut: "⌘D",
      variant: "bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold border border-slate-200",
    },
    {
      id: "share",
      label: "Share Candidate",
      icon: FaShareAlt,
      shortcut: "⌘K",
      variant: "bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold border border-slate-200",
    },
    {
      id: "reject",
      label: "Reject Candidate",
      icon: FaTimes,
      shortcut: "⌘X",
      variant: "bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold border border-rose-200",
    },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-3 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <FaBolt className="text-slate-500 text-sm" />
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">
            Quick Actions
          </h3>
        </div>
        <span className="text-[10px] text-slate-400 font-mono">Shortcuts Active</span>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <button
              key={act.id}
              onClick={() => onAction(act.id)}
              className={`w-full px-3 py-2 rounded-lg text-xs transition-all cursor-pointer flex items-center justify-between gap-2 shadow-2xs ${act.variant}`}
            >
              <div className="flex items-center gap-2">
                <Icon className="text-xs shrink-0" />
                <span>{act.label}</span>
              </div>
              <kbd className="px-1.5 py-0.5 text-[9px] font-mono bg-white/30 text-current rounded border border-current/20">
                {act.shortcut}
              </kbd>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default QuickActionsCard;
