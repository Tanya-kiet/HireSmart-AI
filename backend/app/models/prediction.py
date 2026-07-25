from datetime import datetime
from typing import Optional
from sqlalchemy import String, Integer, Float, ForeignKey, DateTime, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship
from backend.app.db.base_class import Base


class Prediction(Base):
    __tablename__ = "predictions"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True, autoincrement=True)
    resume_id: Mapped[Optional[int]] = mapped_column(Integer, ForeignKey("resumes.id", ondelete="CASCADE"), nullable=True)
    candidate_id: Mapped[Optional[int]] = mapped_column(Integer, ForeignKey("candidates.id", ondelete="CASCADE"), nullable=True)
    predicted_category: Mapped[str] = mapped_column(String(100), nullable=False)
    confidence: Mapped[float] = mapped_column(Float, default=0.94)
    status: Mapped[str] = mapped_column(String(50), default="Successfully Processed")
    processing_time: Mapped[str] = mapped_column(String(50), default="0.8 sec")
    technical_skills: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)
    soft_skills: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)

    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    # Relationships
    resume: Mapped[Optional["Resume"]] = relationship("Resume", back_populates="predictions")
    candidate: Mapped[Optional["Candidate"]] = relationship("Candidate", back_populates="predictions")
