import React, { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    name: "Tanya Bhadana",
    email: "tanya@hiresmart.ai",
    role: "Senior Recruiter",
    avatar: null, // null uses 'TB' initials
    phone: "+1 (415) 555-0192",
    location: "San Francisco, CA",
    department: "Talent Acquisition",
    jobTitle: "Senior Recruiter",
    status: "Online",
  });

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Interview Scheduled",
      desc: "Technical interview scheduled with Sarah Chen for 09:00 AM.",
      time: "2 minutes ago",
      unread: true,
    },
    {
      id: 2,
      title: "Candidate Shortlisted",
      desc: "Marcus Vance passed ATS screening with 94% vector match.",
      time: "10 minutes ago",
      unread: true,
    },
    {
      id: 3,
      title: "Offer Accepted",
      desc: "Aisha Patel accepted the Senior React Lead offer.",
      time: "Today at 08:30 AM",
      unread: true,
    },
    {
      id: 4,
      title: "Resume Uploaded",
      desc: "Batch of 15 candidate resumes parsed successfully.",
      time: "Yesterday",
      unread: false,
    },
    {
      id: 5,
      title: "Scorecard Completed",
      desc: "Alex Mercer submitted 4.8/5.0 feedback for David Miller.",
      time: "Yesterday",
      unread: false,
    },
    {
      id: 6,
      title: "Requisition Opened",
      desc: "Staff Frontend Architect job posting published.",
      time: "2 days ago",
      unread: false,
    },
  ]);

  const updateProfile = (updatedFields) => {
    setUser((prev) => ({ ...prev, ...updatedFields }));
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, unread: false }))
    );
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <UserContext.Provider
      value={{
        user,
        updateProfile,
        notifications,
        markAllNotificationsRead,
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
