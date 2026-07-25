import React, { useState } from "react";
import { FaTimes, FaUser, FaEdit, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBuilding, FaBriefcase } from "react-icons/fa";
import { useUser } from "../../context/UserContext";
import AvatarUploader from "./AvatarUploader";
import EditProfileModal from "./EditProfileModal";

function ProfileDrawer({ isOpen, onClose }) {
  const { user, updateProfile } = useUser();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-hidden font-sans animate-fade-in text-xs">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs transition-opacity cursor-pointer"
          onClick={onClose}
        />

        {/* Drawer Container (420px max width) */}
        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <div className="w-screen max-w-[420px] bg-white shadow-2xl border-l border-slate-200 flex flex-col justify-between overflow-hidden">
            {/* Header */}
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-xs">
                  <FaUser />
                </div>
                <div>
                  <h3 className="text-sm font-bold tracking-tight text-white">
                    My Profile
                  </h3>
                  <p className="text-[10px] text-slate-400 font-medium">
                    Recruiter account details
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
              >
                <FaTimes className="text-sm" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {/* Profile Card Header */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3 text-center shadow-2xs">
                <div className="flex justify-center">
                  <AvatarUploader
                    avatarUrl={user.avatar}
                    name={user.name}
                    size="lg"
                    onAvatarChange={(url) => updateProfile({ avatar: url })}
                  />
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 text-base">{user.name}</h4>
                  <p className="text-xs text-slate-500 font-medium">{user.role || user.jobTitle}</p>
                </div>
              </div>

              {/* Read-Only Details Card */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3 shadow-2xs">
                <h5 className="font-bold text-slate-900 border-b border-slate-100 pb-2 text-xs">
                  Account Details
                </h5>

                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center gap-3">
                    <FaEnvelope className="text-slate-400 text-xs shrink-0" />
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block uppercase">Email</span>
                      <span className="font-semibold text-slate-800">{user.email}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <FaPhone className="text-slate-400 text-xs shrink-0" />
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block uppercase">Phone</span>
                      <span className="font-semibold text-slate-800">{user.phone || "+1 (415) 555-0192"}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <FaBuilding className="text-slate-400 text-xs shrink-0" />
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block uppercase">Department</span>
                      <span className="font-semibold text-slate-800">{user.department || "Talent Acquisition"}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <FaBriefcase className="text-slate-400 text-xs shrink-0" />
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block uppercase">Job Title</span>
                      <span className="font-semibold text-slate-800">{user.jobTitle || user.role}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <FaMapMarkerAlt className="text-slate-400 text-xs shrink-0" />
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block uppercase">Location</span>
                      <span className="font-semibold text-slate-800">{user.location || "San Francisco, CA"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-end gap-2 shrink-0">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => setIsEditModalOpen(true)}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
              >
                <FaEdit className="text-xs" />
                <span>Edit Profile</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </>
  );
}

export default ProfileDrawer;
