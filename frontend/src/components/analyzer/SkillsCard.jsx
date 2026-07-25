import React from "react";
import Card from "../common/Card";
import SkillBadge from "../upload/SkillBadge";
import { FaCode, FaLaptopCode, FaComments, FaTools, FaLayerGroup } from "react-icons/fa";

function SkillsCard() {
  const skillCategories = [
    {
      title: "Languages",
      icon: FaCode,
      skills: ["Python", "JavaScript (ES6+)", "TypeScript", "SQL", "HTML5/CSS3"],
      variant: "technical",
    },
    {
      title: "Frameworks & Libraries",
      icon: FaLayerGroup,
      skills: ["React 19", "FastAPI", "Next.js", "Redux Toolkit", "Tailwind CSS", "Scikit-Learn"],
      variant: "technical",
    },
    {
      title: "Tools & Infrastructure",
      icon: FaTools,
      skills: ["Git & GitHub", "Vite", "PostgreSQL", "VS Code", "Postman", "npm"],
      variant: "technical",
    },
    {
      title: "Soft & Management Skills",
      icon: FaComments,
      skills: ["Problem Solving", "Teamwork", "Agile / Scrum", "Technical Communication", "Code Review"],
      variant: "soft",
    },
  ];

  return (
    <Card
      title="Categorized Skill Breakdown"
      subtitle="Full taxonomy of extracted technical, language, and soft skill vectors"
      headerBorder
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skillCategories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <div
              key={idx}
              className="p-4 bg-slate-50 rounded-2xl border border-slate-200/70 space-y-2.5"
            >
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span className="flex items-center gap-2">
                  <Icon className="text-blue-600 text-xs" />
                  <span>{cat.title}</span>
                </span>
                <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                  {cat.skills.length}
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {cat.skills.map((skill, sIdx) => (
                  <SkillBadge key={sIdx} name={skill} category={cat.variant} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export default SkillsCard;
