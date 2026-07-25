from typing import List, Dict, Optional, Any
from pydantic import BaseModel, ConfigDict


class SemanticMatchRequest(BaseModel):
    resume_text: str
    job_description: str


class SemanticMatchResponse(BaseModel):
    overall_match_score: float
    semantic_similarity: float
    keyword_similarity: float
    matching_skills: List[str]
    missing_skills: List[str]
    recommendation: str
    strengths: List[str]
    improvements: List[str]
    insights: Dict[str, Any]

    model_config = ConfigDict(from_attributes=True)
