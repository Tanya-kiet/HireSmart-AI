import React, { useState, useEffect } from "react";
import { FaTimes, FaCheck, FaBriefcase } from "react-icons/fa";

function JobDrawer({ job, isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: "",
    department: "Engineering",
    location: "San Francisco, CA",
    employmentType: "Full-time",
    workType: "Hybrid",
    salaryRange: "$150,000 - $180,000",
    description: "",
    skillsStr: "React 19, TypeScript, FastAPI",
    hiringManager: "Alex Mercer",
    status: "Open",
  });

  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title || "",
        department: job.department || "Engineering",
        location: job.location || "San Francisco, CA",
        employmentType: job.employmentType || "Full-time",
        workType: job.workType || "Hybrid",
        salaryRange: job.salaryRange || "$150,000 - $180,000",
        description: job.description || "",
        skillsStr: Array.isArray(job.skills) ? job.skills.join(", ") : "React 19, TypeScript, FastAPI",
        hiringManager: job.hiringManager || "Alex Mercer",
        status: job.status || "Open",
      });
    } else {
      setFormData({
        title: "",
        department: "Engineering",
        location: "San Francisco, CA",
        employmentType: "Full-time",
        workType: "Hybrid",
        salaryRange: "$150,000 - $180,000",
        description: "",
        skillsStr: "React 19, TypeScript, FastAPI",
        hiringManager: "Alex Mercer",
        status: "Open",
      });
    }
  }, [job, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const skills = formData.skillsStr.split(",").map((s) => s.trim()).filter(Boolean);

    const savedJob = {
      id: job ? job.id : `job-${Date.now()}`,
      title: formData.title,
      department: formData.department,
      location: formData.location,
      employmentType: formData.employmentType,
      workType: formData.workType,
      salaryRange: formData.salaryRange,
      description: formData.description,
      skills,
      hiringManager: formData.hiringManager,
      status: formData.status,
      applications: job ? job.applications : 0,
      createdDate: "Jul 25, 2026",
      lastUpdated: "Just now",
      aiTag: "High Match Pool",
    };

    onSave(savedJob);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans animate-fade-in">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs transition-opacity cursor-pointer"
        onClick={onClose}
      />

      {/* Slide-over Panel Container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl border-l border-slate-200 flex flex-col justify-between overflow-hidden">
          {/* Header */}
          <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-xs">
                <FaBriefcase />
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-tight text-white">
                  {job ? "Edit Requisition" : "Create New Job Requisition"}
                </h3>
                <p className="text-[10px] text-slate-400 font-medium">
                  {job ? "Modify position details" : "Add position to active hiring queue"}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              <FaTimes className="text-sm" />
            </button>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 space-y-4 text-xs bg-slate-50">
            {/* Title */}
            <div className="space-y-1">
              <label className="font-bold text-slate-800 uppercase tracking-wider text-[10px] block">
                Job Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Senior Lead Frontend Engineer"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Department & Location */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-bold text-slate-800 uppercase tracking-wider text-[10px] block">
                  Department
                </label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none cursor-pointer"
                >
                  <option value="Engineering">Engineering</option>
                  <option value="AI & Data">AI & Data</option>
                  <option value="Product">Product</option>
                  <option value="Design">Design</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-800 uppercase tracking-wider text-[10px] block">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. San Francisco, CA"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none"
                />
              </div>
            </div>

            {/* Employment Type & Salary */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-bold text-slate-800 uppercase tracking-wider text-[10px] block">
                  Employment Type
                </label>
                <select
                  value={formData.employmentType}
                  onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none cursor-pointer"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Part-time">Part-time</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-800 uppercase tracking-wider text-[10px] block">
                  Salary Range
                </label>
                <input
                  type="text"
                  placeholder="e.g. $150k - $180k"
                  value={formData.salaryRange}
                  onChange={(e) => setFormData({ ...formData, salaryRange: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none"
                />
              </div>
            </div>

            {/* Hiring Manager */}
            <div className="space-y-1">
              <label className="font-bold text-slate-800 uppercase tracking-wider text-[10px] block">
                Hiring Manager
              </label>
              <input
                type="text"
                placeholder="e.g. Alex Mercer"
                value={formData.hiringManager}
                onChange={(e) => setFormData({ ...formData, hiringManager: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none"
              />
            </div>

            {/* Required Skills */}
            <div className="space-y-1">
              <label className="font-bold text-slate-800 uppercase tracking-wider text-[10px] block">
                Required Skills (Comma separated)
              </label>
              <input
                type="text"
                placeholder="React 19, TypeScript, FastAPI, PostgreSQL"
                value={formData.skillsStr}
                onChange={(e) => setFormData({ ...formData, skillsStr: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none"
              />
            </div>

            {/* Description */}
            <div className="space-y-1">
              <label className="font-bold text-slate-800 uppercase tracking-wider text-[10px] block">
                Job Overview & Requirements
              </label>
              <textarea
                rows={4}
                placeholder="Describe role responsibilities, team structure, and qualifications..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-900 focus:outline-none"
              />
            </div>
          </form>

          {/* Footer Actions */}
          <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-end gap-2 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
            >
              <FaCheck className="text-xs" />
              <span>{job ? "Save Changes" : "Create Position"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDrawer;
