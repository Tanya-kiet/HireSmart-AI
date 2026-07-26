import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../../context/UserContext";

function ProtectedRoute({ children, allowedRole }) {
  const { isAuthenticated, portalRole } = useUser();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (allowedRole && portalRole !== allowedRole) {
    if (portalRole === "candidate") {
      return <Navigate to="/candidate/home" replace />;
    }
    if (portalRole === "recruiter") {
      return <Navigate to="/dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
