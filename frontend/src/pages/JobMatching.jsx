import React, { useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import JobDescriptionInput from "../components/matching/JobDescriptionInput";
import ResumeInfoCard from "../components/matching/ResumeInfoCard";
import MatchScoreCard from "../components/matching/MatchScoreCard";
import SkillSection from "../components/matching/SkillSection";
import RecommendationCard from "../components/matching/RecommendationCard";
import StrengthCard from "../components/matching/StrengthCard";
import ImprovementCard from "../components/matching/ImprovementCard";
import LoadingAnalysis from "../components/matching/LoadingAnalysis";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Badge from "../components/common/Badge";
import Alert from "../components/common/Alert";
import {
  FaSlidersH,
  FaRedo,
  FaGraduationCap,
  FaBriefcase,
  FaCode,
  FaFolderOpen,
} from "react-icons/fa";

// Dummy candidate resume for default state
const initialResume = {
  name: "Sarah_Chen_Resume_2026.pdf",
  candidateName: "Sarah Chen",
  category: "Software Engineering",
  atsScore: 96,
  uploadedDate: "10 mins ago",
  experience: "Mid-Senior (5+ Yrs)",
};

const dummyResult = {
  matchScore: 92,
  matchingSkills: [
    "React",
    "JavaScript",
    "Python",
    "SQL",
    "Git",
    "REST API",
    "FastAPI",
    "Communication",
  ],
  missingSkills: ["AWS", "Docker", "Kubernetes", "Redis", "CI/CD"],
  recommendation:
    "Excellent candidate for this role. Highly suitable for this position. Would recommend scheduling a technical interview.",
  strengths: [
    "Strong frontend knowledge & React 19 architecture expertise.",
    "Good AI experience with semantic vector search & LLM integrations.",
    "Relevant hands-on projects & clean production codebase history.",
  ],
  improvements: [
    "Learn Docker containerization & deployment pipelines.",
    "Improve quantified achievement metrics in project descriptions.",
    "Add AWS Cloud certifications to boost recruiter ranking.",
  ],
  insights: {
    experienceLevel: "Mid Level",
    education: "Bachelor of Technology",
    projects: "5",
    technicalSkillsCount: "18",
  },
};

function JobMatching() {
  const [jobDescription, setJobDescription] = useState("");
  const [selectedResume, setSelectedResume] = useState(initialResume);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [matchResult, setMatchResult] = useState(null);
  const [alert, setAlert] = useState(null);

  // Handle Analysis Click
  const handleAnalyzeMatch = () => {
    if (!jobDescription.trim()) {
      setAlert({
        type: "warning",
        title: "Job Description Required",
        message: "Please paste a Job Description before running AI matching.",
      });
      return;
    }

    if (!selectedResume) {
      setAlert({
        type: "warning",
        title: "Resume Required",
        message: "Please select or upload a candidate resume to compare.",
      });
      return;
    }

    setAlert(null);
    setIsAnalyzing(true);

    // Simulate AI Semantic Matching Processing (~1.5s delay)
    setTimeout(() => {
      setIsAnalyzing(false);
      setMatchResult(dummyResult);
    }, 1500);
  };

  const handleResetMatch = () => {
    setMatchResult(null);
    setAlert(null);
  };

  return (
    <MainLayout>
      <div className="space-y-6 max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              AI Resume Matching
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Compare resumes with job descriptions using AI-powered semantic matching.
            </p>
          </div>

          {matchResult && (
            <Button
              variant="outline"
              size="sm"
              icon={FaRedo}
              onClick={handleResetMatch}
            >
              Analyze New JD
            </Button>
          )}
        </div>

        {/* Alert Notifications */}
        {alert && (
          <Alert
            type={alert.type}
            title={alert.title}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}

        {/* Loading Overlay */}
        {isAnalyzing && <LoadingAnalysis />}

        {/* INPUT PHASE: 2-Column Grid (Job Description + Resume Info) */}
        {!isAnalyzing && !matchResult && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column (7/12): Job Description Input */}
              <div className="lg:col-span-7">
                <JobDescriptionInput
                  value={jobDescription}
                  onChange={setJobDescription}
                  onClear={() => setJobDescription("")}
                  onLoadSample={(sample) => setJobDescription(sample)}
                />
              </div>

              {/* Right Column (5/12): Selected Resume Information */}
              <div className="lg:col-span-5">
                <ResumeInfoCard
                  resume={selectedResume}
                  onSelectCandidate={() =>
                    setSelectedResume((prev) => (prev ? null : initialResume))
                  }
                />
              </div>
            </div>

            {/* Bottom Large CTA Button */}
            <div className="flex justify-end pt-2">
              <Button
                variant="primary"
                size="lg"
                icon={FaSlidersH}
                onClick={handleAnalyzeMatch}
                className="w-full sm:w-auto px-10"
              >
                Analyze Match
              </Button>
            </div>
          </div>
        )}

        {/* RESULT DASHBOARD PHASE */}
        {!isAnalyzing && matchResult && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* 1. Large Match Score Banner */}
            <MatchScoreCard
              score={matchResult.matchScore}
              matchLevel="Excellent Fit"
            />

            {/* 2. AI Recommendation Card */}
            <RecommendationCard
              recommendation={matchResult.recommendation}
            />

            {/* 3. Skill Section (Matching vs Missing Skills) */}
            <SkillSection
              matchingSkills={matchResult.matchingSkills}
              missingSkills={matchResult.missingSkills}
            />

            {/* 4. Strengths & Improvements Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <StrengthCard strengths={matchResult.strengths} />
              <ImprovementCard improvements={matchResult.improvements} />
            </div>

            {/* 5. Resume Insights Grid */}
            <Card
              title="Resume Insights & Extraction"
              subtitle="Key candidate metrics parsed from resume vectors"
              headerBorder
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70">
                  <div className="flex items-center gap-1.5 text-slate-400 font-medium text-[11px] mb-1">
                    <FaBriefcase className="text-blue-600" />
                    <span>Experience Level</span>
                  </div>
                  <div className="text-sm font-extrabold text-slate-900">
                    {matchResult.insights.experienceLevel}
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70">
                  <div className="flex items-center gap-1.5 text-slate-400 font-medium text-[11px] mb-1">
                    <FaGraduationCap className="text-purple-600" />
                    <span>Education</span>
                  </div>
                  <div className="text-sm font-extrabold text-slate-900 truncate">
                    {matchResult.insights.education}
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70">
                  <div className="flex items-center gap-1.5 text-slate-400 font-medium text-[11px] mb-1">
                    <FaFolderOpen className="text-emerald-600" />
                    <span>Projects Extracted</span>
                  </div>
                  <div className="text-sm font-extrabold text-slate-900">
                    {matchResult.insights.projects}
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70">
                  <div className="flex items-center gap-1.5 text-slate-400 font-medium text-[11px] mb-1">
                    <FaCode className="text-amber-600" />
                    <span>Technical Skills</span>
                  </div>
                  <div className="text-sm font-extrabold text-slate-900">
                    {matchResult.insights.technicalSkillsCount}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default JobMatching;
