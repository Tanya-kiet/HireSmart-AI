import React from "react";

function ScoreBadge({ score, label = "" }) {
  let colorStyle = "bg-emerald-50 text-emerald-700 border-emerald-200/80";
  if (score < 70) colorStyle = "bg-rose-50 text-rose-700 border-rose-200/80";
  else if (score < 80) colorStyle = "bg-amber-50 text-amber-700 border-amber-200/80";
  else if (score < 90) colorStyle = "bg-blue-50 text-blue-700 border-blue-200/80";

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-extrabold border ${colorStyle}`}
    >
      <span>{score}%</span>
      {label && <span className="text-[10px] font-medium opacity-80">{label}</span>}
    </span>
  );
}

export default ScoreBadge;
