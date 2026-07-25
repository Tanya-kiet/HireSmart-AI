import React, { useState } from "react";
import Card from "../common/Card";
import Badge from "../common/Badge";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const trendData7Days = [
  { label: "Mon", uploads: 65, parsed: 62 },
  { label: "Tue", uploads: 85, parsed: 81 },
  { label: "Wed", uploads: 120, parsed: 115 },
  { label: "Thu", uploads: 95, parsed: 92 },
  { label: "Fri", uploads: 140, parsed: 132 },
  { label: "Sat", uploads: 45, parsed: 43 },
  { label: "Sun", uploads: 50, parsed: 48 },
];

const trendData30Days = [
  { label: "Week 1", uploads: 380, parsed: 350 },
  { label: "Week 2", uploads: 520, parsed: 490 },
  { label: "Week 3", uploads: 610, parsed: 575 },
  { label: "Week 4", uploads: 740, parsed: 700 },
];

const trendData6Months = [
  { label: "Feb", uploads: 310, parsed: 290 },
  { label: "Mar", uploads: 420, parsed: 395 },
  { label: "Apr", uploads: 380, parsed: 360 },
  { label: "May", uploads: 510, parsed: 480 },
  { label: "Jun", uploads: 640, parsed: 610 },
  { label: "Jul", uploads: 590, parsed: 555 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-800 text-xs space-y-1 z-50">
        <p className="font-bold text-slate-200">{label}</p>
        <div className="flex items-center justify-between gap-4 text-slate-300">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            Total Uploads:
          </span>
          <span className="font-mono font-bold text-white">
            {payload[0]?.value}
          </span>
        </div>
        <div className="flex items-center justify-between gap-4 text-slate-300">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Parsed & Shortlisted:
          </span>
          <span className="font-mono font-bold text-emerald-400">
            {payload[1]?.value}
          </span>
        </div>
      </div>
    );
  }
  return null;
};

function UploadTrendChart() {
  const [timeframe, setTimeframe] = useState("30d");

  const data =
    timeframe === "7d"
      ? trendData7Days
      : timeframe === "30d"
      ? trendData30Days
      : trendData6Months;

  return (
    <Card
      title="Upload Trend"
      subtitle="Volume of candidate resume submissions over selected timeframe"
      headerBorder
      action={
        <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200/60 text-xs">
          <button
            onClick={() => setTimeframe("7d")}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
              timeframe === "7d"
                ? "bg-white text-slate-900 shadow-2xs font-semibold"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            7 Days
          </button>
          <button
            onClick={() => setTimeframe("30d")}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
              timeframe === "30d"
                ? "bg-white text-slate-900 shadow-2xs font-semibold"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            30 Days
          </button>
          <button
            onClick={() => setTimeframe("6m")}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
              timeframe === "6m"
                ? "bg-white text-slate-900 shadow-2xs font-semibold"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            6 Months
          </button>
        </div>
      }
    >
      <div className="h-64 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUploadsArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorParsedArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis
              dataKey="label"
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="uploads"
              name="Uploads"
              stroke="#2563eb"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorUploadsArea)"
            />
            <Area
              type="monotone"
              dataKey="parsed"
              name="Shortlisted"
              stroke="#10b981"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorParsedArea)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export default UploadTrendChart;
