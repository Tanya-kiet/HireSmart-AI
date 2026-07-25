"""
AI Candidate Ranking API Router for HireSmart AI.
"""

from fastapi import APIRouter, HTTPException
from backend.app.schemas.ranking import RankingRequest, RankingResponse
from backend.app.services.ranking_engine import rank_candidates

router = APIRouter(
    prefix="/api/v1/ranking",
    tags=["AI Candidate Ranking"],
)


@router.post("/rank", response_model=RankingResponse)
async def rank_candidates_endpoint(payload: RankingRequest):
    """
    Ranks multiple candidates based on ATS score, Vector Match score, Experience, Skills, Projects, and Education.
    Returns ranked list with explanations for each candidate position.
    """
    if not payload.candidates:
        raise HTTPException(status_code=400, detail="Candidate list cannot be empty.")

    result = rank_candidates(payload.candidates, payload.job_description)
    return result
