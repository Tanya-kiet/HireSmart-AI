from datetime import datetime
from typing import Optional, List, Dict, Any
from pydantic import BaseModel, ConfigDict


class MatchResultBase(BaseModel):
    match_score: Optional[float] = 92.0
    matching_skills: Optional[List[str]] = None
    missing_skills: Optional[List[str]] = None
    recommendation: Optional[str] = None
    strengths: Optional[List[str]] = None
    improvements: Optional[List[str]] = None
    insights: Optional[Dict[str, Any]] = None
    candidate_id: Optional[int] = None
    job_description_id: Optional[int] = None


class MatchResultCreate(MatchResultBase):
    pass


class MatchResultResponse(MatchResultBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
