import React from "react";
import { FaTimes } from "react-icons/fa";

function Modal({ isOpen, onClose, title, children, maxWidth = "max-w-md" }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Dialog Window */}
      <div
        className={`relative bg-white rounded-2xl border border-slate-200/90 shadow-2xl w-full ${maxWidth} z-10 overflow-hidden space-y-4 p-6`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            <FaTimes className="text-sm" />
          </button>
        </div>

        {/* Body */}
        <div className="text-xs text-slate-700">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
