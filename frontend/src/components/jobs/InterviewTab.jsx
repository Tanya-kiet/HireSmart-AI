import React from "react";
import {
  FaCalendarAlt,
  FaVideo,
  FaStar,
  FaExternalLinkAlt,
  FaCommentDots,
  FaUserCheck,
} from "react-icons/fa";

function InterviewTab({ interviews, onSchedule }) {
  if (!interviews) return null;

  const upcomingInterviews = interviews.filter((i) => i.status === "Scheduled");
  const completedInterviews = interviews.filter((i) => i.status === "Completed");

  return (
    <div className="space-y-6 font-sans">
      {/* Top Banner & Header */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 font-extrabold text-slate-900 text-sm">
            <FaStar className="text-amber-500 text-sm" />
            <span>4.9 / 5.0</span>
            <span className="text-slate-400 font-normal text-xs">Avg Interview Score</span>
          </div>
          <span className="text-slate-300">•</span>
          <span className="text-slate-600 font-medium">
            {interviews.length} Scheduled & Completed Rounds
          </span>
        </div>

        <button
          onClick={onSchedule}
          className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
        >
          <FaCalendarAlt className="text-xs" />
          <span>Schedule Interview</span>
        </button>
      </div>

      {/* Upcoming Interviews Section */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-600" />
          <span>Upcoming Scheduled Interviews</span>
        </h3>

        {upcomingInterviews.length === 0 ? (
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center text-xs text-slate-500 font-medium">
            No upcoming interviews scheduled.
          </div>
        ) : (
          <div className="space-y-3">
            {upcomingInterviews.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-3"
              >
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-3">
                    {item.candidatePhoto ? (
                      <img src={item.candidatePhoto} alt={item.candidateName} className="w-9 h-9 rounded-lg object-cover border border-slate-200" />
                    ) : (
                      <div className="w-9 h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                        {item.candidateName.split(" ").map(n => n[0]).join("")}
                      </div>
                    )}
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{item.candidateName}</h4>
                      <p className="text-xs text-slate-500 font-medium">{item.round}</p>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 text-xs font-bold bg-blue-50 text-blue-700 rounded-md border border-blue-200">
                    {item.status}
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-2 border-t border-slate-100 font-medium text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <FaCalendarAlt className="text-slate-400 text-xs" />
                    {item.date} at {item.time} • <strong className="text-slate-800">{item.interviewer}</strong>
                  </span>

                  {item.meetingLink && (
                    <a
                      href={item.meetingLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold rounded-lg border border-emerald-200 transition-colors"
                    >
                      <FaVideo className="text-emerald-600 text-xs" />
                      <span>Join Meeting Call</span>
                      <FaExternalLinkAlt className="text-[9px] text-emerald-600" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Completed Interviews Section */}
      <div className="space-y-3 pt-2">
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-600" />
          <span>Completed Interview Feedback</span>
        </h3>

        {completedInterviews.length === 0 ? (
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center text-xs text-slate-500 font-medium">
            No completed interview feedback recorded yet.
          </div>
        ) : (
          <div className="space-y-3">
            {completedInterviews.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-3"
              >
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-3">
                    {item.candidatePhoto ? (
                      <img src={item.candidatePhoto} alt={item.candidateName} className="w-9 h-9 rounded-lg object-cover border border-slate-200" />
                    ) : (
                      <div className="w-9 h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                        {item.candidateName.split(" ").map(n => n[0]).join("")}
                      </div>
                    )}
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{item.candidateName}</h4>
                      <p className="text-xs text-slate-500 font-medium">{item.round} • {item.date}</p>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 text-xs font-bold bg-amber-50 text-amber-800 rounded border border-amber-200 flex items-center gap-1">
                    <FaStar className="text-amber-500 text-xs" />
                    <span>{item.rating} / 5.0 Rating</span>
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 text-xs space-y-1">
                  <span className="font-bold text-slate-700 flex items-center gap-1">
                    <FaCommentDots className="text-slate-400 text-xs" />
                    Interviewer ({item.interviewer}) Feedback:
                  </span>
                  <p className="text-slate-600 leading-relaxed font-medium">
                    "{item.feedback}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default InterviewTab;
