import React from "react";
import Card from "../common/Card";
import Badge from "../common/Badge";
import { FaLightbulb, FaCheck } from "react-icons/fa";

function ImprovementCard() {
  const suggestions10 = [
    "Add quantifiable business metrics to project descriptions (e.g., 'Reduced page load time by 40%').",
    "Highlight experience with modern cloud deployment platforms (AWS / Docker / Kubernetes).",
    "Include direct hyperlinks to active GitHub repositories and live project web URLs.",
    "Detail backend API architecture experience (e.g. FastAPI / Express / RESTful standards).",
    "Include relevant technical industry certifications (AWS Solutions Architect, React Certified).",
    "Elaborate on state management choices (Redux Toolkit vs Context API tradeoffs).",
    "List automated testing frameworks used (Jest, React Testing Library, Cypress).",
    "Specify database indexing and query optimization techniques employed.",
    "Add a dedicated summary section emphasizing cross-functional engineering leadership.",
    "Format work history in reverse chronological order with clear month-year date ranges.",
  ];

  return (
    <Card
      title="Resume Improvement Suggestions"
      subtitle="10 AI-generated optimization recommendations to maximize ATS ranking"
      headerBorder
      action={
        <Badge variant="amber" size="sm">
          10 Suggestions
        </Badge>
      }
    >
      <div className="space-y-2.5">
        {suggestions10.map((text, idx) => (
          <div
            key={idx}
            className="p-3.5 bg-slate-50 hover:bg-blue-50/30 rounded-xl border border-slate-200/70 hover:border-blue-200 transition-all flex items-start gap-3 group"
          >
            <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 shadow-2xs">
              <FaCheck />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-800 leading-relaxed group-hover:text-blue-600 transition-colors">
                {text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default ImprovementCard;
