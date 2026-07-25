import React, { useRef, useState } from "react";
import { FaCloudUploadAlt, FaFilePdf, FaFolderOpen } from "react-icons/fa";
import Button from "../common/Button";

function UploadDropzone({ onFileSelect, onError }) {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const validateAndSelect = (file) => {
    // 1. PDF Only validation
    if (!file.name.toLowerCase().endsWith(".pdf") && file.type !== "application/pdf") {
      if (onError) onError("Only PDF files are allowed. Please upload a .pdf document.");
      return;
    }

    // 2. Maximum 10 MB size limit validation (10 * 1024 * 1024 bytes)
    const maxBytes = 10 * 1024 * 1024;
    if (file.size > maxBytes) {
      if (onError) onError(`File size exceeds 10 MB limit (${(file.size / (1024 * 1024)).toFixed(1)} MB).`);
      return;
    }

    onFileSelect(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSelect(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSelect(e.target.files[0]);
    }
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,application/pdf"
        onChange={handleChange}
        className="hidden"
      />

      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`group relative cursor-pointer rounded-2xl border-2 border-dashed p-8 sm:p-12 text-center transition-all duration-200 ${
          dragActive
            ? "border-blue-500 bg-blue-50/70 shadow-lg scale-[1.01]"
            : "border-slate-300 hover:border-blue-500 bg-slate-50/50 hover:bg-white shadow-2xs hover:shadow-md"
        }`}
      >
        {/* Icon */}
        <div className="mx-auto mb-4 flex w-16 h-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 shadow-2xs transition-transform group-hover:scale-110">
          <FaCloudUploadAlt className="text-3xl" />
        </div>

        {/* Header Text */}
        <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
          Drag & Drop your resume here
        </h3>

        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm mx-auto leading-relaxed">
          Upload a candidate PDF resume to analyze skills, ATS score, and job category match.
        </p>

        {/* Browse Button */}
        <div className="mt-6 flex items-center justify-center">
          <Button
            variant="primary"
            size="md"
            icon={FaFolderOpen}
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
          >
            Browse Files
          </Button>
        </div>

        {/* Constraint Badges */}
        <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-slate-400 font-medium">
          <span className="bg-white px-2 py-0.5 rounded-md border border-slate-200 text-slate-600 font-semibold flex items-center gap-1">
            <FaFilePdf className="text-rose-500 text-xs" />
            PDF Only
          </span>
          <span>•</span>
          <span>Maximum 10 MB</span>
        </div>
      </div>
    </div>
  );
}

export default UploadDropzone;
