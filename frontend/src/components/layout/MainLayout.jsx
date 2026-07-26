import React from "react";
import TopNavbar from "./TopNavbar";

function MainLayout({ children }) {
  return (
    <div className="min-h-screen w-full bg-slate-50/70 text-slate-900 font-sans antialiased selection:bg-blue-500 selection:text-white flex flex-col overflow-x-hidden">
      {/* 1. Sticky Top Navigation Bar (70px height) */}
      <TopNavbar />

      {/* 2. Full-Width Centered Main Content Area (Max width 1600px, 32px horizontal padding, 24px vertical padding) */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-6 sm:px-8 py-6 space-y-6">
        {children}
      </main>
    </div>
  );
}

export default MainLayout;