import React from "react";
import Card from "../common/Card";
import Badge from "../common/Badge";
import {
  FaRobot,
  FaFileUpload,
  FaUserCheck,
  FaSlidersH,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

const timelineEvents = [
  {
    id: 1,
    title: "AI Batch Screening Completed",
    desc: "Parsed and evaluated 18 resumes for Senior React Developer position.",
    time: "15 minutes ago",
    icon: FaRobot,
    iconBg: "bg-blue-600 text-white",
    badge: "AI Process",
    variant: "blue",
  },
  {
    id: 2,
    title: "Candidate Moved to Shortlist",
    desc: "Sarah Chen (96% Match) approved by Tanya Bhadana for Tech Screen.",
    time: "1 hour ago",
    icon: FaUserCheck,
    iconBg: "bg-emerald-600 text-white",
    badge: "Approved",
    variant: "emerald",
  },
  {
    id: 3,
    title: "ATS Weighting Adjusted",
    desc: "Increased weight of TypeScript & System Design skills by +15%.",
    time: "3 hours ago",
    icon: FaSlidersH,
    iconBg: "bg-purple-600 text-white",
    badge: "Config",
    variant: "purple",
  },
  {
    id: 4,
    title: "New Job Posting Linked",
    desc: "Integrated hiring pipeline with Lead Product Designer requirements.",
    time: "5 hours ago",
    icon: FaFileUpload,
    iconBg: "bg-slate-800 text-white",
    badge: "Pipeline",
    variant: "slate",
  },
];

function ActivityTimeline() {
  return (
    <Card
      title="Recent Activity Timeline"
      subtitle="Live audit log of recruiter actions & AI automated events"
      headerBorder
    >
      <div className="relative pl-6 space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
        {timelineEvents.map((event) => {
          const Icon = event.icon;
          return (
            <div key={event.id} className="relative group">
              {/* Timeline Bullet */}
              <div
                className={`absolute -left-6 top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs shadow-xs ring-4 ring-white ${event.iconBg}`}
              >
                <Icon className="text-[10px]" />
              </div>

              {/* Content Box */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {event.title}
                    </h4>
                    <Badge variant={event.variant} size="sm">
                      {event.badge}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {event.desc}
                  </p>
                </div>

                <div className="flex items-center gap-1 text-[11px] text-slate-400 shrink-0 font-medium sm:self-start mt-1 sm:mt-0">
                  <FaClock className="text-[10px]" />
                  <span>{event.time}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export default ActivityTimeline;
