import React, { useRef } from "react";
import {
  FaFilePdf,
  FaTimes,
  FaRedo,
  FaSearch,
  FaCheckCircle,
} from "react-icons/fa";
import Button from "../common/Button";
import Badge from "../common/Badge";

function UploadCard({
  file,
  onRemove,
  onReplace,
  onAnalyze,
  uploadProgress,
  isLoading,
}) {
  const fileInputRef = useRef(null);

  if (!file) return null;

  const handleReplaceChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onReplace(e.target.files[0]);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-6">
      {/* Hidden input for replace action */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,application/pdf"
        onChange={handleReplaceChange}
        className="hidden"
      />

      {/* Selected PDF File Overview Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200/70">
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center text-2xl shrink-0 border border-rose-100 shadow-2xs">
            <FaFilePdf />
          </div>

          <div className="min-w-0">
            <h4 className="text-sm font-bold text-slate-900 truncate">
              {file.name}
            </h4>
            <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500">
              <span>{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
              <span>•</span>
              <Badge variant="emerald" size="sm" dot>
                PDF Loaded
              </Badge>
            </div>
          </div>
        </div>

        {/* Action Buttons: Replace & Remove */}
        {!isLoading && (
          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 border border-slate-200 transition-colors cursor-pointer"
              title="Replace File"
            >
              <FaRedo className="text-[10px]" />
              <span>Replace</span>
            </button>

            <button
              onClick={onRemove}
              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
              title="Remove File"
            >
              <FaTimes className="text-base" />
            </button>
          </div>
        )}
      </div>

      {/* Upload & Parsing Progress Bar */}
      {isLoading && (
        <div className="space-y-1.5 pt-1">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-blue-700 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
              Parsing PDF Resume & Extracting Skill Vectors...
            </span>
            <span className="text-blue-600 font-mono">{uploadProgress}%</span>
          </div>
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-blue-600 h-full rounded-full transition-all duration-300 shadow-2xs"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Large Primary Analyze Button */}
      <div className="flex justify-end pt-2">
        <Button
          variant="primary"
          size="lg"
          icon={FaSearch}
          loading={isLoading}
          disabled={isLoading}
          onClick={onAnalyze}
          className="w-full sm:w-auto px-8"
        >
          {isLoading ? "Processing..." : "Analyze Resume"}
        </Button>
      </div>
    </div>
  );
}

export default UploadCard;
