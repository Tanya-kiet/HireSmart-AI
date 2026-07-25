from typing import List
from sqlalchemy.orm import Session
from backend.app.repositories.base import BaseRepository
from backend.app.models.job import JobDescription
from backend.app.schemas.job import JobDescriptionCreate, JobDescriptionUpdate


class JobDescriptionRepository(BaseRepository[JobDescription, JobDescriptionCreate, JobDescriptionUpdate]):
    def get_active_jobs(self, db: Session, skip: int = 0, limit: int = 100) -> List[JobDescription]:
        return db.query(JobDescription).filter(JobDescription.status == "Open").offset(skip).limit(limit).all()


job_repository = JobDescriptionRepository(JobDescription)
