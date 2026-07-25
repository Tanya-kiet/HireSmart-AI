import React, { useState } from "react";
import Button from "../common/Button";
import { FaTimes, FaCalendarPlus, FaVideo } from "react-icons/fa";

function ScheduleDrawer({ isOpen, onClose, onSchedule }) {
  const [formData, setFormData] = useState({
    candidateName: "",
    candidateEmail: "",
    jobRole: "Senior Frontend Engineer",
    round: "Technical Round 1",
    interviewer: "Alex Mercer (Tech Lead)",
    mode: "Google Meet",
    date: "2026-07-28",
    time: "10:00 AM",
    duration: "60 mins",
    meetingLink: "https://meet.google.com/new-interview",
    location: "Online",
    notes: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.candidateName.trim()) return;

    const newInterview = {
      id: `int-${Date.now()}`,
      ...formData,
      avatarBg: "bg-blue-600",
      category: "Software Engineering",
      atsScore: 92,
      matchScore: 90,
      status: "Scheduled",
      stageIndex: 2,
      feedback: null,
    };

    onSchedule(newInterview);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md sm:max-w-lg bg-white shadow-2xl border-l border-slate-200 flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <FaCalendarPlus className="text-blue-600 text-base" />
                <span>Schedule New Interview</span>
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Set up an interview round and notify candidate & interviewer.
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              <FaTimes className="text-base" />
            </button>
          </div>

          {/* Form Scrollable Content */}
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4 text-xs">
            {/* Candidate Name & Email */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  Candidate Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Chen"
                  value={formData.candidateName}
                  onChange={(e) => setFormData({ ...formData, candidateName: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium focus:ring-2 focus:ring-blue-500/20 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Candidate Email</label>
                <input
                  type="email"
                  placeholder="sarah.chen@example.com"
                  value={formData.candidateEmail}
                  onChange={(e) => setFormData({ ...formData, candidateEmail: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium focus:ring-2 focus:ring-blue-500/20 focus:outline-hidden"
                />
              </div>
            </div>

            {/* Job Role & Round */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-800 block mb-1">Job Role</label>
                <input
                  type="text"
                  value={formData.jobRole}
                  onChange={(e) => setFormData({ ...formData, jobRole: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium focus:ring-2 focus:ring-blue-500/20 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Interview Round</label>
                <select
                  value={formData.round}
                  onChange={(e) => setFormData({ ...formData, round: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium focus:ring-2 focus:ring-blue-500/20 focus:outline-hidden"
                >
                  <option value="Screening Interview">Screening Interview</option>
                  <option value="Technical Round 1">Technical Round 1</option>
                  <option value="Technical Round 2">Technical Round 2</option>
                  <option value="System Design">System Design</option>
                  <option value="HR Round">HR Round</option>
                  <option value="Final Executive Round">Final Executive Round</option>
                </select>
              </div>
            </div>

            {/* Interviewer & Mode */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-800 block mb-1">Interviewer</label>
                <input
                  type="text"
                  value={formData.interviewer}
                  onChange={(e) => setFormData({ ...formData, interviewer: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium focus:ring-2 focus:ring-blue-500/20 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Mode / Platform</label>
                <select
                  value={formData.mode}
                  onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium focus:ring-2 focus:ring-blue-500/20 focus:outline-hidden"
                >
                  <option value="Google Meet">Google Meet</option>
                  <option value="Microsoft Teams">Microsoft Teams</option>
                  <option value="Zoom">Zoom</option>
                  <option value="Offline">Offline Onsite</option>
                </select>
              </div>
            </div>

            {/* Date, Time & Duration */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="font-bold text-slate-800 block mb-1">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium focus:ring-2 focus:ring-blue-500/20 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Time</label>
                <input
                  type="text"
                  placeholder="e.g. 10:00 AM"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium focus:ring-2 focus:ring-blue-500/20 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Duration</label>
                <select
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium focus:ring-2 focus:ring-blue-500/20 focus:outline-hidden"
                >
                  <option value="30 mins">30 mins</option>
                  <option value="45 mins">45 mins</option>
                  <option value="60 mins">60 mins</option>
                </select>
              </div>
            </div>

            {/* Meeting Link */}
            <div>
              <label className="font-bold text-slate-800 block mb-1">Meeting Link / Location</label>
              <input
                type="text"
                value={formData.meetingLink}
                onChange={(e) => setFormData({ ...formData, meetingLink: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium focus:ring-2 focus:ring-blue-500/20 focus:outline-hidden"
              />
            </div>

            {/* Notes */}
            <div>
              <label className="font-bold text-slate-800 block mb-1">Interview Instructions & Notes</label>
              <textarea
                rows={3}
                placeholder="Add topics to cover or technical focus areas..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium focus:ring-2 focus:ring-blue-500/20 focus:outline-hidden"
              />
            </div>
          </form>

          {/* Footer Actions */}
          <div className="p-4 border-t border-slate-200 bg-slate-50/80 flex items-center justify-end gap-3">
            <Button variant="secondary" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleSubmit}>
              Schedule Interview
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScheduleDrawer;
