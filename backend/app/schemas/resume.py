from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict


class ResumeBase(BaseModel):
    filename: str
    file_path: str  # Secure Cloudinary HTTPS URL
    cloudinary_public_id: Optional[str] = None
    file_size: Optional[int] = 0
    parsed_text: Optional[str] = None
    candidate_id: Optional[int] = None


class ResumeCreate(ResumeBase):
    pass


class ResumeResponse(ResumeBase):
    id: int
    uploaded_at: datetime

    model_config = ConfigDict(from_attributes=True)
