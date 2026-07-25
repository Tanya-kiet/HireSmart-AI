import React from "react";
import StatsCard from "../dashboard/StatsCard";
import {
  FaFileAlt,
  FaCheckCircle,
  FaChartLine,
  FaRobot,
} from "react-icons/fa";

function AnalyticsKpiCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        title="Total Resumes Processed"
        value="3,090"
        change="+24.2%"
        changeType="increase"
        changePeriod="vs previous quarter"
        icon={FaFileAlt}
        iconBg="bg-blue-50 text-blue-600 border border-blue-100"
      />

      <StatsCard
        title="Average ATS Match Score"
        value="84.5%"
        change="+3.2%"
        changeType="increase"
        changePeriod="target 80.0% cutoff"
        icon={FaCheckCircle}
        iconBg="bg-emerald-50 text-emerald-600 border border-emerald-100"
      />

      <StatsCard
        title="Shortlist Conversion Rate"
        value="46.0%"
        change="+5.1%"
        changeType="increase"
        changePeriod="1,420 candidates passed"
        icon={FaChartLine}
        iconBg="bg-purple-50 text-purple-600 border border-purple-100"
      />

      <StatsCard
        title="AI Model Precision"
        value="94.2%"
        change="+3.5%"
        changeType="increase"
        changePeriod="Engine Model v2.4"
        icon={FaRobot}
        iconBg="bg-amber-50 text-amber-600 border border-amber-100"
      />
    </div>
  );
}

export default AnalyticsKpiCards;
