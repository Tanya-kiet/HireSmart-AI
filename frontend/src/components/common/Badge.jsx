import React from "react";

/**
 * Reusable Badge component for candidate match scores, statuses, and tags.
 */
function Badge({
  children,
  variant = "slate",
  size = "md",
  dot = false,
  className = "",
}) {
  const baseStyles =
    "inline-flex items-center font-semibold rounded-full tracking-tight shrink-0 transition-colors select-none";

  const variants = {
    slate: "bg-slate-100 text-slate-700 border border-slate-200/80",
    blue: "bg-blue-50 text-blue-700 border border-blue-200/80",
    indigo: "bg-indigo-50 text-indigo-700 border border-indigo-200/80",
    emerald: "bg-emerald-50 text-emerald-700 border border-emerald-200/80",
    success: "bg-emerald-50 text-emerald-700 border border-emerald-200/80",
    amber: "bg-amber-50 text-amber-700 border border-amber-200/80",
    warning: "bg-amber-50 text-amber-700 border border-amber-200/80",
    rose: "bg-rose-50 text-rose-700 border border-rose-200/80",
    danger: "bg-rose-50 text-rose-700 border border-rose-200/80",
    purple: "bg-purple-50 text-purple-700 border border-purple-200/80",
    dark: "bg-slate-900 text-slate-100 border border-slate-800",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-[11px] gap-1.5",
    md: "px-2.5 py-0.5 text-xs gap-1.5",
    lg: "px-3 py-1 text-xs font-bold gap-2",
  };

  const dotColors = {
    slate: "bg-slate-500",
    blue: "bg-blue-500",
    indigo: "bg-indigo-500",
    emerald: "bg-emerald-500",
    success: "bg-emerald-500",
    amber: "bg-amber-500",
    warning: "bg-amber-500",
    rose: "bg-rose-500",
    danger: "bg-rose-500",
    purple: "bg-purple-500",
    dark: "bg-blue-400",
  };

  return (
    <span
      className={`${baseStyles} ${variants[variant] || variants.slate} ${
        sizes[size] || sizes.md
      } ${className}`}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            dotColors[variant] || "bg-slate-400"
          }`}
        />
      )}
      {children}
    </span>
  );
}

export default Badge;
