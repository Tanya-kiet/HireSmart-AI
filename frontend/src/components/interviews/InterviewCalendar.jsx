import React, { useState } from "react";
import Card from "../common/Card";
import Badge from "../common/Badge";
import { FaChevronLeft, FaChevronRight, FaCalendarAlt } from "react-icons/fa";

function InterviewCalendar({ interviews = [], onSelectDate, selectedDate }) {
  const [currentMonth, setCurrentMonth] = useState("July 2026");

  // Calendar dates matrix for July 2026
  const daysInWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  // July 2026 starts on Wednesday (index 3), 31 days
  const JulyDays = Array.from({ length: 31 }, (_, i) => i + 1);
  const paddingDays = [28, 29, 30]; // June padding

  // Map interviews to day numbers in July 2026
  const getInterviewsForDay = (day) => {
    const formattedDay = day < 10 ? `0${day}` : `${day}`;
    const dateStr = `2026-07-${formattedDay}`;
    return interviews.filter((item) => item.date === dateStr);
  };

  return (
    <Card
      title="Interview Calendar View"
      subtitle="Scheduled candidate interviews across July 2026"
      headerBorder
      action={
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-800 bg-slate-100 px-3 py-1 rounded-xl">
            {currentMonth}
          </span>
        </div>
      }
    >
      <div className="space-y-3">
        {/* Days of week header */}
        <div className="grid grid-cols-7 text-center text-[11px] font-bold text-slate-500 uppercase tracking-wider py-1 border-b border-slate-100">
          {daysInWeek.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-1 text-xs">
          {/* Previous Month Padding */}
          {paddingDays.map((pDay) => (
            <div
              key={`pad-${pDay}`}
              className="h-16 p-1 text-slate-300 bg-slate-50/50 rounded-xl border border-slate-100/50 text-[10px] font-medium"
            >
              {pDay}
            </div>
          ))}

          {/* July Days */}
          {JulyDays.map((day) => {
            const formattedDay = day < 10 ? `0${day}` : `${day}`;
            const dateStr = `2026-07-${formattedDay}`;
            const dayInterviews = getInterviewsForDay(day);
            const isSelected = selectedDate === dateStr;
            const isToday = day === 24;

            return (
              <div
                key={day}
                onClick={() => onSelectDate(isSelected ? null : dateStr)}
                className={`h-16 p-1.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "border-blue-500 bg-blue-50/70 shadow-xs ring-2 ring-blue-500/20"
                    : isToday
                    ? "border-emerald-300 bg-emerald-50/30"
                    : "border-slate-200/80 bg-white hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span
                    className={`font-bold ${
                      isToday
                        ? "text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded-full"
                        : "text-slate-700"
                    }`}
                  >
                    {day}
                  </span>
                  {dayInterviews.length > 0 && (
                    <span className="text-[9px] font-extrabold text-blue-600 bg-blue-100 px-1 rounded-full">
                      {dayInterviews.length}
                    </span>
                  )}
                </div>

                {/* Mini Event Dots / Pills */}
                <div className="space-y-0.5 overflow-hidden">
                  {dayInterviews.slice(0, 2).map((evt) => (
                    <div
                      key={evt.id}
                      className={`text-[9px] font-semibold px-1 py-0.5 rounded-md truncate ${
                        evt.status === "Completed"
                          ? "bg-emerald-100 text-emerald-800"
                          : evt.status === "Scheduled"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {evt.time} {evt.candidateName.split(" ")[0]}
                    </div>
                  ))}
                  {dayInterviews.length > 2 && (
                    <div className="text-[8px] font-bold text-slate-400">
                      +{dayInterviews.length - 2} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}

export default InterviewCalendar;
