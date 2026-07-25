import React from "react";
import Card from "../common/Card";
import Badge from "../common/Badge";
import Button from "../common/Button";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBriefcase,
  FaFileDownload,
  FaLinkedin,
  FaGithub,
  FaGlobe,
  FaStar,
  FaSlidersH,
} from "react-icons/fa";

function ProfileSidebar({ candidate }) {
  return (
    <div className="space-y-6 lg:sticky lg:top-[100px]">
      <Card className="bg-white border-slate-200/90 shadow-2xs p-6 space-y-6 text-center">
        {/* Avatar & Badges */}
        <div className="relative inline-block mx-auto">
          <div
            className={`w-24 h-24 rounded-3xl ${candidate.avatarBg} text-white flex items-center justify-center font-black text-3xl mx-auto shadow-md ring-4 ring-slate-100`}
          >
            {candidate.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <span className="absolute bottom-0 right-0 w-5 h-5 bg-emerald-500 border-4 border-white rounded-full" />
        </div>

        {/* Name & Role */}
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            {candidate.name}
          </h2>
          <p className="text-xs font-semibold text-blue-600 mt-0.5">
            {candidate.role}
          </p>

          <div className="flex items-center justify-center gap-2 mt-2">
            <Badge variant="blue" size="sm" dot>
              {candidate.status}
            </Badge>
            <Badge variant="emerald" size="sm">
              {candidate.recommendation}
            </Badge>
          </div>
        </div>

        {/* Scores Overview Row */}
        <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200/70 text-xs">
          <div>
            <span className="text-[10px] text-slate-400 font-medium uppercase block">
              Vector Match
            </span>
            <span className="text-xl font-extrabold text-emerald-600 mt-0.5 block">
              {candidate.overallMatch}%
            </span>
          </div>
          <div className="border-l border-slate-200 pl-2">
            <span className="text-[10px] text-slate-400 font-medium uppercase block">
              ATS Score
            </span>
            <span className="text-xl font-extrabold text-slate-900 mt-0.5 block">
              {candidate.atsScore}%
            </span>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-2 text-xs text-left pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2.5 text-slate-700">
            <FaEnvelope className="text-blue-600 text-xs shrink-0" />
            <span className="truncate font-medium">{candidate.email}</span>
          </div>
          <div className="flex items-center gap-2.5 text-slate-700">
            <FaPhone className="text-emerald-600 text-xs shrink-0" />
            <span className="font-medium">{candidate.phone}</span>
          </div>
          <div className="flex items-center gap-2.5 text-slate-700">
            <FaMapMarkerAlt className="text-rose-600 text-xs shrink-0" />
            <span className="font-medium">{candidate.location}</span>
          </div>
          <div className="flex items-center gap-2.5 text-slate-700">
            <FaBriefcase className="text-purple-600 text-xs shrink-0" />
            <span className="font-medium">{candidate.experience} Total Experience</span>
          </div>
        </div>

        {/* External Links Buttons */}
        <div className="flex items-center justify-center gap-2 pt-2 border-t border-slate-100">
          <a
            href={candidate.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            title="LinkedIn Profile"
          >
            <FaLinkedin className="text-base" />
          </a>
          <a
            href={candidate.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors"
            title="GitHub Repositories"
          >
            <FaGithub className="text-base" />
          </a>
          <a
            href={candidate.portfolioUrl}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
            title="Portfolio Website"
          >
            <FaGlobe className="text-base" />
          </a>
        </div>

        {/* Download Resume Button */}
        <div className="pt-2">
          <Button
            variant="primary"
            size="md"
            icon={FaFileDownload}
            onClick={() => alert(`Downloading resume: ${candidate.name}`)}
            className="w-full"
          >
            Download Resume PDF
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default ProfileSidebar;
