import React from "react";
import { FaBuilding, FaUpload } from "react-icons/fa";

function OrganizationSettings({ settings, onChange }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4 font-sans text-xs">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3 font-bold text-slate-900 text-sm">
        <FaBuilding className="text-blue-600 text-xs" />
        <span>1. Organization Profile</span>
      </div>

      <div className="space-y-3">
        {/* Company Name */}
        <div className="space-y-1">
          <label className="font-bold text-slate-800 uppercase tracking-wider text-[10px] block">
            Company Name *
          </label>
          <input
            type="text"
            value={settings.companyName || "HireSmart AI Technologies"}
            onChange={(e) => onChange("companyName", e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none focus:bg-white"
          />
        </div>

        {/* Industry & Size */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="font-bold text-slate-800 uppercase tracking-wider text-[10px] block">
              Industry
            </label>
            <select
              value={settings.industry || "Enterprise SaaS"}
              onChange={(e) => onChange("industry", e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none cursor-pointer"
            >
              <option value="Enterprise SaaS">Enterprise SaaS</option>
              <option value="Artificial Intelligence">Artificial Intelligence</option>
              <option value="Fintech">Fintech</option>
              <option value="Healthcare">Healthcare</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-800 uppercase tracking-wider text-[10px] block">
              Company Size
            </label>
            <select
              value={settings.companySize || "100 - 500 Employees"}
              onChange={(e) => onChange("companySize", e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none cursor-pointer"
            >
              <option value="10 - 50 Employees">10 - 50 Employees</option>
              <option value="50 - 100 Employees">50 - 100 Employees</option>
              <option value="100 - 500 Employees">100 - 500 Employees</option>
              <option value="500+ Employees">500+ Employees</option>
            </select>
          </div>
        </div>

        {/* Email & Timezone */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="font-bold text-slate-800 uppercase tracking-wider text-[10px] block">
              Recruitment Email
            </label>
            <input
              type="email"
              value={settings.recruitmentEmail || "careers@hiresmart.ai"}
              onChange={(e) => onChange("recruitmentEmail", e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-800 uppercase tracking-wider text-[10px] block">
              Timezone
            </label>
            <select
              value={settings.timezone || "America/Los_Angeles (PST)"}
              onChange={(e) => onChange("timezone", e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none cursor-pointer"
            >
              <option value="America/Los_Angeles (PST)">America/Los_Angeles (PST)</option>
              <option value="America/New_York (EST)">America/New_York (EST)</option>
              <option value="Europe/London (GMT)">Europe/London (GMT)</option>
              <option value="Asia/Kolkata (IST)">Asia/Kolkata (IST)</option>
            </select>
          </div>
        </div>

        {/* Logo Upload */}
        <div className="space-y-1 pt-1">
          <label className="font-bold text-slate-800 uppercase tracking-wider text-[10px] block">
            Company Branding Logo
          </label>
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-dashed border-slate-200">
            <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
              HS
            </div>
            <div className="flex-1">
              <span className="font-bold text-slate-800 block text-xs">hiresmart_logo.png</span>
              <span className="text-[10px] text-slate-400 font-medium">PNG or SVG up to 5MB</span>
            </div>
            <label className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 font-bold rounded-lg border border-slate-200 cursor-pointer text-xs transition-colors">
              <FaUpload className="inline mr-1 text-[10px]" />
              <span>Upload Logo</span>
              <input type="file" accept="image/*" className="hidden" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrganizationSettings;
