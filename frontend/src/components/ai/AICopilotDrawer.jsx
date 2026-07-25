import React, { useState, useEffect, useRef } from "react";
import {
  FaTimes,
  FaPaperPlane,
  FaSearch,
  FaTerminal,
  FaBookmark,
  FaHistory,
  FaMagic,
  FaSlidersH,
  FaChevronDown,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SuggestionGrid from "./SuggestionGrid";
import PromptHistory from "./PromptHistory";
import MessageBubble from "./MessageBubble";
import Alert from "../common/Alert";

function AICopilotDrawer({ isOpen, onClose }) {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  const [input, setInput] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [alert, setAlert] = useState(null);

  // Recent History & Pinned Prompts State
  const [recentHistory, setRecentHistory] = useState([
    "Compare Sarah Chen and Marcus Vance",
    "Who is waiting too long in screening?",
    "Generate interview questions for Senior Frontend",
  ]);

  const [pinnedPrompts] = useState([
    "Explain why Sarah Chen ranks above Marcus Vance",
    "Draft an offer letter for Rachel Zhang ($165k base)",
  ]);

  // Initial Copilot Welcome State
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello Tanya! I am your Recruiter Copilot. Ask anything about candidates, compare applicants, generate email templates, or inspect recruitment pipeline bottlenecks.",
      timestamp: "10:30 AM",
    },
  ]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (!isOpen) return null;

  const handleAction = (actionType, candidate) => {
    const name = candidate?.name || "Candidate";

    if (actionType === "schedule") {
      navigate("/interviews");
      setAlert({
        type: "success",
        title: "Interview Scheduler Opened",
        message: `Scheduling technical interview round for ${name}.`,
      });
    } else if (actionType === "shortlist") {
      setAlert({
        type: "success",
        title: "Candidate Shortlisted",
        message: `${name} has been added to priority shortlist.`,
      });
    } else if (actionType === "reject") {
      setAlert({
        type: "error",
        title: "Candidate Rejected",
        message: `${name} stage moved to Rejected.`,
      });
    } else if (actionType === "download") {
      setAlert({
        type: "info",
        title: "Download Started",
        message: `Downloading resume dossier for ${name}.`,
      });
    } else if (actionType === "move-stage") {
      navigate("/pipeline");
      setAlert({
        type: "info",
        title: "Pipeline Opened",
        message: `Navigated to Master Pipeline board to move ${name}.`,
      });
    }
  };

  const processQuery = (rawQuery) => {
    const q = rawQuery.trim();
    if (!q) return;

    // Add query to recent history if new
    if (!recentHistory.includes(q)) {
      setRecentHistory([q, ...recentHistory]);
    }

    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    // User Message
    const userMsg = {
      sender: "user",
      text: q,
      timestamp: now,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulate AI Processing and Rich Response Generation
    setTimeout(() => {
      let responseObj = {
        sender: "ai",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        text: "",
      };

      const queryLower = q.toLowerCase();

      // 1. SLASH COMMANDS OR SEARCH: /compare or "compare"
      if (queryLower.includes("compare") || queryLower.startsWith("/compare")) {
        responseObj.text = "Here is the side-by-side candidate comparison between Sarah Chen and Marcus Vance:";
        responseObj.comparisonPayload = {
          candA: {
            name: "Sarah Chen",
            role: "Senior Lead Frontend Engineer",
            match: 94,
            summary: "6+ years experience, React 19 micro-frontends, 40% performance boost at Acme Cloud.",
          },
          candB: {
            name: "Marcus Vance",
            role: "Staff Frontend Architect",
            match: 92,
            summary: "7 years experience, Next.js & GraphQL, strong systems design background.",
          },
        };
        responseObj.decisionExplanation = {
          confidence: "94% Match Advantage",
          why: "Sarah Chen demonstrates direct experience with React 19 micro-frontends and Tailwind CSS design tokens, matching 100% of core requisition requirements. Marcus Vance's secondary experience is in PyTorch rather than Python FastAPI.",
          concerns: "Sarah requires 30-day notice period.",
        };
      }
      // 2. EMAIL GENERATOR: /email, "offer", "rejection", "invite"
      else if (queryLower.includes("offer") || queryLower.includes("rejection") || queryLower.includes("invite") || queryLower.startsWith("/email")) {
        if (queryLower.includes("rejection")) {
          responseObj.text = "Generated respectful candidate rejection letter:";
          responseObj.emailPayload = {
            type: "Candidate Rejection",
            subject: "Update regarding your application for Senior Lead Frontend Engineer at HireSmart AI",
            body: `Dear Candidate,\n\nThank you for taking the time to interview with HireSmart AI for the Senior Lead Frontend Engineer role. After careful review, we have decided to move forward with candidates whose experience more closely matches our immediate micro-frontend architecture requirements.\n\nWe appreciate your interest and wish you the best in your career search.\n\nBest regards,\nTanya Bhadana\nSenior Lead Recruiter, HireSmart AI`,
          };
        } else if (queryLower.includes("offer")) {
          responseObj.text = "Generated formal executive offer letter draft for Rachel Zhang:";
          responseObj.emailPayload = {
            type: "Executive Offer Letter",
            subject: "Official Offer of Employment: Senior Lead Frontend Engineer at HireSmart AI",
            body: `Dear Rachel Zhang,\n\nOn behalf of HireSmart AI, I am thrilled to offer you the position of Senior Lead Frontend Engineer reporting to Alex Mercer (Director of Engineering).\n\nKey Compensation Details:\n- Base Salary: $165,000 / year paid bi-weekly\n- Equity: 25,000 ISO Stock Options\n- Signing Bonus: $10,000\n- Benefits: Full medical, dental, 401(k) 5% match, $2,500 annual learning stipend\n- Start Date: August 17, 2026\n\nPlease sign and return this offer letter by August 5, 2026.\n\nWarm regards,\nTanya Bhadana`,
          };
        } else {
          responseObj.text = "Generated Technical Interview Invitation email:";
          responseObj.emailPayload = {
            type: "Interview Invitation",
            subject: "Interview Invitation: Technical Round 2 at HireSmart AI",
            body: `Dear Sarah Chen,\n\nWe enjoyed reviewing your initial screening profile and would like to invite you for a 60-minute Technical System Design interview with David Miller (Engineering Manager).\n\nPlease let us know if any of the following times work for you:\n- Tuesday, July 28 at 02:00 PM PST\n- Wednesday, July 29 at 11:00 AM PST\n\nLooking forward to speaking soon!\n\nBest regards,\nTanya Bhadana`,
          };
        }
      }
      // 3. INTERVIEW QUESTIONS: /interview, "questions"
      else if (queryLower.includes("question") || queryLower.startsWith("/interview")) {
        responseObj.text = "Generated Senior React & Architecture interview question set:";
        responseObj.questionsPayload = {
          difficulty: "Hard (Senior Lead Level)",
          questions: [
            { category: "React 19 & State Isolation", level: "Hard", question: "How do you handle global state isolation between micro-frontend modules without causing DOM memory leaks?" },
            { category: "Performance & Web Vitals", level: "Hard", question: "Describe your step-by-step approach to reducing initial bundle load latency by 40%." },
            { category: "FastAPI Connection Pooling", level: "Medium", question: "How do you configure asynchronous FastAPI routes with PostgreSQL connection pools under high traffic loads?" },
            { category: "Design System Governance", level: "Medium", question: "How do you enforce WCAG AAA accessibility compliance across tokenized Tailwind component libraries?" },
          ],
        };
      }
      // 4. CANDIDATE SEARCH / BEST CANDIDATE: /candidate, "best", "react", "sarah"
      else if (queryLower.includes("best") || queryLower.includes("react") || queryLower.includes("sarah") || queryLower.startsWith("/candidate")) {
        responseObj.text = "Top ranked React & Frontend candidate matching your search query:";
        responseObj.candidateId = "cand-1";
        responseObj.candidatePayload = {
          id: "cand-1",
          name: "Sarah Chen",
          photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=160&auto=format&fit=crop",
          role: "Senior Lead Frontend Engineer",
          matchScore: 94,
          atsScore: 96,
          summary: "Architected React 19 micro-frontends with 40% latency reduction. Led team of 6 engineers.",
          skills: ["React 19", "TypeScript", "Tailwind CSS", "FastAPI"],
        };
        responseObj.decisionExplanation = {
          confidence: "94% Match Confidence",
          why: "Sarah Chen has 6+ years React experience and has already architected micro-frontends serving 500k+ active users.",
          concerns: "30-day notice period required.",
        };
      }
      // 5. PIPELINE BOTTLENECKS: "waiting", "stuck", "pipeline"
      else if (queryLower.includes("stuck") || queryLower.includes("waiting") || queryLower.includes("bottleneck")) {
        responseObj.text = "Pipeline Bottleneck Audit Report:\n\n1. Screening Stage: 28 candidates waiting > 7 days for review under Alex Mercer.\n2. Technical Round Lag: 5.1 days average scheduling delay due to interviewer availability.\n\nRecommended Action: Reassign 10 screening tasks to Tanya Bhadana and add 2 secondary tech leads to interviewer roster.";
      }
      // DEFAULT FALLBACK RESPONSE
      else {
        responseObj.text = `I parsed your requisition query "${q}". Candidates in your pipeline show an average match score of 89.2% with strong technical credentials. Would you like me to draft an interview invite or generate specific technical coding questions?`;
      }

      setMessages((prev) => [...prev, responseObj]);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans animate-fade-in">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs transition-opacity cursor-pointer"
        onClick={onClose}
      />

      {/* Sliding Drawer Container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-lg bg-white shadow-2xl border-l border-slate-200 flex flex-col justify-between overflow-hidden">
          {/* Header */}
          <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-xs border border-blue-400/30">
                <FaMagic />
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
                  <span>Recruiter Copilot</span>
                  <span className="text-[10px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded border border-blue-500/30 font-mono">
                    Copilot OS
                  </span>
                </h3>
                <p className="text-[10px] text-slate-400 font-medium">
                  Native B2B Talent Acquisition Assistant
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className={`p-1.5 rounded-lg border text-xs transition-colors cursor-pointer ${
                  showHistory
                    ? "bg-blue-600 text-white border-blue-500"
                    : "text-slate-400 hover:text-white border-slate-800"
                }`}
                title="Toggle History & Commands"
              >
                <FaHistory />
              </button>

              <button
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                title="Close Copilot"
              >
                <FaTimes className="text-sm" />
              </button>
            </div>
          </div>

          {/* Toast Alert Banner */}
          {alert && (
            <div className="px-4 pt-3">
              <Alert
                type={alert.type}
                title={alert.title}
                message={alert.message}
                onClose={() => setAlert(null)}
              />
            </div>
          )}

          {/* History / Commands Panel Drawer */}
          {showHistory && (
            <PromptHistory
              recentHistory={recentHistory}
              pinnedPrompts={pinnedPrompts}
              onSelectPrompt={(p) => {
                setShowHistory(false);
                processQuery(p);
              }}
              onClearHistory={() => setRecentHistory([])}
            />
          )}

          {/* Main Chat Body Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((m, idx) => (
              <MessageBubble key={idx} message={m} onAction={handleAction} />
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Preset Suggestions Grid if initial chat */}
          {messages.length <= 2 && (
            <div className="p-4 bg-slate-100 border-t border-slate-200">
              <SuggestionGrid onSelectPrompt={processQuery} />
            </div>
          )}

          {/* Input Box Bar */}
          <div className="p-4 bg-white border-t border-slate-200 space-y-2 shrink-0">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Ask anything about your hiring pipeline or type / for commands..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && processQuery(input)}
                  className="w-full pl-3.5 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white font-medium transition-all"
                />
                <button
                  type="button"
                  onClick={() => processQuery(input)}
                  className="absolute right-2 top-2 p-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors cursor-pointer shadow-2xs"
                  title="Send Query"
                >
                  <FaPaperPlane className="text-xs" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
              <span>ProTip: Use /compare, /email, /interview, /candidate</span>
              <span>Press Enter ↵</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AICopilotDrawer;
