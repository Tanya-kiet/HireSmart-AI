import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import CandidateHeader from "../components/profile/CandidateHeader";
import SectionCard from "../components/profile/SectionCard";
import CandidateIntelligence from "../components/profile/CandidateIntelligence";
import MatchAnalysis from "../components/profile/MatchAnalysis";
import SkillChip from "../components/profile/SkillChip";
import Timeline from "../components/profile/Timeline";
import ResumeViewer from "../components/profile/ResumeViewer";
import InterviewSection from "../components/profile/InterviewSection";
import RecommendationCard from "../components/profile/RecommendationCard";
import ScoreCard from "../components/profile/ScoreCard";
import QuickActionsCard from "../components/profile/QuickActionsCard";
import NotesCard from "../components/profile/NotesCard";
import CandidateComparisonModal from "../components/candidates/CandidateComparisonModal";
import Alert from "../components/common/Alert";
import { mockCandidateProfile } from "../components/profile/profileData";
import { mockCandidatesPool1420 } from "../components/candidates/mockCandidates";
import {
  FaRobot,
  FaCodeBranch,
  FaUser,
  FaBriefcase,
  FaFolderOpen,
  FaGraduationCap,
  FaCertificate,
  FaTools,
  FaLanguage,
  FaFilePdf,
  FaHistory,
  FaComments,
  FaArrowRight,
  FaTimes,
  FaExternalLinkAlt,
  FaBalanceScale,
} from "react-icons/fa";

function CandidateProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState(mockCandidateProfile);
  const [alertState, setAlertState] = useState(null);
  const [isMoveStageOpen, setIsMoveStageOpen] = useState(false);
  const [selectedStage, setSelectedStage] = useState(candidate.stage || "Interview Scheduled");
  const [allExpanded, setAllExpanded] = useState(true);

  // Dynamic Comparison States
  const [isComparePickerOpen, setIsComparePickerOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [compareTargetCandidate, setCompareTargetCandidate] = useState(mockCandidatesPool1420[1]);

  // Keyboard Shortcuts Handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.metaKey || e.ctrlKey) {
        if (e.key.toLowerCase() === "s") {
          e.preventDefault();
          handleAction("schedule");
        } else if (e.key.toLowerCase() === "c") {
          e.preventDefault();
          handleAction("compare");
        } else if (e.key.toLowerCase() === "m") {
          e.preventDefault();
          setIsMoveStageOpen(true);
        } else if (e.key.toLowerCase() === "d") {
          e.preventDefault();
          handleAction("download");
        } else if (e.key.toLowerCase() === "l") {
          e.preventDefault();
          handleAction("shortlist");
        } else if (e.key.toLowerCase() === "e") {
          e.preventDefault();
          setAllExpanded((prev) => !prev);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleAction = (actionType) => {
    if (actionType === "schedule") {
      navigate("/interviews");
    } else if (actionType === "compare") {
      setIsComparePickerOpen(true);
    } else if (actionType === "move-stage") {
      setIsMoveStageOpen(true);
    } else if (actionType === "shortlist") {
      setCandidate((prev) => ({ ...prev, stage: "Shortlisted" }));
      setAlertState({
        type: "success",
        title: "Candidate Shortlisted",
        message: `${candidate.name} has been added to the priority shortlist.`,
      });
    } else if (actionType === "reject") {
      setCandidate((prev) => ({ ...prev, stage: "Rejected" }));
      setAlertState({
        type: "error",
        title: "Candidate Stage Updated",
        message: `${candidate.name} stage updated to Rejected.`,
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
        message: `Downloading resume dossier for ${candidate.name}.`,
      });
    } else if (actionType === "share") {
      navigator.clipboard.writeText(window.location.href);
      setAlertState({
        type: "success",
        title: "Link Copied",
        message: `Candidate profile link copied to clipboard.`,
      });
    }
  };

  const handleStageSubmit = () => {
    setCandidate((prev) => ({ ...prev, stage: selectedStage }));
    setIsMoveStageOpen(false);
    setAlertState({
      type: "success",
      title: "Stage Updated",
      message: `${candidate.name} moved to "${selectedStage}".`,
    });
  };

  const stagesList = [
    "Resume Uploaded",
    "Resume Parsed",
    "Screened",
    "Matched",
    "Shortlisted",
    "Interview Scheduled",
    "Interview Completed",
    "Offer Sent",
    "Offer Accepted",
    "Rejected",
  ];

  return (
    <MainLayout>
      <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans">
        {/* Candidate Top Header */}
        <CandidateHeader
          candidate={candidate}
          onAction={handleAction}
          onExpandAll={() => setAllExpanded(true)}
          onCollapseAll={() => setAllExpanded(false)}
          isAllExpanded={allExpanded}
        />

        {/* Global Toast Alert */}
        {alertState && (
          <Alert
            type={alertState.type}
            title={alertState.title}
            message={alertState.message}
            onClose={() => setAlertState(null)}
          />
        )}

        {/* Main Enterprise 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ========================================================================= */}
          {/* LEFT COLUMN (8/12): Detailed Collapsible Information & Sections           */}
          {/* ========================================================================= */}
          <div className="lg:col-span-8 space-y-6">
            {/* 1. Candidate Intelligence (Signature AI Insights) */}
            <SectionCard
              id="intelligence"
              title="Candidate Intelligence"
              subtitle="LLM-driven candidate assessment with explainable WHY rationales"
              badge="Signature Feature"
              icon={FaRobot}
              defaultOpen={allExpanded}
            >
              <CandidateIntelligence intelligence={candidate.candidateIntelligence} />
            </SectionCard>

            {/* 2. Match Analysis (Resume vs JD Diff) */}
            <SectionCard
              id="match-analysis"
              title="Match Analysis & Diff View"
              subtitle="Side-by-side comparison between candidate resume and target job criteria"
              badge={`${candidate.matchAnalysis?.overallScore || 94}% Overlap`}
              icon={FaCodeBranch}
              defaultOpen={allExpanded}
            >
              <MatchAnalysis data={candidate.matchAnalysis} />
            </SectionCard>

            {/* 3. Professional Summary */}
            <SectionCard
              id="summary"
              title="Professional Summary"
              subtitle="Parsed executive background overview"
              icon={FaUser}
              defaultOpen={allExpanded}
            >
              <p className="text-xs text-slate-700 leading-relaxed font-medium bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                {candidate.summary}
              </p>
            </SectionCard>

            {/* 4. Categorized Skills */}
            <SectionCard
              id="skills"
              title="Technical Skills & Competencies"
              subtitle="Hover over any skill chip to view years used, confidence level, and project references"
              badge="Hover for Details"
              icon={FaTools}
              defaultOpen={allExpanded}
            >
              <div className="space-y-4">
                {Object.entries(candidate.skillsGrouped || {}).map(([groupName, skills]) => (
                  <div key={groupName} className="space-y-2">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      {groupName}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, idx) => (
                        <SkillChip key={idx} skill={skill} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* 5. Experience Timeline */}
            <SectionCard
              id="experience"
              title="Experience History"
              subtitle="Detailed employment track record and achievements"
              icon={FaBriefcase}
              defaultOpen={allExpanded}
            >
              <div className="space-y-6">
                {candidate.workExperience?.map((exp, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-slate-50/70 rounded-xl border border-slate-200 space-y-3"
                  >
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

                    <ul className="space-y-1.5 text-xs text-slate-700 font-medium pl-1">
                      {exp.achievements?.map((ach, aIdx) => (
                        <li key={aIdx} className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold">•</span>
                          <span className="leading-relaxed">{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* 6. Projects */}
            <SectionCard
              id="projects"
              title="Featured Projects"
              subtitle="Key software projects and architecture contributions"
              icon={FaFolderOpen}
              defaultOpen={allExpanded}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {candidate.projects?.map((proj, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-slate-50/70 rounded-xl border border-slate-200 space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-bold text-slate-900 text-xs truncate">
                          {proj.title}
                        </h4>
                        {proj.link && (
                          <a
                            href={proj.link}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 hover:text-blue-800 text-xs shrink-0"
                            title="View Project Link"
                          >
                            <FaExternalLinkAlt />
                          </a>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-medium">
                        {proj.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1 pt-2 border-t border-slate-200/60">
                      {proj.tech?.map((t, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 text-[10px] font-semibold bg-white text-slate-700 rounded border border-slate-200"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* 7. Education & Certifications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SectionCard
                id="education"
                title="Education"
                subtitle="Degrees & Academic honors"
                icon={FaGraduationCap}
                defaultOpen={allExpanded}
              >
                <div className="space-y-3">
                  {candidate.education?.map((edu, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                      <h4 className="font-bold text-xs text-slate-900">{edu.degree}</h4>
                      <p className="text-xs font-medium text-slate-600">{edu.institution} • {edu.period}</p>
                      <span className="inline-block px-2 py-0.5 text-[10px] font-bold bg-emerald-50 text-emerald-700 rounded border border-emerald-200">
                        {edu.grade}
                      </span>
                      <p className="text-[11px] text-slate-500 font-medium pt-1">
                        {edu.details}
                      </p>
                    </div>
                  ))}
                </div>
              </SectionCard>

              <SectionCard
                id="certifications"
                title="Certifications"
                subtitle="Industry credentials & validity"
                icon={FaCertificate}
                defaultOpen={allExpanded}
              >
                <div className="space-y-3">
                  {candidate.certifications?.map((cert, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                      <h4 className="font-bold text-xs text-slate-900">{cert.name}</h4>
                      <p className="text-xs font-medium text-slate-600">{cert.issuer}</p>
                      <p className="text-[10px] text-slate-400 font-mono">{cert.date}</p>
                    </div>
                  ))}
                </div>
              </SectionCard>
            </div>

            {/* 8. Languages */}
            <SectionCard
              id="languages"
              title="Languages"
              subtitle="Linguistic proficiency"
              icon={FaLanguage}
              defaultOpen={allExpanded}
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {candidate.languages?.map((lang, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                    <span className="font-bold text-slate-900 block">{lang.name}</span>
                    <span className="text-[11px] text-slate-500 font-medium">{lang.level}</span>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* 9. Resume Preview (Embedded PDF Viewer) */}
            <SectionCard
              id="resume-viewer"
              title="Resume Preview"
              subtitle="Embedded PDF document viewer with OCR text extraction & search"
              badge="Embedded Viewer"
              icon={FaFilePdf}
              defaultOpen={allExpanded}
            >
              <ResumeViewer candidateName={candidate.name} resumeText={candidate.resumeText} />
            </SectionCard>

            {/* 10. Candidate Lifecycle Timeline (9 Stages) */}
            <SectionCard
              id="timeline"
              title="Candidate Lifecycle Timeline"
              subtitle="Vertical recruitment workflow stage progression"
              icon={FaHistory}
              defaultOpen={allExpanded}
            >
              <Timeline timeline={candidate.lifecycleTimeline} />
            </SectionCard>

            {/* 11. Interview Management Section */}
            <SectionCard
              id="interviews"
              title="Interview Section & Ratings"
              subtitle="Scheduled rounds, interviewer ratings, feedback notes, and video links"
              icon={FaComments}
              defaultOpen={allExpanded}
            >
              <InterviewSection
                interviews={candidate.interviews}
                onSchedule={() => handleAction("schedule")}
              />
            </SectionCard>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT SIDEBAR (4/12): Sticky Enterprise Recruiter Cards                   */}
          {/* ========================================================================= */}
          <div className="lg:col-span-4 space-y-6 sticky top-6">
            {/* Card 1: Decision Engine */}
            <RecommendationCard
              initialRecommendation={candidate.recommendation || "Strong Hire"}
              onChange={(rec) => {
                setCandidate((prev) => ({ ...prev, recommendation: rec }));
                setAlertState({
                  type: "info",
                  title: "Decision Engine Updated",
                  message: `Recommendation updated to ${rec}.`,
                });
              }}
            />

            {/* Card 2: Overall Match */}
            <ScoreCard scores={candidate.scores} />

            {/* Card 3: Quick Actions */}
            <QuickActionsCard onAction={handleAction} />

            {/* Card 4: Recruiter Notes */}
            <NotesCard initialNotes={candidate.recruiterNotesList} />
          </div>
        </div>
      </div>

      {/* Move Stage Modal */}
      {isMoveStageOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                Move Candidate Stage
              </h3>
              <button
                onClick={() => setIsMoveStageOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <FaTimes />
              </button>
            </div>

            <p className="text-xs text-slate-600 font-medium">
              Select target ATS recruitment workflow stage for <strong className="text-slate-900">{candidate.name}</strong>:
            </p>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {stagesList.map((stg) => (
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
                  {selectedStage === stg && (
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => setIsMoveStageOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleStageSubmit}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
              >
                <span>Confirm Stage Update</span>
                <FaArrowRight className="text-[10px]" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Select Second Candidate Picker Modal for Profile Comparison */}
      {isComparePickerOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in font-sans text-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <FaBalanceScale className="text-blue-600 text-sm" />
                <h3 className="text-base font-bold text-slate-900">
                  Compare {candidate.name}
                </h3>
              </div>
              <button
                onClick={() => setIsComparePickerOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <FaTimes />
              </button>
            </div>

            <p className="text-slate-600 font-medium">
              Select a second candidate from the pool to compare against <strong className="text-slate-900">{candidate.name}</strong>:
            </p>

            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {mockCandidatesPool1420.slice(0, 15).map((cand) => (
                <div
                  key={cand.id}
                  onClick={() => {
                    setCompareTargetCandidate(cand);
                    setIsComparePickerOpen(false);
                    setIsCompareModalOpen(true);
                  }}
                  className="p-3 bg-slate-50 hover:bg-blue-50 border border-slate-200 rounded-xl cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-xl ${cand.avatarBg} text-white flex items-center justify-center font-bold text-xs`}>
                      {cand.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 group-hover:text-blue-600">{cand.name}</div>
                      <div className="text-[11px] text-slate-500 font-medium">{cand.targetRole} • ATS {cand.atsScore}%</div>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold text-blue-600 bg-white px-2 py-1 rounded border border-slate-200">
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
    </MainLayout>
  );
}

export default CandidateProfile;
