import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import PipelineStats from "../components/pipeline/PipelineStats";
import SmartFilters from "../components/pipeline/SmartFilters";
import PipelineBoard from "../components/pipeline/PipelineBoard";
import RecruitmentInsights from "../components/pipeline/RecruitmentInsights";
import BulkToolbar from "../components/pipeline/BulkToolbar";
import ActivityFeed from "../components/pipeline/ActivityFeed";
import Alert from "../components/common/Alert";
import { mockPipelineData } from "../components/pipeline/pipelineData";
import { mockJobs12 } from "../components/jobs/jobData";
import {
  FaSlidersH,
  FaRobot,
  FaPlus,
  FaUpload,
  FaCalendarPlus,
  FaSearch,
  FaBriefcase,
  FaHistory,
} from "react-icons/fa";

function MasterPipeline() {
  const navigate = useNavigate();
  const [pipelineData, setPipelineData] = useState(mockPipelineData);
  const [activeTab, setActiveTab] = useState("board"); // 'board' | 'intelligence' | 'activity'

  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [jobFilter, setJobFilter] = useState("All Jobs");
  const [deptFilter, setDeptFilter] = useState("All Departments");
  const [recruiterFilter, setRecruiterFilter] = useState("All Recruiters");
  const [activeSmartView, setActiveSmartView] = useState("all");

  // Selection & Alerts
  const [selectedCandidateIds, setSelectedCandidateIds] = useState([]);
  const [alert, setAlert] = useState(null);

  // Filtering Logic
  const filteredCandidates = useMemo(() => {
    let result = [...pipelineData.candidates];

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.role.toLowerCase().includes(q) ||
          c.appliedJobTitle.toLowerCase().includes(q) ||
          c.recruiter.toLowerCase().includes(q)
      );
    }

    if (jobFilter !== "All Jobs") {
      result = result.filter((c) => c.appliedJobId === jobFilter);
    }

    if (deptFilter !== "All Departments") {
      result = result.filter((c) => c.department === deptFilter);
    }

    if (recruiterFilter !== "All Recruiters") {
      result = result.filter((c) => c.recruiter === recruiterFilter);
    }

    // Smart View Presets
    if (activeSmartView === "needs-review") {
      result = result.filter((c) => c.needsReview);
    } else if (activeSmartView === "waiting-7-days") {
      result = result.filter((c) => c.stuckTooLong);
    } else if (activeSmartView === "interviews-today") {
      result = result.filter((c) => c.interviewToday);
    } else if (activeSmartView === "offers-pending") {
      result = result.filter((c) => c.stage === "Offer");
    } else if (activeSmartView === "high-match") {
      result = result.filter((c) => c.matchScore >= 90);
    }

    return result;
  }, [
    pipelineData.candidates,
    searchTerm,
    jobFilter,
    deptFilter,
    recruiterFilter,
    activeSmartView,
  ]);

  // Stage Move Handler
  const handleUpdateCandidateStage = (candidateId, newStage) => {
    setPipelineData((prev) => ({
      ...prev,
      candidates: prev.candidates.map((c) =>
        c.id === candidateId ? { ...c, stage: newStage, daysInStage: 0 } : c
      ),
    }));

    setAlert({
      type: "success",
      title: "Stage Updated",
      message: `Candidate stage moved to "${newStage}".`,
    });
  };

  // Selection toggle
  const handleToggleSelectCandidate = (candidateId) => {
    if (selectedCandidateIds.includes(candidateId)) {
      setSelectedCandidateIds(selectedCandidateIds.filter((i) => i !== candidateId));
    } else {
      setSelectedCandidateIds([...selectedCandidateIds, candidateId]);
    }
  };

  // Bulk Actions
  const handleBulkMoveStage = () => {
    setAlert({
      type: "info",
      title: "Bulk Stage Update",
      message: `Moved ${selectedCandidateIds.length} candidates to next review stage.`,
    });
    setSelectedCandidateIds([]);
  };

  const handleBulkReject = () => {
    setPipelineData((prev) => ({
      ...prev,
      candidates: prev.candidates.map((c) =>
        selectedCandidateIds.includes(c.id) ? { ...c, stage: "Rejected" } : c
      ),
    }));
    setAlert({
      type: "error",
      title: "Bulk Candidates Rejected",
      message: `Moved ${selectedCandidateIds.length} candidates to Rejected stage.`,
    });
    setSelectedCandidateIds([]);
  };

  const handleBulkSchedule = () => {
    navigate("/interviews");
  };

  const handleBulkAssign = () => {
    setAlert({
      type: "success",
      title: "Recruiter Assigned",
      message: `Assigned Tanya Bhadana as lead recruiter for ${selectedCandidateIds.length} candidates.`,
    });
    setSelectedCandidateIds([]);
  };

  const handleBulkExport = () => {
    setAlert({
      type: "info",
      title: "Export Started",
      message: `Exported ${selectedCandidateIds.length} candidate profiles to CSV dossier.`,
    });
    setSelectedCandidateIds([]);
  };

  const handleBulkEmail = () => {
    setAlert({
      type: "success",
      title: "Bulk Email Dispatched",
      message: `Sent status update email to ${selectedCandidateIds.length} candidates.`,
    });
    setSelectedCandidateIds([]);
  };

  return (
    <MainLayout>
      <div className="space-y-6 max-w-[1600px] mx-auto pb-16 font-sans">
        {/* Page Header Bar & Quick Command Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                Master Recruitment Pipeline
              </h1>
              <span className="px-2.5 py-0.5 text-xs font-bold bg-blue-50 text-blue-700 rounded-full border border-blue-200">
                Company-Wide Command Centre
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
              Operational hiring control panel across every active job requisition in the company.
            </p>
          </div>

          {/* Quick Command Bar */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => navigate("/jobs")}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs transition-colors cursor-pointer flex items-center gap-1.5 border border-slate-200"
            >
              <FaBriefcase className="text-xs text-slate-600" />
              <span>Create Job</span>
            </button>

            <button
              onClick={() => navigate("/upload")}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
            >
              <FaUpload className="text-xs" />
              <span>Upload Resumes</span>
            </button>

            <button
              onClick={() => navigate("/interviews")}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
            >
              <FaCalendarPlus className="text-xs" />
              <span>Schedule Interview</span>
            </button>
          </div>
        </div>

        {/* Global Toast Alerts */}
        {alert && (
          <Alert
            type={alert.type}
            title={alert.title}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}

        {/* Executive KPI Stats Bar */}
        <PipelineStats stats={pipelineData.stats} />

        {/* Sticky Filters & Smart View Presets */}
        <SmartFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          jobFilter={jobFilter}
          onJobFilterChange={setJobFilter}
          deptFilter={deptFilter}
          onDeptFilterChange={setDeptFilter}
          recruiterFilter={recruiterFilter}
          onRecruiterFilterChange={setRecruiterFilter}
          activeSmartView={activeSmartView}
          onSmartViewSelect={setActiveSmartView}
          jobsList={mockJobs12}
        />

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-2xl border border-slate-200 shadow-2xs w-fit">
          <button
            onClick={() => setActiveTab("board")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "board"
                ? "bg-blue-600 text-white shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <FaSlidersH className="text-xs" />
            <span>Master 9-Stage Kanban Board</span>
          </button>

          <button
            onClick={() => setActiveTab("intelligence")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "intelligence"
                ? "bg-blue-600 text-white shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <FaRobot className="text-xs" />
            <span>Recruitment Intelligence & Bottlenecks</span>
          </button>

          <button
            onClick={() => setActiveTab("activity")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "activity"
                ? "bg-blue-600 text-white shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <FaHistory className="text-xs" />
            <span>Company Activity Feed</span>
          </button>
        </div>

        {/* TAB 1: MASTER 9-STAGE KANBAN BOARD */}
        {activeTab === "board" && (
          <PipelineBoard
            candidates={filteredCandidates}
            stageMetrics={pipelineData.stageMetrics}
            onUpdateCandidateStage={handleUpdateCandidateStage}
            selectedIds={selectedCandidateIds}
            onToggleSelect={handleToggleSelectCandidate}
          />
        )}

        {/* TAB 2: RECRUITMENT INTELLIGENCE */}
        {activeTab === "intelligence" && (
          <RecruitmentInsights intelligence={pipelineData.intelligence} />
        )}

        {/* TAB 3: ACTIVITY FEED */}
        {activeTab === "activity" && (
          <ActivityFeed activityStream={pipelineData.activityStream} />
        )}

        {/* Floating Bulk Operations Toolbar */}
        <BulkToolbar
          selectedCount={selectedCandidateIds.length}
          onClearSelection={() => setSelectedCandidateIds([])}
          onBulkMoveStage={handleBulkMoveStage}
          onBulkReject={handleBulkReject}
          onBulkSchedule={handleBulkSchedule}
          onBulkAssign={handleBulkAssign}
          onBulkExport={handleBulkExport}
          onBulkEmail={handleBulkEmail}
        />
      </div>
    </MainLayout>
  );
}

export default MasterPipeline;
