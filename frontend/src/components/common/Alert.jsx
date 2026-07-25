import React from "react";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
  FaTimes,
} from "react-icons/fa";

/**
 * Reusable Alert banner for success, error, and info notifications.
 */
function Alert({
  type = "info", // 'success' | 'error' | 'info' | 'warning'
  title,
  message,
  onClose,
  className = "",
}) {
  const styles = {
    success: {
      bg: "bg-emerald-50 border-emerald-200 text-emerald-900",
      icon: FaCheckCircle,
      iconColor: "text-emerald-600",
    },
    error: {
      bg: "bg-rose-50 border-rose-200 text-rose-900",
      icon: FaExclamationCircle,
      iconColor: "text-rose-600",
    },
    warning: {
      bg: "bg-amber-50 border-amber-200 text-amber-900",
      icon: FaExclamationCircle,
      iconColor: "text-amber-600",
    },
    info: {
      bg: "bg-blue-50 border-blue-200 text-blue-900",
      icon: FaInfoCircle,
      iconColor: "text-blue-600",
    },
  };

  const config = styles[type] || styles.info;
  const IconComponent = config.icon;

  return (
    <div
      className={`flex items-start justify-between p-4 rounded-2xl border ${config.bg} shadow-2xs transition-all duration-200 animate-in fade-in slide-in-from-top-2 ${className}`}
    >
      <div className="flex items-start gap-3">
        <IconComponent className={`text-lg shrink-0 mt-0.5 ${config.iconColor}`} />
        <div>
          {title && <h4 className="text-xs font-bold tracking-tight">{title}</h4>}
          {message && <p className="text-xs mt-0.5 leading-relaxed">{message}</p>}
        </div>
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className="p-1 hover:bg-black/5 rounded-lg transition-colors cursor-pointer ml-3"
          aria-label="Dismiss alert"
        >
          <FaTimes className="text-xs opacity-60" />
        </button>
      )}
    </div>
  );
}

export default Alert;
