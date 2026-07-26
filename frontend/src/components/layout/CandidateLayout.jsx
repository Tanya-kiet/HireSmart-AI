import React from "react";
import CandidateTopNavbar from "./CandidateTopNavbar";

function CandidateLayout({ children }) {
  return (
    <div className="min-h-screen w-full bg-slate-50/70 text-slate-900 font-sans antialiased flex flex-col overflow-x-hidden">
      {/* Candidate Top Navigation Bar */}
      <CandidateTopNavbar />

      {/* Main Candidate Content Area */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-6 sm:px-8 py-6 space-y-6">
        {children}
      </main>
    </div>
  );
}

export default CandidateLayout;
