import React from "react";
import MainLayout from "../components/layout/MainLayout";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";

function NotFound() {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl font-bold mb-4 border border-blue-100">
          404
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Page Not Found</h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-sm mt-1 mb-6">
          The page or route you are looking for does not exist or has been moved.
        </p>
        <Button variant="primary" size="md" icon={FaHome} onClick={() => navigate("/")}>
          Return to Dashboard
        </Button>
      </div>
    </MainLayout>
  );
}

export default NotFound;