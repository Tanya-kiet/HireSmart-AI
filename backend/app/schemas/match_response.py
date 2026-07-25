from pydantic import BaseModel


class MatchResponse(BaseModel):
    match_score: float