import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function Pagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 bg-white border-t border-slate-200 text-xs font-sans">
      {/* Items count info */}
      <div className="text-slate-500 font-medium">
        Showing <strong className="text-slate-900">{Math.min((currentPage - 1) * pageSize + 1, totalItems)}</strong> to{" "}
        <strong className="text-slate-900">{Math.min(currentPage * pageSize, totalItems)}</strong> of{" "}
        <strong className="text-slate-900">{totalItems}</strong> candidates
      </div>

      {/* Page Navigation & Page Size Selector */}
      <div className="flex items-center gap-4">
        {/* Page Size Selector */}
        <div className="flex items-center gap-1.5 text-slate-500 font-medium">
          <span>Rows per page:</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="bg-slate-50 border border-slate-200 text-slate-900 font-bold rounded-lg px-2 py-1 focus:outline-none cursor-pointer"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 bg-slate-50 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 font-bold rounded-lg border border-slate-200 transition-colors cursor-pointer"
          >
            <FaChevronLeft className="text-[10px]" />
          </button>

          {pages.map((p) => (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                currentPage === p
                  ? "bg-slate-900 text-white border-slate-900 shadow-2xs"
                  : "bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200"
              }`}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 bg-slate-50 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 font-bold rounded-lg border border-slate-200 transition-colors cursor-pointer"
          >
            <FaChevronRight className="text-[10px]" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
