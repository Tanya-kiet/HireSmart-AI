import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaCalendarAlt } from "react-icons/fa";

function MiniCalendar({ selectedDate, onSelectDate }) {
  const [currentMonth] = useState("July 2026");

  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  // Highlighting days with scheduled interviews
  const scheduledDays = [12, 14, 18, 20, 24, 25, 28];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3 font-sans text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <div className="flex items-center gap-1.5 font-bold text-slate-900">
          <FaCalendarAlt className="text-slate-500 text-xs" />
          <span>{currentMonth}</span>
        </div>
        <div className="flex items-center gap-1 text-slate-400">
          <button className="p-1 hover:text-slate-800 rounded">
            <FaChevronLeft className="text-[10px]" />
          </button>
          <button className="p-1 hover:text-slate-800 rounded">
            <FaChevronRight className="text-[10px]" />
          </button>
        </div>
      </div>

      {/* Grid Header */}
      <div className="grid grid-cols-7 gap-1 text-center font-bold text-[10px] text-slate-400 uppercase">
        {daysOfWeek.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Grid Days */}
      <div className="grid grid-cols-7 gap-1 text-center font-medium">
        {daysInMonth.map((day) => {
          const dateStr = `2026-07-${day < 10 ? "0" + day : day}`;
          const isSelected = selectedDate === dateStr || (selectedDate === null && day === 25);
          const hasScheduled = scheduledDays.includes(day);

          return (
            <button
              key={day}
              type="button"
              onClick={() => onSelectDate(isSelected ? null : dateStr)}
              className={`p-1.5 rounded-lg text-[11px] transition-all cursor-pointer relative ${
                isSelected
                  ? "bg-slate-900 text-white font-bold shadow-2xs"
                  : hasScheduled
                  ? "bg-blue-50 text-blue-900 font-bold hover:bg-blue-100"
                  : "hover:bg-slate-100 text-slate-700"
              }`}
            >
              <span>{day}</span>
              {hasScheduled && !isSelected && (
                <span className="w-1 h-1 rounded-full bg-blue-600 absolute bottom-1 left-1/2 -translate-x-1/2" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default MiniCalendar;
