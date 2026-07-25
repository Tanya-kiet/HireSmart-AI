import React from "react";
import {
  FaCalendarAlt,
  FaVideo,
  FaStar,
  FaCheckCircle,
  FaUserCheck,
  FaExternalLinkAlt,
  FaCommentDots,
} from "react-icons/fa";

function InterviewSection({ interviews, onSchedule }) {
  if (!interviews) return null;

  return (
    <div className="space-y-5">
      {/* Header Metric Bar */}
      <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 font-bold text-slate-900 text-sm">
            <FaStar className="text-amber-500 text-sm" />
            <span>{interviews.averageRating || 4.9}</span>
            <span className="text-slate-400 font-normal text-xs">/ 5.0 Rating</span>
          </div>
          <span className="text-slate-300">•</span>
          <span className="text-slate-600 font-medium">
            {interviews.totalRounds || 2} Interview Rounds Conducted
          </span>
        </div>

        <button
          onClick={onSchedule}
          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
        >
          <FaCalendarAlt className="text-xs" />
          <span>Schedule New Round</span>
        </button>
      </div>

      {/* 1. Upcoming Interviews */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-600" />
          <span>Upcoming Scheduled Interviews</span>
        </h3>

        {interviews.upcoming && interviews.upcoming.length > 0 ? (
          <div className="space-y-3">
            {interviews.upcoming.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-3"
              >
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="space-y-0.5">
                    <h4 className="font-bold text-sm text-slate-900">{item.round}</h4>
                    <p className="text-xs text-slate-500 font-medium">
                      Interviewer: <span className="text-slate-800 font-semibold">{item.interviewer}</span>
                    </p>
                  </div>

                  <span className="px-2.5 py-1 text-xs font-bold bg-blue-50 text-blue-700 rounded-md border border-blue-200">
                    {item.status}
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-2 border-t border-slate-100">
                  <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                    <FaCalendarAlt className="text-slate-400 text-xs" />
                    {item.date} at {item.time}
                  </span>

                  {item.meetingLink && (
                    <a
                      href={item.meetingLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold rounded-lg border border-emerald-200 transition-colors"
                    >
                      <FaVideo className="text-emerald-600 text-xs" />
                      <span>Join Video Call</span>
                      <FaExternalLinkAlt className="text-[10px] text-emerald-600" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center text-xs text-slate-500 font-medium">
            No upcoming interviews scheduled.
          </div>
        )}
      </div>

      {/* 2. Past Interviews & Recruiter Feedback */}
      <div className="space-y-3 pt-2">
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-600" />
          <span>Completed Interview Feedback</span>
        </h3>

        {interviews.past && interviews.past.length > 0 ? (
          <div className="space-y-3">
            {interviews.past.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-3"
              >
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="space-y-0.5">
                    <h4 className="font-bold text-sm text-slate-900">{item.round}</h4>
                    <p className="text-xs text-slate-500 font-medium">
                      Interviewer: <span className="text-slate-800 font-semibold">{item.interviewer}</span> • {item.date}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 text-xs font-bold bg-amber-50 text-amber-700 rounded border border-amber-200 flex items-center gap-1">
                      <FaStar className="text-amber-500 text-xs" />
                      <span>{item.rating} / 5.0</span>
                    </span>

                    <span className="px-2 py-0.5 text-xs font-bold bg-emerald-50 text-emerald-700 rounded border border-emerald-200">
                      {item.recommendation}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 text-xs space-y-1">
                  <span className="font-bold text-slate-700 flex items-center gap-1">
                    <FaCommentDots className="text-slate-400 text-xs" />
                    Interviewer Feedback & Notes:
                  </span>
                  <p className="text-slate-600 leading-relaxed font-medium">
                    "{item.notes}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center text-xs text-slate-500 font-medium">
            No completed interview feedback yet.
          </div>
        )}
      </div>
    </div>
  );
}

export default InterviewSection;
