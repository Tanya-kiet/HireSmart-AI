import React from "react";
import { FaExclamationTriangle, FaTimes } from "react-icons/fa";
import Button from "../common/Button";

function DeleteModal({ job, isOpen, onClose, onConfirm }) {
  if (!isOpen || !job) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 z-10 space-y-5">
        <div className="flex items-start justify-between">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center text-xl shrink-0 border border-rose-100">
            <FaExclamationTriangle />
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
          >
            <FaTimes className="text-sm" />
          </button>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            Delete Job Description?
          </h3>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Are you sure you want to delete <strong className="text-slate-900">{job.title}</strong>? All candidate match links for this job will be unlinked.
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="secondary" size="md" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="danger" size="md" onClick={onConfirm}>
            Delete Job
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
