from typing import Optional, List
from sqlalchemy.orm import Session
from backend.app.repositories.base import BaseRepository
from backend.app.models.candidate import Candidate
from backend.app.schemas.candidate import CandidateCreate, CandidateUpdate


class CandidateRepository(BaseRepository[Candidate, CandidateCreate, CandidateUpdate]):
    def get_by_email(self, db: Session, email: str) -> Optional[Candidate]:
        return db.query(Candidate).filter(Candidate.email == email).first()

    def get_by_category(self, db: Session, category: str, skip: int = 0, limit: int = 100) -> List[Candidate]:
        return db.query(Candidate).filter(Candidate.predicted_category == category).offset(skip).limit(limit).all()


candidate_repository = CandidateRepository(Candidate)
