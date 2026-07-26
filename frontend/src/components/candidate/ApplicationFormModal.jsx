import React, { useState } from "react";
import Modal from "../ui/Modal";
import { FaFileUpload, FaCheckCircle, FaPaperPlane } from "react-icons/fa";
import { useUser } from "../../context/UserContext";

function ApplicationFormModal({ isOpen, onClose, job, onSubmitSuccess }) {
  const { candidateUser, addApplication } = useUser();

  const [formData, setFormData] = useState({
    name: candidateUser.name || "Sarah Chen",
    email: candidateUser.email || "sarah.chen@example.com",
    phone: candidateUser.phone || "+1 (555) 234-5678",
    linkedin: "https://linkedin.com/in/sarahchen",
    github: "https://github.com/sarahchen",
    portfolio: "https://sarahchendev.io",
    experienceYears: "6 Years",
    education: "B.S. in Computer Science (UC Berkeley)",
    skills: "React 19, TypeScript, Tailwind CSS, Next.js, Redux, GraphQL",
    coverLetter: "I am writing to express my strong interest in the " + (job?.title || "Frontend") + " position at " + (job?.company || "HireSmart AI") + ". With 6 years of experience architecting high-performance React design systems, I am excited about contributing to your team.",
    expectedSalary: "$150,000 - $170,000",
    availability: "2 Weeks Notice",
    resumeFileName: "Sarah_Chen_Resume_2026.pdf",
  });

  if (!isOpen || !job) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const newApp = {
      id: `app-${Date.now()}`,
      jobId: job.id,
      jobTitle: job.title,
      company: job.company || "HireSmart AI",
      location: job.location || "San Francisco, CA",
      salary: job.salaryRange || "$145,000 - $175,000",
      appliedDate: "Just now",
      status: "Application Submitted",
      stage: "Resume Screening",
      recruiter: "Tanya Bhadana",
      visibleToCandidate: true,
      feedback: null,
      rejectionReason: null,
    };

    addApplication(newApp);
    if (onSubmitSuccess) onSubmitSuccess(job.title);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Apply for ${job.title}`} maxWidth="max-w-2xl">
      <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
        {/* Job Header Summary */}
        <div className="p-3.5 bg-purple-50/70 rounded-xl border border-purple-200/80 flex items-center justify-between">
          <div>
            <h4 className="font-bold text-purple-950 text-xs">{job.title}</h4>
            <p className="text-[11px] text-purple-800 font-medium">
              {job.company || "HireSmart AI"} • {job.location} • {job.salaryRange || "$145,000 - $175,000"}
            </p>
          </div>
          <span className="px-2.5 py-1 text-[10px] font-bold bg-white text-purple-700 rounded border border-purple-200">
            {job.employmentType || "Full-Time"}
          </span>
        </div>

        {/* Resume Upload Box */}
        <div className="p-4 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl text-center space-y-2">
          <div className="w-9 h-9 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-sm mx-auto">
            <FaFileUpload />
          </div>
          <div className="space-y-0.5">
            <p className="font-bold text-slate-800 text-xs">
              {formData.resumeFileName ? `Uploaded: ${formData.resumeFileName}` : "Upload Resume / CV (PDF or DOCX)"}
            </p>
            <p className="text-[10px] text-slate-400 font-medium">
              HireSmart AI automated parser will parse contact & skills metadata
            </p>
          </div>
        </div>

        {/* Form Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-700 block">Full Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 font-medium focus:bg-white focus:border-purple-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-700 block">Email Address *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 font-medium focus:bg-white focus:border-purple-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-700 block">Phone Number *</label>
            <input
              type="text"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 font-medium focus:bg-white focus:border-purple-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-700 block">Years of Experience</label>
            <input
              type="text"
              value={formData.experienceYears}
              onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 font-medium focus:bg-white focus:border-purple-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-700 block">LinkedIn Profile URL</label>
            <input
              type="text"
              value={formData.linkedin}
              onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 font-medium focus:bg-white focus:border-purple-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-700 block">GitHub Profile URL</label>
            <input
              type="text"
              value={formData.github}
              onChange={(e) => setFormData({ ...formData, github: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 font-medium focus:bg-white focus:border-purple-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-700 block">Expected Compensation</label>
            <input
              type="text"
              value={formData.expectedSalary}
              onChange={(e) => setFormData({ ...formData, expectedSalary: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 font-medium focus:bg-white focus:border-purple-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-700 block">Availability / Notice Period</label>
            <input
              type="text"
              value={formData.availability}
              onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 font-medium focus:bg-white focus:border-purple-500"
            />
          </div>
        </div>

        {/* Core Skills & Cover Letter */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-700 block">Core Technical Skills</label>
          <input
            type="text"
            value={formData.skills}
            onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 font-medium focus:bg-white focus:border-purple-500"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-700 block">Cover Letter / Note to Recruiter</label>
          <textarea
            rows={3}
            value={formData.coverLetter}
            onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 font-medium focus:bg-white focus:border-purple-500 resize-y"
          />
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
          >
            <FaPaperPlane className="text-xs" />
            <span>Submit Application</span>
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default ApplicationFormModal;
