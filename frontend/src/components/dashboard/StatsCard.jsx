import React from "react";
import { FaArrowUp, FaArrowDown, FaMinus } from "react-icons/fa";

/**
 * Top Stat Card Component with trend indicator, icons, and sleek typography.
 */
function StatsCard({
  title,
  value,
  change,
  changeType = "increase", // 'increase' | 'decrease' | 'neutral'
  changePeriod = "vs last month",
  icon: Icon,
  iconBg = "bg-blue-50 text-blue-600",
  subtitle,
}) {
  const isIncrease = changeType === "increase";
  const isDecrease = changeType === "decrease";

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-all duration-200 group flex flex-col justify-between">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-medium text-slate-500 tracking-tight">
            {title}
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 tracking-tight">
            {value}
          </div>
        </div>

        {Icon && (
          <div
            className={`w-11 h-11 rounded-2xl flex items-center justify-center text-lg transition-transform duration-200 group-hover:scale-105 ${iconBg}`}
          >
            <Icon />
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center gap-2 pt-3 border-t border-slate-100">
        {change && (
          <div
            className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
              isIncrease
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                : isDecrease
                ? "bg-rose-50 text-rose-700 border border-rose-200/60"
                : "bg-slate-100 text-slate-700 border border-slate-200/60"
            }`}
          >
            {isIncrease ? (
              <FaArrowUp className="text-[10px]" />
            ) : isDecrease ? (
              <FaArrowDown className="text-[10px]" />
            ) : (
              <FaMinus className="text-[10px]" />
            )}
            <span>{change}</span>
          </div>
        )}

        <span className="text-[11px] text-slate-400 font-medium truncate">
          {changePeriod || subtitle}
        </span>
      </div>
    </div>
  );
}

export default StatsCard;
