import React from "react";
import { FaVideo, FaClock, FaCalendarDay } from "react-icons/fa";

function TodaysAgenda({ agendaItems, onSelectInterview }) {
  const defaultAgenda = [
    {
      id: "int-1",
      candidateName: "Sarah Chen",
      role: "Senior Lead Frontend Engineer",
      round: "Technical System Design",
      time: "09:00 AM PST",
      status: "Scheduled",
      meetingUrl: "https://meet.google.com/abc-defg-hij",
      avatarBg: "bg-blue-600",
    },
    {
      id: "int-2",
      candidateName: "Marcus Vance",
      role: "Staff Frontend Architect",
      round: "System Architecture",
      time: "10:30 AM PST",
      status: "Scheduled",
      meetingUrl: "https://meet.google.com/xyz-uvwx-rst",
      avatarBg: "bg-purple-600",
    },
    {
      id: "int-3",
      candidateName: "Sophia Martinez",
      role: "React Tech Lead",
      round: "HR Executive Round",
      time: "02:00 PM PST",
      status: "Scheduled",
      meetingUrl: "https://meet.google.com/pqr-stuv-wxy",
      avatarBg: "bg-teal-600",
    },
    {
      id: "int-4",
      candidateName: "Elena Rostova",
      role: "DevOps Infrastructure Lead",
      round: "Culture & Leadership",
      time: "04:15 PM PST",
      status: "Completed",
      avatarBg: "bg-emerald-600",
    },
  ];

  const items = agendaItems && agendaItems.length > 0 ? agendaItems : defaultAgenda;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3 font-sans text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
        <div className="flex items-center gap-2 font-bold text-slate-900">
          <FaCalendarDay className="text-blue-600 text-xs" />
          <span>Today's Agenda</span>
        </div>
        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
          {items.length} Sessions
        </span>
      </div>

      {/* Vertical Timeline List */}
      <div className="space-y-2.5">
        {items.map((item, idx) => (
          <div
            key={item.id || idx}
            onClick={() => onSelectInterview(item)}
            className="p-3 bg-slate-50/80 hover:bg-slate-50 rounded-xl border border-slate-200/80 transition-all cursor-pointer space-y-1.5 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-slate-800">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                <span>{item.time || "09:00 AM"}</span>
              </div>
              <span className="text-[10px] font-semibold text-slate-500">
                {item.round || "Technical"}
              </span>
            </div>

            <div className="flex items-center justify-between gap-2 pt-0.5">
              <div>
                <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {item.candidateName}
                </h4>
                <p className="text-[10px] text-slate-500 font-medium truncate max-w-[150px]">
                  {item.role || item.jobRole}
                </p>
              </div>

              {item.meetingUrl && (
                <a
                  href={item.meetingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[10px] font-bold transition-colors inline-flex items-center gap-1 shrink-0 shadow-2xs"
                >
                  <FaVideo className="text-[9px]" />
                  <span>Quick Join</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodaysAgenda;
