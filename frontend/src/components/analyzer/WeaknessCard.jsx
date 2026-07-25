import React from "react";
import Card from "../common/Card";
import { FaExclamationCircle } from "react-icons/fa";

function WeaknessCard({ weaknesses }) {
  const defaultWeaknesses = [
    { title: "Cloud Technologies Missing", desc: "No explicit AWS, GCP, Docker, or Kubernetes containerization experience listed." },
    { title: "No Certifications", desc: "Missing cloud or framework industry certifications (e.g. AWS Solutions Architect)." },
    { title: "Limited Quantified Achievements", desc: "Project descriptions lack metric-driven impact figures (e.g., '% throughput increase')." },
  ];

  const items = weaknesses || defaultWeaknesses;

  return (
    <Card
      title="Candidate Weaknesses & Gaps"
      subtitle="Identified skill gaps and resume areas needing improvement"
      headerBorder
      action={
        <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-sm border border-amber-100">
          <FaExclamationCircle />
        </div>
      }
    >
      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="p-3.5 bg-amber-50/50 hover:bg-amber-50 rounded-xl border border-amber-100 flex items-start gap-3 transition-colors"
          >
            <FaExclamationCircle className="text-amber-600 text-sm shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs font-bold text-slate-900">
                {typeof item === "string" ? item : item.title}
              </h5>
              {typeof item !== "string" && (
                <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                  {item.desc}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default WeaknessCard;
