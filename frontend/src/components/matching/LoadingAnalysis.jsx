import React from "react";
import Card from "../common/Card";
import { FaRobot, FaSpinner } from "react-icons/fa";

function LoadingAnalysis() {
  return (
    <Card className="bg-white border-slate-200/90 shadow-sm py-12 px-6 text-center animate-in fade-in duration-300">
      <div className="max-w-md mx-auto space-y-6">
        <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-blue-600/20 border-t-blue-600 animate-spin" />
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl shadow-xs">
            <FaRobot className="animate-pulse" />
          </div>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
            Analyzing Resume & Job Description...
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto leading-relaxed">
            HireSmart AI neural engine is computing semantic skill vectors, domain alignment, and ATS match score.
          </p>
        </div>

        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden max-w-xs mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-500 h-full rounded-full animate-pulse w-3/4" />
        </div>
      </div>
    </Card>
  );
}

export default LoadingAnalysis;
