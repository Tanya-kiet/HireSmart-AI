import React, { useState } from "react";
import Card from "../common/Card";
import Badge from "../common/Badge";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const chartDataMonthly = [
  { month: "Jan", uploads: 240, screened: 180, matchedScore: 82 },
  { month: "Feb", uploads: 310, screened: 240, matchedScore: 84 },
  { month: "Mar", uploads: 420, screened: 350, matchedScore: 86 },
  { month: "Apr", uploads: 380, screened: 310, matchedScore: 88 },
  { month: "May", uploads: 510, screened: 430, matchedScore: 90 },
  { month: "Jun", uploads: 640, screened: 520, matchedScore: 92 },
  { month: "Jul", uploads: 590, screened: 490, matchedScore: 94 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-800 text-xs space-y-1.5 z-50">
        <p className="font-bold text-slate-200">{label} Analytics</p>
        <div className="space-y-1">
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-1.5 text-slate-300">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                {entry.name}:
              </span>
              <span className="font-mono font-bold text-white">
                {entry.value} {entry.name === "Match Rate" ? "%" : ""}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

function HiringAnalyticsChart() {
  const [chartType, setChartType] = useState("area"); // 'area' | 'bar'
  const [metric, setMetric] = useState("volume"); // 'volume' | 'accuracy'

  return (
    <Card
      title="Hiring & Screening Analytics"
      subtitle="Track resume processing volume and AI ATS match rate metrics"
      headerBorder
      action={
        <div className="flex items-center gap-2">
          {/* Chart Type Toggle */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200/60 text-xs">
            <button
              onClick={() => setChartType("area")}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                chartType === "area"
                  ? "bg-white text-slate-900 shadow-2xs font-semibold"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Trend Area
            </button>
            <button
              onClick={() => setChartType("bar")}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                chartType === "bar"
                  ? "bg-white text-slate-900 shadow-2xs font-semibold"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Volume Bar
            </button>
          </div>
        </div>
      }
    >
      {/* Metric Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
          <span className="text-[11px] font-medium text-slate-500">
            Total Resumes Evaluated
          </span>
          <div className="text-xl font-bold text-slate-900 mt-0.5">3,090</div>
          <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">
            ↑ 24% vs Q1
          </div>
        </div>
        <div className="p-3.5 bg-blue-50/50 rounded-xl border border-blue-100">
          <span className="text-[11px] font-medium text-blue-700">
            Avg ATS Match Accuracy
          </span>
          <div className="text-xl font-bold text-blue-900 mt-0.5">92.8%</div>
          <div className="text-[10px] text-blue-600 font-semibold mt-0.5">
            +4.2% AI Fit Gain
          </div>
        </div>
        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 col-span-2 sm:col-span-1">
          <span className="text-[11px] font-medium text-slate-500">
            Shortlist Conversion
          </span>
          <div className="text-xl font-bold text-slate-900 mt-0.5">82.4%</div>
          <div className="text-[10px] text-slate-500 font-medium mt-0.5">
            Top candidates passed to recruiter
          </div>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "area" ? (
            <AreaChart
              data={chartDataMonthly}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorUploads" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorScreened" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis
                dataKey="month"
                stroke="#64748b"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ paddingTop: "15px", fontSize: "12px" }}
                iconType="circle"
              />
              <Area
                type="monotone"
                dataKey="uploads"
                name="Total Uploads"
                stroke="#2563eb"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorUploads)"
              />
              <Area
                type="monotone"
                dataKey="screened"
                name="AI Shortlisted"
                stroke="#10b981"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorScreened)"
              />
            </AreaChart>
          ) : (
            <BarChart
              data={chartDataMonthly}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis
                dataKey="month"
                stroke="#64748b"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ paddingTop: "15px", fontSize: "12px" }}
                iconType="circle"
              />
              <Bar
                dataKey="uploads"
                name="Total Uploads"
                fill="#2563eb"
                radius={[6, 6, 0, 0]}
              />
              <Bar
                dataKey="screened"
                name="AI Shortlisted"
                fill="#10b981"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export default HiringAnalyticsChart;
