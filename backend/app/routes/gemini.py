"""
Google Gemini AI Analysis API Router for HireSmart AI.
"""

from fastapi import APIRouter, HTTPException
from backend.app.schemas.gemini import GeminiAnalysisRequest, GeminiAnalysisResponse
from backend.app.services.gemini_service import analyze_candidate_with_gemini

router = APIRouter(
    prefix="/api/v1/gemini",
    tags=["Google Gemini AI Insights"],
)


@router.post("/analyze", response_model=GeminiAnalysisResponse)
async def analyze_with_gemini(payload: GeminiAnalysisRequest):
    """
    Generate Gemini AI executive candidate analysis, strengths, weaknesses,
    resume improvement suggestions, interview questions, and hiring recommendation.
    """
    if not payload.resume_text.strip():
        raise HTTPException(status_code=400, detail="Resume text cannot be empty.")

    analysis = analyze_candidate_with_gemini(
        resume_text=payload.resume_text,
        ats_result=payload.ats_result,
        match_result=payload.match_result,
        job_description=payload.job_description,
    )

    return analysis
