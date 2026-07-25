import React, { useState } from "react";
import { FaTimes, FaCheck } from "react-icons/fa";
import { useUser } from "../../context/UserContext";
import AvatarUploader from "./AvatarUploader";

function EditProfileModal({ isOpen, onClose }) {
  const { user, updateProfile } = useUser();

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone || "+1 (415) 555-0192",
    location: user.location || "San Francisco, CA",
    department: user.department || "Talent Acquisition",
    jobTitle: user.jobTitle || "Senior Recruiter",
    avatar: user.avatar,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      setError("Name and Email are required fields.");
      return;
    }

    setIsSaving(true);
    setError(null);

    setTimeout(() => {
      updateProfile({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        department: formData.department,
        jobTitle: formData.jobTitle,
        role: formData.jobTitle,
        avatar: formData.avatar,
      });
      setIsSaving(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 font-sans animate-fade-in text-xs">
      <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">
            Edit Account Profile
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            <FaTimes className="text-xs" />
          </button>
        </div>

        {error && (
          <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-lg font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Avatar Upload Field */}
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200/70">
            <AvatarUploader
              avatarUrl={formData.avatar}
              name={formData.name}
              size="md"
              onAvatarChange={(url) => setFormData({ ...formData, avatar: url })}
            />
            <div>
              <span className="font-bold text-slate-800 block">Profile Photo</span>
              <span className="text-[10px] text-slate-400 font-medium">Click avatar to change photo</span>
            </div>
          </div>

          {/* Full Name & Job Title */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-slate-800 uppercase tracking-wider text-[10px] block">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none focus:bg-white"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-800 uppercase tracking-wider text-[10px] block">
                Job Title
              </label>
              <input
                type="text"
                value={formData.jobTitle}
                onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none focus:bg-white"
              />
            </div>
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-slate-800 uppercase tracking-wider text-[10px] block">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none focus:bg-white"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-800 uppercase tracking-wider text-[10px] block">
                Phone Number
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none focus:bg-white"
              />
            </div>
          </div>

          {/* Location & Department */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-slate-800 uppercase tracking-wider text-[10px] block">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none focus:bg-white"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-800 uppercase tracking-wider text-[10px] block">
                Department
              </label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none focus:bg-white"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs disabled:opacity-50"
            >
              <FaCheck className="text-xs" />
              <span>{isSaving ? "Saving..." : "Save Changes"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfileModal;
