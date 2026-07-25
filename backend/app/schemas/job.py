from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, ConfigDict


class JobDescriptionBase(BaseModel):
    title: str
    company: Optional[str] = "HireSmart AI"
    department: Optional[str] = "Engineering"
    location: Optional[str] = "San Francisco, CA"
    work_type: Optional[str] = "Hybrid"
    employment_type: Optional[str] = "Full-Time"
    salary_range: Optional[str] = None
    experience: Optional[str] = None
    applications_count: Optional[int] = 0
    status: Optional[str] = "Open"
    skills: Optional[List[str]] = None
    responsibilities: Optional[str] = None
    qualifications: Optional[str] = None
    benefits: Optional[str] = None
    ai_summary: Optional[str] = None


class JobDescriptionCreate(JobDescriptionBase):
    pass


class JobDescriptionUpdate(BaseModel):
    title: Optional[str] = None
    company: Optional[str] = None
    department: Optional[str] = None
    location: Optional[str] = None
    work_type: Optional[str] = None
    employment_type: Optional[str] = None
    salary_range: Optional[str] = None
    experience: Optional[str] = None
    status: Optional[str] = None
    skills: Optional[List[str]] = None
    responsibilities: Optional[str] = None
    qualifications: Optional[str] = None
    benefits: Optional[str] = None
    ai_summary: Optional[str] = None


class JobDescriptionResponse(JobDescriptionBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
