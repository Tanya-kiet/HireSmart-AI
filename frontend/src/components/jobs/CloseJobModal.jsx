import React from "react";
import Modal from "../ui/Modal";
import { FaExclamationTriangle, FaCheck } from "react-icons/fa";

function CloseJobModal({ isOpen, onClose, onConfirm, jobTitle }) {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Close Position Confirmation" maxWidth="max-w-md">
      <div className="space-y-4 font-sans text-xs">
        <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-3">
          <FaExclamationTriangle className="text-amber-600 text-base shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-amber-900 text-xs">Close Requisition?</h4>
            <p className="text-amber-800 text-[11px] font-medium mt-0.5 leading-relaxed">
              Are you sure you want to close position <strong className="text-amber-950">"{jobTitle}"</strong>?
              Hiring will be marked as complete and moved to the Closed Jobs tab.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
          >
            <FaCheck className="text-xs" />
            <span>Close Position</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default CloseJobModal;
