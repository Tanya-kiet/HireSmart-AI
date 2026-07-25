import React from "react";
import { FaSlidersH } from "react-icons/fa";

function RecruitmentPreferences({ settings, onChange }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4 font-sans text-xs">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3 font-bold text-slate-900 text-sm">
        <FaSlidersH className="text-purple-600 text-xs" />
        <span>2. Recruitment Preferences</span>
      </div>

      <div className="space-y-3">
        {/* Default Pipeline */}
        <div className="space-y-1">
          <label className="font-bold text-slate-800 uppercase tracking-wider text-[10px] block">
            Default Hiring Pipeline Stage Model
          </label>
          <select
            value={settings.defaultPipeline || "Standard 9-Stage Enterprise Pipeline"}
            onChange={(e) => onChange("defaultPipeline", e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none cursor-pointer"
          >
            <option value="Standard 9-Stage Enterprise Pipeline">Standard 9-Stage Enterprise Pipeline</option>
            <option value="Fast-Track 5-Stage Pipeline">Fast-Track 5-Stage Pipeline</option>
            <option value="Custom Engineering Technical Pipeline">Custom Engineering Technical Pipeline</option>
          </select>
        </div>

        {/* Duration & Meeting Platform */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="font-bold text-slate-800 uppercase tracking-wider text-[10px] block">
              Default Interview Duration
            </label>
            <select
              value={settings.defaultDuration || "45 Minutes"}
              onChange={(e) => onChange("defaultDuration", e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none cursor-pointer"
            >
              <option value="30 Minutes">30 Minutes</option>
              <option value="45 Minutes">45 Minutes</option>
              <option value="60 Minutes">60 Minutes</option>
              <option value="90 Minutes">90 Minutes</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-800 uppercase tracking-wider text-[10px] block">
              Default Meeting Platform
            </label>
            <select
              value={settings.defaultPlatform || "Google Meet"}
              onChange={(e) => onChange("defaultPlatform", e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none cursor-pointer"
            >
              <option value="Google Meet">Google Meet</option>
              <option value="Zoom">Zoom</option>
              <option value="Microsoft Teams">Microsoft Teams</option>
              <option value="Offline Onsite">Offline Onsite</option>
            </select>
          </div>
        </div>

        {/* Parsing Language & Default Status */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="font-bold text-slate-800 uppercase tracking-wider text-[10px] block">
              Resume Parsing Primary Language
            </label>
            <select
              value={settings.parsingLanguage || "English (US / Global)"}
              onChange={(e) => onChange("parsingLanguage", e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none cursor-pointer"
            >
              <option value="English (US / Global)">English (US / Global)</option>
              <option value="Spanish">Spanish</option>
              <option value="German">German</option>
              <option value="French">French</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-800 uppercase tracking-wider text-[10px] block">
              Default Upload Candidate Status
            </label>
            <select
              value={settings.defaultCandidateStatus || "New"}
              onChange={(e) => onChange("defaultCandidateStatus", e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none cursor-pointer"
            >
              <option value="New">New</option>
              <option value="Reviewed">Reviewed</option>
              <option value="Screening">Screening</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecruitmentPreferences;
