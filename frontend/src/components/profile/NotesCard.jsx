import React, { useState } from "react";
import { FaStickyNote, FaPaperPlane, FaBookmark, FaTrash, FaUser } from "react-icons/fa";

function NotesCard({ initialNotes = [] }) {
  const [notes, setNotes] = useState(initialNotes);
  const [newNoteText, setNewNoteText] = useState("");

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    const now = new Date();
    const formattedDate = `${now.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })} · ${now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })}`;

    const newNote = {
      id: `note-${Date.now()}`,
      author: "Tanya Bhadana",
      role: "Senior Recruiter",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop",
      timestamp: formattedDate,
      content: newNoteText.trim(),
      pinned: false,
    };

    setNotes([newNote, ...notes]);
    setNewNoteText("");
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  const handleTogglePin = (id) => {
    setNotes(
      notes.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n))
    );
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <FaStickyNote className="text-slate-500 text-sm" />
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">
            Recruiter Notes
          </h3>
        </div>
        <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
          {notes.length} Notes
        </span>
      </div>

      {/* Note Input Form */}
      <form onSubmit={handleAddNote} className="space-y-2">
        <textarea
          rows={3}
          placeholder="Add recruiter note or interview feedback..."
          value={newNoteText}
          onChange={(e) => setNewNoteText(e.target.value)}
          className="w-full p-2.5 bg-slate-50 text-slate-800 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-blue-500 focus:bg-white transition-all placeholder-slate-400 font-medium resize-none"
        />

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!newNoteText.trim()}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <FaPaperPlane className="text-[10px]" />
            <span>Post Note</span>
          </button>
        </div>
      </form>

      {/* Notes Stream */}
      <div className="space-y-2.5 pt-1 max-h-80 overflow-y-auto pr-1">
        {notes.length === 0 ? (
          <p className="text-xs text-slate-400 font-medium text-center py-3">
            No notes posted yet.
          </p>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className={`p-3 rounded-lg border text-xs space-y-2 transition-all ${
                note.pinned
                  ? "bg-amber-50/50 border-amber-200"
                  : "bg-slate-50/60 border-slate-200/80"
              }`}
            >
              {/* Note Header */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {note.avatar ? (
                    <img
                      src={note.avatar}
                      alt={note.author}
                      className="w-5 h-5 rounded-full object-cover border border-slate-300"
                    />
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-slate-700 text-white flex items-center justify-center text-[10px]">
                      <FaUser />
                    </div>
                  )}
                  <span className="font-bold text-slate-900">{note.author}</span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {note.role}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleTogglePin(note.id)}
                    className={`p-1 rounded text-[10px] ${
                      note.pinned
                        ? "text-amber-600 bg-amber-100"
                        : "text-slate-400 hover:text-slate-600"
                    }`}
                    title={note.pinned ? "Unpin Note" : "Pin Note"}
                  >
                    <FaBookmark />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteNote(note.id)}
                    className="p-1 text-slate-400 hover:text-rose-600 rounded text-[10px]"
                    title="Delete Note"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>

              {/* Content */}
              <p className="text-slate-700 font-medium leading-relaxed">
                {note.content}
              </p>

              {/* Timestamp */}
              <div className="text-[10px] text-slate-400 font-medium text-right pt-1 border-t border-slate-200/40">
                {note.timestamp}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default NotesCard;
