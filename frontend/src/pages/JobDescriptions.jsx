import React, { useState, useMemo } from "react";
import MainLayout from "../components/layout/MainLayout";
import JobStats from "../components/jobs/JobStats";
import JobTable from "../components/jobs/JobTable";
import JobDrawer from "../components/jobs/JobDrawer";
import CloseJobModal from "../components/jobs/CloseJobModal";
import DeleteModal from "../components/jobs/DeleteModal";
import Alert from "../components/common/Alert";
import { mockJobs18 } from "../components/jobs/jobData";
import { FaPlus, FaSearch, FaTimes, FaUndo } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import Breadcrumbs from "../components/common/Breadcrumbs";

function JobDescriptions() {
  const navigate = useNavigate();

  // Unified Single Job Dataset State (18 Requisitions)
  const [jobsList, setJobsList] = useState(mockJobs18);

  // 5 Working Tabs: 'all', 'Open', 'Draft', 'Closed', 'Archived'
  const [activeTab, setActiveTab] = useState("all");

  // Search, Filters & Sorting
  const [searchTerm, setSearchTerm] = useState("");
  const [deptFilter, setDeptFilter] = useState("All Departments");
  const [locationFilter, setLocationFilter] = useState("All Locations");
  const [sortBy, setSortBy] = useState("newest"); // 'newest', 'oldest', 'most-applicants', 'highest-match', 'alphabetical'

  // Drawer & Modal States
  const [drawerJob, setDrawerJob] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [closeTargetJob, setCloseTargetJob] = useState(null);
  const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);
  const [deleteTargetJob, setDeleteTargetJob] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [alert, setAlert] = useState(null);

  const departments = ["All Departments", "Engineering", "AI & Data", "Product", "Design", "Operations", "Sales", "Talent Acquisition"];
  const locations = ["All Locations", "San Francisco, CA", "New York, NY", "Austin, TX", "Seattle, WA", "Boston, MA", "Denver, CO", "Remote"];

  // Tab Definitions with Live Badge Counts
  const tabs = useMemo(() => {
    return [
      { id: "all", label: "All Jobs", count: jobsList.length },
      { id: "Open", label: "Open Jobs", count: jobsList.filter((j) => j.status === "Open").length },
      { id: "Draft", label: "Draft Jobs", count: jobsList.filter((j) => j.status === "Draft").length },
      { id: "Closed", label: "Closed Jobs", count: jobsList.filter((j) => j.status === "Closed").length },
      { id: "Archived", label: "Archived Jobs", count: jobsList.filter((j) => j.status === "Archived").length },
    ];
  }, [jobsList]);

  // Tab-Scoped Filtering & Sorting Logic
  const filteredJobs = useMemo(() => {
    let result = [...jobsList];

    // 1. Filter by Active Tab
    if (activeTab !== "all") {
      result = result.filter((j) => j.status === activeTab);
    }

    // 2. Search Query (within active tab)
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.department.toLowerCase().includes(q) ||
          j.location.toLowerCase().includes(q) ||
          (j.skills && j.skills.some((s) => s.toLowerCase().includes(q)))
      );
    }

    // 3. Department Filter
    if (deptFilter !== "All Departments") {
      result = result.filter((j) => j.department === deptFilter);
    }

    // 4. Location Filter
    if (locationFilter !== "All Locations") {
      result = result.filter((j) => j.location.includes(locationFilter.replace(", CA", "").replace(", NY", "")));
    }

    // 5. Sorting
    result.sort((a, b) => {
      if (sortBy === "newest") return b.id.localeCompare(a.id);
      if (sortBy === "oldest") return a.id.localeCompare(b.id);
      if (sortBy === "most-applicants") return (b.applications || 0) - (a.applications || 0);
      if (sortBy === "highest-match") return (b.matchScore || 0) - (a.matchScore || 0);
      if (sortBy === "alphabetical") return a.title.localeCompare(b.title);
      return 0;
    });

    return result;
  }, [jobsList, activeTab, searchTerm, deptFilter, locationFilter, sortBy]);

  // Handler: Create Job
  const handleCreateJob = () => {
    setDrawerJob(null);
    setIsDrawerOpen(true);
  };

  // Handler: Edit Job
  const handleEditJob = (job) => {
    setDrawerJob(job);
    setIsDrawerOpen(true);
  };

  // Handler: Save Job
  const handleSaveJob = (savedJob) => {
    setJobsList((prev) => {
      const exists = prev.some((j) => j.id === savedJob.id);
      if (exists) {
        return prev.map((j) => (j.id === savedJob.id ? savedJob : j));
      }
      return [savedJob, ...prev];
    });

    setAlert({
      type: "success",
      title: "Requisition Saved",
      message: `'${savedJob.title}' position saved successfully.`,
    });
  };

  // Handler: Duplicate Job
  const handleDuplicateJob = (job) => {
    const duplicated = {
      ...job,
      id: `job-${Date.now()}`,
      title: `${job.title} (Copy)`,
      applications: 0,
      status: "Draft",
      note: "This role has not been published yet.",
      lastUpdated: "Just now",
    };
    setJobsList((prev) => [duplicated, ...prev]);
    setAlert({
      type: "success",
      title: "Job Duplicated",
      message: `Duplicated requisition '${job.title}' into Drafts.`,
    });
  };

  // Handler: Publish Draft → Open
  const handlePublishDraft = (job) => {
    setJobsList((prev) =>
      prev.map((j) => (j.id === job.id ? { ...j, status: "Open", note: undefined, lastUpdated: "Just now" } : j))
    );
    setAlert({
      type: "success",
      title: "Position Published",
      message: `Published '${job.title}'. Role is now open for candidate applications.`,
    });
  };

  // Handler: Open Close Modal
  const handleOpenCloseModal = (job) => {
    setCloseTargetJob(job);
    setIsCloseModalOpen(true);
  };

  // Handler: Confirm Close Position (Open → Closed)
  const handleConfirmClosePosition = () => {
    if (!closeTargetJob) return;
    setJobsList((prev) =>
      prev.map((j) =>
        j.id === closeTargetJob.id
          ? { ...j, status: "Closed", note: "Hiring Completed • Offer Accepted", lastUpdated: "Just now" }
          : j
      )
    );
    setIsCloseModalOpen(false);
    setAlert({
      type: "info",
      title: "Position Closed",
      message: `Closed position '${closeTargetJob.title}'. Hiring marked as complete.`,
    });
    setCloseTargetJob(null);
  };

  // Handler: Archive (Closed → Archived)
  const handleArchiveJob = (job) => {
    setJobsList((prev) =>
      prev.map((j) =>
        j.id === job.id
          ? { ...j, status: "Archived", note: "Archived position stored for reference.", lastUpdated: "Just now" }
          : j
      )
    );
    setAlert({
      type: "info",
      title: "Job Archived",
      message: `Archived requisition '${job.title}'. Stored in reference archive.`,
    });
  };

  // Handler: Restore (Archived → Closed)
  const handleRestoreJob = (job) => {
    setJobsList((prev) =>
      prev.map((j) =>
        j.id === job.id
          ? { ...j, status: "Closed", note: "Hiring Completed • Offer Accepted", lastUpdated: "Just now" }
          : j
      )
    );
    setAlert({
      type: "success",
      title: "Job Restored",
      message: `Restored '${job.title}' back to Closed Requisitions.`,
    });
  };

  // Handler: Open Delete Modal
  const handleDeleteJob = (job) => {
    setDeleteTargetJob(job);
    setIsDeleteModalOpen(true);
  };

  // Handler: Confirm Delete
  const handleConfirmDelete = () => {
    if (!deleteTargetJob) return;
    setJobsList((prev) => prev.filter((j) => j.id !== deleteTargetJob.id));
    setIsDeleteModalOpen(false);
    setAlert({
      type: "success",
      title: "Job Deleted",
      message: `Removed requisition '${deleteTargetJob.title}' from system.`,
    });
    setDeleteTargetJob(null);
  };

  return (
    <MainLayout>
      <div className="space-y-5 max-w-[1600px] w-full mx-auto pb-16 font-sans">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs />
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Jobs Management
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5 font-medium">
              Manage active openings, drafts, closed roles, and hiring requisitions across your organization.
            </p>
          </div>

          <button
            onClick={handleCreateJob}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs self-start sm:self-auto"
          >
            <FaPlus className="text-xs" />
            <span>Create Job</span>
          </button>
        </div>

        {/* Global Toast Alert */}
        {alert && (
          <Alert
            type={alert.type}
            title={alert.title}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}

        {/* Dynamic Summary Cards */}
        <JobStats jobsList={jobsList} activeTab={activeTab} />

        {/* 5 Working Clickable Status Tabs */}
        <div className="bg-white p-1.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-1 overflow-x-auto">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
                  isActive
                    ? "bg-slate-900 text-white shadow-2xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`px-1.5 py-0.2 text-[10px] font-mono font-bold rounded ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 text-slate-700 border border-slate-200"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search & Compact Filters Bar */}
        <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-xs font-sans space-y-3">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 text-xs">
            {/* Search Input (Scoped to active tab) */}
            <div className="relative flex-1">
              <FaSearch className="absolute left-3.5 top-3 text-slate-400 text-xs" />
              <input
                type="text"
                placeholder={`Search ${activeTab === "all" ? "all" : activeTab.toLowerCase()} jobs by title, department, location...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white font-medium placeholder-slate-400"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-2.5 p-1 text-slate-400 hover:text-slate-600 rounded-md"
                >
                  <FaTimes className="text-xs" />
                </button>
              )}
            </div>

            {/* Sorting & Dropdown Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold rounded-lg px-2.5 py-2 focus:outline-none cursor-pointer"
              >
                <option value="newest">Sort: Newest Requisitions</option>
                <option value="oldest">Sort: Oldest Requisitions</option>
                <option value="most-applicants">Sort: Most Applicants</option>
                <option value="highest-match">Sort: Highest Match Score</option>
                <option value="alphabetical">Sort: Alphabetical (A-Z)</option>
              </select>

              <select
                value={deptFilter}
                onChange={(e) => setDeptFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold rounded-lg px-2.5 py-2 focus:outline-none cursor-pointer"
              >
                {departments.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>

              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold rounded-lg px-2.5 py-2 focus:outline-none cursor-pointer"
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Job Table Component */}
        <JobTable
          jobs={filteredJobs}
          activeTab={activeTab}
          onEdit={handleEditJob}
          onDuplicate={handleDuplicateJob}
          onPublish={handlePublishDraft}
          onClosePosition={handleOpenCloseModal}
          onArchive={handleArchiveJob}
          onRestore={handleRestoreJob}
          onDelete={handleDeleteJob}
        />

        {/* Slide-over Create/Edit Job Drawer */}
        <JobDrawer
          job={drawerJob}
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          onSave={handleSaveJob}
        />

        {/* Close Position Confirmation Modal */}
        <CloseJobModal
          isOpen={isCloseModalOpen}
          onClose={() => setIsCloseModalOpen(false)}
          onConfirm={handleConfirmClosePosition}
          jobTitle={closeTargetJob?.title || ""}
        />

        {/* Delete Confirmation Modal */}
        <DeleteModal
          job={deleteTargetJob}
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
        />
      </div>
    </MainLayout>
  );
}

export default JobDescriptions;
