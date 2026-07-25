from backend.app.repositories.base import BaseRepository
from backend.app.models.match import MatchResult
from backend.app.schemas.match import MatchResultCreate, MatchResultBase


class MatchResultRepository(BaseRepository[MatchResult, MatchResultCreate, MatchResultBase]):
    pass


match_repository = MatchResultRepository(MatchResult)
