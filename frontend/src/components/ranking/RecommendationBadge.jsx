import React from "react";
import Badge from "../common/Badge";
import { FaStar, FaCheck, FaExclamationCircle, FaTimes } from "react-icons/fa";

function RecommendationBadge({ recommendation, size = "md" }) {
  switch (recommendation) {
    case "Highly Recommended":
      return (
        <Badge variant="emerald" size={size} dot>
          Highly Recommended
        </Badge>
      );
    case "Recommended":
      return (
        <Badge variant="blue" size={size} dot>
          Recommended
        </Badge>
      );
    case "Consider":
      return (
        <Badge variant="amber" size={size} dot>
          Consider
        </Badge>
      );
    case "Not Suitable":
      return (
        <Badge variant="rose" size={size} dot>
          Not Suitable
        </Badge>
      );
    default:
      return <Badge variant="slate" size={size}>{recommendation}</Badge>;
  }
}

export default RecommendationBadge;
