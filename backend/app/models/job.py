from datetime import datetime
from typing import List, Optional
from sqlalchemy import String, Integer, Float, Text, DateTime, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship
from backend.app.db.base_class import Base


class JobDescription(Base):
    __tablename__ = "job_descriptions"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True, autoincrement=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    company: Mapped[str] = mapped_column(String(255), default="HireSmart AI")
    department: Mapped[str] = mapped_column(String(100), default="Engineering")
    location: Mapped[str] = mapped_column(String(255), default="San Francisco, CA")
    work_type: Mapped[str] = mapped_column(String(50), default="Hybrid")  # Hybrid, Remote, Onsite
    employment_type: Mapped[str] = mapped_column(String(50), default="Full-Time")  # Full-Time, Part-Time, Contract
    salary_range: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    experience: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    applications_count: Mapped[int] = mapped_column(Integer, default=0)
    status: Mapped[str] = mapped_column(String(50), default="Open")  # Open, Closed, Draft
    skills: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)  # List of skill strings
    responsibilities: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    qualifications: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    benefits: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    ai_summary: Mapped[Optional[str]] = mapped_column(Text, nullable=True)

    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    match_results: Mapped[List["MatchResult"]] = relationship("MatchResult", back_populates="job_description", cascade="all, delete-orphan")
    interviews: Mapped[List["Interview"]] = relationship("Interview", back_populates="job_description", cascade="all, delete-orphan")
