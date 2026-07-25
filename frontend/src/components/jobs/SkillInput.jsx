import React, { useState } from "react";
import { FaTimes, FaPlus } from "react-icons/fa";

function SkillInput({ skills = [], onChange }) {
  const [inputValue, setInputValue] = useState("");

  const handleAddSkill = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !skills.includes(trimmed)) {
      onChange([...skills, trimmed]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    onChange(skills.filter((s) => s !== skillToRemove));
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add required skill (e.g. React, Python, Docker) & press Enter..."
          className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all font-medium"
        />
        <button
          type="button"
          onClick={handleAddSkill}
          className="px-3 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 border border-blue-200"
        >
          <FaPlus className="text-[10px]" />
          <span>Add</span>
        </button>
      </div>

      {/* Chips Area */}
      <div className="flex flex-wrap gap-1.5 pt-1 min-h-[32px]">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-800 rounded-xl text-xs font-semibold border border-blue-200/80 animate-in fade-in duration-150"
          >
            <span>{skill}</span>
            <button
              type="button"
              onClick={() => handleRemoveSkill(skill)}
              className="text-blue-500 hover:text-blue-900 rounded-full p-0.5"
            >
              <FaTimes className="text-[10px]" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}

export default SkillInput;
