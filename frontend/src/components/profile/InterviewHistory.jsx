import React from "react";
import Card from "../common/Card";
import Badge from "../common/Badge";
import { FaUserCheck, FaStar, FaCalendarAlt } from "react-icons/fa";

function InterviewHistory({ interviews = [] }) {
  if (interviews.length === 0) return null;

  return (
    <Card
      title="Interview History & Evaluator Notes"
      subtitle="Feedback recorded across completed interview rounds"
      headerBorder
    >
      <div className="space-y-4 text-xs">
        {interviews.map((item, idx) => (
          <div
            key={idx}
            className="p-4 bg-slate-50 rounded-2xl border border-slate-200/70 space-y-2.5"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 pb-2">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-sm">
                  {item.round}
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-600 font-medium">
                  Interviewer: <strong>{item.interviewer}</strong>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-[11px] font-medium flex items-center gap-1">
                  <FaCalendarAlt className="text-[10px]" />
                  {item.date}
                </span>
                <Badge variant="emerald" size="sm">
                  {item.recommendation}
                </Badge>
              </div>
            </div>

            <div className="flex items-center gap-1 text-amber-400 text-xs">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={star <= item.rating ? "text-amber-400" : "text-slate-200"}
                />
              ))}
              <span className="text-slate-700 font-bold ml-1.5">{item.rating}.0 / 5.0</span>
            </div>

            <p className="text-slate-700 leading-relaxed font-medium bg-white p-3 rounded-xl border border-slate-200/60">
              "{item.feedback}"
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default InterviewHistory;
