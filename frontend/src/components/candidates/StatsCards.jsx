import React from "react";
import StatsCard from "../dashboard/StatsCard";
import {
  FaUsers,
  FaCalendarCheck,
  FaSlidersH,
  FaCheckCircle,
} from "react-icons/fa";

function StatsCards({ totalCount = 15, interviewCount = 4, avgMatch = 88.5, avgAts = 84.2 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        title="Total Candidates"
        value={totalCount}
        change="+18.4%"
        changeType="increase"
        changePeriod="vs last month"
        icon={FaUsers}
        iconBg="bg-blue-50 text-blue-600 border border-blue-100"
      />

      <StatsCard
        title="Interviews Scheduled"
        value={interviewCount}
        change="+2 Scheduled"
        changeType="increase"
        changePeriod="this week"
        icon={FaCalendarCheck}
        iconBg="bg-purple-50 text-purple-600 border border-purple-100"
      />

      <StatsCard
        title="Average Match Score"
        value={`${avgMatch}%`}
        change="+4.1%"
        changeType="increase"
        changePeriod="model v2.4 precision"
        icon={FaSlidersH}
        iconBg="bg-emerald-50 text-emerald-600 border border-emerald-100"
      />

      <StatsCard
        title="Average ATS Score"
        value={`${avgAts}%`}
        change="+2.8%"
        changeType="increase"
        changePeriod="target 80.0% cutoff"
        icon={FaCheckCircle}
        iconBg="bg-amber-50 text-amber-600 border border-amber-100"
      />
    </div>
  );
}

export default StatsCards;
