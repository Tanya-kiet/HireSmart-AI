import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function CandidatePagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}) {
  if (totalItems === 0 || totalPages <= 1) return null;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  // Generate page numbers with ellipsis (...)
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) {
        end = 4;
      } else if (currentPage >= totalPages - 2) {
        start = totalPages - 3;
      }

      if (start > 2) pages.push("...");

      for (let i = start; i <= end; i++) pages.push(i);

      if (end < totalPages - 1) pages.push("...");

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-200 text-xs font-sans">
      {/* Item Range Text */}
      <div className="text-slate-500 font-medium">
        Showing <span className="font-bold text-slate-900">{startItem}-{endItem}</span> of{" "}
        <span className="font-bold text-slate-900">{totalItems.toLocaleString()}</span> candidates
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center gap-1">
        {/* Previous */}
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-colors disabled:opacity-40 disabled:hover:bg-white cursor-pointer flex items-center gap-1 text-xs"
        >
          <FaChevronLeft className="text-[10px]" />
          <span>Previous</span>
        </button>

        {/* Page Buttons */}
        {getPageNumbers().map((page, idx) => {
          if (page === "...") {
            return (
              <span key={`ellipsis-${idx}`} className="px-2 py-1 text-slate-400 font-bold">
                ...
              </span>
            );
          }

          const isCurrent = page === currentPage;
          return (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                isCurrent
                  ? "bg-slate-900 text-white border-slate-900 shadow-2xs"
                  : "bg-white text-slate-700 hover:bg-slate-50 border-slate-200"
              }`}
            >
              {page}
            </button>
          );
        })}

        {/* Next */}
        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-colors disabled:opacity-40 disabled:hover:bg-white cursor-pointer flex items-center gap-1 text-xs"
        >
          <span>Next</span>
          <FaChevronRight className="text-[10px]" />
        </button>
      </div>
    </div>
  );
}

export default CandidatePagination;
