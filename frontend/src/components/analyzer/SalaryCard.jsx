import React from "react";
import Card from "../common/Card";
import Badge from "../common/Badge";
import { FaMoneyBillWave, FaCompass, FaCheckCircle } from "react-icons/fa";

function SalaryCard() {
  const careerRoles = [
    "Full Stack Developer",
    "ML / AI Engineer",
    "Backend Engineer",
    "Data Engineer",
  ];

  return (
    <Card
      title="Salary Benchmark & Career Path"
      subtitle="Market compensation estimation & suggested job role vectors"
      headerBorder
    >
      <div className="space-y-4">
        {/* Salary Box */}
        <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-semibold mb-0.5">
              <FaMoneyBillWave className="text-emerald-600" />
              <span>Estimated Market Salary</span>
            </div>
            <div className="text-2xl font-extrabold text-slate-900">
              ₹8 – 12 LPA <span className="text-xs font-semibold text-slate-500">($110k – $140k)</span>
            </div>
          </div>

          <Badge variant="emerald" size="sm" dot>
            Confidence: High
          </Badge>
        </div>

        {/* Career Suggestions */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <FaCompass className="text-blue-600" />
            <span>Recommended Career Roles</span>
          </h4>

          <div className="flex flex-wrap gap-2">
            {careerRoles.map((role, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-800 text-xs font-semibold rounded-xl border border-slate-200/80"
              >
                <FaCheckCircle className="text-blue-600 text-xs" />
                <span>{role}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default SalaryCard;
