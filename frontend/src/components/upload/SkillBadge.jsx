import React from "react";
import { FaCheckCircle } from "react-icons/fa";

/**
 * Reusable SkillBadge component for technical and soft skill tags.
 */
function SkillBadge({ name, category = "technical" }) {
  const isTechnical = category === "technical";

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold tracking-tight transition-all ${
        isTechnical
          ? "bg-blue-50 text-blue-800 border border-blue-200/80 hover:bg-blue-100/70"
          : "bg-slate-100 text-slate-700 border border-slate-200/80 hover:bg-slate-200/60"
      }`}
    >
      <FaCheckCircle
        className={`text-[11px] ${
          isTechnical ? "text-blue-600" : "text-slate-500"
        }`}
      />
      <span>{name}</span>
    </span>
  );
}

export default SkillBadge;
