from backend.app.repositories.base import BaseRepository
from backend.app.models.resume import Resume
from backend.app.schemas.resume import ResumeCreate, ResumeBase


class ResumeRepository(BaseRepository[Resume, ResumeCreate, ResumeBase]):
    pass


resume_repository = ResumeRepository(Resume)
