import React from "react";
import Card from "../common/Card";
import Badge from "../common/Badge";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";

const skillsData = [
  { skill: "React.js", count: 1240, percentage: 88, color: "#2563eb" },
  { skill: "Python", count: 1150, percentage: 82, color: "#8b5cf6" },
  { skill: "TypeScript", count: 980, percentage: 74, color: "#06b6d4" },
  { skill: "AWS / Cloud", count: 860, percentage: 65, color: "#10b981" },
  { skill: "SQL / Postgres", count: 810, percentage: 61, color: "#3b82f6" },
  { skill: "Docker", count: 690, percentage: 52, color: "#f59e0b" },
  { skill: "FastAPI", count: 540, percentage: 41, color: "#ec4899" },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-800 text-xs space-y-1 z-50">
        <p className="font-bold text-slate-200">Skill: {data.skill}</p>
        <div className="flex items-center justify-between gap-4 text-slate-300">
          <span>Occurrences:</span>
          <span className="font-mono font-bold text-white">{data.count}</span>
        </div>
        <div className="flex items-center justify-between gap-4 text-slate-300">
          <span>Candidate Match Rate:</span>
          <span className="font-mono font-bold text-emerald-400">
            {data.percentage}%
          </span>
        </div>
      </div>
    );
  }
  return null;
};

function TopSkillsChart() {
  return (
    <Card
      title="Top Skills"
      subtitle="Most frequent technical skill vectors detected across applicant pool"
      headerBorder
      action={
        <Badge variant="purple" size="sm">
          Top 7 Vectors
        </Badge>
      }
    >
      <div className="h-64 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={skillsData}
            margin={{ top: 5, right: 20, left: 25, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
            <XAxis type="number" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis
              type="category"
              dataKey="skill"
              stroke="#475569"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              width={90}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="count" radius={[0, 6, 6, 0]}>
              {skillsData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export default TopSkillsChart;
