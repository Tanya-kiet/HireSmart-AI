import React, { useState } from "react";
import { FaShieldAlt, FaChevronDown, FaChevronUp, FaLock, FaCalendarAlt, FaVideo } from "react-icons/fa";

function SecurityIntegrations({ settings, onChange }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const integrations = [
    { name: "Google Calendar", category: "Calendar Sync", status: "Connected", icon: FaCalendarAlt, connected: true },
    { name: "Microsoft Outlook", category: "Calendar Sync", status: "Available", icon: FaCalendarAlt, connected: false },
    { name: "Google Meet", category: "Video Interviews", status: "Connected", icon: FaVideo, connected: true },
    { name: "Zoom Video Communications", category: "Video Interviews", status: "Connected", icon: FaVideo, connected: true },
    { name: "Microsoft Teams", category: "Video Interviews", status: "Available", icon: FaVideo, connected: false },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4 font-sans text-xs">
      {/* Collapsible Header */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between border-b border-slate-100 pb-3 cursor-pointer group"
      >
        <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
          <FaShieldAlt className="text-slate-600 text-xs" />
          <span>Security & Connected Integrations (Optional)</span>
        </div>
        <button type="button" className="text-slate-400 group-hover:text-slate-800">
          {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="space-y-4 pt-1 animate-fade-in">
          {/* Security Sub-card */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-3">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
              <FaLock className="text-slate-500 text-xs" />
              <span>Authentication & Security Credentials</span>
            </h4>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 uppercase tracking-wider text-[10px] block">
                  Change Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••••••"
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 uppercase tracking-wider text-[10px] block">
                  Two-Factor Authentication (2FA)
                </label>
                <button
                  type="button"
                  onClick={() => onChange("twoFactor", !settings.twoFactor)}
                  className={`w-full py-1.5 px-3 rounded-lg font-bold transition-all text-xs border cursor-pointer ${
                    settings.twoFactor
                      ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                      : "bg-slate-200 text-slate-700 border-slate-300"
                  }`}
                >
                  {settings.twoFactor ? "2FA Enabled" : "Enable 2FA Authentication"}
                </button>
              </div>
            </div>
          </div>

          {/* Integrations Sub-card */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2.5">
            <h4 className="font-bold text-slate-900 text-xs">Connected HR Ecosystem & Meeting Apps</h4>

            <div className="space-y-2">
              {integrations.map((app, idx) => {
                const Icon = app.icon;
                return (
                  <div key={idx} className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-slate-200/80 text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded bg-slate-100 text-slate-600 flex items-center justify-center text-xs">
                        <Icon />
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 block">{app.name}</span>
                        <span className="text-[10px] text-slate-400 font-medium">{app.category}</span>
                      </div>
                    </div>

                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold rounded border ${
                        app.connected
                          ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                          : "bg-slate-100 text-slate-700 border-slate-200"
                      }`}
                    >
                      {app.connected ? "Connected" : "Connect"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SecurityIntegrations;
