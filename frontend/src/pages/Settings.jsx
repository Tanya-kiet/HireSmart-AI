import React, { useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import OrganizationSettings from "../components/settings/OrganizationSettings";
import RecruitmentPreferences from "../components/settings/RecruitmentPreferences";
import TeamManagement from "../components/settings/TeamManagement";
import NotificationSettings from "../components/settings/NotificationSettings";
import AIPreferences from "../components/settings/AIPreferences";
import SecurityIntegrations from "../components/settings/SecurityIntegrations";
import Alert from "../components/common/Alert";
import { FaCheck, FaUndo } from "react-icons/fa";

function Settings() {
  const [settings, setSettings] = useState({
    companyName: "HireSmart AI Technologies",
    industry: "Enterprise SaaS",
    companySize: "100 - 500 Employees",
    recruitmentEmail: "careers@hiresmart.ai",
    timezone: "America/Los_Angeles (PST)",

    defaultPipeline: "Standard 9-Stage Enterprise Pipeline",
    defaultDuration: "45 Minutes",
    defaultPlatform: "Google Meet",
    parsingLanguage: "English (US / Global)",
    defaultCandidateStatus: "New",

    emailNotifs: true,
    interviewReminders: true,
    dailyDigest: true,
    statusUpdates: true,
    browserNotifs: true,

    enableSummary: true,
    enableRecommendations: true,
    enableSkillExtraction: true,
    enableMatchExplanation: true,
    confidenceThreshold: "85% High Confidence",

    twoFactor: true,
  });

  const [alert, setAlert] = useState(null);

  const handleFieldChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    setAlert({
      type: "success",
      title: "Settings Saved",
      message: "Recruitment workspace preferences and configuration updated successfully.",
    });
  };

  const handleReset = () => {
    setSettings({
      companyName: "HireSmart AI Technologies",
      industry: "Enterprise SaaS",
      companySize: "100 - 500 Employees",
      recruitmentEmail: "careers@hiresmart.ai",
      timezone: "America/Los_Angeles (PST)",
      defaultPipeline: "Standard 9-Stage Enterprise Pipeline",
      defaultDuration: "45 Minutes",
      defaultPlatform: "Google Meet",
      parsingLanguage: "English (US / Global)",
      defaultCandidateStatus: "New",
      emailNotifs: true,
      interviewReminders: true,
      dailyDigest: true,
      statusUpdates: true,
      browserNotifs: true,
      enableSummary: true,
      enableRecommendations: true,
      enableSkillExtraction: true,
      enableMatchExplanation: true,
      confidenceThreshold: "85% High Confidence",
      twoFactor: true,
    });
    setAlert({
      type: "info",
      title: "Settings Reset",
      message: "Restored default configuration settings.",
    });
  };

  return (
    <MainLayout>
      <div className="space-y-6 max-w-7xl mx-auto pb-24 font-sans">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Settings & Preferences
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5 font-medium">
            Configure company profile, hiring workflows, team permissions, and AI assistance preferences.
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

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Column 1: Organization, Recruitment Preferences, Team Management */}
          <div className="space-y-6">
            <OrganizationSettings settings={settings} onChange={handleFieldChange} />
            <RecruitmentPreferences settings={settings} onChange={handleFieldChange} />
            <TeamManagement />
          </div>

          {/* Column 2: Notifications, AI Preferences, Security & Integrations */}
          <div className="space-y-6">
            <NotificationSettings settings={settings} onChange={handleFieldChange} />
            <AIPreferences settings={settings} onChange={handleFieldChange} />
            <SecurityIntegrations settings={settings} onChange={handleFieldChange} />
          </div>
        </div>

        {/* Fixed Bottom Action Bar */}
        <div className="fixed bottom-0 right-0 left-0 lg:left-[280px] bg-white/95 backdrop-blur-md border-t border-slate-200 px-6 py-3.5 z-30 flex items-center justify-between shadow-lg font-sans">
          <span className="text-xs text-slate-500 font-medium hidden sm:inline-block">
            All configuration updates are stored securely.
          </span>

          <div className="flex items-center gap-2 ml-auto sm:ml-0">
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <FaUndo className="text-xs text-slate-500" />
              <span>Reset Defaults</span>
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
    </MainLayout>
  );
}

export default Settings;