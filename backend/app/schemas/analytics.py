from typing import List, Dict, Optional, Any
from pydantic import BaseModel, ConfigDict


class FunnelStageItem(BaseModel):
    stage: str
    count: int
    conversion_rate: float


class SkillDemandItem(BaseModel):
    skill: str
    demand_count: int
    percentage: float


class CategoryDistributionItem(BaseModel):
    category: str
    count: int
    percentage: float


class MonthlyTrendItem(BaseModel):
    month: str
    uploads: int
    interviews: int
    hired: int


class ScoreDistributionBucket(BaseModel):
    range: str
    count: int


class AnalyticsOverviewResponse(BaseModel):
    total_candidates: int
    active_jobs: int
    total_interviews: int
    avg_ats_score: float
    avg_match_score: float
    hiring_funnel: List[FunnelStageItem]
    skill_demand: List[SkillDemandItem]
    category_distribution: List[CategoryDistributionItem]
    monthly_trends: List[MonthlyTrendItem]
    ats_score_distribution: List[ScoreDistributionBucket]
    match_score_distribution: List[ScoreDistributionBucket]

    model_config = ConfigDict(from_attributes=True)
