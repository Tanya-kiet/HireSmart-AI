import React, { useState, useMemo } from "react";
import MainLayout from "../components/layout/MainLayout";
import Breadcrumbs from "../components/common/Breadcrumbs";
import Alert from "../components/common/Alert";
import Modal from "../components/ui/Modal";
import {
  FaQuestionCircle,
  FaSearch,
  FaBook,
  FaUsers,
  FaBriefcase,
  FaCalendarAlt,
  FaChartBar,
  FaUserGraduate,
  FaChevronDown,
  FaChevronUp,
  FaEnvelope,
  FaComments,
  FaBug,
  FaLightbulb,
  FaInfoCircle,
  FaCheck,
  FaPaperPlane,
} from "react-icons/fa";

const documentationGuides = [
  {
    id: "getting-started",
    category: "Getting Started",
    title: "Uploading & Parsing Candidate Resumes",
    icon: FaBook,
    steps: [
      "Navigate to Candidates or click 'Upload Resume' in the header.",
      "Select or drag & drop candidate PDF/DOCX files.",
      "HireSmart AI automatically parses contact info, work history, and skill badges.",
      "The candidate is immediately added to the 1,420+ candidate database.",
    ],
  },
  {
    id: "candidate-scoring",
    category: "Managing Candidates",
    title: "Weighted Match Scoring & Transparent Derivation",
    icon: FaUsers,
    steps: [
      "Every candidate score is calculated using 5 weighted criteria:",
      "Required Skills Match (40%) + Experience Alignment (25%) + Education (10%) + Projects Relevance (15%) + ATS Structure (10%).",
      "Click any candidate to view the full mathematical breakdown table inside Match Analysis.",
      "Record explicit rejection reasons (20+ realistic reasons) with candidate visibility toggles.",
    ],
  },
  {
    id: "job-management",
    category: "Managing Jobs",
    title: "Creating & Publishing Requisitions across 4 Statuses",
    icon: FaBriefcase,
    steps: [
      "Open the Jobs page and select status tabs (Open Jobs, Drafts, Closed, Archived).",
      "Click 'Create New Job Requisition' to input title, department, salary band, and skills.",
      "Published jobs immediately appear on the Candidate Portal job board.",
      "Filter jobs by department or location to track open requisitions.",
    ],
  },
  {
    id: "interview-scorecards",
    category: "Scheduling Interviews",
    title: "Multi-Round Interview Scorecards & Evaluation",
    icon: FaCalendarAlt,
    steps: [
      "Schedule interview rounds with Google Meet integration.",
      "Interviewers complete multi-metric scorecards (Problem Solving, Technical, Communication, Behaviour, Leadership).",
      "Recruiters review all interviewer feedback before making a final hiring decision.",
    ],
  },
];

const faqList = [
  {
    q: "How does the weighted candidate match score work?",
    a: "Match score is calculated deterministically from candidate resume data across 5 weighted categories: Required Skills (40%), Experience Alignment (25%), Education (10%), Projects Relevance (15%), and ATS Structure (10%). No arbitrary random numbers are generated.",
  },
  {
    q: "Can candidates see recruiter interview feedback?",
    a: "Only if the recruiter explicitly checks 'Visible to Candidate' when submitting rejection feedback. By default, internal recruiter notes remain private to talent acquisition.",
  },
  {
    q: "How do I switch between Recruiter Portal and Candidate Portal?",
    a: "Click 'Switch to Candidate' or 'Switch to Recruiter' in the top navigation bar, or select your portal on the Welcome Page (/welcome).",
  },
  {
    q: "Does the Candidate Pool support realistic pagination?",
    a: "Yes! The candidate pool paginates 1,420 candidates at 25 candidates per page across 57 calculated pages.",
  },
  {
    q: "How do I report a bug or request a feature?",
    a: "Click 'Report Bug' or 'Feature Request' inside the Help Center to submit a ticket directly to support@hiresmart.ai.",
  },
];

function HelpDocumentationPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Modals & Alerts
  const [alert, setAlert] = useState(null);
  const [isBugModalOpen, setIsBugModalOpen] = useState(false);
  const [isFeatureModalOpen, setIsFeatureModalOpen] = useState(false);

  const [bugText, setBugText] = useState("");
  const [featureText, setFeatureText] = useState("");

  const filteredGuides = useMemo(() => {
    if (!searchTerm.trim()) return documentationGuides;
    const q = searchTerm.toLowerCase();
    return documentationGuides.filter(
      (g) =>
        g.title.toLowerCase().includes(q) ||
        g.category.toLowerCase().includes(q) ||
        g.steps.some((s) => s.toLowerCase().includes(q))
    );
  }, [searchTerm]);

  const handleBugSubmit = (e) => {
    e.preventDefault();
    setIsBugModalOpen(false);
    setBugText("");
    setAlert({
      type: "success",
      title: "Bug Report Submitted",
      message: "Thank you! Our engineering team has received your bug report ticket.",
    });
  };

  const handleFeatureSubmit = (e) => {
    e.preventDefault();
    setIsFeatureModalOpen(false);
    setFeatureText("");
    setAlert({
      type: "success",
      title: "Feature Request Submitted",
      message: "Thank you! Your suggestion has been added to our enterprise roadmap.",
    });
  };

  return (
    <MainLayout>
      <div className="space-y-6 max-w-[1600px] w-full mx-auto pb-16 font-sans">
        {/* Navigation Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "HireSmart AI", path: "/" },
            { label: "Help & Documentation", path: "/help" },
          ]}
        />

        {/* Toast Alert */}
        {alert && (
          <Alert
            type={alert.type}
            title={alert.title}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}

        {/* Hero Header & Documentation Search */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-8 shadow-xl space-y-6">
          <div className="max-w-2xl space-y-2">
            <span className="px-3 py-1 text-[11px] font-bold bg-blue-500/20 text-blue-300 rounded-full border border-blue-400/30 uppercase tracking-wider font-mono">
              Help Center & Knowledge Base
            </span>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              How can we help you today?
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
              Explore step-by-step documentation guides, weighted scoring formulas, portal workflows, and enterprise support.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative max-w-xl">
            <FaSearch className="absolute left-4 top-3.5 text-slate-400 text-sm" />
            <input
              type="text"
              placeholder="Search documentation (e.g. Uploading resumes, match scores, rejection reasons)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-xs text-white placeholder-slate-400 font-medium focus:outline-none focus:bg-white focus:text-slate-900 focus:placeholder-slate-400 transition-all shadow-inner"
            />
          </div>
        </div>

        {/* Documentation Guides Grid */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <FaBook className="text-blue-600" />
            <span>Documentation & Workflow Guides</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredGuides.map((guide) => {
              const Icon = guide.icon;
              return (
                <div
                  key={guide.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4 font-sans flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center font-bold text-base shrink-0">
                        <Icon />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 uppercase">
                          {guide.category}
                        </span>
                        <h3 className="text-sm font-bold text-slate-900 mt-0.5">
                          {guide.title}
                        </h3>
                      </div>
                    </div>

                    <ol className="space-y-2 text-xs text-slate-700 font-medium bg-slate-50 p-4 rounded-xl border border-slate-100">
                      {guide.steps.map((step, sIdx) => (
                        <li key={sIdx} className="flex items-start gap-2">
                          <span className="w-4 h-4 rounded-full bg-blue-600 text-white font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {sIdx + 1}
                          </span>
                          <span className="leading-relaxed">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4 font-sans">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <FaQuestionCircle className="text-blue-600" />
              <span>Frequently Asked Questions (FAQ)</span>
            </h2>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">
              Quick answers to common questions about scores, portals, and data privacy
            </p>
          </div>

          <div className="space-y-2">
            {faqList.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="border border-slate-200 rounded-xl overflow-hidden text-xs transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 text-left font-bold text-slate-900 bg-slate-50 hover:bg-slate-100/80 flex items-center justify-between gap-3 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <FaChevronUp className="text-blue-600 text-xs shrink-0" />
                    ) : (
                      <FaChevronDown className="text-slate-400 text-xs shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="p-4 bg-white text-slate-700 font-medium leading-relaxed border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact Support & Version Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Support Ticket Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4 md:col-span-2 font-sans">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FaEnvelope className="text-blue-600" />
                <span>Contact Enterprise Support</span>
              </h3>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                Our support engineering team is available 24/7
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Support Email</span>
                <span className="font-bold text-slate-900 block truncate">support@hiresmart.ai</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Response Time</span>
                <span className="font-bold text-emerald-700 block">&lt; 15 Minutes SLA</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Live Chat</span>
                <span className="font-bold text-blue-600 block">Available Online</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <button
                onClick={() =>
                  setAlert({
                    type: "info",
                    title: "Live Support Chat",
                    message: "Connecting to HireSmart AI support engineer...",
                  })
                }
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
              >
                <FaComments className="text-xs" />
                <span>Start Live Chat</span>
              </button>

              <button
                onClick={() => setIsBugModalOpen(true)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs border border-slate-200 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <FaBug className="text-xs text-rose-600" />
                <span>Report Bug</span>
              </button>

              <button
                onClick={() => setIsFeatureModalOpen(true)}
                className="px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold rounded-xl text-xs border border-purple-200 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <FaLightbulb className="text-xs" />
                <span>Feature Request</span>
              </button>
            </div>
          </div>

          {/* Version Info Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4 font-sans flex flex-col justify-between">
            <div className="space-y-3">
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <FaInfoCircle className="text-blue-600" />
                  <span>Version Notes</span>
                </h3>
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 rounded">
                  v2.4.0
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="font-bold text-slate-900 block">HireSmart AI Enterprise</span>
                  <span className="text-[11px] text-slate-500 font-medium">Build #2026.07.26</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5 text-[11px] text-slate-700 font-medium">
                  <span className="font-bold text-slate-900 block">Release Highlights:</span>
                  <p>• Dual Recruiter & Candidate Portals with session routing</p>
                  <p>• Transparent weighted candidate match formula derivation</p>
                  <p>• 20+ realistic rejection reasons with candidate visibility</p>
                  <p>• Multi-round interviewer evaluation scorecards</p>
                </div>
              </div>
            </div>

            <div className="text-[10px] font-mono text-slate-400 pt-2 border-t border-slate-100">
              © 2026 HireSmart AI Inc. All rights reserved.
            </div>
          </div>
        </div>

        {/* Report Bug Modal */}
        {isBugModalOpen && (
          <Modal isOpen={isBugModalOpen} onClose={() => setIsBugModalOpen(false)} title="Report a Bug" maxWidth="max-w-md">
            <form onSubmit={handleBugSubmit} className="space-y-4 font-sans text-xs">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 block">Bug Description *</label>
                <textarea
                  rows={4}
                  required
                  value={bugText}
                  onChange={(e) => setBugText(e.target.value)}
                  placeholder="Describe what happened, expected behavior, and steps to reproduce..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-medium focus:bg-white focus:border-rose-500 resize-y"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsBugModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl flex items-center gap-1.5"
                >
                  <FaPaperPlane className="text-xs" />
                  <span>Submit Ticket</span>
                </button>
              </div>
            </form>
          </Modal>
        )}

        {/* Feature Request Modal */}
        {isFeatureModalOpen && (
          <Modal isOpen={isFeatureModalOpen} onClose={() => setIsFeatureModalOpen(false)} title="Submit Feature Request" maxWidth="max-w-md">
            <form onSubmit={handleFeatureSubmit} className="space-y-4 font-sans text-xs">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 block">Feature Suggestion *</label>
                <textarea
                  rows={4}
                  required
                  value={featureText}
                  onChange={(e) => setFeatureText(e.target.value)}
                  placeholder="Describe the feature or improvement you'd like to see in HireSmart AI..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-medium focus:bg-white focus:border-purple-500 resize-y"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsFeatureModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl flex items-center gap-1.5"
                >
                  <FaPaperPlane className="text-xs" />
                  <span>Submit Suggestion</span>
                </button>
              </div>
            </form>
          </Modal>
        )}
      </div>
    </MainLayout>
  );
}

export default HelpDocumentationPage;
