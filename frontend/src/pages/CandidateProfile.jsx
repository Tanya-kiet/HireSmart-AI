import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Alert from "../components/common/Alert";
import Breadcrumbs from "../components/common/Breadcrumbs";
import CandidateComparisonModal from "../components/candidates/CandidateComparisonModal";
import { getCandidateProfileById } from "../components/candidates/candidateLookup";
import { mockCandidatesPool1420 } from "../components/candidates/mockCandidates";
import {
  FaArrowLeft,
  FaCalendarPlus,
  FaCheckCircle,
  FaTimesCircle,
  FaEnvelope,
  FaDownload,
  FaUser,
  FaFileAlt,
  FaTools,
  FaChartBar,
  FaBriefcase,
  FaGraduationCap,
  FaFolderOpen,
  FaEdit,
  FaHistory,
  FaExternalLinkAlt,
  FaGithub,
  FaLinkedin,
  FaGlobe,
  FaCheck,
  FaArrowRight,
  FaTimes,
  FaBalanceScale,
  FaStar,
  FaExclamationTriangle,
  FaRobot,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaCalculator,
} from "react-icons/fa";

function CandidateProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Dynamic Candidate State from ID
  const [candidate, setCandidate] = useState(() => getCandidateProfileById(id));
  const [activeTab, setActiveTab] = useState("overview");

  // Notes state
  const [recruiterNotes, setRecruiterNotes] = useState(candidate.recruiterNotes || "");

  // Drawers & Modals
  const [alertState, setAlertState] = useState(null);
  const [isMoveStageOpen, setIsMoveStageOpen] = useState(false);
  const [selectedStage, setSelectedStage] = useState(candidate.status || "Interview Scheduled");
  const [isComparePickerOpen, setIsComparePickerOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [compareTargetCandidate, setCompareTargetCandidate] = useState(mockCandidatesPool1420[1]);

  // Sync candidate when ID changes
  useEffect(() => {
    const loaded = getCandidateProfileById(id);
    setCandidate(loaded);
    setRecruiterNotes(loaded.recruiterNotes || "");
    setSelectedStage(loaded.status || "Interview Scheduled");
  }, [id]);

  // Action Handlers
  const handleAction = (actionType) => {
    if (actionType === "schedule") {
      navigate("/interviews");
    } else if (actionType === "compare") {
      setIsComparePickerOpen(true);
    } else if (actionType === "shortlist") {
      setCandidate((prev) => ({ ...prev, status: "Shortlisted", rejectionReason: null }));
      setAlertState({
        type: "success",
        title: "Candidate Shortlisted",
        message: `${candidate.name} added to priority shortlist.`,
      });
    } else if (actionType === "reject") {
      const defaultReason = "Candidate did not meet required technical benchmark in phone screen.";
      setCandidate((prev) => ({ ...prev, status: "Rejected", rejectionReason: defaultReason }));
      setAlertState({
        type: "error",
        title: "Candidate Status Updated",
        message: `${candidate.name} marked as Rejected. Reason recorded.`,
      });
    } else if (actionType === "download") {
      const element = document.createElement("a");
      const file = new Blob([candidate.resumeText], { type: "text/plain" });
      element.href = URL.createObjectURL(file);
      element.download = `${candidate.name.replace(/\s+/g, "_")}_Resume.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);

      setAlertState({
        type: "info",
        title: "Download Started",
        message: `Downloading resume for ${candidate.name}.`,
      });
    } else if (actionType === "email") {
      setAlertState({
        type: "success",
        title: "Email Client Opened",
        message: `Opening email draft to ${candidate.email}`,
      });
    }
  };

  // Save Recruiter Notes Handler
  const handleSaveNotes = (e) => {
    e.preventDefault();
    setCandidate((prev) => ({ ...prev, recruiterNotes }));
    setAlertState({
      type: "success",
      title: "Notes Saved",
      message: "Recruiter interview evaluation notes saved successfully.",
    });
  };

  // Stage Update Handler
  const handleStageSubmit = () => {
    const isRejected = selectedStage === "Rejected";
    const rejectionReason = isRejected
      ? candidate.rejectionReason || "Position closed before final interview."
      : null;

    setCandidate((prev) => ({ ...prev, status: selectedStage, rejectionReason }));
    setIsMoveStageOpen(false);
    setAlertState({
      type: "success",
      title: "Stage Updated",
      message: `${candidate.name} moved to stage "${selectedStage}".`,
    });
  };

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case "Interview":
        return "bg-blue-50 text-blue-800 border-blue-200";
      case "Shortlisted":
        return "bg-purple-50 text-purple-800 border-purple-200";
      case "Screened":
        return "bg-indigo-50 text-indigo-800 border-indigo-200";
      case "Hired":
        return "bg-emerald-50 text-emerald-800 border-emerald-200";
      case "Rejected":
        return "bg-rose-50 text-rose-800 border-rose-200";
      default:
        return "bg-amber-50 text-amber-800 border-amber-200";
    }
  };

  const tabsList = [
    { id: "overview", label: "Overview", icon: FaUser },
    { id: "assessment", label: "Candidate Assessment", icon: FaRobot },
    { id: "match", label: "Match Analysis", icon: FaChartBar },
    { id: "resume", label: "Resume & ATS Audit", icon: FaFileAlt },
    { id: "skills", label: "Skills", icon: FaTools },
    { id: "experience", label: "Experience", icon: FaBriefcase },
    { id: "education", label: "Education", icon: FaGraduationCap },
    { id: "projects", label: "Projects", icon: FaFolderOpen },
    { id: "notes", label: "Interview Notes", icon: FaEdit },
    { id: "timeline", label: "Timeline", icon: FaHistory },
  ];

  const breakdown = candidate.scoreBreakdown || {
    overallMatch: candidate.matchScore || 84,
    skillsScore: 90,
    skillsWeight: "40%",
    expScore: 85,
    expWeight: "25%",
    eduScore: 95,
    eduWeight: "10%",
    projectsScore: 85,
    projectsWeight: "15%",
    atsScore: candidate.atsScore || 88,
    atsWeight: "10%",
  };

  return (
    <MainLayout>
      <div className="space-y-5 max-w-[1600px] w-full mx-auto pb-16 font-sans">
        {/* Navigation Breadcrumbs & Back Link */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/candidates")}
              className="p-2 bg-white border border-slate-200 hover:bg-slate-100 rounded-xl text-slate-600 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-bold shadow-2xs"
            >
              <FaArrowLeft className="text-xs" />
              <span>Back to Candidates</span>
            </button>
            <Breadcrumbs items={[{ label: "HireSmart AI", path: "/" }, { label: "Candidates", path: "/candidates" }, { label: candidate.name, path: `/candidates/${candidate.id}` }]} />
          </div>
        </div>

        {/* Global Toast Alert */}
        {alertState && (
          <Alert
            type={alertState.type}
            title={alertState.title}
            message={alertState.message}
            onClose={() => setAlertState(null)}
          />
        )}

        {/* MANDATORY REJECTION REASON BANNER (If Status is Rejected) */}
        {candidate.status === "Rejected" && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-start gap-3.5 shadow-2xs font-sans text-xs">
            <FaExclamationTriangle className="text-rose-600 text-base shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-rose-950 text-xs">Status: Rejected</span>
                <span className="text-[10px] font-mono font-bold bg-rose-200/60 text-rose-900 px-2 py-0.5 rounded">
                  Logged Event
                </span>
              </div>
              <p className="text-rose-900 font-semibold leading-relaxed">
                <strong className="text-rose-950">Reason:</strong> {candidate.rejectionReason || "Position closed before final interview."}
              </p>
            </div>
          </div>
        )}

        {/* Profile Header Box */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-5 font-sans">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Candidate Information & Avatar */}
            <div className="flex items-start gap-4">
              <div className={`w-16 h-16 rounded-2xl ${candidate.avatarBg} text-white font-extrabold text-xl flex items-center justify-center shadow-xs border border-white/20 shrink-0`}>
                {candidate.name.split(" ").map((n) => n[0]).join("")}
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                    {candidate.name}
                  </h1>
                  <span className={`px-2.5 py-0.5 text-xs font-bold rounded-md border ${getStatusBadgeStyle(candidate.status)}`}>
                    ● {candidate.status}
                  </span>
                </div>

                <p className="text-xs font-bold text-slate-700">
                  {candidate.role} • <span className="text-slate-500 font-medium">{candidate.currentCompany}</span>
                </p>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 font-medium pt-1">
                  <span className="flex items-center gap-1">
                    <FaMapMarkerAlt className="text-slate-400 text-[11px]" />
                    {candidate.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaBriefcase className="text-slate-400 text-[11px]" />
                    {candidate.experience} Experience
                  </span>
                  <span className="flex items-center gap-1">
                    <FaEnvelope className="text-slate-400 text-[11px]" />
                    {candidate.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaPhoneAlt className="text-slate-400 text-[11px]" />
                    {candidate.phone}
                  </span>
                </div>
              </div>
            </div>

            {/* Header Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 self-start lg:self-auto">
              <button
                onClick={() => handleAction("schedule")}
                className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
              >
                <FaCalendarPlus className="text-xs" />
                <span>Schedule Interview</span>
              </button>

              <button
                onClick={() => handleAction("shortlist")}
                className="px-3 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold rounded-xl text-xs border border-purple-200 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <FaCheckCircle className="text-xs" />
                <span>Shortlist</span>
              </button>

              <button
                onClick={() => handleAction("reject")}
                className="px-3 py-2 bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-700 font-bold rounded-xl text-xs border border-slate-200 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <FaTimesCircle className="text-xs" />
                <span>Reject</span>
              </button>

              <button
                onClick={() => handleAction("email")}
                className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs border border-slate-200 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <FaEnvelope className="text-xs" />
                <span>Send Email</span>
              </button>

              <button
                onClick={() => handleAction("download")}
                className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
              >
                <FaDownload className="text-xs" />
                <span>Download Resume</span>
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Navigation Tabs */}
        <div className="bg-white p-1.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-1 overflow-x-auto">
          {tabsList.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
                  isActive
                    ? "bg-slate-900 text-white shadow-2xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <Icon className={`text-xs ${isActive ? "text-white" : "text-slate-400"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* 2-COLUMN MAIN CONTENT AREA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ========================================================================= */}
          {/* LEFT COLUMN (8/12): Tab Content Panels                                    */}
          {/* ========================================================================= */}
          <div className="lg:col-span-8 space-y-6">
            {/* 1. OVERVIEW TAB */}
            {activeTab === "overview" && (
              <div className="space-y-6 font-sans">
                <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-2xs">
                  <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
                    Professional Summary
                  </h3>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                    {candidate.summary}
                  </p>
                </div>

                {/* Metadata Grid */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-2xs">
                  <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
                    Key Candidate Metadata
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                      <span className="text-slate-400 font-semibold block text-[10px] uppercase">Current Position</span>
                      <span className="font-bold text-slate-900">{candidate.role}</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                      <span className="text-slate-400 font-semibold block text-[10px] uppercase">Years of Experience</span>
                      <span className="font-bold text-slate-900">{candidate.experience}</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                      <span className="text-slate-400 font-semibold block text-[10px] uppercase">Preferred Location</span>
                      <span className="font-bold text-slate-900">{candidate.location}</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                      <span className="text-slate-400 font-semibold block text-[10px] uppercase">Expected Salary</span>
                      <span className="font-bold text-slate-900">{candidate.expectedSalary}</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                      <span className="text-slate-400 font-semibold block text-[10px] uppercase">Availability</span>
                      <span className="font-bold text-slate-900">{candidate.availability}</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                      <span className="text-slate-400 font-semibold block text-[10px] uppercase">Recruiter Assigned</span>
                      <span className="font-bold text-slate-900">{candidate.recruiter}</span>
                    </div>
                  </div>
                </div>

                {/* Portfolio Links */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-2xs">
                  <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
                    Portfolio & Social Profiles
                  </h3>
                  <div className="flex flex-wrap gap-3 text-xs">
                    <a href={candidate.portfolioLinks?.github} target="_blank" rel="noreferrer" className="px-4 py-2 bg-slate-900 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-colors">
                      <FaGithub className="text-sm" />
                      <span>GitHub Profile</span>
                    </a>
                    <a href={candidate.portfolioLinks?.linkedin} target="_blank" rel="noreferrer" className="px-4 py-2 bg-blue-600 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-colors">
                      <FaLinkedin className="text-sm" />
                      <span>LinkedIn Network</span>
                    </a>
                    <a href={candidate.portfolioLinks?.portfolio} target="_blank" rel="noreferrer" className="px-4 py-2 bg-slate-100 text-slate-800 rounded-xl font-bold border border-slate-200 flex items-center gap-2 hover:bg-slate-200 transition-colors">
                      <FaGlobe className="text-sm" />
                      <span>Personal Portfolio</span>
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* 2. CANDIDATE ASSESSMENT TAB (Renamed from AI Analysis) */}
            {activeTab === "assessment" && (
              <div className="space-y-6 font-sans">
                <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5 shadow-2xs">
                  <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        <FaRobot className="text-blue-600" />
                        <span>Candidate Assessment & Hiring Rationale</span>
                      </h3>
                      <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                        Written qualitative assessment derived from candidate experience, skills, and background
                      </p>
                    </div>
                    <span className="px-2.5 py-1 text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200 rounded-lg font-mono">
                      Calculated Match: {breakdown.overallMatch}%
                    </span>
                  </div>

                  {/* Justified Written Explanation */}
                  <div className="p-4 bg-blue-50/70 border border-blue-200/80 rounded-xl space-y-2">
                    <h4 className="text-xs font-bold text-blue-950 uppercase tracking-wider">
                      Assessment Synthesis
                    </h4>
                    <p className="text-xs text-blue-900 font-medium leading-relaxed">
                      "{candidate.candidateAssessment?.overallFit || candidate.recommendationReason}"
                    </p>
                  </div>

                  {/* Recommendation Card */}
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Hiring Recommendation</span>
                      <span className={`px-2.5 py-0.5 text-xs font-extrabold rounded border ${
                        candidate.recommendation === "Recommended"
                          ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                          : candidate.recommendation === "Proceed with Caution"
                          ? "bg-amber-50 text-amber-800 border-amber-200"
                          : "bg-rose-50 text-rose-800 border-rose-200"
                      }`}>
                        {candidate.recommendation || "Recommended"}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 font-medium leading-relaxed">
                      {candidate.recommendationReason}
                    </p>
                  </div>
                </div>

                {/* Strengths & Missing Requirements Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Strengths */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-2xs">
                    <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                      <FaCheckCircle className="text-emerald-600" />
                      <span>Key Candidate Strengths</span>
                    </h4>
                    <ul className="space-y-2 text-xs text-slate-700 font-medium">
                      {candidate.strengths?.map((str, idx) => (
                        <li key={idx} className="flex items-start gap-2 bg-emerald-50/60 p-2.5 rounded-lg border border-emerald-100">
                          <FaCheck className="text-emerald-600 text-xs shrink-0 mt-0.5" />
                          <span>{str}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Missing Requirements */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-2xs">
                    <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
                      <FaExclamationTriangle className="text-amber-600" />
                      <span>Missing Requirements / Gaps</span>
                    </h4>
                    <ul className="space-y-2 text-xs text-slate-700 font-medium">
                      {candidate.missingSkills?.map((gap, idx) => (
                        <li key={idx} className="flex items-start gap-2 bg-amber-50/60 p-2.5 rounded-lg border border-amber-100">
                          <span className="text-amber-600 font-bold">•</span>
                          <span>{gap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* 3. MATCH ANALYSIS TAB (Weighted Criteria Derivation) */}
            {activeTab === "match" && (
              <div className="space-y-6 font-sans">
                {/* Transparent Weighted Mathematical Derivation Card */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5 shadow-2xs">
                  <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        <FaCalculator className="text-blue-600" />
                        <span>Weighted Match Score Formula Derivation</span>
                      </h3>
                      <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                        Mathematical calculation combining 5 weighted criteria (Skills 40%, Experience 25%, Education 10%, Projects 15%, ATS 10%)
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Final Weighted Score</span>
                      <span className="text-2xl font-black text-emerald-700 font-mono tracking-tight">
                        {breakdown.overallMatch}%
                      </span>
                    </div>
                  </div>

                  {/* Component Formula Table */}
                  <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          <th className="py-2.5 px-4">Evaluation Criteria</th>
                          <th className="py-2.5 px-4">Weight</th>
                          <th className="py-2.5 px-4">Component Score</th>
                          <th className="py-2.5 px-4 text-right">Weighted Contribution</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                        <tr>
                          <td className="py-3 px-4 font-bold text-slate-900">Required Skills Match</td>
                          <td className="py-3 px-4 font-mono font-bold text-blue-600">{breakdown.skillsWeight}</td>
                          <td className="py-3 px-4 font-mono">{breakdown.skillsScore}%</td>
                          <td className="py-3 px-4 font-mono font-bold text-right text-slate-900">
                            {Math.round(breakdown.skillsScore * 0.40)}%
                          </td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 font-bold text-slate-900">Experience Alignment</td>
                          <td className="py-3 px-4 font-mono font-bold text-blue-600">{breakdown.expWeight}</td>
                          <td className="py-3 px-4 font-mono">{breakdown.expScore}%</td>
                          <td className="py-3 px-4 font-mono font-bold text-right text-slate-900">
                            {Math.round(breakdown.expScore * 0.25)}%
                          </td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 font-bold text-slate-900">Education & Degree</td>
                          <td className="py-3 px-4 font-mono font-bold text-blue-600">{breakdown.eduWeight}</td>
                          <td className="py-3 px-4 font-mono">{breakdown.eduScore}%</td>
                          <td className="py-3 px-4 font-mono font-bold text-right text-slate-900">
                            {Math.round(breakdown.eduScore * 0.10)}%
                          </td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 font-bold text-slate-900">Projects Relevance</td>
                          <td className="py-3 px-4 font-mono font-bold text-blue-600">{breakdown.projectsWeight}</td>
                          <td className="py-3 px-4 font-mono">{breakdown.projectsScore}%</td>
                          <td className="py-3 px-4 font-mono font-bold text-right text-slate-900">
                            {Math.round(breakdown.projectsScore * 0.15)}%
                          </td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 font-bold text-slate-900">Resume Quality / ATS Structure</td>
                          <td className="py-3 px-4 font-mono font-bold text-blue-600">{breakdown.atsWeight}</td>
                          <td className="py-3 px-4 font-mono">{breakdown.atsScore}%</td>
                          <td className="py-3 px-4 font-mono font-bold text-right text-slate-900">
                            {Math.round(breakdown.atsScore * 0.10)}%
                          </td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr className="bg-slate-900 text-white font-bold text-xs">
                          <td className="py-3 px-4" colSpan={3}>Total Weighted Match Score</td>
                          <td className="py-3 px-4 text-right font-mono text-emerald-400 text-sm">
                            {breakdown.overallMatch}%
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* 4. RESUME & ATS AUDIT TAB */}
            {activeTab === "resume" && (
              <div className="space-y-6 font-sans">
                {/* ATS Audit Checklist Card */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-2xs">
                  <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        <FaShieldAlt className="text-blue-600" />
                        <span>ATS Compatibility Audit & Document Quality</span>
                      </h3>
                      <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                        Automated structural parsing evaluation and section completeness verification
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-500">Quality Status:</span>
                      <span className="px-2.5 py-0.5 text-xs font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-md font-mono">
                        {candidate.atsChecklist?.qualityLabel || "Good"} ({candidate.atsScore}%)
                      </span>
                    </div>
                  </div>

                  {/* Checklist Items */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Passed Checks */}
                    <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-200/80 space-y-2">
                      <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                        <FaCheckCircle className="text-emerald-600" />
                        <span>Passed Structure Checks</span>
                      </h4>
                      <ul className="space-y-1.5 text-xs text-emerald-950 font-medium">
                        {candidate.atsChecklist?.passed?.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <FaCheck className="text-emerald-600 text-xs shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Warnings & Missing Items */}
                    <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-200/80 space-y-2">
                      <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                        <FaExclamationTriangle className="text-amber-600" />
                        <span>Warnings & Missing Sections</span>
                      </h4>
                      <ul className="space-y-1.5 text-xs text-amber-950 font-medium">
                        {candidate.atsChecklist?.warnings?.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-amber-600 font-bold">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Resume Text Dossier Viewer */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-2xs">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="text-sm font-bold text-slate-900">Parsed Resume Text Dossier</h3>
                    <button onClick={() => handleAction("download")} className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer flex items-center gap-1.5">
                      <FaDownload className="text-xs" />
                      <span>Download Resume</span>
                    </button>
                  </div>
                  <div className="p-4 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs leading-relaxed overflow-x-auto whitespace-pre-wrap max-h-[450px]">
                    {candidate.resumeText}
                  </div>
                </div>
              </div>
            )}

            {/* 5. SKILLS TAB */}
            {activeTab === "skills" && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-2xs font-sans">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-sm font-bold text-slate-900">Grouped Technical Skills & Competencies</h3>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                    Evaluated skill badges with proficiency levels and experience duration
                  </p>
                </div>

                <div className="space-y-5">
                  {Object.entries(candidate.skillsGrouped || {}).map(([groupName, skills]) => (
                    <div key={groupName} className="space-y-2.5">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        {groupName}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill, idx) => (
                          <div
                            key={idx}
                            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-2 ${
                              skill.match
                                ? "bg-emerald-50 text-emerald-900 border-emerald-200"
                                : "bg-slate-50 text-slate-700 border-slate-200"
                            }`}
                          >
                            <span>{skill.name}</span>
                            <span className="text-[10px] font-mono font-bold bg-white/70 px-1.5 py-0.2 rounded border border-slate-200">
                              {skill.years}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. EXPERIENCE TAB */}
            {activeTab === "experience" && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-2xs font-sans">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-sm font-bold text-slate-900">Work Experience Timeline</h3>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                    Employment track record and key achievements
                  </p>
                </div>

                <div className="space-y-6">
                  {candidate.workExperience?.map((exp, idx) => (
                    <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">{exp.role}</h4>
                          <p className="text-xs font-semibold text-slate-600">
                            {exp.company} • <span className="text-slate-500 font-normal">{exp.location}</span>
                          </p>
                        </div>
                        <span className="px-2.5 py-1 text-xs font-bold bg-white text-slate-700 rounded-md border border-slate-200">
                          {exp.period}
                        </span>
                      </div>

                      <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
                        {exp.responsibilities?.map((resp, rIdx) => (
                          <li key={rIdx} className="flex items-start gap-2">
                            <span className="text-blue-600 font-bold">•</span>
                            <span className="leading-relaxed">{resp}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-200/70">
                        {exp.technologies?.map((tech, tIdx) => (
                          <span key={tIdx} className="px-2 py-0.5 text-[10px] font-semibold bg-white text-slate-700 rounded border border-slate-200">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 7. EDUCATION TAB */}
            {activeTab === "education" && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-2xs font-sans">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-sm font-bold text-slate-900">Education & Qualifications</h3>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                    Academic degrees, grades, and relevant coursework
                  </p>
                </div>

                <div className="space-y-4">
                  {candidate.education?.map((edu, idx) => (
                    <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <h4 className="font-bold text-xs text-slate-900">{edu.degree}</h4>
                        <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-50 text-emerald-800 rounded border border-emerald-200">
                          {edu.grade}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-slate-600">{edu.institution} • {edu.period}</p>
                      <p className="text-xs text-slate-500 font-medium pt-1">
                        <strong>Relevant Courses:</strong> {edu.courses}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 8. PROJECTS TAB */}
            {activeTab === "projects" && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-2xs font-sans">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-sm font-bold text-slate-900">Featured Software Projects</h3>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                    Open-source and technical portfolio projects
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {candidate.projects?.map((proj, idx) => (
                    <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="font-bold text-slate-900 text-xs truncate">{proj.title}</h4>
                          <a href={proj.link} target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-800 text-xs shrink-0">
                            <FaExternalLinkAlt />
                          </a>
                        </div>
                        <p className="text-xs text-slate-600 font-medium leading-relaxed">{proj.description}</p>
                      </div>

                      <div className="flex flex-wrap gap-1 pt-2 border-t border-slate-200/60">
                        {proj.tech?.map((t, tIdx) => (
                          <span key={tIdx} className="px-2 py-0.5 text-[10px] font-semibold bg-white text-slate-700 rounded border border-slate-200">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 9. INTERVIEW NOTES TAB */}
            {activeTab === "notes" && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-2xs font-sans">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-sm font-bold text-slate-900">Recruiter Evaluation & Interview Notes</h3>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                    Add notes from phone screens, hiring manager reviews, and panel interviews
                  </p>
                </div>

                <form onSubmit={handleSaveNotes} className="space-y-3">
                  <textarea
                    rows={6}
                    value={recruiterNotes}
                    onChange={(e) => setRecruiterNotes(e.target.value)}
                    placeholder="Enter interview evaluation notes, candidate strengths, concerns, and compensation expectations..."
                    className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-medium focus:outline-none focus:border-blue-500 focus:bg-white resize-y"
                  />

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer shadow-2xs"
                    >
                      Save Evaluation Notes
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* 10. TIMELINE TAB */}
            {activeTab === "timeline" && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-2xs font-sans">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-sm font-bold text-slate-900">Candidate Recruitment Lifecycle Timeline</h3>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                    Chronological progression across ATS recruitment stages
                  </p>
                </div>

                <div className="space-y-4 relative pl-4 border-l-2 border-slate-200">
                  {candidate.lifecycleTimeline?.map((item, idx) => {
                    const isDone = item.status === "completed";
                    const isCurrent = item.status === "current";
                    return (
                      <div key={idx} className="relative space-y-1">
                        <span
                          className={`absolute -left-[23px] top-1 w-3.5 h-3.5 rounded-full border-2 border-white ${
                            isDone ? "bg-emerald-500" : isCurrent ? "bg-blue-600 ring-2 ring-blue-100" : "bg-slate-300"
                          }`}
                        />
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <h4 className="font-bold text-xs text-slate-900">{item.stage}</h4>
                          <span className="text-[10px] font-mono font-bold text-slate-400">{item.date}</span>
                        </div>
                        <p className="text-xs text-slate-500 font-medium">{item.note}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* ========================================================================= */}
          {/* RIGHT SIDEBAR (4/12): Sticky Recruiter Quick Stats & Actions              */}
          {/* ========================================================================= */}
          <div className="lg:col-span-4 space-y-5 sticky top-20 font-sans">
            {/* Quick Stats Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2">
                Quick Candidate Summary
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Weighted Overall Match</span>
                  <span className="font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-mono">
                    {breakdown.overallMatch}%
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">ATS Structure Score</span>
                  <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 font-mono">
                    {candidate.atsScore}%
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Current Stage</span>
                  <span className="font-bold text-slate-900">{candidate.status}</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Applied Date</span>
                  <span className="font-bold text-slate-900 font-mono">{candidate.applicationDate}</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Expected Compensation</span>
                  <span className="font-bold text-slate-900">{candidate.expectedSalary}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2">
                Quick Actions
              </h3>

              <div className="space-y-2">
                <button
                  onClick={() => handleAction("schedule")}
                  className="w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-2xs"
                >
                  <FaCalendarPlus className="text-xs" />
                  <span>Schedule Interview</span>
                </button>

                <button
                  onClick={() => setIsMoveStageOpen(true)}
                  className="w-full px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-2xs"
                >
                  <FaArrowRight className="text-xs" />
                  <span>Move to Next Stage</span>
                </button>

                <button
                  onClick={() => handleAction("compare")}
                  className="w-full px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs border border-slate-200 transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <FaBalanceScale className="text-xs text-blue-600" />
                  <span>Compare Candidate</span>
                </button>

                <button
                  onClick={() => handleAction("shortlist")}
                  className="w-full px-3 py-2 bg-purple-50 hover:bg-purple-100 text-purple-800 font-bold rounded-xl text-xs border border-purple-200 transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <FaCheckCircle className="text-xs" />
                  <span>Shortlist Candidate</span>
                </button>

                <button
                  onClick={() => handleAction("reject")}
                  className="w-full px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-800 font-bold rounded-xl text-xs border border-rose-200 transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <FaTimesCircle className="text-xs" />
                  <span>Reject Candidate</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Move Stage Modal */}
        {isMoveStageOpen && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in font-sans text-xs">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">Move Candidate Stage</h3>
                <button onClick={() => setIsMoveStageOpen(false)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
                  <FaTimes />
                </button>
              </div>

              <p className="text-slate-600 font-medium">
                Select target stage for <strong className="text-slate-900">{candidate.name}</strong>:
              </p>

              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {["Applied", "Screened", "Shortlisted", "Interview", "Offer Sent", "Hired", "Rejected"].map((stg) => (
                  <div
                    key={stg}
                    onClick={() => setSelectedStage(stg)}
                    className={`p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all flex items-center justify-between ${
                      selectedStage === stg
                        ? "bg-blue-50 text-blue-900 border-blue-300 shadow-2xs"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <span>{stg}</span>
                    {selectedStage === stg && <span className="w-2 h-2 rounded-full bg-blue-600" />}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  onClick={() => setIsMoveStageOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  onClick={handleStageSubmit}
                  className="px-4 py-2 bg-blue-600 text-white font-bold rounded-xl"
                >
                  Update Stage
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Select Second Candidate Picker Modal */}
        {isComparePickerOpen && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in font-sans text-xs">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">Compare {candidate.name}</h3>
                <button onClick={() => setIsComparePickerOpen(false)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
                  <FaTimes />
                </button>
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto">
                {mockCandidatesPool1420.slice(0, 15).map((cand) => (
                  <div
                    key={cand.id}
                    onClick={() => {
                      setCompareTargetCandidate(cand);
                      setIsComparePickerOpen(false);
                      setIsCompareModalOpen(true);
                    }}
                    className="p-3 bg-slate-50 hover:bg-blue-50 border border-slate-200 rounded-xl cursor-pointer transition-all flex items-center justify-between"
                  >
                    <div>
                      <div className="font-bold text-slate-900">{cand.name}</div>
                      <div className="text-[11px] text-slate-500">{cand.role}</div>
                    </div>
                    <span className="text-[10px] font-bold text-blue-600 bg-white px-2 py-1 rounded border">
                      Compare
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Comparison Modal */}
        <CandidateComparisonModal
          isOpen={isCompareModalOpen}
          onClose={() => setIsCompareModalOpen(false)}
          candidates={[candidate, compareTargetCandidate]}
        />
      </div>
    </MainLayout>
  );
}

export default CandidateProfile;
