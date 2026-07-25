import React, { useState, useMemo } from "react";
import MainLayout from "../components/layout/MainLayout";
import InterviewStats from "../components/interviews/InterviewStats";
import InterviewTable from "../components/interviews/InterviewTable";
import TodaysAgenda from "../components/interviews/TodaysAgenda";
import MiniCalendar from "../components/interviews/MiniCalendar";
import InterviewDrawer from "../components/interviews/InterviewDrawer";
import ScheduleDrawer from "../components/interviews/ScheduleDrawer";
import Alert from "../components/common/Alert";
import { mockInterviews16 } from "../components/interviews/interviewData";
import { FaCalendarPlus, FaSearch, FaTimes } from "react-icons/fa";

function InterviewManagement() {
  const [interviewsList, setInterviewsList] = useState(mockInterviews16);

  // Search & Mini Calendar Date states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(null);

  // Drawer states
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [isDetailsDrawerOpen, setIsDetailsDrawerOpen] = useState(false);
  const [isScheduleDrawerOpen, setIsScheduleDrawerOpen] = useState(false);
  const [alert, setAlert] = useState(null);

  // Filter Logic
  const filteredInterviews = useMemo(() => {
    let result = [...interviewsList];

    // Mini Calendar Date Filter
    if (selectedCalendarDate) {
      result = result.filter((item) => item.date === selectedCalendarDate);
    }

    // Search Query (Candidate, Role, Interviewer)
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        (item) =>
          item.candidateName.toLowerCase().includes(q) ||
          item.jobRole.toLowerCase().includes(q) ||
          item.interviewer.toLowerCase().includes(q)
      );
    }

    return result;
  }, [interviewsList, searchTerm, selectedCalendarDate]);

  // Handle Schedule New Interview
  const handleScheduleNew = (newInterview) => {
    setInterviewsList((prev) => [newInterview, ...prev]);
    setAlert({
      type: "success",
      title: "Interview Scheduled",
      message: `Scheduled ${newInterview.round} for ${newInterview.candidateName}.`,
    });
  };

  // Handle Status Update
  const handleStatusChange = (id, newStatus) => {
    setInterviewsList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
    setAlert({
      type: "success",
      title: "Interview Updated",
      message: `Interview status changed to '${newStatus}'.`,
    });
  };

  // Reschedule Trigger
  const handleReschedule = (interview) => {
    setInterviewsList((prev) =>
      prev.map((item) =>
        item.id === interview.id ? { ...item, status: "Rescheduled" } : item
      )
    );
    setAlert({
      type: "warning",
      title: "Interview Rescheduled",
      message: `Marked interview for ${interview.candidateName} as rescheduled.`,
    });
  };

  // Cancel Trigger
  const handleCancelInterview = (interview) => {
    setInterviewsList((prev) =>
      prev.map((item) =>
        item.id === interview.id ? { ...item, status: "Cancelled" } : item
      )
    );
    setAlert({
      type: "info",
      title: "Interview Cancelled",
      message: `Cancelled interview session for ${interview.candidateName}.`,
    });
  };

  // Stats calculation
  const upcomingCount = interviewsList.filter((i) => i.status === "Scheduled").length;
  const todayCount = interviewsList.filter((i) => i.date === "Jul 25, 2026" || i.status === "Scheduled").length;
  const pendingFeedbackCount = interviewsList.filter(
    (i) => i.status === "Completed" && !i.feedback
  ).length;

  return (
    <MainLayout>
      <div className="space-y-5 max-w-7xl mx-auto pb-16 font-sans">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Interviews
            </h1>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">
              Schedule, track, and evaluate candidate interview rounds.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsScheduleDrawerOpen(true)}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
            >
              <FaCalendarPlus className="text-xs" />
              <span>Schedule Interview</span>
            </button>
          </div>
        </div>

        {/* Toast Alert */}
        {alert && (
          <Alert
            type={alert.type}
            title={alert.title}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}

        {/* Top 3 Core KPI Metric Cards */}
        <InterviewStats
          upcomingCount={upcomingCount}
          todayCount={6}
          pendingFeedbackCount={pendingFeedbackCount || 3}
        />

        {/* Command Search Bar */}
        <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-xs font-sans">
          <div className="relative">
            <FaSearch className="absolute left-3.5 top-3 text-slate-400 text-xs" />
            <input
              type="text"
              placeholder="Search by candidate, role, or interviewer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white font-medium"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-2.5 p-1 text-slate-400 hover:text-slate-600 rounded-md"
              >
                <FaTimes className="text-xs" />
              </button>
            )}
          </div>
        </div>

        {/* 70/30 Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* LEFT (70%): Upcoming Interviews Table */}
          <div className="lg:col-span-8 space-y-4">
            <InterviewTable
              interviews={filteredInterviews}
              onViewDetails={(interview) => {
                setSelectedInterview(interview);
                setIsDetailsDrawerOpen(true);
              }}
              onReschedule={handleReschedule}
              onMarkComplete={handleStatusChange}
              onCancel={handleCancelInterview}
              onScheduleClick={() => setIsScheduleDrawerOpen(true)}
            />
          </div>

          {/* RIGHT (30%): Today's Agenda + Mini Calendar */}
          <div className="lg:col-span-4 space-y-4">
            {/* Today's Agenda Vertical Timeline */}
            <TodaysAgenda
              onSelectInterview={(interview) => {
                setSelectedInterview(interview);
                setIsDetailsDrawerOpen(true);
              }}
            />

            {/* Mini Calendar Date Picker */}
            <MiniCalendar
              selectedDate={selectedCalendarDate}
              onSelectDate={(date) => setSelectedCalendarDate(date)}
            />
          </div>
        </div>

        {/* Schedule Interview Slide-Over Drawer */}
        <ScheduleDrawer
          isOpen={isScheduleDrawerOpen}
          onClose={() => setIsScheduleDrawerOpen(false)}
          onSchedule={handleScheduleNew}
        />

        {/* Interview Details & Scorecard Drawer */}
        <InterviewDrawer
          interview={selectedInterview}
          isOpen={isDetailsDrawerOpen}
          onClose={() => setIsDetailsDrawerOpen(false)}
          onStatusChange={handleStatusChange}
        />
      </div>
    </MainLayout>
  );
}

export default InterviewManagement;
