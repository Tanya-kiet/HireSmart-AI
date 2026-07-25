import React from "react";
import StatsCard from "../dashboard/StatsCard";
import { FaTrophy, FaCheckCircle, FaUsers, FaUserCheck } from "react-icons/fa";

function RankingStats({
  highestMatch = 94,
  avgAts = 84.8,
  totalCandidates = 20,
  recommendedCount = 6,
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        title="Highest Match Score"
        value={`${highestMatch}%`}
        change="Top Fit Candidate"
        changeType="increase"
        changePeriod="Sarah Chen #1"
        icon={FaTrophy}
        iconBg="bg-amber-50 text-amber-600 border border-amber-100"
      />

      <StatsCard
        title="Average ATS Score"
        value={`${avgAts}%`}
        change="+3.2%"
        changeType="increase"
        changePeriod="vs last batch"
        icon={FaCheckCircle}
        iconBg="bg-blue-50 text-blue-600 border border-blue-100"
      />

      <StatsCard
        title="Total Candidates Ranked"
        value={totalCandidates}
        change="100% Parsed"
        changeType="increase"
        changePeriod="full stack vectors"
        icon={FaUsers}
        iconBg="bg-purple-50 text-purple-600 border border-purple-100"
      />

      <StatsCard
        title="Recommended Interviews"
        value={recommendedCount}
        change="Top 30%"
        changeType="increase"
        changePeriod="Highly Recommended"
        icon={FaUserCheck}
        iconBg="bg-emerald-50 text-emerald-600 border border-emerald-100"
      />
    </div>
  );
}

export default RankingStats;
