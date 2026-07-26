import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";

import ProtectedRoute from "./components/common/ProtectedRoute";
import WelcomePage from "./pages/WelcomePage";
import Dashboard from "./pages/Dashboard";
import UploadResume from "./pages/UploadResume";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import CandidateRanking from "./pages/CandidateRanking";
import JobDescriptions from "./pages/JobDescriptions";
import MasterPipeline from "./pages/MasterPipeline";
import InterviewManagement from "./pages/InterviewManagement";
import CandidateProfile from "./pages/CandidateProfile";
import JobMatching from "./pages/JobMatching";
import Candidates from "./pages/Candidates";
import Analytics from "./pages/Analytics";
import ProfilePage from "./pages/ProfilePage";
import NotificationsPage from "./pages/NotificationsPage";
import HelpDocumentationPage from "./pages/HelpDocumentationPage";
import NotFound from "./pages/NotFound";

// Candidate Portal Pages
import CandidateJobBoard from "./pages/candidate/CandidateJobBoard";
import CandidateApplications from "./pages/candidate/CandidateApplications";
import CandidateInterviews from "./pages/candidate/CandidateInterviews";
import CandidateProfilePage from "./pages/candidate/CandidateProfilePage";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          {/* ROOT ROUTE: Welcome & Authentication Landing Screen */}
          <Route path="/" element={<WelcomePage />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/login" element={<WelcomePage />} />

          {/* Protected Recruiter Portal Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRole="recruiter">
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/candidates"
            element={
              <ProtectedRoute allowedRole="recruiter">
                <Candidates />
              </ProtectedRoute>
            }
          />
          <Route
            path="/candidates/:id"
            element={
              <ProtectedRoute allowedRole="recruiter">
                <CandidateProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/candidate/:id"
            element={
              <ProtectedRoute allowedRole="recruiter">
                <CandidateProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/jobs"
            element={
              <ProtectedRoute allowedRole="recruiter">
                <JobDescriptions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/jobs/:id"
            element={
              <ProtectedRoute allowedRole="recruiter">
                <JobDescriptions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/interviews"
            element={
              <ProtectedRoute allowedRole="recruiter">
                <InterviewManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute allowedRole="recruiter">
                <Analytics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute allowedRole="recruiter">
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute allowedRole="recruiter">
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoute allowedRole="recruiter">
                <NotificationsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/help"
            element={
              <ProtectedRoute allowedRole="recruiter">
                <HelpDocumentationPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/upload"
            element={
              <ProtectedRoute allowedRole="recruiter">
                <UploadResume />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analyzer"
            element={
              <ProtectedRoute allowedRole="recruiter">
                <ResumeAnalyzer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ranking"
            element={
              <ProtectedRoute allowedRole="recruiter">
                <CandidateRanking />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pipeline"
            element={
              <ProtectedRoute allowedRole="recruiter">
                <MasterPipeline />
              </ProtectedRoute>
            }
          />
          <Route
            path="/job-matching"
            element={
              <ProtectedRoute allowedRole="recruiter">
                <JobMatching />
              </ProtectedRoute>
            }
          />

          {/* Protected Candidate Portal Routes */}
          <Route
            path="/candidate/home"
            element={
              <ProtectedRoute allowedRole="candidate">
                <CandidateJobBoard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/candidate/jobs"
            element={
              <ProtectedRoute allowedRole="candidate">
                <CandidateJobBoard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/candidate-portal"
            element={
              <ProtectedRoute allowedRole="candidate">
                <CandidateJobBoard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/candidate/applications"
            element={
              <ProtectedRoute allowedRole="candidate">
                <CandidateApplications />
              </ProtectedRoute>
            }
          />
          <Route
            path="/candidate-portal/applications"
            element={
              <ProtectedRoute allowedRole="candidate">
                <CandidateApplications />
              </ProtectedRoute>
            }
          />
          <Route
            path="/candidate/interviews"
            element={
              <ProtectedRoute allowedRole="candidate">
                <CandidateInterviews />
              </ProtectedRoute>
            }
          />
          <Route
            path="/candidate-portal/interviews"
            element={
              <ProtectedRoute allowedRole="candidate">
                <CandidateInterviews />
              </ProtectedRoute>
            }
          />
          <Route
            path="/candidate/profile"
            element={
              <ProtectedRoute allowedRole="candidate">
                <CandidateProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/candidate-portal/profile"
            element={
              <ProtectedRoute allowedRole="candidate">
                <CandidateProfilePage />
              </ProtectedRoute>
            }
          />

          {/* 404 Catch All */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;