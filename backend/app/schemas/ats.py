from typing import List, Dict, Optional, Any
from pydantic import BaseModel, ConfigDict


class SectionScores(BaseModel):
    contact_info: float
    sections_presence: float
    keyword_coverage: float
    action_verbs: float
    experience_score: float
    education_score: float
    formatting_score: float


class ContactLinks(BaseModel):
    email: Optional[str] = None
    phone: Optional[str] = None
    linkedin: Optional[str] = None
    github: Optional[str] = None
    portfolio: Optional[str] = None


class ATSEvaluationResponse(BaseModel):
    overall_ats_score: float
    grade: str
    section_scores: SectionScores
    contact_links_found: ContactLinks
    missing_sections: List[str]
    identified_keywords: List[str]
    action_verbs_count: int
    suggestions: List[str]

    model_config = ConfigDict(from_attributes=True)
