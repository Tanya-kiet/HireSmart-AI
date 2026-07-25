from typing import List, Dict, Optional, Any
from pydantic import BaseModel, ConfigDict


class CandidateEvaluationItem(BaseModel):
    candidate_id: str
    name: str
    ats_score: Optional[float] = 80.0
    match_score: Optional[float] = 80.0
    experience_years: Optional[float] = 3.0
    skills: Optional[List[str]] = None
    projects_count: Optional[int] = 2
    education_level: Optional[str] = "Bachelor"


class RankingRequest(BaseModel):
    candidates: List[CandidateEvaluationItem]
    job_description: Optional[str] = None


class RankedCandidateItem(BaseModel):
    rank: int
    candidate_id: str
    name: str
    overall_composite_score: float
    ats_score: float
    match_score: float
    experience_score: float
    skill_score: float
    ranking_tier: str
    ranking_explanation: str
    key_strengths: List[str]
    potential_concerns: List[str]


class RankingResponse(BaseModel):
    total_evaluated: int
    top_candidate: Optional[str] = None
    average_composite_score: float
    ranked_candidates: List[RankedCandidateItem]

    model_config = ConfigDict(from_attributes=True)
