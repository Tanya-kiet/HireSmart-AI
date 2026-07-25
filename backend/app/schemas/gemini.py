from typing import List, Dict, Optional, Any
from pydantic import BaseModel, ConfigDict


class GeminiAnalysisRequest(BaseModel):
    resume_text: str
    ats_result: Optional[Dict[str, Any]] = None
    match_result: Optional[Dict[str, Any]] = None
    job_description: Optional[str] = None


class GeminiAnalysisResponse(BaseModel):
    professional_summary: str
    strengths: List[str]
    weaknesses: List[str]
    resume_improvements: List[str]
    interview_questions: List[str]
    career_suggestions: List[str]
    hiring_recommendation: str

    model_config = ConfigDict(from_attributes=True)
