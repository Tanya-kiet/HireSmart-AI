import React, { useState } from "react";
import Card from "../common/Card";
import Badge from "../common/Badge";
import Button from "../common/Button";
import { FaFileAlt, FaExternalLinkAlt, FaDownload, FaEye, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const mockUploads = [
  {
    id: "res-001",
    name: "Sarah Chen",
    role: "Senior React Developer",
    matchScore: 96,
    atsScore: 94,
    status: "Shortlisted",
    date: "10 mins ago",
    filename: "Sarah_Chen_Resume_2026.pdf",
    skills: ["React", "TypeScript", "Tailwind", "Next.js"],
  },
  {
    id: "res-002",
    name: "Marcus Vance",
    role: "AI / ML Architect",
    matchScore: 92,
    atsScore: 89,
    status: "Screened",
    date: "45 mins ago",
    filename: "Marcus_Vance_AI_CV.pdf",
    skills: ["Python", "PyTorch", "LLMs", "FastAPI"],
  },
  {
    id: "res-003",
    name: "Elena Rostova",
    role: "Lead Product Designer",
    matchScore: 88,
    atsScore: 85,
    status: "Under Review",
    date: "2 hours ago",
    filename: "Elena_Rostova_Design_Portfolio.pdf",
    skills: ["Figma", "UI/UX", "Design Systems", "Prototyping"],
  },
  {
    id: "res-004",
    name: "David Kim",
    role: "DevOps & Cloud Engineer",
    matchScore: 84,
    atsScore: 82,
    status: "Screened",
    date: "3 hours ago",
    filename: "David_Kim_DevOps.pdf",
    skills: ["AWS", "Kubernetes", "Docker", "Terraform"],
  },
  {
    id: "res-005",
    name: "Aisha Patel",
    role: "Frontend Engineer",
    matchScore: 78,
    atsScore: 76,
    status: "Pending",
    date: "5 hours ago",
    filename: "Aisha_Patel_Frontend.pdf",
    skills: ["JavaScript", "React", "CSS3", "Git"],
  },
];

function RecentUploadsCard() {
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  const filteredData = mockUploads.filter((item) => {
    if (filter === "high") return item.matchScore >= 90;
    if (filter === "pending") return item.status === "Pending" || item.status === "Under Review";
    return true;
  });

  return (
    <Card
      title="Recent Resume Uploads"
      subtitle="Latest parsed candidate files evaluated by HireSmart AI engine"
      headerBorder
      action={
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200/60">
          <button
            onClick={() => setFilter("all")}
            className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer ${
              filter === "all"
                ? "bg-white text-slate-900 shadow-2xs font-semibold"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            All ({mockUploads.length})
          </button>
          <button
            onClick={() => setFilter("high")}
            className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer ${
              filter === "high"
                ? "bg-white text-slate-900 shadow-2xs font-semibold"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            High Match (90%+)
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer ${
              filter === "pending"
                ? "bg-white text-slate-900 shadow-2xs font-semibold"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Pending
          </button>
        </div>
      }
      padding="p-0"
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              <th className="py-3 px-6">Candidate & File</th>
              <th className="py-3 px-4">Applied Position</th>
              <th className="py-3 px-4 text-center">AI Match Score</th>
              <th className="py-3 px-4 text-center">ATS Score</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {filteredData.map((item) => {
              const isTop = item.matchScore >= 90;
              return (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                  onClick={() => navigate("/candidates")}
                >
                  {/* Candidate Name & Icon */}
                  <td className="py-3.5 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold shrink-0 border border-blue-100">
                        <FaFileAlt className="text-sm" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-1.5">
                          <span>{item.name}</span>
                          {isTop && (
                            <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.2 rounded font-semibold">
                              Top 5%
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono truncate max-w-[180px]">
                          {item.filename}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Position */}
                  <td className="py-3.5 px-4">
                    <span className="font-medium text-slate-700">
                      {item.role}
                    </span>
                    <div className="text-[10px] text-slate-400">
                      {item.date}
                    </div>
                  </td>

                  {/* Match Score */}
                  <td className="py-3.5 px-4 text-center">
                    <div className="inline-flex flex-col items-center">
                      <span
                        className={`font-extrabold text-sm ${
                          item.matchScore >= 90
                            ? "text-emerald-600"
                            : item.matchScore >= 80
                            ? "text-blue-600"
                            : "text-amber-600"
                        }`}
                      >
                        {item.matchScore}%
                      </span>
                      <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden mt-1">
                        <div
                          className={`h-full rounded-full ${
                            item.matchScore >= 90
                              ? "bg-emerald-500"
                              : item.matchScore >= 80
                              ? "bg-blue-500"
                              : "bg-amber-500"
                          }`}
                          style={{ width: `${item.matchScore}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* ATS Score */}
                  <td className="py-3.5 px-4 text-center">
                    <Badge variant="slate" size="sm">
                      {item.atsScore} / 100
                    </Badge>
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4">
                    <Badge
                      variant={
                        item.status === "Shortlisted"
                          ? "emerald"
                          : item.status === "Screened"
                          ? "blue"
                          : "amber"
                      }
                      dot
                      size="sm"
                    >
                      {item.status}
                    </Badge>
                  </td>

                  {/* Action Buttons */}
                  <td className="py-3.5 px-6 text-right">
                    <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => navigate("/candidates")}
                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Profile"
                      >
                        <FaEye className="text-xs" />
                      </button>
                      <button
                        onClick={() => alert(`Downloading ${item.filename}`)}
                        className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                        title="Download Resume"
                      >
                        <FaDownload className="text-xs" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-3 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>Showing {filteredData.length} of {mockUploads.length} candidates</span>
        <button
          onClick={() => navigate("/candidates")}
          className="font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
        >
          <span>View all candidates</span>
          <FaExternalLinkAlt className="text-[10px]" />
        </button>
      </div>
    </Card>
  );
}

export default RecentUploadsCard;
