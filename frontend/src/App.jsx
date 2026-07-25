import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";

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
import NotFound from "./pages/NotFound";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/upload" element={<UploadResume />} />
          <Route path="/analyzer" element={<ResumeAnalyzer />} />
          <Route path="/ranking" element={<CandidateRanking />} />
          <Route path="/jobs" element={<JobDescriptions />} />
          <Route path="/jobs/:id" element={<JobDescriptions />} />
          <Route path="/pipeline" element={<MasterPipeline />} />
          <Route path="/interviews" element={<InterviewManagement />} />
          <Route path="/candidate/:id" element={<CandidateProfile />} />
          <Route path="/job-matching" element={<JobMatching />} />
          <Route path="/candidates" element={<Candidates />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<ProfilePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;