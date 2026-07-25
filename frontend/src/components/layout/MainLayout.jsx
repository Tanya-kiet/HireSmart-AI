import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function MainLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen w-screen overflow-hidden bg-slate-50/70 text-slate-900 font-sans antialiased selection:bg-blue-500 selection:text-white flex">
      {/* 1. Fixed Left Sidebar (280px width, 100vh height) */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* 2. Right Section Container */}
      <div className="flex-1 flex flex-col h-screen min-w-0 overflow-hidden relative lg:pl-[280px]">
        {/* Fixed Top Navbar (80px height, fixed z-30) */}
        <Navbar onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />

        {/* 3. Scrollable Main Content (Only this section scrolls vertically, 32px padding) */}
        <main className="flex-1 overflow-y-auto pt-[80px] p-8 max-w-7xl w-full mx-auto space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export default MainLayout;