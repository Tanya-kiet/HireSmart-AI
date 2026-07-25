import React from "react";
import Card from "../common/Card";
import Button from "../common/Button";
import { FaTrash, FaPaste, FaMagic } from "react-icons/fa";

const sampleJobDescription = `We are seeking a Senior Fullstack React & Python Engineer to join our core AI platform team.

Key Responsibilities:
- Build high-performance, responsive web interfaces using React 19, TypeScript, and Tailwind CSS.
- Design scalable backend microservices and RESTful API endpoints using Python, FastAPI, and PostgreSQL.
- Partner with product managers and AI researchers to integrate LLM vector search and semantic matching models.
- Optimize frontend rendering performance, state management, and API latency.

Requirements:
- 5+ years of experience with React.js, JavaScript (ES6+), HTML5, and CSS3.
- Proven expertise with Python, SQL, Git version control, and REST APIs.
- Experience with Docker, Kubernetes, AWS, Redis caching, and CI/CD pipelines is a strong plus.
- Excellent communication skills, teamwork mindset, and engineering problem-solving ability.`;

function JobDescriptionInput({ value, onChange, onClear, onLoadSample }) {
  const handleLoadSample = () => {
    onLoadSample(sampleJobDescription);
  };

  return (
    <Card
      title="Job Description"
      subtitle="Paste target job requirements or load a sample JD for semantic evaluation"
      headerBorder
      action={
        <div className="flex items-center gap-2">
          {value && (
            <button
              onClick={onClear}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer border border-rose-100"
            >
              <FaTrash className="text-[10px]" />
              <span>Clear</span>
            </button>
          )}
          <button
            onClick={handleLoadSample}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors cursor-pointer border border-blue-200/60"
          >
            <FaMagic className="text-blue-600 text-xs" />
            <span>Load Sample JD</span>
          </button>
        </div>
      }
    >
      <div className="space-y-2">
        <textarea
          rows={12}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste Job Description here..."
          className="w-full bg-slate-50/70 border border-slate-200 rounded-2xl p-4 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all leading-relaxed resize-y font-sans"
        />
        <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium px-1">
          <span>{value ? `${value.length} characters` : "Empty input"}</span>
          <span>Supports text / plain format</span>
        </div>
      </div>
    </Card>
  );
}

export default JobDescriptionInput;
