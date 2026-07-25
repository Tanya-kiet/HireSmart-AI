import React from "react";

function Button({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  className = "",
  disabled = false,
  onClick,
  type = "button",
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none";

  const variants = {
    primary:
      "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-2xs border border-blue-600",
    secondary:
      "bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 border border-slate-200/90",
    ghost:
      "bg-transparent hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-transparent",
    danger:
      "bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white shadow-2xs border border-rose-600",
  };

  const sizes = {
    xs: "px-2.5 py-1 text-[11px] rounded-lg gap-1.5",
    sm: "px-3 py-1.5 text-xs rounded-xl gap-2",
    md: "px-4 py-2 text-xs rounded-xl gap-2",
    lg: "px-6 py-2.5 text-sm rounded-xl gap-2.5",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {Icon && <Icon className="text-xs shrink-0" />}
      <span>{children}</span>
    </button>
  );
}

export default Button;
