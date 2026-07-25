from datetime import datetime
from typing import Optional, Dict, Any
from pydantic import BaseModel, ConfigDict


class InterviewBase(BaseModel):
    candidate_name: str
    job_role: Optional[str] = "Software Engineer"
    round: Optional[str] = "Technical Round 1"
    interviewer: Optional[str] = "Alex Mercer"
    date: str
    time: str
    duration: Optional[str] = "60 mins"
    mode: Optional[str] = "Google Meet"
    meeting_link: Optional[str] = None
    location: Optional[str] = "Online"
    status: Optional[str] = "Scheduled"
    stage_index: Optional[int] = 2
    notes: Optional[str] = None
    feedback: Optional[Dict[str, Any]] = None
    candidate_id: Optional[int] = None
    job_description_id: Optional[int] = None


class InterviewCreate(InterviewBase):
    pass


class InterviewUpdate(BaseModel):
    candidate_name: Optional[str] = None
    job_role: Optional[str] = None
    round: Optional[str] = None
    interviewer: Optional[str] = None
    date: Optional[str] = None
    time: Optional[str] = None
    duration: Optional[str] = None
    mode: Optional[str] = None
    meeting_link: Optional[str] = None
    status: Optional[str] = None
    stage_index: Optional[int] = None
    notes: Optional[str] = None
    feedback: Optional[Dict[str, Any]] = None


class InterviewResponse(InterviewBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
