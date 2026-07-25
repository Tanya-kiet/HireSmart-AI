from typing import List
from sqlalchemy.orm import Session
from backend.app.repositories.base import BaseRepository
from backend.app.models.interview import Interview
from backend.app.schemas.interview import InterviewCreate, InterviewUpdate


class InterviewRepository(BaseRepository[Interview, InterviewCreate, InterviewUpdate]):
    def get_by_status(self, db: Session, status: str, skip: int = 0, limit: int = 100) -> List[Interview]:
        return db.query(Interview).filter(Interview.status == status).offset(skip).limit(limit).all()

    def get_by_candidate(self, db: Session, candidate_id: int) -> List[Interview]:
        return db.query(Interview).filter(Interview.candidate_id == candidate_id).all()


interview_repository = InterviewRepository(Interview)
