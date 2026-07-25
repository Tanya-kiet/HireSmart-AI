import React, { useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import { useUser } from "../context/UserContext";
import AvatarUploader from "../components/UserMenu/AvatarUploader";
import Alert from "../components/common/Alert";
import {
  FaUser,
  FaSlidersH,
  FaBell,
  FaRobot,
  FaShieldAlt,
  FaCheck,
  FaUndo,
  FaKey,
  FaLock,
  FaDesktop,
  FaMobileAlt,
  FaSignOutAlt,
} from "react-icons/fa";

function ProfilePage() {
  const { user, updateProfile } = useUser();
  const [activeTab, setActiveTab] = useState("profile");
  const [alert, setAlert] = useState(null);

  // Split full name into first and last name
  const nameParts = user.name ? user.name.split(" ") : ["Tanya", "Bhadana"];
  const [firstName, setFirstName] = useState(nameParts[0] || "Tanya");
  const [lastName, setLastName] = useState(nameParts.slice(1).join(" ") || "Bhadana");
  const [email, setEmail] = useState(user.email || "tanya@hiresmart.ai");
  const [phone, setPhone] = useState(user.phone || "+1 (415) 555-0192");
  const [jobTitle, setJobTitle] = useState(user.jobTitle || "Senior Recruiter");
  const [department, setDepartment] = useState(user.department || "Talent Acquisition");
  const [location, setLocation] = useState(user.location || "San Francisco, CA");
  const [timezone, setTimezone] = useState("America/Los_Angeles (PST)");

  // Tab 2: Recruitment Preferences state
  const [recPref, setRecPref] = useState({
    duration: "45 Minutes",
    platform: "Google Meet",
    candidateView: "Table View",
    resumeLayout: "Standard 2-Column",
    sorting: "Highest Match Score",
    expWeight: 35,
    skillWeight: 45,
    eduWeight: 20,
  });

  // Tab 3: Notifications state
  const [notifs, setNotifs] = useState({
    emailNotifs: true,
    interviewReminders: true,
    statusUpdates: true,
    weeklyReport: true,
    desktopNotifs: true,
  });

  // Tab 4: AI Preferences state
  const [aiPref, setAiPref] = useState({
    enableSummary: true,
    enableAtsScore: true,
    enableSkillGap: true,
    enableRecommendations: true,
    matchingThreshold: 85,
  });

  // Tab 5: Security state
  const [passwords, setPasswords] = useState({ current: "", next: "", confirm: "" });
  const [twoFactor, setTwoFactor] = useState(true);

  // Handle Tab 1 Save
  const handleSaveProfile = (e) => {
    e.preventDefault();
    const fullName = `${firstName} ${lastName}`.trim();
    updateProfile({
      name: fullName,
      email,
      phone,
      jobTitle,
      role: jobTitle,
      department,
      location,
    });
    setAlert({
      type: "success",
      title: "Profile Updated",
      message: "Recruiter profile information saved successfully.",
    });
  };

  // Handle Tab 1 Cancel
  const handleCancelProfile = () => {
    const parts = user.name ? user.name.split(" ") : ["Tanya", "Bhadana"];
    setFirstName(parts[0] || "Tanya");
    setLastName(parts.slice(1).join(" ") || "Bhadana");
    setEmail(user.email || "tanya@hiresmart.ai");
    setPhone(user.phone || "+1 (415) 555-0192");
    setJobTitle(user.jobTitle || "Senior Recruiter");
    setDepartment(user.department || "Talent Acquisition");
    setLocation(user.location || "San Francisco, CA");
    setAlert({
      type: "info",
      title: "Changes Reverted",
      message: "Profile information reset to previous state.",
    });
  };

  // Generic Save Alert
  const showSaveSuccess = (sectionName) => {
    setAlert({
      type: "success",
      title: `${sectionName} Saved`,
      message: `${sectionName} configuration updated successfully.`,
    });
  };

  const tabs = [
    { id: "profile", label: "Profile Information", icon: FaUser },
    { id: "recruitment", label: "Recruitment Preferences", icon: FaSlidersH },
    { id: "notifications", label: "Notifications", icon: FaBell },
    { id: "ai", label: "AI Preferences", icon: FaRobot },
    { id: "security", label: "Security", icon: FaShieldAlt },
  ];

  return (
    <MainLayout>
      <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans">
        {/* Header Section */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            My Profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5 font-medium">
            Manage your recruiter account, preferences and AI recruitment settings.
          </p>
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

        {/* Horizontal Tabs Bar */}
        <div className="bg-white p-1.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-1 overflow-x-auto">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
                  isActive
                    ? "bg-slate-900 text-white shadow-2xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <Icon className="text-xs" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: PROFILE INFORMATION */}
        {activeTab === "profile" && (
          <div className="space-y-6">
            {/* Top Large Recruiter Header Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <AvatarUploader
                avatarUrl={user.avatar}
                name={user.name}
                size="lg"
                onAvatarChange={(url) => updateProfile({ avatar: url })}
              />

              <div className="flex-1 text-center sm:text-left space-y-1.5">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                  <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                    {user.name}
                  </h2>
                  <span className="px-2.5 py-0.5 text-[10px] font-bold bg-blue-50 text-blue-700 rounded border border-blue-200">
                    ID: REC-8842
                  </span>
                  <span className="px-2.5 py-0.5 text-[10px] font-bold bg-emerald-50 text-emerald-700 rounded border border-emerald-200 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>Online</span>
                  </span>
                </div>

                <p className="text-xs text-slate-500 font-semibold">
                  {user.jobTitle || user.role} • {user.department || "Talent Acquisition"}
                </p>
                <p className="text-xs text-slate-400 font-medium">
                  {user.email} • {user.location || "San Francisco, CA"}
                </p>
              </div>
            </div>

            {/* Editable Profile Form */}
            <form onSubmit={handleSaveProfile} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-5">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
                Personal & Work Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-slate-800 uppercase tracking-wider text-[10px] block">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:outline-none focus:bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-800 uppercase tracking-wider text-[10px] block">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:outline-none focus:bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-800 uppercase tracking-wider text-[10px] block">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:outline-none focus:bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-800 uppercase tracking-wider text-[10px] block">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:outline-none focus:bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-800 uppercase tracking-wider text-[10px] block">
                    Job Title
                  </label>
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:outline-none focus:bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-800 uppercase tracking-wider text-[10px] block">
                    Department
                  </label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:outline-none focus:bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-800 uppercase tracking-wider text-[10px] block">
                    Location
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:outline-none focus:bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-800 uppercase tracking-wider text-[10px] block">
                    Timezone
                  </label>
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:outline-none cursor-pointer"
                  >
                    <option value="America/Los_Angeles (PST)">America/Los_Angeles (PST)</option>
                    <option value="America/New_York (EST)">America/New_York (EST)</option>
                    <option value="Europe/London (GMT)">Europe/London (GMT)</option>
                    <option value="Asia/Kolkata (IST)">Asia/Kolkata (IST)</option>
                  </select>
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleCancelProfile}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <FaUndo className="text-xs" />
                  <span>Cancel</span>
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
                >
                  <FaCheck className="text-xs" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 2: RECRUITMENT PREFERENCES */}
        {activeTab === "recruitment" && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-6">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
              Recruitment Workflow Preferences
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-800 uppercase tracking-wider text-[10px] block">
                  Default Interview Duration
                </label>
                <select
                  value={recPref.duration}
                  onChange={(e) => setRecPref({ ...recPref, duration: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:outline-none cursor-pointer"
                >
                  <option value="30 Minutes">30 Minutes</option>
                  <option value="45 Minutes">45 Minutes</option>
                  <option value="60 Minutes">60 Minutes</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-800 uppercase tracking-wider text-[10px] block">
                  Default Meeting Platform
                </label>
                <select
                  value={recPref.platform}
                  onChange={(e) => setRecPref({ ...recPref, platform: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:outline-none cursor-pointer"
                >
                  <option value="Google Meet">Google Meet</option>
                  <option value="Zoom">Zoom</option>
                  <option value="Microsoft Teams">Microsoft Teams</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-800 uppercase tracking-wider text-[10px] block">
                  Default Candidate View
                </label>
                <select
                  value={recPref.candidateView}
                  onChange={(e) => setRecPref({ ...recPref, candidateView: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:outline-none cursor-pointer"
                >
                  <option value="Table View">Table View</option>
                  <option value="Card Grid View">Card Grid View</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-800 uppercase tracking-wider text-[10px] block">
                  Preferred Resume Layout
                </label>
                <select
                  value={recPref.resumeLayout}
                  onChange={(e) => setRecPref({ ...recPref, resumeLayout: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:outline-none cursor-pointer"
                >
                  <option value="Standard 2-Column">Standard 2-Column</option>
                  <option value="Full-Width PDF Embed">Full-Width PDF Embed</option>
                </select>
              </div>
            </div>

            {/* Algorithm Sliders */}
            <div className="space-y-4 pt-2 border-t border-slate-100">
              <h4 className="font-bold text-slate-900 text-xs">Matching Algorithm Weight Balance</h4>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span className="text-slate-700">Hard Technical Skill Weight</span>
                    <span className="text-blue-600 font-mono">{recPref.skillWeight}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="80"
                    value={recPref.skillWeight}
                    onChange={(e) => setRecPref({ ...recPref, skillWeight: Number(e.target.value) })}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span className="text-slate-700">Work Experience & Tenure Weight</span>
                    <span className="text-blue-600 font-mono">{recPref.expWeight}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="80"
                    value={recPref.expWeight}
                    onChange={(e) => setRecPref({ ...recPref, expWeight: Number(e.target.value) })}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span className="text-slate-700">Education & Certification Weight</span>
                    <span className="text-blue-600 font-mono">{recPref.eduWeight}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="80"
                    value={recPref.eduWeight}
                    onChange={(e) => setRecPref({ ...recPref, eduWeight: Number(e.target.value) })}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => showSaveSuccess("Recruitment Preferences")}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
              >
                <FaCheck className="text-xs" />
                <span>Save Preferences</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: NOTIFICATIONS */}
        {activeTab === "notifications" && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-5">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
              Notification Preferences
            </h3>

            <div className="space-y-3 text-xs">
              {[
                { key: "emailNotifs", label: "Email Notifications", desc: "Receive email updates for new candidate applications and scorecards" },
                { key: "interviewReminders", label: "Interview Reminders", desc: "Automated reminders 15 minutes before scheduled technical rounds" },
                { key: "statusUpdates", label: "Candidate Status Updates", desc: "Real-time alerts when candidates transition pipeline stages" },
                { key: "weeklyReport", label: "Weekly Hiring Report", desc: "Summary report email every Monday morning with weekly hiring KPIs" },
                { key: "desktopNotifs", label: "Desktop Notifications", desc: "Desktop push alerts for urgent offer approvals and interview quick joins" },
              ].map((item) => {
                const isChecked = notifs[item.key];
                return (
                  <div key={item.key} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200/70">
                    <div>
                      <span className="font-bold text-slate-900 block">{item.label}</span>
                      <span className="text-[11px] text-slate-500 font-medium block">{item.desc}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setNotifs({ ...notifs, [item.key]: !isChecked })}
                      className={`w-11 h-6 rounded-full p-1 transition-colors cursor-pointer shrink-0 ${
                        isChecked ? "bg-blue-600" : "bg-slate-300"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-white transition-transform shadow-xs ${
                          isChecked ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => showSaveSuccess("Notification Settings")}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
              >
                <FaCheck className="text-xs" />
                <span>Save Notification Settings</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: AI PREFERENCES */}
        {activeTab === "ai" && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-5">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
              AI Copilot & Matching Preferences
            </h3>

            <div className="space-y-3 text-xs">
              {[
                { key: "enableSummary", label: "Enable Resume Summary", desc: "Generate executive 3-bullet candidate background summaries on upload" },
                { key: "enableAtsScore", label: "Enable ATS Score Analysis", desc: "Display automated ATS resume parsing compatibility scores" },
                { key: "enableSkillGap", label: "Enable Skill Gap Detection", desc: "Highlight missing technical skills against job requirements" },
                { key: "enableRecommendations", label: "Enable Candidate Recommendations", desc: "Display algorithmic recommendation tags (Strong Hire, Good Fit, Needs Review)" },
              ].map((item) => {
                const isChecked = aiPref[item.key];
                return (
                  <div key={item.key} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200/70">
                    <div>
                      <span className="font-bold text-slate-900 block">{item.label}</span>
                      <span className="text-[11px] text-slate-500 font-medium block">{item.desc}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setAiPref({ ...aiPref, [item.key]: !isChecked })}
                      className={`w-11 h-6 rounded-full p-1 transition-colors cursor-pointer shrink-0 ${
                        isChecked ? "bg-blue-600" : "bg-slate-300"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-white transition-transform shadow-xs ${
                          isChecked ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                );
              })}

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 space-y-2">
                <div className="flex justify-between font-bold">
                  <span className="text-slate-900">Matching Recommendation Threshold</span>
                  <span className="text-blue-600 font-mono">{aiPref.matchingThreshold}% Confidence</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="95"
                  value={aiPref.matchingThreshold}
                  onChange={(e) => setAiPref({ ...aiPref, matchingThreshold: Number(e.target.value) })}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => showSaveSuccess("AI Preferences")}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
              >
                <FaCheck className="text-xs" />
                <span>Save AI Preferences</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 5: SECURITY */}
        {activeTab === "security" && (
          <div className="space-y-6">
            {/* Password & 2FA Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-5">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
                Password & Authentication
              </h3>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setPasswords({ current: "", next: "", confirm: "" });
                  showSaveSuccess("Password");
                }}
                className="space-y-3.5 text-xs"
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-800 uppercase tracking-wider text-[10px] block">
                      Current Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••••••"
                      value={passwords.current}
                      onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-800 uppercase tracking-wider text-[10px] block">
                      New Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••••••"
                      value={passwords.next}
                      onChange={(e) => setPasswords({ ...passwords, next: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-800 uppercase tracking-wider text-[10px] block">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••••••"
                      value={passwords.confirm}
                      onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <FaKey className="text-xs" />
                    <span>Change Password</span>
                  </button>
                </div>
              </form>

              {/* 2FA Section */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-xs">
                <div>
                  <span className="font-bold text-slate-900 block">Two-Factor Authentication (2FA)</span>
                  <span className="text-[11px] text-slate-500 font-medium block">
                    Secure your recruiter account with authenticator application 2FA
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setTwoFactor(!twoFactor);
                    showSaveSuccess("2FA Status");
                  }}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all text-xs border cursor-pointer ${
                    twoFactor
                      ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                      : "bg-slate-200 text-slate-700 border-slate-300"
                  }`}
                >
                  {twoFactor ? "2FA Enabled" : "Enable 2FA"}
                </button>
              </div>
            </div>

            {/* Login Sessions */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900">Recent Login Sessions</h3>
                <button
                  type="button"
                  onClick={() => showSaveSuccess("Log Out All Devices")}
                  className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold rounded-xl text-xs transition-colors cursor-pointer flex items-center gap-1 border border-rose-200"
                >
                  <FaSignOutAlt className="text-xs" />
                  <span>Log Out All Devices</span>
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FaDesktop className="text-slate-600 text-sm" />
                    <div>
                      <span className="font-bold text-slate-900 block">Chrome on macOS (Current Session)</span>
                      <span className="text-[11px] text-slate-400 font-medium">San Francisco, CA • IP: 192.168.1.1</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-50 text-emerald-700 rounded border border-emerald-200">
                    Active Now
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FaMobileAlt className="text-slate-600 text-sm" />
                    <div>
                      <span className="font-bold text-slate-900 block">Safari on iOS (iPhone 15 Pro)</span>
                      <span className="text-[11px] text-slate-400 font-medium">San Francisco, CA • 2 hours ago</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400">Signed In</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default ProfilePage;
