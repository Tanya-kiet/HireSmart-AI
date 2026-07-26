import React, { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  // Session Authentication State initialized from localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const savedAuth = localStorage.getItem("hiresmart_auth");
    return savedAuth === "true";
  });

  const [portalRole, setPortalRole] = useState(() => {
    return localStorage.getItem("hiresmart_role") || null;
  });

  // Recruiter Profile
  const [user, setUser] = useState({
    name: "Tanya Bhadana",
    email: "tanya@hiresmart.ai",
    role: "Senior Recruiter",
    avatar: null,
    phone: "+1 (415) 555-0192",
    location: "San Francisco, CA",
    department: "Talent Acquisition",
    jobTitle: "Senior Recruiter",
    status: "Online",
  });

  // Candidate Profile
  const [candidateUser, setCandidateUser] = useState({
    name: "Sarah Chen",
    email: "sarah.chen@example.com",
    role: "Senior Lead Frontend Engineer",
    avatar: null,
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA",
    experience: "6 Years",
    skills: ["React 19", "TypeScript", "Tailwind CSS", "Next.js", "Redux", "GraphQL"],
    summary: "Accomplished Senior Frontend Lead with over 6 years of experience architecting scalable React micro-frontends and tokenized design systems.",
  });

  // Login Handler
  const login = (role = "recruiter") => {
    setIsAuthenticated(true);
    setPortalRole(role);
    localStorage.setItem("hiresmart_auth", "true");
    localStorage.setItem("hiresmart_role", role);
  };

  // Logout Handler (Clears all session keys)
  const logout = () => {
    setIsAuthenticated(false);
    setPortalRole(null);
    localStorage.removeItem("hiresmart_auth");
    localStorage.removeItem("hiresmart_role");
    localStorage.removeItem("hiresmart_profile");
  };

  // Switch Portal Handler
  const switchPortal = (newRole) => {
    setIsAuthenticated(true);
    setPortalRole(newRole);
    localStorage.setItem("hiresmart_auth", "true");
    localStorage.setItem("hiresmart_role", newRole);
  };

  // Enriched Notifications List (Today, Yesterday, Earlier)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Candidate Application",
      desc: "Candidate Sarah Chen applied for Senior Lead Frontend Engineer position.",
      time: "2 minutes ago",
      group: "Today",
      category: "application",
      unread: true,
    },
    {
      id: 2,
      title: "Interview Scheduled",
      desc: "Technical deep-dive interview scheduled with Michael Brown for 09:00 AM.",
      time: "15 minutes ago",
      group: "Today",
      category: "interview",
      unread: true,
    },
    {
      id: 3,
      title: "Application Volume Alert",
      desc: 'Job requisition "ML Engineer" has received 18 new candidate applications.',
      time: "1 hour ago",
      group: "Today",
      category: "job",
      unread: true,
    },
    {
      id: 4,
      title: "ATS Vector Match High Score",
      desc: "Candidate Marcus Vance passed ATS screening with 94% vector match score.",
      time: "3 hours ago",
      group: "Today",
      category: "match",
      unread: true,
    },
    {
      id: 5,
      title: "Interview Invitation Accepted",
      desc: "Candidate Priya Sharma accepted the technical interview invitation.",
      time: "Yesterday",
      group: "Yesterday",
      category: "interview",
      unread: false,
    },
    {
      id: 6,
      title: "Analytics Report Generated",
      desc: "Executive hiring throughput & conversion quarterly report generated successfully.",
      time: "Yesterday",
      group: "Yesterday",
      category: "analytics",
      unread: false,
    },
    {
      id: 7,
      title: "Requisition Published",
      desc: 'Staff Frontend Architect job posting published to candidate portal.',
      time: "2 days ago",
      group: "Earlier",
      category: "job",
      unread: false,
    },
    {
      id: 8,
      title: "Batch Resume Parsing Complete",
      desc: "Batch of 15 candidate resumes parsed successfully with transparent scoring.",
      time: "3 days ago",
      group: "Earlier",
      category: "resume",
      unread: false,
    },
  ]);

  const markNotificationRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const toggleNotificationRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: !n.unread } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Candidate Applications State
  const [candidateApplications, setCandidateApplications] = useState([
    {
      id: "app-1",
      jobId: "job-1",
      jobTitle: "Senior Lead Frontend Engineer",
      company: "HireSmart AI",
      location: "San Francisco, CA (Hybrid)",
      salary: "$145,000 - $175,000",
      appliedDate: "Jul 15, 2026",
      status: "Interview Scheduled",
      stage: "Technical Interview",
      recruiter: "Tanya Bhadana",
      visibleToCandidate: true,
      feedback: null,
      rejectionReason: null,
    },
    {
      id: "app-2",
      jobId: "job-2",
      jobTitle: "ML Engineer",
      company: "HireSmart AI",
      location: "New York, NY",
      salary: "$150,000 - $185,000",
      appliedDate: "Jul 18, 2026",
      status: "Under Review",
      stage: "Resume Screening",
      recruiter: "Tanya Bhadana",
      visibleToCandidate: false,
      feedback: null,
      rejectionReason: null,
    },
    {
      id: "app-3",
      jobId: "job-13",
      jobTitle: "UI Designer",
      company: "HireSmart AI",
      location: "Remote",
      salary: "$115,000 - $140,000",
      appliedDate: "Jun 10, 2026",
      status: "Rejected",
      stage: "Technical Interview",
      recruiter: "Elena Rostova",
      visibleToCandidate: true,
      rejectionReason: "Technical Interview - Deep React state management skills were required over UI component design.",
      feedback: {
        reason: "Technical interview not cleared",
        recruiterNotes: "Candidate possesses excellent Figma UI design skills. However, target role required deep React 19 state architecture expertise.",
        interviewFeedback: "Good understanding of UI component design. Struggled with complex state management and system architecture questions. Recommended strengthening React fundamentals before reapplying.",
        recommendation: "Neutral",
      },
    },
  ]);

  const addApplication = (newApp) => {
    setCandidateApplications((prev) => [newApp, ...prev]);
  };

  const updateApplicationStatus = (appId, newStatus, rejectionData = null) => {
    setCandidateApplications((prev) =>
      prev.map((app) => {
        if (app.id === appId || app.jobId === appId) {
          return {
            ...app,
            status: newStatus,
            stage: newStatus,
            rejectionReason: rejectionData?.reason || app.rejectionReason,
            feedback: rejectionData || app.feedback,
            visibleToCandidate: rejectionData?.visibleToCandidate ?? app.visibleToCandidate,
          };
        }
        return app;
      })
    );
  };

  const updateProfile = (updatedFields) => {
    setUser((prev) => ({ ...prev, ...updatedFields }));
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <UserContext.Provider
      value={{
        isAuthenticated,
        portalRole,
        login,
        logout,
        switchPortal,
        user,
        candidateUser,
        notifications,
        markNotificationRead,
        toggleNotificationRead,
        markAllNotificationsRead,
        deleteNotification,
        candidateApplications,
        addApplication,
        updateApplicationStatus,
        updateProfile,
        unreadCount,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
