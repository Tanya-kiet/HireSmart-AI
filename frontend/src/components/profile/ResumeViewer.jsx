import React, { useState } from "react";
import {
  FaFilePdf,
  FaSearch,
  FaDownload,
  FaCopy,
  FaExpand,
  FaCheck,
  FaFont,
  FaFileAlt,
} from "react-icons/fa";

function ResumeViewer({ candidateName, resumeText }) {
  const [viewMode, setViewMode] = useState("document"); // 'document' or 'raw'
  const [searchTerm, setSearchTerm] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([resumeText], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${candidateName.replace(/\s+/g, "_")}_Resume.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 text-white overflow-hidden shadow-sm space-y-0">
      {/* PDF Viewer Header Toolbar */}
      <div className="p-3 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-rose-600/20 text-rose-400 flex items-center justify-center font-bold">
            <FaFilePdf className="text-sm" />
          </div>
          <div>
            <span className="font-bold text-white tracking-tight block">
              {candidateName}_Resume_2026.pdf
            </span>
            <span className="text-[10px] text-slate-400 font-medium">
              OCR Processed • PDF/A 1.4 Format • 2 Pages
            </span>
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search Box */}
          <div className="relative">
            <FaSearch className="absolute left-2.5 top-2.5 text-slate-500 text-[10px]" />
            <input
              type="text"
              placeholder="Find in resume..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-7 pr-3 py-1 bg-slate-900 text-slate-200 border border-slate-700 rounded-lg text-xs focus:outline-none focus:border-blue-500 w-36 sm:w-48 placeholder-slate-500"
            />
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-900 rounded-lg p-0.5 border border-slate-700">
            <button
              onClick={() => setViewMode("document")}
              className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                viewMode === "document"
                  ? "bg-blue-600 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Document
            </button>
            <button
              onClick={() => setViewMode("raw")}
              className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                viewMode === "raw"
                  ? "bg-blue-600 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Raw Text
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="p-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg border border-slate-700 transition-colors cursor-pointer"
            title="Copy Text"
          >
            {copied ? <FaCheck className="text-emerald-400 text-xs" /> : <FaCopy className="text-xs" />}
          </button>

          <button
            onClick={handleDownload}
            className="p-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg border border-slate-700 transition-colors cursor-pointer"
            title="Download Document"
          >
            <FaDownload className="text-xs" />
          </button>
        </div>
      </div>

      {/* Embedded Document Viewer Screen */}
      <div className="p-6 bg-slate-900 min-h-[420px] max-h-[550px] overflow-y-auto font-mono text-xs text-slate-200 leading-relaxed space-y-4 select-text border-t border-slate-800">
        {viewMode === "document" ? (
          <div className="max-w-3xl mx-auto bg-white text-slate-900 p-8 rounded-lg shadow-xl font-sans space-y-6">
            {/* Embedded Resume Sheet simulation */}
            <div className="border-b border-slate-200 pb-4 flex justify-between items-start">
              <div>
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                  {candidateName}
                </h1>
                <p className="text-xs font-semibold text-slate-600">
                  Senior Lead Frontend Engineer
                </p>
                <p className="text-[11px] text-slate-500 mt-1">
                  San Francisco, CA • sarah.chen@example.com • +1 (555) 234-5678
                </p>
              </div>
              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded border border-emerald-200 uppercase">
                Verified Document
              </span>
            </div>

            <div className="space-y-4 text-xs text-slate-700 font-normal">
              {resumeText.split("\n\n").map((paragraph, idx) => (
                <p key={idx} className="whitespace-pre-line">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        ) : (
          <pre className="whitespace-pre-wrap font-mono text-xs text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-lg border border-slate-800">
            {resumeText}
          </pre>
        )}
      </div>
    </div>
  );
}

export default ResumeViewer;
