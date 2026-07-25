import React, { useState, useEffect } from "react";
import { FaSearch, FaTimes, FaUserAlt, FaFileAlt, FaRobot, FaArrowRight } from "react-icons/fa";
import Badge from "./Badge";
import { useNavigate } from "react-router-dom";

function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open search modal handled externally
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const mockQuickLinks = [
    {
      type: "candidate",
      title: "Sarah Chen",
      subtitle: "Senior React Developer • 96% Match",
      badge: "Top Match",
      variant: "emerald",
      icon: FaUserAlt,
      path: "/candidates",
    },
    {
      type: "candidate",
      title: "Marcus Vance",
      subtitle: "AI / ML Engineer • 92% Match",
      badge: "Shortlisted",
      variant: "blue",
      icon: FaUserAlt,
      path: "/candidates",
    },
    {
      type: "resume",
      title: "Resume_Alex_Rivera_Frontend.pdf",
      subtitle: "Uploaded 2 hours ago • ATS Score 94%",
      badge: "Parsed",
      variant: "slate",
      icon: FaFileAlt,
      path: "/upload",
    },
    {
      type: "action",
      title: "Upload New Resume",
      subtitle: "PDF / DOCX batch processing",
      badge: "Action",
      variant: "purple",
      icon: FaRobot,
      path: "/upload",
    },
  ];

  const filteredItems = query.trim()
    ? mockQuickLinks.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.subtitle.toLowerCase().includes(query.toLowerCase())
      )
    : mockQuickLinks;

  const handleSelect = (path) => {
    onClose();
    navigate(path);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="fixed inset-0"
        onClick={onClose}
      />
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10">
        {/* Search Header */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-100">
          <FaSearch className="text-slate-400 text-lg mr-3 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Type a command or search candidates, resumes, skills..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden"
          />
          {query ? (
            <button
              onClick={() => setQuery("")}
              className="p-1 hover:bg-slate-100 rounded-lg text-slate-400"
            >
              <FaTimes className="text-sm" />
            </button>
          ) : (
            <span className="text-[11px] font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200/60">
              ESC
            </span>
          )}
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2">
          <div className="px-3 py-1.5 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
            {query ? "Search Results" : "Quick Actions & Recent Searches"}
          </div>

          {filteredItems.length === 0 ? (
            <div className="py-8 text-center text-sm text-slate-500">
              No matching candidates or actions found for "{query}".
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const IconComp = item.icon;
              return (
                <div
                  key={index}
                  onClick={() => handleSelect(item.path)}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-blue-50 text-slate-600 group-hover:text-blue-600 flex items-center justify-center transition-colors">
                      <IconComp className="text-sm" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-800 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </div>
                      <div className="text-xs text-slate-400">
                        {item.subtitle}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={item.variant} size="sm">
                      {item.badge}
                    </Badge>
                    <FaArrowRight className="text-slate-300 group-hover:text-blue-600 text-xs opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0" />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
          <span>
            Tip: Use <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded-md font-mono text-[10px]">↑</kbd> <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded-md font-mono text-[10px]">↓</kbd> to navigate
          </span>
          <span>HireSmart AI Engine v2.4</span>
        </div>
      </div>
    </div>
  );
}

export default SearchModal;
