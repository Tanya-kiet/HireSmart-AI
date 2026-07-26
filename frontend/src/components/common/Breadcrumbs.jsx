import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaChevronRight, FaHome } from "react-icons/fa";

function Breadcrumbs({ items }) {
  const location = useLocation();

  // Route map for human-readable labels
  const routeNameMap = {
    "": "Dashboard",
    candidates: "Candidates",
    jobs: "Jobs",
    interviews: "Interviews",
    analytics: "Analytics",
    profile: "My Profile",
    upload: "Upload Resume",
    ranking: "Candidate Ranking",
    analyzer: "Resume Analyzer",
    "job-matching": "Job Matching",
    pipeline: "Recruitment Pipeline",
  };

  // Generate path segments if items prop is not explicitly passed
  const pathSegments = location.pathname.split("/").filter(Boolean);

  const breadcrumbsList = items || [
    { label: "HireSmart AI", path: "/" },
    ...pathSegments.map((segment, index) => {
      const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
      const label = routeNameMap[segment] || segment.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
      return { label, path };
    }),
  ];

  return (
    <nav className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400 font-sans">
      {breadcrumbsList.map((item, idx) => {
        const isLast = idx === breadcrumbsList.length - 1;
        return (
          <React.Fragment key={idx}>
            {idx > 0 && <FaChevronRight className="text-[8px] text-slate-300 shrink-0" />}
            {isLast ? (
              <span className="font-bold text-slate-700 truncate max-w-[200px] sm:max-w-xs">
                {item.label}
              </span>
            ) : (
              <Link
                to={item.path}
                className="hover:text-blue-600 transition-colors flex items-center gap-1 shrink-0"
              >
                {idx === 0 && <FaHome className="text-[10px] text-slate-400" />}
                <span>{item.label}</span>
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}

export default Breadcrumbs;
