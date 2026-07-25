import React from "react";
import Card from "../common/Card";
import { FaFilePdf, FaDownload, FaFileAlt } from "react-icons/fa";

function Documents({ documents = [] }) {
  return (
    <Card
      title="Candidate Documents"
      subtitle="Uploaded resume, certificates, and portfolio files"
      headerBorder
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        {documents.map((doc, idx) => (
          <div
            key={idx}
            className="p-3.5 bg-slate-50 hover:bg-slate-100/70 rounded-xl border border-slate-200/70 flex items-center justify-between gap-3 group transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center text-lg shrink-0 border border-rose-100">
                <FaFilePdf />
              </div>
              <div className="min-w-0">
                <h5 className="font-bold text-slate-900 truncate">
                  {doc.name}
                </h5>
                <span className="text-[10px] text-slate-400 font-medium">
                  {doc.type} • {doc.size}
                </span>
              </div>
            </div>

            <button
              onClick={() => alert(`Downloading: ${doc.name}`)}
              className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg cursor-pointer shrink-0"
              title="Download file"
            >
              <FaDownload className="text-xs" />
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default Documents;
