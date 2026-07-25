import React, { useState } from "react";
import { FaCheckCircle, FaCircle, FaArrowRight, FaCalendarAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function TodaysPriorities() {
  const navigate = useNavigate();

  const [priorities, setPriorities] = useState([
    { id: 1, text: "Review 8 new resume matches for Senior Frontend Lead", completed: false, category: "Review" },
    { id: 2, text: "Technical Interview with Sarah Chen at 2:00 PM PST", completed: false, category: "Interview" },
    { id: 3, text: "Send Offer Package to Marcus Vance ($165k base)", completed: false, category: "Offer" },
    { id: 4, text: "Review 3 pending interviewer feedback forms for Engineering Lead", completed: false, category: "Feedback" },
  ]);

  const toggleComplete = (id) => {
    setPriorities(
      priorities.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4 font-sans">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs border border-blue-100">
            <FaCalendarAlt />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Today's Priorities
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              High-priority tasks requiring recruiter action today
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate("/interviews")}
          className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 cursor-pointer bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg border border-blue-200 transition-colors"
        >
          <span>View Schedule</span>
          <FaArrowRight className="text-[10px]" />
        </button>
      </div>

      {/* Task List */}
      <div className="space-y-2.5">
        {priorities.map((item) => (
          <div
            key={item.id}
            onClick={() => toggleComplete(item.id)}
            className={`p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between gap-3 text-xs ${
              item.completed
                ? "bg-slate-50 border-slate-200 text-slate-400 line-through"
                : "bg-slate-50/70 border-slate-200/80 text-slate-800 hover:bg-slate-50"
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <button type="button" className="text-slate-400 hover:text-blue-600 shrink-0">
                {item.completed ? (
                  <FaCheckCircle className="text-emerald-500 text-sm" />
                ) : (
                  <FaCircle className="text-slate-300 text-xs" />
                )}
              </button>
              <span className="font-semibold truncate leading-snug">{item.text}</span>
            </div>

            <span className="px-2 py-0.5 text-[10px] font-bold bg-white text-slate-600 rounded border border-slate-200 shrink-0">
              {item.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodaysPriorities;
