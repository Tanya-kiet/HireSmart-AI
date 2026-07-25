import React, { useState, useMemo } from "react";
import MainLayout from "../components/layout/MainLayout";
import JobStats from "../components/jobs/JobStats";
import JobTable from "../components/jobs/JobTable";
import JobDrawer from "../components/jobs/JobDrawer";
import DeleteModal from "../components/jobs/DeleteModal";
import Alert from "../components/common/Alert";
import { mockJobs12 } from "../components/jobs/jobData";
import { FaPlus, FaSearch, FaTimes, FaUndo } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function JobDescriptions() {
  const navigate = useNavigate();
  const [jobsList, setJobsList] = useState(mockJobs12);

  // Quick Filter Pills: 'all', 'Open', 'Draft', 'Closed', 'Archived', 'my-jobs'
  const [quickFilter, setQuickFilter] = useState("all");

  // Search & Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [deptFilter, setDeptFilter] = useState("All Departments");
  const [locationFilter, setLocationFilter] = useState("All Locations");
  const [statusFilter, setStatusFilter] = useState("All Statuses");

  // Drawer / Modal states
  const [drawerJob, setDrawerJob] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [deleteJobTarget, setDeleteJobTarget] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [alert, setAlert] = useState(null);

  const departments = ["All Departments", "Engineering", "AI & Data", "Product", "Design"];
  const locations = ["All Locations", "San Francisco, CA", "New York, NY", "Austin, TX", "Seattle, WA"];
  const statuses = ["All Statuses", "Open", "Draft", "Closed", "Archived"];

  const quickFilterPills = [
    { id: "all", label: "All Requisitions" },
    { id: "Open", label: "Open" },
    { id: "Draft", label: "Draft" },
    { id: "Closed", label: "Closed" },
    { id: "Archived", label: "Archived" },
    { id: "my-jobs", label: "My Jobs" },
  ];

  // Filtering Logic
  const filteredJobs = useMemo(() => {
    let result = [...jobsList];

    // Quick Filter Pills
    if (quickFilter !== "all" && quickFilter !== "my-jobs") {
      result = result.filter((j) => j.status === quickFilter);
    } else if (quickFilter === "my-jobs") {
      result = result.filter((j) => j.hiringManager === "Alex Mercer" || j.recruiter === "Tanya Bhadana");
    }

    // Search Query
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

    if (deptFilter !== "All Departments") {
      result = result.filter((j) => j.department === deptFilter);
    }

    if (locationFilter !== "All Locations") {
      result = result.filter((j) => j.location === locationFilter);
    }

    if (statusFilter !== "All Statuses") {
      result = result.filter((j) => j.status === statusFilter);
    }

    return result;
  }, [jobsList, quickFilter, searchTerm, deptFilter, locationFilter, statusFilter]);

  const handleCreateJob = () => {
    setDrawerJob(null);
    setIsDrawerOpen(true);
  };

  const handleEditJob = (job) => {
    setDrawerJob(job);
    setIsDrawerOpen(true);
  };

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

  const handleDuplicateJob = (job) => {
    const duplicated = {
      ...job,
      id: `job-${Date.now()}`,
      title: `${job.title} (Copy)`,
      applications: 0,
      lastUpdated: "Just now",
    };
    setJobsList((prev) => [duplicated, ...prev]);
    setAlert({
      type: "success",
      title: "Job Duplicated",
      message: `Duplicated requisition '${job.title}'.`,
    });
  };

  const handleToggleStatus = (job) => {
    const newStatus = job.status === "Open" ? "Archived" : "Open";
    setJobsList((prev) =>
      prev.map((j) => (j.id === job.id ? { ...j, status: newStatus } : j))
    );
    setAlert({
      type: "info",
      title: "Job Status Updated",
      message: `'${job.title}' status set to '${newStatus}'.`,
    });
  };

  const handleDeleteJob = (job) => {
    setDeleteJobTarget(job);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!deleteJobTarget) return;
    setJobsList((prev) => prev.filter((j) => j.id !== deleteJobTarget.id));
    setIsDeleteModalOpen(false);
    setAlert({
      type: "success",
      title: "Job Deleted",
      message: `Removed requisition '${deleteJobTarget.title}'.`,
    });
    setDeleteJobTarget(null);
  };

  return (
    <MainLayout>
      <div className="space-y-5 max-w-7xl mx-auto pb-16 font-sans">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Jobs
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5 font-medium">
              Manage active openings and hiring progress.
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

        {/* Toast Alert */}
        {alert && (
          <Alert
            type={alert.type}
            title={alert.title}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}

        {/* Top 3 KPI Stats */}
        <JobStats
          totalJobs={jobsList.filter((j) => j.status === "Open").length}
          totalApps={1420}
          scheduledInterviews={420}
        />

        {/* Quick Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {quickFilterPills.map((pill) => (
            <button
              key={pill.id}
              onClick={() => setQuickFilter(pill.id)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer border shrink-0 ${
                quickFilter === pill.id
                  ? "bg-slate-900 text-white border-slate-900 shadow-2xs"
                  : "bg-white text-slate-700 hover:bg-slate-50 border-slate-200"
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>

        {/* Search & Compact Filters Bar */}
        <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-xs font-sans">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 text-xs">
            {/* Search Jobs Input */}
            <div className="relative flex-1">
              <FaSearch className="absolute left-3.5 top-3 text-slate-400 text-xs" />
              <input
                type="text"
                placeholder="Search Jobs by title, department, or location..."
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

            {/* Dropdown Filters */}
            <div className="flex flex-wrap items-center gap-2">
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

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold rounded-lg px-2.5 py-2 focus:outline-none cursor-pointer"
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Main Job Table View */}
        <JobTable
          jobs={filteredJobs}
          onEdit={handleEditJob}
          onDuplicate={handleDuplicateJob}
          onToggleStatus={handleToggleStatus}
          onDelete={handleDeleteJob}
        />

        {/* Slide-over Create/Edit Job Panel */}
        <JobDrawer
          job={drawerJob}
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          onSave={handleSaveJob}
        />

        {/* Delete Modal */}
        <DeleteModal
          job={deleteJobTarget}
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
        />
      </div>
    </MainLayout>
  );
}

export default JobDescriptions;
