import React from "react";
import { FaHistory, FaUserCheck, FaCalendarCheck, FaFileAlt, FaCheckCircle } from "react-icons/fa";

function ActivityFeed({ activityStream }) {
  if (!activityStream) return null;

  const getIcon = (category) => {
    switch (category) {
      case "offer":
        return <FaCheckCircle className="text-emerald-500 text-xs" />;
      case "interview":
        return <FaCalendarCheck className="text-purple-500 text-xs" />;
      case "upload":
        return <FaFileAlt className="text-blue-500 text-xs" />;
      default:
        return <FaUserCheck className="text-slate-500 text-xs" />;
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-3 font-sans">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <FaHistory className="text-slate-500 text-sm" />
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">
            Company-Wide Hiring Activity Feed
          </h3>
        </div>
        <span className="text-[10px] text-slate-400 font-mono">Live Audit Log</span>
      </div>

      <div className="space-y-2.5 text-xs">
        {activityStream.map((act) => (
          <div
            key={act.id}
            className="p-3 bg-slate-50/70 rounded-lg border border-slate-200/60 space-y-1"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                {getIcon(act.category)}
                <span>{act.user}</span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium">{act.time}</span>
            </div>
            <p className="text-slate-600 font-medium leading-relaxed pl-5">
              {act.action}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActivityFeed;
