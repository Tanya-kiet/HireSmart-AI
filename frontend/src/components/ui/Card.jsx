import React from "react";

function Card({
  children,
  title,
  subtitle,
  action,
  headerBorder = false,
  className = "",
}) {
  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 ${className}`}
    >
      {(title || subtitle || action) && (
        <div
          className={`flex items-start justify-between gap-4 ${
            headerBorder ? "pb-4 mb-4 border-b border-slate-100" : "mb-4"
          }`}
        >
          <div>
            {title && (
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
}

export default Card;
