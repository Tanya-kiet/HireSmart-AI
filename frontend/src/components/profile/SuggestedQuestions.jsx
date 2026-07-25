import React, { useState } from "react";
import Card from "../common/Card";
import Badge from "../common/Badge";
import { FaQuestionCircle, FaCopy, FaCheck } from "react-icons/fa";

function SuggestedQuestions({ questions = [] }) {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <Card
      title="Suggested Interview Questions"
      subtitle="Tailored technical questions based on candidate profile"
      headerBorder
      action={
        <Badge variant="blue" size="sm">
          {questions.length} Questions
        </Badge>
      }
    >
      <div className="space-y-2 text-xs">
        {questions.map((qText, idx) => (
          <div
            key={idx}
            className="p-3 bg-slate-50 hover:bg-slate-100/70 rounded-xl border border-slate-200/70 transition-colors flex items-start justify-between gap-3 group"
          >
            <div className="flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                {idx + 1}
              </div>
              <p className="font-semibold text-slate-800 leading-relaxed">
                {qText}
              </p>
            </div>

            <button
              onClick={() => handleCopy(qText, idx)}
              className="p-1 text-slate-400 hover:text-blue-600 rounded-lg cursor-pointer shrink-0"
              title="Copy question"
            >
              {copiedIndex === idx ? (
                <FaCheck className="text-emerald-600 text-xs" />
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

export default SuggestedQuestions;
