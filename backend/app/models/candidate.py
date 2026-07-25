from datetime import datetime
from typing import List, Optional
from sqlalchemy import String, Integer, Float, Text, DateTime, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship
from backend.app.db.base_class import Base


class Candidate(Base):
    __tablename__ = "candidates"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    email: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    phone: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    location: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    experience: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    avatar_bg: Mapped[Optional[str]] = mapped_column(String(50), default="bg-blue-600")
    predicted_category: Mapped[str] = mapped_column(String(100), default="Software Engineering")
    ats_score: Mapped[float] = mapped_column(Float, default=85.0)
    match_score: Mapped[float] = mapped_column(Float, default=80.0)
    status: Mapped[str] = mapped_column(String(50), default="New")  # New, Reviewed, Interview, Rejected, Hired
    recommendation: Mapped[str] = mapped_column(String(100), default="Recommended")
    summary: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    skills: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)  # List of skills
    strengths: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)
    weaknesses: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)

    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    resumes: Mapped[List["Resume"]] = relationship("Resume", back_populates="candidate", cascade="all, delete-orphan")
    predictions: Mapped[List["Prediction"]] = relationship("Prediction", back_populates="candidate", cascade="all, delete-orphan")
    match_results: Mapped[List["MatchResult"]] = relationship("MatchResult", back_populates="candidate", cascade="all, delete-orphan")
    interviews: Mapped[List["Interview"]] = relationship("Interview", back_populates="candidate", cascade="all, delete-orphan")
