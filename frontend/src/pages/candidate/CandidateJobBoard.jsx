import React, { useState, useMemo } from "react";
import CandidateLayout from "../../components/layout/CandidateLayout";
import ApplicationFormModal from "../../components/candidate/ApplicationFormModal";
import Alert from "../../components/common/Alert";
import { mockJobs18 } from "../../components/jobs/jobData";
import {
  FaSearch,
  FaBriefcase,
  FaMapMarkerAlt,
  FaDollarSign,
  FaClock,
  FaCheck,
  FaArrowRight,
  FaPaperPlane,
} from "react-icons/fa";

function CandidateJobBoard() {
  const [jobsList] = useState(() => mockJobs18.filter((j) => j.status === "Open"));
  const [searchTerm, setSearchTerm] = useState("");
  const [deptFilter, setDeptFilter] = useState("All Departments");
  const [locationFilter, setLocationFilter] = useState("All Locations");

  const [selectedApplyJob, setSelectedApplyJob] = useState(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [alert, setAlert] = useState(null);

  const departments = ["All Departments", "Engineering", "AI & Data", "Product", "Design", "Operations"];
  const locations = ["All Locations", "San Francisco, CA", "New York, NY", "Austin, TX", "Seattle, WA", "Boston, MA", "Denver, CO", "Remote"];

  const filteredJobs = useMemo(() => {
    let result = [...jobsList];

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
      result = result.filter((j) => j.location.includes(locationFilter.replace(", CA", "").replace(", NY", "")));
    }

    return result;
  }, [jobsList, searchTerm, deptFilter, locationFilter]);

  const handleOpenApplyModal = (job) => {
    setSelectedApplyJob(job);
    setIsApplyModalOpen(true);
  };

  const handleApplicationSuccess = (jobTitle) => {
    setAlert({
      type: "success",
      title: "Application Submitted Successfully!",
      message: `Your application for '${jobTitle}' has been submitted to talent acquisition. Track progress under 'My Applications'.`,
    });
  };

  return (
    <CandidateLayout>
      <div className="space-y-6 max-w-[1600px] w-full mx-auto pb-16 font-sans">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white rounded-3xl p-8 shadow-xl space-y-3 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 z-10 relative">
            <div>
              <span className="px-3 py-1 text-[11px] font-bold bg-purple-500/20 text-purple-300 rounded-full border border-purple-400/30 uppercase tracking-wider font-mono">
                Candidate Job Board
              </span>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight mt-2">
                Discover & Apply for Enterprise Tech Openings
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-2xl leading-relaxed mt-1">
                Explore active openings across engineering, AI research, design, and product squads. Direct application tracking.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10 text-center shrink-0">
              <span className="text-2xl font-black text-white font-mono block">
                {jobsList.length}
              </span>
              <span className="text-[10px] font-bold text-purple-200 uppercase tracking-wider block">
                Active Openings
              </span>
            </div>
          </div>
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

        {/* Search & Filters Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 text-xs">
            <div className="relative flex-1">
              <FaSearch className="absolute left-3.5 top-3 text-slate-400 text-xs" />
              <input
                type="text"
                placeholder="Search openings by job title, skill keywords (React, Python, AWS), location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-purple-500 focus:bg-white font-medium"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={deptFilter}
                onChange={(e) => setDeptFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none cursor-pointer"
              >
                {departments.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>

              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none cursor-pointer"
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Job Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-purple-300 p-6 shadow-2xs space-y-4 flex flex-col justify-between transition-all duration-200 hover:shadow-md group"
            >
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-xs font-semibold text-slate-600">
                      {job.company || "HireSmart AI"} • <span className="text-slate-500 font-medium">{job.department}</span>
                    </p>
                  </div>

                  <span className="px-2.5 py-0.5 text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-md">
                    ● Actively Hiring
                  </span>
                </div>

                {/* Job Metadata Chips */}
                <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-slate-600 font-medium">
                  <span className="flex items-center gap-1">
                    <FaMapMarkerAlt className="text-slate-400 text-xs" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaDollarSign className="text-slate-400 text-xs" />
                    {job.salaryRange || "$145,000 - $175,000"}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaBriefcase className="text-slate-400 text-xs" />
                    {job.experience || "5-7 Years"}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaClock className="text-slate-400 text-xs" />
                    {job.employmentType || "Full-Time"}
                  </span>
                </div>

                {/* AI Summary / Description */}
                <p className="text-xs text-slate-600 font-medium leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {job.aiSummary || job.description || "Architect high-performance software applications and collaborate with cross-functional engineering squads."}
                </p>

                {/* Required Skills Chips */}
                <div className="flex flex-wrap gap-1.5">
                  {(job.skills || []).map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2 py-0.5 text-[10px] font-semibold bg-purple-50 text-purple-900 rounded-md border border-purple-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-slate-400">
                  Posted {job.createdDate || "Jul 15, 2026"}
                </span>

                <button
                  onClick={() => handleOpenApplyModal(job)}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
                >
                  <FaPaperPlane className="text-xs" />
                  <span>Apply Now</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Application Form Modal */}
        <ApplicationFormModal
          isOpen={isApplyModalOpen}
          onClose={() => setIsApplyModalOpen(false)}
          job={selectedApplyJob}
          onSubmitSuccess={handleApplicationSuccess}
        />
      </div>
    </CandidateLayout>
  );
}

export default CandidateJobBoard;
