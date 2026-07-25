from datetime import datetime
from typing import Optional
from sqlalchemy import String, Integer, ForeignKey, DateTime, JSON, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from backend.app.db.base_class import Base


class Interview(Base):
    __tablename__ = "interviews"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True, autoincrement=True)
    candidate_id: Mapped[Optional[int]] = mapped_column(Integer, ForeignKey("candidates.id", ondelete="CASCADE"), nullable=True)
    job_description_id: Mapped[Optional[int]] = mapped_column(Integer, ForeignKey("job_descriptions.id", ondelete="SET NULL"), nullable=True)
    candidate_name: Mapped[str] = mapped_column(String(255), nullable=False)
    job_role: Mapped[str] = mapped_column(String(255), default="Software Engineer")
    round: Mapped[str] = mapped_column(String(100), default="Technical Round 1")
    interviewer: Mapped[str] = mapped_column(String(255), default="Alex Mercer")
    date: Mapped[str] = mapped_column(String(50), nullable=False)  # YYYY-MM-DD
    time: Mapped[str] = mapped_column(String(50), nullable=False)  # 10:00 AM
    duration: Mapped[str] = mapped_column(String(50), default="60 mins")
    mode: Mapped[str] = mapped_column(String(100), default="Google Meet")  # Google Meet, Zoom, MS Teams, Offline
    meeting_link: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)
    location: Mapped[Optional[str]] = mapped_column(String(255), default="Online")
    status: Mapped[str] = mapped_column(String(50), default="Scheduled")  # Scheduled, Completed, Cancelled, Rescheduled
    stage_index: Mapped[int] = mapped_column(Integer, default=2)
    notes: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    feedback: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)  # JSON evaluation metrics

    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    candidate: Mapped[Optional["Candidate"]] = relationship("Candidate", back_populates="interviews")
    job_description: Mapped[Optional["JobDescription"]] = relationship("JobDescription", back_populates="interviews")
