import React from "react";
import Card from "../common/Card";
import {
  FaFileUpload,
  FaSearch,
  FaFileDownload,
  FaSlidersH,
  FaArrowRight,
  FaRobot,
  FaUsers,
  FaChartPie,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function QuickActionsCard() {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Batch Upload Resumes",
      desc: "Drag & drop PDF / DOCX resumes to screen with AI",
      icon: FaFileUpload,
      color: "text-blue-600 bg-blue-50 border-blue-100",
      path: "/upload",
      badge: "Fast Track",
    },
    {
      title: "Candidate Search",
      desc: "Filter candidates by match score, skills, and ATS rank",
      icon: FaUsers,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
      path: "/candidates",
    },
    {
      title: "Configure AI Match Rules",
      desc: "Adjust skill weights and ATS minimum cutoff scores",
      icon: FaSlidersH,
      color: "text-purple-600 bg-purple-50 border-purple-100",
      path: "/settings",
    },
    {
      title: "Export Analytics Report",
      desc: "Generate CSV / PDF report for hiring team review",
      icon: FaChartPie,
      color: "text-amber-600 bg-amber-50 border-amber-100",
      path: "/analytics",
    },
  ];

  return (
    <Card
      title="Quick Actions"
      subtitle="Frequently used recruiter workflows & automated actions"
      headerBorder
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((act, index) => {
          const Icon = act.icon;
          return (
            <div
              key={index}
              onClick={() => navigate(act.path)}
              className="p-4 rounded-xl border border-slate-200/80 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between bg-white"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg border ${act.color} transition-transform group-hover:scale-105`}
                  >
                    <Icon />
                  </div>
                  {act.badge && (
                    <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                      {act.badge}
                    </span>
                  )}
                </div>

                <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {act.title}
                </h4>

                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                  {act.desc}
                </p>
              </div>

              <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600 opacity-80 group-hover:opacity-100">
                <span>Launch Action</span>
                <FaArrowRight className="text-[10px] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export default QuickActionsCard;
