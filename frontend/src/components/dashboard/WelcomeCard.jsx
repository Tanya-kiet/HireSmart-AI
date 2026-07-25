import React from "react";
import { FaMagic, FaArrowRight, FaRobot, FaCheckCircle } from "react-icons/fa";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";

function WelcomeCard() {
  const navigate = useNavigate();

  return (
    <div className="relative bg-slate-900 text-white rounded-2xl p-6 sm:p-8 overflow-hidden shadow-md border border-slate-800">
      {/* Subtle Ambient Background Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-1/3 w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
            <FaMagic className="text-xs" />
            <span>AI Recruiter Engine v2.4 Active</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Hire smarter, screen candidates 10x faster.
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed">
            Your automated pipeline parsed <span className="font-semibold text-white">48 new resumes</span> today with an average candidate match score of <span className="font-semibold text-emerald-400">92.8%</span>.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <FaCheckCircle className="text-emerald-400 text-xs" />
              <span>Real-time ATS Scoring</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FaCheckCircle className="text-emerald-400 text-xs" />
              <span>Vector Skill Matching</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FaCheckCircle className="text-emerald-400 text-xs" />
              <span>Bias Free Evaluation</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
          <Button
            variant="primary"
            size="md"
            icon={FaArrowRight}
            iconPosition="right"
            onClick={() => navigate("/upload")}
          >
            Batch Upload Resumes
          </Button>

          <Button
            variant="dark"
            size="md"
            onClick={() => navigate("/candidates")}
            className="border border-slate-700 bg-slate-800/80 hover:bg-slate-800"
          >
            Explore Candidates
          </Button>
        </div>
      </div>
    </div>
  );
}

export default WelcomeCard;
