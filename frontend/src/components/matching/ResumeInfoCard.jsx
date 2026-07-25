import React from "react";
import Card from "../common/Card";
import Badge from "../common/Badge";
import Button from "../common/Button";
import {
  FaFilePdf,
  FaFileUpload,
  FaCheckCircle,
  FaUserCheck,
  FaCalendarAlt,
  FaFolderOpen,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ResumeInfoCard({ resume, onSelectCandidate }) {
  const navigate = useNavigate();

  return (
    <Card
      title="Resume Information"
      subtitle="Selected candidate resume for AI semantic matching"
      headerBorder
      action={
        resume && (
          <Badge variant="emerald" size="sm" dot>
            Active Resume
          </Badge>
        )
      }
    >
      {resume ? (
        <div className="space-y-4">
          {/* Main Selected Resume Preview Box */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center text-2xl shrink-0 border border-rose-100 shadow-2xs">
              <FaFilePdf />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-sm font-bold text-slate-900 truncate">
                  {resume.name}
                </h4>
                <span className="text-xs font-extrabold text-emerald-600 shrink-0">
                  {resume.atsScore}% ATS Score
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs text-slate-500">
                <Badge variant="blue" size="sm">
                  {resume.category}
                </Badge>
                <span>•</span>
                <span className="flex items-center gap-1 text-slate-400 font-medium">
                  <FaCalendarAlt className="text-[10px]" />
                  {resume.uploadedDate}
                </span>
              </div>
            </div>
          </div>

          {/* Additional Metadata Details */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-white rounded-xl border border-slate-200/70">
              <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider block">
                Candidate Name
              </span>
              <span className="font-bold text-slate-900 mt-0.5 block truncate">
                {resume.candidateName || "Sarah Chen"}
              </span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200/70">
              <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider block">
                Experience Level
              </span>
              <span className="font-bold text-slate-900 mt-0.5 block truncate">
                {resume.experience || "Mid-Senior (5+ Yrs)"}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <button
              onClick={onSelectCandidate}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
            >
              Switch Candidate Resume
            </button>
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="py-8 px-4 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center text-2xl mx-auto">
            <FaFileUpload />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-800">
              No Resume Selected
            </h4>
            <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto leading-relaxed">
              Upload a new resume or select an existing candidate to evaluate against the Job Description.
            </p>
          </div>

          <div className="flex justify-center gap-2 pt-2">
            <Button
              variant="primary"
              size="sm"
              icon={FaFileUpload}
              onClick={() => navigate("/upload")}
            >
              Upload New Resume
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}

export default ResumeInfoCard;
