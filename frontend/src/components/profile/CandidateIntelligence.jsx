import React from "react";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle,
  FaTrophy,
  FaShieldAlt,
  FaGraduationCap,
  FaUserCheck,
  FaHeart,
  FaRobot,
} from "react-icons/fa";

function CandidateIntelligence({ intelligence }) {
  if (!intelligence) return null;

  return (
    <div className="space-y-4">
      {/* Header Banner */}
      <div className="p-3 bg-slate-900 text-white rounded-xl flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <FaRobot className="text-blue-400 text-sm" />
          <span className="font-bold tracking-tight text-white">
            Candidate Intelligence Engine
          </span>
          <span className="hidden sm:inline-block text-slate-400 font-medium">
            • Deep LLM & Vector Analysis with Explainable Rationales
          </span>
        </div>
        <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-950 text-blue-300 rounded border border-blue-800">
          Updated Real-time
        </span>
      </div>

      {/* Grid of Intelligence Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 1. Strengths */}
        <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200/80 space-y-3">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
            <FaCheckCircle className="text-emerald-600 text-sm" />
            <span>Strengths</span>
          </div>
          <div className="space-y-2.5">
            {intelligence.strengths?.map((item, idx) => (
              <div key={idx} className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs space-y-1">
                <h4 className="font-bold text-xs text-slate-900">{item.title}</h4>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  {item.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Weaknesses */}
        <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200/80 space-y-3">
          <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wider">
            <FaExclamationTriangle className="text-amber-600 text-sm" />
            <span>Weaknesses</span>
          </div>
          <div className="space-y-2.5">
            {intelligence.weaknesses?.map((item, idx) => (
              <div key={idx} className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs space-y-1">
                <h4 className="font-bold text-xs text-slate-900">{item.title}</h4>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  {item.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Missing Skills */}
        <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200/80 space-y-3">
          <div className="flex items-center gap-2 text-rose-800 font-bold text-xs uppercase tracking-wider">
            <FaTimesCircle className="text-rose-600 text-sm" />
            <span>Missing Skills</span>
          </div>
          <div className="space-y-2.5">
            {intelligence.missingSkills?.map((item, idx) => (
              <div key={idx} className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs space-y-1">
                <h4 className="font-bold text-xs text-slate-900">{item.title}</h4>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  {item.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Career Highlights */}
        <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200/80 space-y-3">
          <div className="flex items-center gap-2 text-indigo-800 font-bold text-xs uppercase tracking-wider">
            <FaTrophy className="text-indigo-600 text-sm" />
            <span>Career Highlights</span>
          </div>
          <div className="space-y-2.5">
            {intelligence.careerHighlights?.map((item, idx) => (
              <div key={idx} className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs space-y-1">
                <h4 className="font-bold text-xs text-slate-900">{item.title}</h4>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  {item.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Risk Factors */}
        <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200/80 space-y-3">
          <div className="flex items-center gap-2 text-slate-800 font-bold text-xs uppercase tracking-wider">
            <FaShieldAlt className="text-slate-600 text-sm" />
            <span>Risk Factors</span>
          </div>
          <div className="space-y-2.5">
            {intelligence.riskFactors?.map((item, idx) => (
              <div key={idx} className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs space-y-1">
                <h4 className="font-bold text-xs text-slate-900">{item.title}</h4>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  {item.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 6. Learning Ability */}
        <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200/80 space-y-3">
          <div className="flex items-center gap-2 text-blue-800 font-bold text-xs uppercase tracking-wider">
            <FaGraduationCap className="text-blue-600 text-sm" />
            <span>Learning Ability</span>
          </div>
          <div className="space-y-2.5">
            {intelligence.learningAbility?.map((item, idx) => (
              <div key={idx} className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs space-y-1">
                <h4 className="font-bold text-xs text-slate-900">{item.title}</h4>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  {item.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 7. Role Fit */}
        <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200/80 space-y-3">
          <div className="flex items-center gap-2 text-teal-800 font-bold text-xs uppercase tracking-wider">
            <FaUserCheck className="text-teal-600 text-sm" />
            <span>Role Fit</span>
          </div>
          <div className="space-y-2.5">
            {intelligence.roleFit?.map((item, idx) => (
              <div key={idx} className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs space-y-1">
                <h4 className="font-bold text-xs text-slate-900">{item.title}</h4>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  {item.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 8. Culture Fit */}
        <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200/80 space-y-3">
          <div className="flex items-center gap-2 text-pink-800 font-bold text-xs uppercase tracking-wider">
            <FaHeart className="text-pink-600 text-sm" />
            <span>Culture Fit</span>
          </div>
          <div className="space-y-2.5">
            {intelligence.cultureFit?.map((item, idx) => (
              <div key={idx} className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs space-y-1">
                <h4 className="font-bold text-xs text-slate-900">{item.title}</h4>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  {item.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CandidateIntelligence;
