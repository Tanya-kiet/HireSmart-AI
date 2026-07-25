import React from "react";
import { FaBell } from "react-icons/fa";

function NotificationSettings({ settings, onChange }) {
  const toggleItems = [
    { key: "emailNotifs", label: "Email Notifications", desc: "Receive email updates for new candidate applications and scorecards" },
    { key: "interviewReminders", label: "Interview Reminders", desc: "Automated reminders 15 minutes before scheduled technical rounds" },
    { key: "dailyDigest", label: "Daily Recruiter Digest", desc: "Summary email every morning at 08:00 AM with today's priorities" },
    { key: "statusUpdates", label: "Candidate Status Updates", desc: "Real-time alerts when candidates transition pipeline stages" },
    { key: "browserNotifs", label: "Browser Push Notifications", desc: "Desktop push alerts for urgent offer approvals and interview quick joins" },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4 font-sans text-xs">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3 font-bold text-slate-900 text-sm">
        <FaBell className="text-amber-500 text-xs" />
        <span>4. Notification Preferences</span>
      </div>

      <div className="space-y-3">
        {toggleItems.map((item) => {
          const isChecked = settings[item.key] !== false; // Default true
          return (
            <div key={item.key} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200/70">
              <div>
                <span className="font-bold text-slate-900 block">{item.label}</span>
                <span className="text-[11px] text-slate-500 font-medium block">{item.desc}</span>
              </div>

              {/* Toggle Switch */}
              <button
                type="button"
                onClick={() => onChange(item.key, !isChecked)}
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
    </div>
  );
}

export default NotificationSettings;
