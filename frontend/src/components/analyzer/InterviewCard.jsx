import React, { useState } from "react";
import Card from "../common/Card";
import Badge from "../common/Badge";
import { FaQuestionCircle, FaChevronDown, FaChevronUp, FaCopy, FaCheck } from "react-icons/fa";

function InterviewCard() {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const questions = [
    {
      q: "Explain React Hooks (useState, useEffect, useMemo) and rules of hooks.",
      topic: "React & Architecture",
    },
    {
      q: "What is the difference between REST and GraphQL APIs? When would you choose one over the other?",
      topic: "API Design",
    },
    {
      q: "How would you optimize a slow SQL database query in PostgreSQL?",
      topic: "Databases & Performance",
    },
    {
      q: "Explain the Random Forest algorithm and how it prevents overfitting compared to single decision trees.",
      topic: "Machine Learning",
    },
    {
      q: "How does FastAPI handle asynchronous request handling using async/await?",
      topic: "Python & Async",
    },
    {
      q: "Describe the Virtual DOM diffing process and key prop importance in React lists.",
      topic: "Frontend Engine",
    },
    {
      q: "How do you handle global state management in modern React applications?",
      topic: "State Management",
    },
    {
      q: "Explain cross-origin resource sharing (CORS) and how to configure CORS middleware safely.",
      topic: "Security & Networking",
    },
    {
      q: "How would you containerize a React frontend and Python FastAPI backend using Docker Compose?",
      topic: "DevOps & Deployment",
    },
    {
      q: "Describe a complex technical challenge you solved in a recent project and your step-by-step debugging workflow.",
      topic: "Problem Solving",
    },
  ];

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <Card
      title="AI-Generated Interview Questions"
      subtitle="10 customized technical and behavioral interview questions tailored to resume profile"
      headerBorder
      action={
        <Badge variant="blue" size="sm">
          10 Questions
        </Badge>
      }
    >
      <div className="space-y-2.5">
        {questions.map((item, idx) => (
          <div
            key={idx}
            className="p-3.5 bg-slate-50 hover:bg-slate-100/70 rounded-xl border border-slate-200/70 transition-all flex items-start justify-between gap-3 group"
          >
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                {idx + 1}
              </div>
              <div>
                <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
                  {item.q}
                </p>
                <span className="inline-block mt-1 text-[10px] font-semibold text-slate-500 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                  {item.topic}
                </span>
              </div>
            </div>

            <button
              onClick={() => handleCopy(item.q, idx)}
              className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-white rounded-lg transition-colors cursor-pointer shrink-0"
              title="Copy Question"
            >
              {copiedIndex === idx ? (
                <FaCheck className="text-xs text-emerald-600" />
              ) : (
                <FaCopy className="text-xs" />
              )}
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default InterviewCard;
