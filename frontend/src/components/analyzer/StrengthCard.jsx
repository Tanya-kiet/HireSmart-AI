import React from "react";
import Card from "../common/Card";
import { FaCheckCircle, FaShieldAlt } from "react-icons/fa";

function StrengthCard({ strengths }) {
  const defaultStrengths = [
    { title: "Strong React Knowledge", desc: "Expertise in React 19, hooks, virtual DOM optimization, and component state architecture." },
    { title: "FastAPI Experience", desc: "Proven capability designing asynchronous Python REST APIs and microservices." },
    { title: "Machine Learning", desc: "Practical hands-on experience with scikit-learn algorithms and model evaluation." },
    { title: "GitHub Projects", desc: "Active open-source contributions and production-grade full-stack project portfolio." },
    { title: "Problem Solving", desc: "Demonstrated analytical problem solving and algorithmic code efficiency." },
  ];

  const items = strengths || defaultStrengths;

  return (
    <Card
      title="Candidate Strengths"
      subtitle="Top competitive technical and architectural advantages"
      headerBorder
      action={
        <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm border border-emerald-100">
          <FaShieldAlt />
        </div>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="p-3.5 bg-emerald-50/50 hover:bg-emerald-50 rounded-xl border border-emerald-100 flex items-start gap-3 transition-colors"
          >
            <FaCheckCircle className="text-emerald-600 text-sm shrink-0 mt-0.5" />
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

export default StrengthCard;
