import React, { useState } from "react";
import Card from "../common/Card";
import Badge from "../common/Badge";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const categoryData = [
  { name: "Software Engineering", value: 1120, percentage: "36.2%", color: "#2563eb" },
  { name: "Data Science & AI", value: 780, percentage: "25.2%", color: "#8b5cf6" },
  { name: "Product & UI/UX Design", value: 520, percentage: "16.8%", color: "#10b981" },
  { name: "DevOps & Cloud", value: 410, percentage: "13.3%", color: "#f59e0b" },
  { name: "Product Management", value: 260, percentage: "8.5%", color: "#06b6d4" },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-800 text-xs space-y-1 z-50">
        <p className="font-bold text-slate-200">{data.name}</p>
        <div className="flex items-center justify-between gap-4 text-slate-300">
          <span>Resumes Analyzed:</span>
          <span className="font-mono font-bold text-white">{data.value}</span>
        </div>
        <div className="flex items-center justify-between gap-4 text-slate-300">
          <span>Share:</span>
          <span className="font-mono font-bold text-blue-400">
            {data.payload.percentage}
          </span>
        </div>
      </div>
    );
  }
  return null;
};

function CategoryDistributionChart() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <Card
      title="Resume Categories"
      subtitle="Distribution of candidate applications by specialized job role domain"
      headerBorder
      action={
        <Badge variant="blue" size="sm">
          5 Core Domains
        </Badge>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Pie Chart Canvas */}
        <div className="md:col-span-6 h-64 w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={4}
                dataKey="value"
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {categoryData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    stroke="transparent"
                    className="transition-all duration-200 cursor-pointer hover:opacity-85"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          {/* Donut Center Readout */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
              3,090
            </span>
            <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
              Total Resumes
            </span>
          </div>
        </div>

        {/* Custom Category Legend Breakdown */}
        <div className="md:col-span-6 space-y-2.5">
          {categoryData.map((item, idx) => (
            <div
              key={idx}
              className={`p-2.5 rounded-xl border transition-all duration-150 flex items-center justify-between cursor-pointer ${
                activeIndex === idx
                  ? "bg-slate-100/90 border-slate-300 shadow-2xs"
                  : "bg-slate-50/60 border-slate-100 hover:bg-slate-100/50"
              }`}
              onMouseEnter={() => setActiveIndex(idx)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs font-semibold text-slate-800">
                  {item.name}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-extrabold text-slate-900 font-mono">
                  {item.value}
                </span>
                <span className="text-[10px] text-slate-400 ml-1.5 font-medium">
                  ({item.percentage})
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

export default CategoryDistributionChart;
