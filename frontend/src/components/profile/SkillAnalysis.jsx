import React from "react";
import Card from "../common/Card";
import Badge from "../common/Badge";
import { FaCode, FaCheckCircle } from "react-icons/fa";

function SkillAnalysis({ skills = [] }) {
  return (
    <Card
      title="Skill Competency Analysis"
      subtitle="Parsed proficiency levels for technical stacks and soft skills"
      headerBorder
      action={
        <Badge variant="blue" size="sm">
          {skills.length} Skills Evaluated
        </Badge>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {skills.map((skill, idx) => (
          <div
            key={idx}
            className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 space-y-1.5"
          >
            <div className="flex justify-between items-center font-bold">
              <span className="text-slate-800 flex items-center gap-1.5">
                <FaCheckCircle className="text-blue-600 text-xs" />
                <span>{skill.name}</span>
              </span>
              <span className="text-blue-700 font-mono">{skill.level}%</span>
            </div>

            <div className="w-full bg-slate-200/80 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  skill.level >= 90
                    ? "bg-emerald-500"
                    : skill.level >= 80
                    ? "bg-blue-600"
                    : "bg-amber-500"
                }`}
                style={{ width: `${skill.level}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default SkillAnalysis;
