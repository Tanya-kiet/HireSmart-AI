import React, { useState } from "react";
import CandidateLayout from "../../components/layout/CandidateLayout";
import { useUser } from "../../context/UserContext";
import {
  FaFileAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
  FaComments,
  FaUserTie,
  FaClock,
  FaBuilding,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

function CandidateApplications() {
  const { candidateApplications } = useUser();
  const [expandedAppId, setExpandedAppId] = useState("app-3"); // default expanded rejection feedback

  const getStatusBadge = (status) => {
    switch (status) {
      case "Offer":
      case "Hired":
        return "bg-emerald-50 text-emerald-800 border-emerald-200";
      case "Interview Scheduled":
      case "Technical Interview":
      case "HR Interview":
        return "bg-blue-50 text-blue-800 border-blue-200";
      case "Under Review":
      case "Assessment":
      case "Resume Screening":
        return "bg-purple-50 text-purple-800 border-purple-200";
      case "Rejected":
        return "bg-rose-50 text-rose-800 border-rose-200";
      default:
        return "bg-amber-50 text-amber-800 border-amber-200";
    }
  };

  return (
    <CandidateLayout>
      <div className="space-y-6 max-w-[1600px] w-full mx-auto pb-16 font-sans">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              My Job Applications
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5 font-medium">
              Track recruitment stage progression, interview updates, and recruiter feedback.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 bg-purple-50 text-purple-800 font-bold rounded-xl border border-purple-200 text-xs font-mono">
              {candidateApplications.length} Applications Total
            </span>
          </div>
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          {candidateApplications.map((app) => {
            const isExpanded = expandedAppId === app.id;
            const isRejected = app.status === "Rejected";

            return (
              <div
                key={app.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden transition-all"
              >
                {/* Application Row Header */}
                <div
                  onClick={() => setExpandedAppId(isExpanded ? null : app.id)}
                  className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/80 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-lg shrink-0 border border-purple-200">
                      <FaBuilding />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="font-bold text-slate-900 text-base">{app.jobTitle}</h3>
                        <span className={`px-2.5 py-0.5 text-xs font-bold rounded-md border ${getStatusBadge(app.status)}`}>
                          ● {app.status}
                        </span>
                      </div>

                      <p className="text-xs font-semibold text-slate-600">
                        {app.company} • <span className="text-slate-500 font-normal">{app.location}</span>
                      </p>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 font-medium pt-0.5">
                        <span>Applied: <strong className="text-slate-700 font-mono">{app.appliedDate}</strong></span>
                        <span>Current Stage: <strong className="text-slate-700">{app.stage || app.status}</strong></span>
                        <span>Recruiter: <strong className="text-slate-700">{app.recruiter}</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-3 shrink-0">
                    <button className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg transition-colors">
                      {isExpanded ? <FaChevronUp className="text-xs" /> : <FaChevronDown className="text-xs" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Details Panel */}
                {isExpanded && (
                  <div className="p-6 bg-slate-50/70 border-t border-slate-200 space-y-5 text-xs">
                    {/* Stage Timeline */}
                    <div className="space-y-2">
                      <h4 className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                        Recruitment Stage Progression
                      </h4>

                      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
                        {[
                          "Submitted",
                          "Screening",
                          "Under Review",
                          "Assessment",
                          "Interview",
                          "Feedback",
                          "Offer",
                          isRejected ? "Rejected" : "Hired",
                        ].map((stageStep, idx) => {
                          const isDone = idx <= 4;
                          const isCurrent = app.status.includes(stageStep);
                          return (
                            <div
                              key={idx}
                              className={`p-2 rounded-xl border text-center text-[10px] font-bold ${
                                isRejected && stageStep === "Rejected"
                                  ? "bg-rose-100 text-rose-900 border-rose-300"
                                  : isCurrent
                                  ? "bg-purple-600 text-white border-purple-600 shadow-2xs"
                                  : isDone
                                  ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                                  : "bg-white text-slate-400 border-slate-200"
                              }`}
                            >
                              {stageStep}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* RECRUITER FEEDBACK CARD (If Rejected & Visible to Candidate) */}
                    {isRejected && app.visibleToCandidate && (
                      <div className="p-5 bg-white border-2 border-rose-200 rounded-2xl space-y-3 shadow-2xs">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                          <div className="flex items-center gap-2">
                            <FaExclamationTriangle className="text-rose-600 text-sm" />
                            <h4 className="font-bold text-rose-950 text-xs">
                              Candidate Evaluation & Rejection Feedback
                            </h4>
                          </div>
                          <span className="px-2 py-0.5 bg-rose-100 text-rose-900 font-mono font-bold text-[10px] rounded">
                            Visible to Candidate
                          </span>
                        </div>

                        <div className="space-y-2 text-xs">
                          <div>
                            <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] block">
                              Rejection Reason
                            </span>
                            <p className="font-semibold text-rose-900 mt-0.5">
                              {app.rejectionReason || app.feedback?.reason || "Technical Interview - Technical stack alignment requirements."}
                            </p>
                          </div>

                          {app.feedback?.interviewFeedback && (
                            <div className="p-3 bg-rose-50/70 rounded-xl border border-rose-100 space-y-1">
                              <span className="font-bold text-rose-950 block">Interviewer Feedback Notes:</span>
                              <p className="text-rose-900 leading-relaxed font-medium">
                                "{app.feedback.interviewFeedback}"
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </CandidateLayout>
  );
}

export default CandidateApplications;
