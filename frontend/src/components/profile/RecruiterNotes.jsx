import React, { useState } from "react";
import Card from "../common/Card";
import Button from "../common/Button";
import { FaEdit, FaSave, FaCheck } from "react-icons/fa";

function RecruiterNotes({ initialNotes }) {
  const [notes, setNotes] = useState(
    initialNotes ||
      "Candidate passed Technical Round with flying colors. Very articulate communicator and strong culture fit. Salary expectations aligned with Senior Band ($145k-$160k)."
  );
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <Card
      title="Recruiter & Interviewer Internal Notes"
      subtitle="Editable rich text notes shared across internal hiring team"
      headerBorder
      action={
        <Button
          variant="primary"
          size="xs"
          icon={saved ? FaCheck : FaSave}
          onClick={handleSave}
        >
          {saved ? "Notes Saved" : "Save Notes"}
        </Button>
      }
    >
      <div className="space-y-2">
        <textarea
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add recruiter notes, candidate feedback, or salary discussion comments..."
          className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-medium focus:ring-2 focus:ring-blue-500/20 focus:bg-white focus:outline-hidden leading-relaxed"
        />
        <div className="text-[10px] text-slate-400 font-medium text-right">
          Visible to hiring manager and recruiters only
        </div>
      </div>
    </Card>
  );
}

export default RecruiterNotes;
