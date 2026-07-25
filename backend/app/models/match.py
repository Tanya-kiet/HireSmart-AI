from datetime import datetime
from typing import Optional
from sqlalchemy import Integer, Float, ForeignKey, DateTime, JSON, Text, String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from backend.app.db.base_class import Base


class MatchResult(Base):
    __tablename__ = "match_results"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True, autoincrement=True)
    candidate_id: Mapped[Optional[int]] = mapped_column(Integer, ForeignKey("candidates.id", ondelete="CASCADE"), nullable=True)
    job_description_id: Mapped[Optional[int]] = mapped_column(Integer, ForeignKey("job_descriptions.id", ondelete="CASCADE"), nullable=True)
    match_score: Mapped[float] = mapped_column(Float, default=92.0)
    matching_skills: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)
    missing_skills: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)
    recommendation: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    strengths: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)
    improvements: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)
    insights: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)

    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    # Relationships
    candidate: Mapped[Optional["Candidate"]] = relationship("Candidate", back_populates="match_results")
    job_description: Mapped[Optional["JobDescription"]] = relationship("JobDescription", back_populates="match_results")
