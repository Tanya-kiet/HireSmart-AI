import React from "react";
import { FaHistory, FaBookmark, FaTerminal, FaTimes } from "react-icons/fa";

function PromptHistory({ recentHistory, pinnedPrompts, onSelectPrompt, onClearHistory }) {
  const slashCommands = [
    { cmd: "/candidate", desc: "Search candidates by skill or role" },
    { cmd: "/job", desc: "View job workspace & quality score" },
    { cmd: "/interview", desc: "Generate interview questions" },
    { cmd: "/email", desc: "Draft interview invite, rejection, or offer" },
    { cmd: "/compare", desc: "Compare two candidates side-by-side" },
    { cmd: "/summarise", desc: "Summarise candidate resume" },
    { cmd: "/report", desc: "Generate executive hiring report" },
    { cmd: "/help", desc: "View all copilot capabilities" },
  ];

  return (
    <div className="bg-slate-50 border-b border-slate-200 p-4 space-y-4 text-xs font-sans">
      {/* Pinned Prompts */}
      {pinnedPrompts && pinnedPrompts.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 font-bold text-slate-500 uppercase tracking-wider text-[10px]">
            <FaBookmark className="text-amber-500 text-[10px]" />
            <span>Pinned Prompts</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {pinnedPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => onSelectPrompt(p)}
                className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-800 font-semibold rounded-lg border border-slate-200 cursor-pointer text-[11px]"
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Slash Commands List */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 font-bold text-slate-500 uppercase tracking-wider text-[10px]">
          <FaTerminal className="text-slate-400 text-[10px]" />
          <span>Available Slash Commands</span>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {slashCommands.map((sc, idx) => (
            <button
              key={idx}
              onClick={() => onSelectPrompt(sc.cmd)}
              className="p-2 bg-white hover:bg-blue-50 text-left rounded-lg border border-slate-200 hover:border-blue-200 cursor-pointer text-[11px] space-y-0.5"
            >
              <span className="font-mono font-bold text-blue-600 block">{sc.cmd}</span>
              <span className="text-[10px] text-slate-500 block truncate">{sc.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent History */}
      {recentHistory && recentHistory.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-slate-200/60">
          <div className="flex items-center justify-between font-bold text-slate-500 uppercase tracking-wider text-[10px]">
            <span className="flex items-center gap-1.5">
              <FaHistory className="text-slate-400 text-[10px]" />
              <span>Recent Searches</span>
            </span>
            <button
              onClick={onClearHistory}
              className="text-[10px] text-slate-400 hover:text-slate-700 underline font-normal"
            >
              Clear
            </button>
          </div>
          <div className="space-y-1">
            {recentHistory.slice(0, 4).map((h, idx) => (
              <button
                key={idx}
                onClick={() => onSelectPrompt(h)}
                className="w-full text-left p-1.5 hover:bg-white text-slate-700 rounded font-medium text-[11px] truncate block"
              >
                • {h}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default PromptHistory;
