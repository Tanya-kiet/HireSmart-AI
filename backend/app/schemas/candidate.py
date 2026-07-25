from datetime import datetime
from typing import Optional, List, Any, Dict
from pydantic import BaseModel, ConfigDict, EmailStr


class CandidateBase(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    location: Optional[str] = None
    experience: Optional[str] = "0 Years"
    avatar_bg: Optional[str] = "bg-blue-600"
    predicted_category: Optional[str] = "Software Engineering"
    ats_score: Optional[float] = 85.0
    match_score: Optional[float] = 80.0
    status: Optional[str] = "New"
    recommendation: Optional[str] = "Recommended"
    summary: Optional[str] = None
    skills: Optional[List[str]] = None
    strengths: Optional[List[str]] = None
    weaknesses: Optional[List[str]] = None


class CandidateCreate(CandidateBase):
    pass


class CandidateUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    location: Optional[str] = None
    experience: Optional[str] = None
    predicted_category: Optional[str] = None
    ats_score: Optional[float] = None
    match_score: Optional[float] = None
    status: Optional[str] = None
    recommendation: Optional[str] = None
    summary: Optional[str] = None
    skills: Optional[List[str]] = None
    strengths: Optional[List[str]] = None
    weaknesses: Optional[List[str]] = None


class CandidateResponse(CandidateBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
