import React, { useState, useMemo } from "react";
import MainLayout from "../components/layout/MainLayout";
import RankingStats from "../components/ranking/RankingStats";
import RankingTable from "../components/ranking/RankingTable";
import RankingCard from "../components/ranking/RankingCard";
import RankingDrawer from "../components/ranking/RankingDrawer";
import ComparisonModal from "../components/ranking/ComparisonModal";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Alert from "../components/common/Alert";
import { mockRanking20 } from "../components/ranking/rankingData";
import {
  FaSearch,
  FaTimes,
  FaSortAmountDown,
  FaSlidersH,
  FaCheckSquare,
  FaChartBar,
  FaTrophy,
} from "react-icons/fa";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444"];

function CandidateRanking() {
  const [candidatesList] = useState(mockRanking20);

  // Search & Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [recommendationFilter, setRecommendationFilter] = useState("All Recommendations");
  const [sortBy, setSortBy] = useState("overall-desc");

  // Selection & Modal states
  const [selectedIds, setSelectedIds] = useState([]);
  const [drawerCandidate, setDrawerCandidate] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [alert, setAlert] = useState(null);

  // Filter & Sort Logic
  const filteredCandidates = useMemo(() => {
    let result = [...candidatesList];

    // Search query
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q) ||
          c.skills.some((s) => s.toLowerCase().includes(q))
      );
    }

    // Category Filter
    if (categoryFilter !== "All Categories") {
      result = result.filter((c) => c.category === categoryFilter);
    }

    // Recommendation Filter
    if (recommendationFilter !== "All Recommendations") {
      result = result.filter((c) => c.recommendation === recommendationFilter);
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === "overall-desc") return b.overallScore - a.overallScore;
      if (sortBy === "ats-desc") return b.atsScore - a.atsScore;
      if (sortBy === "match-desc") return b.matchScore - a.matchScore;
      if (sortBy === "rank-asc") return a.rank - b.rank;
      return 0;
    });

    return result;
  }, [candidatesList, searchTerm, categoryFilter, recommendationFilter, sortBy]);

  // Recharts Chart 1: Top Candidate Scores
  const topCandidateChartData = useMemo(() => {
    return candidatesList.slice(0, 7).map((c) => ({
      name: c.name.split(" ")[0],
      Overall: c.overallScore,
      ATS: c.atsScore,
      Match: c.matchScore,
    }));
  }, [candidatesList]);

  // Recharts Chart 2: Recommendation Breakdown
  const recommendationPieData = useMemo(() => {
    const counts = {
      "Highly Recommended": 0,
      Recommended: 0,
      Consider: 0,
      "Not Suitable": 0,
    };
    candidatesList.forEach((c) => {
      if (counts[c.recommendation] !== undefined) {
        counts[c.recommendation]++;
      }
    });
    return [
      { name: "Highly Rec.", value: counts["Highly Recommended"] },
      { name: "Recommended", value: counts["Recommended"] },
      { name: "Consider", value: counts["Consider"] },
      { name: "Not Suitable", value: counts["Not Suitable"] },
    ];
  }, [candidatesList]);

  // Selection Checkbox Handler
  const handleToggleSelect = (id) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) return prev.filter((i) => i !== id);
      if (prev.length >= 5) {
        setAlert({
          type: "warning",
          title: "Max Candidates Selected",
          message: "You can compare up to 5 candidates at a time.",
        });
        return prev;
      }
      return [...prev, id];
    });
  };

  // View Candidate Drawer
  const handleViewCandidate = (cand) => {
    setDrawerCandidate(cand);
    setIsDrawerOpen(true);
  };

  const selectedCandidatesList = useMemo(() => {
    return candidatesList.filter((c) => selectedIds.includes(c.id));
  }, [candidatesList, selectedIds]);

  const hasActiveFilters =
    searchTerm ||
    categoryFilter !== "All Categories" ||
    recommendationFilter !== "All Recommendations";

  return (
    <MainLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
              <span>AI Candidate Ranking</span>
              <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                Vector Precision Mode
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Automatically rank candidates using AI-powered resume analysis and job matching.
            </p>
          </div>
        </div>

        {/* Top 4 KPI Metrics */}
        <RankingStats
          highestMatch={94}
          avgAts={84.8}
          totalCandidates={candidatesList.length}
          recommendedCount={6}
        />

        {/* Alerts */}
        {alert && (
          <Alert
            type={alert.type}
            title={alert.title}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}

        {/* Recharts Analytics Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Top Candidates Comparison Chart */}
          <div className="lg:col-span-8">
            <Card
              title="Top 7 Ranked Candidates Comparison"
              subtitle="Comparing Overall Rank Score vs ATS vs Vector Match Score"
              headerBorder
            >
              <div className="h-64 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topCandidateChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#64748b" }} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "#64748b" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0f172a",
                        borderColor: "#334155",
                        borderRadius: "12px",
                        color: "#fff",
                        fontSize: "12px",
                      }}
                    />
                    <Bar dataKey="Overall" fill="#f59e0b" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="Match" fill="#10b981" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="ATS" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          {/* Recommendation Breakdown Pie */}
          <div className="lg:col-span-4">
            <Card
              title="Recommendation Breakdown"
              subtitle="Distribution of AI candidate classifications"
              headerBorder
            >
              <div className="h-64 w-full flex flex-col items-center justify-center">
                <ResponsiveContainer width="100%" height="75%">
                  <PieChart>
                    <Pie
                      data={recommendationPieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={75}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {recommendationPieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0f172a",
                        borderRadius: "12px",
                        color: "#fff",
                        fontSize: "12px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>

                <div className="grid grid-cols-2 gap-2 w-full pt-1 text-[11px] text-slate-600 font-medium">
                  {recommendationPieData.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx] }} />
                      <span>{item.name}: <strong>{item.value}</strong></span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs space-y-3">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <FaSearch className="absolute left-3.5 top-3 text-slate-400 text-xs" />
              <input
                type="text"
                placeholder="Search candidates by rank, name, skill, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all font-medium"
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

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700 font-medium">
              <FaSortAmountDown className="text-slate-400 text-xs" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-slate-800 text-xs font-bold focus:outline-hidden cursor-pointer"
              >
                <option value="overall-desc">Highest Overall Rank</option>
                <option value="match-desc">Highest Vector Match</option>
                <option value="ats-desc">Highest ATS Score</option>
                <option value="rank-asc">Rank #1 to #20</option>
              </select>
            </div>
          </div>

          {/* Filter Row */}
          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-xl p-2 font-medium focus:outline-hidden cursor-pointer"
            >
              <option value="All Categories">All Categories</option>
              <option value="Software Engineering">Software Engineering</option>
              <option value="Data Science & AI">Data Science & AI</option>
              <option value="Product & UI/UX Design">Product & UI/UX Design</option>
              <option value="DevOps & Cloud">DevOps & Cloud</option>
              <option value="Product Management">Product Management</option>
            </select>

            <select
              value={recommendationFilter}
              onChange={(e) => setRecommendationFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-xl p-2 font-medium focus:outline-hidden cursor-pointer"
            >
              <option value="All Recommendations">All Recommendations</option>
              <option value="Highly Recommended">Highly Recommended</option>
              <option value="Recommended">Recommended</option>
              <option value="Consider">Consider</option>
              <option value="Not Suitable">Not Suitable</option>
            </select>

            {hasActiveFilters && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setCategoryFilter("All Categories");
                  setRecommendationFilter("All Recommendations");
                  setSortBy("overall-desc");
                }}
                className="px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded-xl font-bold border border-rose-200 transition-colors cursor-pointer ml-auto"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Candidate Ranking Table (Desktop) */}
        <RankingTable
          candidates={filteredCandidates}
          selectedIds={selectedIds}
          onToggleSelect={handleToggleSelect}
          onViewCandidate={handleViewCandidate}
        />

        {/* Candidate Ranking Cards (Mobile) */}
        <div className="space-y-3 md:hidden">
          {filteredCandidates.map((cand) => (
            <RankingCard
              key={cand.id}
              candidate={cand}
              isChecked={selectedIds.includes(cand.id)}
              onToggleSelect={handleToggleSelect}
              onView={handleViewCandidate}
            />
          ))}
        </div>

        {/* Floating Compare Selected Bar */}
        {selectedIds.length >= 2 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-800 flex items-center gap-4 animate-in slide-in-from-bottom-5 duration-200">
            <div className="flex items-center gap-2 text-xs font-semibold">
              <FaCheckSquare className="text-amber-400 text-sm" />
              <span>
                <strong className="text-white">{selectedIds.length}</strong> Candidates Selected for Matrix
              </span>
            </div>

            <Button
              variant="primary"
              size="sm"
              icon={FaSlidersH}
              onClick={() => setIsCompareModalOpen(true)}
            >
              Compare Selected
            </Button>

            <button
              onClick={() => setSelectedIds([])}
              className="p-1 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer ml-1"
            >
              <FaTimes className="text-xs" />
            </button>
          </div>
        )}

        {/* Candidate Profile Drawer */}
        <RankingDrawer
          candidate={drawerCandidate}
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        />

        {/* Comparison Modal */}
        <ComparisonModal
          candidates={selectedCandidatesList}
          isOpen={isCompareModalOpen}
          onClose={() => setIsCompareModalOpen(false)}
        />
      </div>
    </MainLayout>
  );
}

export default CandidateRanking;
