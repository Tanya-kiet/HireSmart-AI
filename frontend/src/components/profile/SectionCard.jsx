import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

function SectionCard({
  id,
  title,
  subtitle,
  badge,
  action,
  icon: Icon,
  defaultOpen = true,
  children,
  className = "",
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      id={id}
      className={`bg-white border border-slate-200 rounded-xl shadow-xs transition-all duration-200 ${className}`}
    >
      {/* Header */}
      <div className="px-5 py-4 flex items-center justify-between border-b border-slate-100 select-none">
        <div className="flex items-center gap-3 min-w-0">
          {Icon && (
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 border border-slate-200/60">
              <Icon className="text-sm" />
            </div>
          )}
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base font-bold text-slate-900 tracking-tight">
                {title}
              </h2>
              {badge && (
                <span className="px-2 py-0.5 text-[11px] font-semibold bg-slate-100 text-slate-700 rounded-md border border-slate-200">
                  {badge}
                </span>
              )}
            </div>
            {subtitle && (
              <p className="text-xs text-slate-500 mt-0.5 font-medium truncate">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons & Collapse Toggle */}
        <div className="flex items-center gap-2 shrink-0">
          {action && <div className="hidden sm:block">{action}</div>}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label={isOpen ? "Collapse Section" : "Expand Section"}
            title={isOpen ? "Collapse Section" : "Expand Section"}
          >
            {isOpen ? (
              <FaChevronUp className="text-xs" />
            ) : (
              <FaChevronDown className="text-xs" />
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      {isOpen && <div className="p-5">{children}</div>}
    </div>
  );
}

export default SectionCard;
