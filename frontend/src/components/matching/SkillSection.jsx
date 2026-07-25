import React from "react";
import Card from "../common/Card";
import Badge from "../common/Badge";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

function SkillSection({ matchingSkills = [], missingSkills = [] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Matching Skills */}
      <Card
        title="Matching Skills"
        subtitle="Skills present in both candidate resume and job description"
        headerBorder
        action={
          <Badge variant="emerald" size="sm" dot>
            {matchingSkills.length} Verified
          </Badge>
        }
      >
        <div className="flex flex-wrap gap-2">
          {matchingSkills.map((skill, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200/80"
            >
              <FaCheckCircle className="text-emerald-600 text-xs" />
              <span>{skill}</span>
            </span>
          ))}
        </div>
      </Card>

      {/* Missing Skills */}
      <Card
        title="Missing Skills"
        subtitle="Skills required in job description but missing in resume"
        headerBorder
        action={
          <Badge variant="amber" size="sm" dot>
            {missingSkills.length} Skill Gaps
          </Badge>
        }
      >
        <div className="flex flex-wrap gap-2">
          {missingSkills.map((skill, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 text-xs font-semibold border border-amber-200/80"
            >
              <FaExclamationTriangle className="text-amber-600 text-xs" />
              <span>{skill}</span>
            </span>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default SkillSection;
