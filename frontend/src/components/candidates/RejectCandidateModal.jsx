import React, { useState } from "react";
import Modal from "../ui/Modal";
import { FaTimesCircle, FaExclamationTriangle, FaCheck } from "react-icons/fa";

const rejectionReasonsList = [
  "Technical interview not cleared",
  "Candidate withdrew application",
  "Candidate accepted another offer",
  "Salary expectations exceeded budget",
  "Position closed",
  "Duplicate application",
  "Did not meet minimum experience",
  "Required certifications missing",
  "Skills mismatch",
  "Incomplete application",
  "Resume screening unsuccessful",
  "Assessment not cleared",
  "HR interview not cleared",
  "Communication skills below expectations",
  "Culture fit mismatch",
  "Background verification failed",
  "Hiring freeze",
  "Internal candidate selected",
  "Position cancelled",
  "Offer declined by candidate",
  "Application expired",
];

function RejectCandidateModal({ isOpen, onClose, candidateName, onConfirmReject }) {
  const [reason, setReason] = useState(rejectionReasonsList[0]);
  const [recruiterNotes, setRecruiterNotes] = useState("");
  const [interviewFeedback, setInterviewFeedback] = useState("");
  const [recommendation, setRecommendation] = useState("Not Recommended");
  const [visibleToCandidate, setVisibleToCandidate] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirmReject({
      reason,
      recruiterNotes,
      interviewFeedback,
      recommendation,
      visibleToCandidate,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Reject Candidate: ${candidateName}`} maxWidth="max-w-xl">
      <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
        <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-3">
          <FaExclamationTriangle className="text-rose-600 text-base shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-rose-950 text-xs">Record Rejection Decision</h4>
            <p className="text-rose-800 text-[11px] font-medium mt-0.5 leading-relaxed">
              Select an explicit rejection reason and optional candidate feedback notes.
            </p>
          </div>
        </div>

        {/* Reason Dropdown */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-700 block">Rejection Reason *</label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:bg-white focus:border-rose-500 cursor-pointer"
          >
            {rejectionReasonsList.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        {/* Recommendation Dropdown */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-700 block">Overall Recommendation</label>
          <select
            value={recommendation}
            onChange={(e) => setRecommendation(e.target.value)}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:bg-white focus:border-rose-500 cursor-pointer"
          >
            <option value="Strongly Recommend">Strongly Recommend (Future Pool)</option>
            <option value="Recommend">Recommend (Different Role)</option>
            <option value="Neutral">Neutral</option>
            <option value="Not Recommended">Not Recommended</option>
            <option value="Do Not Proceed">Do Not Proceed</option>
          </select>
        </div>

        {/* Free Text Interview Feedback */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-700 block">Interview & Skill Evaluation Feedback</label>
          <textarea
            rows={3}
            value={interviewFeedback}
            onChange={(e) => setInterviewFeedback(e.target.value)}
            placeholder="e.g., Candidate demonstrated solid React fundamentals, but struggled with system architecture questions..."
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 font-medium focus:bg-white focus:border-rose-500 resize-y"
          />
        </div>

        {/* Additional Recruiter Notes */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-700 block">Internal Recruiter Notes</label>
          <textarea
            rows={2}
            value={recruiterNotes}
            onChange={(e) => setRecruiterNotes(e.target.value)}
            placeholder="Internal notes for recruiting team reference..."
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 font-medium focus:bg-white focus:border-rose-500 resize-y"
          />
        </div>

        {/* Visible to Candidate Toggle */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
          <div>
            <span className="font-bold text-slate-900 text-xs block">Visible to Candidate</span>
            <span className="text-[10px] text-slate-500 font-medium">
              If enabled, candidate can view constructive feedback in Candidate Portal under 'My Applications'
            </span>
          </div>

          <input
            type="checkbox"
            checked={visibleToCandidate}
            onChange={(e) => setVisibleToCandidate(e.target.checked)}
            className="w-4 h-4 rounded border-slate-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
          />
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
          >
            <FaTimesCircle className="text-xs" />
            <span>Confirm Rejection</span>
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default RejectCandidateModal;
