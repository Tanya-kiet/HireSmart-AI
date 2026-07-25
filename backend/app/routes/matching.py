"""
AI Resume & Job Description Semantic Matching API Routes for HireSmart AI.
"""

from pathlib import Path
import shutil
from fastapi import APIRouter, File, Form, HTTPException, UploadFile

from backend.app.config.settings import UPLOADS_DIR
from backend.app.schemas.matching import SemanticMatchRequest, SemanticMatchResponse
from backend.app.services.semantic_matcher import calculate_semantic_match
from ml.inference.resume_parser import extract_text_from_pdf

router = APIRouter(
    prefix="/matching",
    tags=["AI Resume Matching"],
)

UPLOADS_DIR.mkdir(exist_ok=True)


@router.post("/compare", response_model=SemanticMatchResponse)
async def compare_resume_text(payload: SemanticMatchRequest):
    """
    Compare raw resume text against a Job Description using Sentence Transformers (all-MiniLM-L6-v2).
    """
    if not payload.resume_text.strip():
        raise HTTPException(status_code=400, detail="Resume text cannot be empty.")

    if not payload.job_description.strip():
        raise HTTPException(status_code=400, detail="Job Description cannot be empty.")

    match_result = calculate_semantic_match(payload.resume_text, payload.job_description)
    return match_result


@router.post("/upload", response_model=SemanticMatchResponse)
async def match_uploaded_resume(
    file: UploadFile = File(...),
    job_description: str = Form(...)
):
    """
    Upload a PDF resume and match it against a Job Description string.
    """
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed.")

    file_path = UPLOADS_DIR / file.filename

    try:
        # Save file
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Extract text from PDF
        resume_text = extract_text_from_pdf(str(file_path))

        # Calculate real semantic vector match
        match_result = calculate_semantic_match(resume_text, job_description)
        return match_result

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        if file_path.exists():
            file_path.unlink()