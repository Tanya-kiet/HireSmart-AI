import React from "react";
import Card from "../common/Card";
import { FaCheckCircle, FaClock } from "react-icons/fa";

function ActivityTimeline({ activity = [] }) {
  return (
    <Card
      title="Candidate Activity Log"
      subtitle="Complete ATS audit trail from resume upload to offer"
      headerBorder
    >
      <div className="space-y-3 text-xs">
        {activity.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200/70"
          >
            <div className="flex items-center gap-2.5">
              <FaCheckCircle
                className={item.done ? "text-emerald-500 text-sm" : "text-slate-300 text-sm"}
              />
              <span className={`font-semibold ${item.done ? "text-slate-900" : "text-slate-400"}`}>
                {item.title}
              </span>
            </div>

            <span className="text-[11px] font-medium text-slate-500">
              {item.date}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default ActivityTimeline;
