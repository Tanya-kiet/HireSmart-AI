import React from "react";
import Card from "../common/Card";
import Badge from "../common/Badge";
import { FaStar, FaUserCheck, FaComments } from "react-icons/fa";

function FeedbackCard({ feedback }) {
  if (!feedback) {
    return (
      <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200/80 text-xs text-amber-900 flex items-center justify-between">
        <span>Interviewer feedback is pending completion for this scheduled round.</span>
        <Badge variant="amber" size="sm">
          Pending Feedback
        </Badge>
      </div>
    );
  }

  const getRecommendationBadgeVariant = (rec) => {
    switch (rec) {
      case "Strong Hire":
        return "emerald";
      case "Hire":
        return "blue";
      case "Hold":
        return "amber";
      case "Reject":
        return "rose";
      default:
        return "slate";
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1 text-amber-400 text-xs">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={star <= rating ? "text-amber-400" : "text-slate-200"}
          />
        ))}
      </div>
    );
  };

  return (
    <Card
      title="Interviewer Evaluation Feedback"
      subtitle="Detailed candidate score and hiring recommendation"
      headerBorder
      action={
        <Badge variant={getRecommendationBadgeVariant(feedback.recommendation)} size="sm">
          {feedback.recommendation}
        </Badge>
      }
    >
      <div className="space-y-4 text-xs">
        {/* Ratings Grid */}
        <div className="grid grid-cols-2 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200/70">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-700">Technical Depth:</span>
            {renderStars(feedback.technicalRating)}
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-700">Communication:</span>
            {renderStars(feedback.communicationRating)}
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-700">Problem Solving:</span>
            {renderStars(feedback.problemSolvingRating)}
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-700">Culture Alignment:</span>
            {renderStars(feedback.cultureFitRating)}
          </div>
        </div>

        {/* Comments */}
        <div className="space-y-1">
          <span className="font-bold text-slate-900 uppercase tracking-wider text-[10px]">
            Interviewer Comments
          </span>
          <p className="p-3 bg-blue-50/50 text-slate-800 rounded-xl border border-blue-100 leading-relaxed font-medium">
            "{feedback.comments}"
          </p>
        </div>
      </div>
    </Card>
  );
}

export default FeedbackCard;
