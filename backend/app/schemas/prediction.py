from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, ConfigDict


class PredictionBase(BaseModel):
    predicted_category: str
    confidence: Optional[float] = 0.94
    status: Optional[str] = "Successfully Processed"
    processing_time: Optional[str] = "0.8 sec"
    technical_skills: Optional[List[str]] = None
    soft_skills: Optional[List[str]] = None
    resume_id: Optional[int] = None
    candidate_id: Optional[int] = None


class PredictionCreate(PredictionBase):
    pass


class PredictionResponse(PredictionBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
