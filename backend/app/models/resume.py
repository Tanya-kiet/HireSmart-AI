from datetime import datetime
from typing import List, Optional
from sqlalchemy import String, Integer, ForeignKey, DateTime, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from backend.app.db.base_class import Base


class Resume(Base):
    __tablename__ = "resumes"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True, autoincrement=True)
    candidate_id: Mapped[Optional[int]] = mapped_column(Integer, ForeignKey("candidates.id", ondelete="SET NULL"), nullable=True)
    filename: Mapped[str] = mapped_column(String(255), nullable=False)
    file_path: Mapped[str] = mapped_column(String(500), nullable=False)  # Cloudinary secure HTTPS URL or local path
    cloudinary_public_id: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)  # Cloudinary public ID for deletion
    file_size: Mapped[int] = mapped_column(Integer, default=0)
    parsed_text: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    uploaded_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    # Relationships
    candidate: Mapped[Optional["Candidate"]] = relationship("Candidate", back_populates="resumes")
    predictions: Mapped[List["Prediction"]] = relationship("Prediction", back_populates="resume", cascade="all, delete-orphan")
