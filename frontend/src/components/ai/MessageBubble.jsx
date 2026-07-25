import React, { useState } from "react";
import CandidateResultCard from "./CandidateResultCard";
import JobResultCard from "./JobResultCard";
import ActionToolbar from "./ActionToolbar";
import {
  FaCheck,
  FaCopy,
  FaShieldAlt,
  FaExclamationTriangle,
  FaStar,
  FaQuestionCircle,
  FaEnvelope,
  FaExchangeAlt,
} from "react-icons/fa";

function MessageBubble({ message, onAction }) {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyText = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const isUser = message.sender === "user";

  return (
    <div className={`flex flex-col ${isUser ? "items-end" : "items-start"} space-y-2 font-sans text-xs`}>
      {/* Sender Header */}
      <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-wider px-1">
        <span>{isUser ? "You (Tanya)" : "Recruiter Copilot"}</span>
        <span>•</span>
        <span className="font-mono text-slate-400">{message.timestamp || "Just now"}</span>
      </div>

      {/* Main Bubble Container */}
      <div
        className={`max-w-[92%] p-4 rounded-2xl leading-relaxed font-medium shadow-2xs space-y-3 ${
          isUser
            ? "bg-slate-900 text-white rounded-tr-none"
            : "bg-white text-slate-800 border border-slate-200 rounded-tl-none"
        }`}
      >
        {/* Main Text Content */}
        {message.text && <p className="whitespace-pre-line text-xs font-medium leading-relaxed">{message.text}</p>}

        {/* 1. Candidate Card Payload */}
        {message.candidatePayload && (
          <CandidateResultCard candidate={message.candidatePayload} onAction={onAction} />
        )}

        {/* 2. Job Card Payload */}
        {message.jobPayload && <JobResultCard job={message.jobPayload} />}

        {/* 3. Candidate Comparison Diff Payload */}
        {message.comparisonPayload && (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-3 text-xs">
            <div className="flex items-center justify-between font-bold text-slate-900 border-b border-slate-200 pb-2">
              <span className="flex items-center gap-1.5">
                <FaExchangeAlt className="text-blue-600" />
                <span>Side-by-Side Candidate Diff</span>
              </span>
              <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-mono">
                Compare Mode
              </span>
            </div>

            <div className="grid grid-cols-2 divide-x divide-slate-200 gap-3">
              <div className="space-y-1 pr-2">
                <h5 className="font-bold text-slate-900">{message.comparisonPayload.candA.name}</h5>
                <p className="text-[11px] text-slate-500 font-medium">{message.comparisonPayload.candA.role}</p>
                <div className="font-extrabold text-emerald-600 text-xs">
                  {message.comparisonPayload.candA.match}% Vector Match
                </div>
                <p className="text-[11px] text-slate-600 pt-1">
                  {message.comparisonPayload.candA.summary}
                </p>
              </div>

              <div className="space-y-1 pl-3">
                <h5 className="font-bold text-slate-900">{message.comparisonPayload.candB.name}</h5>
                <p className="text-[11px] text-slate-500 font-medium">{message.comparisonPayload.candB.role}</p>
                <div className="font-extrabold text-purple-600 text-xs">
                  {message.comparisonPayload.candB.match}% Vector Match
                </div>
                <p className="text-[11px] text-slate-600 pt-1">
                  {message.comparisonPayload.candB.summary}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 4. Decision Explanation Payload (Confidence %, WHY, Supporting evidence) */}
        {message.decisionExplanation && (
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5">
            <div className="flex items-center justify-between font-bold text-slate-900 border-b border-slate-200 pb-2">
              <span className="flex items-center gap-1.5 text-emerald-800">
                <FaShieldAlt className="text-emerald-600" />
                <span>Decision Explanation & Confidence Rationale</span>
              </span>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-800 rounded">
                {message.decisionExplanation.confidence || "95% High Confidence"}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <span className="font-bold text-slate-800 block text-[11px]">Primary Supporting Evidence (WHY):</span>
                <p className="text-slate-600 font-medium leading-relaxed">
                  {message.decisionExplanation.why}
                </p>
              </div>

              {message.decisionExplanation.concerns && (
                <div className="p-2 bg-amber-50 rounded border border-amber-200 text-amber-900 font-medium text-[11px] flex items-start gap-1.5">
                  <FaExclamationTriangle className="text-amber-600 text-xs shrink-0 mt-0.5" />
                  <span>Potential Concerns: {message.decisionExplanation.concerns}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 5. Email Template Generator Payload */}
        {message.emailPayload && (
          <div className="bg-slate-900 text-white p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-xs">
              <span className="font-bold text-white flex items-center gap-1.5">
                <FaEnvelope className="text-blue-400" />
                <span>Generated Email Draft ({message.emailPayload.type})</span>
              </span>

              <button
                onClick={() => handleCopyText(`Subject: ${message.emailPayload.subject}\n\n${message.emailPayload.body}`)}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
              >
                {copiedEmail ? <FaCheck className="text-emerald-400" /> : <FaCopy />}
                <span>{copiedEmail ? "Copied!" : "Copy Text"}</span>
              </button>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="text-slate-300 font-bold border-b border-slate-800 pb-1">
                Subject: {message.emailPayload.subject}
              </div>
              <p className="whitespace-pre-line text-slate-200 font-sans leading-relaxed">
                {message.emailPayload.body}
              </p>
            </div>
          </div>
        )}

        {/* 6. Interview Questions Payload */}
        {message.questionsPayload && (
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-3">
            <div className="flex items-center justify-between font-bold text-slate-900 border-b border-slate-200 pb-2 text-xs">
              <span className="flex items-center gap-1.5">
                <FaQuestionCircle className="text-blue-600" />
                <span>Generated Interview Question Set</span>
              </span>
              <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                {message.questionsPayload.difficulty || "Medium - Hard"}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              {message.questionsPayload.questions?.map((q, idx) => (
                <div key={idx} className="p-2.5 bg-white rounded-lg border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">Q{idx + 1}. {q.category}</span>
                    <span className="text-[10px] font-semibold text-slate-400">{q.level}</span>
                  </div>
                  <p className="text-slate-700 font-medium leading-relaxed">{q.question}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Assistant Action Toolbar */}
        {!isUser && message.candidateId && (
          <ActionToolbar
            candidateId={message.candidateId}
            onSchedule={() => onAction("schedule", { id: message.candidateId })}
            onMoveStage={() => onAction("move-stage", { id: message.candidateId })}
            onShortlist={() => onAction("shortlist", { id: message.candidateId })}
            onReject={() => onAction("reject", { id: message.candidateId })}
            onDownload={() => onAction("download", { id: message.candidateId })}
          />
        )}
      </div>
    </div>
  );
}

export default MessageBubble;
