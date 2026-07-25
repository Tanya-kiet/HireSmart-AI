import React, { useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import SummaryCard from "../components/analyzer/SummaryCard";
import StrengthCard from "../components/analyzer/StrengthCard";
import WeaknessCard from "../components/analyzer/WeaknessCard";
import SkillsCard from "../components/analyzer/SkillsCard";
import QualityGauge from "../components/analyzer/QualityGauge";
import RecommendationCard from "../components/analyzer/RecommendationCard";
import InterviewCard from "../components/analyzer/InterviewCard";
import SalaryCard from "../components/analyzer/SalaryCard";
import ImprovementCard from "../components/analyzer/ImprovementCard";
import Button from "../components/common/Button";
import Alert from "../components/common/Alert";
import { FaFileDownload, FaShareAlt, FaRobot } from "react-icons/fa";

const sampleCandidate = {
  name: "Sarah Chen",
  email: "sarah.chen@example.com",
  category: "Software Engineering",
  filename: "Sarah_Chen_Resume_2026.pdf",
  uploadedDate: "Jul 24, 2026",
  atsScore: 96,
  matchScore: 94,
  summary:
    "This candidate has strong frontend and AI development experience with multiple full-stack projects. The resume demonstrates good technical knowledge and practical implementation.",
};

function ResumeAnalyzer() {
  const [candidate] = useState(sampleCandidate);
  const [alertState, setAlertState] = useState(null);

  const handleDownloadReport = () => {
    setAlertState({
      type: "success",
      title: "PDF Report Generating",
      message: "Downloading complete HireSmart AI Resume Evaluation Report...",
    });
  };

  const handleShareAnalysis = () => {
    setAlertState({
      type: "info",
      title: "Share Analysis Link",
      message: "Analysis report link copied to clipboard for recruiter team review.",
    });
  };

  return (
    <MainLayout>
      <div className="space-y-6 max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
              <span>AI Resume Analyzer</span>
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                ChatGPT Recruiter Mode
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Get detailed AI insights, skill vectors, and recruiter recommendations from every uploaded resume.
            </p>
          </div>

          {/* Export Action Buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              icon={FaShareAlt}
              onClick={handleShareAnalysis}
            >
              Share Analysis
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={FaFileDownload}
              onClick={handleDownloadReport}
            >
              Download PDF Report
            </Button>
          </div>
        </div>

        {/* Alert Notifications */}
        {alertState && (
          <Alert
            type={alertState.type}
            title={alertState.title}
            message={alertState.message}
            onClose={() => setAlertState(null)}
          />
        )}

        {/* 1. Top Section: Resume Metadata & AI Professional Summary */}
        <SummaryCard candidate={candidate} />

        {/* 2. Recommendation Verdict */}
        <RecommendationCard recommendation="Highly recommended for technical interview." />

        {/* 3. Resume Quality Gauge & Salary Estimation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7">
            <QualityGauge score={90} />
          </div>
          <div className="lg:col-span-5">
            <SalaryCard />
          </div>
        </div>

        {/* 4. Categorized Skill Breakdown */}
        <SkillsCard />

        {/* 5. Strengths & Weaknesses Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StrengthCard />
          <WeaknessCard />
        </div>

        {/* 6. AI Generated 10 Interview Questions */}
        <InterviewCard />

        {/* 7. 10 AI Resume Improvement Recommendations */}
        <ImprovementCard />
      </div>
    </MainLayout>
  );
}

export default ResumeAnalyzer;
