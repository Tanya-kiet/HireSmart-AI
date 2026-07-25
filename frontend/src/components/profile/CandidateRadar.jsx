import React from "react";
import Card from "../common/Card";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

function CandidateRadar({ metrics }) {
  const data = [
    { subject: "Technical Depth", score: metrics?.technical || 95, fullMark: 100 },
    { subject: "System Architecture", score: metrics?.architecture || 90, fullMark: 100 },
    { subject: "Problem Solving", score: metrics?.problemSolving || 92, fullMark: 100 },
    { subject: "Communication", score: metrics?.communication || 88, fullMark: 100 },
    { subject: "Leadership", score: metrics?.leadership || 85, fullMark: 100 },
    { subject: "Culture Alignment", score: metrics?.cultureFit || 94, fullMark: 100 },
  ];

  return (
    <Card
      title="Candidate Competency Radar"
      subtitle="Multi-axis skill & behavioral assessment visualization"
      headerBorder
    >
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
            <PolarGrid stroke="#E2E8F0" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: "#475569", fontSize: 10, fontWeight: 600 }}
            />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9 }} />
            <Radar
              name="Sarah Chen"
              dataKey="score"
              stroke="#2563EB"
              fill="#2563EB"
              fillOpacity={0.25}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export default CandidateRadar;
