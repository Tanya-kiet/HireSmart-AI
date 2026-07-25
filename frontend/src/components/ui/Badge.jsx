import React from "react";

function Badge({
  children,
  variant = "slate",
  size = "md",
  dot = false,
  className = "",
}) {
  const baseStyles =
    "inline-flex items-center font-semibold rounded-md transition-colors select-none";

  const variants = {
    emerald: "bg-emerald-50 text-emerald-700 border border-emerald-200/80",
    blue: "bg-blue-50 text-blue-700 border border-blue-200/80",
    amber: "bg-amber-50 text-amber-800 border border-amber-200/80",
    rose: "bg-rose-50 text-rose-700 border border-rose-200/80",
    slate: "bg-slate-100 text-slate-700 border border-slate-200/80",
    indigo: "bg-indigo-50 text-indigo-700 border border-indigo-200/80",
  };

  const dotColors = {
    emerald: "bg-emerald-500",
    blue: "bg-blue-500",
    amber: "bg-amber-500",
    rose: "bg-rose-500",
    slate: "bg-slate-400",
    indigo: "bg-indigo-500",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-[10px] gap-1",
    md: "px-2.5 py-1 text-xs gap-1.5",
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`} />}
      <span>{children}</span>
    </span>
  );
}

export default Badge;
