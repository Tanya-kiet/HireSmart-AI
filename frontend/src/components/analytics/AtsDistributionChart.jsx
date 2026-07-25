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

const atsData = [
  { range: "90 - 100%", count: 680, label: "High Match", color: "#10b981" },
  { range: "80 - 89%", count: 1140, label: "Strong Match", color: "#2563eb" },
  { range: "70 - 79%", count: 720, label: "Moderate", color: "#8b5cf6" },
  { range: "60 - 69%", count: 380, label: "Needs Improvement", color: "#f59e0b" },
  { range: "< 60%", count: 170, label: "Low Match", color: "#f43f5e" },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-800 text-xs space-y-1 z-50">
        <p className="font-bold text-slate-200">ATS Score Range: {label}</p>
        <div className="flex items-center justify-between gap-4 text-slate-300">
          <span>Tier Classification:</span>
          <span className="font-bold text-blue-400">{data.label}</span>
        </div>
        <div className="flex items-center justify-between gap-4 text-slate-300">
          <span>Candidates Count:</span>
          <span className="font-mono font-bold text-white">{data.count}</span>
        </div>
      </div>
    );
  }
  return null;
};

function AtsDistributionChart() {
  return (
    <Card
      title="ATS Score Distribution"
      subtitle="Breakdown of candidate ATS scores across rating brackets"
      headerBorder
      action={
        <Badge variant="emerald" size="sm" dot>
          Avg ATS Score: 84.5%
        </Badge>
      }
    >
      <div className="h-64 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={atsData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis
              dataKey="range"
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="count" radius={[8, 8, 0, 0]}>
              {atsData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export default AtsDistributionChart;
