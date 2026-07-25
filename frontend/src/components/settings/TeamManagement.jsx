import React, { useState } from "react";
import { FaUsers, FaUserPlus, FaTrash, FaTimes, FaCheck } from "react-icons/fa";

function TeamManagement() {
  const [members, setMembers] = useState([
    { id: "tm-1", name: "Tanya Bhadana", email: "tanya@hiresmart.ai", role: "Lead Recruiter", status: "Active" },
    { id: "tm-2", name: "Alex Mercer", email: "alex.mercer@hiresmart.ai", role: "Director of Engineering", status: "Active" },
    { id: "tm-3", name: "David Miller", email: "david.m@hiresmart.ai", role: "Engineering Manager", status: "Active" },
    { id: "tm-4", name: "Sophia Martinez", email: "sophia.m@hiresmart.ai", role: "Technical Interviewer", status: "Active" },
  ]);

  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Recruiter");

  const handleInvite = (e) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;

    const newMember = {
      id: `tm-${Date.now()}`,
      name: inviteEmail.split("@")[0].replace(".", " "),
      email: inviteEmail,
      role: inviteRole,
      status: "Invited",
    };

    setMembers([...members, newMember]);
    setInviteEmail("");
    setIsInviteOpen(false);
  };

  const handleRemove = (id) => {
    setMembers(members.filter((m) => m.id !== id));
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4 font-sans text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
          <FaUsers className="text-emerald-600 text-xs" />
          <span>3. Team Management & Permissions</span>
        </div>

        <button
          type="button"
          onClick={() => setIsInviteOpen(true)}
          className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
        >
          <FaUserPlus className="text-xs" />
          <span>Invite Member</span>
        </button>
      </div>

      {/* Team Members Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              <th className="py-2.5 px-3">Team Member</th>
              <th className="py-2.5 px-3">Role & Permissions</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {members.map((m) => (
              <tr key={m.id} className="hover:bg-slate-50">
                <td className="py-3 px-3">
                  <div>
                    <span className="font-bold text-slate-900 block text-xs capitalize">{m.name}</span>
                    <span className="text-[11px] text-slate-400 font-medium">{m.email}</span>
                  </div>
                </td>
                <td className="py-3 px-3 font-semibold text-slate-800">{m.role}</td>
                <td className="py-3 px-3">
                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold rounded border ${
                      m.status === "Active"
                        ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                        : "bg-amber-50 text-amber-800 border-amber-200"
                    }`}
                  >
                    {m.status}
                  </span>
                </td>
                <td className="py-3 px-3 text-right">
                  <button
                    type="button"
                    onClick={() => handleRemove(m.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                    title="Remove member"
                  >
                    <FaTrash className="text-xs" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Invite Member Modal */}
      {isInviteOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 font-sans">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h4 className="font-bold text-slate-900 text-sm">Invite Team Member</h4>
              <button onClick={() => setIsInviteOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleInvite} className="space-y-3">
              <div className="space-y-1">
                <label className="font-bold text-slate-800 uppercase tracking-wider text-[10px] block">
                  Work Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="colleague@company.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-800 uppercase tracking-wider text-[10px] block">
                  Assign Role
                </label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none cursor-pointer"
                >
                  <option value="Recruiter">Recruiter</option>
                  <option value="Hiring Manager">Hiring Manager</option>
                  <option value="Technical Interviewer">Technical Interviewer</option>
                  <option value="HR Admin">HR Admin</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsInviteOpen(false)}
                  className="px-3 py-1.5 bg-slate-100 text-slate-700 font-bold rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-blue-600 text-white font-bold rounded-lg shadow-2xs"
                >
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeamManagement;
