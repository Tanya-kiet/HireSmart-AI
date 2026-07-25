import React, { useRef, useState } from "react";
import {
  FaCloudUploadAlt,
  FaFilePdf,
  FaFileWord,
  FaFileAlt,
  FaTimes,
  FaCheckCircle,
  FaFolderOpen,
} from "react-icons/fa";
import Button from "../common/Button";
import Badge from "../common/Badge";

function UploadZone({
  selectedFile,
  onFileSelect,
  onFileRemove,
  uploadProgress,
  isUploading,
}) {
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

  const validateAndSelect = (file) => {
    // Only accept PDF, DOCX, DOC, TXT
    const validTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
      "text/plain",
    ];
    if (!file.name.toLowerCase().match(/\.(pdf|docx|doc|txt)$/)) {
      alert("Please upload a valid document format (.pdf, .docx, .doc, .txt)");
      return;
    }
    onFileSelect(file);
  };

  const getFileIcon = (filename) => {
    if (!filename) return FaFileAlt;
    const lower = filename.toLowerCase();
    if (lower.endsWith(".pdf")) return FaFilePdf;
    if (lower.endsWith(".docx") || lower.endsWith(".doc")) return FaFileWord;
    return FaFileAlt;
  };

  const FileIconComponent = selectedFile ? getFileIcon(selectedFile.name) : FaCloudUploadAlt;

  return (
    <div className="w-full">
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.docx,.doc,.txt"
        onChange={handleChange}
        className="hidden"
      />

      {!selectedFile ? (
        /* Empty Drag & Drop State */
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`group relative cursor-pointer rounded-2xl border-2 border-dashed p-8 sm:p-12 text-center transition-all duration-200 ${
            dragActive
              ? "border-blue-500 bg-blue-50/60 shadow-lg scale-[1.01]"
              : "border-slate-200/90 hover:border-blue-400 bg-slate-50/50 hover:bg-white shadow-2xs hover:shadow-md"
          }`}
        >
          <div className="mx-auto mb-4 flex w-16 h-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 shadow-xs transition-transform group-hover:scale-110">
            <FaCloudUploadAlt className="text-3xl" />
          </div>

          <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            Drag & drop your resume file here
          </h3>

          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm mx-auto leading-relaxed">
            Upload PDF or DOCX candidate resumes for instant AI parsing and ATS score predictions.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <Button
              variant="primary"
              size="md"
              icon={FaFolderOpen}
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
            >
              Browse File
            </Button>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-slate-400 font-medium">
            <span className="bg-white px-2 py-0.5 rounded-md border border-slate-200">
              PDF
            </span>
            <span className="bg-white px-2 py-0.5 rounded-md border border-slate-200">
              DOCX
            </span>
            <span>•</span>
            <span>Maximum size 25MB</span>
          </div>
        </div>
      ) : (
        /* Selected File Preview Card */
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl shrink-0 border border-blue-100">
                <FileIconComponent />
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-slate-900 truncate">
                  {selectedFile.name}
                </h4>
                <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500">
                  <span>{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</span>
                  <span>•</span>
                  <Badge variant="emerald" size="sm" dot>
                    Ready for Upload
                  </Badge>
                </div>
              </div>
            </div>

            {!isUploading && (
              <button
                onClick={onFileRemove}
                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                title="Remove File"
              >
                <FaTimes className="text-base" />
              </button>
            )}
          </div>

          {/* Upload Progress Bar */}
          {isUploading && (
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-blue-700 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
                  Uploading & Parsing Resume...
                </span>
                <span className="text-blue-600 font-mono">{uploadProgress}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all duration-300 shadow-xs"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default UploadZone;
