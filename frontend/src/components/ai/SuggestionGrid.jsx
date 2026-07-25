import React from "react";
import {
  FaSearch,
  FaExchangeAlt,
  FaEnvelope,
  FaQuestionCircle,
  FaFileAlt,
  FaShieldAlt,
  FaChartLine,
  FaMagic,
} from "react-icons/fa";

function SuggestionGrid({ onSelectPrompt }) {
  const suggestions = [
    {
      title: "Find React Engineers",
      desc: "Candidates with 4+ yrs React & TypeScript",
      query: "Which candidates have more than 3 years of React experience?",
      icon: FaSearch,
      category: "Search",
    },
    {
      title: "Compare Top Candidates",
      desc: "Side-by-side match & skills diff",
      query: "Compare Sarah Chen and Marcus Vance",
      icon: FaExchangeAlt,
      category: "Compare",
    },
    {
      title: "Generate Offer Letter",
      desc: "Draft executive offer package",
      query: "Generate an offer letter for Rachel Zhang ($165k base)",
      icon: FaEnvelope,
      category: "Email",
    },
    {
      title: "Senior Tech Questions",
      desc: "React 19 & micro-frontend architecture",
      query: "Generate interview questions for Sarah Chen",
      icon: FaQuestionCircle,
      category: "Interview",
    },
    {
      title: "Explain Recommendation",
      desc: "Detailed rationale & risk factors",
      query: "Explain why Sarah Chen ranks above Marcus Vance",
      icon: FaShieldAlt,
      category: "Intelligence",
    },
    {
      title: "Candidates Waiting Too Long",
      desc: "Pipeline bottleneck review",
      query: "Who is waiting too long in screening?",
      icon: FaChartLine,
      category: "Pipeline",
    },
  ];

  return (
    <div className="space-y-2 font-sans">
      <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
        <span>Suggested Recruiter Actions</span>
        <span>Click to execute</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
        {suggestions.map((s, idx) => {
          const Icon = s.icon;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectPrompt(s.query)}
              className="p-3 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl transition-all text-left cursor-pointer space-y-1 group shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {s.title}
                </span>
                <Icon className="text-slate-400 group-hover:text-blue-600 text-xs shrink-0" />
              </div>
              <p className="text-[11px] text-slate-500 font-medium truncate">
                {s.desc}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default SuggestionGrid;
