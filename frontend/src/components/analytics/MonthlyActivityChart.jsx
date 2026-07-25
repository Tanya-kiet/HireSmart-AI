import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

function MonthlyActivityChart() {
  const monthlyData = [
    { month: "Feb 2026", Applications: 980, Interviews: 290, Offers: 62, Hires: 45 },
    { month: "Mar 2026", Applications: 1120, Interviews: 340, Offers: 74, Hires: 52 },
    { month: "Apr 2026", Applications: 1250, Interviews: 380, Offers: 82, Hires: 58 },
    { month: "May 2026", Applications: 1310, Interviews: 400, Offers: 88, Hires: 61 },
    { month: "Jun 2026", Applications: 1380, Interviews: 410, Offers: 91, Hires: 64 },
    { month: "Jul 2026", Applications: 1420, Interviews: 420, Offers: 95, Hires: 68 },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4 font-sans text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-sm font-bold text-slate-900 tracking-tight">
          Section 5 — Monthly Hiring Activity
        </h3>
        <span className="text-[10px] text-slate-400 font-mono">6-Month Trend</span>
      </div>

      <div className="h-64 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={monthlyData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis
              dataKey="month"
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: "#e2e8f0" }}
            />
            <YAxis
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                borderColor: "#1e293b",
                borderRadius: "0.75rem",
                color: "#fff",
                fontSize: "11px",
              }}
            />
            <Legend wrapperStyle={{ fontSize: "11px", pt: "10px" }} />
            <Line
              type="monotone"
              dataKey="Applications"
              stroke="#0f172a"
              strokeWidth={2.5}
              dot={{ r: 3 }}
            />
            <Line
              type="monotone"
              dataKey="Interviews"
              stroke="#2563eb"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
            <Line
              type="monotone"
              dataKey="Offers"
              stroke="#0d9488"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
            <Line
              type="monotone"
              dataKey="Hires"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default MonthlyActivityChart;
