import React from "react";
import CandidateLayout from "../../components/layout/CandidateLayout";
import { FaCalendarAlt, FaVideo, FaUserTie, FaClock, FaCheckCircle } from "react-icons/fa";

function CandidateInterviews() {
  const interviews = [
    {
      id: "int-1",
      jobTitle: "Senior Lead Frontend Engineer",
      round: "Technical Deep-Dive Round",
      interviewer: "David Miller",
      interviewerRole: "Staff Frontend Architect",
      date: "Jul 27, 2026",
      time: "10:00 AM - 11:00 AM PST",
      status: "Scheduled",
      meetingUrl: "https://meet.google.com/abc-defg-hij",
      prepNotes: "Focus on React 19 micro-frontend design systems, state management, and performance optimization.",
    },
    {
      id: "int-2",
      jobTitle: "ML Engineer",
      round: "Initial Recruiter Screen",
      interviewer: "Tanya Bhadana",
      interviewerRole: "Senior Recruiter",
      date: "Jul 22, 2026",
      time: "02:00 PM - 02:30 PM PST",
      status: "Completed",
      meetingUrl: "https://meet.google.com/xyz-uvwx-rst",
      prepNotes: "Recruiter phone screen discussing background experience and HireSmart AI product vision.",
    },
  ];

  return (
    <CandidateLayout>
      <div className="space-y-6 max-w-[1600px] w-full mx-auto pb-16 font-sans">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              My Scheduled Interviews
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5 font-medium">
              View upcoming interview rounds, meeting video links, and interview prep guides.
            </p>
          </div>
        </div>

        {/* Interviews Cards Grid */}
        <div className="space-y-4">
          {interviews.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4 font-sans"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-base font-bold text-slate-900">{item.round}</h3>
                    <span
                      className={`px-2.5 py-0.5 text-xs font-bold rounded-md border ${
                        item.status === "Scheduled"
                          ? "bg-blue-50 text-blue-800 border-blue-200"
                          : "bg-emerald-50 text-emerald-800 border-emerald-200"
                      }`}
                    >
                      ● {item.status}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-purple-700">{item.jobTitle}</p>
                </div>

                {item.status === "Scheduled" && (
                  <a
                    href={item.meetingUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer flex items-center gap-2 shadow-2xs self-start md:self-auto"
                  >
                    <FaVideo className="text-xs" />
                    <span>Join Google Meet</span>
                  </a>
                )}
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-slate-400 font-semibold block text-[10px] uppercase">Interviewer</span>
                  <span className="font-bold text-slate-900">{item.interviewer}</span>
                  <span className="text-[10px] text-slate-500 block">{item.interviewerRole}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-slate-400 font-semibold block text-[10px] uppercase">Date & Time</span>
                  <span className="font-bold text-slate-900">{item.date}</span>
                  <span className="text-[10px] text-slate-500 font-mono block">{item.time}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-slate-400 font-semibold block text-[10px] uppercase">Platform Link</span>
                  <span className="font-bold text-blue-600 truncate block">{item.meetingUrl}</span>
                </div>
              </div>

              {/* Prep Guide Note */}
              <div className="p-3.5 bg-purple-50/70 border border-purple-200/80 rounded-xl text-xs text-purple-950 font-medium">
                <strong className="text-purple-900 block font-bold mb-0.5">Interview Prep Guide:</strong>
                "{item.prepNotes}"
              </div>
            </div>
          ))}
        </div>
      </div>
    </CandidateLayout>
  );
}

export default CandidateInterviews;
