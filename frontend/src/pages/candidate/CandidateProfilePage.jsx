import React from "react";
import CandidateLayout from "../../components/layout/CandidateLayout";
import { useUser } from "../../context/UserContext";
import {
  FaUser,
  FaFileAlt,
  FaTools,
  FaFolderOpen,
  FaGraduationCap,
  FaBriefcase,
  FaCertificate,
  FaCheckCircle,
} from "react-icons/fa";

function CandidateProfilePage() {
  const { candidateUser, candidateApplications } = useUser();

  return (
    <CandidateLayout>
      <div className="space-y-6 max-w-[1600px] w-full mx-auto pb-16 font-sans">
        {/* Candidate Header Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-purple-600 text-white font-black text-2xl flex items-center justify-center border border-purple-400/30">
              {candidateUser.name.split(" ").map((n) => n[0]).join("")}
            </div>

            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                {candidateUser.name}
              </h1>
              <p className="text-xs font-bold text-purple-700">
                {candidateUser.role} • <span className="text-slate-500 font-medium">{candidateUser.location}</span>
              </p>
              <p className="text-xs text-slate-500 font-medium mt-1">
                {candidateUser.email} • {candidateUser.phone}
              </p>
            </div>
          </div>
        </div>

        {/* 2-Column Profile Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (8/12) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Professional Summary */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 shadow-2xs">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
                Professional Summary
              </h3>
              <p className="text-xs text-slate-700 font-medium leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                {candidateUser.summary}
              </p>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 shadow-2xs">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
                Skills & Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {candidateUser.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-purple-50 text-purple-900 font-bold rounded-xl border border-purple-200 text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Work Experience */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-2xs">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
                Work Experience
              </h3>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900">Lead Frontend Engineer</h4>
                  <span className="font-bold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">2023 - Present</span>
                </div>
                <p className="font-semibold text-slate-600">Veloce SaaS Systems • San Francisco, CA</p>
                <p className="text-slate-600 font-medium leading-relaxed pt-1">
                  Architected React 19 micro-frontend design system serving 2M+ active users. Reduced bundle load time by 42%.
                </p>
              </div>
            </div>

            {/* Education */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-2xs">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
                Education
              </h3>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1 text-xs">
                <h4 className="font-bold text-slate-900">B.S. in Computer Science</h4>
                <p className="text-slate-600 font-semibold">University of California, Berkeley • 2016 - 2020</p>
                <p className="text-emerald-700 font-bold">3.85 GPA • Magna Cum Laude</p>
              </div>
            </div>
          </div>

          {/* Right Column (4/12): Quick Stats & Applied Jobs Overview */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-2xs">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2">
                My Applied Applications
              </h3>

              <div className="space-y-3">
                {candidateApplications.map((app) => (
                  <div key={app.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1 text-xs">
                    <div className="font-bold text-slate-900">{app.jobTitle}</div>
                    <div className="text-slate-500 font-medium">{app.company} • {app.status}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </CandidateLayout>
  );
}

export default CandidateProfilePage;
