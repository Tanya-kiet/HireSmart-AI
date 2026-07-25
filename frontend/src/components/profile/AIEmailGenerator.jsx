import React, { useState } from "react";
import Card from "../common/Card";
import Button from "../common/Button";
import { FaEnvelope, FaCopy, FaCheck, FaPaperPlane } from "react-icons/fa";

function AIEmailGenerator({ candidateName, jobTitle }) {
  const [emailType, setEmailType] = useState("invite");
  const [copied, setCopied] = useState(false);

  const name = candidateName || "Sarah Chen";
  const role = jobTitle || "Senior Frontend Engineer";

  const templates = {
    invite: {
      subject: `Interview Invitation - ${role} at HireSmart AI`,
      body: `Dear ${name},\n\nThank you for applying for the ${role} position at HireSmart AI. We reviewed your resume and were thoroughly impressed by your background in React, TypeScript, and cloud deployment.\n\nWe would like to invite you for a 45-minute technical interview with our engineering team.\n\nPlease let us know your availability for this week.\n\nBest regards,\nTanya Bhadana\nLead Recruiter, HireSmart AI`,
    },
    offer: {
      subject: `Official Offer Letter - ${role} at HireSmart AI`,
      body: `Dear ${name},\n\nOn behalf of HireSmart AI, I am thrilled to extend an official offer of employment for the ${role} position!\n\nSalary Band: $155,000 / year + equity options.\nStart Date: August 15, 2026.\n\nPlease find the attached formal offer letter details for your review.\n\nWarm regards,\nTanya Bhadana\nLead Recruiter, HireSmart AI`,
    },
    rejection: {
      subject: `Application Status - ${role} at HireSmart AI`,
      body: `Dear ${name},\n\nThank you for taking the time to interview for the ${role} position with HireSmart AI.\n\nWhile your technical qualifications were strong, we have decided to move forward with another candidate whose background more closely aligns with our immediate team requirements.\n\nWe will keep your profile in our talent network for future opportunities.\n\nSincerely,\nTanya Bhadana\nHireSmart AI Team`,
    },
  };

  const currentTemplate = templates[emailType];

  const handleCopy = () => {
    const fullText = `Subject: ${currentTemplate.subject}\n\n${currentTemplate.body}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card
      title="Recruiter Email Generator"
      subtitle="Generate candidate communication templates instantly"
      headerBorder
      action={
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setEmailType("invite")}
            className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
              emailType === "invite"
                ? "bg-white text-blue-600 shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Invite
          </button>
          <button
            onClick={() => setEmailType("offer")}
            className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
              emailType === "offer"
                ? "bg-white text-emerald-600 shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Offer
          </button>
          <button
            onClick={() => setEmailType("rejection")}
            className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
              emailType === "rejection"
                ? "bg-white text-rose-600 shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Rejection
          </button>
        </div>
      }
    >
      <div className="space-y-3 text-xs">
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
          <span className="font-bold text-slate-400 block uppercase text-[10px] mb-0.5">Subject</span>
          <span className="font-bold text-slate-900">{currentTemplate.subject}</span>
        </div>

        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 whitespace-pre-line font-medium text-slate-800 leading-relaxed">
          {currentTemplate.body}
        </div>

        <div className="flex items-center justify-end gap-2 pt-1">
          <Button
            variant="outline"
            size="xs"
            icon={copied ? FaCheck : FaCopy}
            onClick={handleCopy}
          >
            {copied ? "Copied" : "Copy to Clipboard"}
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default AIEmailGenerator;
