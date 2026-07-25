import React from "react";

/**
 * Reusable Button component with standardized variants, sizes, icon alignment, and micro-interactions.
 */
function Button({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  loading = false,
  disabled = false,
  className = "",
  onClick,
  type = "button",
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold tracking-tight transition-all duration-150 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed cursor-pointer select-none";

  const variants = {
    primary:
      "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-xs hover:shadow-blue-500/20 border border-transparent",
    secondary:
      "bg-slate-100 hover:bg-slate-200/80 active:bg-slate-200 text-slate-800 border border-slate-200/60",
    outline:
      "bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-700 border border-slate-200 shadow-2xs hover:border-slate-300",
    dark:
      "bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white shadow-xs border border-slate-800",
    ghost:
      "bg-transparent hover:bg-slate-100 active:bg-slate-200/60 text-slate-600 hover:text-slate-900",
    danger:
      "bg-rose-50 hover:bg-rose-100 active:bg-rose-200 text-rose-700 border border-rose-200/80",
    blueLight:
      "bg-blue-50 hover:bg-blue-100 active:bg-blue-200 text-blue-700 border border-blue-100",
  };

  const sizes = {
    xs: "px-2.5 py-1 text-xs rounded-lg gap-1.5",
    sm: "px-3 py-1.5 text-xs rounded-xl gap-1.5",
    md: "px-4 py-2 text-sm rounded-xl gap-2",
    lg: "px-5 py-2.5 text-base rounded-2xl gap-2.5",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${
        sizes[size] || sizes.md
      } ${className}`}
      {...props}
    >
      {loading ? (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : Icon && iconPosition === "left" ? (
        <Icon className="text-current shrink-0 text-[1.1em]" />
      ) : null}

      <span>{children}</span>

      {!loading && Icon && iconPosition === "right" && (
        <Icon className="text-current shrink-0 text-[1.1em]" />
      )}
    </button>
  );
}

export default Button;
