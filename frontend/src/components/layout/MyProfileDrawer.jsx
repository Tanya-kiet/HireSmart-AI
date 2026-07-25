import React, { useState } from "react";
import {
  FaTimes,
  FaUser,
  FaCamera,
  FaBriefcase,
  FaUsers,
  FaCalendarCheck,
  FaFileContract,
  FaClock,
  FaHistory,
  FaCheck,
} from "react-icons/fa";

function MyProfileDrawer({ isOpen, onClose, onSave }) {
  const [profileData, setProfileData] = useState({
    fullName: "Tanya Bhadana",
    jobTitle: "Senior Recruiter",
    email: "tanya@hiresmart.ai",
    phone: "+1 (415) 555-0192",
    timezone: "America/Los_Angeles (PST)",
    location: "San Francisco, CA",
    department: "Talent Acquisition",
    recruiterId: "REC-8842",
    experience: "6 Years",
    hiringFocus: ["Engineering", "Product"],
    language: "English (US)",
    theme: "Light System",
    calendarSync: "Google Calendar (Connected)",
  });

  const [alert, setAlert] = useState(null);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    if (onSave) onSave(profileData);
    setAlert("Profile saved successfully!");
    setTimeout(() => setAlert(null), 2500);
  };

  const productivityStats = [
    { label: "Candidates Reviewed", value: "420", icon: FaUsers, color: "text-blue-600 bg-blue-50" },
    { label: "Interviews Scheduled", value: "112", icon: FaCalendarCheck, color: "text-purple-600 bg-purple-50" },
    { label: "Offers Sent", value: "24", icon: FaFileContract, color: "text-emerald-600 bg-emerald-50" },
    { label: "Average Hiring Time", value: "19 Days", icon: FaClock, color: "text-teal-600 bg-teal-50" },
  ];

  const recentActivity = [
    { text: "Reviewed technical assessment score for Sarah Chen", time: "2 hours ago" },
    { text: "Created Senior Lead Frontend Engineer job requisition", time: "1 day ago" },
    { text: "Scheduled System Architecture interview for Marcus Vance", time: "1 day ago" },
    { text: "Updated Aisha Patel candidate status to Offer Extended", time: "2 days ago" },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans animate-fade-in text-xs">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs transition-opacity cursor-pointer"
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-lg bg-white shadow-2xl border-l border-slate-200 flex flex-col justify-between overflow-hidden">
          {/* Header */}
          <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-xs">
                <FaUser />
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-tight text-white">
                  My Profile & Recruiter Dossier
                </h3>
                <p className="text-[10px] text-slate-400 font-medium">
                  Manage personal information, professional credentials, and preferences
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              <FaTimes className="text-sm" />
            </button>
          </div>

          {/* Toast Notification */}
          {alert && (
            <div className="p-3 bg-emerald-50 text-emerald-800 border-b border-emerald-200 font-bold flex items-center gap-2 text-xs">
              <FaCheck className="text-emerald-600" />
              <span>{alert}</span>
            </div>
          )}

          {/* Drawer Body Stream */}
          <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-4 space-y-5 bg-slate-50">
            {/* 1. Profile Avatar & Personal Info */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-4 shadow-2xs">
              <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                <div className="relative group cursor-pointer">
                  <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-lg ring-4 ring-slate-100 shadow-xs">
                    TB
                  </div>
                  <div className="absolute inset-0 bg-slate-950/60 rounded-2xl flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <FaCamera className="text-xs" />
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 text-base">{profileData.fullName}</h4>
                  <p className="text-xs text-slate-500 font-medium">{profileData.jobTitle} • {profileData.department}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-bold bg-blue-50 text-blue-700 rounded border border-blue-200">
                    ID: {profileData.recruiterId}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 uppercase tracking-wider text-[10px] block">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profileData.fullName}
                    onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 uppercase tracking-wider text-[10px] block">
                    Job Title
                  </label>
                  <input
                    type="text"
                    value={profileData.jobTitle}
                    onChange={(e) => setProfileData({ ...profileData, jobTitle: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 uppercase tracking-wider text-[10px] block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 uppercase tracking-wider text-[10px] block">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 uppercase tracking-wider text-[10px] block">
                    Location
                  </label>
                  <input
                    type="text"
                    value={profileData.location}
                    onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 uppercase tracking-wider text-[10px] block">
                    Timezone
                  </label>
                  <input
                    type="text"
                    value={profileData.timezone}
                    onChange={(e) => setProfileData({ ...profileData, timezone: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* 2. Professional & Hiring Focus */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3 shadow-2xs">
              <h4 className="font-bold text-slate-900 flex items-center gap-1.5 border-b border-slate-100 pb-2">
                <FaBriefcase className="text-slate-500 text-xs" />
                <span>Professional Hiring Focus</span>
              </h4>

              <div className="space-y-1">
                <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px] block">
                  Primary Requisition Domains:
                </span>
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {["Engineering", "Product", "Sales", "Data", "Design"].map((focus) => {
                    const isSelected = profileData.hiringFocus.includes(focus);
                    return (
                      <span
                        key={focus}
                        onClick={() => {
                          const updated = isSelected
                            ? profileData.hiringFocus.filter((f) => f !== focus)
                            : [...profileData.hiringFocus, focus];
                          setProfileData({ ...profileData, hiringFocus: updated });
                        }}
                        className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all cursor-pointer border ${
                          isSelected
                            ? "bg-slate-900 text-white border-slate-900 shadow-2xs"
                            : "bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200"
                        }`}
                      >
                        {focus}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 3. Recruiter Productivity Metrics */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3 shadow-2xs">
              <h4 className="font-bold text-slate-900 border-b border-slate-100 pb-2">
                Personal Recruiter Productivity Statistics
              </h4>

              <div className="grid grid-cols-2 gap-2.5">
                {productivityStats.map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          {stat.label}
                        </span>
                        <Icon className={`text-xs ${stat.color} p-1 rounded-md w-5 h-5`} />
                      </div>
                      <span className="text-lg font-black text-slate-900 block">
                        {stat.value}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 4. Activity Audit Trail */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3 shadow-2xs">
              <h4 className="font-bold text-slate-900 flex items-center gap-1.5 border-b border-slate-100 pb-2">
                <FaHistory className="text-slate-500 text-xs" />
                <span>Recent Recruiter Activity</span>
              </h4>

              <div className="space-y-2">
                {recentActivity.map((act, idx) => (
                  <div key={idx} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/60 flex items-center justify-between text-[11px]">
                    <span className="font-medium text-slate-800 leading-tight">
                      • {act.text}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono shrink-0 ml-2">
                      {act.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </form>

          {/* Footer Save CTA */}
          <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-end gap-2 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
            >
              <FaCheck className="text-xs" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfileDrawer;
