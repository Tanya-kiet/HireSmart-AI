import React from "react";

/**
 * Premium Card Component with refined spacing, rounded-2xl corners, soft shadows, and clean hover states.
 */
function Card({
  children,
  className = "",
  title,
  subtitle,
  action,
  headerBorder = false,
  padding = "p-5 sm:p-6",
  hoverEffect = true,
}) {
  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200/90 shadow-2xs ${
        hoverEffect
          ? "hover:shadow-xs hover:border-slate-300 transition-all duration-200"
          : ""
      } ${className}`}
    >
      {(title || subtitle || action) && (
        <div
          className={`flex flex-wrap items-center justify-between gap-2 px-5 sm:px-6 py-4.5 ${
            headerBorder ? "border-b border-slate-100" : ""
          }`}
        >
          <div>
            {title && (
              <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-xs text-slate-500 mt-0.5 font-normal leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
          {action && <div className="flex items-center gap-2 shrink-0">{action}</div>}
        </div>
      )}
      <div className={padding}>{children}</div>
    </div>
  );
}

export default Card;
