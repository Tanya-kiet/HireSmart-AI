import React from "react";
import { FaSignOutAlt, FaExclamationTriangle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

function SignOutDialog({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { logout } = useUser();

  if (!isOpen) return null;

  const handleConfirmSignOut = () => {
    onClose();
    logout();
    navigate("/welcome", { replace: true });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 font-sans animate-fade-in text-xs">
      <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-150">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center text-base shrink-0">
            <FaExclamationTriangle />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Sign Out
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Are you sure you want to sign out of HireSmart AI? Your session will be completely cleared.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirmSignOut}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
          >
            <FaSignOutAlt className="text-xs" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignOutDialog;
